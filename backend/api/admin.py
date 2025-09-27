from django.contrib import admin
from .models import StockPrediction
from django.utils.html import format_html
import json

@admin.register(StockPrediction)
class StockPredictionAdmin(admin.ModelAdmin):
    list_display = ("id", "ticker", "company_name", "created_at", "metrics_summary")
    list_filter = ("ticker", "created_at")
    search_fields = ("ticker", "company_name")
    readonly_fields = ("created_at", "graphs_pretty", "prediction_graph_pretty", "metrics_pretty")
    ordering = ("-created_at",)

    # Display metrics as a short summary
    def metrics_summary(self, obj):
        return ", ".join(f"{k}: {v:.2f}" for k, v in obj.metrics.items())
    metrics_summary.short_description = "Metrics"

    # Pretty print JSON fields
    def graphs_pretty(self, obj):
        return format_html("<pre>{}</pre>", json.dumps(obj.graphs, indent=2))
    graphs_pretty.short_description = "Graphs"

    def prediction_graph_pretty(self, obj):
        return format_html("<pre>{}</pre>", json.dumps(obj.prediction_graph, indent=2))
    prediction_graph_pretty.short_description = "Prediction Graph"

    def metrics_pretty(self, obj):
        return format_html("<pre>{}</pre>", json.dumps(obj.metrics, indent=2))
    metrics_pretty.short_description = "Metrics (JSON)"
