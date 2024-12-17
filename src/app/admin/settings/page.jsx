export default function EditInfo() {
    return (
      <div className="max-w-5xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-semibold mb-6">Chỉnh sửa Thông Tin</h2>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cột bên trái */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                  Tên
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Nhập tên..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
                  Mô tả
                </label>
                <textarea
                  id="description"
                  rows="4"
                  placeholder="Nhập mô tả..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  placeholder="Nhập số điện thoại..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="address">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  id="address"
                  placeholder="Nhập địa chỉ..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
  
            {/* Cột bên phải */}
            <div className="md:col-span-1">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="favicon">
                  Favicon
                </label>
                <input
                  type="file"
                  id="favicon"
                  className="w-full px-2 py-1 text-gray-700 border rounded-lg focus:outline-none file:mr-4 file:py-2 file:px-4 file:border-0 file:text-white file:bg-blue-900 hover:file:bg-blue-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="logo">
                  Logo
                </label>
                <input
                  type="file"
                  id="logo"
                  className="w-full px-2 py-1 text-gray-700 border rounded-lg focus:outline-none file:mr-4 file:py-2 file:px-4 file:border-0 file:text-white file:bg-blue-900 hover:file:bg-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Nhập email..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          </div>
  
          {/* Nút lưu */}
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Lưu Thông Tin
            </button>
          </div>
        </form>
      </div>
    );
  }
  