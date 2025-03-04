import { Star } from "lucide-react";
import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const Reviews = () => {
  return (
    <div className="py-[4rem] border-t">
      <div className="text-center wrapper">
        <p className="text-xl mb-2">Latest Reviews from our Customers</p>
        <div className="flex justify-center gap-2 mt-3">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Star key={i} fill="#DEA821" size={20} stroke="0" />
            ))}
        </div>
      </div>
      <div className="mt-7">
        <InfiniteMovingCards items={reviews} />
      </div>
    </div>
  );
};

export default Reviews;

const reviews = [
  {
    reviewer: "Priya M.",
    rating: 5,
    review:
      "The necklace I bought from Soulsun is absolutely stunning! The craftsmanship is exceptional, and it looks even better in person. I’ve received so many compliments!",
    date: "2024-12-20",
  },
  {
    reviewer: "Rahul S.",
    rating: 4,
    review:
      "Bought this ring from Soulsun for my fiancée, and she adores it! The design is elegant, though the size ran a bit small. Great quality overall.",
    date: "2024-12-18",
  },
  {
    reviewer: "Anasuya",
    rating: 5,
    review:
      "These earrings from Soulsun are perfect for every occasion. Lightweight, beautifully designed, and they sparkle brilliantly under the light!",
    date: "2024-12-15",
  },
  {
    reviewer: "Keerthi Krishna",
    rating: 4,
    review:
      "The necklace I got from Soulsun is gorgeous, but the chain feels a bit delicate. Still, it’s a great purchase for the price!",
    date: "2024-12-14",
  },
  {
    reviewer: "Rajesh P.",
    rating: 5,
    review:
      "The ring I ordered from Soulsun exceeded my expectations! The details are intricate, and the gemstone is flawless. Highly recommended.",
    date: "2024-12-10",
  },
  {
    reviewer: "Sneha M.",
    rating: 4,
    review:
      "Lovely earrings with a timeless design from Soulsun. They arrived in elegant packaging, but one back clasp felt slightly loose.",
    date: "2024-12-09",
  },
];
