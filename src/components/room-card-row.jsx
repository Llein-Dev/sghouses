"use client";

import Link from "next/link";
import { Eye, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import FavoriteButton from "./favourite";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Button } from "./ui/button";
import { Label } from "recharts";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { setProfile } from "@/redux/authSlice";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export function RoomCardRowComponent({ product }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      dispatch(setProfile(user)); // Dispatch action to set user profile
      // Update id_user in formData when user changes
      setFormData((prevData) => ({
        ...prevData,
        id_user: user.id, // Update id_user when user is available
      }));
    }
  }, [user, dispatch]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user ? user.name : "",
    phone: user ? user.phone : "",
    content: "",
    id_room: product.id,
    id_user: user ? user.id : "", // Initialize id_user from user state
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const token = Cookies.get("token"); // Get the token from cookies

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const dataToSubmit = {
      ...formData,
      id_user: formData.id_user || null,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/contact_room/add",
        dataToSubmit,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message);
        setIsDialogOpen(false);
      } else {
        throw new Error("Failed to submit rental request");
      }
    } catch (error) {
      if (error.response) {
        // Log chi tiết lỗi từ API
        console.error("Error response data:", error.response.data);
        setIsDialogOpen(false);
        toast.warning(error.response.data.message || 'Bạn có thể đã gửi liên hệ rồi!');
      } else {
        // Nếu không có phản hồi từ API, hiển thị thông báo chung
        console.error("Error:", error.message);
        setIsDialogOpen(false);
        toast.error('Đã xảy ra lỗi. Vui lòng thử lại.');
      }
    }
  };

  // Split the image string and get the first image URL
  const images = product?.hinh_anh ? product.hinh_anh.split(";") : [];
  const firstImage = images[0]; // Take the first image

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <Card className="overflow-hidden ">
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-1/3 md:aspect-[4/3] aspect-video">
          <img
            src={`${process.env.NEXT_PUBLIC_PATH_FILE}${firstImage}`}
            alt={product?.ten_phong}
            className="rounded-t-lg h-full w-full object-cover sm:rounded-l-lg sm:rounded-t-none "
          />
        </div>
        <div className="flex flex-col justify-between w-full sm:w-2/3">
          <CardContent className="p-4 space-y-2">
            <CardTitle className="flex justify-between">
              <div>
                <Link href={`/building/${product?.slug_toa_nha}`}>
                  <h3 className="text-lg font-semibold mb-2">
                    {product?.ten_phong}
                  </h3>
                </Link>
                <Link href={`/building/${product?.slug_toa_nha}`}>
                  <h6 className="text-sm font-normal mb-2">
                    <span className="underline">Tòa nhà:</span>{" "}
                    {product?.ten_toa_nha}
                  </h6>
                </Link>
              </div>
            </CardTitle>
            <div className="flex items-center ">
              <p className="mr-2 text-primary">Giá từ</p>
              <p className="text-lg font-bold text-red-500">
                {(product?.gia_thue)}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {/* Area (Khu vực) */}
              {product?.ten_khu_vuc && (
                <Badge variant="outline" className="bg-blue-900 text-white">
                  {product?.ten_khu_vuc}
                </Badge>
              )}

              {/* Room Size (Diện tích) */}
              {product?.dien_tich && (
                <Badge variant="outline" className="bg-blue-900 text-white">
                  {product?.dien_tich} m²
                </Badge>
              )}

              {/* Electricity Rate (Đơn giá điện) */}
              {product?.don_gia_dien && (
                <Badge variant="outline" className="bg-blue-900 text-white">
                  Điện: {product?.don_gia_dien} VND/kWh
                </Badge>
              )}

              {/* Water Rate (Đơn giá nước) */}
              {product?.don_gia_nuoc && (
                <Badge variant="outline" className="bg-blue-900 text-white">
                  Nước {product?.don_gia_nuoc} VND/m³
                </Badge>
              )}

              {/* Service Fee (Phí dịch vụ) */}
              {product?.phi_dich_vu && (
                <Badge variant="outline" className="bg-blue-900 text-white">
                  Dịch vụ: {product?.phi_dich_vu} VND
                </Badge>
              )}

              {/* Furniture (Nội thất) */}
              {product?.noi_that && product?.noi_that !== "Không" && (
                <div className="flex flex-wrap gap-2">
                  {product.noi_that.split(";").map((item, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-blue-900 text-white"
                    >
                      {item.trim()}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Amenities (Tiện ích) */}
              {product?.tien_ich && product?.tien_ich !== "Không" && (
                <div className="flex flex-wrap gap-2">
                  {product.tien_ich.split(";").map((item, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-blue-900 text-white"
                    >
                      {item.trim()}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Parking Fee (Tiền xe máy) */}
              {product?.tien_xe_may && (
                <Badge variant="outline" className="bg-blue-900 text-white">
                  Xe: {product?.tien_xe_may} VND
                </Badge>
              )}

              {/* Loft (Gác lửng) */}
              {product?.gac_lung && product?.gac_lung !== "Không" && (
                <Badge variant="outline" className="bg-blue-900 text-white">
                  Gác lửng: {product?.gac_lung}
                </Badge>
              )}
            </div>

            <p className="">{product?.mo_ta}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Link
              href={product?.mapLink || "#"} // Use a placeholder or handle undefined
              className="text-sm mr-auto text-primary hover:underline flex items-center"
            >
              <MapPin className="w-4 h-4 mr-1" /> Xem bản đồ
            </Link>


            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="orange">Thuê ngay</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Đăng ký thuê phòng</DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={handleSubmit}
                  className="grid space-y-4 py-4"
                >
                  <div className="grid grid-cols-1 items-center gap-4">
                    <Label htmlFor="fullname">Họ tên</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Nhập họ tên của bạn"
                      className="col-span-3"
                      
                    />
                  </div>
                  <div className="grid grid-cols-1 items-center gap-4">
                    <Label htmlFor="phonenumber">Số điện thoại</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Nhập số điện thoại"
                      className="col-span-3"
                      
                    />
                  </div>
                  <div className="grid grid-cols-1 items-center gap-4">
                    <Label htmlFor="content">Nội dung</Label>
                    <Textarea
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      placeholder="Nhập nội dung yêu cầu của bạn"
                      className="w-full"
                      
                    />
                  </div>
                  <input
                    type="hidden"
                    name="id_user"
                    value={formData.id_user}
                  />
                  <input
                    type="hidden"
                    name="id_room"
                    value={formData.id_room}
                  />
                  <div className="flex justify-end mt-4">
                    <Button
                      className="w-full"
                      variant="orange"
                      type="submit"
                    >
                      Gửi yêu cầu
                    </Button>
                  </div>
                </form>

              </DialogContent>
            </Dialog>

          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
