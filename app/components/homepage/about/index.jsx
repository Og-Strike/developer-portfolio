"use client";
import Image from "next/image";
import { personalData } from "@/utils/data/personalData";

function AboutSection() {
  return (
    <>
      {/* Divider */}
      <div className="flex justify-center my-4 md:my-6">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="my-8 sm:my-10 md:my-12 lg:my-16 px-4 sm:px-8 relative">
        {/* Vertical Label for Large Screens */}
        <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8">
          <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
            ABOUT ME
          </span>
          <span className="h-36 w-[2px] bg-[#1a1443]"></span>
        </div>

        {/* Horizontal Label for Small Screens */}
        <div className="flex lg:hidden items-center justify-center mb-10">
          <span className="w-16 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] text-white p-2 px-4 text-sm sm:text-base rounded-md mx-3">
            ABOUT ME
          </span>
          <span className="w-16 h-[2px] bg-[#1a1443]"></span>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Text Section */}
          <div className="order-2 lg:order-1">
            <p className="font-medium mb-4 text-[#16f2b3] text-base sm:text-lg lg:text-xl uppercase">
              Who I am?
            </p>

            {personalData.description.split("\n").map((line, index) => (
              <p
                key={index}
                className="about-glow-paragraph text-gray-200 text-xs sm:text-sm md:text-base lg:text-lg text-justify mb-4"
                style={{ lineHeight: "1.6" }}
              >
                {line}
              </p>
            ))}
          </div>

          {/* Animated Profile Image */}
          <div className="flex justify-center order-1 lg:order-2">
            <div className="grayscale-animation-wrapper w-[200px] sm:w-[240px] md:w-[280px] h-[200px] sm:h-[240px] md:h-[280px] rounded-full overflow-hidden">
              <Image
                src={personalData.profile}
                width={280}
                height={280}
                alt="Strike"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Hobbies Section */}
        <div className="mt-16 flex flex-col items-center justify-center gap-6 relative">
          {/* Hobbies Label */}
          <div className="mb-6">
            <span className="hobby-box bg-[#1a1443] text-white text-md sm:text-md font-bold px-6 py-4 rounded-full shadow-lg">
              HOBBIES
            </span>
          </div>

          {/* Hobby Cards */}
          <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row items-center justify-center gap-6">
            {["🎮 Gaming", "🎧 Music", "🖥️ Coding","⛩️ Anime"].map((hobby, index) => (
              <div
                key={index}
                className="hobby-box text-white text-sm sm:text-base font-semibold rounded-full px-6 py-4 shadow-lg z-10 text-center"
              >
                {hobby}
              </div>
            ))}
          </div>
        </div>

        {/* CSS */}
        <style jsx>{`
          .about-glow-paragraph {
            background: linear-gradient(90deg, #f626af, #8228ec, #16f2b3, #f626af);
            background-size: 600% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer 10s ease-in-out infinite alternate;
          }

          @keyframes shimmer {
            0% {
              background-position: 0% center;
            }
            100% {
              background-position: 100% center;
            }
          }

          .grayscale-animation-wrapper {
            animation: grayscaleCycle 4s ease-in-out infinite alternate-reverse;
          }

          @keyframes grayscaleCycle {
            0% {
              filter: grayscale(100%);
              transform: scale(1);
            }
            100% {
              filter: grayscale(0%);
              transform: scale(1.1);
            }
          }

          .hobby-box {
            background: linear-gradient(90deg, #f626af, #8228ec, #16f2b3, #f626af);
            background-size: 400% auto;
            animation: hobbyGlow 6s linear infinite alternate-reverse;
            min-width: 180px;
            max-width: 180px;
            text-align: center;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
          }

          @keyframes hobbyGlow {
            0% {
              background-position: 0% center;
            }
            100% {
              background-position: 100% center;
            }
          }
        `}</style>
      </div>
    </>
  );
}

export default AboutSection;
