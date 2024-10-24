import { Search, Home, FileText, Phone } from 'lucide-react'
export const images = [
    "/pexels-photo-106399.jpeg?height=400&width=800&text=Slide+1",
    "/background-phong-khach-dep-3.jpg?height=400&width=800&text=Slide+2",
    "/mau-sac-hai-hoa-mang-den-Background-dep.jpg?height=400&width=800&text=Slide+3",
    "/istockphoto-1026205392-612x612.jpg?height=400&width=800&text=Slide+4",
]
export const categories = [
    { imageUrl: "/dark-blue-house-exterior-2.png?height=100&width=100&text=Nhà+phố", title: "Nhà phố", href: "/nha-pho" },
    { imageUrl: "/dark-blue-house-exterior-2.png?height=100&width=100&text=Chung+cư", title: "Chung cư", href: "/chung-cu" },
    { imageUrl: "/dark-blue-house-exterior-2.png?height=100&width=100&text=Biệt+thự", title: "Biệt thự", href: "/biet-thu" },
    { imageUrl: "/dark-blue-house-exterior-2.png?height=100&width=100&text=Đất+nền", title: "Đất nền", href: "/dat-nen" },
    { imageUrl: "/dark-blue-house-exterior-2.png?height=100&width=100&text=Biệt+thự", title: "Biệt thự", href: "/biet-thu" },
    { imageUrl: "/dark-blue-house-exterior-2.png?height=100&width=100&text=Đất+nền", title: "Đất nền", href: "/dat-nen" },
]
export const products = [
    {
        image: "/dark-blue-house-exterior-2.png?height=100&width=100&text=Nhà+phố",
        title: "Căn hộ cao cấp tại trung tâm",
        address: "Quận 1, TP.HCM",
        price: "5 tỷ",
        size: "100m²",
        mapLink: "/map/1",
    },
    {
        image: "/dark-blue-house-exterior-2.png?height=100&width=100&text=Nhà+phố",
        title: "Nhà phố hiện đại",
        address: "Quận 2, TP.HCM",
        price: "8 tỷ",
        size: "200m²",
        mapLink: "/map/2",
    },
    {
        image: "/dark-blue-house-exterior-2.png?height=100&width=100&text=Nhà+phố",
        title: "Biệt thự ven sông",
        address: "Quận 7, TP.HCM",
        price: "15 tỷ",
        size: "500m²",
        mapLink: "/map/3",
    },
    {
        image: "/dark-blue-house-exterior-2.png?height=100&width=100&text=Nhà+phố",
        title: "Căn hộ cao cấp tại trung tâm",
        address: "Quận 1, TP.HCM",
        price: "5 tỷ",
        size: "100m²",
        mapLink: "/map/1",
    },
    {
        image: "/dark-blue-house-exterior-2.png?height=100&width=100&text=Nhà+phố",
        title: "Nhà phố hiện đại",
        address: "Quận 2, TP.HCM",
        price: "8 tỷ",
        size: "200m²",
        mapLink: "/map/2",
    },
    {
        image: "/dark-blue-house-exterior-2.png?height=100&width=100&text=Nhà+phố",
        title: "Biệt thự ven sông",
        address: "Quận 7, TP.HCM",
        price: "15 tỷ",
        size: "500m²",
        mapLink: "/map/3",
    },
]
export const blogs = [
    {
        image: "/dark-blue-house-exterior-2.png?height=100&width=100&text=Nhà+phố",
        title: "Understanding React Hooks",
        date: "2024-10-01",
        view: 150
    },
    {
        image: "/dark-blue-house-exterior-2.png?height=100&width=100&text=Nhà+phố",
        title: "JavaScript ES2024 Features",
        date: "2024-10-10",
        view: 200
    },
    {
        image: "/dark-blue-house-exterior-2.png?height=100&width=100&text=Nhà+phố",
        title: "Building a PDF Preview with React",
        date: "2024-10-15",
        view: 75
    }
];

export const keywords = [
    "Căn hộ cho thuê",
    "Nhà phố bán",
    "Biệt thự",
    "Chung cư cao cấp",
    "Đất nền",
    "Nhà mặt tiền",
    "Văn phòng cho thuê",
    "Căn hộ dịch vụ",
    "Nhà trọ sinh viên",
    "Khu công nghiệp"
];

export const steps = [
    {
        icon: Search,
        title: "Tìm kiếm",
        description: "Tìm bất động sản phù hợp với nhu cầu của bạn"
    },
    {
        icon: Home,
        title: "Khám phá",
        description: "Xem chi tiết và hình ảnh của bất động sản"
    },
    {
        icon: FileText,
        title: "Đăng ký",
        description: "Điền thông tin để đặt lịch xem nhà"
    },
    {
        icon: Phone,
        title: "Liên hệ",
        description: "Chúng tôi sẽ liên hệ để xác nhận lịch hẹn"
    }
]

// Mock data for news articles
export const featuredNews = {
    id: '1',
    title: 'Phát hiện bất ngờ về xu hướng thuê nhà trong năm 2024',
    excerpt: 'Các chuyên gia dự đoán sự thay đổi lớn trong nhu cầu thuê nhà khi người dân chuyển từ các đô thị lớn sang các vùng ngoại ô và khu vực ven biển.',
    image: '/pexels-photo-106399.jpeg',
    date: '2024-10-20',
}

