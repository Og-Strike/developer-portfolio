import AboutSection from './components/homepage/about';
import Certifications from './components/homepage/certifications';
import Education from './components/homepage/education';
import Experience from './components/homepage/experience';
import HeroSection from './components/homepage/hero-section';
import Projects from './components/homepage/projects';
import Skills from './components/homepage/skills';
import Achievements from './components/homepage/achivements';

export default async function Home() {

  return (
    
    <div suppressHydrationWarning>
      <>
          <HeroSection />
          <AboutSection />
          <Experience />
          <Skills />
          <Projects />
          <Education />
          <Certifications />
          <Achievements />
        </>
    </div>
  );
}
