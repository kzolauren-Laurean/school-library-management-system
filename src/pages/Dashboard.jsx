import { getDateOnly, getLoanDetails, loanMatchesBook } from "../data/LibraryUtils";
import { useLibraryData } from "../data/useLibraryData";

const BookIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v15.5H7.5A2.5 2.5 0 0 0 5 21V5.5Z" />
    <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v15.5H7.5A2.5 2.5 0 0 0 5 21M7.5 6h7.5M7.5 10h7.5" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12.5 9.2 16.7 19 6.9" />
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

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M16 18v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" />
    <path d="M12 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
    <path d="M19 18v-1a3.5 3.5 0 0 0-2.7-3.4" />
    <path d="M17 5.5a3.5 3.5 0 0 1 0 6.7" />
  </svg>
);

const formatDate = (value) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));

const getInitials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

function Dashboard() {
  const { books, students, loans } = useLibraryData();
  const today = getDateOnly();
  const loanDetails = loans.map((loan) => getLoanDetails(loan, today));
  const activeLoans = loanDetails.filter((loan) => loan.status !== "Returned");
  const overdueLoans = activeLoans.filter((loan) => loan.status === "Overdue");
  const availableBooks = books.filter(
    (book) =>
      book.status === "Available" &&
      !activeLoans.some((loan) => loanMatchesBook(loan, book))
  );
  const recentBorrowing = [...loanDetails]
    .sort((first, second) => second.borrowDate.localeCompare(first.borrowDate))
    .slice(0, 7);
  const upcomingDueDates = [...activeLoans]
    .sort((first, second) => first.dueDate.localeCompare(second.dueDate))
    .slice(0, 5);
  const statCards = [
    {
      id: "total-books",
      tone: "blue",
      icon: <BookIcon />,
      value: books.length.toLocaleString(),
      label: "Total Books",
      helper: `${new Set(books.map((book) => book.title)).size.toLocaleString()} unique titles`,
    },
    {
      id: "available-books",
      tone: "green",
      icon: <CheckIcon />,
      value: availableBooks.length.toLocaleString(),
      label: "Available Books",
      helper: `${books.length ? Math.round((availableBooks.length / books.length) * 100) : 0}% of collection`,
    },
    {
      id: "borrowed-books",
      tone: "amber",
      icon: <BorrowIcon />,
      value: activeLoans.length.toLocaleString(),
      label: "Borrowed Books",
      helper: `${overdueLoans.length} overdue`,
    },
    {
      id: "total-students",
      tone: "red",
      icon: <UsersIcon />,
      value: students.length.toLocaleString(),
      label: "Total Students",
      helper: `${new Set(activeLoans.map((loan) => loan.studentId)).size} active borrowers`,
    },
  ];

  return (
    <div className="dashboard">
      <section className="dashboard-stats" aria-label="Library statistics">
        {statCards.map((stat) => (
          <div
            key={stat.id}
            className={`dashboard-stat-card dashboard-stat-card--${stat.tone}`}
          >
            <div
              className={`dashboard-stat-icon dashboard-stat-icon--${stat.tone}`}
              aria-hidden="true"
            >
              {stat.icon}
            </div>
            <p className="dashboard-stat-value">{stat.value}</p>
            <p className="dashboard-stat-label">{stat.label}</p>
            <p className="dashboard-stat-helper">{stat.helper}</p>
          </div>
        ))}
      </section>

      <div className="dashboard-main-grid">
        <section className="dashboard-card dashboard-borrowing-card">
          <div className="dashboard-card-header">
            <div>
              <h2 className="dashboard-card-title">Recent Borrowing Activity</h2>
              <p className="dashboard-card-subtitle">
                Latest transactions across all students
              </p>
            </div>
            <a href="#" className="dashboard-view-all-link">
              View all →
            </a>
          </div>

          <div className="dashboard-table-wrapper">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th scope="col">Student</th>
                  <th scope="col">Book Title</th>
                  <th scope="col">Borrowed</th>
                  <th scope="col">Due Date</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBorrowing.map((row) => (
                  <tr key={row.loanId}>
                    <td>
                      <div className="dashboard-student-cell">
                        <span className="dashboard-avatar" aria-hidden="true">
                          {getInitials(row.studentName)}
                        </span>
                        <div>
                          <p className="dashboard-student-name">{row.studentName}</p>
                          <p className="dashboard-student-id">{row.studentId}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="dashboard-book-title">{row.bookTitle}</p>
                      <p className="dashboard-book-author">{row.author}</p>
                    </td>
                    <td className="dashboard-date-cell">
                      {formatDate(row.borrowDate)}
                    </td>
                    <td className="dashboard-date-cell">{formatDate(row.dueDate)}</td>
                    <td>
                      <span className="dashboard-status-pill dashboard-status-pill--active">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="dashboard-card dashboard-due-dates-card">
          <div className="dashboard-card-header">
            <div>
              <h2 className="dashboard-card-title">Upcoming Due Dates</h2>
              <p className="dashboard-card-subtitle">Books due soon or overdue</p>
            </div>
          </div>

          <ul className="dashboard-due-list">
            {upcomingDueDates.map((item) => (
              <li className="dashboard-due-item" key={item.loanId}>
                <span className="dashboard-avatar" aria-hidden="true">
                  {getInitials(item.studentName)}
                </span>
                <div className="dashboard-due-info">
                  <p className="dashboard-due-student">{item.studentName}</p>
                  <p className="dashboard-due-book">{item.bookTitle}</p>
                </div>
                <div className="dashboard-due-meta">
                  <p className="dashboard-due-overdue">
                    {item.status === "Overdue"
                      ? `${item.overdueDays}d overdue`
                      : `${item.days}d remaining`}
                  </p>
                  <p className="dashboard-due-date">{formatDate(item.dueDate)}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
