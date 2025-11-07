export interface HeaderMenuItem {
  id: number;
  name: string;
  categoriesCount: number;
  subCategory: HeaderMenuItem[];
  slug: string;
}

export interface HeaderMenuProps {
  menuItems: HeaderMenuItem[];
}

export type SubMenuItem = {
  id: number;
  name: string;
};

export type SubMenus = {
  [key: number]: SubMenuItem[];
};
