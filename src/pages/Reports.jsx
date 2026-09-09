import { useCallback, useMemo, useState } from "react";
import {
  BookIcon,
  ReportsIcon,
  UsersIcon,
} from "../components/layout/NavigationIcons";
import {
  getDateOnly,
  getLoanDetails,
  loanMatchesBook,
} from "../data/LibraryUtils";
import { useLibraryData } from "../data/useLibraryData";

const formatDate = (value) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
const money = (value) => `$${value.toFixed(2)}`;
const initials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
const addDays = (value, amount) => {
  const date = new Date(`${value}T00:00:00`);
  date.setDate(date.getDate() + amount);
  return date.toISOString().slice(0, 10);
};
const startOfPeriod = (today, period) => {
  if (period === "Today") return today;
  if (period === "This Week") return addDays(today, -6);
  if (period === "This Month") return `${today.slice(0, 7)}-01`;
  if (period === "This Year") return `${today.slice(0, 4)}-01-01`;
  return "";
};

const StatIcon = ({ type }) =>
  type === "books" ? (
    <BookIcon />
  ) : type === "students" ? (
    <UsersIcon />
  ) : (
    <ReportsIcon />
  );
const StatusPill = ({ status }) => (
  <span className={`reports-status reports-status--${status.toLowerCase()}`}>
    {status}
  </span>
);

