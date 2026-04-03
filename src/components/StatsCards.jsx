import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useUIStore } from '../stores/useUIStore';
import {
    Wallet,
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
    ArrowDownRight,
    Sparkles,
    PiggyBank,
    CreditCard,
} from 'lucide-react';
import { useTransactionStore } from '../stores/useTransactionStore';

const StatsCards = () => {
    const { transactions } = useTransactionStore();
    const { openDetailModal } = useUIStore();

    const stats = useMemo(() => {
        const income = transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const expenses = transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        const balance = income - expenses;
        const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;

        return [
            {
                id: 'balance',
                title: 'Total Balance',
                value: balance,
                change: 12.5,
                isPositive: balance >= 0,
                icon: Wallet,
                gradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                shadowColor: 'rgba(251, 191, 36, 0.3)',
                bgPattern: 'rgba(251, 191, 36, 0.08)',
            },
            {
                id: 'income',
                title: 'Total Income',
                value: income,
                change: 8.2,
                isPositive: true,
                icon: TrendingUp,
                gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                shadowColor: 'rgba(34, 197, 94, 0.3)',
                bgPattern: 'rgba(34, 197, 94, 0.08)',
            },
            {
                id: 'expenses',
                title: 'Total Expenses',
                value: expenses,
                change: -5.3,
                isPositive: false,
                icon: CreditCard,
                gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                shadowColor: 'rgba(239, 68, 68, 0.3)',
                bgPattern: 'rgba(239, 68, 68, 0.08)',
            },
            {
                id: 'savings',
                title: 'Savings Rate',
                value: savingsRate,
                change: 3.2,
                isPositive: true,
                isSavings: true,
                icon: PiggyBank,
                gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                shadowColor: 'rgba(59, 130, 246, 0.3)',
                bgPattern: 'rgba(59, 130, 246, 0.08)',
            },
        ];
    }, [transactions]);

    const formatCurrency = (value) => {
        if (value >= 100000) {
            return `₹${(value / 100000).toFixed(2)}L`;
        }
        if (value >= 1000) {
            return `₹${(value / 1000).toFixed(1)}K`;
        }
        return `₹${value.toLocaleString('en-IN')}`;
    };

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
            marginBottom: '32px',
        }}>
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{
                        y: -6,
                        transition: { duration: 0.2 }
                    }}
                    onClick={() => openDetailModal(stat.id)}  // ADD THIS LINE
                    style={{
                        padding: '28px',
                        borderRadius: '24px',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-hover)';
                        e.currentTarget.style.boxShadow = `0 20px 40px ${stat.shadowColor}`;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-color)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                >
                    {/* Background Pattern */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '180px',
                        height: '180px',
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${stat.bgPattern} 0%, transparent 70%)`,
                        transform: 'translate(30%, -30%)',
                    }} />

                    {/* Content */}
                    <div style={{ position: 'relative' }}>
                        {/* Header */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            marginBottom: '24px',
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '14px',
                            }}>
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    style={{
                                        width: '52px',
                                        height: '52px',
                                        borderRadius: '16px',
                                        background: stat.gradient,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: `0 8px 20px ${stat.shadowColor}`,
                                    }}
                                >
                                    <stat.icon size={24} color="white" strokeWidth={2} />
                                </motion.div>
                                <div>
                                    <span style={{
                                        fontSize: '13px',
                                        color: 'var(--text-muted)',
                                        fontWeight: 500,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                    }}>
                                        {stat.title}
                                    </span>
                                    {stat.id === 'balance' && (
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            marginTop: '4px',
                                        }}>
                                            <Sparkles size={12} color="var(--primary)" />
                                            <span style={{
                                                fontSize: '11px',
                                                color: 'var(--primary)',
                                                fontWeight: 600,
                                            }}>
                                                Primary Account
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Value */}
                        <div style={{ marginBottom: '20px' }}>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                                className="number-display"
                                style={{
                                    fontSize: '36px',
                                    fontWeight: 800,
                                    color: 'var(--text-primary)',
                                    letterSpacing: '-0.03em',
                                    lineHeight: 1,
                                }}
                            >
                                {stat.isSavings
                                    ? `${stat.value.toFixed(1)}%`
                                    : formatCurrency(stat.value)
                                }
                            </motion.p>
                        </div>

                        {/* Change Indicator */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}>
                                <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    padding: '6px 12px',
                                    borderRadius: '20px',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    background: stat.isPositive ? 'var(--success-muted)' : 'var(--error-muted)',
                                    color: stat.isPositive ? 'var(--success)' : 'var(--error)',
                                }}>
                                    {stat.isPositive ? (
                                        <ArrowUpRight size={14} />
                                    ) : (
                                        <ArrowDownRight size={14} />
                                    )}
                                    {Math.abs(stat.change)}%
                                </span>
                                <span style={{
                                    fontSize: '12px',
                                    color: 'var(--text-muted)',
                                }}>
                                    vs last month
                                </span>
                            </div>
                        </div>

                        {/* Mini Sparkline */}
                        <div style={{
                            marginTop: '24px',
                            paddingTop: '20px',
                            borderTop: '1px solid var(--border-color)',
                        }}>
                            <svg width="100%" height="40" viewBox="0 0 200 40" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id={`gradient-${stat.id}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={stat.gradient.includes('#fbbf24') ? '#fbbf24' :
                                            stat.gradient.includes('#22c55e') ? '#22c55e' :
                                                stat.gradient.includes('#ef4444') ? '#ef4444' : '#3b82f6'}
                                            stopOpacity="0.3" />
                                        <stop offset="100%" stopColor={stat.gradient.includes('#fbbf24') ? '#fbbf24' :
                                            stat.gradient.includes('#22c55e') ? '#22c55e' :
                                                stat.gradient.includes('#ef4444') ? '#ef4444' : '#3b82f6'}
                                            stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                <motion.path
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 1.5, delay: 0.3 + index * 0.1 }}
                                    d={stat.isPositive
                                        ? "M0,35 Q25,30 50,25 T100,18 T150,12 T200,5"
                                        : "M0,5 Q25,12 50,18 T100,25 T150,30 T200,35"
                                    }
                                    fill="none"
                                    stroke={stat.gradient.includes('#fbbf24') ? '#fbbf24' :
                                        stat.gradient.includes('#22c55e') ? '#22c55e' :
                                            stat.gradient.includes('#ef4444') ? '#ef4444' : '#3b82f6'}
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                />
                                <motion.path
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                    d={stat.isPositive
                                        ? "M0,35 Q25,30 50,25 T100,18 T150,12 T200,5 V40 H0 Z"
                                        : "M0,5 Q25,12 50,18 T100,25 T150,30 T200,35 V40 H0 Z"
                                    }
                                    fill={`url(#gradient-${stat.id})`}
                                />
                            </svg>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default StatsCards;