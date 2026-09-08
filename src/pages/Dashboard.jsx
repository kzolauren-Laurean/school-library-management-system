import { getDateOnly, getLoanDetails } from "../data/LibraryUtils";
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

const statCards = [
  {
    id: "total-books",
    tone: "blue",
    icon: <BookIcon />,
    value: "4,821",
    label: "Total Books",
    helper: "1,240 unique titles",
  },
  {
    id: "available-books",
    tone: "green",
    icon: <CheckIcon />,
    value: "3,204",
    label: "Available Books",
    helper: "66% of collection",
  },
  {
    id: "borrowed-books",
    tone: "amber",
    icon: <BorrowIcon />,
    value: "1,617",
    label: "Borrowed Books",
    helper: "84 overdue",
  },
  {
    id: "total-students",
    tone: "red",
    icon: <UsersIcon />,
    value: "892",
    label: "Total Students",
    helper: "874 active borrowers",
  },
];

const recentBorrowing = [
  {
    id: "S1023",
    student: "Anya Petrov",
    initials: "AP",
    book: "Linear Algebra and Its Applications",
    author: "David C. Lay",
    borrowed: "Aug 25, 2026",
    due: "Sep 8, 2026",
    status: "Active",
  },
  {
    id: "S1020",
    student: "Samuel Adeyemi",
    initials: "SA",
    book: "Steve Jobs",
    author: "Walter Isaacson",
    borrowed: "Aug 24, 2026",
    due: "Sep 7, 2026",
    status: "Active",
  },
  {
    id: "S1019",
    student: "Mei Lin Zhou",
    initials: "ML",
    book: "Database System Concepts",
    author: "Abraham Silberschatz",
    borrowed: "Aug 23, 2026",
    due: "Sep 6, 2026",
    status: "Active",
  },
  {
    id: "S1001",
    student: "Aisha Patel",
    initials: "AP",
    book: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    borrowed: "Aug 22, 2026",
    due: "Sep 5, 2026",
    status: "Active",
  },
  {
    id: "S1002",
    student: "Marcus Chen",
    initials: "MC",
    book: "Organic Chemistry",
    author: "John McMurry",
    borrowed: "Aug 21, 2026",
    due: "Sep 4, 2026",
    status: "Active",
  },
  {
    id: "S1003",
    student: "Sofia Reyes",
    initials: "SR",
    book: "World History: Patterns of Interaction",
    author: "Roger B. Beck",
    borrowed: "Aug 20, 2026",
    due: "Sep 3, 2026",
    status: "Active",
  },
  {
    id: "S1005",
    student: "Lena Fischer",
    initials: "LF",
    book: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    borrowed: "Aug 19, 2026",
    due: "Sep 2, 2026",
    status: "Active",
  },
];

const upcomingDueDates = [
  {
    id: "kwame-asante",
    student: "Kwame Asante",
    initials: "KA",
    book: "Anatomy: A Photographic Atlas",
    overdueLabel: "18d overdue",
    dueDate: "Aug 8, 2026",
  },
  {
    id: "priya-sharma",
    student: "Priya Sharma",
    initials: "PS",
    book: "Introduction to Algorithms",
    overdueLabel: "15d overdue",
    dueDate: "Aug 11, 2026",
  },
  {
    id: "james-okonkwo",
    student: "James Okonkwo",
    initials: "JO",
    book: "Calculus: Early Transcendentals",
    overdueLabel: "13d overdue",
    dueDate: "Aug 13, 2026",
  },
  {
    id: "nina-kowalski",
    student: "Nina Kowalski",
    initials: "NK",
    book: "To Kill a Mockingbird",
    overdueLabel: "11d overdue",
    dueDate: "Aug 15, 2026",
  },
  {
    id: "omar-hassan",
    student: "Omar Hassan",
    initials: "OH",
    book: "Organic Chemistry",
    overdueLabel: "7d overdue",
    dueDate: "Aug 19, 2026",
  },
];

function Dashboard() {
  const { loans } = useLibraryData();
  const loanDetails = loans.map((loan) => getLoanDetails(loan, getDateOnly()));
  const activeLoans = loanDetails.filter((loan) => loan.status !== "Returned");
  const overdueLoans = activeLoans.filter((loan) => loan.status === "Overdue");
  const dashboardStatCards = statCards.map((stat) =>
    stat.id === "borrowed-books"
      ? { ...stat, value: activeLoans.length.toLocaleString(), helper: `${overdueLoans.length} overdue` }
      : stat
  );

  return (
    <div className="dashboard">
      <section className="dashboard-stats" aria-label="Library statistics">
        {dashboardStatCards.map((stat) => (
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
              <h2 className="dashboard-card-title">
                Recent Borrowing Activity
              </h2>
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
                  <tr key={row.id}>
                    <td>
                      <div className="dashboard-student-cell">
                        <span className="dashboard-avatar" aria-hidden="true">
                          {row.initials}
                        </span>
                        <div>
                          <p className="dashboard-student-name">
                            {row.student}
                          </p>
                          <p className="dashboard-student-id">{row.id}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="dashboard-book-title">{row.book}</p>
                      <p className="dashboard-book-author">{row.author}</p>
                    </td>
                    <td className="dashboard-date-cell">{row.borrowed}</td>
                    <td className="dashboard-date-cell">{row.due}</td>
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
              <p className="dashboard-card-subtitle">
                Books due soon or overdue
              </p>
            </div>
          </div>

          <ul className="dashboard-due-list">
            {upcomingDueDates.map((item) => (
              <li className="dashboard-due-item" key={item.id}>
                <span className="dashboard-avatar" aria-hidden="true">
                  {item.initials}
                </span>
                <div className="dashboard-due-info">
                  <p className="dashboard-due-student">{item.student}</p>
                  <p className="dashboard-due-book">{item.book}</p>
                </div>
                <div className="dashboard-due-meta">
                  <p className="dashboard-due-overdue">{item.overdueLabel}</p>
                  <p className="dashboard-due-date">{item.dueDate}</p>
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
