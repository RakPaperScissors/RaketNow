import { useState } from 'react';
import logo from '../assets/images/raketnow-white-logo.png';
import TOSModal from './TOSModal';

function Footer() {
    const [open, setOpen] = useState({
        categories: false,
        support: false,
        company: false,
    });

    const toggle = (section) => {
        setOpen((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const [showTOS, setShowTOS] = useState(false);

    return (
        <footer className="bg-[#0C2C57] text-sm text-white ">
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
                            
                            <li className="hover:text-white transition-colors duration-200 cursor-pointer">Home Repairs & Maintenance</li>
                            <li className="hover:text-white transition-colors duration-200 cursor-pointer">Tech & Electronics</li>
                            <li className="hover:text-white transition-colors duration-200 cursor-pointer">Personal & Home Care</li>
                            <li className="hover:text-white transition-colors duration-200 cursor-pointer">Events & Entertainment</li>
                            <li className="hover:text-white transition-colors duration-200 cursor-pointer">Food & Beverage</li>
                            <li className="hover:text-white transition-colors duration-200 cursor-pointer">Education and Tutoring</li>
                            <li className="hover:text-white transition-colors duration-200 cursor-pointer">Graphic & Digital Design</li>
                            <li className="hover:text-white transition-colors duration-200 cursor-pointer">Business & Professional Services</li>
                            <li className="hover:text-white transition-colors duration-200 cursor-pointer">Automotive Services</li>
                            <li className="hover:text-white transition-colors duration-200 cursor-pointer">Moving & Delivery Services</li>
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
                            <li><a href="/Faqs"className="hover:text-white transition-colors duration-200">FAQs</a></li>
                            <li><button onClick={() => setShowTOS(true)} className="hover:text-white transition-colors duration-200">Terms of Service</button></li>
                            {showTOS && <TOSModal onClose={() => setShowTOS(false)} />}
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
                            <li><a href="/about" className="hover:text-white transition-colors duration-200">About RaketNow</a></li>
                            <li><a href="/about" className="hover:text-white transition-colors duration-200">Contact Us</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
