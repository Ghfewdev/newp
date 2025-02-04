"use client"
import React, { useEffect, useState } from 'react'
import Authen from '../components/Authen';
import { ThaiDatePicker } from 'thaidatepicker-react';

export default function Reports() {
    Authen();
    const [all, setAll] = useState([]);
    const [end, setEnd] = useState("");
    const [start, setStart] = useState("");
    const [hh1, setHh1] = useState(["รพก", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [hh2, setHh2] = useState(["รพต", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [hh3, setHh3] = useState(["รพจ", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [hh4, setHh4] = useState(["รพท", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [hh5, setHh5] = useState(["รพว", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [hh6, setHh6] = useState(["รพภ", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [hh7, setHh7] = useState(["รพร", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [hh8, setHh8] = useState(["รพส", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [hh9, setHh9] = useState(["รพข", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [hh10, setHh10] = useState(["รพป", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [hh11, setHh11] = useState(["รพบ", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [hha, setHha] = useState(["รวม", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    const seth = (val1, val2) => {
        console.log(start, end)
        if (val1 === "" || val2 === "") {
            alert("เลือกวันที่ก่อน")
        } else {
             fetch(process.env.NEXT_PUBLIC_APP_API + `/formq/${val1}/${val2}`)
            .then(res => res.json())
            .then(result => {
                setAll(result);
            });

            update();
        }
         
    }

    const cheg = () => {
        if (!(start === "" || end === "")) {
            fetch(process.env.NEXT_PUBLIC_APP_API + `/formq/${val1}/${val2}`)
            .then(res => res.json())
            .then(result => {
                setAll(result);
            });
            console.log("ok")
        }
        console.log(!(start === "" || end === ""), start, end)
    }

    const update = () => {

        console.log(!(start === "" || end === ""), start, end)

        const a1 = Array.from({ length: 11 }, (_, i) => 
            all.filter(a => a.hos_id === i + 1 && a.way === "LINE add")
        );

        const b1 = Array.from({ length: 11 }, (_, i) => 
            all.filter(a => a.hos_id === i + 1 && a.way === "Walk in")
        );

        const c1 = Array.from({ length: 11 }, (_, i) => 
            all.filter(a => a.hos_id === i + 1 && a.way === "Easy Chat หมอ กทม.")
        );

        const d1 = Array.from({ length: 11 }, (_, i) => 
            all.filter(a => a.hos_id === i + 1 && a.way === "โทรศัพท์")
        );

        const e1 = Array.from({ length: 11 }, (_, i) => 
            all.filter(a => a.hos_id === i + 1 && a.way === "")
        );
        
        const a2 = Array.from({ length: 11 }, (_, i) => 
            all.filter(a => a.hos_id === i + 1 && a.status === 1  && a.way === "LINE add")
        );

        const b2 = Array.from({ length: 11 }, (_, i) => 
            all.filter(a => a.hos_id === i + 1 && a.status === 1  && a.way === "Walk in")
        );

        const c2 = Array.from({ length: 11 }, (_, i) => 
            all.filter(a => a.hos_id === i + 1 && a.status === 1  && a.way === "Easy Chat หมอ กทม.")
        );

        const d2 = Array.from({ length: 11 }, (_, i) => 
            all.filter(a => a.hos_id === i + 1 && a.status === 1  && a.way === "โทรศัพท์")
        );

        const e2 = Array.from({ length: 11 }, (_, i) => 
            all.filter(a => a.hos_id === i + 1 && a.status === 1  && a.way === "")
        );
        
        const f = Array.from({ length: 11 }, (_, i) => 
            all.filter(a => a.hos_id === i + 1 && a.status === 0)
        );



        const aa = (
            all.filter(a => a.way === "LINE add")
        );

        const ba = ( 
            all.filter(a => a.way === "Walk in")
        );

        const ca = ( 
            all.filter(a => a.way === "Easy Chat หมอ กทม.")
        );

        const da = ( 
            all.filter(a => a.way === "โทรศัพท์")
        );

        const ea = ( 
            all.filter(a => a.way === "")
        );

        const ab = ( 
            all.filter(a => a.way === "LINE add" && a.status === 1)
        );

        const bb = ( 
            all.filter(a => a.way === "Walk in" && a.status === 1)
        );

        const cb = ( 
            all.filter(a => a.way === "Easy Chat หมอ กทม." && a.status === 1)
        );

        const db = ( 
            all.filter(a => a.way === "โทรศัพท์" && a.status === 1)
        );

        const eb = ( 
            all.filter(a => a.way === "" && a.status === 1)
        );

        const fa = ( 
            all.filter(a => a.status === 0)
        );

        return (

            setHh1((prevHh1) => {
                const newHh1 = [...prevHh1];
                newHh1[1] = a1[0].length;
                newHh1[2] = b1[0].length;
                newHh1[3] = c1[0].length;
                newHh1[4] = d1[0].length;
                newHh1[5] = e1[0].length;
                newHh1[6] = a2[0].length;
                newHh1[7] = b2[0].length;
                newHh1[8] = c2[0].length;
                newHh1[9] = d2[0].length;
                newHh1[10] = e2[0].length;
                newHh1[11] = f[0].length;
                return newHh1;
              }),

              setHh2((prevHh1) => {
                const newHh1 = [...prevHh1];
                newHh1[1] = a1[1].length;
                newHh1[2] = b1[1].length;
                newHh1[3] = c1[1].length;
                newHh1[4] = d1[1].length;
                newHh1[5] = e1[1].length;
                newHh1[6] = a2[1].length;
                newHh1[7] = b2[1].length;
                newHh1[8] = c2[1].length;
                newHh1[9] = d2[1].length;
                newHh1[10] = e2[1].length;
                newHh1[11] = f[1].length;
                return newHh1;
              }),

              setHh3((prevHh1) => {
                const newHh1 = [...prevHh1];
                newHh1[1] = a1[2].length;
                newHh1[2] = b1[2].length;
                newHh1[3] = c1[2].length;
                newHh1[4] = d1[2].length;
                newHh1[5] = e1[2].length;
                newHh1[6] = a2[2].length;
                newHh1[7] = b2[2].length;
                newHh1[8] = c2[2].length;
                newHh1[9] = d2[2].length;
                newHh1[10] = e2[2].length;
                newHh1[11] = f[2].length;
                return newHh1;
              }),

              setHh4((prevHh1) => {
                const newHh1 = [...prevHh1];
                newHh1[1] = a1[3].length;
                newHh1[2] = b1[3].length;
                newHh1[3] = c1[3].length;
                newHh1[4] = d1[3].length;
                newHh1[5] = e1[3].length;
                newHh1[6] = a2[3].length;
                newHh1[7] = b2[3].length;
                newHh1[8] = c2[3].length;
                newHh1[9] = d2[3].length;
                newHh1[10] = e2[3].length;
                newHh1[11] = f[3].length;
                return newHh1;
              }),

              setHh5((prevHh1) => {
                const newHh1 = [...prevHh1];
                newHh1[1] = a1[4].length;
                newHh1[2] = b1[4].length;
                newHh1[3] = c1[4].length;
                newHh1[4] = d1[4].length;
                newHh1[5] = e1[4].length;
                newHh1[6] = a2[4].length;
                newHh1[7] = b2[4].length;
                newHh1[8] = c2[4].length;
                newHh1[9] = d2[4].length;
                newHh1[10] = e2[4].length;
                newHh1[11] = f[4].length;
                return newHh1;
              }),


              setHh6((prevHh1) => {
                const newHh1 = [...prevHh1];
                newHh1[1] = a1[5].length;
                newHh1[2] = b1[5].length;
                newHh1[3] = c1[5].length;
                newHh1[4] = d1[5].length;
                newHh1[5] = e1[5].length;
                newHh1[6] = a2[5].length;
                newHh1[7] = b2[5].length;
                newHh1[8] = c2[5].length;
                newHh1[9] = d2[5].length;
                newHh1[10] = e2[5].length;
                newHh1[11] = f[5].length;
                return newHh1;
              }),

              setHh7((prevHh1) => {
                const newHh1 = [...prevHh1];
                newHh1[1] = a1[6].length;
                newHh1[2] = b1[6].length;
                newHh1[3] = c1[6].length;
                newHh1[4] = d1[6].length;
                newHh1[5] = e1[6].length;
                newHh1[6] = a2[6].length;
                newHh1[7] = b2[6].length;
                newHh1[8] = c2[6].length;
                newHh1[9] = d2[6].length;
                newHh1[10] = e2[6].length;
                newHh1[11] = f[6].length;
                return newHh1;
              }),

              setHh8((prevHh1) => {
                const newHh1 = [...prevHh1];
                newHh1[1] = a1[7].length;
                newHh1[2] = b1[7].length;
                newHh1[3] = c1[7].length;
                newHh1[4] = d1[7].length;
                newHh1[5] = e1[7].length;
                newHh1[6] = a2[7].length;
                newHh1[7] = b2[7].length;
                newHh1[8] = c2[7].length;
                newHh1[9] = d2[7].length;
                newHh1[10] = e2[7].length;
                newHh1[11] = f[7].length;
                return newHh1;
              }),

              setHh9((prevHh1) => {
                const newHh1 = [...prevHh1];
                newHh1[1] = a1[8].length;
                newHh1[2] = b1[8].length;
                newHh1[3] = c1[8].length;
                newHh1[4] = d1[8].length;
                newHh1[5] = e1[8].length;
                newHh1[6] = a2[8].length;
                newHh1[7] = b2[8].length;
                newHh1[8] = c2[8].length;
                newHh1[9] = d2[8].length;
                newHh1[10] = e2[8].length;
                newHh1[11] = f[8].length;
                return newHh1;
              }),

              setHh10((prevHh1) => {
                const newHh1 = [...prevHh1];
                newHh1[1] = a1[9].length;
                newHh1[2] = b1[9].length;
                newHh1[3] = c1[9].length;
                newHh1[4] = d1[9].length;
                newHh1[5] = e1[9].length;
                newHh1[6] = a2[9].length;
                newHh1[7] = b2[9].length;
                newHh1[8] = c2[9].length;
                newHh1[9] = d2[9].length;
                newHh1[10] = e2[9].length;
                newHh1[11] = f[9].length;
                return newHh1;
              }),

              setHh11((prevHh1) => {
                const newHh1 = [...prevHh1];
                newHh1[1] = a1[10].length;
                newHh1[2] = b1[10].length;
                newHh1[3] = c1[10].length;
                newHh1[4] = d1[10].length;
                newHh1[5] = e1[10].length;
                newHh1[6] = a2[10].length;
                newHh1[7] = b2[10].length;
                newHh1[8] = c2[10].length;
                newHh1[9] = d2[10].length;
                newHh1[10] = e2[10].length;
                newHh1[11] = f[10].length;
                return newHh1;
              }),

              setHha((prevHh1) => {
                const newHh1 = [...prevHh1];
                newHh1[1] = aa.length;
                newHh1[2] = ba.length;
                newHh1[3] = ca.length;
                newHh1[4] = da.length;
                newHh1[5] = ea.length;
                newHh1[6] = ab.length;
                newHh1[7] = bb.length;
                newHh1[8] = cb.length;
                newHh1[9] = db.length;
                newHh1[10] = eb.length;
                newHh1[11] = fa.length;
                return newHh1;
              })

        ) 
    }

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_APP_API + "/formq/2025-01-01/2025-12-31")
            .then(res => res.json())
            .then(result => {
                setAll(result);
            });
            
            update();

    }, []);
    return (
        <div className='p-10'>
            <div>สรุปผลการใช้งานระบบ</div>
            <br /><br />
            <div className="grid gap-6 mb-6 md:grid-cols-4 pl-6 pr-6 mt-6">
            <div></div>
                
                
                <div>
                <label>ช่วงเวลาสุดท้าย: </label>
                <ThaiDatePicker
                    value={start}
                    onChange={(christDate) => { setStart(christDate), seth(start, end) }}
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
                <label>ช่วงเวลาเริ่ม: </label>
                <ThaiDatePicker
                    value={end}
                    onChange={(christDate) => { setEnd(christDate), seth(start, end) }}
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
            <div className='text-center'><button onClick={() => seth(start, end)} className=' bg-green-600 rounded p-2 text-white'>ค้นหา</button></div>
            <br /><br />
            <div className='flex justify-center'>

                <table className="table-auto text-center border border-collapse border-black">
                    <thead>

                        <tr>
                            <th rowSpan={2} className='p-1 border border-black'>โรงพยาบาล</th>
                            <th colSpan={5} className='p-1 border border-black'>การจองทั้งหมด</th>
                            <th colSpan={5} className='p-1 border border-black'>การให้บริการสำเร็จ</th>
                            <th rowSpan={2} className='p-1 border border-black'>ยกเลิก</th>
                        </tr>

                        <tr>

                            <th className='p-1 border border-black'>Line</th>
                            <th className='p-1 border border-black'>Walk in</th>
                            <th className='p-1 border border-black'>หมอกทม.</th>
                            <th className='p-1 border border-black'>โทรศัพท์</th>
                            <th className='p-1 border border-black'>อื่นๆ</th>
                            <th className='p-1 border border-black'>Line</th>
                            <th className='p-1 border border-black'>Walk in</th>
                            <th className='p-1 border border-black'>หมอกทม.</th>
                            <th className='p-1 border border-black'>โทรศัพท์</th>
                            <th className='p-1 border border-black'>อื่นๆ</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* <tr>
                            <td className='p-1 border border-black'>{hh1[0]}</td>
                            <td className='p-1 border border-black'>{hh1[1]}</td>
                            <td className='p-1 border border-black'>{hh1[2]}</td>
                            <td className='p-1 border border-black'>{hh1[3]}</td>
                            <td className='p-1 border border-black'>{hh1[4]}</td>
                            <td className='p-1 border border-black'>{hh1[5]}</td>
                            <td className='p-1 border border-black'>{hh1[6]}</td>
                            <td className='p-1 border border-black'>{hh1[7]}</td>
                            <td className='p-1 border border-black'>{hh1[8]}</td>
                            <td className='p-1 border border-black'>{hh1[9]}</td>
                            <td className='p-1 border border-black'>{hh1[10]}</td>
                            <td className='p-1 border border-black'>{hh1[11]}</td>
                        </tr> */}

                        <tr>
                            {hh1.map((a, i) => {
                                return (<td key={i} className='p-1 border border-black'>{a}</td>)
                            })}
                        </tr>

                        <tr>
                            {hh2.map((a, i) => {
                                return (<td key={i} className='p-1 border border-black'>{a}</td>)
                            })}
                        </tr>

                        <tr>
                            {hh3.map((a, i) => {
                                return (<td key={i} className='p-1 border border-black'>{a}</td>)
                            })}
                        </tr>

                        <tr>
                            {hh4.map((a, i) => {
                                return (<td key={i} className='p-1 border border-black'>{a}</td>)
                            })}
                        </tr>

                        <tr>
                            {hh5.map((a, i) => {
                                return (<td key={i} className='p-1 border border-black'>{a}</td>)
                            })}
                        </tr>

                        <tr>
                            {hh6.map((a, i) => {
                                return (<td key={i} className='p-1 border border-black'>{a}</td>)
                            })}
                        </tr>

                        <tr>
                            {hh7.map((a, i) => {
                                return (<td key={i} className='p-1 border border-black'>{a}</td>)
                            })}
                        </tr>

                        <tr>
                            {hh8.map((a, i) => {
                                return (<td key={i} className='p-1 border border-black'>{a}</td>)
                            })}
                        </tr>

                        <tr>
                            {hh9.map((a, i) => {
                                return (<td key={i} className='p-1 border border-black'>{a}</td>)
                            })}
                        </tr>

                        <tr>
                            {hh10.map((a, i) => {
                                return (<td key={i} className='p-1 border border-black'>{a}</td>)
                            })}
                        </tr>

                        <tr>
                            {hh11.map((a, i) => {
                                return (<td key={i} className='p-1 border border-black'>{a}</td>)
                            })}
                        </tr>

                        <tr>
                            {hha.map((a, i) => {
                                return (<td key={i} className='p-1 border border-black'>{a}</td>)
                            })}
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    )
}
