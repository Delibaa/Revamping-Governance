/* ============ shared UI: icons, avatar, helpers ============ */

const Icon = ({ name, size = 16, sw = 1.7, ...p }) => {
  const paths = {
    lock: <><rect x="4.5" y="9" width="11" height="8" rx="2"/><path d="M7 9V6.5a3 3 0 0 1 6 0V9"/></>,
    shield: <path d="M10 2.5l5.5 2v4.2c0 3.6-2.4 6.6-5.5 8-3.1-1.4-5.5-4.4-5.5-8V4.5z"/>,
    check: <path d="M4.5 10.5l3.2 3.2 7-7.4" strokeWidth="2"/>,
    checkSmall: <path d="M3.5 7l2.4 2.4 5-5.2" strokeWidth="2"/>,
    clock: <><circle cx="10" cy="10" r="7"/><path d="M10 6v4.2l2.8 1.8"/></>,
    arrowUp: <path d="M10 16V5m0 0l-4.5 4.5M10 5l4.5 4.5" strokeWidth="1.8"/>,
    reply: <path d="M8 5L3.5 9.2 8 13.5M4 9.2h7.5a4 4 0 0 1 4 4V15"/>,
    chevron: <path d="M5 7.5l5 5 5-5"/>,
    dots: <><circle cx="5" cy="10" r="1.3"/><circle cx="10" cy="10" r="1.3"/><circle cx="15" cy="10" r="1.3"/></>,
    flag: <path d="M5 17V4h9l-2 3 2 3H5"/>,
    copy: <><rect x="7" y="7" width="9" height="9" rx="1.8"/><path d="M4 13V5a1.5 1.5 0 0 1 1.5-1.5H13"/></>,
    external: <><path d="M8 5H5v10h10v-3"/><path d="M11 5h4v4"/><path d="M10 10l5-5"/></>,
    wallet: <><path d="M4 6.5h11.5A1.5 1.5 0 0 1 17 8v7.5H5.5A1.5 1.5 0 0 1 4 14z"/><path d="M4 6.5V5a1.5 1.5 0 0 1 1.5-1.5H15"/><path d="M13.5 11.2h.1"/></>,
    logOut: <><path d="M8 5H5v10h3"/><path d="M11 7l3 3-3 3"/><path d="M14 10H8"/></>,
    eye: <><path d="M2.5 10S5.5 4.5 10 4.5 17.5 10 17.5 10 14.5 15.5 10 15.5 2.5 10 2.5 10z"/><circle cx="10" cy="10" r="2.2"/></>,
    eyeOff: <><path d="M7 5.2A7.6 7.6 0 0 1 10 4.5c4.5 0 7.5 5.5 7.5 5.5a13 13 0 0 1-2.2 2.8M4.3 7.2A13 13 0 0 0 2.5 10S5.5 15.5 10 15.5c1 0 1.9-.2 2.7-.5M3 3l14 14"/></>,
    users: <><circle cx="7.5" cy="7" r="2.6"/><path d="M3 16c0-2.5 2-4.2 4.5-4.2S12 13.5 12 16"/><path d="M13 5.2a2.6 2.6 0 0 1 0 4.6M14 11.8c2 .4 3.5 2 3.5 4.2"/></>,
    sparkle: <path d="M10 3l1.6 4.4L16 9l-4.4 1.6L10 15l-1.6-4.4L4 9l4.4-1.6z"/>,
    doc: <><path d="M5 3h6l4 4v10H5z"/><path d="M11 3v4h4"/><path d="M7.5 11h5M7.5 14h5"/></>,
    chat: <path d="M4 5h12v8H8l-3 3v-3H4z"/>,
    bolt: <path d="M11 2.5L4.5 11h4l-1 6.5L15 9h-4z"/>,
    seal: <><circle cx="10" cy="9" r="5.5"/><path d="M7.5 14.5L6 18l4-1.5L14 18l-1.5-3.5"/><path d="M7.8 9l1.5 1.6 3-3.2" strokeWidth="1.6"/></>,
    fire: <path d="M10 2.5c.5 2.5-1.5 3.5-2.5 5.2C6.3 9.7 6 11 6 12a4 4 0 0 0 8 0c0-1.8-1-3.2-1.8-4-.6 1-1.5 1.2-1.8.3-.3-1 .9-2.4 1.4-3.6C12.3 3.4 11 2.6 10 2.5z"/>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor"
      strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" {...p}>
      {paths[name]}
    </svg>
  );
};

