"use client"
import { useRouter } from 'next/navigation';

const CatchAllRoute = () => {
    const router = useRouter();
    router.push('/filter');
};

export default CatchAllRoute;
