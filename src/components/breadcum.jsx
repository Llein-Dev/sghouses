"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Map đường dẫn với label đẹp hơn
const pathNameMap = {
    products: 'Products',
    details: 'Product Details',
    dashboard: 'Dashboard',
    filter: 'Lọc Sản phẩm',
    login: 'Đăng nhập và đăng ký',
    home:"Trang chủ"
};

const Breadcrumb = () => {
    const pathname = usePathname();
    const pathArray = pathname.split('/').filter((path) => path);

    // Hàm để lấy tên breadcrumb thân thiện
    const getBreadcrumbName = (path) => {
        return pathNameMap[path] || path.charAt(0).toUpperCase() + path.slice(1);
    };

    return (
        <nav aria-label="breadcrumb" className="py-4 container mx-auto">
            <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                    <Link href="/" className="text-blue-500 hover:text-blue-700">
                        Home
                    </Link>
                    <span className="mx-2 text-gray-400">/</span>
                </li>
                {pathArray.map((path, index) => {
                    const href = `/${pathArray.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathArray.length - 1;

                    return (
                        <li key={href} className="flex items-center">
                            {!isLast ? (
                                <>
                                    <Link href={href} className="text-blue-500 hover:text-blue-700">
                                        {getBreadcrumbName(path)}
                                    </Link>
                                    <span className="mx-2 text-gray-400">/</span>
                                </>
                            ) : (
                                <Link href={href} className="text-blue-500 hover:text-blue-700">
                                    {getBreadcrumbName(path)}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
