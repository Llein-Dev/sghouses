export default function CreateInvoice() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white-50 to-blue-100 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-700 text-center mb-8">
            Tạo Hóa Đơn
          </h1>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ID hợp đồng */}
              <div>
                <label
                  htmlFor="id_hop_dong"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Mã Hợp Đồng
                </label>
                <input
                  type="text"
                  id="id_hop_dong"
                  name="id_hop_dong"
                  placeholder="Nhập mã hợp đồng"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
  
              {/* Tiền thuê */}
              <div>
                <label
                  htmlFor="tien_thue"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Tiền Thuê
                </label>
                <input
                  type="number"
                  id="tien_thue"
                  name="tien_thue"
                  placeholder="Nhập tiền thuê"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
  
              {/* Tiền điện */}
              <div>
                <label
                  htmlFor="tien_dien"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Tiền Điện
                </label>
                <input
                  type="number"
                  id="tien_dien"
                  name="tien_dien"
                  placeholder="Nhập tiền điện"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
  
              {/* Tiền nước */}
              <div>
                <label
                  htmlFor="tien_nuoc"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Tiền Nước
                </label>
                <input
                  type="number"
                  id="tien_nuoc"
                  name="tien_nuoc"
                  placeholder="Nhập tiền nước"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
  
              {/* Tiền xe */}
              <div>
                <label
                  htmlFor="tien_xe"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Tiền Xe
                </label>
                <input
                  type="number"
                  id="tien_xe"
                  name="tien_xe"
                  placeholder="Nhập tiền xe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
  
              {/* Tiền dịch vụ */}
              <div>
                <label
                  htmlFor="tien_dich_vu"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Tiền Dịch Vụ
                </label>
                <input
                  type="number"
                  id="tien_dich_vu"
                  name="tien_dich_vu"
                  placeholder="Nhập tiền dịch vụ"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            </div>
  
            {/* Nội dung (chiếm cả dòng) */}
            <div>
              <label
                htmlFor="noi_dung"
                className="block text-gray-600 font-medium mb-2"
              >
                Nội Dung
              </label>
              <textarea
                id="noi_dung"
                name="noi_dung"
                placeholder="Nhập nội dung hóa đơn"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              ></textarea>
            </div>
  
            {/* Nút tạo */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full md:w-1/3 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                Tạo Hóa Đơn
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  