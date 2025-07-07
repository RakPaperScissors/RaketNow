import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
    {
        question: 'What is RaketNow?',
        answer:
            'RaketNow is a platform that connects clients with skilled freelancers, also known as “Raketistas,” for a wide range of services. Clients can find help for various tasks, while Raketistas can showcase their skills and get hired for gigs.',
    },
    {
        question: 'How do I find a Raketista?',
        answer:
            'Clients can browse categories, check Raketista profiles, and directly reach out for services. Ratings and past jobs help in making informed choices.',
    },
    {
        question: 'How do I sign up as a Raketista?',
        answer:
            'You can sign up as a Raketista by creating an account and selecting your skillsets. Add a bio, upload photos of past work, and optionally upload certifications for verification. You can also sign up for multiple service categories.',
    },
    {
        question: 'How are payments handled?',
        answer:
            'RaketNow does not hold or process payments. All transactions happen directly between the client and the Raketista.',
    },
    {
        question: 'Is RaketNow safe to use?',
        answer:
            'Yes. Raketistas can showcase verified certifications, government IDs, and client ratings. Clients can also leave feedback for future users.',
    },
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="w-full bg-[#F9FAFB]">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-12 text-[#0C2C57]">
                <div className="flex flex-col-reverse lg:flex-row-reverse lg:justify-between gap-10">
                    {/* Dropdowns */}
                    <div className="flex-1 space-y-5">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`rounded-xl p-3.5 shadow-sm transition-all duration-300 bg-white`}
                            >
                                <button
                                    onClick={() => toggle(index)}
                                    className="w-full flex justify-between items-center text-left font-medium"
                                >
                                    {faq.question}
                                    {openIndex === index ? (
                                        <ChevronUp className="w-5 h-5 text-[#FF7C2B]" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-[#FF7C2B]" />
                                    )}
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <p className="text-sm text-gray-700">{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-[#FF7C2B] mb-2">Frequently Asked Questions</p>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            frequently asked <span className="text-[#FF7C2B]">RaketNow</span> questions
                        </h2>
                        <p className="text-base text-gray-500 mb-8">
                            Check out some common questions and answers about RaketNow.
                        </p>

                        <a
                            href="/faqs"
                            className="inline-block border-1 border-[#0C2C57] text-[#0C2C57] font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-[#0C2C57] hover:text-white active:scale-95 transition-colors duration-300"
                        >
                            View Full FAQs
                        </a>
                    </div>



                </div>
            </div>
        </section>
    );
};

export default FAQSection;
