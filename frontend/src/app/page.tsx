// frontend/app/menus/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchMenus } from "../../redux/slices/menuSlice";
import MenuItemComponent from "@/components/MenuItems";
import IndividualMenu from "@/components/IndidualMenu";
import type { MenuItem } from "@/types/menu";
import Modal from "@/components/Modal";

/**
 * Main page for managing menus, with:
 * - A "Select Root Menu" dropdown
 * - "Expand All" / "Collapse All" buttons
 * - A tree of menus
 */
const MenusPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    items: allMenus,
    loading,
    error,
  } = useAppSelector((state) => state.menu);

  // UI state
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newMenuName, setNewMenuName] = useState<string>("");
  const [parentId, setParentId] = useState<string | null>(null);
  const [selectedMenuId, setSelectedMenuId] = useState<string | null>(null);

  // For "Expand All" / "Collapse All"
  const [expandAllTrigger, setExpandAllTrigger] = useState<number>(0);
  const [collapseAllTrigger, setCollapseAllTrigger] = useState<number>(0);

  // For selecting a specific root menu
  const [selectedRootId, setSelectedRootId] = useState<string>("");

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  /**
   * Open the modal for creating a new (sub) menu item.
   * @param parent - The parent menu ID (null if root).
   */
  const handleOpenModal = (parent: string | null): void => {
    setParentId(parent);
    setModalOpen(true);
  };

  /**
   * Show details for the clicked menu item.
   * @param id - The ID of the menu.
   */
  const handleIndividualMenu = (id: string): void => {
    setSelectedMenuId(id);
  };

  /**
   * Create a new menu item on the backend.
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

  /**
   * Expand all menu items by incrementing expandAllTrigger.
   */
  const handleExpandAll = (): void => {
    setExpandAllTrigger((prev) => prev + 1);
  };

  /**
   * Collapse all menu items by incrementing collapseAllTrigger.
   */
  const handleCollapseAll = (): void => {
    setCollapseAllTrigger((prev) => prev + 1);
  };

  // Filter the displayed menus if a specific root is selected
  const displayedMenus = selectedRootId
    ? allMenus.filter((m) => m.id === selectedRootId)
    : allMenus;

  return (
    <div className="mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Menus</h1>

      {/* Select Root Menu */}
      <div className="flex flex-col space-x-4 w-64 mb-6">
        <button
          onClick={() => handleOpenModal(null)}
          className="ml-3 flex items-center px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
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
          Create New Menu
        </button>
        <label className="font-semibold">Menu</label>
        <select
          className="border px-2 py-1 rounded"
          value={selectedRootId}
          onChange={(e) => setSelectedRootId(e.target.value)}
        >
          <option value="">All</option>
          {allMenus.map((menu: MenuItem) => (
            <option key={menu.id} value={menu.id}>
              {menu.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        {/* Expand/Collapse All Buttons */}
        <button
          onClick={handleExpandAll}
          className="px-3 py-1 bg-gray-700 text-white rounded-full hover:bg-gray-500"
        >
          Expand All
        </button>
        <button
          onClick={handleCollapseAll}
          className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          Collapse All
        </button>
      </div>

      {/* Main Content: Tree + Individual Menu Details */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Section: Menu Tree */}
        <div className="md:w-1/2">
          {loading ? (
            <p>Loading menus...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <ul>
              {displayedMenus.map((menu: MenuItem) => (
                <MenuItemComponent
                  key={menu.id}
                  menu={menu}
                  handleOpenModal={handleOpenModal}
                  handleIndividualMenu={handleIndividualMenu}
                  expandAllTrigger={expandAllTrigger}
                  collapseAllTrigger={collapseAllTrigger}
                  selectedMenuId={selectedMenuId}
                />
              ))}
            </ul>
          )}
        </div>

        {/* Right Section: Individual Menu Details */}
        <div className="md:w-1/2">
          {selectedMenuId && <IndividualMenu menuId={selectedMenuId} />}
        </div>
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
