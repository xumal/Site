import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

const HeroSection: React.FC = () => {
  const fullText = 'Automatize processos, maximize a eficiência e impulsione o crescimento com nossas soluções de IA personalizadas.';
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prevText => prevText + fullText[index]);
        setIndex(prevIndex => prevIndex + 1);
      }, 30); // Adjust typing speed here

      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  const scrollToChatDemo = () => {
    const chatDemoSection = document.getElementById('chat-demo');
    if (chatDemoSection) {
      chatDemoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="section bg-black">
      <div className="container mx-auto text-center py-36">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 animate-on-scroll">
          Transforme sua empresa com <span className="text-gradient">Inteligência Artificial</span>
        </h1>
        <p className="text-xl text-gray-400 mb-12 animate-on-scroll">
          <span className="typewriter">{displayedText}</span>
        </p>
        <div className="flex justify-center space-x-4 animate-on-scroll">
          <Button size="lg">
            Começar Agora
          </Button>
          <Button variant="secondary" size="lg" onClick={scrollToChatDemo}>
            Ver Demonstração
          </Button>
        </div>
        <div className="mt-12 animate-on-scroll">
          <Sparkles className="inline-block h-6 w-6 mr-2 text-primary animate-float" />
          <span className="text-gray-400">Descubra o poder da IA para o seu negócio</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
