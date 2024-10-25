"use client"

import Breadcrumb from "@/components/breadcum";
import ContactNow from "@/components/templateSection/contactNow";



export default function ContactPage() {
    return (
        <>

            <div className="container mx-auto px-4 space-y-4 py-4">
                <Breadcrumb />
                <ContactNow />
            </div>

        </>
    );
}
