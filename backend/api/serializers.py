from rest_framework import serializers
from .models import StockPrediction

class StockRequestSerializer(serializers.Serializer):
    ticker = serializers.CharField(required=True)
    company_name = serializers.CharField(required=True)

class StockPredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockPrediction
        fields = ["id", "ticker", "company_name", "graphs", "prediction_graph", "metrics", "created_at"]
