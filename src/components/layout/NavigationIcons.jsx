export function DashboardIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 19h16" />
      <path d="M5 16.5 9.2 12l3.1 3 6.7-7" />
      <path d="M15.5 8H19v3.5" />
    </svg>
  );
}

export function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v15.5H7.5A2.5 2.5 0 0 0 5 21V5.5Z" />
      <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v15.5H7.5A2.5 2.5 0 0 0 5 21M7.5 6h7.5M7.5 10h7.5" />
    </svg>
  );
}

export function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16 18v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" />
      <path d="M12 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
      <path d="M19 18v-1a3.5 3.5 0 0 0-2.7-3.4" />
      <path d="M17 5.5a3.5 3.5 0 0 1 0 6.7" />
    </svg>
  );
}

export function BorrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h10a3 3 0 0 1 3 3v.5" />
      <path d="M7 4 4 7l3 3" />
      <path d="M20 17H10a3 3 0 0 1-3-3v-.5" />
      <path d="M17 20l3-3-3-3" />
    </svg>
  );
}

export function ReturnIcon() {
  return <span aria-hidden="true">↩</span>;
}

export function ReportsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 18V9" />
      <path d="M12 18V5" />
      <path d="M19 18v-7" />
      <path d="M3 18h18" />
    </svg>
  );
}

export function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.75v2.5M12 17.75v2.5M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M3.75 12h2.5M17.75 12h2.5M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  );
}

export const navigationIcons = {
  dashboard: DashboardIcon,
  "book-catalog": BookIcon,
  students: UsersIcon,
  borrowing: BorrowIcon,
  returns: ReturnIcon,
  reports: ReportsIcon,
  settings: GearIcon,
};