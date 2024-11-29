'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, User, Phone, Calendar, FileText } from "lucide-react";
import Breadcrumb from './breadcum';
import axios from 'axios';
import Cookies from 'js-cookie';
import { EnhancedPreviewCards } from './PreviewCards';

export function RoomManagement({ contactsData, contractsData }) {
  const [activeTab, setActiveTab] = useState("contacts");
  const token = Cookies.get('token');

  const ContactsTab = () => {
    const [contacts, setContacts] = useState(contactsData?.contacts || []);
    const [loading, setLoading] = useState(true);
    const fetchAllRoomDetails = async () => {
      try {
        const updatedContacts = await Promise.all(
          contacts.map(async (contact) => {
            try {
              const response = await axios.get(`http://localhost:8000/api/phong/${contact.id}`, {
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}` // Thêm token vào headers
                },
              });
              return { ...contact, roomDetails: response.data }; // Gắn roomDetails vào từng contact
            } catch (err) {
              console.error(`Error fetching room details for room ${contact.id}:`, err);
              return contact; // Nếu lỗi, trả về contact ban đầu
            }
          })
        );
        setContacts(updatedContacts);
      } catch (err) {
        console.error("Error fetching all room details:", err);
      } finally {
        setLoading(false); // Tắt trạng thái loading
      }
    };

    // useEffect để gọi API ngay khi component được mount
    useEffect(() => {
      fetchAllRoomDetails();
    }, []);


    return (
      <TabsContent value="contacts">
        <div className="grid grid-cols-1 gap-4 px-4 pb-4">
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <Card key={contact.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>
                      {contact?.roomDetails?.name}
                    </span>
                    <Badge variant={contact.trang_thai === 0 ? "secondary" : "primary"}>
                      {contact.trang_thai === 0 ? "Trống" : "Có người"}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  {/* Hiển thị hình ảnh phòng */}
                  {contact.roomDetails && (
                    <div className="flex flex-col items-center mb-4">
                      <img
                        src={`http://localhost:8000/storage/${contact.roomDetails.image.split(';')[0]}`} // Thêm đường dẫn
                        alt={contact.roomDetails.name}

                        className="w-full h-40 object-cover rounded-lg" // Điều chỉnh kích thước hình ảnh
                      />
                    </div>
                  )}
                  {contact.roomDetails && (
                    <div>
                      <div className="text-sm gap-2 flex flex-col">
                        <p>Tòa nhà: {contact.roomDetails.ten_toa_nha}</p>
                        <p>Khu vực: {contact.roomDetails.ten_khu_vuc}</p>
                        <p>Diện tích: {contact.roomDetails.dien_tich} m²</p>
                        <p>Giá thuê: {contact.roomDetails.gia_thue.toLocaleString()} VND</p>
                        <p>Tiện ích: {contact.roomDetails.tien_ich}</p>
                        <p>Nội thất: {contact.roomDetails.noi_that}</p>
                      </div>
                    </div>
                  )}

                  <div>
                    <div>
                      <span className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <strong>Tên:</strong>
                      </span>
                      <div className="text-sm mt-1">{contact.ho_ten}</div>
                    </div>
                    <div>
                      <span className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <strong>Điện thoại:</strong>
                      </span>
                      <div className="text-sm mt-1">{contact.so_dien_thoai}</div>
                    </div>
                    <div>
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <strong>Ngày gửi:</strong>
                      </span>
                      <div className="text-sm mt-1">{new Date(contact.created_at).toLocaleDateString()}</div>
                    </div>

                  </div>
                  <div className='md:p-4 p-2 bg-gray-500 text-white rounded-lg'>
                  
                    <div className="text-sm">"{contact.noi_dung}".</div>
                  </div>

                  {/* Hiển thị thông tin chi tiết phòng */}

                  {loading[contact.phong_id] && (
                    <div className="text-sm mt-1 text-gray-500">Đang tải...</div>
                  )}
                </CardContent>
                <CardFooter />
              </Card>
            ))
          ) : (
            <div className="text-center col-span-full">Không có phòng nào để hiển thị.</div>
          )}
        </div>
      </TabsContent>



    );
  }


  const CurrentRoomTab = () => {
    const contracts = contractsData?.contacts || [];

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 pb-4 ">
        {contracts.length > 0 ? (
          contracts.map((contact) => (

            <Card key={contact.id}>
              <EnhancedPreviewCards selectedRoom={null} col={2} selectedUser={null} />
              <CardHeader>
                <CardTitle className="flex justify-between item
                s-center">
                  <span>ID Phòng: {contact.phong_id}</span>
                  <Badge variant={contact.trang_thai === 1 ? 'secondary' : 'primary'}>
                    {contact.trang_thai === 1 ? 'Trống' : 'Có người'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-2">
                <div>
                  <span className='flex items-center gap-2'><User className="h-4 w-4" /><strong>Tên:</strong></span>
                  <div className='ml-6 text-sm mt-1'>{contact.ho_ten}</div>
                </div>
                <div>
                  <span className='flex items-center gap-2'><Phone className="h-4 w-4" /><strong>Điện thoại:</strong></span>
                  <div className='ml-6 text-sm mt-1'>{contact.so_dien_thoai}</div>
                </div>
                <div>
                  <span className='flex items-center gap-2'><Calendar className="h-4 w-4" /><strong>Ngày gửi:</strong></span>
                  <div className='ml-6 text-sm mt-1'>{new Date(contact.created_at).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className='flex items-center gap-2'><Home className="h-4 w-4" /><strong>Nội dung:</strong></span>
                  <div className='ml-6 text-sm mt-1'>{contact.noi_dung}</div>
                </div>
              </CardContent>
              <CardFooter />
            </Card>
          ))
        ) : (
          <div className="text-center col-span-full">Không có hợp đồng nào để hiển thị.</div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 space-y-4 pt-4 pb-16">
      <Breadcrumb />
      <Tabs value={activeTab} className='bg-white p-2 shadow space-y-4 rounded' onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="contacts">Liên hệ</TabsTrigger>
          <TabsTrigger value="current">Hợp đồng</TabsTrigger>
        </TabsList>
        <TabsContent value="contacts">
          <ContactsTab />
        </TabsContent>
        <TabsContent value="current">
          <CurrentRoomTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
