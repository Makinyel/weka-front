
import { Calculator, TrendingUp } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-financial-primary rounded-lg">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-financial-dark">CreditPredict</h1>
              <p className="text-sm text-gray-500">Predicción de Créditos</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-financial-success">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">Sistema Predictivo</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
