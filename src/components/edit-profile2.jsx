'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Camera } from 'lucide-react'

export default function EditProfile2Component({user}) {
    const [activeTab, setActiveTab] = useState("canhan"); 
    const menuItems = [
        { id: "canhan", label: "Thông tin cá nhân" },
        { id: "lienhe", label: "Thông tin liên hệ" },
        { id: "doiMatKhau", label: "Đổi mật khẩu" },
    ]
    return (
        <div className="container mx-auto p-4 flex gap-4 flex-wrap">
            <Card className="w-full md:w-1/5 border-r">
                <nav className="space-y-2 p-4">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={cn(
                                "w-full text-left px-4 py-2 rounded-lg transition-colors  ",
                                activeTab === item.id
                                    ? "bg-orange-500 text-primary-foreground"
                                    : "hover:bg-muted"
                            )}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>
            </Card>
            <div className="flex-1 space-y-6">
                {activeTab === "canhan" && (
                    <Card className="p-2">
                        <CardHeader>
                            <CardTitle>Thông tin cá nhân</CardTitle>
                            <CardDescription>Sử dụng địa chỉ thường trú nơi bạn có thể nhận thư.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage alt={user?.name || "---"}  src={user?.avatar || "---"} />
                                        <AvatarFallback><Camera className="opacity-75" /></AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <Button variant="outline" onClick={() => document.getElementById('avatar-upload')?.click()}>
                                            Đổi ảnh đại diện
                                        </Button>
                                        <input
                                            id="avatar-upload"
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0]
                                                if (file) {
                                                    const reader = new FileReader()
                                                    reader.onload = (e) => setAvatar(e.target?.result)
                                                    reader.readAsDataURL(file)
                                                }
                                            }}
                                        />
                                        <p className="text-sm text-muted-foreground mt-1">JPG, GIF hoặc PNG. Tối đa 1MB.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Họ Tên</Label>
                                        <Input id="name" value={user?.name || "---"} name="name" />

                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="born">Sinh nhật</Label>
                                    <Input id="born" value={user?.born || "---"}  name="born" type="date" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Địa chỉ Email</Label>
                                    <Input id="email" value={user?.email || "---"}  name="email" type="email" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="created_at">Ngày tạo tài khoản</Label>
                                    <Input disabled id="created_at" value={user?.created_at || "---"}  name="created_at" type="date" />
                                </div>


                                <Button variant="blue" type="submit">Xác nhận</Button>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {activeTab === "doiMatKhau" && (
                    <Card className="p-2">
                        <CardHeader>
                            <CardTitle>Đổi mật khẩu</CardTitle>
                            <CardDescription>Cập nhật mật khẩu liên kết với tài khoản của bạn.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="matKhauHienTai">Mật khẩu hiện tại</Label>
                                    <Input id="matKhauHienTai" name="matKhauHienTai" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="matKhauMoi">Mật khẩu mới</Label>
                                    <Input id="matKhauMoi" name="matKhauMoi" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="xacNhanMatKhau">Xác nhận mật khẩu</Label>
                                    <Input id="xacNhanMatKhau" name="xacNhanMatKhau" type="password" />
                                </div>
                                <Button variant="blue" type="submit">Xác nhận</Button>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {activeTab === "lienhe" && (
                    <Card className="p-2">
                        <CardHeader>
                            <CardTitle>Thông tin liên hệ</CardTitle>
                            <CardDescription>Vui lòng nhập Thông tin liên hệ để xác nhận tất cả các thiết bị.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Địa chỉ Email</Label>
                                    <Input id="email" name="email" value={user?.email || "---"} type="email" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Số điện thoại</Label>
                                    <Input id="phone" name="phone" value={user?.phone || "---"}  type="tel" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Địa chỉ</Label>
                                    <Input id="address" name="address" value={user?.address || "---"}  type="text" />
                                </div>
                                <Button variant="blue" type="submit">Lưu thông tin liên hệ</Button>
                            </form>
                        </CardContent>
                    </Card>

                )}

            </div>
        </div>
    )
}
