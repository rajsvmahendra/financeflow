import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    TrendingUp,
    TrendingDown,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    Filter,
    Download,
} from 'lucide-react';
import { useUIStore } from '../stores/useUIStore';
import { useTransactionStore } from '../stores/useTransactionStore';
import { categories } from '../data/mockData';

const DetailModal = () => {
    const { detailModalOpen, detailModalType, closeDetailModal } = useUIStore();
    const { transactions } = useTransactionStore();

    if (!detailModalOpen) return null;

    const getModalContent = () => {
        switch (detailModalType) {
            case 'top-spending':
                return <TopSpendingDetail transactions={transactions} />;
            case 'monthly-trend':
                return <MonthlyTrendDetail transactions={transactions} />;
            case 'weekend':
                return <WeekendActivityDetail transactions={transactions} />;
            case 'budget':
                return <BudgetStatusDetail transactions={transactions} />;
            case 'balance':
                return <BalanceDetail transactions={transactions} />;
            case 'income':
                return <IncomeDetail transactions={transactions} />;
            case 'expenses':
                return <ExpensesDetail transactions={transactions} />;
            default:
                return <DefaultDetail />;
        }
    };

    const getModalTitle = () => {
        switch (detailModalType) {
            case 'top-spending': return 'Top Spending Analysis';
            case 'monthly-trend': return 'Monthly Trend';
            case 'weekend': return 'Weekend Activity';
            case 'budget': return 'Budget Status';
            case 'balance': return 'Balance Overview';
            case 'income': return 'Income Details';
            case 'expenses': return 'Expense Details';
            default: return 'Details';
        }
    };

    return (
        <AnimatePresence>
            {detailModalOpen && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                }}>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeDetailModal}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.85)',
                            backdropFilter: 'blur(10px)',
                        }}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        style={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: '800px',
                            maxHeight: '85vh',
                            background: 'var(--bg-secondary)',
                            borderRadius: '28px',
                            border: '1px solid var(--border-color)',
                            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '24px 28px',
                            borderBottom: '1px solid var(--border-color)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexShrink: 0,
                        }}>
                            <div>
                                <h2 style={{
                                    fontSize: '22px',
                                    fontWeight: 800,
                                    color: 'var(--text-primary)',
                                    marginBottom: '4px',
                                }}>
                                    {getModalTitle()}
                                </h2>
                                <p style={{
                                    fontSize: '13px',
                                    color: 'var(--text-muted)',
                                }}>
                                    Detailed breakdown and analysis
                                </p>
                            </div>

                            <div style={{ display: 'flex', gap: '10px' }}>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '10px 16px',
                                        borderRadius: '10px',
                                        border: '1px solid var(--border-color)',
                                        background: 'var(--bg-card)',
                                        color: 'var(--text-secondary)',
                                        fontSize: '13px',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                    }}
                                >
                                    <Download size={16} />
                                    Export
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={closeDetailModal}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '12px',
                                        border: '1px solid var(--border-color)',
                                        background: 'var(--bg-card)',
                                        color: 'var(--text-muted)',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <X size={20} />
                                </motion.button>
                            </div>
                        </div>

                        {/* Content */}
                        <div style={{
                            flex: 1,
                            overflow: 'auto',
                            padding: '28px',
                        }}>
                            {getModalContent()}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

