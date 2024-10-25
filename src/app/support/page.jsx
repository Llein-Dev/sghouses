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
import { faqData } from '@/utils/data';
import Breadcrumb from '@/components/breadcum';




export default function HelpPageComponent() {
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
      <div className="container mx-auto px-4 space-y-4 pt-4">
        <Breadcrumb />
        <div className="bg-white p-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold flex items-center gap-4">
              <HelpCircle className="" />
              Trung tâm trợ giúp
            </CardTitle>
            <CardDescription>Tìm câu trả lời cho các câu hỏi của bạn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Làm thế nào để tạo văn bản mới?..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8" />
              </div>
            </div>

            <Accordion type="single" collapsible className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFAQ.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index} >
                  <AccordionTrigger >{item.question}</AccordionTrigger>
                  <AccordionContent className="bg-gray-200 text-gray-700 p-4 rounded-br-3xl"><Quote className="mb-2" />"{item.answer}"</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="grid gap-8  md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">
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
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">
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
        </div >
      </div>
    )
  );
}