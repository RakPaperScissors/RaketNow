import { useState } from 'react';
import logo from '../assets/images/raketnow-white-logo.png';

function Footer() {
    const [open, setOpen] = useState({
        categories: false,
        support: false,
        company: false,
    });

    const toggle = (section) => {
        setOpen((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <footer className="bg-[#0C2C57] text-sm text-white">
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
                <div className="flex flex-col items-start space-y-4">
                    <img src={logo} alt="RaketNow Logo" className="h-20 w-auto" />
                    <p className="text-gray-300 whitespace-nowrap text-lg lg:text-xl mb-7">
                        where your next raket starts with us!
                    </p>
                </div>

                <div className="md:col-span-2 lg:col-span-3 flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 md:space-x-12 md:ml-40">
                    <div className="w-full">
                        <button
                            onClick={() => toggle('categories')}
                            className="w-full flex justify-between items-center font-semibold mb-3 md:hidden"
                        >
                            Categories <span>{open.categories ? '−' : '+'}</span>
                        </button>
                        <h3 className="hidden md:block font-semibold mb-3">Categories</h3>

                        <ul
                            className={`space-y-3 text-gray-300 ${open.categories ? 'block' : 'hidden'
                                } md:block`}
                        >
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

                    <div className="w-full">
                        <button
                            onClick={() => toggle('support')}
                            className="w-full flex justify-between items-center font-semibold mb-3 md:hidden"
                        >
                            Support <span>{open.support ? '−' : '+'}</span>
                        </button>
                        <h3 className="hidden md:block font-semibold mb-3">Support</h3>

                        <ul
                            className={`space-y-2 text-gray-300 ${open.support ? 'block' : 'hidden'
                                } md:block`}
                        >
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">FAQs</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Data Privacy</a></li>
                            <li><a href="#">Report a Problem</a></li>
                        </ul>
                    </div>

                    <div className="w-full">
                        <button
                            onClick={() => toggle('company')}
                            className="w-full flex justify-between items-center font-semibold mb-3 md:hidden"
                        >
                            Company <span>{open.company ? '−' : '+'}</span>
                        </button>
                        <h3 className="hidden md:block font-semibold mb-3">Company</h3>

                        <ul
                            className={`space-y-2 text-gray-300 ${open.company ? 'block' : 'hidden'
                                } md:block`}
                        >
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