// Top Spending Detail Component
const TopSpendingDetail = ({ transactions }) => {
    const expenses = transactions.filter(t => t.type === 'expense');

    const categorySpending = {};
    expenses.forEach(t => {
        categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount;
    });

    const sortedCategories = Object.entries(categorySpending)
        .sort((a, b) => b[1] - a[1])
        .map(([id, amount]) => {
            const cat = categories.find(c => c.id === id);
            return { ...cat, amount };
        });

    const total = sortedCategories.reduce((sum, c) => sum + c.amount, 0);

    return (
        <div>
            {/* Summary */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                marginBottom: '32px',
            }}>
                <div style={{
                    padding: '24px',
                    borderRadius: '16px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                }}>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Total Spending</p>
                    <p style={{ fontSize: '28px', fontWeight: 800, color: 'var(--error)' }}>₹{total.toLocaleString('en-IN')}</p>
                </div>
                <div style={{
                    padding: '24px',
                    borderRadius: '16px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                }}>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Categories</p>
                    <p style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)' }}>{sortedCategories.length}</p>
                </div>
                <div style={{
                    padding: '24px',
                    borderRadius: '16px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                }}>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Transactions</p>
                    <p style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)' }}>{expenses.length}</p>
                </div>
            </div>

            {/* Category Breakdown */}
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
                Category Breakdown
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {sortedCategories.map((cat, index) => (
                    <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '16px 20px',
                            borderRadius: '14px',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <div style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '4px',
                                background: cat.color,
                            }} />
                            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                                {cat.name}
                            </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{
                                width: '120px',
                                height: '8px',
                                borderRadius: '4px',
                                background: 'var(--bg-tertiary)',
                                overflow: 'hidden',
                            }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(cat.amount / total) * 100}%` }}
                                    transition={{ duration: 0.8, delay: index * 0.05 }}
                                    style={{
                                        height: '100%',
                                        background: cat.color,
                                        borderRadius: '4px',
                                    }}
                                />
                            </div>
                            <span style={{
                                fontSize: '14px',
                                fontWeight: 700,
                                color: 'var(--text-primary)',
                                minWidth: '80px',
                                textAlign: 'right',
                            }}>
                                ₹{(cat.amount / 1000).toFixed(1)}K
                            </span>
                            <span style={{
                                fontSize: '12px',
                                color: 'var(--text-muted)',
                                minWidth: '50px',
                                textAlign: 'right',
                            }}>
                                {((cat.amount / total) * 100).toFixed(1)}%
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// Monthly Trend Detail Component
const MonthlyTrendDetail = ({ transactions }) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();

    const monthlyData = [];
    for (let i = 5; i >= 0; i--) {
        const monthIndex = (currentMonth - i + 12) % 12;
        const monthTx = transactions.filter(t => new Date(t.date).getMonth() === monthIndex);
        const income = monthTx.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
        const expenses = monthTx.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
        monthlyData.push({
            month: months[monthIndex],
            income,
            expenses,
            balance: income - expenses,
        });
    }

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {monthlyData.map((data, index) => (
                    <motion.div
                        key={data.month}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08 }}
                        style={{
                            padding: '20px 24px',
                            borderRadius: '16px',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>{data.month}</span>
                            <span style={{
                                fontSize: '14px',
                                fontWeight: 700,
                                color: data.balance >= 0 ? 'var(--success)' : 'var(--error)',
                            }}>
                                {data.balance >= 0 ? '+' : ''}₹{(data.balance / 1000).toFixed(1)}K
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '24px' }}>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>Income</p>
                                <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--success)' }}>₹{(data.income / 1000).toFixed(1)}K</p>
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>Expenses</p>
                                <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--error)' }}>₹{(data.expenses / 1000).toFixed(1)}K</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// Weekend Activity Detail
const WeekendActivityDetail = ({ transactions }) => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const weekendTx = expenses.filter(t => {
        const day = new Date(t.date).getDay();
        return day === 0 || day === 6;
    });
    const weekdayTx = expenses.filter(t => {
        const day = new Date(t.date).getDay();
        return day !== 0 && day !== 6;
    });

    const weekendTotal = weekendTx.reduce((s, t) => s + t.amount, 0);
    const weekdayTotal = weekdayTx.reduce((s, t) => s + t.amount, 0);

    return (
        <div>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '32px',
            }}>
                <div style={{
                    padding: '28px',
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(251, 191, 36, 0.05) 100%)',
                    border: '1px solid rgba(251, 191, 36, 0.2)',
                }}>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Weekend Spending</p>
                    <p style={{ fontSize: '32px', fontWeight: 800, color: '#fbbf24' }}>₹{(weekendTotal / 1000).toFixed(1)}K</p>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px' }}>{weekendTx.length} transactions</p>
                </div>
                <div style={{
                    padding: '28px',
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                }}>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Weekday Spending</p>
                    <p style={{ fontSize: '32px', fontWeight: 800, color: '#3b82f6' }}>₹{(weekdayTotal / 1000).toFixed(1)}K</p>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px' }}>{weekdayTx.length} transactions</p>
                </div>
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
                Weekend Transactions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {weekendTx.slice(0, 8).map((tx, index) => (
                    <motion.div
                        key={tx.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '14px 18px',
                            borderRadius: '12px',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                        }}
                    >
                        <div>
                            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{tx.description}</p>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                {new Date(tx.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}
                            </p>
                        </div>
                        <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--error)' }}>
                            -₹{tx.amount.toLocaleString('en-IN')}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// Budget Status Detail
const BudgetStatusDetail = ({ transactions }) => {
    const thisMonth = new Date().getMonth();
    const thisMonthExpenses = transactions
        .filter(t => t.type === 'expense' && new Date(t.date).getMonth() === thisMonth)
        .reduce((s, t) => s + t.amount, 0);

    const budget = 75000;
    const remaining = budget - thisMonthExpenses;
    const percentage = (thisMonthExpenses / budget) * 100;

    return (
        <div>
            <div style={{
                padding: '32px',
                borderRadius: '24px',
                background: percentage > 80
                    ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%)'
                    : 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)',
                border: `1px solid ${percentage > 80 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)'}`,
                marginBottom: '32px',
                textAlign: 'center',
            }}>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>Budget Used</p>
                <p style={{
                    fontSize: '56px',
                    fontWeight: 800,
                    color: percentage > 80 ? 'var(--error)' : 'var(--success)',
                    lineHeight: 1,
                }}>
                    {percentage.toFixed(0)}%
                </p>
                <div style={{
                    width: '100%',
                    height: '12px',
                    borderRadius: '6px',
                    background: 'var(--bg-tertiary)',
                    marginTop: '24px',
                    overflow: 'hidden',
                }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(percentage, 100)}%` }}
                        transition={{ duration: 1 }}
                        style={{
                            height: '100%',
                            background: percentage > 80 ? 'var(--error)' : 'var(--success)',
                            borderRadius: '6px',
                        }}
                    />
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
            }}>
                <div style={{
                    padding: '24px',
                    borderRadius: '16px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    textAlign: 'center',
                }}>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>Monthly Budget</p>
                    <p style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)' }}>₹{(budget / 1000).toFixed(0)}K</p>
                </div>
                <div style={{
                    padding: '24px',
                    borderRadius: '16px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    textAlign: 'center',
                }}>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>Spent</p>
                    <p style={{ fontSize: '22px', fontWeight: 700, color: 'var(--error)' }}>₹{(thisMonthExpenses / 1000).toFixed(1)}K</p>
                </div>
                <div style={{
                    padding: '24px',
                    borderRadius: '16px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    textAlign: 'center',
                }}>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>Remaining</p>
                    <p style={{ fontSize: '22px', fontWeight: 700, color: remaining >= 0 ? 'var(--success)' : 'var(--error)' }}>
                        ₹{(Math.abs(remaining) / 1000).toFixed(1)}K
                    </p>
                </div>
            </div>
        </div>
    );
};

// Balance Detail Component
const BalanceDetail = ({ transactions }) => {
    const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const balance = income - expenses;

    return (
        <div>
            <div style={{
                padding: '40px',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.03) 100%)',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                textAlign: 'center',
                marginBottom: '32px',
            }}>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>Current Balance</p>
                <p style={{ fontSize: '48px', fontWeight: 800, color: 'var(--success)' }}>
                    ₹{balance.toLocaleString('en-IN')}
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{
                    padding: '28px',
                    borderRadius: '20px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                        <ArrowUpRight size={20} color="var(--success)" />
                        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Total Income</span>
                    </div>
                    <p style={{ fontSize: '28px', fontWeight: 800, color: 'var(--success)' }}>
                        +₹{(income / 1000).toFixed(1)}K
                    </p>
                </div>
                <div style={{
                    padding: '28px',
                    borderRadius: '20px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                        <ArrowDownRight size={20} color="var(--error)" />
                        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Total Expenses</span>
                    </div>
                    <p style={{ fontSize: '28px', fontWeight: 800, color: 'var(--error)' }}>
                        -₹{(expenses / 1000).toFixed(1)}K
                    </p>
                </div>
            </div>
        </div>
    );
};

// Income Detail
const IncomeDetail = ({ transactions }) => {
    const incomeTransactions = transactions.filter(t => t.type === 'income');
    const total = incomeTransactions.reduce((s, t) => s + t.amount, 0);

    return (
        <div>
            <div style={{
                padding: '32px',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.03) 100%)',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                marginBottom: '32px',
                textAlign: 'center',
            }}>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>Total Income</p>
                <p style={{ fontSize: '42px', fontWeight: 800, color: 'var(--success)' }}>₹{total.toLocaleString('en-IN')}</p>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px' }}>{incomeTransactions.length} transactions</p>
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
                All Income
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {incomeTransactions.map((tx, index) => (
                    <motion.div
                        key={tx.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '16px 20px',
                            borderRadius: '14px',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                        }}
                    >
                        <div>
                            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{tx.description}</p>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                {new Date(tx.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                        </div>
                        <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--success)' }}>
                            +₹{tx.amount.toLocaleString('en-IN')}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// Expenses Detail
const ExpensesDetail = ({ transactions }) => {
    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    const total = expenseTransactions.reduce((s, t) => s + t.amount, 0);

    return (
        <div>
            <div style={{
                padding: '32px',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.03) 100%)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                marginBottom: '32px',
                textAlign: 'center',
            }}>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>Total Expenses</p>
                <p style={{ fontSize: '42px', fontWeight: 800, color: 'var(--error)' }}>₹{total.toLocaleString('en-IN')}</p>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px' }}>{expenseTransactions.length} transactions</p>
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
                All Expenses
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {expenseTransactions.map((tx, index) => (
                    <motion.div
                        key={tx.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '16px 20px',
                            borderRadius: '14px',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                        }}
                    >
                        <div>
                            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{tx.description}</p>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                {new Date(tx.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                        </div>
                        <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--error)' }}>
                            -₹{tx.amount.toLocaleString('en-IN')}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// Default Detail
const DefaultDetail = () => (
    <div style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ color: 'var(--text-muted)' }}>No details available</p>
    </div>
);

export default DetailModal;