'use client';
import * as React from 'react';
import Image from 'next/image';
import {
  FaGithub,
  FaEye,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';

function ProjectCard({ project }) {
  // ...existing code...
  const scrollYRef = React.useRef(0);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [isHovered, setHovered] = React.useState(false);
  const [fadeState, setFadeState] = React.useState("fade-in");
  const [progress, setProgress] = React.useState(0);
  const [isClient, setIsClient] = React.useState(false);
  
  const duration = 5000;
  
  React.useEffect(() => {
    setIsClient(true);
  }, []);
  
  const handleImageClick = () => {
    if (typeof window !== 'undefined') {
      window.open(project.images?.[currentImageIndex], '_blank');
    }
  };
  
  const openModal = () => {
    scrollYRef.current = window.scrollY;
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
    setCurrentImageIndex(0); // Reset to first image on open
    setProgress(0);
  };
  
  const closeModal = React.useCallback(() => {
    setModalOpen(false);
    document.body.style.overflow = '';
    setProgress(0);
  }, []);
  
  const nextImage = React.useCallback(() => {
    if (!project.images?.length) return;
    setFadeState("fade-out");
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
      setFadeState("fade-in");
      setProgress(0);
    }, 300);
  }, [project.images?.length]);
  
  const prevImage = React.useCallback(() => {
    if (!project.images?.length) return;
    setFadeState("fade-out");
    setTimeout(() => {
      setCurrentImageIndex((prev) =>
        (prev - 1 + project.images.length) % project.images.length
      );
      setFadeState("fade-in");
      setProgress(0);
    }, 300);
  }, [project.images?.length]);
  
  // Progress bar animation effect
