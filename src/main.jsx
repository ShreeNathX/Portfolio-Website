import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, BarChart3, BrainCircuit,
  Check, CircleDot, Code2, Database, Layers3, Mail, Menu, Network, X,
} from 'lucide-react';
import googleSpecialization from '../assets/Certificates/Specialization/Google Data Analytics.png';
import mlSpecialization from '../assets/Certificates/Specialization/Machine Learning.png';
import localAiImage from '../assets/Projects/Local AI Assistant.png';
import roadWatchImage from '../assets/Projects/Road Watch.webp';
import learningXImage from '../assets/Projects/LearningX.webp';
import digitPredictionImage from '../assets/Projects/Handwritten Digit Prediction.png';
import retailAnalyticsImage from '../assets/Projects/Retail-Store-Analytics.png';
import trustRetentionImage from '../assets/Projects/FTRI.jpg';
import './styles.css';

const projects = [
  {
    title: 'Local AI Assistant', category: 'AI & ML', type: 'machine-learning', featured: true,
    description: 'A private assistant for conversation, coding, web search, and document Q&A, powered by a compact open model running locally.',
    stack: ['Python', 'Qwen 2.5', 'RAG'], repo: 'Local-AI-Assistant', live: 'https://local-ai-assistant-by-snm.streamlit.app/', color: 'lilac', image: localAiImage,
  },
  {
    title: 'Road Watch', category: 'Computer vision', type: 'machine-learning', featured: true,
    description: 'A local traffic monitoring tool that detects road users, counts crossings, and exports the results for further analysis.',
    stack: ['Python', 'YOLOv8', 'OpenCV'], repo: 'Road-Watch', live: 'https://road-watch-snx.streamlit.app/', color: 'mint', image: roadWatchImage,
  },
  {
    title: 'LearningX', category: 'Learning platform', type: 'product',
    description: 'A browser-based practice space for Python, SQL, and data interviews, with runnable challenges and saved progress.',
    stack: ['React', 'Pyodide', 'SQLite'], repo: 'LearningX', live: 'https://ShreeNathX.github.io/LearningX/', color: 'peach', image: learningXImage,
  },
  {
    title: 'Handwritten Digit Prediction', category: 'Deep learning', type: 'machine-learning',
    description: 'A CNN recognizes digits drawn on a canvas, with confidence scores and a probability view for each prediction.',
    stack: ['TensorFlow', 'CNN', 'MNIST'], repo: 'Handwritten-Digit-Detection', live: 'https://handwritten-digit-detection.streamlit.app/', color: 'blue', image: digitPredictionImage,
  },
  {
    title: 'Retail Store Analytics', category: 'Business intelligence', type: 'analytics', featured: true,
    description: 'A SQL-to-dashboard workflow exploring sales, inventory, pricing, and promotions to support retail decisions.',
    stack: ['MySQL', 'Power BI', 'DAX'], repo: 'Retail-Store-Analytics', color: 'yellow', image: retailAnalyticsImage,
  },
  {
    title: 'Trust & Retention Intelligence', category: 'Predictive analytics', type: 'analytics',
    description: 'An end-to-end finance project combining customer churn prediction and credit risk scoring in an interactive app.',
    stack: ['Python', 'XGBoost', 'Streamlit'], repo: 'Trust-and-Retention-Intelligence', live: 'https://trust-and-retention-intelligence.streamlit.app', color: 'pink', image: trustRetentionImage,
  },
];

