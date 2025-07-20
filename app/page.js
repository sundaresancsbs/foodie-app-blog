'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import "./globals.css";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('userLoggedIn') === 'true') {
        setIsLoggedIn(true);
        // Load cart from localStorage if exists
        const storedCart = localStorage.getItem('cart');
        if (storedCart) setCart(JSON.parse(storedCart));
      } else {
        router.replace('/login/user');
      }
    }
  }, [router]);

  useEffect(() => {
    // Save cart to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  if (!isLoggedIn) return null;

  const handleCardClick = (index) => {
    setSelectedIndex(index);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddToCart = () => {
    if (selectedIndex !== null) {
      const item = restaurantList[selectedIndex];
      setCart((prev) => [...prev, item]);
      setShowModal(false);
    }
  };

  const handleRemoveFromCart = (idx) => {
    setCart((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleOpenCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);

  const getTotal = () => {
    // Extract price as number from string like '₹210 for two'
    return cart.reduce((sum, item) => {
      const match = item.price.match(/\d+/);
      return sum + (match ? parseInt(match[0], 10) : 0);
    }, 0);
  };

  const restaurantList = [
    {
      name: "Chinese Wok",
      image: "/chinesewok.jpeg",
      details: "Chinese, Asian, Tibetan, Desserts",
      price: "₹210 for two",
      description: "Delicious Indo-Chinese meals with spicy noodles and momos.",
    },
    {
      name: "BOX8 - Desi Meals",
      image: "/box8desimeals.jpeg",
      details: "North Indian, Thalis, Home Food",
      price: "₹250 for two",
      description: "Wholesome thalis and meal boxes made with traditional spices.",
    },
    {
      name: "Bikanervala",
      image: "/bikanervala.jpeg",
      details: "Sweets, South Indian, Chinese",
      price: "₹220 for two",
      description: "Well-known for Indian sweets and a mix of cuisines under one roof.",
    },
    {
      name: "White Hart Pizza",
      image: "/deep-dish-pizza-3.webp",
      details: "Pizza, Snacks, Beverages",
      price: "₹200 for two",
      description: "Crunchy base, cheesy toppings, and a wide range of pizzas.",
    },
    {
      name: "Chicago Pizza",
      image: "/Chicago Pizza.webp",
      details: "Pizza, Fast Food, Italian",
      price: "₹280 for two",
      description: "Thick-crust, loaded Chicago-style pizzas with generous cheese.",
    },
    {
      name: "Haldiram's",
      image: "/Haldiram's.jpg",
      details: "Indian Sweets, Snacks",
      price: "₹190 for two",
      description: "Authentic Indian snacks, sweets, and light meals loved nationwide.",
    },
    {
      name: "Domino's Pizza",
      image: "/Domino's Pizza.png",
      details: "Pizzas, Italian, Fast Food",
      price: "₹300 for two",
      description: "Famous pizza chain with quick delivery and flavorful sides.",
    },
    {
      name: "Subway",
      image: "/Subway.jpeg",
      details: "Sandwiches, Healthy Food",
      price: "₹270 for two",
      description: "Healthy sandwiches with customizable veggies and sauces.",
    },
    {
      name: "Burger King",
      image: "/Burger King.jpg",
      details: "Burgers, Beverages",
      price: "₹240 for two",
      description: "Home of the Whopper and a range of delicious fast-food options.",
    },
    {
      name: "KFC",
      image: "/KFC.jpg",
      details: "Fried Chicken, Fast Food",
      price: "₹260 for two",
      description: "Crispy fried chicken and zinger burgers with secret spices.",
    },
    {
      name: "Fresh Juice Center",
      image: "/juice.jpeg",
      details: "Fresh Juices, Smoothies, Detox Drinks",
      price: "₹150 for two",
      description: "Made-to-order juices and smoothies from fresh fruits.",
    },
    {
      name: "Juice Lounge",
      image: "/Juice Lounge.jpeg",
      details: "Fruit Juices, Health Shakes",
      price: "₹180 for two",
      description: "A range of energy boosters and detox drinks served chilled.",
    },
  ];

  return (
    <div>
      <Navbar cartCount={cart.length} onCartClick={handleOpenCart} />
      <div className="container">
        <h2>Top restaurant chains in Noida</h2>
        <Carousel />
        <h2>Restaurants with online food delivery in Noida</h2>
        <div className="restaurant-grid">
          {restaurantList.map((r, i) => (
            <div
              key={i}
              className="card"
              onClick={() => handleCardClick(i)}
              style={{ cursor: "pointer" }}
            >
              <img src={r.image} alt={r.name} />
              <h4>{r.name}</h4>
              <p className="details">{r.details}</p>
              <p className="price">{r.price}</p>
            </div>
          ))}
        </div>
      </div>
      {showModal && selectedIndex !== null && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '8px',
            padding: '24px',
            maxWidth: '90vw',
            maxHeight: '90vh',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            textAlign: 'center',
            position: 'relative'
          }}>
            <button onClick={handleCloseModal} style={{
              position: 'absolute',
              top: 8,
              right: 8,
              background: 'transparent',
              border: 'none',
              fontSize: 24,
              cursor: 'pointer'
            }}>&times;</button>
            <img src={restaurantList[selectedIndex].image} alt={restaurantList[selectedIndex].name} style={{ maxWidth: '300px', width: '100%', borderRadius: '8px' }} />
            <h2 style={{ margin: '16px 0 8px' }}>{restaurantList[selectedIndex].name}</h2>
            <p style={{ fontWeight: 'bold', marginBottom: 8 }}>{restaurantList[selectedIndex].details}</p>
            <p style={{ color: '#666', marginBottom: 8 }}>{restaurantList[selectedIndex].price}</p>
            <p style={{ fontSize: '16px', color: '#333' }}>{restaurantList[selectedIndex].description}</p>
            <button onClick={handleAddToCart} style={{
              marginTop: 16,
              padding: '10px 24px',
              background: '#0070f3',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer'
            }}>Add to Cart</button>
          </div>
        </div>
      )}
      {showCart && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1100
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '8px',
            padding: '24px',
            maxWidth: '500px',
            width: '90vw',
            maxHeight: '90vh',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            textAlign: 'center',
            position: 'relative',
            overflowY: 'auto'
          }}>
            <button onClick={handleCloseCart} style={{
              position: 'absolute',
              top: 8,
              right: 8,
              background: 'transparent',
              border: 'none',
              fontSize: 24,
              cursor: 'pointer'
            }}>&times;</button>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {cart.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: 16, borderBottom: '1px solid #eee', paddingBottom: 8 }}>
                      <img src={item.image} alt={item.name} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 6, marginRight: 12 }} />
                      <span style={{ fontWeight: 'bold' }}>{item.name}</span>
                      <span style={{ marginLeft: 8, color: '#666' }}>{item.price}</span>
                      <button onClick={() => handleRemoveFromCart(idx)} style={{ marginLeft: 16, background: '#ff4d4f', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: 'pointer' }}>Remove</button>
                    </li>
                  ))}
                </ul>
                <h3>Total: ₹{getTotal()}</h3>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
