import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header.js";
import Hero from "./components/Hero.js";
import Browse from "./components/Browse.js";
import Arrived from "./components/Arrived.js";
import Clients from "./components/Clients.js";
import AsideMenu from "./components/AsideMenu.js";
import Footer from "./components/Footer.js";
import Offline from "./components/Offline.js";
import Splash from "./pages/Splash.js";
import Profile from "./pages/Profile.js";
import Details from "./pages/Details.js";
import Cart from "./pages/Cart.js";

function App({cart}) {
  const [items, setItems] = React.useState([]);
  const [offlineStatus, setOfflineStatus] = React.useState(!navigator.onLine);
  const [isLoading, setIsLoading] = React.useState(true);

  function handleOfflineStatus() {
    setOfflineStatus(!navigator.onLine);
  }

  React.useEffect(
    function () {
      (async function () {
        const response = await fetch("https://bwacharity.fly.dev/items", {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            // "x-api-key": process.env.REACT_APP_APIKEY,
          },
        });
        const { nodes } = await response.json();
        setItems(nodes);

        if (!document.querySelector('script[src="/carousel.js"]')) {
          const script = document.createElement("script");
          script.src = "/carousel.js";
          script.async = false;
          document.body.appendChild(script);
        }
      })();

      handleOfflineStatus();
      window.addEventListener("online", handleOfflineStatus);
      window.addEventListener("offline", handleOfflineStatus);

      setTimeout(function () {
        setIsLoading(false);
      }, 1500);

      return function () {
        window.removeEventListener("online", handleOfflineStatus);
        window.removeEventListener("offline", handleOfflineStatus);
      };
    },
    [offlineStatus]
  );

  return (
    <>
      {isLoading ? (
        <Splash />
      ) : (
        <>
          {offlineStatus && <Offline />}
          <Header mode="light" cart={cart}/>
          <Hero />
          <Browse />
          <Arrived items={items} />
          <Clients />
          <AsideMenu />
          <Footer />
        </>
      )}
    </>
  );
}

export default function AppRoutes() {
  const [cart, setCart] = React.useState([]);

  function handleAddToCart(item) {
    const currentIndex = cart.length;
    const newCart = [...cart, { id: currentIndex + 1, item}];
    setCart(newCart);
  }

  function handleRemoveCartItem(event, id) {
    const revisedCart = cart.filter(function(item) {
      return item.id !== id;
    });
    setCart(revisedCart);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App cart={cart} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/details/:id" element={<Details handleAddToCart={handleAddToCart} cart={cart} />} />
        <Route path="/cart" element={<Cart cart={cart} handleRemoveCartItem={handleRemoveCartItem} />} />
      </Routes>
    </BrowserRouter>
  );
}
