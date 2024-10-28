"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, Building, CakeIcon, CalendarDays, Camera, Mail, MailIcon, MapPin, Phone, User2 } from "lucide-react";
import { ProductCardColCheapComponent } from "./product-card-cheap";
import { useFetchCheapHouse } from "@/utils/api/GET/api";
import { Spinner } from "./ui/loading";
import ErrorComponent from "./ui/error";
import Breadcrumb from "./breadcum";

export default function UserProfile({ user, GoEditProfile }) {
    const { CheapHouse, loading: CheapLoading, error: CheapError } = useFetchCheapHouse();
    const getGenderLabel = (gender) => {
        switch (gender) {
            case 0:
                return "Nam";
            case 1:
                return "Nữ";
            case -1:
                return "Khác"; // Hoặc có thể không hiển thị gì nếu không cần
            default:
                return "---";
        }
    };

    return (
        <div className="container mx-auto px-4 space-y-4 py-4 gap-4">
            <Breadcrumb />
            <Card className="flex justify-between bg-white bg-opacity-75 px-2 py-4 border rounded-lg">
                <div className="flex items-end space-x-4">
                    <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                        <AvatarImage src={`http://localhost:8000/storage/${user?.avatar}`} alt={user?.name || "---"} />
                        <AvatarFallback><Camera className="opacity-75" /></AvatarFallback>
                    </Avatar>
                    <div className="mb-1">
                        <h1 className="text-3xl font-bold text-blue-900 mb-1">{user?.name || "---"}</h1>
                        <p className="text-gray-600 flex items-center">
                            <MailIcon className="w-4 h-4 mr-1" />{user?.email || "---"}
                        </p>
                    </div>
                </div>
                <Button onClick={GoEditProfile} variant="blue" size="lg">Thay đổi thông tin</Button>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <Card className="col-span-2">
                    <CardContent className="p-6 space-y-4">
                        <h2 className="text-2xl font-semibold">Thông tin cá nhân</h2>
                        <div className="space-y-2">
                            <p className="flex items-center"><User2 className="w-4 h-4 mr-2" />Giới tính: {getGenderLabel(user?.gender) || "---"}</p>
                            <p className="flex items-center"><CakeIcon className="w-4 h-4 mr-2" />Sinh nhật: {user?.born || "---"}</p>
    
                            <p className="flex items-center"><CalendarDays className="w-4 h-4 mr-2" />Ngày tạo: {user?.created_at || "---"}</p>
                        </div>
                    </CardContent>
                </Card>

            </div>

            <div className="py-12 w-full">
                <div className="h-0.5 bg-gray-900 opacity-10 w-full"></div>
            </div>

            <div className="px-4 space-y-8 flex flex-col justify-center items-center container mx-auto">
                <h2 className="text-start w-full font-bold text-2xl text-[#00008B]">Phòng trọ <span className="text-[#FF5C00]">giá rẻ</span></h2>

                {CheapLoading && <p className="text-center"><Spinner /></p>} {/* Hiển thị loading */}
                {CheapError && <ErrorComponent message={CheapError} />} {/* Hiển thị lỗi */}

                {!CheapError && (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-6 mb-12">
                            <ProductCardColCheapComponent productsHouseCheap={CheapHouse} />
                        </div>
                        <Button className="w-36" variant="blue">Xem chi tiết <ArrowRight /></Button>
                    </>
                )}
            </div>
        </div>
    );
}
