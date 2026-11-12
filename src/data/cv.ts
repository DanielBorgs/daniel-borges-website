// All website content. Edit this file and run `npm run dev` to preview.
// The CV PDFs are built separately from cv/cv.tex (`npm run cv`), so when you
// change your experience, update both files.
// See docs/UPDATING_CONTENT.md for a walkthrough.
//
// The repo is public: never put the phone number in any committed file.

export interface Link {
  label: string;
  href: string;
}

export interface Entry {
  /** Anchor id, used for links like /projects/#cvat */
  id?: string;
  title: string;
  org: string;
  location?: string;
  /** Free-text period, e.g. "Jul 2025 – Aug 2025" */
  period: string;
  /** Short badge shown next to the title, e.g. "1st Place" */
  badge?: string;
  /** Several roles held at the same org (replace title/period in the display) */
  roles?: { title: string; period: string }[];
  /** One-line summary for compact cards ("Selected work", secondary experience on the homepage) */
  summary?: string;
  /** Show in "Selected work" on the homepage */
  featured?: boolean;
  bullets: string[];
  tags?: string[];
  links?: Link[];
}

export const profile = {
  name: 'Daniel Martins Borges',
  shortName: 'Daniel Borges',
  role: 'Software Engineer',
  focus: 'LLM applications & machine learning',
  /** One sentence for the top of the homepage */
  pitch:
    'M.Sc. student in Human-Centered AI at DTU. I build AI systems that run in the real world — from a document-extraction backend used by hospitals in Portugal to the vision-based navigation of an underwater mine-disposal drone.',
  location: 'Ballerup, Denmark',
  email: 'danimborg@gmail.com',
  website: 'https://danielmborges.com',
  github: 'https://github.com/DanielBorgs',
  linkedin: 'https://linkedin.com/in/daniel-borgs',
  /** Public CV (no phone number), built from cv/cv.tex by `npm run cv` into /public */
  cvFile: 'daniel-borges-cv.pdf',
  /** First-person introduction for the About page */
  about: [
    'I’m an M.Sc. student in Human-Centered AI at DTU, after a B.Sc. in Computer Science and Engineering at IST Lisbon (18/20, ECTS A).',
    'I like building AI systems that real people depend on. At Quidgest, a teammate and I built the backend of an LLM-based document-extraction system that is now in production at hospitals of one of Portugal’s largest healthcare groups — including a provider-agnostic layer that can run local Ollama models so sensitive patient data never leaves the premises.',
    'Most recently, I built the vision-based navigation for Nordhal Defence, a Danish defence startup: a YOLO26 segmentation model trained on simulator footage from a seabed generator I wrote, which lets its U-1A Legion underwater drone avoid obstacles and close in on sea mines. It is being deployed on the company’s drones.',
    'On the ML side, I also fine-tuned BERTimbau for Portuguese fake-news detection (2nd place in the NTT Data ML Challenge, published paper), trained a YOLOv8 segmentation model on satellite imagery that won JunctionX Lisbon 2025, and contribute to the open-source annotation tool CVAT.',
    'Outside engineering I organize hackathons and teach: I co-led the team behind JunctionX Lisbon 2026 and was a teaching assistant for introductory programming at IST, rated 9/9 by my students.',
  ],
};

/** What I'm looking for: shown in the hero and contact section */
export const openTo: { title: string; detail: string; short: string }[] = [
  {
    title: 'Part-time role',
    short: 'Part-time now · up to 20 h/week',
    detail: 'Available now, up to 20 hours/week alongside my M.Sc. — Copenhagen area or remote.',
  },
  {
    title: 'Summer 2027 internship',
    short: 'Summer 2027 internship · any location',
    detail: 'Full-time over the summer of 2027, open to any location.',
  },
];

export const highlights: { value: string; label: string }[] = [
  { value: '1st', label: 'JunctionX Lisbon 2025' },
  { value: '2nd', label: 'NTT Data ML Challenge' },
  { value: '0.948', label: 'macro-F1, published paper' },
  { value: '18/20', label: 'B.Sc. final grade (ECTS A)' },
];