const specializations = [
  {
    title: 'Google Data Analytics', label: 'Professional Certificate · 9 courses',
    summary: 'A practical foundation in the data analytics workflow, from asking questions and cleaning data to SQL, R, and visualization.',
    skills: ['SQL', 'R', 'Tableau', 'Spreadsheets'], image: googleSpecialization,
    credential: 'https://www.coursera.org/account/accomplishments/professional-cert/I76IIN0LAAHZ', status: 'Completed', color: 'mint',
  },
  {
    title: 'Machine Learning Specialization', label: 'Specialization · Stanford & DeepLearning.AI',
    summary: 'Andrew Ng’s program covering supervised and unsupervised learning, neural networks, and recommender systems.',
    skills: ['Supervised learning', 'Neural networks', 'TensorFlow', 'Python'], image: mlSpecialization,
    credential: 'https://www.coursera.org/account/accomplishments/specialization/QFXRZXO29P2I', status: 'Completed', color: 'lilac',
  },
  {
    title: 'Deep Learning Specialization', label: 'Specialization · DeepLearning.AI',
    summary: 'Building deeper knowledge of neural networks, CNNs, sequence models, NLP, and computer vision.',
    skills: ['Deep learning', 'CNNs', 'NLP', 'Computer vision'], image: null,
    credential: null, status: 'In progress', color: 'blue',
  },
];

const courseCertificates = [
  { title: 'Foundations: Data, Data, Everywhere', area: 'Google Data Analytics', credential: '62HKVV4U4W05', skills: 'Data analytics · Analytical thinking · Data lifecycle' },
  { title: 'Ask Questions to Make Data-Driven Decisions', area: 'Google Data Analytics', credential: 'JHV6RJ17R8AB', skills: 'Problem solving · Critical thinking · Data strategy' },
  { title: 'Prepare Data for Exploration', area: 'Google Data Analytics', credential: 'COMO0PP0L4HV', skills: 'Data cleaning · Data collection · SQL' },
  { title: 'Process Data from Dirty to Clean', area: 'Google Data Analytics', credential: 'X4BEFTHXU5MJ', skills: 'Data integrity · Data cleaning · Spreadsheets' },
  { title: 'Analyze Data to Answer Questions', area: 'Google Data Analytics', credential: 'XICQN06W91MH', skills: 'Data aggregation · SQL joins · Calculations' },
  { title: 'Share Data Through the Art of Visualization', area: 'Google Data Analytics', credential: 'GTGI1LE7GGOA', skills: 'Tableau · Storytelling · Dashboards' },
  { title: 'Data Analysis with R Programming', area: 'Google Data Analytics', credential: '5XA9D7IOEVD8', skills: 'R · ggplot2 · tidyverse' },
  { title: 'Google Data Analytics Capstone: Complete a Case Study', area: 'Google Data Analytics', credential: 'QSVLS5Q8KQBG', skills: 'Case study · Portfolio · Job search' },
  { title: 'Accelerate Your Job Search with AI', area: 'Google', credential: '3J0FNG2VDCKD', skills: 'AI tools · Job search · Career development' },
  { title: 'Supervised Machine Learning: Regression and Classification', area: 'Machine Learning', credential: 'KR37XUHCYC2W', skills: 'Linear regression · Logistic regression · Gradient descent' },
  { title: 'Advanced Learning Algorithms', area: 'Machine Learning', credential: 'BDBWDBF9Y4WQ', skills: 'Neural networks · TensorFlow · Decision trees' },
  { title: 'Unsupervised Learning, Recommenders, Reinforcement Learning', area: 'Machine Learning', credential: '2W4C6S9O0WVU', skills: 'Clustering · Anomaly detection · Recommender systems' },
];

const filterOptions = [
  { label: 'Everything', value: 'all' }, { label: 'Analytics', value: 'analytics' },
  { label: 'Machine learning', value: 'machine-learning' }, { label: 'Products', value: 'product' },
];

