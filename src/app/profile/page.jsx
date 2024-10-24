"use client"
import UserProfile from "@/components/User-page";
import { useRouter } from "next/navigation";


export default function UserPage() {
    const router = useRouter();

    const GoEditProfile = () => {
        router.push('/profile/edit'); 
    }

    return (
        <>
            <UserProfile GoEditProfile={GoEditProfile} />
        </>
    );
}
