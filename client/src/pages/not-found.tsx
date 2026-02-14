import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0A0F1C] text-white p-4">
      <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
        <AlertTriangle className="w-12 h-12 text-red-500" />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">404 Not Found</h1>
      <p className="text-slate-400 text-lg mb-8 text-center max-w-md">
        The page you're looking for seems to have vanished into the digital void.
      </p>

      <Link href="/" className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
        Return Home
      </Link>
    </div>
  );
}
