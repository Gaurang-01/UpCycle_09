import Navbar from "../../components/Navbar/Navbar";
import "./Landing.css";

// Assets
import recycle from "../../assets/recycle-logo.jpg";
import innovation from "../../assets/kid-innovation.jpeg";
import listWasteImg from "../../assets/list.jpeg";
import CO2 from "../../assets/CarbonFootprint.jpg";
import trackimpact from "../../assets/track impact.jpeg";
import recycleworker from "../../assets/recycling_worker.jpeg";
import Request from "../../assets/request.jpeg";

function Landing() {
  const steps = [
    {
      img: listWasteImg,
      title: "List Waste",
      desc:
        "Labs and industries upload surplus materials with photos, quantity, and location.",
    },
    {
      img: Request,
      title: "Discover & Request",
      desc:
        "Students explore available materials and request what they need for projects.",
    },
    {
      img: trackimpact,
      title: "Track Impact",
      desc:
        "Every exchange updates live sustainability and impact metrics.",
    },
  ];

  const impacts = [
    {
      img: recycleworker,
      title: "Waste Reduction",
      desc: "Materials diverted from landfills.",
    },
    {
      img: CO2,
      title: "Lower Carbon Footprint",
      desc: "Reduced emissions through reuse.",
    },
    {
      img: innovation,
      title: "Innovation Enablement",
      desc: "Lower barriers for student innovation.",
    },
  ];

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Turning <span>Campus Waste</span> into <span>Innovation</span>
            </h1>

            <p>
              Laboratories and industries discard reusable materials every
              day. UpCycle Connect transforms this waste into resources
              for students, innovators, and startups.
            </p>

            <div className="hero-actions">
              <a href="/marketplace" className="primary-btn">
                Explore Materials
              </a>
              <a href="/upload" className="secondary-btn">
                Upload Waste
              </a>
            </div>
          </div>

          <div className="hero-image">
            <img
              src={recycle}
              alt="Sustainable Innovation"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="problem">
        <h2>The Problem</h2>
        <p>
          Valuable materials such as metal scraps, electronic components,
          chemical containers, and timber offcuts are often discarded due
          to lack of visibility and coordination — even when they could
          be reused.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <h2>How UpCycle Connect Works</h2>

        <div className="steps">
          {steps.map((step, index) => (
            <div className="step-card" key={index}>
              <img src={step.img} alt={step.title} loading="lazy" />
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="audience">
        <h2>Who Is This For?</h2>

        <div className="audience-grid">
          <div className="audience-card">
            <h3>Students</h3>
            <p>
              Access affordable materials for projects, prototypes, and
              hackathons.
            </p>
          </div>

          <div className="audience-card">
            <h3>Labs & Colleges</h3>
            <p>
              Reduce waste, improve sustainability, and support student
              innovation.
            </p>
          </div>

          <div className="audience-card">
            <h3>Startups & Recyclers</h3>
            <p>Discover reusable resources and lower sourcing costs.</p>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="impact-highlight">
        <h2>Why It Matters</h2>

        <div className="impact-cards">
          {impacts.map((item, index) => (
            <div className="impact-card" key={index}>
              <img src={item.img} alt={item.title} loading="lazy" />
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="final-cta">
        <h2>Start Reusing. Start Building.</h2>
        <a href="/marketplace" className="primary-btn">
          View Marketplace
        </a>
      </section>
    </>
  );
}

export default Landing;
