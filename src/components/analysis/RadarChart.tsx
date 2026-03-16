"use client";

import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarChartProps {
  scores: {
    affarsmodell: number;
    strategiskMoat: number;
    finansiellKvalitet: number;
    vardering: number;
    tillvaxtutsikter: number;
    riskprofil: number;
    esgMakro: number;
    aiObservationer: number;
  };
}

const RadarChart: React.FC<RadarChartProps> = ({ scores }) => {
  const labels = [
    'Affärsmodell',
    'Moat',
    'Finanser',
    'Värdering',
    'Tillväxt',
    'Riskprofil',
    'ESG/Makro',
    'AI-Obs',
  ];

  const data: ChartData<'radar'> = {
    labels,
    datasets: [
      {
        label: 'Poäng',
        data: Object.values(scores),
        backgroundColor: 'rgba(26, 60, 110, 0.2)',
        borderColor: 'rgba(26, 60, 110, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(26, 60, 110, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(26, 60, 110, 1)',
      },
    ],
  };

  const options: ChartOptions<'radar'> = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: '#e8e4da'
        },
        suggestedMin: 0,
        suggestedMax: 5,
        ticks: {
          stepSize: 1,
          backdropColor: 'transparent',
          color: '#8a8678',
        },
        pointLabels: {
            font: {
                size: 10,
            },
            color: '#2a2a2a'
        },
        grid: {
          color: '#e8e4da'
        }
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return <div style={{ height: '300px' }}><Radar data={data} options={options} /></div>;
};

export default RadarChart;
