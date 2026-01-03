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
      desc: "Labs and industries upload surplus materials with photos, quantity, and location.",
    },
    {
      img: Request,
      title: "Discover & Request",
      desc: "Students explore available materials and request what they need for projects.",
    },
    {
      img: trackimpact,
      title: "Track Impact",
      desc: "Every exchange updates live sustainability and impact metrics.",
    },
  ];

  const impacts = [
    {
      img: recycleworker,
      title: "Waste Reduction",
      value: "500+ kg",
      desc: "Materials diverted from landfills.",
    },
    {
      img: CO2,
      title: "Lower Carbon Footprint",
      value: "1.2 Tons",
      desc: "Reduced emissions through reuse.",
    },
    {
      img: innovation,
      title: "Innovation Enablement",
      value: "30+ Projects",
      desc: "Lower barriers for student innovation.",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="landing-page">
        
        {/* --- [REVERTED] ORIGINAL HERO SECTION --- */}
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
                    {/* Added floating-img class here */}
                    <img
                        src={recycle}
                        alt="Sustainable Innovation"
                        loading="lazy"
                        className="floating-img"
                    />
                </div>
            </div>
        </section>

        {/* --- [REVERTED] ORIGINAL PROBLEM SECTION --- */}
        <section className="problem">
            <h2>The Problem</h2>
            <p>
                Valuable materials such as metal scraps, electronic components,
                chemical containers, and timber offcuts are often discarded due
                to lack of visibility and coordination — even when they could
                be reused.
            </p>
        </section>

        {/* --- ORIGINAL HOW IT WORKS SECTION --- */}
        <section className="how-it-works">
          <div className="container">
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
          </div>
        </section>

        {/* --- [KEPT NEW] AUDIENCE SECTION --- */}
        <section className="audience-section">
          <div className="container">
            <div className="audience-grid">
              <div className="audience-text">
                <h2>Who Is This For?</h2>
                <p>An ecosystem where everyone wins.</p>
                
                <div className="benefit-item">
                  <div className="icon">🎓</div>
                  <div>
                    <h4>Students</h4>
                    <p>Access affordable materials for projects, prototypes, and hackathons.</p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="icon">🧪</div>
                  <div>
                    <h4>Labs & Colleges</h4>
                    <p>Reduce waste, improve sustainability, and support student innovation.</p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="icon">🏗️</div>
                  <div>
                    <h4>Startups & Recyclers</h4>
                    <p>Discover reusable resources and lower sourcing costs.</p>
                  </div>
                </div>
              </div>
              
              <div className="audience-visual">
                <div className="visual-box">
                  <h3>Join the Movement</h3>
                  <p>Building the future with recycled materials.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- [KEPT NEW] IMPACT SECTION --- */}
        <section className="impact-section">
          <div className="container">
            <h2>Why It Matters</h2>
            <div className="impact-grid">
              {impacts.map((item, index) => (
                <div className="impact-card" key={index}>
                  <img src={item.img} alt={item.title} className="bg-img" />
                  <div className="overlay">
                    <h3>{item.value}</h3>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- [KEPT NEW] CTA SECTION --- */}
        <section className="cta-section">
          <div className="container">
            <h2>Start Reusing. Start Building.</h2>
            <p>Join the circular economy movement today.</p>
            <a href="/marketplace" className="btn btn-primary btn-large">
              View Marketplace
            </a>
          </div>
        </section>

      </div>
    </>
  );
}

export default Landing;