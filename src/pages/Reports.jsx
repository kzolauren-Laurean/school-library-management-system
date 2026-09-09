import { useMemo, useState } from "react";
import { BookIcon, ReportsIcon } from "../components/layout/NavigationIcons";
import {
  getDateOnly,
  getLoanDetails,
  loanMatchesBook,
} from "../data/LibraryUtils";
import { useLibraryData } from "../data/useLibraryData";
import {
  AnalyticsCard,
  Donut,
  RankedList,
  ReportStatCard,
  TrendChart,
} from "../components/reports/ReportWidgets";

const addDays = (value, amount) => {
  const date = new Date(`${value}T00:00:00`);
  date.setDate(date.getDate() + amount);
  return date.toISOString().slice(0, 10);
};
const startOfPeriod = (today, period) =>
  period === "Today"
    ? today
    : period === "This Week"
      ? addDays(today, -6)
      : period === "This Month"
        ? `${today.slice(0, 7)}-01`
        : `${today.slice(0, 4)}-01-01`;
const percent = (value, total) =>
  total ? Math.round((value / total) * 100) : 0;
const categoryColor = (index) => {
  const palette = [
    "#2ec4b6",
    "#3a86ff",
    "#ffb703",
    "#ef476f",
    "#8ecae6",
    "#8338ec",
    "#fb8500",
    "#06d6a0",
    "#f72585",
    "#90be6d",
  ];
  return palette[index % palette.length];
};

