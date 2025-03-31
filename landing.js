import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const LandingPage = () => {
  return (
    <div className="container-fluid p-0" style={{ backgroundColor: "#556B2F", minHeight: "100vh", color: "white" }}>
      <header className="text-center py-4" style={{ backgroundColor: "#6B8E23" }}>
        <h1>Welcome to Olive Stay</h1>
        <p>Find the best hotels for your perfect getaway</p>
      </header>

      <section className="container my-5">
        <div className="row">
          <div className="col-md-4">
            <div className="card" style={{ backgroundColor: "#6B8E23", color: "white" }}>
              <img src="https://via.placeholder.com/300" className="card-img-top" alt="Hotel 1" />
              <div className="card-body">
                <h5 className="card-title">Luxury Suites</h5>
                <p className="card-text">Experience premium comfort and luxury.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card" style={{ backgroundColor: "#6B8E23", color: "white" }}>
              <img src="https://via.placeholder.com/300" className="card-img-top" alt="Hotel 2" />
              <div className="card-body">
                <h5 className="card-title">Beachside Resorts</h5>
                <p className="card-text">Enjoy stunning ocean views with top amenities.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card" style={{ backgroundColor: "#6B8E23", color: "white" }}>
              <img src="https://via.placeholder.com/300" className="card-img-top" alt="Hotel 3" />
              <div className="card-body">
                <h5 className="card-title">Budget-Friendly Stays</h5>
                <p className="card-text">Affordable options without compromising quality.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center py-3" style={{ backgroundColor: "#6B8E23" }}>
        <p>&copy; 2025 Olive Stay. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
