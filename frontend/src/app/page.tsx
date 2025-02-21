"use client";

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hook'; // custom typed hooks
import { fetchMenus } from '../../redux/slices/menuSlice';
import axios from 'axios';

interface MenuItem {
  id: string;
  name: string;
  parentId?: string;
  children?: MenuItem[];
}
export default function MenusPage() {
  const dispatch = useAppDispatch();
  const { items: menus, loading, error } = useAppSelector((state) => state.menu);

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  const handleAddChild = async (parentId: string | null) => {
    const name = prompt("Enter the name of the new menu item:");
    if (!name) return;

    try {
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      await axios.post(`${BASE_URL}/menus`, {
        name,
        parentId,
      });
      // Refresh menus
      dispatch(fetchMenus());
    } catch (err) {
      console.error(err);
    }
  };

  const renderMenuTree = (menu: MenuItem) => {
    return (
      <li key={menu.id} className="ml-4">
        <div className="flex items-center">
          <span>{menu.name}</span>
          <button
            className="ml-2 text-blue-600"
            onClick={() => handleAddChild(menu.id)}
          >
            + Add Sub
          </button>
        </div>
        {menu.children && menu.children.length > 0 && (
          <ul className="ml-4 list-disc">
            {menu.children.map((child) => renderMenuTree(child))}
          </ul>
        )}
      </li>
    );
  };

  if (loading) return <div>Loading menus...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Menus</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded my-4"
        onClick={() => handleAddChild(null)}
      >
        + Add Root Menu
      </button>
      <ul className="list-disc">
        {menus.map((menu: MenuItem) => renderMenuTree(menu))}
      </ul>
    </div>
  );
}
