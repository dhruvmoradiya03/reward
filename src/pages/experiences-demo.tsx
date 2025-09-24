import React from "react";
import Container from "@components/ui/container";
import FeaturedExperiences from "@containers/featured-experiences";

const ExperiencesDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Experiences Demo
          </h1>
          <p className="text-gray-600">
            Responsive design for both web and mobile views
          </p>
        </div>

        {/* Featured Experiences Section */}
        <FeaturedExperiences
          sectionHeading="Featured Experiences"
          className="mb-12"
        />

        {/* Additional Examples */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Limited to 2 experiences */}
          <FeaturedExperiences
            sectionHeading="Top Experiences"
            limit={2}
            className="mb-8"
          />

          {/* Limited to 4 experiences */}
          <FeaturedExperiences
            sectionHeading="Popular Tours"
            limit={4}
            className="mb-8"
          />
        </div>

        {/* Mobile-specific demo */}
        <div className="md:hidden">
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">
              Mobile View Features:
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Horizontal scrollable cards</li>
              <li>• Fixed card width (320px)</li>
              <li>• Vertical card layout (image on top)</li>
              <li>• Scroll indicator at bottom</li>
            </ul>
          </div>
        </div>

        {/* Web-specific demo */}
        <div className="hidden md:block">
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">
              Web View Features:
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 3-column grid layout</li>
              <li>• Vertical card design (image on top)</li>
              <li>• Rounded corners and shadows</li>
              <li>• Hover effects and transitions</li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ExperiencesDemo;
