'use client';

import { useState } from 'react';
import RestaurantCard from './RestaurantCard';

// List of all carousel items
const items = [
  { name: "Chinese Wok", image: "/chinesewok.jpeg" },
  { name: "BOX8 - Desi Meals", image: "/box8desimeals.jpeg" },
  { name: "Bikanervala", image: "/bikanervala.jpeg" },
  { name: "White Hart Pizza", image: "/deep-dish-pizza-3.webp" },
  { name: "Chicago Pizza", image: "/Chicago Pizza.webp" },
  { name: "Haldiram's", image: "/Haldiram's.jpg" },
  { name: "Domino's Pizza", image: "/Domino's Pizza.png" },
  { name: "Subway", image: "/Subway.jpeg" },
  { name: "Burger King", image: "/Burger King.jpg" },
  { name: "KFC", image: "/KFC.jpg" },
];

const ITEMS_PER_PAGE = 5;

export default function Carousel() {
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(items.length / ITEMS_PER_PAGE);

  const startIndex = page * ITEMS_PER_PAGE;
  const currentItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrev = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < pageCount - 1) setPage((prev) => prev + 1);
  };

  return (
    <div className="carousel-wrapper">
      <button onClick={handlePrev} className="arrow" disabled={page === 0}>◀</button>
      <div className="carousel center">
        {currentItems.map((item, i) => (
          <RestaurantCard key={i} name={item.name} image={item.image} />
        ))}
      </div>
      <button onClick={handleNext} className="arrow" disabled={page === pageCount - 1}>▶</button>
    </div>
  );
}
