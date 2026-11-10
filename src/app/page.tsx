import HomeSchema from "@/components/HomeSchema";
import { ContactForm } from "@/components/ContactForm";
import { Courses } from "@/components/Courses";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { StudentProjects } from "@/components/StudentProjects";
import { Testimonials } from "@/components/Testimonials";
import { VideoCarousel } from "@/components/VideoCarousel";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { WhyGSM } from "@/components/WhyGSM";
import { FloatingActions } from "@/components/FloatingActions";
import { getCourses } from "@/data/courses";

export default async function Home() {
  const courses = await getCourses();

  return (
    <>
      <main>
        <Hero />
        <Courses initialCourses={courses} />
        <WhyGSM />
        <StudentProjects />
        <Stats />
        <Testimonials />
        <VideoCarousel />
        <Gallery />
        <FAQ />
        <ContactForm />
        <WhatsAppCTA />
      </main>

      <Footer />
      <FloatingActions />
      <HomeSchema />
    </>
  );
}
