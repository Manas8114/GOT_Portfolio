export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    category: "research" | "ai-ml" | "systems" | "web";
    technologies: string[];
    githubUrl: string;
    featured: boolean;
    isResearch?: boolean;
    highlights: string[];
}

export const personalInfo = {
    name: "Manas Sharma",
    title: "AI & Machine Learning Researcher",
    tagline: "B.Tech Data Science Undergraduate — Explainable Reinforcement Learning for Intelligent Systems",
    email: "manassharma8114@gmail.com",
    phone: "+91 6265586868",
    github: "https://github.com/Manas8114",
    linkedin: "https://linkedin.com/in/manas8114",
    location: "India",
    ielts: "Overall 6.5 (All Bands 6.5)",
    education: {
        degree: "B.Tech in Data Science",
        institution: "SRM Institute of Science & Technology",
        startYear: "2022",
        graduationYear: "May 2026",
        cgpa: "8.49 / 10",
        location: "India",
        admitted: "University College Dublin (UCD) — MSc Data and Computational Science (T306)",
    },
    researchInterests: [
        "Reinforcement Learning",
        "Explainable AI (XAI)",
        "Machine Learning Systems",
        "Intelligent Network Optimization",
        "AI-Native Communication Systems",
    ],
    publications: [
        {
            title: "Reevaluating CNN Filter Dimensions: Experimental Findings on CIFAR-10 and Fashion-MNIST",
            venue: "IEEE ICICV 2026",
            status: "Published (Oral Presentation)",
        },
        {
            title: "Intent-Driven AI-Native Network Slicing for Rural Broadcasting over ATSC 3.0/B2X",
            venue: "IEEE WOCC 2026",
            status: "Published (IEEE)",
        },
    ],
    researchExperience: [
        {
            title: "AI-Native Network Optimization Research",
            points: [
                "Designed RL-based framework for adaptive resource allocation in communication networks",
                "Investigated optimization strategies for bandwidth prioritization using intent-driven automation",
            ],
        },
        {
            title: "Explainable Machine Learning Systems",
            points: [
                "Developed interpretable ML models using SHAP-based feature attribution techniques",
                "Studied transparency and trust mechanisms in AI-driven decision-making pipelines",
            ],
        },
    ],
    languages: [
        { name: "Hindi", level: "Native" },
        { name: "English", level: "Professional" },
        { name: "German", level: "Beginner" },
    ],
    interests: ["Cycling", "Badminton", "Gaming"],
};

