import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function ContactNow() {
    return (
        <section className="w-full bg-white py-12 md:py-24 lg:py-32 bg-gray-100">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-900">Bắt đầu tìm kiếm ngay hôm nay</h2>
                        <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                            Đừng bỏ lỡ cơ hội sở hữu ngôi nhà mơ ước của bạn. Hãy để chúng tôi giúp bạn tìm kiếm!
                        </p>
                    </div>
                    <div className="w-full max-w-sm space-y-2">
                        <form className="flex space-x-2">
                            <Input className="max-w-lg flex-1" placeholder="Nhập email của bạn" type="email" />
                            <Button variant="orange" type="submit">Đăng ký</Button>
                        </form>
                        <p className="text-xs text-gray-500">
                            Bằng cách đăng ký, bạn đồng ý với{" "}
                            <Link className="underline underline-offset-2" href="#">
                                Điều khoản dịch vụ
                            </Link>{" "}
                            và{" "}
                            <Link className="underline underline-offset-2" href="#">
                                Chính sách bảo mật
                            </Link>{" "}
                            của chúng tôi.
                        </p>
                    </div>
                </div>
            </div>
        </section>

    )
}