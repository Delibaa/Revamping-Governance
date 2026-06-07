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
  voted: { label: "Has voted", icon: "checkSmall", cls: "" },
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
          <span className="u-people">{c.upvotes}</span>
          <span style={{ color: "inherit" }}>upvotes</span>
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

/* ---- discussion panel ---- */
function DiscussionPanel({ detail, state }) {
  const [sort, setSort] = React.useState("new");
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

  const sorted = React.useMemo(() => {
    const arr = [...comments];
    if (sort === "people") arr.sort((a, b) => (b.anon ? b.upvotes : b.people) - (a.anon ? a.upvotes : a.people));
    else if (sort === "vp") arr.sort((a, b) => (b.vpUp || 0) - (a.vpUp || 0));
    else if (sort === "discussed") arr.sort((a, b) => countReplies(b) - countReplies(a));
    return arr;
  }, [comments, sort]);

  const upvote = (id) => setComments((L) => mapTree(L, id, (c) => {
    if (c.anon) return { ...c, upvoted: !c.upvoted, upvotes: c.upvotes + (c.upvoted ? -1 : 1) };
    return { ...c, upvoted: !c.upvoted, people: c.people + (c.upvoted ? -1 : 1), vpUp: c.vpUp + (c.upvoted ? -ME.vp : ME.vp) };
  }));

  const reply = (parentId, text, isAnon) => {
    const base = isAnon
      ? { id: "n" + Date.now(), anon: true, badges: myVoted ? ["verified", "voted"] : ["verified"], time: "now", upvotes: 0, text, replies: [] }
      : { id: "n" + Date.now(), name: ME.name, seed: ME.seed, vp: ME.vp, role: ME.role, voted: myVoted, time: "now", people: 0, vpUp: 0, text, replies: [] };
    setComments((L) => addReplyTree(L, parentId, base));
  };

  const post = () => {
    if (!draft.trim()) return;
    const base = postAnon
      ? { id: "n" + Date.now(), anon: true, badges: myVoted ? ["verified", "voted"] : ["verified"], time: "now", upvotes: 0, text: draft.trim(), replies: [] }
      : { id: "n" + Date.now(), name: ME.name, seed: ME.seed, vp: ME.vp, role: ME.role, voted: myVoted, time: "now", people: 0, vpUp: 0, text: draft.trim(), replies: [] };
    setComments((L) => [base, ...L]);
    setDraft("");
    setSort("new");
  };

  const total = comments.reduce((n, c) => n + 1 + countReplies(c), 0);

  return (
    <section className="card disc" data-screen-label="discussion">
      <div className="disc-meta">
        <span className="disc-count">{total} comments</span>
        <SortDropdown value={sort} onChange={setSort} anon={false} />
      </div>

      {archived ? (
        <div className="archived"><Icon name="lock" size={14} /> Discussion archived — voting has closed.</div>
      ) : (
        <div className="composer">
          {postAnon ? <AnonAvatar /> : <Avatar seed={ME.seed} label={ME.name} />}
          <div className="composer-body">
            <div className="composer-as">
              {postAnon ? (
                <><Icon name="eyeOff" size={13} /> Posting anonymously {myVoted && <span className="anon-badge verified"><Icon name="seal" size={11} /> proof: has voted</span>}</>
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
        {sorted.map((c) => c.anon
          ? <AnonComment key={c.id} c={c} onUpvote={upvote} onReply={reply} locked={archived} />
          : <PublicComment key={c.id} c={c} onUpvote={upvote} onReply={reply} locked={archived} />)}
      </div>
    </section>
  );
}

Object.assign(window, { DiscussionPanel });
