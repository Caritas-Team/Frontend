export type TChartDataItem = {
  name: string;
  prevValue: string;
  currentValue: string;
};

export type TChartData = {
  data: TChartDataItem[];
  initiative: TChartDataItem[];
  prevDate: string; // ожидается строка в формате "гггг-мм-дд"
  currentDate: string; // ожидается строка в формате "гггг-мм-дд"
};

export type TBarChartData = Omit<TChartData, 'initiative'>;

export type TTwoPieCharts = Pick<TChartData, 'initiative'>;
