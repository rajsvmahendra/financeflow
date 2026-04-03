// Calculate total income
export const calculateTotalIncome = (transactions) => {
    return transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
};

// Calculate total expenses
export const calculateTotalExpenses = (transactions) => {
    return transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
};

// Calculate balance
export const calculateBalance = (transactions) => {
    return calculateTotalIncome(transactions) - calculateTotalExpenses(transactions);
};

// Calculate percentage change
export const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
};

// Get spending by category
export const getSpendingByCategory = (transactions) => {
    const expenses = transactions.filter(t => t.type === 'expense');

    const categoryTotals = expenses.reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
    }, {});

    return Object.entries(categoryTotals)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);
};

// Get monthly data for charts
export const getMonthlyData = (transactions, months = 6) => {
    const now = new Date();
    const monthlyData = [];

    for (let i = months - 1; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthName = date.toLocaleDateString('en-US', { month: 'short' });
        const year = date.getFullYear();

        const monthTransactions = transactions.filter(t => {
            const tDate = new Date(t.date);
            return tDate.getMonth() === date.getMonth() &&
                tDate.getFullYear() === date.getFullYear();
        });

        const income = calculateTotalIncome(monthTransactions);
        const expenses = calculateTotalExpenses(monthTransactions);

        monthlyData.push({
            month: monthName,
            year,
            income,
            expenses,
            balance: income - expenses,
        });
    }

    return monthlyData;
};

// Get insights from transactions
export const getInsights = (transactions) => {
    const insights = [];

    // Highest spending category
    const spendingByCategory = getSpendingByCategory(transactions);
    if (spendingByCategory.length > 0) {
        insights.push({
            id: 'highest-category',
            type: 'info',
            title: 'Highest Spending',
            description: `${spendingByCategory[0].name} - ₹${spendingByCategory[0].value.toLocaleString('en-IN')}`,
            icon: 'TrendingUp',
        });
    }

    // Monthly comparison
    const monthlyData = getMonthlyData(transactions, 2);
    if (monthlyData.length === 2) {
        const [lastMonth, thisMonth] = monthlyData;
        const change = calculatePercentageChange(thisMonth.expenses, lastMonth.expenses);

        insights.push({
            id: 'monthly-comparison',
            type: change > 0 ? 'warning' : 'success',
            title: 'Monthly Comparison',
            description: `Expenses are ${Math.abs(change).toFixed(1)}% ${change > 0 ? 'higher' : 'lower'} than last month`,
            icon: change > 0 ? 'ArrowUpRight' : 'ArrowDownRight',
        });
    }

    // Weekend spending pattern
    const weekendExpenses = transactions.filter(t => {
        const day = new Date(t.date).getDay();
        return t.type === 'expense' && (day === 0 || day === 6);
    });

    const totalExpenses = transactions.filter(t => t.type === 'expense');
    const weekendPercentage = totalExpenses.length > 0
        ? (weekendExpenses.length / totalExpenses.length) * 100
        : 0;

    if (weekendPercentage > 40) {
        insights.push({
            id: 'weekend-pattern',
            type: 'info',
            title: 'Spending Pattern',
            description: `${weekendPercentage.toFixed(0)}% of purchases happen on weekends`,
            icon: 'Calendar',
        });
    }

    return insights;
};