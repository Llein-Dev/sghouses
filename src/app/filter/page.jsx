import Breadcrumb from '@/components/Breadcrumb';
import FilterCard from '@/components/filter-card';
import { SearchBarComponentClone } from '@/components/search-bar-clone';

export default function FilterPage() {
  const products_filter = [
    {
      image: "https://tromoi.com/cdn-cgi/image/format=webp,quality=75,fit=cover,width=300,height=300/uploads/guest/1722586834267_ee3c439d8713224d7b02.jpg",
      title: "Số 165/9 đường Phan Văn Hớn",
      address: "Quận 1, TP.HCM",
      price: "5 tỷ",
      size: "100m²",
      mapLink: "/map/1",
    },
    {
      image: "https://tromoi.com/cdn-cgi/image/format=webp,quality=75,fit=cover,width=300,height=300/uploads/static/phong-tro-ha-noi/Nhaso4_Ngo8.11.112_LeQuangDao/Nhaso4_Ngo8_11_112_LeQuangDao_hinh6.jpg",
      title: "Số 165/9 đường Phan Văn Hớn",
      address: "Quận 1, TP.HCM",
      price: "5 tỷ",
      size: "100m²",
      mapLink: "/map/1",
    },
    {
      image: "https://tromoi.com/cdn-cgi/image/format=webp,quality=75,fit=cover,width=300,height=300/uploads/static/phong_tro_can_tho/129-9%20Duong%20so%201/129-9%20Duong%20so%201%20(2).jpg",
      title: "Số 165/9 đường Phan Văn Hớn",
      address: "Quận 1, TP.HCM",
      price: "5 tỷ",
      size: "100m²",
      mapLink: "/map/1",
    },
    {
      image: "https://tromoi.com/cdn-cgi/image/format=webp,quality=75,fit=cover,width=300,height=300/uploads/static/phong-tro-ha-noi/Ngo488_Sonha99_TranCung/Ngo488_Sonha99_TranCung_hinh5.jpg",
      title: "Số 165/9 đường Phan Văn Hớn",
      address: "Quận 1, TP.HCM",
      price: "5 tỷ",
      size: "100m²",
      mapLink: "/map/1",
    },
    {
      image: "https://tromoi.com/cdn-cgi/image/format=webp,quality=75,fit=cover,width=300,height=300/uploads/static/phong_tro_can_tho/25-27%20Hoang%20Quoc%20Viet/25-27%20Hoang%20Quoc%20Viet%20(1).jpg",
      title: "Số 165/9 đường Phan Văn Hớn",
      address: "Quận 1, TP.HCM",
      price: "5 tỷ",
      size: "100m²",
      mapLink: "/map/1",
    },
    {
      image: "https://tromoi.com/cdn-cgi/image/format=webp,quality=75,fit=cover,width=300,height=300/uploads/static/phong-tro-ha-noi/Ngo87_PhuDo/Ngo87_PhuDo_hinh4.jpg",
      title: "Số 165/9 đường Phan Văn Hớn",
      address: "Quận 1, TP.HCM",
      price: "5 tỷ",
      size: "100m²",
      mapLink: "/map/1",
    }
  ]


  return (
    <>
      <div className="w-full">
        <SearchBarComponentClone />
      </div>

      <div className="">
        <Breadcrumb />
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap lg:flex-nowrap lg:space-x-4">
            {/* Kết quả tìm kiếm */}
            <div className="w-full lg:w-3/4">
              <h2 className="font-bold text-2xl uppercase text-[#00008B]">
                Có <span className="text-[#FF5C00]">128</span> <span className="font-bold text-2xl uppercase text-[#00008B]">kết quả phù hợp</span>
              </h2>

              {/* Nút lọc cho mobile sẽ hiển thị trên cùng khi xuống mobile */}
              <button className=" text-[#00008B] rounded-md flex items-center py-4 mb-4 order-1 lg:order-none">
                <span className="mr-2">Lọc kết quả nhanh</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                </svg>
              </button>

              <div className="flex justify-between items-center mb-4">
                <span>Sắp xếp theo</span>
                <select className="border border-gray-300 rounded p-2">
                  <option>Giá thấp nhất</option>
                  <option>Giá cao nhất</option>
                </select>
              </div>

              {/* Hiển thị danh sách phòng */}
              {
                products_filter.map((filterCard, index) =>
                  <FilterCard key={index} {...filterCard} />
                )
              }
            </div>

            {/* Thanh lọc kết quả trên desktop */}
            <div className="hidden lg:block bg-white shadow-md p-4 rounded-lg">
                <div className="mb-4">
                  <span className="font-semibold">Diện tích</span>
                  <div className="mt-2">
                    <label className="block">
                      <input type="radio" name="size" className="mr-2" /> Dưới 30 m²
                    </label>

                    <label className="block">
                      <input type="radio" name="size" className="mr-2" /> Từ 20 - 30 m²
                    </label>

                    <label className="block">
                      <input type="radio" name="size" className="mr-2" /> Từ 30 - 50 m²
                    </label>

                    {/* <!-- Thêm các tùy chọn khác --> */}
                  </div>
                </div>

                <div className="mb-4">
                  <span className="font-semibold">Tiện ích</span>
                  <div className="mt-2">
                    <label className="block">
                      <input type="checkbox" className="mr-2" /> Gác lửng
                    </label>

                    <label className="block">
                      <input type="checkbox" className="mr-2" />Ban công
                    </label>
                    <label className="block">
                      <input type="checkbox" className="mr-2" />Cửa sổ
                    </label>
                    {/* <!-- Thêm các tùy chọn khác --> */}
                  </div>
                  <div className="mt-2">
                    <label className="block">
                      <input type="checkbox" className="mr-2" /> Gác lửng
                    </label>

                    <label className="block">
                      <input type="checkbox" className="mr-2" />Ban công
                    </label>
                    <label className="block">
                      <input type="checkbox" className="mr-2" />Cửa sổ
                    </label>
                    {/* <!-- Thêm các tùy chọn khác --> */}
                  </div>
                  <div className="mt-2">
                    <label className="block">
                      <input type="checkbox" className="mr-2" /> Gác lửng
                    </label>

                    <label className="block">
                      <input type="checkbox" className="mr-2" />Ban công
                    </label>
                    <label className="block">
                      <input type="checkbox" className="mr-2" />Cửa sổ
                    </label>
                    {/* <!-- Thêm các tùy chọn khác --> */}
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
