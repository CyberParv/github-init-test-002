import Link from "next/link";
import HealthBadge from "@/components/HealthBadge";

async function fetchHealthData() {
  try {
    const res = await fetch("/api/health", { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as { status: string; version?: string; timestamp?: string };
  } catch (error) {
    return null;
  }
}

async function fetchItemSummary() {
  try {
    const res = await fetch("/api/items?page=1&pageSize=1", { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as { total?: number; items?: { id: string }[] };
  } catch (error) {
    return null;
  }
}

export default async function Page() {
  const [health, items] = await Promise.all([fetchHealthData(), fetchItemSummary()]);
  const totalItems = items?.total ?? items?.items?.length ?? 0;

  return (
    <main style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
      <header>
        <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>Dashboard</h1>
        <p style={{ color: "#4b5563" }}>System overview and quick stats.</p>
      </header>

      <section aria-labelledby="health-heading" style={{ border: "1px solid #e5e7eb", borderRadius: "0.75rem", padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 id="health-heading" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
              System Health
            </h2>
            <p style={{ color: "#6b7280" }}>Real-time readiness indicator.</p>
          </div>
          <HealthBadge initialStatus={health?.status} initialVersion={health?.version} initialTimestamp={health?.timestamp} />
        </div>
      </section>

      <section aria-labelledby="items-heading" style={{ border: "1px solid #e5e7eb", borderRadius: "0.75rem", padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <div>
            <h2 id="items-heading" style={{ fontSize: "1.25rem", fontWeight: 700 }}>Items</h2>
            <p style={{ color: "#6b7280" }}>Manage your items inventory.</p>
          </div>
          <Link
            href="/items"
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              padding: "0.75rem 1rem",
              borderRadius: "0.5rem",
              fontWeight: 600,
            }}
          >
            View Items
          </Link>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <div style={{ fontSize: "2rem", fontWeight: 700 }}>{totalItems}</div>
          <div style={{ color: "#6b7280" }}>Total items</div>
        </div>
      </section>
    </main>
  );
}
