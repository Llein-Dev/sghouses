'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, User, Phone, Calendar, FileText, Command, MapPin } from "lucide-react";
import Breadcrumb from './breadcum';
import axios from 'axios';
import Cookies from 'js-cookie';
import { EnhancedPreviewCards } from './PreviewCards';
import { Spinner } from './ui/loading';

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
          {loading ? ( // Check if loading
            <div className="text-center col-span-full"><Spinner /></div> // Display loading message
          ) : contacts.length > 0 ? (
            contacts.map((contact) => (
              contact.roomDetails && (
                <Card key={contact.id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{contact?.roomDetails?.name}</span>
                      <Badge variant={contact.trang_thai === 0 ? "secondary" : "primary"}>
                        {contact.trang_thai === 0 ? "Trống" : "Có người"}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 grid-cols-1 gap-4">
                    {/* Hiển thị hình ảnh phòng */}
                    <div className="flex flex-col items-center mb-4">
                      <img
                        src={`http://localhost:8000/storage/${contact.roomDetails.image.split(';')[0]}`} // Thêm đường dẫn
                        alt={contact.roomDetails.name}
                        className="w-full h-40 object-cover rounded-lg" // Điều chỉnh kích thước hình ảnh
                      />
                    </div>

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

                    <div className='md:p-4 p-2 bg-gray-500 relative text-white rounded-lg'>
                      <User className='absolute top-4 right-4 hidden md:block' />
                      <div className="text-sm pr-4">"{contact.noi_dung}".</div>
                    </div>
                  </CardContent>
                  <CardFooter />
                </Card>
              )
            ))
          ) : (
            <div className="text-center col-span-full">Không có phòng nào để hiển thị.</div>
          )}
        </div>

      </TabsContent>



    );
  }


  const CurrentRoomTab = () => {

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 pb-4">
        {contractsData.length > 0 ? (
          contractsData.map((contract) => (
            <Card key={contract.id}>
              <CardHeader className="bg-secondary/10">
                <CardTitle className="flex justify-between items-center">
                  <span>{contract.name_room}</span>
                  <Badge variant={contract.status === 'Hết hạn' ? 'destructive' : 'success'}>
                    {contract.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{contract.name_user}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Thời gian: {new Date(contract.date_start).toLocaleDateString()} - {new Date(contract.date_end).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{contract.name_building}</span>
                </div>
                {contract.image_room && (
                  <div className="mt-4 rounded-lg overflow-hidden">
                    <img src={`http://localhost:8000/storage/${contract.image_room}`} alt={contract.name_room} className="w-full h-48 object-cover" />
                  </div>
                )}
              </CardContent>
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
