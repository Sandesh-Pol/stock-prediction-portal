from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import make_prediction
from .serializers import StockRequestSerializer, StockPredictionSerializer
from .models import StockPrediction
from rest_framework.generics import RetrieveDestroyAPIView,ListAPIView
from rest_framework.permissions import IsAuthenticated

from .models import StockPrediction
from .serializers import StockHistorySerializer
from rest_framework.pagination import PageNumberPagination

class StockPredictionView(APIView):
    permission_classes = [IsAuthenticated]  # ✅ enforce JWT login

    def get(self, request, *args, **kwargs):
        ticker = request.query_params.get("ticker", None)

        if ticker:
            latest_prediction = StockPrediction.objects.filter(ticker=ticker).order_by("-created_at").first()
        else:
            latest_prediction = StockPrediction.objects.all().order_by("-created_at").first()

        if latest_prediction:
            serializer = StockPredictionSerializer(latest_prediction)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "No prediction found."}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        serializer = StockRequestSerializer(data=request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data["ticker"]
            company_name = serializer.validated_data["company_name"]

            result = make_prediction(ticker, company_name)

            save_serializer = StockPredictionSerializer(data={
                "ticker": ticker,
                "company_name": company_name,
                "graphs": result["graphs"],
                "prediction_graph": result["prediction_graph"],
                "metrics": result["metrics"],
            })
            save_serializer.is_valid(raise_exception=True)
            instance = save_serializer.save(user=request.user)  # 👈 now request.user will be real

            return Response(
                StockPredictionSerializer(instance).data,
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





class StockHistoryPagination(PageNumberPagination):
    page_size = 10  # default records per page
    page_size_query_param = "page_size"
    max_page_size = 50


class StockHistoryView(ListAPIView):
    serializer_class = StockHistorySerializer
    permission_classes = [IsAuthenticated]
    pagination_class = StockHistoryPagination

    def get_queryset(self):
        # Show history only for logged-in user
        return StockPrediction.objects.filter(user=self.request.user).order_by("-created_at")


class StockPredictionDetailView(RetrieveDestroyAPIView):
    serializer_class = StockPredictionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return StockPrediction.objects.filter(user=self.request.user)

