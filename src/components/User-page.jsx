"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight, Camera, CakeIcon, CalendarDays, Mail, MapPin, Phone, User2, House, PaintBucket } from "lucide-react"
import { ProductCardColCheapComponent } from "@/components/product-card-cheap"
import { useFetchCheapHouse } from "@/utils/api/GET/api"
import Breadcrumb from "./breadcum"
import { Spinner } from "./ui/loading"




export default function UserProfile({ user, GoEditProfile, GoManageRoom }) {
    const { CheapHouse, loading: CheapLoading, error: CheapError } = useFetchCheapHouse()

    const getGenderLabel = (gender) => {
        switch (gender) {
            case 0:
                return "Nam"
            case 1:
                return "Nữ"
            case -1:
                return "Khác"
            default:
                return "---"
        }
    }

    return (
        <div className="container mx-auto px-4 space-y-4 py-4">
            <Breadcrumb />
            <Card className="bg-white bg-opacity-75">
                <CardContent className="flex flex-col sm:flex-row justify-between items-center p-6 space-y-4 sm:space-y-0">
                    <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-4">
                        <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                            <AvatarImage src={`http://localhost:8000/storage/${user?.avatar}`} alt={user?.name || "User"} />
                            <AvatarFallback><Camera className="opacity-75" /></AvatarFallback>
                        </Avatar>
                        <div className="text-center sm:text-left">
                            <h1 className="text-2xl sm:text-3xl font-bold text-blue-900">{user?.name || "---"}</h1>
                            <p className="text-gray-600 flex items-center justify-center sm:justify-start">
                                <Mail className="w-4 h-4 mr-1" />{user?.email || "---"}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col w-full md:w-auto space-y-4">
                        <Button size="sm" onClick={GoEditProfile} variant="blue" className="w-full sm:w-auto">
                            <PaintBucket /> Chỉnh sửa
                        </Button>
                        <Button size="sm" onClick={GoManageRoom} variant="blue" className="w-full sm:w-auto">
                            <House /> Thuê Phòng
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-6 space-y-4">
                        <h2 className="text-2xl font-semibold">Thông tin liên hệ</h2>
                        <div className="space-y-2">
                            <p className="flex items-center"><Phone className="w-4 h-4 mr-2" /> {user?.phone || "---"}</p>
                            <p className="flex items-center"><Mail className="w-4 h-4 mr-2" /> {user?.email || "---"}</p>
                            <p className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> {user?.address || "---"}</p>
                        </div>
                        <Button variant="orange" className="w-full">Liên hệ ngay</Button>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2">
                    <CardContent className="p-6 space-y-4">
                        <h2 className="text-2xl font-semibold">Thông tin cá nhân</h2>
                        <div className="space-y-2">
                            <p className="flex items-center"><User2 className="w-4 h-4 mr-2" />Giới tính: {getGenderLabel(user?.gender)}</p>
                            <p className="flex items-center"><CakeIcon className="w-4 h-4 mr-2" />Sinh nhật: {user?.born || "---"}</p>
                            <p className="flex items-center"><CalendarDays className="w-4 h-4 mr-2" />Ngày tạo: {user?.created_at || "---"}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="w-full">
                <div className="h-0.5 bg-gray-900 opacity-10 w-full"></div>
            </div>

            <div className="space-y-8">
                <h2 className="font-bold text-2xl text-[#00008B]">Phòng trọ <span className="text-[#FF5C00]">giá rẻ</span></h2>

                {CheapLoading && <div className="flex justify-center"><Spinner /></div>}
                {CheapError && <ErrorComponent message={CheapError} />}

                {!CheapError && !CheapLoading && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <ProductCardColCheapComponent productsHouseCheap={CheapHouse} />
                        </div>
                        <div className="flex justify-center">
                            <Button variant="blue" className="w-36">
                                Xem chi tiết <ArrowRight className="ml-2" />
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}