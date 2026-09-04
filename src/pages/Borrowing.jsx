import { useMemo, useState } from "react";

const initialRecords = [
  {
    id: "BR-1001",
    studentName: "Anya Petrov",
    studentId: "ST-1023",
    bookTitle: "Linear Algebra and Its Applications",
    bookId: "BK-2041",
    borrowDate: "2026-08-25",
    dueDate: "2026-09-08",
    status: "Active",
  },
  {
    id: "BR-1002",
    studentName: "Kwame Asante",
    studentId: "ST-1042",
    bookTitle: "Anatomy: A Photographic Atlas",
    bookId: "BK-1820",
    borrowDate: "2026-07-21",
    dueDate: "2026-08-08",
    status: "Active",
  },
  {
    id: "BR-1003",
    studentName: "Mei Lin Zhou",
    studentId: "ST-1019",
    bookTitle: "Database System Concepts",
    bookId: "BK-1198",
    borrowDate: "2026-08-23",
    dueDate: "2026-09-06",
    status: "Active",
  },
  {
    id: "BR-1004",
    studentName: "Aisha Patel",
    studentId: "ST-1001",
    bookTitle: "Introduction to Algorithms",
    bookId: "BK-2004",
    borrowDate: "2026-08-02",
    dueDate: "2026-08-16",
    status: "Returned",
  },
  {
    id: "BR-1005",
    studentName: "Marcus Chen",
    studentId: "ST-1002",
    bookTitle: "Organic Chemistry",
    bookId: "BK-1357",
    borrowDate: "2026-08-21",
    dueDate: "2026-09-04",
    status: "Active",
  },
];

const emptyForm = {
  studentName: "",
  studentId: "",
  bookTitle: "",
  bookId: "",
  borrowDate: "",
  dueDate: "",
};
const statusClass = {
  Active: "borrowing-status borrowing-status--active",
  Overdue: "borrowing-status borrowing-status--overdue",
  Returned: "borrowing-status borrowing-status--returned",
};
const today = new Date().toISOString().slice(0, 10);
const formatDate = (date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));

const addDays = (date, days) => {
  if (!date) return "";
  const nextDate = new Date(`${date}T00:00:00`);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate.toISOString().slice(0, 10);
};

