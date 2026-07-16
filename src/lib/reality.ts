/**
 * Classroom reality dossier — grounded in public research
 * (Pew 2024 teacher survey, RAND teacher well-being 2025–26,
 * Attendance Works / Education Scorecard absenteeism, IDEA funding reports).
 * Framed in Teach Truth voice; stats are directional evidence, not a white paper.
 */

export const dualLedger = {
  eyebrow: "The reality",
  title: "Same crisis. Two sides of the desk.",
  lead: "What breaks teachers and what breaks children are not separate stories. They are one system failing in two directions at once.",
} as const;

export const teacherLedger = [
  {
    title: "Burned out — and still showing up",
    body: "More than half of teachers report burnout. Frequent job stress still runs far higher than for similar working adults.",
  },
  {
    title: "Behavior before breakfast",
    body: "Classroom management now rivals pay as the stress that empties the profession. Many address behavior every single day.",
  },
  {
    title: "No hours left in the day",
    body: "Most teachers say there isn’t enough time in the workday for planning, grading, and paperwork — then they take it home, or take a second job.",
  },
  {
    title: "Rooms without enough adults",
    body: "Understaffing means covering other classes, losing planning time, and watching expertise walk out the door.",
  },
] as const;

export const childLedger = [
  {
    title: "Poverty walks in with them",
    body: "Teachers name poverty as the top major problem students face at school — before the lesson even starts.",
  },
  {
    title: "Missing school, missing childhood",
    body: "Chronic absenteeism remains far above pre-pandemic levels. When classmates churn, every child in the room pays.",
  },
  {
    title: "Anxiety in the seats",
    body: "Nearly half of teachers call student anxiety and depression a major problem — especially in middle and high school.",
  },
  {
    title: "Checked out of learning",
    body: "Apathy and phone distraction compete with instruction. Engagement isn’t a soft skill — it’s the doorway to everything else.",
  },
] as const;

