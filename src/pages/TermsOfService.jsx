import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const TermsOfService = () => {
  return (
    <div className="pt-[5.5rem]">
      <Header />
      <div className="wrapper py-[4rem]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl mb-8 text-center">Terms and Conditions</h1>
          <div className="prose mx-auto">
            <p className="mb-6 desc">
              Welcome to <b>Jewello.in</b>! These Terms and Conditions are here to
              help you understand the rules and guidelines for using our website
              and purchasing our products. By accessing or using our site, you
              agree to follow these terms. Please read them carefully.
            </p>

            <h2 className="text-xl mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-6 desc">
              When you use <strong>Jewello.in</strong>, you confirm that you are
              at least 18 years old or have permission from a legal guardian to
              make purchases. If you don't agree with these terms, we kindly ask
              that you don't use our website.
            </p>

            <h2 className="text-xl mt-8 mb-4">2. Product Information</h2>
            <ul className="list-disc pl-6 mb-6 desc">
              <li>
                We work hard to provide accurate product descriptions, images,
                and pricing. However, slight variations in color, size, or
                appearance may occur due to lighting, device displays, or
                manufacturing processes.
              </li>
              <li>
                Product availability is subject to change, and we reserve the
                right to modify or discontinue products without prior notice.
              </li>
              <li>
                All jewelry pieces are handcrafted, which means each piece may
                have slight variations that make it unique.
              </li>
            </ul>

            <h2 className="text-xl mt-8 mb-4">3. Ordering and Payment</h2>
            <ul className="list-disc pl-6 mb-6 desc">
              <li>
                When you place an order on <strong>Jewello.in</strong>, it's
                considered an offer to purchase, which we may accept or decline at
                our discretion.
              </li>
              <li>
                We use secure and trusted payment gateways to process your
                payments. By providing your payment details, you confirm that
                you're authorized to use the chosen payment method.
              </li>
              <li>
                All prices on the website are listed in Indian Rupees (INR) and
                include applicable taxes unless stated otherwise.
              </li>
            </ul>

            <h2 className="text-xl mt-8 mb-4">4. Shipping and Delivery</h2>
            <ul className="list-disc pl-6 mb-6 desc">
              <li>
                We aim to process and ship your order within{" "}
                <strong>3-6 working days</strong>. Delivery times may vary
                depending on your location and the shipping method you select.
              </li>
              <li>
                Once your order is shipped, we'll provide you with a tracking
                number so you can keep an eye on its progress.
              </li>
              <li>
                Please note that <strong>Jewello.in</strong> is not responsible
                for delays caused by third-party shipping carriers or unexpected
                events like natural disasters or customs delays.
              </li>
            </ul>

            <h2 className="text-xl mt-8 mb-4">
              5. No Return, Exchange, or Refund Policy
            </h2>
            <ul className="list-disc pl-6 mb-6 desc">
              <li>
                At <strong>Jewello.in</strong>, we have a strict{" "}
                <strong>no return, no exchange, and no refund policy</strong>. We
                encourage you to review your order carefully before completing
                your purchase.
              </li>
              <li>
                Unfortunately, we cannot accept returns or exchanges for any
                reason, including change of mind, incorrect size selection, or
                minor product variations.
              </li>
              <li>
                If you receive a damaged or defective product, please contact our
                customer support team within <strong>24 hours</strong> of delivery
                with photos of the issue. We'll review the situation and work with
                you to find a fair solution.
              </li>
            </ul>

            <h2 className="text-xl mt-8 mb-4">6. Intellectual Property</h2>
            <p className="mb-6 desc">
              Everything on this website—text, images, logos, and designs—is owned
              by <strong>Jewello.in</strong> and is protected by copyright laws.
              Unauthorized use, copying, or distribution of any content is
              strictly prohibited.
            </p>

            <h2 className="text-xl mt-8 mb-4">7. User Responsibilities</h2>
            <p className="mb-6 desc">
              You agree to use our website for lawful purposes only and to avoid
              any activity that could harm the site or its users. Providing false
              or misleading information during account creation or checkout may
              result in order cancellation or account suspension.
            </p>

            <h2 className="text-xl mt-8 mb-4">8. Limitation of Liability</h2>
            <p className="mb-6 desc">
              <strong>Jewello.in</strong> is not responsible for any indirect,
              incidental, or consequential damages that may arise from using our
              website or products. Our liability is limited to the total amount
              you paid for the specific product in question.
            </p>

            <h2 className="text-xl mt-8 mb-4">9. Contact Us</h2>
            <p className="mb-6 desc">
              If you have any questions or concerns about these terms, please feel
              free to reach out to us at:
            </p>
            <ul className="list-disc pl-6 mb-6 desc">
              <li>
                Email:{" "}
                <a
                  href="mailto:support@jewello.in"
                  className="text-blue-600 hover:underline"
                >
                  support@jewello.in
                </a>
              </li>
              <li>
                Phone:{" "}
                <a
                  href="tel:+919876543210"
                  className="text-blue-600 hover:underline"
                >
                  +91 98765 43210
                </a>
              </li>
            </ul>

            <h2 className="text-xl mt-8 mb-4">10. Changes to Terms</h2>
            <p className="mb-6 desc">
              We may update these terms from time to time. When we do, we'll post
              the updated terms on this page and update the "Last Updated" date.
              Your continued use of the website after any changes means you accept
              the new terms.
            </p>

            <h2 className="text-xl mt-8 mb-4">11. Governing Law</h2>
            <p className="mb-6 desc">
              These terms are governed by the laws of India. Any disputes will be
              resolved in the courts of Mumbai, Maharashtra.
            </p>

            <div className="text-center mt-12">
              <p className="desc">
                Thank you for choosing <strong>Jewello.in</strong>! We truly
                appreciate your business and look forward to serving you.
              </p>
              <p className="text-sm text-gray-600 mt-4">
                Last Updated: December 2024
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;
