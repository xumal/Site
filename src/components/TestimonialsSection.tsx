import React from 'react';

interface TestimonialProps {
  quote: string;
  author: string;
  title: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ quote, author, title }) => {
  return (
    <div className="testimonial-card p-6 rounded-md shadow-md bg-black text-white">
      <p className="text-lg italic mb-4">"{quote}"</p>
      <div className="flex items-center">
        <div className="ml-4">
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-gray-400">{title}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="section bg-black">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16 animate-on-scroll">
          O que nossos clientes dizem
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="animate-on-scroll">
            <TestimonialCard
              quote="A IA da [Nome da Empresa] transformou nossa operação. Ganhamos eficiência e insights valiosos."
              author="João Silva"
              title="CEO, Empresa X"
            />
          </div>
          <div className="animate-on-scroll">
            <TestimonialCard
              quote="O suporte ao cliente com IA melhorou nossa satisfação do cliente e reduziu custos."
              author="Maria Oliveira"
              title="Gerente de Marketing, Empresa Y"
            />
          </div>
          <div className="animate-on-scroll">
            <TestimonialCard
              quote="As soluções de IA da [Nome da Empresa] nos permitiram escalar sem aumentar os custos operacionais."
              author="Carlos Pereira"
              title="Diretor de Operações, Empresa Z"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
