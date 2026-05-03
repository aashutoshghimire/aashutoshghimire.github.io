window.siteData = {
  profile: {
    name: "Ashutosh Ghimire",
    title: "PhD Scholar | Trustworthy AI, Hardware Security, and AI-Driven Drug Discovery",
    location: "Dayton / Fairborn, Ohio, USA",
    email: "ashutosh.ghimire@wright.edu",
    secondaryEmail: "aashutoshghimire7@gmail.com",
    affiliation: "Wright State University",
    lab: "SMART Cybersecurity Research Lab",
    scholarCitations: "231",
    citationsAsOf: "May 2026",
    links: [
      { label: "Google Scholar", short: "Scholar", url: "https://scholar.google.com/citations?user=mhTDRysAAAAJ&hl=en" },
      { label: "ORCID", short: "ORCID", url: "https://orcid.org/0000-0001-6210-1219" },
      { label: "LinkedIn", short: "LinkedIn", url: "https://www.linkedin.com/in/ashutoshghimire" },
      { label: "GitHub", short: "GitHub", url: "https://github.com/aashutoshghimire" },
      { label: "Wright State", short: "WSU", url: "https://people.wright.edu/ashutosh.ghimire" }
    ]
  },
  stats: [
    { value: "PhD", label: "Computer Science and Engineering, Wright State University" },
    { value: "231", label: "Google Scholar citations, May 2026" },
    { value: "30+", label: "Publications and scholarly outputs represented on Scholar" },
    { value: "5", label: "Core research themes across trustworthy AI and applied security" }
  ],
  themes: [
    {
      title: "Trustworthy AI and Adversarial ML",
      image: "assets/images/hero-research.png",
      description: "Designing AI systems that remain dependable under attack, uncertainty, noisy measurements, and distribution shift.",
      tags: ["Adversarial ML", "Robustness", "Explainability", "Security"]
    },
    {
      title: "AI for Hardware Security",
      image: "assets/images/hardware-security.png",
      description: "Applying machine learning to side-channel measurements for golden-reference-free hardware Trojan detection and localization.",
      tags: ["Hardware Trojan", "Side-Channel", "FPGA", "Unsupervised ML"]
    },
    {
      title: "LLM-Assisted Explainable Systems",
      image: "assets/images/llm-iot.png",
      description: "Combining numerical models with LLM-based explanation layers for cybersecurity and human-centered assessment systems.",
      tags: ["LLMs", "XAI", "Clinical AI", "IoT Security"]
    },
    {
      title: "Hyperdimensional Computing",
      image: "assets/images/hdc-anomaly.png",
      description: "Exploring brain-inspired high-dimensional representations for efficient anomaly detection in IoT, edge AI, and data streams.",
      tags: ["HDC", "Anomaly Detection", "IoT", "Edge AI"]
    },
    {
      title: "AI for Drug Discovery",
      image: "assets/images/drug-discovery.png",
      description: "Using deep learning and attention mechanisms to model drug-target interactions and support early-stage discovery workflows.",
      tags: ["Drug Discovery", "Self-Attention", "CNN", "Bioinformatics"]
    }
  ],
  projects: [
    {
      title: "Golden-Free AI-Assisted Hardware Trojan Detection",
      category: "AI for Hardware Security",
      status: "Published research / core PhD direction",
      priority: "Featured",
      image: "assets/images/hardware-security.png",
      tags: ["Hardware Security", "AI", "Side-Channel", "FPGA"],
      problem: "Traditional detection often relies on golden reference chips or destructive reverse engineering, which can be unavailable or impractical for industrial-scale validation.",
      approach: "Built ML pipelines using side-channel data from Ring Oscillator Networks, feature extraction, unsupervised clustering, dimensionality analysis, and anomaly detection.",
      result: "Published ACM JETC work contributes a golden-free unsupervised ML-assisted approach for IC hardware Trojan detection.",
      tech: ["Python", "scikit-learn", "NumPy", "pandas", "FPGA", "Ring Oscillator Networks"],
      links: [{ label: "ACM DOI", url: "https://doi.org/10.1145/3748652" }]
    },
    {
      title: "AI-Enabled Image Processing for Hardware Trojan Identification",
      category: "AI + Signal/Image Processing",
      status: "Integration, 2026",
      priority: "Featured",
      image: "assets/images/hardware-security.png",
      tags: ["Hardware Security", "Image Processing", "Signal Processing", "Unsupervised ML"],
      problem: "Stealthy IC modifications threaten semiconductor supply-chain trust, while functional testing and reverse engineering are costly to scale.",
      approach: "Converted side-channel data into image-like representations and used image processing with unsupervised machine learning to cluster Trojan behavior.",
      result: "The publisher page reports 95% hardware Trojan detection accuracy using real hardware side-channel data.",
      tech: ["Python", "scikit-learn", "DSP", "Image Processing", "FPGA"],
      links: [{ label: "ScienceDirect", url: "https://doi.org/10.1016/j.vlsi.2025.102628" }]
    },
    {
      title: "Adversarially Resilient ML for Hardware Trojan Detection",
      category: "Trustworthy AI / Adversarial ML",
      status: "Published and continuing research",
      priority: "Featured",
      image: "assets/images/hero-research.png",
      tags: ["Adversarial ML", "Hardware Security", "Trustworthy AI", "Robustness"],
      problem: "Security models that perform well under clean conditions can fail under perturbations, process noise, or adaptive attacks.",
      approach: "Designed adversarial evaluation and defense pipelines comparing unsupervised and pseudo-supervised models under different attack strengths.",
      result: "Resume-backed experiments report a 77% robustness improvement in the project context.",
      tech: ["Python", "ART", "scikit-learn", "AdaBoost", "Clustering", "pandas"],
      links: [{ label: "Microelectronics DOI", url: "https://doi.org/10.3390/microelectronics2010002" }]
    },
    {
      title: "Clinical Communication and LLM-Based HEART Rubric Scoring",
      category: "Healthcare AI / LLMs",
      status: "Active research prototype",
      priority: "Featured",
      image: "assets/images/clinical-ai.png",
      tags: ["LLMs", "Healthcare AI", "Rubric Scoring", "Human-Centered AI"],
      problem: "Medical error disclosure training needs transparent, clinically meaningful assessment of resident-patient conversations.",
      approach: "Developed an AI-compatible HEART rubric schema with transcript-only 0-3 scoring, evidence spans, and validation planning against human ratings.",
      result: "Positioned as an interdisciplinary research MVP and collaboration-ready prototype, not a deployed clinical product.",
      tech: ["Python", "PyTorch", "Transformers", "Longformer", "SBERT", "JSON Schemas"],
      links: [{ label: "Contact", url: "contact.html" }]
    },
    {
      title: "CSatDTA: Drug-Target Affinity Prediction",
      category: "AI for Drug Discovery",
      status: "Published journal article",
      priority: "Featured",
      image: "assets/images/drug-discovery.png",
      tags: ["Drug Discovery", "Deep Learning", "Self-Attention", "Bioinformatics"],
      problem: "Early-stage drug discovery needs sequence-based methods that capture local and long-range interactions in molecular and protein sequences.",
      approach: "Developed CSatDTA, a convolutional self-attention model for drug and target sequence affinity prediction.",
      result: "The IJMS paper reports that CSatDTA outperforms previous sequence-based approaches on benchmark datasets.",
      tech: ["Python", "TensorFlow", "Keras", "CNNs", "Self-Attention", "TFRecord"],
      links: [{ label: "MDPI DOI", url: "https://doi.org/10.3390/ijms23158453" }]
    },
    {
      title: "Hyperdimensional Computing for IoT Anomaly Detection",
      category: "HDC / Cybersecurity",
      status: "Conference and IEEE Access related work",
      priority: "Featured",
      image: "assets/images/hdc-anomaly.png",
      tags: ["HDC", "Anomaly Detection", "IoT Security", "Edge AI"],
      problem: "IoT intrusion detection needs efficient processing of high-dimensional network data while detecting known and unknown attack patterns.",
      approach: "Applied hyperdimensional representations to network anomaly detection, including NSL-KDD and hybrid HDC-based frameworks.",
      result: "Related public records describe HDC-based IoT anomaly detection and D2H-AD as a hybrid model for advanced anomaly detection.",
      tech: ["Python", "HDC", "ML Evaluation", "NSL-KDD", "Anomaly Detection"],
      links: [{ label: "arXiv", url: "https://arxiv.org/abs/2503.03031" }, { label: "IEEE DOI", url: "https://doi.org/10.1109/ACCESS.2026.3677763" }]
    },
    {
      title: "LLM-Assisted Explainable IoT Systems for Critical Infrastructure",
      category: "LLMs / XAI / IoT Security",
      status: "Conference research",
      priority: "More",
      image: "assets/images/llm-iot.png",
      tags: ["LLMs", "XAI", "IoT Security", "Critical Infrastructure"],
      problem: "Security monitoring often generates anomaly scores and alerts that are difficult for human analysts to interpret.",
      approach: "Combined numerical anomaly detection with LLM-assisted preprocessing and explanation generation for human interpretability.",
      result: "Conference work explores LLM-assisted explainability for cybersecurity in critical infrastructure settings.",
      tech: ["Python", "LLM Prompting", "Autoencoders", "XAI", "IoT Datasets"],
      links: [{ label: "IEEE DOI", url: "https://doi.org/10.1109/SATC65530.2025.11137104" }]
    },
    {
      title: "AI for Reverse Engineering and Software Security Survey",
      category: "AI for Software Security",
      status: "IEEE Access, 2025",
      priority: "More",
      image: "assets/images/llm-iot.png",
      tags: ["Software Security", "Reverse Engineering", "Survey", "AI"],
      problem: "Reverse engineering and software analysis are labor-intensive, yet increasingly supported by AI systems.",
      approach: "Surveyed AI applications in decompilation, malware analysis, binary analysis, vulnerability discovery, and security automation.",
      result: "Published in IEEE Access with a taxonomy of AI-assisted reverse engineering and software security research.",
      tech: ["Literature Review", "Security Analysis", "Reverse Engineering", "AI Systems"],
      links: [{ label: "IEEE DOI", url: "https://doi.org/10.1109/ACCESS.2025.3593456" }]
    },
    {
      title: "Secure and Privacy-Aware AI Hardware with Federated Learning",
      category: "Distributed AI / Privacy",
      status: "DCAS, 2023",
      priority: "More",
      image: "assets/images/hero-research.png",
      tags: ["Federated Learning", "Privacy", "AI Hardware", "Distributed ML"],
      problem: "Security-aware AI hardware must balance privacy, distributed learning, and practical implementation constraints.",
      approach: "Implemented secure and privacy-aware AI hardware workflows using distributed federated learning concepts.",
      result: "Conference publication and graduate research direction in distributed privacy-aware AI systems.",
      tech: ["Python", "Federated Learning", "Distributed Systems", "AI Hardware"],
      links: [{ label: "Scholar", url: "https://scholar.google.com/citations?user=mhTDRysAAAAJ&hl=en" }]
    },
    {
      title: "Parallel Supervised ML in Multicore Environments",
      category: "Systems / ML Performance",
      status: "MLKE, 2024",
      priority: "More",
      image: "assets/images/hdc-anomaly.png",
      tags: ["Parallel ML", "Multicore", "Performance", "Systems"],
      problem: "Large ML experiments need reproducible, faster execution across multicore environments.",
      approach: "Designed a parallel approach to improve supervised ML performance in a multicore setting.",
      result: "Published work supports Ashutosh's builder credibility across ML experimentation and systems optimization.",
      tech: ["Python", "Parallel Computing", "ML Pipelines", "Performance Evaluation"],
      links: [{ label: "Scholar", url: "https://scholar.google.com/citations?user=mhTDRysAAAAJ&hl=en" }]
    }
  ],
  publications: [
    {
      title: "AI-enabled image processing approach for efficient clustering and identification of hardware Trojans",
      authors: "Ashutosh Ghimire, Mohammed Alkurdi, Saraju P. Mohanty, Fathi Amsaad",
      venue: "Integration, Volume 107, Article 102628",
      year: "2026",
      type: "Journal",
      featured: true,
      tags: ["Hardware Security", "AI", "Side-Channel", "Image Processing"],
      link: "https://doi.org/10.1016/j.vlsi.2025.102628"
    },
    {
      title: "Adversarial Attack Resilient ML-Assisted Golden Free Approach for Hardware Trojan Detection",
      authors: "Ashutosh Ghimire, Mohammed Alkurdi, Ghazal Ghajari, Mohammad Arif Hossain, Fathi Amsaad",
      venue: "Microelectronics 2(1), 2",
      year: "2026",
      type: "Journal",
      featured: true,
      tags: ["Adversarial ML", "Hardware Security", "Trustworthy AI"],
      link: "https://doi.org/10.3390/microelectronics2010002"
    },
    {
      title: "D2H-AD: A Hybrid Model Utilizing Hyperdimensional Computing for Advanced Anomaly Detection",
      authors: "Ghazal Ghajari, Elaheh Ghajari, Ashutosh Ghimire, Saeid Ataei, Faris Alsulami, Fathi Amsaad",
      venue: "IEEE Access 14, 55227-55247",
      year: "2026",
      type: "Journal",
      featured: true,
      tags: ["HDC", "Anomaly Detection", "Edge AI"],
      link: "https://doi.org/10.1109/ACCESS.2026.3677763"
    },
    {
      title: "A Golden-Free Unsupervised ML-Assisted Security Approach for Detection of IC Hardware Trojans",
      authors: "Ashutosh Ghimire, Mohammed Alkurdi, Md. Tauhidur Rahman, Saraju Mohanty, Fathi Amsaad",
      venue: "ACM Journal on Emerging Technologies in Computing Systems 21(3)",
      year: "2025",
      type: "Journal",
      featured: true,
      tags: ["Hardware Security", "Unsupervised ML", "Side-Channel"],
      link: "https://doi.org/10.1145/3748652"
    },
    {
      title: "A Survey on Application of AI on Reverse Engineering for Software Analysis and Security",
      authors: "Ashutosh Ghimire, Sahasra Rao Lingala, Junjie Zhang, Faris Alsulami, Fathi Amsaad",
      venue: "IEEE Access 13, 152903-152913",
      year: "2025",
      type: "Journal",
      featured: true,
      tags: ["Software Security", "Reverse Engineering", "Survey"],
      link: "https://doi.org/10.1109/ACCESS.2025.3593456"
    },
    {
      title: "Network Anomaly Detection for IoT Using Hyperdimensional Computing on NSL-KDD",
      authors: "Ghazal Ghajari, Ashutosh Ghimire, Elaheh Ghajari, Fathi H. Amsaad",
      venue: "2025 1st International Conference on Secure IoT, Assured and Trusted Computing",
      year: "2025",
      type: "Conference",
      featured: false,
      tags: ["HDC", "IoT Security", "Anomaly Detection"],
      link: "https://doi.org/10.1109/SATC65530.2025.11136944"
    },
    {
      title: "Enhancing Cybersecurity in Critical Infrastructure with LLM-Assisted Explainable IoT Systems",
      authors: "Ashutosh Ghimire, Ghazal Ghajari, Karma Gurung, Love Kumar Sah, Fathi H. Amsaad",
      venue: "2025 1st International Conference on Secure IoT, Assured and Trusted Computing",
      year: "2025",
      type: "Conference",
      featured: false,
      tags: ["LLMs", "XAI", "IoT Security", "Critical Infrastructure"],
      link: "https://doi.org/10.1109/SATC65530.2025.11137104"
    },
    {
      title: "A Survey on Security Threats and Countermeasures in FPGA-Based Robotic Computing Systems",
      authors: "Ashutosh Ghimire, Karma Gurung, A. Sijapati, Fathi Amsaad",
      venue: "IEEE Midwest Symposium on Circuits and Systems",
      year: "2025",
      type: "Conference",
      featured: false,
      tags: ["FPGA", "Robotic Computing", "Security Survey"],
      link: "https://scholar.google.com/citations?user=mhTDRysAAAAJ&hl=en"
    },
    {
      title: "CSatDTA: Prediction of Drug-Target Binding Affinity Using Convolution Model with Self-Attention",
      authors: "Ashutosh Ghimire, Hilal Tayara, Zhenyu Xuan, Kil To Chong",
      venue: "International Journal of Molecular Sciences 23(15), 8453",
      year: "2022",
      type: "Journal",
      featured: true,
      tags: ["Drug Discovery", "Deep Learning", "Self-Attention", "Bioinformatics"],
      link: "https://doi.org/10.3390/ijms23158453"
    },
    {
      title: "Adversarial Attack Resilient ML-Assisted Hardware Trojan Detection Technique",
      authors: "Mohammed Alkurdi, Ashutosh Ghimire, Fathi H. Amsaad",
      venue: "ISVLSI 2024, 313-318",
      year: "2024",
      type: "Conference",
      featured: false,
      tags: ["Adversarial ML", "Hardware Security"],
      link: "https://scholar.google.com/citations?user=mhTDRysAAAAJ&hl=en"
    },
    {
      title: "Enhancing Hardware Trojan Security through Reference-Free Clustering using Representatives",
      authors: "Ashutosh Ghimire, Mahommed Alkurdi, Fathi Amsaad",
      venue: "VLSID 2024, 467-473",
      year: "2024",
      type: "Conference",
      featured: false,
      tags: ["Hardware Security", "Clustering", "Reference-Free Detection"],
      link: "https://scholar.google.com/citations?user=mhTDRysAAAAJ&hl=en"
    },
    {
      title: "Analyzing Aging Effects on SRAM PUFs: Implications for Security and Reliability",
      authors: "N. P. Bhatta, H. Singh, Ashutosh Ghimire, Fathi Amsaad",
      venue: "Journal of Hardware and Systems Security 8(3), 174-186",
      year: "2024",
      type: "Journal",
      featured: false,
      tags: ["Hardware Security", "PUF", "Reliability"],
      link: "https://scholar.google.com/citations?user=mhTDRysAAAAJ&hl=en"
    },
    {
      title: "A Parallel Approach to Enhance the Performance of Supervised Machine Learning Realized in a Multicore Environment",
      authors: "Ashutosh Ghimire, Fathi Amsaad",
      venue: "Machine Learning and Knowledge Extraction 6(3), 1840-1856",
      year: "2024",
      type: "Journal",
      featured: false,
      tags: ["Parallel ML", "Systems", "Performance"],
      link: "https://scholar.google.com/citations?user=mhTDRysAAAAJ&hl=en"
    },
    {
      title: "Unsupervised IC Security with Machine Learning for Trojan Detection",
      authors: "Ashutosh Ghimire, H. A. Fathi, T. Hoque, K. M. Hopkinson, M. T. Rahman",
      venue: "MWSCAS 2023, 20-24",
      year: "2023",
      type: "Conference",
      featured: false,
      tags: ["Hardware Security", "Unsupervised ML"],
      link: "https://scholar.google.com/citations?user=mhTDRysAAAAJ&hl=en"
    },
    {
      title: "Power Analysis Side-Channel Attacks on Same and Cross-Device Settings: A Survey of Machine Learning Techniques",
      authors: "Ashutosh Ghimire, Vishnu Vardhan Baligodugula, Fathi Amsaad",
      venue: "IFIP International Internet of Things Conference, 357-367",
      year: "2023",
      type: "Conference",
      featured: false,
      tags: ["Side-Channel", "ML Security", "Survey"],
      link: "https://scholar.google.com/citations?user=mhTDRysAAAAJ&hl=en"
    }
  ],
  experience: [
    {
      role: "Graduate Research Assistant",
      org: "Wright State University",
      location: "Dayton, Ohio",
      dates: "May 2025 - Present",
      bullets: [
        "Designed and evaluated adversarially robust ML pipelines for side-channel hardware security datasets.",
        "Built feature extraction, clustering, and adversarial evaluation workflows for hardware Trojan detection.",
        "Refactored preprocessing and inference stages for deterministic, reproducible batch experimentation."
      ]
    },
    {
      role: "Research Associate",
      org: "Wright State University",
      location: "Dayton, Ohio",
      dates: "August 2024 - April 2025",
      bullets: [
        "Developed adaptive ensemble learning models for real-time financial fraud detection under concept drift.",
        "Integrated explainability methods to improve trust and usability in security-critical ML systems.",
        "Contributed to research proposals, whitepapers, mentoring, and lab-level coordination."
      ]
    },
    {
      role: "Graduate Research Assistant",
      org: "Wright State University",
      location: "Dayton, Ohio",
      dates: "September 2022 - April 2024",
      bullets: [
        "Implemented distributed federated learning systems for secure and privacy-aware AI hardware.",
        "Developed ML-assisted hardware Trojan localization and detection algorithms.",
        "Designed parallel ML approaches for multicore environments and contributed to hardware security publications."
      ]
    },
    {
      role: "Research Student",
      org: "Jeonbuk National University",
      location: "Jeonju, South Korea",
      dates: "September 2021 - August 2022",
      bullets: [
        "Developed CSatDTA for drug-target affinity prediction using convolutional self-attention.",
        "Worked with large-scale drug-target interaction data and preprocessing workflows.",
        "Combined AI, chemistry, pharmacology, and biology concepts for computational drug discovery."
      ]
    },
    {
      role: "Software Engineer",
      org: "YBC Services",
      location: "Remote / Aldershot, UK",
      dates: "May 2021 - August 2021",
      bullets: [
        "Developed RESTful APIs serving React and Flutter frontends for HR management software.",
        "Supported software handling 1,000+ concurrent users.",
        "Led team planning, blocker tracking, and API development workflows."
      ]
    },
    {
      role: "Software Engineer",
      org: "Bent Ray Technologies",
      location: "Lalitpur, Nepal",
      dates: "December 2018 - June 2021",
      bullets: [
        "Built and deployed production web applications across e-commerce and enterprise platforms.",
        "Designed REST APIs for staffing and business systems with secure data exchange."
      ]
    }
  ],
  education: [
    {
      degree: "PhD in Computer Science and Engineering",
      school: "Wright State University",
      dates: "Present",
      detail: "Research areas: trustworthy AI, hardware security, side-channel analysis, adversarial ML, LLM systems, and AI for security."
    },
    {
      degree: "Master of Science in Computer Science",
      school: "Wright State University",
      dates: "April 2024",
      detail: "Thesis: An ML-Assisted Golden-Free Hardware Trojan Localization and Detection Approach for Trusted Microelectronics."
    },
    {
      degree: "Bachelor of Engineering in Computer Engineering",
      school: "Tribhuvan University",
      dates: "February 2019",
      detail: "Engineering foundation in software, systems, and computer engineering."
    }
  ],
  skills: [
    { title: "AI / Machine Learning", items: ["Python", "scikit-learn", "pandas", "NumPy", "TensorFlow", "Keras", "PyTorch", "Transformers", "CNNs", "Self-attention", "Clustering", "Anomaly detection"] },
    { title: "Trustworthy AI and ML Security", items: ["Adversarial ML", "ART", "Robustness testing", "Explainable AI", "SHAP", "LIME", "Pseudo-labeling", "Synthetic augmentation"] },
    { title: "Hardware Security", items: ["Hardware Trojan detection", "FPGA", "Basys 3", "Ring Oscillator Networks", "Power/EM side-channels", "Feature extraction", "Golden-reference-free detection"] },
    { title: "LLMs and NLP", items: ["LLM-assisted explainability", "Rubric-aware scoring", "Synthetic transcripts", "Longformer", "DistilBERT", "SBERT", "NLP classification"] },
    { title: "Systems / HPC", items: ["Linux", "SLURM", "Docker", "Singularity", "Jupyter", "SSH/SCP", "Bash", "Distributed workflows", "Experiment management"] },
    { title: "Web, APIs, and Security", items: ["REST APIs", "Microservices", "Swagger", "Postman", "Git", "Go", "C/C++", "Wireshark", "tcpdump", "Zeek", "Ghidra", "Binary Ninja"] }
  ],
  awards: [
    {
      title: "Graduate Student Excellence Award",
      org: "Wright State University",
      detail: "Recognition in 2025 for graduate student excellence."
    },
    {
      title: "Nepalese Student Association Treasurer",
      org: "Wright State University",
      detail: "Managed operations and logistics for a 200+ participant student organization."
    },
    {
      title: "Research Mentorship and Lab Coordination",
      org: "SMART Cybersecurity Research Lab",
      detail: "Coordinated research tasks, trained new students, supported documentation, and helped organize lab activities."
    }
  ]
};
