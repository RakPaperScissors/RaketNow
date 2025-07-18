import React from 'react';

const faqsData = [
  {
    category: 'General Questions',
    questions: [
      {
        q: 'What is RaketNow?',
        a: 'RaketNow is a platform that connects clients with skilled freelancers, also known as “Raketistas,” for a wide range of services—from plumbing and tutoring to makeup and graphic design.',
      },
      {
        q: 'Who can use RaketNow?',
        a: 'Anyone! Whether you’re looking to hire someone (clients) or offer services (Raketistas), RaketNow is for you.',
      },
    ],
  },
  {
    category: 'For Clients',
    questions: [
      {
        q: 'How do I find a Raketista?',
        a: 'Browse our categorized service listings or use the search function. You can view freelancer profiles, ratings, skills, and certifications.',
      },
      {
        q: 'How do I know if a Raketista is trustworthy?',
        a: 'Raketistas are rated by clients and may display verified certifications and IDs.',
      },
      {
        q: 'How do payments work?',
        a: 'RaketNow does not hold or process payments. All transactions happen directly between the client and Raketista.',
      },
    ],
  },
  {
    category: 'For Raketistas',
    questions: [
      {
        q: 'How do I sign up as a Raketista?',
        a: 'Create an account, select your skillsets, upload work photos, and optionally add certifications.',
      },
      {
        q: 'What if I don’t have certifications?',
        a: 'That’s okay! You can still list your experience, get ratings, and build credibility over time.',
      },
      {
        q: 'How do I get more clients?',
        a: 'Complete your profile, upload quality photos, and maintain high ratings. Verified users show up higher in search results.',
      },
      {
        q: 'Can I add more skills later on?',
        a: 'Yes! You can update your profile anytime.',
      },
    ],
  },
  {
    category: 'Features and Safety',
    questions: [
      {
        q: 'Is RaketNow free to use?',
        a: 'Yes. Signing up is free. Future premium features like Pro plans may include added benefits.',
      },
      {
        q: 'How does RaketNow ensure safety?',
        a: 'We encourage Raketistas to upload valid IDs and certifications. Clients can leave reviews for transparency.',
      },
    ],
  },
  {
    category: 'Other Questions',
    questions: [
      {
        q: 'What types of services are supported?',
        a: `We support 50+ categories including:
        Home Repairs (Plumbing, Carpentry, Electrician), Tech Support (Computer Repair, Network Setup), Personal Care (Makeup, Hair, Massage), Tutoring (Academic, Music, Language), Creative Services (Graphic Design, Video Editing), Food & Beverage (Catering, Baking), Automotive (Car Wash, Mechanic), Delivery & Moving Services and many more.`,
      },
      {
        q: 'Can organizations use RaketNow?',
        a: 'Yes, they can hire Raketistas for large-scale or recurring jobs, but they cannot offer services as freelancers.',
      },
      {
        q: 'Who do I contact for help?',
        a: 'Reach out to our support team at [Insert Email] or via the help button in your dashboard.',
      },
    ],
  },
];

const Faqs = () => {
  return (
    // heading
    <section className="px-6 py-16 bg-[#FFFFFF]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-[#FF7C2B] mb-2">FAQs</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0C2C57] mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Browse through the most commonly asked questions by clients and Raketistas.
          </p>
        </div>

        {/* Questions */}
        {faqsData.map((section, idx) => (
          <div key={idx} className="mb-10">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#0C2C57] mb-4">
              {section.category}
            </h2>
            <div className="space-y-6">
              {section.questions.map((faq, qIdx) => (
                <div key={qIdx} className="bg-[#F9FAFB] p-5 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-[#0C2C57] mb-1">{faq.q}</h3>
                  <p className="text-gray-600 whitespace-pre-line">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faqs;
