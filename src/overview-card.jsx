/* ============ overview card ============ */

function StatusBadge({ detail, state }) {
  if (detail.phase === "discussion") return <span className="badge badge--ended"><span className="dot"></span>Discussion</span>;
  if (state === "ended") {
    return detail.final.passed
      ? <span className="badge badge--passed"><span className="dot"></span>Passed</span>
      : <span className="badge badge--failed"><span className="dot"></span>Failed</span>;
  }
  if (state === "voted") return <span className="badge badge--active"><span className="dot"></span>Voted</span>;
  return <span className="badge badge--active"><span className="dot"></span>Active</span>;
}

function Timeline({ detail, state }) {
  const discussion = detail.phase === "discussion";
  const steps = [
    { lbl: "Created", date: detail.created, cls: "done" },
    { lbl: "Voting opens", date: detail.votingStart, cls: discussion ? "now" : "done" },
    { lbl: state === "ended" ? "Closed" : "Closes", date: detail.votingEnd, cls: state === "ended" ? "done" : discussion ? "" : "now" },
  ];
  return (
    <div className="timeline">
      {steps.map((s, i) => (
        <div key={i} className={"tl-step " + s.cls}>
          <div className="tl-lbl">{s.lbl}</div>
          <div className="tl-date">{s.date}</div>
        </div>
      ))}
    </div>
  );
}

function ParticipationBar({ detail, state }) {
  const total = detail.eligibleVP;
  const part = state === "ended" ? detail.final.participationVP : detail.participationVP;
  const voters = state === "ended" ? detail.final.voterCount : detail.voterCount;
  const fillPct = Math.min(100, (part / total) * 100);
  const pct = ((part / total) * 100).toFixed(1);
  return (
    <div className="qbar-wrap">
      <div className="qbar">
        <div className="qbar-fill" style={{ width: fillPct + "%" }}></div>
      </div>
      <div className="qbar-legend">
        <span><b style={{ color: "var(--ink-2)" }}>{pct}% participation</b> · {fmtVP(part)} VP · {fmtFull(voters)} voters</span>
        <span>of {fmtVP(total)} eligible</span>
      </div>
    </div>
  );
}

function OverviewCard({ detail, state, myVote, onAction }) {
  let resultCell;
  if (state === "ended") {
    const f = detail.final.result;
    const totalV = f.reduce((a, b) => a + b.vp, 0);
    const winner = f.reduce((a, b) => (b.vp > a.vp ? b : a), f[0]);
    const winnerPct = Math.round((winner.vp / totalV) * 100);
    resultCell = (
      <div className="ov-cell">
        <div className="lbl">Final result</div>
        <div className="big" style={{ color: detail.final.passed ? "var(--for)" : "var(--against)" }}>{winnerPct}% {winner.label}</div>
        <div className="sub">{detail.final.passed ? "Passed" : "Failed"} · {fmtVP(totalV)} VP cast</div>
      </div>
    );
  } else if (detail.phase === "discussion") {
    resultCell = (
      <div className="ov-cell">
        <div className="lbl">Voting</div>
        <div className="big" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 17 }}>
          <Icon name="clock" size={16} /> Opens {detail.votingStart}
        </div>
        <div className="sub">Discussion is open before voting begins</div>
      </div>
    );
  } else {
    resultCell = (
      <div className="ov-cell">
        <div className="lbl">Result</div>
        <div className="big" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 17 }}>
          <Icon name="lock" size={16} /> Sealed
        </div>
        <div className="sub">Revealed when voting closes</div>
      </div>
    );
  }

  let actionBtn;
  if (state === "ended") actionBtn = <button className="btn btn--lg" onClick={onAction}>View full results</button>;
  else if (detail.phase === "discussion") actionBtn = <button className="btn btn--lg" onClick={onAction}>View voting schedule</button>;
  else if (state === "voted") actionBtn = <button className="btn btn--primary btn--lg" onClick={onAction}>Change vote</button>;
  else actionBtn = <button className="btn btn--primary btn--lg" onClick={onAction}>Vote</button>;

  return (
    <section className="card overview" data-screen-label="overview">
      <p className="ov-summary">{detail.summary}</p>
      <span className="ov-author">
        <Avatar seed={detail.author} label={detail.author} />
        Proposed by <b style={{ fontWeight: 580, color: "var(--ink)" }}>{detail.author}</b>
      </span>

      <div className="ov-grid">
        <div className="ov-cell">
          <div className="lbl">Timeline</div>
          <Timeline detail={detail} state={state} />
        </div>
        {resultCell}
      </div>

      <div style={{ marginTop: 18 }}>
        <div className="ov-cell" style={{ padding: 0 }}>
          <div className="lbl" style={{ marginBottom: 8 }}>Participation</div>
          <ParticipationBar detail={detail} state={state} />
        </div>
      </div>

      <div className="ov-actions">
        {actionBtn}
        {state === "voted" && (
          <span className="btn-note" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Icon name="checkSmall" size={14} style={{ color: "var(--for)" }} /> You voted · <b style={{ fontWeight: 560, color: "var(--ink-2)", textTransform: "capitalize" }}>{myVote}</b> <span style={{ color: "var(--ink-3)" }}>(only you can see this)</span>
          </span>
        )}
        {state === "active" && detail.phase !== "discussion" && <span className="btn-note">Your choice stays private</span>}
        {detail.phase === "discussion" && <span className="btn-note">Voting opens {detail.votingStart}</span>}
        {state === "ended" && <span className="btn-note">Voting closed {detail.votingEnd}</span>}
      </div>

      {detail.fullDescription && (
        <div className="ov-body">
          {detail.fullDescription.map((sec, i) => (
            <div key={i} className="ov-section">
              <h3 className="ov-sh">{sec.heading}</h3>
              {sec.body.split("\n\n").map((para, j) => (
                <p key={j} className="ov-para">{para}</p>
              ))}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

Object.assign(window, { OverviewCard, StatusBadge });
