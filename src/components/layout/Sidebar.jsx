import {
  BookIcon,
  BorrowIcon,
  DashboardIcon,
  GearIcon,
  ReportsIcon,
  ReturnIcon,
  UsersIcon,
} from "./NavigationIcons";

function Sidebar({ currentPage = "dashboard", onNavigate = () => {} }) {
  const handleNavClick = (event, pageKey) => {
    event.preventDefault();
    onNavigate(pageKey);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <img src="/assets/library-logo.png" alt="Library logo" />
        </div>

        <div>
          <h2>LibraryOS</h2>
          <span>Admin Panel</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <p className="nav-section-title">MAIN MENU</p>

        <a
          href="#"
          className={`nav-item ${currentPage === "dashboard" ? "active" : ""}`}
          onClick={(event) => handleNavClick(event, "dashboard")}
        >
          <span><DashboardIcon /></span>
          <span>Dashboard</span>
        </a>

        <a
          href="#"
          className={`nav-item ${currentPage === "book-catalog" ? "active" : ""}`}
          onClick={(event) => handleNavClick(event, "book-catalog")}
        >
          <span><BookIcon /></span>
          <span>Book Catalog</span>
        </a>

        <a
          href="#"
          className={`nav-item ${currentPage === "students" ? "active" : ""}`}
          onClick={(event) => handleNavClick(event, "students")}
        >
          <span><UsersIcon /></span>
          <span>Students</span>
        </a>

        <a
          href="#"
          className={`nav-item ${currentPage === "borrowing" ? "active" : ""}`}
          onClick={(event) => handleNavClick(event, "borrowing")}
        >
          <span><BorrowIcon /></span>
          <span>Borrowing</span>
          <span className="nav-badge">16</span>
        </a>

        <a
          href="#"
          className={`nav-item ${currentPage === "returns" ? "active" : ""}`}
          onClick={(event) => handleNavClick(event, "returns")}
        >
          <span><ReturnIcon /></span>
          <span>Returns</span>
        </a>

        <p className="nav-section-title system-title">SYSTEM</p>

        <a href="#" className="nav-item">
          <span><ReportsIcon /></span>
          <span>Reports</span>
        </a>

        <a href="#" className="nav-item">
          <span><GearIcon /></span>
          <span>Settings</span>
        </a>
      </nav>

      <div className="sidebar-user">
        <div className="user-avatar">JD</div>

        <div className="user-info">
          <strong>Jane Doe</strong>
          <span>Head Librarian</span>
        </div>

        <button type="button" className="user-settings" aria-label="Open user settings">
          <GearIcon />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;