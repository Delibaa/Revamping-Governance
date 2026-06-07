/* ============ right column: discussion ============ */

const ME = { name: "you.eth", seed: "you.eth", vp: 120000, role: "holder" };

function countReplies(c) {
  if (!c.replies || !c.replies.length) return 0;
  return c.replies.reduce((n, r) => n + 1 + countReplies(r), 0);
}
function mapTree(list, id, fn) {
  return list.map((c) => {
    if (c.id === id) return fn(c);
    if (c.replies && c.replies.length) return { ...c, replies: mapTree(c.replies, id, fn) };
    return c;
  });
}
function addReplyTree(list, parentId, reply) {
  return list.map((c) => {
    if (c.id === parentId) return { ...c, replies: [...(c.replies || []), reply] };
    if (c.replies && c.replies.length) return { ...c, replies: addReplyTree(c.replies, parentId, reply) };
    return c;
  });
}
function filterTree(list, filters) {
  return list.reduce((acc, c) => {
    if (!commentMatches(c, filters)) return acc;
    const replies = c.replies && c.replies.length ? filterTree(c.replies, filters) : [];
    acc.push({ ...c, replies });
    return acc;
  }, []);
}

function RoleBadge({ role }) {
  if (role === "author") return <span className="role-badge role-author">Proposal author</span>;
  if (role === "core") return <span className="role-badge role-core">Core contributor</span>;
  return <span className="role-badge role-holder">Token holder</span>;
}

/* ---- public weighted comment ---- */
function PublicComment({ c, onUpvote, onReply, depth = 0, locked }) {
  const [replying, setReplying] = React.useState(false);
  const [text, setText] = React.useState("");
  const [replyAnon, setReplyAnon] = React.useState(false);
  const submit = () => { if (text.trim()) { onReply(c.id, text.trim(), replyAnon); setText(""); setReplying(false); setReplyAnon(false); } };
  return (
    <div className="comment">
      <div className="c-head">
        <Avatar seed={c.seed} label={c.name} style={{ width: 28, height: 28 }} />
        <span className="c-name">{c.name}</span>
        <span className="c-vp">{fmtVP(c.vp)} VP</span>
        <RoleBadge role={c.role} />
        {c.voted
          ? <span className="voted-chip"><Icon name="checkSmall" size={11} sw={2.4} /> Voted</span>
          : <span className="notvoted-chip"><Icon name="clock" size={11} /> Not voted</span>}
        <span className="c-time">{c.time}</span>
      </div>
      <p className="c-body">{c.text}</p>
      <div className="c-actions">
        <button className={"upvote" + (c.upvoted ? " on" : "")} onClick={() => onUpvote(c.id)}>
          <Icon name="arrowUp" size={14} />
          <span className="u-people">{c.people} {c.people === 1 ? "person" : "people"}</span>
          <span className="c-dot">·</span>
          <span className="u-vp">{fmtVP(c.vpUp)} VP</span>
        </button>
        {!locked && <button className="c-link" onClick={() => setReplying((v) => !v)}><Icon name="reply" size={14} /> Reply</button>}
        {countReplies(c) > 0 && <span className="c-link" style={{ color: "var(--ink-3)" }}>{countReplies(c)} {countReplies(c) === 1 ? "reply" : "replies"}</span>}
      </div>

      {replying && !locked && (
        <div className="reply-box" style={{ marginLeft: 0, marginTop: 12 }}>
          <textarea autoFocus placeholder={replyAnon ? "Reply anonymously…" : `Reply to ${c.name}…`} value={text} onChange={(e) => setText(e.target.value)} />
          <div className="ra">
            <button className="c-link" style={{ fontSize: 12, display: "inline-flex", alignItems: "center", gap: 4, marginRight: "auto" }} onClick={() => setReplyAnon((v) => !v)}>
              <Icon name={replyAnon ? "users" : "eyeOff"} size={13} /> {replyAnon ? "Switch to public" : "Reply anonymously"}
            </button>
            <button className="btn btn--sm" onClick={() => setReplying(false)}>Cancel</button>
            <button className="btn btn--sm btn--primary" onClick={submit} disabled={!text.trim()}>Reply</button>
          </div>
        </div>
      )}

      {c.replies && c.replies.length > 0 && (
        <div className="replies">
          {c.replies.map((r) => r.anon
            ? <AnonComment key={r.id} c={r} onUpvote={onUpvote} onReply={onReply} depth={depth + 1} locked={locked} />
            : <PublicComment key={r.id} c={r} onUpvote={onUpvote} onReply={onReply} depth={depth + 1} locked={locked} />)}
        </div>
      )}
    </div>
  );
}

