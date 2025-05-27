import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import LoanForm, { LoanFormData } from "@/components/LoanForm";
import PredictionModal from "@/components/PredictionModal";
import AmountModal from "@/components/AmountModal"; // Assuming this modal handles a simple string
import PredictionHistory, { PredictionRecord } from "@/components/PredictionHistory";
import HamburgerMenu from "@/components/HamburgerMenu";
import DatasetInfo from "@/components/DatasetInfo";

interface PredictionResponse {
  prediction: string;
  probability: number;
  advice: string;
  file?: string | null;
}

// Your endpoint /predic returns a plain String, not a JSON object with 'loanamount'.
// If you want to keep the AmountResponse interface, your Spring Boot endpoint should return:
// ResponseEntity<Map<String, String>> or a DTO like:
// public class AmountDTO { private String loanamount; // getters/setters }
// For now, I'll assume it returns a plain string, as per your initial description.
// interface AmountResponse {
//   loanamount: string;
// }

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentView, setCurrentView] = useState<"form" | "history" | "dataset">("form");
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [currentResult, setCurrentResult] = useState<PredictionResponse | null>(null);
  // Change loanAmount to string directly, as we expect a plain string from /predic
  const [loanAmount, setLoanAmount] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<PredictionRecord[]>([]);
  const [selectedPrediction, setSelectedPrediction] = useState<PredictionRecord | null>(null);
  const { toast } = useToast();

  const handleLoanSubmission = async (formData: LoanFormData, mode: "approval" | "amount") => {
    setIsLoading(true);

    try {
      if (mode === "approval") {
        // ... (Tu código existente para el modo 'approval' que ya funciona correctamente)
        const response = await fetch(
          "https://weka-project.onrender.com/api-weka/predicJ48",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) throw new Error("Error en la solicitud al backend de aprobación");

        const result: PredictionResponse = await response.json();

        const newRecord: PredictionRecord = {
          id: Date.now().toString(),
          timestamp: new Date(),
          prediction: result.prediction,
          probability: result.probability,
          advice: result.advice,
          file: result.file || null,
          formData: formData,
        };

        setPredictions((prev) => [newRecord, ...prev]);
        setCurrentResult(result);
        setShowApprovalModal(true);

        let mensajeResultado = result.prediction.toLowerCase().includes("approved")
          ? "Préstamo Aprobado"
          : result.prediction.toLowerCase().includes("rejected")
          ? "Préstamo Rechazado"
          : result.prediction;

        toast({
          title: "Evaluación completada",
          description: `Resultado: ${mensajeResultado} - Probabilidad: ${result.probability.toFixed(1)}%`,
        });
      } else {
        // --- INICIO DE LA CORRECCIÓN PARA EL ENDPOINT /predic ---
        const amountRequest = {
          noOfDependents: formData.noOfDependents,
          education: formData.education,
          selfEmployed: formData.selfEmployed,
          incomeAnnum: formData.incomeAnnum,
          loanTerm: formData.loanTerm,
          cibilScore: formData.cibilScore,
          residentialAssetsValue: formData.residentialAssetsValue,
          commercialAssetsValue: formData.commercialAssetsValue,
          luxuryAssetsValue: formData.luxuryAssetsValue,
          bankAssetValue: formData.bankAssetValue,
        };

        const response = await fetch(
          "https://weka-project.onrender.com/api-weka/predic",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Indica que esperas una respuesta de texto plano
              'Accept': 'text/plain'
            },
            body: JSON.stringify(amountRequest),
          }
        );

        if (!response.ok) {
          // Si el backend devuelve un error, intenta leerlo como texto
          const errorText = await response.text();
          throw new Error(`Error en la solicitud al backend (monto): ${errorText}`);
        }
      
        // AQUÍ ESTÁ EL CAMBIO CLAVE: Usa response.text() en lugar de response.json()
        // porque tu endpoint devuelve un String directo, no un JSON.
        const resultString: string = await response.text();
        console.log("Monto predicho (string):", resultString);

        setLoanAmount(resultString); // Guarda el string directamente
        setShowAmountModal(true);

        toast({
          title: "Predicción de monto completada",
          description: `Monto máximo predecido: ${resultString}`,
        });
        // --- FIN DE LA CORRECCIÓN ---
      }
    } catch (error) {
      console.error("Error en la evaluación:", error);
      toast({
        title: "Error en la evaluación",
        description: "Hubo un problema al procesar tu solicitud. Por favor intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (prediction: PredictionRecord) => {
    setSelectedPrediction(prediction);
    setCurrentResult({
      prediction: prediction.prediction,
      probability: prediction.probability,
      advice: prediction.advice,
      file: prediction.file,
    });
    setShowApprovalModal(true);
  };

  const handleCloseApprovalModal = () => {
    setShowApprovalModal(false);
    setCurrentResult(null);
    setSelectedPrediction(null);
  };

  const handleCloseAmountModal = () => {
    setShowAmountModal(false);
    setLoanAmount(null); // Resetea a null o a un valor inicial apropiado
  };

  const renderContent = () => {
    switch (currentView) {
      case "form":
        return <LoanForm onSubmit={handleLoanSubmission} isLoading={isLoading} />;
      case "history":
        return <PredictionHistory predictions={predictions} onViewDetails={handleViewDetails} />;
      case "dataset":
        return <DatasetInfo />;
      default:
        return <LoanForm onSubmit={handleLoanSubmission} isLoading={isLoading} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-financial-light via-white to-blue-50">
      <Header />
      <HamburgerMenu currentView={currentView} onViewChange={setCurrentView} />

      <main className="container mx-auto px-4 py-8 pl-16">
        {currentView === "form" && (
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-financial-dark mb-4">
              Sistema de Predicción de Créditos
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Utiliza inteligencia artificial avanzada para evaluar tu solicitud de préstamo y obtener una respuesta instantánea con recomendaciones personalizadas.
            </p>
          </div>
        )}

        <div className="flex justify-center">{renderContent()}</div>

        {showApprovalModal && currentResult && (
          <PredictionModal
            isOpen={showApprovalModal}
            onClose={handleCloseApprovalModal}
            prediction={currentResult.prediction}
            probability={currentResult.probability}
            advice={currentResult.advice}
            file={currentResult.file}
          />
        )}

        {showAmountModal && (
          <AmountModal
            isOpen={showAmountModal}
            onClose={handleCloseAmountModal}
            loanAmount={loanAmount} // Pasa el string directamente
          />
        )}

        {currentView === "form" && (
          <div className="mt-16 text-center">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-financial-dark mb-4">¿Cómo funciona nuestro sistema?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="text-center">
                  <div className="w-12 h-12 bg-financial-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h3 className="font-semibold text-financial-dark mb-2">Completa el formulario</h3>
                  <p className="text-gray-600 text-sm">
                    Proporciona información detallada sobre tus ingresos, activos y el préstamo deseado.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-financial-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h3 className="font-semibold text-financial-dark mb-2">Análisis inteligente</h3>
                  <p className="text-gray-600 text-sm">
                    Nuestro algoritmo de IA analiza múltiples factores para predecir la probabilidad de aprobación.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-financial-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h3 className="font-semibold text-financial-dark mb-2">Recibe resultados</h3>
                  <p className="text-gray-600 text-sm">
                    Obtén una respuesta instantánea con consejos personalizados y revisa tu historial.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;