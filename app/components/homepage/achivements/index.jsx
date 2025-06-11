import AchievementCard from './AchievementCard';
import achievements from '@/utils/data/achievements';

function Achievements() {
  return (
    <div id='achievements' className="relative z-40 border-t my-12 lg:my-24 border-[#25213b]">
      {/* Gradient divider */}
            <div className="w-[100px] h-[100px] bg-violet-100 rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl opacity-20"></div>

      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>
      {/* Title */}
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 m-4 text-xl rounded-md">
            Achievements
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 justify-between">
        {achievements.map((item, i) => (
          <AchievementCard achievement={item} key={i} />
        ))}
      </div>
    </div>
  );
}

export default Achievements;
