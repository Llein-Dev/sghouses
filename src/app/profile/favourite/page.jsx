"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Ensure you have this library installed: npm install js-cookie
import Breadcrumb from "@/components/breadcum";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { MapPin } from "lucide-react";
import FavoriteButton from "@/components/favourite";
import { Badge } from "@/components/ui/badge";

export default function Favourite() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const url_api = "http://localhost:8000"; // Replace with your actual API URL
  const [active, setActive] = useState(true);
  useEffect(() => {
    const fetchStatus = async () => {
      setLoading(true); // Ensure loading starts when the fetch begins
      try {
        const token = Cookies.get("token"); // Retrieve token from cookies
        if (!token) {
          throw new Error("No token found, please log in.");
        }

        const response = await fetch(`${url_api}/api/yeu-thich/get`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch favorite data");
        }

        const data = await response.json();

        // Split list_id and fetch room details
        if (data.list_id) {
          const roomIds = data.list_id.split(";"); // Split "4;3" into ["4", "3"]
          const roomDetails = await fetchRoomDetails(roomIds);
          setFavorites(roomDetails);
        } else {
          throw new Error("No list_id in the response");
        }
      } catch (error) {
        console.error("Error fetching favorite status:", error);
        // Optionally, show a user-friendly message here
      } finally {
        setLoading(false); // Set loading to false once the fetch is complete
      }
    };

    const fetchRoomDetails = async (roomIds) => {
      try {
        const response = await fetch(`${url_api}/api/filter-room`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch room details");
        }

        const data = await response.json();
        const rooms = data.list_room; // Correctly reference the list_room property

        // Ensure rooms is an array before filtering
        if (Array.isArray(rooms)) {
          // Filter rooms based on the list_id
          return rooms.filter((room) => roomIds.includes(room.id.toString()));
        } else {
          throw new Error("Rooms data is not an array");
        }
      } catch (error) {
        console.error("Error fetching room details:", error);
        return []; // Return an empty array in case of an error
      }
    };

    fetchStatus();
  }, []); // Run only once when the component is mounted

  return (
    <div className="container mx-auto px-4 py-4 gap-4">
      <Breadcrumb />

   
          <CardTitle className="text-blue-900 p-5 mb-4 ">Phòng yêu thích</CardTitle>
    
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {favorites.length > 0 ? (
          favorites.map((item, index) => (
            <Card className="overflow-hidden" key={item?.id}>
              <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-2/4 md:aspect-[4/3] aspect-video">
                  <img
                    src={`${process.env.NEXT_PUBLIC_PATH_FILE}${
                      item?.hinh_anh.split(";")[0]
                    }`} // Display the first image
                    alt={item?.ten_phong}
                    className="rounded-t-lg h-full w-full object-cover sm:rounded-l-lg sm:rounded-t-none"
                  />
                </div>
                <div className="flex flex-col justify-between w-full">
                  <CardContent className="p-4 space-y-2">
                    <CardTitle className="flex justify-between">
                      <div>
                        <Link href={`/building/${item?.slug_toa_nha}`} passHref>
                          <h3 className="text-lg  mb-2">{item?.ten_phong}</h3>
                        </Link>
                        <Link href={`/building/${item?.slug_toa_nha}`} passHref>
                          <h6 className="text-sm font-normal mb-2">
                            <span className="underline">Tòa nhà:</span>{" "}
                            {item?.ten_toa_nha}
                          </h6>
                        </Link>
                      </div>
                    </CardTitle>
                    {/* Room Details */}
                    <div className="flex flex-wrap gap-2">
                      <Badge className="">
                        <span className="">Diện tích:</span> {item?.dien_tich}{" "}
                        m²
                      </Badge>
                      <Badge className="">
                        <span className="">Gác lửng:</span> {item?.gac_lung}
                      </Badge>
                      <Badge className="">
                        <span className="">Điện:</span> {item?.don_gia_dien}{" "}
                        VND/kWh
                      </Badge>
                      <Badge className="">
                        <span className="">Nước:</span> {item?.don_gia_nuoc}{" "}
                        VND/m³
                      </Badge>
                      <Badge className="">
                        <span className="">Xe máy:</span> {item?.tien_xe_may}{" "}
                        VND/tháng
                      </Badge>
                      <Badge className="">
                        <span className="">Phí dịch vụ:</span>{" "}
                        {item?.phi_dich_vu} VND
                      </Badge>
                      {item?.tien_ich.split(";").map((tienIch, index) => (
                        <Badge className="">
                          <span className="">{tienIch}</span>
                        </Badge>
                      ))}
                    </div>
                    {/* Description */}
                    <p>{item?.mo_ta}</p> {/* Description */}
                  </CardContent>

                  <CardFooter className="p-4 pt-0">
                    <Link
                      href={item?.mapLink || "#"} // Handle map link
                      className="text-sm text-primary mr-auto hover:underline flex items-center"
                    >
                      <MapPin className="w-4 h-4 mr-1" /> Xem bản đồ
                    </Link>
                    <FavoriteButton idRoom={item?.id} active={active} setActive={setActive}/>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <li className="text-gray-500">No favorite rooms found.</li>
        )}
      </div>
    </div>
  );
}
