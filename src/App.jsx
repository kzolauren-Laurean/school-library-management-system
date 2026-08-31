import { useState } from "react";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import BookCatalog from "./pages/BookCatalog";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    if (currentPage === "book-catalog") {
      return <BookCatalog />;
    }

    return <Dashboard />;
  };

  return (
    <Layout
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      title={currentPage === "book-catalog" ? "Book Catalog" : "Dashboard"}
    >
      {renderPage()}
    </Layout>
  );
}

export default App;