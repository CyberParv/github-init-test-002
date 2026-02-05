import Link from "next/link";
import DeleteItemButton from "@/components/DeleteItemButton";
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

export default async function ItemDetailPage({ params }: { params: { id: string } }) {
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>{item.name}</h1>
          {item.status && <p style={{ color: "#6b7280" }}>Status: {item.status}</p>}
        </div>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link
            href={`/items/${item.id}/edit`}
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              padding: "0.5rem 0.75rem",
              borderRadius: "0.5rem",
              fontWeight: 600,
            }}
          >
            Edit
          </Link>
          <DeleteItemButton itemId={item.id} />
        </div>
      </div>

      <section style={{ border: "1px solid #e5e7eb", borderRadius: "0.75rem", padding: "1.5rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem" }}>Details</h2>
        <dl style={{ display: "grid", gridTemplateColumns: "1fr 2fr", rowGap: "0.75rem", columnGap: "1rem" }}>
          <dt style={{ color: "#6b7280" }}>Name</dt>
          <dd>{item.name}</dd>
          <dt style={{ color: "#6b7280" }}>Description</dt>
          <dd>{item.description || "-"}</dd>
          <dt style={{ color: "#6b7280" }}>Status</dt>
          <dd>{item.status || "-"}</dd>
          <dt style={{ color: "#6b7280" }}>Created</dt>
          <dd>{item.createdAt ? new Date(item.createdAt).toLocaleString() : "-"}</dd>
          <dt style={{ color: "#6b7280" }}>Updated</dt>
          <dd>{item.updatedAt ? new Date(item.updatedAt).toLocaleString() : "-"}</dd>
        </dl>
      </section>

      <div>
        <Link href="/items" style={{ color: "#2563eb", fontWeight: 600 }}>
          Back to Items
        </Link>
      </div>
    </main>
  );
}
