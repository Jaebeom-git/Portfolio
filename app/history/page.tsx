import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { historyItems, pageSummaries } from "@/src/lib/portfolioData";
import { absoluteUrl, site, withBasePath } from "@/src/lib/site";

export const metadata: Metadata = {
  title: pageSummaries.history.title,
  description: pageSummaries.history.description,
  alternates: { canonical: absoluteUrl("/history/") },
  openGraph: {
    title: `${pageSummaries.history.title} | Jaebeom Jo`,
    description: pageSummaries.history.description,
    url: absoluteUrl("/history/"),
  },
};

function monthIndex(value: string) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return 0;
  return date.getFullYear() * 12 + date.getMonth();
}

function compactPeriod(startDate: string, endDate: string) {
  const start = startDate ? new Date(startDate).getFullYear() : "";
  const end = endDate ? new Date(endDate).getFullYear() : "Now";
  return start ? `${start}–${end}` : String(end);
}

function buildHorizontalTimeline() {
  const sortedItems = [...historyItems]
    .filter((item) => item.startDate)
    .sort((a, b) => monthIndex(a.startDate) - monthIndex(b.startDate));

  const startMonth = Math.min(...sortedItems.map((item) => monthIndex(item.startDate)));
  const endMonth = Math.max(...sortedItems.map((item) => monthIndex(item.endDate || new Date().toISOString())));
  const laneEnds: number[] = [];

  const items = sortedItems.map((item) => {
    const itemStart = monthIndex(item.startDate);
    const itemEnd = monthIndex(item.endDate || new Date().toISOString());
    const lane = laneEnds.findIndex((end) => itemStart > end);
    const resolvedLane = lane === -1 ? laneEnds.length : lane;
    laneEnds[resolvedLane] = itemEnd;

    return {
      ...item,
      compactPeriod: compactPeriod(item.startDate, item.endDate),
      startOffset: itemStart - startMonth + 1,
      duration: Math.max(itemEnd - itemStart + 1, 1),
      lane: resolvedLane + 1,
    };
  });

  const years = Array.from(
    { length: Math.floor(endMonth / 12) - Math.floor(startMonth / 12) + 1 },
    (_, index) => Math.floor(startMonth / 12) + index,
  ).map((year) => ({
    year,
    offset: Math.max(year * 12 - startMonth + 1, 1),
  }));

  return {
    endMonth,
    items,
    laneCount: laneEnds.length,
    startMonth,
    totalMonths: endMonth - startMonth + 1,
    years,
  };
}

export default function HistoryPage() {
  const horizontalTimeline = buildHorizontalTimeline();

  return (
    <main className="notion-page">
      <nav className="topbar" aria-label="Primary navigation">
        <Link className="brand" href="/">
          <span className="brand-mark">JB</span>
          <span>{site.owner}</span>
        </Link>
        <div className="nav-links">
          <Link href="/">Main</Link>
          <Link href="/cv/">Curriculum Vitae</Link>
          <Link href="/projects/">Projects</Link>
        </div>
      </nav>

      <section className="section-shell page-header">
        <p className="eyebrow">History</p>
        <h1>{pageSummaries.history.title}</h1>
        <p>{pageSummaries.history.description}</p>
      </section>

      <section className="section-shell horizontal-timeline-shell" aria-label="Chronological history timeline">
        <div
          className="horizontal-timeline"
          style={{ "--lane-count": horizontalTimeline.laneCount } as CSSProperties}
        >
          <div
            className="horizontal-timeline-axis"
          >
            {horizontalTimeline.years.map((tick) => (
              <span
                className="horizontal-timeline-year"
                key={tick.year}
                style={{ left: `${((tick.offset - 1) / horizontalTimeline.totalMonths) * 100}%` }}
              >
                {tick.year}
              </span>
            ))}
          </div>

          {horizontalTimeline.items.map((item) => (
            <a
              aria-label={`${item.title}, ${item.period}`}
              className={`horizontal-timeline-item${item.isPresent ? " is-present" : ""}`}
              data-label={`${item.title} · ${item.period}`}
              href={`#history-${item.slug}`}
              key={item.title}
              style={{
                "--start": `${((item.startOffset - 1) / horizontalTimeline.totalMonths) * 100}%`,
                "--top": `${46 + (item.lane - 1) * 52}px`,
                "--width": `${(item.duration / horizontalTimeline.totalMonths) * 100}%`,
              } as CSSProperties}
            >
              <div className="horizontal-timeline-bar" />
              <div className="horizontal-timeline-label">
                {item.iconImage ? (
                  <span className="notion-icon image-icon">
                    <img src={withBasePath(item.iconImage)} alt={`${item.title} icon`} />
                  </span>
                ) : (
                  <span className="notion-icon">{item.icon}</span>
                )}
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="section-shell section-card">
        <div className="timeline large-timeline">
          {historyItems.map((item) => (
            <article className={`timeline-item${item.isPresent ? " is-present" : ""}`} id={`history-${item.slug}`} key={item.title}>
              {item.iconImage ? (
                <span className="notion-icon image-icon">
                  <img src={withBasePath(item.iconImage)} alt={`${item.title} icon`} />
                </span>
              ) : (
                <span className="notion-icon">{item.icon}</span>
              )}
              <div>
                <h2>{item.title}</h2>
                <p>{item.period ? `${item.period} · ${item.detail}` : item.detail}</p>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
