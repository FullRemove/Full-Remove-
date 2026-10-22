export type CaseStatus = 'Pending' | 'Under Review' | 'Submitted' | 'Resolved' | 'Rejected';

export type PlatformType = 
  | 'Instagram' 
  | 'Facebook' 
  | 'TikTok' 
  | 'X (Twitter)' 
  | 'YouTube' 
  | 'Reddit' 
  | 'LinkedIn' 
  | 'Telegram' 
  | 'Other';

export type RemovalCategory = 
  | 'Impersonation & Fake Profile' 
  | 'Unauthorized Photos / Videos' 
  | 'Defamation & Slander' 
  | 'Harassment & Bullying' 
  | 'Copyright & Intellectual Property' 
  | 'Doxxing & Personal Data Leak' 
  | 'Other';

export type CasePriority = 
  | 'Standard (48-72h)' 
  | 'High Priority (24-48h)' 
  | 'Critical Incident (<24h)';

export interface StatusHistoryEntry {
  status: CaseStatus;
  timestamp: string;
  note?: string;
}

export interface CaseRequest {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: CaseStatus;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  messengerHandle?: string;
  platform: PlatformType;
  category: RemovalCategory;
  contentUrls: string[];
  reason: string;
  evidenceDescription: string;
  evidenceFileNames?: string[];
  urgency: CasePriority;
  adminNotes?: string;
  publicNotes?: string;
  platformTicketRef?: string;
  statusHistory: StatusHistoryEntry[];
}

export interface ContactMessage {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'Unread' | 'Read' | 'Replied';
}

export interface AdminUser {
  isAuthenticated: boolean;
  email: string;
  role: 'superadmin' | 'moderator';
}
