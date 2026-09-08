export const FINE_PER_DAY = 0.25;
export const FINE_STATUSES = ["None", "Unpaid", "Paid", "Waived"];

export const getFineForOverdueDays = (overdueDays) => overdueDays * FINE_PER_DAY;

export const loanMatchesBook = (loan, book) =>
  loan.bookId ? loan.bookId === book.id : loan.bookTitle === book.title;

export const getDateOnly = () => new Date().toISOString().slice(0, 10);

export const getDayDifference = (from, to) =>
  Math.round(
    (new Date(`${to}T00:00:00`) - new Date(`${from}T00:00:00`)) / 86400000
  );

export const getLoanDetails = (loan, today = getDateOnly()) => {
  if (loan.status === "Returned") {
    const fine = loan.finalFine || 0;

    return {
      ...loan,
      status: "Returned",
      days: null,
      overdueDays: Math.max(0, getDayDifference(loan.dueDate, loan.returnedDate)),
      fine,
      fineStatus: loan.fineStatus || (fine > 0 ? "Unpaid" : "None"),
    };
  }

  const daysUntilDue = getDayDifference(today, loan.dueDate);
  const overdueDays = Math.max(0, -daysUntilDue);
  const fine = getFineForOverdueDays(overdueDays);

  return {
    ...loan,
    status: overdueDays > 0 ? "Overdue" : "Active",
    days: daysUntilDue,
    overdueDays,
    fine,
    fineStatus: loan.fineStatus || (fine > 0 ? "Unpaid" : "None"),
  };
};
