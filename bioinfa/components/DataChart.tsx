'use client'

import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface DataChartProps {
  data: number[]
}

const DataChart: React.FC<DataChartProps> = ({ data }) => {
  const chartData = {
    labels: ['A', 'C', 'G', 'T'],
    datasets: [
      {
        label: 'Frequency',
        data,
        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Nucleotide Frequency',
      },
    },
  }

  return <Bar data={chartData} options={options} />
}

export default DataChart

