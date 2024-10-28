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
        id: 1,
        image: "/dark-blue-house-exterior-2.png",
        title: "564 - Võ Nguyên Giáp",
        date: "2024-10-01",
        view: 150
    },
    {
        id: 2,
        image: "/dark-blue-house-exterior-2.png",
        title: "16/7/3 Tôn Quyền",
        date: "2024-10-10",
        view: 200
    },
    {
        id: 3,
        image: "/dark-blue-house-exterior-2.png",
        title: "29/08 Hà Tôn Quyền",
        date: "2024-10-15",
        view: 75
    },
    {
        id: 4,
        image: "/dark-blue-house-exterior-2.png",
        title: "57/15 Lê Quý Đôn",
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

// Mock data for rental and account-related news articles
export const featuredNews = {
    id: '1',
    title: 'Xu hướng thuê phòng trong năm 2024: Điều gì đang diễn ra?',
    excerpt: 'Nhu cầu thuê phòng tăng mạnh khi nhiều người trẻ tìm kiếm không gian sống linh hoạt và giá cả phải chăng.',
    image: '/pexels-photo-106399.jpeg',
    date: '2024-10-20',
}

export const sideNews = [
    { id: '2', title: 'Giá thuê phòng tại Hà Nội có xu hướng giảm', excerpt: 'Nhu cầu thuê phòng giảm trong bối cảnh nhiều người chuyển về quê sau đại dịch.', image: '/pexels-photo-106399.jpeg', date: '2024-10-19' },
    { id: '3', title: 'Cách tìm phòng thuê giá rẻ và chất lượng', excerpt: 'Những mẹo để tìm được phòng thuê phù hợp với nhu cầu và ngân sách của bạn.', image: '/pexels-photo-106399.jpeg', date: '2024-10-18' },
    { id: '4', title: 'Đăng ký tài khoản thuê phòng trực tuyến dễ dàng', excerpt: 'Hướng dẫn từng bước để đăng ký tài khoản và bắt đầu tìm kiếm phòng thuê.', image: '/pexels-photo-106399.jpeg', date: '2024-10-17' },
]

export const moreNews = [
    { id: '5', title: 'Những điều cần biết khi thuê phòng ngắn hạn', excerpt: 'Các lưu ý quan trọng khi bạn muốn thuê phòng trong thời gian ngắn.', image: '/pexels-photo-106399.jpeg', date: '2024-10-16' },
    { id: '6', title: 'Kinh nghiệm thuê phòng cho sinh viên', excerpt: 'Một số mẹo hữu ích cho sinh viên khi tìm kiếm phòng trọ.', image: '/pexels-photo-106399.jpeg', date: '2024-10-15' },
    { id: '7', title: 'Lợi ích của việc sử dụng ứng dụng để thuê phòng', excerpt: 'Ứng dụng thuê phòng mang lại những lợi ích gì cho người dùng?', image: '/pexels-photo-106399.jpeg', date: '2024-10-14' },
    { id: '8', title: 'Các hình thức thanh toán khi thuê phòng', excerpt: 'Khám phá các phương thức thanh toán phổ biến khi thuê phòng.', image: '/pexels-photo-106399.jpeg', date: '2024-10-13' },
]

export const recommendedNews = [
    { id: '1', title: 'Cách lựa chọn khu vực thuê phòng phù hợp', date: '2024-10-12' },
    { id: '2', title: 'Chính sách bảo mật thông tin khi tạo tài khoản', date: '2024-10-11' },
    { id: '3', title: 'Thời gian hợp lý để thuê phòng', date: '2024-10-10' },
    { id: '4', title: 'Quyền lợi của người thuê phòng', date: '2024-10-09' },
    { id: '5', title: 'Hướng dẫn quản lý tài khoản thuê phòng', date: '2024-10-08' },
    { id: '6', title: 'Giải đáp các thắc mắc thường gặp về thuê phòng', date: '2024-10-07' },
    { id: '7', title: 'So sánh các ứng dụng thuê phòng hiện nay', date: '2024-10-06' },
    { id: '8', title: 'Cách tạo tài khoản nhanh chóng và hiệu quả', date: '2024-10-05' },
]
export const locations = [
    "Quận 1",
    "Quận 2",
    "Quận 3",
    "Quận 4",
    "Quận 5",
    "Quận 6",
    "Quận 7",
    "Quận 8",
    "Quận 9",
    "Quận 10",
    "Quận 11",
    "Quận 12",
    "Quận Tân Bình",
    "Quận Bình Tân",
    "Quận Bình Thạnh",
    "Quận Tân Phú",
    "Quận Gò Vấp",
    "Quận Phú Nhuận"
];


export const faqData = [
    {
        question: "Làm thế nào để đăng ký tài khoản thuê phòng?",
        answer: "Để đăng ký tài khoản, nhấp vào nút 'Đăng ký' trên trang chính, điền thông tin cần thiết và xác nhận email của bạn."
    },
    {
        question: "Các phương thức thanh toán nào được chấp nhận?",
        answer: "Chúng tôi chấp nhận thanh toán qua thẻ tín dụng, PayPal, và chuyển khoản ngân hàng."
    },
    {
        question: "Tôi có thể thay đổi thông tin tài khoản không?",
        answer: "Có, bạn có thể thay đổi thông tin tài khoản của mình trong phần cài đặt tài khoản."
    },
    {
        question: "Làm thế nào để tìm phòng thuê gần nhất?",
        answer: "Bạn có thể sử dụng chức năng tìm kiếm trên trang chính để lọc theo khu vực và loại phòng cần thuê."
    },
    {
        question: "Có thể hủy đặt phòng không?",
        answer: "Có, bạn có thể hủy đặt phòng trong vòng 24 giờ sau khi đặt, theo chính sách hủy của chúng tôi."
    },
    {
        question: "Làm thế nào để liên hệ với bộ phận hỗ trợ khách hàng?",
        answer: "Bạn có thể gửi email đến support@example.com hoặc sử dụng chức năng chat trực tiếp trên trang web."
    },
    {
        question: "Tôi có thể xem lại lịch sử giao dịch không?",
        answer: "Có, bạn có thể xem lịch sử giao dịch trong phần tài khoản của mình."
    },
    {
        question: "Thời gian phản hồi của bộ phận hỗ trợ là bao lâu?",
        answer: "Chúng tôi cam kết phản hồi trong vòng 24 giờ làm việc cho tất cả các yêu cầu hỗ trợ."
    }
];
