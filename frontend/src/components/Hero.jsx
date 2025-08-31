import Mockup from "../assets/images/raketnow-mockup.png";

function Hero() {
  return (
    <div className="relative min-h-[80vh] lg:min-h-[60vh] bg-gradient-to-b from-[#FFFFFF] via-[#FFF4ED] to-[#F9FAFB] flex items-center overflow-hidden py-20">
      {/* Background Glow */}
      <div className="absolute top-20 left-10 w-48 h-48 bg-[#FF7C2B]/10 rounded-full blur-2xl -z-10" />

      {/* Hero Content */}
      <div className="max-w-[95vw] xl:max-w-[1280px] mx-auto px-6 flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-16 w-full">
        
        {/* Text Section */}
        <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start">
          <h1 className="font-extrabold tracking-tight text-[#0C2C57] mb-6 leading-tight text-[clamp(1.8rem,4vw,3.5rem)]">
            where your next <span className="text-[#FF7C2B]">raket</span> starts
            with us.
          </h1>
          <p className="text-[clamp(1rem,1.5vw,1.25rem)] text-[#0C2C57] mb-8 max-w-[40ch] lg:max-w-none">
            matching rakets with opportunities, all in one platform.
          </p>

          <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4 w-full sm:w-auto">
            <a
              href="/signup"
              className="bg-[#FF7C2B] text-white font-semibold text-[clamp(0.85rem,1vw,1rem)] px-6 py-3 rounded-xl text-center hover:bg-[#fab489] hover:text-[#0C2C57] transition"
            >
              Be a Raketista
            </a>
            <a
              href="/login"
              className="bg-[#0C2C57] text-white font-semibold text-[clamp(0.85rem,1vw,1rem)] px-6 py-3 rounded-xl text-center hover:bg-[#576e8b] hover:text-[#FF7C2B] transition"
            >
              Match with a Raketista
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={Mockup}
            alt="Raketista illustration"
            className="w-[clamp(280px,40vw,520px)] h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
