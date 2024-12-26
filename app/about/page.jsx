"use client"
import React, { useEffect, useState } from 'react'
import Authen from '../components/Authen';
import Agecal from '../components/Agecal';
import { useRouter } from 'next/navigation'
import { ThaiDatePicker } from "thaidatepicker-react";


export default function About() {
    Authen();
    const router = useRouter();
    const [hos, setHos] = useState([]);
    const [pre, setPre] = useState([]);
    //const [dis, setDis] = useState([]);
    const [hosid, setHosid] = useState("");
    const [hosname, setHosname] = useState("");
    const [comdis, setComdis] = useState([]);
    const [zipcode, setZipcode] = useState("");
    const [amphoe, setAmphoe] = useState("");
    const [provinces, setProvinces] = useState("");
    const [districts, setDistricts] = useState("");
    const [districts2, setDistricts2] = useState("");
    const [provinces2, setProvinces2] = useState("");
    const [zipcode2, setZipcode2] = useState("");
    const [amphoe2, setAmphoe2] = useState("");
    const [districts3, setDistricts3] = useState("");
    const [provinces3, setProvinces3] = useState("");
    const [zipcode3, setZipcode3] = useState("");
    const [amphoe3, setAmphoe3] = useState("");
    const [way, setWay] = useState("");
    // const [ded, setDed] = useState(`${Number(new Date().getFullYear()) + 543}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}T${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}`);
    // const [ded2, setDed2] = useState(`${Number(new Date().getFullYear()) + 543}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}T${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}`);
    const [selectedThaiDate, setSelectedThaiDate] = useState();
    const [selectedThaiDate2, setSelectedThaiDate2] = useState();
    const [selectedThaiDate3, setSelectedThaiDate3] = useState();
    const [age, setAge] = useState();
    const [dob, setDob] = useState('');
    const [times1, setTimes1] = useState()
    const [date1, setDate1] = useState()
    const [date2, setDate2] = useState()
    const [citice, setCitice] = useState("")

    var com
    var cond
    var start
    var end
    var evals
    const d = new Date()
    var t = d.getFullYear() + "/" + Number(d.getMonth() + 1) + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()

    // const handleDatePickerChange = (christDate, buddhistDate) => {
    //     console.log({ christDate, buddhistDate });
    //     setSelectedThaiDate(buddhistDate);
    // };

    const Agecal = (val) => {
        const inputage = String(val).split("-")[0];
        const ret = Number(d.getFullYear()) - Number(inputage)
        if (Number(ret) >= 60) {
            document.getElementById("condition1").checked = true
            document.getElementById("condition7").required = false
        } else {
            document.getElementById("condition1").checked = false
            document.getElementById("condition7").required = true
        }
        setAge(ret)
    }

    const fetchdata = () => {
        fetch(process.env.NEXT_PUBLIC_APP_API + "/hospital2")
            .then(res => res.json())
            .then(result => {
                setHos(result);
            });

        fetch(process.env.NEXT_PUBLIC_APP_API + "/preflix2")
            .then(res => res.json())
            .then(result => {
                setPre(result);
            });

        // fetch(process.env.NEXT_PUBLIC_APP_API + "/district2")
        //     .then(res => res.json())
        //     .then(result => {
        //         setDis(result);
        //     });

        fetch(process.env.NEXT_PUBLIC_APP_API + "/add2")
            .then(res => res.json())
            .then(result => {
                setComdis(result);
            });

    }

    const conc = () => {
        var pac = 0;
        if (document.getElementById("condition7").checked === true) {
            for (var i = 8; i <= 15; i++) {
                document.getElementById(`condition${i}`).required = true
                if (document.getElementById(`condition${i}`).checked === true) {
                    pac = 1
                }
            }
        } else {
            for (var i = 8; i <= 15; i++) {
                document.getElementById(`condition${i}`).required = false
            }
        }
        if (pac === 1) {
            for (var i = 8; i <= 15; i++) {
                document.getElementById(`condition${i}`).required = false
            }
        }

    }

    const opti = () => {
        setHosid(localStorage.getItem("id"))
        setHosname(localStorage.getItem("department"))
    }

    const waym = (val) => {
        if (isNaN(Number(val))) {
            alert("ต้องใส้ข้อมูลเป็นตัวเลข")
            setCitice("")
        }
    }

    const eva = () => {
        if (document.getElementById("condition-1").checked === true) {
            evals = document.getElementById('condition-1').value + document.getElementById("calther").value
        }
        else if (document.querySelector('input[name="mett"]:checked').value === "ส่งต่อเยี่ยมบ้าน") {
            evals = document.querySelector('input[name="mett"]:checked').value + "โดย" + document.querySelector('input[name="send"]:checked').value
        }
        else
            evals = document.querySelector('input[name="mett"]:checked').value
        return evals
    }

    const showadd = (val) => {
        if (document.querySelector('input[name="mett"]:checked').value === "เข้าเงื่อนไขการขอใช้รถ") {
            document.getElementById("send1").disabled = true
            document.getElementById("send2").disabled = true
            document.getElementById("addre").hidden = false
            com = 1
        }
        else if (val) {
            document.getElementById("send1").disabled = false
            document.getElementById("send2").disabled = false
            document.getElementById("addre").hidden = true
            com = 0
        } else {
            document.getElementById("send1").disabled = true
            document.getElementById("send2").disabled = true
            document.getElementById("addre").hidden = true
            com = 0
        }

    }

    const createdata = () => {
        //cond = document.querySelector('input[name="condition"]:checked').value
        com = 0
        if (document.querySelector('input[name="mett"]:checked').value === "เข้าเงื่อนไขการขอใช้รถ") {
            com = 1
        }
        evals = eva()
        cond = ""
        start = ""
        end = ""
        if (document.getElementById("saddh").hidden === true)
            start = String(document.getElementById("sname").value).replaceAll(" ", "") + " " + String(document.getElementById("snum").value).replaceAll(" ", "") + " " + String(document.getElementById("sstreed").value).replaceAll(" ", "") + " " + String(document.getElementById("ssubdistrict").value.replaceAll(" ", "")) + " " + document.getElementById("sselectdis").value + " " + document.getElementById("province").value + " " + document.getElementById("szip").value
        else
            start = document.getElementById("sselecthos").value
        if (document.getElementById("eaddh").hidden === true)
            end = String(document.getElementById("ename").value).replaceAll(" ", "") + " " + String(document.getElementById("enum").value).replaceAll(" ", "") + " " + String(document.getElementById("estreed").value).replaceAll(" ", "") + " " + String(document.getElementById("esubdistrict").value).replaceAll(" ", "") + " " + document.getElementById("eselectdis").value + " " + document.getElementById("province").value + " " + document.getElementById("ezip").value
        else
            end = document.getElementById("eselecthos").value

        for (var i = 1; i <= 15; i++) {
            if (document.getElementById(`condition${i}`).checked === true) {
                if (i === 6 && document.getElementById('condition6').checked === true)
                    cond += document.getElementById("alther").value
                else
                    cond += document.getElementById(`condition${i}`).value
                if (i != 15)
                    cond += ", "
            } else {
                cond += "-"
                if (i != 15)
                    cond += ", "
            }
        }
        // if (document.getElementById(`condition-1`).checked === false) {
        // for (var i = 1; i <= 14; i++) {
        //     if (document.getElementById(`condition${i}`).checked === true) {
        //         if (i === 6 && document.getElementById('condition6').checked === true)
        //             cond += document.getElementById("alther").value
        //         else
        //             cond += document.getElementById(`condition${i}`).value
        //         if (i != 14)
        //             cond += ", "
        //     } else {
        //         cond += "-"
        //         if (i != 14)
        //             cond += ", "
        //     }
        // }} else {
        //     cond = "-, -, -, -, -, -, -, -, -, -, -, -, -, -"
        // }

        var jsondata

        if (com === 1) {
            jsondata = {
                "hos": document.getElementById("selecthos").value,
                "way": way,
                "date": date1,
                "sitizen": document.getElementById("sitizen").value,
                "preflix": document.getElementById("selectpre").value,
                "fname": document.getElementById("fname").value,
                "lname": document.getElementById("lname").value,
                "age": document.getElementById("age").value,
                "num": document.getElementById("num").value,
                "streed": document.getElementById("streed").value,
                "subdistrict": document.getElementById("subdistrict").value,
                "district": 0,
                "province": document.getElementById("province").value,
                "disv1": document.getElementById("selectdis").value,
                "zip": document.getElementById("zip").value,
                "call": document.getElementById("call").value,
                "dateres": date2,
                "met": document.querySelector('input[name="met"]:checked').value,
                "start": start,
                "end": end,
                "condition": cond,
                "editer": document.getElementById("editer").value,
                "time": t,
                "ac": 1,
                "acd": evals
            }
        } else if (com === 0) {
            jsondata = {
                "hos": document.getElementById("selecthos").value,
                "way": way,
                "date": date1,
                "sitizen": document.getElementById("sitizen").value,
                "preflix": document.getElementById("selectpre").value,
                "fname": document.getElementById("fname").value,
                "lname": document.getElementById("lname").value,
                "age": document.getElementById("age").value,
                "num": "-",
                "streed": "-",
                "subdistrict": "-",
                "district": 0,
                "province": "-",
                "disv1": "-",
                "zip": "-",
                "call": "-",
                "dateres": date1,
                "met": 0,
                "start": "-",
                "end": "-",
                "condition": cond,
                "editer": document.getElementById("editer").value,
                "time": t,
                "ac": 0,
                "acd": evals
            }
        }
        //  else if (com === 1){
        //     jsondata = {
        //         "hos": document.getElementById("selecthos").value,
        //         "date": document.getElementById("date").value,
        //         "sitizen": document.getElementById("sitizen").value,
        //         "preflix": document.getElementById("selectpre").value,
        //         "fname": document.getElementById("fname").value,
        //         "lname": document.getElementById("lname").value,
        //         "age": document.getElementById("age").value,
        //         "num": "-",
        //         "streed": "-",
        //         "subdistrict": "-",
        //         "district": 0,
        //         "province": "-",
        //         "disv1": "-",
        //         "zip": "-",
        //         "call": "-",
        //         "dateres": document.getElementById("date").value,
        //         "met": 0,
        //         "start": "-",
        //         "end": "-",
        //         "condition": cond,
        //         "editer": document.getElementById("editer").value,
        //         "time": t,
        //         "ac": 0,
        //         "acd": evals
        //     }
        // }

        console.log(jsondata)
        console.log(com)

        return jsondata

    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const jsondata = createdata()

        fetch(process.env.NEXT_PUBLIC_APP_API + "/fill2", {
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
                    document.getElementById("submit").disabled = true
                    window.location = "/manage"
                    router.push('/manage', { scroll: false })

                } else {
                    alert("ตรวจสอบความถูกต้องข้อข้อมูลอีกครั้ง")
                }
            })

    }



    const con = (val, val2) => {

        if (document.querySelector('input[name="mett"]:checked').value === "เข้าเงื่อนไขการขอใช้รถ") {
            document.getElementById("addre").hidden = false
        }

        if (document.getElementById('condition6').checked === true) {
            document.getElementById("alther").disabled = false
            document.getElementById("alther").focus()
            document.getElementById("alther").required = true
            document.getElementById('condition6').value = document.getElementById("alther").value
        }
        else if (document.getElementById('condition6').checked === false) {
            document.getElementById("alther").value = ""
            document.getElementById("alther").required = false
            document.getElementById("alther").disabled = true
        }


        if (document.getElementById("condition7").checked === true)
            document.getElementById("ihid").hidden = false
        else if (document.getElementById("condition7").checked === false)
            document.getElementById("ihid").hidden = true
        if (val) {
            if (document.getElementById("condition2").checked === false && document.getElementById("condition3").checked === false && document.getElementById("condition4").checked === false && document.getElementById("condition5").checked === false && document.getElementById("condition6").checked === false && document.getElementById("condition7").checked === false) {
                document.getElementById("rech").hidden = true
                document.getElementById("addre").hidden = true

            }
            else {
                document.getElementById("rech").hidden = false

            }
        }

        if (document.getElementById("condition-1").checked === false) {
            document.getElementById("condition2").disabled = false
            document.getElementById("condition3").disabled = false
            document.getElementById("condition4").disabled = false
            document.getElementById("condition5").disabled = false
            document.getElementById("condition6").disabled = false
            document.getElementById("calther").disabled = true
            document.getElementById("calther").required = false

        }
        else {
            document.getElementById("condition2").checked = false
            document.getElementById("condition3").checked = false
            document.getElementById("condition4").checked = false
            document.getElementById("condition5").checked = false
            document.getElementById("condition6").checked = false

            document.getElementById("condition2").disabled = true
            document.getElementById("condition3").disabled = true
            document.getElementById("condition4").disabled = true
            document.getElementById("condition5").disabled = true
            document.getElementById("condition6").disabled = true
            document.getElementById("alther").disabled = true
            document.getElementById("calther").disabled = false
            document.getElementById("calther").focus()
            document.getElementById("calther").required = true
            document.getElementById("rech").hidden = true
            document.getElementById("addre").hidden = true


        }

        if (document.getElementById('condition-1').checked === true) {
            document.getElementById("calther").disabled = false
            document.getElementById("calther").focus()
            document.getElementById("calther").required = true
            document.getElementById('condition-1').value = document.getElementById("alther").value

        }
        else if (document.getElementById('condition-1').checked === false) {
            document.getElementById("calther").value = ""
            document.getElementById("calther").required = false
            document.getElementById("calther").disabled = true

        }
        if (val === false) {
            document.getElementById("rech").hidden = true
            document.getElementById("addre").hidden = true
        }


    }

    const redio = (val, val2, val3) => {
        const num = document.getElementById("num").value
        const streed = document.getElementById("streed").value
        const subdistrict = document.getElementById("subdistrict").value
        const district = document.getElementById("selectdis").value
        const zip = document.getElementById("zip").value
        const province = document.getElementById("province").value
        document.getElementById(val + "add").hidden = false
        document.getElementById(val + "addh").hidden = true
        if (val3) {
            document.getElementById(val + "name").value = "บ้าน"
            document.getElementById(val + "num").value = num
            document.getElementById(val + "streed").value = streed
            document.getElementById(val + "subdistrict").value = subdistrict
            document.getElementById(val + "selectdis").value = district
            document.getElementById(val + "province").value = province
            document.getElementById(val + "zip").value = zip
            document.getElementById(val + "num").readOnly = true
            document.getElementById(val + "streed").readOnly = true
            document.getElementById(val + "subdistrict").readOnly = true
            document.getElementById(val + "selectdis").readOnly = true
            document.getElementById(val + "zip").readOnly = true

            document.getElementById(val2 + "name").required = false
            document.getElementById(val2 + "num").required = false
            document.getElementById(val2 + "streed").required = false
            document.getElementById(val2 + "subdistrict").required = false
            document.getElementById(val2 + "selectdis").required = false
            document.getElementById(val2 + "province").required = false
            document.getElementById(val2 + "zip").required = false
            document.getElementById(val2 + "num").required = false
            document.getElementById(val2 + "streed").required = false
            document.getElementById(val2 + "subdistrict").required = false
            document.getElementById(val2 + "selectdis").required = false
            document.getElementById(val2 + "zip").required = false

            document.getElementById(val + "name").required = true
            document.getElementById(val + "num").required = true
            document.getElementById(val + "streed").required = true
            document.getElementById(val + "subdistrict").required = true
            document.getElementById(val + "selectdis").required = true
            document.getElementById(val + "province").required = true
            document.getElementById(val + "zip").required = true
            document.getElementById(val + "num").required = true
            document.getElementById(val + "streed").required = true
            document.getElementById(val + "subdistrict").required = true
            document.getElementById(val + "selectdis").required = true
            document.getElementById(val + "zip").required = true

        }
        else {
            document.getElementById(val + "name").value = ""
            document.getElementById(val + "num").value = ""
            document.getElementById(val + "streed").value = ""
            document.getElementById(val + "subdistrict").value = ""
            document.getElementById(val + "selectdis").value = ""
            document.getElementById(val + "province").value = ""
            document.getElementById(val + "zip").value = ""

            document.getElementById(val + "num").readOnly = false
            document.getElementById(val + "streed").readOnly = false
            document.getElementById(val + "subdistrict").readOnly = false
            document.getElementById(val + "province").readOnly = false
            document.getElementById(val + "selectdis").readOnly = false
            document.getElementById(val + "zip").readOnly = false

            document.getElementById(val2 + "name").required = false
            document.getElementById(val2 + "num").required = false
            document.getElementById(val2 + "streed").required = false
            document.getElementById(val2 + "subdistrict").required = false
            document.getElementById(val2 + "selectdis").required = false
            document.getElementById(val2 + "province").required = false
            document.getElementById(val2 + "zip").required = false
            document.getElementById(val2 + "num").required = false
            document.getElementById(val2 + "streed").required = false
            document.getElementById(val2 + "subdistrict").required = false
            document.getElementById(val2 + "selectdis").required = false
            document.getElementById(val2 + "zip").required = false

            document.getElementById(val + "name").required = true
            document.getElementById(val + "num").required = true
            document.getElementById(val + "streed").required = true
            document.getElementById(val + "subdistrict").required = true
            document.getElementById(val + "province").required = true
            document.getElementById(val + "selectdis").required = true
            document.getElementById(val + "zip").required = true
            document.getElementById(val + "num").required = true
            document.getElementById(val + "streed").required = true
            document.getElementById(val + "subdistrict").required = true
            document.getElementById(val + "selectdis").required = true
            document.getElementById(val + "zip").required = true

        }

    }

    const redioh = (val) => {
        document.getElementById(val).hidden = true
        document.getElementById(val + "h").hidden = false

        document.getElementById("sname").required = false
        document.getElementById("snum").required = false
        document.getElementById("sstreed").required = false
        document.getElementById("ssubdistrict").required = false
        document.getElementById("sselectdis").required = false
        document.getElementById("sprovince").required = false
        document.getElementById("szip").required = false
        document.getElementById("snum").required = false
        document.getElementById("sstreed").required = false
        document.getElementById("ssubdistrict").required = false
        document.getElementById("sselectdis").required = false
        document.getElementById("szip").required = false

        document.getElementById("ename").required = false
        document.getElementById("enum").required = false
        document.getElementById("estreed").required = false
        document.getElementById("esubdistrict").required = false
        document.getElementById("eselectdis").required = false
        document.getElementById("eprovince").required = false
        document.getElementById("ezip").required = false
        document.getElementById("enum").required = false
        document.getElementById("estreed").required = false
        document.getElementById("esubdistrict").required = false
        document.getElementById("eselectdis").required = false
        document.getElementById("ezip").required = false

    }

    const check = () => {
        if (document.getElementById("check").checked === true) {

            document.getElementById("submit").disabled = false
        }
        else
            document.getElementById("submit").disabled = true
        createdata();

    }

    // const distr = (date) => {
    //     var ed = date.split("-")
    //     var dateconvert = date
    //     if (String(date.split("-")[0]) < Number(new Date().getFullYear()) + 543) {
    //         dateconvert = `${Number(ed[0]) + 543}-${ed[1]}-${ed[2]}`
    //     }
    //     setDed(dateconvert)
    // }

    // const distr2 = (date) => {
    //     var ed = date.split("-")
    //     var dateconvert = date
    //     if (String(date.split("-")[0]) < Number(new Date().getFullYear()) + 543) {
    //         dateconvert = `${Number(ed[0]) + 543}-${ed[1]}-${ed[2]}`
    //     }
    //     setDed2(dateconvert)
    // }

    // var defhos = <option value={localStorage.getItem("id")}>{localStorage.getItem("department")}</option>

    const showdate = (val) => {
        console.log(new Date(selectedThaiDate + "T" + (val)))
        setDate1(selectedThaiDate + "T" + (val))
    }

    const showdate2 = (val) => {
        // console.log(new Date(selectedThaiDate+"T"+String(timess1)))
        if (document.getElementById("time1").value) {
            console.log(new Date(val + "T" + String(document.getElementById("time1").value)))
            setDate1(val + "T" + String(document.getElementById("time1").value))
        }

    }

    const showres1 = (val) => {
        console.log(new Date(selectedThaiDate2 + "T" + (val)))
        setDate2(selectedThaiDate2 + "T" + (val))
    }

    const showres2 = (val) => {
        // console.log(new Date(selectedThaiDate+"T"+String(timess1)))
        if (document.getElementById("time2").value) {
            console.log(new Date(val + "T" + String(document.getElementById("time2").value)))
            setDate2(val + "T" + String(document.getElementById("time2").value))
        }

    }

    useEffect(() => {
        fetchdata();
        opti();
    }, []);

    return (
        <>
            <div className='pt-8'>
                <p className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">การลงทะเบียนการใช้บริการรถรับ-ส่งคนพิการและผู้สูงอายุ</p>
                <form onSubmit={handleSubmit}>
                    <div></div>
                    {/* <div className='ml-6 mr-6 mt-10'><b>ข้อมูลผู้จองและโรงพยาบาลที่ต้องการ</b></div> */}
                    <div className="grid gap-6 mb-6 md:grid-cols-2 pl-6 pr-6 mt-6">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">โรงพยาบาลที่ให้บริการ</label>
                            <select id='selecthos' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required>
                                <option value={hosid}>{hosname}</option>
                            </select>
                            {/* <input type="text" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' readOnly value={String(localStorage.getItem("id"))} /> */}
                        </div>
                    </div>
                    <div className="grid gap-6 mb-6 md:grid-cols-3 pl-6 pr-6 mt-6">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ช่องทางเข้ารับบริการ</label>
                            <input type="radio" id="way1" name="way" onChange={e => { setWay(e.target.value) }} required value="LINE add" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label className='ml-2 mr-2'>: LINE add</label><br />
                            <input type="radio" id="way2" name="way" onChange={e => { setWay(e.target.value) }} value="โทรศัพท์" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label className='ml-2 mr-2'>: โทรศัพท์</label><br />
                            <input type="radio" id="way3" name="way" onChange={e => { setWay(e.target.value) }} value="Easy Chat หมอ กทม." className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label className='ml-2 mr-2'>: Easy Chat หมอ กทม.</label><br />
                            <input type="radio" id="way4" name="way" onChange={e => { setWay(e.target.value) }} value="Walk in" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label className='ml-2 mr-2'>: Walk in</label><br />
                        </div>
                    </div>
                    <div className="grid gap-6 mb-6 md:grid-cols-3 pl-6 pr-6 mt-6">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">วันที่จองรถ</label>
                            <ThaiDatePicker
                                value={selectedThaiDate}
                                onChange={(christDate) => { setSelectedThaiDate(christDate), showdate2(christDate) }}
                                customInput={"input"}
                                inputProps={{
                                    displayFormat: "D MMMM YYYY",
                                    className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                                    required: true,
                                    id: "date1",
                                    autoComplete: "off"
                                }}

                            />
                            <label className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">เวลาจองรถ</label>
                            <input onChange={e => showdate(e.target.value)} defaultValue={"01:00"} type="time" id="time1" className='rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-auto p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required />

                            {/* <button type='button' onClick={() => console.log(selectedThaiDate) }>asd</button> */}
                            {/* <input type="datetime-local" id="date" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder="วว/ดด/ปปปป ชช:นน" value={ded} onChange={e => setDed(e.target.value)} onBlur={e => distr(e.target.value)} required /> */}
                        </div>

                    </div>


                    <hr className="h-px mx-auto my-8 bg-gray-200 border-0 dark:bg-gray-700 w-[80%] mb-6" />
                    <div className='ml-6 mr-6 mb-6'><b><u>ข้อมูลผู้รับบริการ</u></b></div>

                    <div className="grid gap-6 mb-6 md:grid-cols-3 pl-6 pr-6 mt-6">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เลขบัตรประชาชน</label>
                            <input type="text" id="sitizen" value={citice} onChange={e => { setCitice(e.target.value), waym(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" minLength={13} maxLength={13} required />

                        </div>
                    </div>

                    <div className="grid gap-6 mb-6 md:grid-cols-7 pl-6 pr-6">
                        <div >
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">คำนำหน้า</label>
                            <select id='selectpre' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required>
                                {/* <option>เลือกคำนำหน้า</option> */}
                                {pre.map(p => (
                                    <option key={p.pre_id} value={p.pre_id}>{p.pre_name}</option>
                                ))}
                            </select></div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ชื่อ</label>
                            <input type="text" id="fname" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder="" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">นามสกุล</label>
                            <input type="text" id="lname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>

                    </div>
                    <div className="grid gap-6 mb-6 md:grid-cols-4 pl-6 pr-6">
                        {/* <Agecal agg="condition" /> */}

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">วัน เดือน ปี เกิด</label>
                            <ThaiDatePicker
                                value={dob}
                                onChange={(christDate) => setDob(christDate)}
                                customInput={"input"}
                                inputProps={{
                                    displayFormat: "D MMMM YYYY",
                                    className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                                    required: true,
                                    autoComplete: "off"
                                }}
                            />
                        </div>
                        <div className="text-center">
                            {/* <button type="button" className="bg-[#e9e9d9dd] shadow-md p-2 mt-7 rounded-lg hover:bg-slate-400" onClick={() => calculateAge()}>คำนวณอายุ</button> */}
                            <button type="button" className="bg-[#e9e9d9dd] shadow-md p-2 mt-7 rounded-lg hover:bg-slate-400" onClick={() => Agecal(dob)}>คำนวณอายุ</button>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">อายุ(ปี)</label>
                            <input type="text" value={age} id="age" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[35%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" maxLength={3} placeholder="" required readOnly />
                        </div>

                    </div>

                    <hr className="h-px mx-auto my-8 bg-gray-200 border-0 dark:bg-gray-700 w-[80%] mb-6" />
                    <div className='ml-6 mr-6 mb-6'><b><u>ประเภทผู้รับบริการ</u></b></div>

                    <div className="grid gap-6 mb-3 md:grid-cols-2 pl-3 pr-3 mt-3">
                        <div className='flex items-center p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white'>
                            <div className="grid gap-6 mb-6 md:grid-cols-1 pl-6 pr-6 mt-6">
                                <div><input type="checkbox" disabled onClick={e => con()} id="condition1" name="condition2" value="ผู้สูงอายุ" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label className='ml-2 mr-4'>: ผู้สูงอายุ</label></div>
                                <div><input type="checkbox" onClick={e => { con(), conc() }} id="condition7" name="condition2" value="คนพิการ" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label className='ml-2 mr-4'>: คนพิการ</label></div>
                                <div><input type="checkbox" onClick={e => { con(), conc() }} id="condition15" name="condition2" value="ผู้มีความยากลำบากเข้าถึงบริการ" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label className='ml-2 mr-4'>: ผู้มีความยากลำบากเข้าถึงบริการ</label></div>

                                <div id='ihid' hidden>
                                    <div><label className='ml-2 mr-4'>**กรณีเป็นผู้พิการเลือกความพิการ**</label> <br /><br /></div>
                                    <div className='flex items-center p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white'>
                                        <div className="grid gap-6 mb-3 md:grid-cols-2 pl-3 pr-3 mt-3">

                                            <div><input type="checkbox" onClick={e => { con(), conc() }} id="condition8" name="condition" value="การเห็น" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label className='ml-2 mr-4'>: การเห็น</label></div>
                                            <div><input type="checkbox" onClick={e => { con(), conc() }} id="condition9" name="condition" value="การได้ยินหรือสื่อความหมาย" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label className='ml-2 mr-4'>: การได้ยินหรือสื่อความหมาย</label></div>
                                            <div><input type="checkbox" onClick={e => { con(), conc() }} id="condition10" name="condition" value="การเคลื่อนไหวหรือทางร่างกาย" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label className='ml-2 mr-2'>: การเคลื่อนไหวหรือทางร่างกาย</label></div>
                                            <div><input type="checkbox" onClick={e => { con(), conc() }} id="condition11" name="condition" value="จิตใจหรือพฤติกรรม" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label className='ml-2 mr-4'>: จิตใจหรือพฤติกรรม</label></div>
                                            <div><input type="checkbox" onClick={e => { con(), conc() }} id="condition12" name="condition" value="สติปัญญา" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label className='ml-2 mr-2'>: สติปัญญา</label></div>
                                            <div><input type="checkbox" onClick={e => { con(), conc() }} id="condition13" name="condition" value="การเรียนรู้" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label className='ml-2 mr-2'>: การเรียนรู้</label></div>
                                            <div><input type="checkbox" onClick={e => { con(), conc() }} id="condition14" name="condition" value="ออทิสติก" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label className='ml-2 mr-2'>: ออทิสติก</label></div></div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div>

                        </div>
                    </div>

                    <hr className="h-px mx-auto my-8 bg-gray-200 border-0 dark:bg-gray-700 w-[80%] mb-6" />
                    <div className='ml-6 mr-6 mb-6'><b><u>เงื่อนไขในการขอรับบริการ</u></b></div>

                    <div className="grid gap-6 mb-3 md:grid-cols-2 pl-3 pr-3 mt-3">
                        <div className='flex items-center p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white'>
                            <div className="grid gap-6 mb-6 md:grid-cols-2 pl-6 pr-6 mt-6">
                                <div><input type="checkbox" onClick={e => con("condition2")} id="condition2" name="condition" value="ADL 5-12" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label className='ml-2 mr-4'>: ADL 5-12</label></div>
                                <div><input type="checkbox" onClick={e => con("condition3")} id="condition3" name="condition" value="มีปัญหาด้านการเคลื่อนไหว" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label className='ml-2 mr-2'>: มีปัญหาด้านการเคลื่อนไหว</label></div>
                                <div><input type="checkbox" onClick={e => con("condition4")} id="condition4" name="condition" value="มีนัดรักษาต่อเนื่องกับโรงพยาบาล" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label className='ml-2 mr-4'>: มีนัดรักษาต่อเนื่องกับโรงพยาบาล</label></div>
                                <div><input type="checkbox" onClick={e => con("condition5")} id="condition5" name="condition" value="มีปัญหาด้านเศรษฐานะ" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label className='ml-2 mr-2'>: มีปัญหาด้านเศรษฐานะ</label></div>

                                <div className="grid gap-6 mb-6 md:grid-cols-1">
                                    <div><input type="checkbox" onClick={e => con("condition6")} id="condition6" name="condition" value="1" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label className='ml-2 mr-2'>: อื่น ๆ ระบุ </label>
                                        <input type="text" id='alther' className=" border rounded-md border-black-400 active:border-black disabled:border-black-300" disabled />
                                    </div><div className=''>
                                        <input type="checkbox" onClick={e => con(e.target.checked)} id="condition-1" name="condition" value="ไม่เข้าเงื่อนไขเนื่องจาก " className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label className='ml-2 mr-2'>: ไม่เข้าเงื่อนไขขอรับบริการ เนื่องจาก ระบุ</label>
                                        <input type="text" id='calther' className="w-full border rounded-md border-black-400 active:border-black disabled:border-black-300" disabled />
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>

                    <div id="rech" hidden>
                        <hr className="h-px mx-auto my-8 bg-gray-200 border-0 dark:bg-gray-700 w-[80%] mb-6" />
                        <div className='ml-6 mr-6 mb-6'><b><u>ผลการประเมินเบื้องต้น</u></b></div>

                        <div className="grid gap-6 mb-3 md:grid-cols-2 pl-3 pr-3 mt-3">
                            <div className='flex items-center p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white'>
                                <div className="grid gap-6 mb-6 md:grid-cols-1 pl-6 pr-6 mt-6">
                                    <div>
                                        <input type="radio" defaultChecked id="mett1" name="mett" onChange={() => { showadd() }} value="แนะนำทำ Telemedicine" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label className='ml-2 mr-4'>: แนะนำทำ Telemedicine</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="mett2" name="mett" onChange={() => { showadd(1) }} value="ส่งต่อเยี่ยมบ้าน" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label className='ml-2 mr-2'>: ส่งต่อเยี่ยมบ้าน</label><br />
                                        <div className="pl-6">
                                            <div><input type="radio" defaultChecked disabled id="send1" name="send" value="โรงพยาบาล" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label className='ml-2 mr-4'>: โรงพยาบาล</label></div>
                                            <div><input type="radio" disabled id="send2" name="send" value="ศูนย์บริการสาธารณสุข" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label className='ml-2 mr-2'>: ศูนย์บริการสาธารณสุข</label></div>
                                        </div>
                                    </div>
                                    <div>
                                        <input type="radio" id="mett3" name="mett" onChange={() => { showadd() }} value="เข้าเงื่อนไขการขอใช้รถ" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label className='ml-2 mr-2'>: เข้าเงื่อนไขการขอใช้รถ</label>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div id="addre" hidden>
                        <hr className="h-px mx-auto my-8 bg-gray-200 border-0 dark:bg-gray-700 w-[80%] mb-6" />
                        <div className='ml-6 mr-6 mb-6'><b>ข้อมูลการจองและรายละเอียดการรับ-ส่ง</b></div>

                        <div className="grid gap-6 mb-6 md:grid-cols-7 pl-6 pr-6">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ที่อยู่ปัจจุบัน</label>
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เลขที่</label>
                                <input type="text" id="num" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder="" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ถนน</label>
                                <input type="text" id="streed" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">แขวง / ตำบล</label>
                                <input list="brow" value={districts} onChange={e => { setDistricts(String(e.target.value).split("->")[0]), setAmphoe(String(e.target.value).split("->")[1]), setProvinces(String(e.target.value).split("->")[2]), setZipcode(String(e.target.value).split("->")[3]) }} id="subdistrict" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                <datalist id="brow">
                                    {comdis.map((p, i) => {
                                        return (
                                            <option key={i} value={p.district + "->" + p.amphoe + "->" + p.province + "->" + p.zipcode}>{p.district}</option>
                                        )
                                    })}
                                </datalist></div>
                            <div >
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เขต / อำเภอ</label>
                                <input defaultValue={amphoe} type="text" id='selectdis' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder="" readOnly />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">จังหวัด</label>
                                <input defaultValue={provinces} type="text" id="province" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รหัสไปรษณีย์</label>
                                <input defaultValue={zipcode} type="text" id="zip" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" maxLength={5} placeholder="" readOnly />
                            </div>
                        </div>
                        <div className="grid gap-6 mb-6 md:grid-cols-3 pl-6 pr-6">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เบอร์โทรศัพท์</label>
                                <input type="number" id="call" className='rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-auto p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' maxLength={10} />
                            </div>
                        </div>



                        <div className="grid gap-6 mb-6 md:grid-cols-4 pl-6 pr-6 mt-6">

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">วันที่ขอใช้รถ</label>
                                <ThaiDatePicker
                                    value={selectedThaiDate2}
                                    onChange={(christDate) => { setSelectedThaiDate2(christDate), showres2(christDate) }}
                                    customInput={"input"}
                                    inputProps={{
                                        displayFormat: "D MMMM YYYY",
                                        className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                                        required: true,
                                        id: "dateres1",
                                        autoComplete: "off"
                                    }}

                                />
                                <label className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">เวลาขอใช้รถ</label>
                                <input type="time" onChange={e => showres1(e.target.value)} defaultValue={"01:00"} id="time2" className='rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-auto p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </div>


                        </div>

                        <div className="grid gap-6 mb-6 md:grid-cols-4 pl-6 pr-6 mt-6">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">สถานที่รับ-ส่ง</label>
                                <div className='flex items-center p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white'>
                                    <input type="radio" defaultChecked id="met1" name="met" value="1" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label className='ml-2 mr-4'>: เที่ยวเดียว</label>
                                    <input type="radio" id="met2" name="met" value="2" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label className='ml-2 mr-2'>: ไป-กลับ</label>
                                </div>

                            </div>
                        </div>

                        <div className="grid gap-6 mb-6 md:grid-cols-1 pl-6 pr-6 mt-6">
                            <div >
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">สถานที่ต้นทาง</label>
                                <div className=' items-center p-2 rounded-lg border border-gray-200 dark:border-gray-700'>
                                    <div className='flex items-center p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white'>
                                        <input type="radio" onClick={e => redio("s", "e", 1)} id="start1" name="start" value="1" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label className='ml-2 mr-4'>: ที่อยู่ปัจจุบัน</label>
                                        <input type="radio" defaultChecked onChange={e => redioh("sadd")} id="start2" name="start" value="2" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label className='ml-2 mr-4'>: โรงพยาบาล</label>
                                        <input type="radio" onClick={e => redio("s", "e")} id="start3" name="start" value="3" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label className='ml-2 mr-2'>: อื่น ๆ โปรดระบุ</label>
                                    </div>
                                    <div id='sadd' hidden>
                                        <div className="grid gap-6 mb-6 md:grid-cols-4 pl-6 pr-6 mt-6">
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ชื่อสถานที่</label>
                                                <input type="text" id="sname" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder="" />
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เลขที่</label>
                                                <input type="text" id="snum" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder="" />
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ถนน</label>
                                                <input type="text" id="sstreed" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">แขวง / ตำบล</label>
                                                <input list="brow" value={districts3} onChange={(e) => { setDistricts3(String(e.target.value).split("->")[0]), setAmphoe3(String(e.target.value).split("->")[1]), setProvinces3(String(e.target.value).split("->")[2]), setZipcode3(String(e.target.value).split("->")[3]) }} id="ssubdistrict" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                <datalist id="brow">
                                                    {comdis.map((p, i) => {
                                                        return (
                                                            <option key={i} value={p.district + "->" + p.amphoe + "->" + p.province + "->" + p.zipcode}>{p.district}</option>
                                                        )
                                                    })}
                                                </datalist></div>
                                            <div >
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เขต / อำเภอ</label>
                                                <input defaultValue={amphoe3} readOnly type="text" id="sselectdis" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">จังหวัด</label>
                                                <input defaultValue={provinces3} readOnly type="text" id="sprovince" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รหัสไปรษณีย์</label>
                                                <input defaultValue={zipcode3} readOnly type="text" id="szip" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" maxLength={5} placeholder="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div id='saddh'>
                                        <div>
                                            <label className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">โรงพยาบาลที่ให้บริการ</label>
                                            <select id='sselecthos' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' >
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
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">สถานที่ปลายทาง</label>
                                <div className=' items-center p-2 rounded-lg border border-gray-200 dark:border-gray-700'>
                                    <div className='flex items-center p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white'>
                                        <input type="radio" onClick={e => redio("e", "s", 1)} id="end1" name="end" value="1" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label className='ml-2 mr-4'>: ที่อยู่ปัจจุบัน</label>
                                        <input type="radio" onClick={e => redioh("eadd")} id="end2" name="end" value="2" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label className='ml-2 mr-4'>: โรงพยาบาล</label>
                                        <input type="radio" defaultChecked onClick={e => redio("e", "s")} id="end3" name="end" value="3" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label className='ml-2 mr-2'>: อื่น ๆ โปรดระบุ</label>
                                    </div>
                                    <div id='eadd'>
                                        <div className="grid gap-6 mb-6 md:grid-cols-4 pl-6 pr-6 mt-6">
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ชื่อสถานที่</label>
                                                <input type="text" id="ename" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder="" />
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เลขที่</label>
                                                <input type="text" id="enum" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder="" />
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ถนน</label>
                                                <input type="text" id="estreed" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">แขวง / ตำบล</label>
                                                <input list="brow" value={districts2} onChange={(e) => { setDistricts2(String(e.target.value).split("->")[0]), setAmphoe2(String(e.target.value).split("->")[1]), setProvinces2(String(e.target.value).split("->")[2]), setZipcode2(String(e.target.value).split("->")[3]) }} id="esubdistrict" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                <datalist id="brow">
                                                    {comdis.map((p, i) => {
                                                        return (
                                                            <option key={i} value={p.district + "->" + p.amphoe + "->" + p.province + "->" + p.zipcode}>{p.district}</option>
                                                        )
                                                    })}
                                                </datalist></div>
                                            <div >
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เขต / อำเภอ</label>
                                                <input defaultValue={amphoe2} readOnly type="text" id="eselectdis" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">จังหวัด</label>
                                                <input defaultValue={provinces2} type="text" id="eprovince" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly />
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รหัสไปรษณีย์</label>
                                                <input defaultValue={zipcode2} readOnly type="text" id="ezip" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" maxLength={5} placeholder="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div id='eaddh' hidden>
                                        <div>
                                            <label className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">โรงพยาบาลที่ให้บริการ</label>
                                            <select id='eselecthos' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' >
                                                {/* {defhos} */}
                                                {hos.map(h => (
                                                    <option key={h.hos_id} value={h.hos_name}>{h.hos_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <hr className="h-px mx-auto my-8 bg-gray-200 border-0 dark:bg-gray-700 w-[80%] mb-6" />
                    <div className='ml-6 mr-6 mb-6'><b><u>ข้อมูลผู้บันทึกข้อมูล</u></b></div>
                    <div className="grid gap-6 mb-6 md:grid-cols-3 pl-6 pr-6">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ผู้ส่งข้อมูล</label>
                            <input type="text" id="editer" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder="" required />

                        </div>

                    </div>

                    <div>
                        <div className="flex items-start mb-6 pl-6 pr-6">
                            <div className="flex items-center h-5">
                                <input id="check" onClick={e => check()} type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                            </div>
                            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">กรอกข้อมูลครบถ้วนและต้องการส่งข้อมูล <a href="#" className="text-blue-600 hover:underline dark:text-blue-500"></a></label>
                        </div>
                        <div className="flex items-start mb-6 pl-6 pr-6">
                            <button id='submit' className='px-8 py-3 text-white bg-blue-600 rounded-lg focus:outline-none disabled:opacity-25' disabled>ส่งข้อมูลการจองรถ</button>
                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}
