import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DollarSign, X } from "lucide-react";

interface AmountModalProps {
  isOpen: boolean;
  onClose: () => void;
  loanAmount: string;
}

const AmountModal = ({ isOpen, onClose, loanAmount }: AmountModalProps) => {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(parseFloat(loanAmount));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl bg-white rounded-xl">
        <DialogHeader className="bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-t-lg p-6">
          <DialogTitle className="text-center text-3xl font-bold">
            Resultado de la Evaluación
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8 py-4 bg-gradient-to-br from-gray-50 to-white p-6">
          {/* Monto a prestar */}
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 text-center">
            <div className="flex justify-center mb-6">
              <DollarSign className="w-16 h-16 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-financial-dark mb-2">
              Este es el monto a prestar
            </h3>
            <div className="inline-flex items-center px-8 py-4 rounded-full text-white font-bold text-xl shadow-lg bg-gradient-to-r from-green-600 to-emerald-400">
              {formattedAmount}
            </div>
          </div>

          {/* Botón de cierre */}
          <div className="flex justify-center pt-6">
            <Button
              onClick={onClose}
              className="h-14 px-8 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-emerald-500 hover:to-green-600 text-white text-lg font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
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

export default AmountModal;
