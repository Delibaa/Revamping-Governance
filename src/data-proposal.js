/* ============ dummy data ============ */

const PROPOSAL = {
  id: "PGF-014",
  title: "Allocate 1.2M USDC to the Public Goods Grants Program",
  summary: "This proposal asks the DAO to fund a 6-month grants program supporting public goods, protocol research, and ecosystem tooling. Funds are released in two tranches against published milestones.",
  author: "sofia.eth",
  created: "May 28, 2026",
  votingStart: "Jun 1, 2026",
  votingEnd: "Jun 7, 2026",
  tags: ["Treasury", "Grants"],
  fullDescription: [
    {
      heading: "Abstract",
      body: "This proposal requests 1.2 million USDC from the Veil DAO treasury to fund a six-month Public Goods Grants Program (PGGP-01). The program will fund three categories of work: public infrastructure, protocol research, and ecosystem tooling. Funds are released in two equal tranches of 600k USDC, with the second tranche conditional on an on-chain milestone attestation from the grants committee.",
    },
    {
      heading: "Motivation",
      body: "The Veil ecosystem has accumulated meaningful treasury reserves without a structured mechanism to fund the public-goods work that underpins long-term protocol health. Two prior ad-hoc grant rounds demonstrated sustained demand: in the most recent cycle, 38 applications arrived for 380k USDC of available funding — a 2.7x oversubscription ratio. A formal, recurring program with published evaluation criteria will improve predictability for contributors and raise the quality of work the DAO can attract.",
    },
    {
      heading: "Identified Gaps",
      body: "Three recurring gaps have been flagged by the core contributor team and surfaced in governance discussions over the past two cycles:\n\n1. Independent security research is bottlenecked. No funded path exists for external researchers to audit new modules before formal audits begin.\n\n2. Developer tooling (SDKs, indexers, testing harnesses) is maintained informally by contributors who self-fund their time. There is no accountability or sustainability mechanism.\n\n3. Protocol research — mechanism design, cryptography, incentive modeling — receives no dedicated budget despite its upstream value to future on-chain proposals.",
    },
    {
      heading: "Specification",
      body: "A 5-of-7 grants multisig will publish evaluation criteria and a conflict-of-interest policy within 14 days of proposal passage. Applications are open to any individual or team globally. The committee reviews on a rolling two-week cycle.\n\nFunding tiers:\n• Micro grants (up to 10k USDC): committee approval only\n• Standard grants (10k–75k USDC): approval + 7-day community comment period\n• Large grants (75k–200k USDC): approval + 14-day comment period + on-chain ratification\n\nAll grants above 25k USDC require milestone-gated disbursement. Recipients submit milestone reports; the committee publishes an on-chain attestation before releasing subsequent tranches.",
    },
    {
      heading: "Budget Breakdown",
      body: "Total request: 1,200,000 USDC\n\nTranche 1 — 600,000 USDC: Released on proposal passage. Covers months 1–3 of active grant-making.\n\nTranche 2 — 600,000 USDC: Released after the committee submits a mid-program milestone report and an on-chain attestation confirming at least 70% of Tranche 1 milestones are complete.\n\nTarget category allocation (advisory, not binding):\n• Public infrastructure: ~40%\n• Protocol research: ~35%\n• Ecosystem tooling: ~25%\n\nAny unallocated USDC at program close is returned to the treasury multisig.",
    },
    {
      heading: "Committee Composition & Conflict of Interest",
      body: "The initial grants committee will have 7 members: 3 nominated by the core contributor team, 2 elected by token-weighted vote (see companion proposal GOV-007), and 2 community volunteers who self-nominated in the governance forum.\n\nConflict-of-interest rules: Any committee member with a financial relationship to a grant applicant — equity stake, token holdings above 0.5%, or an employment relationship — must publicly disclose the relationship and recuse from the relevant vote. Recusals are logged on-chain. Repeated non-disclosure is grounds for committee removal by governance vote.",
    },
    {
      heading: "Risk Considerations",
      body: "Treasury impact: At current USDC reserves, this allocation represents approximately 8.3% of liquid holdings. Based on the 18-month runway floor adopted in TRS-004, the allocation remains within safe limits, confirmed by the treasury working group's published runway model.\n\nExecution risk: The 5-of-7 multisig structure prevents single-party control. If a committee member becomes unavailable, the DAO may replace them by governance vote with a 72-hour timelock.\n\nScope creep: The committee is explicitly prohibited from funding core protocol development (covered by the core contributor budget) or token buybacks. Any expenditure outside published categories requires a separate on-chain proposal.",
    },
    {
      heading: "Success Metrics & Retrospective",
      body: "The committee will publish a public dashboard tracking:\n• Applications received and funded per cycle\n• Median time from application to decision\n• Milestone completion rate by funding tier\n• VP-weighted community satisfaction score (surveyed at months 3 and 6)\n\nA retrospective proposal will be submitted within 30 days of program close to evaluate outcomes and determine whether to continue, expand, or modify the program in future cycles.",
    },
  ],
  // active snapshot
  eligibleVP: 12_070_000,
  participationVP: 4_200_000,   // 34.8%
  quorumVP: 5_000_000,
  voterCount: 1296,
  eligibleCount: 4120,
  // final snapshot (ended)
  final: {
    participationVP: 6_420_000,
    voterCount: 1984,
    result: [
      { key: "for", label: "For", vp: 4_110_000 },
      { key: "against", label: "Against", vp: 1_590_000 },
    ],
  },
};

