"use client"
import { useRouter } from 'next/navigation';

const CatchAllRoute = () => {
    const router = useRouter();
        router.push('/not-found');
};

export default CatchAllRoute;
