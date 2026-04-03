import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Download,
    Plus,
    Edit2,
    Trash2,
    ArrowUpRight,
    ArrowDownRight,
    Filter,
    ChevronDown,
    FileSpreadsheet,
    FileJson,
    X,
    Calendar,
    MoreVertical,
    CheckCircle,
    Clock,
} from 'lucide-react';
import { useTransactionStore } from '../stores/useTransactionStore';
import { useFilterStore } from '../stores/useFilterStore';
import { useUIStore } from '../stores/useUIStore';
import { categories } from '../data/mockData';
import { exportToCSV, exportToJSON } from '../utils/exportData';

const TransactionsList = () => {
    const { transactions, deleteTransaction } = useTransactionStore();
    const { searchQuery, setSearchQuery, categoryFilter, setCategoryFilter, typeFilter, setTypeFilter, resetFilters } = useFilterStore();
    const { role, openTransactionModal, addToast } = useUIStore();

    const [showExportMenu, setShowExportMenu] = useState(false);
    const [activeRowMenu, setActiveRowMenu] = useState(null);

    const filteredTransactions = useMemo(() => {
        let result = [...transactions];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(t =>
                t.description.toLowerCase().includes(query) ||
                t.category.toLowerCase().includes(query)
            );
        }

        if (categoryFilter !== 'all') {
            result = result.filter(t => t.category === categoryFilter);
        }

        if (typeFilter !== 'all') {
            result = result.filter(t => t.type === typeFilter);
        }

        return result.sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [transactions, searchQuery, categoryFilter, typeFilter]);

    const handleDelete = (id) => {
        deleteTransaction(id);
        addToast({ type: 'success', title: 'Deleted', message: 'Transaction removed successfully' });
        setActiveRowMenu(null);
    };

    const handleExport = (format) => {
        if (format === 'csv') {
            exportToCSV(filteredTransactions);
            addToast({ type: 'success', title: 'Exported', message: 'Downloaded as CSV file' });
        } else {
            exportToJSON(filteredTransactions);
            addToast({ type: 'success', title: 'Exported', message: 'Downloaded as JSON file' });
        }
        setShowExportMenu(false);
    };

    const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    const getCategoryInfo = (catId) => {
        return categories.find(c => c.id === catId) || { name: catId, color: '#64748b' };
    };

    const hasActiveFilters = searchQuery || categoryFilter !== 'all' || typeFilter !== 'all';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{
                borderRadius: '24px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                overflow: 'hidden',
            }}
        >
            {/* Header */}
            <div style={{
                padding: '28px',
                borderBottom: '1px solid var(--border-color)',
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '20px',
                    marginBottom: '24px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '14px',
                            background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 8px 20px rgba(6, 182, 212, 0.3)',
                        }}>
                            <Calendar size={22} color="white" strokeWidth={2.5} />
                        </div>
                        <div>
                            <h3 style={{
                                fontSize: '18px',
                                fontWeight: 700,
                                color: 'var(--text-primary)',
                                marginBottom: '4px',
                            }}>
                                Transactions
                            </h3>
                            <p style={{
                                fontSize: '13px',
                                color: 'var(--text-muted)',
                            }}>
                                {filteredTransactions.length} of {transactions.length} transactions
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {/* Add Button */}
                        {role === 'admin' && (
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => openTransactionModal()}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '12px 20px',
                                    borderRadius: '12px',
                                    border: 'none',
                                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                                    color: '#09090b',
                                    fontSize: '13px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 15px rgba(251, 191, 36, 0.4)',
                                }}
                            >
                                <Plus size={18} strokeWidth={2.5} />
                                Add Transaction
                            </motion.button>
                        )}

                        {/* Export Button */}
                        <div style={{ position: 'relative' }}>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setShowExportMenu(!showExportMenu)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '12px 18px',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border-color)',
                                    background: 'var(--bg-secondary)',
                                    color: 'var(--text-secondary)',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                }}
                            >
                                <Download size={16} />
                                Export
                                <ChevronDown size={14} style={{
                                    transform: showExportMenu ? 'rotate(180deg)' : 'rotate(0)',
                                    transition: 'transform 0.2s ease',
                                }} />
                            </motion.button>

                            <AnimatePresence>
                                {showExportMenu && (
                                    <>
                                        <div
                                            onClick={() => setShowExportMenu(false)}
                                            style={{ position: 'fixed', inset: 0, zIndex: 10 }}
                                        />
                                        <motion.div
                                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                            style={{
                                                position: 'absolute',
                                                top: 'calc(100% + 8px)',
                                                right: 0,
                                                width: '180px',
                                                background: 'var(--bg-elevated)',
                                                border: '1px solid var(--border-color)',
                                                borderRadius: '14px',
                                                boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
                                                overflow: 'hidden',
                                                zIndex: 20,
                                            }}
                                        >
                                            <button
                                                onClick={() => handleExport('csv')}
                                                style={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '12px',
                                                    padding: '14px 16px',
                                                    border: 'none',
                                                    background: 'transparent',
                                                    color: 'var(--text-secondary)',
                                                    fontSize: '13px',
                                                    fontWeight: 500,
                                                    cursor: 'pointer',
                                                    transition: 'all 0.15s ease',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = 'var(--bg-tertiary)';
                                                    e.currentTarget.style.color = 'var(--text-primary)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = 'transparent';
                                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                                }}
                                            >
                                                <FileSpreadsheet size={18} />
                                                Export CSV
                                            </button>
                                            <button
                                                onClick={() => handleExport('json')}
                                                style={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '12px',
                                                    padding: '14px 16px',
                                                    border: 'none',
                                                    background: 'transparent',
                                                    color: 'var(--text-secondary)',
                                                    fontSize: '13px',
                                                    fontWeight: 500,
                                                    cursor: 'pointer',
                                                    transition: 'all 0.15s ease',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = 'var(--bg-tertiary)';
                                                    e.currentTarget.style.color = 'var(--text-primary)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = 'transparent';
                                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                                }}
                                            >
                                                <FileJson size={18} />
                                                Export JSON
                                            </button>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Filters Row */}
                <div style={{
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                }}>
                    {/* Search */}
                    <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
                        <Search
                            size={18}
                            style={{
                                position: 'absolute',
                                left: '16px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--text-muted)',
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Search transactions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 16px 12px 48px',
                                borderRadius: '12px',
                                border: '1px solid var(--border-color)',
                                background: 'var(--bg-secondary)',
                                color: 'var(--text-primary)',
                                fontSize: '14px',
                                outline: 'none',
                                transition: 'all 0.2s ease',
                            }}
                            onFocus={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                            onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                        />
                    </div>

                    {/* Category Filter */}
                    <div style={{ position: 'relative' }}>
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            style={{
                                padding: '12px 40px 12px 16px',
                                borderRadius: '12px',
                                border: '1px solid var(--border-color)',
                                background: 'var(--bg-secondary)',
                                color: 'var(--text-primary)',
                                fontSize: '14px',
                                cursor: 'pointer',
                                appearance: 'none',
                                minWidth: '160px',
                            }}
                        >
                            <option value="all">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <ChevronDown size={16} style={{
                            position: 'absolute',
                            right: '14px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--text-muted)',
                            pointerEvents: 'none',
                        }} />
                    </div>

                    {/* Type Filter */}
                    <div style={{ position: 'relative' }}>
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            style={{
                                padding: '12px 40px 12px 16px',
                                borderRadius: '12px',
                                border: '1px solid var(--border-color)',
                                background: 'var(--bg-secondary)',
                                color: 'var(--text-primary)',
                                fontSize: '14px',
                                cursor: 'pointer',
                                appearance: 'none',
                                minWidth: '130px',
                            }}
                        >
                            <option value="all">All Types</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                        <ChevronDown size={16} style={{
                            position: 'absolute',
                            right: '14px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--text-muted)',
                            pointerEvents: 'none',
                        }} />
                    </div>

                    {/* Clear Filters */}
                    {hasActiveFilters && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={resetFilters}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '12px 16px',
                                borderRadius: '12px',
                                border: '1px solid var(--error)',
                                background: 'var(--error-muted)',
                                color: 'var(--error)',
                                fontSize: '13px',
                                fontWeight: 600,
                                cursor: 'pointer',
                            }}
                        >
                            <X size={16} />
                            Clear
                        </motion.button>
                    )}
                </div>

                {/* Active Filters Tags */}
                {hasActiveFilters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '8px',
                            marginTop: '16px',
                        }}
                    >
                        {searchQuery && (
                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '6px 12px',
                                borderRadius: '8px',
                                background: 'var(--primary-muted)',
                                border: '1px solid rgba(251, 191, 36, 0.3)',
                                color: 'var(--primary)',
                                fontSize: '12px',
                                fontWeight: 600,
                            }}>
                                Search: "{searchQuery}"
                                <X size={14} style={{ cursor: 'pointer' }} onClick={() => setSearchQuery('')} />
                            </span>
                        )}
                        {categoryFilter !== 'all' && (
                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '6px 12px',
                                borderRadius: '8px',
                                background: 'var(--accent-muted)',
                                border: '1px solid rgba(59, 130, 246, 0.3)',
                                color: 'var(--accent)',
                                fontSize: '12px',
                                fontWeight: 600,
                            }}>
                                {getCategoryInfo(categoryFilter).name}
                                <X size={14} style={{ cursor: 'pointer' }} onClick={() => setCategoryFilter('all')} />
                            </span>
                        )}
                        {typeFilter !== 'all' && (
                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '6px 12px',
                                borderRadius: '8px',
                                background: typeFilter === 'income' ? 'var(--success-muted)' : 'var(--error-muted)',
                                border: `1px solid ${typeFilter === 'income' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                                color: typeFilter === 'income' ? 'var(--success)' : 'var(--error)',
                                fontSize: '12px',
                                fontWeight: 600,
                                textTransform: 'capitalize',
                            }}>
                                {typeFilter}
                                <X size={14} style={{ cursor: 'pointer' }} onClick={() => setTypeFilter('all')} />
                            </span>
                        )}
                    </motion.div>
                )}
            </div>

            {/* Transactions List */}
            <div style={{ maxHeight: '520px', overflow: 'auto' }}>
                {filteredTransactions.length > 0 ? (
                    <AnimatePresence mode="popLayout">
                        {filteredTransactions.map((transaction, index) => {
                            const categoryInfo = getCategoryInfo(transaction.category);
                            const isIncome = transaction.type === 'income';

                            return (
                                <motion.div
                                    key={transaction.id}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ delay: index * 0.02 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '18px 28px',
                                        borderBottom: '1px solid var(--border-color)',
                                        cursor: 'pointer',
                                        transition: 'background 0.15s ease',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                >
                                    {/* Left - Icon & Info */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flex: 1, minWidth: 0 }}>
                                        {/* Transaction Icon */}
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '14px',
                                            background: isIncome ? 'var(--success-muted)' : 'var(--error-muted)',
                                            border: `1px solid ${isIncome ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                        }}>
                                            {isIncome ? (
                                                <ArrowUpRight size={22} color="var(--success)" />
                                            ) : (
                                                <ArrowDownRight size={22} color="var(--error)" />
                                            )}
                                        </div>

                                        {/* Details */}
                                        <div style={{ minWidth: 0 }}>
                                            <p style={{
                                                fontSize: '15px',
                                                fontWeight: 600,
                                                color: 'var(--text-primary)',
                                                marginBottom: '6px',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}>
                                                {transaction.description}
                                            </p>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                                                {/* Category Badge */}
                                                <span style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    padding: '4px 10px',
                                                    borderRadius: '6px',
                                                    background: `${categoryInfo.color}15`,
                                                    fontSize: '12px',
                                                    fontWeight: 600,
                                                    color: categoryInfo.color,
                                                }}>
                                                    <span style={{
                                                        width: '6px',
                                                        height: '6px',
                                                        borderRadius: '50%',
                                                        background: categoryInfo.color,
                                                    }} />
                                                    {categoryInfo.name}
                                                </span>

                                                {/* Date */}
                                                <span style={{
                                                    fontSize: '12px',
                                                    color: 'var(--text-muted)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                }}>
                                                    <Calendar size={12} />
                                                    {formatDate(transaction.date)}
                                                </span>

                                                {/* Status */}
                                                <span style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    fontSize: '11px',
                                                    fontWeight: 600,
                                                    color: transaction.status === 'completed' ? 'var(--success)' : 'var(--warning)',
                                                }}>
                                                    {transaction.status === 'completed' ? (
                                                        <CheckCircle size={12} />
                                                    ) : (
                                                        <Clock size={12} />
                                                    )}
                                                    {transaction.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right - Amount & Actions */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                                        {/* Amount */}
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{
                                                fontSize: '18px',
                                                fontWeight: 700,
                                                color: isIncome ? 'var(--success)' : 'var(--error)',
                                                fontVariantNumeric: 'tabular-nums',
                                            }}>
                                                {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
                                            </p>
                                            <p style={{
                                                fontSize: '11px',
                                                color: 'var(--text-muted)',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em',
                                            }}>
                                                {isIncome ? 'Credit' : 'Debit'}
                                            </p>
                                        </div>

                                        {/* Actions (Admin Only) */}
                                        {role === 'admin' && (
                                            <div style={{ position: 'relative' }}>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setActiveRowMenu(activeRowMenu === transaction.id ? null : transaction.id);
                                                    }}
                                                    style={{
                                                        width: '36px',
                                                        height: '36px',
                                                        borderRadius: '10px',
                                                        border: '1px solid var(--border-color)',
                                                        background: activeRowMenu === transaction.id ? 'var(--bg-tertiary)' : 'transparent',
                                                        color: 'var(--text-muted)',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <MoreVertical size={18} />
                                                </motion.button>

                                                <AnimatePresence>
                                                    {activeRowMenu === transaction.id && (
                                                        <>
                                                            <div
                                                                onClick={() => setActiveRowMenu(null)}
                                                                style={{ position: 'fixed', inset: 0, zIndex: 10 }}
                                                            />
                                                            <motion.div
                                                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: 'calc(100% + 8px)',
                                                                    right: 0,
                                                                    width: '140px',
                                                                    background: 'var(--bg-elevated)',
                                                                    border: '1px solid var(--border-color)',
                                                                    borderRadius: '12px',
                                                                    boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
                                                                    overflow: 'hidden',
                                                                    zIndex: 20,
                                                                }}
                                                            >
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        openTransactionModal(transaction);
                                                                        setActiveRowMenu(null);
                                                                    }}
                                                                    style={{
                                                                        width: '100%',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        gap: '10px',
                                                                        padding: '12px 14px',
                                                                        border: 'none',
                                                                        background: 'transparent',
                                                                        color: 'var(--text-secondary)',
                                                                        fontSize: '13px',
                                                                        fontWeight: 500,
                                                                        cursor: 'pointer',
                                                                        transition: 'all 0.15s ease',
                                                                    }}
                                                                    onMouseEnter={(e) => {
                                                                        e.currentTarget.style.background = 'var(--primary-muted)';
                                                                        e.currentTarget.style.color = 'var(--primary)';
                                                                    }}
                                                                    onMouseLeave={(e) => {
                                                                        e.currentTarget.style.background = 'transparent';
                                                                        e.currentTarget.style.color = 'var(--text-secondary)';
                                                                    }}
                                                                >
                                                                    <Edit2 size={16} />
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleDelete(transaction.id);
                                                                    }}
                                                                    style={{
                                                                        width: '100%',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        gap: '10px',
                                                                        padding: '12px 14px',
                                                                        border: 'none',
                                                                        background: 'transparent',
                                                                        color: 'var(--text-secondary)',
                                                                        fontSize: '13px',
                                                                        fontWeight: 500,
                                                                        cursor: 'pointer',
                                                                        transition: 'all 0.15s ease',
                                                                    }}
                                                                    onMouseEnter={(e) => {
                                                                        e.currentTarget.style.background = 'var(--error-muted)';
                                                                        e.currentTarget.style.color = 'var(--error)';
                                                                    }}
                                                                    onMouseLeave={(e) => {
                                                                        e.currentTarget.style.background = 'transparent';
                                                                        e.currentTarget.style.color = 'var(--text-secondary)';
                                                                    }}
                                                                >
                                                                    <Trash2 size={16} />
                                                                    Delete
                                                                </button>
                                                            </motion.div>
                                                        </>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                ) : (
                    /* Empty State */
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                            padding: '80px 40px',
                            textAlign: 'center',
                        }}
                    >
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '24px',
                            background: 'var(--bg-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px',
                        }}>
                            <Search size={36} color="var(--text-muted)" />
                        </div>
                        <h4 style={{
                            fontSize: '18px',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            marginBottom: '8px',
                        }}>
                            No transactions found
                        </h4>
                        <p style={{
                            fontSize: '14px',
                            color: 'var(--text-muted)',
                            marginBottom: '24px',
                        }}>
                            {hasActiveFilters
                                ? 'Try adjusting your filters or search query'
                                : 'Start by adding your first transaction'
                            }
                        </p>
                        {hasActiveFilters && (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={resetFilters}
                                style={{
                                    padding: '12px 24px',
                                    borderRadius: '12px',
                                    border: 'none',
                                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                                    color: '#09090b',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                }}
                            >
                                Reset Filters
                            </motion.button>
                        )}
                    </motion.div>
                )}
            </div>

            {/* Footer */}
            {filteredTransactions.length > 0 && (
                <div style={{
                    padding: '16px 28px',
                    borderTop: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <p style={{
                        fontSize: '13px',
                        color: 'var(--text-muted)',
                    }}>
                        Showing {filteredTransactions.length} transactions
                    </p>
                    <button style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)',
                        background: 'transparent',
                        color: 'var(--text-secondary)',
                        fontSize: '13px',
                        fontWeight: 500,
                        cursor: 'pointer',
                    }}>
                        Load More
                    </button>
                </div>
            )}
        </motion.div>
    );
};

export default TransactionsList;