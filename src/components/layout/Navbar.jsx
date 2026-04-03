import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Bell,
    Moon,
    Sun,
    ChevronDown,
    User,
    Shield,
    Eye,
    LogOut,
    Settings,
    Menu,
    X,
    Wallet,
} from 'lucide-react';
import { useThemeStore } from '../../stores/useThemeStore';
import { useUIStore } from '../../stores/useUIStore';
import { useFilterStore } from '../../stores/useFilterStore';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { cn } from '../../utils/cn';

const Navbar = () => {
    const { theme, toggleTheme } = useThemeStore();
    const { role, setRole, addToast } = useUIStore();
    const { searchQuery, setSearchQuery } = useFilterStore();

    const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [notifications] = useState([
        { id: 1, title: 'Payment received', message: '₹25,000 from Freelance Project', time: '2 min ago', unread: true },
        { id: 2, title: 'Bill reminder', message: 'Electricity bill due tomorrow', time: '1 hour ago', unread: true },
        { id: 3, title: 'Budget alert', message: 'Shopping budget 80% used', time: '3 hours ago', unread: false },
    ]);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const handleRoleChange = (newRole) => {
        setRole(newRole);
        setIsRoleDropdownOpen(false);
        addToast({
            type: 'info',
            title: 'Role Changed',
            message: `Switched to ${newRole === 'admin' ? 'Admin' : 'Viewer'} mode`,
        });
    };

    const unreadCount = notifications.filter(n => n.unread).length;

    return (
        <nav className="sticky top-0 z-40 w-full">
            {/* Glassmorphic background */}
            <div className="absolute inset-0 glass-strong border-b border-[var(--color-border)]" />

            <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-18">

                    {/* Left Section - Logo & Brand */}
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 rounded-xl hover:bg-[var(--color-bg-card)] transition-colors"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-5 h-5 text-[var(--color-text-primary)]" />
                            ) : (
                                <Menu className="w-5 h-5 text-[var(--color-text-primary)]" />
                            )}
                        </button>

                        {/* Logo */}
                        <motion.div
                            className="flex items-center gap-3"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="relative">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                                    <Wallet className="w-5 h-5 text-white" />
                                </div>
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-secondary blur-lg opacity-50" />
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-lg font-bold text-[var(--color-text-primary)]">
                                    FinanceFlow
                                </h1>
                                <p className="text-[10px] text-[var(--color-text-muted)] -mt-0.5 tracking-wider uppercase">
                                    Dashboard
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Center Section - Search */}
                    <div className="hidden md:flex flex-1 max-w-md mx-8">
                        <div className="relative w-full group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)] group-focus-within:text-[var(--color-primary)] transition-colors" />
                            <input
                                type="text"
                                placeholder="Search transactions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={cn(
                                    'w-full pl-11 pr-4 py-2.5 rounded-xl text-sm',
                                    'bg-[var(--color-bg-secondary)] border border-[var(--color-border)]',
                                    'text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]',
                                    'focus:outline-none focus:border-[var(--color-primary)]',
                                    'focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)]',
                                    'transition-all duration-300'
                                )}
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1 text-[10px] text-[var(--color-text-muted)]">
                                <kbd className="px-1.5 py-0.5 rounded bg-[var(--color-bg-tertiary)] border border-[var(--color-border)]">⌘</kbd>
                                <kbd className="px-1.5 py-0.5 rounded bg-[var(--color-bg-tertiary)] border border-[var(--color-border)]">K</kbd>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Actions */}
                    <div className="flex items-center gap-2 lg:gap-3">

                        {/* Role Switcher */}
                        <div className="relative hidden sm:block">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                                className={cn(
                                    'flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300',
                                    'glass glass-border hover:border-[var(--color-border-hover)]',
                                    role === 'admin'
                                        ? 'text-[var(--color-primary)]'
                                        : 'text-[var(--color-text-secondary)]'
                                )}
                            >
                                {role === 'admin' ? (
                                    <Shield className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                                <span className="hidden lg:inline">
                                    {role === 'admin' ? 'Admin' : 'Viewer'}
                                </span>
                                <ChevronDown className={cn(
                                    'w-3 h-3 transition-transform duration-200',
                                    isRoleDropdownOpen && 'rotate-180'
                                )} />
                            </motion.button>

                            {/* Role Dropdown */}
                            <AnimatePresence>
                                {isRoleDropdownOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setIsRoleDropdownOpen(false)}
                                        />
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-2 w-48 py-2 glass-strong rounded-xl border border-[var(--color-border)] shadow-2xl z-20"
                                        >
                                            <button
                                                onClick={() => handleRoleChange('admin')}
                                                className={cn(
                                                    'w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors',
                                                    role === 'admin'
                                                        ? 'text-[var(--color-primary)] bg-[rgba(99,102,241,0.1)]'
                                                        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-card)]'
                                                )}
                                            >
                                                <Shield className="w-4 h-4" />
                                                Admin Mode
                                                {role === 'admin' && (
                                                    <Badge variant="primary" size="sm" className="ml-auto">Active</Badge>
                                                )}
                                            </button>
                                            <button
                                                onClick={() => handleRoleChange('viewer')}
                                                className={cn(
                                                    'w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors',
                                                    role === 'viewer'
                                                        ? 'text-[var(--color-primary)] bg-[rgba(99,102,241,0.1)]'
                                                        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-card)]'
                                                )}
                                            >
                                                <Eye className="w-4 h-4" />
                                                Viewer Mode
                                                {role === 'viewer' && (
                                                    <Badge variant="primary" size="sm" className="ml-auto">Active</Badge>
                                                )}
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
                            className="p-2.5 rounded-xl glass glass-border hover:border-[var(--color-border-hover)] transition-all duration-300"
                        >
                            <AnimatePresence mode="wait">
                                {theme === 'dark' ? (
                                    <motion.div
                                        key="moon"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Moon className="w-4 h-4 text-[var(--color-text-secondary)]" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="sun"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Sun className="w-4 h-4 text-[var(--color-warning)]" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        {/* Notifications */}
                        <div className="relative">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                                className="relative p-2.5 rounded-xl glass glass-border hover:border-[var(--color-border-hover)] transition-all duration-300"
                            >
                                <Bell className="w-4 h-4 text-[var(--color-text-secondary)]" />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-bold text-white bg-[var(--color-error)] rounded-full">
                                        {unreadCount}
                                    </span>
                                )}
                            </motion.button>

                            {/* Notification Dropdown */}
                            <AnimatePresence>
                                {isNotificationOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setIsNotificationOpen(false)}
                                        />
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-2 w-80 glass-strong rounded-xl border border-[var(--color-border)] shadow-2xl z-20 overflow-hidden"
                                        >
                                            <div className="p-4 border-b border-[var(--color-border)]">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-semibold text-[var(--color-text-primary)]">Notifications</h3>
                                                    <Badge variant="primary" size="sm">{unreadCount} new</Badge>
                                                </div>
                                            </div>
                                            <div className="max-h-80 overflow-y-auto">
                                                {notifications.map((notification) => (
                                                    <div
                                                        key={notification.id}
                                                        className={cn(
                                                            'p-4 border-b border-[var(--color-border)] hover:bg-[var(--color-bg-card)] transition-colors cursor-pointer',
                                                            notification.unread && 'bg-[rgba(99,102,241,0.05)]'
                                                        )}
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            {notification.unread && (
                                                                <div className="w-2 h-2 mt-2 rounded-full bg-[var(--color-primary)]" />
                                                            )}
                                                            <div className={cn(!notification.unread && 'ml-5')}>
                                                                <p className="text-sm font-medium text-[var(--color-text-primary)]">
                                                                    {notification.title}
                                                                </p>
                                                                <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                                                                    {notification.message}
                                                                </p>
                                                                <p className="text-[10px] text-[var(--color-text-muted)] mt-1">
                                                                    {notification.time}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="p-3 border-t border-[var(--color-border)]">
                                                <button className="w-full text-center text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-light)] transition-colors">
                                                    View all notifications
                                                </button>
                                            </div>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Profile */}
                        <div className="relative">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                className="flex items-center gap-2 p-1.5 pr-3 rounded-xl glass glass-border hover:border-[var(--color-border-hover)] transition-all duration-300"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white font-semibold text-sm">
                                    R
                                </div>
                                <ChevronDown className={cn(
                                    'w-3 h-3 text-[var(--color-text-muted)] transition-transform duration-200 hidden sm:block',
                                    isProfileDropdownOpen && 'rotate-180'
                                )} />
                            </motion.button>

                            {/* Profile Dropdown */}
                            <AnimatePresence>
                                {isProfileDropdownOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setIsProfileDropdownOpen(false)}
                                        />
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-2 w-56 glass-strong rounded-xl border border-[var(--color-border)] shadow-2xl z-20 overflow-hidden"
                                        >
                                            <div className="p-4 border-b border-[var(--color-border)]">
                                                <p className="font-medium text-[var(--color-text-primary)]">Rajsv Mahendra</p>
                                                <p className="text-xs text-[var(--color-text-muted)]">Rajsv@example.com</p>
                                            </div>
                                            <div className="py-2">
                                                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-card)] transition-colors">
                                                    <User className="w-4 h-4" />
                                                    Profile
                                                </button>
                                                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-card)] transition-colors">
                                                    <Settings className="w-4 h-4" />
                                                    Settings
                                                </button>
                                            </div>
                                            <div className="py-2 border-t border-[var(--color-border)]">
                                                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-error)] hover:bg-[rgba(244,63,94,0.1)] transition-colors">
                                                    <LogOut className="w-4 h-4" />
                                                    Sign out
                                                </button>
                                            </div>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden border-t border-[var(--color-border)] glass-strong"
                    >
                        <div className="p-4 space-y-4">
                            {/* Mobile Search */}
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                                <input
                                    type="text"
                                    placeholder="Search transactions..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 rounded-xl text-sm bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]"
                                />
                            </div>

                            {/* Mobile Role Switcher */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleRoleChange('admin')}
                                    className={cn(
                                        'flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all',
                                        role === 'admin'
                                            ? 'bg-[var(--color-primary)] text-white'
                                            : 'glass glass-border text-[var(--color-text-secondary)]'
                                    )}
                                >
                                    <Shield className="w-4 h-4" />
                                    Admin
                                </button>
                                <button
                                    onClick={() => handleRoleChange('viewer')}
                                    className={cn(
                                        'flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all',
                                        role === 'viewer'
                                            ? 'bg-[var(--color-primary)] text-white'
                                            : 'glass glass-border text-[var(--color-text-secondary)]'
                                    )}
                                >
                                    <Eye className="w-4 h-4" />
                                    Viewer
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;