const AV_COLORS = [
  ["#3b82f6","#6366f1"], ["#0ea5e9","#2563eb"], ["#8b5cf6","#6366f1"],
  ["#10b981","#059669"], ["#f59e0b","#ea580c"], ["#ec4899","#db2777"],
  ["#14b8a6","#0891b2"], ["#6366f1","#8b5cf6"], ["#64748b","#475569"],
];
const Avatar = ({ seed = "x", label, className = "" }) => {
  let h = 0; for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const [a, b] = AV_COLORS[h % AV_COLORS.length];
  const init = (label || seed).replace(/^0x/, "").slice(0, 2).toUpperCase();
  return (
    <div className={"avatar " + className} style={{ background: `linear-gradient(140deg, ${a}, ${b})` }}>
      {init}
    </div>
  );
};

const AnonAvatar = ({ className = "" }) => (
  <div className={"avatar " + className} style={{ background: "var(--bg-sunk)", border: "1px solid var(--line)", color: "var(--ink-3)" }}>
    <Icon name="eyeOff" size={15} sw={1.6} />
  </div>
);

const ACCOUNT = {
  ens: "you.eth",
  address: "0x7a3c4f91b23d8a0c52e4684b7d11c99391e2",
  shortAddress: "0x7a3c...91e2",
  role: "Holder",
  status: "Eligible voter",
  votingPower: "120k VP",
  explorer: "https://etherscan.io/address/0x7a3c4f91b23d8a0c52e4684b7d11c99391e2",
};

function getAccountStats() {
  const proposals = window.PROPOSALS || [];
  if (!proposals.length) return { eligible: 8, voted: 2, pending: 3 };
  const voted = proposals.filter((p) => p.status === "voted").length;
  const pending = proposals.filter((p) => p.status === "active").length;
  return { eligible: proposals.length, voted, pending };
}

function AccountMenu() {
  const [open, setOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const ref = React.useRef(null);
  const stats = getAccountStats();

  React.useEffect(() => {
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  React.useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1400);
    return () => clearTimeout(t);
  }, [copied]);

  const copyAddress = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(ACCOUNT.address);
      } else {
        const ta = document.createElement("textarea");
        ta.value = ACCOUNT.address;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
    } catch (e) {
      // Prototype only: avoid interrupting the menu if clipboard access is blocked.
    }
    setCopied(true);
  };

  return (
    <div className="account" ref={ref}>
      <button
        className={"account-trigger" + (open ? " on" : "")}
        type="button"
        aria-label="Open governance account"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Avatar seed={ACCOUNT.ens} label="you" className="topbar-avatar" />
      </button>
      {open && (
        <div className="account-menu" role="menu">
          <div className="account-head">
            <Avatar seed={ACCOUNT.ens} label="you" className="account-avatar" />
            <div className="account-id">
              <div className="account-name">{ACCOUNT.ens}</div>
              <div className="account-address mono">{ACCOUNT.shortAddress}</div>
            </div>
          </div>

          <div className="account-badges">
            <span>{ACCOUNT.role}</span>
            <span>{ACCOUNT.status}</span>
          </div>

          <div className="account-vp">
            <span>Voting power</span>
            <b>{ACCOUNT.votingPower}</b>
          </div>

          <div className="account-privacy">
            <Icon name="shield" size={16} />
            <span>Your vote choices stay private. Participation remains public.</span>
          </div>

          <div className="account-stats" aria-label="Governance activity">
            <div><b>{stats.eligible}</b><span>Eligible</span></div>
            <div><b>{stats.voted}</b><span>Voted</span></div>
            <div><b>{stats.pending}</b><span>Pending</span></div>
          </div>

          <div className="account-actions">
            <button type="button" className="account-action" role="menuitem" onClick={copyAddress}>
              <Icon name={copied ? "checkSmall" : "copy"} size={15} /> {copied ? "Copied" : "Copy address"}
            </button>
            <a className="account-action" role="menuitem" href={ACCOUNT.explorer} target="_blank" rel="noreferrer">
              <Icon name="external" size={15} /> View on explorer
            </a>
            <button type="button" className="account-action" role="menuitem" onClick={() => setOpen(false)}>
              <Icon name="wallet" size={15} /> Switch wallet
            </button>
            <button type="button" className="account-action muted" role="menuitem" onClick={() => setOpen(false)}>
              <Icon name="logOut" size={15} /> Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// format voting power: 842000 -> "842k", 1200000 -> "1.2M"
function fmtVP(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(n >= 1e7 ? 0 : 1).replace(/\.0$/, "") + "M";
  if (n >= 1e3) return Math.round(n / 1e3) + "k";
  return String(n);
}
function fmtFull(n) { return n.toLocaleString("en-US"); }

Object.assign(window, { Icon, Avatar, AnonAvatar, AccountMenu, fmtVP, fmtFull });
