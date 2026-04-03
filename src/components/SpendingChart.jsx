import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart as PieIcon, ArrowRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';

const data = [
    { name: 'Food & Dining', value: 18500, color: '#fbbf24' },
    { name: 'Rent & Bills', value: 22000, color: '#3b82f6' },
    { name: 'Transportation', value: 8800, color: '#22c55e' },
    { name: 'Shopping', value: 12500, color: '#a855f7' },
    { name: 'Entertainment', value: 5200, color: '#ef4444' },
    { name: 'Others', value: 6500, color: '#64748b' },
];

const total = data.reduce((sum, d) => sum + d.value, 0);

const SpendingChart = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const formatCurrency = (value) => {
        if (value >= 1000) {
            return `₹${(value / 1000).toFixed(1)}K`;
        }
        return `₹${value}`;
    };

    const renderActiveShape = (props) => {
        const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

        return (
            <g>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius - 4}
                    outerRadius={outerRadius + 10}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                    style={{
                        filter: `drop-shadow(0 0 15px ${fill}80)`,
                        transition: 'all 0.3s ease',
                    }}
                />
            </g>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
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
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '28px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 20px rgba(168, 85, 247, 0.3)',
                    }}>
                        <PieIcon size={22} color="white" strokeWidth={2.5} />
                    </div>
                    <div>
                        <h3 style={{
                            fontSize: '18px',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            marginBottom: '4px',
                        }}>
                            Spending Breakdown
                        </h3>
                        <p style={{
                            fontSize: '13px',
                            color: 'var(--text-muted)',
                        }}>
                            By category this month
                        </p>
                    </div>
                </div>

                <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    background: 'transparent',
                    color: 'var(--text-muted)',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                }}>
                    Details
                    <ArrowRight size={14} />
                </button>
            </div>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '32px',
                flexWrap: 'wrap',
            }}>
                {/* Chart */}
                <div style={{
                    position: 'relative',
                    width: '220px',
                    height: '220px',
                    flexShrink: 0,
                    margin: '0 auto',
                }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={65}
                                outerRadius={95}
                                paddingAngle={4}
                                dataKey="value"
                                activeIndex={activeIndex}
                                activeShape={renderActiveShape}
                                onMouseEnter={(_, index) => setActiveIndex(index)}
                                onMouseLeave={() => setActiveIndex(null)}
                                animationBegin={0}
                                animationDuration={1000}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                        stroke="transparent"
                                        style={{
                                            transition: 'all 0.3s ease',
                                            opacity: activeIndex !== null && activeIndex !== index ? 0.3 : 1,
                                            cursor: 'pointer',
                                        }}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Center Text */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        pointerEvents: 'none',
                    }}>
                        <AnimatePresence mode="wait">
                            {activeIndex !== null ? (
                                <motion.div
                                    key="active"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <p style={{
                                        fontSize: '11px',
                                        color: 'var(--text-muted)',
                                        marginBottom: '4px',
                                        fontWeight: 500,
                                    }}>
                                        {data[activeIndex]?.name}
                                    </p>
                                    <p style={{
                                        fontSize: '24px',
                                        fontWeight: 800,
                                        color: data[activeIndex]?.color,
                                        letterSpacing: '-0.02em',
                                    }}>
                                        {formatCurrency(data[activeIndex]?.value)}
                                    </p>
                                    <p style={{
                                        fontSize: '12px',
                                        color: 'var(--text-muted)',
                                        fontWeight: 600,
                                    }}>
                                        {((data[activeIndex]?.value / total) * 100).toFixed(1)}%
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="total"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <p style={{
                                        fontSize: '11px',
                                        color: 'var(--text-muted)',
                                        marginBottom: '4px',
                                        fontWeight: 500,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                    }}>
                                        Total Spent
                                    </p>
                                    <p style={{
                                        fontSize: '24px',
                                        fontWeight: 800,
                                        color: 'var(--text-primary)',
                                        letterSpacing: '-0.02em',
                                    }}>
                                        {formatCurrency(total)}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Legend */}
                <div style={{ flex: 1, minWidth: '200px' }}>
                    {data.map((item, index) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(null)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '12px 16px',
                                borderRadius: '12px',
                                marginBottom: '6px',
                                background: activeIndex === index ? 'var(--bg-tertiary)' : 'transparent',
                                border: `1px solid ${activeIndex === index ? 'var(--border-hover)' : 'transparent'}`,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '4px',
                                    background: item.color,
                                    boxShadow: activeIndex === index ? `0 0 10px ${item.color}50` : 'none',
                                    transition: 'box-shadow 0.2s ease',
                                }} />
                                <span style={{
                                    fontSize: '13px',
                                    color: 'var(--text-primary)',
                                    fontWeight: 500,
                                }}>
                                    {item.name}
                                </span>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <span style={{
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    color: activeIndex === index ? item.color : 'var(--text-primary)',
                                    transition: 'color 0.2s ease',
                                }}>
                                    {formatCurrency(item.value)}
                                </span>
                                <span style={{
                                    display: 'block',
                                    fontSize: '11px',
                                    color: 'var(--text-muted)',
                                }}>
                                    {((item.value / total) * 100).toFixed(1)}%
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default SpendingChart;