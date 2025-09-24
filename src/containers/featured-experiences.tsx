import React from "react";
import SectionHeader from "@components/common/section-header";
import { ROUTES } from "@utils/routes";
import Image from "next/image";
import ConditionalPricing from "../components/pricing/conditional-pricing";

// Experience data interface
interface Experience {
  id: string;
  title: string;
  description: string;
  image: string;
  points: number;
  currency: number;
  slug: string;
  duration?: string;
  location?: string;
}

// Mock experiences data
const mockExperiences: Experience[] = [
  {
    id: "1",
    title: "New York City 90 min Cruise",
    description:
      "Explore NYC's iconic landmarks and soak in breathtaking views of the city in just 90 minutes!",
    image: "/assets/images/experiences/feature-1.png",
    points: 20000,
    currency: 2206,
    slug: "nyc-cruise",
    duration: "90 min",
    location: "New York City",
  },
  {
    id: "2",
    title: "Los Angeles 2 Hour Tour",
    description:
      "Discover the glitz and glamour of Hollywood with a 2-hour guided tour through the stars' favorite spots.",
    image: "/assets/images/experiences/feature-2.png",
    points: 15000,
    currency: 2800,
    slug: "la-tour",
    duration: "2 hours",
    location: "Los Angeles",
  },
  {
    id: "3",
    title: "Chicago Architectural Boat Tour",
    description:
      "Experience the stunning skyline and learn about Chicago's rich architectural history on this 75-minute tour.",
    image: "/assets/images/experiences/chicago-boat.jpg",
    points: 25000,
    currency: 3500,
    slug: "chicago-boat",
    duration: "75 min",
    location: "Chicago",
  },
  {
    id: "4",
    title: "Paris City Walking Tour",
    description:
      "Stroll through the charming streets of Paris and discover hidden gems with our expert local guide.",
    image: "/assets/images/experiences/paris-walking.jpg",
    points: 18000,
    currency: 1950,
    slug: "paris-walking",
    duration: "3 hours",
    location: "Paris",
  },
  {
    id: "5",
    title: "Tokyo Food Experience",
    description:
      "Taste authentic Japanese cuisine and learn about traditional cooking methods in the heart of Tokyo.",
    image: "/assets/images/experiences/tokyo-food.jpg",
    points: 22000,
    currency: 3200,
    slug: "tokyo-food",
    duration: "2.5 hours",
    location: "Tokyo",
  },
];

interface FeaturedExperiencesProps {
  sectionHeading?: string;
  className?: string;
  limit?: number;
}

const FeaturedExperiences: React.FC<FeaturedExperiencesProps> = ({
  sectionHeading = "Featured Experiences",
  className = "mb-12 md:mb-14 xl:mb-16",
  limit = 3,
}) => {
  const experiences = mockExperiences.slice(0, limit);

  return (
    <div className={className}>
      {/* Section Header */}
      <SectionHeader
        sectionHeading={sectionHeading}
        categorySlug={`${ROUTES.PRODUCT}?experiences=true`}
        className="pb-0.5 mb-4 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8"
      />

      {/* Web View - Grid Layout */}
      <div className="hidden md:grid gap-4 xl:gap-6 grid-cols-3">
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>

      {/* Mobile View - Horizontal Scroll */}
      <div className="md:hidden">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {experiences.map((experience) => (
            <div key={experience.id} className="flex-shrink-0 w-80">
              <ExperienceCard experience={experience} />
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-4">
          <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

// Experience Card Component
interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  return (
    <div className="bg-[#F3F3F3] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 p-3">
      {/* Image */}
      <div className="relative h-32 md:h-48 w-full">
        <Image
          src={experience.image}
          alt={experience.title}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 320px, (max-width: 1200px) 33vw, 25vw"
        />
        {/* Duration Badge */}
        {experience.duration && (
          <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 md:px-2 md:py-1 rounded-full">
            {experience.duration}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-base mb-2">
          {experience.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3">{experience.description}</p>

        {/* Location */}
        {experience.location && (
          <div className="flex items-center text-gray-500 text-xs mb-3">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {experience.location}
          </div>
        )}

        {/* Pricing */}
        <ConditionalPricing
          price={experience.currency}
          points={experience.points}
          currency="₹"
          className="text-sm"
        />
      </div>
    </div>
  );
};

export default FeaturedExperiences;
