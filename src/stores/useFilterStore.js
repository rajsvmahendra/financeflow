import { create } from 'zustand';

export const useFilterStore = create((set) => ({
    searchQuery: '',
    categoryFilter: 'all',
    typeFilter: 'all',
    sortBy: 'date',
    sortOrder: 'desc',
    dateRange: 'all',

    setSearchQuery: (query) => set({ searchQuery: query }),
    setCategoryFilter: (category) => set({ categoryFilter: category }),
    setTypeFilter: (type) => set({ typeFilter: type }),
    setSortBy: (sort) => set({ sortBy: sort }),
    setSortOrder: (order) => set({ sortOrder: order }),
    setDateRange: (range) => set({ dateRange: range }),

    resetFilters: () => set({
        searchQuery: '',
        categoryFilter: 'all',
        typeFilter: 'all',
        sortBy: 'date',
        sortOrder: 'desc',
        dateRange: 'all',
    }),
}));