export const projects: Project[] = [
    {
        id: "icicv-cnn",
        title: "Reevaluating CNN Filter Dimensions",
        description: "Experimental Findings on CIFAR-10 and Fashion-MNIST.",
        longDescription: "Accepted for Oral Presentation at ICICV 2026. A detailed analysis of CNN filter dimension impact on benchmark datasets.",
        category: "research",
        technologies: ["Python", "Deep Learning", "CNN", "PyTorch"],
        githubUrl: "https://github.com/Manas8114",
        featured: true,
        isResearch: true,
        highlights: ["ICICV 2026 Oral Presentation", "CNN Filter Analysis", "CIFAR-10", "Fashion-MNIST"],
    },
    {
        id: "wocc-network-slicing",
        title: "Intent-Driven AI-Native Network Slicing",
        description: "Network Slicing for Rural Broadcasting over ATSC 3.0/B2X.",
        longDescription: "Under Review at WOCC 2026. Proposes intent-driven automation for network slicing optimization.",
        category: "research",
        technologies: ["Python", "Network Slicing", "AI-Native", "ATSC 3.0"],
        githubUrl: "https://github.com/Manas8114",
        featured: true,
        isResearch: true,
        highlights: ["WOCC 2026 Submission", "AI-Native Slicing", "Rural Broadcasting", "ATSC 3.0"],
    },
    {
        id: "6g-network",
        title: "6G Network AI System",
        description:
            "Enhanced Telecom AI System - a cutting-edge, production-ready telecommunications network management platform powered by 7 advanced AI agents.",
        longDescription:
            "A next-generation telecommunications system leveraging multiple AI agents for intelligent network management, optimization, and predictive maintenance.",
        category: "research",
        technologies: ["Python", "AI Agents", "Telecommunications", "FastAPI"],
        githubUrl: "https://github.com/Manas8114",
        featured: true,
        highlights: [
            "7 advanced AI agents for network management",
            "Production-ready architecture",
            "Real-time network optimization",
            "Predictive maintenance capabilities",
        ],
    },
    {
        id: "ev-adoption",
        title: "Uncertainty-Aware EV Adoption Analysis",
        description:
            "Bayesian hierarchical model with spatial ICAR for EV adoption prediction with rigorous uncertainty quantification.",
        longDescription:
            "A research-grade system that combines Bayesian hierarchical models with spatial Intrinsic Conditional Autoregressive (ICAR) components to predict electric vehicle adoption patterns across regions.",
        category: "research",
        technologies: [
            "Python",
            "PyMC",
            "Bayesian Statistics",
            "Spatial Modeling",
            "Next.js",
        ],
        githubUrl:
            "https://github.com/Manas8114/Uncertainty-Aware-EV-Adoption-Analysis",
        featured: true,
        highlights: [
            "Bayesian model stacking for ensemble predictions",
            "ICAR spatial autocorrelation modeling",
            "Policy simulation dashboard",
            "Uncertainty visualization",
        ],
    },
    {
        id: "atsc-slicing",
        title: "Intent-Driven ATSC Slicing",
        description:
            "AI-native network slicing for rural broadcasting over ATSC 3.0. Built for ITU FG-AINN Build-a-thon 4.0.",
        longDescription:
            "An intent-driven network slicing system for ATSC 3.0 broadcasting infrastructure, designed to optimize spectrum allocation for rural connectivity.",
        category: "research",
        technologies: [
            "TypeScript",
            "Next.js",
            "FastAPI",
            "Network Simulation",
            "AI/ML",
        ],
        githubUrl: "https://github.com/Manas8114/intent-driven-atsc-slicing",
        featured: true,
        highlights: [
            "ITU Build-a-thon 4.0 submission",
            "Intent-to-configuration translation",
            "Real-time telemetry dashboard",
            "Network operations center UI",
        ],
    },
    {
        id: "disaster-management",
        title: "Disaster Management System",
        description:
            "ML-powered platform for disaster prediction, resource allocation, and emergency response coordination.",
        longDescription:
            "Comprehensive disaster management solution using machine learning for early warning systems and optimized resource deployment.",
        category: "ai-ml",
        technologies: ["Python", "Machine Learning", "Data Analysis", "React"],
        githubUrl: "https://github.com/Manas8114",
        featured: true,
        highlights: [
            "Predictive disaster modeling",
            "Resource optimization algorithms",
            "Real-time coordination",
            "Emergency response planning",
        ],
    },
    {
        id: "medicure-app",
        title: "Medicure App",
        description:
            "Healthcare application for medical consultation, prescription management, and health tracking.",
        longDescription:
            "A comprehensive healthcare platform connecting patients with medical professionals, featuring appointment scheduling and health analytics.",
        category: "web",
        technologies: ["Java", "React", "Healthcare APIs", "SQL"],
        githubUrl: "https://github.com/Manas8114/Java-MediCure",
        featured: false,
        highlights: [
            "Patient-doctor connectivity",
            "Prescription management",
            "Health tracking dashboard",
            "Appointment scheduling",
        ],
    },
    {
        id: "legal-qa",
        title: "A-Q Legal System",
        description:
            "Domain-specific NLP system for legal document analysis and question answering.",
        longDescription:
            "A specialized question-answering system trained on legal documents, capable of extracting relevant information and providing cited answers.",
        category: "ai-ml",
        technologies: ["Python", "Transformers", "NLP", "LangChain"],
        githubUrl: "https://github.com/Manas8114/A-Q_legal",
        featured: false,
        highlights: [
            "Legal domain fine-tuning",
            "Citation extraction",
            "Document retrieval",
            "Multi-document synthesis",
        ],
    },
    {
        id: "virtual-cloth",
        title: "Gen AI Virtual Cloth Tryout",
        description:
            "Generative AI-powered virtual clothing try-on using image synthesis and body mapping.",
        longDescription:
            "An innovative virtual try-on solution using generative AI to realistically render clothing on user images.",
        category: "ai-ml",
        technologies: ["Python", "Generative AI", "Computer Vision", "Diffusion Models"],
        githubUrl: "https://github.com/Manas8114",
        featured: false,
        highlights: [
            "Realistic clothing rendering",
            "Body pose estimation",
            "Multiple garment support",
            "Real-time preview",
        ],
    },
    {
        id: "traffic-ai",
        title: "AI Traffic Management System",
        description:
            "Real-time traffic optimization using ML models for intelligent signal control.",
        longDescription:
            "An intelligent traffic management system that uses reinforcement learning to optimize traffic signal timing in real-time.",
        category: "systems",
        technologies: ["Python", "TensorFlow", "Reinforcement Learning", "OpenCV"],
        githubUrl: "https://github.com/Manas8114/AI-traffic-management-system",
        featured: false,
        highlights: [
            "Real-time vehicle detection",
            "Adaptive signal timing",
            "Congestion prediction",
            "Multi-intersection coordination",
        ],
    },
    {
        id: "ml-tree",
        title: "ML Tree for 0 CO₂ Increment",
        description:
            "Machine learning solution for carbon footprint tracking and environmental impact optimization.",
        longDescription:
            "An environmental technology project using ML to track, predict, and minimize carbon emissions across various activities.",
        category: "ai-ml",
        technologies: ["Python", "Machine Learning", "Data Analytics", "Visualization"],
        githubUrl: "https://github.com/Manas8114",
        featured: false,
        highlights: [
            "Carbon footprint calculation",
            "Emission prediction models",
            "Sustainability recommendations",
            "Impact visualization",
        ],
    },
    {
        id: "trust-rl",
        title: "TRUST-RL",
        description:
            "Trustworthy Reinforcement Learning framework with safety constraints and policy verification.",
        longDescription:
            "A research framework exploring trust and safety in reinforcement learning agents, implementing policy verification and constraint-satisfaction mechanisms.",
        category: "research",
        technologies: ["Python", "Reinforcement Learning", "PyTorch", "Safety AI"],
        githubUrl: "https://github.com/Manas8114/TRUST-RL",
        featured: true,
        highlights: [
            "Safe RL policy constraints",
            "Trust-aware agent training",
            "Policy verification mechanisms",
            "Reward shaping with safety",
        ],
    },
    {
        id: "pii-web3",
        title: "PII Detection with Web3",
        description:
            "Privacy-preserving PII detection system with Web3 blockchain integration and IPFS storage.",
        longDescription:
            "A full-stack application combining NLP-based PII detection with Web3 technologies, featuring an IPFS demo mode and blockchain-backed data integrity.",
        category: "web",
        technologies: ["HTML", "JavaScript", "Web3", "NLP", "IPFS"],
        githubUrl: "https://github.com/Manas8114/Pii-web3",
        featured: true,
        highlights: [
            "Custom PII pattern detection",
            "IPFS decentralized storage",
            "Web3 blockchain integration",
            "Privacy-first architecture",
        ],
    },
    {
        id: "etl-pipeline",
        title: "Multi-Agent ETL Pipeline",
        description:
            "ETL pipeline automation system powered by multi-agent architecture for intelligent data processing.",
        longDescription:
            "An automated ETL system that uses multiple AI agents to orchestrate extract, transform, and load operations across heterogeneous data sources.",
        category: "systems",
        technologies: ["Python", "Multi-Agent", "Data Engineering", "Automation"],
        githubUrl: "https://github.com/Manas8114/ETL-Pipeline-Automation-System-with-Multi-Agent-Architecture",
        featured: true,
        highlights: [
            "Multi-agent orchestration",
            "Automated data pipelines",
            "Heterogeneous source support",
            "Intelligent data transformation",
        ],
    },
    {
        id: "ewaste-ai",
        title: "E-Waste AI Classification",
        description:
            "AI-powered electronic waste classification and recycling recommendation system.",
        longDescription:
            "A machine learning system that classifies electronic waste categories and provides recycling recommendations to reduce environmental impact.",
        category: "ai-ml",
        technologies: ["Python", "Computer Vision", "Classification", "Sustainability"],
        githubUrl: "https://github.com/Manas8114/ewaste-ai-system",
        featured: false,
        highlights: [
            "E-waste image classification",
            "Recycling recommendations",
            "Environmental impact assessment",
            "Multi-category detection",
        ],
    },
    {
        id: "dll-engine",
        title: "Deep Learning Library Engine",
        description:
            "Custom deep learning library engine for model building, training, and fine-tuning.",
        longDescription:
            "A from-scratch deep learning library engine implementing core neural network operations, backpropagation, and model management utilities.",
        category: "ai-ml",
        technologies: ["Python", "Deep Learning", "NumPy", "Neural Networks"],
        githubUrl: "https://github.com/Manas8114/DLL_Engine",
        featured: false,
        highlights: [
            "Custom neural network layers",
            "Backpropagation engine",
            "Model training pipeline",
            "Fine-tuning utilities",
        ],
    },
    {
        id: "xai-loan",
        title: "Explainable AI Loan System",
        description:
            "XAI-powered loan approval system with SHAP explainability and transparent decision-making.",
        longDescription:
            "A machine learning loan approval system that provides fully explainable predictions using SHAP values and feature importance analysis.",
        category: "ai-ml",
        technologies: ["Python", "XAI", "SHAP", "Scikit-learn", "Streamlit"],
        githubUrl: "https://github.com/Manas8114/XAI_loan_system",
        featured: false,
        highlights: [
            "SHAP explainability",
            "Transparent lending decisions",
            "Feature importance analysis",
            "Bias detection and mitigation",
        ],
    },
    {
        id: "byte2beat",
        title: "Byte2Beat",
        description:
            "Audio generation and music synthesis system using byte-level processing and signal analysis.",
        longDescription:
            "A creative AI project that converts byte-level data into audio patterns, exploring the intersection of data science and music generation.",
        category: "ai-ml",
        technologies: ["Python", "Audio Processing", "Signal Analysis", "DSP"],
        githubUrl: "https://github.com/Manas8114/byte2beat",
        featured: false,
        highlights: [
            "Byte-to-audio conversion",
            "Signal processing pipeline",
            "Creative music synthesis",
            "Pattern-based generation",
        ],
    },
    {
        id: "smartmedi-box",
        title: "Smart Medicine Box",
        description:
            "IoT-enabled smart medicine box with reminder scheduling, dosage tracking, and health monitoring.",
        longDescription:
            "A healthcare IoT solution that combines embedded systems with a web dashboard for medication management and patient compliance tracking.",
        category: "systems",
        technologies: ["HTML", "IoT", "Embedded Systems", "Healthcare"],
        githubUrl: "https://github.com/Manas8114/Smartmedi-box",
        featured: false,
        highlights: [
            "IoT medication reminders",
            "Dosage compliance tracking",
            "Web-based health dashboard",
            "Patient monitoring integration",
        ],
    },
];