function currentRoute() {
  const fragment = window.location.hash.replace(/^#\/?/, '');
  if (['home', 'about', 'projects', 'certifications'].includes(fragment)) return fragment;
  const pageFile = window.location.pathname.split('/').pop()?.replace('.html', '');
  return ['about', 'projects', 'certifications'].includes(pageFile) ? pageFile : 'home';
}

function OrbitalScene() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const onMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setTilt({ x: (event.clientY - bounds.top - bounds.height / 2) / 32, y: (bounds.width / 2 - (event.clientX - bounds.left)) / 32 });
  };
  return (
    <div className="scene" onMouseMove={onMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })} aria-label="Interactive three-dimensional data sculpture">
      <div className="scene-label"><span className="live-dot" /> OPEN TO OPPORTUNITIES</div>
      <div className="scene-coordinate">OBSERVE · INTERPRET · ACT</div>
      <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
      <div className="scene-core" style={{ '--tilt-x': `${tilt.x}deg`, '--tilt-y': `${tilt.y}deg` }}>
        <div className="core-shadow" />
        <div className="core-cube">
          <div className="cube-face cube-front"><div className="cube-grid" /><div className="cube-glow" /><span className="cube-index">SIGNAL / 01</span><span className="cube-mark">∑</span><span className="cube-foot">DATA → DECISIONS</span></div>
          <div className="cube-face cube-back" /><div className="cube-face cube-left" /><div className="cube-face cube-right" /><div className="cube-face cube-top" /><div className="cube-face cube-bottom" />
        </div>
      </div>
      <div className="scene-node node-a"><span className="node-ring"><BarChart3 size={17} /></span><span>INSIGHT <b>SIGNAL FOUND</b></span></div>
      <div className="scene-node node-b"><span className="node-ring node-ring-lime"><BrainCircuit size={17} /></span><span>MODEL <b>READY</b></span></div>
      <div className="scene-node node-c"><span className="node-ring node-ring-orange"><Database size={17} /></span><span>DATA <b>CONNECTED</b></span></div>
      <div className="python-token"><span className="python-glyph" aria-hidden="true"><svg viewBox="0 0 32 32" role="img"><path fill="#3776ab" d="M15 3h7a5 5 0 0 1 5 5v6H14a4 4 0 0 0-4 4v2H8a5 5 0 0 1-5-5V9a6 6 0 0 1 6-6h6Z"/><circle cx="18.5" cy="7.5" r="1.4" fill="#f7f7f0"/><path fill="#ffd43b" d="M17 29h-7a5 5 0 0 1-5-5v-6h13a4 4 0 0 0 4-4v-2h2a5 5 0 0 1 5 5v6a6 6 0 0 1-6 6h-6Z"/><circle cx="13.5" cy="24.5" r="1.4" fill="#f7f7f0"/></svg></span><span>PYTHON<br />DATA TOOLS</span></div>
      <div className="scene-bottom"><span>ANALYTICS <i>·</i> INTELLIGENCE <i>·</i> IMPACT</span><span>MOVE TO EXPLORE</span></div>
    </div>
  );
}

function ProjectCard({ project, index = 0 }) {
  return (
    <article className={`project-card project-${project.color}`} style={{ '--delay': `${index * 65}ms` }}>
      <div className={`project-image${project.image ? ' has-project-preview' : ''}`}>
        {project.image ? <img className="project-preview-image" src={project.image} alt={`${project.title} project preview`} loading={index > 2 ? 'lazy' : 'eager'} /> : <div className="image-placeholder"><Layers3 size={27} strokeWidth={1.4} /><span>ADD YOUR PROJECT IMAGE</span></div>}
        <a className="project-open" href={`https://github.com/ShreeNathX/${project.repo}`} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} on GitHub`}><ArrowUpRight size={19} /></a>
        <span className="image-shape" aria-hidden="true" />
      </div>
      <div className="project-content">
        <div className="project-eyebrow"><span>{project.category}</span><span>INDEPENDENT PROJECT</span></div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-bottom"><div className="tag-list">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-actions">{project.live && <a href={project.live} target="_blank" rel="noreferrer" className="live-link"><span>Live demo</span><ArrowUpRight size={14} /></a>}<a href={`https://github.com/ShreeNathX/${project.repo}`} target="_blank" rel="noreferrer" className="repo-link"><Code2 size={17} /><span>Repository</span><ArrowUpRight size={14} /></a></div></div>
      </div>
    </article>
  );
}

