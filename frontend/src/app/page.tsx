// frontend/app/menus/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchMenus } from "../../redux/slices/menuSlice";
import MenuItemComponent from "@/component/menuItems";
import IndividualMenu from "@/component/IndidualMenu";
import Modal from "@/component/modal";
import type { MenuItem } from "@/types/menu";

/**
 * Main page for managing menus.
 *
 * @returns {JSX.Element}
 */
const MenusPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    items: menus,
    loading,
    error,
  } = useAppSelector((state) => state.menu);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newMenuName, setNewMenuName] = useState<string>("");
  const [parentId, setParentId] = useState<string | null>(null);
  const [selectedMenuId, setSelectedMenuId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  /**
   * Opens modal for adding a new menu item.
   *
   * @param parent - The parent menu ID (or null for root).
   */
  const handleOpenModal = (parent: string | null): void => {
    setParentId(parent);
    setModalOpen(true);
  };

  /**
   * Sets the selected menu ID to display details.
   *
   * @param id - Menu ID.
   */
  const handleIndividualMenu = (id: string): void => {
    setSelectedMenuId(id);
  };

  /**
   * Submits a request to create a new menu item.
   */
  const handleCreateMenu = async (): Promise<void> => {
    if (!newMenuName) return;
    try {
      const BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      await axios.post(`${BASE_URL}/menus`, { name: newMenuName, parentId });
      dispatch(fetchMenus());
      setNewMenuName("");
      setModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mx-auto p-6">
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
      <div className="flex">
        {loading ? (
          <p>Loading menus...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <ul>
            {menus.map((menu: MenuItem) => (
              <MenuItemComponent
                key={menu.id}
                menu={menu}
                handleOpenModal={handleOpenModal}
                handleIndividualMenu={handleIndividualMenu}
              />
            ))}
          </ul>
        )}
        {selectedMenuId && <IndividualMenu menuId={selectedMenuId} />}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Add ${parentId ? "Sub Menu" : "Root Menu"}`}
      >
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
      </Modal>
    </div>
  );
};

export default MenusPage;
