export interface DashboardDataDto {
    chartData: BarChartDto[];
    pieData: pieDataDto[];
    doctors: number;
    patients: number;
    nurses: number;
    pharmacusts: number;
};

export interface BarChartDto {
    Patients: number;
    Discharged: number;
    Year: string;
};

export interface pieDataDto {
    Profit: number;
    Month: string;
};