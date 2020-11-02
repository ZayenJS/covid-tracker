import React, { FC } from 'react';
import { Cell, Legend, Pie, PieChart as PChart, ResponsiveContainer, Tooltip } from 'recharts';
import { v4 as uuidv4 } from 'uuid';

// import styles from './PieChart.module.scss';

interface PieChartProps {
  data: { name: string; value: number }[];
  colors: string[];
}

const PieChart: FC<PieChartProps> = ({ data, colors }) => {
  return (
    <div style={{ height: '14rem', width: '20rem', margin: 'auto' }}>
      <ResponsiveContainer>
        <PChart>
          <Pie
            dataKey="value"
            nameKey="name"
            data={data}
            cx={'50%'}
            cy={'50%'}
            innerRadius={55}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}>
            {data.map((_, index) => (
              <Cell key={uuidv4()} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Legend iconType="rect" verticalAlign="top" align="center" />
          <Tooltip
            contentStyle={{
              background: '#31232d',
              border: '#31232d',
              borderRadius: '5px',
            }}
            itemStyle={{ color: '#fff' }}
          />
        </PChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