/* ---- anonymous comment ---- */
const ANON_BADGE = {
  verified: { label: "Verified DAO participant", icon: "seal", cls: "verified" },
  eligible: { label: "Eligible voter", icon: "check", cls: "" },
  voted: { label: "Voted", icon: "checkSmall", cls: "" },
};
function AnonComment({ c, onUpvote, onReply, depth = 0, locked }) {
  const [replying, setReplying] = React.useState(false);
  const [text, setText] = React.useState("");
  const [replyAnon, setReplyAnon] = React.useState(true);
  const submit = () => { if (text.trim()) { onReply(c.id, text.trim(), replyAnon); setText(""); setReplying(false); setReplyAnon(true); } };
  return (
    <div className="comment">
      <div className="c-head">
        <AnonAvatar style={{ width: 28, height: 28 }} />
        <span className="c-name" style={{ color: "var(--ink-2)" }}>Anonymous</span>
        <span className="c-vp">{fmtVP(c.vp)} VP</span>
        {c.badges.map((b) => {
          const m = ANON_BADGE[b];
          return <span key={b} className={"anon-badge " + m.cls}><Icon name={m.icon} size={11} sw={1.8} /> {m.label}</span>;
        })}
        <span className="c-time">{c.time}</span>
      </div>
      <p className="c-body">{c.text}</p>
      <div className="c-actions">
        <button className={"upvote" + (c.upvoted ? " on" : "")} onClick={() => onUpvote(c.id)}>
          <Icon name="arrowUp" size={14} />
          <span className="u-people">{c.upvotes} {c.upvotes === 1 ? "upvote" : "upvotes"}</span>
          <span className="c-dot">·</span>
          <span className="u-vp">{fmtVP(c.vpUp || 0)} VP</span>
        </button>
        {!locked && <button className="c-link" onClick={() => setReplying((v) => !v)}><Icon name="reply" size={14} /> Reply</button>}
        <button className="c-link" title="Report"><Icon name="flag" size={13} /> Report</button>
      </div>

      {replying && !locked && (
        <div className="reply-box" style={{ marginLeft: 0, marginTop: 12 }}>
          <textarea autoFocus placeholder={replyAnon ? "Reply anonymously…" : "Reply to Anonymous…"} value={text} onChange={(e) => setText(e.target.value)} />
          <div className="ra">
            <button className="c-link" style={{ fontSize: 12, display: "inline-flex", alignItems: "center", gap: 4, marginRight: "auto" }} onClick={() => setReplyAnon((v) => !v)}>
              <Icon name={replyAnon ? "users" : "eyeOff"} size={13} /> {replyAnon ? "Switch to public" : "Reply anonymously"}
            </button>
            <button className="btn btn--sm" onClick={() => setReplying(false)}>Cancel</button>
            <button className="btn btn--sm btn--primary" onClick={submit} disabled={!text.trim()}>Reply</button>
          </div>
        </div>
      )}

      {c.replies && c.replies.length > 0 && (
        <div className="replies">
          {c.replies.map((r) => r.anon
            ? <AnonComment key={r.id} c={r} onUpvote={onUpvote} onReply={onReply} depth={depth + 1} locked={locked} />
            : <PublicComment key={r.id} c={r} onUpvote={onUpvote} onReply={onReply} depth={depth + 1} locked={locked} />)}
        </div>
      )}
    </div>
  );
}

