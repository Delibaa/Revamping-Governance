/* ============ app root ============ */

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
}

function initialState() {
  const h = (typeof location !== "undefined" ? location.hash.replace("#", "") : "");
  return ["active", "voted", "ended"].includes(h) ? h : "active";
}

function goProposals() {
  if (window.__COMBINED) { window.location.hash = ""; window.scrollTo({ top: 0 }); }
  else { window.location.href = "index.html"; }
}

function normalizedState(detail, requested) {
  if (detail.phase === "ended") return "ended";
  if (["active", "voted", "ended"].includes(requested)) return requested;
  return "active";
}

function VoteLayout({ detail, state, myVote, onVote }) {
  const rightRef = React.useRef(null);
  const leftRef = React.useRef(null);

  React.useLayoutEffect(() => {
    function sync() {
      if (rightRef.current && leftRef.current) {
        leftRef.current.style.height = rightRef.current.offsetHeight + "px";
      }
    }
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  });

  return (
    <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
      <div ref={leftRef} style={{ flex: 3, minWidth: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <VoterList detail={detail} state={state} />
      </div>
      <div ref={rightRef} style={{ flex: 2, minWidth: 0, display: "flex", flexDirection: "column", gap: 18 }}>
        <VotingPanel detail={detail} state={state} myVote={myVote} onVote={onVote} />
        {state === "ended" && <ExecutionTracker detail={detail} />}
        <ParticipationCard detail={detail} state={state} />
      </div>
    </div>
  );
}

function App({ detail: detailProp, initialState: initState }) {
  const detail = detailProp || (window.PROPOSAL_DETAILS && window.PROPOSAL_DETAILS["PGF-014"]) || window.PROPOSAL;
  const startState = normalizedState(detail, initState || initialState());
  const [state, setState] = React.useState(startState); // active | voted | ended
  const [myVote, setMyVote] = React.useState(() => (startState === "voted" ? "for" : null));
  const [tab, setTab] = React.useState("overview"); // overview | vote | discussion

  const goTab = (t) => { setTab(t); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const changeState = (s) => {
    setState(normalizedState(detail, s));
    if (s === "voted" && !myVote) setMyVote("for");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleVote = (key) => { setMyVote(key); setState("voted"); };

  const onAction = () => goTab("vote");

  const TABS = [
    ["overview", "Overview", "doc"],
    ["vote", state === "ended" ? "Results" : detail.phase === "discussion" ? "Schedule" : "Vote", "check"],
    ["discussion", "Discussion", "chat"],
  ];

  return (
    <>
      <header className="topbar">
        <div className="topbar-left">
          <a className="back-link" href={window.__COMBINED ? "#" : "index.html"}
            onClick={(e) => { if (window.__COMBINED) { e.preventDefault(); goProposals(); } }}><Icon name="chevron" size={14} /> Proposals</a>
          <div className="brand">
            <span className="brand-mark"></span> Veil <small>governance</small>
          </div>
        </div>
        <div className="topbar-right">
          <AccountMenu />
        </div>
      </header>

      {/* persistent proposal header */}
      <div className="detail-head">
        <div className="dh-inner">
          <div className="dh-meta">
            <StatusBadge detail={detail} state={state} />
            <span className="dh-id">{detail.id}</span>
            {detail.tags.map((t) => <span key={t} className="dh-tag">{t}</span>)}
          </div>
          <h1 className="dh-title">{detail.title}</h1>
          <nav className="dtabs" role="tablist">
            {TABS.map(([k, l, ic]) => (
              <button key={k} role="tab" aria-selected={tab === k}
                className={"dtab" + (tab === k ? " on" : "")} onClick={() => goTab(k)}>
                <Icon name={ic} size={15} /> {l}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <main className="page detail-page">
        {tab === "overview" && (
          <OverviewCard detail={detail} state={state} myVote={myVote} onAction={onAction} />
        )}

        {tab === "vote" && (
          <VoteLayout detail={detail} state={state} myVote={myVote} onVote={handleVote} />
        )}

        {tab === "discussion" && (
          <DiscussionPanel detail={detail} state={state} />
        )}
      </main>
    </>
  );
}

Object.assign(window, { DetailApp: App });
if (!window.__COMBINED) {
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
}
