"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, Building, CakeIcon, CalendarDays, Mail, MapPin, Phone, User2 } from "lucide-react";
import { ProductCardColCheapComponent } from "./product-card-cheap";
import { useFetchCheapHouse } from "@/utils/api/GET/api";
import { Spinner } from "./ui/loading";
import ErrorComponent from "./ui/error";

export default function UserProfile({ GoEditProfile }) {
    const { CheapHouse, loading: CheapLoading, error: CheapError } = useFetchCheapHouse();

    return (
        <div className="container mx-auto p-4 space-y-8">
            <Card className="flex justify-between bg-white bg-opacity-75 px-2 py-4 border rounded-lg">
                <div className="flex items-end space-x-4">
                    <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                        <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Nguyễn Văn A" />
                        <AvatarFallback>NVA</AvatarFallback>
                    </Avatar>
                    <div className="mb-1">
                        <h1 className="text-3xl font-bold text-blue-900 mb-1">Nguyễn Văn A</h1>
                        <p className="text-gray-600 flex items-center">
                            <MapPin className="w-4 h-4 mr-1" /> Quận 12, Cầu Giấy, Mũi Cà Mau, Việt Nam
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
                            <p className="flex items-center"><Phone className="w-4 h-4 mr-2" /> +84 123 456 789</p>
                            <p className="flex items-center"><Mail className="w-4 h-4 mr-2" /> nguyenvana@email.com</p>
                            <p className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> Quận 12, Cầu Giấy, Mũi Cà Mau</p>
                        </div>
                        <Button variant="orange" className="w-full">Liên hệ ngay</Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 space-y-4">
                        <h2 className="text-2xl font-semibold">Thông tin cá nhân</h2>
                        <div className="space-y-2">
                            <p className="flex items-center"><User2 className="w-4 h-4 mr-2" /> Nam</p>
                            <p className="flex items-center"><CakeIcon className="w-4 h-4 mr-2" /> 28/02/2004</p>
                            <p className="flex items-center"><Building className="w-4 h-4 mr-2" /> Đại Học Sư Phạm Kỹ Thuật</p>
                            <p className="flex items-center"><CalendarDays className="w-4 h-4 mr-2" /> Tham gia từ Tháng 1, 2023</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 space-y-4">
                        <h2 className="text-2xl font-semibold">Ưu tiên thuê trọ</h2>
                        <div className="space-y-2">
                            <p><strong className="mr-2">Loại phòng:</strong> Phòng riêng</p>
                            <p><strong className="mr-2">Ngân sách:</strong> 3 - 5 triệu VND/tháng</p>
                            <p><strong className="mr-2">Khu vực:</strong> Quận Cầu Giấy, Hà Nội</p>
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
