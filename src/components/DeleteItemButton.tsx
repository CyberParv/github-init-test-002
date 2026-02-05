"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteItem } from "@/lib/apiClient";

type DeleteItemButtonProps = {
  itemId: string;
  redirectTo?: string;
};

export default function DeleteItemButton({ itemId, redirectTo = "/items" }: DeleteItemButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (!confirmed) return;
    setLoading(true);
    setError(null);
    try {
      await deleteItem(itemId);
      router.push(redirectTo);
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Unable to delete item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={loading}
        style={{
          backgroundColor: "#dc2626",
          color: "white",
          padding: "0.5rem 0.75rem",
          borderRadius: "0.5rem",
          border: "none",
          fontWeight: 600,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Deleting..." : "Delete"}
      </button>
      {error && <div style={{ marginTop: "0.5rem", color: "#dc2626" }}>{error}</div>}
    </div>
  );
}
