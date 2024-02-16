"use client"
import React, { useEffect, useState } from 'react'

export default function About() {

    const [hos, setHos] = useState([]);
    const [pre, setPre] = useState([]);
    const [dis, setDis] = useState([]);

    var cond
    var start
    var end

    const fetchdata = () => {
        fetch(process.env.NEXT_PUBLIC_APP_API + "/hospital")
            .then(res => res.json())
            .then(result => {
                setHos(result);
            });

        fetch(process.env.NEXT_PUBLIC_APP_API + "/preflix")
            .then(res => res.json())
            .then(result => {
                setPre(result);
            });

        fetch(process.env.NEXT_PUBLIC_APP_API + "/district")
            .then(res => res.json())
            .then(result => {
                setDis(result);
            });

    }

    const createdata = () => {
        cond = document.querySelector('input[name="condition"]:checked').value
        start = ""
        end = ""
        if (document.getElementById("saddh").hidden === true)
            start = document.getElementById("snum").value + " " + document.getElementById("sstreed").value + " " + document.getElementById("ssubdistrict").value + " " + document.getElementById("sselectdis").value + " กรุงเทพมหานคร " + document.getElementById("szip").value
        else
            start = document.getElementById("sselecthos").value
        if (document.getElementById("eaddh").hidden === true)
            end = document.getElementById("enum").value + " " + document.getElementById("estreed").value + " " + document.getElementById("esubdistrict").value + " " + document.getElementById("eselectdis").value + " กรุงเทพมหานคร  " + document.getElementById("ezip").value
        else
            end = document.getElementById("eselecthos").value
        if (cond === "1")
            cond = document.getElementById("alther").value

        const jsondata = {
            "hos": document.getElementById("selecthos").value,
            "date": document.getElementById("date").value,
            "sitizen": document.getElementById("sitizen").value,
            "preflix": document.getElementById("selectpre").value,
            "fname": document.getElementById("fname").value,
            "lname": document.getElementById("lname").value,
            "age": document.getElementById("age").value,
            "num": document.getElementById("num").value,
            "streed": document.getElementById("streed").value,
            "subdistrict": document.getElementById("subdistrict").value,
            "district": document.getElementById("selectdis").value,
            "zip": document.getElementById("zip").value,
            "call": document.getElementById("call").value,
            "dateres": document.getElementById("dateres").value,
            "met": document.querySelector('input[name="met"]:checked').value,
            "start": start,
            "end": end,
            "condition": cond,
            "editer": document.getElementById("editer").value
        }

        console.log(jsondata)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const jsondata = {
            "hos": document.getElementById("selecthos").value,
            "date": document.getElementById("date").value,
            "sitizen": document.getElementById("sitizen").value,
            "preflix": document.getElementById("selectpre").value,
            "fname": document.getElementById("fname").value,
            "lname": document.getElementById("lname").value,
            "age": document.getElementById("age").value,
            "num": document.getElementById("num").value,
            "streed": document.getElementById("streed").value,
            "subdistrict": document.getElementById("subdistrict").value,
            "district": document.getElementById("selectdis").value,
            "zip": document.getElementById("zip").value,
            "call": document.getElementById("call").value,
            "dateres": document.getElementById("dateres").value,
            "met": document.querySelector('input[name="met"]:checked').value,
            "start": start,
            "end": end,
            "condition": cond,
            "editer": document.getElementById("editer").value
        }

        fetch(process.env.NEXT_PUBLIC_APP_API + "/fill", {
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

    const con = () => {
        if (document.querySelector('input[name="condition"]:checked').value === "1") {
            document.getElementById("alther").disabled = false
            document.querySelector('input[name="condition"]:checked').value = document.getElementById("alther").value
        }
        else {
            document.getElementById("alther").value = ""
            document.getElementById("alther").disabled = true
        }

    }

    const redio = (val, val2) => {
        const num = document.getElementById("num").value
        const streed = document.getElementById("streed").value
        const subdistrict = document.getElementById("subdistrict").value
        const district = document.getElementById("selectdis").value
        const zip = document.getElementById("zip").value
        document.getElementById(val + "add").hidden = false
        document.getElementById(val + "addh").hidden = true
        if (val2) {
            document.getElementById(val + "num").value = num
            document.getElementById(val + "streed").value = streed
            document.getElementById(val + "subdistrict").value = subdistrict
            document.getElementById(val + "selectdis").value = district
            document.getElementById(val + "zip").value = zip
            document.getElementById(val + "num").readOnly = true
            document.getElementById(val + "streed").readOnly = true
            document.getElementById(val + "subdistrict").readOnly = true
            document.getElementById(val + "selectdis").readOnly = true
            document.getElementById(val + "zip").readOnly = true
        }
        else {
            document.getElementById(val + "num").value = ""
            document.getElementById(val + "streed").value = ""
            document.getElementById(val + "subdistrict").value = ""
            document.getElementById(val + "selectdis").value = 0
            document.getElementById(val + "zip").value = ""
            document.getElementById(val + "num").readOnly = false
            document.getElementById(val + "streed").readOnly = false
            document.getElementById(val + "subdistrict").readOnly = false
            document.getElementById(val + "selectdis").readOnly = false
            document.getElementById(val + "zip").readOnly = false
        }

    }

    const redioh = (val) => {
        document.getElementById(val).hidden = true
        document.getElementById(val + "h").hidden = false
    }

    const check = () => {
        if (document.getElementById("check").checked === true)
            document.getElementById("submit").disabled = false
        else
            document.getElementById("submit").disabled = true

        createdata();

    }

    // var defhos = <option value={localStorage.getItem("id")}>{localStorage.getItem("department")}</option>

    useEffect(() => {
        fetchdata();
    }, []);

    return (
        <>
            <div className='pt-8'>
                <p className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">การลงทะเบียนการใช้บริการรถรับ-ส่งคนพิการและผู้สูงอายุ</p>
                <form onSubmit={handleSubmit}>
                    <div></div>
                    <div className='ml-6 mr-6 mt-10'><b>ข้อมูลผู้จองและโรงพยาบาลที่ต้องการ</b></div>
                    <div className="grid gap-6 mb-6 md:grid-cols-3 pl-6 pr-6 mt-6">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">1. โรงพยาบาลที่ให้บริการ</label>
                            <select id='selecthos' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required>
                                {/* {defhos} */}
                                {hos.map(h => (
                                    <option key={h.hos_id} value={h.hos_id}>{h.hos_name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">2. วัน/เดือน/ปี ที่จอง</label>
                            <input type="datetime-local" id="date" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">3. เลขบัตรประชาชน</label>
                            <input type="number" id="sitizen" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" maxLength={13} required />
                        </div>

                    </div>

                    <div className="grid gap-6 mb-6 md:grid-cols-4 pl-6 pr-6">
                        <div >
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">4. คำนำหน้า</label>
                            <select id='selectpre' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required>
                                <option>เลือกคำนำหน้า</option>
                                {pre.map(p => (
                                    <option key={p.pre_id} value={p.pre_id}>{p.pre_name}</option>
                                ))}
                            </select></div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">5. ชื่อ</label>
                            <input type="text" id="fname" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder="" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">6. นามสกุล</label>
                            <input type="text" id="lname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">7. อายุ(ปี)</label>
                            <input type="number" id="age" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" maxLength={3} placeholder="" required />
                        </div>
                    </div>
                    <hr className="h-px mx-auto my-8 bg-gray-200 border-0 dark:bg-gray-700 w-[80%] mb-6" />
                    <div className='ml-6 mr-6 mb-6'><b>ข้อมูลผู้จองและโรงพยาบาลที่ต้องการ</b></div>
                    <div className="grid gap-6 mb-6 md:grid-cols-6 pl-6 pr-6">

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">8. เลขที่</label>
                            <input type="text" id="num" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder="" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">9. ถนน</label>
                            <input type="text" id="streed" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">10. แขวง</label>
                            <input type="text" id="subdistrict" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                        <div >
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">11. เขต</label>
                            <select id='selectdis' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required>
                                <option>เลือกเขต</option>
                                {dis.map(d => (
                                    <option key={d.dis_id} value={d.dis_id}>{d.dis_name}</option>
                                ))}
                            </select></div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">12. จังหวัด</label>
                            <input type="text" id="province" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={"กรุงเทพมหานคร"} readOnly />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">13. รหัสไปรษณีย์</label>
                            <input type="number" id="zip" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" maxLength={5} placeholder="" required />
                        </div>
                    </div>

                    <hr className="h-px mx-auto my-8 bg-gray-200 border-0 dark:bg-gray-700 w-[80%] mb-6" />
                    <div className='ml-6 mr-6 mb-6'><b>ข้อมูลการจองและรายละเอียดการรับ-ส่ง</b></div>

                    <div className="grid gap-6 mb-6 md:grid-cols-4 pl-6 pr-6 mt-6">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">14. เบอร์โทรศัพท์</label>
                            <input type="number" id="call" className='rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' maxLength={10} required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">15. วัน/เดือน/ปี ที่ขอใช้รถ</label>
                            <input type="datetime-local" id="dateres" className='rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">16. สถานที่รับ-ส่ง</label>
                            <div className='flex items-center p-2 rounded-lg border border-gray-200 dark:border-gray-700'>
                                <input type="radio" defaultChecked id="met1" name="met" value="1" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label className='ml-2 mr-4'>: เที่ยวเดียว</label>
                                <input type="radio" id="met2" name="met" value="2" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label className='ml-2 mr-2'>: ไป-กลับ</label>
                            </div>

                        </div>

                    </div>

                    <div className="grid gap-6 mb-6 md:grid-cols-2 pl-6 pr-6 mt-6">
                        <div >
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">17. สถานที่ต้นทาง</label>
                            <div className=' items-center p-2 rounded-lg border border-gray-200 dark:border-gray-700'>
                                <div className='flex items-center p-2 rounded-lg border border-gray-200 dark:border-gray-700'>
                                    <input type="radio" onClick={e => redio("s", 1)} id="start1" name="start" value="1" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label className='ml-2 mr-4'>: ที่อยู่ปัจจุบัน</label>
                                    <input type="radio" defaultChecked onChange={e => redioh("sadd")} id="start2" name="start" value="2" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label className='ml-2 mr-4'>: โรงพยาบาล</label>
                                    <input type="radio" onClick={e => redio("s")} id="start3" name="start" value="3" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label className='ml-2 mr-2'>: อื่น ๆ โปรดระบุ</label>
                                </div>
                                <div id='sadd' hidden>
                                    <div className="grid gap-6 mb-6 md:grid-cols-3 pl-6 pr-6 mt-6">
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เลขที่</label>
                                            <input type="text" id="snum" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder="" />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ถนน</label>
                                            <input type="text" id="sstreed" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">แขวง</label>
                                            <input type="text" id="ssubdistrict" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                                        </div>
                                        <div >
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เขต</label>
                                            <select id='sselectdis' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' >
                                                <option>เลือกเขต</option>
                                                {dis.map(d => (
                                                    <option key={d.dis_id} value={d.dis_id}>{d.dis_name}</option>
                                                ))}
                                            </select></div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">จังหวัด</label>
                                            <input type="text" id="sprovince" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={"กรุงเทพมหานคร"} readOnly />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รหัสไปรษณีย์</label>
                                            <input type="number" id="szip" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" maxLength={5} placeholder="" />
                                        </div>
                                    </div>
                                </div>
                                <div id='saddh'>
                                    <div>
                                        <label className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">โรงพยาบาลที่ให้บริการ</label>
                                        <select id='sselecthos' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required>
                                            {/* {defhos} */}
                                            {hos.map(h => (
                                                <option key={h.hos_id} value={h.hos_name}>{h.hos_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">18. สถานที่ปลายทาง</label>
                            <div className=' items-center p-2 rounded-lg border border-gray-200 dark:border-gray-700'>
                                <div className='flex items-center p-2 rounded-lg border border-gray-200 dark:border-gray-700'>
                                    <input type="radio" onClick={e => redio("e", 1)} id="end1" name="end" value="1" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label className='ml-2 mr-4'>: ที่อยู่ปัจจุบัน</label>
                                    <input type="radio" onClick={e => redioh("eadd")} id="end2" name="end" value="2" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label className='ml-2 mr-4'>: โรงพยาบาล</label>
                                    <input type="radio" defaultChecked onClick={e => redio("e")} id="end3" name="end" value="3" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label className='ml-2 mr-2'>: อื่น ๆ โปรดระบุ</label>
                                </div>
                                <div id='eadd'>
                                    <div className="grid gap-6 mb-6 md:grid-cols-3 pl-6 pr-6 mt-6">
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เลขที่</label>
                                            <input type="text" id="enum" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder="" />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ถนน</label>
                                            <input type="text" id="estreed" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">แขวง</label>
                                            <input type="text" id="esubdistrict" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                                        </div>
                                        <div >
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เขต</label>
                                            <select id='eselectdis' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' >
                                                <option>เลือกเขต</option>
                                                {dis.map(d => (
                                                    <option key={d.dis_id} value={d.dis_id}>{d.dis_name}</option>
                                                ))}
                                            </select></div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">จังหวัด</label>
                                            <input type="text" id="eprovince" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={"กรุงเทพมหานคร"} readOnly />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รหัสไปรษณีย์</label>
                                            <input type="number" id="ezip" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" maxLength={5} placeholder="" />
                                        </div>
                                    </div>
                                </div>
                                <div id='eaddh' hidden>
                                    <div>
                                        <label className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">โรงพยาบาลที่ให้บริการ</label>
                                        <select id='eselecthos' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required>
                                            {/* {defhos} */}
                                            {hos.map(h => (
                                                <option key={h.hos_id} value={h.hos_name}>{h.hos_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">19. เงื่อนไขในการขอรับบริการ</label>
                            <div className='flex items-center p-2 rounded-lg border border-gray-200 dark:border-gray-700'>
                                <div className="grid gap-6 mb-6 md:grid-cols-2 pl-6 pr-6 mt-6">
                                    <div><input type="radio" defaultChecked onClick={e => con()} id="condition1" name="condition" value="ADL 5-12" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label className='ml-2 mr-4'>: ADL 5-12</label></div>
                                    <div><input type="radio" onClick={e => con()} id="condition2" name="condition" value="มีปัญหาด้านการเคลื่อนไหว" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label className='ml-2 mr-2'>: มีปัญหาด้านการเคลื่อนไหว</label></div>
                                    <div><input type="radio" onClick={e => con()} id="condition3" name="condition" value="มีนัดรักษาต่อเนื่องกับโรงพยาบาล" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label className='ml-2 mr-4'>: มีนัดรักษาต่อเนื่องกับโรงพยาบาล</label></div>
                                    <div><input type="radio" onClick={e => con()} id="condition4" name="condition" value="มีปัญหาด้านเศรษฐานะ" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label className='ml-2 mr-2'>: มีปัญหาด้านเศรษฐานะ</label></div>
                                    <div><input type="radio" onClick={e => con()} id="condition5" name="condition" value="1" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label className='ml-2 mr-2'>: อื่น ๆ ระบุ </label></div>
                                    <div><input type="text" id='alther' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled /></div>
                                </div>

                                <div></div>
                            </div>

                        </div>
                    </div>

                    <hr className="h-px mx-auto my-8 bg-gray-200 border-0 dark:bg-gray-700 w-[80%] mb-6" />
                    <div className='ml-6 mr-6 mb-6'><b>ผู้ส่งข้อมูล</b></div>
                    <div className="grid gap-6 mb-6 md:grid-cols-3 pl-6 pr-6">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">20. ชื่อ - นามสกุล ผู้ส่งข้อมูล</label>
                            <input type="text" id="editer" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder="" required />

                        </div>

                    </div>

                    <div className="flex items-start mb-6 pl-6 pr-6">
                        <div className="flex items-center h-5">
                            <input id="check" onClick={e => check()} type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                        </div>
                        <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">กรอกข้อมูลครบถ้วนและต้องการส่งข้อมูล <a href="#" className="text-blue-600 hover:underline dark:text-blue-500"></a></label>
                    </div>
                    <div className="flex items-start mb-6 pl-6 pr-6">
                        <button id='submit' className='px-8 py-3 text-white bg-blue-600 rounded-lg focus:outline-none disabled:opacity-25' disabled>ส่งข้ออมูลการจองรถ</button>
                    </div>
                </form>
            </div>
        </>
    )
}
