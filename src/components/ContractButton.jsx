'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'
import Cookies from 'js-cookie'

export default function PaymentButton({ token }) {
    const [isLoading, setIsLoading] = useState(false)
    const apiUrl = "http://localhost:8000/api"
    const userToken = Cookies.get("token") // Lấy token từ cookies

    const handlePayment = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`${apiUrl}/pay/${token}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`, 
                },
            })

            if (!response.ok) {
                throw new Error('Payment initiation failed')
            }

            const data = await response.json()

            if (data.url) {
                window.location.href = data.url
            } else {
                throw new Error('VNPay URL not received')
            }
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button onClick={handlePayment} disabled={isLoading}>
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang xử lý...
                </>
            ) : (
                'Thanh toán'
            )}
        </Button>
    )
}
