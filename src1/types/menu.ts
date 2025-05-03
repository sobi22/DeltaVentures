export type TABS = 'Dashboard' | 'Profile'|'User';
export type SUBTABS =
  | 'User List'
  
  ;
('Profile');

export interface MenuItem {
  name: SUBTABS | TABS;
  path?: string;
  icon: React.ReactNode;
  submenus?: MenuItem[];
}
