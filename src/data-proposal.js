/* ============ proposal detail data ============ */

const ELIGIBLE_VOTER_COUNT = 4120;

let _id = 0;
const uid = () => "c" + (++_id);

const makeSection = (heading, body) => ({ heading, body });

const makeVoters = (rows) => rows.map((row) => ({
  sub: null,
  voted: true,
  choice: "for",
  ...row,
}));

const BASE_NONVOTERS = [
  { name: "0x9c01...4b2d", sub: "Whale wallet", vp: 510_000, voted: false },
  { name: "treasuryguild.eth", sub: "Delegate", vp: 220_000, voted: false },
  { name: "0x3f8a...77e1", sub: null, vp: 180_000, voted: false },
  { name: "kpatel.eth", sub: "Core contributor", vp: 132_000, voted: false },
  { name: "0xab44...1d90", sub: null, vp: 88_000, voted: false },
  { name: "longtail.eth", sub: null, vp: 44_000, voted: false },
  { name: "0x6b22...90fc", sub: null, vp: 29_000, voted: false },
  { name: "0xe5b7...1c3d", sub: null, vp: 22_500, voted: false },
  { name: "nftcollective.eth", sub: "Token holder", vp: 18_000, voted: false },
  { name: "0x4d90...8ba1", sub: null, vp: 13_400, voted: false },
  { name: "0xc312...f0a7", sub: null, vp: 10_900, voted: false },
  { name: "quietvoter.eth", sub: null, vp: 8_200, voted: false },
  { name: "0x71fe...2d55", sub: null, vp: 6_100, voted: false },
  { name: "0xaa03...9e4c", sub: null, vp: 4_300, voted: false },
];

function publicComment({ name, seed, vp, role = "holder", voted = true, time, people, vpUp, text, replies = [] }) {
  return { id: uid(), name, seed: seed || name, vp, role, voted, time, people, vpUp, mine: false, text, replies };
}

function anonComment({ badges = ["verified"], vp, time, upvotes, text, replies = [] }) {
  return { id: uid(), anon: true, badges, vp, time, upvotes, mine: false, text, replies };
}

