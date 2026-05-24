import { ContactForm } from "@/components/ContactForm";
import { Courses } from "@/components/Courses";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Stats } from "@/components/Stats";
import { StudentProjects } from "@/components/StudentProjects";
import { Testimonials } from "@/components/Testimonials";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { WhyGSM } from "@/components/WhyGSM";
import { FloatingActions } from "@/components/FloatingActions";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Courses />
        <WhyGSM />
        <StudentProjects />
        <Stats />
        <Testimonials />
        <Gallery />
        <FAQ />
        <ContactForm />
        <WhatsAppCTA />
      </main>
      <Footer />
      <FloatingActions />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: "GSM Academy",
            alternateName: "أكاديمية GSM",
            description:
              "أكاديمية تقنية للبرمجة والإلكترونيات والذكاء الاصطناعي للأطفال والشباب",
            url: "https://gsm-academy.com",
            areaServed: "EG",
            inLanguage: "ar",
          }),
        }}
      />
    </>
  );
}