export const sideNews = [
    { id: '2', title: 'Giá thuê nhà ở TP. Hồ Chí Minh tăng mạnh', excerpt: 'Nhu cầu thuê nhà ở tăng cao khiến giá cả tại các quận trung tâm TP. Hồ Chí Minh tăng vọt.', image: '/pexels-photo-106399.jpeg', date: '2024-10-19' },
    { id: '3', title: 'Lợi ích của việc thuê nhà tại các khu vực ngoại ô', excerpt: 'Nhiều người chuyển ra ngoại ô sinh sống để có môi trường sống tốt hơn và chi phí thuê nhà rẻ hơn.', image: '/pexels-photo-106399.jpeg', date: '2024-10-18' },
    { id: '4', title: 'Xu hướng thuê căn hộ nhỏ cho người độc thân', excerpt: 'Người độc thân hiện nay có xu hướng chọn thuê các căn hộ nhỏ để tiết kiệm chi phí và phù hợp với nhu cầu sống cá nhân.', image: '/pexels-photo-106399.jpeg', date: '2024-10-17' },
]

export const moreNews = [
    { id: '5', title: 'Những điều cần lưu ý khi thuê nhà dài hạn', excerpt: 'Hợp đồng thuê nhà dài hạn mang lại nhiều lợi ích cho người thuê, nhưng cũng cần chú ý đến các điều khoản ràng buộc.', image: '/pexels-photo-106399.jpeg', date: '2024-10-16' },
    { id: '5', title: 'Những điều cần lưu ý khi thuê nhà dài hạn', excerpt: 'Hợp đồng thuê nhà dài hạn mang lại nhiều lợi ích cho người thuê, nhưng cũng cần chú ý đến các điều khoản ràng buộc.', image: '/pexels-photo-106399.jpeg', date: '2024-10-16' },
    { id: '5', title: 'Những điều cần lưu ý khi thuê nhà dài hạn', excerpt: 'Hợp đồng thuê nhà dài hạn mang lại nhiều lợi ích cho người thuê, nhưng cũng cần chú ý đến các điều khoản ràng buộc.', image: '/pexels-photo-106399.jpeg', date: '2024-10-16' },
    { id: '5', title: 'Những điều cần lưu ý khi thuê nhà dài hạn', excerpt: 'Hợp đồng thuê nhà dài hạn mang lại nhiều lợi ích cho người thuê, nhưng cũng cần chú ý đến các điều khoản ràng buộc.', image: '/pexels-photo-106399.jpeg', date: '2024-10-16' },
]

export const recommendedNews = [
    { id: '1', title: 'Xu hướng căn hộ chung cư', date: '2024-10-12' },
    { id: '2', title: 'Đầu tư vào nhà cho thuê', date: '2024-10-11' },
    { id: '3', title: 'Khu vực nào hợp lý nhất?', date: '2024-10-10' },
    { id: '4', title: 'Thị trường nhà khu công nghiệp', date: '2024-10-09' },
    { id: '5', title: 'Xu hướng căn hộ chung cư', date: '2024-10-12' },
    { id: '6', title: 'Đầu tư vào nhà cho thuê', date: '2024-10-11' },
    { id: '7', title: 'Khu vực nào hợp lý nhất?', date: '2024-10-10' },
    { id: '8', title: 'Thị trường nhà khu công nghiệp', date: '2024-10-09' },
]
export const faqData = [
    {
        question: "Làm thế nào để tạo văn bản mới?",
        answer: "Để tạo văn bản mới, truy cập vào trang tạo văn bản, chọn loại văn bản và phòng ban, sau đó điền các thông tin cần thiết và lưu lại."
    },
    {
        question: "Làm cách nào để kiểm tra sự tồn tại của văn bản?",
        answer: "Bạn có thể kiểm tra sự tồn tại của văn bản bằng cách tìm kiếm theo loại văn bản và mã phòng ban trong hệ thống quản lý văn bản."
    },
    {
        question: "Làm thế nào để chỉnh sửa văn bản đã tạo?",
        answer: "Để chỉnh sửa văn bản, tìm văn bản cần chỉnh sửa trong danh sách văn bản, nhấp vào nút 'Chỉnh sửa', thực hiện thay đổi và lưu lại."
    },
    {
        question: "Làm thế nào để xóa văn bản?",
        answer: "Để xóa văn bản, tìm văn bản cần xóa trong danh sách văn bản, nhấp vào nút 'Xóa' và xác nhận hành động của bạn."
    },
    {
        question: "Làm thế nào để tạo tài khoản?",
        answer: "Để tạo tài khoản, nhấp vào nút 'Đăng ký' ở góc trên bên phải của trang chủ. Điền thông tin cần thiết và làm theo hướng dẫn trên màn hình."
    },
    {
        question: "Làm cách nào để đặt lại mật khẩu?",
        answer: "Trên trang đăng nhập, nhấp vào liên kết 'Quên mật khẩu'. Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn hướng dẫn đặt lại mật khẩu."
    },
    {
        question: "Làm thế nào để liên hệ với bộ phận hỗ trợ?",
        answer: "Bạn có thể liên hệ với bộ phận hỗ trợ của chúng tôi bằng cách gửi email đến support@example.com hoặc sử dụng biểu mẫu liên hệ trên trang web của chúng tôi."
    },
    {
        question: "Các phương thức thanh toán được chấp nhận là gì?",
        answer: "Chúng tôi chấp nhận các phương thức thanh toán sau: Visa, MasterCard, American Express, và PayPal."
    },
    {
        question: "Chính sách hoàn trả của bạn là gì?",
        answer: "Chúng tôi cung cấp chính sách hoàn trả trong vòng 30 ngày cho hầu hết các sản phẩm. Vui lòng xem trang Chính sách Hoàn trả của chúng tôi để biết thêm chi tiết."
    }
];