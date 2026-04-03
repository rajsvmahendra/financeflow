import { formatDate, formatCurrency } from './formatters';

// Export to CSV
export const exportToCSV = (transactions, filename = 'transactions') => {
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount', 'Status'];

    const rows = transactions.map(t => [
        formatDate(t.date),
        t.description,
        t.category,
        t.type,
        t.amount,
        t.status,
    ]);

    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    downloadFile(csvContent, `${filename}.csv`, 'text/csv');
};

// Export to JSON
export const exportToJSON = (transactions, filename = 'transactions') => {
    const jsonContent = JSON.stringify(transactions, null, 2);
    downloadFile(jsonContent, `${filename}.json`, 'application/json');
};

// Helper function to download file
const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
};