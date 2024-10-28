"use client"
import { RoomManagement } from "@/components/room-management";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Spinner } from "@/components/ui/loading";

export default function RoomManagementPage() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = Cookies.get("token"); // Retrieve the token from cookies
    console.log(token);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/contact_room/list', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Add token to headers
                    },
                });

                // Check for a specific message in the response
                if (response.data.message === "Không có liên hệ nào.") {
                    setRooms([]); // Set rooms to an empty array if no contacts found
                } else {
                    setRooms(response.data); // Assuming response.data contains the rooms array
                }
            } catch (err) {
                console.error("Error fetching rooms:", err);
                setRooms([]); // Set rooms to an empty array on error
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, [token]);

    if (loading) return <div className='flex justify-center w-full h-64'><Spinner /></div>;

    return <RoomManagement roomsData={rooms} />;
}
