'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, User, Send, Zap, Droplet, Phone } from "lucide-react";

const roomsData = [
  { id: 1, id_room: '101', status: 'vacant', id_user: 'U001', name: 'Nguyen Van A', content: 'Quan tâm đến phòng trọ này', phone: '0123456789' },
  { id: 2, id_room: '102', status: 'vacant', id_user: 'U002', name: 'Tran Thi B', content: 'Cần biết thêm chi tiết', phone: '0987654321' },
  { id: 3, id_room: '103', status: 'occupied', id_user: 'U003', name: 'Le Van C', content: '', phone: '' },
  // More room data...
]

// Mock data for current room
const currentRoom = {
  id_room: '101',
  rent: 3000000,
  electricityRate: 3500,
  waterRate: 15000,
  electricityReading: 100,
  waterReading: 10,
}

export function RoomManagement() {
  const [activeTab, setActiveTab] = useState('contacts')
  const [message, setMessage] = useState('')

  const calculateBill = () => {
    const electricityCost = currentRoom.electricityReading * currentRoom.electricityRate
    const waterCost = currentRoom.waterReading * currentRoom.waterRate
    return electricityCost + waterCost + currentRoom.rent
  }

  const ContactsTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {roomsData
        .filter(room => room.status === 'vacant')
        .map((room) => (
          <Card key={room.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Phòng {room.id_room}</span>
                <Badge variant="secondary">Trống</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-2">
              <div className="flex items-center gap-2">

                <div>
                  <span className='flex items-center gap-2'> <User className="h-4 w-4" /><strong>ID Người dùng:</strong></span>
                  <div>{room.idUser}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <div>
                  <span className='flex items-center gap-2'><User className="h-4 w-4" /><strong>Tên:</strong></span>
                  <div>{room.name}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2">

                <div>
                  <span className='flex items-center gap-2'> <Home className="h-4 w-4" /><strong>Nội dung:</strong></span>
                  <div>{room.content}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2">

                <div>
                  <span className='flex items-center gap-2'> <Phone className="h-4 w-4" /><strong>Điện thoại:</strong></span>
                  <div>{room.phone}</div>
                </div>
              </div>

            </CardContent>

            <CardFooter>

            </CardFooter>
          </Card>
        ))}
    </div>
  )
  const ProfilesTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {roomsData.filter(room => room.hasProfile).map((room) => (
        <Card key={room.id}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Phòng {room.id_room}</span>
              <Badge variant={room.status === 'occupied' ? 'default' : 'secondary'}>
                {room.status === 'occupied' ? 'Đang ở' : 'Trống'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span>{room.status === 'occupied' ? 'Có người ở' : 'Phòng trống'}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <User className="h-4 w-4" />
              <span>Có hồ sơ</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Xem hồ sơ</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )

  const CurrentRoomTab = () => (
    <Card className="border-none w-full">
      <CardHeader>
        <CardTitle>Phòng hiện tại: {currentRoom.id_room}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="electricity">Chỉ số điện</Label>
            <div className="flex items-center">
              <Zap className="h-4 w-4 mr-2" />
              <Input
                id="electricity"
                type="id_room"
                value={currentRoom.electricityReading}
                readOnly />
            </div>
          </div>
          <div>
            <Label htmlFor="water">Chỉ số nước</Label>
            <div className="flex items-center">
              <Droplet className="h-4 w-4 mr-2" />
              <Input id="water" type="id_room" value={currentRoom.waterReading} readOnly />
            </div>
          </div>
        </div>

        <div className="bg-muted p-4 rounded-md">
          <h3 className="font-semibold mb-2">Chi phí tháng này</h3>
          <div className="flex items-center justify-between">
            <span>Tiền thuê nhà:</span>
            <span>{currentRoom.rent.toLocaleString()} VND</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Tiền điện:</span>
            <span>{(currentRoom.electricityReading * currentRoom.electricityRate).toLocaleString()} VND</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Tiền nước:</span>
            <span>{(currentRoom.waterReading * currentRoom.waterRate).toLocaleString()} VND</span>
          </div>
          <div className="flex items-center justify-between font-bold mt-2">
            <span>Tổng cộng:</span>
            <span>{calculateBill().toLocaleString()} VND</span>
          </div>
        </div>

        <div>
          <Label htmlFor="message">Liên hệ với chủ nhà</Label>
          <Input
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Nhập tin nhắn cho chủ nhà" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Send className="h-4 w-4 mr-2" />
          Gửi tin nhắn cho chủ nhà
        </Button>
      </CardFooter>
    </Card>
  )

  return (
    (<div className="container mx-auto px-4 py-4">
      <Tabs value={activeTab} className='bg-white p-2 shadow space-y-4 rounded' onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="contacts">Liên hệ</TabsTrigger>
          <TabsTrigger value="profiles">Hồ sơ</TabsTrigger>
          <TabsTrigger value="current">Phòng của tôi</TabsTrigger>
        </TabsList>
        <TabsContent value="contacts">
          <ContactsTab />
        </TabsContent>
        <TabsContent value="profiles">
          <ProfilesTab />
        </TabsContent>
        <TabsContent value="current">
          <CurrentRoomTab />
        </TabsContent>
      </Tabs>
    </div>)
  );
}