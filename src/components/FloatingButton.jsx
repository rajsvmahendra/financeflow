import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, TrendingUp, TrendingDown, FileText, PieChart } from 'lucide-react';
import { useUIStore } from '../stores/useUIStore';

const FloatingButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { role, openTransactionModal, addToast } = useUIStore();

    if (role !== 'admin') return null;

    const actions = [
        {
            id: 'income',
            label: 'Add Income',
            icon: TrendingUp,
            gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
            shadow: 'rgba(34, 197, 94, 0.4)',
        },
        {
            id: 'expense',
            label: 'Add Expense',
            icon: TrendingDown,
            gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            shadow: 'rgba(239, 68, 68, 0.4)',
        },
        {
            id: 'report',
            label: 'View Report',
            icon: PieChart,
            gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            shadow: 'rgba(59, 130, 246, 0.4)',
        },
    ];

    const handleAction = (actionId) => {
        if (actionId === 'income' || actionId === 'expense') {
            openTransactionModal();
        } else {
            addToast({
                type: 'info',
                title: 'Coming Soon',
                message: 'Reports feature will be available soon!',
            });
        }
        setIsOpen(false);
    };

    return (
        <>
            {/* Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.5)',
                            backdropFilter: 'blur(4px)',
                            zIndex: 90,
                        }}
                    />
                )}
            </AnimatePresence>

            {/* FAB Container */}
            <div style={{
                position: 'fixed',
                bottom: '32px',
                right: '32px',
                zIndex: 100,
            }}>
                {/* Action Buttons */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'absolute',
                                bottom: '80px',
                                right: '0',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                                gap: '14px',
                            }}
                        >
                            {actions.map((action, index) => (
                                <motion.div
                                    key={action.id}
                                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        transition: { delay: index * 0.05, type: 'spring', stiffness: 300 }
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: 20,
                                        scale: 0.8,
                                        transition: { delay: (actions.length - index - 1) * 0.03 }
                                    }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '14px',
                                    }}
                                >
                                    {/* Label */}
                                    <motion.span
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0, transition: { delay: index * 0.05 + 0.1 } }}
                                        style={{
                                            padding: '10px 18px',
                                            borderRadius: '12px',
                                            background: 'var(--bg-elevated)',
                                            border: '1px solid var(--border-color)',
                                            color: 'var(--text-primary)',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            whiteSpace: 'nowrap',
                                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                                        }}
                                    >
                                        {action.label}
                                    </motion.span>

                                    {/* Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleAction(action.id)}
                                        style={{
                                            width: '56px',
                                            height: '56px',
                                            borderRadius: '16px',
                                            border: 'none',
                                            background: action.gradient,
                                            color: 'white',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: `0 8px 25px ${action.shadow}`,
                                        }}
                                    >
                                        <action.icon size={24} />
                                    </motion.button>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main FAB */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '20px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                        color: '#09090b',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 30px rgba(251, 191, 36, 0.5)',
                        transition: 'box-shadow 0.3s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 12px 40px rgba(251, 191, 36, 0.6)'}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 8px 30px rgba(251, 191, 36, 0.5)'}
                >
                    <motion.div
                        animate={{ rotate: isOpen ? 135 : 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                        {isOpen ? <X size={28} strokeWidth={2.5} /> : <Plus size={28} strokeWidth={2.5} />}
                    </motion.div>
                </motion.button>
            </div>
        </>
    );
};

export default FloatingButton;