export const experience: Entry[] = [
  {
    id: 'quidgest',
    title: 'Software Engineering Summer Intern',
    org: 'Quidgest',
    location: 'Lisbon, Portugal',
    period: 'Jul 2025 – Aug 2025',
    bullets: [
      'In a team of two, built the backend of an LLM-based OCR and vision system that extracts structured data from medical receipts and scanned documents of up to hundreds of pages. In production on Quidgest’s servers, used by hospitals of one of Portugal’s largest healthcare groups.',
      'Designed a provider-agnostic model layer that switches between cloud LLM providers (Anthropic, OpenAI, Google, Mistral) and locally hosted Ollama models, so sensitive patient data can stay on-premises.',
      'Built API endpoints and a streaming file-upload pipeline in Node.js (Busboy, Formidable) with PostgreSQL; developed in Docker, tested with Postman and gated by automated GitLab CI tests.',
    ],
    tags: ['Node.js', 'PostgreSQL', 'LLM APIs', 'Ollama', 'Docker', 'GitLab CI'],
  },
  {
    id: 'systems-group',
    title: 'Project Manager',
    org: 'Systems Group (Junior Enterprise)',
    location: 'Lisbon, Portugal',
    period: 'Sep 2023 – Jun 2026',
    roles: [
      { title: 'Project Manager', period: 'Sep 2024 – Jun 2026' },
      { title: 'Full-Stack Developer', period: 'Sep 2023 – Jun 2026' },
    ],
    bullets: [
      'Owned the admin side of a React Native / JavaScript mobile app in a 5-person agile team during the first 12 months of the role: management of users, treatments, appointments, permissions and publications on Firebase/Firestore, with separate storage for admin image uploads.',
      'As Project Manager, led a 4-person team that built a website for the same client and the Junior Enterprise’s own website (WordPress). Turned client requirements into tasks, ran weekly meetings and reviewed the team’s code.',
    ],
    tags: ['React Native', 'JavaScript', 'Firebase', 'WordPress', 'Team leadership'],
  },
];

export const research: Entry[] = [
  {
    id: 'fake-news',
    title: 'Portuguese Fake News Detection',
    org: 'NTT Data ML Challenge 2025/26',
    period: 'Feb 2026',
    badge: '2nd Place',
    featured: true,
    summary: 'Fine-tuned BERTimbau to 0.948 macro-F1 on 6,324 held-out articles. Published paper, presented to the NTT Data CEO.',
    bullets: [
      'Co-authored a published research paper with one teammate and presented it to the NTT Data CEO and a panel of academic judges.',
      'Fine-tuned BERTimbau (a Brazilian Portuguese BERT model) in PyTorch to 0.948 macro-F1 on a 6,324-article held-out test set, up from 0.926 for the best classical baseline (TF-IDF + MLP).',
      'Benchmarked MLP, SVM and Logistic Regression classifiers on TF-IDF features over 63,000+ articles, tuned with 5-fold cross-validated grid search; explained predictions with LIME and permutation importance, and clustered articles semantically using embeddings, K-Means and PCA.',
    ],
    tags: ['PyTorch', 'Hugging Face', 'BERT', 'scikit-learn', 'NLP', 'LIME'],
    links: [
      { label: 'Paper', href: 'https://zenodo.org/records/18393436' },
      { label: 'Code', href: 'https://github.com/DuarteCruz6/pt-fake-news-detection' },
    ],
  },
];

