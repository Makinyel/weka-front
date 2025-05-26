
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, User, GraduationCap, Briefcase, DollarSign, Calendar, CreditCard, Home, Building, Gem, Banknote, CheckCircle } from "lucide-react";

const DatasetInfo = () => {
  const attributes = [
    {
      name: "loan_id",
      description: "Identificador único para cada solicitud",
      type: "Identificador",
      icon: Database,
      values: "Único por solicitud"
    },
    {
      name: "no_of_dependents",
      description: "Número de personas a cargo del solicitante",
      type: "Numérico",
      icon: User,
      values: "0, 1, 2, 3, 4, 5+"
    },
    {
      name: "education",
      description: "Nivel educativo del solicitante",
      type: "Categórico",
      icon: GraduationCap,
      values: "Graduado, No Graduado"
    },
    {
      name: "self_employed",
      description: "Si el solicitante es independiente",
      type: "Categórico",
      icon: Briefcase,
      values: "YES, NO"
    },
    {
      name: "income_annum",
      description: "Ingreso anual del solicitante",
      type: "Numérico",
      icon: DollarSign,
      values: "Valor en moneda local"
    },
    {
      name: "loan_amount",
      description: "Monto del préstamo solicitado",
      type: "Numérico",
      icon: DollarSign,
      values: "Valor en moneda local"
    },
    {
      name: "loan_term",
      description: "Duración del préstamo en meses",
      type: "Numérico",
      icon: Calendar,
      values: "12, 24, 36, 48, 60, etc."
    },
    {
      name: "cibil_score",
      description: "Puntaje de crédito del solicitante",
      type: "Numérico",
      icon: CreditCard,
      values: "300 - 900"
    },
    {
      name: "residential_assets_value",
      description: "Valor de los bienes residenciales",
      type: "Numérico",
      icon: Home,
      values: "Valor en moneda local"
    },
    {
      name: "commercial_assets_value",
      description: "Valor de los bienes comerciales",
      type: "Numérico",
      icon: Building,
      values: "Valor en moneda local"
    },
    {
      name: "luxury_assets_value",
      description: "Valor de los bienes de lujo",
      type: "Numérico",
      icon: Gem,
      values: "Valor en moneda local"
    },
    {
      name: "bank_asset_value",
      description: "Valor de los activos bancarios",
      type: "Numérico",
      icon: Banknote,
      values: "Valor en moneda local"
    },
    {
      name: "loan_status",
      description: "Estado del préstamo",
      type: "Categórico",
      icon: CheckCircle,
      values: "Approved, Rejected"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Numérico":
        return "bg-blue-100 text-blue-800";
      case "Categórico":
        return "bg-green-100 text-green-800";
      case "Identificador":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-financial-dark mb-2">
          Información del Dataset
        </h1>
        <p className="text-gray-600">
          Descripción detallada de los atributos utilizados en el modelo de predicción de créditos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {attributes.map((attr) => (
          <Card key={attr.name} className="gradient-financial hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <attr.icon className="w-5 h-5 text-white" />
                <Badge className={getTypeColor(attr.type)}>
                  {attr.type}
                </Badge>
              </div>
              <CardTitle className="text-lg font-semibold text-financial-dark">
                {attr.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white mb-3">
                {attr.description}
              </CardDescription>
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Valores posibles:
                </p>
                <p className="text-sm text-gray-600">
                  {attr.values}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-financial-light p-6 rounded-lg border border-financial-primary/20">
        <h3 className="text-xl font-semibold text-financial-dark mb-3">
          Sobre el Dataset
        </h3>
        <p className="text-gray-700 leading-relaxed">
          Este dataset contiene información financiera y personal de solicitantes de préstamos. 
          Cada registro representa una solicitud única con sus características demográficas, 
          financieras y de activos. El modelo utiliza estos atributos para predecir la 
          probabilidad de aprobación del préstamo basándose en patrones históricos.
        </p>
      </div>
    </div>
  );
};

export default DatasetInfo;
