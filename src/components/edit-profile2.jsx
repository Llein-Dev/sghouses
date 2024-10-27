'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Camera, ChevronDown } from 'lucide-react'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { updateAvatar, updateProfile } from '@/utils/api/Auth/api'


export default function EditProfile2Component({ user }) {
    const [activeTab, setActiveTab] = useState("canhan");
    const [gender, setGender] = useState(user?.gender || "Chọn giới tính");
    const [avatar, setAvatar] = useState(user?.avatar || 'default-avatar-url.jpg');
    const [name, setName] = useState(user?.name || '');
    const [born, setBorn] = useState(user?.born || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [address, setAddress] = useState(user?.address || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleAvatarUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("avatar", file);

        try {
            const data = await updateAvatar(formData);
            setAvatar(data.avatarUrl);
            alert('Avatar updated successfully!');
        } catch (error) {
            console.error('Error updating avatar:', error);
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();

        const profileData = {
            name,
            gender,
            born,
            email,
            phone,
            address,
            currentPassword,
            newPassword,
            confirmPassword,
        };

        try {
            await updateProfile(profileData);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="container mx-auto p-4 flex gap-4 flex-wrap">
            <Card className="w-full md:w-1/5 border-r">
                <nav className="space-y-2 p-4">
                    {["canhan", "lienhe", "doiMatKhau"].map((id) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={cn(
                                "w-full text-left px-4 py-2 rounded-lg transition-colors",
                                activeTab === id
                                    ? "bg-orange-500 text-primary-foreground"
                                    : "hover:bg-muted"
                            )}
                        >
                            {id === "canhan" ? "Thông tin cá nhân" : id === "lienhe" ? "Thông tin liên hệ" : "Đổi mật khẩu"}
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
                            <form className="space-y-6" onSubmit={handleProfileUpdate}>
                                <div className="flex items-center space-x-4">
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage alt={user?.name || "User"} src={avatar} />
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
                                            onChange={handleAvatarUpload}
                                        />
                                        <p className="text-sm text-muted-foreground mt-1">JPG, GIF hoặc PNG. Tối đa 1MB.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2 col-span-2">
                                        <Label htmlFor="name">Họ Tên</Label>
                                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} name="name" />
                                    </div>
                                    <div className="flex flex-col col-span-1 justify-end space-y-2">
                                        <Label htmlFor="gender">Giới tính</Label>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className="flex justify-between">
                                                    {gender} <ChevronDown className="ml-2 h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                {["Nam", "Nữ", "Khác"].map((item) => (
                                                    <DropdownMenuItem
                                                        key={item}
                                                        onSelect={() => setGender(item)}
                                                    >
                                                        {item}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="born">Sinh nhật</Label>
                                    <Input id="born" value={born} onChange={(e) => setBorn(e.target.value)} name="born" type="date" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="created_at">Ngày tạo tài khoản</Label>
                                    <Input disabled id="created_at" placeholder={user?.created_at || "---"} name="created_at" type="date" />
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
                            <form className="space-y-6" onSubmit={handleProfileUpdate}>
                                <div className="space-y-2">
                                    <Label htmlFor="matKhauHienTai">Mật khẩu hiện tại</Label>
                                    <Input id="matKhauHienTai" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} name="matKhauHienTai" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="matKhauMoi">Mật khẩu mới</Label>
                                    <Input id="matKhauMoi" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} name="matKhauMoi" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="xacNhanMatKhau">Xác nhận mật khẩu</Label>
                                    <Input id="xacNhanMatKhau" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name="xacNhanMatKhau" type="password" />
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
                            <form className="space-y-6" onSubmit={handleProfileUpdate}>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Địa chỉ Email</Label>
                                    <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Số điện thoại</Label>
                                    <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} name="phone" type="tel" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Địa chỉ</Label>
                                    <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} name="address" type="text" />
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
