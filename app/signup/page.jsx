"use client"
import React, { useState } from 'react'

export default function Signup() {
  const [citi, setCiti] = useState(false);
  const [che13, setChe13] = useState(0);
  const submitform = () => {
    if (che13.length !== 13) {
      alert("เลขบัตรประชาชนไม่ถูกต้อง")
    } else {
      alert("OK")
    }
  }
  const checking13 = (val) => {
    if(val.length !== 13) {
      setCiti(true);
      document.getElementById("c13").disabled === false
    } else {
      setCiti(false);
      document.getElementById("c13").disabled === true
    }
  }
  return (
    <>
      <p className="font-bold text-center uppercase text-3xl">Signin</p>
      <form action={submitform}>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เลขบัตรประชาชน</label>
        <input type="text" value={che13} onChange={e => {setChe13(e.target.value), checking13(e.target.value)}} id="sitizen" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" minLength={13} maxLength={13} required />
        <button id='c13' type='submit' className='p-2 bg-blue-500 m-2 hover:bg-green-500 disabled:bg-slate-500'>save</button>
      </form>
    </>

  )
}
