"use client"
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { featuredNews, moreNews, recommendedNews, sideNews } from '@/utils/data';
import Breadcrumb from '@/components/breadcum';
import { useParams } from 'next/navigation';
import { blogs } from '@/utils/data';


function NewsCard({ id, title, excerpt, image, date }) {
    
    return (
        <Card className="h-full flex  overflow-hidden flex-col">
            <div className="w-full aspect-video overflow-hidden">
                <img src={image} alt={title} className="object-cover w-full h-full" />
            </div>
            <CardHeader >
                <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{excerpt}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">{date}</span>
                <Link href={`/news/${id}`} className="text-primary hover:underline text-sm">
                    Xem thêm
                </Link>
            </CardFooter>
        </Card>
    )
}
function NewsCardRow({ id, title, excerpt, image, date }) {
    return (
        <Card className="h-full flex  overflow-hidden flex-row">
            <div className="w-2/5 aspect-square overflow-hidden">
                <img src={image} alt={title} className="object-cover w-full h-full" />
            </div>
            <div className="flex flex-col justify-between w-3/5">
                <CardHeader>
                    <CardTitle className="text-lg">{title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground line-clamp-3">{excerpt}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">{date}</span>
                    <Link href={`/news/${id}`} className="text-primary hover:underline text-sm">
                        Xem thêm
                    </Link>
                </CardFooter>
            </div>
        </Card>
    );
}

export default function NewsHomepage() {
    const { id } = useParams(); // Lấy id từ URL
    const blogPost = blogs.find(blog => blog.id === parseInt(id)); // Tìm blog post dựa trên id

    if (!blogPost) {
        return <p>Bài viết không tồn tại.</p>;
    }
    return (
        <div className="container mx-auto px-4 space-y-4 py-4">
            <Breadcrumb />
            <section className='pb-4'>
                <div class="relative rounded px-2" >
                    <div class="absolute inset-0 flex items-center px-4" >
                        <div class="shrink-0 bg-blue-900 h-[1px] w-full " ></div>
                    </div>
                    <div class="relative flex items-center h-full justify-start" >
                        <h2 className="text-blue-900 px-4 bg-gray-100 text-center text-xl md:text-3xl m-0 font-bold ">
                            Tin tức nổi bật

                        </h2>
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-5 gap-4">

                {/* Large News */}
                <Card className="md:col-span-3 space-y-2 h-full flex flex-col overflow-hidden">
                    <div className="relative aspect-video overflow-hidden">
                        <img src={blogPost.image} alt={blogPost.title} fill className="object-cover w-full" />
                    </div>
                    <CardHeader>
                        <CardTitle className="text-2xl">{blogPost.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Lượt xem: {blogPost.view}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Ngày Đăng: {blogPost.date}</span>
                        <Link href={`/news/${blogPost.id}`} className="text-primary hover:underline">
                            Xem thêm
                        </Link>
                    </CardFooter>
                </Card>

                {/* Side news */}
                <div className="space-y-4 md:col-span-2  h-full flex flex-col">
                    {sideNews.map((news) => (
                        < NewsCardRow key={news.id} {...news} />
                    ))}
                </div>
            </section>

            {/* More news section */}
            <section className="">
                <h2 className="text-2xl font-bold mb-4">Tin tức khác</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {moreNews.map((news) => (
                        <NewsCard key={news.id} {...news} />
                    ))}
                </div>
            </section>

            {/* Recommended news section */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Danh mục</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {recommendedNews.map((news) => (
                        <Card key={news.id} className="flex items-center p-4">
                            <div className="mr-4 bg-primary text-primary-foreground rounded-full aspect-square h-12 flex items-center justify-center text-xl font-bold">
                                {news.id}
                            </div>
                            <div>
                                <h3 className="font-semibold">{news.title}</h3>
                                <p className="text-sm text-muted-foreground">{news.date}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>
        </div >
    )
}