import { Card } from "../ui/Card";
import CompanyInfo from "./CompanyInfo";
import StockChart from "./StockChart";
import PredictionChart from "./PredictionChart";
import MetricsSection from "./MetricsSection";

const DashboardUI = ({ data }) => {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Company Header */}
        <CompanyInfo 
          ticker={data.company} 
          name={data.company_name} 
        />
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card className="p-6 bg-card border-border shadow-card">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">
              Stock Price Analysis
            </h2>
            <StockChart
              closePrice={data.graphs.close_price}
              ma100={data.graphs.ma_100}
              ma200={data.graphs.ma_200}
            />
          </Card>
          
          <Card className="p-6 bg-card border-border shadow-card">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">
              Price Predictions
            </h2>
            <PredictionChart
              labels={data.prediction_graph.labels}
              data={data.prediction_graph.data}
            />
          </Card>
        </div>
        
        {/* Metrics Section */}
        <MetricsSection metrics={data.metrics} />
      </div>
    </div>
  );
};

export default DashboardUI;