'use client'

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export function FooterComponent() {
  return (
    (<footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img src="logo.svg" className="mb-4 w-full"/>

            <p className="text-sm text-muted-foreground">
              Chúng tôi là công ty bất động sản hàng đầu, cung cấp dịch vụ chất lượng cao và đáng tin cậy cho khách hàng.
            </p>
          </div>
          <div className="pl-0 md:pl-8">
            <h3 className="font-bold text-lg text-[#00008B] mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm hover:text-primary transition-colors">Trang chủ</Link></li>
              <li><Link
                href="/properties"
                className="text-sm hover:text-primary transition-colors">Bất động sản</Link></li>
              <li><Link href="/about" className="text-sm hover:text-primary transition-colors">Về chúng tôi</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-primary transition-colors">Liên hệ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg text-[#00008B] mb-4">Liên hệ</h3>
            <address className="text-sm text-muted-foreground not-italic">
              <p>123 Đường ABC, Quận XYZ</p>
              <p>TP. Hồ Chí Minh, Việt Nam</p>
              <p className="mt-2">Email: info@example.com</p>
              <p>Điện thoại: (123) 456-7890</p>
            </address>
          </div>
          <div>
            <h3 className="font-bold text-lg text-[#00008B] mb-4">Đăng ký nhận tin</h3>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <Input type="email" placeholder="Nhập email của bạn" />
              <Button type="submit" variant="orange" className="w-full">Đăng ký</Button>
            </form>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2024 Designed by Lein
          </p>
          <div className="flex space-x-4">
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook size={20} />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>)
  );
}