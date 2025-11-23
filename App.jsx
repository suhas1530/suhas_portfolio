import { useState, useEffect } from 'react';
import './App.css';


export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Update active section based on scroll
      const sections = ['home', 'about', 'portfolio', 'contact',"project and support"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (section, e) => {
    e.preventDefault();
    setActiveSection(section);
    setIsMenuOpen(false);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#202020', color: '#ddd' }}>
      {/* Theme CSS (uploaded-theme colors + animations, A2-Soft) */}
      <style>{`
        :root{
          --bg-900: #202020;
          --bg-800: #2a2a2a;
          --panel: #171717;
          --muted: #9aa0a6;
          --neon-1: #ffc600; /* yellow */
          --neon-2: #ff4200; /* orange */
          --accent: #59a6ff; /* slight blue accent */
          --glass: rgba(255,255,255,0.03);
        }

        /* Basic body adjustments */
        body { background: var(--bg-900); color: #e6eef8; }

        /* Navbar */
        .theme-nav {
          background: linear-gradient(180deg, rgba(10,10,10,0.65), rgba(20,20,20,0.45));
          border-bottom: 1px solid rgba(255,255,255,0.03);
          backdrop-filter: blur(6px);
        }
        .theme-nav a { color: #dcdcdc; }
        .theme-nav a.active { color: var(--neon-1); font-weight: 700; }

        /* Hero */
        .hero-panel {
          background: linear-gradient(180deg, rgba(32,32,32,0.9), rgba(42,42,42,0.95));
          border-bottom: 1px solid rgba(255,255,255,0.02);
        }

        /* Buttons themed */
        .btn-theme {
          background: linear-gradient(90deg, var(--neon-1) 0%, var(--neon-2) 100%);
          color: #111;
          font-weight: 600;
          border-radius: 999px;
          padding: 0.6rem 1.4rem;
          transition: transform .18s ease, box-shadow .18s ease, opacity .18s ease;
          box-shadow: 0 10px 30px rgba(255,100,30,0.06);
        }
        .btn-theme:hover { transform: translateY(-4px); box-shadow: 0 18px 40px rgba(255,100,30,0.12); opacity: 0.98; }

        .btn-outline-theme {
          border: 1px solid rgba(255,255,255,0.08);
          color: var(--neon-1);
          background: transparent;
          padding: 0.56rem 1.3rem;
          border-radius: 999px;
        }
        .btn-outline-theme:hover {
          background: rgba(255,198,0,0.06);
          color: #fff;
          border-color: rgba(255,198,0,0.18);
        }

        /* Card style */
        .card-theme {
          background: linear-gradient(180deg, #1b1b1b, #222);
          border: 1px solid rgba(255,255,255,0.03);
          color: #e6eef8;
        }
        .card-hover { transition: transform .28s cubic-bezier(.2,.9,.2,1), box-shadow .28s; }
        .card-hover:hover { transform: translateY(-8px); box-shadow: 0 30px 60px rgba(0,0,0,0.6); }

        /* Theme text gradient (uses uploaded theme feel: yellow->orange) */
        .theme-gradient {
          background: linear-gradient(90deg, var(--neon-1), var(--neon-2));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Small neon badges */
        .badge-neon {
          background: linear-gradient(90deg, rgba(255,198,0,0.12), rgba(255,66,0,0.12));
          color: var(--neon-1);
          border: 1px solid rgba(255,198,0,0.06);
          padding: .25rem .6rem;
          border-radius: 999px;
          font-weight:600;
        }

        /* Uploaded animations (soft use) */
        @keyframes kenburn {
          0% { transform: scale3d(1,1,1); }
          to  { transform: scale3d(1.08,1.08,1.08); }
        }

        @keyframes service-dot_1 {
          0% { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spinner-border { to { transform: rotate(1turn); } }

        @keyframes fadeInLeft {
          0% { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes fadeInRight {
          0% { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes floatSoft {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        /* convenience classes */
        .animate-kenburn { animation: kenburn 16s ease-in-out infinite alternate; transform-origin: center; }
        .animate-service-dot { animation: service-dot_1 3s linear infinite; transform-origin: center; }
        .animate-spinner { animation: spinner-border .8s linear infinite; }
        .animate-fadeInLeft { animation: fadeInLeft .9s ease-out both; }
        .animate-fadeInRight { animation: fadeInRight .9s ease-out both; }
        .animate-fadeInUp { animation: fadeInUp .9s ease-out both; }
        .animate-floatSoft { animation: floatSoft 6s ease-in-out infinite; }

        /* subtle borders and separators */
        .sep-1 { border-top: 1px solid rgba(255,255,255,0.03); }
        .muted { color: var(--muted); }

        /* small responsive patches */
        @media (max-width: 768px) {
          .hero-title { font-size: 2.2rem !important; }
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 theme-nav ${scrollY > 40 ? 'shadow-xl' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a
              href="#home"
              onClick={(e) => handleNavClick('home', e)}
              className="text-2xl font-bold theme-gradient"
            >
              Suhas H J
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'portfolio', 'contact'].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  onClick={(e) => handleNavClick(section, e)}
                  className={`text-lg font-medium transition-colors capitalize ${
                    activeSection === section
                      ? 'text-yellow-400'
                      : 'text-gray-300 hover:text-yellow-300'
                  }`}
                >
                  {section === 'portfolio' ? 'Projects' : section}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-yellow-300"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#141414] border-t border-t-[rgba(255,255,255,0.02)] animate-fadeInUp">
            <div className="px-4 py-4 space-y-3">
              {['home', 'about', 'portfolio', 'contact'].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  onClick={(e) => handleNavClick(section, e)}
                  className={`block text-lg font-medium transition-colors capitalize ${
                    activeSection === section ? 'text-yellow-300' : 'text-gray-300'
                  }`}
                >
                  {section === 'portfolio' ? 'Projects' : section}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-16 hero-panel">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold animate-fadeInLeft hero-title" style={{ color: '#fff' }}>
                Hi, I'm <span className="theme-gradient">Suhas H J</span>
              </h1>
              <h2 className="text-2xl md:text-3xl muted animate-fadeInLeft" style={{ color: '#cfcfcf' }}>
                Junior full stack developer and MERN stack developer
              </h2>
              <p className="text-lg muted animate-fadeInLeft" style={{ color: '#bfc7cf' }}>
                Detail-oriented Software Engineer with full-stack, Android & cloud skills. I build
                scalable apps and deliver robust solutions.
              </p>
              <div className="flex flex-wrap gap-4 animate-fadeInLeft">
                <a
                  href="#portfolio"
                  onClick={(e) => handleNavClick('portfolio', e)}
                  className="btn-theme inline-flex items-center"
                >
                  View My Projects
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick('contact', e)}
                  className="btn-outline-theme inline-flex items-center"
                >
                  Get In Touch
                </a>
              </div>
            </div>

            <div className="flex justify-center animate-fadeInRight">
              <div className="relative">
                <div
                  className="rounded-full overflow-hidden border-4"
                  style={{
                    width: '20rem',
                    height: '20rem',
                    borderColor: 'rgba(255,198,0,0.12)',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.6)'
                  }}
                >
                  <div style={{ width: '100%', height: '100%', overflow: 'hidden' }} className="animate-kenburn">
                    <img
                      src="/edit1.jpg"
                      alt="Suhas H J"
                      className="w-full h-full object-cover"
                      style={{ display: 'block' }}
                    />
                  </div>
                </div>

                {/* small decorative neon dot (service-dot style) */}
                <div
                  className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full animate-service-dot"
                  style={{
                    background: 'linear-gradient(90deg, rgba(255,198,0,0.95), rgba(255,66,0,0.95))',
                    boxShadow: '0 12px 30px rgba(255,66,0,0.12)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20" style={{ background: 'linear-gradient(180deg,#171717,#1b1b1b)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 theme-gradient animate-fadeInUp">
            About Me
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6 animate-fadeInLeft">
              <p className="text-lg muted" style={{ color: '#c7ced6' }}>
                I'm a passionate Software Engineer with hands-on experience in building scalable
                full-stack applications and mobile solutions.
              </p>
              <p className="muted" style={{ color: '#c7ced6' }}>
                Currently pursuing Bachelor of Engineering in Computer Science from New Horizon College of Engineering (CGPA: 8.38). I have practical experience as a Mobile App Developer Intern at Rooman Technologies.
              </p>
              <p className="muted" style={{ color: '#c7ced6' }}>
                I specialize in problem-solving and building efficient, maintainable code.
              </p>
            </div>

            <div className="space-y-8 animate-fadeInRight">
              <div className="card-theme p-6 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4">Technical Skills</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['Python & Java', 'Flask & Django', 'Android Studio', 'SQL & SQLite',
                    'AWS Cloud', 'HTML & CSS', 'Git & GitHub', 'OpenCV & APIs'].map((skill, idx) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <span className="text-green-400 text-xl">✓</span>
                      <span className="muted" style={{ color: '#d7dee6' }}>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-theme p-6 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4">Certifications</h3>
                <div className="space-y-3">
                  {['AWS Academy Cloud Foundations',
                    'Deep Learning with Python (IEEE NHCE)',
                    'Mobile App Development (Rooman Technologies)'].map((cert, idx) => (
                    <div key={cert} className="flex items-start space-x-2">
                      <span className="text-yellow-400 text-xl">🏆</span>
                      <span className="muted" style={{ color: '#d7dee6' }}>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20" style={{ background: 'linear-gradient(180deg,#202020,#2a2a2a)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 theme-gradient animate-fadeInUp">
            My Projects
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Attendance System Using Face Recognition',
                description: 'Web-based automated attendance with real-time face detection using OpenCV and Flask. SQLite for storage.',
                tags: ['Python', 'Flask', 'OpenCV', 'SQLite'],
                colors: ['bg-[#334df3]', 'bg-[#10b981]', 'bg-[#7c3aed]', 'bg-[#374151]']
              },
              {
                title: 'NatureCart',
                description: 'Discover fresh vegetables and fruits online with a seamless and elegant shopping interface.',
                tags: ['MERN', 'github', 'nextjs', 'mongodb','javaScript'],
                colors: ['bg-[#334df3]', 'bg-[#10b981]', 'bg-[#7c3aed]', 'bg-[#374151]','bg-[#059669]']
              },
              {
                title: 'Insurance Management System',
                description: 'Full-stack Insurance Management System built with Django; features auth, admin dashboard and efficient DB operations.',
                tags: ['Django', 'Python', 'SQLite', 'MVC'],
                colors: ['bg-[#059669]', 'bg-[#3b82f6]', 'bg-[#374151]', 'bg-[#f59e0b]']
              },
              {
                title: 'Android Mobile Applications',
                description: 'Multiple Android apps using Java; integrated Flask REST APIs and tested across devices.',
                tags: ['Java', 'Android Studio', 'Flask', 'REST API'],
                colors: ['bg-[#ef4444]', 'bg-[#10b981]', 'bg-[#3b82f6]', 'bg-[#8b5cf6]']
              }
            ].map((project, idx) => (
              <div
                key={project.title}
                className="card-theme rounded-2xl p-6 card-hover animate-fadeInUp"
                style={{ animationDelay: `${idx * 0.14}s` }}
              >
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="muted mb-4" style={{ color: '#c7ced6' }}>{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={tag}
                      className={`${project.colors[i]} text-white px-3 py-1 rounded-full text-sm font-medium`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20" style={{ background: 'linear-gradient(180deg,#121212,#171717)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 animate-fadeInUp theme-gradient">
            Get In Touch
          </h2>
          <p className="text-center mb-8 muted" style={{ color: '#b8c1c9' }}>
            Reach out for collaborations, opportunities, or just to say hello!
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12 animate-fadeInUp">
            <a
              href="mailto:suhashj543@gmail.com"
              className="flex items-center space-x-2 px-6 py-3 rounded-full transition-all"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.03)' }}
            >
              <span className="text-2xl">📧</span>
              <span className="muted" style={{ color: '#d7dee6' }}>suhashj543@gmail.com</span>
            </a>
            <a
              href="tel:+918088356247"
              className="flex items-center space-x-2 px-6 py-3 rounded-full transition-all"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.03)' }}
            >
              <span className="text-2xl">📱</span>
              <span className="muted" style={{ color: '#d7dee6' }}>+91 8088356247</span>
            </a>
          </div>

          <div className="p-8 rounded-2xl card-theme animate-fadeInUp">
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg bg-[#121212] border border-[rgba(255,255,255,0.03)] text-white placeholder:muted focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-lg bg-[#121212] border border-[rgba(255,255,255,0.03)] text-white placeholder:muted focus:outline-none"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3 rounded-lg bg-[#121212] border border-[rgba(255,255,255,0.03)] text-white placeholder:muted focus:outline-none"
              />
              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full px-4 py-3 rounded-lg bg-[#121212] border border-[rgba(255,255,255,0.03)] text-white placeholder:muted focus:outline-none resize-none"
              ></textarea>
              <button
                type="button"
                className="btn-theme w-full inline-flex justify-center"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8" style={{ background: '#101010' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="muted" style={{ color: '#9aa0a6' }}>&copy; 2025 Suhas H J. All rights reserved.</p>
            <div className="flex space-x-6">
              <a
                href="https://www.linkedin.com/in/suhas-h-j-48906b28a/"
                target="_blank"
                rel="noopener noreferrer"
                className="muted hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/suhas1530"
                target="_blank"
                rel="noopener noreferrer"
                className="muted hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="mailto:suhashj543@gmail.com"
                className="muted hover:text-white transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {scrollY > 300 && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform"
          style={{
            background: 'linear-gradient(90deg,#ffc600,#ff4200)',
            color: '#111',
            boxShadow: '0 10px 30px rgba(255,66,0,0.12)'
          }}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
}