export const realityCards = [
  {
    slug: "behavior-climate",
    number: "01",
    title: "Behavior isn’t a character flaw — it’s a classroom climate",
    answer:
      "Teachers face daily behavior management, verbal stress, and disrupted learning; children in dysregulated rooms lose instruction, safety, and belonging.",
    teacher:
      "Behavior and classroom climate now outrank low pay as a top stressor for many educators. A majority say they address behavioral issues every day.",
    child:
      "When the room is always on edge, kids who need calm and consistency get chaos instead — and learning becomes secondary to survival.",
    teachTruth:
      "Bring teachers back with real behavior support — not blame theater. Conditions to teach are conditions to learn.",
    pillarHref: "/#pillar-bring-teachers-back",
    actionHref: "/join",
    sourceNote: "RAND / EdWeek teacher stress findings; Pew classroom challenges",
  },
  {
    slug: "time-poverty",
    number: "02",
    title: "Time poverty is policy — not poor planning",
    answer:
      "Teachers lack time in the contractual day for the work of teaching; children get less feedback, fewer relationships, and thinner instruction.",
    teacher:
      "About 84% of teachers say there isn’t enough time during regular hours for grading, planning, and paperwork. Many work ~50+ hour weeks; many hold second jobs.",
    child:
      "Exhausted adults can’t offer the attention every child deserves. Time stolen from teachers is time stolen from kids.",
    teachTruth:
      "Teachers take the wheel only if they have hours left to steer — planning time and staffing are reform, not perks.",
    pillarHref: "/#pillar-teachers-take-the-wheel",
    actionHref: "/join",
    sourceNote: "Pew Research Center teacher workload survey",
  },
  {
    slug: "empty-chairs",
    number: "03",
    title: "Empty adult chairs empty childhood continuity",
    answer:
      "Understaffed schools and teacher churn fill rooms with instability; children lose the consistent adults who know their names and stories.",
    teacher:
      "Most teachers say their school is understaffed. Vacancies and under-certified placements concentrate in the schools that can least afford them.",
    child:
      "Substitutes, revolving doors, and lost relationships hit kids first — especially students who already need more support, not less.",
    teachTruth:
      "Bring teachers back is not nostalgia. It is how children keep advocates in the room.",
    pillarHref: "/#pillar-bring-teachers-back",
    actionHref: "/join",
    sourceNote: "Pew understaffing; Learning Policy Institute vacancy estimates",
  },
  {
    slug: "attendance-spiral",
    number: "04",
    title: "The attendance spiral hurts everyone in the room",
    answer:
      "Chronic absenteeism remains elevated nationwide; classrooms become moving targets, and present students lose continuity too.",
    teacher:
      "Teachers can’t build momentum when a large share of the class is chronically gone. Absenteeism is a teaching problem as much as an enrollment problem.",
    child:
      "Roughly one in four students is still chronically absent in many national snapshots — well above pre-pandemic norms — and recovery stalls when seats stay empty.",
    teachTruth:
      "Every child, not every score means belonging and presence matter. Attendance is learning infrastructure.",
    pillarHref: "/#pillar-every-child-not-every-score",
    actionHref: "/join",
    sourceNote: "Attendance Works; Education Scorecard; RAND district panels",
  },
  {
    slug: "mental-health",
    number: "05",
    title: "Teachers became counselors without the title",
    answer:
      "Student anxiety and depression are major school problems; teachers absorb mental-health labor daily while specialists remain scarce.",
    teacher:
      "Nearly half of teachers call anxiety and depression a major problem at their school. Many help with mental health challenges several times a week — or every day.",
    child:
      "Especially in secondary grades, mental health barriers keep kids from learning, attending, and trusting school as a safe place.",
    teachTruth:
      "Truth without fear includes naming the load: classrooms need support systems, not silent martyrdom.",
    pillarHref: "/#pillar-truth-without-fear",
    actionHref: "/join",
    sourceNote: "Pew Research Center — problems students face",
  },
  {
    slug: "attention-economy",
    number: "06",
    title: "The attention economy invaded the desk",
    answer:
      "Phones and disengagement compete with instruction; apathy is a major classroom problem, especially in high school.",
    teacher:
      "Teachers report little interest in learning and phone distraction as major classroom problems — most acutely in high school.",
    child:
      "Attention is the raw material of childhood learning. When it is fractured all day, soft skills, deep reading, and peer connection erode.",
    teachTruth:
      "Learning over testing theater also means protecting the conditions for attention — not only the scoreboard after the fact.",
    pillarHref: "/#pillar-learning-over-testing-theater",
    actionHref: "/join",
    sourceNote: "Pew classroom challenges; national phone-policy research",
  },
] as const;

export const spedSpotlight = {
  slug: "special-education",
  eyebrow: "Spotlight",
  title: "The promise to students with disabilities was never fully funded",
  answer:
    "IDEA promised a free appropriate public education; federal funding has chronically fallen far short of the original commitment, leaving districts, teachers, and children to absorb the gap.",
  body: "Congress authorized covering up to 40% of the excess cost of special education. In practice, federal support has often hovered near the low teens. The result is predictable: special education vacancies, crushing caseloads, paperwork that steals instructional time, and students waiting for services that law already says they deserve.",
  teacher:
    "Special education roles are among the hardest to staff. Burnout isn’t a personal failure — it’s what underfunding + legal mandate + empty colleague chairs produces.",
  child:
    "Students with IEPs and 504s are not side notes. When support is thin, inclusion becomes a slogan and childhood becomes a waitlist.",
  teachTruth:
    "Every child, not every score is incomplete without special education truth: rights without resources are a broken promise.",
  pillarHref: "/#pillar-every-child-not-every-score",
  sourceNote:
    "U.S. Commission on Civil Rights / IDEA funding analyses; special education shortage reporting",
} as const;
