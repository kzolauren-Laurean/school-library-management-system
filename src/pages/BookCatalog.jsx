import { useMemo, useState } from "react";
import { loanMatchesBook } from "../data/LibraryUtils";
import { useLibraryData } from "../data/useLibraryData";

export const initialBooks = [
  {
    id: "BK-101",
    title: "Atomic Habits",
    author: "James Clear",
    isbn: "9780735211292",
    category: "Self-Improvement",
    status: "Available",
    year: 2018,
    description:
      "A practical guide to building good habits and breaking bad ones.",
  },
  {
    id: "BK-102",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    isbn: "9780857197689",
    category: "Finance",
    status: "Borrowed",
    year: 2020,
    description:
      "Learn the behavioral side of money and how wealth is built over time.",
  },
  {
    id: "BK-103",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    isbn: "9780201616224",
    category: "Technology",
    status: "Available",
    year: 1999,
    description:
      "A timeless guide for modern software craftsmanship and technical decision-making.",
  },
  {
    id: "BK-104",
    title: "Deep Work",
    author: "Cal Newport",
    isbn: "9781455586691",
    category: "Productivity",
    status: "Reserved",
    year: 2016,
    description: "A strategy for focused work in a distracted world.",
  },
  {
    id: "BK-105",
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "9780132350884",
    category: "Technology",
    status: "Available",
    year: 2008,
    description:
      "Practical programming principles and best practices for writing maintainable code.",
  },
  {
    id: "BK-106",
    title: "Educated",
    author: "Tara Westover",
    isbn: "9780399590504",
    category: "Biography",
    status: "Borrowed",
    year: 2018,
    description:
      "A memoir about resilience, education, and the pursuit of self-discovery.",
  },
  {
    id: "BK-107",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    isbn: "9781250301697",
    category: "Fiction",
    status: "Available",
    year: 2019,
    description:
      "A dark psychological thriller about obsession, memory, and silence.",
  },
  {
    id: "BK-108",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    isbn: "9780062316097",
    category: "History",
    status: "Archived",
    year: 2015,
    description:
      "A sweeping narrative of human history from the Stone Age to the present.",
  },
  {
    id: "BK-109",
    title: "The Alchemist",
    author: "Paulo Coelho",
    isbn: "9780061122415",
    category: "Fiction",
    status: "Available",
    year: 1988,
    description:
      "A fable about purpose, destiny, and the journey toward personal legend.",
  },
  {
    id: "BK-110",
    title: "Atomic Habits",
    author: "James Clear",
    isbn: "9780735211292",
    category: "Self-Improvement",
    status: "Borrowed",
    year: 2018,
    description:
      "A practical guide to building good habits and breaking bad ones.",
  },
  {
    id: "BK-111",
    title: "Dune",
    author: "Frank Herbert",
    isbn: "9780441172719",
    category: "Science Fiction",
    status: "Available",
    year: 1965,
    description:
      "Epic political and environmental struggles in a desert planet.",
  },
  {
    id: "BK-112",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    isbn: "9780547928227",
    category: "Fantasy",
    status: "Available",
    year: 1937,
    description:
      "A classic adventure of treasure, trolls, and a reluctant hero.",
  },
  {
    id: "BK-113",
    title: "The Road to Wigan Pier",
    author: "George Orwell",
    isbn: "9780141441654",
    category: "History",
    status: "Reserved",
    year: 1937,
    description:
      "A social and political classic on class and labor in Britain.",
  },
  {
    id: "BK-114",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    isbn: "9780374533557",
    category: "Psychology",
    status: "Borrowed",
    year: 2011,
    description:
      "An exploration of human judgment, decision-making, and cognitive bias.",
  },
  {
    id: "BK-115",
    title: "The Lean Startup",
    author: "Eric Ries",
    isbn: "9780307887894",
    category: "Business",
    status: "Available",
    year: 2011,
    description:
      "A method for building businesses through validated learning and iteration.",
  },
  {
    id: "BK-116",
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    isbn: "9780756404741",
    category: "Fantasy",
    status: "Available",
    year: 2007,
    description:
      "A beautifully written coming-of-age fantasy following a famed magician.",
  },
  {
    id: "BK-117",
    title: "The Martian",
    author: "Andy Weir",
    isbn: "9780804139021",
    category: "Science Fiction",
    status: "Borrowed",
    year: 2011,
    description:
      "A stranded astronaut must use engineering skill to survive alone on Mars.",
  },
  {
    id: "BK-118",
    title: "One Hundred Years of Solitude",
    author: "Gabriel García Márquez",
    isbn: "9780060883287",
    category: "Fiction",
    status: "Archived",
    year: 1967,
    description:
      "A magical realist family saga spanning generations in Macondo.",
  },
  {
    id: "BK-119",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    isbn: "9780812981605",
    category: "Psychology",
    status: "Available",
    year: 2012,
    description: "How habits shape our lives, businesses, and even societies.",
  },
  {
    id: "BK-120",
    title: "The Imposter Cure",
    author: "Dr. Jessamy Hibberd",
    isbn: "9781801526431",
    category: "Psychology",
    status: "Reserved",
    year: 2023,
    description:
      "A guide to tackling self-doubt and building confidence in everyday life.",
  },
  {
    id: "BK-121",
    title: "The Design of Everyday Things",
    author: "Don Norman",
    isbn: "9780465050659",
    category: "Design",
    status: "Available",
    year: 2013,
    description: "A foundational work on human-centered design and usability.",
  },
  {
    id: "BK-122",
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    isbn: "9780807014295",
    category: "Philosophy",
    status: "Borrowed",
    year: 1946,
    description:
      "A profound reflection on purpose and resilience in the face of suffering.",
  },
  {
    id: "BK-123",
    title: "The Midnight Library",
    author: "Matt Haig",
    isbn: "9780525559474",
    category: "Fiction",
    status: "Available",
    year: 2020,
    description: "A hopeful novel about life choices and the roads not taken.",
  },
  {
    id: "BK-124",
    title: "Project Hail Mary",
    author: "Andy Weir",
    isbn: "9780593135204",
    category: "Science Fiction",
    status: "Available",
    year: 2021,
    description:
      "A brilliant astronaut and a mysterious alien problem create an unforgettable journey.",
  },
  {
    id: "BK-125",
    title: "The Book Thief",
    author: "Markus Zusak",
    isbn: "9780375842207",
    category: "Fiction",
    status: "Borrowed",
    year: 2005,
    description:
      "A moving story told through the lens of wartime Germany and a young thief of books.",
  },
  {
    id: "BK-126",
    title: "Cognitive Neuroscience",
    author: "Marie T. Banich",
    isbn: "9781108472838",
    category: "Psychology",
    status: "Reserved",
    year: 2021,
    description:
      "A modern overview of the brain-behavior relationship and underlying mechanisms.",
  },
  {
    id: "BK-127",
    title: "The Little Prince",
    author: "Antoine de Saint-Exupéry",
    isbn: "9780156012195",
    category: "Classic",
    status: "Available",
    year: 1943,
    description:
      "A beloved fable on wonder, imagination, and the heart of childhood.",
  },
  {
    id: "BK-128",
    title: "The Revenue Growth Engine",
    author: "Milo Castaldi",
    isbn: "9781119802339",
    category: "Business",
    status: "Archived",
    year: 2022,
    description:
      "A practical overview of sustainable revenue strategies and market traction.",
  },
];

