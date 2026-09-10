import { useMemo, useState } from "react";
import { useLibraryData } from "../data/useLibraryData";

const PAGE_SIZE = 10;

export const initialStudents = [
  {
    id: "ST-101",
    fullName: "Ava Thompson",
    email: "ava.thompson@northview.edu",
    phone: "+1 (415) 555-0147",
    grade: "Grade 12",
    parentName: "Daniel Thompson",
    enrollmentDate: "2024-08-14",
    status: "Active",
    booksOut: 2,
    borrowedBooks: [
      { title: "The Great Gatsby", dueDate: "2026-09-18" },
      { title: "Pride and Prejudice", dueDate: "2026-09-25" },
    ],
  },
  {
    id: "ST-102",
    fullName: "Liam Carter",
    email: "liam.carter@northview.edu",
    phone: "+1 (415) 555-0192",
    grade: "Grade 11",
    parentName: "Sarah Carter",
    enrollmentDate: "2023-08-22",
    status: "Active",
    booksOut: 1,
    borrowedBooks: [{ title: "To Kill a Mockingbird", dueDate: "2026-09-12" }],
  },
  {
    id: "ST-103",
    fullName: "Sophia Nguyen",
    email: "sophia.nguyen@northview.edu",
    phone: "+1 (415) 555-0165",
    grade: "Grade 10",
    parentName: "Minh Nguyen",
    enrollmentDate: "2022-08-30",
    status: "On Leave",
    booksOut: 0,
    borrowedBooks: [],
  },
  {
    id: "ST-104",
    fullName: "Noah Patel",
    email: "noah.patel@northview.edu",
    phone: "+1 (415) 555-0134",
    grade: "Grade 9",
    parentName: "Raj Patel",
    enrollmentDate: "2025-01-09",
    status: "Active",
    booksOut: 3,
    borrowedBooks: [
      { title: "The Hobbit", dueDate: "2026-09-11" },
      { title: "A Wrinkle in Time", dueDate: "2026-09-20" },
      { title: "The Book Thief", dueDate: "2026-09-27" },
    ],
  },
  {
    id: "ST-105",
    fullName: "Emma Rodriguez",
    email: "emma.rodriguez@northview.edu",
    phone: "+1 (415) 555-0108",
    grade: "Grade 8",
    parentName: "Carlos Rodriguez",
    enrollmentDate: "2024-08-18",
    status: "Active",
    booksOut: 1,
    borrowedBooks: [{ title: "Anne of Green Gables", dueDate: "2026-09-17" }],
  },
  {
    id: "ST-106",
    fullName: "Mason Lee",
    email: "mason.lee@northview.edu",
    phone: "+1 (415) 555-0156",
    grade: "Grade 12",
    parentName: "Grace Lee",
    enrollmentDate: "2021-08-16",
    status: "Inactive",
    booksOut: 0,
    borrowedBooks: [],
  },
  {
    id: "ST-107",
    fullName: "Chloe Martin",
    email: "chloe.martin@northview.edu",
    phone: "+1 (415) 555-0119",
    grade: "Grade 7",
    parentName: "Miranda Martin",
    enrollmentDate: "2025-02-03",
    status: "Active",
    booksOut: 2,
    borrowedBooks: [
      { title: "Charlotte's Web", dueDate: "2026-09-14" },
      { title: "The Secret Garden", dueDate: "2026-09-21" },
    ],
  },
  {
    id: "ST-108",
    fullName: "James Wilson",
    email: "james.wilson@northview.edu",
    phone: "+1 (415) 555-0180",
    grade: "Grade 11",
    parentName: "Olivia Wilson",
    enrollmentDate: "2023-08-24",
    status: "Active",
    booksOut: 1,
    borrowedBooks: [{ title: "The Odyssey", dueDate: "2026-09-19" }],
  },
  {
    id: "ST-109",
    fullName: "Isabella Moore",
    email: "isabella.moore@northview.edu",
    phone: "+1 (415) 555-0174",
    grade: "Grade 10",
    parentName: "Benjamin Moore",
    enrollmentDate: "2024-08-15",
    status: "Pending",
    booksOut: 0,
    borrowedBooks: [],
  },
  {
    id: "ST-110",
    fullName: "Lucas Johnson",
    email: "lucas.johnson@northview.edu",
    phone: "+1 (415) 555-0123",
    grade: "Grade 9",
    parentName: "Amanda Johnson",
    enrollmentDate: "2025-01-17",
    status: "Active",
    booksOut: 4,
    borrowedBooks: [
      { title: "The Alchemist", dueDate: "2026-09-10" },
      { title: "The Outsiders", dueDate: "2026-09-13" },
      { title: "Bridge to Terabithia", dueDate: "2026-09-22" },
      { title: "The Maze Runner", dueDate: "2026-09-29" },
    ],
  },
  {
    id: "ST-111",
    fullName: "Harper Davis",
    email: "harper.davis@northview.edu",
    phone: "+1 (415) 555-0142",
    grade: "Grade 12",
    parentName: "Ethan Davis",
    enrollmentDate: "2022-08-12",
    status: "Active",
    booksOut: 2,
    borrowedBooks: [
      { title: "Frankenstein", dueDate: "2026-09-16" },
      { title: "The Bell Jar", dueDate: "2026-09-24" },
    ],
  },
  {
    id: "ST-112",
    fullName: "Ethan Baker",
    email: "ethan.baker@northview.edu",
    phone: "+1 (415) 555-0189",
    grade: "Grade 8",
    parentName: "Natalie Baker",
    enrollmentDate: "2024-09-01",
    status: "Active",
    booksOut: 1,
    borrowedBooks: [
      { title: "The Secret of the Blue Land", dueDate: "2026-09-23" },
    ],
  },
  {
    id: "ST-113",
    fullName: "Mila Garcia",
    email: "mila.garcia@northview.edu",
    phone: "+1 (415) 555-0112",
    grade: "Grade 7",
    parentName: "Victor Garcia",
    enrollmentDate: "2025-08-19",
    status: "On Leave",
    booksOut: 0,
    borrowedBooks: [],
  },
  {
    id: "ST-114",
    fullName: "Benjamin White",
    email: "benjamin.white@northview.edu",
    phone: "+1 (415) 555-0169",
    grade: "Grade 11",
    parentName: "Rachel White",
    enrollmentDate: "2023-01-12",
    status: "Active",
    booksOut: 2,
    borrowedBooks: [
      { title: "The Iliad", dueDate: "2026-09-15" },
      { title: "The Catcher in the Rye", dueDate: "2026-09-26" },
    ],
  },
  {
    id: "ST-115",
    fullName: "Ella Brown",
    email: "ella.brown@northview.edu",
    phone: "+1 (415) 555-0153",
    grade: "Grade 10",
    parentName: "Derek Brown",
    enrollmentDate: "2024-08-27",
    status: "Active",
    booksOut: 1,
    borrowedBooks: [{ title: "The Giver", dueDate: "2026-09-20" }],
  },
  {
    id: "ST-116",
    fullName: "Jackson Young",
    email: "jackson.young@northview.edu",
    phone: "+1 (415) 555-0124",
    grade: "Grade 9",
    parentName: "Nancy Young",
    enrollmentDate: "2025-03-06",
    status: "Inactive",
    booksOut: 0,
    borrowedBooks: [],
  },
  {
    id: "ST-117",
    fullName: "Amelia Harris",
    email: "amelia.harris@northview.edu",
    phone: "+1 (415) 555-0172",
    grade: "Grade 12",
    parentName: "Thomas Harris",
    enrollmentDate: "2022-08-20",
    status: "Active",
    booksOut: 3,
    borrowedBooks: [
      { title: "The Metamorphosis", dueDate: "2026-09-12" },
      { title: "Jane Eyre", dueDate: "2026-09-18" },
      { title: "Hamlet", dueDate: "2026-09-28" },
    ],
  },
  {
    id: "ST-118",
    fullName: "Alexander Scott",
    email: "alexander.scott@northview.edu",
    phone: "+1 (415) 555-0138",
    grade: "Grade 11",
    parentName: "Patricia Scott",
    enrollmentDate: "2023-08-21",
    status: "Pending",
    booksOut: 0,
    borrowedBooks: [],
  },
  {
    id: "ST-119",
    fullName: "Scarlett Clark",
    email: "scarlett.clark@northview.edu",
    phone: "+1 (415) 555-0197",
    grade: "Grade 10",
    parentName: "Mark Clark",
    enrollmentDate: "2024-06-11",
    status: "Active",
    booksOut: 2,
    borrowedBooks: [
      { title: "Little Women", dueDate: "2026-09-16" },
      { title: "Dracula", dueDate: "2026-09-30" },
    ],
  },
  {
    id: "ST-120",
    fullName: "Daniel Walker",
    email: "daniel.walker@northview.edu",
    phone: "+1 (415) 555-0185",
    grade: "Grade 8",
    parentName: "Linda Walker",
    enrollmentDate: "2025-08-15",
    status: "Active",
    booksOut: 1,
    borrowedBooks: [
      { title: "The Wonderful Wizard of Oz", dueDate: "2026-09-13" },
    ],
  },
];

