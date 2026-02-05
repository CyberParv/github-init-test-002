"use client";

import { useRouter } from "next/navigation";
import ItemForm from "@/components/ItemForm";
import { Item, updateItem } from "@/lib/apiClient";

type EditItemClientProps = {
  item: Item;
};

export default function EditItemClient({ item }: EditItemClientProps) {
  const router = useRouter();

  const handleSubmit = async (values: { name: string; description?: string; status?: string }) => {
    await updateItem(item.id, values);
    router.push(`/items/${item.id}`);
    router.refresh();
  };

  return <ItemForm initialValues={{ name: item.name, description: item.description ?? "", status: item.status ?? "" }} submitLabel="Save Changes" onSubmit={handleSubmit} />;
}
