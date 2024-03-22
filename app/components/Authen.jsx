
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
                    window.location = "/login";
                    router.push('/login', { scroll: false })
                    
                } else {
                    
                }

            })
            .catch((error) => {
                console.log("Error: ", error)
            })
        } catch {
            alert("คุณต้องเข้าสู่ระบบก่อน")
            window.location = "/login"
            router.push('/login', { scroll: false })
            
        }
        
        
    }, []);

}

export default Authen