function SpecializationCard({ item, index = 0 }) {
  return (
    <article className={`specialization-card specialization-${item.color}`} style={{ '--delay': `${index * 65}ms` }}>
      <div className="specialization-art">
        {item.image ? <img src={item.image} alt={`${item.title} certificate`} loading="lazy" /> : <div className="cert-image-placeholder"><BrainCircuit size={32} strokeWidth={1.3} /><span>LEARNING IN PROGRESS</span></div>}
        <span className={`cert-status ${item.status === 'Completed' ? 'completed' : 'in-progress'}`}>{item.status === 'Completed' ? <Check size={13} /> : <CircleDot size={12} />} {item.status}</span>
      </div>
      <div className="specialization-content"><p className="specialization-label">{item.label}</p><h3>{item.title}</h3><p className="specialization-summary">{item.summary}</p><div className="specialization-tags">{item.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
        {item.credential ? <a className="credential-link" href={item.credential} target="_blank" rel="noreferrer">View credential <ArrowUpRight size={15} /></a> : <span className="credential-link credential-muted">Credential to come after completion</span>}
      </div>
    </article>
  );
}

function SiteHeader({ page, onContact, scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a href="#/home" className="wordmark" onClick={closeMenu} aria-label="Shree Nath Mahato, home"><span className="wordmark-mark">s<span>.</span></span><span className="wordmark-name">Shree Nath Mahato</span></a>
      <nav className={menuOpen ? 'nav-open' : ''} aria-label="Main navigation">
        <a className={page === 'home' ? 'active' : ''} href="#/home" onClick={closeMenu}>Home</a>
        <a className={page === 'about' ? 'active' : ''} href="#/about" onClick={closeMenu}>About</a>
        <a className={page === 'projects' ? 'active' : ''} href="#/projects" onClick={closeMenu}>Projects</a>
        <a className={page === 'certifications' ? 'active' : ''} href="#/certifications" onClick={closeMenu}>Certifications</a>
        <a className="nav-contact" href="#/home" onClick={(event) => { closeMenu(); onContact(event); }}>Get in touch <ArrowUpRight size={15} /></a>
      </nav>
      <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X size={23} /> : <Menu size={23} />}</button>
    </header>
  );
}

function PageIntro({ kicker, title, subtitle }) {
  return <div className="page-intro section-wrap"><div><p className="eyebrow section-kicker">{kicker} <span className="eyebrow-divider">/</span> SHREE NATH MAHATO</p><h1>{title}</h1><p className="page-intro-copy">{subtitle}</p></div></div>;
}

