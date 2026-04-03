import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Wallet,
    Search,
    Moon,
    Sun,
    Bell,
    User,
    Shield,
    Eye,
    ChevronDown,
    Menu,
    X,
    Settings,
    LogOut,
    Crown,
    CreditCard,
    HelpCircle,
    Check,
} from 'lucide-react';
import { useThemeStore } from '../stores/useThemeStore';
import { useUIStore } from '../stores/useUIStore';
import { useFilterStore } from '../stores/useFilterStore';
import { useTransactionStore } from '../stores/useTransactionStore';

const Navbar = () => {
    const { theme, toggleTheme } = useThemeStore();
    const { role, setRole, addToast } = useUIStore();
    const { searchQuery, setSearchQuery } = useFilterStore();
    const { transactions } = useTransactionStore();

    const [showRoleMenu, setShowRoleMenu] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const searchRef = useRef(null);

    // Search results
    const searchResults = searchQuery.length > 0
        ? transactions.filter(t =>
            t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.category.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 5)
        : [];

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowSearchResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleRoleChange = (newRole) => {
        setRole(newRole);
        setShowRoleMenu(false);
        addToast({
            type: 'success',
            title: 'Role Changed',
            message: `Switched to ${newRole === 'admin' ? 'Admin' : 'Viewer'} mode`,
        });
    };

    const notifications = [
        { id: 1, title: 'Payment Received', message: '₹25,000 credited to account', time: '2 min ago', unread: true },
        { id: 2, title: 'Budget Alert', message: 'Shopping budget 80% used', time: '1 hour ago', unread: true },
        { id: 3, title: 'Bill Reminder', message: 'Electricity bill due tomorrow', time: '3 hours ago', unread: false },
    ];

    const unreadCount = notifications.filter(n => n.unread).length;

    return (
        <nav style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            background: theme === 'dark'
                ? 'rgba(9, 9, 11, 0.85)'
                : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
        }}>
            <div style={{
                maxWidth: '1440px',
                margin: '0 auto',
                padding: '0 24px',
                height: '70px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '24px',
            }}>
                {/* Logo */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                        flexShrink: 0,
                    }}
                >
                    <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 15px rgba(251, 191, 36, 0.3)',
                    }}>
                        <Wallet size={22} color="#09090b" strokeWidth={2.5} />
                    </div>
                    <div>
                        <span style={{
                            fontWeight: 800,
                            fontSize: '18px',
                            color: theme === 'dark' ? '#fafafa' : '#09090b',
                            letterSpacing: '-0.02em',
                        }}>
                            FinanceFlow
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{
                                padding: '2px 6px',
                                borderRadius: '4px',
                                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                                color: '#09090b',
                                fontSize: '9px',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                            }}>
                                Pro
                            </span>
                            <span style={{
                                fontSize: '11px',
                                color: theme === 'dark' ? '#71717a' : '#a1a1aa',
                            }}>
                                Dashboard
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Search Bar - Desktop */}
                <div
                    ref={searchRef}
                    style={{
                        flex: 1,
                        maxWidth: '480px',
                        position: 'relative',
                        display: 'none',
                    }}
                    className="search-desktop"
                >
                    <Search
                        size={18}
                        style={{
                            position: 'absolute',
                            left: '16px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: theme === 'dark' ? '#71717a' : '#a1a1aa',
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setShowSearchResults(e.target.value.length > 0);
                        }}
                        onFocus={() => searchQuery.length > 0 && setShowSearchResults(true)}
                        style={{
                            width: '100%',
                            padding: '12px 16px 12px 48px',
                            borderRadius: '14px',
                            border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'}`,
                            background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            color: theme === 'dark' ? '#fafafa' : '#09090b',
                            fontSize: '14px',
                            outline: 'none',
                            transition: 'all 0.2s ease',
                        }}
                    />

                    {/* Search Results Dropdown */}
                    <AnimatePresence>
                        {showSearchResults && searchResults.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                style={{
                                    position: 'absolute',
                                    top: 'calc(100% + 8px)',
                                    left: 0,
                                    right: 0,
                                    background: theme === 'dark' ? '#18181b' : '#ffffff',
                                    border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                                    borderRadius: '16px',
                                    boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                                    overflow: 'hidden',
                                    zIndex: 50,
                                }}
                            >
                                {searchResults.map((result, index) => (
                                    <div
                                        key={result.id}
                                        style={{
                                            padding: '14px 18px',
                                            borderBottom: index < searchResults.length - 1
                                                ? `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`
                                                : 'none',
                                            cursor: 'pointer',
                                            transition: 'background 0.15s ease',
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                    >
                                        <p style={{
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            color: theme === 'dark' ? '#fafafa' : '#09090b',
                                            marginBottom: '4px',
                                        }}>
                                            {result.description}
                                        </p>
                                        <p style={{
                                            fontSize: '12px',
                                            color: theme === 'dark' ? '#71717a' : '#a1a1aa',
                                        }}>
                                            {result.type === 'income' ? '+' : '-'}₹{result.amount.toLocaleString('en-IN')}
                                        </p>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

                    {/* Role Switcher */}
                    <div style={{ position: 'relative' }}>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                                setShowRoleMenu(!showRoleMenu);
                                setShowProfileMenu(false);
                                setShowNotifications(false);
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 14px',
                                borderRadius: '12px',
                                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'}`,
                                background: role === 'admin'
                                    ? 'rgba(251, 191, 36, 0.1)'
                                    : 'transparent',
                                color: role === 'admin' ? '#fbbf24' : (theme === 'dark' ? '#a1a1aa' : '#71717a'),
                                fontSize: '13px',
                                fontWeight: 600,
                                cursor: 'pointer',
                            }}
                        >
                            {role === 'admin' ? <Shield size={16} /> : <Eye size={16} />}
                            <span className="hide-mobile">{role === 'admin' ? 'Admin' : 'Viewer'}</span>
                            <ChevronDown size={14} style={{
                                transform: showRoleMenu ? 'rotate(180deg)' : 'rotate(0)',
                                transition: 'transform 0.2s ease',
                            }} />
                        </motion.button>

                        <AnimatePresence>
                            {showRoleMenu && (
                                <>
                                    <div onClick={() => setShowRoleMenu(false)} style={{ position: 'fixed', inset: 0, zIndex: 40 }} />
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        style={{
                                            position: 'absolute',
                                            top: 'calc(100% + 8px)',
                                            right: 0,
                                            width: '200px',
                                            background: theme === 'dark' ? '#18181b' : '#ffffff',
                                            border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                                            borderRadius: '16px',
                                            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                                            overflow: 'hidden',
                                            zIndex: 50,
                                            padding: '8px',
                                        }}
                                    >
                                        <button
                                            onClick={() => handleRoleChange('admin')}
                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                gap: '12px',
                                                padding: '12px 14px',
                                                borderRadius: '10px',
                                                border: 'none',
                                                background: role === 'admin' ? 'rgba(251, 191, 36, 0.1)' : 'transparent',
                                                color: role === 'admin' ? '#fbbf24' : (theme === 'dark' ? '#a1a1aa' : '#52525b'),
                                                fontSize: '14px',
                                                fontWeight: 500,
                                                cursor: 'pointer',
                                                transition: 'all 0.15s ease',
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <Shield size={18} />
                                                Admin Mode
                                            </div>
                                            {role === 'admin' && <Check size={16} />}
                                        </button>
                                        <button
                                            onClick={() => handleRoleChange('viewer')}
                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                gap: '12px',
                                                padding: '12px 14px',
                                                borderRadius: '10px',
                                                border: 'none',
                                                background: role === 'viewer' ? 'rgba(251, 191, 36, 0.1)' : 'transparent',
                                                color: role === 'viewer' ? '#fbbf24' : (theme === 'dark' ? '#a1a1aa' : '#52525b'),
                                                fontSize: '14px',
                                                fontWeight: 500,
                                                cursor: 'pointer',
                                                transition: 'all 0.15s ease',
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <Eye size={18} />
                                                Viewer Mode
                                            </div>
                                            {role === 'viewer' && <Check size={16} />}
                                        </button>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Theme Toggle */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleTheme}
                        style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '12px',
                            border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'}`,
                            background: 'transparent',
                            color: theme === 'dark' ? '#a1a1aa' : '#71717a',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={theme}
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} color="#f59e0b" />}
                            </motion.div>
                        </AnimatePresence>
                    </motion.button>

                    {/* Notifications */}
                    <div style={{ position: 'relative' }}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setShowNotifications(!showNotifications);
                                setShowRoleMenu(false);
                                setShowProfileMenu(false);
                            }}
                            style={{
                                position: 'relative',
                                width: '44px',
                                height: '44px',
                                borderRadius: '12px',
                                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'}`,
                                background: 'transparent',
                                color: theme === 'dark' ? '#a1a1aa' : '#71717a',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Bell size={20} />
                            {unreadCount > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: '8px',
                                    right: '8px',
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: '#ef4444',
                                    border: `2px solid ${theme === 'dark' ? '#09090b' : '#ffffff'}`,
                                }} />
                            )}
                        </motion.button>

                        <AnimatePresence>
                            {showNotifications && (
                                <>
                                    <div onClick={() => setShowNotifications(false)} style={{ position: 'fixed', inset: 0, zIndex: 40 }} />
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        style={{
                                            position: 'absolute',
                                            top: 'calc(100% + 8px)',
                                            right: 0,
                                            width: '340px',
                                            background: theme === 'dark' ? '#18181b' : '#ffffff',
                                            border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                                            borderRadius: '20px',
                                            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                                            overflow: 'hidden',
                                            zIndex: 50,
                                        }}
                                    >
                                        <div style={{
                                            padding: '18px 20px',
                                            borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}>
                                            <h3 style={{
                                                fontSize: '16px',
                                                fontWeight: 700,
                                                color: theme === 'dark' ? '#fafafa' : '#09090b',
                                            }}>
                                                Notifications
                                            </h3>
                                            {unreadCount > 0 && (
                                                <span style={{
                                                    padding: '4px 10px',
                                                    borderRadius: '20px',
                                                    background: 'rgba(239, 68, 68, 0.1)',
                                                    color: '#ef4444',
                                                    fontSize: '12px',
                                                    fontWeight: 600,
                                                }}>
                                                    {unreadCount} new
                                                </span>
                                            )}
                                        </div>
                                        <div style={{ maxHeight: '320px', overflow: 'auto' }}>
                                            {notifications.map((notif) => (
                                                <div
                                                    key={notif.id}
                                                    style={{
                                                        padding: '16px 20px',
                                                        borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                                                        background: notif.unread
                                                            ? (theme === 'dark' ? 'rgba(251, 191, 36, 0.03)' : 'rgba(251, 191, 36, 0.05)')
                                                            : 'transparent',
                                                        cursor: 'pointer',
                                                        transition: 'background 0.15s ease',
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                                        {notif.unread && (
                                                            <div style={{
                                                                width: '8px',
                                                                height: '8px',
                                                                borderRadius: '50%',
                                                                background: '#fbbf24',
                                                                marginTop: '6px',
                                                                flexShrink: 0,
                                                            }} />
                                                        )}
                                                        <div style={{ flex: 1, marginLeft: notif.unread ? 0 : '20px' }}>
                                                            <p style={{
                                                                fontSize: '14px',
                                                                fontWeight: 600,
                                                                color: theme === 'dark' ? '#fafafa' : '#09090b',
                                                                marginBottom: '4px',
                                                            }}>
                                                                {notif.title}
                                                            </p>
                                                            <p style={{
                                                                fontSize: '13px',
                                                                color: theme === 'dark' ? '#71717a' : '#a1a1aa',
                                                                marginBottom: '6px',
                                                            }}>
                                                                {notif.message}
                                                            </p>
                                                            <p style={{
                                                                fontSize: '11px',
                                                                color: theme === 'dark' ? '#52525b' : '#d4d4d8',
                                                            }}>
                                                                {notif.time}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div style={{
                                            padding: '14px 20px',
                                            borderTop: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                                            textAlign: 'center',
                                        }}>
                                            <button style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#fbbf24',
                                                fontSize: '13px',
                                                fontWeight: 600,
                                                cursor: 'pointer',
                                            }}>
                                                View All Notifications
                                            </button>
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Profile */}
                    <div style={{ position: 'relative' }}>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                                setShowProfileMenu(!showProfileMenu);
                                setShowRoleMenu(false);
                                setShowNotifications(false);
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '6px 12px 6px 6px',
                                borderRadius: '14px',
                                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'}`,
                                background: 'transparent',
                                cursor: 'pointer',
                            }}
                        >
                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '10px',
                                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#09090b',
                                fontWeight: 700,
                                fontSize: '14px',
                            }}>
                                RS
                            </div>
                            <ChevronDown
                                size={16}
                                color={theme === 'dark' ? '#71717a' : '#a1a1aa'}
                                style={{
                                    transform: showProfileMenu ? 'rotate(180deg)' : 'rotate(0)',
                                    transition: 'transform 0.2s ease',
                                }}
                            />
                        </motion.button>

                        {/* Profile Dropdown - FIXED FOR LIGHT MODE */}
                        <AnimatePresence>
                            {showProfileMenu && (
                                <>
                                    <div onClick={() => setShowProfileMenu(false)} style={{ position: 'fixed', inset: 0, zIndex: 40 }} />
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        style={{
                                            position: 'absolute',
                                            top: 'calc(100% + 8px)',
                                            right: 0,
                                            width: '280px',
                                            background: theme === 'dark' ? '#18181b' : '#ffffff',
                                            border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                                            borderRadius: '20px',
                                            boxShadow: theme === 'dark'
                                                ? '0 20px 50px rgba(0,0,0,0.5)'
                                                : '0 20px 50px rgba(0,0,0,0.15)',
                                            overflow: 'hidden',
                                            zIndex: 50,
                                        }}
                                    >
                                        {/* Profile Header */}
                                        <div style={{
                                            padding: '20px',
                                            borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
                                            background: theme === 'dark'
                                                ? 'rgba(255,255,255,0.02)'
                                                : 'rgba(0,0,0,0.02)',
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                                <div style={{
                                                    width: '52px',
                                                    height: '52px',
                                                    borderRadius: '14px',
                                                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: '#09090b',
                                                    fontWeight: 800,
                                                    fontSize: '18px',
                                                    boxShadow: '0 4px 12px rgba(251, 191, 36, 0.3)',
                                                }}>
                                                    RS
                                                </div>
                                                <div>
                                                    <p style={{
                                                        fontSize: '16px',
                                                        fontWeight: 700,
                                                        color: theme === 'dark' ? '#fafafa' : '#09090b',
                                                        marginBottom: '2px',
                                                    }}>
                                                        Rajsv Mahendra
                                                    </p>
                                                    <p style={{
                                                        fontSize: '13px',
                                                        color: theme === 'dark' ? '#71717a' : '#6b7280',
                                                    }}>
                                                        rajsv@financeflow.com
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Pro Badge */}
                                            <div style={{
                                                marginTop: '16px',
                                                padding: '12px 14px',
                                                borderRadius: '12px',
                                                background: theme === 'dark'
                                                    ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(251, 191, 36, 0.05) 100%)'
                                                    : 'linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(251, 191, 36, 0.08) 100%)',
                                                border: `1px solid rgba(251, 191, 36, 0.2)`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <Crown size={18} color="#fbbf24" />
                                                    <div>
                                                        <p style={{
                                                            fontSize: '13px',
                                                            fontWeight: 700,
                                                            color: '#fbbf24',
                                                        }}>
                                                            Pro Member
                                                        </p>
                                                        <p style={{
                                                            fontSize: '11px',
                                                            color: theme === 'dark' ? '#a1a1aa' : '#6b7280',
                                                        }}>
                                                            Valid until Dec 2025
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Menu Items */}
                                        <div style={{ padding: '8px' }}>
                                            {[
                                                { icon: User, label: 'My Profile', color: null },
                                                { icon: CreditCard, label: 'Billing', color: null },
                                                { icon: Settings, label: 'Settings', color: null },
                                                { icon: HelpCircle, label: 'Help & Support', color: null },
                                            ].map((item, index) => (
                                                <button
                                                    key={index}
                                                    style={{
                                                        width: '100%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '12px',
                                                        padding: '12px 14px',
                                                        borderRadius: '10px',
                                                        border: 'none',
                                                        background: 'transparent',
                                                        color: theme === 'dark' ? '#a1a1aa' : '#52525b',
                                                        fontSize: '14px',
                                                        fontWeight: 500,
                                                        cursor: 'pointer',
                                                        transition: 'all 0.15s ease',
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
                                                        e.currentTarget.style.color = theme === 'dark' ? '#fafafa' : '#09090b';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.background = 'transparent';
                                                        e.currentTarget.style.color = theme === 'dark' ? '#a1a1aa' : '#52525b';
                                                    }}
                                                >
                                                    <item.icon size={18} />
                                                    {item.label}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Logout */}
                                        <div style={{
                                            padding: '8px',
                                            borderTop: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
                                        }}>
                                            <button
                                                style={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '12px',
                                                    padding: '12px 14px',
                                                    borderRadius: '10px',
                                                    border: 'none',
                                                    background: 'transparent',
                                                    color: '#ef4444',
                                                    fontSize: '14px',
                                                    fontWeight: 500,
                                                    cursor: 'pointer',
                                                    transition: 'all 0.15s ease',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = 'transparent';
                                                }}
                                            >
                                                <LogOut size={18} />
                                                Sign Out
                                            </button>
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Responsive Styles */}
            <style>{`
        @media (min-width: 768px) {
          .search-desktop {
            display: block !important;
          }
        }
        @media (max-width: 640px) {
          .hide-mobile {
            display: none !important;
          }
        }
      `}</style>
        </nav>
    );
};

export default Navbar;