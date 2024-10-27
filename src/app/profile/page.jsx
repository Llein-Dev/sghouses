"use client"
import UserProfile from "@/components/User-page";
import { profileAPI } from "@/utils/api/Auth/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function UserPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const GoEditProfile = () => {
        router.push('/profile/edit');
    }
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const profile = await profileAPI(); // Fetch user profile
                setUser(profile[0]); // Set the user data
                setisLoggedIns(true); // Update login state
            } catch (error) {
                console.error(error);
                setisLoggedIns(false); // Update login state on error
            }
        };



        // Fetch the user profile if the token exists
        const token = Cookies.get('token');
        if (token) {
            fetchUserProfile();
        }
    }, []); // Run only on mount


    return (
        <>
            <UserProfile user={user} GoEditProfile={GoEditProfile} />
        </>
    );
}
