import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import SplashScreen from '@/components/SplashScreen';

export default function StoreLayout({ children }) {
  return (
    <>
      <SplashScreen />
      <LoadingScreen />
      <Navbar />
      <main style={{marginTop: '80px', minHeight: 'calc(100vh - 80px)'}}>
        {children}
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
