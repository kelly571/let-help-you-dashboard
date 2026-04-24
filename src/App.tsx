import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import ProductCatalog from './components/customer/ProductCatalog';
import Checkout from './components/customer/Checkout';
import OrderDisplay from './components/rider/OrderDisplay';
import RealTimeAlert from './components/admin/RealTimeAlert';
import NavigationButton from './components/rider/NavigationButton';
import { Toaster } from 'sonner';
import { LayoutDashboard, ShoppingCart, Truck, Bell, Share2, Download, Smartphone, Package, Info } from 'lucide-react';
import { Button } from './components/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";

function Navbar({ onOpenDownload }: { onOpenDownload: () => void }) {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Shop', icon: ShoppingCart },
    { path: '/rider', label: 'Delivery', icon: Truck },
    { path: '/admin', label: 'Monitor', icon: Bell },
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'DEKEMEDS',
        text: 'Order your favorite drinks and smokes on DEKEMEDS!',
        url: window.location.href,
      }).catch(() => {
        toast.info('Link copied to clipboard!');
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 p-1.5 rounded-xl shadow-lg shadow-emerald-200">
            <div className="h-5 w-5 border-2 border-white rounded-md flex items-center justify-center font-black text-[10px] text-white">
              D
            </div>
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tighter text-slate-900 leading-none">DEKEMEDS</h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-black uppercase text-emerald-600 tracking-widest">Market Live</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <nav className="hidden sm:flex bg-slate-100 p-1 rounded-2xl">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-tight transition-all flex items-center gap-2 ${
                    isActive 
                      ? 'bg-white text-emerald-600 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          
          <div className="flex gap-1">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-xl h-10 w-10 border-slate-200 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
              onClick={onOpenDownload}
            >
              <Download className="h-4 w-4" />
            </Button>

            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-xl h-10 w-10 border-slate-200 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Nav */}
      <div className="sm:hidden px-4 pb-3 flex gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex-1 flex flex-col items-center py-2 rounded-xl transition-all ${
                isActive 
                  ? 'bg-emerald-50 text-emerald-700' 
                  : 'text-slate-400'
              }`}
            >
              <Icon className="w-4 h-4 mb-1" />
              <span className="text-[9px] font-black uppercase tracking-tighter">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
}

function CustomerView() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 p-8 rounded-[2rem] text-white relative overflow-hidden shadow-2xl shadow-emerald-100">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full mb-4">
            <Package className="h-3 w-3" />
            <span className="text-[10px] font-black uppercase tracking-widest">Local Static Version</span>
          </div>
          <h2 className="text-3xl font-black tracking-tighter mb-2 leading-tight">
            Swift Delivery to <br /> Your Doorstep.
          </h2>
          <p className="text-emerald-50 text-sm max-w-[200px] leading-snug font-medium">
            Liquor, smokes, and essentials delivered in under 20 minutes.
          </p>
        </div>
        <div className="absolute -right-8 -bottom-8 opacity-20 transform rotate-12">
          <ShoppingCart size={200} />
        </div>
      </div>
      
      <section>
        <ProductCatalog />
      </section>
      
      <section>
        <Checkout />
      </section>
    </div>
  );
}

function RiderView() {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-blue-50/50 p-6 rounded-[2rem] border border-blue-100 shadow-xl shadow-blue-50">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <Truck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">Rider Portal</h2>
            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">Active Shipments</p>
          </div>
        </div>
        <OrderDisplay />
        <div className="mt-8 max-w-md">
          <NavigationButton />
        </div>
      </div>
    </div>
  );
}

function AdminView({ onOpenDownload }: { onOpenDownload: () => void }) {
  return (
    <div className="space-y-6 animate-in zoom-in-95 duration-500">
      <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-2xl overflow-hidden relative">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-tight">Admin Console</h2>
              <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">System Management</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <span className="text-[10px] text-slate-500 block mb-1 font-black uppercase">System Status</span>
              <span className="text-emerald-400 font-black text-sm uppercase">Operational</span>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <span className="text-[10px] text-slate-500 block mb-1 font-black uppercase">Active Riders</span>
              <span className="text-white font-black text-sm uppercase">24 Online</span>
            </div>
          </div>
          
          <div className="space-y-3">
             <Button 
               variant="outline" 
               className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl justify-between px-6 py-6"
               onClick={onOpenDownload}
             >
               <div className="flex items-center gap-3">
                 <Download className="h-4 w-4 text-emerald-400" />
                 <span className="text-[11px] font-black uppercase">App Distribution Info</span>
               </div>
               <Info className="h-3 w-3 text-slate-500" />
             </Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <LayoutDashboard size={180} />
        </div>
      </div>
      <RealTimeAlert />
    </div>
  );
}

function AppContent() {
  const [showDownloadInfo, setShowDownloadInfo] = useState(false);

  return (
    <div className="min-h-screen bg-[#fcfcfd] text-slate-900 pb-32">
      <Navbar onOpenDownload={() => setShowDownloadInfo(true)} />
      
      <main className="container mx-auto max-w-4xl py-8 px-4">
        <Routes>
          <Route path="/" element={<CustomerView />} />
          <Route path="/rider" element={<RiderView />} />
          <Route path="/admin" element={<AdminView onOpenDownload={() => setShowDownloadInfo(true)} />} />
        </Routes>
      </main>

      <footer className="fixed bottom-0 w-full bg-white/80 backdrop-blur-xl border-t border-slate-100 p-5 text-center z-40">
        <div className="flex flex-col items-center gap-1.5">
          <button 
            onClick={() => setShowDownloadInfo(true)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="font-black text-[11px] text-slate-900 uppercase tracking-tighter">DEKEMEDS LIVE v2.0</span>
          </button>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Deployment: <span className="text-emerald-600">Secure Static Bundle</span>
          </span>
        </div>
      </footer>

      <Dialog open={showDownloadInfo} onOpenChange={setShowDownloadInfo}>
        <DialogContent className="sm:max-w-md rounded-[2.5rem] p-8 border-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black tracking-tight flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-xl">
                <Download className="h-5 w-5 text-emerald-600" />
              </div>
              Download App
            </DialogTitle>
            <DialogDescription className="text-slate-500 font-medium text-base pt-2">
              This application is designed as a portable static bundle. Install it for the best experience.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-6">
            <div className="flex items-start gap-4 p-5 bg-emerald-50 rounded-3xl border border-emerald-100">
              <div className="bg-white p-2 rounded-xl shadow-sm">
                <Smartphone className="h-5 w-5 text-emerald-600 shrink-0" />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900 uppercase tracking-tight">On Mobile</p>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Tap <span className="font-bold text-slate-900">"Share"</span> then 
                  <span className="mx-1 px-1.5 py-0.5 bg-white rounded-md border font-bold text-emerald-700">"Add to Home Screen"</span>. 
                  It works offline!
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-slate-50 rounded-3xl border border-slate-100">
              <div className="bg-white p-2 rounded-xl shadow-sm">
                <Package className="h-5 w-5 text-slate-600 shrink-0" />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Offline Bundle</p>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  The website is fully contained in the <code>dist</code> folder. Open <code>index.html</code> to run it anywhere.
                </p>
              </div>
            </div>
          </div>
          <Button 
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl py-7 shadow-xl shadow-slate-200"
            onClick={() => setShowDownloadInfo(false)}
          >
            Got it, thanks!
          </Button>
        </DialogContent>
      </Dialog>

      <Toaster position="top-center" expand={false} richColors closeButton />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;