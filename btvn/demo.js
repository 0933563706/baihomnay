const express = require('express');
const app = express();

app.use(express.json());

let dataRole = [
  { "id": "r1", "name": "Quản trị viên", "description": "Toàn quyền quản lý hệ thống", "creationAt": "2026-03-04T08:00:00.000Z", "updatedAt": "2026-03-04T08:00:00.000Z" },
  { "id": "r2", "name": "Biên tập viên", "description": "Quản lý nội dung và dữ liệu", "creationAt": "2026-03-04T08:00:00.000Z", "updatedAt": "2026-03-04T08:00:00.000Z" },
  { "id": "r3", "name": "Người dùng", "description": "Tài khoản người dùng thông thường", "creationAt": "2026-03-04T08:00:00.000Z", "updatedAt": "2026-03-04T08:00:00.000Z" }
];

let dataUser = [
  { "username": "nguyenvana", "password": "123456", "email": "vana@gmail.com", "fullName": "Nguyễn Văn A", "avatarUrl": "https://i.sstatic.net/l60Hf.png", "status": true, "loginCount": 15, "role": { "id": "r1", "name": "Quản trị viên", "description": "Toàn quyền quản lý hệ thống" }, "creationAt": "2026-03-04T08:10:00.000Z", "updatedAt": "2026-03-04T08:10:00.000Z" },
  { "username": "tranthib", "password": "123456", "email": "thib@gmail.com", "fullName": "Trần Thị B", "avatarUrl": "https://i.sstatic.net/l60Hf.png", "status": true, "loginCount": 7, "role": { "id": "r2", "name": "Biên tập viên", "description": "Quản lý nội dung và dữ liệu" }, "creationAt": "2026-03-04T08:11:00.000Z", "updatedAt": "2026-03-04T08:11:00.000Z" }
];

app.get('/roles', (req, res) => {
    res.json(dataRole);
});

app.get('/roles/:id', (req, res) => {
    const role = dataRole.find(r => r.id === req.params.id);
    if (!role) return res.status(404).json({ message: "Không tìm thấy Role" });
    res.json(role);
});

app.post('/roles', (req, res) => {
    const newRole = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        creationAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    dataRole.push(newRole);
    res.status(201).json({ message: "Tạo Role thành công", data: newRole });
});

app.put('/roles/:id', (req, res) => {
    const index = dataRole.findIndex(r => r.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: "Không tìm thấy Role" });
    
    dataRole[index] = { ...dataRole[index], ...req.body, updatedAt: new Date().toISOString() };
    res.json({ message: "Cập nhật Role thành công", data: dataRole[index] });
});

app.delete('/roles/:id', (req, res) => {
    dataRole = dataRole.filter(r => r.id !== req.params.id);
    res.json({ message: "Xóa Role thành công" });
});

app.get('/users', (req, res) => {
    res.json(dataUser);
});

app.get('/users/:username', (req, res) => {
    const user = dataUser.find(u => u.username === req.params.username);
    if (!user) return res.status(404).json({ message: "Không tìm thấy User" });
    res.json(user);
});

app.post('/users', (req, res) => {
    const newUser = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl || "",
        status: req.body.status || true,
        loginCount: 0,
        role: req.body.role,
        creationAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    dataUser.push(newUser);
    res.status(201).json({ message: "Tạo User thành công", data: newUser });
});

app.put('/users/:username', (req, res) => {
    const index = dataUser.findIndex(u => u.username === req.params.username);
    if (index === -1) return res.status(404).json({ message: "Không tìm thấy User" });
    
    dataUser[index] = { ...dataUser[index], ...req.body, updatedAt: new Date().toISOString() };
    res.json({ message: "Cập nhật User thành công", data: dataUser[index] });
});

app.delete('/users/:username', (req, res) => {
    dataUser = dataUser.filter(u => u.username !== req.params.username);
    res.json({ message: "Xóa User thành công" });
});

app.get('/roles/:id/users', (req, res) => {
    const roleId = req.params.id;
    const usersInRole = dataUser.filter(user => user.role.id === roleId);
    
    if (usersInRole.length === 0) {
        return res.status(404).json({ message: "Không có user nào thuộc Role này hoặc Role không tồn tại" });
    }
    
    res.json({ 
        message: `Danh sách users thuộc role: ${roleId}`, 
        data: usersInRole 
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});