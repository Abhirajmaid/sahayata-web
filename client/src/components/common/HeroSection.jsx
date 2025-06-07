import { Home, ChevronRight } from "lucide-react";

const HeroSection = ({ title, breadcrumb }) => {
  return (
    <section className="relative h-96 pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-primary to-brand-secondary">
        {/* Blob Animations */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="animate-pulse absolute top-10 left-10 w-32 h-32 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
            <div className="animate-pulse absolute top-20 right-20 w-40 h-40 bg-red-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animation-delay-2000"></div>
            <div className="animate-pulse absolute bottom-20 left-1/3 w-36 h-36 bg-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animation-delay-4000"></div>
          </div>
        </div>

        {/* Flowing shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -left-10 w-80 h-80 bg-red-600 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
          <div className="absolute -top-10 -right-10 w-80 h-80 bg-red-800 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-10 left-20 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative z-10 h-full flex items-center justify-start px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl px-6 mx-auto w-full">
          <h1 className="text-heading text-white mb-6">{title}</h1>
        </div>
      </div>

      {breadcrumb && (
        <div className="absolute bottom-6 right-6 z-10">
          <div className="badge badge-primary">
            <Home className="w-4 h-4" />
            <ChevronRight className="w-4 h-4" />
            <span>{breadcrumb}</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
