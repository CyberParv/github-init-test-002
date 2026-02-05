import Link from "next/link";
import EditItemClient from "./EditItemClient";
import { Item } from "@/lib/apiClient";

async function fetchItemData(id: string): Promise<Item | null> {
  try {
    const res = await fetch(`/api/items/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as Item;
  } catch (error) {
    return null;
  }
}

export default async function EditItemPage({ params }: { params: { id: string } }) {
  const item = await fetchItemData(params.id);

  if (!item) {
    return (
      <main style={{ padding: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>Item not found</h1>
        <p style={{ color: "#4b5563", marginTop: "0.5rem" }}>The requested item does not exist.</p>
        <div style={{ marginTop: "1rem" }}>
          <Link href="/items" style={{ color: "#2563eb", fontWeight: 600 }}>
            Back to Items
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>Edit Item</h1>
        <p style={{ color: "#4b5563" }}>Update the item details.</p>
      </div>
      <EditItemClient item={item} />
    </main>
  );
}
