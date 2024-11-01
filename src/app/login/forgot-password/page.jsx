
"use client";


import { PasswordResetComponent } from "@/components/Auth.resetPassword";
import Breadcrumb from "@/components/breadcum";

export default function ForgotPage() {

  return (
    <>
      <div className="container mx-auto px-4 space-y-4 pt-4">
        <Breadcrumb />
        <PasswordResetComponent />
      </div>
    </>
  )
}