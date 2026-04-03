import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    DollarSign,
    FileText,
    Tag,
    Sparkles,
    Check,
} from 'lucide-react';
import { useUIStore } from '../stores/useUIStore';
import { useTransactionStore } from '../stores/useTransactionStore';
import { categories } from '../data/mockData';

const TransactionModal = () => {
    const {
        isTransactionModalOpen,
        editingTransaction,
        closeTransactionModal,
        addToast,
    } = useUIStore();

    const { addTransaction, updateTransaction } = useTransactionStore();

    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        category: '',
        type: 'expense',
        date: new Date().toISOString().split('T')[0],
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (editingTransaction) {
            setFormData({
                description: editingTransaction.description,
                amount: editingTransaction.amount.toString(),
                category: editingTransaction.category,
                type: editingTransaction.type,
                date: editingTransaction.date,
            });
        } else {
            setFormData({
                description: '',
                amount: '',
                category: '',
                type: 'expense',
                date: new Date().toISOString().split('T')[0],
            });
        }
        setErrors({});
    }, [editingTransaction, isTransactionModalOpen]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.amount || parseFloat(formData.amount) <= 0) newErrors.amount = 'Enter valid amount';
        if (!formData.category) newErrors.category = 'Select a category';
        if (!formData.date) newErrors.date = 'Select a date';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 600));

        const transactionData = {
            description: formData.description.trim(),
            amount: parseFloat(formData.amount),
            category: formData.category,
            type: formData.type,
            date: formData.date,
            status: 'completed',
        };

        if (editingTransaction) {
            updateTransaction(editingTransaction.id, transactionData);
            addToast({ type: 'success', title: 'Updated!', message: 'Transaction updated successfully' });
        } else {
            addTransaction(transactionData);
            addToast({ type: 'success', title: 'Success!', message: 'Transaction added successfully' });
        }

        setIsSubmitting(false);
        closeTransactionModal();
    };

    const categoryOptions = categories.filter(c => {
        if (formData.type === 'income') {
            return ['salary', 'freelance', 'investment', 'other'].includes(c.id);
        }
        return !['salary', 'freelance', 'investment'].includes(c.id);
    });

    const quickSuggestions = [
        { desc: 'Salary', amount: 85000, cat: 'salary', type: 'income' },
        { desc: 'Groceries', amount: 2500, cat: 'food', type: 'expense' },
        { desc: 'Electricity', amount: 1800, cat: 'utilities', type: 'expense' },
        { desc: 'Uber', amount: 450, cat: 'travel', type: 'expense' },
    ];

    return (
        <AnimatePresence>
            {isTransactionModalOpen && (
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
                        onClick={closeTransactionModal}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.8)',
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
                            maxWidth: '520px',
                            background: 'var(--bg-secondary)',
                            borderRadius: '28px',
                            border: '1px solid var(--border-color)',
                            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.05)',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '28px 28px 0',
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                        }}>
                            <div>
                                <h2 style={{
                                    fontSize: '24px',
                                    fontWeight: 800,
                                    color: 'var(--text-primary)',
                                    marginBottom: '6px',
                                    letterSpacing: '-0.02em',
                                }}>
                                    {editingTransaction ? 'Edit Transaction' : 'New Transaction'}
                                </h2>
                                <p style={{
                                    fontSize: '14px',
                                    color: 'var(--text-muted)',
                                }}>
                                    {editingTransaction ? 'Update the details below' : 'Fill in the transaction details'}
                                </p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={closeTransactionModal}
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
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <X size={20} />
                            </motion.button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} style={{ padding: '28px' }}>
                            {/* Type Selector */}
                            <div style={{ marginBottom: '28px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    color: 'var(--text-secondary)',
                                    marginBottom: '12px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                }}>
                                    Transaction Type
                                </label>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                                    {/* Income Button */}
                                    <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleChange('type', 'income')}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '12px',
                                            padding: '18px',
                                            borderRadius: '16px',
                                            border: `2px solid ${formData.type === 'income' ? '#22c55e' : 'var(--border-color)'}`,
                                            background: formData.type === 'income' ? 'var(--success-muted)' : 'transparent',
                                            color: formData.type === 'income' ? 'var(--success)' : 'var(--text-muted)',
                                            fontSize: '15px',
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                        }}
                                    >
                                        <div style={{
                                            width: '36px',
                                            height: '36px',
                                            borderRadius: '10px',
                                            background: formData.type === 'income' ? 'var(--success)' : 'var(--bg-tertiary)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <ArrowUpRight size={20} color={formData.type === 'income' ? 'white' : 'var(--text-muted)'} />
                                        </div>
                                        Income
                                    </motion.button>

                                    {/* Expense Button */}
                                    <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleChange('type', 'expense')}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '12px',
                                            padding: '18px',
                                            borderRadius: '16px',
                                            border: `2px solid ${formData.type === 'expense' ? '#ef4444' : 'var(--border-color)'}`,
                                            background: formData.type === 'expense' ? 'var(--error-muted)' : 'transparent',
                                            color: formData.type === 'expense' ? 'var(--error)' : 'var(--text-muted)',
                                            fontSize: '15px',
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                        }}
                                    >
                                        <div style={{
                                            width: '36px',
                                            height: '36px',
                                            borderRadius: '10px',
                                            background: formData.type === 'expense' ? 'var(--error)' : 'var(--bg-tertiary)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <ArrowDownRight size={20} color={formData.type === 'expense' ? 'white' : 'var(--text-muted)'} />
                                        </div>
                                        Expense
                                    </motion.button>
                                </div>
                            </div>

                            {/* Description */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    color: 'var(--text-secondary)',
                                    marginBottom: '10px',
                                }}>
                                    Description
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <FileText size={18} style={{
                                        position: 'absolute',
                                        left: '16px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: errors.description ? 'var(--error)' : 'var(--text-muted)',
                                    }} />
                                    <input
                                        type="text"
                                        placeholder="e.g., Monthly salary, Grocery shopping..."
                                        value={formData.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '16px 16px 16px 50px',
                                            borderRadius: '14px',
                                            border: `2px solid ${errors.description ? 'var(--error)' : 'var(--border-color)'}`,
                                            background: 'var(--bg-card)',
                                            color: 'var(--text-primary)',
                                            fontSize: '15px',
                                            outline: 'none',
                                            transition: 'border-color 0.2s ease',
                                        }}
                                        onFocus={(e) => !errors.description && (e.currentTarget.style.borderColor = 'var(--primary)')}
                                        onBlur={(e) => !errors.description && (e.currentTarget.style.borderColor = 'var(--border-color)')}
                                    />
                                </div>
                                {errors.description && (
                                    <p style={{ color: 'var(--error)', fontSize: '12px', marginTop: '8px', fontWeight: 500 }}>
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            {/* Amount & Date Row */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                                {/* Amount */}
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '13px',
                                        fontWeight: 600,
                                        color: 'var(--text-secondary)',
                                        marginBottom: '10px',
                                    }}>
                                        Amount (₹)
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <DollarSign size={18} style={{
                                            position: 'absolute',
                                            left: '16px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: errors.amount ? 'var(--error)' : 'var(--text-muted)',
                                        }} />
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            value={formData.amount}
                                            onChange={(e) => handleChange('amount', e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '16px 16px 16px 50px',
                                                borderRadius: '14px',
                                                border: `2px solid ${errors.amount ? 'var(--error)' : 'var(--border-color)'}`,
                                                background: 'var(--bg-card)',
                                                color: 'var(--text-primary)',
                                                fontSize: '15px',
                                                outline: 'none',
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Date */}
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '13px',
                                        fontWeight: 600,
                                        color: 'var(--text-secondary)',
                                        marginBottom: '10px',
                                    }}>
                                        Date
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <Calendar size={18} style={{
                                            position: 'absolute',
                                            left: '16px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: 'var(--text-muted)',
                                        }} />
                                        <input
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => handleChange('date', e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '16px 16px 16px 50px',
                                                borderRadius: '14px',
                                                border: '2px solid var(--border-color)',
                                                background: 'var(--bg-card)',
                                                color: 'var(--text-primary)',
                                                fontSize: '15px',
                                                outline: 'none',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Category */}
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    color: 'var(--text-secondary)',
                                    marginBottom: '10px',
                                }}>
                                    Category
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <Tag size={18} style={{
                                        position: 'absolute',
                                        left: '16px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: errors.category ? 'var(--error)' : 'var(--text-muted)',
                                        zIndex: 1,
                                    }} />
                                    <select
                                        value={formData.category}
                                        onChange={(e) => handleChange('category', e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '16px 16px 16px 50px',
                                            borderRadius: '14px',
                                            border: `2px solid ${errors.category ? 'var(--error)' : 'var(--border-color)'}`,
                                            background: 'var(--bg-card)',
                                            color: formData.category ? 'var(--text-primary)' : 'var(--text-muted)',
                                            fontSize: '15px',
                                            outline: 'none',
                                            cursor: 'pointer',
                                            appearance: 'none',
                                        }}
                                    >
                                        <option value="">Select a category...</option>
                                        {categoryOptions.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Quick Suggestions */}
                            {!editingTransaction && (
                                <div style={{ marginBottom: '28px' }}>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '13px',
                                        fontWeight: 600,
                                        color: 'var(--text-secondary)',
                                        marginBottom: '12px',
                                    }}>
                                        Quick Fill
                                    </label>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {quickSuggestions.map((s, i) => (
                                            <motion.button
                                                key={i}
                                                type="button"
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                onClick={() => setFormData({
                                                    description: s.desc,
                                                    amount: s.amount.toString(),
                                                    category: s.cat,
                                                    type: s.type,
                                                    date: formData.date,
                                                })}
                                                style={{
                                                    padding: '8px 14px',
                                                    borderRadius: '10px',
                                                    border: '1px solid var(--border-color)',
                                                    background: 'var(--bg-tertiary)',
                                                    color: 'var(--text-secondary)',
                                                    fontSize: '12px',
                                                    fontWeight: 600,
                                                    cursor: 'pointer',
                                                    transition: 'all 0.15s ease',
                                                }}
                                            >
                                                {s.desc}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div style={{
                                display: 'flex',
                                gap: '14px',
                                paddingTop: '24px',
                                borderTop: '1px solid var(--border-color)',
                            }}>
                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={closeTransactionModal}
                                    disabled={isSubmitting}
                                    style={{
                                        flex: 1,
                                        padding: '16px',
                                        borderRadius: '14px',
                                        border: '1px solid var(--border-color)',
                                        background: 'transparent',
                                        color: 'var(--text-secondary)',
                                        fontSize: '15px',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                    }}
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={isSubmitting}
                                    style={{
                                        flex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        padding: '16px',
                                        borderRadius: '14px',
                                        border: 'none',
                                        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                                        color: '#09090b',
                                        fontSize: '15px',
                                        fontWeight: 700,
                                        cursor: isSubmitting ? 'wait' : 'pointer',
                                        opacity: isSubmitting ? 0.7 : 1,
                                        boxShadow: '0 4px 20px rgba(251, 191, 36, 0.4)',
                                    }}
                                >
                                    {isSubmitting ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                                            style={{
                                                width: '20px',
                                                height: '20px',
                                                border: '2px solid #09090b',
                                                borderTopColor: 'transparent',
                                                borderRadius: '50%',
                                            }}
                                        />
                                    ) : (
                                        <>
                                            {editingTransaction ? <Check size={20} /> : <Sparkles size={20} />}
                                            {editingTransaction ? 'Update' : 'Add Transaction'}
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default TransactionModal;