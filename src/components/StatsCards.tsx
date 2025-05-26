
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Target } from "lucide-react";

const StatsCards = () => {
  const stats = [
    {
      title: "Precisión del Modelo",
      value: "94.2%",
      description: "Exactitud en predicciones",
      icon: Target,
      color: "text-financial-success",
      bgColor: "bg-green-50"
    },
    {
      title: "Evaluaciones Realizadas",
      value: "12,847",
      description: "Total de análisis",
      icon: Users,
      color: "text-financial-primary",
      bgColor: "bg-blue-50"
    },
    {
      title: "Tasa de Aprobación",
      value: "68%",
      description: "Préstamos aprobados",
      icon: TrendingUp,
      color: "text-financial-success",
      bgColor: "bg-green-50"
    },
    {
      title: "Monto Promedio",
      value: "$45,200",
      description: "Préstamo típico",
      icon: DollarSign,
      color: "text-financial-warning",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
            <CardDescription className="text-xs text-gray-500">
              {stat.description}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
