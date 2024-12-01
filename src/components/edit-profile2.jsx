'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Camera, ChevronDown, Eye, EyeClosed } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { changePassword, updateAvatar, updateProfile } from '@/utils/api/Auth/api'
import { Spinner } from './ui/loading'
import Breadcrumb from './breadcum'
import zxcvbn from 'zxcvbn'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const genderOptions = [
    { value: 0, label: 'Nam' },
    { value: 1, label: 'Nữ' },
    { value: 2, label: 'Khác' },
]

const formatDate = (isoDateString) => {
    if (!isoDateString) return '---'
    const date = new Date(isoDateString)
    return date.toISOString().split('T')[0]
}


export default function EditProfile2Component({ user }) {
    const [activeTab, setActiveTab] = useState("canhan")
    const [formData, setFormData] = useState({
        gender: '',
        avatar: 'default-avatar-url.jpg',
        name: '',
        born: '',
        email: '',
        phone: '',
        address: '',
    })

    const [loading, setLoading] = useState(true)
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    });
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [error, setError] = useState('');
    const togglePasswordVisibility = (field) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };
    const isLengthValid = newPassword.length >= 8;
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setNewPassword(password);
        const result = zxcvbn(password);  // Use zxcvbn to evaluate password strength
        setPasswordStrength(result?.score);  // Get score from zxcvbn
        setStrengthText(result?.feedback.suggestions.join(' '));  // Get suggestions if any
    };

    const validateForm = () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            return 'Tất cả các trường đều bắt buộc.';
        }
        if (newPassword.length < 8) {
            return 'Mật khẩu mới phải có ít nhất 8 ký tự.';
        }
        if (newPassword !== confirmPassword) {
            return 'Mật khẩu xác nhận không khớp.';
        }
        return '';
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }
        setError('');

        try {
            const response = await changePassword(currentPassword, newPassword);
            toast.success("Mật khẩu đã được cập nhật thành công!");
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError(err.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
        }
    };

    useEffect(() => {
        if (user) {
            setFormData({
                gender: user.gender ?? -1,
                avatar: user.avatar ?? 'default-avatar-url.jpg',
                name: user.name ?? '',
                born: user.born ?? '',
                email: user.email ?? '',
                phone: user.phone ?? '',
                address: user.address ?? '',
            })
            setLoading(false)
        }
    }, [user])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleAvatarUpload = async (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append("avatar", file)

        try {
            const data = await updateAvatar(formData)
            setFormData(prev => ({ ...prev, avatar: data.avatarUrl }))
            toast.success("Cập nhật ảnh thành công!");
        } catch (error) {
            console.error('Error updating avatar:', error)
        }
    }

    const handleProfileUpdate = async (e) => {
        e.preventDefault()

        const profileData = {
            ...formData,
            currentPassword,
            newPassword,
            confirmPassword,
        }

        try {
            await updateProfile(profileData)
            toast.success("Cập nhật hồ sơ thành công!");
        } catch (error) {
            console.error('Error updating profile:', error)
        }
    }

    const renderPersonalInfo = () => (
        <Card className="p-2">
            <CardHeader>
                <CardTitle>Thông tin cá nhân</CardTitle>
                <CardDescription>Sử dụng địa chỉ thường trú nơi bạn có thể nhận thư.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-6" onSubmit={handleProfileUpdate}>
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-24 w-24">
                            <AvatarImage alt={formData.name || "User"} src={`http://localhost:8000/storage/${formData.avatar}`} />
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
                            <Input id="name" value={formData.name} onChange={handleInputChange} name="name" />
                        </div>
                        <div className="flex flex-col col-span-1 justify-end space-y-2">
                            <Label htmlFor="gender">Giới tính</Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="flex justify-between">
                                        {genderOptions.find(option => option.value === formData.gender)?.label || 'Chọn giới tính'}
                                        <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {genderOptions.map((option) => (
                                        <DropdownMenuItem
                                            key={option.value}
                                            onSelect={() => setFormData(prev => ({ ...prev, gender: option.value }))}
                                        >
                                            {option.label}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="born">Sinh nhật</Label>
                        <Input id="born" value={formData.born} onChange={handleInputChange} name="born" type="date" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="created_at">Ngày tạo tài khoản</Label>
                        <Input disabled id="created_at" value={formatDate(user?.created_at || '')} name="created_at" type="date" />
                    </div>
                    <Button variant="blue" type="submit">Xác nhận</Button>
                </form>
            </CardContent>
        </Card>
    )

    const renderPasswordChange = () => (
        <Card className="p-2">
            <CardHeader>
                <CardTitle>Đổi mật khẩu</CardTitle>
                <CardDescription>Cập nhật mật khẩu liên kết với tài khoản của bạn.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-6" onSubmit={handleChangePassword}>
                    {error && <div className="text-red-500">{error}</div>}

                    {/* Mật khẩu hiện tại */}
                    <div className="space-y-2">
                        <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                        <div className="relative">
                            <Input
                                id="currentPassword"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                name="currentPassword"
                                type={showPassword.currentPassword ? 'text' : 'password'}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('currentPassword')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                                {showPassword.currentPassword ? (
                                    <EyeClosed />
                                ) : (
                                    <Eye />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mật khẩu mới */}
                    <div className="space-y-2">
                        <Label htmlFor="newPassword">Mật khẩu mới</Label>
                        <div className="relative">
                            <Input
                                id="newPassword"
                                value={newPassword}
                                onChange={handlePasswordChange}
                                name="newPassword"
                                type={showPassword.newPassword ? 'text' : 'password'}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('newPassword')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                                {showPassword.newPassword ? (
                                    <EyeClosed />
                                ) : (
                                    <Eye />
                                )}
                            </button>
                        </div>
                        {/* Đo độ mạnh mật khẩu */}
                        <div className="mt-2">
                            <div className={`h-2 w-full bg-gray-200 rounded-md`}>
                                <div
                                    className={`h-full rounded-md ${passwordStrength === 0
                                        ? 'bg-gray-300'
                                        : passwordStrength === 1
                                            ? 'bg-red-500'
                                            : passwordStrength === 2
                                                ? 'bg-yellow-500'
                                                : passwordStrength === 3
                                                    ? 'bg-green-500'
                                                    : 'bg-blue-500'
                                        }`}
                                    style={{ width: `${(passwordStrength / 4) * 100}%` }}
                                />
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                                {passwordStrength === 0
                                    ? 'Mật khẩu quá yếu'
                                    : passwordStrength === 1
                                        ? 'Mật khẩu yếu'
                                        : passwordStrength === 2
                                            ? 'Mật khẩu trung bình'
                                            : passwordStrength === 3
                                                ? 'Mật khẩu mạnh'
                                                : 'Mật khẩu rất mạnh'}
                            </p>
                        </div>
                    </div>

                    {/* Xác nhận mật khẩu */}
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                name="confirmPassword"
                                type={showPassword.confirmPassword ? 'text' : 'password'}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('confirmPassword')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                                {showPassword.confirmPassword ? (
                                    <EyeClosed />
                                ) : (
                                    <Eye />
                                )}
                            </button>
                        </div>
                    </div>



                    <Button variant="blue" type="submit">
                        Xác nhận
                    </Button>
                </form>
            </CardContent>
        </Card>
    )

    const renderContactInfo = () => (
        <Card className="p-2">
            <CardHeader>
                <CardTitle>Thông tin liên hệ</CardTitle>
                <CardDescription>Vui lòng nhập Thông tin liên hệ để xác nhận tất cả các thiết bị.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-6" onSubmit={handleProfileUpdate}>
                    <div className="space-y-2">
                        <Label htmlFor="email">Địa chỉ Email</Label>
                        <Input id="email" value={formData.email} onChange={handleInputChange} name="email" type="email" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Số điện thoại</Label>
                        <Input id="phone" value={formData.phone} onChange={handleInputChange} name="phone" type="tel" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Địa chỉ</Label>
                        <Input id="address" value={formData.address} onChange={handleInputChange} name="address" type="text" />
                    </div>
                    <Button variant="blue" type="submit">Lưu thông tin liên hệ</Button>
                </form>
            </CardContent>
        </Card>
    )

    return (
        <>
            <div className="container mx-auto px-4 py-4 flex flex-wrap gap-4">
                <Breadcrumb />
                {loading ? (
                    <div className='flex justify-center w-full h-64'><Spinner /></div>
                ) : (
                    <>
                        <Card className="w-full md:w-1/5 border-r">
                            <nav className="space-y-2 p-4">
                                {[
                                    { id: "canhan", label: "Thông tin cá nhân" },
                                    { id: "lienhe", label: "Thông tin liên hệ" },
                                    { id: "doiMatKhau", label: "Đổi mật khẩu" }
                                ].map(({ id, label }) => (
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
                                        {label}
                                    </button>
                                ))}
                            </nav>
                        </Card>
                        <div className="flex-1">
                            {activeTab === "canhan" && renderPersonalInfo()}
                            {activeTab === "doiMatKhau" && renderPasswordChange()}
                            {activeTab === "lienhe" && renderContactInfo()}
                        </div>
                    </>
                )}
            </div>

        </>
    )
}