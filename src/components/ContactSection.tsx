import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Nama harus diisi').max(100),
  email: z.string().trim().email('Email tidak valid').max(255),
  subject: z.string().trim().min(1, 'Subjek harus diisi').max(200),
  message: z.string().trim().min(1, 'Pesan harus diisi').max(2000),
});

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'aylakhalifa13@gmail.com',
    href: 'mailto:aylakhalifa13@gmail.com',
  },
  {
    icon: Phone,
    label: 'Telepon',
    value: '+62 896-9973-0733',
    href: 'tel:+6289699730733',
  },
  {
    icon: MapPin,
    label: 'Lokasi',
    value: 'Aceh, Indonesia',
    href: '#',
  },
];

// ANIMATION VARIANTS
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<FormData> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FormData;
        if (field) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const mailtoLink = `mailto:aylakhalifa13@gmail.com?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(
        `Nama: ${formData.name}\nEmail: ${formData.email}\n\nPesan:\n${formData.message}`
      )}`;

      window.location.href = mailtoLink;

      toast({
        title: 'Membuka Email ✉️',
        description: 'Silakan kirim email melalui aplikasi email Anda.',
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast({
        title: 'Gagal',
        description: 'Tidak dapat membuka email client.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-background/50">
      <div className="container mx-auto px-4">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-2 block tracking-wider uppercase text-sm">
            Hubungi Kami
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Mari Berkolaborasi
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Punya ide atau pertanyaan? Saya siap mendengarkan dan membantu Anda.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto"
        >
          {/* INFO CARDS */}
          <div className="space-y-4">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <motion.a
                  variants={item}
                  key={info.label}
                  href={info.href}
                  whileHover={{ 
                    scale: 1.02, 
                    x: 10,
                    backgroundColor: "rgba(var(--primary-rgb), 0.05)",
                    boxShadow: "0 10px 30px -15px rgba(0,0,0,0.2)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-5 p-5 glass border border-white/10 rounded-2xl transition-all duration-300 group"
                >
                  <div className="p-4 rounded-xl bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{info.label}</p>
                    <p className="text-lg font-medium group-hover:text-primary transition-colors">{info.value}</p>
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* FORM */}
          <motion.form
            variants={item}
            onSubmit={handleSubmit}
            className="space-y-6 p-8 glass border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-6">
              <InputField label="Nama Lengkap" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
              <InputField label="Alamat Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
              <InputField label="Subjek" name="subject" value={formData.subject} onChange={handleChange} error={errors.subject} />
              
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1">Pesan</label>
                <motion.div whileFocus={{ scale: 1.01 }}>
                  <Textarea
                    name="message"
                    placeholder="Tulis pesan Anda di sini..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`bg-background/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl ${errors.message ? 'border-destructive' : 'border-white/20'}`}
                  />
                </motion.div>
                {errors.message && (
                  <p className="text-xs text-destructive mt-1 italic">{errors.message}</p>
                )}
              </div>
            </div>

            <motion.div 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                type="submit" 
                className="w-full h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Kirim Pesan Sekarang
                  </>
                )}
              </Button>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}

/* IMPROVED INPUT COMPONENT */
type InputFieldProps = {
  label: string;
  name: keyof FormData;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
};

function InputField({ label, name, value, onChange, error, type = 'text' }: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold ml-1">{label}</label>
      <motion.div 
        whileFocus={{ scale: 1.01 }}
        className="relative group"
      >
        <Input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={`Masukkan ${label.toLowerCase()}...`}
          className={`h-12 bg-background/50 border-white/20 focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl ${error ? 'border-destructive' : 'group-hover:border-primary/50'}`}
        />
      </motion.div>
      {error && <p className="text-xs text-destructive mt-1 italic">{error}</p>}
    </div>
  );
}