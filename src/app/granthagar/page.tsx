import CallToAction from "./granthagarComponents/CallToAction";
import ComingSoon from "./granthagarComponents/ComingSoon";
import DonorSpotlight from "./granthagarComponents/DonorSpotlight";
import FeaturedBooks from "./granthagarComponents/FeaturedBooks";

import HeroGranthagar from "./granthagarComponents/HeroGranthagar";
import MonthlyQuiz from "./granthagarComponents/MonthlyQuiz";
import Testimonials from "./granthagarComponents/Testimonials";
import TopReaders from "./granthagarComponents/TopReaders";

const GranthagarPage = () => {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-white transition-colors duration-200">
      <div>
        <HeroGranthagar />
        <FeaturedBooks />
        <ComingSoon />
        <div className="bg-slate-50 dark:bg-[#070b14] transition-colors duration-200">
          <DonorSpotlight />
          <TopReaders />
        </div>
        <MonthlyQuiz />
        <Testimonials />
        <CallToAction />
      </div>
    </main>
  );
}; 

export default GranthagarPage;
