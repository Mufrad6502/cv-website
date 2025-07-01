import React, { useState, useEffect } from 'react';

// Main App component
const App = () => {
  const [activeSection, setActiveSection] = useState('summary');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to scroll to a section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false); // Close mobile menu after selection
    }
  };

  // Data for the CV
  const cvData = {
    name: "Mufrad Mustahsin",
    title: "Software Quality Assurance Engineer",
    contact: {
      phone: "+8801684214201",
      email: "mufradmustahsin152@gmail.com",
      location: "Dhaka, Bangladesh",
      github: "https://github.com/your-github-profile", // Placeholder: Update with your actual GitHub profile
      linkedin: "https://linkedin.com/in/your-linkedin-profile" // Placeholder: Update with your actual LinkedIn profile
    },
    summary: "Experienced Software Quality Assurance Engineer skilled in both manual and automation testing with a solid background in working remotely for international teams. Proficient in using tools like Cypress, Postman, JMeter, and SQL for diverse testing needs. Recognized for excellent teamwork and communication abilities, and also has AI model testing experience, ensuring functionality, performance, and reliability of AI systems.",
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
    skills: [
      "WordPress", "WooCommerce", "Playwright", "Agile Project Management",
      "Regression Testing", "Continuous Integration and Continuous Delivery (CI/CD)",
      "SQL", "Performance Testing", "Agile Methodologies", "Software Development Life Cycle (SDLC)",
      "Software testing - Manual Testing: Requirement Analysis, Test Planning, Designing, Writing, and Reviewing Test Cases.",
      "Test Execution and Evaluation.", "Performance Testing Tool: JMeter",
      "API Testing Tool: Postman", "Agile Methodology and Project Management Tool: Jira, Click up",
      "Concepts: SDLC, STLC, OOP", "Source and Version Control: GitHub",
      "Automation Tool - Playwright, Cypress", "Analytical-thinking", "Product troubleshooting",
      "Artificial Intelligence and Machine Learning", "Machine learning models",
      "Machine learning techniques", "Machine learning algorithms understanding",
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

  // Component for a section title
  const SectionTitle = ({ children }) => (
    <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-blue-600 pb-2 inline-block">
      {children}
    </h2>
  );

  // Component for an experience item
  const ExperienceItem = ({ experience }) => (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-blue-700">{experience.title}</h3>
      <p className="text-gray-600 text-sm italic mb-2">{experience.company} | {experience.location} | {experience.duration}</p>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        {experience.responsibilities.map((res, index) => (
          <li key={index}>{res}</li>
        ))}
      </ul>
    </div>
  );

  // Component for a skill badge
  const SkillBadge = ({ skill }) => (
    <span className="inline-block bg-blue-100 text-blue-800 text-sm px-4 py-2 rounded-full font-medium m-1 transition-all duration-300 hover:bg-blue-200 hover:scale-105">
      {skill}
    </span>
  );

  // Component for a certification item
  const CertificationItem = ({ certification }) => (
    <li className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      <p className="text-gray-700">{certification}</p>
    </li>
  );

  // Component for an education item
  const EducationItem = ({ education }) => (
    <div className="mb-6 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-blue-700">{education.degree}</h3>
      <p className="text-gray-600 text-sm italic mb-2">{education.university} | {education.duration}</p>
    </div>
  );

  return (
    <div className="font-inter bg-gray-50 min-h-screen">
      {/* Tailwind CSS CDN */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* FontAwesome for icons */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"></link>

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white p-4 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-wide">{cvData.name}</h1>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {['summary', 'experience', 'skills', 'certifications', 'education'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-lg font-medium hover:text-blue-200 transition-colors duration-300 ${activeSection === section ? 'border-b-2 border-white' : ''}`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </nav>
        </div>
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-blue-800 mt-4 rounded-md shadow-lg">
            {['summary', 'experience', 'skills', 'certifications', 'education'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`block w-full text-left px-4 py-3 text-lg font-medium hover:bg-blue-700 transition-colors duration-300 ${activeSection === section ? 'bg-blue-700' : ''}`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6 lg:p-10">
        {/* Summary Section */}
        <section id="summary" className="mb-12 p-8 bg-white rounded-lg shadow-xl animate-fade-in">
          <SectionTitle>Summary</SectionTitle>
          <p className="text-lg text-gray-700 leading-relaxed">
            {cvData.summary}
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
            <p><i className="fas fa-phone-alt text-blue-600 mr-2"></i> {cvData.contact.phone}</p>
            <p><i className="fas fa-envelope text-blue-600 mr-2"></i> <a href={`mailto:${cvData.contact.email}`} className="hover:underline text-blue-600">{cvData.contact.email}</a></p>
            <p><i className="fas fa-map-marker-alt text-blue-600 mr-2"></i> {cvData.contact.location}</p>
            <p><i className="fab fa-github text-blue-600 mr-2"></i> <a href={cvData.contact.github} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">GitHub Profile</a></p>
            <p><i className="fab fa-linkedin text-blue-600 mr-2"></i> <a href={cvData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">LinkedIn Profile</a></p>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-12 p-8 bg-white rounded-lg shadow-xl animate-fade-in">
          <SectionTitle>Experience</SectionTitle>
          <div className="space-y-8">
            {cvData.experience.map((exp, index) => (
              <ExperienceItem key={index} experience={exp} />
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-12 p-8 bg-white rounded-lg shadow-xl animate-fade-in">
          <SectionTitle>Skills</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {cvData.skills.map((skill, index) => (
              <SkillBadge key={index} skill={skill} />
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="mb-12 p-8 bg-white rounded-lg shadow-xl animate-fade-in">
          <SectionTitle>Certifications</SectionTitle>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cvData.certifications.map((cert, index) => (
              <CertificationItem key={index} certification={cert} />
            ))}
          </ul>
        </section>

        {/* Education Section */}
        <section id="education" className="mb-12 p-8 bg-white rounded-lg shadow-xl animate-fade-in">
          <SectionTitle>Education</SectionTitle>
          <div className="space-y-6">
            {cvData.education.map((edu, index) => (
              <EducationItem key={index} education={edu} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6 text-center rounded-t-lg">
        <p>&copy; {new Date().getFullYear()} {cvData.name}. All rights reserved.</p>
        <p className="text-sm mt-2">Designed with <i className="fas fa-heart text-red-500"></i> by Gemini</p>
      </footer>

      {/* Custom CSS for animations and font */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
          .font-inter {
            font-family: 'Inter', sans-serif;
          }
          .animate-fade-in {
            animation: fadeIn 0.8s ease-out forwards;
            opacity: 0;
            transform: translateY(20px);
          }
          @keyframes fadeIn {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          /* Apply animation to sections on load */
          section {
            animation-delay: 0.2s; /* Stagger animation if needed */
          }
          /* Smooth scrolling behavior */
          html {
            scroll-behavior: smooth;
          }
        `}
      </style>
    </div>
  );
};

export default App;
