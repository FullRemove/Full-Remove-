import { CaseRequest, CaseStatus, ContactMessage } from '../types';

const STORAGE_CASES_KEY = 'full_remove_cases_v2';
const STORAGE_MESSAGES_KEY = 'full_remove_messages_v2';
const STORAGE_EVENT_NAME = 'full_remove_data_updated';

// Realistic initial demo seed cases
const INITIAL_DEMO_CASES: CaseRequest[] = [
  {
    id: 'FR-2026-8842',
    createdAt: '2026-10-20T10:14:00Z',
    updatedAt: '2026-10-22T08:30:00Z',
    status: 'Submitted',
    clientName: 'Sarah Jenkins',
    clientEmail: 'sarah.j@example.com',
    clientPhone: '+1 (555) 234-8901',
    messengerHandle: '@sarahj_legal',
    platform: 'Instagram',
    category: 'Impersonation & Fake Profile',
    contentUrls: ['https://instagram.com/sarah_jenkins_official_clone'],
    reason: 'An unauthorized account cloned my profile pictures, bio, and family photos, sending fraudulent investment direct messages to my followers and business contacts.',
    evidenceDescription: 'Government ID verification submitted, original profile link provided, screenshots of fraudulent DMs soliciting money.',
    evidenceFileNames: ['id_verification_masked.pdf', 'fraud_dm_screenshots.zip'],
    urgency: 'High Priority (24-48h)',
    adminNotes: 'Escalated through Meta Rights Manager and verified impersonation priority channel. Ticket #META-IMPER-89214.',
    publicNotes: 'Your case has been packaged and formally escalated to Meta Trust & Safety under Impersonation Policy Violations. Awaiting final platform deactivation.',
    platformTicketRef: 'META-IMPER-89214',
    statusHistory: [
      {
        status: 'Pending',
        timestamp: '2026-10-20T10:14:00Z',
        note: 'Request received and placed into the priority audit queue.'
      },
      {
        status: 'Under Review',
        timestamp: '2026-10-20T14:45:00Z',
        note: 'Takedown specialist audited the impersonating profile and compiled proof of primary identity.'
      },
      {
        status: 'Submitted',
        timestamp: '2026-10-21T09:20:00Z',
        note: 'Formal takedown notice filed with Meta Trust & Safety escalation desk.'
      }
    ]
  },
  {
    id: 'FR-2026-7319',
    createdAt: '2026-10-18T16:00:00Z',
    updatedAt: '2026-10-21T18:00:00Z',
    status: 'Resolved',
    clientName: 'Marcus Vance',
    clientEmail: 'marcus.vance@company.net',
    clientPhone: '+1 (555) 890-1234',
    platform: 'Facebook',
    category: 'Unauthorized Photos / Videos',
    contentUrls: ['https://facebook.com/groups/localcommunity/posts/992817291'],
    reason: 'Private security camera footage of my private residence was posted into a public community group without consent or legal basis, violating private residence privacy policies.',
    evidenceDescription: 'Proof of residential ownership, property deed excerpt, and original recording timestamp demonstrating lack of consent.',
    evidenceFileNames: ['residence_proof.pdf'],
    urgency: 'Standard (48-72h)',
    adminNotes: 'Resolved in 48 hours. Post removed by platform and warning issued to group admin.',
    publicNotes: 'Takedown confirmed successful. The offending media has been scrubbed by Facebook and the URL now returns a 404 removed state.',
    platformTicketRef: 'FB-PRIV-44109',
    statusHistory: [
      { status: 'Pending', timestamp: '2026-10-18T16:00:00Z', note: 'Case logged.' },
      { status: 'Under Review', timestamp: '2026-10-19T09:10:00Z', note: 'Evidence verified under Meta Privacy Rights Policy.' },
      { status: 'Submitted', timestamp: '2026-10-19T13:30:00Z', note: 'Takedown request filed.' },
      { status: 'Resolved', timestamp: '2026-10-21T18:00:00Z', note: 'Offending media successfully taken down by platform.' }
    ]
  },
  {
    id: 'FR-2026-9504',
    createdAt: '2026-10-21T11:20:00Z',
    updatedAt: '2026-10-22T07:15:00Z',
    status: 'Under Review',
    clientName: 'Elena Rostova',
    clientEmail: 'elena@creativeatelier.com',
    platform: 'TikTok',
    category: 'Defamation & Slander',
    contentUrls: ['https://tiktok.com/@anonymous_accuser/video/739182938491'],
    reason: 'False fabricated allegations posted anonymously claiming our business is a scam, using altered documents and defamatory hashtags to damage our commercial standing.',
    evidenceDescription: 'Audit trail of registered business credentials, signed client satisfaction affidavits, proof of falsified invoice.',
    urgency: 'High Priority (24-48h)',
    adminNotes: 'Analyzing video transcript and gathering statutory evidence for TikTok Community Guidelines harassment escalation.',
    publicNotes: 'Our team is transcribing the video and preparing the formal takedown packet under TikTok Defamation and Community Guidelines provisions.',
    platformTicketRef: 'TK-CASE-PENDING',
    statusHistory: [
      { status: 'Pending', timestamp: '2026-10-21T11:20:00Z', note: 'Request received.' },
      { status: 'Under Review', timestamp: '2026-10-22T07:15:00Z', note: 'Specialist analyzing video transcript and drafting violation brief.' }
    ]
  },
  {
    id: 'FR-2026-6180',
    createdAt: '2026-10-22T08:45:00Z',
    updatedAt: '2026-10-22T08:45:00Z',
    status: 'Pending',
    clientName: 'David Kim',
    clientEmail: 'dkim.tech@gmail.com',
    platform: 'X (Twitter)',
    category: 'Doxxing & Personal Data Leak',
    contentUrls: ['https://x.com/cyber_bad_actor/status/184829103819'],
    reason: 'A targeted harassment thread leaking my private residential address and phone number with intent to incite harassment.',
    evidenceDescription: 'Direct links to 3 tweets containing PII, screenshot archive before potential deletion/evasion.',
    urgency: 'Critical Incident (<24h)',
    adminNotes: 'Urgent doxxing report. Needs immediate priority escalation under X Private Information Safety Policy.',
    publicNotes: 'Received into our Critical Incident queue. An escalation specialist is assigned and preparing immediate takedown filing.',
    statusHistory: [
      { status: 'Pending', timestamp: '2026-10-22T08:45:00Z', note: 'Critical incident logged and routed to immediate triage.' }
    ]
  }
];

