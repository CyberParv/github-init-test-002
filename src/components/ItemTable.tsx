"use client";

import Link from "next/link";
import { useState } from "react";
import { Item } from "@/lib/apiClient";

type ItemTableProps = {
  items: Item[];
  total?: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onDelete?: (id: string) => Promise<void> | void;
};

export default function ItemTable({ items, total, page, pageSize, onPageChange, onDelete }: ItemTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const totalPages = total ? Math.max(1, Math.ceil(total / pageSize)) : 1;

  const handleDelete = async (id: string) => {
    if (!onDelete) return;
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (!confirmed) return;
    try {
      setDeletingId(id);
      await onDelete(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: "0.75rem" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#f9fafb" }}>
            <tr>
              <th style={{ textAlign: "left", padding: "0.75rem", borderBottom: "1px solid #e5e7eb" }}>Name</th>
              <th style={{ textAlign: "left", padding: "0.75rem", borderBottom: "1px solid #e5e7eb" }}>Status</th>
              <th style={{ textAlign: "left", padding: "0.75rem", borderBottom: "1px solid #e5e7eb" }}>Updated</th>
              <th style={{ textAlign: "left", padding: "0.75rem", borderBottom: "1px solid #e5e7eb" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: "1rem", textAlign: "center", color: "#6b7280" }}>
                  No items found.
                </td>
              </tr>
            )}
            {items.map((item) => (
              <tr key={item.id}>
                <td style={{ padding: "0.75rem", borderBottom: "1px solid #f3f4f6" }}>{item.name}</td>
                <td style={{ padding: "0.75rem", borderBottom: "1px solid #f3f4f6" }}>{item.status || "-"}</td>
                <td style={{ padding: "0.75rem", borderBottom: "1px solid #f3f4f6" }}>
                  {item.updatedAt ? new Date(item.updatedAt).toLocaleString() : "-"}
                </td>
                <td style={{ padding: "0.75rem", borderBottom: "1px solid #f3f4f6", display: "flex", gap: "0.5rem" }}>
                  <Link href={`/items/${item.id}`} style={{ color: "#2563eb", fontWeight: 600 }}>
                    View
                  </Link>
                  <Link href={`/items/${item.id}/edit`} style={{ color: "#2563eb", fontWeight: 600 }}>
                    Edit
                  </Link>
                  {onDelete && (
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#dc2626",
                        fontWeight: 600,
                        cursor: deletingId === item.id ? "not-allowed" : "pointer",
                      }}
                    >
                      {deletingId === item.id ? "Deleting..." : "Delete"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem" }}>
        <div style={{ color: "#4b5563" }}>
          Page {page} of {totalPages}
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            type="button"
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page <= 1}
            style={{
              border: "1px solid #d1d5db",
              padding: "0.5rem 0.75rem",
              borderRadius: "0.5rem",
              background: page <= 1 ? "#f3f4f6" : "white",
              cursor: page <= 1 ? "not-allowed" : "pointer",
            }}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page >= totalPages}
            style={{
              border: "1px solid #d1d5db",
              padding: "0.5rem 0.75rem",
              borderRadius: "0.5rem",
              background: page >= totalPages ? "#f3f4f6" : "white",
              cursor: page >= totalPages ? "not-allowed" : "pointer",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
