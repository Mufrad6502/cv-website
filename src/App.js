import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer'; // Import the hook for scroll detection

// Main App component
const App = () => {
  const [activeSection, setActiveSection] = useState('summary');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false); // State for scroll-to-top button visibility

  // LLM Feature States
  const [selectedSkill, setSelectedSkill] = useState(null); // Stores the skill for which explanation is requested
  const [skillExplanation, setSkillExplanation] = useState(''); // Stores the LLM-generated explanation
  const [isGeneratingExplanation, setIsGeneratingExplanation] = useState(false); // Loading state for LLM call
  const [showExplanationModal, setShowExplanationModal] = useState(false); // Controls modal visibility

  // Function to scroll to a section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false); // Close mobile menu after selection
    }
  };

  // Function to scroll to the very top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Effect to handle scroll event for showing/hiding the scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { // Show button after scrolling down 300px
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to generate skill explanation using Gemini API
  const generateSkillExplanation = async (skill) => {
    setSelectedSkill(skill);
    setSkillExplanation(''); // Clear previous explanation
    setIsGeneratingExplanation(true);
    setShowExplanationModal(true); // Show modal immediately with loading state

    try {
      const prompt = `Explain the importance or relevance of "${skill}" in the context of Software Quality Assurance (QA) or software development, in a concise and professional manner (max 50 words).`;
      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });

      const payload = { contents: chatHistory };
      const apiKey = ""; // Canvas provides this API key automatically
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setSkillExplanation(text);
      } else {
        setSkillExplanation("Could not generate explanation. Please try again.");
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setSkillExplanation("Failed to generate explanation. Network error or API issue.");
    } finally {
      setIsGeneratingExplanation(false);
    }
  };

  // Data for the CV - **REMINDER: Update GitHub and LinkedIn URLs!**
  const cvData = {
    name: "Mufrad Mustahsin",
    title: "Software Quality Assurance Engineer", // This is now used directly
    contact: {
      phone: "+8801684214201",
      email: "mufradmustahsin152@gmail.com",
      location: "Dhaka, Bangladesh",
      github: "https://github.com/Mufrad6502", 
      linkedin: "https://www.linkedin.com/in/mufrad-mustahsin-50b8ab1a5/" 
    },
    summary: "Experienced Software Quality Assurance Engineer skilled in both manual and automation testing with a solid background in working remotely for international teams. Proficient in using tools like Playwright ,Cypress, Postman, JMeter, and SQL for diverse testing needs. Recognized for excellent teamwork and communication abilities, and also has AI model testing experience, ensuring functionality, performance, and reliability of AI systems.",
    experience: [
      {
        title: "Software Quality Assurance Engineer",
        company: "rgbcode",
        location: "Remote - Tel Aviv-Yafo",
        duration: "01/2024 - Current",
        responsibilities: [
          "Manual Testing: Diligently discovering issues in WordPress",
          "Functional & Non-functional Testing: Ensuring optimal performance",
          "Automation Testing: Simplifying tasks using GitHub actions (Playwright)",
          "API Testing: Smooth data transfer (Postman)",
          "Client Communication: Bridging technical details and client understanding",
          "Collaboration: Excelling in teamwork",
          "Deployment Management: Skillfully handling releases",
          "Identified and resolved issues during AI model implementation on WordPress.",
          "Sprint Deliverables: Agile-centric results"
        ]
      },
      {
        title: "QA Automation Engineer (Contract)",
        company: "All Generation Tech",
        location: "Remote - USA",
        duration: "02/2025 - 05/2025",
        responsibilities: [
          "Automating regression suite using CodeceptJS with Playwright",
          "Enhancing test efficiency and coverage in a large-scale project",
          "Integrating automation into CI/CD pipelines for seamless deployments",
          "Optimizing test workflows to reduce manual effort and execution time",
          "Ensuring test stability through root cause analysis and script enhancements"
        ]
      },
      {
        title: "Software Quality Assurance Developer",
        company: "Bevy Commerce (prev. Aiva Labs)",
        location: "Remote - Toronto Ontario, Canada",
        duration: "12/2022 - 11/2023",
        responsibilities: [
          "Proficient in Manual and Automation Testing",
          "Specialized in Regression, Smoke, Integration Testing, Ad hoc Testing, Exploratory Testing, Big bang Testing, Extensive UI & Functional Testing",
          "Extensive experience in Shopify and E-Commerce testing",
          "Proficiency in Cypress, Postman, and BrowserStack",
          "Expertise in debugging complex browser compatibility issues."
        ]
      },
      {
        title: "Junior Software Quality Assurance Engineer",
        company: "10 Minute School",
        location: "onsite - Dhaka, Bangladesh",
        duration: "09/2022 - 11/2022",
        responsibilities: [
          "Working with SQA Engineers and assisting whenever needed",
          "Creating detailed, comprehensive, and well-structured test plans and test cases",
          "Performing manual testing",
          "Web Automation with playwright Framework",
          "Developing and applying testing processes for new and existing products to meet the requirements",
          "Implementing knowledge of SQL whenever it is required",
          "Identify, record, document thoroughly, and track bugs",
          "Collaborating with internal teams (e.g., Developers and product managers) to identify system requirements",
          "Staying up-to-date with new testing tools and test strategies",
          "API testing with insomnia and postman",
          "Database testing",
          "Web and Mobile Application Testing (ios & android)."
        ]
      },
      {
        title: "Trainee Software Quality Assurance Engineer",
        company: "IT Training BD",
        location: "Dhaka, Bangladesh",
        duration: "05/2022 - 10/2022",
        responsibilities: [
          "Manually test case creation",
          "API testing with Postman",
          "Load testing with JMeter",
          "Issue management with JIRA",
          "Database testing",
          "Mobile Automation with Appium",
          "Web Automation with Selenium."
        ]
      },
      {
        title: "Software Quality Assurance Engineer (Intern)",
        company: "Programming Hero",
        location: "Remote - USA",
        duration: "05/2022 - 08/2022",
        responsibilities: [
          "For Intellectual Capital Management, write precise, succinct system specifications, review and analyze system specifications, and create complete test plans and test cases",
          "Manual test case creation",
          "Issue management with JIRA",
          "API testing",
          "Exploratory testing",
          "Ad hoc Testing",
          "Following agile development methodology."
        ]
      },
      {
        title: "Frontend Developer",
        company: "Softwrd Ltd",
        location: "Hybrid - Norway & Bangladesh",
        duration: "08/2021 - 02/2022",
        responsibilities: [
          "Created Web pages with vanilla HTML, Javascript, and CSS",
          "Framework using Tailwind CSS and Svelte",
          "Optimized Frontend for performance, while ensuring that product specifications are met",
          "Followed agile development methodology."
        ]
      }
    ],
    skills: [ // Updated skills for the "Expertise in" section
      "Functional & Regression Testing",
      "Automation with Playwright & Cypress",
      "API Testing & Debugging",
      "CI/CD Integration",
      "Bug Reporting & Test Documentation",
      "Cross-Browser & Mobile Testing",
      // Remaining skills for the main Skills section
      "WordPress", "WooCommerce", "Agile Project Management",
      "SQL", "Performance Testing", "Agile Methodologies", "Software Development Life Cycle (SDLC)",
      "Software testing - Manual Testing: Requirement Analysis, Test Planning, Designing, Writing, and Reviewing Test Cases.",
      "Test Execution and Evaluation.", "Performance Testing Tool: JMeter",
      "API Testing Tool: Postman", "Agile Methodology and Project Management Tool: Jira, Click up",
      "Concepts: SDLC, STLC, OOP", "Source and Version Control: GitHub",
      "Analytical-thinking", "Product troubleshooting",
      "Artificial Intelligence and Machine Learning", "Machine learning models",
      "Machine learning techniques",
      "Machine learning algorithms understanding",
      "Data-driven decision-making", "Python programming"
    ],
    certifications: [
      "Python Data Structures - Coursera",
      "Programming for Everybody (Getting Started with Python) - Coursera",
      "Complete Tensorflow 2 and Keras Deep Learning Bootcamp - Udemy",
      "Complete Python Bootcamp: From Zero to Hero in Python - Udemy",
      "CCNA: Introduction to Networks Cisco",
      "Python for Computer Vision with OpenCV and Deep Learning - Udemy",
      "Programming Essentials in Python - Python Developer",
      "Network programmability and Automation using Python - Cisco",
      "Learn 3D Modeling with Blender - Arduino Community Bangladesh",
      "CCNA: Switching, Routing, and Wireless Essentials - Cisco",
      "CCNA: Enterprise Networking, Security, and Automation - Cisco",
      "Google Data Analytics - Google",
      "Crash course on python - Google",
      "Technical Support Fundamentals - Google",
      "The Complete 2021 Web Development Bootcamp - Udemy",
      "Python - HackerRank",
      "The Complete SQL Bootcamp: Go from Zero to Hero - Udemy"
    ],
    education: [
      {
        degree: "Bachelor of Science - BS, Electrical and Electronics Engineering",
        university: "North South University",
        duration: "05/2021"
      }
    ]
  };

  // Component for a section title within a card
  const CardTitle = ({ children }) => (
    <h2 className="text-2xl font-bold text-teal-400 mb-4 pb-2 border-b-2 border-gray-700 text-shadow-glow">
      {children}
    </h2>
  );

  // Reusable component for animating elements on scroll
  const InViewAnimationWrapper = ({ children, delay = 0 }) => {
    const { ref, inView } = useInView({
      triggerOnce: true, // Animation only triggers once
      threshold: 0.1,    // Trigger when 10% of the element is visible
    });

    return (
      <div
        ref={ref}
        style={{ transitionDelay: `${delay}ms` }}
        className={`transition-all duration-1000 ease-out ${
          inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'
        }`}
      >
        {children}
      </div>
    );
  };

  // Reusable card component for sections with scroll animation
  const SectionCard = ({ id, title, children }) => {
    return (
      <InViewAnimationWrapper>
        <section id={id} className="mb-8 p-6 rounded-xl shadow-xl glass-effect mx-auto max-w-4xl w-full transition-all duration-300 hover:translate-y-[-5px] hover:shadow-2xl">
          <CardTitle>{title}</CardTitle>
          {children}
        </section>
      </InViewAnimationWrapper>
    );
  };

  // Component for an experience item
  const ExperienceItem = ({ experience }) => (
    <div className="mb-6 pb-4 border-b border-gray-700 last:border-b-0 glass-effect-subtle p-3 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-100">{experience.title}</h3>
      <p className="text-gray-300 text-sm italic mb-1">{experience.company} | {experience.location} | {experience.duration}</p>
      <ul className="list-disc list-inside text-gray-200 text-sm space-y-0.5">
        {experience.responsibilities.map((res, index) => (
          <li key={index}>{res}</li>
        ))}
      </ul>
    </div>
  );

  // Component for a skill badge
  const SkillBadge = ({ skill }) => (
    <span
      className="inline-flex items-center bg-gray-700 text-gray-100 text-xs px-3 py-1.5 rounded-full font-medium m-1 transition-all duration-300 hover:bg-gray-600 hover:scale-105 shadow-sm glass-effect-subtle cursor-pointer"
      onClick={() => generateSkillExplanation(skill)} // Make skill badge clickable
    >
      {skill} ✨
    </span>
  );

  // Component for a certification item
  const CertificationItem = ({ certification }) => (
    <li className="p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-gray-200 text-sm glass-effect-subtle">
      {certification}
    </li>
  );

  // Component for an education item
  const EducationItem = ({ education }) => (
    <div className="mb-4 pb-4 border-b border-gray-700 last:border-b-0 glass-effect-subtle p-3 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-100">{education.degree}</h3>
      <p className="text-gray-300 text-sm italic">{education.university} | {education.duration}</p>
    </div>
  );

  return (
    <div className="font-dosis bg-gray-950 min-h-screen flex flex-col items-center custom-background-gradient background-shapes-container">
      {/* Tailwind CSS CDN and FontAwesome are assumed to be in public/index.html */}

      {/* Mobile Header & Menu Toggle */}
      <header className="bg-gray-900 text-white p-4 shadow-lg md:hidden flex justify-between items-center sticky top-0 z-50 w-full">
        <h1 className="text-xl font-extrabold tracking-wide">{cvData.name}</h1>
        <button
          className="text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars text-2xl"></i>
        </button>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <nav className="md:hidden fixed inset-0 bg-black bg-opacity-90 z-40 flex flex-col items-center justify-center space-y-6 text-white text-2xl">
          <button
            className="absolute top-4 right-4 text-white text-4xl"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
          {['summary', 'experience', 'skills', 'certifications', 'education'].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`font-medium hover:text-gray-200 transition-colors duration-300 ${activeSection === section ? 'border-b-2 border-teal-400' : ''}`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </nav>
      )}

      {/* Main Content Area - Now a single scrollable column */}
      <main className="flex-grow p-6 lg:p-10 w-full max-w-6xl">
        {/* Unified Hero Section (New Design) */}
        <InViewAnimationWrapper>
          <section id="intro" className="relative p-8 rounded-xl shadow-xl glass-effect mx-auto max-w-4xl w-full text-left overflow-hidden min-h-screen flex flex-col justify-center transition-all duration-300 hover:translate-y-[-5px] hover:shadow-2xl">
            {/* Abstract Background Elements (Circles/Blobs) */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob top-10 left-10"></div>
                <div className="absolute w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 top-40 right-20"></div>
                <div className="absolute w-56 h-56 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 bottom-10 left-60"></div>
            </div>

            <div className="relative z-10 p-4 text-center md:text-left"> {/* Content wrapper for z-index */}
                {/* Main Name & Title */}
                <h1 className="text-5xl md:text-6xl font-extrabold mb-3 text-white leading-tight text-shadow-glow animate-text-pop">
                    Meet <span className="text-teal-400">{cvData.name}</span>
                </h1>
                <p className="text-2xl md:text-3xl text-teal-400 mb-8 font-medium text-shadow-glow animate-text-pop animation-delay-500">
                    {cvData.title}<span className="blinking-cursor">|</span> {/* Static title + blinking cursor */}
                </p>

                {/* About Me / Summary Text */}
                <p className="text-lg text-gray-200 leading-relaxed mb-10 max-w-2xl mx-auto animate-text-pop animation-delay-1200">
                    {cvData.summary}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-10 animate-text-pop animation-delay-1500">
                    <a href={`mailto:${cvData.contact.email}`} className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold shadow-lg hover:bg-teal-500 transition-colors duration-300 transform hover:scale-105">
                        Hire Now
                    </a>
                    <button onClick={() => scrollToSection('experience')} className="px-6 py-3 border border-teal-600 text-teal-400 rounded-lg font-semibold shadow-lg hover:bg-teal-600 hover:text-white transition-colors duration-300 transform hover:scale-105">
                        View Portfolio <i className="fas fa-arrow-right ml-2"></i>
                    </button>
                </div>

                {/* Expertise/Skills Section */}
                <div className="mt-10 p-4 glass-effect-subtle rounded-lg animate-text-pop animation-delay-2000 max-w-2xl mx-auto">
                    <h3 className="text-xl font-semibold text-gray-200 mb-4">Expertise in</h3>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {cvData.skills.slice(0, 6).map((skill, index) => ( // Display top 6 specific skills
                            <span key={index} className="expertise-skill-bubble">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div> {/* End of content wrapper */}

            {/* Social Links (top right of hero) */}
            <div className="absolute top-4 right-4 flex space-x-4 animate-text-pop animation-delay-1000">
                <a href={cvData.contact.github} target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-teal-400 transition-colors duration-200 text-3xl">
                    <i className="fab fa-github"></i>
                </a>
                <a href={cvData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-teal-400 transition-colors duration-200 text-3xl">
                    <i className="fab fa-linkedin"></i>
                </a>
                <a href={`mailto:${cvData.contact.email}`} className="text-gray-200 hover:text-teal-400 transition-colors duration-200 text-3xl">
                    <i className="fas fa-envelope"></i>
                </a>
            </div>

           

            {/* Scroll Down Indicator (bottom center of the combined hero area) */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-3xl animate-bounce">
                <i className="fas fa-chevron-down"></i>
            </div>
          </section>
        </InViewAnimationWrapper>

        {/* Experience Section */}
        <SectionCard id="experience" title="Experience">
          <div className="space-y-6">
            {cvData.experience.map((exp, index) => (
              <ExperienceItem key={index} experience={exp} />
            ))}
          </div>
        </SectionCard>

        {/* Skills Section */}
        <SectionCard id="skills" title="Skills">
          <div className="flex flex-wrap gap-2">
            {cvData.skills.map((skill, index) => (
              <SkillBadge key={index} skill={skill} />
            ))}
          </div>
        </SectionCard>

        {/* Certifications Section */}
        <SectionCard id="certifications" title="Certifications">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cvData.certifications.map((cert, index) => (
              <CertificationItem key={index} certification={cert} />
            ))}
          </ul>
        </SectionCard>

        {/* Education Section */}
        <SectionCard id="education" title="Education">
          <div className="space-y-4">
            {cvData.education.map((edu, index) => (
              <EducationItem key={index} education={edu} />
            ))}
          </div>
        </SectionCard>
      </main>

      {/* Footer */}
      <footer className="footer-glassmorphism text-white p-6 text-center w-full rounded-t-lg">
        <p>&copy; {new Date().getFullYear()} {cvData.name}. All rights reserved.</p>
      
      </footer>

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-teal-600 text-white p-4 rounded-full shadow-lg hover:bg-teal-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 z-50"
          aria-label="Scroll to top"
        >
          <i className="fas fa-arrow-up text-xl"></i>
        </button>
      )}

      {/* LLM Explanation Modal */}
      {showExplanationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="glass-effect p-8 rounded-xl max-w-md w-full text-center relative">
            <button
              onClick={() => setShowExplanationModal(false)}
              className="absolute top-4 right-4 text-gray-300 hover:text-white text-2xl"
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold text-teal-400 mb-4 text-shadow-glow">{selectedSkill}</h3>
            {isGeneratingExplanation ? (
              <div className="flex justify-center items-center">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                <p className="text-gray-300 ml-4">Generating explanation...</p>
              </div>
            ) : (
              <p className="text-gray-200 leading-relaxed">{skillExplanation}</p>
            )}
          </div>
        </div>
      )}

      {/* Custom CSS for animations, font, glassmorphism, and background shapes */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Dosis:wght@300;400;500;600;700;800&display=swap');
          .font-dosis {
            font-family: 'Dosis', sans-serif;
          }
          /* Smooth scrolling behavior */
          html {
            scroll-behavior: smooth;
          }

          /* Main Glassmorphism Effect */
          .glass-effect {
            background-color: rgba(0, 0, 0, 0.35); /* Slightly more opaque */
            backdrop-filter: blur(15px); /* Increased blur */
            -webkit-backdrop-filter: blur(15px); /* For Safari compatibility */
            border: 1px solid rgba(0, 0, 0, 0.2); /* Black border */
            box-shadow: 0 6px 40px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(0, 0, 0, 0.2); /* More pronounced shadow + inner glow */
          }

          /* Subtle Glassmorphism Effect for inner elements */
          .glass-effect-subtle {
            background-color: rgba(0, 0, 0, 0.15); /* Slightly more opaque */
            backdrop-filter: blur(8px); /* Gentle blur */
            -webkit-backdrop-filter: blur(8px); /* For Safari compatibility */
            border: 1px solid rgba(0, 0, 0, 0.1); /* Black border */
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15); /* Light shadow */
          }

          /* Subtle text glow for titles */
          .text-shadow-glow {
            text-shadow: 0 0 8px rgba(0, 255, 255, 0.3), 0 0 15px rgba(0, 255, 255, 0.1);
          }

          /* Custom radial background gradient */
          .custom-background-gradient {
            background: radial-gradient(circle at 10% 20%, rgba(0, 150, 150, 0.15) 0%, transparent 30%),
                        radial-gradient(circle at 90% 80%, rgba(0, 100, 100, 0.1) 0%, transparent 30%),
                        radial-gradient(circle at 50% 50%, rgba(0, 70, 70, 0.08) 0%, transparent 50%),
                        #000000; /* Base black */
            background-size: 150% 150%, 120% 120%, 100% 100%, cover; /* Adjust sizes for more spread */
            background-position: top left, bottom right, center, center;
            background-repeat: no-repeat;
          }

          /* General layout adjustments for single page scroll */
          .flex-col {
            align-items: center; /* Center content horizontally */
          }
          main {
            padding-top: 2rem; /* Add some space at the top */
          }

          /* Background Shapes Container */
          .background-shapes-container {
            position: relative;
            overflow: hidden; /* Ensures shapes don't spill out */
          }

          .background-shapes-container::before,
          .background-shapes-container::after {
            content: '';
            position: absolute;
            border-radius: 50%; /* Make them circular */
            filter: blur(100px); /* Heavy blur for a soft glow effect */
            opacity: 0.3; /* Subtle presence */
            z-index: -1; /* Ensure they are behind content */
            animation: moveShapes 20s infinite alternate ease-in-out; /* Slow, continuous movement */
          }

          .background-shapes-container::before {
            width: 400px;
            height: 400px;
            background: linear-gradient(135deg, rgba(0, 200, 200, 0.6), rgba(0, 100, 100, 0.6));
            top: -100px;
            left: -100px;
          }

          .background-shapes-container::after {
            width: 300px;
            height: 300px;
            background: linear-gradient(45deg, rgba(0, 150, 150, 0.6), rgba(0, 50, 50, 0.6));
            bottom: -100px;
            right: -100px;
            animation-delay: 5s; /* Stagger animation */
          }

          @keyframes moveShapes {
            0% {
              transform: translate(0, 0) scale(1);
            }
            25% {
              transform: translate(20px, -20px) scale(1.05);
            }
            50% {
              transform: translate(0, 20px) scale(0.95);
            }
            75% {
              transform: translate(-20px, -10px) scale(1.03);
            }
            100% {
              transform: translate(0, 0) scale(1);
            }
          }

          /* Footer Glassmorphism with Greenish Gradient */
          .footer-glassmorphism {
            background: linear-gradient(90deg, rgba(0, 50, 50, 0.4), rgba(0, 0, 0, 0.4), rgba(0, 50, 50, 0.4)); /* Dark greenish gradient */
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-top: 1px solid rgba(0, 0, 0, 0.3); /* Dark border */
            box-shadow: 0 -4px 30px rgba(0, 0, 0, 0.5); /* Shadow for depth */
          }

          /* Hero Section Blob Animation */
          @keyframes blob {
            0% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0, 0) scale(1); }
          }
          .animate-blob {
            animation: blob 7s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55);
          }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }

          /* Creative Contact Bubble Styling (New Design) */
          .creative-contact-bubble {
            @apply flex flex-col items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-full text-gray-200 transition-all duration-300 cursor-pointer;
            background-color: rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
            position: absolute; /* Crucial for positioning */
            overflow: hidden; /* Ensure content stays within circle */
          }
          .creative-contact-bubble:hover {
            background-color: rgba(0, 0, 0, 0.3);
            border-color: rgba(255, 255, 255, 0.2);
            transform: scale(1.1) translateY(-5px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
          }
          .creative-contact-bubble i {
            font-size: 2.5rem; /* Larger icons */
            margin-bottom: 0.5rem;
          }
          .creative-contact-bubble span {
            font-size: 0.9rem; /* Smaller text for detail */
            text-align: center;
          }

          /* Typing effect cursor */
          .blinking-cursor {
            font-weight: 100;
            animation: 1s blink step-end infinite; /* Re-added blinking animation */
          }

          /* Scroll Down Arrow Animation */
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(-5px);
            }
          }
          .animate-bounce {
            animation: bounce 2s infinite;
          }

          /* Loader for LLM explanation */
          .loader {
            border-top-color: #3498db;
            -webkit-animation: spinner 1.5s linear infinite;
            animation: spinner 1.5s linear infinite;
          }

          @-webkit-keyframes spinner {
            0% { -webkit-transform: rotate(0deg); }
            100% { -webkit-transform: rotate(360deg); }
          }

          @keyframes spinner {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          /* New Text Pop-in Animation */
          @keyframes textPop {
            0% { opacity: 0; transform: scale(0.8) translateY(20px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          .animate-text-pop {
            animation: textPop 0.8s ease-out forwards;
            opacity: 0; /* Start invisible */
          }
          .animation-delay-500 { animation-delay: 0.5s; }
          .animation-delay-1000 { animation-delay: 1s; }

          /* Slow Pulse for Central Point */
          @keyframes pulse-slow {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.7; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 3s infinite ease-in-out;
          }

          /* Bubble Float Animation */
          @keyframes bubble-float {
            0% { transform: translate(0, 0); }
            50% { transform: translate(5px, -5px); }
            100% { transform: translate(0, 0); }
          }
          .animate-bubble-float {
            animation: bubble-float 4s infinite alternate ease-in-out;
          }

          /* Expertise Skill Bubble */
          .expertise-skill-bubble {
            display: inline-flex;
            align-items: center;
            padding: 0.5rem 1rem;
            border-radius: 9999px; /* Full rounded */
            font-size: 0.875rem; /* text-sm */
            font-weight: 500; /* font-medium */
            margin: 0.25rem; /* m-1 */
            transition: all 0.3s ease-in-out;
            background-color: rgba(255, 255, 255, 0.08); /* Transparent glass-like */
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            color: #E5E7EB; /* text-gray-200 */
          }

          .expertise-skill-bubble:hover {
            background-color: rgba(255, 255, 255, 0.15);
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          }
        `}
      </style>
    </div>
  );
};

export default App;
