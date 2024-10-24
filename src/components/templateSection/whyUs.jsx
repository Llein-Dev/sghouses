import { MapPin, Star, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function WhyUs() {
    return (
        <section className="w-full py-12 md:py-20  ">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-900 ">Tại sao chọn chúng tôi?</h2>
                <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                    <Card>
                        <CardHeader className="p-5">
                            <Star className="w-8 h-8 mb-2 text-yellow-400" />
                            <CardTitle>Chất lượng đảm bảo</CardTitle>
                        </CardHeader>
                        <CardContent className="p-5 pt-0">
                            <p>Tất cả bất động sản được kiểm duyệt kỹ lưỡng để đảm bảo chất lượng tốt nhất cho khách hàng.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="p-5">
                            <TrendingUp className="w-8 h-8 mb-2 text-green-500" />
                            <CardTitle>Giá cả cạnh tranh</CardTitle>
                        </CardHeader>
                        <CardContent className="p-5 pt-0">
                            <p>Chúng tôi cung cấp mức giá tốt nhất trên thị trường với nhiều lựa chọn phù hợp mọi ngân sách.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="p-5">
                            <MapPin className="w-8 h-8 mb-2 text-blue-500" />
                            <CardTitle>Vị trí đa dạng</CardTitle>
                        </CardHeader>
                        <CardContent className="p-5 pt-0">
                            <p>Từ trung tâm thành phố đến vùng ngoại ô yên tĩnh, chúng tôi có bất động sản ở mọi khu vực.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}