import React from 'react';
import { Bell, AlertCircle, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const RealTimeAlert: React.FC = () => {
  return (
    <div className="fixed top-4 right-4 z-50 w-full max-w-sm animate-bounce">
      <Alert className="bg-red-600 border-none text-white shadow-2xl ring-4 ring-red-400">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-6 w-6" />
          <div className="flex-1">
            <AlertTitle className="text-lg font-black tracking-tight flex items-center gap-2">
              NEW ORDER RECEIVED!
              <Bell className="h-4 w-4 animate-ping" />
            </AlertTitle>
            <AlertDescription className="text-white/90">
              Check Dashboard immediately. Payment confirmation pending.
            </AlertDescription>
            <div className="mt-4 flex gap-2">
              <Button size="sm" className="bg-white text-red-600 hover:bg-slate-100 font-bold">
                Assign Rider
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:bg-red-700 p-0 h-auto">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </Alert>
    </div>
  );
};

export default RealTimeAlert;