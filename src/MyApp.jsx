import React, { useMemo, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";

/**
 * Kira — Evergreen Portfolio (stable)
 * ----------------------------------
 * • Home page + dedicated /projects/:slug pages
 * • Project pages show big image below title (Combiner uses two portrait images)
 * • Longform sections (Objective/Problem/Approach/Solution/Outcomes/Tools) render when present
 * • TailwindCSS (Evergreen theme)
 */

// ------------------------------
// Content
// ------------------------------
const PROFILE = {
  name: "Kira Schlei",
  role: "Mechatronics @ Waterloo",
  line2: "Battery Systems • Robotics • Simulation",
  location: "Ontario, Canada",
  current: "Electromechanical Battery Engineer Intern @ Generac (Summer 2025)",
  photo: "/me.jpg", // put a file in /public or use an external URL
};

const LINKS = {
  email: "mailto:",
  github: "https://github.com/kschlei",
  linkedin: "https://www.linkedin.com/in/kiraschlei/",
  resume: "#",
};

const PROJECTS = [
  {
    slug: "bess-combiner",
    title: "1500 VDC / 400 A DC Combiner for BESS",
    role: "Mech • Elec • Testing",
    img: "/projects/combiner.jpg",
    gallery: ["/projects/combiner-1.jpg", "/projects/combiner-2.jpg"],
    summary:
      "CSA‑certified (UL 891) HVDC combiner with built‑in safety, isolation, and thermal protection.",
    objective:
      "Design a 1500VDC/400A-rated DC combiner cabinet for battery energy storage systems (BESS) with built-in safety, isolation, and thermal protection features.",
    problem: [
      "Off the shelf DC Combiners did not meet footprint nor cost requirements.",
      "Many introduced excessive voltage drop or thermal hotspots under continuous current.",
    ],
    solution: [
      "Modeled the internal cabinet layout in Creo, including copper bus-bars, contactors, breakers, and fusing.",
      "Designed thermal-efficient copper bus bars (60 × 6.35 mm cross-section) and performed FEA to validate heat dissipation.",
      "Selected components and calculated bus bar spacing, lug torque specs, and voltage clearance to meet UL 891 and UL 9540.",
      "Conducted insulation integrity (hipot) tests across high-voltage paths.",
      "Collaborated with the electrical team to route cable lugs, ensure enclosure IP rating, and pass CSA inspection.",
    ],
    outcome: [
      "Cabinet passed UL 891 certification for switchgear.",
      "Achieved compact layout with 1500VDC continuous rating and 400A current handling.",
      "Enhanced system safety via reliable pre-charge circuit and fault isolation paths.",
    ],
    tools: [
      "Creo",
      "AutoCAD",
      "Ansys Thermal & FEA",
      "CSA/UL Standard Review",
      "High-Voltage Testing",
    ],
    bullets: [
      "CSA‑certified HVDC combiner with safe switching and fault isolation.",
      "Bus‑bar sizing and FEA for 400 A continuous with thermal headroom.",
      "30+ hipot/continuity checks; clear wiring/lug/torque specs.",
    ],
    tags: ["HVDC", "UL 891", "BESS", "Thermal", "Creo", "Ansys"],
  },
  {
    slug: "baja-cvt",
    title: "Baja CVT — Forced‑Air Cooling & Engagement Tuning",
    role: "Mech • R&D • Implementation",
    img: "/projects/baja.jpg",
    summary:
      "Compact ducted flow path to stabilize engagement and reduce slip under heat soak.",
    objective:
      "Improve torque delivery and vehicle responsiveness in the UW Baja SAE vehicle by tuning the CVT for off-road terrain conditions.",
    problem: [
      "Stock CVT setup caused suboptimal performance at low speeds and under load.",
      "Excessive belt slip and inconsistent engagement reduced efficiency and acceleration.",
    ],
    solution: [
      "Modeled the full CVT assembly in SolidWorks, including pulley sheaves and weight geometry.",
      "Researched and modified flyweights (heavier), spring rates (stiffer), and helix angles to alter shift-out behavior.",
      "Collaborated with drivetrain teammates to test engagement curves and belt tensioning during track trials.",
      "Assessed results and iteratively adjusted preload and mass distribution to fine-tune performance.",
    ],
    outcome: [
      "Improved low-end torque transfer and smoother throttle response (decreased ~0.3 seconds).",
      "Achieved more consistent engagement under variable terrain loading.",
      "Reduced belt slip and improved heat management during prolonged operation (housing temp reduced by ~8˚).",
    ],
    tools: [
      "SolidWorks",
      "Engineering Design Calculations",
      "Testing & Validation",
      "Drivetrain Dynamics",
    ],
    bullets: [
      "Smoother low‑end torque transfer; reduced slip after prolonged runs.",
      "Duct geometry clears roll‑cage; quick‑swap serviceability.",
    ],
    tags: ["Baja", "Cooling", "Ducting", "Validation"],

    // ---- NEW: Calculations & Analysis content ----
    analysisTitle: "Calculations and Analysis for CVT",
    analysis: [
      {
        heading: "Primary Clutch",
        paragraphs: [
          "Tuning the CVT to engage at an RPM that matches the engine's torque peak allows efficient power transfer and responsiveness. Based on the CX9 torque curve, this was observed to be ~2800 RPM.",
          "Using this, engagement RPM measured via tachometer was ~3000 RPM. This indicated engagement was slightly higher than the recommended ~2800 RPM and helped explain late torque transfer / poor hill‑climb performance in the 2024 vehicle.",
        ],
        images: [
          "/projects/cvt/CVT2.jpg",
          "/projects/cvt/CVT3.jpg",
        ],
      },
      {
        heading: "Flyweights",
        paragraphs: [
          "Lighter flyweights delay shift‑out (higher engagement RPM) for better acceleration/top speed—good for flat/high‑speed. Heavier flyweights promote earlier engagement, enhancing low‑end torque for climbs—addressing baseline late engagement at ~3650 RPM.",
          "To select a starting weight, centrifugal force balance was used with r = 0.05 m and ω = 376.99 rad/s (from baseline data). Test table indicated 18 g (stock 15 g) as a good starting point for tuning.",
        ],
        images: [
          "/projects/cvt/CVT4.jpg",
        ],
      },
      {
        heading: "Engagement RPM Tracking",
        paragraphs: [
          "During new flyweight tests, the following relationship was used to track updated engine speeds at which the flyweight engages (recorded per test pass).",
        ],
        images: [
          "/projects/cvt/CVT5.jpg",
        ],
      },
      {
        heading: "Primary Spring & Preload",
        paragraphs: [
          "Primary spring stiffness critically affects engagement. A stiffer spring helps hold the engine in its power band by increasing engagement RPM; too soft risks low‑speed power loss. With a 200 lb stock spring, ~220 lb proved a better match for late engagement issues while balancing the new flyweights.",
          "Hooke’s law and adjusted preload were used to size initial conditions and keep forces reasonable while holding the target shift point near ~3600 RPM (from baseline).",
        ],
        images: [
          "/projects/cvt/CVT6.jpg",
        ],
      },
      {
        heading: "Secondary Clutch",
        paragraphs: [
          "Torsional spring preload impacts belt tension and torque transfer; increasing preload increases clamping, reducing slip but raising heat. Overheating was a 2024 issue; we added ducted ventilation to the CVT casing to enable torsion adjustments.",
          "Initial modification was +10–20% torsional stiffness to aid torque transfer, followed by incline testing to balance wear vs. performance. Belt tension was monitored closely—insufficient tension slips; excessive tension accelerates wear and reduces efficiency.",
        ],
      },
    ],
  },
  {
    slug: "rc-f1",
    title: "1/10‑Scale F1 RC — 3D‑Printed Chassis & Control",
    role: "Mech • Elec • Firmware",
    img: "/projects/rc-car.jpg",
    summary:
      "Differential rear axle, nose‑mounted servo, brushless powertrain, Arduino control.",
    objective:
      "Design and build a functional 1/10‑scale Formula 1 RC car from scratch, integrating mechanical design and embedded systems.",
    approach: [
      "Designed a full‑body F1‑style surface model in SolidWorks and 3D printed the frame using PLA and PAHT‑CF materials.",
      "Integrated Arduino‑based control with a Surpass 3650 brushless motor, ESC, LiPo battery, and a PowerHD R12 servo.",
      "Ran SolidWorks Flow Simulation to analyze drag and wake behavior, adjusting aero features based on CFD results.",
      "Tuned steering geometry and mounted a front nose servo with a simplified direct‑link setup.",
    ],
    outcome: [
      "Test system successfully achieved stable driving and remote control through RF system.",
      "Reduced frontal drag by smoothing undertray and nose geometry based on CFD.",
    ],
    tools: [
      "SolidWorks (CAD + CFD)",
      "Arduino (C++)",
      "3D Printing",
      "RC Electronics",
      "Servo Tuning",
    ],
    bullets: [
      "Servo mounts, hex hubs, and battery packaging for low CG & serviceability.",
      "Wiring integration (RX/ESC/telemetry); PLA vs PAHT‑CF stress checks.",
    ],
    // Reverted tags to pre-change set including Brushless
    tags: ["CAD", "3D Print", "Arduino", "RX/TX", "SolidWorks", "CFD", "Aero", "Servo"],
  },
  {
    slug: "ecocar-alt-fuels",
    title: "UWaterloo Alternate Fuels Team — CAN Bus Rerouting",
    role: "Elec • CAN • Harness",
    img: "/projects/ecocar.jpg",
    summary: "Reworked trunk CAN architecture & harness; modeled 3‑axis splices for robust routing",
    // Card bullets stay concise for the grid view
    bullets: [
      "Redesigned trunk CAN; optimized splices & node placement.",
      "Authored CAN docs for 20+ modules (AutoCAD Electrical).",
      "Modeled harness routes & 3‑axis splice blocks (Siemens NX).",
    ],
    // Longform sections for the project page
    objective:
      "Re-architect the trunk-mounted CAN/CAN-FD network for aftermarket controllers (motor control, PDU, HMI) to improve reliability, serviceability, and packaging in a confined space.",
    problem: [
      "Star-like splices and long stubs causing reflections/intermittent comms.",
      "Incomplete/fragmented bus documentation → integration mistakes and slow bring-up.",
      "Tight trunk packaging with poor accessibility, strain relief, and future service paths.",
    ],
    solution: [
      "Redesigned topology to a linear bus with proper 120 Ω end-termination; optimized splice points and connector locations; single-point shield/drain strategy and stub-length limits.",
      "Built system-wide CAN documentation in AutoCAD Electrical for 20+ modules (pin-maps, termination matrix, node IDs, harness labels, bring-up checklist).",
      "Modeled harness routing and 3-axis splice locations in Siemens NX; set bend-radius, clamp/clip positions, and service loops for the trunk architecture.",
    ],
    validation: [
      "SocketCAN + python-can/cantools smoke tests, bus-load profiling, error-frame logging; continuity/impedance checks (TDR where available); oscilloscope decode for bit-timing.",
    ],
    outcome: [
      "Stable comms at target bitrates under nominal and high load; intermittent errors eliminated in soak testing.",
      "Faster integration: clear pin-maps and checklists reduced bring-up time and rework.",
      "Improved serviceability and mechanical robustness (strain relief, labeled harness, accessible splice points).",
      "Single source of truth for CAN adopted by the team.",
    ],
    tools: [
      "Siemens NX (harness routing)",
      "AutoCAD Electrical",
      "Python (python-can, cantools)",
      "SocketCAN (candump, canbusload, cansend)",
      "Wireshark (CAN/CAN-FD)",
      "Oscilloscope",
      "Continuity/TDR tester",
      "Label printer & wiring tooling",
    ],
    tags: ["CAN", "AutoCAD Electrical", "Siemens NX", "Harness", "HMI"],
  },
];

const EXPERIENCE = [
  {
    company: "Generac Industrial Energy",
    title: "Electromechanical Battery Engineer Intern",
    period: "May 2025 – Aug 2025",
    bullets: [
      "HV DC distribution (safe switching, pre‑charge, isolation).",
      "HV schematics, bus‑bar layouts, thermal strategies for 1500 VDC/400 A.",
      "30+ hipot & continuity tests; manufacturing docs.",
    ],
  },
  {
    company: "ATS Corporation – Life Sciences",
    title: "Automation Design Co‑op",
    period: "Sep 2024 – Dec 2024",
    bullets: [
      "Servo/pneumatic/electromagnetic stations for automated assembly.",
      "Three vision inspection systems with sensors/cameras & fixtures.",
    ],
  },
  {
    company: "Vibro Acoustics by Swegon",
    title: "Mechanical Design Engineer Intern",
    period: "Feb 2024 – Apr 2024",
    bullets: [
      "Converted legacy AutoCAD isolators to manufacturable SolidWorks designs with GD&T.",
    ],
  },
];

const SKILLS = {
  Mechanical: [
    "Creo",
    "SolidWorks",
    "Ansys",
    "FEA",
    "Thermal",
    "DFM",
    "GD&T",
    "DFMA",
    "Sheet Metal",
    "Tolerance Stack-ups",
    "Siemens NX",
    "Automotive",
  ],
  Electrical: [
    "HV DC",
    "Wiring & Lugs",
    "Bus Bars",
    "Instrumentation",
    "CAN",
    "Pre-charge & Isolation",
    "Harness Design",
    "Contactors & Breakers",
    "EMI/EMC",
    "AutoCAD Electrical",
    "Altium",
  ],
  "Testing & Validation": [
    "Hipot",
    "Continuity",
    "UL 891 / CSA",
    "Pre-charge & Isolation",
    "Thermal & FEA Correlation",
    "CFD Tuning",
    "Track Testing",
    "CAN Diagnostics",
    "System Bring-Up",
    "Microgrid",
    "Fault Injection",
  ],
};

// ------------------------------
// Dev-time sanity checks (lightweight tests)
// ------------------------------
function validateProjects() {
  if (!(import.meta && import.meta.env && import.meta.env.DEV)) return;
  try {
    console.groupCollapsed("[dev] PROJECTS validation");
    PROJECTS.forEach((p, idx) => {
      console.assert(typeof p.slug === "string" && p.slug.length > 0, `Project[${idx}] missing slug`);
      console.assert(!/\s/.test(p.slug), `Project[${idx}] slug should not contain spaces: "${p.slug}"`);
      console.assert(typeof p.title === "string" && p.title.length > 0, `Project[${idx}] missing title`);
      console.assert(Array.isArray(p.tags), `Project[${idx}] tags must be an array`);
      if (p.tags) p.tags.forEach((t, j) => console.assert(typeof t === "string", `tags[${j}] in Project[${idx}] must be string`));
    });
    console.groupEnd();
  } catch (e) {
    console.error("PROJECTS validation failed", e);
  }
}
validateProjects();

// Dev-time sanity check for SKILLS as lightweight tests
function validateSkills() {
  if (!(import.meta && import.meta.env && import.meta.env.DEV)) return;
  try {
    console.groupCollapsed("[dev] SKILLS validation");
    console.assert(typeof SKILLS === "object" && SKILLS, "SKILLS object missing");
    Object.entries(SKILLS).forEach(([cat, items]) => {
      console.assert(Array.isArray(items), `SKILLS[${cat}] must be an array`);
      items.forEach((s, i) => console.assert(typeof s === "string", `SKILLS[${cat}][${i}] must be string`));
    });
    console.groupEnd();
  } catch (e) {
    console.error("SKILLS validation failed", e);
  }
}
// Ensure Mechanical/Electrical counts match Testing & Validation count during dev
validateSkills();

// ------------------------------
// Icons
// ------------------------------
const Icon = ({ name, className = "w-5 h-5" }) => {
  const paths = {
    github: (
      <path
        fill="currentColor"
        d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12 12 0 0 0 12 .5Z"
      />
    ),
    linkedin: (
      <path
        fill="currentColor"
        d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.5 8.5h4.9V24H.5V8.5Zm7.5 0h4.7v2.1h.07c.65-1.2 2.23-2.47 4.59-2.47 4.91 0 5.82 3.23 5.82 7.43V24h-4.9v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.8-2.65 3.66V24H8V8.5Z"
      />
    ),
    external: (
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m5-3h5v5m0-5L10 14"
      />
    ),
    mail: (
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm0 0 8 6 8-6"
      />
    ),
  };
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="none">
      {paths[name]}
    </svg>
  );
};

