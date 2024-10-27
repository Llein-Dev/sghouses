"use client"
import Cookies from "js-cookie";
import { profileAPI } from "@/utils/api/Auth/api";
import { useEffect, useState } from "react";
import EditProfile2Component from "@/components/edit-profile2";

export default function EditProfilePage() {
    const [isLoggedIns, setIsLoggedIns] = useState(false);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const profile = await profileAPI();
                setUser(profile[0]);
                setIsLoggedIns(true);
            } catch (error) {
                console.error(error);
                setIsLoggedIns(false);
            }
        };
        const token = Cookies.get('token');
        if (token) {
            fetchUserProfile();
        }
    }, []); // Run only on mount

    return (
        <>
            <EditProfile2Component user={user} />
        </>
    )
}