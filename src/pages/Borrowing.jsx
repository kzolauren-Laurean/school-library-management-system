import { useEffect, useMemo, useState } from "react";

const TODAY = new Date();
const PAGE_SIZE_OPTIONS = [5, 10, 20];

const students = [
  { id: "ST-1001", name: "Aisha Patel" },
  { id: "ST-1002", name: "Marcus Chen" },
  { id: "ST-1019", name: "Mei Lin Zhou" },
  { id: "ST-1023", name: "Anya Petrov" },
  { id: "ST-1042", name: "Kwame Asante" },
  { id: "ST-1067", name: "Sofia Williams" },
];

const books = [
  { id: "BK-1198", title: "Database System Concepts" },
  { id: "BK-1357", title: "Organic Chemistry" },
  { id: "BK-1820", title: "Anatomy: A Photographic Atlas" },
  { id: "BK-2004", title: "Introduction to Algorithms" },
  { id: "BK-2041", title: "Linear Algebra and Its Applications" },
  { id: "BK-2188", title: "The Design of Everyday Things" },
  { id: "BK-2234", title: "The Midnight Library" },
];

const initialRecords = [
  {
    id: "BR-1001",
    studentId: "ST-1023",
    bookId: "BK-2041",
    borrowDate: "2026-08-25",
    dueDate: "2026-09-08",
    returnedDate: "",
    notes: "Study group reference book.",
  },
  {
    id: "BR-1002",
    studentId: "ST-1042",
    bookId: "BK-1820",
    borrowDate: "2026-08-10",
    dueDate: "2026-09-03",
    returnedDate: "",
    notes: "",
  },
  {
    id: "BR-1003",
    studentId: "ST-1019",
    bookId: "BK-1198",
    borrowDate: "2026-09-01",
    dueDate: "2026-09-06",
    returnedDate: "",
    notes: "",
  },
  {
    id: "BR-1004",
    studentId: "ST-1001",
    bookId: "BK-2004",
    borrowDate: "2026-08-02",
    dueDate: "2026-08-16",
    returnedDate: "2026-08-15",
    notes: "Returned in good condition.",
  },
  {
    id: "BR-1005",
    studentId: "ST-1002",
    bookId: "BK-1357",
    borrowDate: "2026-08-21",
    dueDate: "2026-09-09",
    returnedDate: "",
    notes: "",
  },
  {
    id: "BR-1006",
    studentId: "ST-1067",
    bookId: "BK-2188",
    borrowDate: "2026-08-28",
    dueDate: "2026-09-07",
    returnedDate: "",
    notes: "Architecture club reading.",
  },
  {
    id: "BR-1007",
    studentId: "ST-1023",
    bookId: "BK-2234",
    borrowDate: "2026-08-05",
    dueDate: "2026-08-19",
    returnedDate: "2026-08-18",
    notes: "",
  },
  {
    id: "BR-1008",
    studentId: "ST-1042",
    bookId: "BK-2004",
    borrowDate: "2026-08-30",
    dueDate: "2026-09-12",
    returnedDate: "",
    notes: "",
  },
  {
    id: "BR-1009",
    studentId: "ST-1019",
    bookId: "BK-1357",
    borrowDate: "2026-07-18",
    dueDate: "2026-08-01",
    returnedDate: "",
    notes: "Contacted student on Sep 4.",
  },
  {
    id: "BR-1010",
    studentId: "ST-1001",
    bookId: "BK-1198",
    borrowDate: "2026-08-29",
    dueDate: "2026-09-06",
    returnedDate: "",
    notes: "Due before the database assessment.",
  },
];

const emptyForm = {
  studentId: "",
  bookId: "",
  borrowDate: "2026-09-06",
  dueDate: "2026-09-20",
  notes: "",
};