function Borrowing() {
  const [records, setRecords] = useState(initialRecords);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modalMode, setModalMode] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [dueDateEdited, setDueDateEdited] = useState(false);
  const [returnRecord, setReturnRecord] = useState(null);
  const [returnForm, setReturnForm] = useState({
    condition: "Good",
    fine: "0",
  });
  const [returnError, setReturnError] = useState("");
  const [successDialog, setSuccessDialog] = useState(null);

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();
    return records.filter((record) => {
      const matchesSearch =
        !query ||
        [
          record.studentName,
          record.studentId,
          record.bookTitle,
          record.bookId,
        ].some((value) => value.toLowerCase().includes(query));
      return (
        matchesSearch &&
        (statusFilter === "All" || record.status === statusFilter)
      );
    });
  }, [records, search, statusFilter]);

  const isOverdue = (record) =>
    record.status === "Overdue" ||
    (record.status === "Active" && record.dueDate < today);

  const stats = [
    {
      label: "Total Borrowed Books",
      value: records.filter((record) => record.status === "Active").length,
      tone: "blue",
      icon: "↔",
    },
    {
      label: "Overdue Books",
      value: records.filter((record) => isOverdue(record)).length,
      tone: "red",
      icon: "!",
    },
    {
      label: "Active Borrowers",
      value: new Set(
        records
          .filter((record) => record.status === "Active")
          .map((record) => record.studentId),
      ).size,
      tone: "green",
      icon: "♙",
    },
  ];

  const openAddModal = () => {
    setEditingId(null);
    setForm({ ...emptyForm, borrowDate: "2026-09-04", dueDate: "2026-09-18" });
    setErrors({});
    setDueDateEdited(false);
    setModalMode("add");
  };

  const openEditModal = (record) => {
    setEditingId(record.id);
    setForm({
      studentName: record.studentName,
      studentId: record.studentId,
      bookTitle: record.bookTitle,
      bookId: record.bookId,
      borrowDate: record.borrowDate,
      dueDate: record.dueDate,
    });
    setErrors({});
    setDueDateEdited(false);
    setModalMode("edit");
  };

  const closeModal = () => {
    setModalMode(null);
    setEditingId(null);
    setForm(emptyForm);
    setErrors({});
    setDueDateEdited(false);
  };

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const handleBorrowDateChange = (value) => {
    setForm((current) => ({
      ...current,
      borrowDate: value,
      ...(dueDateEdited ? {} : { dueDate: addDays(value, 14) }),
    }));
    setErrors((current) => ({ ...current, borrowDate: "", dueDate: "" }));
  };

  const isBookOutOfStock = (bookId) => {
    const numericBookId = bookId.match(/(\d+)$/)?.[1];
    return Boolean(numericBookId && Number(numericBookId) % 2 === 1);
  };

  const validateForm = () => {
    const nextErrors = Object.fromEntries(
      Object.entries(form)
        .filter(([, value]) => !value.trim())
        .map(([field]) => [field, "This field is required."]),
    );
    setErrors(nextErrors);
    const isOutOfStock = isBookOutOfStock(form.bookId);
    return Object.keys(nextErrors).length === 0 && !isOutOfStock;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    const recordData = {
      ...form,
      studentName: form.studentName.trim(),
      studentId: form.studentId.trim(),
      bookTitle: form.bookTitle.trim(),
      bookId: form.bookId.trim(),
    };
    if (editingId) {
      setRecords((current) =>
        current.map((record) =>
          record.id === editingId ? { ...record, ...recordData } : record,
        ),
      );
    } else {
      setRecords((current) => [
        { ...recordData, id: `BR-${Date.now()}`, status: "Active" },
        ...current,
      ]);
    }
    const savedStudent = recordData.studentName;
    const savedBook = recordData.bookTitle;
    closeModal();
    setSuccessDialog({
      title: `${savedStudent} has successfully borrowed '${savedBook}'!`,
      description: `${savedBook} is now assigned to ${savedStudent}.`,
      note: "Borrowing record saved successfully.",
    });
  };

  const handleDelete = (id) => {
    setRecords((current) => current.filter((record) => record.id !== id));
  };

  const openReturnModal = (record) => {
    setReturnRecord(record);
    setReturnForm({ condition: "Good", fine: "0" });
    setReturnError("");
  };

  const handleReturnSubmit = (event) => {
    event.preventDefault();
    const fine = Number(returnForm.fine);
    if (
      (returnForm.condition === "Damaged" || returnForm.condition === "Lost") &&
      fine <= 0
    ) {
      setReturnError(
        "A fine greater than $0 is required for damaged or lost books.",
      );
      return;
    }
    setRecords((current) =>
      current.map((record) =>
        record.id === returnRecord.id
          ? { ...record, status: "Returned" }
          : record,
      ),
    );
    const returnedRecord = returnRecord;
    setReturnRecord(null);
    setSuccessDialog({
      title: "Book Returned Successfully!",
      description: `${returnedRecord.bookTitle} was returned by ${returnedRecord.studentName}.`,
      note: `Condition: ${returnForm.condition} | Fine Collected: $${fine.toFixed(2)}`,
    });
  };

  const isFormComplete = Object.values(form).every((value) => value.trim());

  return (
    <div className="borrowing-page">
      <div className="borrowing-toolbar">
        <div>
          <p className="borrowing-eyebrow">CIRCULATION</p>
          <h2 className="borrowing-heading">Borrowing records</h2>
          <p className="borrowing-subtitle">
            Track books currently moving through the library.
          </p>
        </div>
        <button
          type="button"
          className="borrowing-add-button"
          onClick={openAddModal}
        >
          <span aria-hidden="true">+</span> Add Borrowing Record
        </button>
      </div>
      <section className="borrowing-stats" aria-label="Borrowing statistics">
        {stats.map((stat) => (
          <div
            className={`borrowing-stat borrowing-stat--${stat.tone}`}
            key={stat.label}
          >
            <div className="borrowing-stat-icon" aria-hidden="true">
              {stat.icon}
            </div>
            <div>
              <p className="borrowing-stat-value">{stat.value}</p>
              <p className="borrowing-stat-label">{stat.label}</p>
            </div>
          </div>
        ))}
      </section>
      <section className="borrowing-card">
        <div className="borrowing-card-header">
          <div>
            <h2 className="borrowing-card-title">All borrowing records</h2>
            <p className="borrowing-card-subtitle">
              {filteredRecords.length} records found
            </p>
          </div>
          <div className="borrowing-filters">
            <label className="borrowing-search">
              <span aria-hidden="true">⌕</span>
              <input
                className="borrowing-search-input"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search student or book"
                aria-label="Search by student or book"
              />
            </label>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Filter by status"
            >
              <option>All</option>
              <option>Active</option>
              <option>Returned</option>
            </select>
          </div>
        </div>
        <div className="borrowing-table-wrap">
          <table className="borrowing-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Book title</th>
                <th>Borrow date</th>
                <th>Due date</th>
                <th>Status</th>
                <th>
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr
                  key={record.id}
                  className={isOverdue(record) ? "borrowing-row--overdue" : ""}
                >
                  <td>
                    <strong>{record.studentName}</strong>
                    <span>{record.studentId}</span>
                  </td>
                  <td>
                    <strong>{record.bookTitle}</strong>
                    <span>{record.bookId}</span>
                  </td>
                  <td>{formatDate(record.borrowDate)}</td>
                  <td>{formatDate(record.dueDate)}</td>
                  <td>
                    <span
                      className={
                        statusClass[
                          isOverdue(record) ? "Overdue" : record.status
                        ]
                      }
                    >
                      {isOverdue(record) ? "Overdue" : record.status}
                    </span>
                  </td>
                  <td>
                    <div className="borrowing-actions">
                      <button
                        type="button"
                        onClick={() => openEditModal(record)}
                      >
                        Edit
                      </button>
                      {record.status === "Active" && (
                        <button
                          type="button"
                          onClick={() => openReturnModal(record)}
                        >
                          Return
                        </button>
                      )}
                      <button
                        type="button"
                        className="borrowing-delete"
                        onClick={() => handleDelete(record.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filteredRecords.length && (
            <p className="borrowing-empty">
              No borrowing records match your filters
            </p>
          )}
        </div>
      </section>
      {modalMode && (
        <div
          className="borrowing-modal-backdrop"
          role="presentation"
          onMouseDown={(event) =>
            event.target === event.currentTarget && closeModal()
          }
        >
          <form className="borrowing-modal" onSubmit={handleSubmit}>
            <div className="borrowing-modal-header">
              <div>
                <p className="borrowing-eyebrow">
                  {modalMode === "edit"
                    ? "UPDATE TRANSACTION"
                    : "NEW TRANSACTION"}
                </p>
                <h2>
                  {modalMode === "edit"
                    ? "Edit borrowing record"
                    : "Add borrowing record"}
                </h2>
              </div>
              <button
                type="button"
                className="borrowing-close"
                onClick={closeModal}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            <div className="borrowing-form-grid">
              <label>
                Student Name
                <input
                  required
                  className={
                    errors.studentName
                      ? "borrowing-input borrowing-input--error"
                      : "borrowing-input"
                  }
                  value={form.studentName}
                  aria-invalid={Boolean(errors.studentName)}
                  onChange={(event) =>
                    updateField("studentName", event.target.value)
                  }
                  onBlur={validateForm}
                  placeholder="e.g. Anya Petrov"
                />
                {errors.studentName && (
                  <small className="borrowing-field-error">
                    {errors.studentName}
                  </small>
                )}
              </label>
              <label>
                Student ID
                <input
                  required
                  className={
                    errors.studentId
                      ? "borrowing-input borrowing-input--error"
                      : "borrowing-input"
                  }
                  value={form.studentId}
                  aria-invalid={Boolean(errors.studentId)}
                  onChange={(event) =>
                    updateField("studentId", event.target.value)
                  }
                  onBlur={validateForm}
                  placeholder="e.g. ST-1042"
                />
                {errors.studentId && (
                  <small className="borrowing-field-error">
                    {errors.studentId}
                  </small>
                )}
              </label>
              <label>
                Book Title
                <input
                  required
                  className={
                    errors.bookTitle
                      ? "borrowing-input borrowing-input--error"
                      : "borrowing-input"
                  }
                  value={form.bookTitle}
                  aria-invalid={Boolean(errors.bookTitle)}
                  onChange={(event) =>
                    updateField("bookTitle", event.target.value)
                  }
                  onBlur={validateForm}
                  placeholder="e.g. Organic Chemistry"
                />
                {errors.bookTitle && (
                  <small className="borrowing-field-error">
                    {errors.bookTitle}
                  </small>
                )}
              </label>
              <label>
                Book ID
                <input
                  required
                  className={
                    errors.bookId || isBookOutOfStock(form.bookId)
                      ? "borrowing-input borrowing-input--error"
                      : "borrowing-input"
                  }
                  value={form.bookId}
                  aria-invalid={Boolean(errors.bookId)}
                  onChange={(event) =>
                    updateField("bookId", event.target.value)
                  }
                  onBlur={validateForm}
                  placeholder="e.g. BK-1820"
                />
                {errors.bookId && (
                  <small className="borrowing-field-error">
                    {errors.bookId}
                  </small>
                )}
                {isBookOutOfStock(form.bookId) && (
                  <small className="borrowing-field-error">
                    This book is currently out of stock.
                  </small>
                )}
              </label>
              <label>
                Borrow Date
                <input
                  required
                  type="date"
                  className={
                    errors.borrowDate
                      ? "borrowing-input borrowing-input--error"
                      : "borrowing-input"
                  }
                  value={form.borrowDate}
                  aria-invalid={Boolean(errors.borrowDate)}
                  onChange={(event) =>
                    handleBorrowDateChange(event.target.value)
                  }
                  onBlur={validateForm}
                />
                {errors.borrowDate && (
                  <small className="borrowing-field-error">
                    {errors.borrowDate}
                  </small>
                )}
              </label>
              <label>
                Due Date
                <input
                  required
                  type="date"
                  className={
                    errors.dueDate
                      ? "borrowing-input borrowing-input--error"
                      : "borrowing-input"
                  }
                  value={form.dueDate}
                  aria-invalid={Boolean(errors.dueDate)}
                  onChange={(event) => {
                    setDueDateEdited(true);
                    updateField("dueDate", event.target.value);
                  }}
                  onBlur={validateForm}
                />
                {errors.dueDate && (
                  <small className="borrowing-field-error">
                    {errors.dueDate}
                  </small>
                )}
              </label>
            </div>
            <div className="borrowing-modal-actions">
              <button
                type="button"
                className="borrowing-cancel"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="borrowing-add-button"
                disabled={!isFormComplete}
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      )}
      {returnRecord && (
        <div className="borrowing-modal-backdrop" role="presentation">
          <form
            className="borrowing-modal borrowing-return-modal"
            onSubmit={handleReturnSubmit}
          >
            <div className="borrowing-modal-header">
              <div>
                <p className="borrowing-eyebrow">RETURN PROCESSING</p>
                <h2>Process Return Form</h2>
              </div>
              <button
                type="button"
                className="borrowing-close"
                onClick={() => setReturnRecord(null)}
                aria-label="Close return form"
              >
                ×
              </button>
            </div>
            <p className="borrowing-return-summary">
              <strong>{returnRecord.bookTitle}</strong>
              <span>Borrowed by {returnRecord.studentName}</span>
            </p>
            <label>
              Return Condition
              <select
                value={returnForm.condition}
                onChange={(event) => {
                  setReturnForm({
                    ...returnForm,
                    condition: event.target.value,
                  });
                  setReturnError("");
                }}
              >
                <option>Good</option>
                <option>Damaged</option>
                <option>Lost</option>
              </select>
            </label>
            <label>
              Fine Owed
              <input
                type="number"
                min="0"
                step="0.01"
                value={returnForm.fine}
                onChange={(event) => {
                  setReturnForm({ ...returnForm, fine: event.target.value });
                  setReturnError("");
                }}
              />
            </label>
            {returnError && (
              <p className="borrowing-return-error" role="alert">
                {returnError}
              </p>
            )}
            <div className="borrowing-modal-actions">
              <button
                type="button"
                className="borrowing-cancel"
                onClick={() => setReturnRecord(null)}
              >
                Cancel
              </button>
              <button type="submit" className="borrowing-add-button">
                Confirm Return
              </button>
            </div>
          </form>
        </div>
      )}
      {successDialog && (
        <div
          className="borrowing-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-dialog-title"
        >
          <div className="borrowing-success-modal">
            <div className="borrowing-success-icon" aria-hidden="true">
              ✓
            </div>
            <h2 id="success-dialog-title">{successDialog.title}</h2>
            <p>{successDialog.description}</p>
            <strong>{successDialog.note}</strong>
            <button
              type="button"
              className="borrowing-add-button"
              onClick={() => setSuccessDialog(null)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Borrowing;
