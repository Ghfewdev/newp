"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Doughnut, getElementsAtEvent } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

export default function Page() {

  const [form, setForm] = useState([]);
  const [admin, setAdmin] = React.useState(false);
  const [sech, setSech] = React.useState(false);
  const [login, setLogin] = React.useState(false);
  const [doug1, setDoug1] = useState([]);
  const [doug2, setDoug2] = useState([]);
  const [hoss, setHoss] = useState("");
  const [con, setCon] = useState([]);
  const [t1, setT1] = useState([]);
  const [th1, setTh1] = useState("การจองในระบบ");
  const chartRef = useRef();
  const chartRef2 = useRef();

  ChartJS.register(ArcElement, Tooltip, Legend);

  const labelm = ["ไป-กลับ", "เที่ยวเดียว", "ไม่เข้าเงื่อนไขการขอใช้รถ"];
  const slabels = ["สำเร็จ", "ยกเลิก", "รอดำเนินการ"];
  const labels = [1, 0, "null"];
  const hosname = ["กลาง", "ตากสิน", "เจริญกรุงประชารักษ์", "หลวงพ่อทวีศักดิ์", "เวชการุณย์รัศมิ์", "นคราภิบาล", "ราชพิพัฒน์", "สิรินธร", "บางขุนเทียน", "คลองสามวา", "บางนา"]

  const resett = () => {
    if (admin === true) {
      var url1 = process.env.NEXT_PUBLIC_APP_API + "/dash/1"
      var url2 = process.env.NEXT_PUBLIC_APP_API + "/dash/2"
      var url3 = process.env.NEXT_PUBLIC_APP_API + "/dash/3"
      var url4 = process.env.NEXT_PUBLIC_APP_API + "/dash/4"
    } else {
      var url1 = process.env.NEXT_PUBLIC_APP_API + "/dash/1?hospital=" + localStorage.getItem("id")
      var url2 = process.env.NEXT_PUBLIC_APP_API + "/dash/2?hospital=" + localStorage.getItem("id")
      var url3 = process.env.NEXT_PUBLIC_APP_API + "/dash/3?hospital=" + localStorage.getItem("id")
      var url4 = process.env.NEXT_PUBLIC_APP_API + "/dash/4?hospital=" + localStorage.getItem("id")
    }
    setTh1("การจองในระบบ");
    setSech(false);
    fetch(url1)
      .then(res => res.json())
      .then(result => {
        setDoug1(result);
      });
    fetch(url2)
      .then(res => res.json())
      .then(result => {
        setDoug2(result);
      });
    fetch(url4)
      .then(res => res.json())
      .then(result => {
        setT1(result);
      });
    fetch(url3)
      .then(res => res.json())
      .then(result => {
        setCon(result);
      });
  }

  const hosf = (id, val) => {
    if (admin === true) {
      fetch(process.env.NEXT_PUBLIC_APP_API + "/dash/1?hospital=" + id)
        .then(res => res.json())
        .then(result => {
          setDoug1(result);
        });
      fetch(process.env.NEXT_PUBLIC_APP_API + "/dash/2?hospital=" + id)
        .then(res => res.json())
        .then(result => {
          setDoug2(result);
        });
      fetch(process.env.NEXT_PUBLIC_APP_API + "/dash/3?hospital=" + id)
        .then(res => res.json())
        .then(result => {
          setCon(result);
        });
      fetch(process.env.NEXT_PUBLIC_APP_API + "/dash/4")
        .then(res => res.json())
        .then(result => {
          setT1(result);
        });
      setTh1(val)
      setSech(true)
    }
  }

  const dsch1 = (event) => {


    try {
      const indexs = labelm[getElementsAtEvent(chartRef.current, event)[0].index]
      setTh1(indexs)
      if (admin === true) {
        var url1 = process.env.NEXT_PUBLIC_APP_API + "/dash/1"
        var url2 = process.env.NEXT_PUBLIC_APP_API + "/dash/2"
        var url3 = process.env.NEXT_PUBLIC_APP_API + "/dash/3?met=" + indexs
        var url4 = process.env.NEXT_PUBLIC_APP_API + "/dash/4?met=" + indexs
      } else {
        var url1 = process.env.NEXT_PUBLIC_APP_API + "/dash/1?hospital=" + localStorage.getItem("id")
        var url2 = process.env.NEXT_PUBLIC_APP_API + "/dash/2?hospital=" + localStorage.getItem("id")
        var url3 = process.env.NEXT_PUBLIC_APP_API + "/dash/3?hospital=" + localStorage.getItem("id") + "&&met=" + indexs
        var url4 = process.env.NEXT_PUBLIC_APP_API + "/dash/4?hospital=" + localStorage.getItem("id") + "&&met=" + indexs
      }

      fetch(url1)
        .then(res => res.json())
        .then(result => {
          setDoug1(result);
        });
      fetch(url2)
        .then(res => res.json())
        .then(result => {
          setDoug2(result);
        });
      fetch(url3)
        .then(res => res.json())
        .then(result => {
          setCon(result);
        });
      fetch(url4)
        .then(res => res.json())
        .then(result => {
          setT1(result);
        });
    }
    catch {
      console.log(getElementsAtEvent(chartRef.current, event))
    }

  }

  const dsch2 = (event) => {
    try {
      const indexs = labels[getElementsAtEvent(chartRef2.current, event)[0].index]
      setTh1(slabels[getElementsAtEvent(chartRef2.current, event)[0].index])
      if (admin === true) {
        var url1 = process.env.NEXT_PUBLIC_APP_API + "/dash/1"
        var url2 = process.env.NEXT_PUBLIC_APP_API + "/dash/2"
        var url3 = process.env.NEXT_PUBLIC_APP_API + "/dash/3?status=" + indexs
        var url4 = process.env.NEXT_PUBLIC_APP_API + "/dash/4?status=" + indexs
      } else {
        var url1 = process.env.NEXT_PUBLIC_APP_API + "/dash/1?hospital=" + localStorage.getItem("id")
        var url2 = process.env.NEXT_PUBLIC_APP_API + "/dash/2?hospital=" + localStorage.getItem("id")
        var url3 = process.env.NEXT_PUBLIC_APP_API + "/dash/3?hospital=" + localStorage.getItem("id") + "&&status=" + indexs
        var url4 = process.env.NEXT_PUBLIC_APP_API + "/dash/4?hospital=" + localStorage.getItem("id") + "&&status=" + indexs
      }
      fetch(url1)
        .then(res => res.json())
        .then(result => {
          setDoug1(result);
        });
      fetch(url2)
        .then(res => res.json())
        .then(result => {
          setDoug2(result);
        });
      fetch(url3)
        .then(res => res.json())
        .then(result => {
          setCon(result);
        });
      fetch(url4)
        .then(res => res.json())
        .then(result => {
          setT1(result);
        });

    }
    catch {
      console.log(getElementsAtEvent(chartRef2.current, event))
    }

  }

  var d1 = <></>
  var d2 = <></>

  if (doug1 != [] && doug2 != []) {

    var dougdata1 = doug1.map(d => [d.met1, d.met2, d.met3])
    var la = dougdata1[0]
    var la1 = String(la).split(",")

    var dougdata2 = doug2.map(g => [g.met1, g.met2, g.met3])
    var laa = dougdata2[0]
    var laa1 = String(laa).split(",")

    var con1 = con.map(d => [d.type1, d.type2, d.con1, d.con2, d.con3, d.con4, d.dis1, d.dis2, d.dis3, d.dis4, d.dis5, d.dis6, d.dis7, d.out1, d.out2, d.out3])
    var lcon1 = con1[0]
    var ccon1 = String(lcon1).split(",")

    var ta1 = t1.map(d => [d.h1, d.h2, d.h3, d.h4, d.h5, d.h6, d.h7, d.h8, d.h9, d.h10, d.h11])
    var tta1 = ta1[0]
    var lata1 = String(tta1).split(",")



    const Doudata = {
      labels: ["ไป-กลับ " + la1[0] + " ครั้ง", 'เที่ยวเดียว ' + la1[1] + " ครั้ง", 'ไม่เข้าเงื่อนไขการขอใช้รถ ' + la1[2] + " ครั้ง"],
      datasets: [
        {
          label: " ผู้รับบริการ (ครั้ง)",
          data: la,
          backgroundColor: [
            'rgba(193, 32, 174, 0.4)',
            'rgba(154, 239, 12, 0.4)',
            'rgba(0, 0, 0, 0.4)',
          ],
          borderColor: [
            'rgba(193, 32, 174, 1)',
            'rgba(154, 239, 12, 1)',
            'rgba(0, 0, 0, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const Doudata2 = {
      labels: ["สำเร็จ " + laa1[0] + " ครั้ง", 'ยกเลิก ' + laa1[1] + " ครั้ง", 'อยูระหว่างดำเนินการ ' + laa1[2] + " ครั้ง"],
      datasets: [
        {
          label: " ผู้รับบริการ (ครั้ง)",
          data: laa,
          backgroundColor: [
            'rgba(22, 165, 9, 0.4)',
            'rgba(255, 0, 0, 0.4)',
            'rgba(0, 0, 0, 0.4)',
          ],
          borderColor: [
            'rgba(22, 165, 9, 1)',
            'rgba(255, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    d1 = <Doughnut data={Doudata} onClick={dsch1} ref={chartRef} />
    d2 = <Doughnut data={Doudata2} onClick={dsch2} ref={chartRef2} />

  }

  useEffect(() => {
    if (localStorage.getItem("id")) {
      setLogin(true);
      if (localStorage.getItem("id") === "14") {
        setAdmin(true);
        // fetch(process.env.NEXT_PUBLIC_APP_API + "/form2")
        //   .then(res => res.json())
        //   .then(result => {
        //     setForm(result);
        //   });
        fetch(process.env.NEXT_PUBLIC_APP_API + "/dash/1")
          .then(res => res.json())
          .then(result => {
            setDoug1(result);
          });
        fetch(process.env.NEXT_PUBLIC_APP_API + "/dash/2")
          .then(res => res.json())
          .then(result => {
            setDoug2(result);
          });
        fetch(process.env.NEXT_PUBLIC_APP_API + "/dash/3")
          .then(res => res.json())
          .then(result => {
            setCon(result);
          });
        fetch(process.env.NEXT_PUBLIC_APP_API + "/dash/4")
          .then(res => res.json())
          .then(result => {
            setT1(result);
          });
      } else {
        setAdmin(false);
        // fetch(process.env.NEXT_PUBLIC_APP_API + "/form2/users/" + localStorage.getItem("id"))
        //   .then(res => res.json())
        //   .then(result => {
        //     setForm(result);
        //   });
        fetch(process.env.NEXT_PUBLIC_APP_API + "/dash/1?hospital=" + localStorage.getItem("id"))
          .then(res => res.json())
          .then(result => {
            setDoug1(result);
          });
        fetch(process.env.NEXT_PUBLIC_APP_API + "/dash/2?hospital=" + localStorage.getItem("id"))
          .then(res => res.json())
          .then(result => {
            setDoug2(result);
          });
        fetch(process.env.NEXT_PUBLIC_APP_API + "/dash/3?hospital=" + localStorage.getItem("id"))
          .then(res => res.json())
          .then(result => {
            setCon(result);
          });
        fetch(process.env.NEXT_PUBLIC_APP_API + "/dash/4?hospital=" + localStorage.getItem("id"))
          .then(res => res.json())
          .then(result => {
            setT1(result);
          });
      };
    }
    else {
      setLogin(false);
    }
  }, []);

  return (
    <>
      {login ? (<>
        <div>&nbsp;</div>
        {/* <div className='ml-6 mr-6 mb-6 text-center text-3xl bg-[#006A33] rounded-lg p-3 text-yellow-300 '>
          <b>รายละเอียดการจองในระบบ</b>
        </div> */}

        <div className="grid mb-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2 pl-6 pr-6">

          <div className='pl-4 pb-4 pr-4 rounded-lg dark:border-gray-700 md:grid-cols-2'>
            <div className='text-center text-2xl p-2'>
              <label>{th1}</label>
            </div>
            <table className="table-auto w-full border-black border bg-slate-100">
              <thead className=' border border-black'>
                <tr className='bg-[#006A33] text-[#FDE047]'>
                  <th>โรงพยาบาล</th>
                  <th>จำนวนการจอง</th>
                </tr>
              </thead>
              {admin ? (
              <tbody>
              <tr>
                  <td className='pl-2'><button onClick={() => hosf(1, "กลาง")}><u>กลาง</u></button></td>
                  <td className='text-center'>{lata1[0]}</td>
                </tr>
                <tr>
                  <td className='pl-2'><button onClick={() => hosf(2, "ตากสิน")}><u>ตากสิน</u></button></td>
                  <td className='text-center'>{lata1[1]}</td>
                </tr>
                <tr>
                  <td className='pl-2'><button onClick={() => hosf(3, "เจริญกรุงประชารักษ์")}><u>เจริญกรุงประชารักษ์</u></button></td>
                  <td className='text-center'>{lata1[2]}</td>
                </tr>
                <tr>
                  <td className='pl-2'><button onClick={() => hosf(4, "หลวงพ่อทวีศักดิ์")}><u>หลวงพ่อทวีศักดิ์</u></button></td>
                  <td className='text-center'>{lata1[3]}</td>
                </tr>
                <tr>
                  <td className='pl-2'><button onClick={() => hosf(5, "เวชการุณย์รัศมิ์")}><u>เวชการุณย์รัศมิ์</u></button></td>
                  <td className='text-center'>{lata1[4]}</td>
                </tr>
                <tr>
                  <td className='pl-2'><button onClick={() => hosf(6, "นคราภิบาล")}><u>นคราภิบาล</u></button></td>
                  <td className='text-center'>{lata1[5]}</td>
                </tr>
                <tr>
                  <td className='pl-2'><button onClick={() => hosf(7, "ราชพิพัฒน์")}><u>ราชพิพัฒน์</u></button></td>
                  <td className='text-center'>{lata1[6]}</td>
                </tr>
                <tr>
                  <td className='pl-2'><button onClick={() => hosf(8, "สิรินธร")}><u>สิรินธร</u></button></td>
                  <td className='text-center'>{lata1[7]}</td>
                </tr>
                <tr>
                  <td className='pl-2'><button onClick={() => hosf(9, "บางขุนเทียน")}><u>บางขุนเทียน</u></button></td>
                  <td className='text-center'>{lata1[8]}</td>
                </tr>
                <tr>
                  <td className='pl-2'><button onClick={() => hosf(10, "คลองสามวา")}><u>คลองสามวา</u></button></td>
                  <td className='text-center'>{lata1[9]}</td>
                </tr>
                <tr>
                  <td className='pl-2'><button onClick={() => hosf(11, "บางนา")}><u>บางนา</u></button></td>
                  <td className='text-center'>{lata1[10]}</td>
                </tr>
              </tbody>
              ) : (
                <tbody>
                <tr>
                <td className='pl-2'><button onClick={() => hosf(localStorage.getItem("id"), hosname[localStorage.getItem("id")-1])}><u>{hosname[localStorage.getItem("id")-1]}</u></button></td>
                  <td className='text-center'>{lata1[localStorage.getItem("id")-1]}</td>
              </tr>
              </tbody>
              )}
              {/* <tbody>
                <tr>
                  <td className='pl-2'><button onClick={() => hosf(1, "กลาง")}><u>กลาง</u></button></td>
                  <td className='text-center'>{lata1[0]}</td>
                </tr>
                <tr>
                  <td className='pl-2'><button onClick={() => hosf(2, "ตากสิน")}><u>ตากสิน</u></button></td>
                  <td className='text-center'>{lata1[1]}</td>
                </tr>
                <tr>
                  <td className='pl-2'><button onClick={() => hosf(3, "เจริญกรุงประชารักษ์")}><u>เจริญกรุงประชารักษ์</u></button></td>
                  <td className='text-center'>{lata1[2]}</td>
                </tr>
                <tr>
                  <td className='pl-2'><button onClick={() => hosf(4, "หลวงพ่อทวีศักดิ์")}><u>หลวงพ่อทวีศักดิ์</u></button></td>
                  <td className='text-center'>{lata1[3]}</td>
                </tr>
                <tr>
                  <td className='pl-2'><button onClick={() => hosf(5, "เวชการุณย์รัศมิ์")}><u>เวชการุณย์รัศมิ์</u></button></td>
                  <td className='text-center'>{lata1[4]}</td>
                </tr>
                <tr>
                  <td className='pl-2'><button onClick={() => hosf(6, "นคราภิบาล")}><u>นคราภิบาล</u></button></td>
                  <td className='text-center'>{lata1[5]}</td>
                </tr>
                <tr>
                  <td className='pl-2'><button onClick={() => hosf(7, "ราชพิพัฒน์")}><u>ราชพิพัฒน์</u></button></td>
                  <td className='text-center'>{lata1[6]}</td>
                </tr>
                <tr>
                  <td className='pl-2'><button onClick={() => hosf(8, "สิรินธร")}><u>สิรินธร</u></button></td>
                  <td className='text-center'>{lata1[7]}</td>
                </tr>
                <tr>
                  <td className='pl-2'><button onClick={() => hosf(9, "บางขุนเทียน")}><u>บางขุนเทียน</u></button></td>
                  <td className='text-center'>{lata1[8]}</td>
                </tr>
                <tr>
                  <td className='pl-2'><button onClick={() => hosf(10, "คลองสามวา")}><u>คลองสามวา</u></button></td>
                  <td className='text-center'>{lata1[9]}</td>
                </tr>
                <tr>
                  <td className='pl-2'><button onClick={() => hosf(11, "บางนา")}><u>บางนา</u></button></td>
                  <td className='text-center'>{lata1[10]}</td>
                </tr>
              </tbody> */}
              {/* <tbody id='all' hidden>
                <tr>
                  <td className='pl-2'> กลาง</td>
                  <td className='text-center'>{lata1[0]}</td>
                </tr>
                <tr>
                  <td className='pl-2'> ตากสิน</td>
                  <td className='text-center'>{lata1[1]}</td>
                </tr>
                <tr>
                  <td className='pl-2'> เจริญกรุงประชารักษ์</td>
                  <td className='text-center'>{lata1[2]}</td>
                </tr>
                <tr>
                  <td className='pl-2'> หลวงพ่อทวีศักดิ์</td>
                  <td className='text-center'>{lata1[3]}</td>
                </tr>
                <tr>
                  <td className='pl-2'> เวชการุณย์รัศมิ์</td>
                  <td className='text-center'>{lata1[4]}</td>
                </tr>
                <tr>
                  <td className='pl-2'> นคราภิบาล</td>
                  <td className='text-center'>{lata1[5]}</td>
                </tr>
                <tr>
                  <td className='pl-2'> ราชพิพัฒน์</td>
                  <td className='text-center'>{lata1[6]}</td>
                </tr>
                <tr>
                  <td className='pl-2'> สิรินธร</td>
                  <td className='text-center'>{lata1[7]}</td>
                </tr>
                <tr>
                  <td className='pl-2'> บางขุนเทียน</td>
                  <td className='text-center'>{lata1[8]}</td>
                </tr>
                <tr>
                  <td className='pl-2'> คลองสามวา</td>
                  <td className='text-center'>{lata1[9]}</td>
                </tr>
                <tr>
                  <td className='pl-2'> บางนา</td>
                  <td className='text-center'>{lata1[10]}</td>
                </tr>
              </tbody> */}
              <tfoot>
                <tr>
                  <td colSpan={2} className='text-center p-1'><button className='bg-green-400 p-1 rounded-lg' onClick={() => resett()}>คืนค่าเริ่มต้น</button></td>
                </tr>
              </tfoot>
            </table>

          </div>

          <div className='text-center text-2xl'>
            <label>สถานะของการจอง</label>
            {d2}
            <div className='flex border bg-white p-2 rounded-lg mt-6'>
              <img src="https://www.svgrepo.com/show/368300/senior-elderly.svg" alt="elder" className='w-16' />
              <div className='p-3'>
                <strong>ผู้สูงอายุ</strong>
                <br />
                <span className='text-xl text-green-500 font-extrabold'><b>{ccon1[0]}</b></span>
              </div>
            </div>
          </div>
          <div className='text-center text-2xl'>
            <label>วิธีการจอง</label>
            {d1}
            <div className='flex border bg-white p-2 rounded-lg mt-6'>
              <img src="https://www.svgrepo.com/show/2729/disabled.svg" alt="elder" className='w-16' />
              <div className='p-3'>
                <strong>คนพิการ</strong>
                <br />
                <span className='text-xl text-green-500 font-extrabold'><b>{ccon1[1]}</b></span>
              </div>
            </div>
          </div>
          <div>
            <div className='p-1 rounded-lg border bg-red-600'>
              <label className='text-white '>ไม่เข้าเงื่อนไขการขอใช้รถ</label>
              <div className='flex border bg-white p-2 rounded-lg m-1'>
                <img src="https://www.svgrepo.com/show/111201/phone-call.svg" alt="elder" className='w-16' />
                <div className='p-3'>
                  <strong>Telemedicine</strong>
                  <br />
                  <span className='text-xl text-red-500 font-extrabold'>{ccon1[13]}</span>
                </div>
              </div>

              <div className='flex border bg-white p-2 rounded-lg m-1'>
                <img src="https://www.svgrepo.com/show/52075/house.svg" alt="elder" className='w-16' />
                <div className='p-3'>
                  <strong>เยี่ยมบ้านโดย ร.พ</strong>
                  <br />
                  <span className='text-xl text-red-500 font-extrabold'>{ccon1[14]}</span>
                </div>
              </div>
              <div className='flex border bg-white p-2 rounded-lg m-1'>
                <img src="https://www.svgrepo.com/show/52075/house.svg" alt="elder" className='w-16' />
                <div className='p-3'>
                  <strong>เยี่ยมบ้านโดย ศบส.</strong>
                  <br />
                  <span className='text-xl text-red-500 font-extrabold'>{ccon1[15]}</span>
                </div>
              </div>
            </div>
            <div className='p-1 rounded-lg border bg-blue-600'>
              <label className='text-white '>ประเภทผู้พิการที่รับบริการ</label>
              <div className='flex border bg-white p-2 rounded-lg m-1'>
                <img src="https://www.svgrepo.com/show/103061/eye.svg" alt="elder" className='w-16' />
                <div className='p-3'>
                  <strong>การเห็น</strong>
                  <br />
                  <span className='text-xl text-green-500 font-extrabold'>{ccon1[6]}</span>
                </div>
              </div>
              <div className='flex border bg-white p-2 rounded-lg m-1'>
                <img src="https://www.svgrepo.com/show/452445/ear.svg" alt="elder" className='w-16' />
                <div className='p-3'>
                  <strong>การได้ยินหรือสื่อความหมาย</strong>
                  <br />
                  <span className='text-xl text-green-500 font-extrabold'>{ccon1[7]}</span>
                </div>

              </div>

            </div>

          </div>
          <div>
            <div className='p-1 rounded-lg border bg-blue-600'>
              <label className='text-white '>ประเภทผู้พิการที่รับบริการ</label>
              <div className='flex border bg-white p-2 rounded-lg m-1'>
                <img src="https://www.svgrepo.com/show/308152/walking-person-go-walk-move.svg" alt="elder" className='w-16' />
                <div className='p-3'>
                  <strong>การเคลื่อนไหวหรือทางร่างกาย</strong>
                  <br />
                  <span className='text-xl text-green-500 font-extrabold'>{ccon1[8]}</span>
                </div>

              </div>
              <div className='flex border bg-white p-2 rounded-lg m-1'>
                <img src="https://www.svgrepo.com/show/13666/heart.svg" alt="elder" className='w-16' />
                <div className='p-3'>
                  <strong>จิตใจหรือพฤติกรรม</strong>
                  <br />
                  <span className='text-xl text-green-500 font-extrabold'>{ccon1[9]}</span>
                </div>

              </div>
              <div className='flex border bg-white p-2 rounded-lg m-1'>
                <img src="https://www.svgrepo.com/show/20845/bright-light-bulb.svg" alt="elder" className='w-16' />
                <div className='p-3'>
                  <strong>สติปัญญา</strong>
                  <br />
                  <span className='text-xl text-green-500 font-extrabold'>{ccon1[10]}</span>
                </div>

              </div>
              <div className='flex border bg-white p-2 rounded-lg m-1'>
                <img src="https://www.svgrepo.com/show/79292/open-book.svg" alt="elder" className='w-16' />
                <div className='p-3'>
                  <strong>การเรียนรู้</strong>
                  <br />
                  <span className='text-xl text-green-500 font-extrabold'>{ccon1[11]}</span>
                </div>

              </div>
              <div className='flex border bg-white p-2 rounded-lg m-1'>
                <img src="https://www.svgrepo.com/show/332502/question-circle.svg" alt="elder" className='w-16' />
                <div className='p-3'>
                  <strong>ออทิสติก</strong>
                  <br />
                  <span className='text-xl text-green-500 font-extrabold'>{ccon1[12]}</span>
                </div>
              </div>

            </div>
          </div>

          <div>
            <div className='p-1 rounded-lg border bg-yellow-600 '>
              <label className='text-white '>เงื่อนไขการขอใช้รถ</label>
              <div className='flex border bg-white p-2 rounded-lg m-1'>
                <img src="https://www.svgrepo.com/show/7827/notes.svg" alt="elder" className='w-16' />
                <div className='p-3'>
                  <strong>ADL 5-12</strong>
                  <br />
                  <span className='text-xl text-green-500 font-extrabold'>{ccon1[2]}</span>
                </div>
              </div>
              <div className='flex border bg-white p-2 rounded-lg m-1'>
                <img src="https://www.svgrepo.com/show/69672/wheelchair.svg" alt="elder" className='w-16' />
                <div className='p-3'>
                  <strong>มีปัญหาด้านการเคลื่อนไหว</strong>
                  <br />
                  <span className='text-xl text-green-500 font-extrabold'>{ccon1[3]}</span>
                </div>
              </div>
              <div className='flex border bg-white p-2 rounded-lg m-1'>
                <img src="https://www.svgrepo.com/show/89152/hospital.svg" alt="elder" className='w-16' />
                <div className='p-3'>
                  <strong>มีนัดรักษาต่อเนื่องกับโรงพยาบาล</strong>
                  <br />
                  <span className='text-xl text-green-500 font-extrabold'>{ccon1[4]}</span>
                </div>
              </div>
              <div className='flex border bg-white p-2 rounded-lg m-1'>
                <img src="https://www.svgrepo.com/show/108666/coins.svg" alt="elder" className='w-16' />
                <div className='p-3'>
                  <strong>มีปัญหาด้านเศรษฐานะ</strong>
                  <br />
                  <span className='text-xl text-green-500 font-extrabold'>{ccon1[5]}</span>
                </div>
              </div>
            </div>
          </div>

        </div>


        {/* 
        <div className='ml-6 mr-6 mb-6 text-center text-3xl bg-[#006A33] rounded-lg p-3 text-yellow-300 '><b>ผู้รับบริการที่ดำเนินการสำเร็จแล้ว</b></div>

        <div className="grid gap-6 mb-6 sm:grid-cols-2 md:grid-cols-4 pl-6 pr-6 mt-6">
          <div className='flex border bg-white p-2 rounded-lg'>
            <img src="https://www.svgrepo.com/show/368300/senior-elderly.svg" alt="elder" className='w-16' />
            <div className='p-6'>
              <strong>ผู้สูงอายุ</strong>
              <br />
              <span>{ccon1[0]} คน</span>
            </div>

          </div>
          <div className='flex border bg-white p-2 rounded-lg'>
            <img src="https://www.svgrepo.com/show/2729/disabled.svg" alt="elder" className='w-16' />
            <div className='p-6'>
              <strong>คนพิการ</strong>
              <br />
              <span>{ccon1[1]} คน</span>
            </div>

          </div>


        </div>
        <div>
          <div className='ml-6 mr-6 mb-6'><b><u>ประเภทผู้พิการที่รับบริการ</u></b></div>
        </div>
        <div className="grid gap-6 mb-6 sm:grid-cols-2 md:grid-cols-4 pl-6 pr-6 mt-6">
          <div className='flex border bg-white p-2 rounded-lg'>
            <img src="https://www.svgrepo.com/show/103061/eye.svg" alt="elder" className='w-16' />
            <div className='p-6'>
              <strong>การเห็น</strong>
              <br />
              <span>{ccon1[6]} คน</span>
            </div>

          </div>
          <div className='flex border bg-white p-2 rounded-lg'>
            <img src="https://www.svgrepo.com/show/452445/ear.svg" alt="elder" className='w-16' />
            <div className='p-6'>
              <strong>การได้ยินหรือสื่อความหมาย</strong>
              <br />
              <span>{ccon1[7]} คน</span>
            </div>

          </div>
          <div className='flex border bg-white p-2 rounded-lg'>
            <img src="https://www.svgrepo.com/show/308152/walking-person-go-walk-move.svg" alt="elder" className='w-16' />
            <div className='p-6'>
              <strong>การเคลื่อนไหวหรือทางร่างกาย</strong>
              <br />
              <span>{ccon1[8]} คน</span>
            </div>

          </div>
          <div className='flex border bg-white p-2 rounded-lg'>
            <img src="https://www.svgrepo.com/show/13666/heart.svg" alt="elder" className='w-16' />
            <div className='p-6'>
              <strong>จิตใจหรือพฤติกรรม</strong>
              <br />
              <span>{ccon1[9]} คน</span>
            </div>

          </div>
          <div className='flex border bg-white p-2 rounded-lg'>
            <img src="https://www.svgrepo.com/show/20845/bright-light-bulb.svg" alt="elder" className='w-16' />
            <div className='p-6'>
              <strong>สติปัญญา</strong>
              <br />
              <span>{ccon1[10]} คน</span>
            </div>

          </div>
          <div className='flex border bg-white p-2 rounded-lg'>
            <img src="https://www.svgrepo.com/show/79292/open-book.svg" alt="elder" className='w-16' />
            <div className='p-6'>
              <strong>การเรียนรู้</strong>
              <br />
              <span>{ccon1[11]} คน</span>
            </div>

          </div>
          <div className='flex border bg-white p-2 rounded-lg'>
            <img src="https://www.svgrepo.com/show/332502/question-circle.svg" alt="elder" className='w-16' />
            <div className='p-6'>
              <strong>ออทิสติก</strong>
              <br />
              <span>{ccon1[12]} คน</span>
            </div>
          </div>



        </div>

        <div className='ml-6 mr-6 mb-6 text-center text-3xl bg-[#006A33] rounded-lg p-3 text-yellow-300 '><b>เงื่อนไขในการขอรับบริการ</b></div>

        <div className="grid gap-6 mb-6 sm:grid-cols-2 md:grid-cols-4 pl-6 pr-6 mt-6">
          <div className='flex border bg-white p-2 rounded-lg'>
            <img src="https://www.svgrepo.com/show/7827/notes.svg" alt="elder" className='w-16' />
            <div className='p-6'>
              <strong>ADL 5-12</strong>
              <br />
              <span>{ccon1[2]} คน</span>
            </div>
          </div>
          <div className='flex border bg-white p-2 rounded-lg'>
            <img src="https://www.svgrepo.com/show/69672/wheelchair.svg" alt="elder" className='w-16' />
            <div className='p-6'>
              <strong>มีปัญหาด้านการเคลื่อนไหว</strong>
              <br />
              <span>{ccon1[3]} คน</span>
            </div>
          </div>
          <div className='flex border bg-white p-2 rounded-lg'>
            <img src="https://www.svgrepo.com/show/89152/hospital.svg" alt="elder" className='w-16' />
            <div className='p-6'>
              <strong>มีนัดรักษาต่อเนื่องกับโรงพยาบาล</strong>
              <br />
              <span>{ccon1[4]} คน</span>
            </div>
          </div>
          <div className='flex border bg-white p-2 rounded-lg'>
            <img src="https://www.svgrepo.com/show/108666/coins.svg" alt="elder" className='w-16' />
            <div className='p-6'>
              <strong>มีปัญหาด้านเศรษฐานะ</strong>
              <br />
              <span>{ccon1[5]} คน</span>
            </div>
          </div>
        </div> */}


      </>) : (<>
        <div>
          <br />
          <div className=" flex justify-center items-center">
            <img src="https://webportal.bangkok.go.th/user_files/400/173440610161a59a7d1ad282.52670477.png" alt="bma" className="w-[80%]" />
          </div>
          <br />
          <br />
          <p className="font-bold text-center uppercase text-3xl">ระบบรถรับส่งผู้พิการ และผู้สูงอายุ</p>
          <br />
          <br />
          <p className="font-bold text-center uppercase text-3xl">ติดต่อเรา</p>
          <br />
          <p className="text-center text-xl">สำนักงานพัฒนาระบบบริการทางการแพทย์</p>
          <br />
          <p className="text-center text-xl">ที่อยู่: 514 ถนนหลวง เขตป้อมปราบศัตรูพ่าย กรุงเทพมหานคร 10100</p>
          <br />
          <p className="text-center text-xl">โทรศัพท์ : 0-2622-5173 หรือ 0-2220-7505</p>
          <br />
          <p className="text-center text-xl">e-mail : sdmsd.bangkok@gmail.com</p>

          <br /><br />
        </div>
      </>)}

    </>
  )
}
