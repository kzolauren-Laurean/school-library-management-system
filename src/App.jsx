import { useState } from "react";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import BookCatalog, { initialBooks } from "./pages/BookCatalog";
import Students, { initialStudents } from "./pages/Students";
import Returns from "./pages/Returns";
import { LibraryDataProvider } from "./data/LibraryDataContext";
import Borrowing from "./pages/Borrowing";
import Settings from "./pages/Settings";
import { defaultSettings } from "./pages/settingsDefaults";
import "./theme.css";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [savedSettings, setSavedSettings] = useState(defaultSettings);
  const [theme, setTheme] = useState(defaultSettings.theme);

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

    if (currentPage === "settings") {
      return "Settings";
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

    if (currentPage === "settings") {
      return <Settings initialSettings={savedSettings} onSave={setSavedSettings} onThemeChange={(nextTheme) => {
        setTheme(nextTheme);
        setSavedSettings((currentSettings) => ({ ...currentSettings, theme: nextTheme }));
      }} />;
    }

    return <Dashboard />;
  };

  const pageSubtitle = currentPage === "returns"
    ? "Process book returns"
      : currentPage === "borrowing"
      ? "Track active book loans"
      : currentPage === "settings"
        ? "Manage your library preferences"
      : undefined;

  return (
    <LibraryDataProvider initialBooks={initialBooks} initialStudents={initialStudents}>
      <div className={`app-theme app-theme--${theme}`}>
      <Layout
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        title={getPageTitle()}
        subtitle={pageSubtitle}
      >
        {renderPage()}
      </Layout>
      </div>
    </LibraryDataProvider>
  );
}

export default App;