function Reports() {
  const { books, students, loans } = useLibraryData();
  const today = getDateOnly();
  const [period, setPeriod] = useState("This Year");
  const [query, setQuery] = useState("");
  const [activePanel, setActivePanel] = useState(null);
  const search = query.trim().toLowerCase();
  const start = startOfPeriod(today, period);
  const periodLabel = period.toLowerCase().replace("this ", "");
  const details = useMemo(() => {
    const booksById = new Map(books.map((book) => [book.id, book]));
    const booksByTitle = new Map(books.map((book) => [book.title, book]));
    const studentsById = new Map(
      students.map((student) => [student.id, student]),
    );
    return loans.map((loan) => {
      const book =
        booksById.get(loan.bookId) || booksByTitle.get(loan.bookTitle);
      const student = studentsById.get(loan.studentId);
      return {
        ...getLoanDetails(loan, today),
        book,
        student,
        bookTitle: book?.title || loan.bookTitle,
        studentName: student?.fullName || loan.studentName,
      };
    });
  }, [books, loans, students, today]);
  const filteredLoans = useMemo(
    () =>
      details.filter((loan) => {
        const haystack =
          `${loan.bookTitle} ${loan.studentName} ${loan.book?.category || ""}`.toLowerCase();
        return (
          loan.borrowDate >= start &&
          loan.borrowDate <= today &&
          (!search || haystack.includes(search))
        );
      }),
    [details, search, start, today],
  );
  const metrics = useMemo(() => {
    const active = filteredLoans.filter((loan) => loan.status === "Active");
    const overdue = filteredLoans.filter((loan) => loan.status === "Overdue");
    const returned = filteredLoans.filter((loan) => loan.status === "Returned");
    const borrowed = books.filter((book) =>
      details.some(
        (loan) => loan.status !== "Returned" && loanMatchesBook(loan, book),
      ),
    );
    return {
      active,
      overdue,
      returned,
      borrowed,
      available: books.filter(
        (book) => !borrowed.some((item) => item.id === book.id),
      ),
    };
  }, [books, details, filteredLoans]);
  const popularBooks = useMemo(
    () => ranked(filteredLoans, "bookTitle"),
    [filteredLoans],
  );
  const topStudents = useMemo(
    () => ranked(filteredLoans, "studentName"),
    [filteredLoans],
  );
  const categories = useMemo(
    () =>
      Object.entries(
        books.reduce((result, book) => {
          result[book.category] = (result[book.category] || 0) + 1;
          return result;
        }, {}),
      ).sort((a, b) => b[1] - a[1]),
    [books],
  );
  const total = filteredLoans.length || 1;
  const returnRate = Math.round((metrics.returned.length / total) * 100);
  const overdueRate = Math.round(
    (metrics.overdue.length /
      Math.max(1, metrics.active.length + metrics.overdue.length)) *
      100,
  );
  const trend = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => {
        const date = new Date(Number(today.slice(0, 4)), index, 1);
        const key = `${date.getFullYear()}-${String(index + 1).padStart(2, "0")}`;
        return {
          label: date.toLocaleDateString("en-US", { month: "short" }),
          value: filteredLoans.filter((loan) => loan.borrowDate.startsWith(key))
            .length,
        };
      }),
    [filteredLoans, today],
  );
  const panelData = {
    books: {
      title: "Most Borrowed Books",
      items: popularBooks,
      empty: "No borrowing activity for this period.",
    },
    students: {
      title: "Most Active Students",
      items: topStudents,
      empty: "No student activity for this period.",
    },
    categories: {
      title: "Books by Category",
      items: categories,
      empty: "No categories to display.",
    },
  };
  const activePanelData = activePanel ? panelData[activePanel] : null;

  return (
    <main className="reports-page reports-dashboard">
      <header className="reports-dashboard-header">
        <div>
          <h2>Reports</h2>
          <p>Library statistics and analytics</p>
        </div>
        <div className="reports-dashboard-controls">
          <label className="reports-search">
            <span aria-hidden="true">⌕</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search books, students, or reports..."
              aria-label="Search reports"
            />
          </label>
          <label className="reports-period">
            <span aria-hidden="true">▣</span>
            <select
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
              aria-label="Report period"
            >
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </label>
        </div>
      </header>
      <section
        className="reports-stat-grid reports-stat-grid--dashboard"
        aria-label="Report summary"
      >
        <ReportStatCard
          tone="blue"
          icon={<ReportsIcon />}
          value={filteredLoans.length}
          label="Total Transactions"
          helper="Records in selected period"
        />
        <ReportStatCard
          tone="green"
          icon={<BookIcon />}
          value={metrics.active.length}
          label="Active Loans"
          helper="Currently out"
        />
        <ReportStatCard
          tone="red"
          icon={<span className="reports-clock">◷</span>}
          value={`${overdueRate}%`}
          label="Overdue Rate"
          helper={`${metrics.overdue.length} books need attention`}
        />
        <ReportStatCard
          tone="purple"
          icon={<span>✓</span>}
          value={`${returnRate}%`}
          label="Return Rate"
          helper="Completed transactions"
        />
      </section>
      <section className="reports-content">
        <div className="left-column">
          <AnalyticsCard
            title="Most Borrowed Books"
            subtitle="Top books with highest borrowing count"
            action={{
              label: "View All",
              onClick: () => setActivePanel("books"),
            }}
          >
            <RankedList
              items={popularBooks}
              emptyText={`No borrowing activity for ${periodLabel}.`}
              tone="blue"
            />
          </AnalyticsCard>
          <AnalyticsCard
            title="Most Active Students"
            subtitle="Students with highest borrowing count"
            action={{
              label: "View All",
              onClick: () => setActivePanel("students"),
            }}
          >
            <RankedList
              items={topStudents}
              emptyText={`No student activity for ${periodLabel}.`}
              tone="green"
            />
          </AnalyticsCard>
        </div>
        <div className="right-column">
          <AnalyticsCard
            title="Collection Status"
            subtitle="Overview of book availability"
          >
            <div className="reports-donut-panel">
              <Donut
                value={books.length}
                label="Total Books"
                segments={[
                  { value: metrics.available.length, color: "#14b8a6" },
                  { value: metrics.borrowed.length, color: "#fb7a21" },
                ]}
              />
              <div className="reports-status-list">
                <p>
                  <i className="reports-legend-dot reports-dot--available" />
                  Available <b>{metrics.available.length}</b>
                  <small>
                    {percent(metrics.available.length, books.length)}%
                  </small>
                </p>
                <p>
                  <i className="reports-legend-dot reports-dot--borrowed" />
                  Borrowed <b>{metrics.borrowed.length}</b>
                  <small>
                    {percent(metrics.borrowed.length, books.length)}%
                  </small>
                </p>
              </div>
            </div>
            <div className="reports-mini-stats">
              <div>
                <small>Total copies</small>
                <strong>{books.length}</strong>
              </div>
              <div>
                <small>Utilization rate</small>
                <strong>
                  {percent(metrics.borrowed.length, books.length)}%
                </strong>
              </div>
            </div>
          </AnalyticsCard>
          <AnalyticsCard
            title="Borrow Status"
            subtitle="Current loan status breakdown"
          >
            <div className="reports-borrow-status">
              <div>
                <Donut
                  value={filteredLoans.length}
                  label="Transactions"
                  small
                  segments={[
                    { value: metrics.active.length, color: "#14b8a6" },
                    { value: metrics.overdue.length, color: "#ef476f" },
                    { value: metrics.returned.length, color: "#4285e1" },
                  ]}
                />
                <div className="reports-status-list">
                  <p>
                    <i className="reports-legend-dot reports-dot--available" />
                    Active <b>{metrics.active.length}</b>
                  </p>
                  <p>
                    <i className="reports-legend-dot reports-dot--overdue" />
                    Overdue <b>{metrics.overdue.length}</b>
                  </p>
                  <p>
                    <i className="reports-legend-dot reports-dot--returned" />
                    Returned <b>{metrics.returned.length}</b>
                  </p>
                </div>
              </div>
            </div>
          </AnalyticsCard>
        </div>
      </section>
      <AnalyticsCard
        className="quick-insights-nna"
        title="Quick Insights"
        subtitle="A concise snapshot of the current period"
      >
        <div className="reports-insights">
          <article className="reports-insight reports-insight--primary">
            <span>Top category</span>
            <strong>{categories[0]?.[0] || "No data"}</strong>
            <small>{categories[0]?.[1] || 0} books</small>
          </article>
          <article className="reports-insight reports-insight--secondary">
            <span>Top borrower</span>
            <strong>{topStudents[0]?.title || "No activity"}</strong>
            <small>{topStudents[0]?.count || 0} checks</small>
          </article>
          <article className="reports-insight reports-insight--accent">
            <span>Needs review</span>
            <strong>{metrics.overdue.length}</strong>
            <small>overdue items</small>
          </article>
        </div>
      </AnalyticsCard>
      {activePanelData && (
        <div
          className="reports-modal-backdrop"
          onClick={() => setActivePanel(null)}
        >
          <div
            className="reports-modal"
            role="dialog"
            aria-modal="true"
            aria-label={activePanelData.title}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="reports-modal-header">
              <div>
                <span className="reports-modal-kicker">Overview</span>
                <h3>{activePanelData.title}</h3>
              </div>
              <button
                type="button"
                className="reports-modal-close"
                onClick={() => setActivePanel(null)}
                aria-label="Close panel"
              >
                ×
              </button>
            </div>
            <div className="reports-modal-body">
              {activePanel === "categories" ? (
                categories.length ? (
                  categories.map(([name, count], index) => (
                    <div className="reports-modal-row" key={name}>
                      <span>{name}</span>
                      <div className="reports-modal-track">
                        <i
                          style={{
                            width: `${(count / categories[0][1]) * 100}%`,
                            background: categoryColor(index),
                          }}
                        />
                      </div>
                      <b>{count}</b>
                    </div>
                  ))
                ) : (
                  <p className="reports-empty">{activePanelData.empty}</p>
                )
              ) : activePanelData.items.length ? (
                activePanelData.items.map((item, index) => (
                  <div
                    className="reports-modal-row reports-modal-row--list"
                    key={item.title || index}
                  >
                    <span className="reports-modal-rank">{index + 1}</span>
                    <strong>{item.title}</strong>
                    <b>{item.count}</b>
                  </div>
                ))
              ) : (
                <p className="reports-empty">{activePanelData.empty}</p>
              )}
            </div>
          </div>
        </div>
      )}
      <AnalyticsCard
        className="reports-trend-card"
        title="Monthly Borrowing Trend"
        subtitle="Borrowing activity over the selected period"
        action={
          <select
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
            aria-label="Trend period"
          >
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
        }
      >
        <TrendChart points={trend} />
      </AnalyticsCard>
      <AnalyticsCard
        className="reports-category-card"
        title="Books by Category"
        subtitle="Distribution of books across categories"
        action={{
          label: "View All",
          onClick: () => setActivePanel("categories"),
        }}
      >
        <div className="reports-category-list">
          {categories.length ? (
            categories.map(([name, count], index) => (
              <div className="reports-bar-row" key={name}>
                <span>{name}</span>
                <div>
                  <i
                    style={{
                      width: `${(count / categories[0][1]) * 100}%`,
                      background: categoryColor(index),
                    }}
                  />
                </div>
                <b>{count}</b>
              </div>
            ))
          ) : (
            <p className="reports-empty">No categories to display.</p>
          )}
        </div>
      </AnalyticsCard>
    </main>
  );
}
function ranked(loans, key) {
  const counts = loans.reduce((result, loan) => {
    result[loan[key]] = (result[loan[key]] || 0) + 1;
    return result;
  }, {});
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([title, count]) => ({ title, count }));
}
export default Reports;
