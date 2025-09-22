import { Card } from "../ui/Card";
const MetricsSection = ({ metrics }) => {
  const metricCards = [
    {
      title: "Mean Squared Error",
      key: "MSE",
      value: metrics.mse,
      description: "Average of squared differences",
      color: "text-chart-primary",
      bgColor: "bg-chart-primary/10",
    },
    {
      title: "Root Mean Squared Error", 
      key: "RMSE",
      value: metrics.rmse,
      description: "Square root of MSE",
      color: "text-chart-ma100",
      bgColor: "bg-chart-ma100/10",
    },
    {
      title: "Mean Absolute Error",
      key: "MAE", 
      value: metrics.mae,
      description: "Average absolute differences",
      color: "text-chart-ma200",
      bgColor: "bg-chart-ma200/10",
    },
    {
      title: "R-Squared",
      key: "R²",
      value: metrics.r2,
      description: "Coefficient of determination",
      color: "text-chart-prediction",
      bgColor: "bg-chart-prediction/10",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-foreground">Model Performance Metrics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((metric) => (
          <Card key={metric.key} className="p-6 bg-card border-border shadow-card hover:shadow-lg transition-shadow">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <span className={`text-sm font-bold ${metric.color}`}>
                    {metric.key}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">
                  {metric.value.toFixed(4)}
                </p>
                <p className="text-sm font-medium text-muted-foreground mt-1">
                  {metric.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {metric.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MetricsSection;