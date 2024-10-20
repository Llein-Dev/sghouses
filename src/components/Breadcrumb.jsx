"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Breadcrumb = () => {
  const pathname = usePathname();
  // Tách đường dẫn hiện tại ra thành các phần tử
  const pathArray = pathname.split('/').filter((part) => part !== '');

  return (
    <nav aria-label="breadcrumb" className="my-4 ml-[16px] sm:ml-[18px] md:ml-[20px] lg:ml-[90px]">
      <ol className="flex items-center space-x-2 text-gray-500">
        {/* Breadcrumb cho "Trang chủ" */}
        <li>
          <Link href="/" className="text-blue-500 hover:underline">
            Trang chủ
          </Link>
        </li>
        {/* Tạo breadcrumb cho từng phần của đường dẫn */}
        {pathArray.map((part, index) => {
          const href = '/' + pathArray.slice(0, index + 1).join('/');

          // Kiểm tra nếu là phần "detail" và hiển thị đúng id
          if (part === '[id]' && pathArray[index + 1]) {
            return (
              <li key={index} className="flex items-center space-x-2">
                <span className="text-gray-400">/</span>
                <span className="text-gray-500">Chi tiết {pathArray[index + 1]}</span>
              </li>
            );
          }
          return (
            <li key={index} className="flex items-center space-x-2">
              <span className="text-gray-500">/</span>
              {index === pathArray.length - 1 ? (
                <span className="text-blue-500 ">
                  {part}
                </span>
              ) : (
                <Link href={href} className="text-blue-500 hover:underline">
                  {part}
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