React.useEffect(() => {
  if (!isModalOpen || isHovered || !project.images?.length) return;

  let start = Date.now();
  const interval = setInterval(() => {
    const elapsed = Date.now() - start;
    const percent = Math.min((elapsed / duration) * 100, 100);
    setProgress(percent);
    if (percent >= 100) {
      clearInterval(interval);
      setProgress(0);
      nextImage();
    }
  }, 100); // update every 100ms

  return () => clearInterval(interval);
}, [isModalOpen, isHovered, project.images?.length, currentImageIndex, nextImage]);
  
  // Keyboard navigation effect
  React.useEffect(() => {
    if (!isModalOpen) return;
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') nextImage();
      else if (e.key === 'ArrowLeft') prevImage();
      else if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isModalOpen, nextImage, prevImage, closeModal]);
  
  // ...existing code...

  return (
    <div className="relative rounded-lg border border-[#1b2c68a0] h-full bg-gradient-to-r from-[#0d1224] to-[#0a0d37] w-full overflow-hidden animated-border">
      {/* Modal */}
{isClient && isModalOpen && project.images?.length > 0 && (
  <div
    className="fixed left-0 sm:w-auto w-full z-50 flex justify-center"
    style={{ top: `${scrollYRef.current}px` }}
  >
    <div className="bg-[#1e1e2f] p-4 rounded-lg sm:w-auto max-w-4xl w-full mt-10">
        

              <div className={`relative flex-grow min-h-[50vh] max-h-[60vh] flex items-center justify-center ${fadeState}`} style={{ transition: 'opacity 300ms ease-in-out' }}>
                  <div onClick={handleImageClick}
                        className="absolute inset-0 cursor-pointer z-0"
                      >
                        <Image
                          src={project.images[currentImageIndex]}
                          alt={`${project.name} - Image ${currentImageIndex + 1}`}
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
              <button
                onClick={closeModal}
                className="absolute top-0 right-0 text-pink-500 hover:text-red-400 z-10"
              >
                <FaTimes size={24} />
              </button>
              </div>
              <div>
                <p className=" text-sm mt-2 py-2 text-[#16f2b3] items-center text-center">
                  {project.captions[currentImageIndex]}
                </p>
              </div>

              <div className="w-full h-1.5 mt-4 bg-gray-700 rounded-full overflow-hidden">
                <div
  className="h-full bg-blue-400 rounded-full progress-bar"
  style={{ width: `${progress}%`, transition: 'width 100ms linear' }}
></div>
              </div>

              <div className="flex justify-between items-center mt-4 px-4 ">
                <button onClick={prevImage} className="p-2 text-white hover:text-gray-400">
                  <FaChevronLeft size={24} />
                </button>
                <span className="text-sm text-gray-300">
                  {currentImageIndex + 1} / {project.images.length}
                </span>
                <button onClick={nextImage} className="p-2 text-white hover:text-gray-400">
                  <FaChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
      )}

      {/* Header */}
      <div className="px-4 lg:px-8 py-3 lg:py-5 relative flex items-center justify-center gap-2">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-400"></div>
          <div className="h-3 w-3 rounded-full bg-orange-400"></div>
          <div className="h-3 w-3 rounded-full bg-green-200"></div>
        </div>
        <p className="text-[#16f2b3] text-sm sm:text-base md:text-xl text-center truncate max-w-[50%]">
          {project.name}
        </p>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex space-x-3">
          {project.images?.length > 0 && (
            <button
              onClick={openModal}
              title="View Images"
              className="text-gray-300 hover:text-[#16f2b3] transition"
              aria-label="View project images"
            >
              <FaEye size={16} className="sm:w-4 sm:h-4 md:w-6 md:h-6" />
            </button>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#16f2b3] transition"
              title="GitHub Repo"
              aria-label="View GitHub repository"
            >
              <FaGithub size={16} className="sm:w-4 sm:h-4 md:w-6 md:h-6" />
            </a>
          )}
        </div>
      </div>

      {/* Code Snippet */}
      <div className="overflow-hidden border-t-[2px] border-indigo-900 px-4 lg:px-8 py-4 lg:py-8">
        <code className="font-mono text-sm">
          <div className="">
            <span className="mr-2 text-pink-500">const</span>
            <span className="mr-2 text-white">project</span>
            <span className="mr-2 text-pink-500">=</span>
            <span className="text-gray-400">{'{'}</span>
          </div>
          <div>
            <span className="ml-6 mr-2 text-white">name:</span>
            <span className="text-gray-400">&#39;</span>
            <span className="text-amber-300">{project.name}</span>
            <span className="text-gray-400">&#39;,</span>
          </div>
          <div className="ml-6 mr-2">
            <span className="text-white">tools:</span>
            <span className="text-gray-400"> [&#39;</span>
            {project.tools.map((tag, i) => (
              <React.Fragment key={i}>
                <span className="text-amber-300">{tag}</span>
                {i !== project.tools.length - 1 && <span className="text-gray-400">&#39;, &#39;</span>}
              </React.Fragment>
            ))}
            <span className="text-gray-400">&#39;],</span>
          </div>
          <div>
            <span className="ml-6 mr-2 text-white">myRole:</span>
            <span className="text-orange-400">{project.role}</span>
            <span className="text-gray-400">,</span>
          </div>
          <div className="ml-6 mr-2">
            <span className="text-white">Description:</span>
            <span className="text-cyan-400">{' ' + project.description}</span>
            <span className="text-gray-400">,</span>
          </div>
          <div><span className="text-gray-400">{'}'};</span></div>
        </code>
      </div>

      {/* Bottom Gradient Line */}
      <div className="flex flex-row">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
        <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
      </div>

      {/* Styles */}
      <style jsx>{`
        @keyframes border-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animated-border::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 0.5rem;
          padding: 2px;
          background: linear-gradient(270deg, #16f2b3, #7c3aed, #ec4899, #16f2b3);
          background-size: 300% 300%;
          animation: border-flow 6s ease-in-out infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .fade-in {
          opacity: 1;
          transition: opacity 0.3s ease-in;
        }

        .fade-out {
          opacity: 0;
          transition: opacity 0.3s ease-out;
        }

        .blink {
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default ProjectCard;
