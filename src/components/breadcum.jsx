"use client";
import { ChevronRight, House } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Map đường dẫn với label đẹp hơn
const pathNameMap = {
    products: 'Products',
    details: 'Product Details',
    dashboard: 'Dashboard',
    filter: 'Lọc Sản phẩm',
    login: 'Tài khoản',
    home: "Trang chủ"
};

const Breadcrumb = () => {
    const pathname = usePathname();
    const pathArray = pathname.split('/').filter((path) => path);

    // Hàm để lấy tên breadcrumb thân thiện
    const getBreadcrumbName = (path) => {
        return pathNameMap[path] || path.charAt(0).toUpperCase() + path.slice(1);
    };

    return (
        <div className=' container mx-auto  text-sm'>
            <nav aria-label="Breadcrumb" className="py-4 px-8 container mx-auto ">
                <ol className="flex items-center space-x-2">
                    <li>
                        <Link href="/" className="text-blue-500 hover:text-blue-400 transition-colors flex items-center">
                            <House className="h-4 w-4 mr-2" />
                            <span>Trang chủ</span>
                        </Link>
                    </li>
                    {pathArray.length > 0 && (
                        <li>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </li>
                    )}
                    {pathArray.map((path, index) => {
                        const href = `/${pathArray.slice(0, index + 1).join('/')}`
                        const isLast = index === pathArray.length - 1

                        return (
                            <li key={href} className="flex items-center">
                                {!isLast ? (
                                    <>
                                        <Link href={href} className="text-primary hover:text-primary-foreground transition-colors">
                                            {getBreadcrumbName(path)}
                                        </Link>
                                        <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />
                                    </>
                                ) : (
                                    <span className="text-muted-foreground" aria-current="page">
                                        {getBreadcrumbName(path)}
                                    </span>
                                )}
                            </li>
                        )
                    })}
                </ol>
            </nav>
        </div>
    );
};

export default Breadcrumb;
