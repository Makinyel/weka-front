import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, User, GraduationCap, DollarSign, Calendar, CreditCard, Home, Building, Gem, Banknote } from "lucide-react";

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
          <span>Monto a Prestar</span>
        </div>
      </CardHeader>

      <CardContent className="p-8 bg-gradient-to-br from-gray-50 to-white">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Información Personal */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-6 h-6 text-financial-primary" />
              <h3 className="text-xl font-semibold text-financial-dark">Información Personal</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <Label htmlFor="noOfDependents" className="text-financial-dark font-semibold text-sm">
                  Número de Dependientes
                </Label>
                <Input
                  id="noOfDependents"
                  type="number"
                  placeholder="Ej: 2"
                  min={0}
                  max={10}
                  value={formData.noOfDependents || ""}
                  onChange={(e) => handleInputChange("noOfDependents", parseInt(e.target.value) || 0)}
                  className="h-12 text-lg border-2 border-financial-primary/30 focus:border-financial-primary bg-white shadow-sm transition-all duration-200 hover:shadow-md focus:shadow-lg placeholder:text-gray-500 placeholder:font-medium"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="education" className="text-financial-dark font-semibold text-sm flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Nivel de Educación
                </Label>
                <Select
                  value={formData.education}
                  onValueChange={(value) => handleInputChange("education", value)}
                >
                  <SelectTrigger className="h-12 text-lg border-2 border-financial-primary/30 focus:border-financial-primary bg-white shadow-sm transition-all duration-200 hover:shadow-md focus:shadow-lg">
                    <SelectValue placeholder="Selecciona tu nivel educativo" className="text-gray-500 font-medium" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-financial-primary/30 shadow-xl z-50">
                    <SelectItem value="Graduate" className="text-lg py-3 hover:bg-financial-primary/10">
                      Graduado Universitario
                    </SelectItem>
                    <SelectItem value="Not Graduate" className="text-lg py-3 hover:bg-financial-primary/10">
                      No Graduado
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="selfEmployed" className="text-financial-dark font-semibold text-sm">
                  ¿Trabajas por cuenta propia?
                </Label>
                <Select
                  value={formData.selfEmployed}
                  onValueChange={(value) => handleInputChange("selfEmployed", value)}
                >
                  <SelectTrigger className="h-12 text-lg border-2 border-financial-primary/30 focus:border-financial-primary bg-white shadow-sm transition-all duration-200 hover:shadow-md focus:shadow-lg">
                    <SelectValue placeholder="Selecciona una opción" className="text-gray-500 font-medium" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-financial-primary/30 shadow-xl z-50">
                    <SelectItem value="YES" className="text-lg py-3 hover:bg-financial-primary/10">
                      Sí, soy independiente
                    </SelectItem>
                    <SelectItem value="NO" className="text-lg py-3 hover:bg-financial-primary/10">
                      No, soy empleado
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Información Financiera */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex items-center gap-2 mb-6">
              <DollarSign className="w-6 h-6 text-financial-primary" />
              <h3 className="text-xl font-semibold text-financial-dark">Información Financiera</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mode === "approval" && (
                <div className="space-y-3">
                  <Label htmlFor="incomeAnnum" className="text-financial-dark font-semibold text-sm">
                    Ingresos Anuales ($)
                  </Label>
                  <Input
                    id="incomeAnnum"
                    type="number"
                    placeholder="Ej: 2,000,000"
                    value={formData.incomeAnnum || ""}
                    onChange={(e) => handleInputChange("incomeAnnum", parseFloat(e.target.value) || 0)}
                    className="h-12 text-lg border-2 border-financial-primary/30 focus:border-financial-primary bg-white shadow-sm transition-all duration-200 hover:shadow-md focus:shadow-lg placeholder:text-gray-500 placeholder:font-medium"
                  />
                </div>
              )}

              <div className="space-y-3">
                <Label htmlFor="loanAmount" className="text-financial-dark font-semibold text-sm">
                  Monto del Préstamo ($)
                </Label>
                <Input
                  id="loanAmount"
                  type="number"
                  placeholder="Ej: 500,000"
                  value={formData.loanAmount || ""}
                  onChange={(e) => handleInputChange("loanAmount", parseFloat(e.target.value) || 0)}
                  className="h-12 text-lg border-2 border-financial-primary/30 focus:border-financial-primary bg-white shadow-sm transition-all duration-200 hover:shadow-md focus:shadow-lg placeholder:text-gray-500 placeholder:font-medium"
                  disabled={mode === "amount"}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="loanTerm" className="text-financial-dark font-semibold text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Plazo (años)
                </Label>
                <Input
                  id="loanTerm"
                  type="number"
                  placeholder="Ej: 10"
                  min={1}
                  max={30}
                  value={formData.loanTerm || ""}
                  onChange={(e) => handleInputChange("loanTerm", parseInt(e.target.value) || 0)}
                  className="h-12 text-lg border-2 border-financial-primary/30 focus:border-financial-primary bg-white shadow-sm transition-all duration-200 hover:shadow-md focus:shadow-lg placeholder:text-gray-500 placeholder:font-medium"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="cibilScore" className="text-financial-dark font-semibold text-sm flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Puntaje CIBIL
                </Label>
                <Input
                  id="cibilScore"
                  type="number"
                  placeholder="Ej: 700"
                  min={300}
                  max={900}
                  value={formData.cibilScore || ""}
                  onChange={(e) => handleInputChange("cibilScore", parseInt(e.target.value) || 300)}
                  className="h-12 text-lg border-2 border-financial-primary/30 focus:border-financial-primary bg-white shadow-sm transition-all duration-200 hover:shadow-md focus:shadow-lg placeholder:text-gray-500 placeholder:font-medium"
                />
              </div>
            </div>
          </div>
          
          {/* Activos y Patrimonio */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex items-center gap-2 mb-6">
              <Building className="w-6 h-6 text-financial-primary" />
              <h3 className="text-xl font-semibold text-financial-dark">Activos y Patrimonio</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="residentialAssetsValue" className="text-financial-dark font-semibold text-sm flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Activos Residenciales ($)
                </Label>
                <Input
                  id="residentialAssetsValue"
                  type="number"
                  placeholder="Ej: 1,000,000"
                  value={formData.residentialAssetsValue || ""}
                  onChange={(e) => handleInputChange("residentialAssetsValue", parseFloat(e.target.value) || 0)}
                  className="h-12 text-lg border-2 border-financial-primary/30 focus:border-financial-primary bg-white shadow-sm transition-all duration-200 hover:shadow-md focus:shadow-lg placeholder:text-gray-500 placeholder:font-medium"
                  
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="commercialAssetsValue" className="text-financial-dark font-semibold text-sm flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Activos Comerciales ($)
                </Label>
                <Input
                  id="commercialAssetsValue"
                  type="number"
                  placeholder="Ej: 500,000"
                  value={formData.commercialAssetsValue || ""}
                  onChange={(e) => handleInputChange("commercialAssetsValue", parseFloat(e.target.value) || 0)}
                  className="h-12 text-lg border-2 border-financial-primary/30 focus:border-financial-primary bg-white shadow-sm transition-all duration-200 hover:shadow-md focus:shadow-lg placeholder:text-gray-500 placeholder:font-medium"
                  
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="luxuryAssetsValue" className="text-financial-dark font-semibold text-sm flex items-center gap-2">
                  <Gem className="w-4 h-4" />
                  Activos de Lujo ($)
                </Label>
                <Input
                  id="luxuryAssetsValue"
                  type="number"
                  placeholder="Ej: 100,000"
                  value={formData.luxuryAssetsValue || ""}
                  onChange={(e) => handleInputChange("luxuryAssetsValue", parseFloat(e.target.value) || 0)}
                  className="h-12 text-lg border-2 border-financial-primary/30 focus:border-financial-primary bg-white shadow-sm transition-all duration-200 hover:shadow-md focus:shadow-lg placeholder:text-gray-500 placeholder:font-medium"
                  
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="bankAssetValue" className="text-financial-dark font-semibold text-sm flex items-center gap-2">
                  <Banknote className="w-4 h-4" />
                  Activos Bancarios ($)
                </Label>
                <Input
                  id="bankAssetValue"
                  type="number"
                  placeholder="Ej: 250,000"
                  value={formData.bankAssetValue || ""}
                  onChange={(e) => handleInputChange("bankAssetValue", parseFloat(e.target.value) || 0)}
                  className="h-12 text-lg border-2 border-financial-primary/30 focus:border-financial-primary bg-white shadow-sm transition-all duration-200 hover:shadow-md focus:shadow-lg placeholder:text-gray-500 placeholder:font-medium"
                  
                />
              </div>
            </div>
          </div>

          {/* Botón de envío */}
          <div className="pt-6">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-16 bg-gradient-to-r from-financial-primary to-financial-secondary hover:from-financial-secondary hover:to-financial-primary text-white text-xl font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                  Evaluando solicitud...
                </>
              ) : (
                <>
                  <Send className="w-6 h-6 mr-3" />
                  {mode === "approval" ? "Evaluar Préstamo" : "Predecir Monto"}
                </>
              )}
            </Button>
          </div>

          {
          }

        </form>
      </CardContent>
    </Card>
  );
};

export default LoanForm;
