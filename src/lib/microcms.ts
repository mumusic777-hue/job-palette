import { createClient } from "microcms-js-sdk";
import type { Job, Voice, Consultant, MicroCMSListResponse } from "@/types";

// microCMSクライアント（環境変数が設定されているときのみ初期化）
function getClient() {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;
  if (!serviceDomain || !apiKey) {
    throw new Error(
      "microCMSの環境変数が設定されていません。.env.localを確認してください。"
    );
  }
  return createClient({ serviceDomain, apiKey });
}

// 求人情報取得
export async function getJobs(params?: {
  limit?: number;
  offset?: number;
  filters?: string;
  q?: string;
}): Promise<MicroCMSListResponse<Job>> {
  return getClient().getList<Job>({
    endpoint: "jobs",
    queries: {
      limit: params?.limit ?? 12,
      offset: params?.offset ?? 0,
      filters: params?.filters,
      q: params?.q,
      orders: "-publishedAt",
    },
  });
}

export async function getJob(id: string): Promise<Job> {
  return getClient().getListDetail<Job>({
    endpoint: "jobs",
    contentId: id,
  });
}

export async function getFeaturedJobs(limit = 6): Promise<Job[]> {
  const res = await getClient().getList<Job>({
    endpoint: "jobs",
    queries: {
      limit,
      filters: "featured[equals]true",
      orders: "-publishedAt",
    },
  });
  return res.contents;
}

// 転職者の声取得
export async function getVoices(params?: {
  limit?: number;
  offset?: number;
}): Promise<MicroCMSListResponse<Voice>> {
  return getClient().getList<Voice>({
    endpoint: "voices",
    queries: {
      limit: params?.limit ?? 12,
      offset: params?.offset ?? 0,
      orders: "-publishedAt",
    },
  });
}

export async function getVoice(id: string): Promise<Voice> {
  return getClient().getListDetail<Voice>({
    endpoint: "voices",
    contentId: id,
  });
}

export async function getFeaturedVoices(limit = 3): Promise<Voice[]> {
  const res = await getClient().getList<Voice>({
    endpoint: "voices",
    queries: {
      limit,
      filters: "featured[equals]true",
      orders: "-publishedAt",
    },
  });
  return res.contents;
}

// コンサルタント取得
export async function getConsultants(limit = 10): Promise<Consultant[]> {
  const res = await getClient().getList<Consultant>({
    endpoint: "consultants",
    queries: {
      limit,
      orders: "createdAt",
    },
  });
  return res.contents;
}
