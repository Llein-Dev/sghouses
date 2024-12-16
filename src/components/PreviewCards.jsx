import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

import { Home, User, Square, MapPin, Building, Calendar, Phone, Mail } from 'lucide-react'


export function EnhancedPreviewCards({ selectedRoom, selectedContract, selectedUser, col = 1 }) {
  console.log(selectedContract);

  const gridColsClass = `grid text-sm grid-cols-1 md:grid-cols-${col} gap-4`;
  return (
    <div className={gridColsClass}>
      <Card className="overflow-hidden">
        <CardHeader className="">
          <CardTitle className="flex text-lg items-center space-x-2">
            <Home className="h-4 w-4" />
            <span>Phòng trọ</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          {selectedRoom ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold">{selectedRoom.ten_phong}</h3>
                <Badge variant={selectedRoom.trang_thai === 'Trống' ? 'success' : 'destructive'}>
                  {selectedRoom.trang_thai}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Square className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedRoom.dien_tich} m²</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedRoom.ten_khu_vuc}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedRoom.ten_toa_nha}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedRoom.ngay_tao}</span>
                </div>
              </div>
              {selectedRoom.hinh_anh && (
                <div className="mt-4 rounded-lg overflow-hidden">
                  <img src={`${process.env.NEXT_PUBLIC_PATH_FILE}${selectedRoom.hinh_anh}`} alt={selectedRoom.ten_phong}
                    className="w-full h-32 object-cover"
                  />
                </div>
              )}
            </div>
          ) : (
            <> </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-secondary/10">
          <CardTitle className="flex text-lg items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Khách hàng</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          {selectedUser ? (
            <div className="flex items-start space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={`${process.env.NEXT_PUBLIC_PATH_FILE}${selectedUser.avatar}`} alt={selectedUser.name} />
                <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h3 className="text-base  font-semibold">{selectedUser.name}</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>{selectedUser.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>{selectedUser.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Sinh nhật: {selectedUser.born}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Giới tính: {selectedUser.gender === 1 ? 'Male' : 'Female'}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <> </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="bg-secondary/10">
          <CardTitle className="flex text-lg items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Khách hàng</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          {selectedUser ? (
            <div className="flex items-start space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={`${process.env.NEXT_PUBLIC_PATH_FILE}${selectedUser.avatar}`} alt={selectedUser.name} />
                <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h3 className="text-base  font-semibold">{selectedUser.name}</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>{selectedUser.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>{selectedUser.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Sinh nhật: {selectedUser.born}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Giới tính: {selectedUser.gender === 1 ? 'Male' : 'Female'}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <> </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


