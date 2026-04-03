// Format currency in Indian Rupees
export const formatCurrency = (amount, options = {}) => {
    const { compact = false, showSign = false } = options;

    const sign = showSign && amount > 0 ? '+' : '';

    if (compact) {
        if (Math.abs(amount) >= 10000000) {
            return `${sign}₹${(amount / 10000000).toFixed(2)}Cr`;
        }
        if (Math.abs(amount) >= 100000) {
            return `${sign}₹${(amount / 100000).toFixed(2)}L`;
        }
        if (Math.abs(amount) >= 1000) {
            return `${sign}₹${(amount / 1000).toFixed(1)}K`;
        }
    }

    return `${sign}₹${amount.toLocaleString('en-IN')}`;
};

// Format percentage
export const formatPercentage = (value, options = {}) => {
    const { showSign = true, decimals = 1 } = options;
    const sign = showSign && value > 0 ? '+' : '';
    return `${sign}${value.toFixed(decimals)}%`;
};

// Format date
export const formatDate = (date, format = 'short') => {
    const d = new Date(date);

    const formats = {
        short: { day: 'numeric', month: 'short', year: 'numeric' },
        long: { day: 'numeric', month: 'long', year: 'numeric' },
        monthYear: { month: 'short', year: 'numeric' },
        dayMonth: { day: 'numeric', month: 'short' },
        relative: null,
    };

    if (format === 'relative') {
        return getRelativeTime(d);
    }

    return d.toLocaleDateString('en-IN', formats[format] || formats.short);
};

// Get relative time (e.g., "2 hours ago")
export const getRelativeTime = (date) => {
    const now = new Date();
    const diff = now - new Date(date);

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 7) {
        return formatDate(date, 'short');
    }
    if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }
    if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    if (minutes > 0) {
        return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    }
    return 'Just now';
};

// Get greeting based on time
export const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    if (hour < 21) return 'Good Evening';
    return 'Good Night';
};

// Generate unique ID
export const generateId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};