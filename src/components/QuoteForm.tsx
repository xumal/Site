import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface QuoteFormProps {
  onClose: () => void;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ name, email, phone, description });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-white text-center">
        Agradecemos o seu interesse! Em breve, um de nossos especialistas entrará em contato.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="flex items-center gap-2">
        <Label htmlFor="name" className="text-gray-300">Nome:</Label>
        <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" required className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      </div>
      <div className="flex items-center gap-2">
        <Label htmlFor="email" className="text-gray-300">Email:</Label>
        <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seuemail@exemplo.com" required className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      </div>
      <div className="flex items-center gap-2">
        <Label htmlFor="phone" className="text-gray-300">Telefone:</Label>
        <Input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(11) 99999-9999" required className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      </div>
      <div className="flex flex-col">
        <Label htmlFor="description" className="text-gray-300 mb-2">Descrição:</Label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descreva suas necessidades" required className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"/>
      </div>
      <Button type="submit" className="w-full bg-blue-500 text-white font-medium hover:bg-blue-600 focus-visible:ring-blue-600 rounded-md px-4 py-2">
        Enviar
      </Button>
    </form>
  );
};

export default QuoteForm;
