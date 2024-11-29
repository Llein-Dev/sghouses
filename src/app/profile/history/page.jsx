"use client"
import { RoomManagement } from "@/components/room-management";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Spinner } from "@/components/ui/loading";

export default function RoomManagementPage() {
    const [contacts, setContacts] = useState([]);
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = Cookies.get("token"); // Retrieve the token from cookies
    console.log(token);

    useEffect(() => {
        const fetchcontacts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/contact_room/list', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Add token to headers
                    },
                });

                // Check for a specific message in the response
                if (response.data.message === "Không có liên hệ nào.") {
                    setContacts([]); // Set contacts to an empty array if no contacts found
                } else {
                    setContacts(response.data); // Assuming response.data contains the contacts array
                }
            } catch (err) {
                console.error("Error fetching contacts:", err);
                setContacts([]); // Set rooms to an empty array on error
            } finally {
                setLoading(false);
            }
        };

        fetchcontacts();
    }, [token]);
    useEffect(() => {
        const fetchcontacts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/hop-dong', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Add token to headers
                    },
                });

                // Check for a specific message in the response
                if (response.data.message === "Không có hợp đồng nào.") {
                    setContracts([]); // Set contacts to an empty array if no contacts found
                } else {
                    setContracts(response.data); // Assuming response.data contains the contacts array
                }
            } catch (err) {
                console.error("Error fetching contracts:", err);
                setContracts([]); // Set rooms to an empty array on error
            } finally {
                setLoading(false);
            }
        };

        fetchcontacts();
    }, [token]);

    if (loading) return <div className='flex justify-center w-full h-64'><Spinner /></div>;

    return <RoomManagement contactsData ={contacts} contractsData = {contracts}  />;
}
