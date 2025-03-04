import React, { useEffect, useRef } from 'react';
import { Clock, Brain, BarChart, Users } from 'lucide-react';

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description, delay }) => {
  return (
    <div className={`feature-card ${delay}`}>
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const BenefitsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));
    
    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  return (
    <section id="benefits" ref={sectionRef} className="section bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll text-white">
            Como a <span className="text-gradient">IA pode transformar</span> seu negócio
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto animate-on-scroll">
            Nossas soluções de automatização inteligente liberam o potencial da sua equipe enquanto aumentam a produtividade.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="animate-on-scroll">
            <BenefitCard
              icon={<Clock className="h-6 w-6" />}
              title="Automatização de Tarefas"
              description="Automatize processos repetitivos para que suas equipes possam se concentrar em atividades que realmente agregam valor ao negócio."
            />
          </div>
          
          <div className="animate-on-scroll">
            <BenefitCard
              icon={<Brain className="h-6 w-6" />}
              title="Processamento Inteligente"
              description="Nossa IA analisa grandes volumes de dados para extrair insights valiosos e apoiar tomadas de decisão mais assertivas e estratégicas."
            />
          </div>
          
          <div className="animate-on-scroll">
            <BenefitCard
              icon={<Users className="h-6 w-6" />}
              title="Atendimento 24/7"
              description="Chatbots inteligentes garantem que seus clientes recebam suporte imediato a qualquer hora, melhorando significativamente a experiência."
            />
          </div>
          
          <div className="animate-on-scroll">
            <BenefitCard
              icon={<BarChart className="h-6 w-6" />}
              title="Crescimento Escalável"
              description="Nossas soluções crescem com seu negócio, permitindo escalar operações sem aumentar proporcionalmente custos operacionais."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
