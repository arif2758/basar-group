"use client";

import Hero from "./Hero";

import ImpactStats from "./ImpactStats";
import Programs from "./Programs";
import BeneficiaryStories from "./BeneficiaryStories";
import PhotoGallery from "./PhotoGallery";
import DonorWall from "./DonorWall";
import ContactForm from "./ContactForm";

import AboutBasarFoundation from "./AboutBasarFoundation";
import VolunteerAndPartner from "./VolunteerAndPartner";

function FoundationWrapperClient() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-white transition-colors duration-200">
 
      <Hero />
      <AboutBasarFoundation /> 
      <ImpactStats />
      <Programs />
      <VolunteerAndPartner />
      <BeneficiaryStories />
      <PhotoGallery /> 
      <DonorWall />
      <ContactForm />
     
    </div>
  );
}

export default FoundationWrapperClient;
