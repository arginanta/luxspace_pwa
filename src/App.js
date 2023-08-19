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

function App() {
  const [items, setItems] = React.useState([]);
  const [offlineStatus, setOfflineStatus] = React.useState(!navigator.onLine);
  const [isLoading, setIsLoading] = React.useState(true);

  const handleOfflineStatus = () => setOfflineStatus(!navigator.onLine);

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
          <Header mode="light"/>
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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}
