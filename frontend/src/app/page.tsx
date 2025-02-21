"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks"; // adjust path as needed
import { fetchMenus } from "../../redux/slices/menuSlice";

interface MenuItem {
  id: string;
  name: string;
  parentId?: string;
  children?: MenuItem[];
}

interface MenuItemProps {
  menu: MenuItem;
  handleOpenModal: (parentId: string | null) => void;
}

const MenuItemComponent: React.FC<MenuItemProps> = ({ menu, handleOpenModal }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <li className="relative pl-4 border-l border-gray-300">
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center">
          {/* Caret icon only if the item has children */}
          {menu.children && menu.children.length > 0 && (
            <button
              onClick={() => setExpanded(!expanded)}
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
          {/* Render a horizontal connector line only for non-root items */}
          {menu.parentId && (
            <span className="w-4 border-t border-gray-300 mr-2 block" />
          )}
          <span className="text-gray-800">{menu.name}</span>
        </div>
        <button
          onClick={() => handleOpenModal(menu.id)}
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
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default function MenusPage() {
  const dispatch = useAppDispatch();
  const { items: menus, loading, error } = useAppSelector((state) => state.menu);

  // State to manage modal visibility and new menu data
  const [modalOpen, setModalOpen] = useState(false);
  const [newMenuName, setNewMenuName] = useState("");
  const [parentId, setParentId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  // Open the modal for a new root or sub-menu
  const handleOpenModal = (parent: string | null) => {
    setParentId(parent);
    setModalOpen(true);
  };

  // Create a new menu item
  const handleCreateMenu = async () => {
    if (!newMenuName) return;
    try {
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      await axios.post(`${BASE_URL}/menus`, { name: newMenuName, parentId });
      dispatch(fetchMenus());
      setNewMenuName("");
      setModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Menu Management</h1>
      <div className="mb-6">
        <button
          onClick={() => handleOpenModal(null)}
          className="flex items-center px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Root Menu
        </button>
      </div>
      {loading ? (
        <p>Loading menus...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <ul>
          {menus.map((menu: MenuItem) => (
            <MenuItemComponent key={menu.id} menu={menu} handleOpenModal={handleOpenModal} />
          ))}
        </ul>
      )}

      {/* Modal for adding a new menu item */}
      {modalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded shadow-lg">
            <h2 className="mb-4 text-xl font-bold">
              Add {parentId ? "Sub Menu" : "Root Menu"}
            </h2>
            <input
              type="text"
              value={newMenuName}
              onChange={(e) => setNewMenuName(e.target.value)}
              placeholder="Enter menu name"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateMenu}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