const DEFAULT_FORM = {
  id: "",
  fullName: "",
  email: "",
  phone: "",
  grade: "Grade 9",
  status: "Active",
  parentName: "",
  enrollmentDate: new Date().toISOString().slice(0, 10),
};

const GRADE_OPTIONS = [
  "All Grades",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
];

const STATUS_OPTIONS = [
  "All Statuses",
  "Active",
  "On Leave",
  "Inactive",
  "Pending",
];

const formatDisplayDate = (value) => {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const getStatusClass = (status) =>
  `student-status student-status--${String(status || "active")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")}`;

const PeopleIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M16.5 18v-1a4 4 0 0 0-4-4h-5a4 4 0 0 0-4 4v1" />
    <circle cx="9.5" cy="7.5" r="3.5" />
    <path d="M19 18v-1a3.5 3.5 0 0 0-2.7-3.4" />
    <path d="M17 6.5a3 3 0 1 1 0 6" />
  </svg>
);

const GraduationCapIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3 9.5 12 5l9 4.5-9 4.5L3 9.5Z" />
    <path d="M7.5 11.8V15c0 1.6 2 3 4.5 3s4.5-1.4 4.5-3v-3.2" />
    <path d="M21 10v6.5" />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const PencilIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 20h4l10.5-10.5a2.12 2.12 0 0 0-3-3L5 17v3Z" />
    <path d="m13.5 6.5 4 4" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 7h16" />
    <path d="M9 7V4h6v3" />
    <path d="M7 7l1 12h8l1-12" />
    <path d="M10 11v5M14 11v5" />
  </svg>
);

