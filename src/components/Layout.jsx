import React from "react";
import SidebarMenu from "./SidebarMenu";

function Layout({ children, selectedCategory, onSelectCategory }) {
  return (
    <div className="app-container">
      <SidebarMenu
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />
      <main className="main-content">{children}</main>
    </div>
  );
}

export default Layout;