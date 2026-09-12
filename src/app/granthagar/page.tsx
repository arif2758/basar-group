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
    <div className="min-h-screen text-slate-900 dark:text-white transition-colors duration-200">
      <div>
        <HeroGranthagar />
        <FeaturedBooks />
        <ComingSoon />
        <div className="transition-colors duration-200">
          <DonorSpotlight />
          <TopReaders />
        </div>
        <MonthlyQuiz />
        <Testimonials />
        <CallToAction />
      </div>
    </div>
  );
}; 

export default GranthagarPage;
