'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, User, Phone, Calendar, FileText } from "lucide-react";
import Breadcrumb from './breadcum';

export function RoomManagement({ roomsData }) {
  const [activeTab, setActiveTab] = useState("contacts");

  const ContactsTab = () => {
    const contacts = roomsData?.contacts || [];

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 pb-4 ">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <Card key={contact.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
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
          <div className="text-center col-span-full">Không có phòng nào để hiển thị.</div>
        )}
      </div>
    );
  };

  const ProfilesTab = () => (
    <div className="grid grid-cols-1 gap-4 h-64">
      {roomsData && roomsData.length > 0 ? (
        roomsData.map((room) => (
          <Card key={room.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Phòng {room.id_room}</span>
                <Badge variant="secondary">Phòng có hồ sơ</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-2">
              <div>
                <span className='flex items-center gap-2'>
                  <User className="h-4 w-4" />
                  <strong>Tên:</strong>
                </span>
                <div className='ml-6 text-sm mt-1'>{room.user?.name || 'Chưa có thông tin'}</div>
              </div>
              <div>
                <span className='flex items-center gap-2'>
                  <Calendar className="h-4 w-4" />
                  <strong>Ngày gửi:</strong>
                </span>
                <div className='ml-6 text-sm mt-1'>{room.created_at}</div>
              </div>
              <div>
                <span className='flex items-center gap-2'>
                  <FileText className="h-4 w-4" />
                  <strong>Hồ sơ PDF:</strong>
                </span>
                <div className='ml-6 text-sm mt-1'>
                  {room.pdf_url ? (
                    <a href={room.pdf_url} target="_blank" rel="noopener noreferrer">
                      Tải hồ sơ
                    </a>
                  ) : (
                    <span>Không có hồ sơ PDF</span>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter />
          </Card>
        ))
      ) : (
        <div className="text-center col-span-full">Không có phòng nào để hiển thị.</div>
      )}
    </div>
  );

  const CurrentRoomTab = () => (
    <Card className="border-none w-full h-64">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Hợp đồng hiện tại</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">Không có hợp đồng hiện tại.</div>
      </CardContent>
    </Card>
  );

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
