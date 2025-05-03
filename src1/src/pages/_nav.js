import { CNavItem } from '@coreui/react';

export default function Navigations(userPermissions, user) {

  const navigationItems = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/',
      key: 'Dashboard',
      is_common: true
    },
    {
      component: CNavItem,
      name: 'Analytics',
      to: '/analytics',
      key: 'Analytics',
    },
    {
      component: CNavItem,
      name: 'Manage Projects',
      to: '/projects',
      key: 'Enq',
    },
    {
      component: CNavItem,
      name: 'Duedate Calendar',
      to: '/duedate-calendar',
      key: 'Duedate',
      is_common: true
    },
    {
      component: CNavItem,
      name: 'Invoices',
      to: '/invoices',
      key: 'Invoice',
      is_guest_disbled: true
    },
    {
      component: CNavItem,
      name: 'Manage Storage',
      to: '/storage',
      key: 'Storage'
    },
    {
      component: CNavItem,
      name: 'Net Promoter Score',
      to: '/nps',
      key: 'NPS'
    },
    {
      component: CNavItem,
      name: 'Manage Customers',
      to: '/customers',
      key: 'Customer'
    },
    {
      component: CNavItem,
      name: 'Manage Branches',
      to: '/branches',
      key: 'Branch'
    },
    {
      component: CNavItem,
      name: 'Manage Software',
      to: '/softwares',
      key: 'Software',
    },
    {
      component: CNavItem,
      name: 'Manage Services',
      to: '/services',
      is_admin: user?.is_admin
    },
    {
      component: CNavItem,
      name: 'Manage Added Services',
      to: '/added-services',
      is_admin: user?.is_admin
    },
    {
      component: CNavItem,
      name: 'Manage Partners',
      to: '/partners',
      key: 'Partner'
    },
    {
      component: CNavItem,
      name: 'Manage Agents',
      to: '/agents',
      key: 'Agents'
    },
    {
      component: CNavItem,
      name: 'Manage Users',
      to: '/users',
      key: 'User'
    },
    {
      component: CNavItem,
      name: 'Manage Roles',
      to: '/roles',
      key: 'Role'
    },
    {
      component: CNavItem,
      name: 'Manage Holidays',
      to: '/holidays',
      key: 'Holiday'
    },
    {
      component: CNavItem,
      name: 'Reports',
      to: '/reports',
      key: 'Reports',
      is_common: true
    },
  ]

  const filteredNavigations = navigationItems.filter(navItem => {
    const hasPermission = navItem.key === 'Dashboard' || Object.keys(userPermissions).includes(navItem.key);
    const isAdmin = navItem.is_admin === true && user?.is_admin;
    const isGuestDisabled = !navItem.is_guest_disbled || user?.billing_type !== 'guest_account';
    const isManageBranchesAllowed = !(navItem.key === 'Branch' && user.type === 'Customer Branch Lead');

    return ((hasPermission || isAdmin) && isGuestDisabled && isManageBranchesAllowed) || navItem?.is_common;
  });

  return filteredNavigations;

}

