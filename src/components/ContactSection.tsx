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

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
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
    <section id="contact" className="py-20 md:py-32">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-2 block">
            Kontak
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Hubungi Saya
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto"
        >

          {/* INFO */}
          <div className="space-y-4">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <motion.a
                  variants={item}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  key={info.label}
                  href={info.href}
                  className="flex items-center gap-4 p-4 glass rounded-xl transition"
                >
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    <p className="font-medium">{info.value}</p>
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* FORM */}
          <motion.form
            variants={item}
            onSubmit={handleSubmit}
            className="space-y-6 p-6 glass rounded-2xl"
          >

            <InputField label="Nama" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
            <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
            <InputField label="Subjek" name="subject" value={formData.subject} onChange={handleChange} error={errors.subject} />

            <div>
              <label className="text-sm font-medium">Pesan</label>
              <motion.div whileFocus={{ scale: 1.02 }}>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={errors.message ? 'border-destructive' : ''}
                />
              </motion.div>
              {errors.message && (
                <p className="text-xs text-destructive">{errors.message}</p>
              )}
            </div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button type="submit" className="w-full rounded-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    Membuka Email...
                  </>
                ) : (
                  <>
                    <Send className="mr-2" />
                    Kirim via Email
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

/* INPUT COMPONENT */
type InputFieldProps = {
  label: string;
  name: keyof FormData;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
};

function InputField({
  label,
  name,
  value,
  onChange,
  error,
  type = 'text',
}: InputFieldProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <label className="text-sm font-medium">{label}</label>
      <motion.div whileFocus={{ scale: 1.02 }}>
        <Input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className={error ? 'border-destructive' : ''}
        />
      </motion.div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </motion.div>
  );
}