const VOTE_OPTIONS = [
  { key: "for", label: "For", desc: "Fund the grants program as proposed" },
  { key: "against", label: "Against", desc: "Do not fund at this time" },
];

// participation over time (cumulative VP, millions) — Jun 1 → Jun 7
const PARTICIPATION_SERIES = [0.0, 0.6, 1.4, 2.1, 2.9, 3.6, 4.2];
const PARTICIPATION_FINAL = [0.0, 0.7, 1.6, 2.6, 3.7, 4.8, 5.7, 6.42];

const VOTERS = [
  { name: "0x1a2b…9f3c", sub: "Whale wallet", vp: 1_200_000, voted: true, choice: "for" },
  { name: "sofia.eth", sub: "Author · Delegate", vp: 842_000, voted: true, choice: "for" },
  { name: "lighthouse.eth", sub: "Delegate", vp: 410_000, voted: true, choice: "for" },
  { name: "0x77d4…e10a", sub: null, vp: 305_000, voted: true, choice: "for" },
  { name: "gov-collective.eth", sub: "Delegate", vp: 268_000, voted: true, choice: "for" },
  { name: "0x4e91…b7a2", sub: null, vp: 154_000, voted: true, choice: "against" },
  { name: "mlaporte.eth", sub: "Core contributor", vp: 96_000, voted: true, choice: "against" },
  { name: "0xc0ff…ee21", sub: null, vp: 58_000, voted: true, choice: "for" },
  { name: "researchdao.eth", sub: null, vp: 41_000, voted: true, choice: "for" },
  { name: "0xd3f1…a72b", sub: null, vp: 38_000, voted: true, choice: "for" },
  { name: "protocol-guild.eth", sub: "Delegate", vp: 34_000, voted: true, choice: "against" },
  { name: "0xb9cc…5e1f", sub: null, vp: 28_500, voted: true, choice: "for" },
  { name: "veildao-ops.eth", sub: "Core contributor", vp: 24_000, voted: true, choice: "for" },
  { name: "0x2e44…d091", sub: null, vp: 19_200, voted: true, choice: "for" },
  { name: "alphagov.eth", sub: "Delegate", vp: 17_800, voted: true, choice: "for" },
  { name: "0xf7a3…c40e", sub: null, vp: 14_100, voted: true, choice: "against" },
  { name: "daoresearch.eth", sub: null, vp: 11_600, voted: true, choice: "for" },
  { name: "0x8b21…7f3a", sub: null, vp: 9_400, voted: true, choice: "for" },
  { name: "ecosysfund.eth", sub: "Delegate", vp: 7_700, voted: true, choice: "for" },
  { name: "0xa1dc…e882", sub: null, vp: 5_200, voted: true, choice: "for" },
];
const NONVOTERS = [
  { name: "0x9c01…4b2d", sub: "Whale wallet", vp: 510_000, voted: false },
  { name: "treasuryguild.eth", sub: "Delegate", vp: 220_000, voted: false },
  { name: "0x3f8a…77e1", sub: null, vp: 180_000, voted: false },
  { name: "kpatel.eth", sub: "Core contributor", vp: 132_000, voted: false },
  { name: "0xab44…1d90", sub: null, vp: 88_000, voted: false },
  { name: "longtail.eth", sub: null, vp: 44_000, voted: false },
  { name: "0x6b22…90fc", sub: null, vp: 29_000, voted: false },
  { name: "0xe5b7…1c3d", sub: null, vp: 22_500, voted: false },
  { name: "nftcollective.eth", sub: "Token holder", vp: 18_000, voted: false },
  { name: "0x4d90…8ba1", sub: null, vp: 13_400, voted: false },
  { name: "0xc312…f0a7", sub: null, vp: 10_900, voted: false },
  { name: "quietvoter.eth", sub: null, vp: 8_200, voted: false },
  { name: "0x71fe…2d55", sub: null, vp: 6_100, voted: false },
  { name: "0xaa03…9e4c", sub: null, vp: 4_300, voted: false },
];