function HomePage() {
  const featured = projects.filter((project) => project.featured);
  return (
    <main id="top">
      <section className="hero section-wrap">
        <div className="hero-copy"><p className="eyebrow"><span className="eyebrow-dot" /> DATA ANALYST <span className="eyebrow-divider">/</span> DATA SCIENTIST</p>
          <h1>Finding the<br />story <span>in the</span><br /><em>signal.</em></h1>
          <p className="hero-intro">I make data make sense. From the first messy row to the moment a useful decision clicks into place.</p>
          <div className="hero-actions"><a href="#featured-work" className="button button-dark">Explore my work <ArrowDownRight size={17} /></a><a href="#home-about" className="text-link">A little about me <ArrowRight size={16} /></a></div>
        </div>
        <OrbitalScene />
        <div className="hero-bottom-bar"><a className="scroll-cue" href="#featured-work"><span>SCROLL TO EXPLORE</span><ArrowDown size={17} /></a></div>
      </section>

      <section className="ticker" aria-label="Areas of work"><div className="ticker-track">{[0, 1].map((copy) => <div className="ticker-set" key={copy}><span>DATA, MADE USEFUL</span><CircleDot /><span>INSIGHT TO IMPACT</span><CircleDot /><span>CURIOUS BY DESIGN</span><CircleDot /><span>DATA, MADE USEFUL</span><CircleDot /><span>INSIGHT TO IMPACT</span><CircleDot /><span>CURIOUS BY DESIGN</span><CircleDot /></div>)}</div></section>

      <section className="home-about section-wrap" id="home-about"><div className="home-about-body"><p className="eyebrow home-about-kicker">A LITTLE ABOUT ME</p><h2>Curious about what<br />the data <em>is really saying.</em></h2><p>I’m Shree Nath, a data analyst and data scientist drawn to the space where careful analysis meets useful action. I enjoy asking better questions, building thoughtful tools, and making complex ideas easier to understand.</p><a className="text-link" href="#/about">More about me <ArrowRight size={16} /></a></div><div className="about-visual" role="img" aria-label="A dimensional data science sculpture surrounded by Python, SQL, and machine learning labels"><div className="about-visual-caption"><span>DATA PRACTICE</span><span>ANALYST / SCIENTIST</span></div><div className="about-visual-stage"><div className="about-visual-orbit orbit-horizontal" /><div className="about-visual-orbit orbit-vertical" /><div className="about-visual-orbit orbit-diagonal" /><div className="about-visual-core"><span>∑</span><i /><i /><i /></div><span className="visual-chip chip-python"><Code2 size={13} /> PYTHON</span><span className="visual-chip chip-sql"><Database size={13} /> SQL</span><span className="visual-chip chip-ml"><BrainCircuit size={13} /> ML</span></div><div className="about-visual-footer"><span>QUESTION</span><i /><span>INSIGHT</span><i /><span>IMPACT</span></div></div></section>

      <section className="work-section section-wrap" id="featured-work"><div className="section-heading"><div><p className="eyebrow section-kicker">A FEW THINGS I’VE MADE <span className="eyebrow-divider">/</span> SELECTED WORK</p><h2>Three ways to<br /><em>follow a question.</em></h2></div><p className="section-aside">Models, tools, and<br />business intelligence.</p></div>
        <div className="project-grid home-project-grid">{featured.map((project, index) => <ProjectCard key={project.repo} project={project} index={index} />)}</div>
        <div className="all-work-row"><span>SEE WHAT ELSE I’VE BEEN WORKING ON</span><a href="#/projects">All projects <ArrowUpRight size={16} /></a></div>
      </section>

      <section className="home-certifications"><div className="section-wrap"><div className="section-heading"><div><p className="eyebrow section-kicker">LEARNING, PUT INTO PRACTICE <span className="eyebrow-divider">/</span> CREDENTIALS</p><h2>Grounded in<br /><em>good foundations.</em></h2></div><p className="section-aside">A few milestones<br />along the way.</p></div>
        <div className="specialization-grid home-specialization-grid">{specializations.map((item, index) => <SpecializationCard key={item.title} item={item} index={index} />)}</div>
        <div className="all-work-row"><span>ALWAYS LEARNING, ALWAYS BUILDING</span><a href="#/certifications">All certifications <ArrowUpRight size={16} /></a></div>
      </div></section>

      <ContactSection />
    </main>
  );
}

