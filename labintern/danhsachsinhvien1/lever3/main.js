

class SinhVien {
    contructor(MaSV, TenSV, NgaySinh, GioiTinh, MaKhoa) {
        this.MaSV = MaSV
        this.TenSV = TenSV
        this.NgaySinh = NgaySinh
        this.GioiTinh = GioiTinh
        this.MaKhoa = MaKhoa
    }
}

class Khoa {
    contructor(MaKhoa, TenKhoa) {
        this.MaKhoa = MaKhoa,
            this.TenKhoa = TenKhoa
    }
}
let danhSachSV = [{ MaSV: '20211344', TenSV: 'ngô ngọc huy', NgaySinh: '05/08/2003', GioiTinh: 'Nam', MaKhoa: 'cntt' },
    {MaSV: '20211345', TenSV: 'ngô ngọc huy', NgaySinh: '05/08/2003', GioiTinh: 'Nam', MaKhoa: 'cntt'},]
let khoaData = [ { MaKhoa: 'cntt', TenKhoa: 'công nghệ thồn tin' }, { MaKhoa: 'attt', TenKhoa: 'cyber security' },]

const drpKhoa = document.getElementById('drpKhoa')
// Thêm tùy chọn cho dropdown Khoa
khoaData.forEach(khoa => {
    const option = document.createElement('option')
    option.value = khoa.TenKhoa
    option.textContent = khoa.TenKhoa
    drpKhoa.appendChild(option)
})


// Lấy đối tượng tbody
const tbody = document.getElementById('listData')

// Hiển thị danh sách SV
danhSachSV.forEach((sinhVien, index) => {
    showNewSinhVien(sinhVien, index)
})


//Khai báo SV và Khoa


// btn Vùng hiển thị thông tin
//btn Thêm mới sinh viên
function btnAddOneSinhVien() {
    const MaSV = document.getElementById("txtMaSV").value
    const TenSV = document.getElementById("txtTenSV").value
    const NgaySinh = document.getElementById("txtNgaySinh").value
    const GioiTinh = document.getElementById('rdbNam').checked ? "Nam" : "Nữ"
    const TenKhoa = document.getElementById("drpKhoa").value
    const MaKhoa = khoaData.filter(khoa => khoa.TenKhoa === TenKhoa).map(khoa => khoa.MaKhoa).toString()   // const khoa = khoaData.find(khoa => khoa.TenKhoa === TenKhoa) const MaKhoa = khoa.MaKhoa

    const newSV = { MaSV: MaSV, TenSV: TenSV, NgaySinh: NgaySinh, GioiTinh: GioiTinh, MaKhoa: MaKhoa }
    danhSachSV.push(newSV)
    showNewSinhVien(newSV, danhSachSV.length - 1)
}

// btn Cập nhật
function btnUpdateOneSinhVien() {
    const MaSV = document.getElementById("txtMaSV").value
    const TenSV = document.getElementById("txtTenSV").value
    const NgaySinh = document.getElementById("txtNgaySinh").value
    const GioiTinh = document.getElementById('rdbNam').checked ? "Nam" : "Nữ"
    const TenKhoa = document.getElementById("drpKhoa").value
    const MaKhoa = khoaData.filter(khoa => khoa.TenKhoa === TenKhoa).map(khoa => khoa.MaKhoa).toString()
    const newSV = { MaSV: MaSV, TenSV: TenSV, NgaySinh: NgaySinh, GioiTinh: GioiTinh, MaKhoa: MaKhoa }

    var danhSachMoi = danhSachSV.filter(SV => SV.MaSV != MaSV).map(SV => SV).push(newSV)
    danhSachSV = danhSachMoi

    findRowByMaSV(MaSV, TenSV, NgaySinh, GioiTinh, MaKhoa)
    clearDataInputArea()

}
document.addEventListener('DOMContentLoaded', function () {
    var btnDelete = document.querySelector('#btnData button:last-child');

    btnDelete.addEventListener('click', function () {
        // Hiển thị cảnh báo xác nhận trước khi xóa
        var confirmDelete = confirm('Bạn có muốn xóa sinh viên này không?');

        // Nếu người dùng chọn "OK" trong cửa sổ xác nhận, thực hiện hành động xóa
        if (confirmDelete) {
            deleteOneSinhVien(); // Gọi hàm xóa sinh viên ở đây
        }
    });

    function deleteOneSinhVien() {
        // Hành động xóa sinh viên
        // Đặt logic xóa sinh viên ở đây
        alert('Sinh viên đã bị xóa thành công!');
    }
});

