import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight } from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { useThemeStore } from '../stores/useThemeStore';

const data = [
    { month: 'Jul', income: 85000, expenses: 43000, balance: 42000 },
    { month: 'Aug', income: 92000, expenses: 46000, balance: 46000 },
    { month: 'Sep', income: 98000, expenses: 47000, balance: 51000 },
    { month: 'Oct', income: 88000, expenses: 38500, balance: 49500 },
    { month: 'Nov', income: 125000, expenses: 64000, balance: 61000 },
    { month: 'Dec', income: 118000, expenses: 33500, balance: 84500 },
];

const BalanceChart = () => {
    const [range, setRange] = useState('6M');
    const [activeMetric, setActiveMetric] = useState('all');
    const { theme } = useThemeStore();
    const ranges = ['1W', '1M', '3M', '6M', '1Y'];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '16px',
                        padding: '16px 20px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                        minWidth: '180px',
                    }}
                >
                    <p style={{
                        color: 'var(--text-primary)',
                        fontWeight: 700,
                        marginBottom: '12px',
                        fontSize: '14px',
                    }}>
                        {label} 2024
                    </p>
                    {payload.map((entry, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '16px',
                            marginBottom: '8px',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '3px',
                                    background: entry.color,
                                }} />
                                <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                                    {entry.name}
                                </span>
                            </div>
                            <span style={{
                                color: 'var(--text-primary)',
                                fontWeight: 600,
                                fontSize: '13px',
                                fontVariantNumeric: 'tabular-nums',
                            }}>
                                ₹{(entry.value / 1000).toFixed(1)}K
                            </span>
                        </div>
                    ))}
                </motion.div>
            );
        }
        return null;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
                padding: '28px',
                borderRadius: '24px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                height: '100%',
            }}
        >
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '28px',
                flexWrap: 'wrap',
                gap: '16px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 20px rgba(251, 191, 36, 0.3)',
                    }}>
                        <TrendingUp size={22} color="#09090b" strokeWidth={2.5} />
                    </div>
                    <div>
                        <h3 style={{
                            fontSize: '18px',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            marginBottom: '4px',
                        }}>
                            Balance Trend
                        </h3>
                        <p style={{
                            fontSize: '13px',
                            color: 'var(--text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}>
                            <span style={{
                                color: 'var(--success)',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2px',
                            }}>
                                <ArrowUpRight size={14} />
                                +38.5%
                            </span>
                            vs last period
                        </p>
                    </div>
                </div>

                {/* Range Selector */}
                <div style={{
                    display: 'flex',
                    gap: '4px',
                    padding: '4px',
                    borderRadius: '12px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                }}>
                    {ranges.map((r) => (
                        <motion.button
                            key={r}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setRange(r)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '8px',
                                border: 'none',
                                background: range === r
                                    ? 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
                                    : 'transparent',
                                color: range === r ? '#09090b' : 'var(--text-muted)',
                                fontSize: '12px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            {r}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Metric Toggles */}
            <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '20px',
            }}>
                {[
                    { id: 'all', label: 'All', color: 'var(--text-secondary)' },
                    { id: 'income', label: 'Income', color: '#22c55e' },
                    { id: 'expenses', label: 'Expenses', color: '#ef4444' },
                ].map((metric) => (
                    <button
                        key={metric.id}
                        onClick={() => setActiveMetric(metric.id)}
                        style={{
                            padding: '6px 14px',
                            borderRadius: '8px',
                            border: `1px solid ${activeMetric === metric.id ? metric.color : 'var(--border-color)'}`,
                            background: activeMetric === metric.id ? `${metric.color}15` : 'transparent',
                            color: activeMetric === metric.id ? metric.color : 'var(--text-muted)',
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        {metric.label}
                    </button>
                ))}
            </div>

            {/* Chart */}
            <div style={{ height: '260px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <defs>
                            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />
                                <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.4} />
                                <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="var(--border-color)"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--text-muted)', fontSize: 12, fontWeight: 500 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--text-muted)', fontSize: 12, fontWeight: 500 }}
                            tickFormatter={(v) => `₹${v / 1000}K`}
                            width={55}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        {(activeMetric === 'all' || activeMetric === 'income') && (
                            <Area
                                type="monotone"
                                dataKey="income"
                                name="Income"
                                stroke="#22c55e"
                                strokeWidth={2.5}
                                fill="url(#incomeGradient)"
                                dot={false}
                                activeDot={{
                                    r: 6,
                                    fill: '#22c55e',
                                    stroke: 'var(--bg-primary)',
                                    strokeWidth: 3
                                }}
                            />
                        )}
                        {(activeMetric === 'all' || activeMetric === 'expenses') && (
                            <Area
                                type="monotone"
                                dataKey="expenses"
                                name="Expenses"
                                stroke="#ef4444"
                                strokeWidth={2.5}
                                fill="url(#expenseGradient)"
                                dot={false}
                                activeDot={{
                                    r: 6,
                                    fill: '#ef4444',
                                    stroke: 'var(--bg-primary)',
                                    strokeWidth: 3
                                }}
                            />
                        )}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default BalanceChart;