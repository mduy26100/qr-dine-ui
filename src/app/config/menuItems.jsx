import {
  Squares2X2Icon,
  BookOpenIcon,
  QrCodeIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline"
import { SYSTEM_ROLE } from "../../shared/constants"

export const MENU_ITEMS = [
  {
    key: '/dashboard',
    label: 'Tổng quan',
    icon: Squares2X2Icon,
    roles: [SYSTEM_ROLE.SUPPER_ADMIN, SYSTEM_ROLE.MERCHANT, SYSTEM_ROLE.STAFF],
  },
  {
    key: '/merchants',
    label: 'Quản lý cửa hàng',
    icon: BuildingStorefrontIcon,
    roles: [SYSTEM_ROLE.SUPPER_ADMIN],
  },
  {
    key: 'catalog',
    label: 'Thực đơn',
    icon: BookOpenIcon,
    roles: [SYSTEM_ROLE.MERCHANT],
    submenu: [
        { key: '/categories', label: 'Danh mục' },
        { key: '/products', label: 'Món ăn' },
    ]
  },
  {
    key: '/tables',
    label: 'Bàn & Mã QR',
    icon: QrCodeIcon,
    roles: [SYSTEM_ROLE.MERCHANT, SYSTEM_ROLE.STAFF],
  },
  {
    key: '/orders',
    label: 'Đơn hàng (Live)',
    icon: ClipboardDocumentListIcon,
    roles: [SYSTEM_ROLE.MERCHANT, SYSTEM_ROLE.STAFF],
  },
  {
    type: 'divider',
  },
  {
    key: '/staff',
    label: 'Nhân viên',
    icon: UsersIcon,
    roles: [SYSTEM_ROLE.MERCHANT],
  },
  {
    key: '/reports',
    label: 'Báo cáo doanh thu',
    icon: ChartBarIcon,
    roles: [SYSTEM_ROLE.MERCHANT],
    comingSoon: true,
  },
  {
    key: '/settings',
    label: 'Cài đặt hệ thống',
    icon: Cog6ToothIcon,
    roles: [SYSTEM_ROLE.SUPPER_ADMIN],
  },
]

export const getMenuItems = (userRoles = []) => {
    return MENU_ITEMS.filter(item => {
        if (item.type === 'divider') return true
        if (!item.roles) return true
        return item.roles.some(role => userRoles.includes(role))
    })
}
