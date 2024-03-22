"use client"
import DataTable from 'react-data-table-component';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Authen from '../components/Authen';
import { useRouter } from 'next/navigation'


export default function Manage() {
    Authen();
    const router = useRouter();
    const [furl, setFurl] = useState("");
    const [form, setForm] = useState([]);
    const [select, setSelect] = useState([]);
    const [showModal, setShowModal] = React.useState(false);
    const [showModal2, setShowModal2] = React.useState(false);
    const [showModal3, setShowModal3] = React.useState(false);
    const [printm, setPrintm] = React.useState(false);
    const [formi, setFormi] = useState();
    const [cri, setCri] = useState();
    const [admin, setAdmin] = React.useState(false);
    const [hos, setHos] = useState([]);
    // const [query, setQuery] = useState("")
    const [page, setPage] = useState(1)
    // const [per_page, setPer_Page] = useState(25)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [sortColumn, setSortColumn] = useState("");
    const [sortDirection, setSortDirection] = useState("");
    //query
    const [search, setSearch] = useState("");
    const [hosp, setHosp] = useState("");
    const [statusc, setStatusc] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    const d = new Date()
    var t = d.getFullYear() + "/" + d.getMonth() + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()


    const columns = [
        {
            name: 'วันที่ต้องการใช้',
            selector: row => row.dateres,
            sortable: true,
            grow: "2",
            style: {
                color: 'red',
            },
            "col": "dateres",
        },
        {
            name: 'วันที่จอง',
            selector: row => row.date,
            sortable: true,
            hide: 'sm',
            "col": "dateres",
        },
        {
            name: 'โรงพยาบาล',
            selector: row => row.hos_name,
            sortable: true,
            hide: 'md',
            "col": "hos_name",
        },
        {
            name: 'ผู้รับบริการ',
            selector: row => row.pre_name + row.fname + " " + row.lname,
            sortable: true,
            hide: 'sm',
            "col": "fname",
        },
        {
            name: 'สถานะ',
            cell: row => {
                var st
                if (row.status === null) {
                    st = "รอดำเนินการ"
                }
                else if (row.status === 1) {
                    st = <p className=' text-green-600 font-bold'>สำเร็จ</p>
                    if (row.distance === 0) {
                    }
                }
                else if (row.status === 0) {
                    st = <p className=' text-red-600 font-bold' >ยกเลิก</p>
                }
                return (
                    <>
                        {st}
                    </>
                )
            },
            sortable: true,
            "col": "status",
        },
        {
            name: 'ข้อมูลการจอง',
            button: "true",
            cell: row => {
                var st
                var bcanc

                if (row.status === null) {
                    st = "รอดำเนินการ"
                    bcanc = <button
                        id='editt'
                        className=' bg-[#ff4000] text-white p-2 rounded-lg m-1'
                        type="button"
                        onClick={e => { setFormi(row.fm_id), setShowModal3(true), fet(row.fm_id) }}
                    >
                        <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fillRule="currentColor" viewBox="0 0 24 24">
                            <path d="M14 4.2a4.1 4.1 0 0 1 5.8 0 4 4 0 0 1 0 5.7l-1.3 1.3-5.8-5.7L14 4.2Zm-2.7 2.7-5.1 5.2 2.2 2.2 5-5.2-2.1-2.2ZM5 14l-2 5.8c0 .3 0 .7.3 1 .3.3.7.4 1 .2l6-1.9L5 13.8Zm7 4 5-5.2-2.1-2.2-5.1 5.2 2.2 2.1Z" fillRule="evenodd" />
                        </svg>

                    </button>
                }
                else if (row.status === 1) {
                    st = <p className=' text-green-600 font-bold'>สำเร็จ</p>
                    if (row.distance === 0) {
                        bcanc = <button
                            id='canc'
                            className=' bg-green-400 text-white p-2 rounded-lg m-1'
                            type="button"
                            onClick={e => { setCri(row.cm_id), setShowModal2(true), fet(row.fm_id), checkc(row.des, 1) }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                            </svg>

                        </button>
                    }
                }
                else if (row.status === 0) {
                    st = <p className=' text-red-600 font-bold' >ยกเลิก</p>
                    bcanc = <button
                        id='canc'
                        className=' bg-orange-400 text-white p-2 rounded-lg m-1'
                        type="button"
                        onClick={e => { setFormi(row.fm_id), setShowModal2(true), fet(row.fm_id), checkc(row.des) }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                        </svg>

                    </button>
                }


                return (
                    <div>
                        <button
                            id='info'
                            className=' bg-blue-600 text-white p-2 rounded-lg m-1'
                            type="button"
                            onClick={e => { setFormi(row.fm_id), setShowModal(true), fet(row.fm_id), setPrintm(true) }}
                        >
                            <svg className="w-6 h-6 text-white  dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fillRule="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                            </svg>
                        </button>
                        {bcanc}
                    </div>)
            }
            ,

        },
    ];

    const fetchData2 = async (val) => {
        setLoading(true);

        if (val) {
            var url = `${process.env.NEXT_PUBLIC_APP_API}/report?hospital=${localStorage.getItem("id")}&page=${page}&per_page=${perPage}`
            var ex = `${process.env.NEXT_PUBLIC_APP_API}/excel2?hospital=${localStorage.getItem("id")}`
        }
        else {
            var url = `${process.env.NEXT_PUBLIC_APP_API}/report?page=${page}&per_page=${perPage}`
            var ex = `${process.env.NEXT_PUBLIC_APP_API}/excel2`
        }

        const response = await axios.get(url);

        setFurl(ex)
        setData(response.data.data);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const fetchData = async (val) => {
        setLoading(true);

        if (val) {
            var url = `${process.env.NEXT_PUBLIC_APP_API}/report?hospital=${localStorage.getItem("id")}&page=${page}&per_page=${perPage}`
            var ex = `${process.env.NEXT_PUBLIC_APP_API}/excel2?hospital=${localStorage.getItem("id")}`
            if (statusc) {
                url += `&status=${statusc}`
                ex += `&status=${statusc}`
            }
            if (start) {
                url += `&between1=${start}`
                ex += `&between1=${start}`
            }
            if (end) {
                url += `&between2=${end}`
                ex += `&between2=${end}`
            }
            if (search) {
                url += `&search=${search}`
                ex += `&search=${search}`
            }
            if (sortColumn) {
                url += `&sort_column=${sortColumn}&sort_direction=${sortDirection}`
                ex += `&sort_column=${sortColumn}&sort_direction=${sortDirection}`
            }

        }
        else {
            var url = `${process.env.NEXT_PUBLIC_APP_API}/report?page=${page}&per_page=${perPage}`
            var ex = `${process.env.NEXT_PUBLIC_APP_API}/excel2?`
            if (hosp) {
                url += `&hospital=${hosp}`
                ex += `&hospital=${hosp}`
            }
            if (statusc) {
                url += `&status=${statusc}`
                ex += `&status=${statusc}`
            }
            if (start) {
                url += `&between1=${start}`
                ex += `&between1=${start}`
            }
            if (end) {
                url += `&between2=${end}`
                ex += `&between2=${end}`
            }
            if (search) {
                url += `&search=${search}`
                ex += `&search=${search}`
            }
            if (sortColumn) {
                url += `&sort_column=${sortColumn}&sort_direction=${sortDirection}`
                ex += `&sort_column=${sortColumn}&sort_direction=${sortDirection}`
            }

        }

        
        const response = await axios.get(url);

        setFurl(ex)
        //console.log(furl)
        setData(response.data.data);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handlePageChange = page => {
        setPage(page)
    };

    const searchChange = (event) => {
        setSearch(event.target.value)
    }

    const hospChange = (event) => {
        setHosp(event.target.value)
    }

    const statuscChange = (event) => {
        setStatusc(event.target.value)
    }

    const startChange = (event) => {
        setStart(event.target.value)
    }

    const endChange = (event) => {
        setEnd(event.target.value)
    }

    const onSearch = (event) => {
        event.preventDefault();
        fetchData();
    }

    const onSearch2 = (event) => {
        event.preventDefault();
        fetchData(1);
    }

    const handleSort = (column, sortDirection) => {
        setSortColumn(column.col);
        setSortDirection(sortDirection);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        setPerPage(newPerPage);

    };


    const fet = (val) => {
        fetch(process.env.NEXT_PUBLIC_APP_API + "/form2/" + val)
            .then(res => res.json())
            .then(result => {
                setSelect(result);
            })
    }


    const excal = () => {
        window.open(process.env.NEXT_PUBLIC_APP_API + "/excal2/" + localStorage.getItem("id"))
    }

    const excel = () => {
        window.open(furl)
    }

    const edit = (fm) => {
        const jsonedit = {
            "date": document.getElementById("1").value,
            "dateres": document.getElementById("2").value,
            "sitizen": document.getElementById("3").value,
            "fname": document.getElementById("4").value,
            "lname": document.getElementById("5").value,
            "age": document.getElementById("6").value,
            "num": document.getElementById("7").value,
            "streed": document.getElementById("8").value,
            "subdistrict": document.getElementById("9").value,
            "disv1": document.getElementById("10").value,
            "province": document.getElementById("11").value,
            "zip": document.getElementById("12").value,
            "call": document.getElementById("13").value,
            "editer": document.getElementById("14").value
        }

        fetch(process.env.NEXT_PUBLIC_APP_API + "/edit/" + fm, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonedit)
        })
            .then(res => res.json())
            .then(result => {

                //console.log(result)
                if (result.status === "ok") {
                    // document.getElementById("editda").disabled = true
                    alert("แก้ไขข้อมูลแล้ว")
                    router.push("/manage", { scroll: false });
                    window.location = "/manage"
                } else {
                    alert("ใส่ข้อมูลให้ครบ")
                }
            })

    }

    const dissend = (cr) => {

        const send = {
            "dis": document.getElementById("distancee").value,
            "cs": document.getElementById("cstarte").value,
            "ce": document.getElementById("cende").value
        }

        fetch(process.env.NEXT_PUBLIC_APP_API + "/statu2/edit/" + cr, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(send)
        })
            .then(res => res.json())
            .then(result => {

                //console.log(result)
                if (result.status === "ok") {
                    // document.getElementById("editda").disabled = true
                    alert("เพิ่มข้อมูลแล้ว")
                    router.push("/manage", { scroll: false });
                    window.location = "/manage"
                } else {
                    alert("ใส่ข้อมูลให้ครบ")
                }
            })

    }

    const clanc = (fm) => {

        var cance = document.querySelector('input[name="cance"]:checked').value

        if (document.getElementById("cance4").checked === true) {
            cance = document.getElementById("des").value
        }

        const jsondata = {
            "us_id": localStorage.getItem("id"),
            "fm_id": fm,
            "distance": 0,
            "cstart": "00:00:00",
            "cend": "00:00:00",
            "cm_status": 0,
            "cm_date": t,
            "des": cance
        }

        fetch(process.env.NEXT_PUBLIC_APP_API + "/status2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsondata)
        })
            .then(res => res.json())
            .then(result => {
                //console.log(result)
                if (result.status === "ok") {
                    document.getElementById("redc").disabled = true
                    router.push("/manage", { scroll: false });
                    window.location = "/manage"
                }
            })


    }

    const checkc = (des, val) => {
        setTimeout(() => {
            if (val) {
                document.getElementById("resc").hidden = true
                document.getElementById("formcone").hidden = false
            } else {
                document.getElementById("resc").hidden = false
                document.getElementById("formcone").hidden = true
            }

            //document.getElementById("resc").hidden = false

            //document.getElementById("subc").hidden = true
            document.getElementById("des").value = des
            document.getElementById("des").readOnly = true

        }, 10);
    }

    const submitcar = (fm) => {

        const jsondata = {
            "us_id": localStorage.getItem("id"),
            "fm_id": fm,
            "distance": document.getElementById("distance").value,
            "cstart": document.getElementById("cstart").value,
            "cend": document.getElementById("cend").value,
            "cm_status": 1,
            "cm_date": t,
            "des": ""
        }

        fetch(process.env.NEXT_PUBLIC_APP_API + "/status2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsondata)
        })
            .then(res => res.json())
            .then(result => {

                //console.log(result)
                if (result.status === "ok") {
                    document.getElementById("gres").disabled = true
                    router.push("/manage", { scroll: false });
                    window.location = "/manage"
                } else {
                    alert("ใส่ข้อมูลให้ครบ")
                }
            })
    }

    const qry = (val) => {
        if (val === 14) {
            setSearch("");
            setHosp("");
            setStatusc("");
            setStart("");
            setEnd("");
            document.getElementById("strt").value = ""
            document.getElementById("seid").value = ""
            document.getElementById("dst").value = ""
            document.getElementById("den").value = ""
            document.getElementById("selecthos").value = 14
            
            fetchData2();
        } else {
            setSearch("");
            setHosp(localStorage.getItem("id"));
            setStatusc("");
            setStart("");
            setEnd("");
            document.getElementById("strt").value = ""
            document.getElementById("seid").value = ""
            document.getElementById("dst").value = ""
            document.getElementById("den").value = ""
            fetchData2(1);
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

    function formatDate(inputDate) {
        const date = new Date(inputDate);

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;

        return formattedDate;
    }

    useEffect(() => {
        if (localStorage.getItem("id") === "14") {
            setAdmin(true);
            fetchData();
            fetch(process.env.NEXT_PUBLIC_APP_API + "/form2")
                .then(res => res.json())
                .then(result => {
                    setForm(result);
                });
            
        } else {
            setAdmin(false);
            fetchData(1);
            fetch(process.env.NEXT_PUBLIC_APP_API + "/form2/users/" + localStorage.getItem("id"))
                .then(res => res.json())
                .then(result => {
                    setForm(result);
                });
        };

        fetch(process.env.NEXT_PUBLIC_APP_API + "/hospital2")
            .then(res => res.json())
            .then(result => {
                setHos(result);
            });

    }, [page, perPage, sortColumn, sortDirection]);
    return (
        <>
            <div>
                <div className=' print:hidden'>
                    <div className="m-6 p-2 text-center">
                        <br />
                        <p className="text-3xl">จัดการข้อมูลการจองรถ</p>

                        <br />
                        <br />
                        <button onClick={e => excal()} className='bg-green-700 text-white p-2 rounded-lg mr-5'>Download ข้อมูลทั้งหมด</button>
                        {/* <button className='bg-red-700 text-white p-2 rounded-lg'>Dowload ไฟล์ PDF</button> */}

                    </div>

                    {admin ? (
                        <>

                            <div className="m-6 border border-black rounded-3xl ">
                                <form onSubmit={onSearch}>
                                    <div className="grid gap-6 mb-6 md:grid-cols-4 pl-6 pr-6 mt-6">

                                        <div>
                                            <label>ค้นหา: </label><input id='seid' type="text" defaultValue={search} onChange={searchChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                        <div>
                                            <label>เลือกโรงพยาบาล: </label>
                                            <select id='selecthos' defaultValue={hosp} onChange={hospChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' >
                                                <option value={14}>ทุกโรงพยาบาล</option>
                                                {hos.map(h => (
                                                    <option key={h.hos_id} value={h.hos_id}>{h.hos_name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label>สถานะดำเนินการ: </label>
                                            <select name="strt" id="strt" defaultValue={statusc} onChange={statuscChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option value="">สถานะทั้งหมด</option>
                                                <option value="null">รอดำเนินการ</option>
                                                <option value="1">สำเร็จ</option>
                                                <option value="0">ยกเลิก</option>
                                            </select>
                                        </div>

                                        
                                        <div>
                                            <label>&nbsp; </label><button type="button" onClick={e => {qry(14)}} className="bg-[#7BC634] border text-white border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">คืนค่าเริ่มต้น</button>
                                        </div>

                                    </div>

                                    <hr className="h-px mx-auto my-8 bg-black border-0 dark:bg-gray-700 w-[90%] mb-6" />


                                    <div className="grid gap-6 mb-6 md:grid-cols-4 pl-6 pr-6 mt-6">

                                        <div>
                                            <label>วันที่จองหลัง: </label><input id='dst' type="date" defaultValue={start} onChange={startChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                        <div>
                                            <label>วันที่จองก่อน: </label><input id='den' type="date" defaultValue={end} onChange={endChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                        <div>
                                            <label>&nbsp; </label><button type='submit' className="bg-blue-500 border text-white border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">ค้นหา</button>
                                        </div>
                                        
                                        <div>
                                        <br />
                                        <button type='button' onClick={e => excel()} className='bg-[#006A33] text-white p-2 rounded-lg mr-5'>EXCEL</button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </>
                    ) : <>

                    <div className="m-6 border border-black rounded-3xl ">
                        <form onSubmit={onSearch2}>
                            <div className="grid gap-6 mb-6 md:grid-cols-4 pl-6 pr-6 mt-6">

                                <div>
                                    <label>ค้นหา: </label><input id='seid' type="text" defaultValue={search} onChange={searchChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                
                                <div>
                                    <label>สถานะดำเนินการ: </label>
                                    <select name="strt" id="strt" defaultValue={statusc} onChange={statuscChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="">สถานะทั้งหมด</option>
                                        <option value="null">รอดำเนินการ</option>
                                        <option value="1">สำเร็จ</option>
                                        <option value="0">ยกเลิก</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label>&nbsp; </label><button type="button" onClick={e => {qry()}} className="bg-[#7BC634] border text-white border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">คืนค่าเริ่มต้น</button>
                                </div>

                            </div>

                            <hr className="h-px mx-auto my-8 bg-black border-0 dark:bg-gray-700 w-[90%] mb-6" />


                            <div className="grid gap-6 mb-6 md:grid-cols-4 pl-6 pr-6 mt-6">

                                <div>
                                    <label>วันที่จองหลัง: </label><input id='dst' type="date" defaultValue={start} onChange={startChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                <div>
                                    <label>วันที่จองก่อน: </label><input id='den' type="date" defaultValue={end} onChange={endChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                <div>
                                    <label>&nbsp; </label><button type='submit' className="bg-blue-500 border text-white border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">ค้นหา</button>
                                </div>
                               

                                <div>
                                        <br />
                                        <button type='button' onClick={e => excel()} className='bg-[#006A33] text-white p-2 rounded-lg mr-5'>EXCEL</button>
                                        </div>

                            </div>
                        </form>
                    </div>
                </>}



                    {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg">


                        <table hidden className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr className="bg-green-200">
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
                                            id='editt'
                                            className=' bg-[#ff4000] text-white p-2 rounded-lg m-1'
                                            type="button"
                                            onClick={e => { setFormi(f.fm_id), setShowModal3(true), fet(f.fm_id) }}
                                        >
                                            <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fillRule="currentColor" viewBox="0 0 24 24">
                                                <path d="M14 4.2a4.1 4.1 0 0 1 5.8 0 4 4 0 0 1 0 5.7l-1.3 1.3-5.8-5.7L14 4.2Zm-2.7 2.7-5.1 5.2 2.2 2.2 5-5.2-2.1-2.2ZM5 14l-2 5.8c0 .3 0 .7.3 1 .3.3.7.4 1 .2l6-1.9L5 13.8Zm7 4 5-5.2-2.1-2.2-5.1 5.2 2.2 2.1Z" fillRule="evenodd" />
                                            </svg>

                                        </button>
                                    }
                                    else if (f.status === 1) {
                                        st = <p className=' text-green-600 font-bold'>สำเร็จ</p>
                                        if (f.distance === 0) {
                                            bcanc = <button
                                                id='canc'
                                                className=' bg-green-400 text-white p-2 rounded-lg m-1'
                                                type="button"
                                                onClick={e => { setCri(f.cm_id), setShowModal2(true), fet(f.fm_id), checkc(f.des, 1) }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                                </svg>

                                            </button>
                                        }
                                    }
                                    else if (f.status === 0) {
                                        st = <p className=' text-red-600 font-bold' >ยกเลิก</p>
                                        bcanc = <button
                                            id='canc'
                                            className=' bg-orange-400 text-white p-2 rounded-lg m-1'
                                            type="button"
                                            onClick={e => { setFormi(f.fm_id), setShowModal2(true), fet(f.fm_id), checkc(f.des) }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                            </svg>

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
                                                    className=' bg-blue-600 text-white p-2 rounded-lg m-1'
                                                    type="button"
                                                    onClick={e => { setFormi(f.fm_id), setShowModal(true), fet(f.fm_id), setPrintm(true) }}
                                                >
                                                    <svg className="w-6 h-6 text-white  dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fillRule="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                                                    </svg>
                                                </button>

                                                {bcanc}
                                            </td>
                                        </tr>

                                    )
                                })}

                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="6" className="text-right p-2">
                                        <label>หน้าที่: </label>
                                        <input type="number" defaultValue={1} className="w-12 border border-black rounded m-2 p-1" />
                                        <label htmlFor="">แสดงข้อมูล: </label>
                                        <input type="number" defaultValue={25} className="w-12 border border-black rounded m-2 p-1" />
                                        <label htmlFor=""> แถว</label>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div> */}
                </div>


                <div className='relative overflow-x-auto shadow-md sm:rounded-lg print:hidden'>
                    <DataTable
                        title="ข้อมูลการขอใช้รถ"
                        columns={columns}
                        data={data}
                        progressPending={loading}
                        pagination
                        paginationServer
                        paginationTotalRows={totalRows}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePageChange}
                        onSort={handleSort}
                    />

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


                                        <div id="formcon" hidden>

                                            <div className='p-2 rounded-lg border border-gray-200 dark:border-gray-700'>
                                                <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white text-center">สามาถรถดำเนินการได้ </label>
                                                <br />
                                                <form>
                                                    <div className="text-center grid gap-6 md:grid-cols-1">

                                                        <div>เวลาที่ออกรถ: <input id="cstart" type="time" className="border rounded-md border-black pl-2" required /></div>

                                                        <div>เวลากลับ: <input id="cend" type="time" className="border rounded-md border-black pl-2" required /></div>

                                                        <div>ระยะทาง(กม.): <input id="distance" type="number" className="w-[50px] border rounded-md border-black pl-2" required /></div>

                                                    </div>
                                                    <br />
                                                    <br />
                                                    <div className="text-center">

                                                        <button
                                                            id="gres2"
                                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="submit"
                                                            onClick={() => { submitcar(formi), setPrintm(false) }}
                                                        >
                                                            ดำเนินการสำเร็จ
                                                        </button>

                                                    </div>

                                                </form>
                                            </div>

                                            <hr className="h-px mx-auto my-8 bg-black border-0 dark:bg-gray-700 w-[90%] mb-6" />
                                            <br />
                                        </div>

                                        {select.map(f => {
                                            var date = String(f.date).split("T")[0]
                                            var time = (String(f.date).split("T")[1]).split(".")[0]
                                            var dateres = String(f.dateres).split("T")[0]
                                            var timeres = (String(f.dateres).split("T")[1]).split(".")[0]
                                            var co = (String(f.condition).replaceAll("-", " "))
                                            var co1 = String(co.split(", ")).replaceAll(", ", "")

                                            if (f.status === null) {
                                                setTimeout(() => {
                                                    //document.getElementById("subm").hidden = false
                                                    document.getElementById("formcancle").hidden = false
                                                    document.getElementById("formcon").hidden = false

                                                }, 200);
                                            }
                                            else if (f.status === 1 || f.status === 0) {
                                                setTimeout(() => {
                                                    //document.getElementById("subm").hidden = true
                                                    document.getElementById("formcancle").hidden = true
                                                    document.getElementById("formcon").hidden = true
                                                }, 200);
                                            }

                                            return (

                                                <div key={f.fm_id} className="grid gap-6 md:grid-cols-2 pl-6 pr-6">
                                                    โรงพยาบาลที่ให้บริการ: <input type="text" className='pl-2 pr-2 border-b-2 border-black' readOnly value={f.hos_name} />
                                                    วัน/เดือน/ปี ที่จอง: <input type="text" className='pl-2 pr-2 border-b-2 border-black' readOnly value={"วันที่ " + date + " เวลา " + time} />
                                                    เลขบัตรประชาชน: <input type="text" className='pl-2 pr-2 border-b-2 border-black' readOnly value={f.citizen} />
                                                    คำนำหน้า: <input type="text" className='pl-2 pr-2 border-b-2 border-black' readOnly value={f.pre_name} />
                                                    ชื่อ: <input type="text" className='pl-2 pr-2 border-b-2 border-black' readOnly value={f.fname} />
                                                    นามสกุล: <input type="text" className='pl-2 pr-2 border-b-2 border-black' readOnly value={f.lname} />
                                                    อายุ(ปี): <input type="text" className='pl-2 pr-2 border-b-2 border-black' readOnly value={f.age} />
                                                    เลขที่: <input type="text" className='pl-2 pr-2 border-b-2 border-black' readOnly value={f.house} />
                                                    ถนน: <input type="text" className='pl-2 pr-2 border-b-2 border-black' readOnly value={f.street} />
                                                    แขวง: <input type="text" className='pl-2 pr-2 border-b-2 border-black' readOnly value={f.subdis} />
                                                    เขต: <input type="text" className='pl-2 pr-2 border-b-2 border-black' readOnly value={f.district01} />
                                                    จังหวัด: <input type="text" className='pl-2 pr-2 border-b-2 border-black' readOnly value={f.province} />
                                                    รหัสไปรษณีย์: <input type="text" className='pl-2 pr-2 border-b-2 border-black' readOnly value={f.zipcode} />
                                                    เบอร์โทรศัพท์: <input type="text" className='pl-2 pr-2 border-b-2 border-black' readOnly value={f.call} />
                                                    วัน/เดือน/ปี ที่ขอใช้รถ: <input type="text" className='pl-2 pr-2 border-b-2 border-black' readOnly value={"วันที่ " + dateres + " เวลา " + timeres} />
                                                    สถานที่รับ-ส่ง: <input type="text" className='pl-2 pr-2 border-b-2 border-black' readOnly value={f.met_name} />
                                                    สถานที่ต้นทาง: <input type="text" className='pl-2 pr-2 border-b-2 border-black' readOnly value={String(f.start)} />
                                                    สถานที่ปลายทาง: <input type="text" className='pl-2 pr-2 border-b-2 border-black' readOnly value={String(f.end)} />
                                                    เงื่อนไขในการขอรับบริการ: <input type="text" className='pl-2 pr-2 border-b-2 border-black' readOnly value={co1} />
                                                    ชื่อ - นามสกุล ผู้ส่งข้อมูล: <input type="text" className='pl-2 pr-2 border-b-2 border-black' readOnly value={f.editer} />
                                                </div>
                                            )
                                        })}
                                        <br />
                                        <br />
                                        <div id="formcancle" hidden>
                                            <hr className="h-px mx-auto my-8 bg-black border-0 dark:bg-gray-700 w-[90%] mb-6" />
                                            <br />
                                            <div className='text-center p-2 rounded-lg border border-gray-200 dark:border-gray-700'>
                                                <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white text-center">ยกเลิกนัดหมายเนื่องจาก </label>
                                                <br />
                                                <form>
                                                    <div>
                                                        <input type="radio" defaultChecked id="cance1" onClick={e => cancalf()} name="cance" value="ผู้ป่วยยกเลิกนัด" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label className='ml-2 mr-4'>: ผู้ป่วยยกเลิกนัด</label>
                                                        <input type="radio" id="cance2" name="cance" onClick={e => cancalf()} value="ยกเลิกนัด รถไม่พร้อม" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label className='ml-2 mr-2'>: ยกเลิกนัด รถไม่พร้อม</label><br />
                                                        <input type="radio" id="cance3" name="cance" onClick={e => cancalf()} value="ยกเลิกนัด รถไม่เพียงพอ" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label className='ml-2 mr-2'>: ยกเลิกนัด รถไม่เพียงพอ</label>
                                                        <input type="radio" id="cance4" name="cance" value="4" onClick={e => cancalf(1)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label className='ml-2 mr-2'>: อื่นๆ ระบุ</label>
                                                        <input type="text" id="des" className="border pl-2 pr-2 rounded" placeholder="" disabled />
                                                    </div>
                                                    <br />
                                                    <br />
                                                    <div>

                                                        <button
                                                            id="redc"
                                                            className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                            onClick={() => { clanc(formi), setPrintm(false) }}
                                                        >
                                                            ยกเลิกนัดหมาย
                                                        </button>

                                                    </div>

                                                </form>
                                            </div>
                                        </div>

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
                                        {/* <button
                                            id='subm'
                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => { submitcar(formi), setShowModal(false), setPrintm(false) }}
                                        >
                                            ดำเนินการสำเร็จ
                                        </button> */}
                                        <button
                                            className=" bg-blue-600 text-white active:bg-blue-600 disabled:bg-blue-300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => { window.print() }}

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
                                            หมายเหตุ
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

                                            {/* <div id="viwec">
                                                <input type="radio" defaultChecked id="cance1" onClick={e => cancalf()} name="cance" value="ผู้ป่วยยกเลิกนัด" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label className='ml-2 mr-4'>: ผู้ป่วยยกเลิกนัด</label>
                                                <input type="radio" id="cance2" name="cance" onClick={e => cancalf()} value="ยกเลิกนัด รถไม่พร้อม" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label className='ml-2 mr-2'>: ยกเลิกนัด รถไม่พร้อม</label><br />
                                                <input type="radio" id="cance3" name="cance" onClick={e => cancalf()} value="ยกเลิกนัด รถไม่เพียงพอ" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label className='ml-2 mr-2'>: ยกเลิกนัด รถไม่เพียงพอ</label>
                                                <input type="radio" id="cance4" name="cance" value="4" onClick={e => cancalf(1)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label className='ml-2 mr-2'>: อื่นๆ ระบุ</label>
                                            </div> */}

                                            <div id="formcone" hidden>


                                                <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white text-center">สามาถรถดำเนินการได้ </label>
                                                <br />
                                                <form>
                                                    <div className="text-center grid gap-6 md:grid-cols-1">

                                                        <div>เวลาที่ออกรถ: <input id="cstarte" type="time" className="border rounded-md border-black pl-2" required /></div>

                                                        <div>เวลากลับ: <input id="cende" type="time" className="border rounded-md border-black pl-2" required /></div>

                                                        <div>ระยะทาง(กม.): <input id="distancee" type="number" className="w-[50px] border rounded-md border-black pl-2" required /></div>

                                                    </div>
                                                    <br />
                                                    <br />
                                                    <div className="text-center">

                                                        <button

                                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="submit"
                                                            onClick={() => { dissend(cri) }}
                                                        >
                                                            เพิ่มข้อมูล
                                                        </button>

                                                    </div>

                                                </form>



                                            </div>

                                            <div id="resc" hidden>
                                                <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white text-center">ยกเลิกนัดหมายเนื่องจาก </label>
                                                <br />
                                                <input type="text" id="des" className="text-center text-orange-600 border p-2 m-2 rounded w-[70%]" placeholder="" disabled />
                                            </div>
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
                                        {/* <button
                                            id='subc'
                                            className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => { clanc(formi) }}
                                        >
                                            ยกเลิกนัดหมาย
                                        </button> */}

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>

                    </>
                ) : null}


                {showModal3 ? (
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
                                            แก้ไขข้อมูลการจอง
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => { setShowModal3(false), setPrintm(false) }}
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
                                                    document.getElementById("editda").hidden = false
                                                }, 200);
                                            }
                                            else if (f.status === 1 || f.status === 0) {
                                                setTimeout(() => {
                                                    document.getElementById("editda").hidden = true
                                                }, 200);
                                            }

                                            return (

                                                <div key={f.fm_id} className="grid gap-6 md:grid-cols-2 pl-6 pr-6">
                                                    {/* โรงพยาบาลที่ให้บริการ: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.hos_name} /> */}
                                                    วัน/เดือน/ปี ที่จอง: <input type="text" className='pl-2 pr-2 rounded-lg border border-black read-only:text-red-700 ' readOnly value={"วันที่ " + date + " เวลา " + time} />
                                                    แก้ไขวันที่จอง: <input id="1" type="datetime-local" className='pl-2 pr-2 rounded-lg border border-black' />
                                                    วัน/เดือน/ปี ที่ขอใช้รถ: <input type="text" className='pl-2 pr-2 rounded-lg border border-black read-only:text-red-700' readOnly value={"วันที่ " + dateres + " เวลา " + timeres} />
                                                    แก้ไขวันที่ขอใช้รถ: <input id="2" type="datetime-local" className='pl-2 pr-2 rounded-lg border border-black' />
                                                    เลขบัตรประชาชน: <input id="3" type="text" className='pl-2 pr-2 rounded-lg border border-black' defaultValue={f.citizen} />
                                                    {/* คำนำหน้า: <input id="4" type="text" className='pl-2 pr-2 rounded-lg border border-black' defaultValue={f.pre_name} /> */}
                                                    ชื่อ: <input id="4" type="text" className='pl-2 pr-2 rounded-lg border border-black' defaultValue={f.fname} />
                                                    นามสกุล: <input id="5" type="text" className='pl-2 pr-2 rounded-lg border border-black' defaultValue={f.lname} />
                                                    อายุ(ปี): <input id="6" type="text" className='pl-2 pr-2 rounded-lg border border-black' defaultValue={f.age} />
                                                    เลขที่: <input id="7" type="text" className='pl-2 pr-2 rounded-lg border border-black' defaultValue={f.house} />
                                                    ถนน: <input id="8" type="text" className='pl-2 pr-2 rounded-lg border border-black' defaultValue={f.street} />
                                                    แขวง: <input id="9" type="text" className='pl-2 pr-2 rounded-lg border border-black' defaultValue={f.subdis} />
                                                    เขต: <input id="10" type="text" className='pl-2 pr-2 rounded-lg border border-black' defaultValue={f.district01} />
                                                    จังหวัด: <input id="11" type="text" className='pl-2 pr-2 rounded-lg border border-black' defaultValue={f.province} />
                                                    รหัสไปรษณีย์: <input id="12" type="text" className='pl-2 pr-2 rounded-lg border border-black' defaultValue={f.zipcode} />
                                                    เบอร์โทรศัพท์: <input id="13" type="text" className='pl-2 pr-2 rounded-lg border border-black' defaultValue={f.call} />
                                                    {/* สถานที่รับ-ส่ง: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={f.met_name} /> */}
                                                    {/* สถานที่ต้นทาง: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' defaultValue={(f.start)} /> */}
                                                    {/* สถานที่ปลายทาง: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' defaultValue={(f.end)} /> */}
                                                    {/* เงื่อนไขในการขอรับบริการ: <input type="text" className='pl-2 pr-2 rounded-lg border border-black' readOnly value={co1} /> */}
                                                    ชื่อ - นามสกุล ผู้ส่งข้อมูล: <input id="14" type="text" className='pl-2 pr-2 rounded-lg border border-black' defaultValue={f.editer} />
                                                </div>
                                            )
                                        })}

                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => (setShowModal3(false))}
                                        >
                                            ปิด
                                        </button>
                                        <button
                                            id='editda'
                                            className="bg-[#ff4000] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => { edit(formi), setShowModal3(false) }}
                                        >
                                            แก้ไขข้อมูล
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
                    <div className='mt-[-100px] print:block hidden text-[16pt] font-TH pt-6 pl-12 pr-12'>

                        {select.map(f => {
                            // var date = String(f.date).split("T")[0]
                            var date = formatDate(f.date)
                            var time2 = (String(f.date).split("T")[1]).split(".")[0]
                            var time = time2.split(":")[0] + ":" + time2.split(":")[1]
                            // var dateres = String(f.dateres).split("T")[0]
                            var dateres = formatDate(f.dateres)
                            var timeres2 = (String(f.dateres).split("T")[1]).split(".")[0]
                            var timeres = timeres2.split(":")[0] + ":" + timeres2.split(":")[1]


                            return (

                                <div key={f.fm_id}>
                                    <div className="text-center">
                                        <label className="font-bold">รายงานการขอใช้งานรถรับ-ส่งคนพิการและผู้สูงอายุ</label><br />
                                        <label className="font-bold">{f.hos_name}</label>
                                    </div>
                                    <br />
                                    <label className="font-bold">วัน/เดือน/ปี ที่จอง:</label> <label className='pl-2 pr-2 '>วันที {date} เวลา {time} น.</label><br />
                                    {/* <label className="font-bold">เลขบัตรประชาชน:</label> <label className='pl-2 pr-2 '>{f.citizen}</label> */}
                                    {/* คำนำหน้า: <label className='pl-2 pr-2 '>{f.pre_name}</label> */}
                                    <label className="font-bold">ชื่อ:</label> <label className='pl-2 pr-2 '>{f.pre_name}{f.fname} {f.lname}</label>
                                    {/* นามสกุล: <label className='pl-2 pr-2 '>{f.lname}</label> */}
                                    <label className="font-bold">อายุ:</label> <label className='pl-2 pr-2 '>{f.age}</label> <label className="font-bold">ปี</label><br />
                                    <label className="font-bold">เลขที่:</label> <label className='pl-2 pr-2 '>{f.house}</label>
                                    <label className="font-bold">ถนน:</label> <label className='pl-2 pr-2 '>{f.street}</label>
                                    <label className="font-bold">แขวง:</label> <label className='pl-2 pr-2 '>{f.subdis}</label>
                                    <label className="font-bold">เขต:</label> <label className='pl-2 pr-2 '>{f.district01}</label><br />
                                    <label className="font-bold">จังหวัด:</label> <label className='pl-2 pr-2 '>{f.province}</label>
                                    <label className="font-bold">รหัสไปรษณีย์:</label> <label className='pl-2 pr-2 '>{f.zipcode}</label>
                                    <label className="font-bold">เบอร์โทรศัพท์:</label> <label className='pl-2 pr-2 '>{f.call}</label><br />
                                    <label className="font-bold">วัน/เดือน/ปี ที่ขอใช้รถ:</label> <label className='pl-2 pr-2 '>วันที {dateres} เวลา {timeres} น.</label><br />
                                    <label className="font-bold">สถานที่รับ-ส่ง:</label> <label className='pl-2 pr-2 '>{f.met_name}</label><br />
                                    <label className="font-bold">สถานที่ต้นทาง:</label> <label className='pl-2 pr-2 '>{f.start}</label><br />
                                    <label className="font-bold">สถานที่ปลายทาง:</label> <label className='pl-2 pr-2 '>{f.end}</label><br />
                                    <label className="font-bold">เงื่อนไขในการขอรับบริการ:</label> <label className='pl-2 pr-2 '>{String(f.condition).split(", -")}</label><br />
                                    <label className="font-bold">ผู้ส่งข้อมูล:</label> <label className='pl-2 pr-2 '>{f.editer}</label>
                                    {/* สถานะ: <label className='pl-2 pr-2 '>{f.status}</label> */}
                                </div>

                            )
                        })}

                        <br />
                        <label className="font-bold">แผนที่:</label>
                        <br />
                        <div className="border border-black p-10">
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                        </div>
                        <br />
                        <br />
                        <label className="font-bold">หมายเลขทะเบียน: </label>.....................................
                        <br />
                        <br />
                        <label className="font-bold">พนักงานขับรถ: </label>...................................................

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
