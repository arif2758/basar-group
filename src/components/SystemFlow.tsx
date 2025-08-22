import React, { useState } from "react";
import { IconType } from "react-icons";
import {
  FiBook,
  FiHeart,
  FiShoppingBag,
  FiMonitor,
  FiArrowRight,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";

interface FlowStep {
  id: string;
  icon: IconType;
  title: string;
  description: string;
  color: string;
  example: string;
}

interface Outcome {
  icon: IconType;
  label: string;
  description: string;
  color: string;
}

const SystemFlow = () => {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const flowSteps: FlowStep[] = [
    {
      id: "library",
      icon: FiBook,
      title: "Education",
      description: "Learning starts with access to quality resources",
      color: "#0B6E4F",
      example: "Student accesses digital learning resources and books",
    },
    {
      id: "foundation",
      icon: FiHeart,
      title: "Support",
      description: "Scholarships and assistance enable continued growth",
      color: "#2B6CB0",
      example: "Receives scholarship and healthcare support",
    },
    {
      id: "it-park",
      icon: FiMonitor,
      title: "Skills",
      description: "Technology training creates job-ready professionals",
      color: "#8B5CF6",
      example: "Learns web development and digital marketing",
    },
    {
      id: "super-shop",
      icon: FiShoppingBag,
      title: "Enterprise",
      description: "Economic opportunities through local commerce",
      color: "#FFB84D",
      example: "Starts freelancing or joins Super Shop as employee",
    },
  ];

  const outcomes: Outcome[] = [
    {
      icon: FiUsers,
      label: "Community Growth",
      description: "Stronger local networks",
      color: "#0B6E4F",
    },
    {
      icon: FiTrendingUp,
      label: "Economic Impact",
      description: "Sustainable income generation",
      color: "#2B6CB0",
    },
    {
      icon: FiHeart,
      label: "Social Development",
      description: "Improved quality of life",
      color: "#8B5CF6",
    },
  ];

  return (
    <section
      id="system-flow"
      className="section-padding bg-soft-50"
    >
      <div className="max-w-7xl mx-auto container-padding">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold text-gray-900 mb-6">
            How It All Connects
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            A holistic ecosystem where education leads to empowerment, skills
            create opportunities, and commerce sustains community development.
          </p>
        </div>

        {/* Interactive Flow Diagram */}
        <div className="relative mb-16">
          {/* Desktop / Tablet Flow */}
          <div className="hidden md:block">
            {/* Step Circles */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 items-start relative mb-10">
              {flowSteps.map((step) => {
                const IconComponent = step.icon;
                const isActive = activeStep === step.id;

                return (
                  <div
                    key={step.id}
                    className="flex flex-col items-center"
                  >
                    {/* Circle */}
                    <div
                      className={`relative w-20 h-20 lg:w-24 lg:h-24 rounded-full border-4 flex items-center justify-center cursor-pointer transition-all duration-500 hover:scale-110 ${
                        isActive
                          ? "bg-white shadow-2xl transform scale-110"
                          : "bg-white shadow-lg hover:shadow-xl"
                      }`}
                      style={{
                        borderColor: step.color,
                        boxShadow: isActive
                          ? `0 0 30px ${step.color}40`
                          : undefined,
                      }}
                      onMouseEnter={() => setActiveStep(step.id)}
                      onMouseLeave={() => setActiveStep(null)}
                    >
                      <IconComponent
                        className="w-7 h-7 lg:w-8 lg:h-8 transition-colors duration-300"
                        style={{ color: step.color }}
                      />
                    </div>

                    {/* Title + Desc */}
                    <div className="mt-4 text-center px-2">
                      <h3 className="text-base lg:text-lg font-poppins font-semibold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Example Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {flowSteps.map((step) => (
                <div
                  key={step.id}
                  className="p-4 rounded-lg border-2 text-center transition-all duration-300"
                  style={{
                    borderColor: step.color,
                    backgroundColor: `${step.color}10`,
                  }}
                >
                  <p
                    className="text-sm font-medium"
                    style={{ color: step.color }}
                  >
                    {step.example}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Flow */}
          <div className="md:hidden space-y-8">
            {flowSteps.map((step, index) => {
              const IconComponent = step.icon;

              return (
                <div key={step.id} className="flex flex-col space-y-3">
                  <div className="flex items-start space-x-4">
                    <div
                      className="w-14 h-14 rounded-full border-4 flex items-center justify-center bg-white shadow-lg"
                      style={{ borderColor: step.color }}
                    >
                      <IconComponent
                        className="w-6 h-6"
                        style={{ color: step.color }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-poppins font-semibold text-gray-900 mb-1">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 mb-2">{step.description}</p>
                      <div
                        className="p-3 rounded-lg border-2"
                        style={{
                          borderColor: step.color,
                          backgroundColor: `${step.color}10`,
                        }}
                      >
                        <p
                          className="text-sm font-medium"
                          style={{ color: step.color }}
                        >
                          {step.example}
                        </p>
                      </div>
                    </div>
                  </div>
                  {index < flowSteps.length - 1 && (
                    <div className="flex justify-center">
                      <FiArrowRight
                        className="w-5 h-5 rotate-90"
                        style={{ color: step.color }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Outcomes */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h3 className="text-2xl font-poppins font-semibold text-gray-900 text-center mb-8">
            Collective Impact
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {outcomes.map((outcome, index) => {
              const IconComponent = outcome.icon;

              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-lg hover:shadow-md transition-shadow duration-300"
                  style={{ backgroundColor: `${outcome.color}10` }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: outcome.color }}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {outcome.label}
                  </h4>
                  <p className="text-gray-600">{outcome.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemFlow;
