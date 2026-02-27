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
import { SYSTEM_ROLE } from "../../constants"

export const MENU_ITEMS = [
  {
    key: '/dashboard',
    label: 'Dashboard',
    icon: Squares2X2Icon,
    roles: [SYSTEM_ROLE.SUPPER_ADMIN, SYSTEM_ROLE.MERCHANT, SYSTEM_ROLE.STAFF],
  },
  {
    key: '/merchants',
    label: 'Merchants',
    icon: BuildingStorefrontIcon,
    roles: [SYSTEM_ROLE.SUPPER_ADMIN],
  },
  {
    key: 'catalog',
    label: 'Menu Catalog',
    icon: BookOpenIcon,
    roles: [SYSTEM_ROLE.MERCHANT],
    submenu: [
        { key: '/categories', label: 'Categories' },
        { key: '/products', label: 'Dishes' },
    ]
  },
  {
    key: '/tables',
    label: 'Tables & QR',
    icon: QrCodeIcon,
    roles: [SYSTEM_ROLE.MERCHANT, SYSTEM_ROLE.STAFF],
  },
  {
    key: '/orders',
    label: 'Live Orders',
    icon: ClipboardDocumentListIcon,
    roles: [SYSTEM_ROLE.MERCHANT, SYSTEM_ROLE.STAFF],
  },
  {
    type: 'divider',
  },
  {
    key: '/staff',
    label: 'Staff Management',
    icon: UsersIcon,
    roles: [SYSTEM_ROLE.MERCHANT],
  },
  {
    key: '/reports',
    label: 'Reports & Analytics',
    icon: ChartBarIcon,
    roles: [SYSTEM_ROLE.MERCHANT],
    comingSoon: true,
  },
  {
    key: '/settings',
    label: 'Store Settings',
    icon: Cog6ToothIcon,
    roles: [SYSTEM_ROLE.MERCHANT],
  },
]

export const getMenuItems = (userRoles = []) => {
    return MENU_ITEMS.filter(item => {
        if (item.type === 'divider') return true
        if (!item.roles) return true
        return item.roles.some(role => userRoles.includes(role))
    })
}