import { useState, useEffect, useRef } from 'react';

export default function Portfolio() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const cursorRef = useRef(null);

  // Scroll Progress Bar
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom Cursor Logic
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursor.style.transform = 'translate(-50%, -50%)';
    };

    const hoverElements = document.querySelectorAll('.cursor-hover, a, button, input, textarea');

    const handleMouseEnter = () => {
      cursor.style.width = '60px';
      cursor.style.height = '60px';
      cursor.style.backgroundColor = '#FBFF48';
      cursor.style.mixBlendMode = 'normal';
      cursor.style.border = '2px solid black';
    };

    const handleMouseLeave = () => {
      cursor.style.width = '24px';
      cursor.style.height = '24px';
      cursor.style.backgroundColor = '#fff';
      cursor.style.mixBlendMode = 'difference';
      cursor.style.border = 'none';
    };

    document.addEventListener('mousemove', handleMouseMove);
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      hoverElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Scroll Reveal Logic
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    return () => revealObserver.disconnect();
  }, []);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [cvPreviewOpen, setCvPreviewOpen] = useState(false);

  return (
    <div className="text-neo-black font-display antialiased selection:bg-neo-black selection:text-neo-yellow">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&family=Space+Grotesk:wght@300;400;500;600;700;800&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css');

        :root {
          --neo-yellow: #FBFF48;
          --neo-pink: #FF70A6;
          --neo-blue: #3B82F6;
          --neo-green: #33FF57;
          --neo-purple: #A855F7;
          --neo-orange: #FF9F1C;
          --neo-red: #FF2A2A;
          --neo-white: #FFFDF5;
          --neo-black: #121212;
        }

        body {
          cursor: none;
          background-color: #FFFDF5;
          background-image:
            radial-gradient(#000 1px, transparent 1px),
            linear-gradient(to right, #e5e5e5 1px, transparent 1px),
            linear-gradient(to bottom, #e5e5e5 1px, transparent 1px);
          background-size: 40px 40px, 100px 100px, 100px 100px;
        }

        .font-display {
          font-family: 'Space Grotesk', sans-serif;
        }

        .font-mono {
          font-family: 'JetBrains Mono', monospace;
        }

        .shadow-hard {
          box-shadow: 4px 4px 0px 0px #000;
        }

        .shadow-hard-sm {
          box-shadow: 2px 2px 0px 0px #000;
        }

        .shadow-hard-lg {
          box-shadow: 8px 8px 0px 0px #000;
        }

        .shadow-hard-xl {
          box-shadow: 12px 12px 0px 0px #000;
        }

        .text-neo-yellow { color: #FBFF48; }
        .text-neo-pink { color: #FF70A6; }
        .text-neo-blue { color: #3B82F6; }
        .text-neo-green { color: #33FF57; }
        .text-neo-purple { color: #A855F7; }
        .text-neo-orange { color: #FF9F1C; }
        .text-neo-red { color: #FF2A2A; }
        .text-neo-white { color: #FFFDF5; }
        .text-neo-black { color: #121212; }

        .bg-neo-yellow { background-color: #FBFF48; }
        .bg-neo-pink { background-color: #FF70A6; }
        .bg-neo-blue { background-color: #3B82F6; }
        .bg-neo-green { background-color: #33FF57; }
        .bg-neo-purple { background-color: #A855F7; }
        .bg-neo-orange { background-color: #FF9F1C; }
        .bg-neo-red { background-color: #FF2A2A; }
        .bg-neo-white { background-color: #FFFDF5; }
        .bg-neo-black { background-color: #121212; }

        .border-neo-yellow { border-color: #FBFF48; }
        .border-neo-pink { border-color: #FF70A6; }
        .border-neo-blue { border-color: #3B82F6; }
        .border-neo-green { border-color: #33FF57; }
        .border-neo-purple { border-color: #A855F7; }
        .border-neo-orange { border-color: #FF9F1C; }
        .border-neo-red { border-color: #FF2A2A; }
        .border-neo-white { border-color: #FFFDF5; }
        .border-neo-black { border-color: #121212; }

        .hover\\:bg-neo-yellow:hover { background-color: #FBFF48; }
        .hover\\:bg-neo-pink:hover { background-color: #FF70A6; }
        .hover\\:bg-neo-blue:hover { background-color: #3B82F6; }
        .hover\\:bg-neo-green:hover { background-color: #33FF57; }
        .hover\\:bg-neo-purple:hover { background-color: #A855F7; }
        .hover\\:bg-neo-orange:hover { background-color: #FF9F1C; }
        .hover\\:bg-neo-red:hover { background-color: #FF2A2A; }
        .hover\\:bg-neo-white:hover { background-color: #FFFDF5; }
        .hover\\:bg-neo-black:hover { background-color: #121212; }

        .hover\\:text-neo-yellow:hover { color: #FBFF48; }
        .hover\\:text-neo-pink:hover { color: #FF70A6; }
        .hover\\:text-neo-blue:hover { color: #3B82F6; }
        .hover\\:text-neo-green:hover { color: #33FF57; }
        .hover\\:text-neo-purple:hover { color: #A855F7; }
        .hover\\:text-neo-orange:hover { color: #FF9F1C; }
        .hover\\:text-neo-red:hover { color: #FF2A2A; }
        .hover\\:text-neo-white:hover { color: #FFFDF5; }
        .hover\\:text-neo-black:hover { color: #121212; }

        .hover\\:border-neo-green\\/50:hover { border-color: rgba(51, 255, 87, 0.5); }
        .hover\\:border-neo-blue\\/50:hover { border-color: rgba(59, 130, 246, 0.5); }
        .hover\\:border-neo-pink\\/50:hover { border-color: rgba(255, 112, 166, 0.5); }
        .hover\\:border-neo-purple\\/50:hover { border-color: rgba(168, 85, 247, 0.5); }
        .hover\\:border-neo-orange\\/50:hover { border-color: rgba(255, 159, 28, 0.5); }

        .text-neo-green\\/60 { color: rgba(51, 255, 87, 0.6); }
        .text-neo-blue\\/60 { color: rgba(59, 130, 246, 0.6); }
        .text-neo-pink\\/60 { color: rgba(255, 112, 166, 0.6); }
        .text-neo-purple\\/60 { color: rgba(168, 85, 247, 0.6); }
        .text-neo-orange\\/60 { color: rgba(255, 159, 28, 0.6); }

        #cursor {
          pointer-events: none;
          position: fixed;
          z-index: 9999;
          mix-blend-mode: difference;
          transition: width 0.2s, height 0.2s, background-color 0.2s, transform 0.1s;
        }

        .marquee-container {
          overflow: hidden;
        }

        .marquee-content {
          display: flex;
          animation: scroll 40s linear infinite;
          width: max-content;
        }

        .marquee-container:hover .marquee-content {
          animation-play-state: paused;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }

        .glitch-hover:hover {
          animation: glitch-anim 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
          color: #FF2A2A;
        }

        @keyframes glitch-anim {
          0% {
            transform: translate(0)
          }
          20% {
            transform: translate(-2px, 2px)
          }
          40% {
            transform: translate(-2px, -2px)
          }
          60% {
            transform: translate(2px, 2px)
          }
          80% {
            transform: translate(2px, -2px)
          }
          100% {
            transform: translate(0)
          }
        }

        .text-stroke-black {
          -webkit-text-stroke: 3px black;
        }

        .decoration-neo-pink {
          text-decoration-color: #FF70A6;
        }
      `}</style>

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        id="cursor"
        className="w-6 h-6 bg-white rounded-full border-2 border-black hidden lg:block"
      ></div>

      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 h-2 bg-neo-green z-60 border-b-2 border-black"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-4 py-4 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">

          {/* Logo */}
          <a
            href="#"
            className="bg-neo-white border-2 border-black px-4 py-1 text-2xl font-black shadow-hard hover:bg-neo-yellow transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none cursor-hover"
          >
            Sudhanva
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-4 bg-white border-2 border-black p-2 shadow-hard">
            {[
              ["#about", "/ABOUT"],
              ["#skills", "/SKILLS"],
              ["#education", "/EDUCATION"],
              ["#projects", "/WORK"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="px-3 py-1 font-mono font-bold text-sm hover:bg-black hover:text-white transition-colors cursor-hover"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Hamburger Button (Mobile Only) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden bg-white border-2 border-black px-3 py-2 shadow-hard hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            <div className="flex flex-col gap-1">
              <span className={`block w-5 h-0.5 bg-black transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`block w-5 h-0.5 bg-black transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-black transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-4 mx-auto max-w-7xl bg-white border-2 border-black shadow-hard p-4 flex flex-col gap-3 pointer-events-auto">
            {[
              ["#about", "/ABOUT"],
              ["#skills", "/SKILLS"],
              ["#education", "/EDUCATION"],
              ["#projects", "/WORK"],
              ["#contact", "HIRE ME"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2 font-mono font-bold text-sm hover:bg-black hover:text-white transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4 pt-20 relative overflow-hidden border-b-4 border-black">
        <div className="absolute top-1/3 left-[10%] w-16 h-16 bg-neo-blue border-4 border-black shadow-hard animate-bounce hidden lg:block rotate-12"></div>
        <div className="absolute bottom-1/3 right-[10%] w-24 h-24 bg-neo-pink rounded-full border-4 border-black shadow-hard hidden lg:block animate-pulse"></div>
        <div className="absolute top-20 right-20 text-9xl opacity-5 font-black select-none pointer-events-none">
          CODE
        </div>

        <div className="relative z-10 text-center max-w-5xl">
          <div className="inline-block bg-neo-white border-2 border-black px-4 py-1 mb-6 shadow-hard rotate-2 reveal">
            <span className="font-mono font-bold text-neo-green bg-black px-2 mr-2">●</span>
            <span className="font-mono font-bold">SYSTEM STATUS: ONLINE</span>
          </div>

          <h1 className="text-[13vw] md:text-[10vw] leading-[0.8] font-black uppercase tracking-tighter mb-6 reveal mix-blend-darken">
            FULL STACK
            <br />
            <span className="text-white text-stroke-black">DEVELOPER</span>
          </h1>

          <p className="font-mono text-lg md:text-2xl max-w-2xl mx-auto mb-10 bg-neo-yellow border-2 border-black p-4 shadow-hard reveal rotate-1">
            I build digital products that refuse to be boring. <br />
            <b>React.js • Node.js • JavaScript • Express.js</b>
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-6 reveal">
            <a
              href="#projects"
              className="bg-black text-white border-2 border-black px-10 py-5 text-xl font-bold shadow-hard hover:bg-neo-green hover:text-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-hover"
            >
              VIEW DATABASE
            </a>
            <button
              onClick={() => setCvPreviewOpen(true)}
              className="bg-neo-white text-black border-2 border-black px-10 py-5 text-xl font-bold shadow-hard hover:bg-neo-pink hover:text-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-hover flex items-center justify-center gap-2"
            >
              <i className="ri-download-line"></i> DOWNLOAD CV
            </button>
          </div>
        </div>
      </section>

      {/* Marquee Banner */}
      <div className="border-b-4 border-black bg-neo-blue py-3 relative z-20">
        <div className="marquee-container font-mono font-bold text-2xl text-white">
          <div className="marquee-content">
            /// OPEN FOR WORK /// FULL STACK DEVELOPMENT /// REACT /// NODE.JS /// REST APIs /// MONGODB /// SQL /// OPEN FOR WORK /// FULL STACK DEVELOPMENT ///
          </div>
        </div>
      </div>

      {/* About Section */}
      <section
        id="about"
        className="py-24 px-4 max-w-7xl mx-auto border-x-4 border-black bg-white my-12 shadow-hard-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 reveal">
            <div className="aspect-square bg-gray-200 border-4 border-black relative shadow-hard overflow-hidden group">
              <img
                src="/api/placeholder/400/400"
                alt="Sudhanva Kulkarni"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <span className="absolute top-2 left-2 bg-neo-red text-white px-2 font-mono text-xs border border-black z-10">
                AVATAR.JPG
              </span>
            </div>
          </div>
          <div className="md:col-span-8 flex flex-col justify-center reveal">
            <h2 className="text-6xl font-black uppercase mb-6">Who am I?</h2>
            <p className="font-mono text-xl leading-relaxed mb-6">
              I am <span className="bg-neo-yellow px-1 border border-black">Sudhanva Kulkarni</span>. A Computer Science Engineering student who builds digital products that are fast, functional, and anything but boring.
            </p>
            <p className="font-mono text-lg mb-8 text-gray-600 border-l-4 border-neo-purple pl-4">
              &gt; Specialized in Full Stack Web Development.<br />
              &gt; Obsessed with clean code and great UX.<br />
              &gt; Currently pursuing CSE @ KLE Technological University (CGPA: 8.62).
            </p>

            <div className="flex gap-4 flex-wrap">
              <div className="bg-neo-black text-white px-4 py-2 font-mono text-sm border-2 border-transparent">
                📍 LOCATION: DHARWAD, IN
              </div>
              <div className="bg-neo-green text-black px-4 py-2 font-mono text-sm border-2 border-black">
                🟢 STATUS: AVAILABLE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="py-20 bg-neo-black text-neo-white border-y-4 border-black relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        ></div>

        <div className="max-w-350 mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-4 border-white pb-4">
            <h2 className="text-6xl md:text-8xl font-black uppercase text-white tracking-tighter">
              TECH<span className="text-neo-green">_STACK</span>
            </h2>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start">
            {[
              { label: 'LANGUAGE', name: 'C', hover: 'hover:bg-neo-orange' },
              { label: 'LANGUAGE', name: 'C++', hover: 'hover:bg-neo-purple' },
              { label: 'LANGUAGE', name: 'JAVA', hover: 'hover:bg-neo-orange' },
              { label: 'CORE', name: 'HTML5', hover: 'hover:bg-neo-orange' },
              { label: 'CORE', name: 'CSS3', hover: 'hover:bg-neo-blue' },
              { label: 'LANGUAGE', name: 'JavaScript', hover: 'hover:bg-neo-yellow' },
              { label: 'LIBRARY', name: 'REACT', hover: 'hover:bg-white' },
              { label: 'BACKEND', name: 'NODE.JS', hover: 'hover:bg-neo-green' },
              { label: 'BACKEND', name: 'EXPRESS', hover: 'hover:bg-white' },
              { label: 'API', name: 'REST APIs', hover: 'hover:bg-neo-pink' },
              { label: 'DATA', name: 'SQL', hover: 'hover:bg-neo-blue' },
              { label: 'DATA', name: 'MongoDB', hover: 'hover:bg-neo-green' },
              { label: 'VERSION', name: 'GIT', hover: 'hover:bg-white' },
              { label: 'OPS', name: 'GitHub', hover: 'hover:bg-neo-blue' },
            ].map((skill, idx) => (
              <div
                key={idx}
                className={`group w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-[12.5%] h-24 border-r-2 border-b-2 border-white/20 bg-neo-black ${skill.hover} transition-all duration-0 hover:z-10 relative cursor-hover flex flex-col items-center justify-center p-2`}
              >
                <div className="text-neo-green group-hover:text-black font-mono text-xs mb-1 opacity-50">
                  &gt;_ {skill.label}
                </div>
                <div className="text-white group-hover:text-black font-black font-display text-xl uppercase">
                  {skill.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-8xl font-black uppercase mb-12 tracking-tighter text-center">
          Education<span className="text-neo-red">_Log</span>
        </h2>

        <div className="relative border-l-4 border-black ml-4 md:ml-10 space-y-12">
          {[
            {
              color: 'bg-neo-yellow',
              title: 'Computer Science Engineering',
              period: 'Aug 2024 – Jun 2028',
              company: 'KLE Technological University',
              companyColor: 'text-neo-yellow',
              bullets: [
                'CGPA: 8.62',
                'Focused on software development, data structures, and algorithms.',
                'Active participant in coding competitions and hackathons.',
              ],
            },
            {
              color: 'bg-neo-blue',
              title: 'XII – KSEB (Science)',
              period: '2024',
              company: 'Prism PU Science College, Dharwad',
              companyColor: 'text-neo-blue',
              bullets: [
                'Percentage: 94.3%',
                'Studied Physics, Chemistry, Mathematics, and Computer Science.',
              ],
            },
            {
              color: 'bg-neo-green',
              title: 'X – CBSE',
              period: '2022',
              company: 'Maithry Vidyanikethan, Bengaluru',
              companyColor: 'text-neo-green',
              bullets: [
                'Percentage: 87.4%',
                'Built a strong academic foundation across core subjects.',
              ],
            },
          ].map((edu, idx) => (
            <div key={idx} className="reveal relative pl-8 md:pl-16">
              <div
                className={`absolute -left-3.5 top-2 w-6 h-6 ${edu.color} border-4 border-black`}
              ></div>
              <div className="bg-white border-4 border-black p-6 shadow-hard hover:shadow-hard-xl transition-all">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-dashed border-gray-300 pb-4 mb-4">
                  <h3 className="text-3xl font-black uppercase">{edu.title}</h3>
                  <span className="font-mono font-bold bg-neo-black text-white px-2 py-1">
                    {edu.period}
                  </span>
                </div>
                <p className={`font-mono text-xl mb-2 ${edu.companyColor} font-bold`}>
                  @ {edu.company}
                </p>
                <ul className="list-disc list-inside font-mono text-gray-700 space-y-1">
                  {edu.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-24 bg-neo-yellow border-t-4 border-black px-4 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-6xl md:text-9xl font-black mb-16 uppercase tracking-tighter text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)] text-stroke-black"
          >
            Selected Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: 'HealthDesk',
                desc: 'Asynchronous telemedicine platform enabling patients to submit structured medical cases with optional real-time video consultations, priority-based doctor inboxes, and pharmacist medicine management.',
                tags: ['React.js', 'Tailwind CSS'],
                hoverColor: 'group-hover:text-neo-red',
                mt: '',
                video: '/healthdesk-demo.mp4',
                img: null,
                link: 'https://axios-tawny-tau.vercel.app',
                github: 'https://github.com/Hellf0rg0d/healthdesk',
              },
              {
                title: 'Get-It',
                desc: 'Secure file & text sharing platform supporting up to 10 simultaneous file uploads with unique 6-character access codes, batch downloads, and in-browser preview across all devices.',
                tags: ['React.js', 'Tailwind CSS', 'Axios'],
                hoverColor: 'group-hover:text-neo-blue',
                mt: 'mt-0 md:mt-20',
                video: null,
                img: '/getit.png',
                link: 'https://get-it-orpin.vercel.app',
                github: 'https://github.com/Sudhanva-Kulkarni/Get-It',
              },
            ].map((project, idx) => (
              <article
                key={idx}
                className={`reveal group bg-white border-4 border-black p-4 shadow-hard ${project.mt}`}
              >
                <div className="bg-black border-2 border-black aspect-video relative overflow-hidden mb-6 group-hover:shadow-none transition-all">
                  {project.video ? (
                    <video
                      src={project.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  ) : (
                    <img
                      src={project.img}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  )}
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3
                      className={`text-4xl font-black uppercase mb-2 ${project.hoverColor} transition-colors glitch-hover`}
                    >
                      {project.title}
                    </h3>
                    <p className="font-mono text-sm mb-4 max-w-xs">{project.desc}</p>
                    <div className="flex gap-2 font-mono text-xs font-bold flex-wrap mb-3">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="bg-neo-black text-white px-2 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3 font-mono text-xs font-bold">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 bg-white border-2 border-black px-2 py-1 shadow-hard-sm hover:bg-neo-black hover:text-white transition-all cursor-hover">
                        <i className="ri-github-fill"></i> GITHUB
                      </a>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 bg-white border-2 border-black px-2 py-1 shadow-hard-sm hover:bg-neo-green transition-all cursor-hover">
                        <i className="ri-external-link-line"></i> LIVE
                      </a>
                    </div>
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 border-2 border-black bg-neo-green flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-hover shadow-hard-sm"
                  >
                    <i className="ri-arrow-right-up-line text-2xl"></i>
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-24">
            <a
              href="https://github.com/Sudhanva-Kulkarni"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-neo-black text-white px-12 py-5 font-bold font-mono text-xl hover:bg-neo-white hover:text-black border-4 border-black transition-all shadow-hard hover:shadow-none cursor-hover"
            >
              VIEW ALL REPOS ON GITHUB
            </a>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section
        id="achievements"
        className="py-24 bg-neo-black border-t-4 border-black overflow-hidden relative"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-16 bg-white/5 border-2 border-white/10 p-4 flex shadow-hard shadow-neo-blue/20">
            <div className="flex gap-2">
              <div className="h-3 w-3 bg-red-500 rounded-full border border-black"></div>
              <div className="h-3 w-3 bg-yellow-500 rounded-full border border-black"></div>
              <div className="h-3 w-3 bg-green-500 rounded-full border border-black"></div>
            </div>
            <h2 className="font-mono text-white text-xl font-bold ml-4 tracking-tighter">
              ACHIEVEMENTS.txt
            </h2>
            <div className="ml-8 px-2 bg-neo-blue text-black text-[10px] font-black uppercase">
              UNLOCKED
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
            {[
              {
                id: '001',
                color: 'neo-yellow',
                title: 'Algoblitz 2.0 — 4th Place',
                desc: 'Placed 4th in a university-level coding competition, competing against top peers in algorithmic problem solving.',
                icon: 'ri-trophy-line',
              },
              {
                id: '002',
                color: 'neo-green',
                title: 'HackTU 7.0 — Finalist',
                desc: 'Selected as a finalist among 120 teams out of 6000+ applications at HackTU 7.0, held at Thapar Institute of Technology, Patiala — hosted by Major League Hacking.',
                icon: 'ri-code-box-line',
              },
            ].map((achievement, idx) => (
              <div
                key={idx}
                className={`reveal bg-neo-black border-4 border-white/10 p-8 shadow-hard hover:border-${achievement.color}/50 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden text-left`}
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-${achievement.color}`}></div>
                <div className={`font-mono text-${achievement.color} text-xs font-bold tracking-widest uppercase mb-4`}>
                  ACHIEVEMENT_{achievement.id}.log
                </div>
                <div className={`text-4xl text-${achievement.color} mb-4`}>
                  <i className={achievement.icon}></i>
                </div>
                <h3 className="font-black text-2xl text-white mb-3">{achievement.title}</h3>
                <p className="font-mono text-gray-400 text-sm leading-relaxed">{achievement.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 max-w-5xl mx-auto">
        <div className="bg-white border-4 border-black shadow-hard-xl p-8 md:p-12 relative reveal mt-12">
          <div className="absolute -top-10 -left-6 bg-neo-yellow border-4 border-black px-6 py-2 shadow-hard rotate-[-5deg]">
            <span className="font-black text-2xl">START A PROJECT</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-6xl font-black uppercase mb-6 leading-[0.85]">
                Let's
                <br />
                Talk
                <br />
                Code.
              </h2>
              <p className="font-mono text-lg mb-8 text-gray-600">
                I am currently available for freelance work and open to full-time opportunities.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-neo-black text-white flex items-center justify-center border-2 border-black">
                    <i className="ri-mail-line text-xl"></i>
                  </div>
                  <a
                    href="mailto:sudhanvakulkarni1305@gmail.com"
                    className="text-xl font-bold hover:bg-neo-blue cursor-hover break-all"
                  >
                    sudhanvakulkarni1305@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-neo-black text-white flex items-center justify-center border-2 border-black">
                    <i className="ri-phone-line text-xl"></i>
                  </div>
                  <span className="text-xl font-bold">+91 7899450140</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-neo-black text-white flex items-center justify-center border-2 border-black">
                    <i className="ri-map-pin-line text-xl"></i>
                  </div>
                  <span className="text-xl font-bold">Dharwad, India</span>
                </div>
              </div>
            </div>

            {formSubmitted ? (
              <div className="py-20 text-center">
                <i className="ri-checkbox-circle-fill text-6xl text-neo-green mb-4 block"></i>
                <h3 className="text-2xl font-black uppercase">Transmission Received</h3>
                <p className="font-mono text-sm mt-2">
                  System response initialized. I will reach out shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-gray-50 p-6 border-2 border-black"
              >
                <div className="flex flex-col">
                  <label className="font-mono font-bold mb-1 uppercase text-xs">Identity</label>
                  <input
                    type="text"
                    placeholder="NAME / COMPANY"
                    className="bg-white border-2 border-black p-3 font-bold focus:outline-none focus:bg-neo-yellow focus:shadow-hard-sm transition-all cursor-hover"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-mono font-bold mb-1 uppercase text-xs">Coordinates</label>
                  <input
                    type="email"
                    placeholder="EMAIL ADDRESS"
                    className="bg-white border-2 border-black p-3 font-bold focus:outline-none focus:bg-neo-yellow focus:shadow-hard-sm transition-all cursor-hover"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-mono font-bold mb-1 uppercase text-xs">Transmission</label>
                  <textarea
                    rows={4}
                    placeholder="PROJECT DETAILS..."
                    className="bg-white border-2 border-black p-3 font-bold focus:outline-none focus:bg-neo-yellow focus:shadow-hard-sm transition-all resize-none cursor-hover"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-neo-blue text-white font-black text-xl py-4 border-2 border-black shadow-hard hover:bg-neo-black hover:translate-y-1 hover:shadow-none transition-all cursor-hover"
                >
                  TRANSMIT DATA
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 px-4 border-t-8 border-neo-green font-mono relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl font-black mb-6">Sudhanva.</h2>
            <p className="text-gray-400 max-w-sm">
              Building fast, functional, and beautiful web experiences. Open for work and always curious.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-neo-green mb-4 border-b border-gray-700 pb-2">SITEMAP</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white hover:underline decoration-neo-pink decoration-2 cursor-hover">Home</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white hover:underline decoration-neo-pink decoration-2 cursor-hover">Works</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white hover:underline decoration-neo-pink decoration-2 cursor-hover">About</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white hover:underline decoration-neo-pink decoration-2 cursor-hover">Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-neo-green mb-4 border-b border-gray-700 pb-2">SOCIALS</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/Sudhanva-Kulkarni"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-neo-yellow transition-colors cursor-hover"
              >
                <i className="ri-github-fill"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/sudhanvakulkarni13"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-neo-blue transition-colors cursor-hover"
              >
                <i className="ri-linkedin-fill"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-16 pt-8 border-t border-gray-800 text-gray-500 text-sm">
          <p>© 2025 Sudhanva Kulkarni // SYSTEM_END</p>
        </div>

        <div className="absolute bottom-0 left-0 w-full text-[20vw] font-black text-white opacity-[0.03] leading-none select-none pointer-events-none text-center">
          BRUTAL
        </div>
      </footer>

      {/* CV Preview Modal */}
      {cvPreviewOpen && (
        <div
          className="fixed inset-0 z-[9998] flex items-center justify-center p-2 md:p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
          onClick={() => setCvPreviewOpen(false)}
        >
          <div
            className="bg-neo-white border-4 border-black shadow-hard-xl w-full max-w-4xl flex flex-col relative"
            style={{ height: '95vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-3 md:px-6 py-3 md:py-4 border-b-4 border-black bg-neo-black flex-shrink-0 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="h-3 w-3 bg-red-500 rounded-full border border-black"></div>
                  <div className="h-3 w-3 bg-yellow-500 rounded-full border border-black"></div>
                  <div className="h-3 w-3 bg-green-500 rounded-full border border-black"></div>
                </div>
                <span className="font-mono font-bold text-white text-xs md:text-sm ml-2 tracking-widest">RESUME.PDF</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <a
                  href="/Resume.pdf"
                  download="Sudhanva_Kulkarni_Resume.pdf"
                  className="flex items-center gap-1 md:gap-2 bg-neo-green text-black border-2 border-black px-2 md:px-4 py-1.5 md:py-2 font-mono font-bold text-xs md:text-sm shadow-hard-sm hover:bg-neo-yellow hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-hover"
                >
                  <i className="ri-download-line"></i>
                  <span className="hidden sm:inline">DOWNLOAD</span>
                </a>
                <button
                  onClick={() => setCvPreviewOpen(false)}
                  className="flex items-center gap-1 md:gap-2 bg-neo-red text-white border-2 border-black px-2 md:px-4 py-1.5 md:py-2 font-mono font-bold text-xs md:text-sm shadow-hard-sm hover:bg-white hover:text-black hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-hover"
                >
                  <i className="ri-close-line"></i>
                  <span className="hidden sm:inline">CLOSE</span>
                </button>
              </div>
            </div>

            {/* PDF Iframe */}
            <div className="flex-1 overflow-hidden min-h-0">
              <iframe
                src="/Resume.pdf"
                title="Sudhanva Kulkarni Resume"
                className="w-full h-full border-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}