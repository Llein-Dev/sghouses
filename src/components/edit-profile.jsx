'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function EditProfileComponent() {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'Nguyễn Văn A',
    gender: 'Nam',
    birthDate: '2004-02-28',
    education: 'Đại Học sư phạm kỹ thuật',
    joinDate: 'Tháng 1, 2023'
  })

  const [contactInfo, setContactInfo] = useState({
    phone: '+84 123 456 789',
    email: 'nguyenvana@email.com',
    address: 'Quận 12, Cầu giấy, Mũi Cà Mau, Việt Nam'
  })

  const [preferences, setPreferences] = useState({
    roomType: 'Phòng riêng',
    budget: '3 - 5 triệu VND/tháng',
    preferredArea: 'Quận Cầu Giấy, Hà Nội'
  })

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
    // Handle personal info submission
    console.log('Updated personal info:', personalInfo)
    alert('Thông tin cá nhân đã được cập nhật!')
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    // Handle contact info submission
    console.log('Updated contact info:', contactInfo)
    alert('Thông tin liên hệ đã được cập nhật!')
  }

  const handlePreferencesSubmit = (e) => {
    e.preventDefault()
    // Handle preferences submission
    console.log('Updated preferences:', preferences)
    alert('Thông tin ưu tiên đã được cập nhật!')
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    // Handle password update submission
    console.log('Updated password:', password)
    alert('Mật khẩu đã được cập nhật!')
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
              alt="Profile Picture"
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
              <div>
                <Label htmlFor="fullName">Họ và tên</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={personalInfo.fullName}
                  onChange={handlePersonalChange} />
              </div>
              <div>
                <Label htmlFor="gender">Giới tính</Label>
                <Select
                  name="gender"
                  value={personalInfo.gender}
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
                <Label htmlFor="birthDate">Ngày sinh</Label>
                <Input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={personalInfo.birthDate}
                  onChange={handlePersonalChange} />
              </div>
              <div>
                <Label htmlFor="education">Trường học</Label>
                <Input
                  id="education"
                  name="education"
                  value={personalInfo.education}
                  onChange={handlePersonalChange} />
              </div>
              <div>
                <Label htmlFor="joinDate">Tham gia từ</Label>
                <Input
                  id="joinDate"
                  name="joinDate"
                  value={personalInfo.joinDate}
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
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input id="phone" name="phone" value={contactInfo.phone} onChange={handleContactChange} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={contactInfo.email}
                  onChange={handleContactChange} />
              </div>
              <div>
                <Label htmlFor="address">Địa chỉ</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={contactInfo.address}
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
                <Label htmlFor="password">Mật khẩu cũ</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange} />
              </div>
              <div>
                <Label htmlFor="password">Mật khẩu mới</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange} />
              </div>
              <div>
                <Label htmlFor="password">Xác nhận mật khẩu</Label>
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
