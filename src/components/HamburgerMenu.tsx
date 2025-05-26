
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, FileText, History, BarChart3, Database } from "lucide-react";

interface HamburgerMenuProps {
  currentView: 'form' | 'history' | 'dataset';
  onViewChange: (view: 'form' | 'history' | 'dataset') => void;
}

const HamburgerMenu = ({ currentView, onViewChange }: HamburgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      id: 'form' as const,
      label: 'Formulario de Solicitud',
      icon: FileText,
      description: 'Realizar nueva evaluación'
    },
    {
      id: 'history' as const,
      label: 'Historial',
      icon: History,
      description: 'Ver predicciones anteriores'
    },
    {
      id: 'dataset' as const,
      label: 'Información del Dataset',
      icon: Database,
      description: 'Ver atributos y descripción'
    }
  ];

  const handleViewChange = (view: 'form' | 'history' | 'dataset') => {
    onViewChange(view);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 left-4 z-50 bg-white hover:bg-gray-50 border-gray-200 shadow-md"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 bg-white">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2 text-financial-dark">
            <BarChart3 className="w-6 h-6 text-financial-primary" />
            <span>CreditPredict</span>
          </SheetTitle>
        </SheetHeader>
        <div className="py-6">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={currentView === item.id ? "default" : "ghost"}
                className={`w-full justify-start h-auto p-4 ${
                  currentView === item.id 
                    ? "bg-blue-600 text-white hover:bg-financial-secondary" 
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleViewChange(item.id)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-bold text-financial-dark">{item.label}</div>
                  <div className={`text-sm ${
                    currentView === item.id ? "text-blue-100" : "text-gray 700"
                  }`}>
                   {item.description}
                  </div>
                </div>
              </Button>
            ))}
          </nav>
        </div>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-gradient-to-r from-financial-primary to-financial-secondary p-4 rounded-lg text-white">
            <h3 className="font-semibold mb-1">Sistema de IA</h3>
            <p className="text-sm text-blue-100">
              Predicción avanzada de créditos con análisis inteligente
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HamburgerMenu;
