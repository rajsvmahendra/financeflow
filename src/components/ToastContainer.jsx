import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useUIStore } from '../stores/useUIStore';

const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
};

const styles = {
    success: {
        bg: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%)',
        border: 'rgba(34, 197, 94, 0.3)',
        icon: '#22c55e',
        shadow: 'rgba(34, 197, 94, 0.2)',
    },
    error: {
        bg: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.05) 100%)',
        border: 'rgba(239, 68, 68, 0.3)',
        icon: '#ef4444',
        shadow: 'rgba(239, 68, 68, 0.2)',
    },
    warning: {
        bg: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.05) 100%)',
        border: 'rgba(245, 158, 11, 0.3)',
        icon: '#f59e0b',
        shadow: 'rgba(245, 158, 11, 0.2)',
    },
    info: {
        bg: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%)',
        border: 'rgba(59, 130, 246, 0.3)',
        icon: '#3b82f6',
        shadow: 'rgba(59, 130, 246, 0.2)',
    },
};

const Toast = ({ toast, onRemove }) => {
    const Icon = icons[toast.type] || icons.info;
    const style = styles[toast.type] || styles.info;

    useEffect(() => {
        const timer = setTimeout(() => {
            onRemove(toast.id);
        }, 5000);
        return () => clearTimeout(timer);
    }, [toast.id, onRemove]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                padding: '18px 20px',
                borderRadius: '16px',
                background: style.bg,
                border: `1px solid ${style.border}`,
                boxShadow: `0 10px 40px ${style.shadow}, 0 0 0 1px rgba(255, 255, 255, 0.05)`,
                backdropFilter: 'blur(20px)',
                maxWidth: '400px',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Progress Bar */}
            <motion.div
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 5, ease: 'linear' }}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: style.icon,
                    transformOrigin: 'left',
                    borderRadius: '0 0 16px 16px',
                }}
            />

            {/* Icon */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: `${style.icon}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                }}
            >
                <Icon size={20} color={style.icon} />
            </motion.div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0, paddingRight: '20px' }}>
                {toast.title && (
                    <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{
                            fontSize: '15px',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            marginBottom: '4px',
                        }}
                    >
                        {toast.title}
                    </motion.p>
                )}
                {toast.message && (
                    <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        style={{
                            fontSize: '13px',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.5,
                        }}
                    >
                        {toast.message}
                    </motion.p>
                )}
            </div>

            {/* Close Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onRemove(toast.id)}
                style={{
                    position: 'absolute',
                    top: '14px',
                    right: '14px',
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.color = 'var(--text-muted)';
                }}
            >
                <X size={14} />
            </motion.button>
        </motion.div>
    );
};

const ToastContainer = () => {
    const { toasts, removeToast } = useUIStore();

    return (
        <div style={{
            position: 'fixed',
            top: '90px',
            right: '24px',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            pointerEvents: 'none',
        }}>
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => (
                    <div key={toast.id} style={{ pointerEvents: 'auto' }}>
                        <Toast toast={toast} onRemove={removeToast} />
                    </div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default ToastContainer;