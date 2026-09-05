"use client";

import ITHero from "./ITHero";
import ITAbout from "./ITAbout";
import StudentHelpDesk from "./StudentHelpDesk";
import SkillAndCourses from "./SkillAndCourses";
import VirtualTour from "./VirtualTour";
import JobBoard from "./JobBoard";
import EventsAndRegistration from "./EventsAndRegistration";
import AchievementsTimeline from "./AchievementsTimeline";
import GuardianDashboard from "./GuardianDashboard";
import CoWorkingSpace from "./CoWorkingSpace";
import SDG from "./SDG";

import States from "./States";

export default function ITParkWrapperClient() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-white transition-colors duration-200">
   

    <ITHero />

        <States /> 

      <ITAbout />

      <StudentHelpDesk />

      <SkillAndCourses />

      <VirtualTour />

      <JobBoard />

      <EventsAndRegistration />

      <AchievementsTimeline />

      <GuardianDashboard />

      <CoWorkingSpace />

      <SDG />

     
    </div>
  );
}
