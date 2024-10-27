"use client"
import Cookies from "js-cookie";
import { profileAPI } from "@/utils/api/Auth/api";
import { useEffect, useState } from "react";
import { EditProfileComponent } from "@/components/edit-profile";
import EditProfile2Component from "@/components/edit-profile2";

export default function EditProfilePage() {

    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const profile = await profileAPI();
                setUser(profile[0]);
                setisLoggedIns(true);
            } catch (error) {
                console.error(error);
                setisLoggedIns(false);
            }
        };
        const token = Cookies.get('token');
        if (token) {
            fetchUserProfile();
        }
    }, []); // Run only on mount
    console.log(user);
    return (
        <>
            <EditProfile2Component user={user} />
        </>
    )
}