function AboutPage() {
  const skills = [
    { title: 'Data analysis', icon: <BarChart3 size={21} />, items: ['Python', 'Pandas', 'NumPy', 'R', 'Excel', 'Statistical analysis'] },
    { title: 'Databases & SQL', icon: <Database size={21} />, items: ['SQL', 'MySQL', 'PostgreSQL', 'ETL', 'Data mining', 'Data modeling'] },
    { title: 'Visualization', icon: <Layers3 size={21} />, items: ['Power BI', 'Tableau', 'Matplotlib', 'Seaborn', 'Plotly'] },
    { title: 'Machine learning', icon: <BrainCircuit size={21} />, items: ['Scikit-learn', 'TensorFlow', 'Neural networks', 'Regression', 'Classification', 'Clustering'] },
  ];
  const approach = [
    ['Follow the evidence', 'I let data guide the story. I validate what I find and make assumptions visible.'],
    ['Sweat the details', 'Reliable results come from careful data, understandable methods, and a second look.'],
    ['Keep the context', 'I connect technical analysis to the people and decisions it is meant to support.'],
    ['Keep learning', 'I keep building my skills in deep learning, NLP, computer vision, and applied analytics.'],
  ];
  return <main className="inner-page" id="top"><PageIntro kicker="A LITTLE CONTEXT" title={<>Curiosity, with<br /><em>a working notebook.</em></>} subtitle="A bit about how I got here, what I care about, and the tools I reach for." />
    <section className="about-story section-wrap"><div className="about-story-copy"><p className="eyebrow story-kicker">MY STORY</p><h2>Turning data<br />into <em>decisions.</em></h2><p>I’m Shree Nath Mahato, a data analyst and data scientist who enjoys finding the story inside a complex dataset. What began as a fascination with patterns and numbers has grown into a commitment to doing careful analysis and making the result useful to real decisions.</p><p>I work across statistical analysis, machine learning, and data visualization. I care about clean data, meaningful insight, and explaining the reasoning clearly enough that other people can use it.</p><p>I’m continuing to deepen my data science practice, especially in deep learning, NLP, and computer vision. I’m most at home where analytical thinking, business context, and practical tools meet.</p><a className="button button-dark" href="#/home" onClick={goToContact}>Let’s talk <ArrowUpRight size={17} /></a></div><div className="about-story-aside"><div className="portrait-placeholder"><Network size={38} strokeWidth={1.2} /><span>SHREE NATH MAHATO</span></div></div></section>
    <section className="skills-section"><div className="section-wrap"><div className="section-heading"><div><p className="eyebrow section-kicker">TOOLS I WORK WITH</p><h2>A useful <em>toolkit.</em></h2></div><p className="section-aside">The right tool for<br />the question at hand.</p></div><div className="skill-grid">{skills.map((skill) => <article className="skill-card" key={skill.title}><div className="skill-icon">{skill.icon}</div><h3>{skill.title}</h3><div className="skill-pills">{skill.items.map((item) => <span key={item}>{item}</span>)}</div></article>)}</div></div></section>
    <section className="about-approach section-wrap"><div className="section-heading"><div><p className="eyebrow section-kicker">HOW I LIKE TO WORK</p><h2>Clear thinking.<br /><em>Useful outcomes.</em></h2></div></div><div className="about-approach-grid">{approach.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></section></main>;
}

function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const visibleProjects = projects.filter((project) => activeFilter === 'all' || project.type === activeFilter);
  return <main className="inner-page" id="top"><PageIntro kicker="SELECTED WORK" title={<>Questions worth<br /><em>following through.</em></>} subtitle="A mix of data analysis, machine learning, and small products built to make things clearer." />
    <section className="projects-page-section section-wrap"><div className="project-discipline-strip" aria-label="Areas of work"><article><Database size={19} /><div><span>ANALYTICS</span><p>Find the signal in the data</p></div><div className="discipline-bars"><i /><i /><i /><i /><i /></div></article><article><BrainCircuit size={19} /><div><span>MACHINE LEARNING</span><p>Build models with purpose</p></div><div className="discipline-orbit"><i /><i /><i /></div></article><article><Code2 size={19} /><div><span>TOOLS & PRODUCTS</span><p>Make ideas useful in practice</p></div><div className="discipline-spark"><i /><i /><i /><i /></div></article></div><div className="filter-row" role="group" aria-label="Filter projects">{filterOptions.map((filter) => <button key={filter.value} className={activeFilter === filter.value ? 'filter-pill active' : 'filter-pill'} onClick={() => setActiveFilter(filter.value)}>{filter.label}<span>{String(projects.filter((project) => filter.value === 'all' || project.type === filter.value).length).padStart(2, '0')}</span></button>)}</div><div className="project-grid" key={activeFilter}>{visibleProjects.map((project, index) => <ProjectCard key={project.repo} project={project} index={index} />)}</div>
    <div className="project-note"><span className="eyebrow">A NOTE ON IMAGES</span><p>Each preview is a ready-to-replace image frame. Drop a project screenshot into the matching card when you’re ready.</p></div></section></main>;
}

