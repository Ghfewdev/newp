"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Authen from '../components/Authen';

export default function page() {
    Authen();
    const [form, setForm] = useState([]);
    const [select, setSelect] = useState([]);
    const [showModal, setShowModal] = React.useState(false);
    const [showModal2, setShowModal2] = React.useState(false);
    const [formi, setFormi] = useState()
    const d = new Date()
    var t = d.getFullYear() + "/" + d.getMonth() + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()

    const fet = (val) => {
        fetch(process.env.NEXT_PUBLIC_APP_API + "/form/" + val)
            .then(res => res.json())
            .then(result => {
                setSelect(result);
            })
    }

    const excal = () => {
        window.open(process.env.NEXT_PUBLIC_APP_API + "/excal/" + localStorage.getItem("id"))
    }

    const clanc = (fm) => {

        if (document.getElementById("des").value === "") {
            alert("กรอกข้อมูลให้ครบ!!")
        }
        else {
            const jsondata = {
                "us_id": localStorage.getItem("id"),
                "fm_id": fm,
                "cm_status": 0,
                "cm_date": t,
                "des": document.getElementById("des").value
            }

            fetch(process.env.NEXT_PUBLIC_APP_API + "/status", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(jsondata)
            })
                .then(res => res.json())
                .then(result => {
                    console.log(result)
                    if (result.status === "ok") {
                        window.location = "/manage"
                    }
                })
        }

    }

    const checkc = (des) => {
        setTimeout(() => {
            document.getElementById("subc").hidden = true
            document.getElementById("des").value = des
            document.getElementById("des").readOnly = true
        }, 10);
    }

    const submitcar = (fm) => {

        const jsondata = {
            "us_id": localStorage.getItem("id"),
            "fm_id": fm,
            "cm_status": 1,
            "cm_date": t,
        }

        fetch(process.env.NEXT_PUBLIC_APP_API + "/status", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsondata)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                if (result.status === "ok") {
                    window.location = "/manage"
                }
            })
    }

    useEffect(() => {
        if (localStorage.getItem("id") === "14") {
            fetch(process.env.NEXT_PUBLIC_APP_API + "/form")
                .then(res => res.json())
                .then(result => {
                    setForm(result);
                });
        } else {
            fetch(process.env.NEXT_PUBLIC_APP_API + "/form/users/" + localStorage.getItem("id"))
                .then(res => res.json())
                .then(result => {
                    setForm(result);
                });
        }
    }, []);
    return (
        <div>
            <div className="m-6 p-2 text-center">
                <br />
                <button onClick={e => excal()} className='bg-green-700 text-white p-2 rounded-lg mr-5'>Download ไฟล์ EXCAL</button>
                {/* <button className='bg-red-700 text-white p-2 rounded-lg'>Dowload ไฟล์ PDF</button> */}
                <br />
            </div>

            <div className="m-6 p-2 text-center">
                
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ผู้รับบริการ
                            </th>
                            <th scope="col" className="px-6 py-3">
                                โรงพยาบาล
                            </th>
                            <th scope="col" className="px-6 py-3">
                                วันที่จอง
                            </th>
                            <th scope="col" className="px-6 py-3">
                                วันที่ต้องการใช้
                            </th>
                            <th scope="col" className="px-6 py-3">
                                สถานะ
                            </th>
                            <th scope="col" className="px-6 py-3">
                                ข้อมูลการจอง
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {form.map(f => {
                            var st
                            var bcanc
                            if (f.status === null) {
                                st = "รอดำเนินการ"
                                bcanc = <button
                                    id='canc'
                                    className=' bg-red-600 text-white p-2 rounded-lg'
                                    type="button"
                                    onClick={() => { setFormi(f.fm_id), setShowModal2(true), fet(f.fm_id) }}
                                >
                                    ยกเลิก
                                </button>
                            }
                            else if (f.status === 1) {
                                st = <p className=' text-green-600 font-bold'>สำเร็จ</p>
                            }
                            else if (f.status === 0) {
                                st = <p className=' text-red-600 font-bold' >ยกเลิก</p>
                                bcanc = <button
                                    id='canc'
                                    className=' bg-orange-400 text-white p-2 rounded-lg'
                                    type="button"
                                    onClick={() => { setFormi(f.fm_id), setShowModal2(true), fet(f.fm_id), checkc(f.des) }}
                                >
                                    หมายเหตุ
                                </button>
                            }

                            return (

                                <tr key={f.fm_id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {f.pre_name} {f.fname} {f.lname}
                                    </th>
                                    <td className="px-6 py-4">
                                        {f.hos_name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {f.date}
                                    </td>
                                    <td className="px-6 py-4 text-red-500">
                                        {f.dateres}
                                    </td>
                                    <td className="px-6 py-4">
                                        {st}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            id='info'
                                            className=' bg-blue-600 text-white p-2 rounded-lg m-2'
                                            type="button"
                                            onClick={() => { setFormi(f.fm_id), setShowModal(true), fet(f.fm_id) }}
                                        >
                                            เปิด
                                        </button>
                                        {bcanc}
                                    </td>
                                </tr>

                            )
                        })}

                    </tbody>
                </table>
            </div>


            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none pt-4 pb-4"
                    >
                        <div className=" my-auto mx-auto w-[80%]">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        ข้อมูลการจอง
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className=" text-black">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">

                                    {select.map(f => {
                                        var date = String(f.date).split("T")[0]
                                        var time = (String(f.date).split("T")[1]).split(".")[0]
                                        var dateres = String(f.dateres).split("T")[0]
                                        var timeres = (String(f.dateres).split("T")[1]).split(".")[0]

                                        if (f.status === null) {
                                            setTimeout(() => {
                                                document.getElementById("subm").hidden = false
                                            }, 200);
                                        }
                                        else if (f.status === 1 || f.status === 0) {
                                            setTimeout(() => {
                                                document.getElementById("subm").hidden = true
                                            }, 200);
                                        }

                                        return (

                                            <div key={f.fm_id} className="grid gap-6 md:grid-cols-2 pl-6 pr-6">
                                                1. โรงพยาบาลที่ให้บริการ: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.hos_name} />
                                                2. วัน/เดือน/ปี ที่จอง: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={"วันที่ " + date + " เวลา " + time} />
                                                3. เลขบัตรประชาชน: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.citizen} />
                                                4. คำนำหน้า: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.pre_name} />
                                                5. ชื่อ: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.lname} />
                                                6. นามสกุล: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.fname} />
                                                7. อายุ(ปี): <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.age} />
                                                8. เลขที่: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.house} />
                                                9. ถนน: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.street} />
                                                10. แขวง: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.subdis} />
                                                11. เขต: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.dis_name} />
                                                12. จังหวัด: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={"กรุงเทพมหานคร"} />
                                                13. รหัสไปรษณีย์: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.zipcode} />
                                                14. เบอร์โทรศัพท์: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.call} />
                                                15. วัน/เดือน/ปี ที่ขอใช้รถ: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={"วันที่ " + dateres + " เวลา " + timeres} />
                                                16. สถานที่รับ-ส่ง: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.met_name} />
                                                17. สถานที่ต้นทาง: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.start} />
                                                18. สถานที่ปลายทาง: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.end} />
                                                19. เงื่อนไขในการขอรับบริการ: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.condition} />
                                                20. ชื่อ - นามสกุล ผู้ส่งข้อมูล: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.editer} />

                                            </div>
                                        )
                                    })}

                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        ปิด
                                    </button>
                                    <button
                                        id='subm'
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => { submitcar(formi), setShowModal(false) }}
                                    >
                                        ดำเนินการสำเร็จ
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}

            {showModal2 ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none pt-4 pb-4"
                    >
                        <div className=" my-auto mx-auto w-[80%]">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        ยกเลิกนัดหมาย
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal2(false)}
                                    >
                                        <span className=" text-black">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">

                                    <div>
                                        <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white text-center">ยกเลิกนัดหมายเนื่องจาก</label>
                                        <input type="text" id="des" className='bg-gray-50 border border-gray-300 text-gray-900 text-center text-l rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder="" required />
                                    </div>

                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal2(false)}
                                    >
                                        ปิด
                                    </button>
                                    <button
                                        id='subc'
                                        className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => { clanc(formi) }}
                                    >
                                        ยกเลิกนัดหมาย
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}

        </div>
    )
}
