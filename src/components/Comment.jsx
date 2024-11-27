import { useState } from "react";
import { MessageCircle, ThumbsUp, Send } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function CommentComponent({ comments = [], onCommentAdd, user }) {
    const [newComment, setNewComment] = useState("");

    const handleCommentSubmit = () => {
        if (newComment.trim() !== "") {
            // Call the provided function to add the new comment
            onCommentAdd(newComment);
            setNewComment(""); // Clear input after submission
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Bình luận</CardTitle>    
            </CardHeader>
            <CardContent>
                <div className="flex items-center space-x-2">
                    <Avatar>
                        <AvatarImage src={`http://localhost:8000/storage/${user?.avatar}`} alt="" />
                        <AvatarFallback>{user?.name}</AvatarFallback>
                    </Avatar>
                    <Input
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit()}
                    />
                    <Button className="px-3" variant="blue" size="icon" onClick={handleCommentSubmit}>
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
    );
}

