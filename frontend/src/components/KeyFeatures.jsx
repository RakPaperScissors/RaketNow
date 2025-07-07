import React from 'react';
import {
    LayoutGrid,
    Hammer,
    Star,
    BadgeCheck,
    FolderOpen,
    MapPinned,
} from 'lucide-react';

const features = [
    { icon: LayoutGrid, label: 'A centralized space for service-based freelancers' },
    { icon: Hammer, label: 'Non-digital/manual labor services support' },
    { icon: Star, label: 'Trusted ratings and reviews for clients' },
    { icon: BadgeCheck, label: 'Skill certifications display' },
    { icon: FolderOpen, label: 'Portfolios and job history' },
    { icon: MapPinned, label: 'A focus on local Filipino Talent' },
];

const FeatureCard = ({ icon: Icon, label, bgColor = '#F5F5F5', iconColor = '#0C2C57' }) => {
    return (
        <div className="flex flex-col items-center justify-start w-40 h-44 border border-gray-200 bg-white rounded-xl p-4 text-center">
            <div
                className="flex items-center justify-center w-10 h-10 rounded-full mb-4 mt-2"
                style={{ backgroundColor: bgColor }}
            >
                <Icon className="w-5 h-5" style={{ color: iconColor }} />
            </div>
            <p className="text-sm font-medium text-[#0C2C57] leading-tight">
                {label}
            </p>
        </div>
    );
};


const KeyFeatures = () => {
    return (
        <section className="bg-[#F9FAFB] px-6 py-24">
            <div className="max-w-7xl mx-auto">
                {/* Text */}
                <div className="mb-10 text-left">
                    <p className="text-sm font-semibold text-[#FF7C2B] mb-2">Why Choose Us</p>
                    <h2 className="text-3xl font-bold text-[#0C2C57] mb-2">Key Features</h2>
                    <p className="text-gray-600 text-base max-w-xl whitespace-normal sm:whitespace-nowrap">
                        We bring together trusted, skilled, and locally rooted service-based freelancers
                    </p>
                </div>

                {/* Cards */}
                <div className="flex flex-wrap justify-center gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            label={feature.label}
                            bgColor='#DBEAFE'
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default KeyFeatures;
