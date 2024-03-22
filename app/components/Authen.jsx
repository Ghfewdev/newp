
import React, {useEffect} from 'react'
import { useRouter } from 'next/navigation'

const Authen = () => {
    const router = useRouter();
    useEffect(() => {
        try{
            const token = localStorage.getItem("token").split("$")[0]
            fetch(process.env.NEXT_PUBLIC_APP_API+"/authen2", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+token
                  }
            })
            .then(response => {
                return response.json()
            })
            .then(data => {
                if(data.status != "ok") {
                    alert("คุณต้องเข้าสู่ระบบก่อน")
                    localStorage.removeItem("id");
                    localStorage.removeItem("name");
                    localStorage.removeItem("department");
                    localStorage.removeItem("token");
                    router.push('/login', { scroll: false })
                    window.location = "/login";
                } else {
                    
                }

            })
            .catch((error) => {
                console.log("Error: ", error)
            })
        } catch {
            alert("คุณต้องเข้าสู่ระบบก่อน")
            router.push('/login', { scroll: false })
            window.location = "/login"
        }
        
        
    }, []);

}

export default Authen
