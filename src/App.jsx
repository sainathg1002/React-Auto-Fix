import { useState, useEffect } from 'react';

// Local Image Imports
import valetImg from './assets/images/valet.jpg';
import brakePadsImg from './assets/images/part-brake-pads.jpg';
import engineOilImg from './assets/images/part-engine-oil.jpg';
import clutchPlateImg from './assets/images/part-clutch-plate.jpg';
import sparkPlugsImg from './assets/images/part-spark-plugs.jpg';
import blrMpowerImg from './assets/images/workshop-blr-mpower.jpg';
import blrUltimateImg from './assets/images/workshop-blr-ultimate.jpg';
import blrBavarianImg from './assets/images/workshop-blr-bavarian.jpg';
import deccanImg from './assets/images/workshop-deccan.jpg';
import apexImg from './assets/images/workshop-apex.jpg';
import nizamImg from './assets/images/workshop-nizam.jpg';

// Data Definitions
const SERVICES_DATA = [
  {
    id: 'service-general',
    name: 'General Service',
    price: 2499,
    duration: '3 Hours',
    desc: 'Comprehensive mechanical check, fluid level top-ups, air filter cleaning, and full computerized diagnostics scan.',
    features: [
      '32-point computer diagnostics check',
      'Brake wear & safety inspections',
      'Coolant & fluids level corrections',
      'Air filter and spark plug cleaning'
    ]
  },
  {
    id: 'service-oil',
    name: 'Oil Change',
    price: 1499,
    duration: '1 Hour',
    desc: 'Engine flush, drain, and oil replacement using high-performance fully synthetic oil and genuine filter components.',
    features: [
      'Premium fully synthetic engine oil',
      'Genuine oil filter replacement',
      'Ecological old oil disposal',
      'Tread wear diagnostic inspection'
    ]
  },
  {
    id: 'service-battery',
    name: 'Battery Replacement',
    price: 3999,
    duration: '1 Hour',
    desc: 'Battery load testing, terminal sanitation, and installation of a high-durability performance battery (includes warranty).',
    features: [
      'High-performance maintenance-free battery',
      'Terminals cleaning & chemical lubrication',
      'Battery load check certification',
      'Up to 3-year warranty setup'
    ]
  },
  {
    id: 'service-tyre',
    name: 'Tyre Alignment Checking',
    price: 799,
    duration: '2 Hours',
    desc: 'Precision 3D steering angle checking, wheel balancing calibrations, and computerized tyre wear angle corrections.',
    features: [
      'Precision 3D steering alignment scan',
      'Wheel balancing and balance weights',
      'Tyre pressure and tread depth index',
      'Steering angle zero-calibration'
    ]
  }
];

const SPARE_PARTS_DATA = [
  {
    id: 'part-brake-pads',
    name: 'Performance Brake Pads',
    price: 3499,
    desc: 'High-friction carbon-metallic brake pads. Designed for extreme braking stability and reduced dust.',
    img: brakePadsImg
  },
  {
    id: 'part-engine-oil',
    name: 'Premium Synthetic Engine Oil (4L)',
    price: 2899,
    desc: 'Advanced friction-reducing formulation to protect motors under high temperature thresholds.',
    img: engineOilImg
  },
  {
    id: 'part-clutch-plate',
    name: 'Heavy-Duty Clutch Plate',
    price: 6499,
    desc: 'Reinforced friction coupling, providing efficient torque transfer and long endurance life.',
    img: clutchPlateImg
  },
  {
    id: 'part-spark-plugs',
    name: 'Motorsport Spark Plugs (Set of 4)',
    price: 1799,
    desc: 'Double-iridium core spark plugs engineered for robust ignition firing and fuel combustion stability.',
    img: sparkPlugsImg
  }
];

