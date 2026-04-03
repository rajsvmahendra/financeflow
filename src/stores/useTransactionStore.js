import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initialTransactions } from '../data/mockData';
import { generateId } from '../utils/formatters';

export const useTransactionStore = create(
    persist(
        (set, get) => ({
            transactions: initialTransactions,
            isLoading: false,

            // Add transaction
            addTransaction: (transaction) => set((state) => ({
                transactions: [
                    {
                        ...transaction,
                        id: generateId(),
                        status: 'completed',
                    },
                    ...state.transactions,
                ],
            })),

            // Update transaction
            updateTransaction: (id, updates) => set((state) => ({
                transactions: state.transactions.map((t) =>
                    t.id === id ? { ...t, ...updates } : t
                ),
            })),

            // Delete transaction
            deleteTransaction: (id) => set((state) => ({
                transactions: state.transactions.filter((t) => t.id !== id),
            })),

            // Get transaction by ID
            getTransaction: (id) => {
                return get().transactions.find((t) => t.id === id);
            },

            // Set loading state
            setLoading: (loading) => set({ isLoading: loading }),

            // Reset to initial data
            resetTransactions: () => set({ transactions: initialTransactions }),
        }),
        {
            name: 'finance-transactions',
        }
    )
);