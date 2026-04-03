import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    Lightbulb,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    Target,
    Calendar,
    ShoppingBag,
    Zap,
    ArrowRight,
    ChevronRight,
} from 'lucide-react';
import { useTransactionStore } from '../stores/useTransactionStore';
import { useUIStore } from '../stores/useUIStore';
import { categories } from '../data/mockData';

const InsightsSection = () => {
    const { transactions } = useTransactionStore();
    const { openDetailModal } = useUIStore();

    const insights = useMemo(() => {
        const results = [];

        const expenses = transactions.filter(t => t.type === 'expense');

        // 1. Highest Spending Category
        const categorySpending = {};
        expenses.forEach(t => {
            categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount;
        });

        const topCategory = Object.entries(categorySpending)
            .sort((a, b) => b[1] - a[1])[0];

        if (topCategory) {
            const catInfo = categories.find(c => c.id === topCategory[0]);
            results.push({
                id: 'top-spending',
                icon: ShoppingBag,
                title: 'Top Spending',
                value: `₹${(topCategory[1] / 1000).toFixed(1)}K`,
                description: catInfo?.name || topCategory[0],
                type: 'warning',
                color: '#f59e0b',
                bgColor: 'rgba(245, 158, 11, 0.1)',
            });
        }

        // 2. Monthly Trend
        const thisMonth = new Date().getMonth();
        const thisMonthExpenses = expenses.filter(t => new Date(t.date).getMonth() === thisMonth);
        const lastMonthExpenses = expenses.filter(t => new Date(t.date).getMonth() === thisMonth - 1);

        const thisTotal = thisMonthExpenses.reduce((s, t) => s + t.amount, 0);
        const lastTotal = lastMonthExpenses.reduce((s, t) => s + t.amount, 0);
        const change = lastTotal > 0 ? ((thisTotal - lastTotal) / lastTotal) * 100 : 0;

        results.push({
            id: 'monthly-trend',
            icon: change < 0 ? TrendingDown : TrendingUp,
            title: 'Monthly Trend',
            value: `${Math.abs(change).toFixed(1)}%`,
            description: change < 0 ? 'Less than last month' : 'More than last month',
            type: change < 0 ? 'success' : 'info',
            color: change < 0 ? '#22c55e' : '#3b82f6',
            bgColor: change < 0 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(59, 130, 246, 0.1)',
        });

        // 3. Weekend Spending
        const weekendExpenses = expenses.filter(t => {
            const day = new Date(t.date).getDay();
            return day === 0 || day === 6;
        });
        const weekendPercent = expenses.length > 0 ? (weekendExpenses.length / expenses.length) * 100 : 0;

        results.push({
            id: 'weekend',
            icon: Calendar,
            title: 'Weekend Activity',
            value: `${weekendPercent.toFixed(0)}%`,
            description: 'Transactions on weekends',
            type: 'info',
            color: '#8b5cf6',
            bgColor: 'rgba(139, 92, 246, 0.1)',
        });

        // 4. Budget Alert
        const monthlyBudget = 75000;
        const budgetUsed = (thisTotal / monthlyBudget) * 100;

        results.push({
            id: 'budget',
            icon: budgetUsed > 80 ? AlertTriangle : Target,
            title: 'Budget Status',
            value: `${budgetUsed.toFixed(0)}%`,
            description: budgetUsed > 80 ? 'Budget almost exhausted' : 'On track this month',
            type: budgetUsed > 80 ? 'error' : 'success',
            color: budgetUsed > 80 ? '#ef4444' : '#22c55e',
            bgColor: budgetUsed > 80 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
        });

        return results;
    }, [transactions]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ marginBottom: '32px' }}
        >
            {/* Section Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 20px rgba(251, 191, 36, 0.3)',
                    }}>
                        <Lightbulb size={22} color="#09090b" strokeWidth={2.5} />
                    </div>
                    <div>
                        <h2 style={{
                            fontSize: '18px',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            marginBottom: '2px',
                        }}>
                            Smart Insights
                        </h2>
                        <p style={{
                            fontSize: '13px',
                            color: 'var(--text-muted)',
                        }}>
                            AI-powered financial analysis
                        </p>
                    </div>
                </div>

                <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '10px 16px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    background: 'transparent',
                    color: 'var(--text-secondary)',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                }}>
                    <Zap size={14} />
                    View All
                </button>
            </div>

            {/* Insights Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '16px',
            }}>
                {insights.map((insight, index) => (
                    <motion.div
                        key={insight.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -6, transition: { duration: 0.2 } }}
                        onClick={() => openDetailModal(insight.id)}
                        style={{
                            padding: '24px',
                            borderRadius: '20px',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden',
                            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = insight.color;
                            e.currentTarget.style.boxShadow = `0 20px 40px ${insight.bgColor}`;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border-color)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        {/* Background Gradient */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: '120px',
                            height: '120px',
                            background: `radial-gradient(circle, ${insight.bgColor} 0%, transparent 70%)`,
                            transform: 'translate(30%, -30%)',
                        }} />

                        <div style={{ position: 'relative' }}>
                            {/* Header */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                                marginBottom: '18px',
                            }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '14px',
                                    background: insight.bgColor,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <insight.icon size={22} color={insight.color} />
                                </div>
                                <motion.div
                                    whileHover={{ x: 4 }}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '8px',
                                        background: 'var(--bg-tertiary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <ChevronRight size={16} color="var(--text-muted)" />
                                </motion.div>
                            </div>

                            {/* Value */}
                            <p style={{
                                fontSize: '32px',
                                fontWeight: 800,
                                color: insight.color,
                                marginBottom: '6px',
                                letterSpacing: '-0.02em',
                            }}>
                                {insight.value}
                            </p>

                            {/* Title & Description */}
                            <p style={{
                                fontSize: '15px',
                                fontWeight: 700,
                                color: 'var(--text-primary)',
                                marginBottom: '4px',
                            }}>
                                {insight.title}
                            </p>
                            <p style={{
                                fontSize: '13px',
                                color: 'var(--text-muted)',
                            }}>
                                {insight.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default InsightsSection;