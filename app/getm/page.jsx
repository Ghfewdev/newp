"use client"
import DataTable from 'react-data-table-component';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Authen from '../components/Authen';
import { useRouter } from 'next/navigation'
import { ThaiDatePicker } from "thaidatepicker-react";

export default function Getm() {
    Authen();
    const [end, setEnd] = useState("");
    const [start, setStart] = useState("");
    const [data, setData] = useState([]);
    const [t1, setT1] = useState(false);


    const show = () => {

        const a = new Set(data.map(item => item.hos_name))
        const b = data.map(item => item.citizen).length
        const c = new Set(data.map(item => item.citizen)).size

        // console.log(a, b, c)
        return [a, b, c]
    }

    const fetchs = () => {
        document.getElementById("down").disabled = true
        if (localStorage.getItem("id") === "14") {
            if(end !== "" && start !== "") {
                setT1(true)
            fetch(process.env.NEXT_PUBLIC_APP_API + `/formccall/${start}/${end}`)
                .then(res => res.json())
                .then(result => {
                    setData(result);
                    if (result.length !== 0) {
                        document.getElementById("down").disabled = false
                    }
                });
            }
        }
        else if (end !== "" && start !== "") {
            fetch(process.env.NEXT_PUBLIC_APP_API + `/formcci/${localStorage.getItem("id")}/${start}/${end}`)
                .then(res => res.json())
                .then(result => {
                    setData(result);
                    if (result.length !== 0) {
                        document.getElementById("down").disabled = false
                    }
                });
        }
    }

    const downloads = () => {
        window.open(process.env.NEXT_PUBLIC_APP_API + `/formcc/${localStorage.getItem("id")}/${start}/${end}`)
    }




    useEffect(() => {
        fetchs();
    }, [start, end]);

    return (
        <div className='p-10'>
            <div>สรุปผลการใช้งานระบบ</div>
            <br />
            <div className="grid gap-6 mb-6 md:grid-cols-4 pl-6 pr-6 mt-6">
                <div></div>


                <div>
                    <label>ช่วงเวลาเริ่ม: </label>
                    <ThaiDatePicker
                        value={start}
                        onChange={(christDate) => { setStart(christDate) }}
                        customInput={"input"}
                        inputProps={{
                            displayFormat: "D MMMM YYYY",
                            className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                            // required: true,
                            id: "start",
                            autoComplete: "off"
                        }}
                    />
                </div>

                <div>
                    <label>ช่วงเวลาสิ้นสด: </label>
                    <ThaiDatePicker
                        value={end}
                        onChange={(christDate) => { setEnd(christDate) }}
                        customInput={"input"}
                        inputProps={{
                            displayFormat: "D MMMM YYYY",
                            className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                            // required: true,
                            id: "end",
                            autoComplete: "off"
                        }}
                    />
                </div>

            </div>

            <div className='text-center'>
                <button id='down' onClick={() => downloads()} className=' bg-green-600 rounded p-2 text-white disabled:bg-slate-500' >ดาวน์โหลด รายการ</button>
            </div>
            <br />
            <div className='flex justify-center'>
                <table className="table-auto text-center border border-collapse border-black">
                    <thead>
                        <tr>
                            <th className='p-1 border border-black'>โรงพยาบาล</th>
                            <th className='p-1 border border-black'>จำนวนการให้บริการ(ครั้ง)</th>
                            <th className='p-1 border border-black'>จำนวนผู้รับบริการ(คน)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((a, i) => {
                            return (
                                <tr key={i} hidden={!t1}>
                                    <th className='p-1 border border-black'>{a.hos_name}</th>
                                    <th className='p-1 border border-black'>{a.alls}</th>
                                    <th className='p-1 border border-black'>{a.complete}</th>
                                </tr>
                            )
                        })}
                        <tr hidden={t1}>
                            <th className='p-1 border border-black'>{show()[0]}</th>
                            <th className='p-1 border border-black'>{show()[1]}</th>
                            <th className='p-1 border border-black'>{show()[2]}</th>
                        </tr>

                    </tbody>
                </table>

            </div>

        </div>
    )
}
