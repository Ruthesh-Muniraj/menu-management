"use client";

import Image from "next/image";
import React from "react";

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  paths: Breadcrumb[];
}

/**
 * Renders a breadcrumb navigation.
 *
 * @param {BreadcrumbsProps} props - Breadcrumb component props.
 * @returns {JSX.Element}
 */
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ paths }) => {
  return (
    <nav className="text-l text-gray-600 mb-12" aria-label="Breadcrumb">
      <ol className="list-reset flex">
        <Image
          src="/folder.png"
          alt="folder icon"
          width={20}
          height={20}
          className="w-5 h-5"
        />
        <span className="mx-2">/</span>
        {paths.map((crumb, index) => (
          <li key={index} className="flex items-center">
            {crumb.href ? (
              <a href={crumb.href} className="hover:underline">
                {crumb.label}
              </a>
            ) : (
              <span>{crumb.label}</span>
            )}
            {index < paths.length - 1 && <span className="mx-2">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
