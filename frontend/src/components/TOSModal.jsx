import { X } from "lucide-react";

export default function TOSModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-3xl w-full p-6 relative">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h3 className="text-xl font-bold mb-4 text-gray-700">
          Terms & Conditions
        </h3>

        {/* Scrollable content */}
        <div className="text-gray-600 text-sm max-h-[500px] overflow-y-auto pr-2 space-y-4">
          <p>
            <strong>Effective Date:</strong>
          </p>
          <p>
            <strong>Last Updated:</strong>
          </p>

          <p>
            Welcome to RaketNow! These Terms and Conditions (“Terms”) govern
            your access to and use of our website, platform, services, and
            applications (collectively, the “Services”). By accessing or using
            RaketNow, you agree to be bound by these Terms. If you do not agree,
            please do not use our Services.
          </p>

          <h4 className="font-semibold">1. Eligibility</h4>
          <ul className="list-disc ml-6 space-y-1">
            <li>You must be at least 18 years old to use RaketNow.</li>
            <li>
              By registering, you represent that all information you provide is
              accurate and complete.
            </li>
            <li>
              RaketNow reserves the right to suspend or terminate accounts that
              provide false or misleading information.
            </li>
          </ul>

          <h4 className="font-semibold">2. User Accounts</h4>
          <ul className="list-disc ml-6 space-y-1">
            <li>
              You are responsible for maintaining the confidentiality of your
              account and password.
            </li>
            <li>
              You agree to notify us immediately of any unauthorized use of your
              account.
            </li>
            <li>
              RaketNow will not be liable for any loss or damage from
              unauthorized access caused by your failure to secure your account.
            </li>
          </ul>

          <h4 className="font-semibold">3. Use of Services</h4>
          <p>
            RaketNow connects freelancers (“Raketista”) and clients
            (“Employers”).
          </p>
          <ul className="list-disc ml-6 space-y-1">
            <li>
              You agree to use the platform only for lawful purposes and in
              compliance with applicable laws.
            </li>
            <li>
              You will not engage in fraud, harassment, spamming, exploitation,
              or any conduct that may harm the platform or its users.
            </li>
          </ul>

          <h4 className="font-semibold">4. Data Usage & Privacy</h4>
          <p>
            By using RaketNow, you consent to the collection, storage, and use
            of your data as outlined in our [Privacy Policy].
          </p>
          <p>Your information may be used to:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>
              Facilitate job postings and matches between freelancers and
              clients.
            </li>
            <li>
              Communicate with you regarding updates, offers, and support.
            </li>
            <li>Improve security and prevent fraud.</li>
          </ul>
          <p>
            RaketNow will not sell your personal information to third parties
            without your consent, but may share limited data with service
            providers necessary to operate the platform.
          </p>

          <h4 className="font-semibold">5. Payments</h4>
          <ul className="list-disc ml-6 space-y-1">
            <li>
              RaketNow does not process, facilitate, or hold payments between
              users.
            </li>
            <li>
              All financial arrangements, including compensation, invoicing, and
              payment transfers, are solely between freelancers and clients.
            </li>
            <li>
              Users are responsible for ensuring that payments are made or
              received through their own agreed-upon methods.
            </li>
            <li>
              RaketNow is not liable for any payment disputes, delays, losses,
              or issues that may arise between users.
            </li>
          </ul>

          <h4 className="font-semibold">6. Intellectual Property</h4>
          <ul className="list-disc ml-6 space-y-1">
            <li>
              Users retain ownership of content they upload, but grant RaketNow
              a license to use, display, and distribute such content for the
              purpose of operating the Services.
            </li>
            <li>
              You may not copy, modify, or distribute any part of the platform
              without our prior written consent.
            </li>
          </ul>

          <h4 className="font-semibold">7. Prohibited Activities</h4>
          <ul className="list-disc ml-6 space-y-1">
            <li>Use the platform for illegal or fraudulent activities.</li>
            <li>Post false or misleading job listings or profiles.</li>
            <li>Offer illegal, harmful, or prohibited services.</li>
            <li>Harass, exploit, or discriminate against other users.</li>
            <li>Attempt to solicit payments through fraudulent means.</li>
            <li>Upload malicious code or attempt to disrupt the platform.</li>
          </ul>

          <h4 className="font-semibold">8. Limitation of Liability</h4>
          <p>
            RaketNow provides the platform “as is” and makes no guarantees of
            uninterrupted service. RaketNow is not liable for any direct,
            indirect, incidental, or consequential damages arising from use of
            the Services. Users are solely responsible for their interactions,
            contracts, and disputes.
          </p>

          <h4 className="font-semibold">9. Account Suspension & Termination</h4>
          <p>
            RaketNow reserves the right to suspend or terminate accounts that
            violate these Terms. Users may deactivate their accounts at any time
            by contacting support.
          </p>

          <h4 className="font-semibold">10. Changes to Terms</h4>
          <p>
            RaketNow may update these Terms from time to time. Continued use of
            the Services after updates constitutes acceptance of the revised
            Terms.
          </p>

          <h4 className="font-semibold">11. Governing Law</h4>
          <p>
            These Terms are governed by the laws of [Insert Country/Region]. Any
            disputes shall be resolved in the courts of [Insert Jurisdiction].
          </p>
          <h4 className="font-semibold">12. Contact Us</h4>
          <p>
            For questions or concerns about these Terms, please contact us at:
            <br />
            <strong>Email:</strong> rakpaperscissors@raketnow.ip-ddns.com
            <br />
            <strong>Address:</strong> UP Mindanao, Mintal
          </p>
        </div>
      </div>
    </div>
  );
}
