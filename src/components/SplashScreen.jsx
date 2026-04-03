import { motion } from 'framer-motion';
import { Wallet, Sparkles } from 'lucide-react';

const SplashScreen = () => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{
                position: 'fixed',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#09090b',
                zIndex: 9999,
            }}
        >
            {/* Animated Background Gradient */}
            <div style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
            }}>
                {/* Golden Orb */}
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '500px',
                        height: '500px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                    }}
                />
                {/* Secondary Orb */}
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    style={{
                        position: 'absolute',
                        top: '30%',
                        left: '30%',
                        width: '300px',
                        height: '300px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
                        filter: 'blur(40px)',
                    }}
                />
            </div>

            {/* Logo Container */}
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 15,
                    delay: 0.2
                }}
                style={{
                    position: 'relative',
                    marginBottom: '40px',
                }}
            >
                {/* Glow Ring */}
                <motion.div
                    animate={{
                        boxShadow: [
                            '0 0 0 0 rgba(251, 191, 36, 0.4)',
                            '0 0 0 20px rgba(251, 191, 36, 0)',
                            '0 0 0 0 rgba(251, 191, 36, 0)',
                        ],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeOut',
                    }}
                    style={{
                        position: 'absolute',
                        inset: '-10px',
                        borderRadius: '32px',
                    }}
                />

                {/* Logo Box */}
                <motion.div
                    animate={{
                        boxShadow: [
                            '0 0 30px rgba(251, 191, 36, 0.3)',
                            '0 0 60px rgba(251, 191, 36, 0.5)',
                            '0 0 30px rgba(251, 191, 36, 0.3)',
                        ],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '28px',
                        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Wallet size={48} color="#09090b" strokeWidth={2} />
                </motion.div>

                {/* Sparkle */}
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                        scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                    }}
                    style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-8px',
                    }}
                >
                    <Sparkles size={24} color="#fbbf24" />
                </motion.div>
            </motion.div>

            {/* Brand Name */}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                style={{
                    fontSize: '42px',
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #fafafa 0%, #a1a1aa 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '8px',
                    letterSpacing: '-0.03em',
                }}
            >
                FinanceFlow
            </motion.h1>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '60px',
                }}
            >
                <span style={{
                    padding: '4px 12px',
                    borderRadius: '6px',
                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                    color: '#09090b',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                }}>
                    Pro
                </span>
                <span style={{
                    color: '#71717a',
                    fontSize: '14px',
                }}>
                    Premium Finance Dashboard
                </span>
            </motion.div>

            {/* Loading Bar */}
            <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '240px' }}
                transition={{ delay: 0.9, duration: 0.3 }}
                style={{
                    height: '3px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                }}
            >
                <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    style={{
                        width: '40%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, #fbbf24, transparent)',
                        borderRadius: '2px',
                    }}
                />
            </motion.div>

            {/* Loading Text */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                style={{
                    marginTop: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    style={{
                        width: '14px',
                        height: '14px',
                        border: '2px solid rgba(251, 191, 36, 0.3)',
                        borderTopColor: '#fbbf24',
                        borderRadius: '50%',
                    }}
                />
                <span style={{
                    color: '#71717a',
                    fontSize: '13px',
                }}>
                    Preparing your dashboard...
                </span>
            </motion.div>
        </motion.div>
    );
};

export default SplashScreen;