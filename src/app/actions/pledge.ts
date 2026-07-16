"use server";

import {
  type ActionId,
  type RoleId,
  actionOptions,
  getAction,
  roles,
} from "@/lib/take-action";

export type PledgePayload = {
  role: RoleId;
  action: ActionId;
  name: string;
  email: string;
  note: string;
};

export type PledgeResult =
  | {
      ok: true;
      actionId: ActionId;
      pledge: string;
      nextSteps: string[];
    }
  | {
      ok: false;
      error: string;
    };

const roleIds = new Set(roles.map((r) => r.id));
const actionIds = new Set(actionOptions.map((a) => a.id));

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function submitPledge(
  payload: PledgePayload,
): Promise<PledgeResult> {
  const role = payload.role;
  const action = payload.action;
  const name = payload.name.trim();
  const email = payload.email.trim().toLowerCase();
  const note = payload.note.trim();

  if (!roleIds.has(role)) {
    return { ok: false, error: "Choose who you are." };
  }
  if (!actionIds.has(action)) {
    return { ok: false, error: "Choose an action for this week." };
  }
  if (!email || !isValidEmail(email)) {
    return { ok: false, error: "Enter a valid email so we can follow up." };
  }
  if (note.length > 4000) {
    return { ok: false, error: "Keep your note under 4,000 characters." };
  }

  const selected = getAction(action);
  const entry = {
    role,
    action,
    name: name || null,
    email,
    note: note || null,
    submittedAt: new Date().toISOString(),
    pledge: selected.pledge,
  };

  const webhook = process.env.ACTION_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
    } catch {
      // Still confirm the pledge locally — motivation shouldn't die on webhook failure
      console.error("ACTION_WEBHOOK_URL failed", entry);
    }
  } else {
    console.info("[Teach Truth pledge]", entry);
  }

  return {
    ok: true,
    actionId: action,
    pledge: selected.pledge,
    nextSteps: [...selected.nextSteps],
  };
}
