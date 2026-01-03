import Navbar from "../../components/Navbar/Navbar";
import "./Landing.css";
import recycle from "../../assets/recycle-logo.jpg"
import innovation from "../../assets/kid-innovation.jpeg"
function Landing() {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Turning <span>Campus Waste</span> into{" "}
              <span>Innovation</span>
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

          {/* HERO IMAGE */}
          <div className="hero-image">
            <img
              src={recycle}
              alt="Sustainable Innovation"
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
          <div className="step-card">
            <img
              src="https://illustrations.popsy.co/green/uploading.svg"
              alt="Upload"
            />
            <h3>List Waste</h3>
            <p>
              Labs and industries upload surplus materials with photos,
              quantity, and location.
            </p>
          </div>

          <div className="step-card">
            <img
              src="https://illustrations.popsy.co/green/searching.svg"
              alt="Discover"
            />
            <h3>Discover & Request</h3>
            <p>
              Students explore available materials and request what they
              need for projects.
            </p>
          </div>

          <div className="step-card">
            <img
              src="https://illustrations.popsy.co/green/analytics.svg"
              alt="Impact"
            />
            <h3>Track Impact</h3>
            <p>
              Every exchange updates live sustainability and impact
              metrics.
            </p>
          </div>
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
            <p>
              Discover reusable resources and lower sourcing costs.
            </p>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="impact-highlight">
        <h2>Why It Matters</h2>

        <div className="impact-cards">
          <div className="impact-card">
            <img
              src="https://illustrations.popsy.co/green/recycle.svg"
              alt="Recycle"
            />
            <h3>Waste Reduction</h3>
            <p>Materials diverted from landfills.</p>
          </div>

          <div className="impact-card">
            <img
              src="https://illustrations.popsy.co/green/eco.svg"
              alt="CO2"
            />
            <h3>Lower Carbon Footprint</h3>
            <p>Reduced emissions through reuse.</p>
          </div>

          <div className="impact-card">
            <img
              src={innovation}
              alt="Innovation"
            />
            <h3>Innovation Enablement</h3>
            <p>Lower barriers for student innovation.</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
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
