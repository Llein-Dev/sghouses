"use client"

import Breadcrumb from "@/components/breadcum";
import AboutUsComponent from "@/components/templateSection/aboutUs";




export default function AboutUsPage() {
    return (
        <>

            <div className="container mx-auto px-4 space-y-4 py-4">
                <Breadcrumb />
            </div>
            <AboutUsComponent />
        </>
    );
}
