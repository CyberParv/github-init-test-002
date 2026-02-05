export type Item = {
  id: string;
  name: string;
  description?: string | null;
  status?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type ItemsResponse = {
  items: Item[];
  total?: number;
  page?: number;
  pageSize?: number;
};

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type");
  const hasJson = contentType && contentType.includes("application/json");
  const data = hasJson ? await response.json() : undefined;
  if (!response.ok) {
    const message = (data && (data.message || data.error)) || response.statusText;
    throw new Error(message);
  }
  return (data as T) || ({} as T);
}

export async function fetchHealth() {
  const res = await fetch("/api/health", { cache: "no-store" });
  return handleResponse<{ status: string; version?: string; timestamp?: string }>(res);
}

export async function listItems(params: { q?: string; page?: number; pageSize?: number } = {}): Promise<ItemsResponse> {
  const searchParams = new URLSearchParams();
  if (params.q) searchParams.set("q", params.q);
  if (params.page) searchParams.set("page", params.page.toString());
  if (params.pageSize) searchParams.set("pageSize", params.pageSize.toString());
  const query = searchParams.toString();
  const res = await fetch(`/api/items${query ? `?${query}` : ""}`, { cache: "no-store" });
  return handleResponse<ItemsResponse>(res);
}

export async function fetchItem(id: string): Promise<Item> {
  const res = await fetch(`/api/items/${id}`, { cache: "no-store" });
  return handleResponse<Item>(res);
}

export async function createItem(payload: { name: string; description?: string; status?: string }): Promise<Item> {
  const res = await fetch("/api/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse<Item>(res);
}

export async function updateItem(id: string, payload: { name?: string; description?: string; status?: string }): Promise<Item> {
  const res = await fetch(`/api/items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse<Item>(res);
}

export async function deleteItem(id: string): Promise<void> {
  const res = await fetch(`/api/items/${id}`, { method: "DELETE" });
  await handleResponse(res);
}
