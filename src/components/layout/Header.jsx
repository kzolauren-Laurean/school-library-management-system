import { useEffect, useMemo, useRef, useState } from "react";
import { getDateOnly, getLoanDetails } from "../../data/LibraryUtils";
import { useLibraryData } from "../../data/useLibraryData";
import { navigationIcons } from "./NavigationIcons";

function Header({
  title = "Dashboard",
  currentPage = "dashboard",
  subtitle,
  date = "Wednesday, August 26, 2026",
  searchPlaceholder = "Search...",
  showAddBook = true,
  showPageIcon = true,
  onNavigate,
  onAddBookClick,
  onMenuToggle,
  menuOpen = false,
}) {
  const PageIcon = navigationIcons[currentPage] || navigationIcons.dashboard;
  const { books, students, loans } = useLibraryData();
  const [searchValue, setSearchValue] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const searchRef = useRef(null);
  const today = getDateOnly();
  const searchTerm = searchValue.trim().toLowerCase();

  useEffect(() => {
    const handleOutsideSearchClick = (event) => {
      if (!searchRef.current?.contains(event.target)) {
        setSearchFocused(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideSearchClick);
    return () => {
      document.removeEventListener("pointerdown", handleOutsideSearchClick);
    };
  }, []);

  const searchResults = useMemo(() => {
    if (!searchTerm) {
      return [];
    }

    const bookResults = books
      .filter((book) =>
        [book.title, book.author, book.category, book.id, book.isbn]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(searchTerm)),
      )
      .slice(0, 5)
      .map((book) => ({
        id: `book-${book.id}`,
        type: "Book",
        title: book.title,
        detail: `${book.author} · ${book.category}`,
        page: "book-catalog",
      }));
    const studentResults = students
      .filter((student) =>
        [student.fullName, student.email, student.id, student.grade]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(searchTerm)),
      )
      .slice(0, 5)
      .map((student) => ({
        id: `student-${student.id}`,
        type: "Student",
        title: student.fullName,
        detail: `${student.id} · ${student.grade}`,
        page: "students",
      }));

    return [...bookResults, ...studentResults].slice(0, 8);
  }, [books, searchTerm, students]);

  const notifications = useMemo(() => {
    const alerts = [];

    loans.forEach((loan) => {
      const details = getLoanDetails(loan, today);
      const studentName = loan.studentName || "A student";
      const bookTitle = loan.bookTitle || "A book";

      if (details.status === "Overdue") {
        alerts.push({
          id: `${loan.loanId}-overdue`,
          tone: "danger",
          title: "Overdue book",
          message: `${bookTitle} · ${studentName}`,
          detail: `${details.overdueDays} day${details.overdueDays === 1 ? "" : "s"} overdue`,
          page: "returns",
        });
      } else if (details.status === "Active" && details.days <= 3) {
        alerts.push({
          id: `${loan.loanId}-due-soon`,
          tone: "warning",
          title: "Book due soon",
          message: `${bookTitle} · ${studentName}`,
          detail:
            details.days === 0 ? "Due today" : `Due in ${details.days} days`,
          page: "returns",
        });
      }

      if (details.fineStatus === "Unpaid" && details.fine > 0) {
        alerts.push({
          id: `${loan.loanId}-fine`,
          tone: "fine",
          title: "Unpaid fine",
          message: `${studentName} · ${bookTitle}`,
          detail: `$${details.fine.toFixed(2)} outstanding`,
          page: "returns",
        });
      }
    });

    return alerts;
  }, [loans, today]);

  const handleSearchResult = (page) => {
    onNavigate?.(page);
    setSearchValue("");
    setSearchFocused(false);
  };

  return (
    <header className="app-header">
      <div className="header-heading">
        <h1 className="header-title">
          {showPageIcon && (
            <span className="header-title-icon" aria-hidden="true">
              <PageIcon />
            </span>
          )}
          {title}
        </h1>
        <p className="header-date">{subtitle || date}</p>
      </div>

      <div className="header-actions">
        <button
          type="button"
          className="header-menu-btn"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          onClick={onMenuToggle}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
        <div className="header-search" ref={searchRef} role="search">
          <span className="icon-search" aria-hidden="true"></span>
          <input
            type="text"
            className="header-search-input"
            placeholder={searchPlaceholder}
            aria-label="Search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            onFocus={() => setSearchFocused(true)}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setSearchValue("");
                setSearchFocused(false);
              }
            }}
          />
          {searchFocused && (
            <div className="header-search-panel">
              {!searchTerm ? (
                <p className="header-search-empty">Search books or students</p>
              ) : searchResults.length ? (
                searchResults.map((result) => (
                  <button
                    type="button"
                    className="header-search-result"
                    key={result.id}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => handleSearchResult(result.page)}
                  >
                    <span className="header-search-result-type">
                      {result.type}
                    </span>
                    <span>
                      <strong>{result.title}</strong>
                      <small>{result.detail}</small>
                    </span>
                  </button>
                ))
              ) : (
                <p className="header-search-empty">
                  No books or students found
                </p>
              )}
            </div>
          )}
        </div>

        <div className="header-notification-wrap">
          <button
            type="button"
            className="header-notification-btn"
            aria-expanded={notificationsOpen}
            aria-label={
              notifications.length > 0
                ? `Notifications, ${notifications.length} alerts`
                : "Notifications"
            }
            onClick={() => setNotificationsOpen((isOpen) => !isOpen)}
          >
            <span className="icon-bell" aria-hidden="true"></span>
            {notifications.length > 0 && (
              <span className="header-notification-badge">
                {notifications.length > 9 ? "9+" : notifications.length}
              </span>
            )}
          </button>
          {notificationsOpen && (
            <div className="header-notification-panel">
              <div className="header-notification-heading">
                <strong>Notifications</strong>
                <span>
                  {notifications.length} alert
                  {notifications.length === 1 ? "" : "s"}
                </span>
              </div>
              {notifications.length ? (
                notifications.slice(0, 6).map((notification) => (
                  <button
                    type="button"
                    className={`header-notification-item header-notification-item--${notification.tone}`}
                    key={notification.id}
                    onClick={() => {
                      handleSearchResult(notification.page);
                      setNotificationsOpen(false);
                    }}
                  >
                    <span
                      className="header-notification-dot"
                      aria-hidden="true"
                    />
                    <span>
                      <strong>{notification.title}</strong>
                      <small>{notification.message}</small>
                      <em>{notification.detail}</em>
                    </span>
                  </button>
                ))
              ) : (
                <p className="header-notification-empty">
                  Everything is up to date
                </p>
              )}
              {notifications.length > 6 && (
                <button
                  type="button"
                  className="header-notification-footer"
                  onClick={() => {
                    handleSearchResult("returns");
                    setNotificationsOpen(false);
                  }}
                >
                  View all alerts
                </button>
              )}
            </div>
          )}
        </div>

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
