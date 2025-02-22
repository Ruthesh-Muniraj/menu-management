// frontend/components/MenuItemComponent.tsx
"use client";

import React, { useState } from "react";
import type { MenuItem } from "@/types/menu";

export interface MenuItemComponentProps {
  menu: MenuItem;
  /**
   * Called when the plus button is clicked to add a sub-menu.
   */
  handleOpenModal: (parentId: string | null) => void;
  /**
   * Called when the menu item itself is clicked to display details.
   */
  handleIndividualMenu: (id: string) => void;
}

/**
 * Renders a menu item with an expandable list of children.
 *
 * @param {MenuItemComponentProps} props - Component props.
 * @returns {JSX.Element}
 */
const MenuItemComponent: React.FC<MenuItemComponentProps> = ({
  menu,
  handleOpenModal,
  handleIndividualMenu,
}) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <li className="relative pl-4 border-l border-gray-300 cursor-pointer">
      <div className="flex items-center justify-between py-2">
        <div
          className="flex items-center"
          onClick={() => handleIndividualMenu(menu.id)}
        >
          {menu.children && menu.children.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
              className="mr-2 focus:outline-none"
              aria-label={expanded ? "Collapse" : "Expand"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-4 h-4 transform transition-transform duration-200 ${
                  expanded ? "rotate-90" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
          {menu.parentId && (
            <span className="w-4 border-t border-gray-300 mr-2 block" />
          )}
          <span className="text-gray-800">{menu.name}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleOpenModal(menu.id);
          }}
          className="flex items-center justify-center w-6 h-6 text-white bg-blue-500 rounded-full hover:bg-blue-600"
          aria-label="Add Sub Menu"
        >
          +
        </button>
      </div>
      {expanded && menu.children && menu.children.length > 0 && (
        <ul className="ml-4">
          {menu.children.map((child) => (
            <MenuItemComponent
              key={child.id}
              menu={child}
              handleOpenModal={handleOpenModal}
              handleIndividualMenu={handleIndividualMenu}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenuItemComponent;
