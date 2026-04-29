import { motion } from "framer-motion";
import { CheckCircle, Users, Building2, Award } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="container py-8 md:py-12">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

{/* LEFT — TITLE */}
<div className="max-w-2xl">
  <h1 className="font-display text-3xl md:text-4xl font-bold mb-2 text-primary">
    About Siddeshwara Global Services
  </h1>
  <p className="text-muted-foreground text-base">
    Your trusted partner for quality household and apartment cleaning products
  </p>
</div>

{/* RIGHT — LOGO */}
<div className="flex items-center gap-3">
  <img
    src="/favicon.jpg?v=3"
    alt="Siddeshwara Global Services Logo"
    className="h-16 w-16 md:h-20 md:w-20 rounded-xl object-cover border border-border"
    loading="lazy"
  />
  {/* <div>
    <p className="font-display text-base font-semibold text-primary leading-tight">
      Siddeshwara
    </p>
    <p className="text-sm text-muted-foreground leading-tight">
      Global Services
    </p>
  </div> */}
</div>

</div>
        
        <div className="prose prose-sm max-w-none mb-12">
          <div className="rounded-xl border bg-card p-8 mb-8">
            <h2 className="font-display text-xl font-bold mb-4 mt-0">Our Story</h2>
            <p className="text-muted-foreground">
              Siddeshwara Global Services was founded with a simple mission — to make quality cleaning products accessible and affordable for every household. What started as a small retail shop has grown into a trusted supplier serving hundreds of homes, apartments, and residential societies.
            </p>
            <p className="text-muted-foreground">
              We understand the unique cleaning needs of Indian homes and apartments. That's why we carefully curate our product range to include everything from floor cleaners and mops to hygiene essentials — all from trusted brands at competitive prices.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {[
            { icon: Users, label: "50+", desc: "Happy Customers" },
            { icon: Building2, label: "10+", desc: "Apartments Served" },
            { icon: Award, label: "100+", desc: "Products" },
            { icon: CheckCircle, label: "<1", desc: "Years Experience" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border bg-card p-6 text-center"
            >
              <stat.icon className="mx-auto h-8 w-8 text-primary mb-3" />
              <div className="font-display text-2xl font-bold">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.desc}</div>
            </motion.div>
          ))}
        </div>

        <div className="rounded-xl border bg-card p-8">
          <h2 className="font-display text-xl font-bold mb-4">Our Mission</h2>
          <ul className="space-y-3">
            {[
              "Provide quality cleaning products at affordable prices",
              "Build long-term supply partnerships with apartments and societies",
              "Offer convenient doorstep delivery for local customers",
              "Curate the best products from trusted brands",
              "Deliver excellent customer service and support",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
