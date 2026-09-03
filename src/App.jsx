import { useState } from "react";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import BookCatalog from "./pages/BookCatalog";
import Students from "./pages/Students";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const getPageTitle = () => {
    if (currentPage === "book-catalog") {
      return "Book Catalog";
    }

    if (currentPage === "students") {
      return "Students";
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

    return <Dashboard />;
  };

  return (
    <Layout
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      title={getPageTitle()}
    >
      {renderPage()}
    </Layout>
  );
}

export default App;