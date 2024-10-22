// components/UserProfile.js
export default function UserProfile() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        return <p>Chưa đăng nhập.</p>;
    }

    return (
        <div>
            <h2>Xin chào, {user.name}</h2>
            {/* Hiển thị thêm thông tin người dùng nếu cần */}
        </div>
    );
}
