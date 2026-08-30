import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ children, currentPage = "dashboard", onNavigate, title = "Dashboard" }) {
  return (
    <div className="app-layout">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />

      <div className="content-area">
        <Header
          title={title}
          date="Wednesday, August 26, 2026"
          searchPlaceholder="Search..."
          notificationCount={5}
          showAddBook={true}
        />

        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;