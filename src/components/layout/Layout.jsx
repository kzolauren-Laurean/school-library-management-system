import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ children, currentPage = "dashboard", onNavigate, title = "Dashboard", subtitle }) {
  return (
    <div className="app-layout">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />

      <div className="content-area">
        <Header
          title={title}
          currentPage={currentPage}
          subtitle={subtitle}
          date="Wednesday, August 26, 2026"
          searchPlaceholder="Search..."
          notificationCount={5}
          showAddBook={false}
        />

        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;