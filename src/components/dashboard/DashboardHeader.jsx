import { motion } from 'framer-motion';
import {
    TrendingUp,
    TrendingDown,
    Calendar,
    Sparkles,
    ArrowRight
} from 'lucide-react';
import { FadeIn } from '../animations';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { useUIStore } from '../../stores/useUIStore';
import { useTransactionStore } from '../../stores/useTransactionStore';
import { getGreeting, formatDate } from '../../utils/formatters';
import { calculatePercentageChange, calculateBalance, calculateTotalExpenses } from '../../utils/calculations';

const DashboardHeader = () => {
    const { role, openTransactionModal } = useUIStore();
    const { transactions } = useTransactionStore();

    const greeting = getGreeting();
    const today = formatDate(new Date(), 'long');

    // Calculate month-over-month change
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const thisMonthTransactions = transactions.filter(t => {
        const d = new Date(t.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });

    const lastMonthTransactions = transactions.filter(t => {
        const d = new Date(t.date);
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear;
    });

    const thisMonthExpenses = calculateTotalExpenses(thisMonthTransactions);
    const lastMonthExpenses = calculateTotalExpenses(lastMonthTransactions);
    const expenseChange = calculatePercentageChange(thisMonthExpenses, lastMonthExpenses);

    return (
        <FadeIn className="mb-8">
            <div className="relative overflow-hidden rounded-3xl">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 via-[var(--color-secondary)]/5 to-transparent" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[var(--color-primary)]/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[var(--color-secondary)]/20 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                {/* Content */}
                <div className="relative glass glass-border rounded-3xl p-6 lg:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                        {/* Left Side - Greeting */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 10, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                                    className="text-3xl"
                                >
                                    👋
                                </motion.div>
                                <div>
                                    <h1 className="text-2xl lg:text-3xl font-bold text-[var(--color-text-primary)]">
                                        {greeting}, <span className="text-gradient">Rajsv</span>
                                    </h1>
                                    <p className="text-[var(--color-text-secondary)] text-sm lg:text-base mt-1">
                                        Here's your financial overview for this month
                                    </p>
                                </div>
                            </div>

                            {/* Date & Quick Stats */}
                            <div className="flex flex-wrap items-center gap-3">
                                <Badge variant="default" icon={<Calendar className="w-3 h-3" />}>
                                    {today}
                                </Badge>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <Badge
                                        variant={expenseChange <= 0 ? 'success' : 'warning'}
                                        icon={expenseChange <= 0 ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                                    >
                                        {expenseChange <= 0 ? 'Expenses down' : 'Expenses up'} {Math.abs(expenseChange).toFixed(1)}% this month
                                    </Badge>
                                </motion.div>
                            </div>
                        </div>

                        {/* Right Side - Quick Actions */}
                        <div className="flex flex-wrap items-center gap-3">
                            {role === 'admin' && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <Button
                                        variant="primary"
                                        onClick={() => openTransactionModal()}
                                        leftIcon={<Sparkles className="w-4 h-4" />}
                                        rightIcon={<ArrowRight className="w-4 h-4" />}
                                    >
                                        Add Transaction
                                    </Button>
                                </motion.div>
                            )}

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Button variant="secondary">
                                    View Reports
                                </Button>
                            </motion.div>
                        </div>
                    </div>

                    {/* Quick Insights Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-6 pt-6 border-t border-[var(--color-border)]"
                    >
                        <div className="flex flex-wrap items-center gap-6 text-sm">
                            <QuickStat
                                label="Active Budgets"
                                value="4"
                                color="var(--color-primary)"
                            />
                            <QuickStat
                                label="Pending Bills"
                                value="2"
                                color="var(--color-warning)"
                            />
                            <QuickStat
                                label="Savings Goal"
                                value="68%"
                                color="var(--color-success)"
                            />
                            <QuickStat
                                label="Transactions"
                                value={thisMonthTransactions.length.toString()}
                                color="var(--color-secondary)"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </FadeIn>
    );
};

// Quick Stat Component
const QuickStat = ({ label, value, color }) => (
    <div className="flex items-center gap-2">
        <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: color }}
        />
        <span className="text-[var(--color-text-muted)]">{label}:</span>
        <span className="font-semibold text-[var(--color-text-primary)]">{value}</span>
    </div>
);

export default DashboardHeader;