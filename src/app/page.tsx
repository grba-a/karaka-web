import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Route from '@/components/Route';
import Tap from '@/components/Tap';
import Tables from '@/components/Tables';
import Matchday from '@/components/Matchday';
import Ambience from '@/components/Ambience';
import Bites from '@/components/Bites';
import Alley from '@/components/Alley';
import Voices from '@/components/Voices';
import Footer from '@/components/Footer';
import StickyBar from '@/components/StickyBar';

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Route />
        <Tap />
        <Tables />
        <Matchday />
        <Ambience />
        <Bites />
        <Alley />
        <Voices />
      </main>
      <Footer />
      <StickyBar />
    </>
  );
}