export const skills = {
    languages: [
        { name: "Python", level: 95 },
        { name: "SQL", level: 85 },
        { name: "JavaScript", level: 80 },
        { name: "TypeScript", level: 78 },
    ],
    aiml: [
        { name: "Machine Learning", level: 92 },
        { name: "Deep Learning", level: 85 },
        { name: "Reinforcement Learning", level: 82 },
        { name: "Computer Vision", level: 80 },
        { name: "NLP", level: 80 },
        { name: "XAI / SHAP", level: 85 },
        { name: "Scikit-learn", level: 90 },
        { name: "XGBoost", level: 88 },
    ],
    datascience: [
        { name: "Pandas", level: 92 },
        { name: "NumPy", level: 90 },
        { name: "Statistical Analysis", level: 88 },
        { name: "Data Visualization", level: 88 },
        { name: "Ensemble Learning", level: 85 },
    ],
    backend: [
        { name: "FastAPI", level: 88 },
        { name: "REST APIs", level: 90 },
        { name: "MongoDB", level: 78 },
        { name: "Docker", level: 78 },
        { name: "Model Deployment", level: 80 },
    ],
    tools: [
        { name: "Git", level: 92 },
        { name: "Docker", level: 78 },
        { name: "Linux", level: 75 },
        { name: "Next.js", level: 80 },
        { name: "React", level: 78 },
    ],
};

