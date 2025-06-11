// @flow strict
"use client";
import Image from 'next/image';
import { FaExternalLinkAlt } from 'react-icons/fa';

function CertificationCard({ certification }) {
  const handleImageClick = () => {
    // Open image in new tab - we can't set title for direct image URLs
    window.open(certification.image, '_blank');
  };

  return (
    <div className="relative bg-[#1b203e] rounded-lg p-[2px] h-full group">
      {/* Horizontal animated gradient border */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#16f2b3] via-violet-500 to-pink-500 animate-horizontalGradient opacity-70 blur-sm"></div>

      <div className="relative z-10 bg-[#1b203e] rounded-lg p-5 border border-[#1d293a] group-hover:border-[#464c6a] transition-all duration-300 h-full flex flex-col justify-between">
        {/* Image with hover tooltip */}
        <div 
          className="relative h-56 w-full rounded-md overflow-hidden mb-3 cursor-pointer" 
          onClick={handleImageClick}
          title={`${certification.title} - Click to view full image`}
        >
          <Image
            src={certification.image}
            height={1080}
            width={1920}
            alt={certification.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Certificate link with tooltip */}
          <a
            href={certification.link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-2 right-2 bg-gradient-to-br from-[#16f2b3] to-pink-500 p-2 rounded-full text-white shadow-md hover:scale-105 transition"
            onClick={(e) => e.stopPropagation()}
            title="View official certificate"
          >
            <FaExternalLinkAlt size={14} />
          </a>
        </div>

        {/* Certification details */}
        <div>
          <h3 className="text-[#16f2b3] text-lg font-semibold mb-1">{certification.title}</h3>
          <p className="text-sm text-[#d3d8e8]">{`Issued by: ${certification.issuer}`}</p>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes horizontalGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-horizontalGradient {
          background-size: 200% 200%;
          animation: horizontalGradient 4s ease infinite;
        }
      `}</style>
    </div>
  );
}

export default CertificationCard;