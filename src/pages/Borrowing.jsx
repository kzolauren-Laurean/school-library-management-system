import { useMemo, useState } from "react";

const initialRecords = [
	{ id: "BR-1001", studentName: "Anya Petrov", studentId: "ST-1023", bookTitle: "Linear Algebra and Its Applications", bookId: "BK-2041", borrowDate: "Aug 25, 2026", dueDate: "Sep 8, 2026", status: "Active" },
	{ id: "BR-1002", studentName: "Kwame Asante", studentId: "ST-1042", bookTitle: "Anatomy: A Photographic Atlas", bookId: "BK-1820", borrowDate: "Jul 21, 2026", dueDate: "Aug 8, 2026", status: "Overdue" },
	{ id: "BR-1003", studentName: "Mei Lin Zhou", studentId: "ST-1019", bookTitle: "Database System Concepts", bookId: "BK-1198", borrowDate: "Aug 23, 2026", dueDate: "Sep 6, 2026", status: "Active" },
	{ id: "BR-1004", studentName: "Aisha Patel", studentId: "ST-1001", bookTitle: "Introduction to Algorithms", bookId: "BK-2004", borrowDate: "Aug 2, 2026", dueDate: "Aug 16, 2026", status: "Returned" },
	{ id: "BR-1005", studentName: "Marcus Chen", studentId: "ST-1002", bookTitle: "Organic Chemistry", bookId: "BK-1357", borrowDate: "Aug 21, 2026", dueDate: "Sep 4, 2026", status: "Active" },
];

const statusClass = {
	Active: "borrowing-status borrowing-status--active",
	Overdue: "borrowing-status borrowing-status--overdue",
	Returned: "borrowing-status borrowing-status--returned",
};

function Borrowing() {
	const [records, setRecords] = useState(initialRecords);
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState("All statuses");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [form, setForm] = useState({ studentId: "", bookId: "" });

	const filteredRecords = useMemo(() => {
		const query = search.trim().toLowerCase();
		return records.filter((record) => {
			const matchesSearch = !query || [record.studentName, record.studentId, record.bookTitle, record.bookId]
				.some((value) => value.toLowerCase().includes(query));
			return matchesSearch && (statusFilter === "All statuses" || record.status === statusFilter);
		});
	}, [records, search, statusFilter]);

	const stats = [
		{ label: "Total Borrowed Books", value: records.filter((record) => record.status !== "Returned").length, tone: "blue", icon: "↔" },
		{ label: "Overdue Books", value: records.filter((record) => record.status === "Overdue").length, tone: "red", icon: "!" },
		{ label: "Active Borrowers", value: new Set(records.filter((record) => record.status !== "Returned").map((record) => record.studentId)).size, tone: "green", icon: "♙" },
	];

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!form.studentId.trim() || !form.bookId.trim()) return;
		setRecords((current) => [{ id: `BR-${Date.now()}`, studentName: "New student", studentId: form.studentId.trim(), bookTitle: "New book", bookId: form.bookId.trim(), borrowDate: "Sep 4, 2026", dueDate: "Sep 18, 2026", status: "Active" }, ...current]);
		setForm({ studentId: "", bookId: "" });
		setIsModalOpen(false);
	};

	return (
		<div className="borrowing-page">
			<div className="borrowing-toolbar">
				<div><p className="borrowing-eyebrow">CIRCULATION</p><h2 className="borrowing-heading">Borrowing records</h2><p className="borrowing-subtitle">Track books currently moving through the library.</p></div>
				<button type="button" className="borrowing-add-button" onClick={() => setIsModalOpen(true)}><span aria-hidden="true">+</span> Add Borrowing Record</button>
			</div>
			<section className="borrowing-stats" aria-label="Borrowing statistics">
				{stats.map((stat) => <div className={`borrowing-stat borrowing-stat--${stat.tone}`} key={stat.label}><div className="borrowing-stat-icon" aria-hidden="true">{stat.icon}</div><div><p className="borrowing-stat-value">{stat.value}</p><p className="borrowing-stat-label">{stat.label}</p></div></div>)}
			</section>
			<section className="borrowing-card">
				<div className="borrowing-card-header"><div><h2 className="borrowing-card-title">All borrowing records</h2><p className="borrowing-card-subtitle">{filteredRecords.length} records found</p></div><div className="borrowing-filters"><label className="borrowing-search"><span aria-hidden="true">⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search student or book" aria-label="Search by student or book" /></label><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filter by status"><option>All statuses</option><option>Active</option><option>Overdue</option><option>Returned</option></select></div></div>
				<div className="borrowing-table-wrap"><table className="borrowing-table"><thead><tr><th>Student</th><th>Book title</th><th>Borrow date</th><th>Due date</th><th>Status</th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>{filteredRecords.map((record) => <tr key={record.id}><td><strong>{record.studentName}</strong><span>{record.studentId}</span></td><td><strong>{record.bookTitle}</strong><span>{record.bookId}</span></td><td>{record.borrowDate}</td><td>{record.dueDate}</td><td><span className={statusClass[record.status]}>{record.status}</span></td><td><div className="borrowing-actions">{record.status !== "Returned" && <button type="button" onClick={() => setRecords((current) => current.map((item) => item.id === record.id ? { ...item, status: "Returned" } : item))}>Return</button>}<button type="button" className="borrowing-delete" onClick={() => setRecords((current) => current.filter((item) => item.id !== record.id))}>Delete</button></div></td></tr>)}</tbody></table>{!filteredRecords.length && <p className="borrowing-empty">No borrowing records match your filters.</p>}</div>
			</section>
			{isModalOpen && <div className="borrowing-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setIsModalOpen(false)}><form className="borrowing-modal" onSubmit={handleSubmit}><div className="borrowing-modal-header"><div><p className="borrowing-eyebrow">NEW TRANSACTION</p><h2>Add borrowing record</h2></div><button type="button" className="borrowing-close" onClick={() => setIsModalOpen(false)} aria-label="Close modal">×</button></div><label>Student ID<input required value={form.studentId} onChange={(event) => setForm({ ...form, studentId: event.target.value })} placeholder="e.g. ST-1042" /></label><label>Book ID<input required value={form.bookId} onChange={(event) => setForm({ ...form, bookId: event.target.value })} placeholder="e.g. BK-1820" /></label><div className="borrowing-modal-actions"><button type="button" className="borrowing-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button><button type="submit" className="borrowing-add-button">Add record</button></div></form></div>}
		</div>
	);
}

export default Borrowing;
