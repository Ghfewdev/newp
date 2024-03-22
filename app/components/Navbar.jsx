"use client"
import React, { useEffect, useState } from 'react'
import Link from "next/link"
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai"
import { useRouter } from 'next/navigation'

export default function Navbar() {
    const router = useRouter();
    const [menuIcon, setIcon] = useState(false)

    const profile = () => {
        var p = localStorage.getItem("department")
        document.getElementById("pf").hidden = false
        return p
    }

    const handleSCN = () => {
        setIcon(!menuIcon)
    }

    const handleLogout = () => {
        localStorage.removeItem("id");
        localStorage.removeItem("name");
        localStorage.removeItem("department");
        localStorage.removeItem("token");
        document.getElementById("pf").hidden = true
        window.location = "/";
        router.push("/", { scroll: false });
        
        
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            document.getElementById("login").hidden = true
            document.getElementById("logout").hidden = false
            document.getElementById("login2").hidden = true
            document.getElementById("logout2").hidden = false
            document.getElementById("profile").hidden = false
            document.getElementById("profile2").hidden = false
            document.getElementById("manage").hidden = false
            document.getElementById("manage2").hidden = false
            document.getElementById("regis").hidden = false
            document.getElementById("regis2").hidden = false
            setTimeout(() => {
                document.getElementById("profile").value = profile()
                document.getElementById("profile2").value = profile()
            }, 300);
        }
        else {
            document.getElementById("logout").hidden = true
            document.getElementById("login").hidden = false
            document.getElementById("login2").hidden = false
            document.getElementById("logout2").hidden = true
            document.getElementById("profile").hidden = true
            document.getElementById("profile2").hidden = true
            document.getElementById("regis").hidden = true
            document.getElementById("regis2").hidden = true
            document.getElementById("manage").hidden = true
            document.getElementById("manage2").hidden = true
        }
    }, []);
    return (
        <header className='bg-[#006A33] text-red-400 w-full ease-in duration-300 fixed top-0 left-0 z-10 print:hidden'>
            <nav className='p-4 items-center justify-between max-w-[1366px] mx-auto h-[100px] flex'>
                <div>
                    <Link href={"/"} onClick={handleSCN}>
                        <img src="https://webportal.bangkok.go.th/user_files/400/155738054265dd9f70558861.05376981.png" alt="home" className="w-16" />
                    </Link>
                </div>

                <ul className='hidden md:flex uppercase font-semibold text-base lg:text-[20px] text-slate-800'>

                    <li className='text-[#FFEA00] mr-4 lg:mr-8 hover:text-[#7BC634]'>
                        <Link href={"/"}>หน้าแรก</Link>
                    </li>
                    <li id='regis' hidden className='text-[#FFEA00] mr-4 lg:mr-8 hover:text-[#7BC634]'>
                        <Link href={"/about"}>ลงทะเบียนขอใช้รถ</Link>
                    </li>
                    <li id='manage' hidden className=' text-[#FFEA00] mr-4 lg:mr-8 hover:text-[#7BC634]'>
                        <Link href={"/manage"}>จัดการข้อมูลขอใช้รถ</Link>
                    </li>
                    {/* <li className='text-[#FFEA00] hover:text-[#7BC634]'>
                        <Link href={"/dashboard"}>Dashboard</Link>
                    </li> */}
                    

                </ul>

                <div className='hidden md:flex'>
                    <div className=' flex '>
                        
                        <div id="pf" hidden><img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="pf" className="w-10 mr-3 " /></div>
                        <div className=' mr-4'>
                            <input type='text' readOnly id='profile' className='text-center bg-[#F0FDF0] border-2 border-[#87827b] text-black rounded-md  uppercase font-bold py-2' hidden />
                        </div>
                        <Link href={"/login"}>
                            <button id='login' className=' mr-5 bg-[#06fc47] text-slate-800 hover:bg-slate-800 hover:text-[#dec] rounded-lg uppercase font-bold px-8 py-2' hidden>เข้าสู่ระบบ</button>
                        </Link>
                        <Link href={"/"}>
                            <button id='logout' onClick={e => handleLogout()} className='bg-[#d43d3d] border-2 border-[#87827b] text-black rounded-lg uppercase font-bold px-2 py-2 hover:bg-blue-400 hover:text-white' hidden>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>

                <div onClick={handleSCN} className='flex md:hidden'>
                    {menuIcon ?
                        (<AiOutlineClose size={25} className="text-[#000]" />)
                        :
                        (<AiOutlineMenu size={25} className="text-[#000]" />)
                    }
                </div>

                <div className={menuIcon ?
                    "md:hidden absolute top-[100px] right-0 bottom-0 left-0 flex justify-center items-center w-full h-screen bg-slate-800 text-white text-center ease-in duration-300"
                    :
                    "md:hidden absolute top-[100px] right-0 left-[-100%] flex justify-center items-center w-full h-screen bg-slate-800 text-white text-center ease-in duration-300"
                }>

                    <div className=' w-full'>

                        <ul className=' uppercase font-bold text-2xl'>

                            <li onClick={handleSCN} className=' py-5 hover:text-[#cefd] cursor-pointer'>
                                <Link href={"/"}>หน้าแรก</Link>
                            </li>

                            <li id='regis2' hidden onClick={handleSCN} className=' py-5 hover:text-[#cefd] cursor-pointer'>
                                <Link href={"/about"}>ลงทะเบียนขอใช้รถ</Link>
                            </li>

                            <li id='manage2' hidden onClick={handleSCN} className=' py-5 hover:text-[#cefd] cursor-pointer'>
                                <Link href={"/manage"}>จัดการข้อมูลขอใช้รถ</Link>
                            </li>

                            {/* <li onClick={handleSCN} className=' py-5 hover:text-[#cefd] cursor-pointer'>
                                <Link href={"/dashboard"}>Dashboard</Link>
                            </li> */}



                        </ul>

                        <div className='flex flex-col justify-center items-center mt-1'>

                            <input id='profile2' readOnly className=' bg-[#f8ef02dd] text-slate-800 rounded-full uppercase font-bold py-3 w-[250px] mb-5 text-center' hidden />

                            <Link href={"/login"} onClick={handleSCN}>
                                <button id='login2' className=' bg-[#f8ef02dd] text-slate-800 rounded-full uppercase font-bold py-3 w-[250px] mb-5' hidden>เข้าสู่ระบบ</button>
                            </Link>

                            <Link href={"/"} onClick={handleSCN}>
                                <button id='logout2' onClick={e => handleLogout()} className=' border-2 text-white rounded-full uppercase font-bold py-3 w-[250px] mb-5' hidden>ออกจากระบบ</button>
                            </Link>

                        </div>

                    </div>

                </div>

            </nav>
        </header>
    )
}
