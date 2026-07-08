export const resumeData = {
  name: "Ztang Yit Xiaang (Yixin Chen 陳奕昕)",
  title: "Ztang Yit Xiaang",
  subtitle: "Yixin Chen 溫州人陳奕昕",
  kicker: "Data Science · Optimization · Scientific Computing",
  cultureMark: "甌越 · 溫州話 · Language Technology",
  bio: "Data Science student at the University of Minnesota interested in machine learning, optimization, scientific computing, and language technology.",
  avatar: "/profile.jpg",
  email: "chen9176@umn.edu",
  location: "Minneapolis, MN, USA",
  employer: "University of Minnesota Twin Cities",
  socials: {
    github: "https://github.com/Ztang-Yit-Xiaang",
    googlescholar: "https://scholar.google.com/citations?user=Ep2YrFYAAAAJ&hl=en",
    instagram: "https://instagram.com/ztang_yit_xiaang",
    linkedin: "https://linkedin.com/in/yixin-chen-05a980328",
  },
  education: [
    {
      institution: "University of Minnesota – Twin Cities",
      location: "Minneapolis, MN, USA",
      degree: "B.S. in Data Science, Minor in Mathematics",
      period: "Sep 2024 – Present",
      gpa: "GPA: 4.0 / 4.0",
    },
    {
      institution: "Hefei University of Technology",
      location: "Hefei, Anhui, China",
      degree: "B.Eng. in Vehicle Engineering (Transferred out)",
      period: "Sep 2020 – Jan 2024",
      gpa: "GPA: 3.75 / 4.3",
    },
  ],
  experience: [
    {
      role: "Research Assistant — Randomized Algorithms and Scalable Linear Algebra",
      organization: "University of Minnesota (Supervisor: Swati Padmanabhan)",
      period: "Summer 2026 – Present",
      bullets: [
        "Studying randomized sketching and sampling methods for large-scale linear algebra and machine learning.",
        "Analyzing theoretical guarantees for regression, low-rank approximation, and norm preservation using probabilistic bounds.",
        "Implementing sketch-based algorithms in Python to evaluate accuracy-efficiency trade-offs on high-dimensional datasets.",
      ],
    },
    {
      role: "Research Assistant — PyGRANSO Torch OSQP Adapter",
      organization: "University of Minnesota (Supervisor: Ju Sun)",
      period: "Summer 2026 – Present",
      bullets: [
        "Working on a dense Torch OSQP reference adapter for PyGRANSO QP subproblems, with explicit backend policy, fallback behavior, and validation evidence.",
        "Studying how operator-splitting update steps can be represented in differentiable computational pipelines.",
        "Building implementation notes and experiments that connect numerical optimization routines with modern ML software tools.",
      ],
    },
    {
      role: "Independent Study — Sketching & Sampling Algorithms",
      organization: "University of Minnesota (Supervisor: Swati Padmanabhan)",
      period: "Jan 2026 – May 2026",
      bullets: [
        "Studied randomized sketching, sampling, and trace-estimation methods for scalable linear algebra.",
        "Implemented baseline algorithms and experiments for regression, low-rank approximation, and matrix statistics.",
      ],
    },
    {
      role: "Undergraduate Research Intern",
      organization: "The Chinese University of Hong Kong (Supervisor: Hongliang Ren)",
      period: "Jun 2025 – Aug 2025",
      bullets: [
        "Implemented reverse computation on a multi-head neural network for magnetically induced metamorphic materials (MIMMS).",
        "Visualized soft linear MIMMS shape and position tracking through annular magnetic sensor arrays.",
        "Designed AnySkin visualization for distributed tactile force detection.",
      ],
    },
    {
      role: "Undergraduate Research Assistant",
      organization: "University of Minnesota (Supervisor: Shancong Mou)",
      period: "Dec 2024 – Sep 2025",
      bullets: [
        "Performed high-fidelity thermal-fluid simulations of HVAC heat exchangers using ANSYS Fluent.",
        "Developed regression-based predictive control models in Python, improving simulation accuracy by 17%.",
      ],
    },
    {
      role: "Undergraduate Research Assistant",
      organization: "Hefei University of Technology (Supervisor: Bofu Wu)",
      period: "Apr 2023 – Jan 2024",
      bullets: [
        "Led design of an intelligent recycling bin with LabVIEW-based human-computer interaction.",
        "Designed external shell via AutoCAD and implemented control logic and homing functions.",
      ],
    },
    {
      role: "Undergraduate Research Assistant (Independent)",
      organization: "Hefei University of Technology (Supervisor: Yang Xu)",
      period: "Sep 2022 – Nov 2023",
      bullets: [
        "Modeled structural components in Autodesk Inventor and optimized designs using ANSYS finite-element simulations.",
        "Built LabVIEW interface for automated data acquisition and visualization.",
      ],
    },
    {
      role: "Undergraduate Research Assistant (Team Leader)",
      organization: "Hefei University of Technology (Supervisor: Junzhao Jiang)",
      period: "May 2021 – Apr 2022",
      bullets: [
        "Developed multimodal fusion algorithms using OpenCV, PyTorch, and MMDetection on Linux.",
        "Built experimental radar-camera calibration setups using CATIA V5.",
      ],
    },
  ],
  projects: [
    {
      title: "PyGRANSO Torch OSQP Dense Reference Adapter",
      category: "Optimization System",
      description: "Active Summer 2026 research on a dense Torch OSQP reference route for PyGRANSO QP subproblems.",
      link: "/portfolio/osqp-method-in-torch",
    },
    {
      title: "Randomized Algorithms: Leverage Scores and TurboQuant",
      category: "Randomized Algorithms",
      description: "Sketching, leverage-score benchmarks, Hutch++, and TurboQuant experiments connected to UMN theory research.",
      link: "/portfolio/randomized-sketching",
    },
    {
      title: "Wenzhounese Input Method and Language Technology",
      category: "Language Technology",
      description: "Input tools, IME, and language processing technology for Wenzhounese and Rui'anese underrepresented Southern Wu language varieties.",
      link: "/portfolio/wenzhounese-input-method",
    },
    {
      title: "Context-Aware Travel Itinerary Optimization",
      category: "Planning System",
      description: "User-specific itinerary repair incorporating hotels, weather, nature regions, evidence conflicts, and interactive dashboards. Supervised by Prof. Seongjin Choi.",
      link: "/portfolio/context-aware-travel-itinerary-optimization",
    },
    {
      title: "Magnetic Pose Estimation Using Distributed Dipole Models",
      category: "Sensing System",
      description: "Magnetic sensor-array modeling, 3D visualization, and inverse methods for flexible magnet tracking.",
      link: "/portfolio/magnetic-pose-estimation",
    },
    {
      title: "Sparse PCA for Gene Expression Analysis",
      category: "Statistical Modeling",
      description: "Interpretable dimensionality reduction for high-dimensional breast cancer gene expression datasets.",
      link: "/portfolio/sparse-pca-gene-expression",
    },
    {
      title: "Matrix-Vector Trace Estimation with Hutch++",
      category: "Randomized Algorithms",
      description: "Fast trace-estimation algorithm implementations showing improved sample complexity and variance reduction.",
      link: "/portfolio/matrix-vector-trace-estimation",
    },
    {
      title: "Magnetic Sensor Array Visualization",
      category: "Tactile Sensing",
      description: "Interactive real-time 3D rendering for annular magnetic field distributions in tactile skins.",
      link: "/portfolio/magnetic-sensor-array-visualization",
    },
    {
      title: "Analyzing Representation Transfer and Attention in FER",
      category: "Computer Vision",
      description: "Attention maps and transfer learning experiments on facial expression recognition models.",
      link: "/portfolio/facial-expression-recognition",
    },
    {
      title: "PDEBench-Lang: Neural Symbolic PDE Reasoning",
      category: "AI & Physics",
      description: "Analyzing representation effects and symbolic structures for learning physical laws from partial differential equations.",
      link: "/portfolio/pdebench-lang",
    },
  ],
  publications: [
    {
      title: "Differentiable OSQP Solver Representation in PyTorch for Non-smooth Optimization",
      venue: "Tech Report / Research Note (Ju Sun Lab)",
      year: "2026",
      description: "dense Torch OSQP reference adapter, custom gradient rules, and numerical validation.",
    },
    {
      title: "Probabilistic Error Bounds in Leverage-Score Sketching for Least-Squares Regression",
      venue: "Theoretical Notes (Swati Padmanabhan Research)",
      year: "2026",
      description: "sketching bounds, leverage score approximations, and matrix concentration analysis.",
    },
    {
      title: "Multi-Head Neural Network and Magnetic Inverse Modeling for SoftMetamaterial Skins",
      venue: "CUHK Soft Robotics Lab Tech Report",
      year: "2025",
      description: "inverse networks, tactile pose estimations, and sensor arrays.",
    },
    {
      title: "Building Dialect IMEs: Triangulated Syllable Mapping for Ouxian Vernaculars",
      venue: "Language Technology Working Paper",
      year: "2024",
      description: "database structures, dictionary schemas, and Rime input engine configurations.",
    },
  ],
  teaching: [
    {
      course: "CSCI 2081: Introduction to Software Development",
      role: "Teaching Assistant (Incoming)",
      institution: "University of Minnesota Twin Cities",
      period: "Fall 2026",
      description: "Incoming undergraduate teaching assistant for the upcoming semester, supporting Java OOP design, data structures, and programming labs.",
    },
    {
      course: "CSCI 2081: Introduction to Software Development",
      role: "Teaching Assistant",
      institution: "University of Minnesota Twin Cities",
      period: "Spring 2026",
      description: "Guided weekly discussion labs in Walter Library, graded programming assignments, and helped students design and debug Java-based algorithms.",
    },
    {
      course: "CSCI 2081: Introduction to Software Development",
      role: "Teaching Assistant",
      institution: "University of Minnesota Twin Cities",
      period: "Fall 2025",
      description: "Led weekly discussion labs, held office hours for debugging, and graded programming assignments on Java and data structures.",
    },
  ],
  blog: [
    {
      title: "From Weather-Aware to Context-Aware Itinerary Repair",
      date: "Jun 26, 2026",
      summary: "Refining user-specific itinerary repair using hotels, weather constraints, and evidence conflicts.",
    },
    {
      title: "Leverage Scores & TurboQuant: Scalable Linear Algebra Experiments",
      date: "Jun 26, 2026",
      summary: "Benchmarking randomized sketching, Hutch++, and TurboQuant algorithms for UMN research.",
    },
    {
      title: "PyGRANSO Torch OSQP Dense Reference Notes",
      date: "Jun 26, 2026",
      summary: "Differentiable operator-splitting optimization layers and gradient backpropagation details.",
    },
    {
      title: "Summer Randomized Algorithms Research Directions",
      date: "May 24, 2026",
      summary: "Research threads in sketching, trace estimation, and randomized numerical linear algebra.",
    },
    {
      title: "Translating OSQP Method into PyTorch Primitives",
      date: "May 24, 2026",
      summary: "Deep dive into building dense differentiable quadratic program solvers in PyTorch.",
    },
    {
      title: "Why Representation Might Matter for Symbolic PDE Reasoning",
      date: "Apr 14, 2026",
      summary: "Analyzing symbolic tokens and embedding spaces in neural PDE solvers.",
    },
    {
      title: "What I Look For in Attention Maps",
      date: "Apr 9, 2026",
      summary: "Understanding representation transfer and feature attention in visual classification.",
    },
  ],
  photography: [
    {
      title: "Hong Kong Victoria Bay Skyline",
      image: "/assets/photos/hk-1.jpg",
      location: "Tsim Sha Tsui, Hong Kong SAR, China",
      date: "2025-05-19",
      description: "The way going back to Wenzhou: MSP-CHI-HKG. The skyline is so amazing! You can see how prosperous this place is!"
    },
    {
      title: "Lake Superior Lake Shore",
      image: "/assets/photos/Lake_Superior-1.JPEG",
      location: "Tettegouche State Park, Silver Bay, MN 55614, USA",
      date: "2026-04-12",
      description: "Camping in Lake Superior in Tettegouche State Park."
    },
    {
      title: "大連棒箠島 sea shore",
      image: "/assets/photos/dalian-1.jpg",
      location: "Dalian, Liaoning, China",
      date: "2025-06-10",
      description: "The trip with Yat-Nie Caa and Huang Jie to Dalian and Yantai. We passed the hike trail to Bangchui for free!"
    },
    {
      title: "大連漁人碼頭（蔡）",
      image: "/assets/photos/dalian-2.jpg",
      location: "Dalian, Liaoning, China",
      date: "2025-06-11",
      description: "My best friend Yat-Nie Caa since my high school. Glad to hang out with her when I come back from US!"
    },
    {
      title: "大連海蝕溶洞",
      image: "/assets/photos/dalian-3.jpg",
      location: "Dalian, Liaoning, China",
      date: "2025-06-10",
      description: "The trial around the sea of Dalian close to 棒槌島."
    },
    {
      title: "大連漁人碼頭及鐘樓",
      image: "/assets/photos/dalian-4.jpg",
      location: "Dalian, Liaoning, China",
      date: "2025-06-11",
      description: "The Overview of the 漁人碼頭 and the clock tower."
    },
    {
      title: "北京皇家建築",
      image: "/assets/photos/Peking-1.JPG",
      location: "Peking, China",
      date: "2025-06-20",
      description: "落日下的北京皇家建築，金碧輝煌"
    },
    {
      title: "菜菜的畢業照",
      image: "/assets/photos/Yaanee-1.JPG",
      location: "Hang Chow, Che Kiang, China",
      date: "2025-06-15",
      description: "菜菜的畢業照，可愛捏"
    },
    {
      title: "南京鷄鳴寺",
      image: "/assets/photos/nanking-1.jpg",
      location: "Nanking, Chiang Soo, China",
      date: "2021-10-06",
      description: "南京鷄鳴寺, Awesome architecture!"
    },
    {
      title: "南京鷄鳴寺(黑白)",
      image: "/assets/photos/nanking-2.png",
      location: "Nanking, Chiang Soo, China",
      date: "2021-10-06",
      description: "南京鷄鳴寺, Awesome architecture! (黑白底)"
    },
    {
      title: "泉州惠傢女",
      image: "/assets/photos/quanzhou-1.jpg",
      location: "Tsuan Chow, Fujian, China",
      date: "2025-06-20",
      description: "The sea of 泉州 around 惠家女"
    }
  ]
};
