import { useState } from "react"
import { MessageCircle, ThumbsUp, ThumbsDown, Send } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

const comments = [
    {
        id: 1,
        author: "Nguyễn Văn A",
        avatar: "/placeholder.svg",
        content: "Bài viết rất hay! Rất nhiều thông tin hữu ích.",
        likes: 15,
        dislikes: 2,
        replies: 3,
    },
    {
        id: 2,
        author: "Trần Thị B",
        avatar: "/placeholder.svg",
        content: "Tôi học được rất nhiều điều từ bài viết này. Cảm ơn vì đã chia sẻ!",
        likes: 10,
        dislikes: 1,
        replies: 1,
    },
    {
        id: 3,
        author: "Phạm Văn C",
        avatar: "/placeholder.svg",
        content: "Quan điểm rất thú vị. Tôi muốn đọc thêm về chủ đề này.",
        likes: 8,
        dislikes: 0,
        replies: 2,
    },
]


export default function CommentComponent() {
    const [newComment, setNewComment] = useState("")

    return (
        <Card>
            <CardHeader>
                <CardTitle>Comments</CardTitle>
            </CardHeader>
            <CardContent>

                <div className="flex items-center space-x-2">
                    <Avatar>
                        <AvatarImage src="" alt="" />
                        <AvatarFallback>123</AvatarFallback>
                    </Avatar>
                    <Input
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button className="px-3" variant="blue" size="icon">
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
                <Separator className="my-4" />
                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex items-start space-x-4">
                            <Avatar>
                                <AvatarImage src={comment.avatar} alt={comment.author} />
                                <AvatarFallback>{comment.author[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-2">
                                <p className="font-semibold">{comment.author}</p>
                                <p>{comment.content}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <button className="flex items-center space-x-1">
                                        <ThumbsUp className="w-4 h-4" />
                                        <span>{comment.likes} Thích</span>
                                    </button>

                                    <button className="flex items-center space-x-1">
                                        <MessageCircle className="w-4 h-4" />
                                        <span>{comment.replies} Trả lời</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </CardContent>
        </Card>

    )
}