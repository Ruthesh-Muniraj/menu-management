"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { fetchMenus } from "../../redux/slices/menuSlice";
import axios from "axios";

interface MenuItem {
  id: string;
  name: string;
  parentData?: string;
  depth: number;
}

interface IndividualMenuProps {
  menuId: string;
}

/**
 * Displays individual menu details fetched from the backend.
 *
 * @param {IndividualMenuProps} props - Component props.
 * @returns {JSX.Element}
 */
const IndividualMenu: React.FC<IndividualMenuProps> = ({ menuId }) => {
  const dispatch = useAppDispatch();
  // Local state for the form fields
  const [menu, setMenu] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the menu data from your Nest.js backend
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        setError(null);

        const BASE_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        // Adjust endpoint as needed, e.g. GET /menus/:id
        const response = await axios.get(
          `${BASE_URL}/menus/${menuId}/specific`
        );

        console.log(response.data);
        // Suppose the response returns { id, depth, parentData, name }
        setMenu({
          id: response.data.id,
          depth: response.data.depth,
          parentData: response.data.parentName || "",
          name: response.data.name,
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Failed to fetch menu data");
        } else {
          setError("Failed to fetch menu data");
        }
      } finally {
        setLoading(false);
      }
    };

    if (menuId) {
      fetchMenu();
    }
  }, [menuId]);

  // Handle form submission to update the menu
  const handleSave = async () => {
    if (!menu) return;
    const payload = {
      selectedMenuId: menu.id, // e.g., from state or route params
      selectedMenuName: menu.name, // new name entered in the form
      parentMenuName: menu.parentData, // new name for parent, if applicable
    };
    try {
      setLoading(true);
      const BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

      // Adjust endpoint and payload as needed, e.g. PUT /menus/:id
      await axios.put(`${BASE_URL}/menus/${menu.id}`, payload);

      alert("Menu updated successfully!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to save menu");
      } else {
        setError("Failed to save menu");
      }
    } finally {
      dispatch(fetchMenus());
      setLoading(false);
    }
  };

  // Render loading or error states
  if (loading) {
    return <div className="p-6">Loading...</div>;
  }
  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }
  if (!menu) {
    return <div className="p-6">No menu found.</div>;
  }

  // Render the form
  return (
    <div className="p-6 max-w-lg mx-auto">
      {/* Menu ID (read-only) */}
      <label className="block text-sm text-gray-600 mb-1">Menu ID</label>
      <input
        disabled
        type="text"
        readOnly
        value={menu.id}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
      />

      {/* Depth */}
      <label className="block text-sm text-gray-600 mb-1">Depth</label>
      <input
        disabled
        type="number"
        value={menu.depth}
        onChange={(e) => setMenu({ ...menu, depth: +e.target.value })}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
      />

      {/* Parent Data */}
      <label className="block text-sm text-gray-600 mb-1">Parent Data</label>
      <input
        type="text"
        value={menu.parentData || ""}
        onChange={(e) => setMenu({ ...menu, parentData: e.target.value })}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
      />

      {/* Name */}
      <label className="block text-sm text-gray-600 mb-1">Name</label>
      <input
        type="text"
        value={menu.name}
        onChange={(e) => setMenu({ ...menu, name: e.target.value })}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
      />

      {/* Save button */}
      <button
        onClick={handleSave}
        className="w-full py-3 text-white bg-blue-500 rounded-full hover:bg-blue-700 transition-colors"
      >
        Save
      </button>
    </div>
  );
};

export default IndividualMenu;
