import Mockup from "../assets/images/raketnow-mockup.png";

function Hero() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#FFFFFF] via-[#FFF4ED] to-[#F9FAFB] flex items-start pt-20 pb-10">
      <div className="absolute top-20 left-10 w-48 h-48 bg-[#FF7C2B]/10 rounded-full blur-2xl -z-10" />

      <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        <div className="w-full md:w-1/2 text-center md:text-left flex flex-col items-center md:items-start">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0C2C57] mb-6">
            where your next <span className="text-[#FF7C2B]">raket</span> starts
            with us.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#0C2C57] mb-8 max-w-md">
            matching rakets with opportunities, all in one platform.
          </p>

          <div className="flex flex-col sm:flex-row sm:justify-center md:justify-start gap-4 w-full sm:w-auto">
            <a
              href="/signup"
              className="bg-[#FF7C2B] text-white font-semibold text-sm px-6 py-3 rounded-xl text-center hover:bg-[#fab489] hover:text-[#0C2C57] transition"
            >
              Be a Raketista
            </a>
            <a
              href="/login"
              className="bg-[#0C2C57] text-white font-semibold text-sm px-6 py-3 rounded-xl text-center hover:bg-[#576e8b] hover:text-[#FF7C2B] transition"
            >
              Match with a Raketista
            </a>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={Mockup}
            alt="Raketista illustration"
            className="max-w-[300px] sm:max-w-sm md:max-w-md w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
