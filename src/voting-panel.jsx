/* ============ left column: voting, participation, voters, execution ============ */

function Sparkline({ data, color = "var(--accent)", fill = "var(--accent-tint)", height = 52 }) {
  const W = 240, H = height, pad = 4;
  const max = Math.max(...data) * 1.08 || 1;
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (W - pad * 2);
    const y = H - pad - (v / max) * (H - pad * 2);
    return [x, y];
  });
  const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const area = line + ` L${(W - pad).toFixed(1)} ${H - pad} L${pad} ${H - pad} Z`;
  const last = pts[pts.length - 1];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ width: "100%", height, display: "block" }}>
      <path d={area} fill={fill} />
      <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      <circle cx={last[0]} cy={last[1]} r="3" fill={color} />
    </svg>
  );
}

/* ---- post-submit receipt choice dialog ---- */
const RECEIPT_OPTIONS = [
  { key: "trust", icon: "shield", name: "Cast a vote" },
  { key: "verify", icon: "eye", name: "Challenge a vote" },
];
const BROKERS = [
  { key: "coinbase", name: "Coinbase" },
  { key: "anchorage", name: "Anchorage" },
  { key: "fireblocks", name: "Fireblocks" },
  { key: "bitgo", name: "BitGo" },
  { key: "kraken", name: "Kraken" },
];
function ChallengeSequence({ brokerName, rounds, onDone }) {
  const [round, setRound] = React.useState(0);
  const [log, setLog] = React.useState([]);
  const finished = round >= rounds;

  React.useEffect(() => {
    if (finished) return;
    const t = setTimeout(() => {
      setLog((l) => [...l, { challenged: round < rounds - 1 }]);
      setRound((r) => r + 1);
    }, 900);
    return () => clearTimeout(t);
  }, [round, finished]);

  return (
    <>
      <h3 className="modal-title">{finished ? "Challenge complete — ballot ready" : "Challenging your encrypted ballot…"}</h3>
      <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55, margin: "0 0 16px" }}>
        {finished
          ? <>You opened and verified {rounds - 1} encrypted ballots from {brokerName} — each one matched your selection and was discarded. The final round stayed sealed, and that's the ballot being cast as your vote.</>
          : <>Each round, {brokerName} seals your choice into a fresh encrypted ballot. You can open it to confirm it matches your selection — but an opened ballot is discarded and can never be cast. Eventually one round goes unopened, and that's the ballot that becomes your vote.</>}
      </p>
      <div className="challenge-log" style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: finished ? 18 : 6, maxHeight: 230, overflowY: "auto" }}>
        {log.map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--ink-2)" }}>
            <Icon name="checkSmall" size={13} sw={2.4} style={{ color: r.challenged ? "var(--for)" : "var(--accent)", flexShrink: 0 }} />
            <span>Round {i + 1} — encrypted, {r.challenged ? "opened & matched your choice — discarded" : "stayed sealed — this is your vote"}</span>
          </div>
        ))}
        {!finished && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--ink-3)" }}>
            <span className="dlg-spinner" />
            <span>Round {round + 1} of {rounds} — encrypting…</span>
          </div>
        )}
      </div>
      {finished && (
        <div className="modal-actions">
          <button className="btn btn--primary" onClick={onDone}>
            <Icon name="shield" size={14} /> Done — cast my vote
          </button>
        </div>
      )}
    </>
  );
}
function ReceiptChoiceDialog({ onPick, onClose }) {
  const [picked, setPicked] = React.useState(null);
  const [broker, setBroker] = React.useState("");
  const [verifying, setVerifying] = React.useState(false);
  const [rounds, setRounds] = React.useState(10);
  const ready = picked && broker;
  const brokerName = BROKERS.find((b) => b.key === broker)?.name;

  const confirm = () => {
    if (!ready) return;
    if (picked === "verify") setVerifying(true);
    else onPick(broker);
  };

  return (
    <div className="modal-veil" onClick={verifying ? undefined : onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {verifying ? (
          <ChallengeSequence brokerName={brokerName} rounds={rounds} onDone={() => onPick(broker)} />
        ) : (
          <>
            <h3 className="modal-title">One more thing before this is final</h3>

            <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "var(--ink-2)", margin: "0 0 6px" }}>
              Tally broker <span style={{ color: "var(--against)" }}>*</span>
            </label>
            <div style={{ position: "relative", marginBottom: 16 }}>
              <select value={broker} onChange={(e) => setBroker(e.target.value)} style={{
                width: "100%", appearance: "none", WebkitAppearance: "none", font: "inherit", fontSize: 14, fontWeight: 540,
                color: broker ? "var(--ink)" : "var(--ink-3)", padding: "11px 36px 11px 14px", borderRadius: "var(--r-md)",
                border: "1.5px solid var(--line)", background: "var(--card)", cursor: "pointer",
              }}>
                <option value="" disabled>Choose a custodial broker…</option>
                {BROKERS.map((b) => <option key={b.key} value={b.key}>{b.name}</option>)}
              </select>
              <span style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--ink-3)" }}>
                <Icon name="chevron" size={15} />
              </span>
            </div>

            <div>
              {RECEIPT_OPTIONS.map((o) => (
                <button key={o.key} className={"receipt-opt" + (picked === o.key ? " sel" : "")} onClick={() => setPicked(o.key)}>
                  <span className="r-ico"><Icon name={o.icon} size={16} /></span>
                  <span>
                    <span className="r-name">{o.name}</span>
                  </span>
                </button>
              ))}
            </div>

            {picked === "verify" && (
              <div style={{ margin: "14px 2px 16px", padding: "12px 14px", borderRadius: "var(--r-md)", border: "1.5px solid var(--line)", background: "var(--bg-sunk)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: 12.5, fontWeight: 600, color: "var(--ink-2)", marginBottom: 8 }}>
                  <span>Challenge rounds</span>
                  <span className="mono" style={{ color: "var(--ink)" }}>{rounds}</span>
                </div>
                <input type="range" min={5} max={30} value={rounds} onChange={(e) => setRounds(+e.target.value)}
                  style={{ width: "100%", accentColor: "var(--accent)" }} />
                <div style={{ fontSize: 11.5, color: "var(--ink-3)", marginTop: 6, lineHeight: 1.5 }}>
                  Each round opens and verifies an encrypted ballot before discarding it. More rounds means stronger proof the broker is sealing honestly — but takes longer to run.
                </div>
              </div>
            )}

            <div className="modal-actions">
              <button className="btn" onClick={onClose}>Cancel</button>
              <button className="btn btn--primary" disabled={!ready} onClick={confirm}>
                <Icon name="shield" size={14} /> Confirm &amp; submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ---- voting panel ---- */
function UpcomingVotePanel({ detail }) {
  return (
    <section className="card" data-screen-label="vote-schedule">
      <div className="vote-head">
        <h2 className="card-title">Voting schedule</h2>
        <span style={{ fontSize: 12, color: "var(--ink-3)", display: "inline-flex", alignItems: "center", gap: 5 }}>
          <Icon name="clock" size={13} /> Opens soon
        </span>
      </div>
      <div className="sealed" style={{ borderTop: 0, marginTop: 0 }}>
        <span className="s-ico"><Icon name="lock" size={17} /></span>
        <div>
          <div className="s-title">Voting opens {detail.votingStart}</div>
          <div className="s-body">
            This proposal is still in discussion. Eligible voters can review the proposal and comments now; private voting opens on the scheduled start date and closes {detail.votingEnd}.
          </div>
        </div>
      </div>
    </section>
  );
}

function VotingPanel({ detail, state, myVote, onVote }) {
  const [editing, setEditing] = React.useState(false);
  const [sel, setSel] = React.useState(myVote || null);
  const [confirming, setConfirming] = React.useState(false);
  const [broker, setBroker] = React.useState(null);
  React.useEffect(() => { setSel(myVote || null); setEditing(false); }, [state, myVote]);

  if (detail.phase === "discussion") return <UpcomingVotePanel detail={detail} />;
  if (state === "ended") return <ResultsPanel detail={detail} />;

  const showPicker = state === "active" || editing;
  const brokerName = broker && BROKERS.find((b) => b.key === broker)?.name;

  const finalizeVote = (brokerKey) => {
    setBroker(brokerKey || null);
    setConfirming(false);
    onVote(sel);
    setEditing(false);
  };

  return (
    <section className="card" data-screen-label="vote">
      <div className="vote-head">
        <h2 className="card-title">{showPicker ? "Cast your vote" : "Your vote"}</h2>
        <span style={{ fontSize: 12, color: "var(--ink-3)", display: "inline-flex", alignItems: "center", gap: 5 }}>
          <Icon name="lock" size={13} /> Private
        </span>
      </div>

      {showPicker ? (
        <>
          <div className="vote-options">
            {detail.voteOptions.map((o) => (
              <button key={o.key} className={"vote-opt" + (sel === o.key ? " sel" : "")} onClick={() => setSel(o.key)}>
                <span className="radio"></span>
                <span>
                  <span className="v-name">{o.label}</span><br />
                  <span className="v-desc">{o.desc}</span>
                </span>
              </button>
            ))}
          </div>
          <div className="vote-cta">
            <button className="btn btn--primary btn--block btn--lg" disabled={!sel}
              onClick={() => { if (sel) setConfirming(true); }}>
              <Icon name="shield" size={15} /> {myVote ? "Update vote" : "Submit vote"}
            </button>
          </div>
        </>
      ) : (
        <div className="my-vote">
          <Icon name="check" size={16} style={{ color: "var(--accent)" }} />
          <span>You've cast your vote on this proposal via <b>{brokerName}</b>.</span>
          <button className="c-link" style={{ marginLeft: "auto" }} onClick={() => setEditing(true)}>Change</button>
        </div>
      )}

      <hr className="divider" />
      <div className="sealed">
        <span className="s-ico"><Icon name="lock" size={17} /></span>
        <div>
          <div className="s-title">Results are sealed until {detail.votingEnd}</div>
          <div className="s-body">
            No running tally is shown while voting is open. <span className="s-count">{fmtFull(detail.voterCount)} of {fmtFull(detail.eligibleCount)}</span> eligible voters have participated so far.
          </div>
        </div>
      </div>

      {confirming && (
        <ReceiptChoiceDialog onPick={finalizeVote} onClose={() => setConfirming(false)} />
      )}
    </section>
  );
}

/* ---- revealed results (ended) ---- */
const RESULT_COLOR = { for: "var(--for)", against: "var(--against)" };
function ResultsPanel({ detail }) {
  const f = detail.final.result;
  const total = f.reduce((a, b) => a + b.vp, 0);
  const winner = f.reduce((a, b) => (b.vp > a.vp ? b : a), f[0]).key;
  return (
    <section className="card" data-screen-label="results">
      <div className="vote-head">
        <h2 className="card-title">Final results</h2>
        <span className={"badge " + (detail.final.passed ? "badge--passed" : "badge--failed")} style={{ fontSize: 11 }}><span className="dot"></span>{detail.final.passed ? "Passed" : "Failed"}</span>
      </div>
      <div className="result-list">
        {f.map((r) => {
          const pct = (r.vp / total) * 100;
          return (
            <div key={r.key} className={"result-row" + (r.key === winner ? " win" : "")}>
              <div className="r-top">
                <span className="r-name"><span className="swatch" style={{ background: RESULT_COLOR[r.key] }}></span>{r.label}<span className="r-vp">{fmtVP(r.vp)} VP</span></span>
                <span className="r-pct">{pct.toFixed(1)}%</span>
              </div>
              <div className="result-bar"><div className="result-fill" style={{ width: pct + "%", background: RESULT_COLOR[r.key] }}></div></div>
            </div>
          );
        })}
      </div>
      <hr className="divider" />
      <div className="privacy" style={{ margin: "16px 20px" }}>
        <span className="p-ico"><Icon name="check" size={17} /></span>
        <span className="p-text">Quorum of {fmtVP(detail.quorumVP)} VP was reached. Individual vote choices were never revealed - only this aggregate.</span>
      </div>
    </section>
  );
}

/* ---- participation card ---- */
function ParticipationCard({ detail, state }) {
  const ended = state === "ended";
  const part = ended ? detail.final.participationVP : detail.participationVP;
  const voters = ended ? detail.final.voterCount : detail.voterCount;
  const series = ended ? detail.participationFinal : detail.participationSeries;
  const turnout = ((part / detail.eligibleVP) * 100).toFixed(1);
  return (
    <section className="card">
      <div className="part-grid">
        <div className="part-cell">
          <div className="lbl">Turnout</div>
          <div className="big">{turnout}%</div>
          <div className="sub">{fmtVP(part)} of {fmtVP(detail.eligibleVP)} VP</div>
        </div>
        <div className="part-cell">
          <div className="lbl">Voters</div>
          <div className="big">{fmtFull(voters)}</div>
          <div className="sub">of {fmtFull(detail.eligibleCount)} eligible</div>
        </div>
      </div>
      <hr className="divider" />
      <div className="spark">
        <div className="spark-head">
          <span className="lbl">Participation over time</span>
          <span className="upd">{ended ? "Final" : detail.phase === "discussion" ? "Not started" : "Updated 15 min ago"}</span>
        </div>
        <Sparkline data={series} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--ink-3)", marginTop: 6 }}>
          <span>{detail.votingStart.replace(", 2026", "")}</span><span>{ended ? detail.votingEnd.replace(", 2026", "") : detail.phase === "discussion" ? "Opens" : "Now"}</span>
        </div>
      </div>
    </section>
  );
}

/* ---- voter / non-voter list ---- */
function VoterList({ detail, state }) {
  const [tab, setTab] = React.useState("voted");
  const rows = tab === "voted" ? detail.voters : detail.nonVoters;
  const votedCount = state === "ended" ? detail.final.voterCount : detail.voterCount;
  const notCount = detail.eligibleCount - votedCount;
  return (
    <section className="card" style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
      <div className="voter-tabs" style={{ flexShrink: 0 }}>
        <button className={"voter-tab" + (tab === "voted" ? " on" : "")} onClick={() => setTab("voted")}>
          Voted <span className="ct">{fmtFull(votedCount)}</span>
        </button>
        <button className={"voter-tab" + (tab === "not" ? " on" : "")} onClick={() => setTab("not")}>
          Not voted <span className="ct">{fmtFull(notCount)}</span>
        </button>
      </div>
      <div className="voter-list-head" style={{ flexShrink: 0 }}>
        <span style={{ width: 32, flexShrink: 0 }}></span>
        <span style={{ flex: 1, maxWidth: 380 }}>Voter</span>
        <span style={{ width: 90, textAlign: "center" }}>Choice</span>
        <span style={{ width: 80, textAlign: "right", whiteSpace: "nowrap" }}>Voting Power</span>
      </div>
      <div className="voter-list" style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
        {rows.length === 0 && (
          <div className="idx-empty" style={{ margin: 18 }}>No votes have been cast yet.</div>
        )}
        {rows.map((v, i) => (
          <div className="voter-row" key={i}>
            <Avatar seed={v.name} label={v.name} />
            <div className="v-id">
              <div className="v-name">{v.name}</div>
              {v.sub && <div className="v-meta">{v.sub}</div>}
            </div>
            <div style={{ width: 90, display: "flex", justifyContent: "center", flexShrink: 0 }}>
              {v.voted
                ? <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--ink-3)" }}><Icon name="lock" size={12} /></span>
                : <span style={{ color: "var(--ink-3)", fontSize: 13 }}>—</span>}
            </div>
            <div className="v-vp mono" style={{ width: 80, textAlign: "right" }}>{fmtVP(v.vp)} VP</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---- execution tracker (ended) ---- */
function ExecutionTracker({ detail }) {
  const steps = detail.execution || [
    { title: detail.final.passed ? "Proposal passed" : "Proposal failed", meta: detail.votingEnd + " - quorum reached", cls: "done" },
  ];
  return (
    <section className="card card-pad">
      <h2 className="card-title" style={{ marginBottom: 14 }}><Icon name="bolt" size={15} /> Execution</h2>
      <div className="exec-steps">
        {steps.map((s, i) => (
          <div key={i} className={"exec-step " + s.cls}>
            <span className="e-node">{s.cls === "done" && <Icon name="checkSmall" size={11} sw={2.4} />}</span>
            <div>
              <div className="e-title">{s.title}</div>
              <div className="e-meta">{s.meta}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { VotingPanel, ParticipationCard, VoterList, ExecutionTracker, Sparkline });