const DEFAULT_FORM = {
  title: "",
  author: "",
  isbn: "",
  category: "Fiction",
  status: "Available",
  year: new Date().getFullYear(),
  description: "",
};

const BOOK_STATUS_OPTIONS = ["Available", "Borrowed", "Reserved", "Archived"];
const PAGE_SIZE = 10;

const formatStatusClass = (status) =>
  `book-status book-status--${String(status || "available")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")}`;

const getNumericBookId = (bookId) => {
  const match = String(bookId || "").match(/(\d+)$/);
  return match ? Number(match[1]) : 0;
};

function BookCatalog() {
  const { books, loans, addBook, updateBook, deleteBook } = useLibraryData();
  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [searchIsbn, setSearchIsbn] = useState("");
  const [searchBookId, setSearchBookId] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalType, setModalType] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [deleteError, setDeleteError] = useState("");

  const booksWithLoanStatus = useMemo(
    () =>
      books.map((book) => {
        const relatedLoans = loans.filter((loan) =>
          loanMatchesBook(loan, book),
        );
        const hasActiveLoan = relatedLoans.some(
          (loan) => loan.status !== "Returned",
        );
        const hasReturnedLoan = relatedLoans.some(
          (loan) => loan.status === "Returned",
        );

        if (hasActiveLoan) {
          return { ...book, status: "Borrowed" };
        }

        if (hasReturnedLoan && book.status === "Borrowed") {
          return { ...book, status: "Available" };
        }

        return book;
      }),
    [books, loans],
  );

  const categories = useMemo(
    () =>
      Array.from(
        new Set([
          ...booksWithLoanStatus.map((book) => book.category),
          "Fiction",
          "Technology",
          "Business",
          "Science Fiction",
          "Psychology",
          "Finance",
          "History",
          "Fantasy",
          "Classic",
          "Productivity",
          "Self-Improvement",
          "Biography",
          "Philosophy",
          "Design",
        ]),
      ),
    [booksWithLoanStatus],
  );

  const filteredBooks = useMemo(() => {
    const qTitle = searchTitle.trim().toLowerCase();
    const qAuthor = searchAuthor.trim().toLowerCase();
    const qIsbn = searchIsbn.trim().toLowerCase();
    const qBookId = searchBookId.trim().toLowerCase();

    return booksWithLoanStatus.filter((book) => {
      const matchesTitle = !qTitle || book.title.toLowerCase().includes(qTitle);
      const matchesAuthor =
        !qAuthor || book.author.toLowerCase().includes(qAuthor);
      const matchesIsbn = !qIsbn || book.isbn.toLowerCase().includes(qIsbn);
      const matchesBookId = !qBookId || book.id.toLowerCase().includes(qBookId);
      const matchesStatus =
        statusFilter === "All Statuses" || book.status === statusFilter;

      return (
        matchesTitle &&
        matchesAuthor &&
        matchesIsbn &&
        matchesBookId &&
        matchesStatus
      );
    });
  }, [
    booksWithLoanStatus,
    searchAuthor,
    searchBookId,
    searchIsbn,
    searchTitle,
    statusFilter,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / PAGE_SIZE));
  const displayPage = Math.min(currentPage, totalPages);
  const startIndex = (displayPage - 1) * PAGE_SIZE;
  const visibleBooks = filteredBooks.slice(startIndex, startIndex + PAGE_SIZE);

  const openAddModal = () => {
    setFormData({ ...DEFAULT_FORM, category: "Fiction", status: "Available" });
    setSelectedBook(null);
    setModalType("add");
  };

  const openEditModal = (book) => {
    setSelectedBook(book);
    setFormData({
      id: book.id,
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      category: book.category,
      status: book.status,
      year: book.year,
      description: book.description,
    });
    setModalType("edit");
  };

  const openViewModal = (book) => {
    setSelectedBook(book);
    setModalType("view");
  };

  const openDeleteModal = (book) => {
    setSelectedBook(book);
    setDeleteError("");
    setModalType("delete");
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedBook(null);
    setFormData(DEFAULT_FORM);
    setDeleteError("");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const generateNextBookId = () => {
    const lastId = books.reduce(
      (maxId, book) => Math.max(maxId, getNumericBookId(book.id)),
      0,
    );
    return `BK-${String(lastId + 1).padStart(3, "0")}`;
  };

  const handleSaveBook = () => {
    const trimmedData = {
      id: formData.id || generateNextBookId(),
      title: formData.title.trim(),
      author: formData.author.trim(),
      isbn: formData.isbn.trim(),
      category: formData.category.trim() || "Fiction",
      status: formData.status || "Available",
      year: Number(formData.year) || new Date().getFullYear(),
      description: formData.description.trim(),
    };

    if (!trimmedData.title || !trimmedData.author || !trimmedData.isbn) {
      return;
    }

    if (modalType === "add") {
      addBook(trimmedData);
    }

    if (modalType === "edit") {
      updateBook(trimmedData.id, trimmedData);
    }

    closeModal();
  };

  const handleDeleteBook = () => {
    if (!selectedBook) {
      return;
    }

    const result = deleteBook(selectedBook.id);
    if (!result.success) {
      setDeleteError(result.message);
      return;
    }

    closeModal();
  };

  return (
    <>
      <style>{`
        .book-catalog-page {
          min-height: calc(100vh - 92px);
          padding: 24px;
          background: #f4f7fb;
          color: #1f3448;
          box-sizing: border-box;
        }

        .book-catalog-panel {
          background: #ffffff;
          border: 1px solid #e3eaf2;
          border-radius: 16px;
          box-shadow: 0 3px 12px rgba(31, 52, 72, 0.04);
          overflow: hidden;
        }

        .catalog-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 24px 24px 18px;
          border-bottom: 1px solid #edf1f5;
        }

        .catalog-header h2 {
          margin: 0;
          color: #20364a;
          font-size: 20px;
          font-weight: 700;
          line-height: 1.3;
        }

        .catalog-header p {
          margin: 6px 0 0;
          color: #8a9bad;
          font-size: 13px;
        }

        .catalog-add-btn,
        .catalog-button,
        .catalog-pagination-button,
        .modal-close-btn,
        .modal-action-btn,
        .modal-delete-btn {
          border: none;
          border-radius: 8px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.15s ease, opacity 0.15s ease, background 0.15s ease;
        }

        .catalog-add-btn {
          background: #334e68;
          color: #ffffff;
          padding: 10px 18px;
          min-width: 124px;
        }

        .catalog-add-btn:hover,
        .catalog-button:hover,
        .catalog-pagination-button:hover,
        .modal-close-btn:hover,
        .modal-action-btn:hover,
        .modal-delete-btn:hover {
          transform: translateY(-1px);
        }

        .catalog-filters {
          padding: 20px 24px 0;
        }

        .catalog-search-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 14px;
        }

        .catalog-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 0;
        }

        .catalog-field span {
          color: #52677d;
          font-size: 12px;
          font-weight: 600;
        }

        .catalog-field input,
        .catalog-field select,
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

        .catalog-field input:focus,
        .catalog-field select:focus,
        .modal-form input:focus,
        .modal-form select:focus,
        .modal-form textarea:focus {
          outline: none;
          border-color: #60a5fa;
          box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.16);
          background: #ffffff;
        }

        .catalog-table-wrap {
          width: 100%;
          overflow-x: auto;
          padding: 20px 24px 0;
          box-sizing: border-box;
        }

        .catalog-table {
          width: 100%;
          min-width: 960px;
          border-collapse: collapse;
          text-align: left;
        }

        .catalog-table th {
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

        .catalog-table td {
          padding: 14px 16px;
          border-bottom: 1px solid #edf1f5;
          color: #40566b;
          font-size: 13px;
          vertical-align: middle;
        }

        .catalog-book-meta {
          min-width: 200px;
        }

        .catalog-book-title {
          margin: 0;
          color: #294157;
          font-size: 14px;
          font-weight: 700;
        }

        .catalog-book-author {
          margin-top: 4px;
          color: #8b9db1;
          font-size: 12px;
        }

        .catalog-book-id {
          font-weight: 700;
          color: #35506d;
        }

        .catalog-isbn {
          color: #6b7d90;
          font-size: 12px;
          letter-spacing: 0.2px;
        }

        .book-status {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 82px;
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15px;
        }

        .book-status--available {
          background: #eaf8ee;
          color: #2d8a5f;
        }

        .book-status--borrowed {
          background: #fff4d6;
          color: #b7791f;
        }

        .book-status--reserved {
          background: #edf2ff;
          color: #4b62d0;
        }

        .book-status--archived {
          background: #f1f4f8;
          color: #607389;
        }

        .catalog-action-group {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .catalog-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          padding: 0;
          background: #eef4fb;
          color: #2d536f;
          border: 1px solid #dfeaf5;
        }

        .catalog-button svg {
          width: 15px;
          height: 15px;
          stroke: currentColor;
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .catalog-button--view {
          background: #eaf2ff;
          border-color: #d9e7ff;
          color: #3e6fd1;
        }

        .catalog-button--edit {
          background: #fff4e5;
          border-color: #f7e4c7;
          color: #c7812d;
        }

        .catalog-button--danger {
          background: #fff1f3;
          border-color: #f7ced6;
          color: #b43348;
        }

        .catalog-empty-state {
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

        .catalog-empty-state h3 {
          margin: 0;
          color: #20364a;
          font-size: 24px;
        }

        .catalog-empty-state p {
          margin: 0;
          max-width: 520px;
          color: #71869a;
          line-height: 1.6;
        }

        .catalog-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 18px 24px 24px;
          color: #607389;
          font-size: 12px;
        }

        .catalog-pagination {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .catalog-pagination-button {
          min-width: 34px;
          height: 34px;
          padding: 0 10px;
          background: #eef4fb;
          color: #2d536f;
          border: 1px solid #dfeaf5;
        }

        .catalog-pagination-button.is-active {
          background: #334e68;
          border-color: #334e68;
          color: #ffffff;
        }

        .catalog-pagination-button:disabled {
          cursor: not-allowed;
          opacity: 0.55;
          transform: none;
        }

        .catalog-modal-backdrop {
          position: fixed;
          inset: 0;
          display: grid;
          place-items: center;
          background: rgba(15, 23, 42, 0.45);
          z-index: 20;
          padding: 20px;
        }

        .catalog-modal {
          width: min(100%, 620px);
          background: #ffffff;
          border: 1px solid #dfe7ef;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.2);
          overflow: hidden;
        }

        .catalog-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 20px 22px 16px;
          border-bottom: 1px solid #edf1f5;
        }

        .catalog-modal-header h3 {
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

        .modal-action-btn--secondary {
          background: #eef4fb;
          border: 1px solid #dfeaf5;
          color: #2d536f;
        }

        .modal-delete-btn {
          padding: 10px 18px;
          background: #b43348;
          color: #ffffff;
        }

        .modal-detail-card {
          padding: 20px 22px 18px;
        }

        .modal-detail-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 18px;
        }

        .modal-detail-header h3 {
          margin: 0;
          color: #20364a;
          font-size: 22px;
        }

        .modal-detail-grid {
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
          color: #20364a;
          font-size: 14px;
          line-height: 1.5;
        }

        .detail-item--full {
          grid-column: 1 / -1;
        }

        @media (max-width: 960px) {
          .catalog-search-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .book-catalog-page {
            padding: 16px;
          }

          .catalog-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .catalog-search-grid,
          .modal-form,
          .modal-detail-grid {
            grid-template-columns: 1fr;
          }

          .catalog-footer {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="book-catalog-page">
        <section className="book-catalog-panel" aria-label="Book catalog page">
          <div className="catalog-header">
            <div>
              <h2>Book Catalog</h2>
              <p>Manage the library collection and inventory.</p>
            </div>

            <button
              type="button"
              className="catalog-add-btn"
              onClick={openAddModal}
            >
              + Add Book
            </button>
          </div>

          <div className="catalog-filters">
            <div className="catalog-search-grid">
              <label className="catalog-field">
                <span>Search by title</span>
                <input
                  type="text"
                  value={searchTitle}
                  onChange={(event) => {
                    setSearchTitle(event.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Title"
                />
              </label>

              <label className="catalog-field">
                <span>Search by author</span>
                <input
                  type="text"
                  value={searchAuthor}
                  onChange={(event) => {
                    setSearchAuthor(event.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Author"
                />
              </label>

              <label className="catalog-field">
                <span>Search by ISBN</span>
                <input
                  type="text"
                  value={searchIsbn}
                  onChange={(event) => {
                    setSearchIsbn(event.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="ISBN"
                />
              </label>

              <label className="catalog-field">
                <span>Search by Book ID</span>
                <input
                  type="text"
                  value={searchBookId}
                  onChange={(event) => {
                    setSearchBookId(event.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="BK-101"
                />
              </label>

              <label className="catalog-field">
                <span>Status</span>
                <select
                  value={statusFilter}
                  onChange={(event) => {
                    setStatusFilter(event.target.value);
                    setCurrentPage(1);
                  }}
                >
                  {["All Statuses", ...BOOK_STATUS_OPTIONS].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="catalog-table-wrap">
            {filteredBooks.length === 0 ? (
              <div className="catalog-empty-state">
                <h3>No books found</h3>
                <p>
                  There are no matching books for the current search and filter
                  settings. Try another keyword or add a new title to the
                  collection.
                </p>
              </div>
            ) : (
              <table className="catalog-table">
                <thead>
                  <tr>
                    <th scope="col">Book</th>
                    <th scope="col">Book ID</th>
                    <th scope="col">ISBN</th>
                    <th scope="col">Category</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {visibleBooks.map((book) => (
                    <tr key={book.id}>
                      <td>
                        <div className="catalog-book-meta">
                          <p className="catalog-book-title">{book.title}</p>
                          <p className="catalog-book-author">
                            by {book.author}
                          </p>
                        </div>
                      </td>

                      <td className="catalog-book-id">{book.id}</td>

                      <td className="catalog-isbn">{book.isbn}</td>

                      <td>{book.category}</td>

                      <td>
                        <span className={formatStatusClass(book.status)}>
                          {book.status}
                        </span>
                      </td>

                      <td>
                        <div className="catalog-action-group">
                          <button
                            type="button"
                            className="catalog-button catalog-button--view"
                            onClick={() => openViewModal(book)}
                            aria-label="View book"
                            title="View book"
                          >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          </button>

                          <button
                            type="button"
                            className="catalog-button catalog-button--edit"
                            onClick={() => openEditModal(book)}
                            aria-label="Edit book"
                            title="Edit book"
                          >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M4 20h4l10.5-10.5a2.12 2.12 0 0 0-3-3L5 17v3Z" />
                              <path d="m13.5 6.5 4 4" />
                            </svg>
                          </button>

                          <button
                            type="button"
                            className="catalog-button catalog-button--danger"
                            onClick={() => openDeleteModal(book)}
                            aria-label="Delete book"
                            title="Delete book"
                          >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M4 7h16" />
                              <path d="M9 7V4h6v3" />
                              <path d="M7 7l1 12h8l1-12" />
                              <path d="M10 11v5M14 11v5" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {filteredBooks.length > 0 && (
            <div className="catalog-footer">
              <span>
                Showing {(currentPage - 1) * PAGE_SIZE + 1} -{" "}
                {Math.min(currentPage * PAGE_SIZE, filteredBooks.length)} of{" "}
                {filteredBooks.length} books
              </span>

              <div
                className="catalog-pagination"
                aria-label="Pagination navigation"
              >
                <button
                  type="button"
                  className="catalog-pagination-button"
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  disabled={currentPage === 1}
                >
                  Prev
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`catalog-pagination-button ${currentPage === page ? "is-active" : ""}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  className="catalog-pagination-button"
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </section>

        {modalType && (
          <div className="catalog-modal-backdrop" role="presentation">
            {modalType === "add" || modalType === "edit" ? (
              <div
                className="catalog-modal"
                role="dialog"
                aria-modal="true"
                aria-label={modalType === "add" ? "Add Book" : "Edit Book"}
              >
                <div className="catalog-modal-header">
                  <h3>{modalType === "add" ? "Add New Book" : "Edit Book"}</h3>
                  <button
                    type="button"
                    className="modal-close-btn"
                    onClick={closeModal}
                    aria-label="Close dialog"
                  >
                    ×
                  </button>
                </div>

                <div className="modal-form">
                  <label>
                    Title
                    <input
                      name="title"
                      type="text"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </label>

                  <label>
                    Author
                    <input
                      name="author"
                      type="text"
                      value={formData.author}
                      onChange={handleInputChange}
                    />
                  </label>

                  <label>
                    ISBN
                    <input
                      name="isbn"
                      type="text"
                      value={formData.isbn}
                      onChange={handleInputChange}
                    />
                  </label>

                  <label>
                    Book ID
                    <input
                      name="id"
                      type="text"
                      value={formData.id || ""}
                      onChange={handleInputChange}
                      disabled={modalType === "edit"}
                    />
                  </label>

                  <label>
                    Category
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      {Array.from(
                        new Set([
                          ...categories.filter(
                            (category) => category !== "All Categories",
                          ),
                          "Fiction",
                          "Technology",
                          "Business",
                          "Science Fiction",
                          "Psychology",
                          "Finance",
                          "History",
                          "Fantasy",
                          "Classic",
                          "Productivity",
                          "Self-Improvement",
                          "Biography",
                          "Philosophy",
                          "Design",
                        ]),
                      ).map((category) => (
                        <option key={category} value={category}>
                          {category}
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
                      {BOOK_STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Year
                    <input
                      name="year"
                      type="number"
                      min="1900"
                      max="2100"
                      value={formData.year}
                      onChange={handleInputChange}
                    />
                  </label>

                  <label className="full-width">
                    Description
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Short book description"
                    />
                  </label>
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="modal-action-btn modal-action-btn--secondary"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="modal-action-btn"
                    onClick={handleSaveBook}
                  >
                    {modalType === "add" ? "Add Book" : "Save Changes"}
                  </button>
                </div>
              </div>
            ) : null}

            {modalType === "view" && selectedBook ? (
              <div
                className="catalog-modal catalog-modal--detail"
                role="dialog"
                aria-modal="true"
                aria-label="View Book Details"
              >
                <div className="catalog-modal-header">
                  <h3>Book Details</h3>
                  <button
                    type="button"
                    className="modal-close-btn"
                    onClick={closeModal}
                    aria-label="Close dialog"
                  >
                    ×
                  </button>
                </div>

                <div className="modal-detail-card">
                  <div className="modal-detail-header">
                    <h3>{selectedBook.title}</h3>
                    <span className={formatStatusClass(selectedBook.status)}>
                      {selectedBook.status}
                    </span>
                  </div>

                  <div className="modal-detail-grid">
                    <div className="detail-item">
                      <label>Author</label>
                      <p>{selectedBook.author}</p>
                    </div>

                    <div className="detail-item">
                      <label>Category</label>
                      <p>{selectedBook.category}</p>
                    </div>

                    <div className="detail-item">
                      <label>Book ID</label>
                      <p>{selectedBook.id}</p>
                    </div>

                    <div className="detail-item">
                      <label>ISBN</label>
                      <p>{selectedBook.isbn}</p>
                    </div>

                    <div className="detail-item">
                      <label>Publication Year</label>
                      <p>{selectedBook.year}</p>
                    </div>

                    <div className="detail-item">
                      <label>Availability</label>
                      <p>{selectedBook.status}</p>
                    </div>

                    <div className="detail-item detail-item--full">
                      <label>Description</label>
                      <p>
                        {selectedBook.description ||
                          "No description available."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="modal-action-btn modal-action-btn--secondary"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : null}

            {modalType === "delete" && selectedBook ? (
              <div
                className="catalog-modal catalog-modal--delete"
                role="dialog"
                aria-modal="true"
                aria-label="Delete Book"
              >
                <div className="catalog-modal-header">
                  <h3>Delete Book</h3>
                  <button
                    type="button"
                    className="modal-close-btn"
                    onClick={closeModal}
                    aria-label="Close dialog"
                  >
                    ×
                  </button>
                </div>

                <div className="modal-detail-card">
                  <p
                    style={{
                      margin: 0,
                      fontSize: 16,
                      color: "#20364a",
                      lineHeight: 1.6,
                    }}
                  >
                    Are you sure you want to delete{" "}
                    <strong>{selectedBook.title}</strong> ({selectedBook.id})?
                    This action cannot be undone.
                  </p>
                  {deleteError && <p className="form-error">{deleteError}</p>}
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="modal-action-btn modal-action-btn--secondary"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="modal-delete-btn"
                    onClick={handleDeleteBook}
                  >
                    Delete Book
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </>
  );
}

export default BookCatalog;
