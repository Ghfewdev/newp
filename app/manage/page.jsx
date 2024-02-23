"use client"
import React, { useEffect, useState } from 'react'
import Authen from '../components/Authen';

export default function Manage() {
    Authen();
    const [form, setForm] = useState([]);
    const [select, setSelect] = useState([]);
    const [showModal, setShowModal] = React.useState(false);
    const [showModal2, setShowModal2] = React.useState(false);
    const [printm, setPrintm] = React.useState(false);
    const [formi, setFormi] = useState();
    const [admin, setAdmin] = React.useState(false);
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

        var cance = document.querySelector('input[name="cance"]:checked').value

        if (document.getElementById("cance4").checked === true) {
            cance = document.getElementById("des").value
        }
        else {
            const jsondata = {
                "us_id": localStorage.getItem("id"),
                "fm_id": fm,
                "cm_status": 0,
                "cm_date": t,
                "des": cance
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
            document.getElementById("viwec").hidden = true
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
            "des": ""
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

    const qry = (val) => {
        if (val === 14) {
            fetch(process.env.NEXT_PUBLIC_APP_API + "/form")
                .then(res => res.json())
                .then(result => {
                    setForm(result);
                });
        } else {
            fetch(process.env.NEXT_PUBLIC_APP_API + "/form/users/" + val)
                .then(res => res.json())
                .then(result => {
                    setForm(result);
                });
        }
    }

    const cancalf = (val) => {
        if (val) {
            document.getElementById("des").disabled = false
            document.getElementById("des").required = true
            document.getElementById("des").focus()

        } else {
            document.getElementById("des").required = false
            document.getElementById("des").disabled = true
        }
    }

    useEffect(() => {
        if (localStorage.getItem("id") === "14") {
            setAdmin(true);
            fetch(process.env.NEXT_PUBLIC_APP_API + "/form")
                .then(res => res.json())
                .then(result => {
                    setForm(result);
                });
        } else {
            setAdmin(false);
            fetch(process.env.NEXT_PUBLIC_APP_API + "/form/users/" + localStorage.getItem("id"))
                .then(res => res.json())
                .then(result => {
                    setForm(result);
                });
        };
    }, []);
    return (
        <>
            <div>
                <div className=' print:hidden'>
                    <div className="m-6 p-2 text-center">
                        <br />
                        <button onClick={e => excal()} className='bg-green-700 text-white p-2 rounded-lg mr-5'>Download ไฟล์ EXCAL</button>
                        {/* <button className='bg-red-700 text-white p-2 rounded-lg'>Dowload ไฟล์ PDF</button> */}
                        {admin ? (
                            <>
                                <br /><br />
                                <button onClick={e => qry(14)} className='bg-green-300 text-black p-2 rounded-lg mr-5'>สพบ</button>
                                <button onClick={e => qry(1)} className='bg-green-300 text-black p-2 rounded-lg mr-5'>รพก</button>
                                <button onClick={e => qry(2)} className='bg-green-300 text-black p-2 rounded-lg mr-5'>รพต</button>
                                <button onClick={e => qry(3)} className='bg-green-300 text-black p-2 rounded-lg mr-5'>รพจ</button>
                                <button onClick={e => qry(4)} className='bg-green-300 text-black p-2 rounded-lg mr-5'>รพท</button>
                                <button onClick={e => qry(5)} className='bg-green-300 text-black p-2 rounded-lg mr-5'>รพว</button>
                                <button onClick={e => qry(6)} className='bg-green-300 text-black p-2 rounded-lg mr-5'>รพภ</button>
                                <button onClick={e => qry(7)} className='bg-green-300 text-black p-2 rounded-lg mr-5'>รพร</button>
                                <button onClick={e => qry(8)} className='bg-green-300 text-black p-2 rounded-lg mr-5'>รพส</button>
                                <button onClick={e => qry(9)} className='bg-green-300 text-black p-2 rounded-lg mr-5'>รพข</button>
                                <button onClick={e => qry(10)} className='bg-green-300 text-black p-2 rounded-lg mr-5'>รพค</button>
                                <button onClick={e => qry(11)} className='bg-green-300 text-black p-2 rounded-lg mr-5'>รพบ</button>
                            </>
                        ) : null}

                        <br />
                    </div>

                    <div className="m-6 p-2 text-center">

                    </div>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        วันที่ต้องการใช้
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        วันที่จอง
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        โรงพยาบาล
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        ผู้รับบริการ
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
                                            onClick={e => { setFormi(f.fm_id), setShowModal2(true), fet(f.fm_id) }}
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
                                            onClick={e => { setFormi(f.fm_id), setShowModal2(true), fet(f.fm_id), checkc(f.des) }}
                                        >
                                            หมายเหตุ
                                        </button>
                                    }

                                    return (

                                        <tr key={f.fm_id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 text-red-600 font-medium whitespace-nowrap dark:text-white">
                                                {f.dateres}
                                            </th>
                                            <td className="px-6 py-4">
                                                {f.date}
                                            </td>
                                            <td className="px-6 py-4">
                                                {f.hos_name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {f.pre_name} {f.fname} {f.lname}
                                            </td>
                                            <td className="px-6 py-4">
                                                {st}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    id='info'
                                                    className=' bg-blue-600 text-white p-2 rounded-lg m-2'
                                                    type="button"
                                                    onClick={e => { setFormi(f.fm_id), setShowModal(true), fet(f.fm_id), setPrintm(true) }}
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
                </div>

                {showModal ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none pt-4 pb-4 print:hidden"
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
                                            onClick={() => { setShowModal(false), setPrintm(false) }}
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
                                            var co = (String(f.condition).replaceAll("-", " "))
                                            var co1 = String(co.split(", ")).replaceAll(", ", "")

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
                                                    โรงพยาบาลที่ให้บริการ: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.hos_name} />
                                                    วัน/เดือน/ปี ที่จอง: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={"วันที่ " + date + " เวลา " + time} />
                                                    เลขบัตรประชาชน: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.citizen} />
                                                    คำนำหน้า: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.pre_name} />
                                                    ชื่อ: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.fname} />
                                                    นามสกุล: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.lname} />
                                                    อายุ(ปี): <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.age} />
                                                    เลขที่: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.house} />
                                                    ถนน: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.street} />
                                                    แขวง: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.subdis} />
                                                    เขต: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.dis_name} />
                                                    จังหวัด: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={"กรุงเทพมหานคร"} />
                                                    รหัสไปรษณีย์: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.zipcode} />
                                                    เบอร์โทรศัพท์: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.call} />
                                                    วัน/เดือน/ปี ที่ขอใช้รถ: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={"วันที่ " + dateres + " เวลา " + timeres} />
                                                    สถานที่รับ-ส่ง: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.met_name} />
                                                    สถานที่ต้นทาง: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={String(f.start).replaceAll("~", "")} />
                                                    สถานที่ปลายทาง: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={String(f.end).replaceAll("~", "")} />
                                                    เงื่อนไขในการขอรับบริการ: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={co1} />
                                                    ชื่อ - นามสกุล ผู้ส่งข้อมูล: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.editer} />
                                                </div>
                                            )
                                        })}

                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => (setShowModal(false), setPrintm(false))}
                                        >
                                            ปิด
                                        </button>
                                        <button
                                            id='subm'
                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => { submitcar(formi), setShowModal(false), setPrintm(false) }}
                                        >
                                            ดำเนินการสำเร็จ
                                        </button>
                                        <button
                                            className=" bg-blue-600 text-white active:bg-blue-600 disabled:bg-blue-300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => { window.print() }}
                                            disabled
                                        >
                                            พิมพ์
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
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none pt-4 pb-4 print:hidden"
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

                                        <div className='text-center p-2 rounded-lg border border-gray-200 dark:border-gray-700'>
                                            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white text-center">ยกเลิกนัดหมายเนื่องจาก </label>
                                            <br />
                                            <div id="viwec">
                                                <input type="radio" defaultChecked id="cance1" onClick={e => cancalf()} name="cance" value="ผู้ป่วยยกเลิกนัด" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label className='ml-2 mr-4'>: ผู้ป่วยยกเลิกนัด</label>
                                                <input type="radio" id="cance2" name="cance" onClick={e => cancalf()} value="ยกเลิกนัด รถไม่พร้อม" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label className='ml-2 mr-2'>: ยกเลิกนัด รถไม่พร้อม</label><br />
                                                <input type="radio" id="cance3" name="cance" onClick={e => cancalf()} value="ยกเลิกนัด รถไม่เพียงพอ" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label className='ml-2 mr-2'>: ยกเลิกนัด รถไม่เพียงพอ</label>
                                                <input type="radio" id="cance4" name="cance" value="4" onClick={e => cancalf(1)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label className='ml-2 mr-2'>: อื่นๆ ระบุ</label>
                                            </div>
                                            <input type="text" id="des" className="border pl-2 pr-2 rounded" placeholder="" disabled />
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
            {printm ? (
                <>
                    <div className='mt-[-100px] text-center print:block hidden'>
                        <p>รายงานการขอใช้งานรถรับ-ส่งคนพิการและผู้สูงอายุ</p><br />
                        {select.map(f => {
                            var date = String(f.date).split("T")[0]
                            var time = (String(f.date).split("T")[1]).split(".")[0]
                            var dateres = String(f.dateres).split("T")[0]
                            var timeres = (String(f.dateres).split("T")[1]).split(".")[0]

                            return (

                                <div key={f.fm_id}>
                                    โรงพยาบาลที่ให้บริการ: <label className='pl-2 pr-2 underline underline-offset-4'>{f.hos_name}</label><br />
                                    วัน/เดือน/ปี ที่จอง: <label className='pl-2 pr-2 underline underline-offset-4'>วันที {date} เวลา {time}</label><br />
                                    เลขบัตรประชาชน: <label className='pl-2 pr-2 underline underline-offset-4'>{f.citizen}</label>
                                    คำนำหน้า: <label className='pl-2 pr-2 underline underline-offset-4'>{f.pre_name}</label>
                                    ชื่อ: <label className='pl-2 pr-2 underline underline-offset-4'>{f.lname}</label>
                                    นามสกุล: <label className='pl-2 pr-2 underline underline-offset-4'>{f.fname}</label>
                                    อายุ(ปี): <label className='pl-2 pr-2 underline underline-offset-4'>{f.age}</label><br />
                                    เลขที่: <label className='pl-2 pr-2 underline underline-offset-4'>{f.house}</label>
                                    ถนน: <label className='pl-2 pr-2 underline underline-offset-4'>{f.street}</label>
                                    แขวง: <label className='pl-2 pr-2 underline underline-offset-4'>{f.subdis}</label>
                                    เขต: <label className='pl-2 pr-2 underline underline-offset-4'>{f.dis_name}</label>
                                    จังหวัด: <label className='pl-2 pr-2 underline underline-offset-4'>กรุงเทพมหานคร</label><br />
                                    รหัสไปรษณีย์: <label className='pl-2 pr-2 underline underline-offset-4'>{f.zipcode}</label>
                                    เบอร์โทรศัพท์: <label className='pl-2 pr-2 underline underline-offset-4'>{f.call}</label><br />
                                    วัน/เดือน/ปี ที่ขอใช้รถ: <label className='pl-2 pr-2 underline underline-offset-4'>วันที {dateres} เวลา {timeres}</label>
                                    สถานที่รับ-ส่ง: <label className='pl-2 pr-2 underline underline-offset-4'>{f.met_name}</label><br />
                                    สถานที่ต้นทาง: <label className='pl-2 pr-2 underline underline-offset-4'>{f.start}</label><br />
                                    สถานที่ปลายทาง: <label className='pl-2 pr-2 underline underline-offset-4'>{f.end}</label><br />
                                    เงื่อนไขในการขอรับบริการ: <label className='pl-2 pr-2 underline underline-offset-4'>{f.condition}</label><br />
                                    ชื่อ - นามสกุล ผู้ส่งข้อมูล: <label className='pl-2 pr-2 underline underline-offset-4'>{f.editer}</label>
                                    สถานะ: <label className='pl-2 pr-2 underline underline-offset-4'>{f.status}</label>
                                </div>

                            )
                        })}

                    </div>
                </>
            ) : (
                <>
                    <div className='mt-[-100px] text-center print:block hidden'>
                        ไม่มีรายงาน
                    </div>
                </>
            )}
        </>



    )
}
