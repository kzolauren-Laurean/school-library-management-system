export const PAGE_PATHS = {
  dashboard: "/dashboard",
  "book-catalog": "/books",
  students: "/students",
  borrowing: "/borrowing",
  returns: "/returns",
  reports: "/reports",
  settings: "/settings",
};

const PATH_TO_PAGE = Object.fromEntries(
  Object.entries(PAGE_PATHS).map(([pageKey, path]) => [path, pageKey]),
);

export const PAGE_TITLES = {
  dashboard: "Dashboard",
  "book-catalog": "Book Catalog",
  students: "Students",
  borrowing: "Borrowing",
  returns: "Returns",
  reports: "Reports",
  settings: "Settings",
};

export const PAGE_SUBTITLES = {
  returns: "Process book returns",
  borrowing: "Track active book loans",
  reports:
    "Analyze library activity, borrowing trends, and collection performance",
  settings: "Manage your library preferences",
};

export function getPageKeyFromPath(pathname) {
  return PATH_TO_PAGE[pathname] || "dashboard";
}

export function getPathForPage(pageKey) {
  return PAGE_PATHS[pageKey] || PAGE_PATHS.dashboard;
}
