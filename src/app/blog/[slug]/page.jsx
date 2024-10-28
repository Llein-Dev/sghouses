"use client"
import { ArrowLeft, Facebook, Twitter, Linkedin } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Breadcrumb from '@/components/breadcum'
import { useParams } from 'next/navigation'
import { useFetchDetailBlog } from '@/utils/api/GET/api'

export default function ArticleDetail() {
    const i = [
        { image01: "/dark-blue-house-exterior-2.png" },
        { image01: "/dark-blue-house-exterior-2.png" },
        { image01: "/dark-blue-house-exterior-2.png" }

    ]
    const { slug } = useParams();
    const { detailBlog } = useFetchDetailBlog(slug);
    console.log(detailBlog);

    return (
        <div className="container mx-auto px-4 space-y-4 pt-4">
            <Breadcrumb />
            <main className="">
                <div className="grid grid-cols-1  lg:grid-cols-3 gap-4">

                    <div className="lg:col-span-2 bg-white p-8 ">
                        <div className="mb-8 space-y-4">
                            <h1 className="text-4xl text-blue-900 font-bold mb-4">{detailBlog.title}</h1>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <span>Ngày tải: Ngày 24 tháng 10, 2024</span>

                            </div>
                            <p>
                                SGhouses Việt Nam không chỉ là một thức uống, mà còn là một phần không thể thiếu trong văn hóa và đời sống hàng ngày của người Việt. Từ những quán SGhouses vỉa hè đến những quán SGhouses sang trọng, SGhouses đã trở thành một biểu tượng của sự giao tiếp và thư giãn.
                            </p>
                        </div>
                        <img
                            src="/dark-blue-house-exterior-2.png"
                            alt="SGhouses Việt Nam"
                            className="w-full h-[400px] object-cover rounded-lg mb-6 "
                        />
                        <div className="prose lg:prose-xl max-w-none space-y-4">
                            {detailBlog?.body
                                ?.split('\n')
                                .filter(paragraph => paragraph.trim() !== '')
                                .map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p> 
                                ))}
                        </div>


                        {/* Author Info */}
                        <div className="flex items-center space-x-4 mt-8 p-4 bg-muted rounded-lg">
                            <Avatar>
                                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Tác giả" />
                                <AvatarFallback>TG</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-semibold">Nguyễn Văn A</h3>
                                <p className="text-sm text-muted-foreground">Nhà báo chuyên về văn hóa và ẩm thực</p>
                            </div>
                        </div>

                        {/* Share Buttons */}
                        <div className="flex space-x-4 mt-8">
                            <Button variant="orange" size="icon">
                                <Facebook className="h-4 w-4" />
                            </Button>
                            <Button variant="orange" size="icon">
                                <Twitter className="h-4 w-4" />
                            </Button>
                            <Button variant="orange" size="icon">
                                <Linkedin className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Related Articles */}
                    <div className="lg:col-span-1 bg-gray-100 ">

                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <Card key={i}>
                                    <CardContent className="flex justify-between p-0 overflow-hidden">
                                        <img
                                            src={`/placeholder.svg${i}`}
                                            alt={`Related Article ${i}`}
                                            className="h-w aspect-square object-cover"
                                        />
                                        <div className='p-5'>
                                            <h3 className="font-semibold mb-2">Tiêu đề bài viết liên quan {i}</h3>
                                            <p className="text-sm text-muted-foreground">Mô tả ngắn về bài viết liên quan...</p>

                                        </div>

                                    </CardContent>

                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}