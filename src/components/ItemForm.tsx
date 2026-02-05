"use client";

import { FormEvent, useState } from "react";
import { Item } from "@/lib/apiClient";

type ItemFormValues = {
  name: string;
  description?: string;
  status?: string;
};

type ItemFormProps = {
  initialValues?: ItemFormValues;
  submitLabel?: string;
  onSubmit: (values: ItemFormValues) => Promise<void>;
};

export default function ItemForm({ initialValues, onSubmit, submitLabel = "Save" }: ItemFormProps) {
  const [values, setValues] = useState<ItemFormValues>({
    name: initialValues?.name ?? "",
    description: initialValues?.description ?? "",
    status: initialValues?.status ?? "active",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof Item) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    if (!values.name.trim()) {
      setError("Name is required");
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit({
        name: values.name.trim(),
        description: values.description?.trim() || "",
        status: values.status,
      });
    } catch (err: any) {
      setError(err?.message || "Unable to submit");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "640px" }}>
      <div>
        <label htmlFor="name" style={{ display: "block", fontWeight: 600 }}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={values.name}
          onChange={handleChange("name")}
          style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "0.5rem" }}
        />
      </div>
      <div>
        <label htmlFor="description" style={{ display: "block", fontWeight: 600 }}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={values.description}
          onChange={handleChange("description")}
          style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "0.5rem" }}
        />
      </div>
      <div>
        <label htmlFor="status" style={{ display: "block", fontWeight: 600 }}>
          Status
        </label>
        <select
          id="status"
          name="status"
          value={values.status}
          onChange={handleChange("status")}
          style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "0.5rem" }}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      {error && <div style={{ color: "#dc2626" }}>{error}</div>}
      <button
        type="submit"
        disabled={submitting}
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          padding: "0.75rem 1rem",
          borderRadius: "0.5rem",
          border: "none",
          fontWeight: 600,
          cursor: submitting ? "not-allowed" : "pointer",
        }}
      >
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
