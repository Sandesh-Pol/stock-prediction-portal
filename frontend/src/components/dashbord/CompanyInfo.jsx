import { Card } from "../ui/Card";
const CompanyInfo = ({ ticker, name }) => {
  return (
    <Card className="p-6 bg-card border-border shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-primary">{ticker}</h1>
          <p className="text-lg text-muted-foreground">{name}</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Live Analysis
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CompanyInfo;