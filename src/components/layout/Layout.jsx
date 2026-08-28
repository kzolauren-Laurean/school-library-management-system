import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="content-area">
        <Header
          title="Dashboard"
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