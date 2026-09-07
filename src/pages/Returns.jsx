import { useEffect, useMemo, useState } from "react";
import { getDateOnly, getLoanDetails, useLibraryData } from "../data/LibraryDataContext";

const PAGE_SIZE = 10;
const formatDate = (value) => new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${value}T00:00:00`));
const getStatusClass = (status) => `returns-status returns-status--${status.toLowerCase()}`;

const SearchIcon = () => <span className="returns-search-icon" aria-hidden="true">⌕</span>;
const AlertIcon = () => (
  <svg className="returns-alert-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="m12 3 9 17H3L12 3Z" />
    <path d="M12 9v5M12 17h.01" />
  </svg>
);
const BooksSummaryIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4.5 5.5A2.5 2.5 0 0 1 7 3h5v16H7a2.5 2.5 0 0 0-2.5 2V5.5Z" />
    <path d="M19.5 5.5A2.5 2.5 0 0 0 17 3h-5v16h5a2.5 2.5 0 0 1 2.5 2V5.5Z" />
  </svg>
);
const OverdueSummaryIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);
const FineSummaryIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <ellipse cx="12" cy="6" rx="7" ry="3" />
    <path d="M5 6v5c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
    <path d="M5 11v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" />
  </svg>
);

function Returns() {
  const { loans, returnLoan } = useLibraryData();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const today = getDateOnly();
  const detailedLoans = useMemo(() => loans.map((loan) => getLoanDetails(loan, today)), [loans, today]);
  const pendingRecords = detailedLoans.filter((record) => record.status === "Active" || record.status === "Overdue");
  const overdueRecords = pendingRecords.filter((record) => record.status === "Overdue");
  const pendingFines = detailedLoans.reduce(
    (total, record) => total + (record.fineStatus === "Unpaid" ? record.fine : 0),
    0
  );
  const filteredRecords = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return pendingRecords.filter((record) => {
      const matchesSearch = !query || [record.studentName, record.studentId, record.bookTitle, record.author, record.loanId].some((value) => value.toLowerCase().includes(query));
      return matchesSearch && (statusFilter === "All Status" || record.status === statusFilter);
    });
  }, [pendingRecords, searchTerm, statusFilter]);
  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / PAGE_SIZE));
  const visibleRecords = filteredRecords.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => setCurrentPage(1), [searchTerm, statusFilter]);
  useEffect(() => { if (currentPage > totalPages) setCurrentPage(totalPages); }, [currentPage, totalPages]);

  const confirmReturn = () => {
    if (!selectedRecord) return;
    returnLoan(selectedRecord.loanId, getDateOnly());
    setSelectedRecord(null);
  };

  return (
    <>
      <style>{`
        .returns-page { min-height: calc(100vh - 92px); padding: 24px; background: #f4f7fb; color: #1f3448; box-sizing: border-box; }
        .returns-panel { background: #fff; border: 1px solid #e3eaf2; border-radius: 16px; box-shadow: 0 3px 12px rgba(31,52,72,.04); overflow: hidden; }
        .returns-heading { padding: 24px 24px 18px; border-bottom: 1px solid #edf1f5; } .returns-heading h2 { margin: 0; color: #20364a; font-size: 20px; } .returns-heading p { margin: 6px 0 0; color: #8a9bad; font-size: 13px; }
        .returns-summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 20px 24px 0; } .returns-summary-card { display: flex; align-items: center; gap: 16px; min-width: 0; padding: 17px 19px; border: 1px solid #e5edf5; border-radius: 12px; background: #f8fbff; } .returns-summary-card--overdue { border-color: #f3d9d9; background: #fffafa; } .returns-summary-card--fine { border-color: #f2e3c7; background: #fffdf8; } .returns-summary-icon { display: grid; place-items: center; flex: 0 0 56px; width: 56px; height: 56px; border-radius: 50%; } .returns-summary-icon svg { width: 28px; height: 28px; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.9; } .returns-summary-icon--books { background: rgba(93, 160, 235, .16); color: #1672c4; } .returns-summary-icon--overdue { background: rgba(238, 91, 104, .16); color: #c92d3d; } .returns-summary-icon--fine { background: rgba(235, 177, 64, .2); color: #b2760d; } .returns-summary-label { margin: 0; color: #65809a; font-size: 11px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; } .returns-summary-value { margin: 5px 0 0; color: #1f3448; font-size: 28px; font-weight: 700; line-height: 1.05; } .returns-summary-helper { margin: 5px 0 0; color: #8295a8; font-size: 12px; } .returns-summary-card--overdue .returns-summary-value { color: #b43348; } .returns-summary-card--fine .returns-summary-value { color: #b97a1f; }
        .returns-alert { display: flex; align-items: center; gap: 10px; margin: 20px 24px 0; padding: 12px 14px; border: 1px solid #f1d8a7; border-radius: 9px; background: #fff8e8; color: #9a671a; font-size: 13px; font-weight: 600; } .returns-alert-icon { width: 21px; height: 21px; flex: 0 0 21px; fill: none; stroke: #d79221; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
        .returns-controls { display: flex; justify-content: space-between; align-items: end; gap: 16px; padding: 20px 24px 0; flex-wrap: wrap; } .returns-search { display: flex; align-items: center; gap: 10px; flex: 1; max-width: 460px; min-width: 230px; padding: 10px 14px; border: 1px solid #dfe7ef; border-radius: 10px; background: #f8fafc; } .returns-search:focus-within { border-color: rgba(74,144,226,.42); box-shadow: 0 0 0 3px rgba(74,144,226,.1); } .returns-search-icon { color: #8193a6; font-size: 20px; line-height: 1; } .returns-search input { width: 100%; border: 0; outline: 0; background: transparent; color: #102334; font: inherit; font-size: 14px; } .returns-filter { display: flex; flex-direction: column; gap: 8px; min-width: 180px; color: #52677d; font-size: 12px; font-weight: 600; } .returns-filter select { padding: 10px 12px; border: 1px solid #dfe7ef; border-radius: 8px; background: #f8fafc; color: #102334; font: inherit; }
        .returns-table-wrap { width: 100%; padding: 20px 24px 0; box-sizing: border-box; overflow: hidden; } .returns-table { width: 100%; table-layout: fixed; border-collapse: collapse; text-align: left; } .returns-table th { padding: 12px 10px; border-top: 1px solid #edf1f5; border-bottom: 1px solid #e7edf3; color: #8495a6; font-size: 10px; letter-spacing: .6px; text-transform: uppercase; } .returns-table td { padding: 13px 10px; border-bottom: 1px solid #edf1f5; color: #40566b; font-size: 12px; vertical-align: middle; overflow: hidden; } .returns-table th:nth-child(1) { width: 8%; } .returns-table th:nth-child(2) { width: 17%; } .returns-table th:nth-child(3) { width: 19%; } .returns-table th:nth-child(4), .returns-table th:nth-child(5) { width: 11%; } .returns-table th:nth-child(6) { width: 8%; } .returns-table th:nth-child(7) { width: 8%; } .returns-table th:nth-child(8) { width: 10%; } .returns-table th:nth-child(9) { width: 9%; }
        .returns-student { display: flex; align-items: center; gap: 8px; min-width: 0; } .returns-avatar { display: grid; place-items: center; flex: 0 0 30px; width: 30px; height: 30px; border-radius: 50%; background: #dfeaf5; color: #2d536f; font-size: 10px; font-weight: 700; } .returns-cell-main { min-width: 0; } .returns-cell-main strong, .returns-cell-main span { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; } .returns-cell-main strong { color: #294157; font-size: 12px; } .returns-cell-main span { margin-top: 3px; color: #8b9db1; font-size: 11px; }
        .returns-days--future { color: #2d8a5f; font-weight: 700; } .returns-days--soon { color: #b97a1f; font-weight: 700; } .returns-days--overdue, .returns-fine--overdue { color: #b43348; font-weight: 700; } .returns-status { display: inline-flex; align-items: center; gap: 6px; padding: 6px 9px; border-radius: 999px; font-size: 10px; font-weight: 700; white-space: nowrap; } .returns-status::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: currentColor; } .returns-status--active { background: #eaf8ee; color: #2d8a5f; } .returns-status--overdue { background: #fff1f3; color: #b43348; } .returns-button { padding: 7px 11px; border: 0; border-radius: 7px; background: #eaf8ee; color: #2d8a5f; font: inherit; font-size: 11px; font-weight: 700; cursor: pointer; } .returns-button:hover { background: #d7f1df; }
        .returns-empty { padding: 48px 20px; text-align: center; } .returns-empty h3 { margin: 0; color: #20364a; font-size: 20px; } .returns-empty p { margin: 8px 0 0; color: #71869a; font-size: 13px; } .returns-footer { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 18px 24px 24px; color: #607389; font-size: 12px; } .returns-pagination { display: flex; gap: 8px; } .returns-page-button { min-width: 34px; height: 34px; padding: 0 9px; border: 1px solid #dfeaf5; border-radius: 8px; background: #eef4fb; color: #2d536f; font: inherit; cursor: pointer; } .returns-page-button--active { background: #334e68; border-color: #334e68; color: #fff; } .returns-page-button:disabled { cursor: not-allowed; opacity: .5; }
        .returns-modal-backdrop { position: fixed; inset: 0; z-index: 20; display: grid; place-items: center; padding: 20px; background: rgba(15,23,42,.45); } .returns-modal { width: min(100%, 480px); overflow: hidden; border: 1px solid #dfe7ef; border-radius: 16px; background: #fff; box-shadow: 0 20px 40px rgba(15,23,42,.2); } .returns-modal-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 22px 16px; border-bottom: 1px solid #edf1f5; } .returns-modal-header h3 { margin: 0; color: #20364a; font-size: 19px; } .returns-modal-close { width: 32px; height: 32px; border: 0; border-radius: 8px; background: #f3f7fb; color: #52677d; font-size: 20px; cursor: pointer; } .returns-modal-content { padding: 20px 22px; color: #40566b; line-height: 1.6; } .returns-modal-content p { margin: 0; } .returns-modal-fine { margin-top: 12px !important; padding: 10px 12px; border-radius: 8px; background: #fff1f3; color: #b43348; font-size: 13px; font-weight: 700; } .returns-modal-actions { display: flex; justify-content: flex-end; gap: 10px; padding: 0 22px 22px; } .returns-modal-actions button { padding: 10px 16px; border: 0; border-radius: 8px; font: inherit; font-weight: 700; cursor: pointer; } .returns-cancel { background: #eef4fb; color: #2d536f; } .returns-confirm { background: #2d8a5f; color: #fff; }
        @media (max-width: 900px) { .returns-table th:nth-child(4), .returns-table td:nth-child(4), .returns-table th:nth-child(6), .returns-table td:nth-child(6) { display: none; } .returns-table th:nth-child(5) { width: 13%; } } @media (max-width: 680px) { .returns-page { padding: 16px; } .returns-summary { grid-template-columns: 1fr; } .returns-controls { align-items: stretch; } .returns-search { max-width: none; } .returns-filter { min-width: 0; } .returns-table th, .returns-table td { padding-left: 6px; padding-right: 6px; } .returns-table th:nth-child(5), .returns-table td:nth-child(5), .returns-table th:nth-child(7), .returns-table td:nth-child(7) { display: none; } .returns-table th:nth-child(2) { width: 25%; } .returns-table th:nth-child(3) { width: 29%; } .returns-table th:nth-child(8) { width: 17%; } .returns-table th:nth-child(9) { width: 18%; } .returns-footer { align-items: flex-start; flex-direction: column; } }
      `}</style>
      <div className="returns-page"><div className="returns-panel">
        <div className="returns-heading"><h2>Books Pending Return</h2><p>Track active loans, overdue books, and outstanding fines.</p></div>
        <section className="returns-summary" aria-label="Return summary"><div className="returns-summary-card"><span className="returns-summary-icon returns-summary-icon--books"><BooksSummaryIcon /></span><div><p className="returns-summary-label">Books Checked Out</p><p className="returns-summary-value">{pendingRecords.length}</p><p className="returns-summary-helper">Currently on loan</p></div></div><div className="returns-summary-card returns-summary-card--overdue"><span className="returns-summary-icon returns-summary-icon--overdue"><OverdueSummaryIcon /></span><div><p className="returns-summary-label">Overdue Books</p><p className="returns-summary-value">{overdueRecords.length}</p><p className="returns-summary-helper">Need immediate attention</p></div></div><div className="returns-summary-card returns-summary-card--fine"><span className="returns-summary-icon returns-summary-icon--fine"><FineSummaryIcon /></span><div><p className="returns-summary-label">Total Pending Fines</p><p className="returns-summary-value">${pendingFines.toFixed(2)}</p><p className="returns-summary-helper">To be collected</p></div></div></section>
        {overdueRecords.length > 0 && <div className="returns-alert"><AlertIcon />{overdueRecords.length} overdue books — please contact the respective students.</div>}
        <div className="returns-controls"><label className="returns-search"><SearchIcon /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search by student or book..." aria-label="Search pending returns" /></label><label className="returns-filter">Status<select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filter returns by status"><option>All Status</option><option>Active</option><option>Overdue</option></select></label></div>
        <div className="returns-table-wrap"><table className="returns-table"><thead><tr><th>Loan ID</th><th>Student</th><th>Book</th><th>Borrow Date</th><th>Due Date</th><th>Days</th><th>Fine</th><th>Status</th><th>Action</th></tr></thead><tbody>{visibleRecords.length === 0 ? <tr><td colSpan="9"><div className="returns-empty"><h3>No pending returns</h3><p>All books have been returned.</p></div></td></tr> : visibleRecords.map((record) => { const initials = record.studentName.split(" ").map((part) => part[0]).slice(0, 2).join(""); const daysClass = record.status === "Overdue" ? "returns-days--overdue" : record.days <= 3 ? "returns-days--soon" : "returns-days--future"; const daysLabel = record.status === "Overdue" ? `${record.overdueDays} ${record.overdueDays === 1 ? "day" : "days"} late` : record.days === 0 ? "Due today" : `${record.days} ${record.days === 1 ? "day" : "days"} remaining`; return <tr key={record.loanId}><td>{record.loanId}</td><td><div className="returns-student"><span className="returns-avatar" aria-hidden="true">{initials}</span><div className="returns-cell-main"><strong>{record.studentName}</strong><span>{record.studentId}</span></div></div></td><td><div className="returns-cell-main"><strong>{record.bookTitle}</strong><span>{record.author}</span></div></td><td>{formatDate(record.borrowDate)}</td><td>{formatDate(record.dueDate)}</td><td className={daysClass}>{daysLabel}</td><td className={record.fine ? "returns-fine--overdue" : ""}>{record.fine ? `$${record.fine.toFixed(2)}` : "—"}</td><td><span className={getStatusClass(record.status)}>{record.status}</span></td><td><button type="button" className="returns-button" onClick={() => setSelectedRecord(record)} aria-label={`Return ${record.bookTitle} from ${record.studentName}`}>Return</button></td></tr>; })}</tbody></table></div>
        <footer className="returns-footer"><span>Showing {filteredRecords.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}-{Math.min(currentPage * PAGE_SIZE, filteredRecords.length)} of {filteredRecords.length} returns</span><div className="returns-pagination" aria-label="Returns pagination"><button type="button" className="returns-page-button" disabled={currentPage === 1} onClick={() => setCurrentPage((page) => page - 1)}>Prev</button>{Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => <button type="button" key={page} className={`returns-page-button ${page === currentPage ? "returns-page-button--active" : ""}`} onClick={() => setCurrentPage(page)}>{page}</button>)}<button type="button" className="returns-page-button" disabled={currentPage === totalPages} onClick={() => setCurrentPage((page) => page + 1)}>Next</button></div></footer>
      </div></div>
      {selectedRecord && <div className="returns-modal-backdrop" onClick={() => setSelectedRecord(null)}><div className="returns-modal" role="dialog" aria-modal="true" aria-labelledby="return-dialog-title" onClick={(event) => event.stopPropagation()}><div className="returns-modal-header"><h3 id="return-dialog-title">Confirm Book Return</h3><button type="button" className="returns-modal-close" onClick={() => setSelectedRecord(null)} aria-label="Close return confirmation">×</button></div><div className="returns-modal-content"><p>Return <strong>{selectedRecord.bookTitle}</strong> from <strong>{selectedRecord.studentName}</strong>?</p><p>Return date: <strong>{formatDate(getDateOnly())}</strong></p>{selectedRecord.fine > 0 && <p className="returns-modal-fine">This book is {selectedRecord.overdueDays} days overdue. Applicable fine: ${selectedRecord.fine.toFixed(2)} (Unpaid).</p>}</div><div className="returns-modal-actions"><button type="button" className="returns-cancel" onClick={() => setSelectedRecord(null)}>Cancel</button><button type="button" className="returns-confirm" onClick={confirmReturn}>Confirm Return</button></div></div></div>}
    </>
  );
}

export default Returns;