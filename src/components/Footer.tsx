import React, { useState } from 'react';
import QuoteForm from './QuoteForm';

interface FooterProps {
  onSolutionClick: (message: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onSolutionClick }) => {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);

  const handleSolutionClick = (event: React.MouseEvent, message: string) => {
    event.preventDefault();
    onSolutionClick(message);
    const chatDemoSection = document.getElementById('chat-demo');
    if (chatDemoSection) {
      chatDemoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuoteClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsQuoteFormOpen(!isQuoteFormOpen);
  };

  return (
    <footer className="bg-black text-gray-400 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <p>xumalAI</p>
          <p>Transformando negócios com soluções de Inteligência Artificial de ponta.</p>
        </div>
        <div>
          <h4 className="font-semibold">Soluções</h4>
          <ul>
            <li>
              <a href="#chat-demo" onClick={(e) => handleSolutionClick(e, "Quero melhorar minhas vendas.")}>Chatbots</a>
            </li>
            <li>
              <a href="#chat-demo" onClick={(e) => handleSolutionClick(e, "Preciso melhorar o suporte ao cliente.")}>Automação</a>
            </li>
            <li>
              <a href="#chat-demo" onClick={(e) => handleSolutionClick(e, "Quero aumentar a geração de leads.")}>IA para Vendas</a>
            </li>
            <li>
              <a href="#chat-demo" onClick={(e) => handleSolutionClick(e, "Como posso otimizar o departamento de RH?")}>IA para RH</a>
            </li>
            <li>
              <a href="#" onClick={handleQuoteClick}>Solicitar Orçamento</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Contato</h4>
          <p>comercial@xumal.com.br</p>
          <p>+55 (11) 95253-6112</p>
          <p>São Paulo, SP - Brasil</p>
        </div>
      </div>
      {isQuoteFormOpen && (
        <div className="mt-4">
          <QuoteForm onClose={() => setIsQuoteFormOpen(false)} />
        </div>
      )}
    </footer>
  );
};

export default Footer;
