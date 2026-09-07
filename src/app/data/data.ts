import flowStateLogo from "../../assets/images/FLOW STATE LOGO.png";
import flowStateThumbnail from "../../assets/images/FLOW STATE THUMBNAIL.png";
import sportsYneLogo from "../../assets/images/SPORTSYNE LOGO.png";
import sportsYneThumbnail from "../../assets/images/SPORTSYNETHUMBNAIL.png";
import pharmaOneLogo from "../../assets/images/PHARMAONELOGO.png";
import pharmaOneThumbnail from "../../assets/images/PHARMAONETHUMBNAIL.png";
import aapkaAdmissionLogo from "../../assets/images/AAPKAADMISSIONLOGO.png";
import aapkaAdmissionThumbnail from "../../assets/images/AAPKAADMISSIONTHUMBNAIL.png";
import igdaImage from "../../assets/images/iiitd infographic.png";
import netflixLogo from "../../assets/images/netflix logo.jpg";
import netflixPage1 from "../../assets/images/NETFLIX UI PAGE 1.png";
import netflixPage2 from "../../assets/images/NETFLIX UI PAGE 2.png";
import odysseyLogo from "../../assets/images/odyssey logo.png";
import openHouseShirt from "../../assets/images/OPENHOUSESHIRT.png";
import airupImage from "../../assets/images/AIRUPBOTTLEMOCKUP.png";
import donutImage from "../../assets/images/donut.png";
import spamItImage from "../../assets/images/spam_it.png";
import ecellCardImage from "../../assets/images/ecell tshirt 4.png";
import ecellHeroImage from "../../assets/images/ECELLTHSIRTS (2).png";
import igniteRoomShirt from "../../assets/images/IGNITEROOMSHIRT.png";
import fitPulseMockup from "../../assets/images/FITPULSE MOCKUP.png";
import dmLogo from "../../assets/images/dharohar mehta logo.png";
import cocaColaImage from "../../assets/images/coca cola brochure.png";
import pptPage1 from "../../assets/images/pptpage1.png";
import pptPage2 from "../../assets/images/pptpage2.png";
import pptPage3 from "../../assets/images/pptpage3.png";
import openHouseStreetwear from "../../assets/images/openhousestreetwear look.png";
import igniteRoomWorkflow from "../../assets/images/ignite room thsirt.png";
import geonodesVideo from "../../assets/images/geonodesblob.mp4";
import geonodesThumb from "../../assets/images/geonodesblob_thumb.jpg";
import hexaVideo from "../../assets/images/hexa animation0001-0160.mp4";
import hexaThumb from "../../assets/images/hexa_thumb.jpg";
import cubicVideo from "../../assets/images/cubic animation.mp4";
import cubicThumb from "../../assets/images/cubic_thumb.jpg";

export type ProjectDetail = {
  id: string;
  title: string;
  category: string;
  image: string;
  hero?: string;
  /** Multiple images shown as a swipeable carousel on the detail page */
  images?: string[];
  video?: string;
  description?: string;
  role?: string;
  process?: { step: string; text: string }[];
  /** Optional external link shown as a CTA on the detail page */
  link?: string;
};