const Tag = ({ children }) => (
  <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs text-emerald-200/90 ring-1 ring-emerald-400/20 bg-emerald-900/20">
    {children}
  </span>
);

// ------------------------------
// Pages
// ------------------------------
function HomePage() {
  const initials = useMemo(
    () => PROFILE.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
    []
  );

  return (
    <div className="relative isolate min-h-screen text-emerald-50">{/* isolate fixes overlap stacking issues */}
      {/* Background: evergreen gradient + glows + subtle grid (z behind) */}
      <div className="fixed inset-0 -z-50 bg-gradient-to-br from-emerald-950 via-green-950 to-teal-950" />
      <div className="pointer-events-none fixed inset-0 -z-40 bg-[radial-gradient(75%_50%_at_0%_0%,rgba(16,185,129,0.20),transparent_60%),radial-gradient(60%_45%_at_100%_100%,rgba(52,211,153,0.18),transparent_60%)]" />
      <div className="pointer-events-none fixed inset-0 -z-30 opacity-10 bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* NAVBAR (sticky, like original) */}
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/5 bg-white/5 border-b border-white/10">
        <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <a href="#top" className="font-semibold tracking-tight">Kira</a>
          <div className="flex items-center gap-3 text-sm">
            <a href="#projects" className="hover:underline">Projects</a>
            <a href="#experience" className="hover:underline">Experience</a>
            <a href="#skills" className="hover:underline">Skills</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </div>
        </nav>
      </header>

      {/* HERO (original layout style, green styling) */}
      <section id="top" className="relative z-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Text block (left, spans 2) */}
            <div className="md:col-span-2">
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">{PROFILE.name}</h1>
              <p className="mt-3 text-lg text-emerald-100/90">{PROFILE.role} — {PROFILE.line2}</p>
              <div className="mt-2 text-emerald-200/80 max-w-2xl space-y-3">
                <p>I’m an aspiring vehicle systems and design engineer and Mechatronics student at the University of Waterloo 🤖. I like turning ideas into working, testable hardware—pairing clean design with the tooling, data, and docs to prove it 🛠️📝. I work fast, communicate clearly, and play well with cross-disciplinary teams 🤝.</p>
                <p><strong>Current focus:</strong> ⚡ high-voltage power systems · 📡 CAN/CAN-FD networking · 🌬️ aerodynamic chassis (CAD → CFD → prototype).</p>
                <p><strong>How I work:</strong> design → instrument → validate → iterate, with concise updates and reproducible tests 📈.<br/><strong>What you get:</strong> reliable builds and a teammate who’s coachable, curious, and outcome-driven.</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={LINKS.resume} className="inline-flex items-center gap-2 rounded-2xl bg-emerald-400 text-emerald-950 px-4 py-2 text-sm font-semibold shadow hover:brightness-110">
                  <span>Download Résumé</span>
                  <Icon name="external" className="w-4 h-4" />
                </a>
                <a href={LINKS.github} className="inline-flex items-center gap-2 rounded-2xl ring-1 ring-white/10 px-4 py-2 text-sm hover:bg-white/10">
                  <Icon name="github" />
                  <span>GitHub</span>
                </a>
                <a href={LINKS.linkedin} className="inline-flex items-center gap-2 rounded-2xl ring-1 ring-white/10 px-4 py-2 text-sm hover:bg-white/10">
                  <Icon name="linkedin" />
                  <span>LinkedIn</span>
                </a>
              </div>
              <div className="mt-4 text-sm text-emerald-200/70">
                <span className="mr-3">{PROFILE.current}</span>
                <span>• {PROFILE.location}</span>
              </div>
            </div>

            {/* Portrait / Accent card (right) */}
            <div className="md:col-span-1">
              <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/10 p-2 bg-white/5">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-200/30 via-transparent to-teal-200/30 pointer-events-none" />
                <div className="relative rounded-2xl overflow-hidden">
                  {PROFILE.photo ? (
                    <img src={PROFILE.photo} alt="Portrait" className="w-full aspect-square object-cover" />
                  ) : (
                    <div className="w-full aspect-square bg-gradient-to-br from-emerald-400 to-teal-400 grid place-items-center">
                      <span className="text-4xl font-semibold text-emerald-950">{initials}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT SECTIONS (raised above bg) */}
      <main className="relative z-10">
        {/* Projects */}
        <section id="projects" className="py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Projects</h2>
              <a href="#contact" className="text-sm inline-flex items-center gap-1 hover:underline">Work with me →</a>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {PROJECTS.map((p, i) => (
                <article
                  key={i}
                  className="group relative overflow-hidden rounded-3xl ring-1 ring-white/10 bg-white/5 shadow-sm hover:bg-white/10 transition-colors flex flex-col"
                >
                  <div className="aspect-[16/9] w-full overflow-hidden">
                    {p.img ? (
                      <img
                        src={p.img}
                        alt={`${p.title} — ${p.role}`}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-emerald-300/30 to-teal-300/30" />
                    )}
                  </div>

                  <div className="p-5 pb-8 bg-emerald-950/40 backdrop-blur-sm border-t border-white/10 rounded-b-3xl flow-root">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold leading-tight">{p.title}</h3>
                      <span className="text-xs text-emerald-200/70">{p.role}</span>
                    </div>
                    <p className="mt-2 text-sm text-emerald-100/90">{p.summary}</p>
                    <ul className="mt-3 space-y-1 text-sm text-emerald-100/85">
                      {p.bullets?.map((b, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span aria-hidden="true">🟢</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags?.map((t, j) => (
                        <Tag key={j}>{t}</Tag>
                      ))}
                    </div>
                    <div className="mt-5 flex justify-end">
                      <Link
                        to={`/projects/${p.slug}`}
                        className="inline-flex items-center gap-2 rounded-2xl bg-emerald-400 text-emerald-950 px-4 py-2 text-sm font-semibold shadow hover:brightness-110"
                      >
                        View project
                        <Icon name="external" className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="py-12 sm:py-16 border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Experience</h2>
            <div className="mt-8 space-y-6">
              {EXPERIENCE.map((e, i) => (
                <div key={i} className="rounded-3xl ring-1 ring-white/10 bg-white/5 p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <h3 className="font-semibold leading-tight">{e.title}</h3>
                      <p className="text-sm text-emerald-100/85">{e.company}</p>
                    </div>
                    <span className="text-xs text-emerald-200/70">{e.period}</span>
                  </div>
                  <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-emerald-100/85">
                    {e.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Skills</h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(SKILLS).map(([cat, items]) => (
                <div key={cat} className="rounded-3xl ring-1 ring-white/10 bg-white/5 p-5">
                  <h3 className="font-semibold">{cat}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {items.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-12 sm:py-16 border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Contact</h2>
            <p className="mt-3 text-emerald-100/90 max-w-2xl">Interested in collaborating or chatting about your project? Reach out anytime.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={LINKS.email} className="inline-flex items-center gap-2 rounded-2xl bg-emerald-400 text-emerald-950 px-4 py-2 text-sm font-semibold shadow hover:brightness-110">
                <Icon name="mail" /> Email
              </a>
              <a href={LINKS.github} className="inline-flex items-center gap-2 rounded-2xl ring-1 ring-white/10 px-4 py-2 text-sm hover:bg-white/10">
                <Icon name="github" /> GitHub
              </a>
              <a href={LINKS.linkedin} className="inline-flex items-center gap-2 rounded-2xl ring-1 ring-white/10 px-4 py-2 text-sm hover:bg-white/10">
                <Icon name="linkedin" /> LinkedIn
              </a>
              <a href={LINKS.resume} className="inline-flex items-center gap-2 rounded-2xl ring-1 ring-white/10 px-4 py-2 text-sm hover:bg-white/10">
                <Icon name="external" className="w-4 h-4" /> Résumé
              </a>
            </div>
          </div>
        </section>

        <footer className="py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center text-xs text-emerald-200/60">© {new Date().getFullYear()} {PROFILE.name}. Built with React & Tailwind.</div>
        </footer>
      </main>
    </div>
  );
}

function ProjectPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const p = PROJECTS.find((x) => x.slug === slug);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  if (!p) {
    return (
      <div className="min-h-screen grid place-items-center text-emerald-50">
        <div className="text-center">
          <p className="text-2xl font-semibold">Project not found</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 rounded-2xl bg-emerald-400 text-emerald-950 px-4 py-2 text-sm font-semibold hover:brightness-110"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-emerald-50">
      {/* Background */}
      <div className="fixed inset-0 -z-50 bg-gradient-to-br from-emerald-950 via-green-950 to-teal-950" />

      {/* Project header with mini nav */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/5 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-sm text-emerald-200/85 hover:text-emerald-200">← Back</button>
          <nav className="hidden sm:flex items-center gap-4 text-sm">
            <a href="#overview" className="hover:underline">Overview</a>
            {p.objective ? <a href="#objective" className="hover:underline">Objective</a> : null}
            {p.problem?.length ? <a href="#problem" className="hover:underline">Problem</a> : null}
            {p.approach?.length ? (
              <a href="#approach" className="hover:underline">Approach</a>
            ) : (p.solution?.length ? <a href="#solution" className="hover:underline">Solution</a> : null)}
            {p.validation?.length ? <a href="#validation" className="hover:underline">Validation</a> : null}
            {p.analysis?.length ? <a href="#analysis" className="hover:underline">Analysis</a> : null}
            {p.outcome?.length ? <a href="#results" className="hover:underline">Outcomes</a> : null}
            {p.tools?.length ? <a href="#tech" className="hover:underline">Tools</a> : null}
          </nav>
        </div>
      </header>

      {/* HERO / OVERVIEW */}
      <section id="overview" className="pt-8 sm:pt-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Title & Summary */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{p.title}</h1>
              <p className="mt-2 text-emerald-200/85">{p.role}</p>
              <p className="mt-4 text-emerald-100/90">{p.summary}</p>
              {p.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">{p.tags.map((t, i) => <Tag key={i}>{t}</Tag>)}</div>
              ) : null}
            </div>

            {/* Media below title */}
            {p.slug === 'bess-combiner' && p.gallery?.length >= 2 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {p.gallery.slice(0, 2).map((src, i) => (
                  <div key={i} className="overflow-hidden rounded-3xl ring-1 ring-white/10 bg-white/5">
                    <img
                      src={src}
                      alt={`${p.title} image ${i + 1}`}
                      className="w-full aspect-[5/6] md:aspect-[4/5] object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            ) : (
              p.img && (
                <div className="overflow-hidden rounded-3xl ring-1 ring-white/10 bg-white/5">
                  <img
                    src={p.img}
                    alt={`${p.title} — ${p.role}`}
                    className="w-full aspect-[16/10] md:aspect-[16/9] object-cover"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Longform sections */}
      {(p.objective || (p.problem && p.problem.length) || (p.solution && p.solution.length) || (p.outcome && p.outcome.length) || (p.tools && p.tools.length) || (p.approach && p.approach.length)) && (
        <>
          {p.objective ? (
            <section id="objective" className="py-10 border-t border-white/10">
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-xl font-display font-bold">Objective</h2>
                <p className="mt-3 text-emerald-100/90">{p.objective}</p>
              </div>
            </section>
          ) : null}

          {Array.isArray(p.problem) && p.problem.length ? (
            <section id="problem" className="py-10 border-t border-white/10">
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-xl font-display font-bold">Problem</h2>
                <ul className="mt-4 space-y-2 text-emerald-100/85">
                  {p.problem.map((x, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span aria-hidden="true">⚠️</span>
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ) : null}

          {Array.isArray(p.approach) && p.approach.length ? (
            <section id="approach" className="py-10 border-t border-white/10">
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-xl font-display font-bold">Approach</h2>
                <ul className="mt-4 space-y-2 text-emerald-100/85">
                  {p.approach.map((x, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span aria-hidden="true">🧪</span>
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ) : null}

          {Array.isArray(p.solution) && p.solution.length ? (
            <section id="solution" className="py-10 border-t border-white/10">
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-xl font-display font-bold">Solution</h2>
                <ul className="mt-4 space-y-2 text-emerald-100/85">
                  {p.solution.map((x, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span aria-hidden="true">🛠️</span>
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ) : null}

          {Array.isArray(p.validation) && p.validation.length ? (
            <section id="validation" className="py-10 border-t border-white/10">
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-xl font-display font-bold">Validation</h2>
                <ul className="mt-4 space-y-2 text-emerald-100/85">
                  {p.validation.map((x, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span aria-hidden="true">✅</span>
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ) : null}

          {Array.isArray(p.outcome) && p.outcome.length ? (
            <section id="results" className="py-10 border-t border-white/10">
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-xl font-display font-bold">Outcomes</h2>
                <ul className="mt-4 space-y-2 text-emerald-100/85">
                  {p.outcome.map((x, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span aria-hidden="true">📈</span>
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ) : null}

          {Array.isArray(p.tools) && p.tools.length ? (
            <section id="tech" className="py-10 border-t border-white/10">
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-xl font-display font-bold">Tools</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tools.map((t, i) => <Tag key={i}>{t}</Tag>)}
                </div>
              </div>
            </section>
          ) : null}

          {Array.isArray(p.analysis) && p.analysis.length ? (
            <section id="analysis" className="py-10 border-t border-white/10">
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-xl font-display font-bold">{p.analysisTitle || 'Calculations & Analysis'}</h2>
                <div className="mt-6 space-y-10">
                  {p.analysis.map((blk, i) => (
                    <div key={i}>
                      {blk.heading ? <h3 className="text-lg font-semibold">{blk.heading}</h3> : null}
                      {Array.isArray(blk.paragraphs) && blk.paragraphs.map((para, j) => (
                        <p key={j} className="mt-3 text-emerald-100/90">{para}</p>
                      ))}
                      {Array.isArray(blk.images) && blk.images.length ? (
                        <div className={`mt-4 grid gap-4 ${blk.images.length > 1 ? 'grid-cols-1 sm:grid-cols-2' : ''}`}>
                          {blk.images.map((src, k) => (
                            <figure key={k} className="overflow-hidden rounded-3xl ring-1 ring-white/10 bg-white/5">
                              <img src={src} alt={`${p.title} analysis image ${i + 1}-${k + 1}`} className="w-full aspect-[16/10] md:aspect-[16/9] object-cover" />
                            </figure>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : null}
        </>
      )}

      {/* CONTRIBUTIONS */}
      {p.bullets?.length ? (
        <section id="contrib" className="py-12 border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-display font-bold">Key Contributions</h2>
            <ul className="mt-4 space-y-2 text-emerald-100/85">
            {p.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <span aria-hidden="true">🟢</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          </div>
        </section>
      ) : null}

      {/* LINKS (optional) */}
      {(p.repo || p.demo || p.report) ? (
        <section id="links" className="py-12 border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-display font-bold">Links</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl ring-1 ring-white/10 px-4 py-2 text-sm hover:bg-white/10"><Icon name="github" /> Repository</a>}
              {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl bg-emerald-400 text-emerald-950 px-4 py-2 text-sm font-semibold hover:brightness-110"><Icon name="external" className="w-4 h-4" /> Live demo</a>}
              {p.report && <a href={p.report} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl ring-1 ring-white/10 px-4 py-2 text-sm hover:bg-white/10"><Icon name="external" className="w-4 h-4" /> Report</a>}
            </div>
          </div>
        </section>
      ) : null}

      <footer className="py-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center text-xs text-emerald-200/60">© {new Date().getFullYear()} {PROFILE.name}</div>
      </footer>
    </div>
  );
}

// ------------------------------
// App (Router)
// ------------------------------
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  );
}
