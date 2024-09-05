

export interface KpiData {
    lastMonthAvg: number;
    sameMonthLastYearAvg: number;
    last3MonthsAvg: number;
    same3MonthsLastYearAvg: number;
    ytdAvg: number;
    ytdLastYearAvg: number;
    rolling6MonthsAvg: number;
    quarterlyAvg: number;
    highestPrice: number;
    lowestPrice: number;
    // Add other KPIs as needed
  }

  export interface KpiData {
    lastMonthAvg: number;
    sameMonthLastYearAvg: number;
    last3MonthsAvg: number;
    same3MonthsLastYearAvg: number;
    ytdAvg: number;
    ytdLastYearAvg: number;
    rolling6MonthsAvg: number;
    quarterlyAvg: number;
    highestPrice: number;
    lowestPrice: number;
    // Add other KPIs as needed
  }

  export interface KPI_monthwise {
    month: string;
    avg_zinc: number;
    max_zinc: number;
    min_zinc: number;
    avg_zinc_3m: number;
    avg_stock: number;
    rolling_3m_avg: number;
    rolling_6m_avg: number;
    ytd_avg: number;
  }
  
  export interface KPI_monthwise_lead {
    month: string;
    avg_lead: number;
    max_lead: number;
    min_lead: number;
    avg_lead_3m: number;
    avg_stock: number;
    rolling_3m_avg: number;
    rolling_6m_avg: number;
    ytd_avg: number;
  }