import * as React from "react"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Chatbots",
    href: "#",
    description:
      "Automatize o atendimento ao cliente e melhore a eficiência com nossos chatbots inteligentes.",
  },
  {
    title: "Automação",
    href: "#",
    description:
      "Otimize processos e reduza custos com nossas soluções de automação personalizadas.",
  },
  {
    title: "IA para Vendas",
    href: "#",
    description:
      "Aumente suas vendas e maximize o retorno sobre o investimento com nossas ferramentas de IA.",
  },
  {
    title: "IA para RH",
    href: "#",
    description:
      "Transforme a gestão de talentos e impulsione o desempenho da sua equipe com nossas soluções de IA.",
  },
]

export function NavigationMenuDemo() {
  const handleChatbotsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const chatDemoSection = document.getElementById('chat-demo');
    if (chatDemoSection) {
      chatDemoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Soluções</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  description={component.description}
                  onClick={component.title === "Chatbots" ? handleChatbotsClick : undefined}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/pricing" className={navigationMenuTriggerStyle()}>
            Preços
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/blog" className={navigationMenuTriggerStyle()}>
            Blog
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/docs" className={navigationMenuTriggerStyle()}>
            Documentação
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string; description: string; onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void }
>(({ className, title, description, children, onClick, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
          onClick={onClick}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {description}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