const getNumericStudentId = (studentId) => {
  const match = String(studentId || "").match(/(\d+)$/);
  return match ? Number(match[1]) : 0;
};

function Students() {
  const { students, loans, addStudent, updateStudent, deleteStudent } =
    useLibraryData();
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("All Grades");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalType, setModalType] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [formError, setFormError] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const studentsWithLoans = useMemo(
    () =>
      students.map((student) => {
        const borrowedBooks = loans
          .filter(
            (loan) =>
              loan.studentId === student.id && loan.status !== "Returned",
          )
          .map((loan) => ({ title: loan.bookTitle, dueDate: loan.dueDate }));

        return {
          ...student,
          booksOut: borrowedBooks.length,
          borrowedBooks,
        };
      }),
    [loans, students],
  );

  const filteredStudents = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return studentsWithLoans.filter((student) => {
      const matchesQuery =
        !query ||
        student.fullName.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query) ||
        student.id.toLowerCase().includes(query);

      const matchesGrade =
        gradeFilter === "All Grades" || student.grade === gradeFilter;
      const matchesStatus =
        statusFilter === "All Statuses" || student.status === statusFilter;

      return matchesQuery && matchesGrade && matchesStatus;
    });
  }, [studentsWithLoans, searchTerm, gradeFilter, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / PAGE_SIZE),
  );
  const displayPage = Math.min(currentPage, totalPages);
  const startIndex = (displayPage - 1) * PAGE_SIZE;
  const visibleStudents = filteredStudents.slice(
    startIndex,
    startIndex + PAGE_SIZE,
  );

  const openAddModal = () => {
    setFormData({
      ...DEFAULT_FORM,
      grade: "Grade 9",
      status: "Active",
      enrollmentDate: new Date().toISOString().slice(0, 10),
    });
    setSelectedStudent(null);
    setFormError("");
    setModalType("add");
  };

  const openEditModal = (student) => {
    setSelectedStudent(student);
    setFormData({
      id: student.id,
      fullName: student.fullName,
      email: student.email,
      phone: student.phone,
      grade: student.grade,
      status: student.status,
      parentName: student.parentName,
      enrollmentDate: student.enrollmentDate,
    });
    setFormError("");
    setModalType("edit");
  };

  const openViewModal = (student) => {
    setSelectedStudent(student);
    setModalType("view");
  };

  const openDeleteModal = (student) => {
    setSelectedStudent(student);
    setDeleteError("");
    setModalType("delete");
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedStudent(null);
    setFormData(DEFAULT_FORM);
    setFormError("");
    setDeleteError("");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const generateNextStudentId = () => {
    const lastId = students.reduce(
      (maxId, student) => Math.max(maxId, getNumericStudentId(student.id)),
      0,
    );

    return `ST-${String(lastId + 1).padStart(3, "0")}`;
  };

  const handleSaveStudent = () => {
    const trimmedData = {
      id: formData.id || generateNextStudentId(),
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      grade: formData.grade || "Grade 9",
      status: formData.status || "Active",
      parentName: formData.parentName.trim(),
      enrollmentDate:
        formData.enrollmentDate || new Date().toISOString().slice(0, 10),
    };

    if (!trimmedData.fullName || !trimmedData.email) {
      setFormError("Full name and email address are required.");
      return;
    }

    if (modalType === "add") {
      const newStudent = {
        ...trimmedData,
        booksOut: 0,
        borrowedBooks: [],
      };

      addStudent(newStudent);
    }

    if (modalType === "edit") {
      updateStudent(trimmedData.id, {
        ...selectedStudent,
        ...trimmedData,
      });
    }

    closeModal();
  };

  const handleDeleteStudent = () => {
    if (!selectedStudent) {
      return;
    }

    const result = deleteStudent(selectedStudent.id);
    if (!result.success) {
      setDeleteError(result.message);
      return;
    }

    closeModal();
  };

  return (
    <>
      <style>{`
        .students-page {
          min-height: calc(100vh - 92px);
          padding: 24px;
          background: #f4f7fb;
          color: #1f3448;
          box-sizing: border-box;
        }

        .students-panel {
          background: #ffffff;
          border: 1px solid #e3eaf2;
          border-radius: 16px;
          box-shadow: 0 3px 12px rgba(31, 52, 72, 0.04);
          overflow: hidden;
        }

        .students-page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 24px 24px 18px;
          border-bottom: 1px solid #edf1f5;
        }

        .students-page-header h2 {
          margin: 0;
          color: #20364a;
          font-size: 20px;
          font-weight: 700;
          line-height: 1.3;
        }

        .students-page-header p {
          margin: 6px 0 0;
          color: #8a9bad;
          font-size: 13px;
        }

        .students-add-btn,
        .students-action-btn,
        .students-pagination-button,
        .modal-close-btn,
        .modal-action-btn,
        .modal-delete-btn,
        .modal-secondary-btn {
          border: none;
          border-radius: 8px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.15s ease, opacity 0.15s ease, background 0.15s ease;
        }

        .students-add-btn {
          background: #334e68;
          color: #ffffff;
          padding: 10px 18px;
          min-width: 140px;
        }

        .students-add-btn:hover,
        .students-action-btn:hover,
        .students-pagination-button:hover,
        .modal-close-btn:hover,
        .modal-action-btn:hover,
        .modal-delete-btn:hover,
        .modal-secondary-btn:hover {
          transform: translateY(-1px);
        }

        .students-summary {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
          padding: 20px 24px 0;
        }

        .students-summary-card {
          display: flex;
          align-items: center;
          gap: 18px;
          background: #f8fbff;
          border: 1px solid #e9f0f6;
          border-radius: 12px;
          padding: 18px 20px;
        }

        .students-summary-card--count {
          background: #f4f8ff;
          border-color: #dbe8fb;
        }

        .students-summary-card--enrolled {
          background: #f3fbf7;
          border-color: #d9eee2;
        }

        .students-summary-main {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .students-summary-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 12px;
        }

        .students-summary-icon--blue {
          background: rgba(122, 172, 255, 0.18);
          color: #3b6fb6;
        }

        .students-summary-icon--green {
          background: rgba(92, 182, 128, 0.18);
          color: #2d8a5f;
        }

        .students-summary-icon svg {
          width: 20px;
          height: 20px;
          stroke: currentColor;
          fill: none;
          stroke-width: 1.9;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .students-summary-label {
          margin: 0;
          color: #65809a;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .students-summary-value {
          margin: 7px 0 0;
          color: #173b68;
          font-size: 28px;
          font-weight: 700;
          line-height: 1.1;
        }

        .students-summary-card--enrolled .students-summary-value {
          color: #176344;
        }

        .students-controls {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          align-items: end;
          column-gap: 24px;
          row-gap: 16px;
          padding: 20px 24px 0;
        }

        .students-search-wrap {
          display: flex;
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
          gap: 12px;
          align-items: center;
          padding: 10px 14px;
          border: 1px solid #dfe7ef;
          border-radius: 10px;
          background: #f8fafc;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .students-search-wrap:focus-within {
          border-color: #60a5fa;
          box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.16);
        }

        .students-search-wrap input,
        .students-filter select,
        .modal-form input,
        .modal-form select,
        .modal-form textarea {
          width: 100%;
          box-sizing: border-box;
          padding: 10px 12px;
          border: 1px solid #dfe7ef;
          border-radius: 8px;
          background: #f8fafc;
          color: #102334;
          font: inherit;
        }

        .students-search-wrap input {
          border: none;
          background: transparent;
          padding: 0;
          min-height: 18px;
          font-size: 14px;
          outline: none;
          box-shadow: none;
          -webkit-appearance: none;
          appearance: none;
        }

        .students-search-wrap input:focus,
        .students-search-wrap input:focus-visible {
          outline: none;
          border: none;
          box-shadow: none;
          background: transparent;
        }

        .students-filter select:focus,
        .students-filter select:focus-visible,
        .modal-form input:focus,
        .modal-form input:focus-visible,
        .modal-form select:focus,
        .modal-form select:focus-visible,
        .modal-form textarea:focus,
        .modal-form textarea:focus-visible {
          outline: none;
          border-color: #60a5fa;
          box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.16);
          background: #ffffff;
        }

        .students-filter-group {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
        }

        .students-filter {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1 1 0;
          min-width: 0;
        }

        .students-filter label {
          color: #52677d;
          font-size: 12px;
          font-weight: 600;
        }

        .students-table-wrap {
          width: 100%;
          overflow-x: hidden;
          padding: 20px 24px 0;
          box-sizing: border-box;
        }

        .students-table {
          width: 100%;
          min-width: 0;
          table-layout: fixed;
          border-collapse: collapse;
          text-align: left;
        }

        .students-table th {
          padding: 12px 16px;
          border-top: 1px solid #edf1f5;
          border-bottom: 1px solid #e7edf3;
          color: #8495a6;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.7px;
          line-height: 1.3;
          text-transform: uppercase;
        }

        .students-table td {
          padding: 14px 16px;
          border-bottom: 1px solid #edf1f5;
          color: #40566b;
          font-size: 13px;
          vertical-align: middle;
        }

        .student-cell {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 180px;
          max-width: 260px;
        }

        .student-grade,
        .student-email,
        .student-enrolled,
        .student-books-out,
        .student-status {
          white-space: nowrap;
        }

        .student-avatar {
          display: grid;
          place-items: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #dfeaf5 0%, #cfe0f1 100%);
          color: #2d536f;
          font-size: 12px;
          font-weight: 700;
        }

        .student-name {
          margin: 0;
          color: #294157;
          font-size: 14px;
          font-weight: 700;
        }

        .student-id {
          margin-top: 3px;
          color: #8b9db1;
          font-size: 12px;
        }

        .student-grade,
        .student-enrolled,
        .student-books-out {
          color: #40566b;
          font-size: 13px;
        }

        .student-books-out {
          display: inline-flex;
          min-width: 32px;
          justify-content: center;
          padding: 6px 8px;
          border-radius: 999px;
          background: #edf2ff;
          color: #4b62d0;
          font-weight: 700;
        }

        .student-status {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          min-width: 88px;
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12px;
          white-space: nowrap;
        }

        .student-status::before {
          content: "";
          width: 7px;
          height: 7px;
          border-radius: 50%;
          display: inline-block;
          flex-shrink: 0;
        }

        .student-status--active {
          background: #eaf8ee;
          color: #2d8a5f;
        }

        .student-status--active::before {
          background: #2d8a5f;
        }

        .student-status--on-leave {
          background: #fff3d9;
          color: #b97a1f;
        }

        .student-status--on-leave::before {
          background: #d99a2b;
        }

        .student-status--inactive {
          background: #f7edf0;
          color: #9a475d;
        }

        .student-status--inactive::before {
          background: #a95a6e;
        }

        .student-status--pending {
          background: #f1ebff;
          color: #664bc4;
        }

        .student-status--pending::before {
          background: #664bc4;
        }

        .students-action-group {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: nowrap;
          justify-content: flex-start;
        }

        .students-action-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          padding: 0;
          border: 1px solid transparent;
          border-radius: 8px;
          background: #eef4fb;
          color: #2d536f;
          white-space: nowrap;
          min-width: 0;
        }

        .students-action-btn svg {
          width: 15px;
          height: 15px;
          stroke: currentColor;
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .students-action-btn--view {
          background: #eaf2ff;
          border-color: #d9e7ff;
          color: #3e6fd1;
        }

        .students-action-btn--edit {
          background: #fff4e5;
          border-color: #f7e4c7;
          color: #c7812d;
        }

        .students-action-btn--danger {
          background: #fff1f3;
          border-color: #f7ced6;
          color: #b43348;
        }

        .students-empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 280px;
          text-align: center;
          padding: 24px;
          color: #53657a;
        }

        .students-empty-state h3 {
          margin: 0;
          color: #20364a;
          font-size: 24px;
        }

        .students-empty-state p {
          margin: 0;
          max-width: 520px;
          color: #71869a;
          line-height: 1.6;
        }

        .students-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 18px 24px 24px;
          color: #607389;
          font-size: 12px;
        }

        .students-pagination {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .students-pagination-button {
          min-width: 34px;
          height: 34px;
          padding: 0 10px;
          background: #eef4fb;
          color: #2d536f;
          border: 1px solid #dfeaf5;
        }

        .students-pagination-button.is-active {
          background: #334e68;
          border-color: #334e68;
          color: #ffffff;
        }

        .students-pagination-button:disabled {
          cursor: not-allowed;
          opacity: 0.55;
          transform: none;
        }

        .students-modal-backdrop {
          position: fixed;
          inset: 0;
          display: grid;
          place-items: center;
          background: rgba(15, 23, 42, 0.45);
          z-index: 20;
          padding: 20px;
        }

        .students-modal {
          width: min(100%, 620px);
          background: #ffffff;
          border: 1px solid #dfe7ef;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.2);
          overflow: hidden;
        }

        .students-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 20px 22px 16px;
          border-bottom: 1px solid #edf1f5;
        }

        .students-modal-header h3 {
          margin: 0;
          color: #20364a;
          font-size: 20px;
        }

        .modal-close-btn {
          width: 34px;
          height: 34px;
          background: #f3f7fb;
          color: #52677d;
        }

        .modal-form {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          padding: 20px 22px;
        }

        .modal-form .full-width {
          grid-column: 1 / -1;
        }

        .modal-form label {
          display: flex;
          flex-direction: column;
          gap: 8px;
          color: #52677d;
          font-size: 12px;
          font-weight: 600;
        }

        .modal-form textarea {
          min-height: 100px;
          resize: vertical;
        }

        .form-error {
          margin: 0 22px 0;
          color: #b43348;
          font-size: 12px;
          font-weight: 600;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 0 22px 22px;
        }

        .modal-action-btn {
          padding: 10px 18px;
          background: #334e68;
          color: #ffffff;
        }

        .modal-secondary-btn {
          padding: 10px 18px;
          background: #eef4fb;
          border: 1px solid #dfeaf5;
          color: #2d536f;
        }

        .modal-delete-btn {
          padding: 10px 18px;
          background: #b43348;
          color: #ffffff;
        }

        .students-detail-card {
          padding: 20px 22px 18px;
        }

        .students-detail-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 18px;
        }

        .students-detail-header h3 {
          margin: 0;
          color: #20364a;
          font-size: 22px;
        }

        .students-detail-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .detail-item {
          padding: 12px 14px;
          border: 1px solid #edf1f5;
          border-radius: 10px;
          background: #f8fafc;
        }

        .detail-item label {
          display: block;
          margin-bottom: 6px;
          color: #6d8193;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.7px;
          text-transform: uppercase;
        }

        .detail-item p {
          margin: 0;
          color: #294157;
          font-size: 14px;
          font-weight: 600;
        }

        .borrowed-books-list {
          margin: 0;
          padding-left: 18px;
          color: #294157;
          font-size: 14px;
          line-height: 1.8;
        }

        .students-delete-content {
          padding: 20px 22px 18px;
          color: #40566b;
          line-height: 1.7;
        }

        .students-delete-content p {
          margin: 0;
        }

        @media (max-width: 720px) {
          .students-page {
            padding: 16px;
          }

          .students-page-header,
          .students-summary,
          .students-footer {
            flex-direction: column;
            align-items: stretch;
          }

          .students-page-header {
            align-items: flex-start;
          }

          .students-summary {
            grid-template-columns: 1fr;
          }

          .students-search-wrap {
            width: 100%;
            min-width: 0;
            max-width: none;
          }

          .students-controls {
            grid-template-columns: 1fr;
          }

          .students-filter-group,
          .students-pagination {
            width: 100%;
          }

          .students-filter {
            flex: 1;
            min-width: 0;
          }

          .students-detail-grid,
          .modal-form {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="students-page">
        <div className="students-panel">
          <header className="students-page-header">
            <div>
              <h2>Students</h2>
              <p>
                Manage student accounts, enrollment records, and borrowing
                activity.
              </p>
            </div>
            <button
              type="button"
              className="students-add-btn"
              onClick={openAddModal}
            >
              + Add Student
            </button>
          </header>

          <section
            className="students-summary"
            aria-label="Student summary metrics"
          >
            <div className="students-summary-card students-summary-card--count">
              <div className="students-summary-main">
                <span
                  className="students-summary-icon students-summary-icon--blue"
                  aria-hidden="true"
                >
                  <PeopleIcon />
                </span>
                <div>
                  <p className="students-summary-label">Student Count</p>
                  <p className="students-summary-value">
                    {filteredStudents.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="students-summary-card students-summary-card--enrolled">
              <div className="students-summary-main">
                <span
                  className="students-summary-icon students-summary-icon--green"
                  aria-hidden="true"
                >
                  <GraduationCapIcon />
                </span>
                <div>
                  <p className="students-summary-label">Total Enrolled</p>
                  <p className="students-summary-value">{students.length}</p>
                </div>
              </div>
            </div>
          </section>

          <div className="students-controls">
            <div className="students-search-wrap" role="search">
              <span aria-hidden="true">⌕</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search student name, email, or student ID"
                aria-label="Search students"
              />
            </div>

            <div className="students-filter-group">
              <div className="students-filter">
                <label htmlFor="grade-filter">Grade</label>
                <select
                  id="grade-filter"
                  value={gradeFilter}
                  onChange={(event) => {
                    setGradeFilter(event.target.value);
                    setCurrentPage(1);
                  }}
                >
                  {GRADE_OPTIONS.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              </div>

              <div className="students-filter">
                <label htmlFor="status-filter">Status</label>
                <select
                  id="status-filter"
                  value={statusFilter}
                  onChange={(event) => {
                    setStatusFilter(event.target.value);
                    setCurrentPage(1);
                  }}
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="students-table-wrap">
            <table className="students-table">
              <thead>
                <tr>
                  <th scope="col">Student</th>
                  <th scope="col">Grade</th>
                  <th scope="col">Enrolled</th>
                  <th scope="col">Books Out</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibleStudents.length > 0 ? (
                  visibleStudents.map((student) => (
                    <tr key={student.id}>
                      <td>
                        <div className="student-cell">
                          <span className="student-avatar" aria-hidden="true">
                            {student.fullName
                              .split(" ")
                              .slice(0, 2)
                              .map((part) => part[0])
                              .join("")
                              .toUpperCase()}
                          </span>
                          <div>
                            <p className="student-name">{student.fullName}</p>
                            <p className="student-id">{student.id}</p>
                          </div>
                        </div>
                      </td>

                      <td className="student-grade">{student.grade}</td>
                      <td className="student-enrolled">
                        {formatDisplayDate(student.enrollmentDate)}
                      </td>
                      <td>
                        <span className="student-books-out">
                          {student.booksOut}
                        </span>
                      </td>
                      <td>
                        <span className={getStatusClass(student.status)}>
                          {student.status}
                        </span>
                      </td>
                      <td>
                        <div className="students-action-group">
                          <button
                            type="button"
                            className="students-action-btn students-action-btn--view"
                            onClick={() => openViewModal(student)}
                            aria-label="View student"
                            title="View student"
                          >
                            <EyeIcon />
                          </button>
                          <button
                            type="button"
                            className="students-action-btn students-action-btn--edit"
                            onClick={() => openEditModal(student)}
                            aria-label="Edit student"
                            title="Edit student"
                          >
                            <PencilIcon />
                          </button>
                          <button
                            type="button"
                            className="students-action-btn students-action-btn--danger"
                            onClick={() => openDeleteModal(student)}
                            aria-label="Delete student"
                            title="Delete student"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">
                      <div className="students-empty-state">
                        <h3>No students found</h3>
                        <p>
                          Try adjusting your search or filters to find a
                          different student record.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <footer className="students-footer">
            <span>
              Showing {filteredStudents.length === 0 ? 0 : startIndex + 1}-
              {Math.min(startIndex + PAGE_SIZE, filteredStudents.length)} of{" "}
              {filteredStudents.length} students
            </span>

            <div
              className="students-pagination"
              aria-label="Student pagination"
            >
              <button
                type="button"
                className="students-pagination-button"
                disabled={displayPage === 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    className={`students-pagination-button ${pageNumber === displayPage ? "is-active" : ""}`}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                ),
              )}

              <button
                type="button"
                className="students-pagination-button"
                disabled={displayPage === totalPages}
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
              >
                Next
              </button>
            </div>
          </footer>
        </div>
      </div>

      {modalType && (
        <div className="students-modal-backdrop" onClick={closeModal}>
          <div
            className="students-modal"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            {modalType === "add" || modalType === "edit" ? (
              <>
                <div className="students-modal-header">
                  <h3>
                    {modalType === "add" ? "Add Student" : "Edit Student"}
                  </h3>
                  <button
                    type="button"
                    className="modal-close-btn"
                    onClick={closeModal}
                  >
                    ×
                  </button>
                </div>

                <div className="modal-form">
                  <label className="full-width">
                    Full Name
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter full name"
                    />
                  </label>

                  <label className="full-width">
                    Email Address
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter email address"
                    />
                  </label>

                  <label>
                    Phone Number
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                    />
                  </label>

                  <label>
                    Grade
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                    >
                      {GRADE_OPTIONS.filter(
                        (grade) => grade !== "All Grades",
                      ).map((grade) => (
                        <option key={grade} value={grade}>
                          {grade}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Status
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      {STATUS_OPTIONS.filter(
                        (status) => status !== "All Statuses",
                      ).map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Parent/Guardian Name
                    <input
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleInputChange}
                      placeholder="Enter parent or guardian"
                    />
                  </label>

                  <label>
                    Enrollment Date
                    <input
                      type="date"
                      name="enrollmentDate"
                      value={formData.enrollmentDate}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>

                {formError && <p className="form-error">{formError}</p>}

                <div className="modal-actions">
                  <button
                    type="button"
                    className="modal-secondary-btn"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="modal-action-btn"
                    onClick={handleSaveStudent}
                  >
                    {modalType === "add" ? "Add Student" : "Save Changes"}
                  </button>
                </div>
              </>
            ) : null}

            {modalType === "view" && selectedStudent && (
              <>
                <div className="students-modal-header">
                  <h3>Student Profile</h3>
                  <button
                    type="button"
                    className="modal-close-btn"
                    onClick={closeModal}
                  >
                    ×
                  </button>
                </div>

                <div className="students-detail-card">
                  <div className="students-detail-header">
                    <h3>{selectedStudent.fullName}</h3>
                    <span className={getStatusClass(selectedStudent.status)}>
                      {selectedStudent.status}
                    </span>
                  </div>

                  <div className="students-detail-grid">
                    <div className="detail-item">
                      <label>Student ID</label>
                      <p>{selectedStudent.id}</p>
                    </div>

                    <div className="detail-item">
                      <label>Grade</label>
                      <p>{selectedStudent.grade}</p>
                    </div>

                    <div className="detail-item">
                      <label>Email</label>
                      <p>{selectedStudent.email}</p>
                    </div>

                    <div className="detail-item">
                      <label>Phone</label>
                      <p>{selectedStudent.phone || "—"}</p>
                    </div>

                    <div className="detail-item">
                      <label>Parent/Guardian</label>
                      <p>{selectedStudent.parentName || "—"}</p>
                    </div>

                    <div className="detail-item">
                      <label>Enrollment Date</label>
                      <p>{formatDisplayDate(selectedStudent.enrollmentDate)}</p>
                    </div>

                    <div className="detail-item full-width">
                      <label>Currently Borrowed Books</label>
                      {selectedStudent.borrowedBooks &&
                      selectedStudent.borrowedBooks.length > 0 ? (
                        <ul className="borrowed-books-list">
                          {selectedStudent.borrowedBooks.map((book) => (
                            <li key={`${selectedStudent.id}-${book.title}`}>
                              {book.title} — Due{" "}
                              {formatDisplayDate(book.dueDate)}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No books currently checked out.</p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {modalType === "delete" && selectedStudent && (
              <>
                <div className="students-modal-header">
                  <h3>Delete Student</h3>
                  <button
                    type="button"
                    className="modal-close-btn"
                    onClick={closeModal}
                  >
                    ×
                  </button>
                </div>

                <div className="students-delete-content">
                  <p>
                    Are you sure you want to delete{" "}
                    <strong>{selectedStudent.fullName}</strong> (
                    {selectedStudent.id})? This action cannot be undone.
                  </p>
                  {deleteError && <p className="form-error">{deleteError}</p>}
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="modal-secondary-btn"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="modal-delete-btn"
                    onClick={handleDeleteStudent}
                  >
                    Delete Student
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Students;
