import { motion } from 'framer-motion';
import {
    Calendar,
    TrendingUp,
    TrendingDown,
    Sparkles,
    ArrowRight,
    Target,
    Zap,
} from 'lucide-react';
import { useUIStore } from '../stores/useUIStore';
import { useTransactionStore } from '../stores/useTransactionStore';

const DashboardHeader = () => {
    const { role, openTransactionModal } = useUIStore();
    const { transactions } = useTransactionStore();

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        if (hour < 21) return 'Good Evening';
        return 'Good Night';
    };

    const today = new Date().toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    });

    // Calculate quick stats
    const thisMonthTx = transactions.filter(t => {
        const d = new Date(t.date);
        const now = new Date();
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });

    const thisMonthIncome = thisMonthTx.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const thisMonthExpense = thisMonthTx.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                marginBottom: '32px',
            }}
        >
            {/* Main Header Card */}
            <div style={{
                padding: '32px',
                borderRadius: '24px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* Background Decoration */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '400px',
                    height: '100%',
                    background: 'radial-gradient(ellipse at top right, rgba(251, 191, 36, 0.08) 0%, transparent 60%)',
                    pointerEvents: 'none',
                }} />

                {/* Decorative Elements */}
                <motion.div
                    animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        opacity: 0.1,
                    }}
                >
                    <Target size={120} color="var(--primary)" />
                </motion.div>

                <div style={{
                    position: 'relative',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '24px',
                }}>
                    {/* Left Side - Greeting */}
                    <div style={{ flex: 1, minWidth: '280px' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            marginBottom: '16px',
                        }}>
                            <motion.span
                                animate={{
                                    rotate: [0, 14, -8, 14, -4, 10, 0],
                                    scale: [1, 1.1, 1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 4,
                                }}
                                style={{ fontSize: '44px' }}
                            >
                                👋
                            </motion.span>
                            <div>
                                <h1 style={{
                                    fontSize: '32px',
                                    fontWeight: 800,
                                    color: 'var(--text-primary)',
                                    marginBottom: '4px',
                                    letterSpacing: '-0.02em',
                                }}>
                                    {getGreeting()}, <span style={{
                                        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}>Rajsv</span>
                                </h1>
                                <p style={{
                                    fontSize: '15px',
                                    color: 'var(--text-secondary)',
                                }}>
                                    Here's your financial overview for today
                                </p>
                            </div>
                        </div>

                        {/* Quick Stats Badges */}
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '10px',
                            marginTop: '20px',
                        }}>
                            {/* Date Badge */}
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '8px 14px',
                                    borderRadius: '10px',
                                    background: 'var(--bg-tertiary)',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-secondary)',
                                    fontSize: '13px',
                                    fontWeight: 500,
                                }}
                            >
                                <Calendar size={14} />
                                {today}
                            </motion.span>

                            {/* Income Badge */}
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '8px 14px',
                                    borderRadius: '10px',
                                    background: 'var(--success-muted)',
                                    border: '1px solid rgba(34, 197, 94, 0.2)',
                                    color: 'var(--success)',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                }}
                            >
                                <TrendingUp size={14} />
                                +₹{(thisMonthIncome / 1000).toFixed(0)}K this month
                            </motion.span>

                            {/* Expense Badge */}
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '8px 14px',
                                    borderRadius: '10px',
                                    background: 'var(--error-muted)',
                                    border: '1px solid rgba(239, 68, 68, 0.2)',
                                    color: 'var(--error)',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                }}
                            >
                                <TrendingDown size={14} />
                                -₹{(thisMonthExpense / 1000).toFixed(0)}K spent
                            </motion.span>
                        </div>
                    </div>

                    {/* Right Side - Actions */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        alignItems: 'flex-end',
                    }}>
                        {role === 'admin' && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.03, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => openTransactionModal()}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '14px 28px',
                                    borderRadius: '14px',
                                    border: 'none',
                                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                                    color: '#09090b',
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 20px rgba(251, 191, 36, 0.4)',
                                    transition: 'box-shadow 0.3s ease',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 30px rgba(251, 191, 36, 0.5)'}
                                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 20px rgba(251, 191, 36, 0.4)'}
                            >
                                <Sparkles size={18} />
                                Add Transaction
                                <ArrowRight size={16} />
                            </motion.button>
                        )}

                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '12px 20px',
                                borderRadius: '12px',
                                border: '1px solid var(--border-color)',
                                background: 'var(--bg-secondary)',
                                color: 'var(--text-secondary)',
                                fontSize: '13px',
                                fontWeight: 600,
                                cursor: 'pointer',
                            }}
                        >
                            <Zap size={16} />
                            Quick Actions
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default DashboardHeader;