"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
 


export default function Login() {
    const router = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = {
            "name": event.target.username.value,
            "password": event.target.password.value,
        }
        fetch(process.env.NEXT_PUBLIC_APP_API + "/login2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.status === "ok") {
                    localStorage.setItem("name", result.name);
                    localStorage.setItem("id", result.id);
                    localStorage.setItem("department", result.dep)
                    localStorage.setItem("token", result.token);
                    window.location = "/";
                    router.push('/', { scroll: false })
                    
                } else {
                    alert("รหัสผ่าน หรือ ชื่อผู้ใช้ไม่ถูกต้อง")
                }
            })
    }

    return (
        <>
            <div className='flex justify-center'>
                <div className="w-full mt-[50px] max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">ลงชื่อเข้าใช้งานระบบ</h5>
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ชื่อผู้ใช้งาน</label>
                            <input type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="ใส่ชื่อผู้ใช้งาน" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รหัสผ่าน</label>
                            <input type="password" name="password" id="password" placeholder="ใส่รหัสผ่าน" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-start">
                                {/* <div className="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                </div>
                <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label> */}
                            </div>
                            <a href="/contact" className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">ลืมรหัสผ่าน</a>
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">เข้าสู่ระบบ</button>
                        {/* <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
        </div> */}
                    </form>
                </div>
            </div>
            <br /><br /><br /><br /><br />
        </>
    )
}
