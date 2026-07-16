export const roles = [
  {
    id: "teacher",
    label: "Teacher / educator",
    blurb: "You’re in the room. Your voice is the reform.",
  },
  {
    id: "parent",
    label: "Parent / caregiver",
    blurb: "You can amplify classroom truth at home and at school.",
  },
  {
    id: "ally",
    label: "Community ally",
    blurb: "You care about kids — help teachers stop whispering alone.",
  },
  {
    id: "leader",
    label: "School / district leader",
    blurb: "You can change conditions so teachers stay and kids thrive.",
  },
] as const;

export const actionOptions = [
  {
    id: "tell-truth",
    title: "Tell my truth",
    summary: "Share a classroom story Ruth can lift up on the podcast.",
    pledge: "I will put one honest classroom truth into words this week.",
    nextSteps: [
      "Write 5–10 sentences about what’s broken — and what kids need instead.",
      "Keep names private if you need to. Truth can be specific without being reckless.",
      "Listen to Teacher Truth with Ruth, then send your note when you submit this form.",
    ],
  },
  {
    id: "share-plan",
    title: "Share the plan",
    summary: "Send the five pillars to three people who need this language.",
    pledge: "I will share the Teach Truth plan with at least three people this week.",
    nextSteps: [
      "Forward the Teach Truth Classroom Reality page or home plan to three colleagues, parents, or leaders.",
      "Add one sentence in your own words: why this matters for the kids you know.",
      "Ask one person to reply with the pillar that hits hardest for them.",
    ],
  },
  {
    id: "invite-colleague",
    title: "Invite a colleague",
    summary: "Bring one teacher into the conversation — isolation ends reform.",
    pledge: "I will invite one educator to listen and talk about the plan with me.",
    nextSteps: [
      "Text or email one colleague the Spotify link for Teacher Truth with Ruth.",
      "Pick one episode — or Ruth’s “how do we save public education?” question — as your opener.",
      "Schedule a 15-minute hallway or coffee talk: what’s one change you’d make?",
    ],
  },
  {
    id: "speak-local",
    title: "Speak up locally",
    summary: "Raise one issue with a board, PTA, admin, or community meeting.",
    pledge: "I will raise one teacher-driven reform point in a local conversation.",
    nextSteps: [
      "Choose one theme (mastery vs. promotion, over-testing, recess, special education, or teacher pay).",
      "Write a 60-second statement centered on children — not blame theater.",
      "Deliver it at a meeting, in an email, or in a one-to-one with a decision-maker.",
    ],
  },
  {
    id: "stand-with",
    title: "Stand with a teacher",
    summary: "Back someone who’s exhausted, undervalued, or afraid to speak.",
    pledge: "I will actively support one teacher who needs to feel seen this week.",
    nextSteps: [
      "Reach out with a specific offer: cover a duty, listen, or co-draft a message.",
      "Do not minimize. Say: I see the load — and I’m with you.",
      "If they’re ready, help them share truth safely through the podcast community.",
    ],
  },
] as const;

export type RoleId = (typeof roles)[number]["id"];
export type ActionId = (typeof actionOptions)[number]["id"];

export function getAction(id: ActionId) {
  return actionOptions.find((a) => a.id === id)!;
}

export function getRole(id: RoleId) {
  return roles.find((r) => r.id === id)!;
}
