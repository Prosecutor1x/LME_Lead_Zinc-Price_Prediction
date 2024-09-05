import React from 'react';

export const MainHero = () => {
  return (
    <div className="p-4 ">
      <div className="flex justify-between p-4 gap-12 bg-blue-800 rounded-t-xl">
        <h1 className="text-3xl text-red-800 text-bold bg-white p-3 font-bold rounded-xl">
        LEAD PRICE FORECASTS
        </h1>
        <h2 className="text-2xl text-white font-semibold ">
          Commodity Price Surveys Since 2008
        </h2>
      </div>

      <div className="bg-red-500 h-10 rounded-b-xl" />
      <div className=''>
        <h3 className="text-black text-start text-bold text-xl mx-2 font-semibold pt-4">
          Survey Date : July 17 2024
        </h3>
        <p className="text-center pt-4 ">
          Energy & Metals Consensus Forecasts surveys more than 40 energy and
          metals analysts every month for a range of commodity price forecasts.
          The results covering over 35 commodities – together with reference
          data, analysis, special surveys, and the underlying global
          macroeconomic outlook – are sent to subscribers by express mail and
          e-mail.
        </p>
      </div>
      <div>
        <h1 className="text-xl text-purple-500 text-bold pt-12">
          Real (Inflation-Adjusted) Commodity Price Trends and Forecasts: A
          Special Analysis
        </h1>
        <p>
          In this month’s special analysis on pages 26 and 27, we review how
          major commodity prices have moved in recent years and consider how
          inflation-adjusted price projections can alter sentiment over the
          longer-term horizon (WTI Crude Oil charted below).
        </p>
        <h1 className="text-xl text-blue-500 text-bold pt-6">
          Energy & Metals - Overview
        </h1>
        <p>
          Panellists continue to make notable adjustments to their commodity
          price forecasts as various public health, policy, and geopolitical
          developments influence supply and demand dynamics to different extents
          across the spectrum.The emergence of the ‘Omicron’ variant of
          Covid-19, thought to be far more transmissive than any previous strain
          identified, led to a spike in volatility at the end of November, as it
          raised the likelihood that pandemic restrictions would return across
          the world.The impact on Crude Oil (pages 6 and 7) was particularly
          pronounced, with a near US$10/ barrel price drop reported for WTI on
          November 26 alone, as transport stands to be an industry harmed more
          than most by the reintroduction of lockdown measures. The rest of the
          energy sector largely escaped losses, as the usage of Natural gas
          (page 9), Coal (page 10) and Uranium (page 11) in electricity
          generation is less affected. In addition, each of these fuels remains
          exception-
        </p>
      </div>
    </div>
  );
};
