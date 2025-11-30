import React, { useState, useEffect, useRef } from 'react';

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const particlesRef = useRef(null);
  const typingRef = useRef(null);

  useEffect(() => {
    // Initialize Particles.js
    if (window.particlesJS && particlesRef.current) {
      window.particlesJS('particles-js', {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: darkMode ? '#ffffff' : '#6366f1' },
          shape: { type: 'circle' },
          opacity: { value: 0.5, random: false },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 150,
            color: darkMode ? '#ffffff' : '#6366f1',
            opacity: 0.4,
            width: 1
          },
          move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
        },
        interactivity: {
          detect_on: 'canvas',
          events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
          modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
        },
        retina_detect: true
      });
    }

    // Initialize AOS
    if (window.AOS) {
      window.AOS.init({ duration: 1000, once: true, offset: 100 });
    }

    // Typing effect
    if (typingRef.current) {
      const texts = ['Full Stack Developer', 'UI/UX Designer', 'Creative Thinker'];
      let textIndex = 0;
      let charIndex = 0;
      let isDeleting = false;

      const type = () => {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
          typingRef.current.textContent = currentText.substring(0, charIndex - 1);
          charIndex--;
        } else {
          typingRef.current.textContent = currentText.substring(0, charIndex + 1);
          charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
          setTimeout(() => { isDeleting = true; }, 2000);
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
        }

        const speed = isDeleting ? 50 : 100;
        setTimeout(type, speed);
      };

      type();
    }

    // Scroll handlers
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      setNavbarScrolled(window.scrollY > 50);

      const sections = ['home', 'achievements', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [darkMode]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const achievements = [
    { icon: 'fa-trophy', number: '50+', label: 'Projects Completed' },
    { icon: 'fa-users', number: '30+', label: 'Happy Clients' },
    { icon: 'fa-award', number: '15+', label: 'Awards Won' },
    { icon: 'fa-code', number: '100K+', label: 'Lines of Code' }
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
      description: 'Full-stack e-commerce solution with React and Node.js',
      tech: ['React', 'Node.js', 'MongoDB']
    },
    {
      title: 'Mobile Banking App',
      category: 'Mobile Development',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
      description: 'Secure banking application with biometric authentication',
      tech: ['React Native', 'Firebase', 'Redux']
    },
    {
      title: 'AI Dashboard',
      category: 'Data Visualization',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      description: 'Analytics dashboard with machine learning insights',
      tech: ['Vue.js', 'D3.js', 'Python']
    },
    {
      title: 'Social Media Platform',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
      description: 'Real-time social networking platform',
      tech: ['React', 'Socket.io', 'PostgreSQL']
    }
  ];

  const skills = [
    { name: 'React.js', level: 95, color: '#61dafb' },
    { name: 'Node.js', level: 90, color: '#339933' },
    { name: 'JavaScript', level: 92, color: '#f7df1e' },
    { name: 'Python', level: 85, color: '#3776ab' },
    { name: 'UI/UX Design', level: 88, color: '#ff61f6' },
    { name: 'MongoDB', level: 87, color: '#47a248' }
  ];

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      {/* Particles Background */}
      <div id="particles-js" ref={particlesRef} style={{ position: 'fixed', width: '100%', height: '100%', zIndex: -1 }}></div>

      {/* Navbar */}
      <nav className={`navbar navbar-expand-lg fixed-top ${navbarScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container">
          <a className="navbar-brand" href="#home">
            <i className="fas fa-code me-2"></i>Portfolio
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {['home', 'achievements', 'projects', 'skills', 'contact'].map(section => (
                <li className="nav-item" key={section}>
                  <a 
                    className={`nav-link ${activeSection === section ? 'active' : ''}`}
                    href={`#${section}`}
                    onClick={(e) => { e.preventDefault(); scrollToSection(section); }}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
            <button className="btn-theme-toggle ms-3" onClick={() => setDarkMode(!darkMode)}>
              <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="hero-content">
                <h1 className="hero-title">
                  Hi, I'm <span className="gradient-text">John Doe</span>
                </h1>
                <h2 className="hero-subtitle">
                  <span ref={typingRef}></span>
                  <span className="typing-cursor">|</span>
                </h2>
                <p className="hero-description">
                  Crafting beautiful digital experiences with modern web technologies. 
                  Specialized in creating scalable and user-friendly applications.
                </p>
                <div className="hero-buttons">
                  <button className="btn btn-primary btn-lg me-3" onClick={() => scrollToSection('projects')}>
                    View My Work
                  </button>
                  <button className="btn btn-outline-primary btn-lg" onClick={() => scrollToSection('contact')}>
                    Contact Me
                  </button>
                </div>
                <div className="social-links mt-4">
                  <a href="#" className="social-link"><i className="fab fa-github"></i></a>
                  <a href="#" className="social-link"><i className="fab fa-linkedin"></i></a>
                  <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                  <a href="#" className="social-link"><i className="fab fa-dribbble"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="hero-3d-container glass-card">
                <div className="floating-element float-1">
                  <i className="fas fa-code"></i>
                </div>
                <div className="floating-element float-2">
                  <i className="fas fa-palette"></i>
                </div>
                <div className="floating-element float-3">
                  <i className="fas fa-rocket"></i>
                </div>
                <spline-viewer url="https://prod.spline.design/ccWcONNmaD9Eq364/scene.splinecode"></spline-viewer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="achievements-section py-5">
        <div className="container">
          <div className="section-title text-center mb-5" data-aos="fade-up">
            <h2>Achievements</h2>
            <p>Milestones that define my journey</p>
          </div>
          <div className="swiper-container achievements-slider">
            <div className="row">
              {achievements.map((achievement, index) => (
                <div className="col-md-6 col-lg-3 mb-4" key={index} data-aos="zoom-in" data-aos-delay={index * 100}>
                  <div className="achievement-card glass-card text-center">
                    <div className="achievement-icon">
                      <i className={`fas ${achievement.icon}`}></i>
                    </div>
                    <h3 className="achievement-number">{achievement.number}</h3>
                    <p className="achievement-label">{achievement.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section py-5">
        <div className="container">
          <div className="section-title text-center mb-5" data-aos="fade-up">
            <h2>Featured Projects</h2>
            <p>Some of my recent work</p>
          </div>
          <div className="row">
            {projects.map((project, index) => (
              <div className="col-md-6 col-lg-6 mb-4" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="project-card glass-card">
                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                    <div className="project-overlay">
                      <button className="btn btn-light btn-sm">
                        <i className="fas fa-external-link-alt me-2"></i>View Project
                      </button>
                    </div>
                  </div>
                  <div className="project-content">
                    <span className="project-category">{project.category}</span>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tech">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="tech-badge">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section py-5">
        <div className="container">
          <div className="section-title text-center mb-5" data-aos="fade-up">
            <h2>Technical Skills</h2>
            <p>Technologies I work with</p>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {skills.map((skill, index) => (
                <div className="skill-item mb-4" key={index} data-aos="fade-right" data-aos-delay={index * 100}>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress" 
                      style={{ width: `${skill.level}%`, backgroundColor: skill.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section py-5">
        <div className="container">
          <div className="section-title text-center mb-5" data-aos="fade-up">
            <h2>Get In Touch</h2>
            <p>Let's work together</p>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="contact-form glass-card" data-aos="fade-up">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input type="text" className="form-control" placeholder="Your Name" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="email" className="form-control" placeholder="Your Email" />
                  </div>
                  <div className="col-12 mb-3">
                    <input type="text" className="form-control" placeholder="Subject" />
                  </div>
                  <div className="col-12 mb-3">
                    <textarea className="form-control" rows="5" placeholder="Your Message"></textarea>
                  </div>
                  <div className="col-12 text-center">
                    <button className="btn btn-primary btn-lg">
                      <i className="fas fa-paper-plane me-2"></i>Send Message
                    </button>
                  </div>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-4 text-center mb-4" data-aos="zoom-in">
                  <div className="contact-info-card glass-card">
                    <i className="fas fa-envelope"></i>
                    <h4>Email</h4>
                    <p>john.doe@example.com</p>
                  </div>
                </div>
                <div className="col-md-4 text-center mb-4" data-aos="zoom-in" data-aos-delay="100">
                  <div className="contact-info-card glass-card">
                    <i className="fas fa-phone"></i>
                    <h4>Phone</h4>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="col-md-4 text-center mb-4" data-aos="zoom-in" data-aos-delay="200">
                  <div className="contact-info-card glass-card">
                    <i className="fas fa-map-marker-alt"></i>
                    <h4>Location</h4>
                    <p>New York, USA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer py-4">
        <div className="container text-center">
          <p className="mb-2">&copy; 2024 John Doe. All rights reserved.</p>
          <div className="social-links">
            <a href="#" className="social-link"><i className="fab fa-github"></i></a>
            <a href="#" className="social-link"><i className="fab fa-linkedin"></i></a>
            <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
            <a href="#" className="social-link"><i className="fab fa-dribbble"></i></a>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button className="scroll-top" onClick={scrollToTop}>
          <i className="fas fa-arrow-up"></i>
        </button>
      )}

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --primary-color: #6366f1;
          --secondary-color: #8b5cf6;
          --accent-color: #ec4899;
          --bg-color: #ffffff;
          --text-color: #1e293b;
          --card-bg: rgba(255, 255, 255, 0.7);
          --shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .dark-mode {
          --bg-color: #0f172a;
          --text-color: #e2e8f0;
          --card-bg: rgba(30, 41, 59, 0.7);
          --shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        }

        body {
          font-family: 'Poppins', sans-serif;
          background: var(--bg-color);
          color: var(--text-color);
          overflow-x: hidden;
          transition: all 0.3s ease;
        }

        #particles-js {
          background: linear-gradient(135deg, var(--bg-color) 0%, var(--bg-color) 100%);
        }

        .glass-card {
          background: var(--card-bg);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 20px;
          box-shadow: var(--shadow);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .glass-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
        }

        /* Navbar */
        .navbar {
          padding: 1rem 0;
          background: transparent;
          transition: all 0.3s ease;
        }

        .navbar-scrolled {
          background: var(--card-bg) !important;
          backdrop-filter: blur(10px);
          box-shadow: var(--shadow);
        }

        .navbar-brand {
          font-weight: 700;
          font-size: 1.5rem;
          color: var(--primary-color) !important;
        }

        .nav-link {
          color: var(--text-color) !important;
          font-weight: 500;
          margin: 0 0.5rem;
          transition: color 0.3s ease;
        }

        .nav-link:hover, .nav-link.active {
          color: var(--primary-color) !important;
        }

        .btn-theme-toggle {
          background: var(--primary-color);
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-theme-toggle:hover {
          transform: rotate(180deg);
          background: var(--secondary-color);
        }

        /* Hero Section */
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 100px 0;
          position: relative;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color), var(--accent-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 2rem;
          font-weight: 600;
          color: var(--primary-color);
          margin-bottom: 1.5rem;
          min-height: 60px;
        }

        .typing-cursor {
          animation: blink 0.7s infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .hero-description {
          font-size: 1.2rem;
          color: var(--text-color);
          opacity: 0.8;
          margin-bottom: 2rem;
        }

        .hero-buttons .btn {
          padding: 12px 30px;
          border-radius: 50px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          border: none;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
        }

        .btn-outline-primary {
          border: 2px solid var(--primary-color);
          color: var(--primary-color);
          background: transparent;
        }

        .btn-outline-primary:hover {
          background: var(--primary-color);
          color: white;
          transform: translateY(-3px);
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: var(--card-bg);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-color);
          text-decoration: none;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .social-link:hover {
          background: var(--primary-color);
          color: white;
          transform: translateY(-5px);
        }

        .hero-3d-container {
          position: relative;
          height: 500px;
          padding: 2rem;
          overflow: hidden;
        }

        .hero-3d-container spline-viewer {
          width: 100%;
          height: 100%;
        }

        .floating-element {
          position: absolute;
          font-size: 2rem;
          color: var(--primary-color);
          animation: float 3s ease-in-out infinite;
        }

        .float-1 {
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .float-2 {
          top: 20%;
          right: 15%;
          animation-delay: 1s;
        }

        .float-3 {
          bottom: 15%;
          left: 15%;
          animation-delay: 2s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        /* Section Styles */
        section {
          padding: 80px 0;
        }

        .section-title h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          position: relative;
          display: inline-block;
        }

        .section-title h2::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 4px;
          background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
          border-radius: 2px;
        }

        .section-title p {
          font-size: 1.2rem;
          color: var(--text-color);
          opacity: 0.7;
        }

        /* Achievements */
        .achievement-card {
          padding: 2rem;
          transition: all 0.3s ease;
        }

        .achievement-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 1rem;
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: white;
        }

        .achievement-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary-color);
          margin-bottom: 0.5rem;
        }

        .achievement-label {
          font-size: 1rem;
          color: var(--text-color);
          opacity: 0.8;
        }

        /* Projects */
        .project-card {
          overflow: hidden;
          padding: 0;
        }

        .project-image {
          position: relative;
          overflow: hidden;
          height: 250px;
        }

        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .project-card:hover .project-image img {
          transform: scale(1.1);
        }

        .project-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(99, 102, 241, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .project-card:hover .project-overlay {
          opacity: 1;
        }

        .project-content {
          padding: 1.5rem;
        }

        .project-category {
          color: var(--primary-color);
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .project-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0.5rem 0;
        }

        .project-description {
          color: var(--text-color);
          opacity: 0.8;
          margin-bottom: 1rem;
        }

        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tech-badge {
          background: var(--primary-color);
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.85rem;
        }

        /* Skills */
        .skill-item {
          padding: 1rem 0;
        }

        .skill-name {
          font-weight: 600;
          font-size: 1.1rem;
        }

        .skill-percentage {
          font-weight: 600;
          color: var(--primary-color);
        }

        .skill-bar {
          height: 12px;
          background: rgba(99, 102, 241, 0.1);
          border-radius: 10px;
          overflow: hidden;
        }

        .skill-progress {
          height: 100%;
          border-radius: 10px;
          transition: width 1s ease;
          background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        }

        /* Contact */
        .contact-form {
          padding: 2rem;
        }

        .form-control {
          background: var(--card-bg);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: var(--text-color);
          padding: 0.8rem 1rem;
          border-radius: 10px;
          backdrop-filter: blur(10px);
        }

        .form-control:focus {
          background: var(--card-bg);
          border-color: var(--primary-color);
          color: var(--text-color);
          box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25);
          outline: none;
        }

        .form-control::placeholder {
          color: var(--text-color);
          opacity: 0.5;
        }

        .contact-info-card {
          padding: 2rem;
          text-align: center;
        }

        .contact-info-card i {
          font-size: 2.5rem;
          color: var(--primary-color);
          margin-bottom: 1rem;
        }

        .contact-info-card h4 {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .contact-info-card p {
          color: var(--text-color);
          opacity: 0.8;
        }

        /* Footer */
        .footer {
          background: var(--card-bg);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(255, 255, 255, 0.18);
        }

        .footer p {
          color: var(--text-color);
          opacity: 0.8;
          margin-bottom: 0.5rem;
        }

        /* Scroll to Top */
        .scroll-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          color: white;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
          z-index: 1000;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .scroll-top:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.6);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.5rem;
          }

          .hero-description {
            font-size: 1rem;
          }

          .hero-3d-container {
            height: 400px;
            margin-top: 2rem;
          }

          .section-title h2 {
            font-size: 2rem;
          }

          .navbar-toggler {
            border-color: var(--primary-color);
          }

          .navbar-toggler-icon {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(99, 102, 241, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
          }

          .navbar-collapse {
            background: var(--card-bg);
            backdrop-filter: blur(10px);
            padding: 1rem;
            border-radius: 10px;
            margin-top: 1rem;
          }
        }

        @media (max-width: 576px) {
          .hero-title {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 1.2rem;
          }

          .hero-buttons .btn {
            display: block;
            width: 100%;
            margin: 0 0 1rem 0 !important;
          }

          .achievement-card {
            margin-bottom: 1rem;
          }
        }

        /* Additional animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: var(--bg-color);
        }

        ::-webkit-scrollbar-thumb {
          background: var(--primary-color);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: var(--secondary-color);
        }
      `}</style>
    </div>
  );
};

export default Portfolio;