const PROPOSAL_DETAILS = {
  "PGF-014": {
    id: "PGF-014",
    title: "Allocate 1.2M USDC to the Public Goods Grants Program",
    summary: "This proposal asks the DAO to fund a 6-month grants program supporting public goods, protocol research, and ecosystem tooling. Funds are released in two tranches against published milestones.",
    author: "sofia.eth",
    created: "May 28, 2026",
    votingStart: "Jun 1, 2026",
    votingEnd: "Jun 7, 2026",
    tags: ["Treasury", "Grants"],
    phase: "voting",
    eligibleVP: 12_070_000,
    participationVP: 4_200_000,
    quorumVP: 5_000_000,
    voterCount: 1296,
    eligibleCount: ELIGIBLE_VOTER_COUNT,
    fullDescription: [
      makeSection("Abstract", "This proposal requests 1.2 million USDC from the Veil DAO treasury to fund a six-month Public Goods Grants Program (PGGP-01). The program will fund public infrastructure, protocol research, and ecosystem tooling. Funds are released in two equal tranches of 600k USDC, with the second tranche conditional on an on-chain milestone attestation from the grants committee."),
      makeSection("Motivation", "The Veil ecosystem has accumulated meaningful treasury reserves without a structured mechanism to fund public-goods work. Two prior ad-hoc grant rounds demonstrated sustained demand: in the most recent cycle, 38 applications arrived for 380k USDC of available funding, a 2.7x oversubscription ratio."),
      makeSection("Specification", "A 5-of-7 grants multisig will publish evaluation criteria and a conflict-of-interest policy within 14 days of proposal passage. Applications are open globally and reviewed on a rolling two-week cycle.\n\nFunding tiers:\n- Micro grants up to 10k USDC: committee approval only\n- Standard grants from 10k to 75k USDC: approval plus 7-day community comment period\n- Large grants from 75k to 200k USDC: approval plus 14-day comment period and on-chain ratification"),
      makeSection("Budget Breakdown", "Tranche 1 releases 600k USDC on proposal passage and covers months 1-3. Tranche 2 releases 600k USDC after a mid-program milestone report confirms at least 70% of Tranche 1 milestones are complete.\n\nTarget allocation is 40% public infrastructure, 35% protocol research, and 25% ecosystem tooling. Any unallocated USDC returns to the treasury multisig."),
      makeSection("Risk Considerations", "The allocation represents approximately 8.3% of liquid USDC reserves and remains above the 18-month runway floor adopted in TRS-004. Committee replacement requires a governance vote and 72-hour timelock."),
    ],
    voteOptions: [
      { key: "for", label: "For", desc: "Fund the grants program as proposed" },
      { key: "against", label: "Against", desc: "Do not fund at this time" },
    ],
    participationSeries: [0.0, 0.6, 1.4, 2.1, 2.9, 3.6, 4.2],
    participationFinal: [0.0, 0.7, 1.6, 2.6, 3.7, 4.8, 5.7, 6.42],
    final: {
      passed: true,
      participationVP: 6_420_000,
      voterCount: 1984,
      result: [
        { key: "for", label: "For", vp: 4_110_000 },
        { key: "against", label: "Against", vp: 1_590_000 },
      ],
    },
    execution: [
      { title: "Proposal passed", meta: "Jun 7, 2026 - quorum reached", cls: "done" },
      { title: "Queued in timelock", meta: "48-hour delay - ends Jun 9", cls: "cur" },
      { title: "Execute treasury transfer", meta: "1.2M USDC to Grants multisig", cls: "pending" },
    ],
    voters: makeVoters([
      { name: "0x1a2b...9f3c", sub: "Whale wallet", vp: 1_200_000, choice: "for" },
      { name: "sofia.eth", sub: "Author - Delegate", vp: 842_000, choice: "for" },
      { name: "lighthouse.eth", sub: "Delegate", vp: 410_000, choice: "for" },
      { name: "gov-collective.eth", sub: "Delegate", vp: 268_000, choice: "for" },
      { name: "mlaporte.eth", sub: "Core contributor", vp: 96_000, choice: "against" },
      { name: "protocol-guild.eth", sub: "Delegate", vp: 34_000, choice: "against" },
    ]),
    nonVoters: BASE_NONVOTERS,
    publicComments: [
      publicComment({ name: "lighthouse.eth", vp: 410_000, time: "4h ago", people: 58, vpUp: 410_000, text: "Strong support. The public goods funding gap is real and this is a measured, milestone-gated ask. I would push for the milestone report to be on-chain attestable so the second tranche is verifiable.", replies: [
        publicComment({ name: "sofia.eth", vp: 842_000, role: "author", time: "3h ago", people: 31, vpUp: 870_000, text: "Agreed. We can require an attestation from the grants multisig before tranche 2 unlocks." }),
      ] }),
      publicComment({ name: "0x1a2b...9f3c", vp: 1_200_000, time: "8h ago", people: 12, vpUp: 1_200_000, text: "Concerned about treasury runway if USDC reserves dip below the 18-month floor. Can someone confirm this allocation keeps us above it?" }),
      publicComment({ name: "researchdao.eth", vp: 41_000, time: "11h ago", people: 27, vpUp: 95_000, text: "The protocol research carve-out is the most valuable line item here. We have been bottlenecked on independent review for two cycles." }),
    ],
    anonComments: [
      anonComment({ vp: 76_000, badges: ["verified", "voted"], time: "2h ago", upvotes: 24, text: "The grants committee needs stronger conflict-of-interest disclosure before receiving this budget." }),
      anonComment({ vp: 154_000, badges: ["verified", "voted"], time: "5h ago", upvotes: 41, text: "As someone who applied last cycle: the bottleneck was review turnaround. Add a two-week review SLA." }),
    ],
  },

  "PIP-031": {
    id: "PIP-031",
    title: "Reduce the protocol fee switch from 0.30% to 0.25%",
    summary: "Lower the active fee tier to stay competitive with peer L2s while preserving treasury inflow. Includes a 30-day review trigger if weekly volume drops more than 15%.",
    author: "lighthouse.eth",
    created: "May 30, 2026",
    votingStart: "Jun 2, 2026",
    votingEnd: "Jun 8, 2026",
    tags: ["Protocol"],
    phase: "voting",
    eligibleVP: 12_070_000,
    participationVP: 6_810_000,
    quorumVP: 5_000_000,
    voterCount: 2104,
    eligibleCount: ELIGIBLE_VOTER_COUNT,
    fullDescription: [
      makeSection("Abstract", "Reduce the active protocol fee switch from 0.30% to 0.25% for the next 30 days. The change is reversible through governance and includes an automatic review if weekly protocol volume declines by more than 15% from the trailing four-week average."),
      makeSection("Motivation", "Several peer L2 deployments lowered effective trading costs during the last quarter. Veil volume has remained stable, but aggregator routing data shows marginal flow moving away from pools where the fee switch is most visible. A modest reduction protects competitiveness without turning off treasury revenue."),
      makeSection("Implementation", "On passage, the operations multisig updates the fee controller parameter to 25 basis points after a 24-hour notice window. A dashboard will publish daily fee revenue, volume, and LP net yield during the trial."),
      makeSection("Review Trigger", "If weekly volume falls by more than 15% against the trailing four-week average, the parameter change is paused for review. If fee revenue falls while volume does not recover, governance can revert to 0.30% through an expedited proposal."),
    ],
    voteOptions: [
      { key: "for", label: "For", desc: "Run the 0.25% fee switch trial" },
      { key: "against", label: "Against", desc: "Keep the current 0.30% fee switch" },
    ],
    participationSeries: [0.0, 1.2, 2.4, 3.6, 4.9, 5.8, 6.81],
    participationFinal: [0.0, 1.2, 2.7, 4.1, 5.3, 6.3, 7.1, 7.4],
    final: {
      passed: true,
      participationVP: 7_400_000,
      voterCount: 2320,
      result: [
        { key: "for", label: "For", vp: 4_980_000 },
        { key: "against", label: "Against", vp: 2_420_000 },
      ],
    },
    execution: [
      { title: "Parameter queued", meta: "Jun 8, 2026 - 24-hour notice", cls: "cur" },
      { title: "Fee switch update", meta: "Set controller to 0.25%", cls: "pending" },
      { title: "30-day review", meta: "Publish volume and revenue report", cls: "pending" },
    ],
    voters: makeVoters([
      { name: "lighthouse.eth", sub: "Author - Delegate", vp: 410_000, choice: "for" },
      { name: "dexresearch.eth", sub: "Delegate", vp: 525_000, choice: "for" },
      { name: "0x77d4...e10a", vp: 305_000, choice: "for" },
      { name: "treasuryguild.eth", sub: "Delegate", vp: 220_000, choice: "against" },
      { name: "marketops.eth", sub: "Core contributor", vp: 188_000, choice: "for" },
      { name: "longtail.eth", vp: 44_000, choice: "against" },
    ]),
    nonVoters: BASE_NONVOTERS,
    publicComments: [
      publicComment({ name: "dexresearch.eth", vp: 525_000, time: "1h ago", people: 34, vpUp: 780_000, text: "The review trigger is the important guardrail. I support the lower fee as long as the dashboard is live before execution." }),
      publicComment({ name: "treasuryguild.eth", vp: 220_000, time: "3h ago", people: 19, vpUp: 305_000, voted: true, text: "Against for now. Treasury revenue is already uneven and a 30-day window may be too short to isolate the effect." }),
      publicComment({ name: "lighthouse.eth", vp: 410_000, role: "author", time: "5h ago", people: 41, vpUp: 640_000, text: "Author note: this is a parameter trial, not a permanent fee policy. Reversion remains available at any point." }),
    ],
    anonComments: [
      anonComment({ vp: 88_000, badges: ["verified", "voted"], time: "45m ago", upvotes: 18, text: "Aggregators are already routing around the fee. We should test the lower switch before the behavior becomes sticky." }),
      anonComment({ vp: 21_500, badges: ["eligible"], time: "4h ago", upvotes: 7, text: "Would prefer a 45-day review. Thirty days may be too noisy." }),
    ],
  },

  "GRC-009": {
    id: "GRC-009",
    title: "Onboard two new signers to the treasury multisig",
    summary: "Rotate in two independent signers and raise the threshold to 5-of-8, reducing single-entity influence over treasury execution ahead of the next funding cycle.",
    author: "gov-collective.eth",
    created: "Jun 1, 2026",
    votingStart: "Jun 3, 2026",
    votingEnd: "Jun 9, 2026",
    tags: ["Security"],
    phase: "voting",
    eligibleVP: 12_070_000,
    participationVP: 4_620_000,
    quorumVP: 5_000_000,
    voterCount: 1488,
    eligibleCount: ELIGIBLE_VOTER_COUNT,
    fullDescription: [
      makeSection("Abstract", "Add two independent signers to the treasury multisig, remove one inactive signer after migration, and raise the execution threshold from 4-of-7 to 5-of-8. The change reduces operational concentration before the next treasury funding cycle."),
      makeSection("Motivation", "The treasury multisig currently relies on a narrow set of core contributors. That structure was appropriate during launch, but the DAO now executes larger grants, liquidity, and operations transfers. More independent signers reduce key-person and jurisdictional risk."),
      makeSection("Signer Criteria", "The new signers are independent delegates with no current employment relationship to the core contributor team. Both have completed hardware-wallet attestations and committed to a 12-hour maximum response SLA for urgent pause or recovery actions."),
      makeSection("Migration Plan", "The existing multisig will stage a test transaction, add the two new signers, raise the threshold to 5-of-8, then remove the inactive signer after a 72-hour observation window. All changes are published in the governance forum before execution."),
    ],
    voteOptions: [
      { key: "for", label: "For", desc: "Onboard signers and raise threshold to 5-of-8" },
      { key: "against", label: "Against", desc: "Keep the current signer set" },
    ],
    participationSeries: [0.0, 0.9, 1.7, 2.8, 3.5, 4.1, 4.62],
    participationFinal: [0.0, 1.0, 2.1, 3.4, 4.9, 5.8, 6.3, 6.9],
    final: {
      passed: true,
      participationVP: 6_900_000,
      voterCount: 2022,
      result: [
        { key: "for", label: "For", vp: 5_520_000 },
        { key: "against", label: "Against", vp: 1_380_000 },
      ],
    },
    execution: [
      { title: "Signer attestations", meta: "Hardware checks complete", cls: "done" },
      { title: "Multisig migration", meta: "Add signers and raise threshold", cls: "cur" },
      { title: "Inactive signer removal", meta: "72-hour observation window", cls: "pending" },
    ],
    voters: makeVoters([
      { name: "gov-collective.eth", sub: "Author - Delegate", vp: 268_000, choice: "for" },
      { name: "securitydao.eth", sub: "Delegate", vp: 610_000, choice: "for" },
      { name: "0x4e91...b7a2", vp: 154_000, choice: "for" },
      { name: "mlaporte.eth", sub: "Core contributor", vp: 96_000, choice: "for" },
      { name: "0xf7a3...c40e", vp: 14_100, choice: "against" },
      { name: "ops-review.eth", vp: 71_000, choice: "for" },
    ]),
    nonVoters: BASE_NONVOTERS,
    publicComments: [
      publicComment({ name: "securitydao.eth", vp: 610_000, time: "2h ago", people: 46, vpUp: 830_000, text: "Raising the threshold is the right move. Please publish the test transaction hash before the signer rotation starts." }),
      publicComment({ name: "gov-collective.eth", vp: 268_000, role: "author", time: "4h ago", people: 21, vpUp: 360_000, text: "We will post the test transaction and all signer attestations in the forum thread before execution." }),
      publicComment({ name: "0xf7a3...c40e", vp: 14_100, time: "6h ago", people: 8, vpUp: 42_000, text: "Support the goal, but the DAO should define signer removal criteria before adding more people." }),
    ],
    anonComments: [
      anonComment({ vp: 63_000, badges: ["verified"], time: "1h ago", upvotes: 12, text: "Independent signers help, but response SLA monitoring should be public." }),
      anonComment({ vp: 9_400, badges: ["eligible"], time: "7h ago", upvotes: 5, text: "Would like to see a quarterly signer health report after this passes." }),
    ],
  },

  "PGF-015": {
    id: "PGF-015",
    title: "Establish a rolling retroPGF funding round",
    summary: "Replace the annual lump-sum retro round with a continuous quarterly cadence, smoothing treasury outflow and shortening the feedback loop for contributors.",
    author: "researchdao.eth",
    created: "Jun 2, 2026",
    votingStart: "Jun 6, 2026",
    votingEnd: "Jun 12, 2026",
    tags: ["Grants", "Governance"],
    phase: "discussion",
    eligibleVP: 12_070_000,
    participationVP: 0,
    quorumVP: 5_000_000,
    voterCount: 0,
    eligibleCount: ELIGIBLE_VOTER_COUNT,
    fullDescription: [
      makeSection("Abstract", "Replace the annual retroPGF lump-sum process with a quarterly rolling round. Each quarter funds completed public-good contributions from the prior quarter, with unused allocation rolling forward rather than returning immediately to the treasury."),
      makeSection("Motivation", "Annual retro rounds create long feedback cycles and force contributors to self-fund work for months before receiving signal. A rolling cadence lets the DAO reward useful work closer to when it ships, while preserving retroactive evaluation."),
      makeSection("Round Design", "Each quarter has a 21-day nomination window, a 10-day review window, and a 7-day community challenge period. Voters allocate across nominated projects using private ballots. Results reveal aggregate allocations only."),
      makeSection("Budget Control", "The first two quarters are capped at 250k USDC each. If fewer qualified projects appear, unallocated funds roll into the next round up to a 750k USDC ceiling. A continuation vote is required after two quarters."),
    ],
    voteOptions: [
      { key: "for", label: "For", desc: "Create rolling quarterly retroPGF rounds" },
      { key: "against", label: "Against", desc: "Keep the current annual process" },
    ],
    participationSeries: [0, 0, 0, 0],
    participationFinal: [0.0, 0.4, 1.3, 2.2, 3.5, 4.6, 5.2, 5.9],
    final: {
      passed: true,
      participationVP: 5_900_000,
      voterCount: 1670,
      result: [
        { key: "for", label: "For", vp: 3_780_000 },
        { key: "against", label: "Against", vp: 2_120_000 },
      ],
    },
    execution: [
      { title: "Discussion phase", meta: "Voting opens Jun 6", cls: "cur" },
      { title: "Quarterly round setup", meta: "If passed, nominations open Jun 18", cls: "pending" },
    ],
    voters: [],
    nonVoters: BASE_NONVOTERS,
    publicComments: [
      publicComment({ name: "researchdao.eth", vp: 41_000, role: "author", voted: false, time: "2h ago", people: 29, vpUp: 188_000, text: "Author note: the intent is to smooth contributor feedback, not expand the grants budget indefinitely." }),
      publicComment({ name: "ecosysfund.eth", vp: 7_700, voted: false, time: "4h ago", people: 17, vpUp: 91_000, text: "Quarterly rounds would make it easier for smaller tooling projects to survive between funding cycles." }),
      publicComment({ name: "kpatel.eth", vp: 132_000, role: "core", voted: false, time: "6h ago", people: 11, vpUp: 144_000, text: "We need clear anti-sybil criteria for nominations before this goes to vote." }),
    ],
    anonComments: [
      anonComment({ vp: 112_000, badges: ["verified"], time: "1h ago", upvotes: 19, text: "Please keep the first two quarters capped. Rolling programs are easy to start and hard to stop." }),
      anonComment({ vp: 17_800, badges: ["eligible"], time: "5h ago", upvotes: 9, text: "A private allocation ballot is a good fit here. Public allocation voting turns into reputation pressure quickly." }),
    ],
  },

  "GOV-005": {
    id: "GOV-005",
    title: "Lower the proposal submission threshold to 50k VP",
    summary: "Reduce the barrier to submit on-chain proposals from 120k to 50k VP to widen participation, paired with a refundable anti-spam deposit.",
    author: "kpatel.eth",
    created: "May 29, 2026",
    votingStart: "May 31, 2026",
    votingEnd: "Jun 6, 2026",
    tags: ["Governance"],
    phase: "voting",
    eligibleVP: 12_070_000,
    participationVP: 5_420_000,
    quorumVP: 4_000_000,
    voterCount: 1760,
    eligibleCount: ELIGIBLE_VOTER_COUNT,
    fullDescription: [
      makeSection("Abstract", "Lower the minimum voting power required to submit an on-chain proposal from 120k VP to 50k VP. Add a refundable anti-spam deposit that is returned when a proposal reaches quorum or receives delegate sponsorship."),
      makeSection("Motivation", "The current threshold filters spam but also excludes active contributors who do not hold large delegated positions. Lowering the threshold improves agenda access while the deposit discourages low-effort submissions."),
      makeSection("Deposit Mechanics", "A proposer posts a 2,500 USDC deposit when submitting on-chain. The deposit is refunded if the proposal reaches quorum, receives sponsorship from two recognized delegates, or is withdrawn before voting opens. Failed spam challenges transfer the deposit to the DAO treasury."),
      makeSection("Review", "After 90 days, governance operations will report proposal count, quorum rate, delegate sponsorship rate, and spam challenge outcomes. The threshold can be restored through a standard governance vote."),
    ],
    voteOptions: [
      { key: "for", label: "For", desc: "Lower threshold with refundable deposit" },
      { key: "against", label: "Against", desc: "Keep the current 120k VP threshold" },
    ],
    participationSeries: [0.0, 0.8, 1.9, 3.1, 4.4, 5.42],
    participationFinal: [0.0, 0.9, 2.0, 3.3, 4.7, 5.42],
    final: {
      passed: false,
      participationVP: 5_420_000,
      voterCount: 1760,
      result: [
        { key: "for", label: "For", vp: 2_210_000 },
        { key: "against", label: "Against", vp: 3_210_000 },
      ],
    },
    execution: [
      { title: "Voting closed", meta: "Jun 6, 2026 - quorum reached", cls: "done" },
      { title: "No parameter change", meta: "Proposal did not pass", cls: "cur" },
    ],
    voters: makeVoters([
      { name: "kpatel.eth", sub: "Author - Core contributor", vp: 132_000, choice: "for" },
      { name: "longtail.eth", vp: 44_000, choice: "for" },
      { name: "gov-collective.eth", sub: "Delegate", vp: 268_000, choice: "against" },
      { name: "treasuryguild.eth", sub: "Delegate", vp: 220_000, choice: "against" },
      { name: "quietvoter.eth", vp: 8_200, choice: "for" },
      { name: "0x1a2b...9f3c", sub: "Whale wallet", vp: 1_200_000, choice: "against" },
    ]),
    nonVoters: BASE_NONVOTERS,
    publicComments: [
      publicComment({ name: "longtail.eth", vp: 44_000, time: "1d ago", people: 52, vpUp: 420_000, text: "Strongly for. The current threshold blocks the exact contributors governance should hear from." }),
      publicComment({ name: "gov-collective.eth", vp: 268_000, time: "1d ago", people: 37, vpUp: 620_000, text: "Against this version. I support lower thresholds, but the deposit challenge process is underspecified." }),
      publicComment({ name: "kpatel.eth", vp: 132_000, role: "author", time: "2d ago", people: 24, vpUp: 188_000, text: "The deposit amount is intentionally high enough to deter spam but low enough for working groups to coordinate around." }),
    ],
    anonComments: [
      anonComment({ vp: 205_000, badges: ["verified", "voted"], time: "1d ago", upvotes: 31, text: "The proposal is directionally right, but the challenge process needs an appeal path." }),
      anonComment({ vp: 39_000, badges: ["verified"], time: "2d ago", upvotes: 14, text: "Delegates should sponsor more proposals instead of changing the protocol threshold." }),
    ],
  },

  "PIP-030": {
    id: "PIP-030",
    title: "Adopt the v3 staking contract upgrade",
    summary: "Migrate to the audited v3 staking module with native restaking hooks and a 7-day unbonding queue. Includes a phased rollout and an emergency pause guardian.",
    author: "mlaporte.eth",
    created: "May 18, 2026",
    votingStart: "May 22, 2026",
    votingEnd: "May 30, 2026",
    tags: ["Protocol", "Upgrade"],
    phase: "ended",
    eligibleVP: 12_070_000,
    participationVP: 7_100_000,
    quorumVP: 5_000_000,
    voterCount: 2310,
    eligibleCount: ELIGIBLE_VOTER_COUNT,
    fullDescription: [
      makeSection("Abstract", "Adopt the audited v3 staking module, enabling native restaking hooks, a 7-day unbonding queue, and a phased migration from the v2 staking contract."),
      makeSection("Motivation", "The v2 staking contract lacks native hooks for restaking integrations and has accumulated operational complexity around reward accounting. The v3 module simplifies accounting and supports upcoming partner integrations."),
      makeSection("Rollout", "Migration begins with a 10% opt-in cap, expands to 50% after seven days without critical alerts, and opens fully after the second monitoring report. The v2 contract remains withdraw-only for 90 days."),
      makeSection("Safety Controls", "An emergency pause guardian can halt new deposits for 14 days. Any longer pause requires governance ratification. The audit report and formal verification notes are linked in the forum thread."),
    ],
    voteOptions: [
      { key: "for", label: "For", desc: "Adopt the v3 staking module" },
      { key: "against", label: "Against", desc: "Keep staking on v2 for now" },
    ],
    participationSeries: [0.0, 1.1, 2.6, 4.2, 5.6, 6.4, 7.1],
    participationFinal: [0.0, 1.1, 2.6, 4.2, 5.6, 6.4, 7.1],
    final: {
      passed: true,
      participationVP: 7_100_000,
      voterCount: 2310,
      result: [
        { key: "for", label: "For", vp: 5_396_000 },
        { key: "against", label: "Against", vp: 1_704_000 },
      ],
    },
    execution: [
      { title: "Proposal passed", meta: "May 30, 2026 - 76% For", cls: "done" },
      { title: "Migration cap live", meta: "10% opt-in cap enabled", cls: "cur" },
      { title: "Expand rollout", meta: "Pending monitoring report", cls: "pending" },
    ],
    voters: makeVoters([
      { name: "mlaporte.eth", sub: "Author - Core contributor", vp: 96_000, choice: "for" },
      { name: "protocol-guild.eth", sub: "Delegate", vp: 34_000, choice: "for" },
      { name: "stakinglabs.eth", sub: "Auditor", vp: 280_000, choice: "for" },
      { name: "0x77d4...e10a", vp: 305_000, choice: "for" },
      { name: "riskdesk.eth", vp: 118_000, choice: "against" },
      { name: "0xf7a3...c40e", vp: 14_100, choice: "against" },
    ]),
    nonVoters: BASE_NONVOTERS,
    publicComments: [
      publicComment({ name: "stakinglabs.eth", vp: 280_000, time: "8d ago", people: 61, vpUp: 780_000, text: "The staged cap is the right control. The v3 accounting model is substantially cleaner than v2." }),
      publicComment({ name: "riskdesk.eth", vp: 118_000, time: "9d ago", people: 22, vpUp: 190_000, text: "Against until the pause guardian policy is more constrained. Fourteen days is acceptable only with clear reporting." }),
      publicComment({ name: "mlaporte.eth", vp: 96_000, role: "author", time: "10d ago", people: 34, vpUp: 360_000, text: "We will publish monitoring snapshots after the 10% and 50% rollout gates." }),
    ],
    anonComments: [
      anonComment({ vp: 67_500, badges: ["verified", "voted"], time: "8d ago", upvotes: 26, text: "Restaking hooks are worth the migration risk if the cap stays enforced." }),
      anonComment({ vp: 24_300, badges: ["verified"], time: "9d ago", upvotes: 10, text: "Please make the withdraw-only v2 window very visible in the app." }),
    ],
  },

  "TRS-008": {
    id: "TRS-008",
    title: "Diversify 8% of the treasury into staked ETH",
    summary: "Convert a portion of idle USDC reserves into liquid staked ETH for yield. Rejected over concerns about runway floor and drawdown exposure in a downturn.",
    author: "treasuryguild.eth",
    created: "May 14, 2026",
    votingStart: "May 18, 2026",
    votingEnd: "May 24, 2026",
    tags: ["Treasury"],
    phase: "ended",
    eligibleVP: 12_070_000,
    participationVP: 5_300_000,
    quorumVP: 5_000_000,
    voterCount: 1702,
    eligibleCount: ELIGIBLE_VOTER_COUNT,
    fullDescription: [
      makeSection("Abstract", "Convert 8% of idle USDC treasury reserves into a diversified basket of liquid staked ETH. The position would target low operational overhead yield while keeping at least 18 months of runway in stable assets."),
      makeSection("Motivation", "The treasury holds a large idle stablecoin balance. A measured allocation to staked ETH could improve long-term purchasing power and align the DAO with Ethereum-native collateral."),
      makeSection("Execution Plan", "Purchases would be split across four weekly tranches and routed through approved venues. The treasury guild would publish price, slippage, custody, and staking-provider reports after each tranche."),
      makeSection("Why It Failed", "Voters rejected the proposal because ETH drawdown risk could threaten the runway floor during a market contraction. Several delegates requested a smaller pilot allocation with explicit stop-loss and rebalancing rules."),
    ],
    voteOptions: [
      { key: "for", label: "For", desc: "Diversify 8% into staked ETH" },
      { key: "against", label: "Against", desc: "Keep idle reserves in USDC" },
    ],
    participationSeries: [0.0, 0.7, 1.6, 2.5, 4.1, 5.3],
    participationFinal: [0.0, 0.7, 1.6, 2.5, 4.1, 5.3],
    final: {
      passed: false,
      participationVP: 5_300_000,
      voterCount: 1702,
      result: [
        { key: "for", label: "For", vp: 2_438_000 },
        { key: "against", label: "Against", vp: 2_862_000 },
      ],
    },
    execution: [
      { title: "Voting closed", meta: "May 24, 2026 - quorum reached", cls: "done" },
      { title: "No purchase authorized", meta: "Proposal failed 46% to 54%", cls: "cur" },
    ],
    voters: makeVoters([
      { name: "treasuryguild.eth", sub: "Author - Delegate", vp: 220_000, choice: "for" },
      { name: "yieldops.eth", vp: 160_000, choice: "for" },
      { name: "0x1a2b...9f3c", sub: "Whale wallet", vp: 1_200_000, choice: "against" },
      { name: "riskdesk.eth", vp: 118_000, choice: "against" },
      { name: "lighthouse.eth", sub: "Delegate", vp: 410_000, choice: "against" },
      { name: "ecosysfund.eth", vp: 7_700, choice: "for" },
    ]),
    nonVoters: BASE_NONVOTERS,
    publicComments: [
      publicComment({ name: "riskdesk.eth", vp: 118_000, time: "14d ago", people: 48, vpUp: 810_000, text: "The runway floor should be hard, not advisory. I would support a 2% pilot with explicit rebalancing rules." }),
      publicComment({ name: "treasuryguild.eth", vp: 220_000, role: "author", time: "15d ago", people: 33, vpUp: 420_000, text: "We hear the drawdown concern. The 8% figure was selected to keep the treasury above the 18-month floor under our base case." }),
      publicComment({ name: "yieldops.eth", vp: 160_000, time: "15d ago", people: 18, vpUp: 210_000, text: "Idle reserves have a real opportunity cost. A smaller pilot may be the compromise path." }),
    ],
    anonComments: [
      anonComment({ vp: 91_000, badges: ["verified", "voted"], time: "14d ago", upvotes: 38, text: "I voted against because the downside case was not modeled clearly enough." }),
      anonComment({ vp: 33_700, badges: ["verified"], time: "15d ago", upvotes: 11, text: "Treasury diversification is sensible, but not before the DAO defines risk limits." }),
    ],
  },

  "PIP-028": {
    id: "PIP-028",
    title: "Deprecate the legacy bridge adapter",
    summary: "Sunset the v1 bridge adapter after a 60-day migration window. Passed near-unanimously following two cycles of advance notice to integrators.",
    author: "0x1a2b...9f3c",
    created: "May 8, 2026",
    votingStart: "May 12, 2026",
    votingEnd: "May 18, 2026",
    tags: ["Protocol"],
    phase: "ended",
    eligibleVP: 12_070_000,
    participationVP: 6_900_000,
    quorumVP: 3_000_000,
    voterCount: 2188,
    eligibleCount: ELIGIBLE_VOTER_COUNT,
    fullDescription: [
      makeSection("Abstract", "Deprecate the v1 bridge adapter after a 60-day migration window. The v2 adapter has been live for two cycles and now carries nearly all bridge volume."),
      makeSection("Motivation", "The legacy adapter increases maintenance burden and keeps a larger attack surface active. Integrators have received two rounds of migration notices and the remaining usage is below 2% of weekly bridge volume."),
      makeSection("Migration Window", "For 60 days after passage, the v1 adapter remains withdraw-only. Deposits route to v2. Integrators receive weekly reminders and a final 7-day notice before the adapter is disabled."),
      makeSection("Post-Deprecation", "After the window ends, the adapter owner is set to the burn address and monitoring alerts are removed. Historical data remains indexed for analytics and user support."),
    ],
    voteOptions: [
      { key: "for", label: "For", desc: "Deprecate the v1 bridge adapter" },
      { key: "against", label: "Against", desc: "Keep the v1 adapter active" },
    ],
    participationSeries: [0.0, 1.4, 3.0, 4.9, 6.0, 6.9],
    participationFinal: [0.0, 1.4, 3.0, 4.9, 6.0, 6.9],
    final: {
      passed: true,
      participationVP: 6_900_000,
      voterCount: 2188,
      result: [
        { key: "for", label: "For", vp: 6_279_000 },
        { key: "against", label: "Against", vp: 621_000 },
      ],
    },
    execution: [
      { title: "Proposal passed", meta: "May 18, 2026 - 91% For", cls: "done" },
      { title: "Withdraw-only mode", meta: "60-day migration window active", cls: "cur" },
      { title: "Disable adapter", meta: "Scheduled after final notice", cls: "pending" },
    ],
    voters: makeVoters([
      { name: "0x1a2b...9f3c", sub: "Author - Whale wallet", vp: 1_200_000, choice: "for" },
      { name: "bridgeops.eth", sub: "Core contributor", vp: 320_000, choice: "for" },
      { name: "integrators.eth", sub: "Delegate", vp: 275_000, choice: "for" },
      { name: "securitydao.eth", sub: "Delegate", vp: 610_000, choice: "for" },
      { name: "legacyuser.eth", vp: 21_000, choice: "against" },
      { name: "0x4e91...b7a2", vp: 154_000, choice: "for" },
    ]),
    nonVoters: BASE_NONVOTERS,
    publicComments: [
      publicComment({ name: "bridgeops.eth", vp: 320_000, time: "21d ago", people: 74, vpUp: 950_000, text: "All known integrators have v2 endpoints. The withdraw-only period covers the remaining long-tail users." }),
      publicComment({ name: "legacyuser.eth", vp: 21_000, time: "22d ago", people: 9, vpUp: 34_000, text: "Please keep user support staffed during the migration window. Some older wallets still surface v1 links." }),
      publicComment({ name: "securitydao.eth", vp: 610_000, time: "22d ago", people: 45, vpUp: 870_000, text: "Strong for. Removing unused bridge code is one of the simplest ways to reduce protocol risk." }),
    ],
    anonComments: [
      anonComment({ vp: 58_200, badges: ["verified", "voted"], time: "21d ago", upvotes: 29, text: "Near-unanimous because this had two cycles of notice. Good process." }),
      anonComment({ vp: 12_100, badges: ["eligible"], time: "22d ago", upvotes: 6, text: "Support should publish screenshots for wallets that still show v1 routes." }),
    ],
  },
};

Object.assign(window, {
  PROPOSAL_DETAILS,
  PROPOSAL: PROPOSAL_DETAILS["PGF-014"],
  VOTE_OPTIONS: PROPOSAL_DETAILS["PGF-014"].voteOptions,
  VOTERS: PROPOSAL_DETAILS["PGF-014"].voters,
  NONVOTERS: PROPOSAL_DETAILS["PGF-014"].nonVoters,
  PUBLIC_COMMENTS: PROPOSAL_DETAILS["PGF-014"].publicComments,
  ANON_COMMENTS: PROPOSAL_DETAILS["PGF-014"].anonComments,
  PARTICIPATION_SERIES: PROPOSAL_DETAILS["PGF-014"].participationSeries,
  PARTICIPATION_FINAL: PROPOSAL_DETAILS["PGF-014"].participationFinal,
});
