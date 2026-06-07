/* ============ proposals index — view ============ */

const fmtPct1 = (n) => (Math.round(n * 10) / 10).toString();

function StatusChip({ p }) {
  if (p.phase === "ended") {
    return p.passed
      ? <span className="badge badge--passed"><span className="dot"></span>Passed</span>
      : <span className="badge badge--failed"><span className="dot"></span>Failed</span>;
  }
  if (p.phase === "discussion")
    return <span className="badge badge--ended"><span className="dot"></span>Discussion</span>;
  return <span className="badge badge--active"><span className="dot"></span>Started</span>;
}

// one date tag reflecting the proposal's CURRENT lifecycle position only
function DateTag({ p }) {
  let label, date, icon;
  if (p.phase === "ended") { label = "Ended"; date = p.votingEnd; icon = "check"; }
  else if (p.phase === "discussion") { label = "Created"; date = p.created; icon = "sparkle"; }
  else { label = "Started"; date = p.votingStart; icon = "clock"; }
  return <span className="prop-date"><Icon name={icon} size={13} /> {label} {date}</span>;
}

/* live participation visual (active / voted) */
function QuorumMini({ p }) {
  const { participationVP: part, eligibleVP: total } = p;
  const fill = Math.min(100, (part / total) * 100);
  const turnout = (part / total) * 100;
  return (
    <div className="prop-side">
      <div className="ps-lbl">
        <span>Voting power</span>
        <span style={{ color: "var(--ink-2)", fontWeight: 600 }}>{fmtVP(part)} VP</span>
      </div>
      <div className="qbar sm">
        <div className="qbar-fill" style={{ width: fill + "%" }}></div>
      </div>
      <div className="ps-foot"><Icon name="users" size={12} sw={1.6} /> {fmtFull(p.voterCount)} voters · {fmtPct1(turnout)}% turnout</div>
    </div>
  );
}

/* revealed result visual (ended) */
function ResultMini({ p }) {
  const r = p.result;
  const top = p.passed ? "For" : "Against";
  const topPct = p.passed ? r.for : r.against;
  return (
    <div className="prop-side">
      <div className="ps-lbl">
        <span>Final result</span>
        <span style={{ color: p.passed ? "var(--for)" : "var(--against)", fontWeight: 600 }}>{topPct}% {top}</span>
      </div>
      <div className="stacked">
        <span style={{ width: r.for + "%", background: "var(--for)" }}></span>
        <span style={{ width: r.against + "%", background: "var(--against)" }}></span>
      </div>
      <div className="ps-legend">
        <span><span className="rdot" style={{ background: "var(--for)" }}></span>For {r.for}</span>
        <span><span className="rdot" style={{ background: "var(--against)" }}></span>Against {r.against}</span>
      </div>
      <div className="ps-foot"><Icon name="lock" size={12} sw={1.6} /> {fmtFull(p.voterCount)} voters · choices stayed private</div>
    </div>
  );
}

/* pre-voting visual (discussion) */
function PendingMini({ p }) {
  return (
    <div className="prop-side">
      <div className="ps-lbl"><span>Voting</span></div>
      <div className="ps-big" style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Icon name="clock" size={15} style={{ color: "var(--ink-3)" }} /> Opens {p.votingStart}
      </div>
      <div className="ps-foot"><Icon name="users" size={12} sw={1.6} /> In discussion · {p.commentCount} comments</div>
    </div>
  );
}

function ProposalCard({ p }) {
  const clickable = true;
  const routeState = p.status === "voted" ? "voted" : p.status === "ended" ? "ended" : "active";
  const open = () => {
    if (window.__COMBINED) {
      window.location.hash = "#/p/" + p.id + "/" + routeState;
      window.scrollTo({ top: 0 });
    } else {
      window.location.href = "index.html#/p/" + p.id + "/" + routeState;
    }
  };
  return (
    <article
      className={"prop" + (clickable ? " clickable" : "")}
      data-screen-label={p.id}
      onClick={clickable ? open : undefined}
      role={clickable ? "link" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={clickable ? (e) => { if (e.key === "Enter") open(); } : undefined}
    >
      <div className="prop-main">
        <div className="prop-head">
          <StatusChip p={p} />
          {p.youVoted && (
            <span className="voted-chip2"><Icon name="checkSmall" size={11} sw={2.2} /> You voted</span>
          )}
          <span className="prop-id">{p.id}</span>
          {p.tags.map((t) => <span key={t} className="prop-tag">{t}</span>)}
          <DateTag p={p} />
        </div>

        <h3 className="prop-title">{p.title}</h3>
        <p className="prop-sum">{p.summary}</p>

        <div className="prop-foot">
          <span className="prop-author"><Avatar seed={p.author} label={p.author} /> {p.author}</span>
          {clickable && <span className="prop-open">Open discussion &amp; vote <Icon name="reply" size={13} /></span>}
        </div>
      </div>

      {p.phase === "ended"
        ? <ResultMini p={p} />
        : p.phase === "discussion"
          ? <PendingMini p={p} />
          : <QuorumMini p={p} />}
    </article>
  );
}

const FILTERS = [["all", "All"], ["active", "Started"], ["voted", "Voted"], ["ended", "Ended"]];

function ProposalsApp() {
  const [filter, setFilter] = React.useState("all");

  const counts = {
    all: PROPOSALS.length,
    active: PROPOSALS.filter((p) => p.status === "active").length,
    voted: PROPOSALS.filter((p) => p.status === "voted").length,
    ended: PROPOSALS.filter((p) => p.status === "ended").length,
  };
  const shown = filter === "all" ? PROPOSALS : PROPOSALS.filter((p) => p.status === filter);

  return (
    <>
      <header className="topbar">
        <div className="topbar-left">
          <div className="brand"><span className="brand-mark"></span> Veil <small>governance</small></div>
        </div>
        <div className="topbar-right">
          <Avatar seed="you.eth" label="you" className="topbar-avatar" />
        </div>
      </header>

      <div className="idx-head">
        <h1 className="idx-title">Proposals</h1>
        <p className="idx-sub">Every governance proposal for the Veil DAO. Your vote choices stay private — only participation is public.</p>

        <div className="idx-toolbar">
          <div className="filter-tabs">
            {FILTERS.map(([k, l]) => (
              <button key={k} className={"filter-tab" + (filter === k ? " on" : "")} onClick={() => setFilter(k)}>
                {l} <span className="ct">{counts[k]}</span>
              </button>
            ))}
          </div>
          <span className="idx-meta">{shown.length} {shown.length === 1 ? "proposal" : "proposals"}</span>
        </div>
      </div>

      <main className="idx-list">
        {shown.length
          ? shown.map((p) => <ProposalCard key={p.id} p={p} />)
          : <div className="idx-empty">No {filter} proposals right now.</div>}
      </main>
    </>
  );
}

Object.assign(window, { ProposalsApp });
if (!window.__COMBINED) {
  ReactDOM.createRoot(document.getElementById("root")).render(<ProposalsApp />);
}
