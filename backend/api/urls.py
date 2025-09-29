from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from user.views import RegisterView, LoginView
from api.views import StockPredictionView, StockHistoryView

urlpatterns = [
    # Auth
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # Predictions
    path("predict/", StockPredictionView.as_view(), name="stock-predict"),  # POST + GET latest
    path("predict/history/", StockHistoryView.as_view(), name="stock-history"),  # paginated history
    path("predict/<int:pk>/", StockPredictionView.as_view(), name="stock-detail"),  # view single record
]
