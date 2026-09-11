import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({
  children,
  currentPage = "dashboard",
  onNavigate,
  title = "Dashboard",
  subtitle,
  userProfile,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigate = (page) => {
    onNavigate?.(page);
    setSidebarOpen(false);
  };

  return (
    <div className={`app-layout ${sidebarOpen ? "sidebar-is-open" : ""}`}>
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        userProfile={userProfile}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      {sidebarOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Close navigation menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="content-area">
        <Header
          title={title}
          currentPage={currentPage}
          subtitle={subtitle}
          date="Wednesday, August 26, 2026"
          searchPlaceholder={
            currentPage === "settings"
              ? "Search books, students..."
              : "Search..."
          }
          onNavigate={handleNavigate}
          onMenuToggle={() => setSidebarOpen((isOpen) => !isOpen)}
          menuOpen={sidebarOpen}
          showAddBook={false}
          showPageIcon={currentPage !== "settings"}
        />

        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
