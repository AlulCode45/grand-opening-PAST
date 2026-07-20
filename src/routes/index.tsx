import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Scale, Building2, Gavel, MessageSquare, Briefcase, FileCheck2, Users,
  TrendingUp, Landmark, HeartHandshake, GraduationCap, Award, BadgeCheck,
  MapPin, Zap, Phone, Mail, Clock, ArrowRight, Menu, X, ChevronDown,
  Star, MessageCircle, ArrowUp, Sparkles, Play, Send, Calendar, User2,
} from "lucide-react";
import {
  services, gallery, locations, nav,
} from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Grand Opening PAST" },
      { name: "description", content: "Grand Opening in Bandung. Premium tax attorney, corporate tax, litigation, audit and management consulting across 9 offices in Indonesia." },
      { property: "og:title", content: "PT Pusat Andalan Sukses Terpadu" },
      { property: "og:description", content: "Trusted partner for tax attorney, corporate tax, litigation, audit and management consulting." },
      { property: "og:url", content: "/" },
      { property: "og:image", content: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1600&q=80" },,
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "icon", type: "image/png", href: "/Galeri/Logo.png" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LegalService",
        name: "Grand Tax Attorney",
        legalName: "PT Pusat Andalan Sukses Terpadu",
        address: { "@type": "PostalAddress", streetAddress: "Jl. Cemara Boulevard Utara No.94", addressLocality: "Medan", addressCountry: "ID" },
      }),
    }],
  }),
  component: LandingPage,
});

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Scale, Building2, Gavel, MessageSquare, Briefcase, FileCheck2, Users,
  TrendingUp, Landmark, HeartHandshake, GraduationCap, Award, BadgeCheck, MapPin, Zap,
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "glass-dark py-3" : "py-5"}`}>
      <div className="mx-auto max-w-7xl px-5 md:px-8 flex items-center justify-between gap-6">
        <a href="#home" className="flex items-center gap-2.5 shrink-0">
          <div className="h-9 w-9 rounded-xl btn-gold grid place-items-center font-black text-[15px]">G</div>
          <div className="leading-tight">
            <div className="text-white font-bold tracking-tight text-[15px]">GRAND TAX</div>
            <div className="text-gold text-[10px] font-semibold tracking-[0.2em]">ATTORNEY</div>
          </div>
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((n) => (
            <a key={n.label} href={n.href} className="text-white/80 hover:text-gold text-sm font-medium transition-colors">
              {n.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="hidden lg:inline-flex btn-gold btn-gold-hover px-5 py-2.5 rounded-full text-sm font-semibold">
          Book Consultation
        </a>
        <button className="lg:hidden text-white p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mx-5 mt-3 glass-dark rounded-2xl p-5"
          >
            <div className="flex flex-col gap-3">
              {nav.map((n) => (
                <a key={n.label} href={n.href} onClick={() => setOpen(false)}
                  className="text-white/85 hover:text-gold text-sm font-medium py-1.5">{n.label}</a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="btn-gold text-center px-5 py-2.5 rounded-full text-sm font-semibold mt-2">
                Book Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Particles() {
  const dots = Array.from({ length: 22 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${(i * 53) % 100}%`,
            top: `${(i * 37) % 100}%`,
            width: 3 + (i % 4),
            height: 3 + (i % 4),
            background: i % 3 === 0 ? "#FDBA2D" : "rgba(255,255,255,0.4)",
            filter: "blur(0.5px)",
          }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 6 + (i % 5), repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen bg-hero-gradient overflow-hidden pt-15 pb-8">
      <Particles />
      <div className="absolute inset-x-0 top-24 mx-auto w-[600px] h-[600px] bg-gold/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <Reveal>
            {/* Logo */}
          <div
          className="
            w-17 h-17
            rounded-full
            bg-[#F5B300]
            flex
            items-center
            justify-center
            mx-auto
            shadow-[0_0_40px_rgba(245,179,0,.45)]
          "
        >

            <div
              className="
                w-12 h-12
                bg-white
                rounded-full
                flex
                items-center
                justify-center
              "
            >

                <img
                  src="/Galeri/Logo.png"
                  alt="Logo"
                  className="w-10 h-10 object-contain"
                />

            </div>

        </div>
         {/* Nama Perusahaan */}
          <p className="text-gold font-bold uppercase tracking-wide text-lg mt-4 md:text-xl mb-5">
            PT. PUSAT ANDALAN SUKSES TERPADU
          </p>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-gold text-black font-semibold mb-2">
            🎉
            <span>NOW OFFICIALLY OPEN</span>
          </div>

          </Reveal>
<Reveal delay={0.1}>
  <div className="mt-3">

    <h1 className="text-white font-black tracking-tight text-5xl md:text-6xl lg:text-7xl leading-none">
      Grand <span className="gold-gradient-text">Opening</span>
    </h1>

    <h2 className="mt-2 text-gold font-bold text-2xl md:text-3xl lg:text-4xl tracking-wide">
      PT Pusat Andalan Sukses Terpadu
    </h2>

  </div>
</Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-white/35 text-base md:text-lg leading-relaxed max-w-1xl mx-auto">
            Celebrating the launch of our new office in Bandung. Your trusted partner for Tax Attorney, Corporate Tax, Tax Consultation, Business Consulting, Tax Trauma Recovery, and Audit Assistance — delivering integrated legal, financial, and business solutions.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 md:mt-14 grid md:grid-cols-2 gap-6">
          <Reveal>
            <div className="glass-dark rounded-3xl p-8 h-full">
              <div className="flex items-center gap-3 text-gold text-xs font-semibold tracking-[0.2em]">
               <MapPin className="text-gold mt-1" size={16} />
              OUR NEW OFFICE
              </div>
              <p className="mt-2 text-white/70 text-sm leading-relaxed"> 
              Graha DLA, Lantai 2, unit 08, Jl Otto Iskandar Dinata No.392
              </p>
              <p className="mt-2 text-gold/70 text-sm leading-relaxed">
              Bandung Indonesia
              </p>
              <div className="mt-6 grid gap-4 text-white/80 text-sm">
                <div className="flex items-start gap-2"><Phone size={16} className="text-gold mt-0.5 shrink-0" /><span>0811619780</span></div>
                <div className="flex items-start gap-2"><Clock size={16} className="text-gold mt-0.5 shrink-0" /><span>Jumat 7 Agustus | 14:00–17:00</span></div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Tax Attorney", "Tax Consultant", "Management Consultant", "Business Recovery"].map((t) => (
                  <span key={t} className="text-xs font-medium text-gold border border-gold/40 rounded-full px-3 py-1">{t}</span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="glass-dark rounded-3xl p-8 h-full flex flex-col sm:flex-row gap-6 items-center">
              <div className="relative shrink-0">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-gold to-gold-glow blur-md opacity-70" />
                <img
                  src="/Galeri/Profile.jpg"
                  alt="Managing Partner portrait"
                  className="relative w-40 h-52 md:w-44 md:h-56 object-cover rounded-2xl border-2 border-gold"
                  loading="lazy"
                />
              </div>
              <div className="text-center sm:text-left">
                <div className="text-gold text-xs font-semibold tracking-[0.2em]">Founder & CEO</div>
                <h3 className="mt-2 text-white text-2xl font-bold">Jony, SE. SH. M.Si, CA, CPMA, CPHCM, CFrA, CMT, C.Ht</h3>
                <p className="mt-3 text-gold/70 text-sm leading-relaxed">
                Tax Attorney, Tax Consultant, Management Consultant, Corporate Tax Advisor
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function QRSection() {
  return (
    <section className="py-14 bg-white">
      <div className="mx-auto max-w-xl px-5 text-center">
        <Reveal>
          <div className="text-gold text-xs font-bold tracking-[0.25em]">DIGITAL COMPANY PROFILE</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-black tracking-tight">Scan Here</h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Scan this QR code to access our complete company profile, services, and offices directory.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-8 inline-block bg-white rounded-2xl p-4 shadow-soft border border-border">
            <div className="rounded-2xl">
              <img
                src="/Galeri/QRCode.png"
                alt="PT PAST QR code"
                className="block w-48 h-48 object-contain mx-auto"
              />
            </div>
            <div className="mt-4 text-sm font-semibold text-foreground"> 🌐 www.pusatandalan.com</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-28 bg-ink text-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/10 blur-[160px] rounded-full" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-gold text-xs font-bold tracking-[0.25em]">WHAT WE DO</div>
            <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight">Our Professional <span className="gold-gradient-text">Services</span></h2>
          </div>
        </Reveal>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            return (
              <Reveal key={s.title} delay={i * 0.05}>
                <div className="group relative h-full rounded-3xl p-7 bg-ink-2 border border-white/10 overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-gold/20 via-transparent to-transparent" />
                  <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">

                    {/* Logo + Judul */}
                    <div className="flex items-center gap-5">

                      <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0">
                        <img
                          src={s.image}
                          alt={s.title}
                          className="w-14 h-14 object-contain"
                        />
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {s.title}
                        </h3>

                        <p className="mt-1 text-gold font-semibold uppercase tracking-wide text-sm">
                          {s.subtitle}
                        </p>
                      </div>

                    </div>

                    {/* Deskripsi */}
                    <p className="mt-6 text-sm text-white/65 leading-relaxed">
                      {s.desc}
                    </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

function Seminars() {
  const [active, setActive] = useState<null | typeof gallery[number]>(null);
  return (
    <section id="seminars" className="py-28 bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-gold text-xs font-bold tracking-[0.25em]">GALLERY</div>
            <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight">Past Seminars & Activities</h2>
            <p className="mt-4 text-muted-foreground">Explore our previous seminars and educational activities across Indonesia.</p>
          </div>
        </Reveal>
        <div className="mt-14 columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {gallery.map((g, i) => (
            <Reveal key={g.title} delay={(i % 6) * 0.04}>
              <button
                onClick={() => setActive(g)}
                className="group mb-5 block w-full break-inside-avoid overflow-hidden rounded-3xl bg-secondary text-left shadow-soft hover:shadow-gold transition-shadow"
              >
                <div className="overflow-hidden">
                <img
                  src={g.img}
                  alt={g.title}
                  className={`w-full ${
                    i % 3 === 0 ? "h-[430px]" : i % 3 === 1 ? "h-[430px]" : "h-[430px]"
                  } object-contain bg-white group-hover:scale-105 transition-transform duration-500`}
                />
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-base leading-tight">{g.title}</h4>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5"><MapPin size={12} className="text-gold" />{g.location}</div>
                    <div className="flex items-center gap-1.5"><Calendar size={12} className="text-gold" />{g.date}</div>
                    <div className="flex items-center gap-1.5 col-span-2"><User2 size={12} className="text-gold" />{g.speaker}</div>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-md grid place-items-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full rounded-3xl overflow-hidden bg-ink-2 border border-white/10"
            >
              <img src={active.img} alt={active.title} className="w-full max-h-[70vh] object-cover" />
              <div className="p-6 text-white">
                <h3 className="text-xl font-bold">{active.title}</h3>
                <div className="mt-2 text-sm text-white/70 flex flex-wrap gap-4">
                  <span className="flex items-center gap-1.5"><MapPin size={14} className="text-gold" />{active.location}</span>
                  <span className="flex items-center gap-1.5"><Calendar size={14} className="text-gold" />{active.date}</span>
                  <span className="flex items-center gap-1.5"><User2 size={14} className="text-gold" />{active.speaker}</span>
                </div>
              </div>
              <button aria-label="Close" onClick={() => setActive(null)} className="absolute top-4 right-4 h-10 w-10 rounded-full glass-dark text-white grid place-items-center">
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function VideoSection() {
  return (
    <section id="video" className="py-28 bg-ink text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient opacity-60" />
      <div className="relative mx-auto max-w-4xl px-4 md:px-7 text-center">
        <Reveal>
          <div className="text-gold text-xs font-bold tracking-[0.25em]">WATCH</div>
          <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight"> Indonesia Trauma Tax Center</h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-12 relative rounded-3xl overflow-hidden border-2 border-gold shadow-gold">
            <video
              controls
              className="w-full aspect-video bg-black"
            >
              <source src="/Galeri/Video/ittc.mp4" type="video/mp4" />
            </video>
            <div className="pointer-events-none absolute inset-0 grid place-items-center opacity-90 mix-blend-screen">
              <div className="h-20 w-20 rounded-full btn-gold grid place-items-center opacity-0"><Play /></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AboutUs() {
  return (
    <section className="py-28 bg-white">
      <div className="mx-auto max-w-6xl px-5 md:px-8">

        <Reveal>
          <div className="text-center">
            <h2 className="text-4xl font-black">
              About Us & Our Locations
            </h2>

            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Learn more about PT Pusat Andalan Sukses Terpadu and our professional tax and
              management consulting offices across Indonesia.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 rounded-3xl bg-white shadow-xl border border-border p-10">

            {/* Logo */}
            <div className="flex flex-col items-center">

              <img
                src="/Galeri/Logo.png"
                className="w-36"
              />

              <h3 className="mt-6 text-4xl font-black text-center">
                PT Pusat Andalan Sukses Terpadu
              </h3>

              <p className="text-xl text-gold font-semibold">
                Pengacara Pajak
              </p>

            </div>

            {/* Description */}

            <div className="mt-10 text-center space-y-2">

              <h4 className="text-2xl font-bold">
                KANTOR PENGACARA PAJAK
              </h4>

              <h4 className="text-2xl font-bold">
                KONSULTAN PAJAK
              </h4>

              <h4 className="text-2xl font-bold">
                AHLI AUDIT FORENSIK
              </h4>

            </div>

            {/* Founder */}

            <div className="mt-8 text-center">

              <p className="text-gold font-semibold text-lg">
                Jony, SE. SH. M.Si, CA, CPMA, CPHCM, CFrA, CMT, C.Ht®
              </p>

              <div className="mt-3 flex justify-center gap-8 text-muted-foreground flex-wrap">

                <span>
                    📞 HP : 0811619780
                </span>

                <span>
                    ✉ pasncorp.umum@gmail.com
                </span>

              </div>

            </div>

            {/* Divider */}

            <div className="border-t my-10"></div>

            {/* Partner */}

            <h4 className="text-2xl font-bold mb-8">
              Didukung Oleh :
            </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-8 text-center items-center">

              <div>
                <img
                  src="/Galeri/Service2.png"
                  className="h-24 mx-auto object-contain"
                />

                <p className="mt-4 text-sm">
                  Hypno Lawyer
                </p>
              </div>

              <div>
                <img
                  src="/Galeri/ASLF.png"
                  className="h-24 mx-auto object-contain"
                />

                <p className="mt-4 text-sm">
                  Alpha Sonic Law Firm
                </p>
              </div>
              <div>
                <img
                  src="/Galeri/Service4.png"
                  className="h-24 mx-auto object-contain"
                />

                <p className="mt-4 text-sm">
                  Grand Tax Attorney
                </p>
              </div>

              <div>
                <img
                  src="/Galeri/Service5.png"
                  className="h-24 mx-auto object-contain"
                />

                <p className="mt-4 text-sm">
                  Psikolog
                </p>
              </div>

              <div>
                <img
                  src="/Galeri/TraumaCenter.png"
                  className="h-24 mx-auto object-contain"
                />

                <p className="mt-4 text-sm">
                  Indonesia Tax Trauma Center
                </p>
              </div>
              <div>
                <img
                  src="/Galeri/ASLF.png"
                  className="h-24 mx-auto object-contain"
                />

                <p className="mt-4 text-sm">
                  Kurator
                </p>
              </div>
              <div>
                <img
                  src="/Galeri/TraumaCenter.png"
                  className="h-24 mx-auto object-contain"
                />

                <p className="mt-4 text-sm">
                  Mindfulme
                </p>
              </div>

            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}

function Locations() {
  return (
    <section id="locations" className="py-28 bg-secondary">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight">Our Office <span className="gold-gradient-text">Locations</span></h2>
            <p className="mt-4 text-muted-foreground">Visit us at any of our branches across Indonesia for expert tax and management consulting.</p>
          </div>
        </Reveal>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {locations.map((l, i) => (
            <Reveal key={l.city} delay={(i % 3) * 0.05}>
              <div className="group h-full rounded-3xl bg-white p-6 shadow-soft hover:-translate-y-1 hover:shadow-gold transition-all duration-300 border border-transparent hover:border-gold/40">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-gold text-xs font-bold tracking-[0.2em]">INDONESIA</div>
                    <h3 className="mt-1 text-2xl font-bold">{l.city}</h3>
                  </div>
                  <div className="h-11 w-11 rounded-xl bg-secondary grid place-items-center text-gold group-hover:btn-gold transition">
                    <MapPin size={18} />
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{l.address}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(l.address)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-gold transition"
                >
                  Open in Google Maps <ArrowRight size={14} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// function Contact() {
//   return (
//     <section id="contact" className="py-28 bg-white">
//       <div className="mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-2 gap-10">
//         <Reveal>
//           <div>
//             <div className="text-gold text-xs font-bold tracking-[0.25em]">GET IN TOUCH</div>
//             <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight">Book Your <span className="gold-gradient-text">Consultation</span></h2>
//             <p className="mt-4 text-muted-foreground max-w-md">Share a few details and our team will respond within 24 hours.</p>
//             <form
//               onSubmit={(e) => { e.preventDefault(); alert("Thank you — we will contact you shortly."); }}
//               className="mt-8 grid gap-4"
//             >
//               <div className="grid sm:grid-cols-2 gap-4">
//                 <input required placeholder="Full name" className="rounded-2xl border border-border px-4 py-3.5 outline-none focus:border-gold focus:ring-4 focus:ring-gold/15 transition" />
//                 <input required type="email" placeholder="Email address" className="rounded-2xl border border-border px-4 py-3.5 outline-none focus:border-gold focus:ring-4 focus:ring-gold/15 transition" />
//               </div>
//               <input placeholder="Phone / WhatsApp" className="rounded-2xl border border-border px-4 py-3.5 outline-none focus:border-gold focus:ring-4 focus:ring-gold/15 transition" />
//               <textarea required rows={5} placeholder="How can we help?" className="rounded-2xl border border-border px-4 py-3.5 outline-none focus:border-gold focus:ring-4 focus:ring-gold/15 transition resize-none" />
//               <button className="btn-gold btn-gold-hover inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold">
//                 Send Message <Send size={16} />
//               </button>
//             </form>
//           </div>
//         </Reveal>
//         <Reveal delay={0.15}>
//           <div className="rounded-3xl overflow-hidden bg-secondary shadow-soft">
//             <iframe
//               title="Grand Tax Attorney Medan"
//               src="https://www.google.com/maps?q=Medan,Indonesia&output=embed"
//               className="w-full h-72 border-0"
//               loading="lazy"
//             />
//             <div className="p-8">
//               <h3 className="font-bold text-xl">PT Pusat Andalan Sukses Terpadu</h3>
//               <p className="mt-2 text-sm text-muted-foreground">Jl. Cemara Boulevard Utara No.94, Medan</p>
//               <div className="mt-6 grid gap-3 text-sm">
//                 <div className="flex items-center gap-3"><Mail size={16} className="text-gold" /> hello@grandtaxattorney.id</div>
//                 <div className="flex items-center gap-3"><MessageCircle size={16} className="text-gold" /> WhatsApp: +62 812 3456 7890</div>
//                 <div className="flex items-center gap-3"><Clock size={16} className="text-gold" /> Mon–Fri · 08:00–17:00 WIB</div>
//               </div>
//             </div>
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }


function Footer() {
  return (
    <footer className="bg-ink text-white border-t border-white/10 py-10 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[220px] bg-gold/10 blur-[120px] rounded-full" />

      <div className="relative mx-auto max-w-7xl px-5 flex flex-col items-center text-center">

        {/* Logo */}
        <div className="mb-3">
          <div
            className="
              w-16 h-16
              rounded-full
              bg-[#F5B300]
              flex items-center justify-center
              shadow-[0_0_25px_rgba(245,179,0,.35)]
            "
          >
            <div
              className="
                w-11 h-11
                rounded-full
                bg-white
                flex items-center justify-center
              "
            >
              <img
                src="/Galeri/Logo.png"
                alt="Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
          </div>
        </div>

        <h3 className="text-base md:text-lg font-bold tracking-wide">
          PT PUSAT ANDALAN SUKSES TERPADU
        </h3>

        <p className="mt-2 text-xs md:text-sm text-white/60">
          © 2026 PT Pusat Andalan Sukses Terpadu — All rights reserved.
        </p>

      </div>
    </footer>
  );
}
function FloatingUI() {
  const [show, setShow] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 22 });
  useEffect(() => {
    const on = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <>
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-glow to-gold origin-left z-[60]" />
      {/* <a
        href="https://wa.me/628" target="_blank" rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 left-6 z-50 h-14 w-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-soft hover:scale-110 transition"
      >
        <MessageCircle size={26} />
      </a> */}
      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full btn-gold grid place-items-center shadow-gold"
          >
            <ArrowUp size={22} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

function LandingPage() {
  return (
    <main className="bg-white text-foreground overflow-x-hidden">
      {/* <Navbar /> */}
      <Hero />
      <QRSection />
      <Services />
      <Seminars />
      <VideoSection />
      <AboutUs />
      <Locations />
      {/* <Contact /> */}
      <Footer />
      <FloatingUI />
    </main>
  );
}
