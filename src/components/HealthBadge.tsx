"use client";

import { useEffect, useState } from "react";
import { fetchHealth } from "@/lib/apiClient";

type HealthBadgeProps = {
  initialStatus?: string;
  initialVersion?: string;
  initialTimestamp?: string;
};

export default function HealthBadge({ initialStatus, initialVersion, initialTimestamp }: HealthBadgeProps) {
  const [status, setStatus] = useState<string | undefined>(initialStatus);
  const [version, setVersion] = useState<string | undefined>(initialVersion);
  const [timestamp, setTimestamp] = useState<string | undefined>(initialTimestamp);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchHealth()
      .then((data) => {
        if (!mounted) return;
        setStatus(data.status);
        setVersion(data.version);
        setTimestamp(data.timestamp);
        setError(null);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || "Unable to load health status");
      });
    return () => {
      mounted = false;
    };
  }, []);

  const color = status === "ok" || status === "healthy" ? "#16a34a" : status === "degraded" ? "#f59e0b" : "#dc2626";

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }} aria-live="polite">
      <span
        aria-hidden
        style={{ width: "0.75rem", height: "0.75rem", borderRadius: "9999px", backgroundColor: status ? color : "#9ca3af" }}
      ></span>
      <div>
        <div style={{ fontWeight: 600 }}>{status ? status.toUpperCase() : "Unknown"}</div>
        {version && <div style={{ fontSize: "0.875rem", color: "#4b5563" }}>v{version}</div>}
        {timestamp && <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Updated {new Date(timestamp).toLocaleString()}</div>}
        {error && <div style={{ color: "#dc2626", fontSize: "0.875rem" }}>{error}</div>}
      </div>
    </div>
  );
}
