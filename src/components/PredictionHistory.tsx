import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertTriangle, Eye, Calendar, DollarSign } from "lucide-react";

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
    const isAmount = !isApproved && !isRejected && !isNaN(Number(prediction));
    if (isApproved) return <CheckCircle className="w-5 h-5 text-financial-success" />;
    if (isRejected) return <XCircle className="w-5 h-5 text-financial-danger" />;
    if (isAmount) return <DollarSign className="w-5 h-5 text-green-500" />;
    return <AlertTriangle className="w-5 h-5 text-financial-warning" />;
  };

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);

  const translatePrediction = (prediction: string) => {
    if (prediction.toLowerCase().includes("approved")) return "Aprobado";
    if (prediction.toLowerCase().includes("rejected")) return "Rechazado";
    return `Monto: $${prediction}`;
  };

  if (predictions.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto bg-gradient-to-r from-financial-primary to-financial-secondary">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-financial-dark">Historial de Predicciones</CardTitle>
          <CardDescription>Aquí aparecerán las evaluaciones realizadas</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-financial-dark text-lg">No hay predicciones aún</p>
          <p className="text-gray-600 text-sm mt-2">Realiza una predicción para comenzar</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-r from-financial-primary to-financial-secondary">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-financial-dark">Historial de Predicciones</CardTitle>
        <CardDescription>{predictions.length} evaluación{predictions.length !== 1 ? "es" : ""}</CardDescription>
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
                        <span
                          className={`text-sm font-semibold ${
                            record.prediction.toLowerCase().includes("approved")
                              ? "text-green-600"
                              : record.prediction.toLowerCase().includes("rejected")
                              ? "text-red-600"
                              : "text-black"
                          }`}
                        >
                          {translatePrediction(record.prediction)}
                        </span>

                        {!isNaN(record.probability) && record.probability > 0 && (
                          <span className="text-sm font-bold text-black">
                            {record.probability.toFixed(1)}%
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(record.timestamp)}
                      </p>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
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