// ── Featured (home page) — exactly 3 ──────────────────────────────────────
export const featured: ProjectDetail[] = [
  {
    id: "flow-state",
    title: "Flow State",
    category: "Game Des+Dev",
    image: flowStateLogo,
    hero: flowStateThumbnail,
    description:
      "A calming low-poly 3D exploration game built around slowing down, exploring, and finding your flow. Players wander through a peaceful, stylized natural world designed around curiosity and relaxed discovery.",
    role: "Designer + Developer",
    process: [
      {
        step: "Concept",
        text: "Designed around the idea of slowing down — a browser-based world built for exploration, not competition.",
      },
      {
        step: "Environment",
        text: "Built a low-poly forest with custom terrain, stylized trees, rocks, mountains, and paths using Three.js and WebGL.",
      },
      {
        step: "Gameplay",
        text: "Implemented a lightweight character controller with first/third-person movement, camera controls, and environmental interaction.",
      },
      {
        step: "Visuals",
        text: "Achieved the calm aesthetic through real-time lighting, shadows, atmospheric fog, and a soft pastel color palette.",
      },
    ],
    link: "https://flow-state-v1.web.app/",
  },

  {
    id: "sportsyne",
    title: "SportSyne",
    category: "UI/UX Design",
    image: sportsYneLogo,
    hero: sportsYneThumbnail,
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
    link: "https://www.behance.net/gallery/248808469/SportSyne-Sports-Coordination-Platform",
  },

  {
    id: "pharmaone",
    title: "PharmaOne",
    category: "UI/UX Design",
    image: pharmaOneLogo,
    hero: pharmaOneThumbnail,
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
];

// ── More projects (All Projects page) ─────────────────────────────────────
// Items with `process` are openable (detail page); items without are card-only.
export const more: (ProjectDetail | { id: string; title: string; category: string; image: string })[] = [
  // Full detail — appears 4th in All Projects, right after the 3 featured
  {
    id: "spam-it",
    title: "Spam It — LED Race Game",
    category: "Game Des+Dev",
    image: spamItImage,
    description:
      "A two-player Arduino-based racing game controlled through physical button inputs.",
    role: "Electronics and Aesthetics",
    process: [
      {
        step: "The Challenge",
        text: "Most games lack physical engagement, limiting interaction to screens. The goal was to create a fast, tactile, and competitive experience.",
      },
      {
        step: "The Solution",
        text: "A hardware-driven game system where players control LED cars through real-world inputs and navigate dynamic challenges.",
      },
      {
        step: "Key Decisions",
        text: "Real-time button input handling. Dynamic gameplay obstacles. Physical LED track for live feedback. Balanced mechanics between speed and control.",
      },
      {
        step: "Impact",
        text: "Created an engaging tangible gaming experience beyond screens. Demonstrated real-time hardware interaction and responsiveness. Successfully merged game design with embedded systems.",
      },
    ],
    link: "https://github.com",
  },

  {
    id: "aapka-admission",
    title: "Aapka Admission",
    category: "UI/UX Design",
    image: aapkaAdmissionLogo,
    hero: aapkaAdmissionThumbnail,
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

  {
    id: "fitpulse",
    title: "FitPulse",
    category: "UI/UX Design",
    image: fitPulseMockup,
  },

  {
    id: "dm-logo",
    title: "Dharohar Mehta — Personal Logo",
    category: "Logo Design",
    image: dmLogo,
    hero: dmLogo,
    description:
      "A personal identity mark designed to represent Dharohar Mehta as a visual designer and creative technologist — built around simplicity, precision, and a sense of craft.",
    role: "Brand Designer",
    process: [
      {
        step: "Brief",
        text: "Defined the core values to communicate: versatility, creativity, and a clean technical sensibility.",
      },
      {
        step: "Exploration",
        text: "Explored monogram-based directions using letterforms from the initials DM, testing geometry, weight, and balance.",
      },
      {
        step: "Refinement",
        text: "Refined the chosen direction into a precise mark with consistent stroke weights and optical corrections.",
      },
      {
        step: "Identity",
        text: "Finalised the logo with usage guidelines covering colour, spacing, and minimum size for both digital and print.",
      },
    ],
  },

  // Full detail + image carousel
  {
    id: "netflix",
    title: "Netflix UI Redesign",
    category: "UI/UX Design",
    image: netflixLogo,
    images: [netflixPage1, netflixPage2],
    description:
      "A concept redesign of the Netflix interface focused on improved content discovery, cleaner visual hierarchy, and a more immersive, editorial browsing experience.",
    role: "UI/UX Designer",
    process: [
      {
        step: "Research",
        text: "Audited the existing Netflix UI for hierarchy issues, cluttered rows, and low content discoverability.",
      },
      {
        step: "Concept",
        text: "Explored editorial-style layouts inspired by streaming platforms with stronger visual identity.",
      },
      {
        step: "Design",
        text: "Redesigned the home, browse, and detail screens with bolder typography and refined grid systems.",
      },
      {
        step: "Review",
        text: "Iterated on contrast, spacing, and component consistency across light and dark contexts.",
      },
    ],
  },

  {
    id: "induction-proposal-ppt",
    title: "Induction Proposal PPT",
    category: "Graphic Design",
    image: pptPage1,
    images: [pptPage1, pptPage2, pptPage3],
    description:
      "A clean, professional presentation design created for an induction proposal, focusing on clear typography, structured layouts, and engaging visual hierarchy.",
    role: "Presentation Designer",
    process: [
      {
        step: "Content Structuring",
        text: "Reviewed the proposal content to determine the optimal flow and slide-by-slide narrative.",
      },
      {
        step: "Layout Design",
        text: "Developed structured slide templates ensuring consistent margins, typography, and visual hierarchy.",
      },
      {
        step: "Visual Polish",
        text: "Integrated imagery, icons, and clean data visualizations to support the key talking points.",
      },
      {
        step: "Final Delivery",
        text: "Delivered a cohesive, presentation-ready deck optimized for both screen viewing and projection.",
      },
    ],
  },

  {
    id: "igda",
    title: "InfoGraphic IGDA",
    category: "Graphic Design",
    image: igdaImage,
  },

  {
    id: "odyssey",
    title: "IIITD Odyssey 2024",
    category: "Logo Design",
    image: odysseyLogo,
  },

  {
    id: "tshirt",
    title: "Open House Tshirt",
    category: "Graphic Design",
    image: openHouseShirt,
    hero: openHouseStreetwear,
    description:
      "A bold, streetwear-inspired apparel design created for the college Open House, emphasizing modern typography, dynamic layouts, and a distinct aesthetic that resonates with the student community.",
    role: "Graphic Designer",
    process: [
      {
        step: "Concept",
        text: "Explored streetwear aesthetics, focusing on oversized typography, striking graphics, and a modern, bold look.",
      },
      {
        step: "Design",
        text: "Developed detailed front and back graphics, ensuring the design translates well to screen printing.",
      },
      {
        step: "Refinement",
        text: "Iterated on placement, scaling, and color choices to achieve a high-impact visual presence.",
      },
      {
        step: "Final Production",
        text: "Prepared the artwork for print, providing precise specifications for the streetwear look and feel.",
      },
    ],
  },

  // Full detail
  {
    id: "ecell-tshirts",
    title: "E-Cell Tshirts",
    category: "Graphic Design",
    image: ecellCardImage,
    hero: ecellHeroImage,
    description:
      "A series of apparel designs created for the Entrepreneurship Cell, blending bold graphic illustration with contemporary typography to represent the spirit of student innovation.",
    role: "Graphic Designer",
    process: [
      {
        step: "Brief",
        text: "Worked with the E-Cell team to define themes around entrepreneurship, boldness, and campus culture.",
      },
      {
        step: "Concept",
        text: "Explored multiple directions — from typographic to illustrative — before settling on a graphic-led approach.",
      },
      {
        step: "Design",
        text: "Developed final artwork with detailed illustration, colour blocking, and print-ready output.",
      },
      {
        step: "Final",
        text: "Delivered print files for multiple colourways across the full tshirt range.",
      },
    ],
  },

  // Card only
  {
    id: "ignite-room",
    title: "Ignite Room Tshirt",
    category: "Graphic Design",
    image: igniteRoomShirt,
    hero: igniteRoomWorkflow,
    description:
      "A dynamic, high-energy apparel design tailored for the Ignite Room event, blending modern typography with vibrant, bold graphic elements.",
    role: "Graphic Designer",
    process: [
      {
        step: "Concept",
        text: "Brainstormed energetic and striking visual motifs that align with the Ignite brand identity.",
      },
      {
        step: "Design",
        text: "Created the primary artwork and laid out the typography for optimal impact on apparel.",
      },
      {
        step: "Refinement",
        text: "Polished the design through iterative feedback, adjusting colors and scale.",
      },
      {
        step: "Final Production",
        text: "Finalized the files for screen printing and generated mockups for the team.",
      },
    ],
  },

  {
    id: "geonodes",
    title: "Geometry Nodes Blob",
    category: "3D",
    image: geonodesThumb,
    video: geonodesVideo,
  },

  {
    id: "hexa-animation",
    title: "Hexa Animation",
    category: "3D",
    image: hexaThumb,
    video: hexaVideo,
  },

  {
    id: "cubic-animation",
    title: "Cubic Animation",
    category: "3D",
    image: cubicThumb,
    video: cubicVideo,
  },

  {
    id: "airup",
    title: "AIRUP Bottle Design",
    category: "Product Design",
    image: airupImage,
  },

  {
    id: "coca-cola",
    title: "Coca-Cola Brochure",
    category: "Graphic Design",
    image: cocaColaImage,
  },

  {
    id: "donut",
    title: "The Donut Project",
    category: "3D",
    image: donutImage,
  },
];

// Openable projects (with workflow pages or videos) always sort before card-only entries
export const allProjects = [
  ...featured,
  ...more.filter((p) => "process" in p || "video" in p),
  ...more.filter((p) => !("process" in p) && !("video" in p)),
];
