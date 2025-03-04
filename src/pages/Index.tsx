import BenefitsSection from "@/components/BenefitsSection";
import ChatDemo from "@/components/ChatDemo";
import CTASection from "@/components/CTASection";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer"; // Import Footer component
import React, { useState } from 'react';

const Index = () => {
  const [initialChatMessage, setInitialChatMessage] = useState<string | undefined>(undefined);

  const handleSolutionClick = (message: string) => {
    setInitialChatMessage(message);
  };

  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <ChatDemo initialMessage={initialChatMessage} />
      <CTASection />
      <Footer onSolutionClick={handleSolutionClick} /> {/* Include Footer component */}
    </>
  );
};

export default Index;
