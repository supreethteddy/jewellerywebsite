import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ChevronRight } from "lucide-react";

const TermsOfService = () => {
  const [isActive, setIsActive] = React.useState({ type: 1, index: 0 });
  return (
    <div className="pt-[5rem]">
      <Header />
      <section className="wrapper !max-w-4xl py-16">
        <h2 className="uppercase text-xl tracking-widest">shipping</h2>
        <div className="space-y-4">
          {shipping.map((item, i) => (
            <div key={item.question} className="mt-5">
              <p
                onClick={() => setIsActive({ type: 1, index: i })}
                className="desc flex cursor-pointer gap-2"
              >
                <ChevronRight size={20} className="mt-[.12rem] min-w-[1.4rem]" />
                {item.question}
              </p>
              {isActive.type === 1 && isActive.index === i && (
                <p className="mt-3 desc pl-7">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>
      <section className="wrapper !max-w-4xl pb-16">
        <h2 className="uppercase text-xl tracking-widest">
          returns & exchanges
        </h2>
        <div className="space-y-4">
          {returns.map((item, i) => (
            <div key={item.question} className="mt-5">
              <p
                onClick={() => setIsActive({ type: 2, index: i })}
                className="desc flex cursor-pointer gap-2"
              >
                <ChevronRight size={20} className="mt-[.12rem] min-w-[1.4rem]" />
                {item.question}
              </p>
              {isActive.type === 2 && isActive.index === i && (
                <p className="mt-3 desc pl-7">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>
      <section className="wrapper !max-w-4xl pb-16">
        <h2 className="uppercase text-xl tracking-widest">contact</h2>
        <div className="space-y-4">
          {contact.map((item) => (
            <div key={item.question} className="mt-5">
              <p
                onClick={() => setIsActive({ type: 3 })}
                className="desc flex cursor-pointer gap-2"
              >
                <ChevronRight size={20} className="mt-[.12rem] min-w-[1.4rem]" />
                {item.question}
              </p>
              {isActive.type === 3 && (
                <div
                  className="mt-3 pl-7"
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                ></div>
              )}
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default TermsOfService;

const shipping = [
  {
    question:
      "I can't wait! How soon before I can take my MISHO jewels out for a spin?",
    answer:
      "Soon! We typically ship within 2-3 working days of receiving an order. Thereafter, it will usually take between 1-7 days to reach you depending on your location. We'll send you an email with tracking details when it's en route.",
  },
  {
    question: "Free shipping?",
    answer:
      "We offer free shipping on orders of more than 2 products. For orders of 2 or fewer products, a shipping fee of ₹80 applies.",
  },
];

const returns = [
  {
    question: "It doesn't fit! Can I exchange it?",
    answer:
      "We do not offer returns or exchanges. Please review your order carefully before purchasing.",
  },
  {
    question: "Can I return or cancel my order?",
    answer:
      "Orders cannot be returned or canceled once placed. Kindly ensure all details are correct before confirming your purchase.",
  },
];

const contact = [
  {
    question: "How can I get in touch?",
    answer: `<p class="desc">We're here to help! You can reach us at <a class="underline text-primary" href="mailto:support@soulsun.com">support@soulsun.com</a>. We're here to help with any questions or concerns you may have. We'll be happy to assist you.</p>`,
  },
];
