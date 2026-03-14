import { motion } from "framer-motion";
import { Building2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const BulkOrdersPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Bulk order inquiry submitted! We'll contact you within 24 hours.");
    setSubmitted(true);
  };

  return (
    <div className="container py-8 md:py-12">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="h-8 w-8 text-primary" />
            <h1 className="font-display text-3xl font-bold">Bulk Orders & Apartment Supply</h1>
          </div>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            We supply cleaning products in bulk to apartments, residential societies, and commercial establishments. Get special pricing for regular monthly orders.
          </p>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="rounded-xl border bg-card p-6">
                <h3 className="font-display font-bold text-lg mb-4">What We Offer</h3>
                <ul className="space-y-3">
                  {[
                    "Monthly supply contracts for apartments",
                    "Special bulk pricing with up to 25% discount",
                    "Customized cleaning kits for societies",
                    "Free delivery for bulk orders",
                    "Dedicated account manager",
                    "Flexible payment terms",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-primary/5 border border-primary/20 p-6">
                <h3 className="font-display font-bold text-lg mb-2">Serving 50+ Apartments</h3>
                <p className="text-sm text-muted-foreground">
                  We are proud to serve over 50 apartment complexes and residential societies across Bangalore with regular monthly cleaning supply contracts.
                </p>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6">
              <h3 className="font-display font-bold text-lg mb-4">Request a Bulk Order Quote</h3>
              {submitted ? (
                <div className="py-12 text-center">
                  <CheckCircle className="mx-auto h-12 w-12 text-primary mb-4" />
                  <h4 className="font-display font-bold text-lg">Thank You!</h4>
                  <p className="text-sm text-muted-foreground mt-2">We'll reach out to you within 24 hours.</p>
                  <Button variant="outline" className="mt-4" onClick={() => setSubmitted(false)}>Submit Another</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input placeholder="Organization / Society Name" required />
                  <Input placeholder="Contact Person Name" required />
                  <Input placeholder="Phone Number" type="tel" required />
                  <Input placeholder="Email" type="email" required />
                  <Input placeholder="Number of Units / Flats" type="number" />
                  <Textarea placeholder="Describe your requirements (products needed, frequency, etc.)" rows={4} required />
                  <Button type="submit" className="w-full" size="lg">Submit Inquiry</Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BulkOrdersPage;
