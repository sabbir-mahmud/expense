export interface Category {
    _id: string;
    name: string;
}

export interface CategoryResponse {
    success: boolean;
    message: string;
    data: { categories: Category[] };
}

export interface Expense {
    _id: string;
    user: {
        _id: string;
        name: string;
        email: string;
    };
    details: string;
    amount: number;
    type: string;
    from: string;
    category: Category;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface ExpenseResponse {
    success: boolean;
    message: string;
    data: {
        expenses: Expense[];
        pagination: { currentPage: number; totalPages: number };
    };
}
