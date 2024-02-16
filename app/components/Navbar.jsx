"use client"
import React, { useEffect, useState } from 'react'
import Link from "next/link"
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai"

export default function Navbar() {
    const [menuIcon, setIcon] = useState(false)

    var profile

    const handleSCN = () => {
        setIcon(!menuIcon)
    }
    const handleLogout = () => {
        localStorage.removeItem("id");
        localStorage.removeItem("name");
        localStorage.removeItem("department");
        localStorage.removeItem("token");
        window.location = "/";
    }

    

    useEffect(() => {
        if (localStorage.getItem("token")) {
            document.getElementById("login").hidden = true
            document.getElementById("logout").hidden = false
            document.getElementById("login2").hidden = true
            document.getElementById("logout2").hidden = false
            document.getElementById("profile").hidden = false
            document.getElementById("profile2").hidden = false
            setTimeout(() => {
                profile = localStorage.getItem("department")
                document.getElementById("profile").value = profile
                document.getElementById("profile2").value = profile
            }, 100);
        }
        else {
            document.getElementById("logout").hidden = true
            document.getElementById("login").hidden = false
            document.getElementById("login2").hidden = false
            document.getElementById("logout2").hidden = true
            document.getElementById("profile").hidden = true
            document.getElementById("profile2").hidden = true
        }
    }, []);
    return (
        <header className='bg-[#23973c] text-[#ff0b0b] w-full ease-in duration-300 fixed top-0 left-0 z-10'>
            <nav className='p-4 items-center justify-between max-w-[1366px] mx-auto h-[100px] flex'>
                <div>
                    <Link href={"/"} onClick={handleSCN}>
                        <span className=' font-extrabold text-3xl md:text-2xl xl:text-3xl uppercase'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-16">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                            </svg>

                        </span>
                    </Link>
                </div>

                <ul className='hidden md:flex uppercase font-semibold text-1xl lg:text-[20px] text-slate-800'>

                    <li className=' mr-4 lg:mr-8 hover:text-[#ceff00]'>
                        <Link href={"/"}>หน้าแรก</Link>
                    </li>
                    <li className=' mr-4 lg:mr-8 hover:text-[#ceff00]'>
                        <Link href={"/about"}>ลงทะเบียนขอใช้รถ</Link>
                    </li>
                    <li className=' mr-4 lg:mr-8 hover:text-[#ceff00]'>
                        <Link href={"/manage"}>จัดการข้อมูลขอใช้รถ</Link>
                    </li>
                    <li className='  hover:text-[#ceff00]'>
                        <Link href={"/contact"}></Link>
                    </li>

                </ul>

                <div className='hidden md:flex'>
                    <div className=' flex '>
                        <div className=' mr-4'>
                            <input type='text' value={profile} readOnly id='profile' className='text-center bg-[#5fb4ff] border-2 border-[#87827b] text-black rounded-full uppercase font-bold py-2' hidden/>
                        </div> 
                        <Link href={"/login"}>
                            <button id='login' className=' mr-5 bg-[#06fc47] text-slate-800 hover:bg-slate-800 hover:text-[#dec] rounded-full uppercase font-bold px-8 py-2' hidden>เข้าสู่ระบบ</button>
                        </Link>
                        <Link href={"/"}>
                            <button id='logout' onClick={e => handleLogout()} className='bg-[#ff3131] border-2 border-[#87827b] text-black rounded-full uppercase font-bold px-8 py-2' hidden>ออกจากระบบ</button>
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

                            <li onClick={handleSCN} className=' py-5 hover:text-[#cefd] cursor-pointer'>
                                <Link href={"/about"}>ลงทะเบียนขอใช้รถ</Link>
                            </li>

                            <li onClick={handleSCN} className=' py-5 hover:text-[#cefd] cursor-pointer'>
                                <Link href={"/manage"}>จัดการข้อมูลขอใช้รถ</Link>
                            </li>

                            <li onClick={handleSCN} className=' py-5 hover:text-[#cefd] cursor-pointer'>
                                <Link href={"/contact"}></Link>
                            </li>



                        </ul>

                        <div className='flex flex-col justify-center items-center mt-1'>

                        
                                <input id='profile2' readOnly className=' bg-[#f8ef02dd] text-slate-800 rounded-full uppercase font-bold py-3 w-[250px] mb-5 text-center' hidden value={profile} />
                            

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
