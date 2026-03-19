import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Video, Coffee, Rocket, ChevronDown } from 'lucide-react';

export default function AboutSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const stats = [
    { icon: Code2, value: '50+', label: 'Projects Selesai' },
    { icon: Video, value: '100+', label: 'Video Konten' },
    // { icon: Coffee, value: '1000+', label: 'Cangkir Kopi' },
    // { icon: Rocket, value: '5+', label: 'Tahun Pengalaman' },
  ];

  const accordionData = [
    {
      title: "🚀 Passionate Developer",
      content: "Saya adalah seorang Fullstack Web Developer dengan passion yang kuat dalam menciptakan solusi digital yang inovatif.",
      content2: "Dengan pengalaman lebih dari 5 tahun, saya telah membantu berbagai klien dan perusahaan dalam mewujudkan ide-ide mereka menjadi aplikasi web yang powerful. saya selalu haus akan teknologi baru.",
      content3: "saya fokus pada peforma, keamanan, dan pengalaman pengguna (UX) yang luar biasa di setiap baris kode yang saya tulis"
      
    },
    {
      title: "📸 Content Creator",
      content: "Selain coding, saya juga aktif sebagai Content Creator, berbagi pengetahuan tentang pemrograman dan teknologi melalui berbagai platform. Saya percaya bahwa berbagi ilmu adalah cara terbaik untuk terus belajar dan berkembang."
    }
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-2 block uppercase tracking-widest text-sm">Tentang Saya</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Mengenal Lebih Dekat
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Left Side: Visual/Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            <div className="relative group">
              <div className="aspect-square rounded-2xl overflow-hidden glass shadow-card relative z-10">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <span className="text-8xl">👨‍💻</span>
                </div>
              </div>
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 p-4 glass rounded-xl shadow-xl z-20 border border-white/20"
              >
                <p className="font-display font-bold text-2xl text-primary">5+ Tahun</p>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Pengalaman</p>
              </motion.div>
              {/* Background Glow */}
              <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full -z-10" />
            </div>
          </motion.div>

          {/* Right Side: Content & Accordion */}
          <div className="space-y-6">
            <motion.h3 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="font-display text-2xl md:text-3xl font-bold"
            >
              Passionate Developer & <span className="text-primary">Creator</span>
            </motion.h3>

            {/* Accordion Logic */}
            <div className="space-y-3">
              {accordionData.map((item, idx) => (
                <div key={idx} className="border border-primary/10 rounded-xl overflow-hidden glass">
                  <button 
                    onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                    className="w-full p-4 flex justify-between items-center text-left hover:bg-primary/5 transition-colors"
                  >
                    <span className="font-bold text-sm md:text-base">{item.title}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${activeIndex === idx ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-4 pt-0 text-muted-foreground leading-relaxed border-t border-primary/5">
                          {item.content}
                        </div>
                        <div className="p-4 pt-0 text-muted-foreground leading-relaxed border-t border-primary/5">
                          {item.content2}
                        </div>
                        <div className="p-4 pt-0 text-muted-foreground leading-relaxed border-t border-primary/5">
                          {item.content3}
                        </div>
                        
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Stats Grid with Staggered Animation */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-4 glass rounded-xl text-center border border-white/10 shadow-sm hover:shadow-primary/20 hover:border-primary/30 transition-all cursor-default"
                >
                  <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="font-display text-2xl font-bold">{stat.value}</p>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}