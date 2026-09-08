import { useState } from "react";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import BookCatalog, { initialBooks } from "./pages/BookCatalog";
import Students, { initialStudents } from "./pages/Students";
import Returns from "./pages/Returns";
import { LibraryDataProvider } from "./data/LibraryDataContext";
import Borrowing from "./pages/Borrowing";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const getPageTitle = () => {
    if (currentPage === "book-catalog") {
      return "Book Catalog";
    }

    if (currentPage === "students") {
      return "Students";
    }

    if (currentPage === "returns") {
      return "Returns";
    }

    if (currentPage === "borrowing") {
      return "Borrowing";
    }

    return "Dashboard";
  };

  const renderPage = () => {
    if (currentPage === "book-catalog") {
      return <BookCatalog />;
    }

    if (currentPage === "students") {
      return <Students />;
    }

    if (currentPage === "returns") {
      return <Returns />;
    }

    if (currentPage === "borrowing") {
      return <Borrowing onNavigate={setCurrentPage} />;
    }

    return <Dashboard />;
  };

  const pageSubtitle = currentPage === "returns"
    ? "Process book returns"
    : currentPage === "borrowing"
      ? "Track active book loans"
      : undefined;

  return (
    <LibraryDataProvider initialBooks={initialBooks} initialStudents={initialStudents}>
      <Layout
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        title={getPageTitle()}
        subtitle={pageSubtitle}
      >
        {renderPage()}
      </Layout>
    </LibraryDataProvider>
  );
}

export default App;
