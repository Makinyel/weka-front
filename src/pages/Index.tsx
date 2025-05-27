import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import LoanForm, { LoanFormData } from "@/components/LoanForm";
import PredictionModal from "@/components/PredictionModal";
import AmountModal from "@/components/AmountModal";
import PredictionHistory, { PredictionRecord } from "@/components/PredictionHistory";
import HamburgerMenu from "@/components/HamburgerMenu";
import DatasetInfo from "@/components/DatasetInfo";

interface PredictionResponse {
  prediction: string;
  probability: number;
  advice: string;
  file?: string | null;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentView, setCurrentView] = useState<"form" | "history" | "dataset">("form");
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [currentResult, setCurrentResult] = useState<PredictionResponse | null>(null);
  const [loanAmount, setLoanAmount] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<PredictionRecord[]>([]);
  const [selectedPrediction, setSelectedPrediction] = useState<PredictionRecord | null>(null);
  const { toast } = useToast();

  const handleLoanSubmission = async (formData: LoanFormData, mode: "approval" | "amount") => {
    setIsLoading(true);

    try {
      if (mode === "approval") {
        const response = await fetch("https://weka-project.onrender.com/api-weka/predicJ48", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

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

        const response = await fetch("https://weka-project.onrender.com/api-weka/predic", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/plain",
          },
          body: JSON.stringify(amountRequest),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error en la solicitud al backend (monto): ${errorText}`);
        }

        const resultString: string = await response.text();
        setLoanAmount(resultString);
        setShowAmountModal(true);

        // ✅ Guardar en historial
        const newRecord: PredictionRecord = {
          id: Date.now().toString(),
          timestamp: new Date(),
          prediction: resultString,
          probability: 0,
          advice: "Monto máximo estimado para el préstamo.",
          file: null,
          formData: formData,
        };

        setPredictions((prev) => [newRecord, ...prev]);

        toast({
          title: "Predicción de monto completada",
          description: `Monto máximo predecido: ${resultString}`,
        });
      }
    } catch (error) {
      console.error("Error en la evaluación:", error);
      toast({
        title: "Error en la evaluación",
        description: "Hubo un problema al procesar tu solicitud.",
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
    setLoanAmount(null);
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
        {renderContent()}
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
        {showAmountModal && loanAmount && (
          <AmountModal isOpen={showAmountModal} onClose={handleCloseAmountModal} loanAmount={loanAmount} />
        )}
      </main>
    </div>
  );
};

export default Index;
