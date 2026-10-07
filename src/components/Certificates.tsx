import { motion } from "framer-motion";
import { Award, BadgeCheck, Calendar, ExternalLink } from "lucide-react";
import certificateWeb from "@/assets/certificate-webdev.webp";
import certificateTypeScript from "@/assets/certificate-typescript.webp";

const certificates = [
  {
    image: certificateWeb,
    alt: "Complete Web Development Course certificate awarded to Maruf Hasan by Programming Hero",
    title: "Complete Web Development Course",
    issuer: "Programming Hero",
    date: "Jan – Jun 2026",
    credential: "WEB13-1366",
    href: undefined,
  },
  {
    image: certificateTypeScript,
    alt: "TypeScript Variables and Data Types certificate awarded to Maruf Hasan by Coursera",
    title: "TypeScript Variables and Data Types",
    issuer: "Coursera Project Network",
    date: "Sep 7, 2026",
    credential: "92IBJ0Y5OAA8",
    href: "https://coursera.org/verify/92IBJ0Y5OAA8",
  },
];

const Certificates = () => (
  <section id="certificates" className="py-12 md:py-14 relative">
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-7"
      >
        <span className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground tracking-widest uppercase">
          <Award className="w-4 h-4 text-glow-violet" /> Certificates &amp; Achievements
        </span>
        <h2 className="heading-section mt-3">Verified <span className="text-gradient-cyan-violet">credentials</span></h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
        {certificates.map((certificate, index) => {
          const Wrapper = certificate.href ? motion.a : motion.div;
          const linkProps = certificate.href
            ? { href: certificate.href, target: "_blank", rel: "noopener noreferrer" }
            : {};

          return (
            <Wrapper
              key={certificate.title}
              {...linkProps}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.55 }}
              whileHover={{ y: -4 }}
              className="glass-panel-hover rounded-xl overflow-hidden group"
            >
              <div className="relative aspect-[16/9] bg-muted/30 overflow-hidden">
                <img
                  src={certificate.image}
                  alt={certificate.alt}
                  width={1120}
                  height={866}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-[1.015]"
                />
                <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full glass-panel px-2.5 py-1 text-[10px] font-medium">
                  <BadgeCheck className="w-3.5 h-3.5 text-glow-cyan" /> Verified
                </span>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold leading-snug">{certificate.title}</h3>
                    <p className="text-sm text-glow-cyan mt-1">{certificate.issuer}</p>
                  </div>
                  {certificate.href && <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-muted-foreground font-mono">
                  <span className="inline-flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{certificate.date}</span>
                  <span>ID: {certificate.credential}</span>
                </div>
              </div>
            </Wrapper>
          );
        })}
      </div>
    </div>
  </section>
);

export default Certificates;