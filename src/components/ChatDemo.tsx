import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button"

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'bot';
  isTyping?: boolean;
  colorIndex?: number;
}

interface ChatScenario {
  id: number;
  userMessage: string;
  botResponse: string;
  details: string;
  faq?: { question: string; answer: string; }[];
}

const scenarios: ChatScenario[] = [
  {
    id: 1,
    userMessage: "Quero melhorar minhas vendas.",
    botResponse: "Nossas soluções de IA podem impulsionar suas vendas através de chatbots inteligentes, análise preditiva de mercado e personalização da experiência do cliente.",
    details: "Nossas soluções de IA utilizam chatbots de atendimento ao cliente para qualificar leads e direcioná-los para a equipe de vendas. Além disso, a análise preditiva de mercado permite identificar oportunidades de venda e personalizar ofertas para cada cliente.",
    faq: [
      {
        question: "Como os chatbots de atendimento podem ajudar a aumentar minhas vendas?",
        answer: "Os chatbots de atendimento podem qualificar leads e direcioná-los para a equipe de vendas, além de fornecer informações sobre seus produtos e serviços."
      },
      {
        question: "Como a análise preditiva de mercado pode me ajudar a identificar oportunidades de venda?",
        answer: "A análise preditiva de mercado permite identificar oportunidades de venda e personalizar ofertas para cada cliente."
      }
    ]
  },
  {
    id: 2,
    userMessage: "Preciso melhorar o suporte ao cliente.",
    botResponse: "Com nossos chatbots de suporte, sua empresa pode oferecer atendimento 24/7, respostas rápidas e personalizadas, além de liberar sua equipe para questões mais complexas.",
    details: "Nossos chatbots de suporte ao cliente são treinados para responder a perguntas frequentes, solucionar problemas comuns e direcionar os clientes para os canais de suporte adequados. Isso garante um atendimento rápido e eficiente, 24 horas por dia, 7 dias por semana.",
    faq: [
      {
        question: "Como os chatbots de suporte podem oferecer atendimento 24/7?",
        answer: "Os chatbots de suporte podem responder a perguntas frequentes e solucionar problemas comuns, mesmo fora do horário comercial."
      },
      {
        question: "Como os chatbots de suporte podem liberar minha equipe para questões mais complexas?",
        answer: "Os chatbots de suporte podem lidar com as perguntas mais simples, permitindo que sua equipe se concentre em questões mais complexas."
      }
    ]
  },
  {
    id: 3,
    userMessage: "Como posso otimizar o departamento de RH?",
    botResponse: "A IA pode automatizar processos de recrutamento, triagem de currículos e gestão de desempenho, tornando o RH mais eficiente e estratégico.",
    details: "Nossa IA pode automatizar a triagem de currículos, identificar os candidatos mais qualificados para cada vaga e agendar entrevistas automaticamente. Além disso, a IA pode analisar o desempenho dos funcionários e identificar oportunidades de treinamento e desenvolvimento.",
    faq: [
      {
        question: "Como a IA pode automatizar a triagem de currículos?",
        answer: "A IA pode analisar os currículos e identificar os candidatos mais qualificados para cada vaga."
      },
      {
        question: "Como a IA pode analisar o desempenho dos funcionários?",
        answer: "A IA pode analisar os dados de desempenho dos funcionários e identificar oportunidades de treinamento e desenvolvimento."
      }
    ]
  },
  {
    id: 4,
    userMessage: "Quero aumentar a geração de leads.",
    botResponse: "Nossos chatbots interagem com visitantes do site, respondem a perguntas frequentes e coletam informações de contato, aumentando a captura de leads qualificados.",
    details: "Nossos chatbots são projetados para interagir com os visitantes do seu site, responder a perguntas frequentes e coletar informações de contato. Isso permite que você capture leads qualificados e os direcione para a sua equipe de vendas.",
    faq: [
      {
        question: "Como os chatbots podem interagir com os visitantes do meu site?",
        answer: "Os chatbots podem responder a perguntas frequentes e coletar informações de contato dos visitantes do seu site."
      },
      {
        question: "Como posso direcionar os leads qualificados para a minha equipe de vendas?",
        answer: "Você pode integrar os chatbots com o seu CRM e direcionar os leads qualificados para a sua equipe de vendas."
      }
    ]
  },
  {
    id: 5,
    userMessage: "Quais são os custos para implementar IA na minha empresa?",
    botResponse: "Oferecemos planos flexíveis baseados no tamanho da sua empresa e necessidades específicas. Podemos criar uma solução personalizada que se adapte ao seu orçamento, com retorno sobre investimento comprovado.",
    details: "Nossos planos de implementação de IA são flexíveis e adaptados às necessidades de cada empresa. Oferecemos diferentes opções de planos, desde soluções básicas até soluções mais completas, com preços que variam de acordo com o tamanho da empresa e o número de usuários.",
    faq: [
      {
        question: "Quais são os custos para implementar uma solução básica de IA?",
        answer: "Os custos para implementar uma solução básica de IA variam de acordo com o tamanho da sua empresa e o número de usuários."
      },
      {
        question: "Como posso obter um orçamento personalizado para a minha empresa?",
        answer: "Você pode entrar em contato conosco e solicitar um orçamento personalizado."
      }
    ]
  },
  {
    id: 6,
    userMessage: "Quanto tempo leva para implementar uma solução de IA?",
    botResponse: "O tempo de implementação varia conforme a complexidade, mas geralmente conseguimos ter soluções básicas funcionando em 2-4 semanas. Projetos mais complexos podem levar de 1-3 meses, incluindo treinamento e customização.",
    details: "O tempo de implementação de uma solução de IA depende da complexidade do projeto e das necessidades específicas de cada empresa. Soluções básicas podem ser implementadas em 2-4 semanas, enquanto projetos mais complexos podem levar de 1-3 meses.",
    faq: [
      {
        question: "Quanto tempo leva para implementar uma solução básica de IA?",
        answer: "O tempo de implementação de uma solução básica de IA é de 2-4 semanas."
      },
      {
        question: "Quanto tempo leva para implementar uma solução mais complexa de IA?",
        answer: "O tempo de implementação de uma solução mais complexa de IA é de 1-3 meses."
      }
    ]
  },
  {
    id: 7,
    userMessage: "Como a IA pode me ajudar com marketing digital?",
    botResponse: "Nossa IA pode otimizar suas campanhas de marketing através de análise preditiva, segmentação avançada de público, personalização de conteúdo em tempo real, e recomendações inteligentes de produtos baseadas no comportamento do usuário.",
    details: "Nossa IA pode analisar dados de seus clientes, identificar padrões de comportamento e segmentar seu público-alvo de forma mais eficiente. Isso permite que você personalize suas campanhas de marketing e ofereça conteúdo relevante para cada cliente.",
    faq: [
      {
        question: "Como a IA pode otimizar minhas campanhas de marketing?",
        answer: "A IA pode analisar dados de seus clientes, identificar padrões de comportamento e segmentar seu público-alvo de forma mais eficiente."
      },
      {
        question: "Como posso personalizar minhas campanhas de marketing com a IA?",
        answer: "Você pode personalizar suas campanhas de marketing com a IA oferecendo conteúdo relevante para cada cliente."
      }
    ]
  },
  {
    id: 8,
    userMessage: "Podemos integrar a IA com nossos sistemas existentes?",
    botResponse: "Sim, nossas soluções são projetadas para integração com a maioria dos sistemas empresariais como CRM, ERP, e-commerce e plataformas de atendimento ao cliente. Temos APIs robustas para facilitar essas integrações.",
    details: "Nossas soluções de IA são projetadas para se integrar com seus sistemas existentes, como CRM, ERP, e-commerce e plataformas de atendimento ao cliente. Oferecemos APIs robustas e documentação completa para facilitar a integração.",
    faq: [
      {
        question: "Com quais sistemas posso integrar a IA?",
        answer: "Você pode integrar a IA com a maioria dos sistemas empresariais, como CRM, ERP, e-commerce e plataformas de atendimento ao cliente."
      },
      {
        question: "Como posso integrar a IA com meus sistemas existentes?",
        answer: "Oferecemos APIs robustas e documentação completa para facilitar a integração."
      }
    ]
  },
  {
    id: 9,
    userMessage: "Como a IA pode melhorar nossa logística e cadeia de suprimentos?",
    botResponse: "Nossa IA pode otimizar rotas de entrega, prever demandas sazonais, gerenciar inventários de forma inteligente e identificar gargalos na cadeia de suprimentos, resultando em redução de custos e maior eficiência operacional.",
    details: "Nossa IA pode analisar dados de sua cadeia de suprimentos, identificar gargalos e otimizar rotas de entrega. Isso permite que você reduza custos, melhore a eficiência operacional e garanta a entrega de seus produtos no prazo.",
    faq: [
      {
        question: "Como a IA pode otimizar rotas de entrega?",
        answer: "A IA pode analisar dados de sua cadeia de suprimentos, identificar gargalos e otimizar rotas de entrega."
      },
      {
        question: "Como a IA pode prever demandas sazonais?",
        answer: "A IA pode analisar dados históricos de vendas e prever demandas sazonais."
      }
    ]
  },
  {
    id: 10,
    userMessage: "Preciso de uma solução para análise de dados de saúde.",
    botResponse: "Desenvolvemos IA especializada para o setor de saúde que pode analisar dados de pacientes, identificar padrões para diagnóstico precoce, otimizar agendamentos e melhorar a gestão hospitalar, sempre respeitando normas rígidas de privacidade como LGPD e HIPAA.",
    details: "Nossa IA para o setor de saúde pode analisar dados de pacientes, identificar padrões para diagnóstico precoce e otimizar agendamentos. Isso permite que você melhore a qualidade do atendimento, reduza custos e garanta a privacidade dos dados dos pacientes.",
    faq: [
      {
        question: "Como a IA pode analisar dados de pacientes?",
        answer: "A IA pode analisar dados de pacientes, identificar padrões para diagnóstico precoce e otimizar agendamentos."
      },
      {
        question: "Como posso garantir a privacidade dos dados dos pacientes?",
        answer: "Nossas soluções de IA estão em conformidade com a LGPD e HIPAA para garantir a privacidade dos dados dos pacientes."
      }
    ]
  },
  {
    id: 11,
    userMessage: "Quais medidas de segurança são implementadas nas soluções de IA?",
    botResponse: "Nossas soluções seguem os mais altos padrões de segurança, incluindo criptografia de ponta a ponta, autenticação multifator, auditorias regulares, conformidade com LGPD e atualizações constantes para proteção contra vulnerabilidades.",
    details: "Nossas soluções de IA seguem os mais altos padrões de segurança, incluindo criptografia de ponta a ponta, autenticação multifator e auditorias regulares. Além disso, estamos em conformidade com a LGPD e HIPAA para garantir a privacidade dos dados de seus clientes.",
    faq: [
      {
        question: "Quais são as medidas de segurança implementadas nas soluções de IA?",
        answer: "Nossas soluções seguem os mais altos padrões de segurança, incluindo criptografia de ponta a ponta, autenticação multifator e auditorias regulares."
      },
      {
        question: "Como posso garantir a conformidade com a LGPD e HIPAA?",
        answer: "Nossas soluções de IA estão em conformidade com a LGPD e HIPAA para garantir a privacidade dos dados de seus clientes."
      }
    ]
  },
  {
    id: 12,
    userMessage: "Como a IA pode ajudar no setor financeiro?",
    botResponse: "No setor financeiro, nossa IA pode detectar fraudes em tempo real, automatizar análise de crédito, otimizar investimentos, personalizar serviços financeiros e melhorar o atendimento ao cliente, resultando em maior segurança e eficiência.",
    details: "Nossa IA para o setor financeiro pode detectar fraudes em tempo real, automatizar análise de crédito e otimizar investimentos. Isso permite que você reduza riscos, melhore a eficiência operacional e personalize seus serviços financeiros.",
    faq: [
      {
        question: "Como a IA pode detectar fraudes em tempo real?",
        answer: "A IA pode analisar dados de transações financeiras e identificar padrões suspeitos."
      },
      {
        question: "Como a IA pode automatizar a análise de crédito?",
        answer: "A IA pode analisar dados de clientes e determinar a probabilidade de inadimplência."
      }
    ]
  },
  {
    id: 13,
    userMessage: "A IA pode ajudar na minha empresa?",
    botResponse: "Sim, a IA pode ajudar sua empresa a otimizar processos, reduzir custos, melhorar a tomada de decisões e personalizar a experiência do cliente.",
    details: "Nossa IA pode analisar dados de seus clientes, identificar padrões de comportamento e segmentar seu público-alvo de forma mais eficiente. Isso permite que você personalize suas campanhas de marketing e ofereça conteúdo relevante para cada cliente.",
    faq: [
      {
        question: "Como a IA pode otimizar meus processos?",
        answer: "A IA pode automatizar tarefas repetitivas, liberar seus funcionários para atividades mais estratégicas e reduzir erros."
      },
      {
        question: "Como a IA pode reduzir meus custos?",
        answer: "A IA pode otimizar seus processos, reduzir erros e melhorar a eficiência operacional."
      }
    ]
  },
    {
    id: 14,
    userMessage: "Como funciona a IA?",
    botResponse: "A IA funciona através de algoritmos que permitem que os computadores aprendam com os dados, identifiquem padrões e tomem decisões sem intervenção humana.",
    details: "Nossa IA utiliza algoritmos de aprendizado de máquina para analisar dados, identificar padrões e tomar decisões. Isso permite que você automatize tarefas, personalize a experiência do cliente e melhore a tomada de decisões.",
    faq: [
      {
        question: "Quais são os tipos de algoritmos de aprendizado de máquina?",
        answer: "Existem diversos tipos de algoritmos de aprendizado de máquina, como regressão linear, regressão logística, árvores de decisão, florestas aleatórias e redes neurais."
      },
      {
        question: "Como a IA pode aprender com os dados?",
        answer: "A IA pode aprender com os dados através de algoritmos de aprendizado de máquina que identificam padrões e tomam decisões com base nesses padrões."
      }
    ]
  },
      {
    id: 15,
    userMessage: "A IA é segura?",
    botResponse: "Sim, a IA é segura quando implementada corretamente. Nossas soluções de IA seguem os mais altos padrões de segurança e privacidade.",
    details: "Nossas soluções de IA seguem os mais altos padrões de segurança, incluindo criptografia de ponta a ponta, autenticação multifator e auditorias regulares. Além disso, estamos em conformidade com a LGPD e HIPAA para garantir a privacidade dos dados de seus clientes.",
    faq: [
      {
        question: "Quais são os riscos de segurança da IA?",
        answer: "Os riscos de segurança da IA incluem ataques cibernéticos, vazamento de dados e uso indevido da IA."
      },
      {
        question: "Como posso proteger minha empresa contra os riscos de segurança da IA?",
        answer: "Você pode proteger sua empresa contra os riscos de segurança da IA implementando medidas de segurança robustas, como criptografia de ponta a ponta, autenticação multifator e auditorias regulares."
      }
    ]
  },
        {
    id: 16,
    userMessage: "A IA vai substituir os humanos?",
    botResponse: "A IA não vai substituir os humanos, mas sim complementar suas habilidades e aumentar sua produtividade.",
    details: "Nossa IA pode automatizar tarefas repetitivas, liberar seus funcionários para atividades mais estratégicas e aumentar sua produtividade. Isso permite que você se concentre em atividades que exigem criatividade, inteligência emocional e pensamento crítico.",
    faq: [
      {
        question: "Quais são as habilidades que os humanos têm que a IA não tem?",
        answer: "Os humanos têm habilidades como criatividade, inteligência emocional, pensamento crítico e capacidade de adaptação."
      },
      {
        question: "Como posso me preparar para o futuro do trabalho com a IA?",
        answer: "Você pode se preparar para o futuro do trabalho com a IA desenvolvendo habilidades como criatividade, inteligência emocional, pensamento crítico e capacidade de adaptação."
      }
    ]
  }
];

