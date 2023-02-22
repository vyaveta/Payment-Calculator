import React, { useState } from 'react'
import css from './SideBar.module.css'
import Image from 'next/image'
import logo from '../../assets/logo.png'
// other npm modules
import { toast } from 'react-toastify'
// Redux imports
import { useDispatch } from 'react-redux'
import { incrementByAmount } from '@/slices/userBalance'
import { changeBg } from '@/slices/backgroundSlice'
import { changeFontColor } from '@/slices/fontColorSlice'

const SideBar = () => {

    const dispatch = useDispatch()

    const [inputAmout,setInputAmout] = useState<number>()
    const [balance,setBalance] = useState<number[]>([])
    const [count,setCount] = useState<number>(0)

    const colors: string[] = ['#06F883','#9906F8','#F86206','white','black','purple','lightgreen','aqua','lightblue']

    //Functions 
   const handleSubmitButtonClick = () => {
    console.log('hello this function works')
    if(!inputAmout){
        handleError('Enter your amount')
        return
    }
    setBalance([...balance,inputAmout])
    dispatch(incrementByAmount(inputAmout))
    setInputAmout(0)
    setCount(count+1)
   }

   const handleError = (msg: string) => toast.error(msg)

   const handleChangeBackground = (index: number) => dispatch(changeBg(colors[index]))
   const handleChangeFontcolor = (index: number) => dispatch(changeFontColor(colors[index]))

  return (
    <div className={`${css.container}`}>
        <div className={`${css.innerContainer}`}>
        <div className={`${css.header}`}>
            <h2>Calci app</h2>
            <Image src={logo} alt=""  height={50} width={50}/>
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
            placeholder='Enter amount'
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
        <div className={`${css.colorThemes}`}>
        <div className={`${css.innerContainer2wrap}`}>
            <p>Set background Color</p>
            <div className={css.innerContainer2}>
            {
                colors.map((color: string,index: number) => (
                    <div key={`fontColor${index}`}
                    className={css.backgroundColorSetterDiv}
                    style={{background: color}}
                    onClick={() => handleChangeFontcolor(index)}
                    ></div>
                ))
            }
            </div>
        </div>
        <div className={`${css.innerContainer2wrap}`}>
            <p>Set font Color</p>
            <div className={css.innerContainer2}>
            {
                colors.map((color: string,index: number) => (
                    <div key={`backgroundColor${index}`}
                    className={css.backgroundColorSetterDiv}
                    style={{background: color}}
                    onClick={() => handleChangeBackground(index)}
                    ></div>
                ))
            }
            </div>
        </div>
        </div>
    </div>
  )
}
export default SideBar