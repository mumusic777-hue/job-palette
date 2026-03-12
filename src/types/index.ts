// microCMS共通フィールド
export type MicroCMSDate = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

export type MicroCMSImage = {
  url: string;
  height: number;
  width: number;
};

// 求人情報
export type Job = MicroCMSDate & {
  id: string;
  title: string;
  category: JobCategory;
  location: string;
  salaryMin: number;
  salaryMax: number;
  employmentType: EmploymentType;
  description: string;
  requirements: string;
  companyName: string;
  companyLogo?: MicroCMSImage;
  featured: boolean;
  tags: string[];
};

export type JobCategory =
  | "sales"
  | "office"
  | "manufacturing"
  | "it"
  | "service"
  | "logistics"
  | "medical"
  | "food";

export type EmploymentType = "fulltime" | "parttime" | "contract";

// 転職者の声
export type Voice = MicroCMSDate & {
  id: string;
  name: string;
  age: number;
  beforeJob: string;
  afterJob: string;
  comment: string;
  photo?: MicroCMSImage;
  featured: boolean;
};

// コンサルタント（スタッフ）
export type Consultant = MicroCMSDate & {
  id: string;
  name: string;
  title: string;
  bio: string;
  photo?: MicroCMSImage;
  specialties: string[];
};

// microCMS リスト型レスポンス
export type MicroCMSListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

// 求人カテゴリラベル
export const JOB_CATEGORY_LABELS: Record<JobCategory, string> = {
  sales: "営業・販売",
  office: "事務・バックオフィス",
  manufacturing: "製造・工場",
  it: "IT・エンジニア",
  service: "サービス・接客",
  logistics: "物流・配送",
  medical: "医療・介護",
  food: "飲食・調理",
};

export const EMPLOYMENT_TYPE_LABELS: Record<EmploymentType, string> = {
  fulltime: "正社員",
  parttime: "アルバイト・パート",
  contract: "契約社員",
};
