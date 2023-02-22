import React, { useState } from 'react'
import css from './SideBar.module.css'
import { useDispatch } from 'react-redux'
import { incrementByAmount,decrement,increment } from '@/slices/userBalance'

const SideBar = () => {

    const dispatch = useDispatch()

    const [inputAmout,setInputAmout] = useState<number>()
    const [balance,setBalance] = useState<number[]>([])
    const [count,setCount] = useState<number>(0)

    //Functions 
   const handleSubmitButtonClick = () => {
    if(!inputAmout) return
    setBalance([...balance,inputAmout])
    dispatch(incrementByAmount(inputAmout))
    setInputAmout(0)
    setCount(count+1)
   }
  return (
    <div className={`${css.container}`}>
        <div className={`${css.box}`}>
            <h1>Accounts</h1>
        </div>
        <div className={`${css.box}`}>
            <h3>Count:{count} </h3>
        </div>
        <div className={`${css.box}`}>
            <div className={`${css.innerBox}`}>
            <input type="number" 
            autoComplete='off'
            className={`${css.input}`}
            value={inputAmout}
            onChange={(e) => setInputAmout(parseInt(e.target.value))}
            />
            <button className={`${css.submitButton}`}
            onClick={handleSubmitButtonClick}
            >Submit</button>
            </div>
        </div>
        <div className={`${css.box}`}>
            {
                balance?.map((balance,index) => (
                    <p className={`${css.balanceText}`} key={`balance${index}`}>{balance}</p>
                ))
            }
        </div>
    </div>
  )
}
export default SideBar