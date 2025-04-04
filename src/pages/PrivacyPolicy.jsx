import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="pt-[7rem]">
      <Header />
      <section className="wrapper !max-w-5xl py-16">
        <h1 className="uppercase text-xl mb-5 text-center">Privacy Policy</h1>
        <div className="prose mx-auto">
          <p className="mb-6 desc">
            We respect and protect your privacy. This Privacy Policy outlines
            the types of personal information we collect, how we use it, and the
            steps we take to ensure that your information is protected when you
            visit our website and make purchases. By using our website, you
            agree to the practices described in this policy.
          </p>

          <h2 className="text-xl mt-8 mb-4">1. Information We Collect</h2>
          <p className="mb-4 desc">
            We collect both personal and non-personal information to provide you
            with the best possible experience on our website.
          </p>

          <h3 className="text-lg mt-6 mb-3">Personal Information</h3>
          <p className="mb-3 desc">
            When you create an account, make a purchase, or interact with our
            website in certain ways, we may collect the following information:
          </p>
          <ul className="list-disc pl-6 mb-6 desc">
            <li>
              <strong>Personal Details:</strong> Name, email address, phone
              number, shipping address, billing address.
            </li>
            <li>
              <strong>Payment Information:</strong> Credit card details, and
              other payment methods.
            </li>
            <li>
              <strong>Account Information:</strong> Username, password, and
              account preferences.
            </li>
            <li>
              <strong>Customer Support Information:</strong> Any details you
              provide when you contact our customer service team.
            </li>
          </ul>

          <h3 className="text-lg mt-6 mb-3">Non-Personal Information</h3>
          <p className="mb-3 desc">
            We also collect non-personal information to enhance your experience:
          </p>
          <ul className="list-disc pl-6 mb-6 desc">
            <li>
              <strong>Cookies and Tracking Data:</strong> We use cookies to
              improve your user experience, remember your preferences, and
              analyze website traffic. You can manage cookie preferences through
              your browser settings.
            </li>
            <li>
              <strong>Device and Usage Information:</strong> Details of your
              device, IP address, browser type, and how you use our website
              (e.g., pages visited, time spent on the site).
            </li>
          </ul>

          <h2 className="text-xl mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="mb-4 desc">
            We use the information we collect for the following purposes:
          </p>
          <ul className="list-disc pl-6 mb-6 desc">
            <li>
              To process and fulfill your orders, including shipping and
              billing.
            </li>
            <li>To personalize and improve your experience on our website.</li>
            <li>
              To communicate with you about your orders, promotions, and
              updates.
            </li>
            <li>
              To respond to your customer service inquiries and provide support.
            </li>
            <li>
              To send marketing communications, including newsletters and
              promotional offers (you may opt out at any time).
            </li>
            <li>To improve our website, products, and services.</li>
          </ul>

          <h2 className="text-xl mt-8 mb-4">3. Sharing Your Information</h2>
          <p className="mb-4 desc">
            We do not sell, rent, or share your personal information with third
            parties except in the following circumstances:
          </p>
          <ul className="list-disc pl-6 mb-6 desc">
            <li>
              <strong>Service Providers:</strong> We may share your information
              with trusted third-party service providers who help us with
              payment processing, shipping, marketing, and analytics.
            </li>
            <li>
              <strong>Legal Compliance:</strong> If required by law, we may
              disclose your information to comply with legal obligations,
              protect our rights, or prevent fraud.
            </li>
          </ul>

          <h2 className="text-xl mt-8 mb-4">4. Security of Your Information</h2>
          <p className="mb-6 desc">
            We take reasonable measures to protect your personal information
            from unauthorized access, alteration, or destruction. Our website
            uses SSL encryption for secure transactions, and we work with
            trusted payment processors to safeguard your payment details.
          </p>

          <h2 className="text-xl mt-8 mb-4">
            5. Cookies and Tracking Technologies
          </h2>
          <p className="mb-6 desc">
            We use cookies and similar technologies to improve the functionality
            of our website, analyze website traffic, and provide personalized
            content. By continuing to use our website, you consent to our use of
            cookies. You can manage cookie preferences through your browser
            settings, though this may affect some features of the site.
          </p>

          <h2 className="text-xl mt-8 mb-4">6. Your Data Protection Rights</h2>
          <p className="mb-4 desc">
            Depending on your location, you may have the following rights
            regarding your personal information:
          </p>
          <ul className="list-disc pl-6 mb-6 desc">
            <li>
              <strong>Access:</strong> You can request a copy of the personal
              information we hold about you.
            </li>
            <li>
              <strong>Correction:</strong> You can request corrections to any
              inaccurate or incomplete personal information.
            </li>
            <li>
              <strong>Deletion:</strong> You can request the deletion of your
              personal information, subject to certain legal exceptions.
            </li>
            <li>
              <strong>Opt-Out:</strong> You can opt-out of receiving marketing
              communications at any time by following the unsubscribe link in
              emails or contacting us directly.
            </li>
            <li>
              <strong>Data Portability:</strong> You may request a copy of your
              data in a structured, machine-readable format.
            </li>
          </ul>

          <h2 className="text-xl mt-8 mb-4">7. Third-Party Links</h2>
          <p className="mb-6 desc">
            Our website may contain links to third-party websites. We are not
            responsible for the privacy practices of these websites. We
            encourage you to read the privacy policies of any third-party
            websites you visit.
          </p>

          <h2 className="text-xl mt-8 mb-4">8. Children's Privacy</h2>
          <p className="mb-6 desc">
            Our website is not intended for individuals under the age of 13, and
            we do not knowingly collect personal information from children under
            13. If we become aware that we have collected personal information
            from a child under 13, we will take steps to delete that
            information.
          </p>

          {/* <h2 className="text-xl mt-8 mb-4">9. Contact Us</h2>
          <p className="mb-4 desc">
            If you have any questions about this Privacy Policy or our data
            practices, please contact us at:
          </p>
          <ul className="list-disc pl-6 mb-6 desc">
            <li>
              Email:{" "}
              <a
                href="mailto:support@soulsun.in"
                className="text-blue-600 hover:underline"
              >
                support@soulsun.in
              </a>
            </li>
            <li>
              Phone:{" "}
              <a
                href="tel:+91-9532060606"
                className="text-blue-600 hover:underline"
              >
                +91-9532060606
              </a>
            </li>
            <li>
              Address: <strong>Delhi, India</strong>
            </li>
          </ul> */}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
