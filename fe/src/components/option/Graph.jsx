import React from 'react';
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
);


function Graph() {
  const datas = useSelector((state) => state.kakeibo.value);
  const nowData = useSelector((state) => state.dateId.value);
  
  let options = {
    responsive: true,
    plugins: {
    legend: {
    position: 'top' ,
    },
    title: {
    display: true,
    text: '棒グラフ！！！',
    },
  },
};
    
  let labels = [];
  let data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [0],
            backgroundColor: 'rgba(255, 0, 0, 0.8)',
            },
    ],};

    if (nowData !== undefined) {
      const date = [];
      const Data = [];
    
      for (let i = 3; i > -1; i--) {
        const month = nowData.month - i;
        const year = month > 0 ? nowData.year : nowData.year - 1;
        const adjustedMonth = month > 0 ? month : month + 12;
        date.push(`${adjustedMonth}月`);
    
        const newData = { year, month: adjustedMonth };
        const setNewData = datas.find((item) => item.year === newData.year && item.month === JSON.stringify(newData.month));
        if (setNewData === undefined) {
          Data.push(0);
        } else {
          Data.push(setNewData.data);
        }
      };
    
      options = {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return `${value}万円`
              },
            },
          },
        },
      };
      
        
    labels = date;
    data = {
        labels,
        datasets: [
            {
                label: '',
                data: Data,
                backgroundColor: 'rgba(255, 0, 0, 0.8)',
                },
        ],};
  };

    return (
        <div>
            <Bar options={options} data={data} />
        </div>
    )
};

export default Graph;
