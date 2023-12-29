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
  { username: 'laze1', email: 'laze1@gmail.com', status: 'Không Hoạt Động', password: '1234' },
  { username: 'laze2', email: 'laze2@gmail.com', status: 'Không Hoạt Động',password: '0012'  },
  { username: 'laze3', email: 'laze3@gmail.com', status: 'Không Hoạt Động',password: '1503'  },
  { username: 'cngvn27', email: 'cngvn27@gmail.com', status: 'Không Hoạt Động',password: '9866'  },
  { username: 'minhhh', email: 'minhh@gmail.com', status: 'Không Hoạt Động',password: '4321'  },
  { username: 'minhh', email: 'minh2@gmail.com', status: 'Không Hoạt Động',password: '9356'  },
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
      users.push({ username, email, password, status: 'Không hoạt động' });
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
})
document.getElementById('logoutButton').addEventListener('click', function() {
  // Ẩn bảng quản lý admin và hiển thị lại form đăng nhập
  document.getElementById('adminPanel').style.display = 'none';
  document.querySelector('.selection-container').style.display = 'block';
});
// Hàm để mã hóa email
function encryptEmail(email) {
  const parts = email.split('@');
  const username = parts[0];
  const domain = parts[1];
  const hiddenUsername = username.replace(/./g, '*');
  const encryptedEmail = hiddenUsername + '@' + domain;
  return encryptedEmail;
}

// Hàm để mã hóa mật khẩu
function encryptPassword(password) {
  return password.replace(/./g, '*');
}

// Hàm xử lý sự kiện khi click vào nút Mã hóa
function encryptUser(index) {
  let emailCell = document.getElementById('userTable').querySelector(`tbody tr:nth-child(${index + 1}) td:nth-child(2)`);
  let email = emailCell.getAttribute('data-email');
  let encryptedEmail = encryptEmail(email);
  emailCell.textContent = encryptedEmail;

  let passwordCell = document.getElementById('userTable').querySelector(`tbody tr:nth-child(${index + 1}) td:nth-child(3)`);
  let password = passwordCell.getAttribute('data-password');
  let encryptedPassword = encryptPassword(password);
  passwordCell.textContent = encryptedPassword;
}

// Sửa đoạn mã xử lý sự kiện khi click vào nút "Mã hóa"
document.getElementById('userTable').addEventListener('click', function(e) {
  if (e.target.classList.contains('encrypt-button')) {
    let row = e.target.closest('tr');
    let rowIndex = Array.from(row.parentNode.children).indexOf(row);
    encryptUser(rowIndex);
  }
});

// Hàm tạo nút hành động
function createActionButton(text, action, btnClass) {
  let btn = document.createElement('button');
  btn.textContent = text;
  btn.classList.add('action-btn'); // Class chung cho tất cả các nút
  btn.classList.add(btnClass); // Class cụ thể cho từng nút
  btn.onclick = action;
  return btn;
}

// Hàm điền dữ liệu vào bảng quản lý người dùng
function populateUserTable() {
  let tbody = document.getElementById('userTable').querySelector('tbody');
  tbody.innerHTML = '';

  users.forEach((user, index) => {
    let row = tbody.insertRow();
    row.insertCell(0).textContent = user.username;

    let emailCell = row.insertCell(1);
    emailCell.textContent = user.email;
    emailCell.setAttribute('data-email', user.email);

    let passwordCell = row.insertCell(2);
    passwordCell.textContent = user.password;
    passwordCell.setAttribute('data-password', user.password);

    let statusCell = row.insertCell(3);
    statusCell.textContent = user.status;
    statusCell.setAttribute('data-status', user.status);

    // Thêm các nút hành động
    let actionsCell = row.insertCell(4);
    actionsCell.appendChild(createActionButton("Kích hoạt", () => changeUserStatus(index, 'Hoạt động'), "activate-button"));
    actionsCell.appendChild(createActionButton("Vô hiệu hóa", () => changeUserStatus(index, 'Không hoạt động'), "deactivate-button"));
    actionsCell.appendChild(createActionButton("Xóa", () => deleteUser(index), "delete-button"));
    actionsCell.appendChild(createActionButton("Mã hóa", () => encryptUser(index), "encrypt-button")); // Thêm nút "Mã hóa"
    actionsCell.appendChild(createActionButton("Bỏ mã hóa", () => decryptUser(index), "decrypt-button")); // Thêm nút "Bỏ mã hóa"
  });
}

// Hàm thay đổi trạng thái người dùng
function changeUserStatus(index, newStatus) {
  users[index].status = newStatus;
  let row = document.getElementById('userTable').querySelector('tbody').rows[index];
  updateUserStatusInTable(row, newStatus);
}

// Hàm cập nhật trạng thái người dùng trong bảng
function updateUserStatusInTable(row, newStatus) {
  let statusCell = row.cells[3];
  statusCell.textContent = newStatus;
  statusCell.setAttribute('data-status', newStatus);
}
// Xử lý sự kiện khi click vào nút Mã hóa
document.getElementById('encrypt-button').addEventListener('click', function() {
  let emailCells = document.querySelectorAll('#userTable tbody td:nth-child(2)');
  emailCells.forEach(function(cell) {
    let email = cell.getAttribute('data-email');
    let encryptedEmail = encryptEmail(email);
    cell.textContent = encryptedEmail;
  });

  let passwordCells = document.querySelectorAll('#userTable tbody td:nth-child(3)');
  passwordCells.forEach(function(cell) {
    let password = cell.getAttribute('data-password');
    let encryptedPassword = encryptPassword(password);
    cell.textContent = encryptedPassword;
  });


});
// Hàm để giải mã email
function decryptEmail(encryptedEmail) {
  // Thực hiện quá trình giải mã email ở đây
  // Ví dụ: thay thế tất cả các ký tự '*' trong encryptedEmail bằng các ký tự gốc
  const originalEmail = encryptedEmail.replace(/\*/g, 'X'); // Ví dụ: thay '*' bằng 'X'
  return originalEmail;
}

// Hàm để giải mã mật khẩu
function decryptPassword(encryptedPassword) {
  // Thực hiện quá trình giải mã mật khẩu ở đây
  // Ví dụ: thay thế tất cả các ký tự '*' trong encryptedPassword bằng các ký tự gốc
  const originalPassword = encryptedPassword.replace(/\*/g, 'Y'); // Ví dụ: thay '*' bằng 'Y'
  return originalPassword;
}

// Hàm xử lý sự kiện khi click vào nút Bỏ mã hóa
function decryptUser(index) {
  let emailCell = document.getElementById('userTable').querySelector(`tbody tr:nth-child(${index + 1}) td:nth-child(2)`);
  let encryptedEmail = emailCell.getAttribute('data-email');
  let originalEmail = decryptEmail(encryptedEmail);
  emailCell.textContent = originalEmail;

  let passwordCell = document.getElementById('userTable').querySelector(`tbody tr:nth-child(${index + 1}) td:nth-child(3)`);
  let encryptedPassword = passwordCell.getAttribute('data-password');
  let originalPassword = decryptPassword(encryptedPassword);
  passwordCell.textContent = originalPassword;
}
// Hàm xóa người dùng
function deleteUser(index) {
  let deletedUser = users.splice(index, 1)[0];
  populateUserTable();
  alert(`Người dùng ${deletedUser.username} đã bị xóa.`);
}