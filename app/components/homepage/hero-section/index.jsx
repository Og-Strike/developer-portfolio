"use client";

import { useCallback } from "react";
import React, { useEffect, useState ,useRef} from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { personalData } from "@/utils/data/personalData";
import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaTelegram } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import Typewriter from "typewriter-effect";
import { useMusicPermission } from "@/app/context/MusicPermissionContext";

function HeroSection() {
  const { allowMusic } = useMusicPermission();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null);

  const tracks = [
    { title: "Next to You", url: "./music/nexttoyou.mp3" },
    { title: "Summer Ghost", url: "./music/summerghost.mp3" },
    { title: "Again", url: "./music/again.mp3" },
  ];

  const currentTrack =
    tracks.length > 0 && currentTrackIndex >= 0 && currentTrackIndex < tracks.length
      ? tracks[currentTrackIndex]
      : null;

  const handlePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  const handleNext = useCallback(() => {
    if (tracks.length === 0) return;
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  }, [tracks.length]);

  const handlePrev = useCallback(() => {
    if (tracks.length === 0) return;
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  }, [tracks.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    audio.src = currentTrack.url;

    if (isPlaying) {
      audio
        .play()
        .catch((err) => {
          console.warn("Autoplay failed:", err);
          setIsPlaying(false);
        });
    }
  }, [currentTrack?.url, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !allowMusic || !currentTrack) return;

    audio.src = currentTrack.url;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => {
        console.warn("Autoplay blocked:", err);
        setIsPlaying(false);
      });
  }, [allowMusic]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => handleNext();
    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [handleNext]);

  return (
    <section className="relative flex flex-col items-center justify-between py-4 lg:py-12">
      <Image
        src="/hero.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute -top-[98px] -z-10"
      />

<div className="grid grid-cols-1 items-center lg:grid-cols-2 lg:gap-12 gap-y-8 ">
  <div className="order-2 lg:order-1 flex flex-col items-center justify-center text-center p-2 pb-20 md:pb-10 sm:pb-2 lg:pt-10">
    <h2 className="text-3xl font-bold leading-10 text-white md:font-extrabold lg:text-[2.6rem] lg:leading-[3.5rem]">
      Hello <span className="wave">👋</span>, 
      This is <br /><span className="text-pink-500">{personalData.name}</span>,
      <br />I'm a&nbsp;<br />
      <div
        className="flex flex-wrap items-center justify-center mt-2"
        style={{ lineHeight: '1.4' }}
      >
        <span className="text-[#16f2b3]">
          <Typewriter
            options={{
              strings: [
                personalData.designation[0],
                personalData.designation[1],
                personalData.designation[2],
                personalData.designation[3],
              ],
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 30,
            }}
          />
        </span>
      </div>
    </h2>

<div className="w-full flex flex-col items-center justify-center text-center gap-8 mt-8">
  {/* Social Icons */}
  <div className="my-6 flex flex-wrap justify-center items-center gap-4">
    <Link
      href={personalData.github}
      target='_blank'
      className="transition-all text-pink-500 hover:scale-125 duration-300"
    >
      <BsGithub size={30} />
    </Link>
    <Link
      href={personalData.linkedIn}
      target='_blank'
      className="transition-all text-pink-500 hover:scale-125 duration-300"
    >
      <BsLinkedin size={30} />
    </Link>
    <Link
      href={personalData.instagram}
      target='_blank'
      className="transition-all text-pink-500 hover:scale-125 duration-300"
    >
      <FaInstagram size={30} />
    </Link>
    <Link
      href={personalData.telegram}
      target='_blank'
      className="transition-all text-pink-500 hover:scale-125 duration-300"
    >
      <FaTelegram size={30} />
    </Link>
  </div>

  {/* Buttons: Stay Side-by-Side, Centered on Small Screens */}
  <div className="flex flex-row flex-wrap justify-center items-center gap-4">
    <Link href="#contact" className="bg-gradient-to-r to-pink-500 from-violet-600 p-[1px] rounded-full transition-all duration-300 hover:from-pink-500 hover:to-violet-600">
      <button className="px-3 text-xs md:px-8 py-3 md:py-4 bg-[#0d1224] rounded-full border-none text-center md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out md:font-semibold flex items-center gap-1 hover:gap-3">
        <span>Contact me</span>
        <RiContactsFill size={16} />
      </button>
    </Link>

    <Link
      className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-3 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold"
      role="button"
      target="_blank"
      href={personalData.resume}
    >
      <span>Get Resume</span>
      <MdDownload size={16} />
    </Link>
  </div>
</div>
</div>
<div className="order-1 lg:order-2 relative rounded-lg">
  {/* Animated Gradient Border Layer */}
  <div className="absolute inset-0 animate-border overflow-hidden rounded-lg border-2 border-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 blur-sm"></div>

  {/* Main Content Layer */}
  <div className="relative z-10 from-[#0d1224] border-[#1b2c68a0] rounded-lg border bg-gradient-to-r to-[#0a0d37]">
    <div className="flex flex-row">
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
      <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
    </div>

    {/* Top bar with dots and music controls */}
    <div className="flex justify-between items-center px-4 lg:px-8 py-5">
      {/* Three dots */}
      <div className="flex flex-row space-x-2">
        <div className="h-3 w-3 rounded-full bg-red-400"></div>
        <div className="h-3 w-3 rounded-full bg-orange-400"></div>
        <div className="h-3 w-3 rounded-full bg-green-200"></div>
      </div>

      {/* Music Title and Controls */}
      <div className="flex items-center space-x-2 text-white text-xs bg-[#0d1224] border border-[#1b2c68a0] rounded-lg px-2 py-1 shadow">
        <span className="text-[#16f2b3] font-semibold truncate max-w-[200px]">
         Playing: {currentTrack?.title || "No Track Playing"}
        </span>
        <button onClick={handlePrev} className="p-1 hover:text-[#16f2b3] transition-colors">
          <SkipBack size={14} />
        </button>
        <button onClick={handlePlayPause} className="p-1 hover:text-[#16f2b3]  transition-colors">
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </button>
        <button onClick={handleNext} className="p-1 hover:text-[#16f2b3] transition-colors">
          <SkipForward size={14} />
        </button>
         <audio 
              ref={audioRef}
              id="hero-audio-player" 
              src={currentTrack.url} 
              loop={false}
              
            />
      </div> 
    </div>
<div className="overflow-hidden px-4 lg:px-8 py-4 lg:py-8 glow-top-border">
      <code className="font-mono text-xs md:text-sm lg:text-base">
        <div className="blink">
          <span className="mr-2 text-pink-500">const</span>
          <span className="mr-2 text-white">coder</span>
          <span className="mr-2 text-pink-500">=</span>
          <span className="text-gray-400">{'{'}</span>
        </div>
        <div>
          <span className="ml-4 lg:ml-8 mr-2 text-white">name:</span>
          <span className="text-gray-400">{`'`}</span>
          <span className="text-amber-300">{personalData.name}</span>
          <span className="text-gray-400">{`',`}</span>
        </div>
        <div className="ml-4 lg:ml-8 mr-2">
          <span className="text-white">skills:</span>
          <span className="text-gray-400">{`['`}</span>
          {personalData.designations.map((designation, index) => (
            <span key={index}>
              <span className="text-amber-300">{designation}</span>
              {index < personalData.designations.length - 1 ? (
                <span className="text-gray-400">{"', '"}</span>
              ) : (
                <span className="text-gray-400">{"'],"}</span>
              )}
            </span>
          ))}
        </div>
        <div>
          <span className="ml-4 lg:ml-8 mr-2 text-white">smartWorker:</span>
          <span className="text-orange-400">true</span>
          <span className="text-gray-400">,</span>
        </div>
        <div>
          <span className="ml-4 lg:ml-8 mr-2 text-white">quickLearner:</span>
          <span className="text-orange-400">true</span>
          <span className="text-gray-400">,</span>
        </div>
        <div>
          <span className="ml-4 lg:ml-8 mr-2 text-white">problemSolver:</span>
          <span className="text-orange-400">true</span>
          <span className="text-gray-400">,</span>
        </div>
        <div>
          <span className="ml-4 lg:ml-8 mr-2 text-green-400">hireable:</span>
          <span className="text-orange-400">function</span>
          <span className="text-gray-400">{'() {'}</span>
        </div>
        <div>
          <span className="ml-8 lg:ml-16 mr-2 text-orange-400">return</span>
          <span className="text-gray-400">{`(`}</span>
        </div>
        <div>
          <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
          <span className="mr-2 text-white">smartWorker</span>
          <span className="text-amber-300">&amp;&amp;</span>
        </div>
        <div>
          <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
          <span className="mr-2 text-white">problemSolver</span>
          <span className="text-amber-300">&amp;&amp;</span>
        </div>
        <div>
          <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
          <span className="mr-2 text-white">{"skills.length"}</span>
          <span className="mr-2 text-amber-300">&gt;=</span>
          <span className="text-orange-400">5</span>
        </div>
        <div>
          <span className="ml-8 lg:ml-16 mr-2 text-gray-400">{`);`}</span>
        </div>
        <div>
          <span className="ml-4 lg:ml-8 text-gray-400">{`};`}</span>
        </div>
        <div>
          <span className="text-gray-400">{`};`}</span>
        </div>
      </code>
    </div>
  </div>
</div>
  </div>

            <style jsx>{`
        .wave {
          animation-name: wave-animation;
          animation-duration: 2.5s;
          animation-iteration-count: infinite;
          transform-origin: 70% 70%;
          display: inline-block;
        }
        
        .flip-container {
          position: relative;
          width: 100%;
          height: 100%;
          perspective: 1000px;
        }
        
        .flip-container.flip {
          animation: flip-animation 1s ease-in-out;
        }
        
        .flip-front, .flip-back {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          backface-visibility: hidden;
        }

@keyframes glowBorderAnimation {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 0%;
  }
  100% {
    background-position: 0% 0%;
  }
}



.glow-top-border {
  position: relative;
  z-index: 0;
}

.glow-top-border::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 1px;
  width: 100%;
  background: linear-gradient(90deg, #ec4899, #8b5cf6, #6366f1, #ec4899);
  background-size: 300% 100%;
  animation: glowBorderAnimation 3s ease-in-out infinite;
  z-index: 1;
}


        
        .flip-front {
          transform: rotateX(0deg);
        }
        
        .flip-back {
          transform: rotateX(180deg);
        }
        
        @keyframes flip-animation {
          0% {
            transform: rotateX(0deg);
          }
          50% {
            transform: rotateX(90deg);
          }
          100% {
            transform: rotateX(0deg);
          }
        }
        
        @keyframes wave-animation {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          30% { transform: rotate(14deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
          60% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }

        @keyframes borderFlow {
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

.animate-border {
  animation: borderFlow 6s linear infinite;
}
      `}</style>
    </section>
  );
}

export default HeroSection;
