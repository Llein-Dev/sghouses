"use client"
import { ArrowLeft, Facebook, Twitter, Linkedin } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Breadcrumb from '@/components/breadcum'
import { useParams } from 'next/navigation'
import { useFetchBlogHouse, useFetchDetailBlog } from '@/utils/api/GET/api'
import { useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import Link from 'next/link'

export default function ArticleDetail() {
    const { slug } = useParams();
    const { detailBlog } = useFetchDetailBlog(slug);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState(detailBlog?.list_cmt || []);
    console.log(detailBlog);
    const { BlogHouse } = useFetchBlogHouse();
    const handleCommentSubmit = async () => {
        try {
            const authToken = Cookies.get('token');
            const response = await axios.post('http://localhost:8000/api/blog/comment',
                { slug, message: newComment },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                    },
                    withCredentials: true
                }
            );
            if (response.status === 200) {
                const result = response.data;
                setComments([...comments, result.newComment]);
                setNewComment('');
            } else {
                console.error('Failed to submit comment', response);
            }
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                console.error('Error status:', error.response.status);
            } else {
                console.error('Error submitting comment:', error.message);
            }
        }
    };

    return (
        <div className="container mx-auto px-4 space-y-4 pt-4">
            <Breadcrumb />
            <main className="">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2 bg-white p-8 ">
                        <div className="mb-8 space-y-4">
                            <h1 className="text-4xl text-blue-900 font-bold mb-4">{detailBlog.title}</h1>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <span>Ngày tải: Ngày 24 tháng 10, 2024</span>
                            </div>
                            <p>
                                {detailBlog.description}
                            </p>
                        </div>
                        <img
                            src={`http://localhost:8000/storage/${detailBlog.image}`}
                            alt="SGhouses Việt Nam"
                            className="w-full h-[400px] object-cover rounded-lg mb-6"

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

                        {/* Comment Section */}
                        <div className="mt-8">
                            <h2 className="text-xl font-bold">Bình luận</h2>
                            <textarea
                                className="w-full border rounded-lg p-2 mt-2"
                                rows="4"
                                placeholder="Nhập bình luận của bạn..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <Button
                                variant="blue"
                                className="mt-2"
                                onClick={handleCommentSubmit}
                                disabled={!newComment}
                            >
                                Gửi bình luận
                            </Button>

                            <div className="mt-4 space-y-4">
                                {detailBlog.list_cmt?.length > 0 ? (
                                    detailBlog.list_cmt.map((comment, index) => (
                                        <div key={comment.id || index} className="p-4 border rounded-lg bg-gray-50">
                                            <p>{comment.content}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {comment.name} - {comment.date}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500">No comments available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Related Articles */}
                    <div className="lg:col-span-1 bg-gray-100">
                        <div className="space-y-4">
                            {BlogHouse.map((i) => (
                                <Card key={i.id}>
                                    <CardContent className="grid p-0 overflow-hidden grid-cols-3">
                                        {/* Image Section */}
                                        <img
                                            src={`http://localhost:8000/storage/${i.image}`}
                                            alt={`Related Article ${i.title}`}
                                            className="col-span-1 aspect-square object-cover"
                                        />

                                        {/* Text Content Section */}
                                        <div className="p-5 col-span-2">
                                            <Link href={`/blog/${i.slug}`}>
                                                <h3 className="font-semibold mb-2">{i.title || 'Tiêu đề bài viết liên quan'}</h3>
                                            </Link>
                                            {/* Limited Description */}
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {i.description || 'Mô tả ngắn về bài viết liên quan...'}
                                            </p>
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
