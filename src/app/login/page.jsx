
import { AuthForm } from "@/components/auth-form";
import Breadcrumb from "@/components/breadcum";


export default function LoginPage() {
  return (
    <>
      <div className="container mx-auto px-4 space-y-4 pt-4">
        <Breadcrumb />
        <AuthForm />
      </div>
    </>
  )
}