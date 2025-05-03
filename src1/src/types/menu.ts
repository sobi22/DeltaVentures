export type TABS = 'Dashboard' | 'Profile'|'User'|'Category'|'Cart'|'Cuisines List'|'Reviews';
export type SUBTABS =
  | 'Category List'
  | 'Add Category'
  | 'Sub Category List'
  ;
('Profile');

export interface MenuItem {
  name: SUBTABS | TABS;
  path?: string;
  icon: React.ReactNode;
  submenus?: MenuItem[];
}
