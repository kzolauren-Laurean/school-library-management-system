function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">▣</div>

        <div>
          <h2>LibraryOS</h2>
          <span>Admin Panel</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <p className="nav-section-title">MAIN MENU</p>

        <a href="#" className="nav-item active">
          <span>▦</span>
          <span>Dashboard</span>
        </a>

        <a href="#" className="nav-item">
          <span>▱</span>
          <span>Book Catalog</span>
        </a>

        <a href="#" className="nav-item">
          <span>♧</span>
          <span>Students</span>
        </a>

        <a href="#" className="nav-item">
          <span>↔</span>
          <span>Borrowing</span>
          <span className="nav-badge">0</span>
        </a>

        <a href="#" className="nav-item">
          <span>↩</span>
          <span>Returns</span>
        </a>

        <p className="nav-section-title system-title">SYSTEM</p>

        <a href="#" className="nav-item">
          <span>▥</span>
          <span>Reports</span>
        </a>

        <a href="#" className="nav-item">
          <span>⚙</span>
          <span>Settings</span>
        </a>
      </nav>

      <div className="sidebar-user">
        <div className="user-avatar">JD</div>

        <div className="user-info">
          <strong>Jane Doe</strong>
          <span>Head Librarian</span>
        </div>

        <button type="button" className="user-settings">
          ⚙
        </button>
      </div>
    </aside>
  )
}

export default Sidebar