const INITIAL_DEMO_MESSAGES: ContactMessage[] = [
  {
    id: 'MSG-101',
    createdAt: '2026-10-21T14:30:00Z',
    name: 'Robert Lang',
    email: 'robert.lang@outlook.com',
    subject: 'Emergency takedown for executive client',
    message: 'Hello, our firm is dealing with an active impersonation account threatening clients. Can you assist with rapid same-day escalation?',
    status: 'Read'
  },
  {
    id: 'MSG-102',
    createdAt: '2026-10-22T06:12:00Z',
    name: 'Melissa Thorne',
    email: 'm.thorne@designgroup.org',
    subject: 'Question on copyright takedown timeline',
    message: 'We noticed a portfolio video was scraped and re-uploaded on Reddit. How long does standard Reddit DMCA processing usually take through Full Remove?',
    status: 'Unread'
  }
];

function triggerStorageUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(STORAGE_EVENT_NAME));
  }
}

export const StorageService = {
  subscribe(callback: () => void) {
    if (typeof window === 'undefined') return () => {};
    window.addEventListener(STORAGE_EVENT_NAME, callback);
    return () => window.removeEventListener(STORAGE_EVENT_NAME, callback);
  },

  getAllCases(): CaseRequest[] {
    if (typeof window === 'undefined') return INITIAL_DEMO_CASES;
    try {
      const stored = localStorage.getItem(STORAGE_CASES_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_CASES_KEY, JSON.stringify(INITIAL_DEMO_CASES));
        return INITIAL_DEMO_CASES;
      }
      return JSON.parse(stored) as CaseRequest[];
    } catch {
      return INITIAL_DEMO_CASES;
    }
  },

  getCaseById(id: string): CaseRequest | null {
    const cases = this.getAllCases();
    const cleanId = id.trim().toUpperCase();
    return cases.find(c => c.id.toUpperCase() === cleanId) || null;
  },

  getCaseByEmailAndId(id: string, email: string): CaseRequest | null {
    const cases = this.getAllCases();
    const cleanId = id.trim().toUpperCase();
    const cleanEmail = email.trim().toLowerCase();
    return cases.find(c => 
      c.id.toUpperCase() === cleanId && 
      c.clientEmail.trim().toLowerCase() === cleanEmail
    ) || null;
  },

  createCase(newCaseData: Omit<CaseRequest, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'statusHistory'>): CaseRequest {
    const cases = this.getAllCases();
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const id = `FR-2026-${randomDigits}`;
    const now = new Date().toISOString();

    const newCase: CaseRequest = {
      ...newCaseData,
      id,
      createdAt: now,
      updatedAt: now,
      status: 'Pending',
      statusHistory: [
        {
          status: 'Pending',
          timestamp: now,
          note: 'Case received and registered into the Full Remove triage system.'
        }
      ]
    };

    const updated = [newCase, ...cases];
    localStorage.setItem(STORAGE_CASES_KEY, JSON.stringify(updated));
    triggerStorageUpdate();
    return newCase;
  },

  updateCaseStatus(
    id: string, 
    status: CaseStatus, 
    publicNotes?: string, 
    adminNotes?: string, 
    platformTicketRef?: string
  ): CaseRequest | null {
    const cases = this.getAllCases();
    const index = cases.findIndex(c => c.id.toUpperCase() === id.trim().toUpperCase());
    if (index === -1) return null;

    const existing = cases[index];
    const now = new Date().toISOString();

    const isStatusChanged = existing.status !== status;
    const newHistory = [...existing.statusHistory];
    
    if (isStatusChanged || publicNotes) {
      newHistory.push({
        status,
        timestamp: now,
        note: publicNotes || `Case status updated to ${status}.`
      });
    }

    const updatedCase: CaseRequest = {
      ...existing,
      status,
      updatedAt: now,
      publicNotes: publicNotes !== undefined ? publicNotes : existing.publicNotes,
      adminNotes: adminNotes !== undefined ? adminNotes : existing.adminNotes,
      platformTicketRef: platformTicketRef !== undefined ? platformTicketRef : existing.platformTicketRef,
      statusHistory: newHistory
    };

    cases[index] = updatedCase;
    localStorage.setItem(STORAGE_CASES_KEY, JSON.stringify(cases));
    triggerStorageUpdate();
    return updatedCase;
  },

  deleteCase(id: string): boolean {
    const cases = this.getAllCases();
    const filtered = cases.filter(c => c.id.toUpperCase() !== id.trim().toUpperCase());
    if (filtered.length === cases.length) return false;
    localStorage.setItem(STORAGE_CASES_KEY, JSON.stringify(filtered));
    triggerStorageUpdate();
    return true;
  },

  resetDemoData(): void {
    localStorage.setItem(STORAGE_CASES_KEY, JSON.stringify(INITIAL_DEMO_CASES));
    localStorage.setItem(STORAGE_MESSAGES_KEY, JSON.stringify(INITIAL_DEMO_MESSAGES));
    triggerStorageUpdate();
  },

  // Contact messages
  getContactMessages(): ContactMessage[] {
    if (typeof window === 'undefined') return INITIAL_DEMO_MESSAGES;
    try {
      const stored = localStorage.getItem(STORAGE_MESSAGES_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_MESSAGES_KEY, JSON.stringify(INITIAL_DEMO_MESSAGES));
        return INITIAL_DEMO_MESSAGES;
      }
      return JSON.parse(stored) as ContactMessage[];
    } catch {
      return INITIAL_DEMO_MESSAGES;
    }
  },

  createContactMessage(data: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): ContactMessage {
    const messages = this.getContactMessages();
    const id = `MSG-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date().toISOString();
    const newMsg: ContactMessage = {
      ...data,
      id,
      createdAt: now,
      status: 'Unread'
    };
    const updated = [newMsg, ...messages];
    localStorage.setItem(STORAGE_MESSAGES_KEY, JSON.stringify(updated));
    triggerStorageUpdate();
    return newMsg;
  },

  updateMessageStatus(id: string, status: 'Unread' | 'Read' | 'Replied'): void {
    const messages = this.getContactMessages();
    const updated = messages.map(m => m.id === id ? { ...m, status } : m);
    localStorage.setItem(STORAGE_MESSAGES_KEY, JSON.stringify(updated));
    triggerStorageUpdate();
  }
};
