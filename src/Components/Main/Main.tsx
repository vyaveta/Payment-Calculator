import React, { useState } from 'react'
import css from './Main.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { incrementByAmount } from '@/slices/userBalance'
import type { RootState } from 'store'

import * as chartjs from 'chart.js';

// some imports for graph
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Main = () => {

  const balance = useSelector((state: RootState) => state.counter.value)
  
  const [monthlyPaymentAmount,setMonthlyPaymentAmount] = useState<number>()

  // graph options
  const options: chartjs.ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Loan Period Graph",
      },
    },
    // scales: {
    //   y: {
    //     min: 3,
    //     max:6,
    //   }
    // }
  };

  let initialBalance: number = balance;
  let yLabel = [];

  let emi = monthlyPaymentAmount
  if(!emi) emi = 1

  let xaxis = Math.ceil(initialBalance / emi);
  let xLabel = [];
  let value = initialBalance;

  for (let i = 0; i <= xaxis; i++) {
    xLabel.push(i);
    if (value < 0) {
      value = 0;
    }
    yLabel.push(value);
    value = value - emi;
  }

  console.log(yLabel,'is the y label')
  console.log(xLabel,'is the x label')

  const data = {
    // labels: ['jan','feb','mar','april','may','june','july','aug','sept','oct','nov','dec'],
    labels: xLabel,
    datasets: [
      {
        label: 'Mothly payment Calculator',
        data: yLabel,
        backgroundColor: ["#a6a1e3"],
        borderWidth: 1,
        borderColor:'black'
      }
    ]
  }


  return (
    <div className={`${css.container}`}>
        <div className={`${css.box}`}>
          <h2>Initial Balance: {balance}</h2>
        </div>
        <div className={`${css.box}`}>
          <input type="number" placeholder='Monthly Payment'
          autoComplete='off'
          className={`${css.input}`}
          value={monthlyPaymentAmount}
          onChange={(e) => setMonthlyPaymentAmount(parseInt(e.target.value))}
          />
          <button className={`${css.button}`}>
            Set
          </button>
        </div>
        <div className={`${css.graph}`}>
          <Line options={options}  data={data}> </Line>
        </div>
    </div>
  )
}

export default Main