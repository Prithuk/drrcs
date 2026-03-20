import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  AlertCircle,
  Clock,
  Users,
  Heart,
  Phone,
  Mail,
  Droplets,
  Flame,
  Wind,
  House,
  Menu,
  X,
} from 'lucide-react';
import ThemeToggle from '../components/common/ThemeToggle';
import './HomePage.css';

const futureNavItems = ['About', 'Services', 'Contact'];

const HomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const preventNavigation = (event) => {
    event.preventDefault();
  };

  return (
    <div className="home-page">
      <header className="public-header">
        <div className="public-header-content">
          <Link to="/" className="public-brand">
            <span className="public-brand-icon" aria-hidden="true">
              <Shield size={18} />
            </span>
            <span>DRRCS</span>
          </Link>

          <nav className="public-nav" aria-label="Public navigation">
            <Link to="/" className="public-nav-link public-nav-link-active">Home</Link>
            <Link to="/live-activity" className="public-nav-link">Live Activity</Link>
            <Link to="/track" className="public-nav-link">Track Request</Link>
            {futureNavItems.map((item) => (
              <button
                key={item}
                type="button"
                className="public-nav-link public-nav-link-disabled"
                aria-disabled="true"
                title="Coming soon"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="public-auth-links">
            <div className="public-theme-toggle" aria-label="Theme toggle">
              <ThemeToggle />
            </div>
            <Link to="/login" className="public-auth-link">Sign In</Link>
            <Link to="/register" className="public-auth-link">Sign Up</Link>
            <Link to="/dashboard" className="public-auth-link public-auth-link-primary">Dashboard</Link>
          </div>

          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label="Toggle mobile navigation"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setMobileMenuOpen((previous) => !previous)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div id="mobile-nav-panel" className="public-mobile-menu">
            <nav className="public-mobile-nav" aria-label="Mobile navigation">
              <Link to="/" className="public-nav-link public-nav-link-active" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link to="/live-activity" className="public-nav-link" onClick={() => setMobileMenuOpen(false)}>
                Live Activity
              </Link>
              <Link to="/track" className="public-nav-link" onClick={() => setMobileMenuOpen(false)}>
                Track Request
              </Link>
              {futureNavItems.map((item) => (
                <button
                  key={`mobile-${item}`}
                  type="button"
                  className="public-nav-link public-nav-link-disabled"
                  aria-disabled="true"
                  title="Coming soon"
                >
                  {item}
                </button>
              ))}
            </nav>

            <div className="public-mobile-auth">
              <div className="public-mobile-theme">
                <span>Theme</span>
                <ThemeToggle />
              </div>
              <Link to="/login" className="public-auth-link" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
              <Link to="/register" className="public-auth-link" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
              <Link to="/dashboard" className="public-auth-link public-auth-link-primary" onClick={() => setMobileMenuOpen(false)}>
                Dashboard
              </Link>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Rapid Response When Disaster Strikes</h1>
              <p>
                We provide coordinated emergency relief and support to communities affected by natural disasters. Available 24/7 to respond to your emergency needs.
              </p>
              <div className="hero-actions">
                <Link to="/submit-emergency-request" className="hero-btn hero-btn-primary">
                  <AlertCircle size={16} />
                  Submit Emergency Request
                </Link>
                <Link to="/track" className="hero-btn hero-btn-secondary">
                  <Clock size={16} />
                  Track Request
                </Link>
                <Link to="/live-activity" className="hero-btn hero-btn-secondary hero-btn-alert">
                  Live Activity
                </Link>
              </div>
            </div>

            <div className="hero-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1764684994219-8347a5ab0e5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXNhc3RlciUyMHJlbGllZiUyMGh1bWFuaXRhcmlhbiUyMGFpZHxlbnwxfHx8fDE3NzIwNjAxMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Disaster relief workers assisting community members"
                className="hero-image"
              />
            </div>
          </div>
        </section>

        <section className="home-stats">
          <div className="home-stats-grid">
            <article className="home-stat-card">
              <span className="home-stat-icon home-stat-icon-blue"><Clock size={18} /></span>
              <h2 className="home-stat-value">24/7</h2>
              <p className="home-stat-label">Emergency Response</p>
            </article>
            <article className="home-stat-card">
              <span className="home-stat-icon home-stat-icon-green"><Users size={18} /></span>
              <h2 className="home-stat-value">10,000+</h2>
              <p className="home-stat-label">People Helped</p>
            </article>
            <article className="home-stat-card">
              <span className="home-stat-icon home-stat-icon-orange"><Shield size={18} /></span>
              <h2 className="home-stat-value">500+</h2>
              <p className="home-stat-label">Relief Operations</p>
            </article>
            <article className="home-stat-card">
              <span className="home-stat-icon home-stat-icon-red"><Heart size={18} /></span>
              <h2 className="home-stat-value">95%</h2>
              <p className="home-stat-label">Successful Outcomes</p>
            </article>
          </div>
        </section>

        <section className="services-section">
          <div className="services-content">
            <h2>Our Emergency Services</h2>
            <p>
              We provide comprehensive disaster response services to help communities during
              their most critical times.
            </p>

            <div className="services-grid">
              <article className="service-card">
                <span className="service-icon service-icon-blue"><Shield size={20} /></span>
                <h3>Search &amp; Rescue</h3>
                <p>
                  Rapid deployment of trained rescue teams to locate and evacuate people from disaster zones.
                </p>
              </article>

              <article className="service-card">
                <span className="service-icon service-icon-red"><Heart size={20} /></span>
                <h3>Medical Aid</h3>
                <p>
                  Emergency medical services and first aid for injured individuals during disasters.
                </p>
              </article>

              <article className="service-card">
                <span className="service-icon service-icon-green"><House size={20} /></span>
                <h3>Shelter &amp; Housing</h3>
                <p>
                  Temporary shelter and housing assistance for displaced families and individuals.
                </p>
              </article>

              <article className="service-card">
                <span className="service-icon service-icon-orange"><Users size={20} /></span>
                <h3>Relief Supplies</h3>
                <p>
                  Distribution of food, water, clothing, and essential supplies to affected communities.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="coverage-section">
          <div className="coverage-content">
            <h2>Disaster Response Coverage</h2>
            <p>Our team is trained and equipped to respond to all types of natural disasters.</p>
            <div className="coverage-grid">
              <article className="coverage-card" tabIndex="0">
                <span className="coverage-icon coverage-icon-blue"><Droplets size={18} /></span>
                <h3>Floods</h3>
                <p>Rapid rescue support, temporary shelter, and clean-water distribution.</p>
              </article>
              <article className="coverage-card" tabIndex="0">
                <span className="coverage-icon coverage-icon-orange"><Flame size={18} /></span>
                <h3>Wildfires</h3>
                <p>Evacuation coordination, respiratory aid, and emergency supply delivery.</p>
              </article>
              <article className="coverage-card" tabIndex="0">
                <span className="coverage-icon coverage-icon-purple"><Wind size={18} /></span>
                <h3>Hurricanes</h3>
                <p>Storm response teams for evacuation, shelter, and post-storm relief.</p>
              </article>
              <article className="coverage-card" tabIndex="0">
                <span className="coverage-icon coverage-icon-gray"><Wind size={18} /></span>
                <h3>Tornadoes</h3>
                <p>Immediate response for injuries, housing displacement, and debris impact.</p>
              </article>
              <article className="coverage-card" tabIndex="0">
                <span className="coverage-icon coverage-icon-red"><AlertCircle size={18} /></span>
                <h3>Earthquakes</h3>
                <p>Search assistance, first aid coordination, and urgent resource mobilization.</p>
              </article>
              <article className="coverage-card" tabIndex="0">
                <span className="coverage-icon coverage-icon-green"><Shield size={18} /></span>
                <h3>Other</h3>
                <p>Flexible emergency support for unexpected or complex disaster conditions.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="how-section">
          <div className="how-content">
            <h2>How Our System Works</h2>
            <p>Our streamlined process ensures rapid response to emergency situations.</p>
            <div className="how-grid">
              <article className="how-card">
                <span className="how-step">1</span>
                <h3>Submit Emergency Request</h3>
                <p>Report your emergency through our online form, phone hotline, or mobile app.</p>
              </article>
              <article className="how-card">
                <span className="how-step">2</span>
                <h3>Rapid Assessment</h3>
                <p>Our team evaluates the situation and assigns priority based on urgency and severity.</p>
              </article>
              <article className="how-card">
                <span className="how-step">3</span>
                <h3>Deploy Resources</h3>
                <p>Resources and response teams are dispatched immediately to provide assistance.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="emergency-cta">
          <div className="emergency-cta-content">
            <h2>Need Emergency Assistance?</h2>
            <p>Our team is standing by 24/7 to respond to disaster emergencies. Don't hesitate to reach out.</p>
            <div className="emergency-cta-actions">
              <Link to="/submit-emergency-request" className="emergency-btn emergency-btn-solid">
                <AlertCircle size={16} />
                Submit Emergency Request
              </Link>
              <a href="tel:1-800-DISASTER" className="emergency-btn emergency-btn-outline">
                <Phone size={16} />
                Call 1-800-DISASTER
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="public-footer">
        <div className="public-footer-content">
          <div className="public-footer-grid">
            <section className="public-footer-about">
              <Link to="/" className="public-footer-brand" aria-label="Go to home page">
                <span className="public-brand-icon public-footer-brand-icon" aria-hidden="true">
                  <Shield size={18} />
                </span>
                <div>
                  <h3>DRRCS</h3>
                  <p>Relief &amp; Response</p>
                </div>
              </Link>
              <p>
                Dedicated to rapid and effective disaster response support for communities in need.
              </p>
            </section>

            <section>
              <h4>Quick Links</h4>
              <ul className="public-footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/live-activity">Live Activity</Link></li>
                <li><Link to="/track">Track Request</Link></li>
                <li><button type="button" className="public-footer-link-disabled" aria-disabled="true" title="Coming soon">About</button></li>
                <li><button type="button" className="public-footer-link-disabled" aria-disabled="true" title="Coming soon">Services</button></li>
                <li><button type="button" className="public-footer-link-disabled" aria-disabled="true" title="Coming soon">Contact</button></li>
                <li><Link to="/login">Sign In</Link></li>
                <li><Link to="/register">Sign Up</Link></li>
              </ul>
            </section>

            <section>
              <h4>Contact</h4>
              <ul className="public-footer-contact">
                <li>
                  <Phone size={14} />
                  <span>1-800-DISASTER</span>
                </li>
                <li>
                  <Mail size={14} />
                  <span>help@drrcs.org</span>
                </li>
              </ul>
            </section>
          </div>

          <div className="public-footer-bottom">
            <p>&copy; 2026 DRRCS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;