function CertificationsPage() {
  return <main className="inner-page" id="top"><PageIntro kicker="LEARNING, PUT INTO PRACTICE" title={<>Good foundations.<br /><em>Always growing.</em></>} subtitle="Specializations and individual course credentials that mark the learning behind the work." />
    <section className="certifications-page-section section-wrap"><div className="section-heading"><div><p className="eyebrow section-kicker">MULTI-COURSE PROGRAMS</p><h2>Specializations &<br /><em>professional learning.</em></h2></div><p className="section-aside">Two completed.<br />One in progress.</p></div><div className="specialization-grid">{specializations.map((item, index) => <SpecializationCard key={item.title} item={item} index={index} />)}</div><div className="learning-path"><div className="learning-path-intro"><span className="eyebrow">A PRACTICE THAT KEEPS MOVING</span><p>Each step adds a new way to turn questions into useful work.</p></div><div className="learning-path-steps"><span className="path-track" /><article className="path-step complete"><i><Check size={13} /></i><span>DATA ANALYTICS</span><small>Foundations</small></article><article className="path-step complete"><i><Check size={13} /></i><span>MACHINE LEARNING</span><small>Models & methods</small></article><article className="path-step active"><i><CircleDot size={13} /></i><span>DEEP LEARNING</span><small>In progress</small></article></div></div>
      <div className="course-section-heading"><div><p className="eyebrow section-kicker">INDIVIDUAL COURSE CREDENTIALS</p><h2>Coursework, <em>in detail.</em></h2></div></div><div className="course-list">{courseCertificates.map((course) => <article className="course-row" key={course.credential}><div className="course-info"><span className="course-area">{course.area}</span><h3>{course.title}</h3><p>{course.skills}</p></div><a href={`https://www.coursera.org/account/accomplishments/${course.credential === 'BDBWDBF9Y4WQ' || course.credential === 'QSVLS5Q8KQBG' ? 'records' : 'verify'}/${course.credential}`} target="_blank" rel="noreferrer" aria-label={`View credential for ${course.title}`}><span>View credential</span><ArrowUpRight size={17} /></a></article>)}</div>
      <div className="learning-note"><div className="learning-note-icon"><BrainCircuit size={22} /></div><div><span className="eyebrow">CURRENTLY LEARNING</span><h3>Deep learning, NLP & computer vision</h3><p>The Deep Learning Specialization is in progress. This section will link to the credential when it’s completed.</p></div><span className="cert-status in-progress"><CircleDot size={12} /> IN PROGRESS</span></div>
    </section></main>;
}

const contactSheetUrl = 'https://script.google.com/macros/s/AKfycbxAmXqgte7eeS5ImPZsp7r5AiF8jRnJYPYFWnvrVbd9WWYpwo8YzoFWQw5fAlhMJ4ahDg/exec';

