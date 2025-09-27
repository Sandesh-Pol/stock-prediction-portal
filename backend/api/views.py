from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import make_prediction
from .serializers import StockRequestSerializer, StockPredictionSerializer
from .models import StockPrediction

class StockPredictionView(APIView):
    # GET → fetch latest prediction (optionally filtered by ticker)
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

    # POST → make prediction and save
    def post(self, request, *args, **kwargs):
        serializer = StockRequestSerializer(data=request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data["ticker"]
            company_name = serializer.validated_data["company_name"]
            try:
                # Run prediction
                result = make_prediction(ticker, company_name)

                # Save result in DB
                save_serializer = StockPredictionSerializer(data={
                    "ticker": ticker,
                    "company_name": company_name,
                    "graphs": result["graphs"],
                    "prediction_graph": result["prediction_graph"],
                    "metrics": result["metrics"],
                })
                save_serializer.is_valid(raise_exception=True)
                instance = save_serializer.save()

                return Response(StockPredictionSerializer(instance).data, status=status.HTTP_201_CREATED)

            except FileNotFoundError as fnf:
                return Response({"error": str(fnf)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
