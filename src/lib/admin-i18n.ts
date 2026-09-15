type AdminMessages = {
  nav: { dashboard: string; customers: string; requests: string; services: string; forms: string; staff: string };
  topbar: { title: string; viewAsCustomer: string };
  common: {
    signOut: string; save: string; cancel: string; edit: string; delete: string;
    upload: string; download: string; approve: string; reject: string;
    pending: string; complete: string; active: string; loading: string;
    search: string; filter: string; close: string; confirm: string;
    yes: string; no: string; back: string;
  };
  status: {
    active: string; pending: string; in_progress: string; completed: string;
    cancelled: string; needs_update: string; approved: string; gov_submitted: string;
  };
  customers: { title: string; search: string; noCustomers: string };
  requests: { title: string; noRequests: string; setPrice: string; price: string; notes: string };
  services: { title: string; noServices: string };
  forms: { title: string };
  staff: { title: string };
};

export const ADMIN_MESSAGES: Record<string, AdminMessages> = {
  en: {
    nav: { dashboard: "Dashboard", customers: "Customers", requests: "Requests", services: "Services", forms: "Forms", staff: "Staff" },
    topbar: { title: "Admin Panel", viewAsCustomer: "View as customer" },
    common: {
      signOut: "Sign out", save: "Save", cancel: "Cancel", edit: "Edit", delete: "Delete",
      upload: "Upload", download: "Download", approve: "Approve", reject: "Reject",
      pending: "Pending", complete: "Complete", active: "Active", loading: "Loading...",
      search: "Search", filter: "Filter", close: "Close", confirm: "Confirm",
      yes: "Yes", no: "No", back: "Back",
    },
    status: {
      active: "Active", pending: "Pending", in_progress: "In Progress", completed: "Completed",
      cancelled: "Cancelled", needs_update: "Needs Update", approved: "Approved", gov_submitted: "Gov. Submitted",
    },
    customers: { title: "Customers", search: "Search customers...", noCustomers: "No customers found" },
    requests: { title: "Requests", noRequests: "No requests", setPrice: "Set price", price: "Price", notes: "Notes" },
    services: { title: "Services", noServices: "No services" },
    forms: { title: "Forms" },
    staff: { title: "Staff" },
  },
  vi: {
    nav: { dashboard: "Tổng quan", customers: "Khách hàng", requests: "Yêu cầu", services: "Dịch vụ", forms: "Biểu mẫu", staff: "Nhân viên" },
    topbar: { title: "Bảng quản trị", viewAsCustomer: "Xem với tư cách khách hàng" },
    common: {
      signOut: "Đăng xuất", save: "Lưu", cancel: "Hủy", edit: "Chỉnh sửa", delete: "Xóa",
      upload: "Tải lên", download: "Tải xuống", approve: "Duyệt", reject: "Từ chối",
      pending: "Đang chờ", complete: "Hoàn thành", active: "Đang hoạt động", loading: "Đang tải...",
      search: "Tìm kiếm", filter: "Lọc", close: "Đóng", confirm: "Xác nhận",
      yes: "Có", no: "Không", back: "Quay lại",
    },
    status: {
      active: "Đang hoạt động", pending: "Đang chờ", in_progress: "Đang xử lý", completed: "Hoàn thành",
      cancelled: "Đã hủy", needs_update: "Cần bổ sung", approved: "Đã duyệt", gov_submitted: "Đã nộp cơ quan",
    },
    customers: { title: "Khách hàng", search: "Tìm kiếm khách hàng...", noCustomers: "Không tìm thấy khách hàng" },
    requests: { title: "Yêu cầu", noRequests: "Không có yêu cầu", setPrice: "Đặt giá", price: "Giá", notes: "Ghi chú" },
    services: { title: "Dịch vụ", noServices: "Không có dịch vụ" },
    forms: { title: "Biểu mẫu" },
    staff: { title: "Nhân viên" },
  },
  zh: {
    nav: { dashboard: "仪表盘", customers: "客户", requests: "请求", services: "服务", forms: "表单", staff: "员工" },
    topbar: { title: "管理面板", viewAsCustomer: "以客户身份查看" },
    common: {
      signOut: "退出", save: "保存", cancel: "取消", edit: "编辑", delete: "删除",
      upload: "上传", download: "下载", approve: "批准", reject: "拒绝",
      pending: "待处理", complete: "完成", active: "活跃", loading: "加载中...",
      search: "搜索", filter: "筛选", close: "关闭", confirm: "确认",
      yes: "是", no: "否", back: "返回",
    },
    status: {
      active: "活跃", pending: "待处理", in_progress: "处理中", completed: "已完成",
      cancelled: "已取消", needs_update: "需更新", approved: "已批准", gov_submitted: "已提交政府",
    },
    customers: { title: "客户", search: "搜索客户...", noCustomers: "未找到客户" },
    requests: { title: "请求", noRequests: "暂无请求", setPrice: "设置价格", price: "价格", notes: "备注" },
    services: { title: "服务", noServices: "暂无服务" },
    forms: { title: "表单" },
    staff: { title: "员工" },
  },
  es: {
    nav: { dashboard: "Panel", customers: "Clientes", requests: "Solicitudes", services: "Servicios", forms: "Formularios", staff: "Personal" },
    topbar: { title: "Panel de Admin", viewAsCustomer: "Ver como cliente" },
    common: {
      signOut: "Cerrar sesión", save: "Guardar", cancel: "Cancelar", edit: "Editar", delete: "Eliminar",
      upload: "Subir", download: "Descargar", approve: "Aprobar", reject: "Rechazar",
      pending: "Pendiente", complete: "Completado", active: "Activo", loading: "Cargando...",
      search: "Buscar", filter: "Filtrar", close: "Cerrar", confirm: "Confirmar",
      yes: "Sí", no: "No", back: "Volver",
    },
    status: {
      active: "Activo", pending: "Pendiente", in_progress: "En progreso", completed: "Completado",
      cancelled: "Cancelado", needs_update: "Necesita actualización", approved: "Aprobado", gov_submitted: "Presentado al gobierno",
    },
    customers: { title: "Clientes", search: "Buscar clientes...", noCustomers: "No se encontraron clientes" },
    requests: { title: "Solicitudes", noRequests: "Sin solicitudes", setPrice: "Establecer precio", price: "Precio", notes: "Notas" },
    services: { title: "Servicios", noServices: "Sin servicios" },
    forms: { title: "Formularios" },
    staff: { title: "Personal" },
  },
  id: {
    nav: { dashboard: "Dasbor", customers: "Pelanggan", requests: "Permintaan", services: "Layanan", forms: "Formulir", staff: "Staf" },
    topbar: { title: "Panel Admin", viewAsCustomer: "Lihat sebagai pelanggan" },
    common: {
      signOut: "Keluar", save: "Simpan", cancel: "Batal", edit: "Edit", delete: "Hapus",
      upload: "Unggah", download: "Unduh", approve: "Setujui", reject: "Tolak",
      pending: "Menunggu", complete: "Selesai", active: "Aktif", loading: "Memuat...",
      search: "Cari", filter: "Filter", close: "Tutup", confirm: "Konfirmasi",
      yes: "Ya", no: "Tidak", back: "Kembali",
    },
    status: {
      active: "Aktif", pending: "Menunggu", in_progress: "Diproses", completed: "Selesai",
      cancelled: "Dibatalkan", needs_update: "Perlu diperbarui", approved: "Disetujui", gov_submitted: "Diajukan ke pemerintah",
    },
    customers: { title: "Pelanggan", search: "Cari pelanggan...", noCustomers: "Pelanggan tidak ditemukan" },
    requests: { title: "Permintaan", noRequests: "Tidak ada permintaan", setPrice: "Tetapkan harga", price: "Harga", notes: "Catatan" },
    services: { title: "Layanan", noServices: "Tidak ada layanan" },
    forms: { title: "Formulir" },
    staff: { title: "Staf" },
  },
};

const LOCALES = ["en", "vi", "zh", "es", "id"] as const;
export type AdminLocale = typeof LOCALES[number];

export function getAdminMessages(locale: string): AdminMessages {
  return ADMIN_MESSAGES[locale] ?? ADMIN_MESSAGES.en;
}
