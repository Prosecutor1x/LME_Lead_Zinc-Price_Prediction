// utils/calculateKPIs.ts
import { ZincPriceData } from '@/model/interfaceZincPriceData';
import moment from 'moment';
import {KpiData} from '@/model/interfaceZincPricesKpis';

export const calculateKPIs = (data: ZincPriceData[]): KpiData => {
  // Calculate dates
  const lastMonth = moment().subtract(1, 'months').format('YYYY-MM');
  const sameMonthLastYear = moment().subtract(1, 'years').format('YYYY-MM');
  const dateToday = moment().format('YYYY-MM-DD');
  const lastYearThisDay = moment().subtract(1, 'years').format('YYYY-MM-DD');
  const startOfYear = moment().startOf('year').format('YYYY-MM-DD');
  const startOfLastYear = moment().subtract(1, 'years').startOf('year').format('YYYY-MM-DD');

  // Filter data
  const lastMonthData = data.filter((item) =>
    moment(item.date, 'YYYY-MM-DD').isSame(lastMonth, 'month')
  );
  const sameMonthLastYearData = data.filter((item) =>
    moment(item.date, 'YYYY-MM-DD').isSame(sameMonthLastYear, 'month')
  );

  const last3MonthsData = data.filter((item) =>
    moment(item.date, 'YYYY-MM-DD').isBetween(
      moment().subtract(3, 'months').startOf('month'),
      moment().endOf('month'),
      undefined,
      '[]'
    )
  );

  const same3MonthsLastYearData = data.filter((item) =>
    moment(item.date, 'YYYY-MM-DD').isBetween(
      moment().subtract(1, 'years').subtract(3, 'months').startOf('month'),
      moment().subtract(1, 'years').endOf('month'),
      undefined,
      '[]'
    )
  );

  const currentMonthData = data.filter((item) =>
    moment(item.date, 'YYYY-MM-DD').isSame(moment().format('YYYY-MM'), 'month')
  );

  const ytdData = data.filter((item) =>
    moment(item.date, 'YYYY-MM-DD').isBetween(startOfYear, dateToday, undefined, '[]')
  );

  const ytdLastYearData = data.filter((item) =>
    moment(item.date, 'YYYY-MM-DD').isBetween(startOfLastYear, lastYearThisDay, undefined, '[]')
  );

  const rolling6MonthsData = data.filter((item) =>
    moment(item.date, 'YYYY-MM-DD').isBetween(
      moment().subtract(6, 'months').startOf('month'),
      moment().endOf('month'),
      undefined,
      '[]'
    )
  );

  const currentQuarterStart = moment().startOf('quarter').format('YYYY-MM-DD');
  console.log('currentQuarterStart', currentQuarterStart);
  const quarterlyData = data.filter((item) =>
    moment(item.date, 'YYYY-MM-DD').isBetween('2024-01-01', '2024-06-10', undefined, '[]')
  );

  // Calculate averages and other KPIs
  const calculateAvg = (data: ZincPriceData[]) =>
    data.length ? data.reduce((sum, item) => sum + item.lmeZinc, 0) / data.length : 0;

  const lastMonthAvg = calculateAvg(lastMonthData);
  const sameMonthLastYearAvg = calculateAvg(sameMonthLastYearData);
  const last3MonthsAvg = calculateAvg(last3MonthsData);
  const same3MonthsLastYearAvg = calculateAvg(same3MonthsLastYearData);
  const ytdAvg = calculateAvg(ytdData);
  const ytdLastYearAvg = calculateAvg(ytdLastYearData);
  const rolling6MonthsAvg = calculateAvg(rolling6MonthsData);
  const quarterlyAvg = calculateAvg(quarterlyData);
  const highestPrice = data.reduce((max, item) => (item.lmeZinc > max ? item.lmeZinc : max), 0);
  const lowestPrice = data.reduce((min, item) => (item.lmeZinc < min ? item.lmeZinc : min), Number.MAX_VALUE);

  // Debug logging
  // console.log('lastMonthAvg', lastMonthAvg);
  // console.log('sameMonthLastYearAvg', sameMonthLastYearAvg);
  // console.log('last3MonthsAvg', last3MonthsAvg);
  // console.log('same3MonthsLastYearAvg', same3MonthsLastYearAvg);
  // console.log('ytdAvg', ytdAvg);
  // console.log('ytdLastYearAvg', ytdLastYearAvg);
  // console.log('rolling6MonthsAvg', rolling6MonthsAvg);
  // console.log('quarterlyAvg', quarterlyAvg);
  // console.log('highestPrice', highestPrice);
  // console.log('lowestPrice', lowestPrice);

  // Return KPIs
  return {
    lastMonthAvg,
    sameMonthLastYearAvg,
    last3MonthsAvg,
    same3MonthsLastYearAvg,
    ytdAvg,
    ytdLastYearAvg,
    rolling6MonthsAvg,
    quarterlyAvg,
    highestPrice,
    lowestPrice,
    // Add other KPIs here
  };
};
