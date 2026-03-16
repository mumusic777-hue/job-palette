"use client";

import { useEffect } from "react";
import { useJobHistory, type JobHistoryItem } from "@/hooks/useJobHistory";

type Props = {
  job: Omit<JobHistoryItem, "viewedAt">;
};

export default function JobHistoryTracker({ job }: Props) {
  const { addToHistory } = useJobHistory();

  useEffect(() => {
    addToHistory(job);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [job.id]);

  return null;
}
