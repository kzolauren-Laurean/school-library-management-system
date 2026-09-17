import { NavLink, useNavigate } from "react-router-dom";
import {
  BookIcon,
  BorrowIcon,
  DashboardIcon,
  GearIcon,
  ReportsIcon,
  ReturnIcon,
  UserIcon,
  UsersIcon,
} from "./NavigationIcons";
import { PAGE_PATHS } from "../../appRoutes";
import { getDateOnly, getLoanDetails } from "../../data/LibraryUtils";
import { useLibraryData } from "../../data/useLibraryData";

function Sidebar({
  userProfile = null,
  isOpen = false,
  onClose = () => {},
}) {
  const navigate = useNavigate();
  const { loans } = useLibraryData();
  const currentLoanCount = loans.filter(
    (loan) => getLoanDetails(loan, getDateOnly()).status !== "Returned",
  ).length;

  const handleNavClick = () => {
    onClose();
  };

  const openSettings = () => {
    navigate(PAGE_PATHS.settings);
    onClose();
  };

  const profileName = userProfile?.name?.trim() || "Guest User";
  const profileRole = userProfile?.role?.trim() || "Not signed in";
  const profileInitials =
    userProfile?.name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("") || "";
  return (
    <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
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

        <NavLink
          to={PAGE_PATHS.dashboard}
          className="nav-item"
          onClick={handleNavClick}
        >
          <span>
            <DashboardIcon />
          </span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to={PAGE_PATHS["book-catalog"]}
          className="nav-item"
          onClick={handleNavClick}
        >
          <span>
            <BookIcon />
          </span>
          <span>Book Catalog</span>
        </NavLink>

        <NavLink
          to={PAGE_PATHS.students}
          className="nav-item"
          onClick={handleNavClick}
        >
          <span>
            <UsersIcon />
          </span>
          <span>Students</span>
        </NavLink>

        <NavLink
          to={PAGE_PATHS.borrowing}
          className="nav-item"
          onClick={handleNavClick}
        >
          <span>
            <BorrowIcon />
          </span>
          <span>Borrowing</span>
          <span className="nav-badge">{currentLoanCount}</span>
        </NavLink>

        <NavLink
          to={PAGE_PATHS.returns}
          className="nav-item"
          onClick={handleNavClick}
        >
          <span>
            <ReturnIcon />
          </span>
          <span>Returns</span>
        </NavLink>

        <p className="nav-section-title system-title">SYSTEM</p>

        <NavLink
          to={PAGE_PATHS.reports}
          className="nav-item"
          onClick={handleNavClick}
        >
          <span>
            <ReportsIcon />
          </span>
          <span>Reports</span>
        </NavLink>

        <NavLink
          to={PAGE_PATHS.settings}
          className="nav-item nav-button"
          onClick={handleNavClick}
        >
          <span>
            <GearIcon />
          </span>
          <span>Settings</span>
        </NavLink>
      </nav>

      <div className="sidebar-user">
        <div
          className={`user-avatar ${profileInitials ? "" : "user-avatar--empty"}`}
        >
          {profileInitials || <UserIcon />}
        </div>

        <div className="user-info">
          <strong>{profileName}</strong>
          <span>{profileRole}</span>
        </div>

        <button
          type="button"
          className="user-settings"
          aria-label="Open user settings"
          onClick={openSettings}
        >
          <GearIcon />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
