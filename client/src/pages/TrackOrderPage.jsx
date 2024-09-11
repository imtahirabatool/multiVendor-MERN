import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import TrackOrder from "../components/Profile/TrackOrder.jsx";

const TrackOrderPage = () => {
  window.scrollTo(0, 0);

  return (
    <div>
      <Header />
      <TrackOrder />
      <Footer />
    </div>
  );
};

export default TrackOrderPage;
