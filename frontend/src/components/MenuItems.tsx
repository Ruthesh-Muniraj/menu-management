"use client";

import React, { useState, useEffect } from "react";
import type { MenuItem } from "../types/menu";

export interface MenuItemComponentProps {
  menu: MenuItem;
  handleOpenModal: (parentId: string | null) => void;
  handleIndividualMenu: (id: string) => void;
  expandAllTrigger: number;
  collapseAllTrigger: number;
  selectedMenuId: string | null;
}
 
/**
 * Renders a menu item (and its children) with the ability to expand/collapse.
 * The component also listens for global "expand all" or "collapse all" triggers.
 */
const MenuItemComponent: React.FC<MenuItemComponentProps> = ({
  menu,
  handleOpenModal,
  handleIndividualMenu,
  expandAllTrigger,
  collapseAllTrigger,
  selectedMenuId,
}) => {
  const [expanded, setExpanded] = useState(true);

  // Whenever expandAllTrigger increments, expand this node.
  useEffect(() => {
    setExpanded(true);
  }, [expandAllTrigger]);

  // Whenever collapseAllTrigger increments, collapse this node.
  useEffect(() => {
    setExpanded(false);
  }, [collapseAllTrigger]);

  const isSelected = selectedMenuId === menu.id;

  return (
    <li className="w-64 relative pl-4 border-l border-gray-300 cursor-pointer">
      <div className="flex items-center justify-between py-2">
        <div
          className="flex items-center"
          onClick={() => handleIndividualMenu(menu.id)}
        >
          {/* Caret icon only if the item has children */}
          {menu.children && menu.children.length > 0 && (
            <button
              onClick={(e) => {
                // Prevent this click from triggering handleIndividualMenu
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
          {/* Horizontal connector for non-root items */}
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
          className={`
            flex items-center justify-center w-6 h-6 text-white bg-blue-500 rounded-full hover:bg-blue-600
            transition-opacity
            ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
          `}
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
              expandAllTrigger={expandAllTrigger}
              collapseAllTrigger={collapseAllTrigger}
              selectedMenuId={selectedMenuId}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenuItemComponent;
