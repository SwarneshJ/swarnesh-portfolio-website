import React, { useEffect } from 'react';
import { Ruler, Headphones, UserCheck, TrendingUp, Tags, Target, PackageX, Sun } from 'lucide-react';
import './Faherty.css';

const Faherty: React.FC = () => {
  useEffect(() => {
    document.title = "Faherty Brand | AI Opportunities";
  }, []);

  return (
    <div className="faherty-container">
      {/* Hero Section */}
      <section className="hero-section" style={{ minHeight: 'auto', padding: '6rem 2rem 3rem' }}>
        <h1 className="hero-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: 0, flexWrap: 'wrap', fontSize: 'clamp(1.5rem, 4vw, 3rem)', whiteSpace: 'nowrap' }}>
          <img src="https://fahertybrand.com/cdn/shop/files/SUN_WAVES_LOGO_2024_3.png" alt="Faherty Logo" style={{ height: '50px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
          Unlocking margins through AI at Faherty
        </h1>
      </section>

      {/* 4 Areas Listed */}
      <section className="section-container" style={{ paddingTop: '0', paddingBottom: '4rem' }}>
        <div className="areas-pill-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem' }}>
          <span className="area-pill">Customer Experience</span>
          <span className="area-pill">Merchandising & Buying</span>
          <span className="area-pill">Operations & Fulfillment</span>
        </div>
      </section>

      {/* Transition Text */}
      <section className="section-container" style={{ paddingBottom: '0' }}>
        <h2 className="section-title">First we need to understand the current pain points</h2>
      </section>

      {/* Pain Points Section */}
      <section className="section-container" style={{ paddingTop: '2rem' }}>
        <div className="pain-points-grid">
          {/* Sizing Problem Card */}
          <div className="card">
            <div className="card-header">
              <div className="card-icon icon-danger">
                <Ruler size={24} />
              </div>
              <h3 className="card-title">The Sizing Reality</h3>
            </div>
            <p>
              Sizing isn't just a fit preference problem; it's a documented data failure that costs real money. 
              The industry baseline for online returns is <strong>24.4%</strong>, eating $25B annually. Faherty's problem 
              appears worse than the baseline due to sizing inconsistencies.
            </p>
            
            <div className="quote-box">
              Ordered an XL, found it enormous. Exchanged for a Medium thinking two sizes down would correct it. 
              Received what seemed like the same garment. Ended up out of stock on smaller sizes and had to take 
              an already-overpriced shirt to a tailor.
              <span className="source-tag">Source: Trustpilot</span>
            </div>

            <span className="stat-highlight">20% Boost</span>
            <span className="stat-subtext">to bottom line in a zero-return scenario at $200-$225 AOV. Even a 5-point reduction is massive.</span>
          </div>

          {/* Customer Service Card */}
          <div className="card">
            <div className="card-header">
              <div className="card-icon icon-warning">
                <Headphones size={24} />
              </div>
              <h3 className="card-title">CS Routing Failures</h3>
            </div>
            <p>
              Customer service is acting as a loyalty destruction machine due to poor routing. Tickets are 
              not triaged by urgency, causing high-priority exchange requests to sit with general inquiries.
            </p>

            <div className="quote-box">
              A Legend VIP rewards customer emailed three times over two weeks about an undelivered order and 
              unfulfilled birthday gift rewards, with zero response.
              <span className="source-tag">Source: Better Business Bureau</span>
            </div>

            <span className="stat-highlight">67%</span>
            <span className="stat-subtext">of consumers say a negative return experience discourages future shopping. Generous 60-day policy, poor execution.</span>
          </div>
        </div>
      </section>

      {/* AI Opportunities Map */}
      <section className="section-container">
        <h2 className="section-title">AI Opportunity Map</h2>
        
        <div className="opportunities-grid">
          {/* Customer Experience */}
          <div className="opp-card horizontal">
            <h3 className="opp-category"><UserCheck size={24} /> Customer Experience</h3>
            
            <div className="use-case">
              <div className="use-case-title">
                <Target size={20} /> Review + Complaint Classifier
              </div>
              <p className="use-case-desc">
                Ingest reviews across all channels and label by complaint type (sizing, quality, refund delay). 
                Uses a trained RoBERTa model to save costs compared to zero-shot LLMs, giving Merch and Ops a real-time signal feed.
              </p>
            </div>

            <div className="use-case">
              <div className="use-case-title">
                <Target size={20} /> CS Ticket Triage & Routing
              </div>
              <p className="use-case-desc">
                Tag inbound raw text tickets by type and priority (amount at risk, loyalty tier, time since purchase) 
                and route to the correct queue automatically. Prevent VIPs from being ignored.
              </p>
              <span className="pipeline-badge">Pure NLP Classification</span>
            </div>

            <div className="use-case">
              <div className="use-case-title">
                <Target size={20} /> AI-Powered Stylist & Fit
              </div>
              <p className="use-case-desc">
                Reduce purchase uncertainty to directly impact both conversion and returns. Build an AI-powered stylist and fit recommendation system that helps customers choose the right product, size, and outfit in real time.
              </p>
              <ul style={{ margin: '0.75rem 0', paddingLeft: '1.25rem', fontSize: '0.95rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <li>Improves conversion → revenue upside</li>
                <li>Reduces returns → cost savings</li>
                <li>Increases AOV through outfit bundling</li>
              </ul>
              <span className="pipeline-badge">Revenue & Cost Lever</span>
            </div>
          </div>

          {/* Merchandising & Buying */}
          <div className="opp-card">
            <h3 className="opp-category"><TrendingUp size={24} /> Merchandising & Buying</h3>
            
            <div className="use-case">
              <div className="use-case-title">
                <Target size={20} /> Cold-Start SKU Classifier
              </div>
              <p className="use-case-desc">
                Map new SKU attributes (fabric, colorway, description, seasonality) to a demand tier 
                (high/medium/low confidence) when sales history is missing, acting as a cold-start forecasting model.
              </p>
              <span className="pipeline-badge">Text + Structured Features</span>
            </div>
          </div>

          {/* Operations & Fulfillment */}
          <div className="opp-card">
            <h3 className="opp-category"><PackageX size={24} /> Operations & Fulfillment</h3>
            
            <div className="use-case">
              <div className="use-case-title">
                <Target size={20} /> Return Reason Classifier
              </div>
              <p className="use-case-desc">
                Replace noise-heavy dropdowns with a free-text return field. A classifier tags returns at the SKU 
                level to identify runs 2 sizes large signals before they hit review platforms. Reduces overproduction.
              </p>
              <span className="pipeline-badge">B-Corp Sustainability Win</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faherty;
