import Navbar from "@/components/Navbar";
import BackgroundMesh from "@/components/BackgroundMesh";
import FeedbackModal from "@/components/FeedbackModal";

const Index = () => {
  return (
    <div className="min-h-screen bg-black relative selection:bg-primary/30">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full object-cover opacity-80"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src="/Video Editing Brownie Focus.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay to make text more readable */}
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply pointer-events-none" />
      </div>

      <Navbar />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-16">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-5xl mx-auto mt-8">
          <div className="animate-fade-up relative mb-8">
            <img
              src="/cocoa_and_crave.jpg"
              alt="Cocoa and Crave Logo"
              className="w-48 md:w-64 h-auto object-contain rounded-2xl drop-shadow-[0_0_25px_rgba(139,69,19,0.8)]"
            />
          </div>
          <p
            className="text-white/90 text-xl md:text-2xl text-center max-w-2xl mb-12 drop-shadow-md animate-fade-up"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            Decadent flavors, unforgettable experiences.
          </p>
          <div className="animate-fade-up" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
            <FeedbackModal />
          </div>
        </div>

        {/* About Section */}
        <section id="about" className="w-full max-w-5xl mx-auto py-24 px-6 md:px-12 backdrop-blur-md bg-black/40 rounded-3xl border border-white/10 mt-32 mb-12 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center drop-shadow-md">
            About Us
          </h2>
          <div className="max-w-3xl mx-auto text-white/90 text-base leading-relaxed space-y-6">
            <p>
              Cocoa & Crave, we believe in crafting the finest dessert experiences that tantalize your taste buds and leave you craving more. Our dedication to quality ingredients, precision, and masterful preparation is what truly sets us apart.
            </p>
            <p>
              Founded by a Food Technologist, Cocoa & Crave blends the science of food with the art of baking. Every product of ours is thoughtfully created with a deep understanding of ingredients, texture, and flavor balance. This scientific approach allows us to consistently deliver products that are rich, fudgy, and perfectly indulgent.
            </p>
            <p>
              We ensure that every bite reflects our commitment to purity and excellence.
            </p>
            <p>
              Whether you are looking for a simple sweet treat or an unforgettable dessert experience, Cocoa & Crave is your ultimate destination for handcrafted indulgence.
            </p>
            <div className="pt-4 border-t border-white/10 mt-6">
              <p className="font-semibold text-lg">Cocoa & Crave</p>
              <p className="text-white/70 italic mt-1">
                Crafted by a Food Technologist — because the finest ones are not just baked, they are engineered for perfection.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
