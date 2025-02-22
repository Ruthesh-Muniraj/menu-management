// frontend/types/menu.ts

/**
 * Represents a menu item.
 */
export interface MenuItem {
    id: string;
    name: string;
    parentId?: string;
    children?: MenuItem[];
  }
  