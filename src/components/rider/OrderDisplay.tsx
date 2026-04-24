import React from 'react';
import { Package, MapPin, User, Phone, LocateFixed, Compass, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import NavigationButton from './NavigationButton';

const OrderDisplay: React.FC = () => {
  const mapImage = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/map-placeholder-c8197679-1777022190923.webp";

  return (
    <div className="p-4 space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-extrabold tracking-tight">Active Deliveries</h2>
        <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">2 Orders Near You</Badge>
      </div>
      
      {[1, 2].map((order) => (
        <Card key={order} className="overflow-hidden border-none shadow-xl ring-1 ring-slate-200">
          {/* Google Maps Style Header / Map Preview */}
          <div className="relative h-48 w-full group overflow-hidden">
            <img 
              src={mapImage} 
              alt="Map Preview" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            
            {/* Map Pin Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-blue-500/20 rounded-full animate-ping" />
                <div className="bg-white p-1 rounded-full shadow-lg relative z-10 border-2 border-blue-600">
                  <MapPin className="h-6 w-6 text-blue-600 fill-blue-50" />
                </div>
              </div>
            </div>

            {/* Floating Quick Info */}
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge className="bg-white/90 text-slate-900 border-none backdrop-blur-sm shadow-sm flex gap-1 items-center px-2 py-1">
                <LocateFixed className="h-3 w-3 text-blue-600" />
                2.4 km away
              </Badge>
            </div>
          </div>

          <CardContent className="p-0">
            {/* Order Info Bar */}
            <div className="px-5 py-4 flex items-center justify-between border-b bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg shadow-sm ring-1 ring-slate-200">
                  <Package className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Order #DK-100{order}</h3>
                  <p className="text-xs text-slate-500">Scheduled for 10:30 AM</p>
                </div>
              </div>
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100">Ready</Badge>
            </div>

            {/* Destination Info Card (Google Maps Style) */}
            <div className="p-5 space-y-5">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-blue-600 p-2 rounded-full">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-slate-900 leading-tight">Maasai Mall, Rongai</p>
                    <button className="text-slate-400 hover:text-slate-600">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-sm text-slate-600 mt-1 italic">"Enter through the main gate, second building on your right."</p>
                  
                  {/* Coordinates & Landmark Row */}
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Coordinates</p>
                      <p className="text-xs font-mono font-medium text-blue-700 mt-1">-1.3965, 36.7592</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Landmark</p>
                      <p className="text-xs font-medium text-slate-700 mt-1 truncate">Near Shell Station</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Row */}
              <div className="flex items-center justify-between bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center border-2 border-white shadow-sm">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 leading-none">John Kamau</p>
                    <div className="flex items-center gap-1 text-blue-600 mt-1">
                      <Phone className="h-3 w-3" />
                      <span className="text-xs font-semibold">0712 XXX XXX</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-white text-blue-600 shadow-sm hover:bg-blue-600 hover:text-white transition-colors">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-5 pt-0 flex gap-3">
            <div className="flex-1">
              <NavigationButton />
            </div>
            <Button variant="outline" className="px-6 border-slate-200 hover:bg-slate-50 font-semibold h-12 rounded-xl">
              Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default OrderDisplay;