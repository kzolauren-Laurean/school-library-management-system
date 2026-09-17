import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  getPageKeyFromPath,
  getPathForPage,
  PAGE_SUBTITLES,
  PAGE_TITLES,
} from "../../appRoutes";
import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ userProfile }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentPage = getPageKeyFromPath(location.pathname);
  const title = PAGE_TITLES[currentPage] || PAGE_TITLES.dashboard;
  const subtitle = PAGE_SUBTITLES[currentPage];

  const handleNavigate = (page) => {
    navigate(getPathForPage(page));
    setSidebarOpen(false);
  };

  return (
    <div className={`app-layout ${sidebarOpen ? "sidebar-is-open" : ""}`}>
      <Sidebar
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

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
