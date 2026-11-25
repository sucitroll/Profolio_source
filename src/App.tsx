import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Ticker } from '@/components/Ticker';
import { Capabilities } from '@/components/Capabilities';
import { Work } from '@/components/work/Work';
import { StackMatrix } from '@/components/StackMatrix';
import { Archive } from '@/components/Archive';
import { Contact } from '@/components/Contact';
import { Cursor } from '@/components/Cursor';
import { ScrollProvider } from '@/lib/scroll';

const STACK_TICKER = ['C++', 'PYTHON', 'TYPESCRIPT', 'LUA', 'GO', 'RUST', 'NGINX', 'DOCKER', 'POSTGRESQL', 'REDIS', 'GSAP', 'ENET', 'IMGUI', 'OLLAMA'];

export default function App() {
  return (
    <ScrollProvider>
      <a href="#work" className="micro sr-only z-[100] bg-ink p-3 text-canvas focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to work
      </a>
      <Header />
      <main>
        <Hero />
        <Ticker />
        <Capabilities />
        <Work />
        <Ticker items={STACK_TICKER} inverted />
        <StackMatrix />
        <Archive />
        <Contact />
      </main>
      <div className="grain" aria-hidden />
      <Cursor />
    </ScrollProvider>
  );
}
