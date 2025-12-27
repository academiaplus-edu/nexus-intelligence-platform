export interface Post {
  id: string;
  slug: string;
  title: string;
  category: "Academic" | "Industry" | "Policy";
  summary: string;
  fullContent: string;
  isPremium: boolean;
  date: string;
  author: string;
  readTime: string;
}
export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  type: "Consulting" | "Training";
}
export interface PricingTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  cta: string;
}
export const MOCK_POSTS: Post[] = [
  {
    id: "1",
    slug: "global-supply-chain-resilience-2024",
    title: "Global Supply Chain Resilience: 2024 Macro Analysis",
    category: "Industry",
    summary: "An in-depth look at how geopolitical shifts are reshaping maritime trade routes and manufacturing hubs in Southeast Asia.",
    fullContent: "The landscape of global logistics is undergoing a fundamental transformation. As multi-national corporations pivot from 'Just-in-Time' to 'Just-in-Case' inventory models, the role of strategic buffer states has never been more critical. Our analysis shows a 15% increase in throughput for Vietnamese ports compared to Q3 2023. This shift is accompanied by a cooling of traditional trans-Pacific corridors. Executive leaders must evaluate their tier-2 supplier exposure in regions currently experiencing high inflationary pressures.",
    isPremium: true,
    date: "2024-03-15",
    author: "Dr. Elena Vance",
    readTime: "12 min read"
  },
  {
    id: "2",
    slug: "ai-governance-frameworks",
    title: "AI Governance: Navigating New Regulatory Frameworks",
    category: "Policy",
    summary: "Comparing the EU AI Act with emerging guidelines in North America and their impact on corporate R&D budgets.",
    fullContent: "Regulatory compliance is no longer a back-office function but a strategic differentiator. The EU AI Act introduces a risk-based approach that classifies applications into four categories. Organizations utilizing generative models for consumer-facing automation face the highest transparency requirements. Conversely, North American guidelines remain largely voluntary but are rapidly coalescing around safety benchmarks. Companies that proactive align with the stricter standards now will avoid costly pivots in 2025.",
    isPremium: false,
    date: "2024-03-10",
    author: "Marcus Thorne",
    readTime: "8 min read"
  },
  {
    id: "3",
    slug: "sustainable-urban-mobility",
    title: "The Future of Sustainable Urban Mobility",
    category: "Academic",
    summary: "Statistical modeling of micro-mobility integration in dense European metropolitan areas.",
    fullContent: "Urban centers are reaching a breaking point in vehicular congestion. Our latest research indicates that integrated micro-mobility solutions—when paired with high-frequency transit—can reduce inner-city emissions by up to 22%. The challenge lies in the 'last mile' infrastructure. By analyzing 500 million GPS data points from five major cities, we've identified the optimal density for docking stations to maximize commuter conversion. Public-private partnerships are the key to funding these capital-intensive transitions.",
    isPremium: true,
    date: "2024-03-05",
    author: "Prof. Sarah Chen",
    readTime: "15 min read"
  },
  {
    id: "4",
    slug: "energy-grid-decentralization",
    title: "Decentralizing the National Energy Grid",
    category: "Policy",
    summary: "How edge computing and blockchain are enabling peer-to-peer energy trading at scale.",
    fullContent: "The traditional centralized grid is ill-equipped for the surge in intermittent renewable sources. Decentralization offers a path toward both resilience and efficiency. Blockchain-enabled smart contracts allow micro-grids to trade surplus solar energy autonomously. In our pilot study, residential clusters saw a 12% reduction in energy costs when participating in local exchanges. The primary hurdle remains regulatory; existing utility monopolies are slow to adapt to the reality of the prosumer.",
    isPremium: true,
    date: "2024-02-28",
    author: "Jameson Lock",
    readTime: "10 min read"
  }
];
export const MOCK_SERVICES: Service[] = [
  {
    id: "s1",
    title: "Executive Intelligence Briefing",
    description: "Private, high-level analysis tailored to your specific industry vertical and competitive landscape.",
    features: ["Bi-weekly custom reports", "Direct access to lead analysts", "Competitive teardowns", "Quarterly strategy workshop"],
    type: "Consulting"
  },
  {
    id: "s2",
    title: "Corporate Technical Training",
    description: "Equip your R&D and policy teams with the latest methodologies in intelligence gathering and data analysis.",
    features: ["On-site workshops", "Access to proprietary datasets", "Certification program", "Ongoing technical support"],
    type: "Training"
  }
];
export const MOCK_PRICING: PricingTier[] = [
  {
    id: "p1",
    name: "Academic",
    price: "$49",
    description: "For independent researchers and students looking for high-quality data and briefs.",
    features: ["Full access to archive", "Standard research briefs", "Data citations", "Community forum"],
    cta: "Start Free Trial"
  },
  {
    id: "p2",
    name: "Industry",
    price: "$199",
    description: "The gold standard for business professionals and strategic planners.",
    features: ["Everything in Academic", "Executive summaries", "Interactive Excel models", "Priority email support", "Early access to reports"],
    isPopular: true,
    cta: "Get Industry Access"
  },
  {
    id: "p3",
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for large organizations requiring scale and customization.",
    features: ["Everything in Industry", "Custom API integration", "White-label reports", "Dedicated account manager", "On-site consulting"],
    cta: "Contact Sales"
  }
];