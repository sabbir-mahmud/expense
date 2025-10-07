interface OverviewData {
    balance: number;
    saving: number;
    thisMonthExpense: number;
}
export interface OverviewResponse {
    success: boolean;
    message: string;
    data: OverviewData;
}
