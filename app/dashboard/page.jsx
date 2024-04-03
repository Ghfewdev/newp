"use client"
import React from 'react'
import Authen from '../components/Authen'

export default function Dashboard() {
    Authen();
    return (
        <>
            <div className="grid grid-cols-9 col-start-3">
            {/* <iframe className='w-full' height="570px" src="https://lookerstudio.google.com/embed/reporting/663f62f3-ecf5-415c-a19c-92d7121fb6f6/page/p_owf82yhpfd" frameBorder="1" allowFullScreen /> */}
            <div className='lg:col-start-3 md:col-start-1'><iframe height="570px" width="800px" src="https://lookerstudio.google.com/embed/reporting/663f62f3-ecf5-415c-a19c-92d7121fb6f6/page/p_owf82yhpfd" frameBorder="1" allowFullScreen />
            </div>
            </div>
        </>
    )
}
