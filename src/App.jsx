import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Stores
import { useThemeStore } from './stores/useThemeStore';

// Components
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import DashboardHeader from './components/DashboardHeader';
import StatsCards from './components/StatsCards';
import InsightsSection from './components/InsightsSection';
import BalanceChart from './components/BalanceChart';
import SpendingChart from './components/SpendingChart';
import TransactionsList from './components/TransactionsList';
import TransactionModal from './components/TransactionModal';
import ToastContainer from './components/ToastContainer';
import FloatingButton from './components/FloatingButton';
import DetailModal from './components/DetailModal';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      position: 'relative',
    }}>
      {/* Background Effects */}
      {theme === 'dark' && <BackgroundEffects />}

      {/* Navbar */}
      <Navbar />

      {/* Main Content Container */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '32px 24px 60px',
      }}>

        {/* 1. Dashboard Header */}
        <DashboardHeader />

        {/* 2. Stats Cards (4 cards: Balance, Income, Expenses, Savings) */}
        <StatsCards />

        {/* 3. Charts Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '24px',
          marginBottom: '32px',
        }}>
          <BalanceChart />
          <SpendingChart />
        </div>

        {/* 4. Smart Insights (4 cards: Top Spending, Monthly Trend, Weekend, Budget) */}
        <InsightsSection />

        {/* 5. Transactions List */}
        <TransactionsList />

      </div>

      {/* Footer - OUTSIDE the main content container */}
      <footer style={{
        textAlign: 'center',
        padding: '32px 24px',
        borderTop: '1px solid var(--border-color)',
        background: 'var(--bg-secondary)',
        position: 'relative',
        zIndex: 10,
      }}>
        <p style={{
          fontSize: '13px',
          color: 'var(--text-muted)',
        }}>
          © 2024 FinanceFlow Pro. Built with ❤️ for premium finance management.
        </p>
      </footer>

      {/* Floating Elements - Outside main flow */}
      <FloatingButton />
      <TransactionModal />
      <DetailModal />
      <ToastContainer />
    </div>
  );
}

// Background Effects Component
function BackgroundEffects() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0,
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at top, #18181b 0%, #09090b 50%, #09090b 100%)',
      }} />

      <motion.div
        animate={{
          x: [0, 30, -20, 30, 0],
          y: [0, -20, 30, -10, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '-10%',
          right: '5%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.08) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      <motion.div
        animate={{
          x: [0, -30, 20, -30, 0],
          y: [0, 20, -30, 10, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.06) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />
    </div>
  );
}

export default App;