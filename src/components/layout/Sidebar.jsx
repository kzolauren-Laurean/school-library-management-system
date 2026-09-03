function Sidebar({ currentPage = "dashboard", onNavigate = () => {} }) {
  const handleNavClick = (event, pageKey) => {
    event.preventDefault();
    onNavigate(pageKey);
  };

  const HomeIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 10.5 12 4l8 6.5V18a2 2 0 0 1-2 2h-3.5v-7h-5v7H6a2 2 0 0 1-2-2v-7.5Z" />
    </svg>
  );

  const BookIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v15.5H7.5A2.5 2.5 0 0 0 5 21V5.5Z" />
      <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v15.5H7.5A2.5 2.5 0 0 0 5 21M7.5 6h7.5M7.5 10h7.5" />
    </svg>
  );

  const UsersIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16 18v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" />
      <path d="M12 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
      <path d="M19 18v-1a3.5 3.5 0 0 0-2.7-3.4" />
      <path d="M17 5.5a3.5 3.5 0 0 1 0 6.7" />
    </svg>
  );

  const BorrowIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h10a3 3 0 0 1 3 3v.5" />
      <path d="M7 4 4 7l3 3" />
      <path d="M20 17H10a3 3 0 0 1-3-3v-.5" />
      <path d="M17 20l3-3-3-3" />
    </svg>
  );

  const ChartIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 18V9" />
      <path d="M12 18V5" />
      <path d="M19 18v-7" />
      <path d="M3 18h18" />
    </svg>
  );

  const GearIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.75v2.5M12 17.75v2.5M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M3.75 12h2.5M17.75 12h2.5M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  );

  const navIconMap = {
    dashboard: <HomeIcon />,
    "book-catalog": <BookIcon />,
    students: <UsersIcon />,
    borrowing: <BorrowIcon />,
    reports: <ChartIcon />,
    settings: <GearIcon />,
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
          <span>{navIconMap.dashboard}</span>
          <span>Dashboard</span>
        </a>

        <a
          href="#"
          className={`nav-item ${currentPage === "book-catalog" ? "active" : ""}`}
          onClick={(event) => handleNavClick(event, "book-catalog")}
        >
          <span>{navIconMap["book-catalog"]}</span>
          <span>Book Catalog</span>
        </a>

        <a
          href="#"
          className={`nav-item ${currentPage === "students" ? "active" : ""}`}
          onClick={(event) => handleNavClick(event, "students")}
        >
          <span>{navIconMap.students}</span>
          <span>Students</span>
        </a>

        <a href="#" className="nav-item">
          <span>{navIconMap.borrowing}</span>
          <span>Borrowing</span>
          <span className="nav-badge">16</span>
        </a>

        <a href="#" className="nav-item">
          <span>↩</span>
          <span>Returns</span>
        </a>

        <p className="nav-section-title system-title">SYSTEM</p>

        <a href="#" className="nav-item">
          <span>{navIconMap.reports}</span>
          <span>Reports</span>
        </a>

        <a href="#" className="nav-item">
          <span>{navIconMap.settings}</span>
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