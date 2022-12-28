import { useState, useEffect } from "react";
import Feature from "../components/Feature";
import { getFeatures } from "../services/Services";

function Home() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    document.getElementById("main").classList.remove("bg-dark");
    getFeatures().then((res) => setFeatures(res));
  });

  return (
    <>
      <div className="hero">
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className="features">
        <h2 className="sr-only">Features</h2>
        {features &&
          features.map((feature, index) => {
            return (
              <Feature
                key={index}
                title={feature.title}
                icon={feature.icon}
                alt={feature.iconAlt}
                text={feature.text}
              />
            );
          })}
      </section>
    </>
  );
}

export default Home;