function Reports() {
  const { books, students, loans } = useLibraryData();
  const today = getDateOnly();
  const [period, setPeriod] = useState("This Year");
  const [category, setCategory] = useState("All Categories");
  const [bookStatus, setBookStatus] = useState("All Status");
  const [studentId, setStudentId] = useState("All Students");
  const [customStart, setCustomStart] = useState(addDays(today, -30));
  const [customEnd, setCustomEnd] = useState(today);

  const categories = useMemo(
    () => ["All Categories", ...new Set(books.map((book) => book.category))],
    [books],
  );
  const range = useMemo(
    () => ({
      start:
        period === "Custom Range" ? customStart : startOfPeriod(today, period),
      end: period === "Custom Range" ? customEnd : today,
    }),
    [customEnd, customStart, period, today],
  );
  const details = useMemo(
    () => loans.map((loan) => getLoanDetails(loan, today)),
    [loans, today],
  );
  const bookByTitle = useMemo(
    () => new Map(books.map((book) => [book.title, book])),
    [books],
  );
  const matchesBookFilters = useCallback(
    (book) =>
      !book ||
      ((category === "All Categories" || book.category === category) &&
        (bookStatus === "All Status" || book.status === bookStatus)),
    [bookStatus, category],
  );
  const filteredLoans = useMemo(
    () =>
      details.filter((loan) => {
        const book = bookByTitle.get(loan.bookTitle);
        return (
          loan.borrowDate >= range.start &&
          loan.borrowDate <= range.end &&
          matchesBookFilters(book) &&
          (studentId === "All Students" || loan.studentId === studentId)
        );
      }),
    [
      bookByTitle,
      details,
      matchesBookFilters,
      range.end,
      range.start,
      studentId,
    ],
  );
  const activeLoans = filteredLoans.filter(
    (loan) => loan.status !== "Returned",
  );
  const overdueLoans = activeLoans.filter((loan) => loan.status === "Overdue");
  const returnedLoans = filteredLoans.filter(
    (loan) => loan.status === "Returned",
  );
  const filteredBooks = books.filter((book) => matchesBookFilters(book));
  const availableBooks = filteredBooks.filter(
    (book) =>
      !details.some(
        (loan) => loan.status !== "Returned" && loanMatchesBook(loan, book),
      ),
  );
  const fines = filteredLoans.reduce(
    (total, loan) => total + (loan.fineStatus === "Unpaid" ? loan.fine : 0),
    0,
  );
  const activeBorrowers = new Set(activeLoans.map((loan) => loan.studentId))
    .size;
  const clearFilters = () => {
    setPeriod("This Year");
    setCategory("All Categories");
    setBookStatus("All Status");
    setStudentId("All Students");
  };

  const popularBooks = useMemo(() => {
    const counts = filteredLoans.reduce((result, loan) => {
      result[loan.bookTitle] = (result[loan.bookTitle] || 0) + 1;
      return result;
    }, {});
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([title, count]) => ({
        book: bookByTitle.get(title),
        title,
        count,
      }));
  }, [bookByTitle, filteredLoans]);
  const topBorrowers = useMemo(
    () =>
      Object.values(
        filteredLoans.reduce((result, loan) => {
          const current = result[loan.studentId] || {
            id: loan.studentId,
            name: loan.studentName,
            borrowed: 0,
            current: 0,
            overdue: 0,
            fine: 0,
          };
          current.borrowed += 1;
          current.current += loan.status === "Returned" ? 0 : 1;
          current.overdue += loan.status === "Overdue" ? 1 : 0;
          current.fine += loan.fine;
          result[loan.studentId] = current;
          return result;
        }, {}),
      )
        .sort((a, b) => b.borrowed - a.borrowed)
        .slice(0, 5),
    [filteredLoans],
  );
  const categoryStats = useMemo(
    () =>
      Object.entries(
        filteredBooks.reduce((result, book) => {
          result[book.category] = (result[book.category] || 0) + 1;
          return result;
        }, {}),
      )
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6),
    [filteredBooks],
  );
  const activity = [...filteredLoans]
    .sort((a, b) =>
      (b.returnedDate || b.borrowDate).localeCompare(
        a.returnedDate || a.borrowDate,
      ),
    )
    .slice(0, 6);
  const chartPoints = useMemo(() => {
    const length = period === "This Year" ? 6 : period === "This Month" ? 6 : 7;
    const end = new Date(`${range.end}T00:00:00`);
    return Array.from({ length }, (_, index) => {
      const date = new Date(end);
      date.setDate(
        end.getDate() -
          (length - index - 1) * (period === "This Year" ? 30 : 1),
      );
      const key = date.toISOString().slice(0, 10);
      const month = key.slice(0, 7);
      const borrowed = filteredLoans.filter((loan) =>
        period === "This Year"
          ? loan.borrowDate.startsWith(month)
          : loan.borrowDate === key,
      ).length;
      const returned = filteredLoans.filter((loan) =>
        period === "This Year"
          ? loan.returnedDate?.startsWith(month)
          : loan.returnedDate === key,
      ).length;
      return {
        label:
          period === "This Year"
            ? date.toLocaleDateString("en-US", { month: "short" })
            : date.toLocaleDateString("en-US", { weekday: "short" }),
        borrowed,
        returned,
      };
    });
  }, [filteredLoans, period, range.end]);
  const maxChart = Math.max(
    1,
    ...chartPoints.map((point) => Math.max(point.borrowed, point.returned)),
  );

  const exportCsv = () => {
    const rows = [
      [
        "Student",
        "Student ID",
        "Book",
        "Author",
        "Borrow Date",
        "Due Date",
        "Status",
        "Fine",
      ],
      ...filteredLoans.map((loan) => [
        loan.studentName,
        loan.studentId,
        loan.bookTitle,
        loan.author,
        loan.borrowDate,
        loan.dueDate,
        loan.status,
        loan.fine.toFixed(2),
      ]),
    ];
    const csv = rows
      .map((row) =>
        row
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(","),
      )
      .join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    link.download = "library-report.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="reports-page">
      <div className="reports-toolbar">
        <div>
          <h2>Library Reports</h2>
          <p>
            Analyze library activity, borrowing trends, and collection
            performance.
          </p>
        </div>
        <div className="reports-actions">
          <button
            type="button"
            className="reports-button reports-button--secondary"
            onClick={() => window.print()}
          >
            Print Report
          </button>
          <button type="button" className="reports-button" onClick={exportCsv}>
            Export CSV
          </button>
        </div>
      </div>
      <section className="reports-filters">
        <div className="reports-filter-group reports-filter-group--period">
          <label>
            Report period
            <select
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
            >
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
              <option>Custom Range</option>
            </select>
          </label>
          {period === "Custom Range" && (
            <>
              <label>
                From
                <input
                  type="date"
                  value={customStart}
                  onChange={(event) => setCustomStart(event.target.value)}
                />
              </label>
              <label>
                To
                <input
                  type="date"
                  value={customEnd}
                  onChange={(event) => setCustomEnd(event.target.value)}
                />
              </label>
            </>
          )}
        </div>
        <label>
          Category
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          Book status
          <select
            value={bookStatus}
            onChange={(event) => setBookStatus(event.target.value)}
          >
            <option>All Status</option>
            <option>Available</option>
            <option>Borrowed</option>
            <option>Reserved</option>
            <option>Archived</option>
          </select>
        </label>
        <label>
          Student
          <select
            value={studentId}
            onChange={(event) => setStudentId(event.target.value)}
          >
            <option>All Students</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.fullName}
              </option>
            ))}
          </select>
        </label>
        <button type="button" className="reports-clear" onClick={clearFilters}>
          Clear filters
        </button>
      </section>
      <section className="reports-stat-grid" aria-label="Report summary">
        <StatCard
          tone="blue"
          icon="books"
          value={filteredBooks.length}
          label="Total Books"
          helper={`${availableBooks.length} available`}
        />
        <StatCard
          tone="green"
          icon="books"
          value={availableBooks.length}
          label="Available Books"
          helper={`${filteredBooks.length ? Math.round((availableBooks.length / filteredBooks.length) * 100) : 0}% of collection`}
        />
        <StatCard
          tone="amber"
          icon="reports"
          value={activeLoans.length}
          label="Borrowed Books"
          helper={`${overdueLoans.length} overdue`}
        />
        <StatCard
          tone="red"
          icon="students"
          value={students.length}
          label="Total Students"
          helper={`${activeBorrowers} active borrowers`}
        />
        <StatCard
          tone="blue"
          icon="reports"
          value={filteredLoans.length}
          label="Borrowing Transactions"
          helper={`${returnedLoans.length} returned`}
        />
        <StatCard
          tone="red"
          icon="reports"
          value={overdueLoans.length}
          label="Overdue Books"
          helper={`${money(fines)} outstanding fines`}
        />
      </section>
      <div className="reports-grid reports-grid--overview">
        <section className="reports-card reports-chart-card">
          <CardHeader
            title="Borrowing Overview"
            subtitle="Borrowed and returned books across the selected period"
          />
          <div className="reports-chart">
            <div className="reports-chart-y">
              <span>{maxChart}</span>
              <span>{Math.ceil(maxChart / 2)}</span>
              <span>0</span>
            </div>
            <svg
              viewBox="0 0 600 220"
              preserveAspectRatio="none"
              role="img"
              aria-label="Borrowed and returned books trend"
            >
              <path
                className="reports-grid-line"
                d="M0 20H600M0 110H600M0 200H600"
              />{" "}
              <ChartLine
                points={chartPoints}
                field="borrowed"
                max={maxChart}
                className="reports-chart-line--borrowed"
              />
              <ChartLine
                points={chartPoints}
                field="returned"
                max={maxChart}
                className="reports-chart-line--returned"
              />
            </svg>
            <div className="reports-chart-labels">
              {chartPoints.map((point, index) => (
                <span key={`${point.label}-${index}`}>{point.label}</span>
              ))}
            </div>
          </div>
          <div className="reports-legend">
            <span>
              <i className="reports-legend-dot reports-legend-dot--borrowed" />
              Borrowed
            </span>
            <span>
              <i className="reports-legend-dot reports-legend-dot--returned" />
              Returned
            </span>
          </div>
        </section>
        <section className="reports-card">
          <CardHeader
            title="Collection Status"
            subtitle="Current status of filtered books"
          />
          <div className="reports-donut-wrap">
            <div
              className="reports-donut"
              style={{
                "--available": `${filteredBooks.length ? (availableBooks.length / filteredBooks.length) * 100 : 0}%`,
              }}
            >
              <strong>{filteredBooks.length}</strong>
              <span>books</span>
            </div>
            <div className="reports-status-list">
              <p>
                <i className="reports-legend-dot reports-legend-dot--available" />
                Available <b>{availableBooks.length}</b>
              </p>
              <p>
                <i className="reports-legend-dot reports-legend-dot--borrowed" />
                Borrowed{" "}
                <b>
                  {
                    filteredBooks.filter((book) => book.status === "Borrowed")
                      .length
                  }
                </b>
              </p>
              <p>
                <i className="reports-legend-dot reports-legend-dot--reserved" />
                Other status{" "}
                <b>
                  {
                    filteredBooks.filter(
                      (book) =>
                        !["Available", "Borrowed"].includes(book.status),
                    ).length
                  }
                </b>
              </p>
            </div>
          </div>
        </section>
      </div>
      <div className="reports-grid reports-grid--analytics">
        <section className="reports-card">
          <CardHeader
            title="Books by Category"
            subtitle="Collection distribution"
          />
          {categoryStats.map(([name, count]) => (
            <div className="reports-bar-row" key={name}>
              <span title={name}>{name}</span>
              <div>
                <i
                  style={{
                    width: `${Math.max(8, (count / Math.max(1, categoryStats[0]?.[1])) * 100)}%`,
                  }}
                />
              </div>
              <b>{count}</b>
            </div>
          ))}
        </section>
        <section className="reports-card">
          <CardHeader
            title="Most Borrowed Books"
            subtitle="Top titles in the selected period"
          />
          <div className="reports-table-wrap">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Book</th>
                  <th>Category</th>
                  <th>Loans</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {popularBooks.length ? (
                  popularBooks.map((item) => (
                    <tr key={item.title}>
                      <td>
                        <strong>{item.title}</strong>
                        <small>{item.book?.author || "Unknown author"}</small>
                      </td>
                      <td>{item.book?.category || "—"}</td>
                      <td className="reports-number">{item.count}</td>
                      <td>
                        <StatusPill status={item.book?.status || "Unknown"} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <EmptyRow
                    colSpan="4"
                    text="No borrowing activity for these filters."
                  />
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      <div className="reports-grid reports-grid--tables">
        <section className="reports-card">
          <CardHeader title="Top Borrowers" subtitle="Most active students" />
          <div className="reports-table-wrap">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Grade</th>
                  <th>Loans</th>
                  <th>Out</th>
                  <th>Overdue</th>
                </tr>
              </thead>
              <tbody>
                {topBorrowers.length ? (
                  topBorrowers.map((item) => {
                    const student = students.find(
                      (record) => record.id === item.id,
                    );
                    return (
                      <tr key={item.id}>
                        <td>
                          <div className="reports-person">
                            <span>{initials(item.name)}</span>
                            <strong>
                              {item.name}
                              <small>{item.id}</small>
                            </strong>
                          </div>
                        </td>
                        <td>{student?.grade || "—"}</td>
                        <td>{item.borrowed}</td>
                        <td>{item.current}</td>
                        <td className={item.overdue ? "reports-danger" : ""}>
                          {item.overdue}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <EmptyRow
                    colSpan="5"
                    text="No borrower activity for these filters."
                  />
                )}
              </tbody>
            </table>
          </div>
        </section>
        <section className="reports-card reports-overdue-card">
          <CardHeader
            title="Overdue & Fines"
            subtitle={`${overdueLoans.length} books need attention`}
          />
          <div className="reports-overdue-summary">
            <div>
              <strong>{overdueLoans.length}</strong>
              <span>Overdue books</span>
            </div>
            <div>
              <strong>{money(fines)}</strong>
              <span>Outstanding fines</span>
            </div>
          </div>
          <div className="reports-table-wrap">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Student / Book</th>
                  <th>Due date</th>
                  <th>Late</th>
                  <th>Fine</th>
                </tr>
              </thead>
              <tbody>
                {overdueLoans.slice(0, 5).map((loan) => (
                  <tr key={loan.loanId}>
                    <td>
                      <strong>{loan.studentName}</strong>
                      <small>{loan.bookTitle}</small>
                    </td>
                    <td>{formatDate(loan.dueDate)}</td>
                    <td className="reports-danger">{loan.overdueDays}d</td>
                    <td className="reports-danger">{money(loan.fine)}</td>
                  </tr>
                ))}
                {!overdueLoans.length && (
                  <EmptyRow
                    colSpan="4"
                    text="No overdue books in this report."
                  />
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      <section className="reports-card reports-activity">
        <CardHeader
          title="Recent Library Activity"
          subtitle="Latest borrowing, return, and overdue events"
        />
        <div className="reports-activity-list">
          {activity.map((loan) => (
            <div className="reports-activity-item" key={loan.loanId}>
              <span
                className={`reports-activity-icon reports-activity-icon--${loan.status.toLowerCase()}`}
              >
                {loan.status === "Returned"
                  ? "✓"
                  : loan.status === "Overdue"
                    ? "!"
                    : "↗"}
              </span>
              <div>
                <strong>
                  {loan.status === "Returned"
                    ? `${loan.bookTitle} returned`
                    : `${loan.bookTitle} borrowed`}
                </strong>
                <p>
                  {loan.studentName} ·{" "}
                  {formatDate(loan.returnedDate || loan.borrowDate)}
                </p>
              </div>
              <StatusPill status={loan.status} />
            </div>
          ))}
          {!activity.length && (
            <p className="reports-empty">
              No activity matches the current filters.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

function StatCard({ tone, icon, value, label, helper }) {
  return (
    <div className="reports-stat-card">
      <span className={`reports-stat-icon reports-stat-icon--${tone}`}>
        <StatIcon type={icon} />
      </span>
      <strong>{value.toLocaleString()}</strong>
      <b>{label}</b>
      <small>{helper}</small>
    </div>
  );
}
function CardHeader({ title, subtitle }) {
  return (
    <div className="reports-card-header">
      <div>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}
function EmptyRow({ colSpan, text }) {
  return (
    <tr>
      <td colSpan={colSpan}>
        <div className="reports-empty">{text}</div>
      </td>
    </tr>
  );
}
function ChartLine({ points, field, max, className }) {
  const values = points
    .map(
      (point, index) =>
        `${(index / Math.max(1, points.length - 1)) * 600},${200 - (point[field] / max) * 180}`,
    )
    .join(" ");
  return (
    <polyline className={`reports-chart-line ${className}`} points={values} />
  );
}

export default Reports;
