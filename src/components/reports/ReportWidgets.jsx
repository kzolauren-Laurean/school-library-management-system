export function AnalyticsCard({
  title,
  subtitle,
  action,
  className = "",
  children,
}) {
  const actionContent =
    action == null ? null : typeof action === "string" ? (
      <button type="button" className="reports-view-button">
        {action} ›
      </button>
    ) : action.$$typeof ? (
      action
    ) : (
      <button
        type="button"
        className="reports-view-button"
        onClick={action.onClick}
      >
        {action.label} ›
      </button>
    );

  return (
    <section className={`reports-card ${className}`}>
      <header className="reports-card-header">
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
        {actionContent}
      </header>
      {children}
    </section>
  );
}

export function ReportStatCard({ tone, icon, value, label, helper }) {
  return (
    <article className="reports-stat-card">
      <span className={`reports-stat-icon reports-stat-icon--${tone}`}>
        {icon}
      </span>
      <div>
        <strong>{value.toLocaleString()}</strong>
        <b>{label}</b>
        <small>{helper}</small>
      </div>
    </article>
  );
}

export function RankedList({ items, emptyText, tone }) {
  const max = Math.max(1, ...items.map((item) => item.count));
  if (!items.length)
    return (
      <div className="reports-ranked-empty">
        <span className="reports-empty-icon" aria-hidden="true">
          -
        </span>
        <strong>
          {tone === "green" ? "No student activity" : "No borrowing activity"}
        </strong>
        <p>{emptyText}</p>
      </div>
    );
  return (
    <ol className={`reports-ranked-list reports-ranked-list--${tone}`}>
      {items.map((item, index) => (
        <li key={item.title}>
          <span className="reports-rank">{index + 1}</span>
          <span className="reports-ranked-title">{item.title}</span>
          <span className="reports-ranked-bar">
            <i style={{ width: `${(item.count / max) * 100}%` }} />
          </span>
          <b>{item.count}</b>
        </li>
      ))}
    </ol>
  );
}

export function Donut({ value, label, segments, small = false }) {
  const total = Math.max(
    1,
    segments.reduce((sum, segment) => sum + segment.value, 0),
  );
  const stops = segments
    .reduce(
      (result, segment) => {
        const start = result.cursor;
        const end = start + (segment.value / total) * 100;
        return {
          cursor: end,
          values: [...result.values, `${segment.color} ${start}% ${end}%`],
        };
      },
      { cursor: 0, values: [] },
    )
    .values.join(", ");
  return (
    <div
      className={`reports-donut ${small ? "reports-donut--small" : ""}`}
      style={{ background: `conic-gradient(${stops})` }}
    >
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

export function TrendChart({ points }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const maxValue = Math.max(0, ...points.map((point) => point.value));
  const scaleMax = Math.max(4, Math.ceil(maxValue / 4) * 4);
  const position = (point, index) => ({
    x: (index / Math.max(1, points.length - 1)) * 600,
    y: 190 - (point.value / scaleMax) * 166,
  });
  const coordinates = points.map(position);
  const line = coordinates
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
  const area = `${line} L 600 190 L 0 190 Z`;
  const yTicks = [
    scaleMax,
    scaleMax * 0.75,
    scaleMax * 0.5,
    scaleMax * 0.25,
    0,
  ];
  const active =
    activeIndex === null
      ? null
      : {
          ...points[activeIndex],
          ...coordinates[activeIndex],
        };
  return (
    <div className="reports-chart reports-chart--interactive">
      <div className="reports-chart-scale" aria-hidden="true">
        {yTicks.map((tick) => (
          <span key={tick}>{tick}</span>
        ))}
      </div>
      <svg
        viewBox="0 0 600 200"
        preserveAspectRatio="none"
        role="img"
        aria-label="Monthly borrowing trend"
        onMouseLeave={() => setActiveIndex(null)}
      >
        <defs>
          <linearGradient id="reports-chart-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#438cf0" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#438cf0" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path
          className="reports-grid-line"
          d="M0 24H600M0 65.5H600M0 107H600M0 148.5H600M0 190H600M0 24V190M54.5 24V190M109 24V190M163.5 24V190M218 24V190M272.5 24V190M327 24V190M381.5 24V190M436 24V190M490.5 24V190M545 24V190M600 24V190"
        />
        <path className="reports-chart-area" d={area} />
        <path
          className="reports-chart-line reports-chart-line--borrowed"
          d={line}
        />
        {active && (
          <line
            className="reports-chart-guide"
            x1={active.x}
            x2={active.x}
            y1="24"
            y2="190"
          />
        )}
        {points.map((point, index) => {
          const pointCoordinates = coordinates[index];
          const isActive = activeIndex === index;
          return (
            <circle
              key={point.label}
              className={
                isActive
                  ? "reports-chart-point reports-chart-point--active"
                  : "reports-chart-point"
              }
              cx={pointCoordinates.x}
              cy={pointCoordinates.y}
              r={isActive ? "4" : "3"}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              tabIndex="0"
              aria-label={`${point.label}: ${point.value} borrows`}
            />
          );
        })}
      </svg>
      {active && (
        <div
          className="reports-chart-tooltip"
          style={{
            left: `${Math.max(9, Math.min(91, (active.x / 600) * 100))}%`,
            top: `${(active.y / 200) * 100}%`,
          }}
        >
          <strong>{active.label}</strong>
          <span>
            {active.value} {active.value === 1 ? "borrow" : "borrows"}
          </span>
        </div>
      )}
      <div className="reports-chart-labels">
        {points.map((point) => (
          <span key={point.label}>{point.label}</span>
        ))}
      </div>
    </div>
  );
}
import { useState } from "react";
