# stockpredictor/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import make_prediction
from .serializers import StockRequestSerializer, StockPredictionSerializer

class StockPredictionView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = StockRequestSerializer(data=request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data["ticker"]
            company_name = serializer.validated_data["company_name"]
            try:
                # Call the utils function
                result = make_prediction(ticker, company_name)
                response_serializer = StockPredictionSerializer(result)
                return Response(response_serializer.data, status=status.HTTP_200_OK)
            except FileNotFoundError as fnf:
                return Response({"error": str(fnf)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)