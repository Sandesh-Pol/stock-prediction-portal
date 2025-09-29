from rest_framework import serializers
from .models import StockPrediction

class StockRequestSerializer(serializers.Serializer):
    ticker = serializers.CharField(required=True)
    company_name = serializers.CharField(required=True)

class StockPredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockPrediction
        fields = ["id", "ticker", "company_name", "graphs", "prediction_graph", "metrics", "created_at"]

class StockHistorySerializer(serializers.ModelSerializer):
    view_url = serializers.SerializerMethodField()

    class Meta:
        model = StockPrediction
        fields = ["id", "ticker", "company_name", "created_at", "view_url"]

    def get_view_url(self, obj):
        # Example: return API endpoint to fetch full record
        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(f"/api/predictions/{obj.id}/")
        return f"/api/predictions/{obj.id}/"