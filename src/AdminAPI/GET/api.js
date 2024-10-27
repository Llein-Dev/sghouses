
import { useEffect, useState } from "react";

// fetch API admin thống kê tài khoản
export const useFetchAdminTotal = () =>{
    const [Total,setTotal] = useState([])
    const [error, setError] = useState(null)
    useEffect(()=>{
        const fetchAdminTotal = async() =>{
            try {
            const response = await fetch('http://localhost:8000/api/dashboard/total');
            if(!response.ok){
                throw new Error('không lấy được api ADmin user')
            }
            const data = await response.json();
            setTotal(data);
            } catch (error) {
                setError(error.massage || 'lỗi không sử dụng được hàm Admin Total')
            }
            }
           fetchAdminTotal();
    },[])
    return [Total];
}

// // Fecth API Thống kê Liên hệ
// export const useFetchAdminInfo = () =>{
//     const [info , setInfo] = useState([]);
//     const [error , setError] = useState(null)

//     useEffect(() =>{
//         const fetchAdminInfo = async ()=>{
//           try {
//             const response = await fetch('http://localhost:8000/api/admin/info')
//             if(!response.ok){
//                 setError('lỗi khi lấy api info thuộc Admin')
//                 return;
//             }
//             const data = await response.json();
//             setInfo(data);
//           } catch (error) {
//             setError(error.massage || 'Fetch API info gặp lỗi vui lòng kiểm tra lại admin info !')
//           }
//         }
//         fetchAdminInfo();
//     },[])
//    return{info, error}
// }

// // fetch API admin thống kê hóa đơn 
// export const useFetchAminBill = () =>{
//     const [bill , setBill] = useState([])
//     const [error , setError] = useState(null)

//     useEffect(()=>{
//     const fetchAdminBill = async () =>{
//     try {
//         const response = await fetch('http://localhost:8000/api/admin/bill')
//         if(!response.ok){
//             throw new Error('lỗi không kết nối được nới api Admin hóa đơn')
//         }
//         const data = await response.json()
//         setBill(data);

//     } catch (error) {
//         setError(error.massage || 'lỗi khi fetch dữ liệu')
//     }
//     }
//     fetchAdminBill();
//     },[])

//     return{bill,error}
// }