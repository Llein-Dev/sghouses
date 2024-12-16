'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { DoorOpen, ChevronDown, ChevronRight } from 'lucide-react'
import { groupedNavItems } from '@/utils/navItems'

export function AdminSidebar() {
    const [activeTab, setActiveTab] = useState('dashboard')
    const [openGroups, setOpenGroups] = useState([])

    const toggleGroup = (label) => {
        setOpenGroups(prev =>
            prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]
        )
    }

    return (
        <aside className="w-18 md:w-64 h-full shadow-md flex flex-col justify-between bg-white">
            <div>
                <img
                    src="/Logo.svg"
                    alt="Logo"
                    className="w-full p-2 hidden md:block"
                />

                <nav className="md:max-h-[calc(100vh-72px-70px)] max-h-[calc(100vh-72px)] overflow-y-auto space-y-2 text-sm font-semibold md:px-2 p-0">
                    {groupedNavItems.map(({ label, icon, items }) => (
                        <Collapsible
                            key={label}
                            open={openGroups.includes(label)}
                            onOpenChange={() => toggleGroup(label)}
                        >
                            <CollapsibleTrigger className="flex items-center w-full space-x-0 lg:space-x-3 px-4 py-2 transition-colors duration-200 bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-900">
                                {icon}
                                <span className="hidden md:block flex-grow text-left">{label}</span>
                                {openGroups.includes(label) ? <ChevronDown className="hidden md:block" /> : <ChevronRight className="hidden md:block" />}
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                {items.map(({ href, label: itemLabel, key }) => (
                                    <Link
                                        key={key}
                                        href={href}
                                        onClick={() => setActiveTab(key)}
                                        className={`flex items-center space-x-0 lg:space-x-3 px-4 py-3 transition-colors duration-200 ${activeTab === key
                                                ? "bg-blue-900 text-white"
                                                : "bg-gray-50 text-gray-700 hover:bg-blue-100 hover:text-blue-900"
                                            }`}
                                    >
                                        <span className="hidden md:block pl-6">{itemLabel}</span>
                                    </Link>
                                ))}
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                </nav>
            </div>

            <Button
                variant="orange"
                className="space-y-2 text-sm font-semibold md:rounded-lg rounded-none m-0 md:mx-2 md:mb-4 px-4 py-3"
            >
                <Link
                    href="/"
                    className="flex items-center space-x-0 rounded lg:space-x-3 transition-colors duration-200"
                >
                    <DoorOpen />
                    <span className="hidden md:block">Về trang chủ</span>
                </Link>
            </Button>
        </aside>
    )
}
