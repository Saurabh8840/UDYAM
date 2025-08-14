// utils/api.ts
export type SubmitPayload = {
  aadhaarNumber: string;
  ownerName: string;
  otp: string;
  panNumber: string;
};

// Keep /api in the value (matches backend mount)
const API_BASE =
  (import.meta.env.VITE_API_URL?.replace(/\/+$/, "") || "http://localhost:4000/api");

async function handleResponse(res: Response) {
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = json?.error || "Something went wrong";
    throw Object.assign(new Error(message), { details: json });
  }
  return json;
}

export async function submitForm(data: SubmitPayload) {
  const res = await fetch(`${API_BASE}/submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function checkHealth() {
  const res = await fetch(`${API_BASE}/health`);
  return handleResponse(res);
}

export async function getSchema() {
  const res = await fetch(`${API_BASE}/schema`);
  return handleResponse(res);
}
