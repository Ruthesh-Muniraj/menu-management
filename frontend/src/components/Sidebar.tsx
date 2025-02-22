"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * A collapsible sidebar menu component.
 */
const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  // defining some static menu items.
  const menuItems = [
    { label: "System Code", href: "/" },
    { label: "Properties", href: "/" },
    { label: "Menus", href: "/" },
    { label: "API List", href: "/" },
  ];
  const subMenuItems = [
    { label: "User & Group", href: "/" },
    { label: "Competition", href: "/" },
  ];

  return (
    <aside
      className={`
        flex flex-col h-[calc(100vh-3rem)] text-white transition-all duration-300 m-6 rounded-2xl
        ${collapsed ? "w-3 bg-white" : "w-64 bg-gray-900"}
      `}
    >
      <div className="flex items-center justify-between px-4 py-4 border-gray-700">
        {/* Logo */}
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <Image src="/logo.png" alt="logo image" width={100} height={50} />
          </div>
        )}

        {/* Collapsible toggle button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white focus:outline-none"
          aria-label="Toggle sidebar"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {collapsed ? (
              <>
                <path
                  d="M4 7H12.5M4 12H14.5M4 17H12.5"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.5 8.5L20 12L16.5 15.5"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            ) : (
              <path
                d="M0 12V10H13V12H0ZM16.6 11L11.6 6L16.6 1L18 2.4L14.4 6L18 9.6L16.6 11ZM0 7V5H10V7H0ZM0 2V0H13V2H0Z"
                fill="white"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Scrollable Menu Area */}
      {!collapsed && (
        <nav className="flex-1 overflow-y-auto">
          {/* Primary menu links */}
          <div className="mx-4 my-2 rounded-xl bg-gray-700">
            <Link
              href="/"
              className={`
                flex items-center px-4 py-2 text-sm text-white gap-4
              `}
            >
              <svg
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H8L10 2H18C18.55 2 19.0208 2.19583 19.4125 2.5875C19.8042 2.97917 20 3.45 20 4V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2Z"
                  fill="white"
                />
              </svg>
              <span>System</span>
            </Link>
            <ul className="py-2">
              {menuItems.map((item) => {
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`
                      flex items-center px-4 py-2 text-sm gap-4 text-gray-400
                      hover:bg-green-400 hover:text-black rounded-xl transition-colors
                      `}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="3.65625"
                          y="3.66992"
                          width="6.69214"
                          height="6.69336"
                          rx="1"
                          stroke="#667085"
                        />
                        <rect
                          x="3.65625"
                          y="13.6523"
                          width="6.69214"
                          height="6.69336"
                          rx="1"
                          stroke="#667085"
                        />
                        <rect
                          x="13.6539"
                          y="13.6523"
                          width="6.69214"
                          height="6.69336"
                          rx="1"
                          stroke="#667085"
                        />
                        <circle
                          cx="16.9871"
                          cy="7.04102"
                          r="3.69067"
                          stroke="#667085"
                        />
                      </svg>

                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Secondary menu links */}
          <ul className="py-2">
            {subMenuItems.map((item) => {
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center px-4 py-2 text-sm gap-4 text-gray-400
                      hover:bg-green-400 hover:text-black rounded-xl transition-colors
                      `}
                  >
                    <svg
                      width="20"
                      height="16"
                      viewBox="0 0 20 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H8L10 2H18C18.55 2 19.0208 2.19583 19.4125 2.5875C19.8042 2.97917 20 3.45 20 4V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2ZM2 14H18V4H9.175L7.175 2H2V14Z"
                        fill="#475467"
                      />
                    </svg>

                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </aside>
  );
};

export default Sidebar;