/* ---- sort dropdown ---- */
const SORTS = [
  { key: "vp", label: "Top by voting power", sub: "Most VP behind upvotes" },
  { key: "people", label: "Top by number of people", sub: "Most upvoters" },
  { key: "new", label: "Newest", sub: "Most recent first" },
  { key: "discussed", label: "Most discussed", sub: "Most replies" },
];
const DEFAULT_COMMENT_FILTERS = { identity: "all", minVp: 0, votedOnly: false, role: "all" };
const IDENTITY_FILTERS = [
  { key: "all", label: "All" },
  { key: "public", label: "Public only" },
  { key: "anonymous", label: "Anonymous only" },
];
const VP_FILTERS = [
  { value: 0, label: "Any" },
  { value: 50000, label: "50k+" },
  { value: 100000, label: "100k+" },
  { value: 250000, label: "250k+" },
  { value: 500000, label: "500k+" },
  { value: 1000000, label: "1M+" },
];
const ROLE_FILTERS = [
  { key: "all", label: "All roles" },
  { key: "author", label: "Authors" },
  { key: "core", label: "Core" },
  { key: "holder", label: "Holders" },
];
function isDefaultFilters(filters) {
  return filters.identity === "all" && filters.minVp === 0 && !filters.votedOnly && filters.role === "all";
}
function activeFilterCount(filters) {
  return (filters.identity !== "all" ? 1 : 0)
    + (filters.minVp > 0 ? 1 : 0)
    + (filters.votedOnly ? 1 : 0)
    + (filters.role !== "all" ? 1 : 0);
}
function commentMatches(c, filters) {
  if (filters.identity === "public" && c.anon) return false;
  if (filters.identity === "anonymous" && !c.anon) return false;
  if (filters.votedOnly) {
    const voted = c.anon ? (c.badges || []).includes("voted") : c.voted;
    if (!voted) return false;
  }
  if (filters.minVp > 0 && ((c.vp || 0) < filters.minVp)) return false;
  if (filters.role !== "all" && (c.anon || c.role !== filters.role)) return false;
  return true;
}
function SortDropdown({ value, onChange, anon }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, []);
  const opts = anon ? SORTS.filter((s) => s.key !== "vp") : SORTS;
  const cur = SORTS.find((s) => s.key === value) || opts[0];
  return (
    <div className="sort" ref={ref}>
      <button className="sort-btn" onClick={() => setOpen((v) => !v)}>
        <span style={{ color: "var(--ink-3)" }}>Sort:</span> {cur.label} <Icon name="chevron" size={13} />
      </button>
      {open && (
        <div className="sort-menu">
          {opts.map((s) => (
            <button key={s.key} className={"sort-item" + (s.key === value ? " on" : "")} onClick={() => { onChange(s.key); setOpen(false); }}>
              <span><div>{s.label}</div><div className="si-sub">{s.sub}</div></span>
              {s.key === value && <Icon name="checkSmall" size={13} sw={2.2} style={{ color: "var(--accent)" }} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterDropdown({ value, onChange }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, []);
  const active = activeFilterCount(value);
  const patch = (next) => onChange({ ...value, ...next });
  const clear = () => onChange(DEFAULT_COMMENT_FILTERS);
  return (
    <div className="sort filter" ref={ref}>
      <button className={"sort-btn" + (active ? " on" : "")} onClick={() => setOpen((v) => !v)}>
        <span style={{ color: "var(--ink-3)" }}>Filter:</span> {active ? `${active} active` : "All"} <Icon name="chevron" size={13} />
      </button>
      {open && (
        <div className="sort-menu filter-menu">
          <div className="filter-head">
            <span>Filters</span>
            {active > 0 && <button className="filter-clear" onClick={clear}>Clear</button>}
          </div>

          <div className="filter-group">
            <div className="filter-label">Identity</div>
            <div className="filter-options">
              {IDENTITY_FILTERS.map((f) => (
                <button key={f.key} className={"filter-chip" + (value.identity === f.key ? " on" : "")} onClick={() => patch({ identity: f.key })}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <div className="filter-label">Author VP</div>
            <div className="filter-options">
              {VP_FILTERS.map((f) => (
                <button key={f.value} className={"filter-chip" + (value.minVp === f.value ? " on" : "")} onClick={() => patch({ minVp: f.value })}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label className={"filter-check" + (value.votedOnly ? " on" : "")}>
              <input type="checkbox" checked={value.votedOnly} onChange={(e) => patch({ votedOnly: e.target.checked })} />
              <span>Voted only</span>
            </label>
          </div>

          <div className="filter-group">
            <div className="filter-label">Role</div>
            <div className="filter-options">
              {ROLE_FILTERS.map((f) => (
                <button key={f.key} className={"filter-chip" + (value.role === f.key ? " on" : "")} onClick={() => patch({ role: f.key })}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const PIGEONS = [
  { left: "45%", top: "52%", dx: "-56vw", dy: "-42vh", rot: "-24deg", scale: 1.02, delay: "0ms" },
  { left: "48%", top: "47%", dx: "-34vw", dy: "-54vh", rot: "-10deg", scale: 0.9, delay: "70ms" },
  { left: "51%", top: "54%", dx: "-12vw", dy: "-58vh", rot: "-3deg", scale: 1.12, delay: "20ms" },
  { left: "53%", top: "49%", dx: "14vw", dy: "-57vh", rot: "9deg", scale: 0.98, delay: "115ms" },
  { left: "55%", top: "55%", dx: "39vw", dy: "-48vh", rot: "18deg", scale: 1.08, delay: "45ms" },
  { left: "50%", top: "50%", dx: "55vw", dy: "-39vh", rot: "27deg", scale: 0.92, delay: "145ms" },
  { left: "47%", top: "56%", dx: "62vw", dy: "-23vh", rot: "36deg", scale: 0.86, delay: "95ms" },
  { left: "43%", top: "55%", dx: "-62vw", dy: "-15vh", rot: "-34deg", scale: 0.82, delay: "170ms" },
  { left: "52%", top: "58%", dx: "18vw", dy: "-31vh", rot: "16deg", scale: 0.78, delay: "210ms" },
  { left: "56%", top: "51%", dx: "64vw", dy: "-8vh", rot: "31deg", scale: 0.96, delay: "185ms" },
];

function PigeonIcon({ flip }) {
  return (
    <svg className="pigeon-svg" viewBox="0 0 86 68" aria-hidden="true">
      <g transform={flip ? "translate(86 0) scale(-1 1)" : undefined}>
        <path className="pigeon-wing back" d="M42 30C29 17 26 6 31 3c8 8 15 17 23 31z" />
        <path className="pigeon-wing front" d="M46 32C54 15 66 5 72 7c0 14-7 28-22 36z" />
        <ellipse className="pigeon-body" cx="42" cy="40" rx="21" ry="15" />
        <circle className="pigeon-head" cx="24" cy="30" r="11" />
        <path className="pigeon-neck" d="M30 33c8 1 14 5 18 12-8 1-16-1-22-7z" />
        <path className="pigeon-tail" d="M61 40l17 2-15 8z" />
        <path className="pigeon-beak" d="M14 29L3 24l5 9z" />
        <circle className="pigeon-eye" cx="21" cy="27" r="3.2" />
        <circle className="pigeon-pupil" cx="21" cy="27" r="1.2" />
        <path className="pigeon-stripe" d="M54 41c4 1 8 1 12 0" />
        <path className="pigeon-stripe" d="M53 47c4 1 8 1 12 0" />
        <path className="pigeon-leg" d="M34 53l-4 8M44 54l2 8" />
      </g>
    </svg>
  );
}

function PigeonBurst() {
  return (
    <div className="pigeon-burst" aria-hidden="true">
      {PIGEONS.map((p, i) => (
        <span
          key={i}
          className="pigeon"
          style={{
            left: p.left,
            top: p.top,
            "--dx": p.dx,
            "--dy": p.dy,
            "--rot": p.rot,
            "--scale": p.scale,
            "--delay": p.delay,
          }}
        >
          <PigeonIcon flip={i < 3 || i === 6} />
        </span>
      ))}
    </div>
  );
}

/* ---- discussion panel ---- */
function DiscussionPanel({ detail, state }) {
  const [sort, setSort] = React.useState("new");
  const [filters, setFilters] = React.useState(DEFAULT_COMMENT_FILTERS);
  const [pigeonBurstKey, setPigeonBurstKey] = React.useState(0);
  const [postAnon, setPostAnon] = React.useState(false);
  const [comments, setComments] = React.useState(() => {
    const pub = JSON.parse(JSON.stringify(detail.publicComments || []));
    const anon = JSON.parse(JSON.stringify(detail.anonComments || []));
    const merged = [];
    const max = Math.max(pub.length, anon.length);
    for (let i = 0; i < max; i++) {
      if (pub[i]) merged.push(pub[i]);
      if (anon[i]) merged.push(anon[i]);
    }
    return merged;
  });
  const [draft, setDraft] = React.useState("");
  const archived = state === "ended";
  const myVoted = state === "voted" || state === "ended";
  const filtersActive = !isDefaultFilters(filters);

  const visibleComments = React.useMemo(() => {
    const arr = filtersActive ? filterTree(comments, filters) : [...comments];
    if (sort === "people") arr.sort((a, b) => (b.anon ? b.upvotes : b.people) - (a.anon ? a.upvotes : a.people));
    else if (sort === "vp") arr.sort((a, b) => (b.vpUp || 0) - (a.vpUp || 0));
    else if (sort === "discussed") arr.sort((a, b) => countReplies(b) - countReplies(a));
    return arr;
  }, [comments, filters, filtersActive, sort]);

  const upvote = (id) => setComments((L) => mapTree(L, id, (c) => {
    if (c.anon) return { ...c, upvoted: !c.upvoted, upvotes: c.upvotes + (c.upvoted ? -1 : 1), vpUp: (c.vpUp || 0) + (c.upvoted ? -ME.vp : ME.vp) };
    return { ...c, upvoted: !c.upvoted, people: c.people + (c.upvoted ? -1 : 1), vpUp: c.vpUp + (c.upvoted ? -ME.vp : ME.vp) };
  }));

  const reply = (parentId, text, isAnon) => {
    const base = isAnon
      ? { id: "n" + Date.now(), anon: true, badges: myVoted ? ["verified", "voted"] : ["verified"], vp: ME.vp, time: "now", upvotes: 0, vpUp: 0, text, replies: [] }
      : { id: "n" + Date.now(), name: ME.name, seed: ME.seed, vp: ME.vp, role: ME.role, voted: myVoted, time: "now", people: 0, vpUp: 0, text, replies: [] };
    setComments((L) => addReplyTree(L, parentId, base));
  };

  const post = () => {
    if (!draft.trim()) return;
    const base = postAnon
      ? { id: "n" + Date.now(), anon: true, badges: myVoted ? ["verified", "voted"] : ["verified"], vp: ME.vp, time: "now", upvotes: 0, vpUp: 0, text: draft.trim(), replies: [] }
      : { id: "n" + Date.now(), name: ME.name, seed: ME.seed, vp: ME.vp, role: ME.role, voted: myVoted, time: "now", people: 0, vpUp: 0, text: draft.trim(), replies: [] };
    setComments((L) => [base, ...L]);
    setDraft("");
    setSort("new");
  };

  const total = comments.reduce((n, c) => n + 1 + countReplies(c), 0);
  const visibleTotal = visibleComments.reduce((n, c) => n + 1 + countReplies(c), 0);
  const clearFilters = () => setFilters(DEFAULT_COMMENT_FILTERS);
  const changeFilters = (next) => {
    const enteredPublicOnly = filters.identity !== "public" && next.identity === "public";
    const enteredHighVp = filters.minVp < 100000 && next.minVp >= 100000;
    if (enteredPublicOnly || enteredHighVp) {
      setPigeonBurstKey((n) => n + 1);
    }
    setFilters(next);
  };

  return (
    <section className="card disc" data-screen-label="discussion">
      {pigeonBurstKey > 0 && <PigeonBurst key={pigeonBurstKey} />}
      <div className="disc-meta">
        <span className="disc-count">{filtersActive ? `${visibleTotal} of ${total}` : total} comments</span>
        <div className="disc-controls">
          <SortDropdown value={sort} onChange={setSort} anon={false} />
          <FilterDropdown value={filters} onChange={changeFilters} />
        </div>
      </div>

      {archived ? (
        <div className="archived"><Icon name="lock" size={14} /> Discussion archived — voting has closed.</div>
      ) : (
        <div className="composer">
          {postAnon ? <AnonAvatar /> : <Avatar seed={ME.seed} label={ME.name} />}
          <div className="composer-body">
            <div className="composer-as">
              {postAnon ? (
                <><Icon name="eyeOff" size={13} /> Posting anonymously {myVoted && <span className="anon-badge verified"><Icon name="seal" size={11} /> Voted</span>}</>
              ) : (
                <>Posting as <b style={{ color: "var(--ink-2)", fontWeight: 580 }}>{ME.name}</b> · <span className="mono">{fmtVP(ME.vp)} VP</span> {myVoted && <span className="voted-chip"><Icon name="checkSmall" size={11} sw={2.4} /> Voted</span>}</>
              )}
            </div>
            <textarea placeholder={postAnon ? "Share feedback without revealing your identity…" : "Add to the discussion…"} value={draft} onChange={(e) => setDraft(e.target.value)} />
            <div className="composer-actions">
              <button className="c-link" style={{ fontSize: 12, display: "inline-flex", alignItems: "center", gap: 4 }} onClick={() => setPostAnon((v) => !v)}>
                <Icon name={postAnon ? "users" : "eyeOff"} size={13} /> {postAnon ? "Switch to public" : "Post anonymously"}
              </button>
              <button className="btn btn--primary btn--sm" onClick={post} disabled={!draft.trim()}>Post comment</button>
            </div>
          </div>
        </div>
      )}

      <div className="thread">
        {visibleComments.length > 0 ? visibleComments.map((c) => c.anon
          ? <AnonComment key={c.id} c={c} onUpvote={upvote} onReply={reply} locked={archived} />
          : <PublicComment key={c.id} c={c} onUpvote={upvote} onReply={reply} locked={archived} />) : (
            <div className="thread-empty">
              <div>{filtersActive ? "No comments match these filters." : "No comments yet."}</div>
              {filtersActive && <button className="btn btn--sm" onClick={clearFilters}>Clear filters</button>}
            </div>
          )}
      </div>
    </section>
  );
}

Object.assign(window, { DiscussionPanel });