export interface Achievement {
    id: string;
    title: string;
    type: "research" | "competition" | "experience";
    description: string;
    year: string;
    highlight: boolean;
    role: string;
    proof: string;
    link: string;
    tech: string[];
}

export const achievements: Achievement[] = [
    {
        id: "itu-buildathon-4",
        title: "1st Prize - Build-a-thon 4.0, ITU",
        type: "competition",
        description:
            "Developed intent-driven AI-native network slicing for rural ATSC 3.0 broadcasting.",
        year: "2026",
        highlight: true,
        role: "Designed and implemented the RL-based resource allocation engine and intent-driven orchestration pipeline for dynamic slice isolation over ATSC 3.0 physical layer.",
        proof: "Awarded 1st Place by ITU judges; formulated into IEEE WOCC 2026 peer-reviewed publication.",
        link: "https://github.com/Manas8114",
        tech: ["Python", "Reinforcement Learning", "ATSC 3.0", "Network Slicing", "PyTorch"],
    },
    {
        id: "icicv-publication",
        title: "Publication — IEEE ICICV 2026",
        type: "research",
        description:
            "\"Reevaluating CNN Filter Dimensions: Experimental Findings on CIFAR-10 and Fashion-MNIST\" published for Oral Presentation at IEEE ICICV 2026.",
        year: "2026",
        highlight: true,
        role: "Lead author conducting extensive empirical benchmarking on convolutional kernel sizing, parameter efficiency, and gradient convergence across computer vision datasets.",
        proof: "Published in IEEE ICICV 2026 Conference Proceedings with Oral Presentation distinction.",
        link: "https://github.com/Manas8114",
        tech: ["Deep Learning", "CNN", "PyTorch", "Computer Vision", "Statistical Analysis"],
    },
    {
        id: "wocc-publication",
        title: "Publication — IEEE WOCC 2026",
        type: "research",
        description:
            "\"Intent-Driven AI-Native Network Slicing for Rural Broadcasting over ATSC 3.0/B2X\" published in IEEE WOCC 2026.",
        year: "2026",
        highlight: true,
        role: "Lead researcher developing intent translation algorithms, QoS traffic routing models, and automated bandwidth prioritization schemes for rural communications.",
        proof: "Published in IEEE Wireless and Optical Communications Conference (WOCC 2026).",
        link: "https://github.com/Manas8114",
        tech: ["AI-Native Networks", "ATSC 3.0", "QoS Optimization", "Simulation", "Python"],
    },
    {
        id: "buildathon-itu",
        title: "1st Prize - Build-a-thon 3.0 ITU IIT Delhi",
        type: "competition",
        description:
            "Won first place at the ITU Build-a-thon 3.0 held at IIT Delhi for innovative technology solutions.",
        year: "2024",
        highlight: true,
        role: "Led core architecture design and telemetry modeling, building real-time edge intelligence to allocate congested network channels under extreme constraints.",
        proof: "Awarded 1st Prize Winner Trophy & Certificate at IIT Delhi ITU National Competition.",
        link: "https://github.com/Manas8114",
        tech: ["Machine Learning", "IIT Delhi", "Real-time Telemetry", "FastAPI", "Edge Computing"],
    },
    {
        id: "ai-agentic",
        title: "2nd Prize - AI Agentic Battle",
        type: "competition",
        description:
            "Secured second position in the AI Agentic Battle competition for developing advanced AI agent systems.",
        year: "2024",
        highlight: true,
        role: "Built multi-agent coordination architecture comprising 7 autonomous specialized agents for telecom diagnostics, automated healing, and network routing.",
        proof: "Secured 2nd Place out of nationwide competitive submissions; production-ready agent architecture.",
        link: "https://github.com/Manas8114",
        tech: ["Multi-Agent Systems", "FastAPI", "Python", "Autonomous Agents", "Prompt Engineering"],
    },
    {
        id: "1stop-internship",
        title: "Data Science Intern - 1stop",
        type: "experience",
        description:
            "Built machine learning models for classification and regression problems. Cleaned and manipulated raw data. Used statistical software to analyze large data sets.",
        year: "Jun 2024 - Jul 2024",
        highlight: false,
        role: "Engineered end-to-end data preprocessing pipelines, performed exploratory data analysis on real-world datasets, and benchmarked ensemble models.",
        proof: "Verified Internship Completion Certificate & production model delivery.",
        link: "https://github.com/Manas8114",
        tech: ["Scikit-learn", "Pandas", "NumPy", "EDA", "Feature Engineering"],
    },
];

