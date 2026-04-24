import React from 'react';
import { MapPin, CreditCard, Send, LocateFixed, Navigation2, ShoppingBag, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Checkout: React.FC = () => {
  // Sample order updated to reflect new catalog items
  const orderItems = [
    { name: 'Johnnie Walker Black Label (750ml)', price: 4800 },
    { name: 'Jameson Irish Whiskey (750ml)', price: 3200 },
    { name: 'Tusker Lager (500ml)', price: 210 },
    { name: 'Savanna Dry Cider (500ml)', price: 250 },
    { name: 'Embassy Kings (Full Pack)', price: 500 },
  ];

  const totalAmount = orderItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-4 max-w-lg mx-auto space-y-6">
      <Card className="overflow-hidden border-none shadow-xl ring-1 ring-slate-200">
        <CardHeader className="bg-slate-50 border-b">
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <div className="bg-emerald-100 p-2 rounded-lg">
              <MapPin className="h-5 w-5 text-emerald-600" />
            </div>
            Delivery Destination
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Search Address</Label>
              <div className="relative">
                <Input id="address" placeholder="e.g. 123 Ngong Road" className="pl-10 h-12 border-slate-200 focus:ring-blue-500 focus:border-blue-500 rounded-xl" />
                <Navigation2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="landmark" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Landmark / Instructions</Label>
              <Input id="landmark" placeholder="e.g., Near Maasai Mall, Blue Gate" className="h-12 border-slate-200 focus:ring-blue-500 focus:border-blue-500 rounded-xl" />
            </div>
          </div>

          <div className="pt-2">
            <Button 
              variant="outline" 
              className="w-full h-14 border-blue-200 text-blue-600 hover:bg-blue-50 font-bold rounded-xl flex items-center justify-center gap-2 border-2"
            >
              <LocateFixed className="h-5 w-5" />
              Use My Current GPS Location
            </Button>
            <p className="text-[10px] text-center text-slate-400 mt-2 italic font-medium">
              We'll use your exact coordinates for faster delivery
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-xl ring-1 ring-slate-200 bg-white overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b">
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <div className="bg-emerald-100 p-2 rounded-lg">
              <ShoppingBag className="h-5 w-5 text-emerald-600" />
            </div>
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-3">
          {orderItems.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-sm font-medium">
              <span className="text-slate-600">{item.name}</span>
              <span className="text-slate-900">Ksh {item.price.toLocaleString()}</span>
            </div>
          ))}
          <div className="border-t pt-3 mt-3 flex justify-between items-center">
            <span className="text-base font-bold text-slate-900">Total Amount</span>
            <span className="text-xl font-black text-emerald-600">Ksh {totalAmount.toLocaleString()}.00</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-xl ring-1 ring-emerald-100 bg-white">
        <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
          <CardTitle className="flex items-center gap-2 text-emerald-900 text-lg">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            Payment Confirmation
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-5">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-slate-500">M-PESA SEND MONEY</span>
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none">Primary</Badge>
            </div>
            <div className="flex items-center gap-3">
               <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
                 <Smartphone className="h-6 w-6 text-emerald-600" />
               </div>
               <div>
                 <p className="text-2xl font-black text-slate-900 tracking-tight">0726107003</p>
                 <p className="text-xs text-slate-600 font-medium uppercase tracking-tight">Recipient: Kelly Mwendwa</p>
               </div>
            </div>
            <p className="text-[10px] text-slate-400 mt-3 font-medium uppercase tracking-widest">
              Instruction: Send money via M-Pesa to 0726107003 (Kelly Mwendwa)
            </p>
          </div>

          <Button className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all active:scale-[0.98]">
            <Send className="mr-2 h-5 w-5" /> I have Sent Money
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Checkout;