const WORKSHOPS_DATA = {
  bengaluru: [
    {
      name: 'M-Power Performance Center',
      address: 'Plot 42, Electronic City Phase 1, Bengaluru - 560100',
      rating: '4.9 ★',
      distance: '2.4 km away',
      img: blrMpowerImg
    },
    {
      name: 'Ultimate Car Craft',
      address: '12, Indiranagar Double Rd, Bengaluru - 560038',
      rating: '4.8 ★',
      distance: '5.1 km away',
      img: blrUltimateImg
    },
    {
      name: 'Bavarian Auto Works',
      address: 'Outer Ring Rd, Whitefield, Bengaluru - 560066',
      rating: '4.7 ★',
      distance: '8.9 km away',
      img: blrBavarianImg
    }
  ],
  hyderabad: [
    {
      name: 'Deccan Motorsports',
      address: 'Road No. 36, Jubilee Hills, Hyderabad - 500033',
      rating: '4.9 ★',
      distance: '3.1 km away',
      img: deccanImg
    },
    {
      name: 'Apex Auto Care',
      address: 'Hi-Tech City Main Rd, Kothaguda, Hyderabad - 500084',
      rating: '4.7 ★',
      distance: '4.5 km away',
      img: apexImg
    },
    {
      name: 'Nizam Elite Garages',
      address: 'Gachibowli Outer Ring Rd, Hyderabad - 500032',
      rating: '4.8 ★',
      distance: '6.2 km away',
      img: nizamImg
    }
  ],
  chennai: [
    {
      name: 'Coromandel Garage',
      address: 'ECR Road, Thiruvanmiyur, Chennai - 600041',
      rating: '4.8 ★',
      distance: '1.8 km away',
      img: deccanImg
    },
    {
      name: 'Madras Circuit Services',
      address: 'Mount Road, Nandanam, Chennai - 600035',
      rating: '4.9 ★',
      distance: '4.2 km away',
      img: apexImg
    },
    {
      name: 'Marina Precision Auto',
      address: 'OMR Road, Karapakkam, Chennai - 600097',
      rating: '4.6 ★',
      distance: '7.0 km away',
      img: nizamImg
    }
  ]
};

const VALET_FEE = 999;

