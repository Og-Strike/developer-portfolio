// @flow strict
"use client";
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

function AchievementCard({ achievement }) {
  return (
    <div className="relative bg-[#1b203e] rounded-lg p-[2px] h-full group">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-pink-500 via-violet-500 to-[#16f2b3] animate-gradientBlur opacity-70 blur-sm"></div>

      <div className="relative z-10 bg-[#1b203e] rounded-lg p-5 border border-[#1d293a] group-hover:border-[#464c6a] transition-all duration-300 h-full flex flex-col justify-between">
        <div>
          <h3 className="text-[#16f2b3] text-lg font-semibold mb-2">{achievement.title}</h3>
          <p className="text-[#d3d8e8] text-sm mb-4 min-h-[3.5rem]">{achievement.details}</p>
        </div>
        <Link
          href={achievement.link}
          target="_blank"
          className="text-pink-500 text-sm flex items-center gap-1 hover:underline mt-auto"
        >
          View Details <FaArrowRight size={12} />
        </Link>
      </div>
<style jsx>{`
    @keyframes gradientBlur {
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

.animate-gradientBlur {
  background-size: 200% 200%;
  animation: gradientBlur 4s ease infinite;
    `}</style>
    </div>
  );
}

export default AchievementCard;
