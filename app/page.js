
import AboutSection from './components/homepage/about';
import Certifications from './components/homepage/certifications';
import Education from './components/homepage/education';
import Experience from './components/homepage/experience';
import HeroSection from './components/homepage/hero-section';
import Skills from './components/homepage/skills';
import Achievements from './components/homepage/achivements';
import Navbar from './components/navbar';
import Footer from './components/footer';

export default async function Home() {

  return (
    
    <div suppressHydrationWarning>
      <>
          <Navbar/>
          <HeroSection />
          <AboutSection />
          {/* <Experience /> */}
          {/* <Skills />
          <Education /> */}
          {/* <Certifications />
          <Achievements /> */}
          <Footer />
        </>
    </div>
  );
}
