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
    const st = ["active", "voted", "ended"].includes(m[2]) ? m[2] : "active";
    return <DetailApp key={m[1] + st} initialState={st} />;
  }
  return <ProposalsApp />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
