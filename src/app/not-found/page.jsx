import Breadcrumb from "@/components/breadcum";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
    return (
        <>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 text-center">
                    <div className="space-y-4">
                        <h1 className="text-9xl font-extrabold text-blue-800">404</h1>
                        <h2 className="text-4xl font-bold text-blue-700">Trang không tồn tại</h2>
                        <p className="text-xl text-gray-600">Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm.</p>
                    </div>

                    <div className="mt-8">
                        <img
                            className="absolute top-0 right-0 w-24 m-8 object-cover"
                            src="images/Logo-Thien-Su-original-expand.png"
                            alt="Logo"
                        />
                    </div>

                    <div className="mt-8 ">
                        <Link href="/" passHref>
                            <Button variant="gradient" className="">
                                <Home    className="mr-2 h-4 w-4" />
                                Quay về trang chủ
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
