
import React, {useEffect} from 'react'

const Authen = () => {
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
                } else {
                    
                }

            })
            .catch((error) => {
                console.log("Error: ", error)
            })
        } catch {
            alert("คุณต้องเข้าสู่ระบบก่อน")
            window.location = "/login"
        }
        
        
    }, []);

}

export default Authen
