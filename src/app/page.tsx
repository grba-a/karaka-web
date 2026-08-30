import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Reasons from '@/components/Reasons';
import Proof from '@/components/Proof';
import Offer from '@/components/Offer';
import FindUs from '@/components/FindUs';
import Footer from '@/components/Footer';

/**
 * Jedna prodajna stranica.
 *
 * Svijetla zona (hero → razlozi → dokaz) gradi želju, tamna zona
 * (ponuda → lokacija → footer) je zatvara. Granica između Proofa i Offera je
 * namjeran tvrd rez — „ulazak unutra".
 */
export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Reasons />
        <Proof />
        <Offer />
        <FindUs />
      </main>
      <Footer />
    </>
  );
}
