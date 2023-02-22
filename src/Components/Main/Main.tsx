import React, { useEffect, useRef, useState } from 'react'
import css from './Main.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { incrementByAmount } from '@/slices/userBalance'
import type { RootState } from 'store'
import {toast} from 'react-toastify'

// some imports for graph
import * as chartjs from 'chart.js';
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
import { MainProp } from '@/types/Props'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Main = ({text}: MainProp) => {

  const balance = useSelector((state: RootState) => state.counter.value)
  
  const [monthlyPaymentAmount,setMonthlyPaymentAmount] = useState<number>()
  const [showTimePeriod,setShowTimePeriod] = useState<boolean>(false)
  const [timePeriod,setTimePeriod] = useState<number>()
  const [errorMsg,setErrorMsg] = useState<boolean | string>(false)


  const inputRef = useRef<HTMLInputElement>(null)

  const handleButtonClick = () => {
    if(!inputRef || !inputRef.current || !inputRef.current.value || balance === 0){
      setErrorMsg('Enter the Monthly payment amount!')
      setShowTimePeriod(false)
      return
    }
    if(parseInt(inputRef.current.value) <= 0){
      setErrorMsg('Increase your monthly payment')
      return
    }
    setMonthlyPaymentAmount(parseInt(inputRef.current.value))
    setShowTimePeriod(true)
  }

  // Some useEffects
  // useEffect(() => {
  //   if(balance === 0) setShowTimePeriod(false)
  //   else if(balance != 0 && monthlyPaymentAmount && monthlyPaymentAmount >= 0) setShowTimePeriod(true)
  // },[balance])

  useEffect(() => {
   if(errorMsg) toast.error(errorMsg)
  },[errorMsg])

  // graph options
  const options: chartjs.ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Calci Pay",
      },
    },
  };

  let initialBalance: number = balance;
  let yLabel = [];

  let emi = monthlyPaymentAmount
  if(!emi) emi = 1

  let xaxis = Math.ceil(initialBalance / emi);
  let xLabel = [];
  let value = initialBalance;

  for (let i:number = 0; i <= xaxis; i++) {
    xLabel.push(i);
    if (value < 0) {
      value = 0;
    }
    yLabel.push(value);
    // setyLabel([...yLabel,value])
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
       {
        showTimePeriod &&  <div className={`${css.box}`}>You will need {yLabel.length-1} months to complete this payment</div>
       }
        <div className={`${css.box}`}>
          <input type="number"
          placeholder='Monthly Payment'
          ref={inputRef}
          autoComplete='off'
          className={`${css.input}`}
          />
          <button className={`${css.button}`} onClick={handleButtonClick}>
            Set
          </button>
        </div>
        {
          showTimePeriod? (
            <div className={`${css.graph}`}>
               <Line options={options}  data={data}> </Line>
            </div>
          ) : (
            <div className={`${css.fullBox}`}>
              <h3>{text}</h3>
            </div>
          )
        }
    </div>
  )
}

export default Main