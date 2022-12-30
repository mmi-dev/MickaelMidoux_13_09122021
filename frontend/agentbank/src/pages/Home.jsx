import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHomeFeaturesData } from "../features/homeFeaturesSlice";
import { getMokedFeatures } from "../moks/servicesMock";
import Feature from "../components/Feature";

function Home() {
  const dispatch = useDispatch();
  const featuresData = useSelector((state) => state.homeFeatures.homeFeatures);

  const getFeatures = async () => {
    const response = await getMokedFeatures();
    if (response.responseStatus === 200) {
      dispatch(setHomeFeaturesData(response.data));
    } else {
      console.log("error message");
    }
  };

  useEffect(() => {
    document.getElementById("main").classList.remove("bg-dark");
    getFeatures();
  }, []);

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
        {featuresData &&
          featuresData.map((feature, index) => {
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
