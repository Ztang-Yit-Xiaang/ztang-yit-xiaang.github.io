export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: string;
  description: string;
  url?: string;
  pdf?: string;
  bibtex: string;
}

export interface BlogPost {
  title: string;
  date: string;
  summary: string;
  slug: string;
  link: string;
}

export interface Project {
  title: string;
  category: string;
  description: string;
  link: string;
  repository: string;
  repositoryLabel?: string;
  status: string;
  contribution: string;
  evidence: string;
  skills: string[];
}

export interface Education {
  institution: string;
  location: string;
  degree: string;
  period: string;
  gpa: string;
}

export interface Experience {
  role: string;
  organization: string;
  period: string;
  bullets: string[];
}

export interface Teaching {
  course: string;
  role: string;
  institution: string;
  period: string;
  description: string;
}

export interface PhotographyItem {
  title: string;
  image: string;
  thumbnail: string;
  location: string;
  date: string;
  description: string;
  category?: "places" | "portraits";
  alt?: string;
  featured?: boolean;
  overlayLabel?: string;
  objectPosition?: string;
}

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
  resumeUrl: "/files/cv.pdf",
  status: "Researching randomized algorithms & numerical optimization",
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
        "Translating operator-splitting update steps into PyTorch tensor operations with explicit numerical contracts.",
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
        "Developed regression-based predictive models in Python for thermal-fluid simulation studies.",
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
        "title": "Torch-OSQP for PyGRANSO",
        "category": "Optimization",
        "description": "Translating a quadratic-program solver into PyTorch, with explicit numerical contracts and comparisons against the original OSQP implementation.",
        "link": "/portfolio/osqp-method-in-torch",
        "repository": "https://github.com/Ztang-Yit-Xiaang/PyGRANSO/tree/feature/torch-osqp-dense-reference",
        "status": "Active research",
        "contribution": "Dense tensor implementation, source-fidelity audits, and numerical validation with Ju Sun.",
        "evidence": "A working dense reference route; broader numerical acceptance and release remain open.",
        "skills": [
            "Python",
            "PyTorch",
            "Numerical optimization",
            "CUDA"
        ]
    },
    {
        "title": "Context-aware travel planner",
        "category": "Applied systems",
        "description": "Repair a multi-day trip when conditions change, keeping user commitments, route feasibility, and an explanation of each edit visible.",
        "link": "/portfolio/context-aware-travel-itinerary-optimization",
        "repository": "https://github.com/Ztang-Yit-Xiaang/weather-aware-travel-itinerary-optimization",
        "status": "Research prototype",
        "contribution": "Constraint modeling, repair workflows, independent evaluation, and interactive route dashboards.",
        "evidence": "Implemented planning and evaluation components; full research comparison remains incomplete.",
        "skills": [
            "Python",
            "Gurobi",
            "FastAPI",
            "Leaflet"
        ]
    },
    {
        "title": "Adaptive Hutch++ trace estimation",
        "category": "Randomized algorithms",
        "description": "Estimate large-matrix statistics with a fixed budget of matrix–vector queries, adapting how much work goes into a low-rank approximation.",
        "link": "/portfolio/matrix-vector-trace-estimation",
        "repository": "https://github.com/Ztang-Yit-Xiaang/Matrix-vector_queries_estimation",
        "status": "Active research",
        "contribution": "Adaptive allocation variants, query accounting, and synthetic and real-data experiments.",
        "evidence": "Estimator source, diagnostic tests, and archived benchmark tables are available.",
        "skills": [
            "NumPy",
            "SciPy",
            "Randomized linear algebra",
            "Experiment design"
        ]
    },
    {
        "title": "Multi-Task Optimizer",
        "category": "Optimization",
        "description": "Designing controlled comparisons of methods that balance competing learning tasks, including an extension to language-model unlearning.",
        "link": "/portfolio/multi-task-optimizer",
        "repository": "https://github.com/h7nian/MultiTaskOptimizer",
        "status": "Reproduction planning",
        "contribution": "Repository review and a protocol-aligned reproduction plan across four benchmark datasets.",
        "evidence": "Experiment design is documented; benchmark results from this reproduction plan are not yet established.",
        "skills": [
            "PyTorch",
            "Multi-task learning",
            "Reproducibility",
            "SLURM"
        ],
        "repositoryLabel": "Collaborator repository · private"
    },
    {
        "title": "Leverage-score sampling & sketching",
        "category": "Randomized algorithms",
        "description": "Explore how carefully chosen matrix rows can preserve useful structure while reducing the size of a linear-algebra problem.",
        "link": "/portfolio/randomized-sketching",
        "repository": "https://github.com/Ztang-Yit-Xiaang/Matrix-vector_queries_estimation",
        "status": "Research notebooks",
        "contribution": "Sampling implementations and theoretical study with Swati Padmanabhan.",
        "evidence": "The leverage-score notebook is local; the linked repository covers the related trace-estimation work.",
        "skills": [
            "Python",
            "NumPy",
            "Sampling",
            "Numerical linear algebra"
        ],
        "repositoryLabel": "Related trace-estimation code"
    },
    {
        "title": "Wenzhounese & Rui’anese input tools",
        "category": "Applied systems",
        "description": "Make underrepresented Southern Wu varieties easier to type through phonetic schemas and dialect dictionaries for the Rime input engine.",
        "link": "/portfolio/wenzhounese-input-method",
        "repository": "https://github.com/Ztang-Yit-Xiaang/Ruianese_Tying_Method",
        "status": "Public software",
        "contribution": "Phonetic mappings, dictionary construction, and input-schema design.",
        "evidence": "Public Rime configuration and dictionary repositories.",
        "skills": [
            "Rime",
            "YAML",
            "Language technology",
            "Dictionary design"
        ]
    },
    {
        "title": "Magnetic pose reconstruction",
        "category": "Scientific computing",
        "description": "Connect magnetic-field measurements to the shape and position of flexible magnets for soft-robotic sensing.",
        "link": "/portfolio/magnetic-pose-estimation",
        "repository": "https://github.com/Ztang-Yit-Xiaang/NeuroMagIK-Reverse-Neural-Modeling-3D-Magnetic-Pose-Reconstruction",
        "status": "Research internship",
        "contribution": "Inverse neural modeling and magnetic-sensing experiments during CUHK SURP 2025.",
        "evidence": "Research code and a project report document the sensing and reconstruction work.",
        "skills": [
            "Python",
            "Inverse problems",
            "Neural networks",
            "Soft robotics"
        ]
    },
    {
        "title": "Magnetic sensor-array visualization",
        "category": "Applied systems",
        "description": "Turn streams of magnetic sensor readings into spatial views that help researchers calibrate an array and inspect field patterns.",
        "link": "/portfolio/magnetic-sensor-array-visualization",
        "repository": "https://github.com/Ztang-Yit-Xiaang/NeuroMagIK-Reverse-Neural-Modeling-3D-Magnetic-Pose-Reconstruction",
        "status": "Research prototype",
        "contribution": "Data acquisition, calibration support, and visualization for magnetic sensing.",
        "evidence": "A companion software workflow to the CUHK magnetic reconstruction project.",
        "skills": [
            "Python",
            "PyQt",
            "Serial data",
            "Visualization"
        ]
    },
    {
        "title": "Sparse PCA for gene expression",
        "category": "Machine learning",
        "description": "Compare compact but dense representations with sparse components that make high-dimensional gene-expression data easier to inspect.",
        "link": "/portfolio/sparse-pca-gene-expression",
        "repository": "https://github.com/Ztang-Yit-Xiaang/Sparse-PCA-for-Gene-Expression-Analysis",
        "status": "Course project",
        "contribution": "Preprocessing, dimensionality-reduction experiments, and reconstruction–sparsity comparisons.",
        "evidence": "Public analysis code and visualizations; exploratory analysis, not a clinical predictor.",
        "skills": [
            "scikit-learn",
            "Pandas",
            "PCA",
            "Statistical modeling"
        ]
    },
    {
        "title": "Attention & transfer in facial expression recognition",
        "category": "Machine learning",
        "description": "Compare recognition models and inspect where they look, using facial-expression classification to study representation transfer.",
        "link": "/portfolio/facial-expression-recognition",
        "repository": "https://github.com/RohitPoduval1/csci5527-project",
        "status": "Team course project",
        "contribution": "Team study of representation transfer, model comparisons, and visual explanations.",
        "evidence": "Shared FER2013 project code; proposed attention improvements are not presented as verified gains.",
        "skills": [
            "PyTorch",
            "Computer vision",
            "Transfer learning",
            "Model evaluation"
        ],
        "repositoryLabel": "Team repository"
    },
    {
        "title": "PDEBench-Lang",
        "category": "Machine learning",
        "description": "Test whether a model can recognize the same physical equation when its symbolic representation changes.",
        "link": "/portfolio/pdebench-lang",
        "repository": "https://github.com/RaghavKrishn/Nlp-group-final-project",
        "status": "Team course project",
        "contribution": "Cross-dialect evaluation and benchmarking for the Token Efforts team.",
        "evidence": "Public project documents explicitly attribute my evaluation role.",
        "skills": [
            "NLP",
            "BART / T5",
            "Symbolic reasoning",
            "Benchmarking"
        ],
        "repositoryLabel": "Team repository"
    }
] as Project[],
  publications: [
    {
        "id": "milp-asrs",
        "title": "An automated storage and retrieval system optimization with MILP methods",
        "authors": "Yixin Chen, Boning Fan, Jiaming Li, Jianfeng Lin, Mengmeng Lin",
        "venue": "Proceedings of SPIE, CISAI 2022, vol. 12566 (published 2023)",
        "year": "2023",
        "description": "Mixed-integer linear programming for AGV transport sequencing in automated storage and retrieval systems.",
        "url": "https://doi.org/10.1117/12.2667780",
        "pdf": "/files/125662V.pdf",
        "bibtex": "@inproceedings{chen2023asrs,\n  title={An automated storage and retrieval system optimization with MILP methods},\n  author={Chen, Yixin and Fan, Boning and Li, Jiaming and Lin, Jianfeng and Lin, Mengmeng},\n  booktitle={Proceedings of SPIE},\n  volume={12566},\n  pages={125662V},\n  year={2023},\n  doi={10.1117/12.2667780}\n}"
    },
    {
        "id": "zinc-nanomaterials",
        "title": "Application of nanomaterials for improving zinc-ion batteries performance",
        "authors": "Yixin Chen",
        "venue": "Journal of Physics: Conference Series, 2798, 012004",
        "year": "2024",
        "description": "Review of nanomaterial approaches to improving zinc-ion battery performance.",
        "url": "https://doi.org/10.1088/1742-6596/2798/1/012004",
        "pdf": "/files/Chen_2024_J._Phys.__Conf._Ser._2798_012004.pdf",
        "bibtex": "@article{chen2024zinc,\n  title={Application of nanomaterials for improving zinc-ion batteries performance},\n  author={Chen, Yixin},\n  journal={Journal of Physics: Conference Series},\n  volume={2798},\n  pages={012004},\n  year={2024},\n  doi={10.1088/1742-6596/2798/1/012004}\n}"
    },
    {
        "id": "mimms-magnetic",
        "title": "Towards Tactile Intelligence: Inverse Neural Modeling and Magnetic Field Sensing for MIMMS",
        "authors": "Yixin Chen",
        "venue": "CUHK SURP project report / poster (not a peer-reviewed publication)",
        "year": "2025",
        "description": "Inverse neural modeling, magnetic-field sensing, and tactile reconstruction from the CUHK research internship.",
        "pdf": "/files/1155255040-Yixin Chen-Towards Tactile Intelligence_Inverse Neural Modeling and Magnetic Field Sensing for MIMMS.pdf",
        "bibtex": "@misc{chen2025mimms,\n  title={Towards Tactile Intelligence: Inverse Neural Modeling and Magnetic Field Sensing for MIMMS},\n  author={Chen, Yixin},\n  howpublished={CUHK SURP project report and poster},\n  year={2025}\n}"
    }
] as Publication[],
  teaching: [
    {
      course: "CSCI 2081: Introduction to Software Development",
      role: "Teaching Assistant",
      institution: "University of Minnesota Twin Cities",
      period: "Fall 2026",
      description: "Supporting Java object-oriented design, data structures, and programming labs.",
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
    "title": "When passing tests is not the same as solver readiness",
    "date": "Sep 29, 2026",
    "summary": "What the Torch-OSQP work taught me about source fidelity, numerical quality, and the decision to release.",
    "slug": "solver-validation-and-release-readiness",
    "link": "/blog/solver-validation-and-release-readiness"
},
{
    "title": "How adaptive Hutch++ spends a query budget",
    "date": "Sep 29, 2026",
    "summary": "Pilot sketches, low-rank structure, and residual estimation under an explicit matrix–vector budget.",
    "slug": "adaptive-hutchpp-query-budget",
    "link": "/blog/adaptive-hutchpp-query-budget"
},
{
    "title": "Designing a fair multi-task optimizer comparison",
    "date": "Sep 29, 2026",
    "summary": "A new research direction: reproduce the protocol before attributing a result to the optimizer.",
    "slug": "multi-task-optimizer-reproduction",
    "link": "/blog/multi-task-optimizer-reproduction"
},
    {
      title: "From Weather-Aware to Context-Aware Itinerary Repair",
      date: "Jun 26, 2026",
      summary: "Refining user-specific itinerary repair using hotels, weather constraints, and evidence conflicts.",
      slug: "from-weather-aware-to-context-aware-itinerary-repair",
      link: "/blog/from-weather-aware-to-context-aware-itinerary-repair",
    },
    {
      title: "Leverage Scores & TurboQuant: Scalable Linear Algebra Experiments",
      date: "Jun 26, 2026",
      summary: "Benchmarking randomized sketching, Hutch++, and TurboQuant algorithms for UMN research.",
      slug: "leverage-scores-turboquant-scalable-linear-algebra-experiments",
      link: "/blog/leverage-scores-turboquant-scalable-linear-algebra-experiments",
    },
    {
      title: "PyGRANSO Torch OSQP Dense Reference Notes",
      date: "Jun 26, 2026",
      summary: "Dense solver implementation, backend contracts, and numerical validation in PyGRANSO.",
      slug: "pygranso-torch-osqp-dense-reference-notes",
      link: "/blog/pygranso-torch-osqp-dense-reference-notes",
    },
    {
      title: "Summer Randomized Algorithms Research Directions",
      date: "May 24, 2026",
      summary: "Research threads in sketching, trace estimation, and randomized numerical linear algebra.",
      slug: "summer-randomized-algorithms-research",
      link: "/blog/summer-randomized-algorithms-research",
    },
    {
      title: "Translating OSQP Method into PyTorch Primitives",
      date: "May 24, 2026",
      summary: "Mapping operator-splitting update steps into PyTorch tensor operations.",
      slug: "translating-osqp-method-into-torch",
      link: "/blog/translating-osqp-method-into-torch",
    },
    {
      title: "From Single-Day Routes to Multi-Day Context-Aware Itineraries",
      date: "Apr 18, 2026",
      summary: "Expanding single-day TSP models into multi-day hierarchical planning architectures.",
      slug: "from-single-day-routes-to-multi-day-itineraries",
      link: "/blog/from-single-day-routes-to-multi-day-itineraries",
    },
    {
      title: "Why Representation Might Matter for Symbolic PDE Reasoning",
      date: "Apr 14, 2026",
      summary: "Analyzing symbolic tokens and embedding spaces in neural PDE solvers.",
      slug: "why-representation-might-matter-for-pdes",
      link: "/blog/why-representation-might-matter-for-pdes",
    },
    {
      title: "What I Look For in Attention Maps",
      date: "Apr 9, 2026",
      summary: "Understanding representation transfer and feature attention in visual classification.",
      slug: "what-i-look-for-in-attention-maps",
      link: "/blog/what-i-look-for-in-attention-maps",
    },
  ] as BlogPost[],
  photography: [
{
    "title": "A pier in evening light",
    "image": "/assets/photos/shandong-pier-light-full.webp",
    "thumbnail": "/assets/photos/shandong-pier-light-card.webp",
    "location": "Shandong coast, China",
    "date": "2025-06-07",
    "description": "A narrow pier reaches over still water as late sunlight breaks through the clouds.",
    "alt": "A pier crossing calm water beneath a hazy golden sky",
    "category": "places"
},
{
    "title": "Afterglow on the coast",
    "image": "/assets/photos/yangma-island-afterglow-full.webp",
    "thumbnail": "/assets/photos/yangma-island-afterglow-card.webp",
    "location": "Yangma Island, Shandong, China",
    "date": "2025-06-07",
    "description": "The last pink light stretches across an open horizon above the quiet shoreline.",
    "alt": "Pink clouds above a calm sea at dusk",
    "category": "places"
},
{
    "title": "First light at Xiwan",
    "image": "/assets/photos/xiwan-first-light-full.webp",
    "thumbnail": "/assets/photos/xiwan-first-light-card.webp",
    "location": "Xiwan, Zhejiang, China",
    "date": "2024-02-11",
    "description": "A warm column of sunlight crosses the tidal flats at sunrise.",
    "alt": "Sunrise reflected in shallow water and rippled tidal sand",
    "category": "places"
},
{
    "title": "Looking up in Denver",
    "image": "/assets/photos/denver-looking-up-full.webp",
    "thumbnail": "/assets/photos/denver-looking-up-card.webp",
    "location": "Denver, Colorado, USA",
    "date": "2025-04-02",
    "description": "Concentric rings, pale stone, and warm light draw the eye into the dome.",
    "alt": "An ornate circular dome seen from directly below",
    "category": "places"
},
{
    "title": "A ribbon of canyon light",
    "image": "/assets/photos/canyon-light-full.webp",
    "thumbnail": "/assets/photos/canyon-light-card.webp",
    "location": "Southwestern United States",
    "date": "2025-12-25",
    "description": "A narrow opening lights the folds of sandstone from above.",
    "alt": "Sunlight entering a narrow red sandstone slot canyon",
    "category": "places"
},
{
    "title": "Through canyon country",
    "image": "/assets/photos/canyon-country-full.webp",
    "thumbnail": "/assets/photos/canyon-country-card.webp",
    "location": "Southwestern United States",
    "date": "2025-12-27",
    "description": "Warm cliffs and a cool valley share the frame beneath a streaked winter sky.",
    "alt": "Sunlit sandstone cliffs rising above a shadowed canyon valley",
    "category": "places"
},
{
    "title": "The city between buildings",
    "image": "/assets/photos/city-between-buildings-full.webp",
    "thumbnail": "/assets/photos/city-between-buildings-card.webp",
    "location": "United States · travel journal",
    "date": "2026-03-10",
    "description": "A passage between brick walls opens onto the brighter street beyond.",
    "alt": "A narrow city passage with brick walls, hanging lights, and distant pedestrians",
    "category": "places"
},
{
    "title": "Light on the forest floor",
    "image": "/assets/photos/forest-floor-light-full.webp",
    "thumbnail": "/assets/photos/forest-floor-light-card.webp",
    "location": "United States · travel journal",
    "date": "2026-03-11",
    "description": "Slanting light reveals the texture of trunks, fallen branches, and the steep forest floor.",
    "alt": "Sunlight falling across tree trunks and a wooded slope",
    "category": "places"
},
    {
      title: "Blue Ridge Solitude",
      image: "/assets/photos/blue-ridge-solitude-full.webp",
      thumbnail: "/assets/photos/blue-ridge-solitude-card.webp",
      location: "Blue Ridge Mountains, Virginia, USA",
      date: "2025-03-11",
      description: "A lone figure crossing the winter meadow beneath the layered Blue Ridge—an image about scale, stillness, and the distance between departure and arrival.",
      alt: "A lone figure standing in a winter meadow above layered blue mountain ridges",
      featured: true,
      category: "places",
      overlayLabel: "Blue Ridge",
      objectPosition: "center 58%",
    },
    {
      title: "Turquoise Edge of Dalian",
      image: "/assets/photos/dalian-turquoise-coast-full.webp",
      thumbnail: "/assets/photos/dalian-turquoise-coast-card.webp",
      location: "Dalian, Liaoning, China",
      date: "2025-06-05",
      description: "Clear turquoise water gathers beneath the rust-colored cliffs, turning the coastline into bands of stone, light, and open sea.",
      alt: "Turquoise seawater meeting a rocky coastline below the cliffs of Dalian",
      category: "places",
      objectPosition: "center",
    },
    {
      title: "Sea Through Stone",
      image: "/assets/photos/dalian-cave-aperture-full.webp",
      thumbnail: "/assets/photos/dalian-cave-aperture-card.webp",
      location: "Dalian, Liaoning, China",
      date: "2025-06-05",
      description: "A natural opening in the weathered coastal rock frames a small field of blue, compressing the scale of sea and sky into a quiet window.",
      alt: "Blue sea framed through a natural aperture in warm coastal rock",
      category: "places",
      objectPosition: "center",
    },
    {
      title: "Dragons in Glaze",
      image: "/assets/photos/beijing-dragon-wall-full.webp",
      thumbnail: "/assets/photos/beijing-dragon-wall-card.webp",
      location: "Forbidden City, Beijing, China",
      date: "2024-02-18",
      description: "Glazed dragons move across a field of turquoise and gold, where imperial symbolism survives through color, rhythm, and fired clay.",
      alt: "Glazed dragon reliefs in turquoise, gold, and green at the Forbidden City",
      category: "places",
      objectPosition: "center",
    },
    {
      title: "Xiwān Sunrise",
      image: "/assets/photos/xiwan-sunrise-reflection-full.webp",
      thumbnail: "/assets/photos/xiwan-sunrise-reflection-card.webp",
      location: "Xiwān, Zhejiang, China",
      date: "2024-02-11",
      description: "The rising sun draws a narrow copper path across the tidal water, held between a dark horizon and the first color of morning.",
      alt: "A red sunrise reflected as a vertical path of light across calm tidal water",
      category: "places",
      objectPosition: "center",
    },
    {
      title: "Wall Across Winter",
      image: "/assets/photos/great-wall-winter-full.webp",
      thumbnail: "/assets/photos/great-wall-winter-card.webp",
      location: "Great Wall, Beijing, China",
      date: "2024-02-18",
      description: "The Great Wall climbs through the muted winter ridges, its watchtowers measuring distance against a landscape larger than memory.",
      alt: "The Great Wall crossing layered brown mountain ridges in winter",
      category: "places",
      objectPosition: "center",
    },
    {
      title: "Under the Capitol Dome",
      image: "/assets/photos/denver-capitol-dome-full.webp",
      thumbnail: "/assets/photos/denver-capitol-dome-card.webp",
      location: "Colorado State Capitol, Denver, Colorado, USA",
      date: "2025-04-01",
      description: "Warm galleries rise toward the illuminated dome, their symmetry turning civic architecture into a study of circles, repetition, and light.",
      alt: "Symmetrical interior galleries rising beneath the Colorado State Capitol dome",
      category: "places",
      objectPosition: "center",
    },
    {
      title: "Hong Kong Victoria Bay Skyline",
      image: "/assets/photos/hk-1.jpg",
      thumbnail: "/assets/photos/hk-1-card.webp",
      location: "Tsim Sha Tsui, Hong Kong SAR, China",
      date: "2025-05-19",
      description: "The way going back to Wenzhou: MSP-CHI-HKG. The skyline is so amazing! You can see how prosperous this place is!",
      category: "places",
    },
    {
      title: "Lake Superior Lake Shore",
      image: "/assets/photos/Lake_Superior-1.JPEG",
      thumbnail: "/assets/photos/Lake_Superior-1-card.webp",
      location: "Tettegouche State Park, Silver Bay, MN 55614, USA",
      date: "2026-04-12",
      description: "Camping in Lake Superior in Tettegouche State Park.",
      category: "places",
    },
    {
      title: "大連棒箠島 sea shore",
      image: "/assets/photos/dalian-1.jpg",
      thumbnail: "/assets/photos/dalian-1-card.webp",
      location: "Dalian, Liaoning, China",
      date: "2025-06-10",
      description: "The trip with Yat-Nie Caa and Huang Jie to Dalian and Yantai. We passed the hike trail to Bangchui for free!",
      category: "places",
    },
    {
      title: "大連漁人碼頭（蔡）",
      image: "/assets/photos/dalian-2.jpg",
      thumbnail: "/assets/photos/dalian-2-card.webp",
      location: "Dalian, Liaoning, China",
      date: "2025-06-11",
      description: "My best friend Yat-Nie Caa since my high school. Glad to hang out with her when I come back from US!",
      alt: "A portrait at Dalian Fisherman's Wharf",
      category: "portraits",
      objectPosition: "center 28%",
    },
    {
      title: "大連海蝕溶洞",
      image: "/assets/photos/dalian-3.jpg",
      thumbnail: "/assets/photos/dalian-3-card.webp",
      location: "Dalian, Liaoning, China",
      date: "2025-06-10",
      description: "The trial around the sea of Dalian close to 棒槌島.",
      category: "places",
    },
    {
      title: "大連漁人碼頭及鐘樓",
      image: "/assets/photos/dalian-4.jpg",
      thumbnail: "/assets/photos/dalian-4-card.webp",
      location: "Dalian, Liaoning, China",
      date: "2025-06-11",
      description: "The Overview of the 漁人碼頭 and the clock tower.",
      category: "places",
    },
    {
      title: "北京皇家建築",
      image: "/assets/photos/Peking-1.JPG",
      thumbnail: "/assets/photos/Peking-1-card.webp",
      location: "Peking, China",
      date: "2025-06-20",
      description: "落日下的北京皇家建築，金碧輝煌",
      category: "places",
    },
    {
      title: "菜菜的畢業照",
      image: "/assets/photos/Yaanee-1.JPG",
      thumbnail: "/assets/photos/Yaanee-1-card.webp",
      location: "Hang Chow, Che Kiang, China",
      date: "2025-06-15",
      description: "菜菜的畢業照，可愛捏",
      alt: "A graduation portrait in Hangzhou",
      category: "portraits",
      objectPosition: "center 24%",
    },
    {
      title: "南京鷄鳴寺",
      image: "/assets/photos/nanking-1.jpg",
      thumbnail: "/assets/photos/nanking-1-card.webp",
      location: "Nanking, Chiang Soo, China",
      date: "2021-10-06",
      description: "南京鷄鳴寺, Awesome architecture!",
      category: "places",
    },
    {
      title: "南京鷄鳴寺(黑白)",
      image: "/assets/photos/nanking-2.png",
      thumbnail: "/assets/photos/nanking-2-card.webp",
      location: "Nanking, Chiang Soo, China",
      date: "2021-10-06",
      description: "南京鷄鳴寺, Awesome architecture! (黑白底)",
      category: "places",
    },
    {
      title: "泉州惠傢女",
      image: "/assets/photos/quanzhou-1.jpg",
      thumbnail: "/assets/photos/quanzhou-1-card.webp",
      location: "Tsuan Chow, Fujian, China",
      date: "2025-06-20",
      description: "The sea of 泉州 around 惠家女",
      category: "places",
    },
  ] as PhotographyItem[],
};
