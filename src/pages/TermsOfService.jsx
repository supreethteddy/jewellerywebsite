import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const TermsOfService = () => {
  return (
    <div className="pt-[5rem]">
      <Header />
      <section className="wrapper !max-w-5xl py-16">
        <h1 className="uppercase text-xl mb-5 text-center">
          Terms and Conditions
        </h1>
        <div className="prose mx-auto">
          <p className="mb-6 desc">
            Welcome to <b>Soulsun.in</b>! These Terms and Conditions are here to
            help you understand the rules and guidelines for using our website
            and purchasing our products. By accessing or using our site, you
            agree to follow these terms. Please take a moment to read them
            carefully to ensure a smooth and enjoyable shopping experience.
          </p>

          <h2 className="text-xl mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-6 desc">
            When you use <strong>Soulsun.in</strong>, you confirm that you are
            at least 18 years old or have permission from a legal guardian to
            make purchases. If you don’t agree with these terms, we kindly ask
            that you avoid using our website.
          </p>

          <h2 className="text-xl mt-8 mb-4">2. Product Information</h2>
          <ul className="list-disc pl-6 mb-6 desc">
            <li>
              We do our best to provide accurate and detailed descriptions of
              all our products. However, please keep in mind that there might be
              slight differences in color, size, or design due to variations in
              screen settings or manufacturing processes.
            </li>
            <li>
              The images you see on the website are for reference only. While we
              aim for accuracy, the actual product may look slightly different.
            </li>
            <li>
              If you have any questions about a product, don’t hesitate to
              contact our customer support team before placing your order.
            </li>
          </ul>

          <h2 className="text-xl mt-8 mb-4">3. Ordering and Payment</h2>
          <ul className="list-disc pl-6 mb-6 desc">
            <li>
              When you place an order on <strong>Soulsun.in</strong>, it’s
              considered an offer to purchase, which we may accept or decline at
              our discretion.
            </li>
            <li>
              We use secure and trusted payment gateways to process your
              payments. By providing your payment details, you confirm that
              you’re authorized to use the chosen payment method.
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
              Once your order is shipped, we’ll provide you with a tracking
              number so you can keep an eye on its progress.
            </li>
            <li>
              Please note that <strong>Soulsun.in</strong> is not responsible
              for delays caused by third-party shipping carriers or unexpected
              events like natural disasters or customs delays.
            </li>
          </ul>

          <h2 className="text-xl mt-8 mb-4">
            5. No Return, Exchange, or Refund Policy
          </h2>
          <ul className="list-disc pl-6 mb-6 desc">
            <li>
              At <strong>Soulsun.in</strong>, we have a strict{" "}
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
              with photos of the issue. We’ll review the situation and work with
              you to find a fair solution.
            </li>
          </ul>

          <h2 className="text-xl mt-8 mb-4">6. Intellectual Property</h2>
          <p className="mb-6 desc">
            Everything on this website—text, images, logos, and designs—is owned
            by <strong>Soulsun.in</strong> and is protected by copyright laws.
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
            <strong>Soulsun.in</strong> is not responsible for any indirect,
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
          </ul>

          <p className="text-center mt-8 desc">
            Thank you for choosing <strong>Soulsun.in</strong>! We truly
            appreciate your trust and are here to make your shopping experience
            as pleasant as possible.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default TermsOfService;