export const projects: Entry[] = [
  {
    id: 'nordhal',
    title: 'Underwater Drone Navigation',
    org: 'Nordhal Defence',
    location: 'Copenhagen, Denmark',
    period: 'Nov 2026',
    featured: true,
    summary: 'Vision-based navigation for a Danish defence startup’s underwater drone: YOLO26 segmentation of seabed, obstacles and sea mines, plus obstacle avoidance. Being deployed on the company’s drones.',
    bullets: [
      'In partnership with the Danish defence startup, built the vision-based navigation of its U-1A Legion, a low-cost underwater mine-disposal drone. Being deployed on its real drones.',
      'Built a procedural seabed terrain generator to produce labelled simulator footage, trained a YOLO26 segmentation model that detects the seabed, obstacles and sea mines in murky water, and wrote the algorithm that steers the drone around obstacles and onto detected mines.',
    ],
    tags: ['YOLO26', 'Computer vision', 'Robotics', 'Simulation', 'Synthetic data', 'Python'],
    links: [{ label: 'Nordhal Defence', href: 'https://www.nordhal.dk/' }],
  },
  {
    id: 'cvat',
    title: 'Open-Source Contributor',
    org: 'CVAT (Computer Vision Annotation Tool)',
    period: 'Feb 2026 – Jun 2026',
    featured: true,
    summary: 'Two merged PRs: a UI scaling fix, and rotate/scale/mirror for bounding boxes on polygon and polyline tracks.',
    bullets: [
      'Fixed a UI scaling bug, merged by the maintainers.',
      'Implemented rotate, scale and mirror for bounding boxes on polygon and polyline tracks, with unit tests and Cypress end-to-end tests.',
    ],
    tags: ['TypeScript', 'Open source', 'Cypress'],
    links: [
      { label: 'PR #10403', href: 'https://github.com/cvat-ai/cvat/pull/10403' },
      { label: 'PR #10686', href: 'https://github.com/cvat-ai/cvat/pull/10686' },
    ],
  },
  {
    id: 'invasive-species',
    title: 'Invasive Species Predictor',
    org: 'JunctionX Lisbon 2025',
    period: 'Oct 2025',
    badge: '1st Place',
    featured: true,
    summary: 'Flags high-risk invasive plant-species zones from satellite imagery. Led the ML: data pipeline and a YOLOv8 segmentation model.',
    bullets: [
      'Won first place in a team of three with a tool for Albatroz Engenharia that flags high-risk invasive plant-species expansion zones from satellite imagery.',
      'Led the ML component: collected and cleaned the geospatial and satellite data and trained a YOLOv8 segmentation model. The pipeline also visualizes before-and-after scenarios.',
    ],
    tags: ['YOLOv8', 'Computer vision', 'Geospatial data'],
  },
  {
    id: 'unscrolling',
    title: 'Unscrolling AI Assistant',
    org: 'HackEurope Dublin',
    period: 'Feb 2026',
    summary: 'Briefing assistant that scrapes and ranks daily news, summarizes it with multiple LLMs and turns it into podcast-style audio.',
    bullets: [
      'In a team of three, built the backend of a personalized briefing assistant that scrapes and ranks daily updates on user-selected topics, summarizes them with multiple LLMs and turns them into podcast-style audio via text-to-speech. Deployed on Railway.',
    ],
    tags: ['LLMs', 'Text-to-speech', 'Railway'],
    links: [{ label: 'Backend', href: 'https://github.com/DuarteCruz6/backend-hackeurope' }],
  },
  {
    id: 'bettermeeting',
    title: 'BetterMeeting AR',
    org: 'Junction Finland',
    period: 'Nov 2025',
    bullets: [
      'In a team of three, built an AR meeting assistant for Snapchat Spectacles: live subtitles with real-time translation, LLM-generated task lists and meeting summaries, and personalized text-to-speech feedback with ElevenLabs.',
    ],
    tags: ['AR', 'LLMs', 'ElevenLabs'],
  },
];

export const leadership: Entry[] = [
  {
    id: 'junctionx-organizer',
    title: 'Co-Lead Organizer (Tech & Logistics) and Treasurer',
    org: 'JunctionX Lisbon',
    location: 'Lisbon, Portugal',
    period: 'Jan 2026 – Present',
    summary: 'Co-led an 8-person team delivering a 150-participant AI/ML hackathon; managed a EUR 22,500 sponsorship budget and built the event website.',
    bullets: [
      'Co-led an 8-person team that delivered an international AI/ML hackathon for 150 participants (10–11 Oct 2026). Secured and managed a EUR 22,500 budget by negotiating sponsorships with international technology companies.',
      'Built the event website and ran the technical infrastructure for participant applications and event operations.',
    ],
  },
  {
    id: 'teaching',
    title: 'Teaching Assistant — Programming Fundamentals',
    org: 'Instituto Superior Técnico (IST)',
    location: 'Lisbon, Portugal',
    period: 'Aug 2025 – Nov 2025',
    summary: 'Ran lab sessions for 24 introductory programming students; rated 9/9 overall by students.',
    bullets: [
      'Ran lab sessions for 24 introductory programming students and graded their projects. Rated 9/9 overall by students, with the top “Excellent” rating in Classroom Learning Benefit, Pedagogical Skills and Student Interaction.',
    ],
  },
];