function ContactForm() {
  const [status, setStatus] = useState({ type: '', message: '' });
  const [sending, setSending] = useState(false);
  async function handleSubmit(event) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      timestamp: new Date().toISOString(),
      firstName: String(data.get('firstName') || '').trim(),
      lastName: String(data.get('lastName') || '').trim(),
      email: String(data.get('email') || '').trim(),
      requestType: String(data.get('requestType') || ''),
      message: String(data.get('message') || '').trim(),
      website: String(data.get('website') || '').trim(),
    };
    setSending(true);
    setStatus({ type: '', message: '' });
    try {
      await fetch(contactSheetUrl, { method: 'POST', mode: 'no-cors', body: JSON.stringify(payload) });
      form.reset();
      setStatus({ type: 'success', message: 'Request submitted. Email me directly if you need delivery confirmation.' });
    } catch {
      setStatus({ type: 'error', message: 'The message could not be sent. Please email me at shreenath.ventures17@gmail.com.' });
    } finally {
      setSending(false);
    }
  }
  return <form className="contact-form" onSubmit={handleSubmit}>
    <div className="contact-form-heading"><span>LET’S START A CONVERSATION</span><Code2 size={18} /></div>
    <div className="contact-honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="form-name-row"><label>First name<input name="firstName" autoComplete="given-name" placeholder="Your first name" required /></label><label>Last name<input name="lastName" autoComplete="family-name" placeholder="Your last name" required /></label></div>
    <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
    <label>What would you like to discuss?<select name="requestType" defaultValue="" required><option value="" disabled>Select a topic</option><option>Data project</option><option>Job opportunity</option><option>Collaboration</option><option>Something else</option></select></label>
    <label>Your message<textarea name="message" rows="4" placeholder="A little about what you have in mind..." required /></label>
    <div className="form-submit-row"><button type="submit" className="button button-lime" disabled={sending}>{sending ? 'Sending…' : 'Send message'} <ArrowUpRight size={17} /></button><span className={`form-status ${status.type}`} role="status" aria-live="polite">{status.message}</span></div>
    <p className="form-privacy-note">Your message is sent to my portfolio contact sheet.</p>
  </form>;
}

function ContactSection() {
  return <section className="contact-section" id="contact"><div className="contact-inner section-wrap"><div className="contact-intro"><p className="eyebrow"><span className="eyebrow-dot" /> THE NEXT GOOD QUESTION</p><h2>Have something<br /><em>interesting?</em></h2><p className="contact-description">A project, a role, a problem worth untangling. I’d love to hear about it.</p><div className="contact-links"><a href="mailto:shreenath.ventures17@gmail.com"><Mail size={17} /> Email <ArrowUpRight size={14} /></a><a href="https://github.com/ShreeNathX" target="_blank" rel="noreferrer"><Code2 size={17} /> GitHub <ArrowUpRight size={14} /></a><a href="https://www.linkedin.com/in/shree-nath-mahato" target="_blank" rel="noreferrer"><Network size={17} /> LinkedIn <ArrowUpRight size={14} /></a></div><div className="contact-data-mark" aria-hidden="true"><span>MODEL</span><i /><i /><i /><i /><i /><span>DATA / SIGNAL</span></div></div><ContactForm /></div></section>;
}

function SiteFooter() {
  return <footer className="site-footer section-wrap"><a href="#/home" className="footer-brand">s<span>.</span></a><span>DESIGNED WITH INTENTION. BUILT TO STAY CURIOUS.</span><nav aria-label="Footer navigation"><a href="#/about">About</a><a href="#/projects">Projects</a><a href="#/certifications">Certifications</a></nav><span className="footer-year">© {new Date().getFullYear()} SHREE NATH MAHATO</span></footer>;
}

function goToContact(event) {
  event.preventDefault();
  const alreadyHome = currentRoute() === 'home';
  if (!alreadyHome) window.location.hash = '#/home';
  window.setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), alreadyHome ? 0 : 100);
}

function App() {
  const [page, setPage] = useState(currentRoute);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onHashChange = () => {
      if (!window.location.hash.startsWith('#/')) return;
      setPage(currentRoute());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const onScroll = () => setScrolled(window.scrollY > 36);
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('hashchange', onHashChange); window.removeEventListener('scroll', onScroll); };
  }, []);
  useEffect(() => {
    const titles = { home: 'Shree Nath Mahato | Data, made useful.', about: 'About | Shree Nath Mahato', projects: 'Projects | Shree Nath Mahato', certifications: 'Certifications | Shree Nath Mahato' };
    document.title = titles[page] || titles.home;
  }, [page]);
  const pages = { home: <HomePage />, about: <AboutPage />, projects: <ProjectsPage />, certifications: <CertificationsPage /> };
  return <div className="app"><SiteHeader page={page} onContact={goToContact} scrolled={scrolled} />{pages[page] || pages.home}<SiteFooter /></div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
