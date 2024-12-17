
import { useEffect, useState } from "react";

// fetch API admin thống kê tài khoản
export const useFetchAdminTotal = () =>{
    const [Total,setTotal] = useState([])
    const [error, setError] = useState(null)
    useEffect(()=>{
        const fetchAdminTotal = async() =>{
            try {
            const response = await fetch('https://hieu.name.vn/datn/public/api/dashboard/total');
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

// --------------------------------------------------- // ---------------------------------------------------------//

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////       END API USER        //////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// AdminAPI/GET/api.js
// import Cookies from 'js-cookie';

// // Hàm lấy danh sách người dùng
// export const fetchUsers = async () => {
//   const adminToken = Cookies.get("token");
//   const response = await fetch('https://hieu.name.vn/datn/public/api/user', {
//     headers: {
//       'Authorization': `Bearer ${adminToken}`,
//       'Content-Type': 'application/json',
//     },
//   });

//   if (!response.ok) {
//     throw new Error('Không có quyền truy cập');
//   }

//   const result = await response.json();
//   return result.list || [];
// };

// // Hàm sao chép người dùng
// export const copyUser = async (id) => {
//   const adminToken = Cookies.get("token");
//   const response = await fetch(`https://hieu.name.vn/datn/public/api/user/duplicate/${id}`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${adminToken}`,
//       "Content-Type": "application/json",
//     },
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || "Lỗi lấy thông tin phản hồi");
//   } 

//   return await response.json();
// };

// // Hàm xóa người dùng
// export const deleteUser = async (id) => {
//   const adminToken = Cookies.get("token");
//   const response = await fetch(`https://hieu.name.vn/datn/public/api/user/delete/${id}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${adminToken}`,
//       "Content-Type": "application/json",
//     },
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || "Lỗi khi xóa người dùng");
//   }
// };

// // Hàm chỉnh sửa người dùng
// export const editUser = async (id, updatedUser) => {
//   const adminToken = Cookies.get("token");
//   const response = await fetch(`https://hieu.name.vn/datn/public/api/user/edit/${id}`, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${adminToken}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(updatedUser),
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || "Lỗi khi cập nhật thông tin người dùng");
//   }

//   return await response.json();
// };
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////       END API USER        /////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ------------------------------------------------- // ---------------------------------------------------------------------------------//