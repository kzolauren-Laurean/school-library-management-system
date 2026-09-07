import { createContext, useContext, useMemo, useState } from "react";

const FINE_PER_DAY = 0.25;

export const getDateOnly = () => new Date().toISOString().slice(0, 10);

export const getDayDifference = (from, to) =>
  Math.round(
    (new Date(`${to}T00:00:00`) - new Date(`${from}T00:00:00`)) / 86400000
  );

export const getLoanDetails = (loan, today = getDateOnly()) => {
  if (loan.status === "Returned") {
    return {
      ...loan,
      status: "Returned",
      days: null,
      overdueDays: Math.max(0, getDayDifference(loan.dueDate, loan.returnedDate)),
      fine: loan.finalFine || 0,
    };
  }

  const daysUntilDue = getDayDifference(today, loan.dueDate);
  const overdueDays = Math.max(0, -daysUntilDue);

  return {
    ...loan,
    status: overdueDays > 0 ? "Overdue" : "Active",
    days: daysUntilDue,
    overdueDays,
    fine: overdueDays * FINE_PER_DAY,
  };
};

const initialLoans = [
  ["LN-2001", "Ava Thompson", "ST-101", "The Great Gatsby", "F. Scott Fitzgerald", "2026-08-18", "2026-09-01"],
  ["LN-2002", "Liam Carter", "ST-102", "To Kill a Mockingbird", "Harper Lee", "2026-08-20", "2026-09-02"],
  ["LN-2003", "Noah Patel", "ST-104", "The Hobbit", "J.R.R. Tolkien", "2026-08-25", "2026-09-05", "BK-112"],
  ["LN-2004", "Emma Rodriguez", "ST-105", "Anne of Green Gables", "L.M. Montgomery", "2026-08-27", "2026-09-08"],
  ["LN-2005", "Chloe Martin", "ST-107", "Charlotte's Web", "E.B. White", "2026-08-22", "2026-09-04"],
  ["LN-2006", "James Wilson", "ST-108", "The Odyssey", "Homer", "2026-08-29", "2026-09-10"],
  ["LN-2007", "Lucas Johnson", "ST-110", "The Alchemist", "Paulo Coelho", "2026-08-19", "2026-08-31", "BK-109"],
  ["LN-2008", "Harper Davis", "ST-111", "Frankenstein", "Mary Shelley", "2026-08-30", "2026-09-12"],
  ["LN-2009", "Ethan Baker", "ST-112", "The Secret of the Blue Land", "Tania Unsworth", "2026-08-26", "2026-09-09"],
  ["LN-2010", "Benjamin White", "ST-114", "The Iliad", "Homer", "2026-08-21", "2026-09-03"],
  ["LN-2011", "Ella Brown", "ST-115", "The Giver", "Lois Lowry", "2026-08-31", "2026-09-11"],
  ["LN-2012", "Amelia Harris", "ST-117", "Jane Eyre", "Charlotte Bronte", "2026-08-24", "2026-09-06"],
  ["LN-2013", "Scarlett Clark", "ST-119", "Little Women", "Louisa May Alcott", "2026-08-23", "2026-09-14"],
  ["LN-2014", "Daniel Walker", "ST-120", "The Wonderful Wizard of Oz", "L. Frank Baum", "2026-08-28", "2026-09-13"],
  ["LN-2015", "Mason Lee", "ST-106", "Clean Code", "Robert C. Martin", "2026-08-17", "2026-08-29", "BK-105"],
  ["LN-2016", "Sophia Nguyen", "ST-103", "The Midnight Library", "Matt Haig", "2026-08-15", "2026-08-28", "BK-123"],
  ["LN-2017", "Isabella Moore", "ST-109", "Dune", "Frank Herbert", "2026-08-30", "2026-09-15", "BK-111"],
  ["LN-2018", "Alexander Scott", "ST-118", "Project Hail Mary", "Andy Weir", "2026-08-27", "2026-09-16", "BK-124"],
  ["LN-2019", "Ava Thompson", "ST-101", "Pride and Prejudice", "Jane Austen", "2026-08-20", "2026-09-07"],
  ["LN-2020", "Noah Patel", "ST-104", "A Wrinkle in Time", "Madeleine L'Engle", "2026-08-18", "2026-08-30"],
].map(([loanId, studentName, studentId, bookTitle, author, borrowDate, dueDate, bookId]) => ({
  loanId,
  studentName,
  studentId,
  bookId: bookId || null,
  bookTitle,
  author,
  borrowDate,
  dueDate,
  status: "Active",
  returnedDate: null,
  finalFine: 0,
  fineStatus: "Unpaid",
}));

const LibraryDataContext = createContext(null);

export function LibraryDataProvider({ children }) {
  const [loans, setLoans] = useState(initialLoans);

  const returnLoan = (loanId, returnedDate = getDateOnly()) => {
    setLoans((currentLoans) =>
      currentLoans.map((loan) => {
        if (loan.loanId !== loanId || loan.status === "Returned") {
          return loan;
        }

        const details = getLoanDetails(loan, returnedDate);

        return {
          ...loan,
          status: "Returned",
          returnedDate,
          finalFine: details.fine,
          fineStatus: details.fine > 0 ? "Unpaid" : "None",
        };
      })
    );
  };

  const value = useMemo(() => ({ loans, returnLoan }), [loans]);

  return <LibraryDataContext.Provider value={value}>{children}</LibraryDataContext.Provider>;
}

export function useLibraryData() {
  const context = useContext(LibraryDataContext);

  if (!context) {
    throw new Error("useLibraryData must be used inside LibraryDataProvider");
  }

  return context;
}
