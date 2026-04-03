// Categories with colors and icons
export const categories = [
    { id: 'food', name: 'Food & Dining', icon: 'UtensilsCrossed', color: '#f59e0b' },
    { id: 'rent', name: 'Rent & Housing', icon: 'Home', color: '#6366f1' },
    { id: 'travel', name: 'Travel', icon: 'Plane', color: '#06b6d4' },
    { id: 'shopping', name: 'Shopping', icon: 'ShoppingBag', color: '#a855f7' },
    { id: 'utilities', name: 'Utilities', icon: 'Zap', color: '#10b981' },
    { id: 'entertainment', name: 'Entertainment', icon: 'Gamepad2', color: '#f43f5e' },
    { id: 'healthcare', name: 'Healthcare', icon: 'Heart', color: '#ec4899' },
    { id: 'salary', name: 'Salary', icon: 'Briefcase', color: '#22c55e' },
    { id: 'freelance', name: 'Freelance', icon: 'Laptop', color: '#8b5cf6' },
    { id: 'investment', name: 'Investment', icon: 'TrendingUp', color: '#14b8a6' },
    { id: 'other', name: 'Other', icon: 'MoreHorizontal', color: '#64748b' },
];

// Generate dates for last 6 months
const getRandomDate = (daysAgo) => {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
    return date.toISOString().split('T')[0];
};

// Initial transactions data
export const initialTransactions = [
    // Income
    {
        id: '1',
        description: 'Monthly Salary',
        amount: 85000,
        type: 'income',
        category: 'salary',
        date: '2024-12-01',
        status: 'completed',
    },
    {
        id: '2',
        description: 'Freelance Project - UI Design',
        amount: 25000,
        type: 'income',
        category: 'freelance',
        date: '2024-12-05',
        status: 'completed',
    },
    {
        id: '3',
        description: 'Stock Dividends',
        amount: 4500,
        type: 'income',
        category: 'investment',
        date: '2024-12-10',
        status: 'completed',
    },
    {
        id: '4',
        description: 'Monthly Salary',
        amount: 85000,
        type: 'income',
        category: 'salary',
        date: '2024-11-01',
        status: 'completed',
    },
    {
        id: '5',
        description: 'Freelance - Mobile App',
        amount: 35000,
        type: 'income',
        category: 'freelance',
        date: '2024-11-15',
        status: 'completed',
    },

    // Expenses
    {
        id: '6',
        description: 'Apartment Rent',
        amount: 22000,
        type: 'expense',
        category: 'rent',
        date: '2024-12-01',
        status: 'completed',
    },
    {
        id: '7',
        description: 'Grocery Shopping - BigBasket',
        amount: 4500,
        type: 'expense',
        category: 'food',
        date: '2024-12-03',
        status: 'completed',
    },
    {
        id: '8',
        description: 'Electricity Bill',
        amount: 2800,
        type: 'expense',
        category: 'utilities',
        date: '2024-12-05',
        status: 'completed',
    },
    {
        id: '9',
        description: 'Weekend Trip to Goa',
        amount: 15000,
        type: 'expense',
        category: 'travel',
        date: '2024-12-08',
        status: 'completed',
    },
    {
        id: '10',
        description: 'Amazon Shopping',
        amount: 8500,
        type: 'expense',
        category: 'shopping',
        date: '2024-12-10',
        status: 'completed',
    },
    {
        id: '11',
        description: 'Netflix & Spotify',
        amount: 750,
        type: 'expense',
        category: 'entertainment',
        date: '2024-12-12',
        status: 'completed',
    },
    {
        id: '12',
        description: 'Restaurant - Date Night',
        amount: 3200,
        type: 'expense',
        category: 'food',
        date: '2024-12-14',
        status: 'completed',
    },
    {
        id: '13',
        description: 'Health Checkup',
        amount: 2500,
        type: 'expense',
        category: 'healthcare',
        date: '2024-12-15',
        status: 'completed',
    },
    {
        id: '14',
        description: 'Uber Rides',
        amount: 1800,
        type: 'expense',
        category: 'travel',
        date: '2024-12-18',
        status: 'completed',
    },
    {
        id: '15',
        description: 'Zomato Orders',
        amount: 2200,
        type: 'expense',
        category: 'food',
        date: '2024-12-20',
        status: 'pending',
    },

    // Previous month expenses
    {
        id: '16',
        description: 'Apartment Rent',
        amount: 22000,
        type: 'expense',
        category: 'rent',
        date: '2024-11-01',
        status: 'completed',
    },
    {
        id: '17',
        description: 'Myntra Shopping',
        amount: 12000,
        type: 'expense',
        category: 'shopping',
        date: '2024-11-10',
        status: 'completed',
    },
    {
        id: '18',
        description: 'Internet Bill',
        amount: 1200,
        type: 'expense',
        category: 'utilities',
        date: '2024-11-08',
        status: 'completed',
    },
    {
        id: '19',
        description: 'Movie Night - PVR',
        amount: 1500,
        type: 'expense',
        category: 'entertainment',
        date: '2024-11-20',
        status: 'completed',
    },
    {
        id: '20',
        description: 'Swiggy Orders',
        amount: 3500,
        type: 'expense',
        category: 'food',
        date: '2024-11-25',
        status: 'completed',
    },
];

// Chart data for balance trend
export const balanceTrendData = [
    { month: 'Jul', balance: 42000, income: 85000, expenses: 43000 },
    { month: 'Aug', balance: 46000, income: 90000, expenses: 44000 },
    { month: 'Sep', balance: 51000, income: 95000, expenses: 44000 },
    { month: 'Oct', balance: 49500, income: 88000, expenses: 38500 },
    { month: 'Nov', balance: 61000, income: 120000, expenses: 59000 },
    { month: 'Dec', balance: 84500, income: 114500, expenses: 53500 },
];

// User data
export const userData = {
    name: 'Rajsv',
    email: 'Rajsvasv@gmail.com',
    avatar: null,
    role: 'admin', // 'admin' or 'viewer'
};

// Quick stats
export const quickStats = {
    totalBalance: 84500,
    totalIncome: 124500,
    totalExpenses: 39500,
    previousBalance: 61000,
    previousIncome: 120000,
    previousExpenses: 59000,
};