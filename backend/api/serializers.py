# stockpredictor/serializers.py
from rest_framework import serializers

# Input Serializer
class StockRequestSerializer(serializers.Serializer):
    ticker = serializers.CharField(required=True)
    company_name = serializers.CharField(required=True)

# Output Serializer
class StockPredictionSerializer(serializers.Serializer):
    company = serializers.CharField()
    company_name = serializers.CharField()
    graphs = serializers.DictField()
    prediction_graph = serializers.DictField()
    metrics = serializers.DictField()