function App() {
  // App States
  const [currentCity, setCurrentCity] = useState('bengaluru');
  const [selectedServices, setSelectedServices] = useState(new Set(['service-general']));
  const [selectedParts, setSelectedParts] = useState(new Set());
  const [selectedWorkshop, setSelectedWorkshop] = useState(WORKSHOPS_DATA['bengaluru'][0].name);

  // Form States
  const [pickupDropActive, setPickupDropActive] = useState(false);
  const [pickupAddress, setPickupAddress] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [carDetails, setCarDetails] = useState('');

  // Min appointment date helper (today's date in YYYY-MM-DD format)
  const [minDate, setMinDate] = useState('');

  // Confirmation Modal States
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [confirmData, setConfirmData] = useState({
    ref: '',
    workshop: '',
    datetime: '',
    valet: '',
    vehicle: '',
    amount: ''
  });

  // Effect to set the minimum booking date to today
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);
  }, []);

  // Listen to Escape key for confirmation modal closure
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && confirmationVisible) {
        handleCloseConfirm();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [confirmationVisible]);

  // Sync current city helper
  const syncCityChange = (newCity) => {
    setCurrentCity(newCity);
    const workshops = WORKSHOPS_DATA[newCity] || [];
    if (workshops.length > 0) {
      setSelectedWorkshop(workshops[0].name);
    }
  };

  // Pricing Calculations
  const servicesSubtotal = Array.from(selectedServices).reduce((sum, id) => {
    const s = SERVICES_DATA.find((item) => item.id === id);
    return sum + (s ? s.price : 0);
  }, 0);

  const partsSubtotal = Array.from(selectedParts).reduce((sum, id) => {
    const p = SPARE_PARTS_DATA.find((item) => item.id === id);
    return sum + (p ? p.price : 0);
  }, 0);

  const valetCharge = pickupDropActive ? VALET_FEE : 0;
  const taxableAmount = servicesSubtotal + partsSubtotal + valetCharge;
  const gst = Math.round(taxableAmount * 0.18);
  const grandTotal = taxableAmount + gst;

  // Toggle helpers
  const handleToggleService = (id) => {
    const next = new Set(selectedServices);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedServices(next);
  };

  const handleTogglePart = (id) => {
    const next = new Set(selectedParts);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedParts(next);
  };

  // Format date-time helper for summary
  const getFormattedDateTime = () => {
    if (appointmentDate && appointmentTime) {
      const dateObj = new Date(appointmentDate);
      const formattedDate = dateObj.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
      return `${formattedDate} @ ${appointmentTime}`;
    } else if (appointmentDate) {
      const dateObj = new Date(appointmentDate);
      return dateObj.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }
    return '-';
  };

  // Form submit handler
  const handleSubmitBooking = (e) => {
    e.preventDefault();

    if (selectedServices.size === 0) {
      alert('PILOT WARNING: Select at least one standard service package to proceed.');
      return;
    }

    if (pickupDropActive && !pickupAddress.trim()) {
      alert('PILOT WARNING: Complete valet address coordinates are required.');
      return;
    }

    // Generate dynamic ticket reference number
    const randomRef =
      'M-' +
      Math.floor(10000 + Math.random() * 90000) +
      String.fromCharCode(65 + Math.floor(Math.random() * 26));

    const dateObj = new Date(appointmentDate);
    const formattedDate = dateObj.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    setConfirmData({
      ref: randomRef,
      workshop: selectedWorkshop.toUpperCase(),
      datetime: `${formattedDate} @ ${appointmentTime}`,
      valet: pickupDropActive
        ? 'VALET ACTIVE (INBOUND & OUTBOUND)'
        : 'VALET OFF (DIRECT DROP-OFF)',
      vehicle: carDetails.toUpperCase(),
      amount: `₹${grandTotal.toLocaleString('en-IN')}`
    });

    setConfirmationVisible(true);
    document.body.style.overflow = 'hidden'; // prevent scrolling behind modal
  };

  // Confirmation Modal Close
  const handleCloseConfirm = () => {
    setConfirmationVisible(false);
    document.body.style.overflow = ''; // restore scrolling

    // Reset forms & states
    setPickupDropActive(false);
    setPickupAddress('');
    setAppointmentDate('');
    setAppointmentTime('');
    setClientName('');
    setClientPhone('');
    setClientEmail('');
    setCarDetails('');

    setSelectedServices(new Set(['service-general']));
    setSelectedParts(new Set());
    syncCityChange('bengaluru');

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Navigation */}
      <nav className="top-nav" id="top-navigation">
        <div className="nav-container">
          <a href="#" className="nav-logo">
            <span className="logo-text">AUTOFIX</span>
          </a>

          <ul className="nav-menu">
            <li><a href="#workshops-section" className="nav-link">Workshops</a></li>
            <li><a href="#services-section" className="nav-link">Services</a></li>
            <li><a href="#parts-section" className="nav-link">Spare Parts</a></li>
            <li><a href="#booking-section" className="nav-link">Book Now</a></li>
            <li><a href="#pickup-valet-section" className="nav-link">Pickup & Valet</a></li>
          </ul>

          <div className="nav-right">
            <div className="city-selector-wrapper">
              <i className="fa-solid fa-location-dot location-icon"></i>
              <select
                id="global-city-selector"
                className="nav-city-select"
                value={currentCity}
                onChange={(e) => syncCityChange(e.target.value)}
              >
                <option value="bengaluru">BENGALURU</option>
                <option value="hyderabad">HYDERABAD</option>
                <option value="chennai">CHENNAI</option>
              </select>
            </div>
            <a href="#booking-section" className="btn-nav-book">BOOK NOW</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-band" id="hero-banner">
        <div className="hero-bg-overlay"></div>
        <div className="hero-content">
          <span className="hero-label">ENGINEERED PRECISION</span>
          <h1 className="hero-title">AUTOFIX PREMIUM<br />VEHICLE CARE.</h1>
          <p className="hero-subtitle">High-performance car maintenance, tuning, and genuine spares across India's premier cities. Engineered for enthusiasts.</p>
          <div className="hero-actions">
            <a href="#booking-section" className="button-primary">BOOK SERVICE</a>
            <a href="#workshops-section" className="button-primary-outline">EXPLORE WORKSHOPS</a>
          </div>
        </div>
      </section>

      {/* M Tricolor Divider */}
      <div className="m-stripe-divider"></div>

      {/* City & Workshops Section */}
      <section className="workshops-section" id="workshops-section">
        <div className="container">
          <span className="section-label">01 // NETWORKS</span>
          <h2 className="section-title">AUTOFIX PARTNER HUBS</h2>
          <p className="section-description">Select your city to explore certified partner workshops with state-of-the-art diagnostic lanes and factory-trained masters.</p>

          {/* City Selection Tabs */}
          <div className="city-tabs" id="city-tabs-container">
            <button
              className={`category-tab ${currentCity === 'bengaluru' ? 'active' : ''}`}
              onClick={() => syncCityChange('bengaluru')}
            >
              BENGALURU
            </button>
            <button
              className={`category-tab ${currentCity === 'hyderabad' ? 'active' : ''}`}
              onClick={() => syncCityChange('hyderabad')}
            >
              HYDERABAD
            </button>
            <button
              className={`category-tab ${currentCity === 'chennai' ? 'active' : ''}`}
              onClick={() => syncCityChange('chennai')}
            >
              CHENNAI
            </button>
          </div>

          {/* Workshop Cards Grid */}
          <div className="workshop-grid" id="workshop-cards-grid">
            {(WORKSHOPS_DATA[currentCity] || []).map((center, index) => (
              <div key={index} className="workshop-card">
                <div className="workshop-img" style={{ backgroundImage: `url(${center.img})` }}></div>
                <div className="workshop-info">
                  <h3 className="workshop-name">{center.name}</h3>
                  <p className="workshop-address">{center.address}</p>
                  <div className="workshop-meta">
                    <span className="meta-rating">{center.rating}</span>
                    <span className="meta-distance">{center.distance}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* M Tricolor Divider */}
      <div className="m-stripe-divider"></div>

      {/* Services Section */}
      <section className="services-section" id="services-section">
        <div className="container">
          <span className="section-label">02 // SERVICES</span>
          <h2 className="section-title">STANDARD SERVICE CATALOG</h2>
          <p className="section-description">Explore our transparent service rates. Designed for efficiency, reliability, and precision maintenance using quality fluids and check routines.</p>

          <div className="services-grid" id="services-grid-container">
            {SERVICES_DATA.map((service) => {
              const isSelected = selectedServices.has(service.id);
              return (
                <div key={service.id} className="service-cell">
                  <div className="service-cell-header">
                    <span className="service-duration"><i className="fa-solid fa-clock"></i> {service.duration}</span>
                    <span className="service-price">₹{service.price.toLocaleString('en-IN')}</span>
                  </div>
                  <h3 className="service-title">{service.name}</h3>
                  <p className="service-desc">{service.desc}</p>
                  <ul className="service-features-list">
                    {service.features.map((f, i) => (
                      <li key={i}><i className="fa-solid fa-chevron-right"></i> {f}</li>
                    ))}
                  </ul>
                  <div className="service-actions">
                    <button
                      type="button"
                      className={`btn-select-service ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleToggleService(service.id)}
                    >
                      {isSelected ? 'ADDED TO BOOKING' : 'ADD TO BOOKING'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* M Tricolor Divider */}
      <div className="m-stripe-divider"></div>

      {/* Spare Parts Section */}
      <section className="parts-section" id="parts-section">
        <div className="container">
          <span className="section-label">03 // COMPONENTS</span>
          <h2 className="section-title">GENUINE REPLACEMENT PARTS</h2>
          <p className="section-description">Check prices and order certified spare parts directly. Add parts to your booking session to have them installed by our workshop masters during service.</p>

          <div className="parts-grid" id="parts-grid-container">
            {SPARE_PARTS_DATA.map((part) => {
              const isSelected = selectedParts.has(part.id);
              return (
                <div key={part.id} className="service-cell">
                  <div className="service-cell-header" style={{ marginBottom: 'var(--spacing-sm)' }}>
                    <span className="service-price">₹{part.price.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="workshop-img" style={{ backgroundImage: `url(${part.img})`, height: '140px', marginBottom: 'var(--spacing-sm)' }}></div>
                  <h3 className="service-title" style={{ fontSize: '18px', marginBottom: 'var(--spacing-xxs)' }}>{part.name}</h3>
                  <p className="service-desc" style={{ marginBottom: 'var(--spacing-md)', height: '50px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {part.desc}
                  </p>
                  <div className="service-actions">
                    <button
                      type="button"
                      className={`btn-select-part ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleTogglePart(part.id)}
                      style={{ width: '100%', padding: '10px', fontSize: '11px' }}
                    >
                      {isSelected ? 'ADDED TO ORDER' : 'ADD SPARE PART'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* M Tricolor Divider */}
      <div className="m-stripe-divider"></div>

      {/* Pickup & Drop Info Section */}
      <section className="pickup-valet-section" id="pickup-valet-section">
        <div className="container">
          <div className="valet-showcase-grid">
            <div className="valet-image-side">
              <div className="valet-img-placeholder" style={{ backgroundImage: `url(${valetImg})` }}></div>
            </div>
            <div className="valet-content-side">
              <span className="section-label">04 // EXCLUSIVES</span>
              <h2 className="section-title">DOORSTEP PERFORMANCE VALET</h2>
              <p className="valet-intro">We respect your time. Our premium Pickup & Drop service ensures your vehicle is transported securely to and from our service hub without you lifting a finger.</p>

              <div className="valet-features">
                <div className="valet-feature-item">
                  <div className="valet-feature-num">01</div>
                  <div className="valet-feature-text">
                    <h3>Flatbed Towing Options</h3>
                    <p>Optional covered container flatbed transport for low-clearance sports cars and performance vehicles.</p>
                  </div>
                </div>
                <div className="valet-feature-item">
                  <div className="valet-feature-num">02</div>
                  <div className="valet-feature-text">
                    <h3>Certified Valet Pilots</h3>
                    <p>All drivers are background-checked, track-trained, and fully insured to operate high-performance vehicles.</p>
                  </div>
                </div>
                <div className="valet-feature-item">
                  <div className="valet-feature-num">03</div>
                  <div className="valet-feature-text">
                    <h3>GPS Live Tracking</h3>
                    <p>Monitor your machine's exact location in real-time from the pickup spot directly to the service bay and back.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* M Tricolor Divider */}
      <div className="m-stripe-divider"></div>

      {/* Interactive Booking Section */}
      <section className="booking-section" id="booking-section">
        <div className="container">
          <span className="section-label">05 // CONFIGURATOR</span>
          <h2 className="section-title">BOOK YOUR SESSION</h2>
          <p className="section-description">Customize your service slot. Select workshops, select services, add genuine spares, and schedule your appointment with engineered precision.</p>

          <div className="booking-workspace">
            {/* Booking Form */}
            <form id="booking-form" className="booking-form" autoComplete="off" onSubmit={handleSubmitBooking}>
              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="booking-city" className="input-label">SELECT CITY</label>
                  <select
                    id="booking-city"
                    className="text-input"
                    value={currentCity}
                    onChange={(e) => syncCityChange(e.target.value)}
                    required
                  >
                    <option value="bengaluru">BENGALURU</option>
                    <option value="hyderabad">HYDERABAD</option>
                    <option value="chennai">CHENNAI</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="booking-workshop" className="input-label">SELECT WORKSHOP</label>
                  <select
                    id="booking-workshop"
                    className="text-input"
                    value={selectedWorkshop}
                    onChange={(e) => setSelectedWorkshop(e.target.value)}
                    required
                  >
                    {(WORKSHOPS_DATA[currentCity] || []).map((center, i) => (
                      <option key={i} value={center.name}>{center.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dynamic Service List Selection Checkboxes */}
              <div className="form-group">
                <label className="input-label">SELECT SERVICES</label>
                <div className="services-selector-list" id="form-services-list">
                  {SERVICES_DATA.map((service) => {
                    const isChecked = selectedServices.has(service.id);
                    return (
                      <div
                        key={service.id}
                        className={`service-checkbox-card ${isChecked ? 'checked' : ''}`}
                        onClick={() => handleToggleService(service.id)}
                      >
                        <div className="cb-label-wrap">
                          <div className="custom-checkbox">
                            <i className="fa-solid fa-check"></i>
                          </div>
                          <span className="cb-service-name">{service.name}</span>
                        </div>
                        <span className="cb-service-price">₹{service.price.toLocaleString('en-IN')}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Spare Parts List Selection Checkboxes */}
              <div className="form-group">
                <label className="input-label">SELECT SPARE PARTS (OPTIONAL)</label>
                <div className="services-selector-list" id="form-parts-list">
                  {SPARE_PARTS_DATA.map((part) => {
                    const isChecked = selectedParts.has(part.id);
                    return (
                      <div
                        key={part.id}
                        className={`service-checkbox-card ${isChecked ? 'checked' : ''}`}
                        onClick={() => handleTogglePart(part.id)}
                      >
                        <div className="cb-label-wrap">
                          <div className="custom-checkbox">
                            <i className="fa-solid fa-check"></i>
                          </div>
                          <span className="cb-service-name">{part.name}</span>
                        </div>
                        <span className="cb-service-price">₹{part.price.toLocaleString('en-IN')}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pickup & Drop Toggle Option */}
              <div className="valet-toggle-card">
                <div className="valet-toggle-header">
                  <div className="valet-toggle-info">
                    <h3>PREMIUM VALET PICKUP & DROP</h3>
                    <p>Add professional door-to-door vehicle transport by our certified valet pilots. Includes GPS tracking and full transit insurance.</p>
                  </div>
                  <div className="toggle-switch-wrapper">
                    <label className="switch">
                      <input
                        type="checkbox"
                        id="pickup-drop-toggle"
                        checked={pickupDropActive}
                        onChange={(e) => setPickupDropActive(e.target.checked)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>

                {/* Conditionally shown address fields when toggle is checked */}
                <div className={`valet-address-fields ${pickupDropActive ? 'active' : ''}`} id="valet-address-fields">
                  <div className="form-group">
                    <label htmlFor="pickup-address" className="input-label">PICKUP & DROP ADDRESS</label>
                    <textarea
                      id="pickup-address"
                      className="text-input textarea-input"
                      value={pickupAddress}
                      onChange={(e) => setPickupAddress(e.target.value)}
                      placeholder="Enter complete address for vehicle pickup and return drop-off..."
                      required={pickupDropActive}
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Date & Time Row */}
              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="booking-date" className="input-label">APPOINTMENT DATE</label>
                  <input
                    type="date"
                    id="booking-date"
                    className="text-input"
                    min={minDate}
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="booking-time" className="input-label">APPOINTMENT TIME</label>
                  <select
                    id="booking-time"
                    className="text-input"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    required
                  >
                    <option value="" disabled>Select a slot</option>
                    <option value="09:00 AM">09:00 AM - 11:00 AM</option>
                    <option value="11:00 AM">11:00 AM - 01:00 PM</option>
                    <option value="02:00 PM">02:00 PM - 04:00 PM</option>
                    <option value="04:00 PM">04:00 PM - 06:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Client Personal Details */}
              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="client-name" className="input-label">FULL NAME</label>
                  <input
                    type="text"
                    id="client-name"
                    className="text-input"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. ARJUN MEHTA"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="client-phone" className="input-label">PHONE NUMBER</label>
                  <input
                    type="tel"
                    id="client-phone"
                    className="text-input"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    pattern="^[6-9]\d{9}$|^[+]\d{11,12}$"
                    required
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="client-email" className="input-label">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    id="client-email"
                    className="text-input"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="e.g. arjun@autofix.in"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="car-details" className="input-label">VEHICLE DETAILS (MAKE, MODEL, REG. NO.)</label>
                  <input
                    type="text"
                    id="car-details"
                    className="text-input"
                    value={carDetails}
                    onChange={(e) => setCarDetails(e.target.value)}
                    placeholder="e.g. BMW M340i (KA-03-MM-1234)"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="button-primary btn-submit-booking">CONFIRM BOOKING</button>
            </form>

            {/* Sticky Booking Summary Panel */}
            <div className="booking-summary-panel">
              <h3 className="summary-title">APPOINTMENT SUMMARY</h3>
              <div className="summary-divider"></div>

              <div className="summary-details">
                <div className="summary-row">
                  <span className="sum-label">CITY:</span>
                  <span className="sum-val" id="summary-city">{currentCity.toUpperCase()}</span>
                </div>
                <div className="summary-row">
                  <span className="sum-label">WORKSHOP:</span>
                  <span className="sum-val" id="summary-workshop">{selectedWorkshop.toUpperCase()}</span>
                </div>
                <div className="summary-row">
                  <span className="sum-label">DATE & TIME:</span>
                  <span className="sum-val" id="summary-datetime">{getFormattedDateTime()}</span>
                </div>
                <div className="summary-row">
                  <span className="sum-label">VEHICLE:</span>
                  <span className="sum-val" id="summary-vehicle">{carDetails ? carDetails.toUpperCase() : '-'}</span>
                </div>
              </div>

              <div className="summary-divider"></div>

              <h4 className="summary-subtitle">SELECTED SERVICES</h4>
              <ul className="summary-services-list" id="summary-services-list">
                {selectedServices.size === 0 ? (
                  <li className="empty-list-msg">No services selected</li>
                ) : (
                  Array.from(selectedServices).map((id) => {
                    const s = SERVICES_DATA.find((item) => item.id === id);
                    if (!s) return null;
                    return (
                      <li key={id}>
                        <span className="item-name">{s.name}</span>
                        <span className="item-price">₹{s.price.toLocaleString('en-IN')}</span>
                      </li>
                    );
                  })
                )}
              </ul>

              <div className="summary-divider"></div>

              <h4 className="summary-subtitle">SELECTED SPARE PARTS</h4>
              <ul className="summary-services-list" id="summary-parts-list">
                {selectedParts.size === 0 ? (
                  <li className="empty-list-msg">No parts selected</li>
                ) : (
                  Array.from(selectedParts).map((id) => {
                    const p = SPARE_PARTS_DATA.find((item) => item.id === id);
                    if (!p) return null;
                    return (
                      <li key={id}>
                        <span className="item-name">{p.name}</span>
                        <span className="item-price">₹{p.price.toLocaleString('en-IN')}</span>
                      </li>
                    );
                  })
                )}
              </ul>

              <div className="summary-divider"></div>

              <div className="summary-price-breakdown">
                <div className="price-row">
                  <span>SERVICES SUB-TOTAL:</span>
                  <span id="price-subtotal">₹{servicesSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="price-row">
                  <span>SPARE PARTS SUB-TOTAL:</span>
                  <span id="price-parts-subtotal">₹{partsSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {pickupDropActive && (
                  <div className="price-row" id="valet-price-row">
                    <span>VALET PICKUP & DROP:</span>
                    <span id="price-valet">₹{VALET_FEE.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="price-row">
                  <span>TAXES & FEES (18% GST):</span>
                  <span id="price-gst">₹{gst.toLocaleString('en-IN')}</span>
                </div>
                <div className="price-row total-row">
                  <span>ESTIMATED TOTAL:</span>
                  <span id="price-grandtotal">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Booking Confirmation Overlay */}
      <div className={`confirmation-overlay ${confirmationVisible ? 'active' : ''}`} id="confirmation-overlay">
        <div className="confirmation-card">
          <span className="m-stripe-logo">
            <span className="stripe-blue-light"></span>
            <span className="stripe-blue-dark"></span>
            <span className="stripe-red"></span>
          </span>
          <div className="confirmation-success-icon">
            <i className="fa-solid fa-circle-check"></i>
          </div>
          <h2 className="confirm-title">BOOKING CONFIRMED</h2>
          <div className="ticket-id-badge">REF: <span id="confirm-ref">{confirmData.ref}</span></div>
          <p className="confirm-msg">Your performance service appointment has been scheduled with engineered precision.</p>

          <div className="confirm-details-box">
            <div className="cd-row">
              <span>WORKSHOP:</span>
              <strong id="confirm-workshop">{confirmData.workshop}</strong>
            </div>
            <div className="cd-row">
              <span>DATE & TIME:</span>
              <strong id="confirm-datetime">{confirmData.datetime}</strong>
            </div>
            <div className="cd-row">
              <span>VALET STATUS:</span>
              <strong id="confirm-valet" style={{ color: pickupDropActive ? 'var(--color-m-blue-light)' : 'var(--color-muted)' }}>
                {confirmData.valet}
              </strong>
            </div>
            <div className="cd-row">
              <span>VEHICLE:</span>
              <strong id="confirm-vehicle">{confirmData.vehicle}</strong>
            </div>
            <div className="cd-row total-row">
              <span>AMOUNT DUE:</span>
              <strong id="confirm-amount">{confirmData.amount}</strong>
            </div>
          </div>

          <p className="confirm-footer-note">A confirmation email and SMS with live valet-tracking coordinates have been dispatched. Please ensure your machine is ready at the scheduled hour.</p>

          <button type="button" className="button-primary" id="btn-close-confirm" onClick={handleCloseConfirm}>DISMISS SYSTEM</button>
        </div>
      </div>

      {/* M Tricolor Divider */}
      <div className="m-stripe-divider"></div>

      {/* Footer */}
      <footer className="footer" id="footer-section">
        <div className="container footer-grid">
          <div className="footer-col brand-col">
            <a href="#" className="footer-logo">
              <span className="m-stripe-logo">
                <span className="stripe-blue-light"></span>
                <span className="stripe-blue-dark"></span>
                <span className="stripe-red"></span>
              </span>
              <span className="logo-text">AUTOFIX</span>
            </a>
            <p className="footer-tagline">Engineered motorsport precision for premium performance vehicles. Serving urban India since 2020.</p>
            <div className="footer-socials">
              <a href="#"><i className="fa-brands fa-instagram"></i></a>
              <a href="#"><i className="fa-brands fa-youtube"></i></a>
              <a href="#"><i className="fa-brands fa-twitter"></i></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>HUBS</h4>
            <ul>
              <li><a href="#workshops-section">Bengaluru Hubs</a></li>
              <li><a href="#workshops-section">Chennai Hubs</a></li>
              <li><a href="#workshops-section">Hyderabad Hubs</a></li>
              <li><a href="#pickup-valet-section">Valet Coverage Maps</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>PROGRAMS</h4>
            <ul>
              <li><a href="#services-section">General Service</a></li>
              <li><a href="#services-section">Oil Change & Tuning</a></li>
              <li><a href="#services-section">Battery Maintenance</a></li>
              <li><a href="#services-section">Tyre Alignment Checking</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>SUPPORT</h4>
            <ul>
              <li><a href="#">Contact Specialist</a></li>
              <li><a href="#">Warranty Guidelines</a></li>
              <li><a href="#">Service Terms</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="container footer-bottom">
          <p className="copyright-text">&copy; 2026 AUTOFIX India. All rights reserved. BMW, BMW M, and BMW Type Next Latin references are property of their respective owners. Sourced in India.</p>
          <div className="footer-meta-links">
            <span>IN / EN</span>
            <a href="#">Cookies</a>
            <a href="#">Legal Info</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
