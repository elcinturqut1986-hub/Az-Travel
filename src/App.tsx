import { LanguageProvider } from './i18n/LanguageContext';
import { ToastProvider } from './components/common/ToastProvider';
import { BookingProvider } from './context/BookingContext';
import { MapFocusProvider } from './context/MapFocusContext';
import { DestinationReviewsProvider } from './context/DestinationReviewsContext';

import { ScrollProgress } from './components/layout/ScrollProgress';
import { BackToTop } from './components/layout/BackToTop';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/hero/Hero';
import { SearchCard } from './components/search/SearchCard';
import { DestinationsSection } from './components/destinations/DestinationsSection';
import { DestinationModal } from './components/destinations/DestinationModal';
import { HotelsSection } from './components/hotels/HotelsSection';
import { MapSection } from './components/map/MapSection';
import { WhySection } from './components/why/WhySection';
import { GallerySection } from './components/gallery/GallerySection';
import { TestimonialsSection } from './components/testimonials/TestimonialsSection';
import { NewsletterCTA } from './components/cta/NewsletterCTA';
import { BookingSection } from './components/booking/BookingSection';
import { PaymentModal } from './components/booking/PaymentModal';

function AztravelApp() {
  return (
    <>
      <ScrollProgress />
      <BackToTop />
      <Header />
      <Hero />
      <SearchCard />
      <DestinationsSection />
      <HotelsSection />
      <MapSection />
      <WhySection />
      <GallerySection />
      <TestimonialsSection />
      <NewsletterCTA />
      <BookingSection />
      <Footer />

      <DestinationModal />
      <PaymentModal />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ToastProvider>
        <MapFocusProvider>
          <DestinationReviewsProvider>
            <BookingProvider>
              <AztravelApp />
            </BookingProvider>
          </DestinationReviewsProvider>
        </MapFocusProvider>
      </ToastProvider>
    </LanguageProvider>
  );
}
