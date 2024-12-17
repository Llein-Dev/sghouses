'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export function PasswordResetComponent() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [otpAttempts, setOtpAttempts] = useState(0)

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      const response = await fetch('https://hieu.name.vn/datn/public/api/forgot/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (response.ok) {
        setStep(2)
        setSuccess('OTP đã được gửi đến email của bạn. Vui lòng kiểm tra và nhập mã bên dưới.')
      } else {
        const data = await response.json()
        setError(data.message || 'Đã xảy ra lỗi. Vui lòng thử lại.')
      }
    } catch (err) {
      setError('Lỗi mạng. Vui lòng thử lại.')
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      const response = await fetch('https://hieu.name.vn/datn/public/api/forgot/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      })

      if (response.ok) {
        const data = await response.json()
        setSuccess(data.message || 'Đặt lại mật khẩu thành công.')
      } else {
        const data = await response.json()
        setError(data.message || 'Mã OTP không hợp lệ. Vui lòng thử lại.')
        setOtpAttempts(prev => prev + 1)

        if (otpAttempts >= 4) {
          setError('Quá nhiều lần thử không thành công. Chuyển về trang chủ...')
          setTimeout(() => {
            window.location.href = '/'
          }, 3000)
        }
      }
    } catch (err) {
      setError('Lỗi mạng. Vui lòng thử lại.')
    }
  }

  return (
    <>      {error && (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Lỗi</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )}
      {success && (
        <Alert variant="default" className="mb-4 bg-green-100 text-green-800 border-green-300">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Thành công</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
      <div className="flex items-center justify-center bg-gray-100">
        <Card className="w-[350px] mb-12">
          <CardHeader className="p-6 text-center">
            <CardTitle>Đặt lại mật khẩu</CardTitle>
            <CardDescription>
              {step === 1 ? 'Nhập email của bạn để nhận mã OTP' : 'Nhập mã OTP đã gửi đến email của bạn'}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">

            {step === 1 ? (
              <form onSubmit={handleEmailSubmit}>
                <Input
                  type="email"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                   />
                <Button size="sm" type="submit" variant="blue" className="w-full mt-4">
                  Gửi OTP
                </Button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit}>
                <Input
                  type="text"
                  placeholder="Nhập mã OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                   />
                <div className="flex justify-between mt-4">
                  <Button variant="link" onClick={() => setStep(1)}>
                    Quay lại
                  </Button>
                  <Button type="submit" variant="blue">
                    Xác nhận OTP
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div></>

  )
}
