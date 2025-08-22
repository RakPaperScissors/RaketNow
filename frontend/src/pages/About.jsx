import React from "react";
import { ShieldCheck, MapPin, Star } from "lucide-react";

const team = [
  {
    name: "Joseph Francis Buhayan",
    position: "CEO",
    facebook: "https://www.facebook.com/Jospeh.Francis.444",
    linkedin: "#",
    profilePicture: "/default_profile.jpg",
  },
  {
    name: "Xander Jay Cagang",
    position: "Backend Developer",
    facebook: "https://www.facebook.com/xaxangderder",
    linkedin: "#",
    profilePicture: "/default_profile.jpg",
  },
  {
    name: "Krystel Mikylla Perez",
    position: "Backend Developer",
    facebook: "https://www.facebook.com/krystel.perez000",
    linkedin: "#",
    profilePicture: "/default_profile.jpg",
  },
  {
    name: "Liarrah Daniya Lambayao",
    position: "Frontend Developer",
    facebook: "https://www.facebook.com/liarrahlambayao.16",
    linkedin: "#",
    profilePicture: "/default_profile.jpg",
  },
  {
    name: "Jhaye Marie Gonzales",
    position: "Frontend Developer",
    facebook: "https://www.facebook.com/gonzalesjhaye",
    linkedin: "#",
    profilePicture: "/default_profile.jpg",
  },
];

function FeatureCard(props) {
  const Icon = props.icon;
  return (
    <div className="p-6 bg-white rounded-2xl shadow text-center">
      <Icon className="mx-auto mb-4 text-blue-600" size={32} />
      <h3 className="text-xl font-semibold mb-2">{props.title}</h3>
      <p className="text-gray-600">{props.description}</p>
    </div>
  );
}

const TeamCard = ({  profilePicture, name, position, facebook, linkedin }) => (
  <div className="bg-white p-6 rounded-xl shadow text-center">
    <img src={profilePicture} alt={name} className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"/>
    <h3 className="text-lg font-semibold mb-1">{name}</h3>
    <p className="text-sm text-gray-600 mb-3">{position}</p>
    <div className="flex justify-center gap-4">
      <a href={facebook} target="_blank" rel="noopener noreferrer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          className="w-6 h-6 fill-blue-600 hover:fill-blue-800 transition-colors duration-200"
        >
          <path d="M576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 440 146.7 540.8 258.2 568.5L258.2 398.2L205.4 398.2L205.4 320L258.2 320L258.2 286.3C258.2 199.2 297.6 158.8 383.2 158.8C399.4 158.8 427.4 162 438.9 165.2L438.9 236C432.9 235.4 422.4 235 409.3 235C367.3 235 351.1 250.9 351.1 292.2L351.1 320L434.7 320L420.3 398.2L351 398.2L351 574.1C477.8 558.8 576 450.9 576 320z" />
        </svg>
      </a>
      <a href={linkedin} target="_blank" rel="noopener noreferrer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          className="w-6 h-6 fill-blue-700 hover:fill-blue-900 transition-colors duration-200"
        >
          <path d="M160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 160C544 124.7 515.3 96 480 96L160 96zM165 266.2L231.5 266.2L231.5 480L165 480L165 266.2zM236.7 198.5C236.7 219.8 219.5 237 198.2 237C176.9 237 159.7 219.8 159.7 198.5C159.7 177.2 176.9 160 198.2 160C219.5 160 236.7 177.2 236.7 198.5zM413.9 480L413.9 376C413.9 351.2 413.4 319.3 379.4 319.3C344.8 319.3 339.5 346.3 339.5 374.2L339.5 480L273.1 480L273.1 266.2L336.8 266.2L336.8 295.4L337.7 295.4C346.6 278.6 368.3 260.9 400.6 260.9C467.8 260.9 480.3 305.2 480.3 362.8L480.3 480L413.9 480z" />
        </svg>
      </a>
    </div>
  </div>
);

function About() {
  return (
    <div className=" text-gray-800">
      <section className="bg-gradient-to-b from-white to-[#f4f7fc] py-20 text-center px-4">
        <h1 className="text-4xl font-extrabold mb-4 text-[#0C2C57]">
          About <span className="text-[#FF7C2B]">RaketNow</span>
        </h1>
        <p className="text-lg max-w-3xl mx-auto">
          RaketNow is Davao City’s local freelance platform, built by Davaoeños
          for Davaoeños. We’re shining a light on local freelancer communities
          to create a thriving digital economy in our community.
        </p>
      </section>

      <section className="bg-white px-4 py-20 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Team at work"
          className="w-full h-64 object-cover rounded-lg"
        />

        <div>
          <h2 className="text-2xl font-extrabold text-[#0C2C57] mb-4">
            Our Story
          </h2>
          <p className="mb-4 text-gray-700 text-sm">
            We started RaketNow after experiencing firsthand the challenge of
            finding real job opportunities online. Too many platforms are either
            filled with fake job posts or bury valuable posts beneath irrelevant
            content.
          </p>
          <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
            <li>Secure opportunities tailored for Filipino freelancers</li>
            <li>Skill-based system for fast and relevant matches</li>
            <li>Community-powered and Davao-focused</li>
          </ul>
        </div>
      </section>

      <section className="bg-[#f4f7fc] py-20 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-2xl font-extrabold text-[#0C2C57]">
            Core Features
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            icon={ShieldCheck}
            title="Secure & Trusted"
            description="Every profile and job offer is verified for safety through built-in checks to protect users from scams."
          />
          <FeatureCard
            icon={MapPin}
            title="Local First"
            description="We prioritize Davao-based freelancers and clients to boost the local digital economy."
          />
          <FeatureCard
            icon={Star}
            title="Skill-Based Matching"
            description="Our unique algorithm connects the right people to the right projects based on verified skill sets."
          />
        </div>
      </section>

      <section className="bg-[#0C2C57] text-white text-center py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold mb-6">Our Vision</h2>
          <p className="text-lg mb-6">
            We’re building a future where Davaoeños can thrive in the digital
            economy without leaving home. Where local talents have access to
            world-class work right in their backyard. Where our community’s
            skills are recognized and valued.
          </p>
          <button className="bg-[#FF7C2B] px-6 py-2 rounded-full hover:bg-orange-600 transition">
            Join our Mission
          </button>
        </div>
      </section>

      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-2xl font-extrabold text-[#0C2C57]">
            Meet the Team
          </h2>
        </div>
        <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {team.map((member) => (
            <TeamCard key={member.name} {...member} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
