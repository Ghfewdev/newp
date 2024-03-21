"use client"
import React from 'react'
import Authen from '../components/Authen'

export default function Dashboard() {
    Authen();
    return (
        <>
            <div>
                <p className="font-bold text-center uppercase text-3xl">Dashboard</p>
                <br />
                <p className="text-center text-xl">สำนักงานพัฒนาระบบบริการทางการแพทย์</p>
                <br />
                <p className="text-center text-xl">ที่อยู่: 514 ถนนหลวง เขตป้อมปราบศัตรูพ่าย กรุงเทพมหานคร 10100</p>
                <br />
                <p className="text-center text-xl">โทรศัพท์ : 0-2622-5173 หรือ 0-2220-7505</p>
                <br />
                <p className="text-center text-xl">e-mail : sdmsd.bangkok@gmail.com</p>
            </div>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </>
    )
}
