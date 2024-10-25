'use client';
import React, { useState, useEffect } from 'react'
import { Search, HelpCircle, Book, MessageCircle, ExternalLink, Quote } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqData = [
  {
    question: "Làm thế nào để tạo văn bản mới?",
    answer: "Để tạo văn bản mới, truy cập vào trang tạo văn bản, chọn loại văn bản và phòng ban, sau đó điền các thông tin cần thiết và lưu lại."
  },
  {
    question: "Làm cách nào để kiểm tra sự tồn tại của văn bản?",
    answer: "Bạn có thể kiểm tra sự tồn tại của văn bản bằng cách tìm kiếm theo loại văn bản và mã phòng ban trong hệ thống quản lý văn bản."
  },
  {
    question: "Làm thế nào để chỉnh sửa văn bản đã tạo?",
    answer: "Để chỉnh sửa văn bản, tìm văn bản cần chỉnh sửa trong danh sách văn bản, nhấp vào nút 'Chỉnh sửa', thực hiện thay đổi và lưu lại."
  },
  {
    question: "Làm thế nào để xóa văn bản?",
    answer: "Để xóa văn bản, tìm văn bản cần xóa trong danh sách văn bản, nhấp vào nút 'Xóa' và xác nhận hành động của bạn."
  },
  {
    question: "Làm thế nào để tạo tài khoản?",
    answer: "Để tạo tài khoản, nhấp vào nút 'Đăng ký' ở góc trên bên phải của trang chủ. Điền thông tin cần thiết và làm theo hướng dẫn trên màn hình."
  },
  {
    question: "Làm cách nào để đặt lại mật khẩu?",
    answer: "Trên trang đăng nhập, nhấp vào liên kết 'Quên mật khẩu'. Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn hướng dẫn đặt lại mật khẩu."
  },
  {
    question: "Làm thế nào để liên hệ với bộ phận hỗ trợ?",
    answer: "Bạn có thể liên hệ với bộ phận hỗ trợ của chúng tôi bằng cách gửi email đến support@example.com hoặc sử dụng biểu mẫu liên hệ trên trang web của chúng tôi."
  },
  {
    question: "Các phương thức thanh toán được chấp nhận là gì?",
    answer: "Chúng tôi chấp nhận các phương thức thanh toán sau: Visa, MasterCard, American Express, và PayPal."
  },
  {
    question: "Chính sách hoàn trả của bạn là gì?",
    answer: "Chúng tôi cung cấp chính sách hoàn trả trong vòng 30 ngày cho hầu hết các sản phẩm. Vui lòng xem trang Chính sách Hoàn trả của chúng tôi để biết thêm chi tiết."
  }
];


export function HelpPageComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredFAQ, setFilteredFAQ] = useState(faqData)

  useEffect(() => {
    const results = faqData.filter(item =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredFAQ(results)
  }, [searchTerm])

  return (
    (
      <Card className="">
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <HelpCircle className="" />
            Trung tâm trợ giúp
          </CardTitle>
          <CardDescription>Tìm câu trả lời cho các câu hỏi của bạn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Làm thế nào để tạo văn bản mới?..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8" />
            </div>
          </div>

          <Accordion type="single" collapsible className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFAQ.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index} >
                <AccordionTrigger >{item.question}</AccordionTrigger>
                <AccordionContent className="bg-gray-200 text-gray-700 p-4 rounded-br-3xl"><Quote className="mb-2"/>"{item.answer}"</AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Book className="h-4 w-4" />
                Tài liệu hướng dẫn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">Khám phá tài liệu chi tiết của chúng tôi để tìm hiểu thêm về cách sử dụng sản phẩm.</p>
              <Button variant="outline">
                Xem tài liệu
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Liên hệ hỗ trợ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">Không tìm thấy câu trả lời bạn cần? Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ.</p>
              <Button variant="outline">
                Liên hệ hỗ trợ
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </CardContent>
      </Card >
    )
  );
}