export const education: Entry[] = [
  {
    title: 'M.Sc. in Human-Centered Artificial Intelligence',
    org: 'Technical University of Denmark (DTU)',
    location: 'Kongens Lyngby, Denmark',
    period: 'Sep 2026 – Expected Jul 2028',
    bullets: [
      'Courses in progress: Deep Learning, Machine Learning for Signal Processing, Social Graphs and Interactions, Logical Theories for Learning and Uncertainty.',
    ],
  },
  {
    title: 'B.Sc. in Computer Science and Engineering',
    org: 'Instituto Superior Técnico (IST)',
    location: 'Lisbon, Portugal',
    period: 'Sep 2023 – Jul 2026',
    bullets: [
      'Final grade 18/20 (Excellent, ECTS Grade A). Academic Excellence Diploma (2024/2025) and Academic Merit Diploma (2023/2024).',
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'LLMs & AI',
    items: [
      'LLM APIs (OpenAI, Anthropic, Google, Mistral)',
      'local LLM inference (Ollama)',
      'prompt engineering',
      'LLM-based OCR and document extraction',
      'embeddings',
      'PyTorch',
      'Hugging Face',
      'BERT fine-tuning',
      'YOLO segmentation (YOLOv8, YOLO26)',
      'scikit-learn',
      'NLP',
      'computer vision',
      'model evaluation (macro-F1, held-out test sets, cross-validation)',
      'LIME',
    ],
  },
  { group: 'Programming Languages', items: ['Python', 'TypeScript', 'JavaScript', 'Java', 'C', 'C++'] },
  { group: 'Backend & Data', items: ['Node.js', 'API development', 'PostgreSQL', 'SQL', 'Firebase/Firestore'] },
  { group: 'Mobile & Web', items: ['React Native', 'WordPress'] },
  {
    group: 'DevOps & Testing',
    items: ['Docker', 'GitLab CI', 'Railway (cloud deployment)', 'unit testing', 'Cypress (end-to-end testing)', 'Postman', 'Git'],
  },
  { group: 'Spoken Languages', items: ['Portuguese (native)', 'English (Cambridge Advanced English, CAE)'] },
];

/** Photos for the homepage animation (public/images/<name>-480|960.webp).
 *  Boxes are [left, top, right, bottom] in % of the image. */
export const stagePhotos: {
  name: string;
  alt: string;
  boxes: {
    label: string;
    score: number;
    box: [number, number, number, number];
    kind?: 'main' | 'part';
    /** Where the label chip goes (default: above the box) */
    labelAt?: 'bottom' | 'right';
  }[];
}[] = [
  {
    name: 'stage-2',
    alt: 'Daniel speaking on stage at JunctionX Lisbon 2026',
    boxes: [
      { label: 'person', score: 0.98, box: [18.3, 3, 82.3, 100], kind: 'main' },
      { label: 'face', score: 0.97, box: [30.8, 10, 56.7, 31.7] },
      { label: 'microphone', score: 0.94, box: [32.3, 25.3, 40, 49.7], labelAt: 'bottom' },
      { label: 'logo · JunctionX', score: 0.91, box: [36.7, 45, 56.7, 50], labelAt: 'right' },
    ],
  },
  {
    name: 'stage-3',
    alt: 'Daniel presenting and pointing to the audience at JunctionX Lisbon 2026',
    boxes: [
      { label: 'person', score: 0.99, box: [11.5, 5, 95.8, 100], kind: 'main' },
      { label: 'face', score: 0.96, box: [19.8, 7.5, 46.9, 30] },
      { label: 'microphone', score: 0.95, box: [22.5, 26.3, 29.6, 50], labelAt: 'bottom' },
      { label: 'hand · pointing', score: 0.89, box: [82.3, 35.3, 95.8, 45.3] },
    ],
  },
  {
    name: 'stage-1',
    alt: 'Daniel addressing participants at JunctionX Lisbon 2026',
    boxes: [
      { label: 'person', score: 0.98, box: [20.4, 6.7, 76.7, 100], kind: 'main' },
      { label: 'face', score: 0.96, box: [37.5, 11.7, 60.4, 33.3] },
      { label: 'microphone', score: 0.93, box: [59.4, 35.8, 67.1, 59.2] },
      { label: 'hand · gesture', score: 0.87, box: [65.6, 50.8, 76.7, 60.8], labelAt: 'bottom' },
    ],
  },
];
