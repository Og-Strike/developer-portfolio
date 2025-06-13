
import { experiences } from "@/utils/data/experience";
import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import lottieFile from "../../../assets/lottie/code.json";
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";
import { FiExternalLink } from "react-icons/fi";

function Experience() {
  return (
    <div id="experience" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit m-4 text-white p-2 px-5 text-xl rounded-md">
            Experiences
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Lottie Animation Container */}
          <div className="flex justify-center items-center lg:justify-center">
            <div className="w-full h-full max-w-md lg:max-h-full">
              <AnimationLottie animationPath={lottieFile} />
            </div>
          </div>

          {/* Experience Cards Container */}
          <div className="flex flex-col gap-6">
            {experiences.map((experience) => (
              <GlowCard key={experience.id} identifier={`experience-${experience.id}`}>
                <div className="p-3 relative z-10">
                  <Image
                    src="/blur-23.svg"
                    alt="Hero"
                    width={1080}
                    height={200}
                    className="absolute bottom-0 opacity-80"
                  />
                  <div className="flex justify-center">
                    <p className="text-xs sm:text-sm text-[#16f2b3]">
                      {experience.duration}
                    </p>
                  </div>
                  <div className="flex items-center gap-x-8 px-3 py-5">
                    <div className="text-violet-500 transition-all duration-300 hover:scale-125">
                      <BsPersonWorkspace size={36} />
                    </div>
                    <div>
                      <p className="lg:text-lg md:text-base mb-2 font-medium uppercase">
                        {experience.title}
                      </p>
                      <div className="flex items-center gap-2 text-sm sm:text-sm ">
                        {experience.link ? (
                          <a
                            href={experience.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-[#16f2b3] text-pink-500 transition-colors z-10"
                            title="Visit"
                          >
                            <span>{experience.company}</span>
                            <FiExternalLink />
                          </a>
                        ) : (
                          <span>{experience.company}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Experience;
