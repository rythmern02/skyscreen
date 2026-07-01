/**
 * Single source of truth for SkyScreen marketing content.
 * Copy is original; statistics are illustrative spec figures.
 */

export const NAV_LINKS = [
  { label: "Platform", href: "#what" },
  { label: "Showcase", href: "#showcase" },
  { label: "Technology", href: "#technology" },
  { label: "Industries", href: "#industries" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
] as const;

export type Capability = {
  id: string;
  title: string;
  blurb: string;
  tag: string;
};

export const CAPABILITIES: Capability[] = [
  { id: "led", title: "Drone LED Screen", tag: "Core", blurb: "A flight-grade emissive display engineered to hang stable in open air and stay readable from the ground." },
  { id: "displays", title: "Large Flying Displays", tag: "Format", blurb: "Modular panels scale from intimate rooftop reveals to stadium-grade canvases hundreds of square meters wide." },
  { id: "ooh", title: "Outdoor Advertising", tag: "Reach", blurb: "Place your message above traffic, skylines and crowds - impossible to scroll past, impossible to ignore." },
  { id: "live", title: "Live Streaming", tag: "Real-time", blurb: "Pipe a live feed, a remote speaker or a social wall straight to the sky with sub-second latency." },
  { id: "political", title: "Political Campaigns", tag: "Civic", blurb: "Rally-scale visibility that travels between districts in hours, not weeks of poster runs." },
  { id: "sports", title: "Sports Events", tag: "Energy", blurb: "Aerial replays, score takeovers and sponsor moments that the whole arena - inside and out - can see." },
  { id: "wedding", title: "Wedding Screens", tag: "Personal", blurb: "Float a couple's story above the celebration for a reveal no guest will ever forget." },
  { id: "concert", title: "Concerts", tag: "Stage", blurb: "Extend the stage into the night sky with synchronized visuals that move with the set." },
  { id: "launch", title: "Brand Launches", tag: "Reveal", blurb: "Drop a product into the skyline at the exact second of reveal for a moment built to go viral." },
  { id: "gov", title: "Government Campaigns", tag: "Public", blurb: "Public-service messaging with genuine reach - health, safety and awareness, elevated." },
  { id: "emergency", title: "Emergency Broadcasting", tag: "Critical", blurb: "Rapid-deploy visual alerts and wayfinding above crowds when every second counts." },
];

export type ShowcaseItem = {
  id: string;
  index: string;
  title: string;
  line: string;
  category: string;
  spec: string;
  specLabel: string;
  accent: string;
  img: string;
};

// Forward-looking use cases - what SkyScreen is built to do (not past work).
export const SHOWCASE: ShowcaseItem[] = [
  { id: "s1", index: "01", title: "Reveal it where the world looks up", line: "Drop a product into the skyline at the exact second of launch - a moment built to travel.", category: "Brand Launches", spec: "4K", specLabel: "live content", accent: "#6ea8ff", img: "/images/skyscreen_drone_city_1782918636366.jpg" },
  { id: "s2", index: "02", title: "Turn the night sky into the stage", line: "Extend a concert into the air with visuals synced to every beat of the set.", category: "Concerts", spec: "360°", specLabel: "visibility", accent: "#b07bff", img: "/images/skyscreen_festival_1782918623917.jpg" },
  { id: "s3", index: "03", title: "Own the airspace above the arena", line: "Aerial replays, score takeovers and sponsor moments the whole crowd can see.", category: "Sports", spec: "500m+", specLabel: "viewing radius", accent: "#58e0c0", img: "/images/skyscreen_sports_arena_1782927379286.jpg" },
  { id: "s4", index: "04", title: "A reveal that floats above it all", line: "Lift a couple's story over the celebration for a moment no guest forgets.", category: "Weddings", spec: "Bespoke", specLabel: "every flight", accent: "#ff9d4d", img: "/images/skyscreen_wedding_1782918646023.jpg" },
  { id: "s5", index: "05", title: "Cover a region in a single evening", line: "Move a message between districts in hours, updated live from the ground.", category: "Campaigns", spec: "Live", specLabel: "content updates", accent: "#6ea8ff", img: "/images/skyscreen_drone_city_1782918636366.jpg" },
];

export type GalleryItem = {
  id: string;
  caption: string;
  place: string;
  accent: string;
  img: string;
  h: number;
};

// Illustrative imagery of the technology and the contexts it's built for.
export const GALLERY: GalleryItem[] = [
  { id: "g1", caption: "The LED Display", place: "Up close", accent: "#6ea8ff", img: "/images/ledpanel.jpg", h: 440 },
  { id: "g2", caption: "Concert-scale", place: "Stage visuals", accent: "#b07bff", img: "/images/skyscreen_festival_1782918623917.jpg", h: 300 },
  { id: "g3", caption: "Aerial Platform", place: "The drone rig", accent: "#58e0c0", img: "/images/drone-dark.jpg", h: 360 },
  { id: "g4", caption: "Outdoor Advertising", place: "City-scale", accent: "#ff9d4d", img: "/images/skyscreen_drone_city_1782918636366.jpg", h: 320 },
  { id: "g5", caption: "Stadium Energy", place: "Live crowds", accent: "#6ea8ff", img: "/images/arena2.jpg", h: 460 },
  { id: "g6", caption: "In The Clouds", place: "At altitude", accent: "#58e0c0", img: "/images/drone-clouds.jpg", h: 320 },
  { id: "g7", caption: "Celebrations", place: "Personal moments", accent: "#ff9d4d", img: "/images/skyscreen_wedding_1782918646023.jpg", h: 360 },
  { id: "g8", caption: "Massive Displays", place: "Stage build", accent: "#b07bff", img: "/images/skyscreen_massive_display_1782927585353.jpg", h: 300 },
  { id: "g9", caption: "Brand Launches", place: "Reveal moment", accent: "#6ea8ff", img: "/images/auto.jpg", h: 340 },
  { id: "g10", caption: "Built To Fly", place: "Sky-ready", accent: "#58e0c0", img: "/images/skyscreen_drone_city_1782918636366.jpg", h: 380 },
];

export type TechPart = {
  id: string;
  title: string;
  detail: string;
};

export const TECH_PARTS: TechPart[] = [
  { id: "frame", title: "Carbon Frame", detail: "Aerospace carbon-composite truss keeps the rig rigid and light, so the screen stays flat in gusting wind." },
  { id: "motors", title: "Brushless Motors", detail: "Redundant high-torque motors with per-rotor failover hold a steady hover under full payload." },
  { id: "battery", title: "Power Core", detail: "Hot-swappable high-density cells deliver extended flight windows and clean, flicker-free power to the panel." },
  { id: "led", title: "LED Mesh", detail: "Weather-sealed high-nit modules engineered for daylight legibility and deep night contrast." },
  { id: "gps", title: "RTK GPS", detail: "Centimeter-accurate positioning locks the display to an exact point in the sky and holds it there." },
  { id: "fc", title: "Flight Controller", detail: "A swarm brain coordinates every drone as one body, balancing the load in real time." },
  { id: "stream", title: "Wireless Streaming", detail: "Encrypted low-latency uplink pushes live video and content updates straight to the mesh." },
  { id: "stab", title: "Active Stabilization", detail: "Gimbaled mounts and sensor fusion cancel vibration for a picture that reads razor-sharp from the ground." },
];

export type Stat = {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  decimals?: number;
};

export const STATS: Stat[] = [
  { value: 100000, suffix: "+", label: "Reach potential per hour", prefix: "" },
  { value: 500, suffix: "m+", label: "Engineered viewing radius" },
  { value: 360, suffix: "°", label: "Unobstructed visibility" },
  { value: 99.9, suffix: "%", label: "Target flight stabilization", decimals: 1 },
  { value: 4, suffix: "K", label: "Live content resolution" },
  { value: 0, suffix: "s", label: "Real-time content updates", prefix: "<1" },
];

export const WHY_POINTS = [
  "Outdoor ready",
  "Weather resistant",
  "Live streaming",
  "Energy efficient",
] as const;

export type Industry = {
  id: string;
  name: string;
  line: string;
};

export const INDUSTRIES: Industry[] = [
  { id: "realestate", name: "Real Estate", line: "Sell the skyline from the skyline." },
  { id: "political", name: "Political Campaigns", line: "Cover a region in a single evening." },
  { id: "sports", name: "Sports", line: "Own the airspace above the arena." },
  { id: "entertainment", name: "Entertainment", line: "Turn the night into the stage." },
  { id: "brands", name: "Brands", line: "A launch nobody can scroll past." },
  { id: "government", name: "Government", line: "Public messaging with real reach." },
  { id: "luxury", name: "Luxury Events", line: "An entrance that floats." },
  { id: "automobile", name: "Automobile Launches", line: "Reveal it where the world looks up." },
  { id: "festivals", name: "Festivals", line: "Crowd-scale spectacle, airborne." },
];

export type ProcessStep = {
  no: string;
  title: string;
  detail: string;
};

export const PROCESS: ProcessStep[] = [
  { no: "01", title: "Inquiry", detail: "Tell us the moment you want to own. We scope reach, airspace and ambition." },
  { no: "02", title: "Planning", detail: "Flight paths, timing and safety envelopes mapped against your venue." },
  { no: "03", title: "Design", detail: "Our studio crafts content engineered for altitude and emissive contrast." },
  { no: "04", title: "Permissions", detail: "We handle aviation clearance, NOTAMs and local approvals end to end." },
  { no: "05", title: "Deployment", detail: "Crews stage on site; the mesh calibrates and rehearses the full show." },
  { no: "06", title: "Launch", detail: "The screen lifts. Your moment takes the sky, live and synchronized." },

];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  { q: "How large can the flying screen be?", a: "Our modular panels scale from compact rooftop formats to stadium-grade canvases hundreds of square meters in area. We size the rig to your venue, airspace clearance and the viewing distance you need to dominate." },
  { q: "Is it safe to fly over crowds and events?", a: "Safety is engineered into every layer - redundant motors, per-rotor failover, geofenced flight envelopes and certified pilots. We secure full aviation clearance and operate strictly within approved safety corridors for every deployment." },
  { q: "Can it display a live feed in real time?", a: "Yes. An encrypted low-latency uplink streams live video, remote speakers, social walls or broadcast feeds to the screen with sub-second latency - and content can be swapped instantly mid-flight." },
  { q: "How visible is it from the ground?", a: "The display uses high-nit, weather-sealed LED modules tuned for daylight legibility and deep night contrast, with a practical viewing radius beyond five hundred meters and a full 360° line of sight." },
  { q: "What weather can it operate in?", a: "The system is outdoor-rated and weather-resistant, engineered to hold a stable hover and a flat picture in gusting wind. Final go/no-go is always confirmed against live conditions on the day for safety." },
  { q: "How far in advance should we book?", a: "Lead time depends on airspace and scale, but most campaigns are best secured several weeks out to allow for permissions and content design. Rapid-deploy options are available for time-critical and emergency use." },
];

export const PURPOSE_OPTIONS = [
  "Wedding",
  "Advertising",
  "Government",
  "Concert",
  "Political",
  "Festival",
  "Corporate",
] as const;
