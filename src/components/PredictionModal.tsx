
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertTriangle, X } from "lucide-react";

interface PredictionModalProps {
  isOpen: boolean;
  onClose: () => void;
  prediction: string;
  probability: number;
  advice: string;
  file?: string | null;
}

const PredictionModal = ({ 
  isOpen, 
  onClose, 
  prediction, 
  probability, 
  advice, 
  file 
}: PredictionModalProps) => {
  const isApproved = prediction.toLowerCase().includes("approved");
  const isRejected = prediction.toLowerCase().includes("rejected");

  const getStatusIcon = () => {
    if (isApproved) return <CheckCircle className="w-16 h-16 text-financial-success" />;
    if (isRejected) return <XCircle className="w-16 h-16 text-financial-danger" />;
    return <AlertTriangle className="w-16 h-16 text-financial-warning" />;
  };

  const getStatusColor = () => {
    if (isApproved) return "bg-gradient-to-r from-financial-success to-green-400";
    if (isRejected) return "bg-gradient-to-r from-financial-danger to-red-400";
    return "bg-gradient-to-r from-financial-warning to-purple-400";
  };

  const getStatusText = () => {
    if (isApproved) return "Préstamo Aprobado";
    if (isRejected) return "Préstamo Rechazado";
    return "En Revisión";
  };

  const getBadgeVariant = () => {
    if (isApproved) return "default";
    if (isRejected) return "destructive";
    return "secondary";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl bg-white rounded-xl p-6">
        <DialogHeader className="bg-gradient-to-r from-financial-primary to-financial-secondary text-white rounded-t-lg p-6 -m-6 ">
          <DialogTitle className="text-center text-3xl font-bold">
            Resultado de la Evaluación
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-8 py-4 bg-gradient-to-br from-gray-50 to-white p-6 -mx-6">
          {/* Estado del préstamo */}
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                {getStatusIcon()}
              </div>
              <h3 className="text-2xl font-bold text-financial-dark mb-4">
                {getStatusText()}
              </h3>
            </div>

            <div className="text-center mb-6">
              <div className={`inline-flex items-center px-8 py-4 rounded-full text-white font-bold text-xl shadow-lg ${getStatusColor()}`}>
                <span>
                  Probabilidad: {probability.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Recomendaciones */}
          {advice && (
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
              <div className="border-l-4 border-financial-primary pl-6">
                <h4 className="text-xl font-bold text-financial-dark mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-financial-primary" />
                  Recomendaciones Personalizadas:
                </h4>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {advice}
                </p>
              </div>
            </div>
          )}

          {/* Árbol de decisión */}
          {file && (
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
              <h4 className="text-xl font-bold text-financial-primary mb-6 text-center">
                Árbol de Decisión del Análisis:
              </h4>
              <div className="flex justify-center">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <img 
                    src={file} 
                    alt="Árbol de decisión" 
                    className="max-w-full h-auto rounded-lg shadow-md"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Botón de cierre */}
          <div className="flex justify-center pt-6">
            <Button
              onClick={onClose}
              className="h-14 px-8 bg-gradient-to-r from-financial-primary to-financial-secondary hover:from-financial-secondary hover:to-financial-primary text-white text-lg font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              <X className="w-5 h-5 mr-2" />
              Cerrar Evaluación
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PredictionModal;
