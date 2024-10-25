import { useState } from "react";
import { Heart, ChevronLeft, ChevronRight, Lightbulb, Droplet, Wifi, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function RoomComponents({ room }) {  // Nhận props room
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = Object.values(room.gallery);  // Lấy hình ảnh từ room.gallery

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <Card className="w-full border-none shadow-md">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Image Column */}
          <div className="w-full lg:w-1/3">
            <Dialog>
              <DialogTrigger asChild>
                <img
                  src={images[0]}  // Hiển thị hình ảnh đầu tiên
                  alt="Room Image"
                  width={1600}
                  height={900}
                  className="rounded-md object-cover w-full h-64 lg:h-full cursor-pointer"
                />
              </DialogTrigger>
              <DialogContent className="max-w-[60vw] max-h-[90vh] p-0">
                <div className="relative h-full">
                  <img
                    src={images[currentImageIndex]}
                    alt={`Room Image ${currentImageIndex + 1}`}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-1/2 left-2 rounded-full"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-1/2 right-2 rounded-full"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Content Column */}
          <div className="w-full lg:w-1/3 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2"> {room.name}</h3> {/* Hiển thị mã phòng */}
              <p className="text-sm text-green-600 mb-2">Tình trạng: {room.gac_lung ? "Có" : "Không"}</p>
              <p className="text-2xl font-bold mb-2 text-[#FF5C00]">{room.price.toLocaleString()} đ/tháng</p>
              <Badge className="mb-4">Phòng cao cấp</Badge>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Nội thất:</h4>
                  <ul className="text-sm flex flex-wrap gap-x-4 gap-y-2">
                    {room.noi_that.split(",").map((item, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Tiện ích:</h4>
                  <ul className="text-sm flex flex-wrap gap-x-4 gap-y-2">
                    {room.tien_ich.split(",").map((item, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Service Fees Column */}
          <div className="w-full lg:w-1/3 flex flex-col justify-between">
            <div className="flex flex-col h-full">
              <div className="flex-grow">
                <h3 className="text-xl font-semibold mb-4">Phí dịch vụ:</h3>
                <ul className="list-none space-y-4">
                  <li className="flex justify-between items-center pb-2">
                    <span className="flex items-center"><Lightbulb className="h-4 w-4 mr-2" />Điện:</span>
                    <span className="font-medium text-sm ">3,500 đ/kWh</span>
                  </li>
                  <li className="flex justify-between items-center pb-2">
                    <span className="flex items-center"><Droplet className="h-4 w-4 mr-2" />Nước:</span>
                    <span className="font-medium text-sm ">100,000 đ/người/tháng</span>
                  </li>
                  <li className="flex justify-between items-center pb-2">
                    <span className="flex items-center"><Wifi className="h-4 w-4 mr-2" />Internet:</span>
                    <span className="font-medium text-sm ">100,000 đ/phòng/tháng</span>
                  </li>
                  <li className="flex justify-between items-center pb-2">
                    <span className="flex items-center"><Trash className="h-4 w-4 mr-2" />Dọn vệ sinh:</span>
                    <span className="font-medium text-sm ">50,000 đ/lần</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Heart className="h-4 w-4" />
                  <span className="sr-only">Add to favorites</span>
                </Button>
                <Button variant="orange" className="">Thuê ngay</Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
