import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingInput, FloatingTextarea } from "@/components/ui/floating-input";
import { useState } from "react";
import { toast } from "sonner";

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setSubmitted(true);
  };

  return (
    <div className="container py-8 md:py-12">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
        <h1 className="font-display text-3xl font-bold mb-2">Contact Us</h1>
        <p className="text-muted-foreground mb-10">We'd love to hear from you. Reach out for orders, inquiries, or feedback.</p>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-xl border bg-card p-6 space-y-4">
              {[
                { icon: MapPin, label: "Address", value: "Siddeshwara Global Services, Begur Hobli, 191, 1st Cross Rd, near Govt Society, AECS Layout - A Block, Singasandra, Bengaluru, Karnataka 560068", href: "https://maps.google.com/?q=12.9179,77.6457" },
                { icon: Phone, label: "Phone", value: "+91 98453 29179", href: "tel:+919845329179" },
                { icon: Mail, label: "Email", value: "sgs.blr@outlook.com", href: "mailto:sgs.blr@outlook.com" },
                { icon: Clock, label: "Hours", value: "Mon-Sat: 8:00 AM - 9:00 PM\nSunday: 9:00 AM - 6:00 PM" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <item.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors whitespace-pre-line">{item.value}</a>
                    ) : (
                      <div className="text-sm text-muted-foreground whitespace-pre-line">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/919845329179?text=Hi%2C%20I%20want%20to%20place%20an%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-[hsl(142,70%,45%)] p-4 text-white font-medium hover:opacity-90 transition-opacity"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>

            {/* Google Maps embed */}
            <div className="rounded-xl overflow-hidden border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.094!2d77.6457!3d12.9179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1880a8e4dcd5%3A0x5c1b1c1d7890f7f0!2sSiddeshwara%20Global%20Services!5e0!3m2!1sen!2sin!4v1640000000000"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Store Location"
              />
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6">
            <h3 className="font-display font-bold text-lg mb-4">Send us a Message</h3>
            {submitted ? (
              <div className="py-12 text-center">
                <div className="text-4xl mb-4">✅</div>
                <h4 className="font-display font-bold text-lg">Message Sent!</h4>
                <p className="text-sm text-muted-foreground mt-2">We'll respond within 24 hours.</p>
                <Button variant="outline" className="mt-4" onClick={() => setSubmitted(false)}>Send Another</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                <FloatingInput label="Your Name" required />
                <FloatingInput label="Phone Number" type="tel" required />
                <FloatingInput label="Email" type="email" />
                <FloatingTextarea label="Your message..." required />
                <Button type="submit" className="w-full" size="lg">Send Message</Button>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
