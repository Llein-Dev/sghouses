'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function EditProfileComponent({ user }) {
  const [password, setPassword] = useState('')

  const handlePersonalChange = (e) => {
    const { name, value } = e.target
    setPersonalInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleContactChange = (e) => {
    const { name, value } = e.target
    setContactInfo(prev => ({ ...prev, [name]: value }))
  }

  const handlePreferencesChange = (e) => {
    const { name, value } = e.target
    setPreferences(prev => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handlePersonalSubmit = (e) => {
    e.preventDefault()
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="container grid grid-cols-3 gap-4 mx-auto ">
        <Card>
          <CardHeader>
            <CardTitle>Ảnh Hồ Sơ</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            {/* Image Box */}
            <img
              src="path/to/your/image.jpg" // Replace with your image path
              alt={user?.avatar || "---"}
              className="w-3/4 aspect-square rounded p-2 border object-cover" // Adjust size and styling as needed
            />


            {/* File Input for Uploading New Image */}
            <Input
              type="file"
              accept="image/*"
              className="mb-4"
              onChange={(e) => {
                const file = e.target.files[0];
                // Handle file change here (e.g., update image preview)
                if (file) {
                  // Update state or preview the new image
                  console.log('Selected file:', file.name);
                }
              }}
            />

          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Thông tin cá nhân</CardTitle>
          </CardHeader>
          <form onSubmit={handlePersonalSubmit} className="space-y-6">
            <CardContent className="space-y-6">
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <Label htmlFor="fullName">Họ và tên<span className='text-red-500'>*</span></Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={user?.name}
                    onChange={handlePersonalChange} />
                </div>
                <div>
                  <Label htmlFor="joinDate">Tham gia từ</Label>
                  <Input
                    id="joinDate"
                    name="joinDate"
                    disabled
                    value={user?.created_at}
                    onChange={handlePersonalChange}
                    aria-readonly="true"
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <Label htmlFor="gender">Giới tính</Label>
                  <Select
                    name="gender"
                    value={user?.gender}
                    onValueChange={(value) => setPersonalInfo(prev => ({ ...prev, gender: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn giới tính" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nam">Nam</SelectItem>
                      <SelectItem value="Nữ">Nữ</SelectItem>
                      <SelectItem value="Khác">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="birthDate">Ngày sinh<span className='text-red-500'>*</span></Label>
                  <Input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={user?.born}
                    onChange={handlePersonalChange} />
                </div>
              </div>
              <div>
                <Label htmlFor="education">Trường học</Label>
                <Input
                  id="education"
                  name="education"
                  value={user?.major}
                  onChange={handlePersonalChange} />
              </div>

              <Button type="submit" className="w-full" variant="blue" >Cập nhật thông tin cá nhân</Button>
            </CardContent>

          </form>
        </Card>


      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <Card >
          <CardHeader>
            <CardTitle>Thông tin liên hệ</CardTitle>
          </CardHeader>
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="phone">Số điện thoại<span className='text-red-500'>*</span></Label>
                <Input id="phone" name="phone" value={user?.phone} onChange={handleContactChange} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={user?.email}
                  onChange={handleContactChange} />
              </div>
              <div>
                <Label htmlFor="address">Địa chỉ<span className='text-red-500'>*</span></Label>
                <Textarea
                  id="address"
                  name="address"
                  value={user?.address}
                  onChange={handleContactChange} />
              </div>
              <Button type="submit" className="w-full" variant="blue" >Cập nhật thông tin liên hệ</Button>
            </CardContent>

          </form>
        </Card>


        <Card >
          <CardHeader>
            <CardTitle>Đặt Mật Khẩu</CardTitle>
          </CardHeader>
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="password">Mật khẩu cũ<span className='text-red-500'>*</span></Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange} />
              </div>
              <div>
                <Label htmlFor="password">Mật khẩu mới<span className='text-red-500'>*</span></Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange} />
              </div>
              <div>
                <Label htmlFor="password">Xác nhận mật khẩu<span className='text-red-500'>*</span></Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange} />
              </div>

              <Button type="button" className="w-full" variant="blue">
                Đổi mật khẩu
              </Button>
            </CardContent>

          </form>
        </Card>
      </div>
    </div>
  );
}
