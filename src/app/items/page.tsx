"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ItemTable from "@/components/ItemTable";
import { Item, deleteItem, listItems } from "@/lib/apiClient";

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  const loadItems = async (pageToLoad: number, currentQuery: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await listItems({ page: pageToLoad, pageSize, q: currentQuery || undefined });
      setItems(data.items || []);
      setTotal(data.total ?? data.items?.length ?? 0);
    } catch (err: any) {
      setError(err?.message || "Unable to load items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems(page, query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setPage(1);
    setQuery(searchInput.trim());
  };

  const handleDelete = async (id: string) => {
    await deleteItem(id);
    loadItems(page, query);
  };

  return (
    <main style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>Items</h1>
          <p style={{ color: "#4b5563" }}>Search, view, and manage your items.</p>
        </div>
        <Link
          href="/items/new"
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
            fontWeight: 600,
          }}
        >
          New Item
        </Link>
      </div>

      <form onSubmit={handleSearch} style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <label className="sr-only" htmlFor="search">
          Search items
        </label>
        <input
          id="search"
          type="search"
          placeholder="Search items"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{ flex: "1 1 240px", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #d1d5db" }}
        />
        <button
          type="submit"
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
            border: "1px solid #d1d5db",
            backgroundColor: "white",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      {loading && <div>Loading items...</div>}
      {error && <div style={{ color: "#dc2626" }}>{error}</div>}

      <ItemTable items={items} total={total} page={page} pageSize={pageSize} onPageChange={setPage} onDelete={handleDelete} />
    </main>
  );
}
