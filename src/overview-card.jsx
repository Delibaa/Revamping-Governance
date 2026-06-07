/* ============ overview card ============ */

function StatusBadge({ state }) {
  if (state === "ended") return <span className="badge badge--passed"><span className="dot"></span>Passed</span>;
  return <span className="badge badge--active"><span className="dot"></span>Active</span>;
}

function Timeline({ state }) {
  const steps = [
    { lbl: "Created", date: PROPOSAL.created, cls: "done" },
    { lbl: "Voting opens", date: PROPOSAL.votingStart, cls: "done" },
    { lbl: state === "ended" ? "Closed" : "Closes", date: PROPOSAL.votingEnd, cls: state === "ended" ? "done" : "now" },
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

function ParticipationBar({ state }) {
  const total = PROPOSAL.eligibleVP;
  const part = state === "ended" ? PROPOSAL.final.participationVP : PROPOSAL.participationVP;
  const voters = state === "ended" ? PROPOSAL.final.voterCount : PROPOSAL.voterCount;
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

function OverviewCard({ state, myVote, onAction }) {
  let resultCell;
  if (state === "ended") {
    const f = PROPOSAL.final.result;
    const totalV = f.reduce((a, b) => a + b.vp, 0);
    const forPct = Math.round((f[0].vp / totalV) * 100);
    resultCell = (
      <div className="ov-cell">
        <div className="lbl">Final result</div>
        <div className="big" style={{ color: "var(--for)" }}>{forPct}% For</div>
        <div className="sub">Passed · {fmtVP(totalV)} VP cast</div>
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
  else if (state === "voted") actionBtn = <button className="btn btn--primary btn--lg" onClick={onAction}>Change vote</button>;
  else actionBtn = <button className="btn btn--primary btn--lg" onClick={onAction}>Vote</button>;

  return (
    <section className="card overview" data-screen-label="overview">
      <p className="ov-summary">{PROPOSAL.summary}</p>
      <span className="ov-author">
        <Avatar seed={PROPOSAL.author} label={PROPOSAL.author} />
        Proposed by <b style={{ fontWeight: 580, color: "var(--ink)" }}>{PROPOSAL.author}</b>
      </span>

      <div className="ov-grid">
        <div className="ov-cell">
          <div className="lbl">Timeline</div>
          <Timeline state={state} />
        </div>
        {resultCell}
      </div>

      <div style={{ marginTop: 18 }}>
        <div className="ov-cell" style={{ padding: 0 }}>
          <div className="lbl" style={{ marginBottom: 8 }}>Participation</div>
          <ParticipationBar state={state} />
        </div>
      </div>

      <div className="ov-actions">
        {actionBtn}
        {state === "voted" && (
          <span className="btn-note" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Icon name="checkSmall" size={14} style={{ color: "var(--for)" }} /> You voted · <b style={{ fontWeight: 560, color: "var(--ink-2)", textTransform: "capitalize" }}>{myVote}</b> <span style={{ color: "var(--ink-3)" }}>(only you can see this)</span>
          </span>
        )}
        {state === "active" && <span className="btn-note">3 days left · your choice stays private</span>}
        {state === "ended" && <span className="btn-note">Voting closed Jun 7, 2026</span>}
      </div>

      {PROPOSAL.fullDescription && (
        <div className="ov-body">
          {PROPOSAL.fullDescription.map((sec, i) => (
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
