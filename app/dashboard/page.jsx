"use client"
import React from 'react'
import Authen from '../components/Authen'

export default function Dashboard() {
    Authen();
    return (
        <>
            <div>
            <iframe className='w-full' height="570px" src="https://lookerstudio.google.com/embed/reporting/de780372-aff1-400d-bf27-f8c8115ba43f/page/kIV1C" frameBorder="1" allowFullScreen />
            </div>
        </>
    )
}
