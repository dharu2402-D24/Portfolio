export type ProjectDetail = {
  id: string;
  title: string;
  category: string;
  image: string;
  hero?: string;
  description: string;
  role: string;
  process: { step: string; text: string }[];
};

export const featured: ProjectDetail[] = [
  {
    id: "sportsyne",
    title: "SportSyne",
    category: "UI/UX Design",
    image: "",
    hero: "",
    description:
      "A platform focused on connecting players, finding venues, and improving sports participation through better social coordination.",
    role: "UI/UX Designer",
    process: [
      {
        step: "Research",
        text: "Identified pain points in how recreational players organise matches and find venues.",
      },
      {
        step: "Wireframes",
        text: "Mapped user flows for matchmaking, venue booking, and player profiles.",
      },
      {
        step: "Design",
        text: "Built a clean, activity-driven interface with real-time coordination features.",
      },
      {
        step: "Development",
        text: "Implemented responsive frontend with interactive prototype and usability testing.",
      },
    ],
  },

  {
    id: "pharmaone",
    title: "PharmaOne",
    category: "UI/UX Design",
    image: "",
    hero: "",
    description:
      "A digital healthcare application streamlining medication management, prescription tracking, and patient-provider communication.",
    role: "UI/UX Designer + Database Design",
    process: [
      {
        step: "Research",
        text: "Researched patient and pharmacist workflows to identify key friction points.",
      },
      {
        step: "Architecture",
        text: "Defined information architecture for prescriptions, reminders, and records.",
      },
      {
        step: "Design",
        text: "Created a calm, accessible interface with clear data hierarchy.",
      },
      {
        step: "Prototype",
        text: "Delivered interactive prototype with micro-interactions and feedback states.",
      },
    ],
  },

  {
    id: "aapka-admission",
    title: "Aapka Admission",
    category: "UI/UX Design",
    image: "",
    hero: "",
    description:
      "A platform designed to simplify the college admission process in India by bringing applications, eligibility, and decision-making into a single, structured system.",
    role: "UI/UX Designer",
    process: [
      {
        step: "Research",
        text: "Identified key issues like fragmented applications, unclear eligibility, and scattered information.",
      },
      {
        step: "Architecture",
        text: "Mapped flows for application tracking, college discovery, and eligibility filtering.",
      },
      {
        step: "Design",
        text: "Created a clean dashboard for managing applications, deadlines, and college exploration.",
      },
      {
        step: "Prototype",
        text: "Built interactive prototypes to test usability and refine user flows.",
      },
    ],
  },
];

export const more = [
  {
    id: "igda",
    title: "InfoGraphic IGDA",
    category: "Graphic Design",
    image: "",
  },

  {
    id: "netflix",
    title: "Netflix UI Redesign",
    category: "UI/UX Design",
    image: "",
  },

  {
    id: "odyssey",
    title: "IIITD Odyssey 2024",
    category: "Logo Redesign",
    image: "",
  },

  {
    id: "tshirt",
    title: "Open House Tshirt",
    category: "Graphic Design",
    image: "",
  },

  {
    id: "airup",
    title: "AIRUP Bottle Design",
    category: "Redesign",
    image: "",
  },

  {
    id: "donut",
    title: "The Donut Project",
    category: "3D Design",
    image: "",
  },
];

export const allProjects = [...featured, ...more];