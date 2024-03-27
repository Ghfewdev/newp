import React from 'react'
import { useState } from 'react'

export default function Agecal(props) {

    const [dob, setDob] = useState('');
    const [age, setAge] = useState('');

    const calculateAge = () => {
        setTimeout(() => {
            const today = new Date();
            const birthDate = new Date(dob);
            let age = today.getFullYear() - birthDate.getFullYear();
            const month = today.getMonth() - birthDate.getMonth();
            if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if (isNaN(age)) {
                setAge("0")
            } else if (age <= -1) {
                setAge(age+543)

                if ((age+543) >= 60) {
                    document.getElementById(`${props.agg}1`).checked = true
                    document.getElementById(`${props.agg}7`).required = false
                } else {
                    document.getElementById(`${props.agg}1`).checked = false
                    
                }
            } else {
                setAge(age);

                if (age >= 60) {
                    document.getElementById(`${props.agg}1`).checked = true
                    document.getElementById(`${props.agg}7`).required = false
                    
                } else {
                    document.getElementById(`${props.agg}1`).checked = false
                    
                }
            }
            
            //console.log(document.getElementById(props.agg).value)
            
        }, 100);

    };

    return (
        <>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">วัน/เดือน/ปี เกิด</label>
                <input type="date" value={dob} onChange={(e) => { setDob(e.target.value) }} id="birt" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div> 
            <div className="text-center">
                <button type="button" className="bg-[#e9e9d9dd] shadow-md p-2 mt-7 rounded-lg hover:bg-slate-400" onClick={ () => calculateAge() }>คำนวณอายุ</button>
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">อายุ(ปี)</label>
                <input type="text" value={age} id="age" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[35%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" maxLength={3} placeholder="" required readOnly />
            </div>
        </>
    )
}