export const certificates = [
    {
        id: "ibm-python-ds",
        title: "Python for Data Science, AI & Development",
        issuer: "IBM via Coursera",
        context: "Data Science and AI foundations using Python. Data handling and model basics.",
    },
    {
        id: "ng-ml-specialization",
        title: "Machine Learning Specialization",
        issuer: "Stanford / DeepLearning.AI (Andrew Ng)",
        context: "Fundamental and applied Machine Learning concepts including supervised and unsupervised learning.",
    },
    {
        id: "data-engineering",
        title: "Data Engineering Foundations",
        issuer: "IBM via Coursera",
        context: "Fundamentals of data engineering, data lifecycle, and big data ecosystems.",
    },
    {
        id: "oracle-ai",
        title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
        issuer: "Oracle University",
        date: "April 10, 2025",
        credentialId: "101210390OCI25AICFA",
        context: "Cloud AI fundamentals including machine learning, deep learning, and Oracle OCI services.",
    },
    {
        id: "sql-intermediate",
        title: "SQL (Intermediate)",
        issuer: "HackerRank",
        date: "April 10, 2025",
        credentialId: "5B17E63F18EA",
        context: "Advanced SQL queries, joins, subqueries, and database optimization.",
    },
    {
        id: "java-basic",
        title: "Java (Basic)",
        issuer: "HackerRank",
        date: "May 16, 2024",
        credentialId: "EEA1D0A98A83",
        context: "Core Java programming fundamentals for enterprise applications.",
    },
    {
        id: "python-basic",
        title: "Python (Basic)",
        issuer: "HackerRank",
        date: "October 26, 2023",
        context: "Foundational Python programming skills for data science applications.",
    },
    {
        id: "python-essentials",
        title: "Python Essentials 2 (PCAP Aligned)",
        issuer: "Cisco Networking Academy & OpenEDG Python Institute",
        context: "PCAP – Certified Associate in Python Programming aligned curriculum.",
    },
    {
        id: "java-nptel",
        title: "Programming in Java (Elite Certification)",
        issuer: "NPTEL",
        date: "Jul-Oct 2023",
        credentialId: "NPTEL23CS74S33357435",
        score: "63%",
        context: "Comprehensive Java programming covering OOP, data structures, and algorithms.",
    },
    {
        id: "networking-nptel",
        title: "Demystifying Networking",
        issuer: "NPTEL",
        date: "Jul-Oct 2023",
        score: "52%",
        context: "Understanding of network protocols, architecture, and infrastructure.",
    },
    {
        id: "bigdata-coursera",
        title: "Introduction to Big Data",
        issuer: "UC San Diego via Coursera",
        date: "July 31, 2020",
        verifyUrl: "https://coursera.org/verify/XE6RRLFEBB2A",
        context: "Big data concepts, Hadoop ecosystem, and distributed computing fundamentals.",
    },
    {
        id: "dbms",
        title: "Database Management System",
        issuer: "Great Learning Academy",
        date: "February 2024",
        context: "RDBMS concepts, SQL, normalization, and database design principles.",
    },
];

export const strengths = [
    {
        title: "Creative",
        description: "Approaches problems with original thinking and unconventional solutions",
        icon: "palette",
    },
    {
        title: "Relentless",
        description: "Driven by curiosity, pushing until the puzzle clicks and the system works.",
        icon: "flame",
    },
    {
        title: "Strategic",
        description: "Systems thinker mapping the big picture before diving into the code.",
        icon: "compass",
    },
    {
        title: "Adaptive",
        description: "Quickly adapts to new technologies, frameworks, and evolving requirements",
        icon: "refresh",
    },
    {
        title: "Problem-Solving",
        description: "Possesses strong problem-solving skills and technical knowledge in machine learning",
        icon: "puzzle",
    },
    {
        title: "Data Analysis",
        description: "Highly skilled in data analysis and visualization techniques",
        icon: "chart",
    },
    {
        title: "Research-Driven",
        description: "Published IEEE researcher with a systematic, evidence-based approach",
        icon: "book",
    },
    {
        title: "Visionary",
        description: "Forward-looking, building solutions designed to scale for the long term.",
        icon: "eye",
    },
];