let _id = 0; const uid = () => "c" + (++_id);

const PUBLIC_COMMENTS = [
  {
    id: uid(), name: "lighthouse.eth", seed: "lighthouse", vp: 410000, role: "holder",
    voted: true, time: "4h ago", people: 58, vpUp: 410000, mine: false,
    text: "Strong support. The public goods funding gap is real and this is a measured, milestone-gated ask. I'd push for the milestone report to be on-chain attestable so the second tranche is verifiable rather than a committee judgment call.",
    replies: [
      { id: uid(), name: "sofia.eth", seed: "sofia", vp: 842000, role: "author", voted: true, time: "3h ago", people: 31, vpUp: 870000, text: "Agreed — we can require an attestation from the grants multisig before tranche 2 unlocks. Will add to the spec.", replies: [] },
      { id: uid(), name: "0x4e91…b7a2", seed: "0x4e91", vp: 154000, role: "holder", voted: false, time: "2h ago", people: 9, vpUp: 154000, text: "On-chain attestation +1. Makes the whole thing auditable.", replies: [] },
    ],
  },
  {
    id: uid(), name: "sofia.eth", seed: "sofia", vp: 842000, role: "author",
    voted: true, time: "6h ago", people: 58, vpUp: 410000, mine: false,
    text: "Author here. Happy to answer questions on scope. The 1.2M is sized against last cycle's qualified applicant pipeline, not a top-down number. Tranche 1 (600k) covers months 1–3; tranche 2 is conditional on milestone review.",
    replies: [
      { id: uid(), name: "kpatel.eth", seed: "kpatel", vp: 132000, role: "core", voted: false, time: "5h ago", people: 22, vpUp: 198000, text: "I'd like clearer conflict-of-interest rules for committee members who also run grantee projects. Otherwise supportive.", replies: [
        { id: uid(), name: "sofia.eth", seed: "sofia", vp: 842000, role: "author", voted: true, time: "5h ago", people: 14, vpUp: 410000, text: "Fair. Proposing a recusal rule: committee members recuse from any vote touching a project they're affiliated with, disclosed publicly.", replies: [] },
      ] },
    ],
  },
  {
    id: uid(), name: "0x1a2b…9f3c", seed: "0x1a2b", vp: 1200000, role: "holder",
    voted: true, time: "8h ago", people: 12, vpUp: 1200000, mine: false,
    text: "Concerned about treasury runway if USDC reserves dip below the 18-month floor we agreed on last quarter. Can someone confirm this allocation keeps us above it?",
    replies: [],
  },
  {
    id: uid(), name: "researchdao.eth", seed: "researchdao", vp: 41000, role: "holder",
    voted: true, time: "11h ago", people: 27, vpUp: 95000, mine: false,
    text: "The protocol research carve-out is the most valuable line item here. We've been bottlenecked on independent review for two cycles.",
    replies: [],
  },
];

const ANON_COMMENTS = [
  {
    id: uid(), anon: true, badges: ["verified", "voted"], time: "2h ago", upvotes: 24, mine: false,
    text: "The grants committee needs stronger conflict-of-interest disclosure before receiving this budget. Two of the proposed reviewers have downstream funding relationships with likely applicants.",
    replies: [
      { id: uid(), anon: true, badges: ["eligible"], time: "1h ago", upvotes: 8, text: "This. Disclosure should be a hard requirement, not a norm.", replies: [] },
    ],
  },
  {
    id: uid(), anon: true, badges: ["verified", "voted"], time: "5h ago", upvotes: 41, mine: false,
    text: "As someone who applied last cycle: the bottleneck was never funding, it was review turnaround. If this passes without committing to a 2-week review SLA we'll just have more capital sitting idle.",
    replies: [],
  },
  {
    id: uid(), anon: true, badges: ["eligible"], time: "7h ago", upvotes: 6, mine: false,
    text: "Supportive but the 6-month window feels short for protocol research deliverables. Most serious work won't ship a result inside two tranches.",
    replies: [],
  },
  {
    id: uid(), anon: true, badges: ["verified"], time: "9h ago", upvotes: 15, mine: false,
    text: "Glad there's a private lane. Wouldn't post this with my address attached: I think the treasury concern above is overstated — runway math already accounts for committed outflows.",
    replies: [],
  },
];

Object.assign(window, {
  PROPOSAL, VOTE_OPTIONS, VOTERS, NONVOTERS, PUBLIC_COMMENTS, ANON_COMMENTS,
  PARTICIPATION_SERIES, PARTICIPATION_FINAL,
});