function Icon({ name }) {
  const paths = {
    book: (
      <>
        <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v15.5H7.5A2.5 2.5 0 0 0 5 21V5.5Z" />
        <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v15.5H7.5A2.5 2.5 0 0 0 5 21M8 7h7M8 11h7" />
      </>
    ),
    users: (
      <>
        <path d="M16 18v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" />
        <circle cx="10" cy="7.5" r="3.5" />
        <path d="M19 18v-1a3.5 3.5 0 0 0-2.7-3.4M17 5.5a3.5 3.5 0 0 1 0 6.7" />
      </>
    ),
    alert: (
      <>
        <path d="M12 4 21 20H3L12 4Z" />
        <path d="M12 10v4M12 17h.01" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    check: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="m8 12 2.5 2.5L16 9" />
      </>
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6" />
        <path d="m15 15 4 4" />
      </>
    ),
    eye: (
      <>
        <path d="M3 12s3.2-5 9-5 9 5 9 5-3.2 5-9 5-9-5-9-5Z" />
        <circle cx="12" cy="12" r="2" />
      </>
    ),
    edit: (
      <>
        <path d="m4 16.5-.7 3.2 3.2-.7L18 7.5 15.5 5 4 16.5Z" />
        <path d="m14.5 6 2.5 2.5" />
      </>
    ),
    trash: (
      <>
        <path d="M5 7h14M10 11v5M14 11v5M9 7V4h6v3M7 7l.8 13h8.4L17 7" />
      </>
    ),
    return: (
      <>
        <path d="M9 7 4 12l5 5" />
        <path d="M4 12h10a6 6 0 0 1 6 6" />
      </>
    ),
    calendar: (
      <>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 3v4M16 3v4M4 10h16" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
  };
  return (
    <svg className="borrowing-icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function parseDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function dateDifference(later, earlier) {
  return Math.round((later - earlier) / 86400000);
}

function formatDate(value) {
  if (!value) return "-";
  return parseDate(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatInputDate(date) {
  return date.toISOString().slice(0, 10);
}

function initials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function Borrowing() {
  const [records, setRecords] = useState(initialRecords);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [dateFilter, setDateFilter] = useState("All Dates");
  const [sortBy, setSortBy] = useState("dueDate");
  const [sortDirection, setSortDirection] = useState("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [modal, setModal] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [toast, setToast] = useState(null);

  const getPerson = (record) =>
    students.find((student) => student.id === record.studentId) || {
      id: record.studentId,
      name: "Unknown student",
    };
  const getBook = (record) =>
    books.find((book) => book.id === record.bookId) || {
      id: record.bookId,
      title: "Unknown book",
    };
  const getStatus = (record) =>
    record.returnedDate
      ? "Returned"
      : parseDate(record.dueDate) < TODAY
        ? "Overdue"
        : "Active";
  const getDaysLabel = (record) => {
    if (record.returnedDate) return "Returned";
    const difference = dateDifference(parseDate(record.dueDate), TODAY);
    if (difference < 0)
      return `${Math.abs(difference)} day${Math.abs(difference) === 1 ? "" : "s"} overdue`;
    if (difference === 0) return "Due today";
    return `${difference} day${difference === 1 ? "" : "s"} remaining`;
  };

  const enrichedRecords = useMemo(
    () =>
      records.map((record) => ({
        ...record,
        status: getStatus(record),
        studentName: getPerson(record).name,
        bookTitle: getBook(record).title,
      })),
    [records],
  );
  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = enrichedRecords.filter((record) => {
      const matchesSearch =
        !query ||
        [
          record.studentName,
          record.studentId,
          record.bookTitle,
          record.bookId,
        ].some((value) => value.toLowerCase().includes(query));
      const matchesStatus =
        statusFilter === "All Statuses" || record.status === statusFilter;
      const dueDifference = dateDifference(parseDate(record.dueDate), TODAY);
      const matchesDate =
        dateFilter === "All Dates" ||
        (dateFilter === "Due Today" &&
          dueDifference === 0 &&
          record.status !== "Returned") ||
        (dateFilter === "Due This Week" &&
          dueDifference >= 0 &&
          dueDifference <= 7 &&
          record.status !== "Returned") ||
        (dateFilter === "Overdue" && record.status === "Overdue") ||
        (dateFilter === "Returned This Month" &&
          record.status === "Returned" &&
          parseDate(record.returnedDate).getMonth() === TODAY.getMonth());
      return matchesSearch && matchesStatus && matchesDate;
    });
    return filtered.sort((first, second) => {
      const firstValue =
        sortBy === "studentName"
          ? first.studentName
          : sortBy === "bookTitle"
            ? first.bookTitle
            : sortBy === "status"
              ? first.status
              : first[sortBy];
      const secondValue =
        sortBy === "studentName"
          ? second.studentName
          : sortBy === "bookTitle"
            ? second.bookTitle
            : sortBy === "status"
              ? second.status
              : second[sortBy];
      const result = firstValue.localeCompare(secondValue, undefined, {
        numeric: true,
      });
      return sortDirection === "asc" ? result : -result;
    });
  }, [
    dateFilter,
    enrichedRecords,
    search,
    sortBy,
    sortDirection,
    statusFilter,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / pageSize));
  const displayPage = Math.min(page, totalPages);
  const visibleRecords = filteredRecords.slice(
    (displayPage - 1) * pageSize,
    displayPage * pageSize,
  );
  const stats = [
    {
      label: "Total Borrowed",
      value: records.filter((record) => !record.returnedDate).length,
      helper: "Books currently out",
      icon: "book",
      tone: "blue",
    },
    {
      label: "Active Borrowings",
      value: enrichedRecords.filter((record) => record.status === "Active")
        .length,
      helper: "On track to return",
      icon: "users",
      tone: "green",
    },
    {
      label: "Overdue Books",
      value: enrichedRecords.filter((record) => record.status === "Overdue")
        .length,
      helper: "Need follow-up",
      icon: "alert",
      tone: "red",
    },
    {
      label: "Due Today",
      value: enrichedRecords.filter(
        (record) =>
          !record.returnedDate &&
          dateDifference(parseDate(record.dueDate), TODAY) === 0,
      ).length,
      helper: "Return date is today",
      icon: "clock",
      tone: "amber",
    },
    {
      label: "Returned Books",
      value: records.filter((record) => record.returnedDate).length,
      helper: "Completed records",
      icon: "check",
      tone: "slate",
    },
  ];

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(null), 3600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const showToast = (message, tone = "success") => setToast({ message, tone });
  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All Statuses");
    setDateFilter("All Dates");
  };
  const openForm = (record = null) => {
    setSelectedRecord(record);
    setForm(
      record
        ? {
            studentId: record.studentId,
            bookId: record.bookId,
            borrowDate: record.borrowDate,
            dueDate: record.dueDate,
            notes: record.notes || "",
          }
        : emptyForm,
    );
    setModal(record ? "edit" : "form");
  };
  const submitForm = (event) => {
    event.preventDefault();
    if (parseDate(form.dueDate) < parseDate(form.borrowDate)) {
      showToast("Due date cannot be before the borrow date.", "error");
      return;
    }
    if (modal === "edit") {
      setRecords((current) =>
        current.map((record) =>
          record.id === selectedRecord.id ? { ...record, ...form } : record,
        ),
      );
      showToast("Borrowing record updated successfully.");
    } else {
      setRecords((current) => [
        { id: `BR-${Date.now()}`, ...form, returnedDate: "" },
        ...current,
      ]);
      showToast("Borrowing record added successfully.");
    }
    setModal(null);
  };
  const confirmReturn = () => {
    setRecords((current) =>
      current.map((record) =>
        record.id === selectedRecord.id
          ? { ...record, returnedDate: formatInputDate(TODAY) }
          : record,
      ),
    );
    setModal(null);
    showToast("Book returned successfully.");
  };
  const confirmDelete = () => {
    setRecords((current) =>
      current.filter((record) => record.id !== selectedRecord.id),
    );
    setModal(null);
    showToast("Borrowing record deleted successfully.");
  };
  const extendDueDate = (event) => {
    event.preventDefault();
    const newDate = event.currentTarget.elements.newDueDate.value;
    if (
      parseDate(newDate) <= TODAY ||
      parseDate(newDate) < parseDate(selectedRecord.borrowDate)
    ) {
      showToast("Choose a future date after the borrow date.", "error");
      return;
    }
    setRecords((current) =>
      current.map((record) =>
        record.id === selectedRecord.id
          ? { ...record, dueDate: newDate }
          : record,
      ),
    );
    setModal(null);
    showToast("Due date extended successfully.");
  };
  const changeSort = (event) => {
    setSortBy(event.target.value);
    setSortDirection("asc");
  };
  const toggleSortDirection = () =>
    setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
  const resetModal = () => {
    setModal(null);
    setSelectedRecord(null);
  };

  return (
    <>
      <style>{`
        .borrowing-page { min-height: calc(100svh - 91px); padding: 28px 32px 40px; background: #f4f7fb; color: #1f3448; box-sizing: border-box; }
        .borrowing-panel { max-width: 1500px; margin: 0 auto; }
        .borrowing-header, .borrowing-card-header, .borrowing-controls, .borrowing-footer, .borrowing-modal-header, .borrowing-modal-actions { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .borrowing-header { align-items: flex-end; margin-bottom: 22px; }
        .borrowing-kicker { margin: 0 0 7px; color: #5e86aa; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; }
        .borrowing-heading { margin: 0; color: #17324a; font-size: 28px; font-weight: 700; letter-spacing: -0.6px; line-height: 1.15; }
        .borrowing-subtitle { margin: 7px 0 0; color: #7890a5; font-size: 14px; }
        .borrowing-primary { display: inline-flex; align-items: center; gap: 8px; min-height: 42px; padding: 0 17px; border: 0; border-radius: 8px; background: #334e68; color: #fff; font: 600 13px var(--sans); cursor: pointer; transition: background .2s, transform .2s; }
        .borrowing-primary:hover { background: #243b53; transform: translateY(-1px); }
        .borrowing-icon { width: 17px; height: 17px; stroke: currentColor; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
        .borrowing-stats { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 13px; margin-bottom: 18px; }
        .borrowing-stat, .borrowing-card { border: 1px solid #e0e8f0; border-radius: 13px; background: #fff; box-shadow: 0 3px 12px rgba(31,52,72,.04); }
        .borrowing-stat { min-height: 116px; padding: 17px; box-sizing: border-box; }
        .borrowing-stat-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        .borrowing-stat-icon { display: grid; width: 38px; height: 38px; place-items: center; border-radius: 11px; }
        .borrowing-stat-icon .borrowing-icon { width: 19px; height: 19px; }
        .borrowing-stat--blue .borrowing-stat-icon { background: #e8f1fb; color: #2d6fc5; }
        .borrowing-stat--green .borrowing-stat-icon { background: #e8f6ef; color: #188a58; }
        .borrowing-stat--red .borrowing-stat-icon { background: #fbecee; color: #c44352; }
        .borrowing-stat--amber .borrowing-stat-icon { background: #fff3df; color: #cb7d0b; }
        .borrowing-stat--slate .borrowing-stat-icon { background: #edf1f5; color: #526b80; }
        .borrowing-stat-value { margin: 11px 0 0; color: #172b3d; font-size: 25px; font-weight: 750; line-height: 1; }
        .borrowing-stat-label { margin: 6px 0 0; color: #40566b; font-size: 12px; font-weight: 700; }
        .borrowing-stat-helper { margin: 3px 0 0; color: #91a1b0; font-size: 11px; }
        .borrowing-card { overflow: hidden; }
        .borrowing-card-header { align-items: flex-end; padding: 21px 22px 18px; border-bottom: 1px solid #edf1f5; }
        .borrowing-card-title { margin: 0; color: #20364a; font-size: 16px; font-weight: 750; }
        .borrowing-card-subtitle { margin: 5px 0 0; color: #91a1b0; font-size: 12px; }
        .borrowing-controls { justify-content: flex-end; flex-wrap: wrap; }
        .borrowing-search { position: relative; display: flex; align-items: center; }
        .borrowing-search .borrowing-icon { position: absolute; left: 12px; color: #9aabba; pointer-events: none; }
        .borrowing-search input, .borrowing-select, .borrowing-modal input, .borrowing-modal select, .borrowing-modal textarea { min-height: 38px; border: 1px solid #dce5ed; border-radius: 7px; background: #fff; color: #294157; font: 13px var(--sans); box-sizing: border-box; }
        .borrowing-search input { width: 235px; padding: 0 12px 0 36px; }
        .borrowing-select { padding: 0 10px; cursor: pointer; }
        .borrowing-search input:focus, .borrowing-select:focus, .borrowing-modal input:focus, .borrowing-modal select:focus, .borrowing-modal textarea:focus { outline: 2px solid rgba(62,126,181,.18); border-color: #5e9acb; }
        .borrowing-table-wrap { width: 100%; overflow-x: auto; }
        .borrowing-table { width: 100%; min-width: 950px; border-collapse: collapse; text-align: left; }
        .borrowing-table th { padding: 12px 22px; background: #f8fafc; color: #8194a6; font-size: 10px; font-weight: 800; letter-spacing: .75px; text-transform: uppercase; }
        .borrowing-table td { padding: 15px 22px; border-top: 1px solid #edf1f5; color: #40566b; font-size: 13px; vertical-align: middle; }
        .borrowing-table tbody tr:hover { background: #fbfdff; }
        .borrowing-person, .borrowing-book { display: flex; align-items: center; gap: 10px; min-width: 175px; }
        .borrowing-avatar { display: grid; flex: 0 0 34px; width: 34px; height: 34px; place-items: center; border-radius: 50%; background: #e8f1fb; color: #2d6fc5; font-size: 11px; font-weight: 800; }
        .borrowing-book-mark { display: grid; flex: 0 0 32px; width: 32px; height: 32px; place-items: center; border-radius: 8px; background: #eef5f8; color: #47758d; }
        .borrowing-book-mark .borrowing-icon { width: 16px; height: 16px; }
        .borrowing-table strong, .borrowing-table span { display: block; }
        .borrowing-table strong { color: #294157; font-weight: 700; }
        .borrowing-meta { margin-top: 3px; color: #94a4b2; font-size: 11px; }
        .borrowing-status { display: inline-flex; align-items: center; gap: 5px; padding: 5px 9px; border-radius: 999px; font-size: 11px; font-weight: 750; }
        .borrowing-status::before { width: 5px; height: 5px; border-radius: 50%; background: currentColor; content: ""; }
        .borrowing-status--active { background: #e8f6ef; color: #188a58; }
        .borrowing-status--overdue { background: #fbecee; color: #c44352; }
        .borrowing-status--returned { background: #edf1f5; color: #657b8e; }
        .borrowing-days { font-weight: 650; color: #557085; }
        .borrowing-days--warning { color: #c47a0c; }
        .borrowing-days--danger { color: #c44352; }
        .borrowing-actions { display: flex; align-items: center; gap: 5px; }
        .borrowing-action { display: inline-grid; width: 30px; height: 30px; place-items: center; padding: 0; border: 1px solid transparent; border-radius: 7px; background: transparent; color: #71899e; cursor: pointer; }
        .borrowing-action:hover { background: #eef5fb; border-color: #dbe8f2; color: #2d6fc5; }
        .borrowing-action--danger:hover { background: #fff0f1; border-color: #f7d5d8; color: #c44352; }
        .borrowing-action .borrowing-icon { width: 15px; height: 15px; }
        .borrowing-footer { padding: 14px 22px; border-top: 1px solid #edf1f5; color: #8a9bad; font-size: 12px; }
        .borrowing-page-size { display: flex; align-items: center; gap: 7px; }
        .borrowing-page-size select { min-height: 30px; border: 1px solid #dce5ed; border-radius: 6px; color: #40566b; background: #fff; }
        .borrowing-pagination { display: flex; align-items: center; gap: 4px; }
        .borrowing-page-btn { display: inline-grid; min-width: 29px; height: 29px; place-items: center; padding: 0 8px; border: 1px solid #dce5ed; border-radius: 6px; background: #fff; color: #60788d; cursor: pointer; }
        .borrowing-page-btn.active, .borrowing-page-btn:hover:not(:disabled) { border-color: #5e9acb; background: #e8f1fb; color: #2d6fc5; }
        .borrowing-page-btn:disabled { cursor: not-allowed; opacity: .45; }
        .borrowing-empty { padding: 52px 20px; text-align: center; }
        .borrowing-empty .borrowing-icon { width: 30px; height: 30px; color: #7da1bd; }
        .borrowing-empty h3 { margin: 11px 0 5px; color: #294157; font-size: 15px; }
        .borrowing-empty p { margin: 0 0 15px; color: #8a9bad; font-size: 13px; }
        .borrowing-link-btn { border: 0; background: none; color: #377caf; font: 600 13px var(--sans); cursor: pointer; }
        .borrowing-backdrop { position: fixed; inset: 0; z-index: 20; display: grid; place-items: center; padding: 20px; background: rgba(16,42,67,.45); }
        .borrowing-modal { width: min(100%, 560px); max-height: calc(100svh - 40px); overflow: auto; border-radius: 13px; background: #fff; box-shadow: 0 20px 55px rgba(16,42,67,.25); }
        .borrowing-modal-header { padding: 20px 22px 17px; border-bottom: 1px solid #edf1f5; }
        .borrowing-modal-header h3 { margin: 0; color: #20364a; font-size: 18px; }
        .borrowing-close { display: grid; width: 31px; height: 31px; place-items: center; padding: 0; border: 1px solid #dce5ed; border-radius: 7px; background: #fff; color: #71899e; cursor: pointer; }
        .borrowing-close:hover { background: #f4f7fb; }
        .borrowing-modal-body { padding: 20px 22px; }
        .borrowing-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .borrowing-field { display: flex; flex-direction: column; gap: 6px; }
        .borrowing-field--full { grid-column: 1 / -1; }
        .borrowing-field label, .borrowing-detail-label { color: #526b80; font-size: 12px; font-weight: 700; }
        .borrowing-modal input, .borrowing-modal select, .borrowing-modal textarea { width: 100%; padding: 9px 11px; }
        .borrowing-modal textarea { min-height: 78px; resize: vertical; }
        .borrowing-modal-actions { justify-content: flex-end; padding: 15px 22px; border-top: 1px solid #edf1f5; }
        .borrowing-secondary { min-height: 38px; padding: 0 14px; border: 1px solid #dce5ed; border-radius: 7px; background: #fff; color: #526b80; font: 600 13px var(--sans); cursor: pointer; }
        .borrowing-danger-btn { background: #c44352; }
        .borrowing-danger-btn:hover { background: #a93745; }
        .borrowing-confirm-copy { margin: 0; color: #526b80; font-size: 14px; line-height: 1.6; }
        .borrowing-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px 24px; }
        .borrowing-detail-value { margin: 4px 0 0; color: #294157; font-size: 14px; font-weight: 650; }
        .borrowing-toast { position: fixed; right: 24px; bottom: 24px; z-index: 30; display: flex; align-items: center; gap: 10px; max-width: min(360px, calc(100vw - 48px)); padding: 13px 16px; border: 1px solid #cfe8da; border-radius: 9px; background: #f3fbf6; color: #1b7049; box-shadow: 0 8px 24px rgba(31,52,72,.15); font-size: 13px; font-weight: 650; }
        .borrowing-toast--error { border-color: #f2cfd3; background: #fff6f7; color: #b13f4d; }
        @media (max-width: 1100px) { .borrowing-stats { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
        @media (max-width: 720px) { .borrowing-page { padding: 20px 16px 32px; } .borrowing-header, .borrowing-card-header, .borrowing-footer { align-items: flex-start; flex-direction: column; } .borrowing-header .borrowing-primary { width: 100%; justify-content: center; } .borrowing-stats { grid-template-columns: 1fr 1fr; } .borrowing-controls { width: 100%; justify-content: stretch; } .borrowing-search, .borrowing-search input, .borrowing-select { flex: 1; min-width: 0; width: 100%; } .borrowing-form-grid, .borrowing-detail-grid { grid-template-columns: 1fr; } .borrowing-field--full { grid-column: auto; } .borrowing-footer { gap: 12px; } .borrowing-pagination { align-self: stretch; justify-content: flex-end; } }
        @media (max-width: 430px) { .borrowing-stats { grid-template-columns: 1fr; } .borrowing-controls { display: grid; grid-template-columns: 1fr 1fr; } .borrowing-search { grid-column: 1 / -1; } .borrowing-heading { font-size: 25px; } }
      `}</style>
      <div className="borrowing-page">
        <div className="borrowing-panel">
          <header className="borrowing-header">
            <div>
              <p className="borrowing-kicker">CIRCULATION</p>
              <h2 className="borrowing-heading">Borrowing</h2>
              <p className="borrowing-subtitle">
                Manage borrowed books, due dates, borrowers, and return
                activity.
              </p>
            </div>
            <button
              type="button"
              className="borrowing-primary"
              onClick={() => openForm()}
            >
              <Icon name="plus" /> Add Borrowing Record
            </button>
          </header>
          <section
            className="borrowing-stats"
            aria-label="Borrowing summary statistics"
          >
            {stats.map((stat) => (
              <article
                className={`borrowing-stat borrowing-stat--${stat.tone}`}
                key={stat.label}
              >
                <div className="borrowing-stat-top">
                  <span className="borrowing-stat-icon">
                    <Icon name={stat.icon} />
                  </span>
                </div>
                <p className="borrowing-stat-value">{stat.value}</p>
                <p className="borrowing-stat-label">{stat.label}</p>
                <p className="borrowing-stat-helper">{stat.helper}</p>
              </article>
            ))}
          </section>
          <section className="borrowing-card">
            <div className="borrowing-card-header">
              <div>
                <h3 className="borrowing-card-title">All borrowing records</h3>
                <p className="borrowing-card-subtitle">
                  {filteredRecords.length} records found
                </p>
              </div>
              <div className="borrowing-controls">
                <label className="borrowing-search">
                  <Icon name="search" />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search student or book"
                    aria-label="Search borrowing records"
                  />
                </label>
                <select
                  className="borrowing-select"
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  aria-label="Filter by status"
                >
                  <option>All Statuses</option>
                  <option>Active</option>
                  <option>Overdue</option>
                  <option>Returned</option>
                </select>
                <select
                  className="borrowing-select"
                  value={dateFilter}
                  onChange={(event) => setDateFilter(event.target.value)}
                  aria-label="Filter by date"
                >
                  <option>All Dates</option>
                  <option>Due Today</option>
                  <option>Due This Week</option>
                  <option>Overdue</option>
                  <option>Returned This Month</option>
                </select>
                <select
                  className="borrowing-select"
                  value={sortBy}
                  onChange={changeSort}
                  aria-label="Sort records"
                >
                  <option value="borrowDate">Borrow Date</option>
                  <option value="dueDate">Due Date</option>
                  <option value="studentName">Student Name</option>
                  <option value="bookTitle">Book Title</option>
                  <option value="status">Status</option>
                </select>
                <button
                  type="button"
                  className="borrowing-page-btn"
                  onClick={toggleSortDirection}
                  aria-label={`Sort ${sortDirection === "asc" ? "descending" : "ascending"}`}
                  title={`Sort ${sortDirection === "asc" ? "descending" : "ascending"}`}
                >
                  {sortDirection === "asc" ? "↑" : "↓"}
                </button>
              </div>
            </div>
            <div className="borrowing-table-wrap">
              <table className="borrowing-table">
                <thead>
                  <tr>
                    <th scope="col">Student</th>
                    <th scope="col">Book</th>
                    <th scope="col">Borrow Date</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Days</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRecords.length ? (
                    visibleRecords.map((record) => {
                      const status = record.status;
                      const days = getDaysLabel(record);
                      return (
                        <tr key={record.id}>
                          <td>
                            <div className="borrowing-person">
                              <span className="borrowing-avatar">
                                {initials(record.studentName)}
                              </span>
                              <div>
                                <strong>{record.studentName}</strong>
                                <span className="borrowing-meta">
                                  {record.studentId}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="borrowing-book">
                              <span className="borrowing-book-mark">
                                <Icon name="book" />
                              </span>
                              <div>
                                <strong>{record.bookTitle}</strong>
                                <span className="borrowing-meta">
                                  {record.bookId}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>{formatDate(record.borrowDate)}</td>
                          <td>{formatDate(record.dueDate)}</td>
                          <td>
                            <span
                              className={`borrowing-status borrowing-status--${status.toLowerCase()}`}
                            >
                              {status}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`borrowing-days ${status === "Overdue" ? "borrowing-days--danger" : days === "Due today" || dateDifference(parseDate(record.dueDate), TODAY) <= 3 ? "borrowing-days--warning" : ""}`}
                            >
                              {days}
                            </span>
                          </td>
                          <td>
                            <div className="borrowing-actions">
                              <button
                                type="button"
                                className="borrowing-action"
                                onClick={() => {
                                  setSelectedRecord(record);
                                  setModal("view");
                                }}
                                aria-label="View details"
                                title="View details"
                              >
                                <Icon name="eye" />
                              </button>
                              {status !== "Returned" && (
                                <>
                                  <button
                                    type="button"
                                    className="borrowing-action"
                                    onClick={() => openForm(record)}
                                    aria-label="Edit record"
                                    title="Edit record"
                                  >
                                    <Icon name="edit" />
                                  </button>
                                  <button
                                    type="button"
                                    className="borrowing-action"
                                    onClick={() => {
                                      setSelectedRecord(record);
                                      setModal("return");
                                    }}
                                    aria-label="Return book"
                                    title="Return book"
                                  >
                                    <Icon name="return" />
                                  </button>
                                  <button
                                    type="button"
                                    className="borrowing-action"
                                    onClick={() => {
                                      setSelectedRecord(record);
                                      setModal("extend");
                                    }}
                                    aria-label="Extend due date"
                                    title="Extend due date"
                                  >
                                    <Icon name="calendar" />
                                  </button>
                                </>
                              )}
                              <button
                                type="button"
                                className="borrowing-action borrowing-action--danger"
                                onClick={() => {
                                  setSelectedRecord(record);
                                  setModal("delete");
                                }}
                                aria-label="Delete record"
                                title="Delete record"
                              >
                                <Icon name="trash" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7">
                        <div className="borrowing-empty">
                          <Icon name="search" />
                          <h3>No borrowing records found</h3>
                          <p>
                            Try adjusting your search or filters to find a
                            different record.
                          </p>
                          <button
                            type="button"
                            className="borrowing-link-btn"
                            onClick={clearFilters}
                          >
                            Clear all filters
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <footer className="borrowing-footer">
              <label className="borrowing-page-size">
                Rows per page{" "}
                <select
                  value={pageSize}
                  onChange={(event) => setPageSize(Number(event.target.value))}
                >
                  {PAGE_SIZE_OPTIONS.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </label>
              <span>
                {filteredRecords.length
                  ? `${(page - 1) * pageSize + 1}-${Math.min(page * pageSize, filteredRecords.length)} of ${filteredRecords.length}`
                  : "0 records"}
              </span>
              <div className="borrowing-pagination">
                <button
                  type="button"
                  className="borrowing-page-btn"
                  disabled={page === 1}
                  onClick={() => setPage((current) => current - 1)}
                >
                  ‹
                </button>
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((number) => (
                  <button
                    type="button"
                    className={`borrowing-page-btn ${page === number ? "active" : ""}`}
                    key={number}
                    onClick={() => setPage(number)}
                  >
                    {number}
                  </button>
                ))}
                <button
                  type="button"
                  className="borrowing-page-btn"
                  disabled={page === totalPages}
                  onClick={() => setPage((current) => current + 1)}
                >
                  ›
                </button>
              </div>
            </footer>
          </section>
        </div>
      </div>

      {modal && (
        <div
          className="borrowing-backdrop"
          role="presentation"
          onMouseDown={(event) =>
            event.target === event.currentTarget && resetModal()
          }
        >
          <div
            className="borrowing-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="borrowing-modal-title"
          >
            {(modal === "form" || modal === "edit") && (
              <form onSubmit={submitForm}>
                <div className="borrowing-modal-header">
                  <div>
                    <p className="borrowing-kicker">
                      {modal === "edit"
                        ? "UPDATE TRANSACTION"
                        : "NEW TRANSACTION"}
                    </p>
                    <h3 id="borrowing-modal-title">
                      {modal === "edit"
                        ? "Edit borrowing record"
                        : "Add borrowing record"}
                    </h3>
                  </div>
                  <button
                    type="button"
                    className="borrowing-close"
                    onClick={resetModal}
                    aria-label="Close"
                  >
                    <Icon name="close" />
                  </button>
                </div>
                <div className="borrowing-modal-body">
                  <div className="borrowing-form-grid">
                    <div className="borrowing-field">
                      <label htmlFor="borrowing-student">Student</label>
                      <select
                        id="borrowing-student"
                        required
                        value={form.studentId}
                        onChange={(event) =>
                          setForm({ ...form, studentId: event.target.value })
                        }
                      >
                        <option value="">Select a student</option>
                        {students.map((student) => (
                          <option key={student.id} value={student.id}>
                            {student.name} ({student.id})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="borrowing-field">
                      <label htmlFor="borrowing-book">Book</label>
                      <select
                        id="borrowing-book"
                        required
                        value={form.bookId}
                        onChange={(event) =>
                          setForm({ ...form, bookId: event.target.value })
                        }
                      >
                        <option value="">Select a book</option>
                        {books.map((book) => (
                          <option key={book.id} value={book.id}>
                            {book.title} ({book.id})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="borrowing-field">
                      <label htmlFor="borrow-date">Borrow date</label>
                      <input
                        id="borrow-date"
                        required
                        type="date"
                        value={form.borrowDate}
                        onChange={(event) =>
                          setForm({ ...form, borrowDate: event.target.value })
                        }
                      />
                    </div>
                    <div className="borrowing-field">
                      <label htmlFor="due-date">Due date</label>
                      <input
                        id="due-date"
                        required
                        type="date"
                        value={form.dueDate}
                        onChange={(event) =>
                          setForm({ ...form, dueDate: event.target.value })
                        }
                      />
                    </div>
                    <div className="borrowing-field borrowing-field--full">
                      <label htmlFor="borrowing-notes">
                        Notes <span className="borrowing-meta">(optional)</span>
                      </label>
                      <textarea
                        id="borrowing-notes"
                        value={form.notes}
                        onChange={(event) =>
                          setForm({ ...form, notes: event.target.value })
                        }
                        placeholder="Add a note about this borrowing record"
                      />
                    </div>
                  </div>
                </div>
                <div className="borrowing-modal-actions">
                  <button
                    type="button"
                    className="borrowing-secondary"
                    onClick={resetModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="borrowing-primary">
                    {modal === "edit" ? "Save changes" : "Add record"}
                  </button>
                </div>
              </form>
            )}
            {modal === "view" && (
              <>
                <div className="borrowing-modal-header">
                  <div>
                    <p className="borrowing-kicker">RECORD DETAILS</p>
                    <h3 id="borrowing-modal-title">
                      {selectedRecord.studentName}
                    </h3>
                  </div>
                  <button
                    type="button"
                    className="borrowing-close"
                    onClick={resetModal}
                    aria-label="Close"
                  >
                    <Icon name="close" />
                  </button>
                </div>
                <div className="borrowing-modal-body">
                  <div className="borrowing-detail-grid">
                    <div>
                      <span className="borrowing-detail-label">Student ID</span>
                      <p className="borrowing-detail-value">
                        {selectedRecord.studentId}
                      </p>
                    </div>
                    <div>
                      <span className="borrowing-detail-label">Book ID</span>
                      <p className="borrowing-detail-value">
                        {selectedRecord.bookId}
                      </p>
                    </div>
                    <div>
                      <span className="borrowing-detail-label">Book title</span>
                      <p className="borrowing-detail-value">
                        {selectedRecord.bookTitle}
                      </p>
                    </div>
                    <div>
                      <span className="borrowing-detail-label">Status</span>
                      <p className="borrowing-detail-value">
                        <span
                          className={`borrowing-status borrowing-status--${selectedRecord.status.toLowerCase()}`}
                        >
                          {selectedRecord.status}
                        </span>
                      </p>
                    </div>
                    <div>
                      <span className="borrowing-detail-label">
                        Borrow date
                      </span>
                      <p className="borrowing-detail-value">
                        {formatDate(selectedRecord.borrowDate)}
                      </p>
                    </div>
                    <div>
                      <span className="borrowing-detail-label">Due date</span>
                      <p className="borrowing-detail-value">
                        {formatDate(selectedRecord.dueDate)}
                      </p>
                    </div>
                    <div>
                      <span className="borrowing-detail-label">
                        Returned date
                      </span>
                      <p className="borrowing-detail-value">
                        {formatDate(selectedRecord.returnedDate)}
                      </p>
                    </div>
                    <div>
                      <span className="borrowing-detail-label">Days</span>
                      <p className="borrowing-detail-value">
                        {getDaysLabel(selectedRecord)}
                      </p>
                    </div>
                    <div className="borrowing-field--full">
                      <span className="borrowing-detail-label">Notes</span>
                      <p className="borrowing-detail-value">
                        {selectedRecord.notes || "No notes added."}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="borrowing-modal-actions">
                  <button
                    type="button"
                    className="borrowing-secondary"
                    onClick={resetModal}
                  >
                    Close
                  </button>
                </div>
              </>
            )}
            {(modal === "return" || modal === "delete") && (
              <>
                <div className="borrowing-modal-header">
                  <div>
                    <p className="borrowing-kicker">
                      {modal === "return" ? "RETURN BOOK" : "DELETE RECORD"}
                    </p>
                    <h3 id="borrowing-modal-title">
                      {modal === "return"
                        ? "Confirm book return"
                        : "Delete borrowing record"}
                    </h3>
                  </div>
                  <button
                    type="button"
                    className="borrowing-close"
                    onClick={resetModal}
                    aria-label="Close"
                  >
                    <Icon name="close" />
                  </button>
                </div>
                <div className="borrowing-modal-body">
                  <p className="borrowing-confirm-copy">
                    {modal === "return" ? (
                      <>
                        Mark <strong>{selectedRecord.bookTitle}</strong> as
                        returned by{" "}
                        <strong>{selectedRecord.studentName}</strong> today?
                      </>
                    ) : (
                      <>
                        This will permanently delete the borrowing record for{" "}
                        <strong>{selectedRecord.studentName}</strong> and cannot
                        be undone.
                      </>
                    )}
                  </p>
                </div>
                <div className="borrowing-modal-actions">
                  <button
                    type="button"
                    className="borrowing-secondary"
                    onClick={resetModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className={`borrowing-primary ${modal === "delete" ? "borrowing-danger-btn" : ""}`}
                    onClick={modal === "return" ? confirmReturn : confirmDelete}
                  >
                    {modal === "return" ? "Confirm return" : "Delete record"}
                  </button>
                </div>
              </>
            )}
            {modal === "extend" && (
              <form onSubmit={extendDueDate}>
                <div className="borrowing-modal-header">
                  <div>
                    <p className="borrowing-kicker">SCHEDULE UPDATE</p>
                    <h3 id="borrowing-modal-title">Extend due date</h3>
                  </div>
                  <button
                    type="button"
                    className="borrowing-close"
                    onClick={resetModal}
                    aria-label="Close"
                  >
                    <Icon name="close" />
                  </button>
                </div>
                <div className="borrowing-modal-body">
                  <p className="borrowing-confirm-copy">
                    Choose a new due date for{" "}
                    <strong>{selectedRecord.bookTitle}</strong>. Current due
                    date: <strong>{formatDate(selectedRecord.dueDate)}</strong>.
                  </p>
                  <div className="borrowing-field" style={{ marginTop: 18 }}>
                    <label htmlFor="new-due-date">New due date</label>
                    <input
                      id="new-due-date"
                      name="newDueDate"
                      required
                      type="date"
                      defaultValue={selectedRecord.dueDate}
                    />
                  </div>
                </div>
                <div className="borrowing-modal-actions">
                  <button
                    type="button"
                    className="borrowing-secondary"
                    onClick={resetModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="borrowing-primary">
                    Extend date
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      {toast && (
        <div
          className={`borrowing-toast ${toast.tone === "error" ? "borrowing-toast--error" : ""}`}
          role="status"
        >
          <Icon name={toast.tone === "error" ? "alert" : "check"} />
          {toast.message}
        </div>
      )}
    </>
  );
}

export default Borrowing;
