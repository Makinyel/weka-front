import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertTriangle, Eye, Calendar } from "lucide-react";

export interface PredictionRecord {
  id: string;
  timestamp: Date;
  prediction: string;
  probability: number;
  advice: string;
  file?: string | null;
  formData: any;
}

interface PredictionHistoryProps {
  predictions: PredictionRecord[];
  onViewDetails: (prediction: PredictionRecord) => void;
}

const PredictionHistory = ({ predictions, onViewDetails }: PredictionHistoryProps) => {
  const getStatusIcon = (prediction: string) => {
    const isApproved = prediction.toLowerCase().includes("approved");
    const isRejected = prediction.toLowerCase().includes("rejected");

    if (isApproved) return <CheckCircle className="w-5 h-5 text-financial-success" />;
    if (isRejected) return <XCircle className="w-5 h-5 text-financial-danger" />;
    return <AlertTriangle className="w-5 h-5 text-financial-warning" />;
  };

  const getBadgeVariant = (prediction: string) => {
    const isApproved = prediction.toLowerCase().includes("approved");
    const isRejected = prediction.toLowerCase().includes("rejected");

    if (isApproved) return "default";
    if (isRejected) return "destructive";
    return "secondary";
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const translatePrediction = (prediction: string) => {
    if (prediction.toLowerCase().includes("approved")) return "Aprobado";
    if (prediction.toLowerCase().includes("rejected")) return "Rechazado";
    return prediction;
  };

  if (predictions.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto bg-gradient-to-r from-financial-primary to-financial-secondary">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-financial-dark">Historial de Predicciones</CardTitle>
          <CardDescription>
            Aquí aparecerán todas las evaluaciones realizadas durante esta sesión
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Calendar className="w-16 h-16 mx-auto" />
          </div>
          <p className="text-financial-dark text-lg">
            No hay predicciones realizadas aún
          </p>
          <p className="text-gray-600 text-sm mt-2">
            Completa el formulario para ver tu primer resultado aquí
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-r from-financial-primary to-financial-secondary">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-financial-dark">Historial de Predicciones</CardTitle>
        <CardDescription>
          {predictions.length} evaluación{predictions.length !== 1 ? 'es' : ''} realizadas en esta sesión
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {predictions.map((record) => (
            <Card key={record.id} className="rounded-3xl border border-white bg-white shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between text-black">
                  <div className="flex items-center space-x-3 flex-1">
                    {getStatusIcon(record.prediction)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant={getBadgeVariant(record.prediction)} className="text-sm text-green-500 font-bold">
                          {translatePrediction(record.prediction)}
                        </Badge>
                        <span className="text-sm font-bold text-black">
                          {record.probability.toFixed(1)}%
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(record.timestamp)}
                      </p>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        Monto: ${record.formData?.loanAmount?.toLocaleString()} | 
                        Ingresos: ${record.formData?.incomeAnnum?.toLocaleString()} | 
                        CIBIL: {record.formData?.cibilScore}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(record)}
                    className="ml-4 flex items-center space-x-1 bg-yellow-200"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Ver Detalles</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionHistory;
