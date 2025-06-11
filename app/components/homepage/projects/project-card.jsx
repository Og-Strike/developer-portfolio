'use client';
import * as React from 'react';
import {
  FaGithub,
  FaEye,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';



function ProjectCard({ project }) {
    const handleImageClick = () => {
    // Open image in new tab - we can't set title for direct image URLs
    window.open(project.images[currentImageIndex], '_blank');
  };
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [isHovered, setHovered] = React.useState(false);
  const [fadeState, setFadeState] = React.useState("fade-in");
  const [zoom, setZoom] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const duration = 5000; // 5 seconds

  const openModal = () => {
    setModalOpen(true);
    setProgress(0);
  };

  const closeModal = () => {
    setModalOpen(false);
    setZoom(false);
  };

  const nextImage = () => {
    setFadeState("fade-out");
    setZoom(false);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
      setFadeState("fade-in");
      setProgress(0);
    }, 300);
  };

  const prevImage = () => {
    setFadeState("fade-out");
    setZoom(false);
    setTimeout(() => {
      setCurrentImageIndex((prev) =>
        (prev - 1 + project.images.length) % project.images.length
      );
      setFadeState("fade-in");
      setProgress(0);
    }, 300);
  };

  // Progress bar interval (increments only)
  React.useEffect(() => {
    if (!isModalOpen || isHovered) return;

    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 100, duration));
    }, 100);

    return () => clearInterval(interval);
  }, [isModalOpen, isHovered]);

  // Watch progress to trigger image switch
  React.useEffect(() => {
    if (progress >= duration) {
      setProgress(0);
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }
  }, [progress, project.images.length]);

  // Handle keyboard events
  React.useEffect(() => {
    if (!isModalOpen) return;
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') nextImage();
      else if (e.key === 'ArrowLeft') prevImage();
      else if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isModalOpen]);

  return (
    <div className="relative rounded-lg border border-[#1b2c68a0] h-full bg-gradient-to-r from-[#0d1224] to-[#0a0d37] w-full overflow-hidden animated-border">
      {isModalOpen && (
        <div className="absolute top-0 left-0 w-full h-full z-50 bg-black bg-opacity-70">
          <div className="relative w-full h-full">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1e1e2f] p-2 md:p-4 rounded-lg w-full h-full flex flex-col items-center justify-center">
              {/* Close */}
              <div className="absolute top-4 right-11 z-10">
                <button onClick={closeModal} className="text-pink-500 hover:text-red-400">
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Image + Zoom */}
              <div
                className={`transition-opacity duration-500 ${fadeState} cursor-zoom-in relative`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={handleImageClick}
              >
                <img
                  src={project.images[currentImageIndex]}

                  alt={`project-image-${currentImageIndex}`}
                  className={`max-w-full max-h-[30vh] object-contain rounded transition-transform duration-300 ${zoom ? 'scale-100' : 'scale-100'}`}
                /> 
              </div>

              {/* Caption */}
              {project.captions && (
                <p className="text-gray-300 text-xl mt-1 italic text-center max-w-xl">
                  {project.captions[currentImageIndex]}
                </p>
              )}

              {/* Progress Bar */}
              <div className="w-full h-1 mt-3 bg-gray-700 rounded">
                <div
                  className="h-full bg-blue-400 rounded transition-all"
                  style={{ width: `${(progress / duration) * 100}%` }}
                ></div>
              </div>

              {/* Prev/Next Controls */}
              <div className="flex justify-between items-center mt-4 w-full px-6">
                <button onClick={prevImage} className="text-white hover:text-gray-400 ml-6">
                  <FaChevronLeft size={24} />
                </button>
                <span className="text-sm text-gray-300">
                  {`${currentImageIndex + 1} / ${project.images.length}`}
                </span>
                <button onClick={nextImage} className="text-white hover:text-gray-400 mr-6">
                  <FaChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Header */}
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
            >
              <FaGithub size={16} className="sm:w-4 sm:h-4 md:w-6 md:h-6" />
            </a>
          )}
        </div>
      </div>

      {/* Code Snippet */}
      <div className="overflow-hidden border-t-[2px] border-indigo-900 px-4 lg:px-8 py-4 lg:py-8">
        <code className="font-mono text-sm">
          <div className="blink">
            <span className="mr-2 text-pink-500">const</span>
            <span className="mr-2 text-white">project</span>
            <span className="mr-2 text-pink-500">=</span>
            <span className="text-gray-400">{'{'}</span>
          </div>
          <div>
            <span className="ml-6 mr-2 text-white">name:</span>
            <span className="text-gray-400">'</span>
            <span className="text-amber-300">{project.name}</span>
            <span className="text-gray-400">',</span>
          </div>
          <div className="ml-6 mr-2">
            <span className="text-white">tools:</span>
            <span className="text-gray-400"> ['</span>
            {project.tools.map((tag, i) => (
              <React.Fragment key={i}>
                <span className="text-amber-300">{tag}</span>
                {i !== project.tools.length - 1 && <span className="text-gray-400">', '</span>}
              </React.Fragment>
            ))}
            <span className="text-gray-400">'],</span>
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

      {/* Gradient Line Top */}
      <div className="flex flex-row">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
        <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
      </div>

      {/* Animations */}
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
          transition: opacity 0.5s ease-in;
        }

        .fade-out {
          opacity: 0;
          transition: opacity 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default ProjectCard;