// Array of color classes for bot messages
const botMessageColors = [
  'text-primary',
  'text-green-400',
  'text-purple-400',
  'text-amber-400',
  'text-rose-400'
];

interface ChatDemoProps {
  initialMessage?: string;
}

const ChatDemo: React.FC<ChatDemoProps> = ({ initialMessage }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [visibleTextLength, setVisibleTextLength] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  useEffect(() => {
    if (initialMessage) {
      startScenarioDemo(initialMessage);
    } else {
      startScenarioDemo(scenarios[0].userMessage);
    }
    
    let scenarioInterval: any;
    if (!isUserInteracting) {
      scenarioInterval = setInterval(() => {
        setCurrentScenarioIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % scenarios.length;
          startScenarioDemo(scenarios[nextIndex].userMessage);
          return nextIndex;
        });
      }, 15000);
    } else {
      clearInterval(scenarioInterval);
    }
    
    return () => clearInterval(scenarioInterval);
  }, [initialMessage, isUserInteracting]);

  const startScenarioDemo = (message: string) => {
    setIsUserInteracting(true);
    
    if (messages.find(msg => msg.sender === 'user' && msg.content === message)) {
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      content: message,
      sender: 'user',
    };
    
    setMessages([userMessage]);
    
    const scenario = scenarios.find(s => s.userMessage === message);
    let botResponseContent = scenario ? scenario.botResponse : "Desculpe, não tenho uma resposta para isso no momento.";
    
    // Correct the response for "IA para vendas"
    if (message === "Quero melhorar minhas vendas.") {
      botResponseContent = "Nossas soluções de IA podem impulsionar suas vendas através de chatbots inteligentes, análise preditiva de mercado e personalização da experiência do cliente.";
    }
    
    const colorIndex = Math.floor(Math.random() * botMessageColors.length);
    
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        content: botResponseContent,
        sender: 'bot',
        isTyping: true,
        colorIndex: colorIndex
      };
      
      setMessages(prev => [...prev, botResponse]);
      setVisibleTextLength(0);
    }, 1500);
  };

  const generateNewResponse = () => {
    const randomIndex = Math.floor(Math.random() * scenarios.length);
    startScenarioDemo(scenarios[randomIndex].userMessage);
  };
  
  useEffect(() => {
    const currentMessage = messages[messages.length - 1];
    if (!currentMessage || !currentMessage.isTyping) return;
    
    const content = currentMessage.content;
    
    if (visibleTextLength < content.length) {
      const typingTimer = setTimeout(() => {
        setVisibleTextLength(prev => prev + 1);
      }, 30);
      
      return () => clearTimeout(typingTimer);
    } else {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === currentMessage.id 
            ? { ...msg, isTyping: false } 
            : msg
        )
      );
    }
  }, [messages, visibleTextLength]);
  
  return (
    <section id="chat-demo" className="section bg-black relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full filter blur-xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-green-400/10 rounded-full filter blur-xl animate-pulse-soft"></div>
        <div className="absolute top-2/3 left-1/3 w-24 h-24 bg-purple-400/10 rounded-full filter blur-xl animate-float"></div>
        
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy5wMy5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNTAgMCBMIDAgMCAwIDUwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoNjEsIDIxNywgMjE0LCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Experimente</span> nossa IA em ação
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Veja como nossa IA pode transformar diferentes setores da sua empresa com respostas inteligentes e personalizadas.
          </p>
        </div>
        
        <div className="glass-card rounded-2xl overflow-hidden max-w-4xl mx-auto animate-on-scroll">
          <div className="bg-primary/20 p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">IA Assistente</h3>
            </div>
          </div>
          
          <Button variant="secondary" size="sm" onClick={generateNewResponse}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          
          <div className="bg-black h-80 overflow-y-auto p-4" id="chat-container">
            {messages.length > 0 ? (
              <>
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`mb-4 flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.sender === 'user'
                          ? 'user-message rounded-tr-none'
                          : 'bot-message rounded-tl-none'
                      } animate-fade-in`}
                    >
                      {message.isTyping && index === messages.length - 1 ? (
                        <span className={`typewriter ${message.sender === 'bot' ? botMessageColors[message.colorIndex || 0] : ''}`}>
                          {message.content.substring(0, visibleTextLength)}
                        </span>
                      ) : (
                        <span className={message.sender === 'bot' ? botMessageColors[message.colorIndex || 0] : ''}>
                          {message.content}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-2 text-gray-600" />
                  <p>Iniciando demonstração...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatDemo;
