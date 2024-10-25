
import { Award, ChevronRight, Target, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

export default function AboutUsComponent() {
    return (
        <main className="">
            <section className="w-full py-12 md:py-24 lg:py-32 bg-white border-y border-blue-900">
                <div className="px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-4xl text-blue-900 font-bold tracking-tighter sm:text-6xl mb-4">Về SGHouses</h1>
                            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                                Chúng tôi là đối tác đáng tin cậy của bạn trong lĩnh vực bất động sản, mang đến những giải pháp nhà ở
                                tốt nhất cho mọi khách hàng.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-10 sm:grid-cols-2 md:gap-16">
                        <div className="space-y-4">
                            <h2 className="text-blue-900 text-3xl font-bold tracking-tighter sm:text-4xl">Câu chuyện của chúng tôi</h2>
                            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                SGhouses được thành lập vào năm một chín chín mấy với sứ mệnh giúp mọi người tìm được ngôi nhà mơ ước. Từ
                                một văn phòng nhỏ, chúng tôi đã phát triển thành một trong những công ty bất động sản hàng đầu tại
                                Việt Nam.
                            </p>
                            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Với hơn mười mấy năm kinh nghiệm, chúng tôi tự hào đã giúp hàng nghìn gia đình tìm được nơi an cư lý tưởng
                                và hỗ trợ các nhà đầu tư đạt được mục tiêu tài chính của họ thông qua bất động sản.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <img
                                alt="SGhouses Office"
                                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
                                height="310"
                                src="/istockphoto-1026205392-612x612.jpg"
                                width="550"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
                <div className="container px-4 md:px-6">
                    <h2 className="text-blue-900 text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Giá trị cốt lõi</h2>
                    <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <Users className="w-8 h-8 mb-2 text-blue-500" />
                                <CardTitle>Khách hàng là trọng tâm</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Chúng tôi luôn đặt nhu cầu và lợi ích của khách hàng lên hàng đầu trong mọi quyết định.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <Target className="w-8 h-8 mb-2 text-green-500" />
                                <CardTitle>Chuyên nghiệp</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Đội ngũ chuyên gia của chúng tôi luôn cập nhật xu hướng thị trường và áp dụng công nghệ tiên tiến.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <Award className="w-8 h-8 mb-2 text-yellow-500" />
                                <CardTitle>Uy tín</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Chúng tôi xây dựng mối quan hệ dựa trên sự tin tưởng và minh bạch với tất cả các bên liên quan.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-blue-900 text-3xl font-bold tracking-tighter sm:text-5xl">Hãy để chúng tôi giúp bạn</h2>
                            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                                Dù bạn đang tìm kiếm ngôi nhà mơ ước hay cần tư vấn đầu tư bất động sản, SGhouses luôn sẵn
                                sàng hỗ trợ bạn trong mọi bước của hành trình.
                            </p>
                        </div>
                        <Link href="/contact">
                            <Button variant="blue" className="inline-flex items-center justify-center" >

                                Liên hệ ngay
                                <ChevronRight className="ml-2 h-4 w-4" />

                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}