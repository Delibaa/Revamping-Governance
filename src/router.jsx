/* ============ combined single-page router ============ */
/* Renders the proposals index by default; #/p/<id>/<state> opens the detail view. */

function Root() {
  const [route, setRoute] = React.useState(window.location.hash);
  React.useEffect(() => {
    const onHash = () => { setRoute(window.location.hash); window.scrollTo({ top: 0 }); };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const m = /^#\/p\/([^/]+)(?:\/(\w+))?/.exec(route || "");
  if (m) {
    const proposalId = decodeURIComponent(m[1]);
    const detail = PROPOSAL_DETAILS && PROPOSAL_DETAILS[proposalId];
    if (!detail) return <ProposalsApp />;
    const st = ["active", "voted", "ended"].includes(m[2]) ? m[2] : "active";
    return <DetailApp key={proposalId + st} proposalId={proposalId} detail={detail} initialState={st} />;
  }
  return <ProposalsApp />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
