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
  { id: "ooh", title: "Outdoor Advertising", tag: "Reach", blurb: "Place your message above traffic, skylines and crowds — impossible to scroll past, impossible to ignore." },
  { id: "live", title: "Live Streaming", tag: "Real-time", blurb: "Pipe a live feed, a remote speaker or a social wall straight to the sky with sub-second latency." },
  { id: "political", title: "Political Campaigns", tag: "Civic", blurb: "Rally-scale visibility that travels between districts in hours, not weeks of poster runs." },
  { id: "sports", title: "Sports Events", tag: "Energy", blurb: "Aerial replays, score takeovers and sponsor moments that the whole arena — inside and out — can see." },
  { id: "wedding", title: "Wedding Screens", tag: "Personal", blurb: "Float a couple's story above the celebration for a reveal no guest will ever forget." },
  { id: "concert", title: "Concerts", tag: "Stage", blurb: "Extend the stage into the night sky with synchronized visuals that move with the set." },
  { id: "launch", title: "Brand Launches", tag: "Reveal", blurb: "Drop a product into the skyline at the exact second of reveal for a moment built to go viral." },
  { id: "gov", title: "Government Campaigns", tag: "Public", blurb: "Public-service messaging with genuine reach — health, safety and awareness, elevated." },
  { id: "emergency", title: "Emergency Broadcasting", tag: "Critical", blurb: "Rapid-deploy visual alerts and wayfinding above crowds when every second counts." },
];

export type ShowcaseItem = {
  id: string;
  index: string;
  client: string;
  title: string;
  category: string;
  metric: string;
  metricLabel: string;
  accent: string;
  img: string;
};

export const SHOWCASE: ShowcaseItem[] = [
  { id: "s1", index: "01", client: "Aurora Motors", title: "A skyline reveal for the EV of the year", category: "Automobile Launch", metric: "2.4M", metricLabel: "live impressions", accent: "#6ea8ff", img: "/images/auto.jpg" },
  { id: "s2", index: "02", client: "Meridian Festival", title: "The headliner played to a sky that played back", category: "Concert", metric: "47", metricLabel: "minute aerial set", accent: "#b07bff", img: "/images/concert.jpg" },
  { id: "s3", index: "03", client: "Coastal United", title: "Match day, lifted three hundred meters", category: "Sports", metric: "360°", metricLabel: "arena visibility", accent: "#58e0c0", img: "/images/arena.jpg" },
  { id: "s4", index: "04", client: "House of Lune", title: "A proposal written across the night", category: "Wedding", metric: "1", metricLabel: "unforgettable yes", accent: "#ff9d4d", img: "/images/wedding.jpg" },
  { id: "s5", index: "05", client: "Civic Forward", title: "A message that reached six districts by dusk", category: "Campaign", metric: "640k", metricLabel: "people reached", accent: "#6ea8ff", img: "/images/citynight.jpg" },
];

export type GalleryItem = {
  id: string;
  caption: string;
  place: string;
  accent: string;
  img: string;
  h: number;
};

export const GALLERY: GalleryItem[] = [
  { id: "g1", caption: "Skyline Reveal", place: "Manhattan", accent: "#6ea8ff", img: "/images/skyline.jpg", h: 440 },
  { id: "g2", caption: "Night Concert", place: "Berlin", accent: "#b07bff", img: "/images/artist.jpg", h: 300 },
  { id: "g3", caption: "Arena Takeover", place: "São Paulo", accent: "#58e0c0", img: "/images/arena2.jpg", h: 360 },
  { id: "g4", caption: "Aerial Rig", place: "Field Test", accent: "#6ea8ff", img: "/images/drone-rig.jpg", h: 300 },
  { id: "g5", caption: "Festival Mainstage", place: "Austin", accent: "#ff9d4d", img: "/images/festival.jpg", h: 460 },
  { id: "g6", caption: "Civic Campaign", place: "Toronto", accent: "#58e0c0", img: "/images/city.jpg", h: 320 },
  { id: "g7", caption: "Wedding Reveal", place: "Tuscany", accent: "#ff9d4d", img: "/images/wedding2.jpg", h: 360 },
  { id: "g8", caption: "Brand Drop", place: "Crowd", accent: "#b07bff", img: "/images/crowd.jpg", h: 300 },
  { id: "g9", caption: "Automobile Launch", place: "Coastline", accent: "#6ea8ff", img: "/images/auto2.jpg", h: 340 },
  { id: "g10", caption: "Drone Survey", place: "Altitude", accent: "#58e0c0", img: "/images/drone-field.jpg", h: 380 },
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
  { value: 100000, suffix: "+", label: "Impressions per hour", prefix: "" },
  { value: 500, suffix: "m+", label: "Visible viewing radius" },
  { value: 360, suffix: "°", label: "Unobstructed visibility" },
  { value: 99.9, suffix: "%", label: "Flight stabilization", decimals: 1 },
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
  { no: "07", title: "Delivery", detail: "Capture, analytics and broadcast-grade footage delivered to your team." },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const TESTIMONIALS: Testimonial[] = [
  { quote: "We didn't buy media. We bought the entire skyline for ninety seconds and the city stopped to look.", name: "Elena Vasquez", role: "CMO, Aurora Motors" },
  { quote: "Nothing in our playbook has ever produced reach like this. It felt less like advertising and more like an event.", name: "Marcus Bennett", role: "Head of Brand, Meridian" },
  { quote: "The stabilization is uncanny — from the ground it reads like a screen that simply decided to float.", name: "Priya Nair", role: "Executive Producer, Coastal Live" },
  { quote: "Our campaign reached districts in a single evening that posters wouldn't have touched in a month.", name: "Daniel Cole", role: "Director, Civic Forward" },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  { q: "How large can the flying screen be?", a: "Our modular panels scale from compact rooftop formats to stadium-grade canvases hundreds of square meters in area. We size the rig to your venue, airspace clearance and the viewing distance you need to dominate." },
  { q: "Is it safe to fly over crowds and events?", a: "Safety is engineered into every layer — redundant motors, per-rotor failover, geofenced flight envelopes and certified pilots. We secure full aviation clearance and operate strictly within approved safety corridors for every deployment." },
  { q: "Can it display a live feed in real time?", a: "Yes. An encrypted low-latency uplink streams live video, remote speakers, social walls or broadcast feeds to the screen with sub-second latency — and content can be swapped instantly mid-flight." },
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
