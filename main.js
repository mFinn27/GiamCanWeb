document.getElementById('userSelect').addEventListener('click', function() {
  document.getElementById('userForm').style.display = 'block';
  document.getElementById('adminForm').style.display = 'none';
});

document.getElementById('adminSelect').addEventListener('click', function() {
  document.getElementById('adminForm').style.display = 'block';
  document.getElementById('userForm').style.display = 'none';
});

// Thêm mã xử lý sự kiện submit cho các form ở đây nếu cần

// Danh sách người dùng giả lập
let users = [
  // Ví dụ về dữ liệu người dùng
  { username: 'laze1', email: 'laze1@gmail.com', status: 'Không Hoạt Động' },
  { username: 'laze2', email: 'laze2@gmail.com', status: 'Không Hoạt Động' },
  { username: 'laze3', email: 'laze3@gmail.com', status: 'Không Hoạt Động' },
  { username: 'cngvn27', email: 'cngvn27@gmail.com', status: 'Không Hoạt Động' },
  { username: 'minhhh', email: 'minhh@gmail.com', status: 'Không Hoạt Động' },
  { username: 'minhh', email: 'minh2@gmail.com', status: 'Không Hoạt Động' },
];

// Xử lý đăng ký người dùng
document.getElementById('registration-form').addEventListener('submit', function(e) {
    e.preventDefault();
    let username = document.getElementById('new-username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('new-password').value;

    let userExists = users.some(user => user.username === username || user.email === email);
    if (userExists) {
        alert('Người dùng đã tồn tại. Vui lòng chọn tên đăng nhập hoặc email khác.');
    } else {
        users.push({ username, email, password });
        alert('Đăng ký thành công.');
    }
});

// Xử lý đăng nhập người dùng
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let user = users.find(user => user.username === username && user.password === password);
    if (user) {
        alert('Đăng nhập thành công.');
    } else {
        alert('Thông tin đăng nhập không chính xác.');
    }
});

// Xử lý đăng nhập admin
document.getElementById('adminForm').querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    let username = e.target.querySelector('input[type="text"]').value;
    let password = e.target.querySelector('input[type="password"]').value;

    if (username === 'admin' && password === 'admin123') {
        alert('Đăng nhập admin thành công.');
        // Có thể chuyển hướng đến trang quản trị hoặc hiển thị bảng điều khiển admin tại đây
    } else {
        alert('Thông tin đăng nhập admin không chính xác.');
    }
});

// Xử lý đăng nhập admin và hiển thị bảng quản lý
document.getElementById('adminForm').querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  let username = e.target.querySelector('input[type="text"]').value;
  let password = e.target.querySelector('input[type="password"]').value;

  if (username === 'admin' && password === 'admin123') {
      alert('Đăng nhập admin thành công.');
      // Ẩn các phần không cần thiết
      document.getElementById('userForm').style.display = 'none';
      document.getElementById('adminForm').style.display = 'none';
      document.querySelector('.selection-container').style.display = 'none';
      
      // Hiển thị bảng quản lý
      document.getElementById('adminPanel').style.display = 'block';
      populateUserTable();
  } else {
      alert('Thông tin đăng nhập admin không chính xác.');
  }
});

// Hàm để điền dữ liệu vào bảng quản lý người dùng
function populateUserTable() {
  let tbody = document.getElementById('userTable').querySelector('tbody');
  tbody.innerHTML = '';

  users.forEach((user, index) => {
      let row = tbody.insertRow();
      row.insertCell(0).textContent = user.username;
      row.insertCell(1).textContent = user.email;

      // Thêm các nút hành động
      let actionsCell = row.insertCell(2);
      actionsCell.appendChild(createActionButton("Kích hoạt", () => activateUser(index), "activate-button"));
      actionsCell.appendChild(createActionButton("Vô hiệu hóa", () => deactivateUser(index), "deactivate-button"));
      actionsCell.appendChild(createActionButton("Xóa", () => deleteUser(index), "delete-button"));
  });
}

// Hàm tạo nút hành động
function createActionButton(text, action, btnClass) {
  let btn = document.createElement('button');
  btn.textContent = text;
  btn.classList.add('action-btn'); // Class chung cho tất cả các nút
  btn.classList.add(btnClass); // Class cụ thể cho từng nút
  btn.onclick = action;
  return btn;
}

// Hàm thay đổi trạng thái người dùng
function changeUserStatus(index, status) {
  users[index].status = status;
  populateUserTable();
  alert(`Trạng thái của người dùng ${users[index].username} đã được thay đổi thành ${status}.`);
}

// Hàm xóa người dùng
function deleteUser(index) {
  let deletedUser = users.splice(index, 1)[0];
  populateUserTable();
  alert(`Người dùng ${deletedUser.username} đã bị xóa.`);
}