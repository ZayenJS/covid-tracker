import React, { useState, FC, useEffect } from 'react';
import moment from 'moment';

import {
  LineChart,
  Line,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Timeline } from '../../models';

interface DataGraphProps {
  timeline?: Timeline[];
  updated?: number;
  global?: boolean;
}

interface IChartData {
  Date: string;
  Cas: number | null;
  Malades: number | null;
  Rétablis: number | null;
  Décès: number | null;
}

const DataGraph: FC<DataGraphProps> = ({ timeline, updated, global = false }) => {
  const [state, setState] = useState<IChartData[]>([]);

  useEffect(() => {
    if (timeline?.length) {
      const chartData: IChartData[] = [];

      for (const data of timeline) {
        const { lastUpdated, totalConfirmed, totalDeaths, totalRecovered } = data;
        const chartDataObj: IChartData = {
          Date: moment(lastUpdated).format('DD/MM/YY'),
          Cas: totalConfirmed,
          Malades: totalConfirmed - totalRecovered,
          Rétablis: totalRecovered,
          Décès: totalDeaths,
        };
        chartData.push(chartDataObj);
      }

      setState(chartData);
    }
  }, [timeline]);

  return (
    <div style={{ height: '20rem', width: '90%', margin: 'auto' }}>
      {timeline?.length ? (
        <>
          <ResponsiveContainer>
            <LineChart data={state}>
              <CartesianGrid strokeDasharray="1 1" />
              <XAxis dataKey="Date" />
              <YAxis />
              <Tooltip
                contentStyle={{ background: '#31232d', border: '#31232d', borderRadius: '5px' }}
              />
              <Legend verticalAlign="top" height={36} />
              <Line
                legendType="rect"
                type="natural"
                activeDot={{ r: 5 }}
                dataKey="Cas"
                stroke="#eedd00"
              />
              <Line
                legendType="rect"
                type="natural"
                activeDot={{ r: 5 }}
                dataKey="Malades"
                stroke="#ff7b00"
              />
              <Line
                legendType="rect"
                type="natural"
                activeDot={{ r: 5 }}
                dataKey="Rétablis"
                stroke="#27b351"
              />
              <Line
                legendType="rect"
                type="natural"
                activeDot={{ r: 5 }}
                dataKey="Décès"
                stroke="#ac0e0e"
              />
            </LineChart>
          </ResponsiveContainer>
          {!timeline?.length ? (
            <h2>Pas de donnés pour ce pays</h2>
          ) : (
            <div>
              <p>Dates au format jj/mm/aa</p>
              {!global ? (
                <>
                  <p>Données tous territoires confondus</p>
                  <p>Dernière mise à jour : {moment(updated).format('LLL')}</p>{' '}
                </>
              ) : null}
            </div>
          )}
        </>
      ) : (
        'rien a afficher'
      )}
    </div>
  );
};

export default DataGraph;
