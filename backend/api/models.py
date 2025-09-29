from django.db import models
from django.contrib.auth.models import User

class StockPrediction(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="predictions")/
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="predictions", null=True, blank=True)
    ticker = models.CharField(max_length=20)
    company_name = models.CharField(max_length=100)
    graphs = models.JSONField()              
    prediction_graph = models.JSONField()
    metrics = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.company_name} ({self.ticker})"
