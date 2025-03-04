import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import QuoteForm from './QuoteForm';

const CTASection: React.FC = () => {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);

  const handleQuoteClick = () => {
    setIsQuoteFormOpen(!isQuoteFormOpen);
  };

  return (
    <section id="cta" className="section bg-black">
      <div className="container mx-auto py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 animate-on-scroll">
          Pronto para Inovar?
        </h2>
        <p className="text-xl text-gray-400 mb-12 animate-on-scroll">
          Entre em contato conosco e descubra como nossas soluções de IA podem transformar sua empresa.
        </p>
        <div className="animate-on-scroll">
          <Button size="lg" onClick={handleQuoteClick}>
            Solicitar Orçamento
          </Button>
        </div>
        {isQuoteFormOpen && (
          <div className="bg-black p-8 rounded-lg mt-4"> {/* Background set to black */}
            <QuoteForm onClose={() => setIsQuoteFormOpen(false)} />
          </div>
        )}
      </div>
    </section>
  );
};

export default CTASection;
