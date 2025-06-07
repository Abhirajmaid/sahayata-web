const ImpactSection = () => {
  return (
    <section className="py-12 border-b border-brand-gray w-[70%] mx-auto">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-heading mb-4">Your Impact</h2>
        <p className="text-lg w-[50%] text-body mb-8">
          Every contribution helps us provide food, education, and healthcare to
          those who need it most. Join us in making a difference!
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card p-6 bg-white/80 shadow-lg">
            <h3 className="text-sub mb-2 text-brand-primary">5000+</h3>
            <p className="text-body">Meals served monthly</p>
          </div>
          <div className="card p-6 bg-white/80 shadow-lg">
            <h3 className="text-sub mb-2 text-brand-primary">1200+</h3>
            <p className="text-body">Children educated</p>
          </div>
          <div className="card p-6 bg-white/80 shadow-lg">
            <h3 className="text-sub mb-2 text-brand-primary">50+</h3>
            <p className="text-body">Medical camps organized</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
