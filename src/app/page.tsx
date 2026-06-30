import HomeSchema from "@/components/HomeSchema";
import { ContactForm } from "@/components/ContactForm";
import { Courses } from "@/components/Courses";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
// import { Navbar } from "@/components/Navbar";
import { Stats } from "@/components/Stats";
import { StudentProjects } from "@/components/StudentProjects";
import { Testimonials } from "@/components/Testimonials";
import { VideoCarousel } from "@/components/VideoCarousel";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { WhyGSM } from "@/components/WhyGSM";
import { FloatingActions } from "@/components/FloatingActions";
import { VerifyCertificate } from "@/components/VerifyCertificate";
// import { AdminCertificateUpload } from "@/components/AdminCertificateUpload";

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}

      <main>
        <Hero />
        <Courses />
        <WhyGSM />
        {/* <StudentProjects /> */}
        <Stats />
        <Testimonials />
        <VideoCarousel />
        <Gallery />
        <FAQ />
        <ContactForm />
        <WhatsAppCTA />
        <VerifyCertificate />
        {/* <AdminCertificateUpload /> */}
      </main>

      <Footer />
      <FloatingActions />
      {/* <WhatsAppButton /> */}

      <HomeSchema />
    </>
  );
}