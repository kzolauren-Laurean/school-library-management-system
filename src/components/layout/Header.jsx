import { navigationIcons } from "./NavigationIcons";

function Header({
  title = "Dashboard",
  currentPage = "dashboard",
  subtitle,
  date = "Wednesday, August 26, 2026",
  searchPlaceholder = "Search...",
  notificationCount = 5,
  showAddBook = true,
  showPageIcon = true,
  onAddBookClick,
}) {
  const PageIcon = navigationIcons[currentPage] || navigationIcons.dashboard;

  return (
    <header className="app-header">
      <div className="header-heading">
        <h1 className="header-title">
          {showPageIcon && <span className="header-title-icon" aria-hidden="true">
            <PageIcon />
          </span>}
          {title}
        </h1>
        <p className="header-date">{subtitle || date}</p>
      </div>

      <div className="header-actions">
        <div className="header-search" role="search">
          <span className="icon-search" aria-hidden="true"></span>
          <input
            type="text"
            className="header-search-input"
            placeholder={searchPlaceholder}
            aria-label="Search"
          />
        </div>

        <button
          type="button"
          className="header-notification-btn"
          aria-label={
            notificationCount > 0
              ? `Notifications, ${notificationCount} unread`
              : "Notifications"
          }
        >
          <span className="icon-bell" aria-hidden="true"></span>
          {notificationCount > 0 && (
            <span className="header-notification-badge">
              {notificationCount}
            </span>
          )}
        </button>

        {showAddBook && (
          <button
            type="button"
            className="header-add-book-btn"
            onClick={onAddBookClick}
          >
            <span className="icon-plus" aria-hidden="true">
              +
            </span>
            Add Book
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
