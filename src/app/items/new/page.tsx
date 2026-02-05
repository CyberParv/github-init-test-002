"use client";

import { useRouter } from "next/navigation";
import ItemForm from "@/components/ItemForm";
import { createItem } from "@/lib/apiClient";

export default function NewItemPage() {
  const router = useRouter();

  const handleSubmit = async (values: { name: string; description?: string; status?: string }) => {
    const item = await createItem(values);
    if (item?.id) {
      router.push(`/items/${item.id}`);
    } else {
      router.push("/items");
    }
    router.refresh();
  };

  return (
    <main style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>New Item</h1>
        <p style={{ color: "#4b5563" }}>Create a new item.</p>
      </div>
      <ItemForm submitLabel="Create Item" onSubmit={handleSubmit} />
    </main>
  );
}
