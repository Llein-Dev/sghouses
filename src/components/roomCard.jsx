import {
  Heart,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Droplet,
  Wifi,
  Trash,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";

import { Textarea } from "./ui/textarea";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { useState, useEffect } from "react";
import { setProfile } from "@/redux/authSlice";
import { Input } from "./ui/input";
import Cookies from "js-cookie";
import FavoriteButton from "./favourite";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function RoomComponents({ room }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user ? user.name : "", // Initialize id_user from user state
    phone: user ? user.phone : "", // Initialize id_user from user state
    content: "",
    id_room: room.id,
    id_user: user ? user.id : "", // Initialize id_user from user state
  });

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

  // Split image string into an array
  const images = room.hinh_anh?.split(";");

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

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
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
      console.log("API response status:", response.status);

      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message);
        setIsDialogOpen(false); // Close the dialog on success
      } else {
        console.error(response.data);
        throw new Error("Failed to submit rental request");
      }
    } catch (error) {
      console.error("Catch block error:", error);
      if (error.response) {
        toast.warning('Bạn đã gửi liên hệ rồi!')
        setIsDialogOpen(false); // Close the dialog on success
        console.error("Error response data:", error.response.data); // Log the detailed error response
      }
    }
  };
  const [active, setActive] = useState(false);
  return (
    <><Card className="w-full border-none shadow-md">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Image Column */}
          <div className="w-full lg:w-1/4">
            <Dialog>
              <DialogTrigger asChild>
                <img
                  src={`${process.env.NEXT_PUBLIC_PATH_FILE}${images[0]}`} // Hiển thị hình ảnh đầu tiên
                  alt="Room Image"
                  className="rounded-md object-cover w-full  lg:aspect-square cursor-pointer"
                />
              </DialogTrigger>
              <DialogContent className="max-w-[60vw] max-h-[90vh] p-0">
                <div className="relative h-full">
                  <img
                    src={`${process.env.NEXT_PUBLIC_PATH_FILE}${images[currentImageIndex]}`} // Sử dụng đường dẫn đầy đủ
                    alt={`Room Image ${currentImageIndex + 1}`}
                    className="rounded-lg"
                    style={{
                      width: "100%",
                      height: "80vh",
                      objectFit: "cover",
                    }} // CSS để hình ảnh hiển thị đúng
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
              <h3 className="text-xl font-semibold mb-2">{room.ten_phong}</h3>
              <p className="text-sm text-green-600 mb-2">
                Tình trạng: {room.gac_lung ? "Có" : "Không"}
              </p>
              <p className="text-2xl font-bold mb-2 text-[#FF5C00]">
                {room.gia_thue.toLocaleString()} đ/tháng
              </p>
              <Badge className="mb-4">Phòng cao cấp</Badge>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Nội thất:</h4>
                  <ul className="text-sm flex flex-wrap gap-x-4 gap-y-2">
                    {room.noi_that.split(";").map((item, idx) => (
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
                    {room.tien_ich.split(";").map((item, idx) => (
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
                    <span className="flex items-center">
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Điện:
                    </span>
                    <span className="font-medium text-sm">3,500 đ/kWh</span>
                  </li>
                  <li className="flex justify-between items-center pb-2">
                    <span className="flex items-center">
                      <Droplet className="h-4 w-4 mr-2" />
                      Nước:
                    </span>
                    <span className="font-medium text-sm">
                      100,000 đ/người/tháng
                    </span>
                  </li>
                  <li className="flex justify-between items-center pb-2">
                    <span className="flex items-center">
                      <Wifi className="h-4 w-4 mr-2" />
                      Internet:
                    </span>
                    <span className="font-medium text-sm">
                      100,000 đ/phòng/tháng
                    </span>
                  </li>
                  <li className="flex justify-between items-center pb-2">
                    <span className="flex items-center">
                      <Trash className="h-4 w-4 mr-2" />
                      Dọn vệ sinh:
                    </span>
                    <span className="font-medium text-sm">50,000 đ/lần</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                <FavoriteButton idRoom={room.id} active={active} setActive={setActive} />

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
                          required
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
                          required
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
                          required
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
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    </>
  );
}
