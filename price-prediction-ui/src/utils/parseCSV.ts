// // utils/parseCSV.ts
// import Papa from 'papaparse';

// export interface ZincPriceData {
//   date: string;
//   lmeZinc: number;
//   lmeZinc3: number;
//   lmeZincStock: number;
// }

// export const parseCSV = async (file: File): Promise<ZincPriceData[]> => {
//   return new Promise((resolve, reject) => {
//     Papa.parse(file, {
//       header: true,
//       dynamicTyping: true,
//       complete: (results: any) => {
//         if (results.errors.length) {
//           reject(results.errors);
//         } else {
//           resolve(results.data as ZincPriceData[]);
//         }
//       },
//     });
//   });
// };
