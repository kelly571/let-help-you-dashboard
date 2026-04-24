import React from 'react';
import { Navigation, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationButtonProps {
  lat?: number;
  lng?: number;
  label?: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ 
  lat = -1.3965, 
  lng = 36.7592,
  label = "Start" 
}) => {
  const handleNavigate = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  };

  return (
    <Button 
      onClick={handleNavigate}
      className="w-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold h-12 shadow-md rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 group"
    >
      <div className="bg-white/20 p-1.5 rounded-lg group-hover:bg-white/30 transition-colors">
        <Navigation className="h-4 w-4 text-white" />
      </div>
      <span className="tracking-wide uppercase text-xs">Navigate to Destination</span>
      <Map className="h-4 w-4 opacity-50 ml-auto hidden sm:block" />
    </Button>
  );
};

export default NavigationButton;