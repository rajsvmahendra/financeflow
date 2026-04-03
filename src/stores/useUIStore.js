import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUIStore = create(
    persist(
        (set) => ({
            // Role management
            role: 'admin',

            // Transaction Modal
            isTransactionModalOpen: false,
            editingTransaction: null,

            // Detail Modal
            detailModalOpen: false,
            detailModalType: null,

            // Toast notifications
            toasts: [],

            // Actions
            setRole: (role) => set({ role }),

            // Transaction Modal Actions
            openTransactionModal: (transaction = null) => set({
                isTransactionModalOpen: true,
                editingTransaction: transaction,
            }),

            closeTransactionModal: () => set({
                isTransactionModalOpen: false,
                editingTransaction: null,
            }),

            // Detail Modal Actions
            openDetailModal: (type) => set({
                detailModalOpen: true,
                detailModalType: type,
            }),

            closeDetailModal: () => set({
                detailModalOpen: false,
                detailModalType: null,
            }),

            // Toast Actions
            addToast: (toast) => set((state) => ({
                toasts: [
                    ...state.toasts,
                    {
                        id: Date.now(),
                        ...toast,
                    },
                ],
            })),

            removeToast: (id) => set((state) => ({
                toasts: state.toasts.filter((t) => t.id !== id),
            })),
        }),
        {
            name: 'finance-ui',
            partialize: (state) => ({
                role: state.role,
            }),
        }
    )
);