import logo from '../assets/images/raketnow-white-logo.png';

function Footer() {
    return (
        <footer className="bg-[#0C2C57] text-sm text-white">
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

                <div className="flex flex-col items-start space-y-4 ">
                    <img
                        src={logo}
                        alt="RaketNow Logo"
                        className="h-20 w-auto"
                    />
                    <p className="text-gray-300 whitespace-nowrap text-lg lg:text-xl mb-7">
                        where your next raket starts with us!
                    </p>

                    <div className="flex flex-wrap sm:flex-nowrap space-x-4">
                        <a
                            href="/signup"
                            className="whitespace-nowrap bg-[#FF7C2B] text-[#0C2C57] font-semibold text-sm px-6 py-2 rounded-xl hover:bg-gray-200 transition"
                        >
                            Be a Raketista
                        </a>
                        <a
                            href="/login"
                            className="whitespace-nowrap border border-white text-white font-semibold text-sm px-6 py-2 rounded-xl hover:bg-white hover:text-[#0C2C57] transition"
                        >
                            Match with a Raketista
                        </a>
                    </div>
                </div>

                <div className="col-span-3 flex justify-between space-x-12 ml-50">

                    <div>
                        <h3 className="font-semibold mb-3">Categories</h3>
                        <ul className="space-y-3 text-gray-300">
                            <li><a href="#">Home Repairs & Maintenance</a></li>
                            <li><a href="#">Tech & Electronics Support</a></li>
                            <li><a href="#">Personal & Home Care</a></li>
                            <li><a href="#">Events & Entertainment</a></li>
                            <li><a href="#">Food & Beverage</a></li>
                            <li><a href="#">Education & Tutoring</a></li>
                            <li><a href="#">Graphic & Digital Design</a></li>
                            <li><a href="#">Business & Professional Services</a></li>
                            <li><a href="#">Automotive Services</a></li>
                            <li><a href="#">Moving & Delivery Services</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-3">Support</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">FAQs</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Data Privacy</a></li>
                            <li><a href="#">Report a Problem</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-3">Company</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li><a href="#">About RaketNow</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>

                </div>

            </div>

        </footer>
    );
}

export default Footer;
