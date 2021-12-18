export interface DashboardDataDto {
    chartData: BarChartDto[];
    liquid: number;
    doctors: number;
    patients: number;
    nurses: number;
    pharmacusts: number;
};

export interface BarChartDto {
    value: number;
    year: string;
}