//show Thêm sinh viên
function showNewSinhVien(infoSV, index) {
    const row = document.createElement('tr')

    // Thêm số thứ tự
    const indexCell = document.createElement('td')
    indexCell.textContent = index + 1
    row.appendChild(indexCell)

    // Thêm thông tin sinh viên
    Object.values(infoSV).forEach(value => {
        const cell = document.createElement('td')
        cell.textContent = value
        row.appendChild(cell)
    })

    // Thêm thao tác (nếu cần)
    const actionCell = document.createElement('td')
    const editButton = document.createElement('button')
    const deleteButton = document.createElement('button')

    editButton.textContent = 'Sửa'
    deleteButton.textContent = 'Xóa'

    editButton.addEventListener('click', (e) => {
        e.preventDefault();
        // Xử lý sự kiện khi nút "Sửa" được click
        alert('Chức năng sửa cho sinh viên ' + infoSV.MaSV)
        console.log(infoSV)

        btnEditSinhVien(infoSV.MaSV, infoSV.TenSV, infoSV.NgaySinh, infoSV.GioiTinh, infoSV.MaKhoa)
    })

    deleteButton.addEventListener('click', () => {
        // Xử lý sự kiện khi nút "Xóa" được click
        var isConfirmed = confirm("Bạn có chắc chắn muốn xóa không?")
        if (isConfirmed) {
            const MaSV = infoSV.MaSV
            deleteOneSinhVien(MaSV)
            row.remove()
        }
    })

    actionCell.appendChild(editButton)
    actionCell.appendChild(deleteButton)
    row.appendChild(actionCell)

    //Thêm thao tác chọn nhiều
    const checkMany = document.createElement('td')
    const inputCheckMany = document.createElement('input')
    inputCheckMany.type = 'checkbox'
    checkMany.appendChild(inputCheckMany)
    row.appendChild(checkMany)

    // Thêm dòng vào tbody
    tbody.appendChild(row)
}


//btn Xóa Sinh viên
function btnDeleteOneSinhVien() {
    const MaSV = document.getElementById("txtMaSV").value
    var isConfirmed = confirm(`Bạn có chắc chắn muốn xóa sinh viên có mã SV là ${MaSV} không?`)

    if (isConfirmed) {
        deleteOneSinhVien(MaSV)
    }
}

//btn Sửa sinh vien
function btnEditSinhVien(MaSV, TenSV, NgaySinh, GioiTinh, MaKhoa) {
    document.getElementById("txtMaSV").value = MaSV
    document.getElementById("txtTenSV").value = TenSV
    document.getElementById("txtNgaySinh").value = NgaySinh
    if (GioiTinh === "Nam") { document.getElementById('rdbNam').checked = true; document.getElementById('rdbNu').checked = false }
    else { document.getElementById('rdbNam').checked = false; document.getElementById('rdbNu').checked = true }

    const TenKhoa = khoaData.filter(khoa => khoa.MaKhoa === MaKhoa).map(khoa => khoa.TenKhoa).toString()
    document.getElementById("drpKhoa").value = TenKhoa
}


function findRowByMaSV(MaSV, TenSV, NgaySinh, GioiTinh, MaKhoa) {
    var table = document.getElementById("dataList");
    var rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

    for (var i = 0; i < rows.length; i++) {
        var currentMaSV = rows[i].cells[1].textContent.trim();
        if (currentMaSV === MaSV) {
            console.log(rows[i])
            rows[i].getElementsByTagName("td")[2].textContent = TenSV
            rows[i].getElementsByTagName("td")[3].textContent = NgaySinh
            rows[i].getElementsByTagName("td")[4].textContent = GioiTinh
            rows[i].getElementsByTagName("td")[5].textContent = MaKhoa
            break;
        }
    }

    return null;
}


//Xóa Sinh viên theo MaSV
function deleteOneSinhVien(MaSV) {
    const danhSachMoi = danhSachSV.filter(SV => SV.MaSV != MaSV)
    danhSachSV = danhSachMoi
}

//btn Xóa Nhiều Sinh viên
function deleteManySV() {

    let listMaSVExport = getCheckedSV([])
    danhSachSV = danhSachSV.filter(sv => !listMaSVExport.includes(sv.MaSV));
    removeRowChecked()
    refreshIndexTable()
}



function getCheckedSV(listMaSVExport) {
    var table = document.getElementById("dataList");
    var rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

    for (var i = 0; i < rows.length; i++) {
        var currentMaSV = rows[i].cells[1].textContent.trim();
        if (rows[i].getElementsByTagName("td")[7].getElementsByTagName("input")[0].checked) {
            listMaSVExport.push(currentMaSV)
        }
    }
    return listMaSVExport;
}

//refresh bảng thông tin
function clearDataInputArea() {
    document.getElementById("txtMaSV").value = ''
    document.getElementById("txtTenSV").value = ''
    document.getElementById("txtNgaySinh").value = ''
    document.getElementById('rdbNam').checked = true; document.getElementById('rdbNu').checked = false
    document.getElementById("drpKhoa").value = khoaData[0].TenKhoa
}

function chooseAllSV() {

    var table = document.getElementById("dataList");
    var rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

    for (var i = 0; i < rows.length; i++) {
        rows[i].getElementsByTagName("td")[7].getElementsByTagName("input")[0].checked = document.getElementById("chooseAllSV").checked
    }

    return null;
}

function removeRowChecked() {
    var table = document.getElementById("dataList");
    var rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

    for (var i = 0; i < rows.length; i++) {
        if (rows[i].getElementsByTagName("td")[7].getElementsByTagName("input")[0].checked) {
            if (i > 0) { console.log(rows[i - 1].getElementsByTagName("td")[0].textContent) }
            rows[i].remove()
            i--;
        }
    }
    return null;
}

function refreshIndexTable() {
    var table = document.getElementById("dataList");
    var rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

    for (var i = 0; i < rows.length; i++) {
        rows[i].getElementsByTagName("td")[0].textContent = i + 1
    }

    return null;
}