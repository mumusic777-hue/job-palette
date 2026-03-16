"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "job_palette_history";
const MAX_HISTORY = 10;

export type JobHistoryItem = {
  id: string;
  title: string;
  companyName: string;
  category: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  employmentType: string;
  viewedAt: string;
};

export function useJobHistory() {
  const [history, setHistory] = useState<JobHistoryItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  function addToHistory(item: Omit<JobHistoryItem, "viewedAt">) {
    setHistory((prev) => {
      const filtered = prev.filter((h) => h.id !== item.id);
      const updated = [{ ...item, viewedAt: new Date().toISOString() }, ...filtered].slice(
        0,
        MAX_HISTORY
      );
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }

  function clearHistory() {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  return { history, addToHistory, clearHistory };
}
