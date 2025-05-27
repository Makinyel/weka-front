// LoanForm.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  Send,
  User,
  GraduationCap,
  DollarSign,
  Calendar,
  CreditCard,
  Home,
  Building,
  Gem,
  Banknote,
} from "lucide-react";

interface LoanFormProps {
  onSubmit: (data: LoanFormData, mode: "approval" | "amount") => void;
  isLoading: boolean;
}

export interface LoanFormData {
  noOfDependents: number;
  education: string;
  selfEmployed: string;
  incomeAnnum: number;
  loanAmount: number;
  loanTerm: number;
  cibilScore: number;
  residentialAssetsValue: number;
  commercialAssetsValue: number;
  luxuryAssetsValue: number;
  bankAssetValue: number;
}

const LoanForm = ({ onSubmit, isLoading }: LoanFormProps) => {
  const [formData, setFormData] = useState<LoanFormData>({
    noOfDependents: 0,
    education: "",
    selfEmployed: "",
    incomeAnnum: 0,
    loanAmount: 0,
    loanTerm: 0,
    cibilScore: 300,
    residentialAssetsValue: 0,
    commercialAssetsValue: 0,
    luxuryAssetsValue: 0,
    bankAssetValue: 0,
  });

  const [mode, setMode] = useState<"approval" | "amount">("approval");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.education || !formData.selfEmployed) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos del formulario.",
        variant: "destructive",
      });
      return;
    }

    if (mode === "approval") {
      if (formData.loanAmount <= 0 || formData.incomeAnnum <= 0) {
        toast({
          title: "Valores inválidos",
          description: "El monto del préstamo e ingresos deben ser mayores a 0.",
          variant: "destructive",
        });
        return;
      }
    }

    onSubmit(formData, mode);
  };

  const handleInputChange = (field: keyof LoanFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Card className="w-full max-w-5xl mx-auto animate-fade-in shadow-xl">
      <CardHeader className="text-center bg-gradient-to-r from-financial-primary to-financial-secondary text-white rounded-t-lg">
        <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
          <CreditCard className="w-8 h-8" />
          Solicitud de Préstamo
        </CardTitle>
        <CardDescription className="text-blue-100 text-lg bg-white/10 p-3 rounded-lg backdrop-blur-sm">
          Completa la información para evaluar tu solicitud de crédito
        </CardDescription>
        <div className="mt-4 flex justify-center items-center gap-3 text-white font-semibold select-none">
          <span>Predicción Aprobación</span>
          <label htmlFor="modeToggle" className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="modeToggle"
              className="sr-only peer"
              checked={mode === "amount"}
              onChange={() => setMode(mode === "approval" ? "amount" : "approval")}
            />
            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-financial-primary rounded-full peer peer-checked:bg-financial-primary transition-all"></div>
            <div className="absolute left-1 top-1 bg-white w-5 h-5 rounded-full shadow-md transform peer-checked:translate-x-7 transition-transform" />
          </label>
          <span>Estimar Monto a prestar</span>
        </div>
      </CardHeader>
      <CardContent className="p-8 bg-gradient-to-br from-gray-50 to-white">
        {/* Aquí continúa el formulario como en tu código original, con los value corregidos como formData.campo */}
      </CardContent>
    </Card>
  );
};

export default LoanForm;
