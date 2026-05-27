import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

// Mock database file path inside the project
const MOCK_DB_PATH = path.join(process.cwd(), 'src/services/db_mock.json');

// Interface matching the mock database structure
interface MockDatabaseSchema {
  users: any[];
  websites: any[];
  onboardingSessions: any[];
  sessions: any[];
}

// Initial default structure of the database
const DEFAULT_MOCK_DB: MockDatabaseSchema = {
  users: [],
  websites: [],
  onboardingSessions: [],
  sessions: [],
};

// Helper functions to read/write the JSON mock database
function readMockDb(): MockDatabaseSchema {
  try {
    if (!fs.existsSync(MOCK_DB_PATH)) {
      fs.writeFileSync(MOCK_DB_PATH, JSON.stringify(DEFAULT_MOCK_DB, null, 2), 'utf-8');
      return DEFAULT_MOCK_DB;
    }
    const data = fs.readFileSync(MOCK_DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading mock database file:', err);
    return DEFAULT_MOCK_DB;
  }
}

function writeMockDb(data: MockDatabaseSchema) {
  try {
    fs.writeFileSync(MOCK_DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing to mock database file:', err);
  }
}

// Helper to determine if we should fallback to mock mode
// We check if DATABASE_URL environment variable is set to default or invalid, or if Prisma fails a connection
function isUsingMockMode(): boolean {
  const url = process.env.DATABASE_URL || '';
  // Default URL from prisma init, empty URL, or unconfigured MongoDB templates
  if (
    !url || 
    url.includes('localhost:51213') || 
    url.includes('prisma+postgres') || 
    url.includes('xxxx') || 
    url.includes('<cluster-address>')
  ) {
    return true;
  }
  return false;
}

// Lazy loader for Prisma Client (prevents instantiation during next build evaluations)
const globalForPrisma = global as unknown as { prisma: PrismaClient };
let prismaInstance: PrismaClient | null = null;

function getPrisma(): PrismaClient {
  if (isUsingMockMode()) {
    throw new Error('Database is running in mock mode. Prisma Client should not be invoked.');
  }

  if (!prismaInstance) {
    prismaInstance = globalForPrisma.prisma || new PrismaClient({
      log: ['error'],
    });
    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaInstance;
  }
  return prismaInstance;
}

// Global db client abstraction that handles both Prisma and Mock modes transparently
export const db = {
  async testConnection(): Promise<boolean> {
    if (isUsingMockMode()) return false;
    try {
      // Simple query to test connection (compatible with both SQL and MongoDB)
      await getPrisma().user.findFirst();
      return true;
    } catch {
      return false;
    }
  },

  // USERS
  async getUserByPhone(phoneNumber: string) {
    if (isUsingMockMode()) {
      const mock = readMockDb();
      return mock.users.find((u) => u.phoneNumber === phoneNumber) || null;
    }
    try {
      return await getPrisma().user.findUnique({ where: { phoneNumber } });
    } catch (err) {
      console.warn('Prisma error, falling back to mock database', err);
      const mock = readMockDb();
      return mock.users.find((u) => u.phoneNumber === phoneNumber) || null;
    }
  },

  async createUser(phoneNumber: string) {
    if (isUsingMockMode()) {
      const mock = readMockDb();
      const existing = mock.users.find((u) => u.phoneNumber === phoneNumber);
      if (existing) return existing;

      const newUser = {
        id: Math.random().toString(36).substring(2, 11),
        phoneNumber,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mock.users.push(newUser);
      writeMockDb(mock);
      return newUser;
    }
    try {
      return await getPrisma().user.create({ data: { phoneNumber } });
    } catch (err) {
      console.warn('Prisma error, falling back to mock database', err);
      const mock = readMockDb();
      const newUser = {
        id: Math.random().toString(36).substring(2, 11),
        phoneNumber,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mock.users.push(newUser);
      writeMockDb(mock);
      return newUser;
    }
  },

  // WEBSITES
  async getWebsiteBySubdomain(subdomain: string) {
    if (isUsingMockMode()) {
      const mock = readMockDb();
      return mock.websites.find((w) => w.subdomain === subdomain) || null;
    }
    try {
      return await getPrisma().website.findUnique({ where: { subdomain } });
    } catch (err) {
      console.warn('Prisma error, falling back to mock database', err);
      const mock = readMockDb();
      return mock.websites.find((w) => w.subdomain === subdomain) || null;
    }
  },

  async getWebsitesByUserId(userId: string) {
    if (isUsingMockMode()) {
      const mock = readMockDb();
      return mock.websites.filter((w) => w.userId === userId);
    }
    try {
      return await getPrisma().website.findMany({ where: { userId } });
    } catch (err) {
      console.warn('Prisma error, falling back to mock database', err);
      const mock = readMockDb();
      return mock.websites.filter((w) => w.userId === userId);
    }
  },

  async createWebsite(data: {
    subdomain: string;
    businessName: string;
    category: string;
    logoUrl?: string | null;
    galleryUrls: string[];
    contactPhone?: string | null;
    contactEmail?: string | null;
    address?: string | null;
    services: string[];
    about?: string | null;
    theme: string;
    isPublished?: boolean;
    config: any;
    userId: string;
  }) {
    if (isUsingMockMode()) {
      const mock = readMockDb();
      // Remove any existing website with the same subdomain in mock
      mock.websites = mock.websites.filter((w) => w.subdomain !== data.subdomain);
      
      const newWebsite = {
        id: Math.random().toString(36).substring(2, 11),
        ...data,
        isPublished: data.isPublished ?? true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mock.websites.push(newWebsite);
      writeMockDb(mock);
      return newWebsite;
    }
    try {
      return await getPrisma().website.create({
        data: {
          ...data,
          logoUrl: data.logoUrl || null,
          contactPhone: data.contactPhone || null,
          contactEmail: data.contactEmail || null,
          address: data.address || null,
          about: data.about || null,
          isPublished: data.isPublished ?? true,
          galleryUrls: data.galleryUrls,
          services: data.services,
          config: data.config,
        },
      });
    } catch (err) {
      console.warn('Prisma error, falling back to mock database', err);
      const mock = readMockDb();
      mock.websites = mock.websites.filter((w) => w.subdomain !== data.subdomain);
      const newWebsite = {
        id: Math.random().toString(36).substring(2, 11),
        ...data,
        isPublished: data.isPublished ?? true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mock.websites.push(newWebsite);
      writeMockDb(mock);
      return newWebsite;
    }
  },

  async updateWebsite(id: string, data: any) {
    if (isUsingMockMode()) {
      const mock = readMockDb();
      const idx = mock.websites.findIndex((w) => w.id === id);
      if (idx !== -1) {
        mock.websites[idx] = {
          ...mock.websites[idx],
          ...data,
          updatedAt: new Date().toISOString(),
        };
        writeMockDb(mock);
        return mock.websites[idx];
      }
      return null;
    }
    try {
      return await getPrisma().website.update({
        where: { id },
        data: data,
      });
    } catch (err) {
      console.warn('Prisma error, falling back to mock database', err);
      const mock = readMockDb();
      const idx = mock.websites.findIndex((w) => w.id === id);
      if (idx !== -1) {
        mock.websites[idx] = {
          ...mock.websites[idx],
          ...data,
          updatedAt: new Date().toISOString(),
        };
        writeMockDb(mock);
        return mock.websites[idx];
      }
      return null;
    }
  },

  async deleteWebsiteByUserId(userId: string) {
    if (isUsingMockMode()) {
      const mock = readMockDb();
      mock.websites = mock.websites.filter((w) => w.userId !== userId);
      writeMockDb(mock);
      return true;
    }
    try {
      const prisma = getPrisma();
      await prisma.website.deleteMany({ where: { userId } });
      return true;
    } catch (err) {
      console.warn('Prisma error, falling back to mock database', err);
      const mock = readMockDb();
      mock.websites = mock.websites.filter((w) => w.userId !== userId);
      writeMockDb(mock);
      return true;
    }
  },

  // ONBOARDING SESSIONS
  async getOnboardingSession(phoneNumber: string) {
    if (isUsingMockMode()) {
      const mock = readMockDb();
      return mock.onboardingSessions.find((s) => s.phoneNumber === phoneNumber) || null;
    }
    try {
      return await getPrisma().onboardingSession.findUnique({ where: { phoneNumber } });
    } catch (err) {
      console.warn('Prisma error, falling back to mock database', err);
      const mock = readMockDb();
      return mock.onboardingSessions.find((s) => s.phoneNumber === phoneNumber) || null;
    }
  },

  async upsertOnboardingSession(phoneNumber: string, data: any) {
    if (isUsingMockMode()) {
      const mock = readMockDb();
      const idx = mock.onboardingSessions.findIndex((s) => s.phoneNumber === phoneNumber);
      const now = new Date().toISOString();
      if (idx !== -1) {
        mock.onboardingSessions[idx] = {
          ...mock.onboardingSessions[idx],
          ...data,
          updatedAt: now,
        };
      } else {
        mock.onboardingSessions.push({
          id: Math.random().toString(36).substring(2, 11),
          phoneNumber,
          galleryUrls: [],
          services: [],
          ...data,
          createdAt: now,
          updatedAt: now,
        });
      }
      writeMockDb(mock);
      return mock.onboardingSessions.find((s) => s.phoneNumber === phoneNumber);
    }
    try {
      const existing = await getPrisma().onboardingSession.findUnique({ where: { phoneNumber } });
      if (existing) {
        return await getPrisma().onboardingSession.update({
          where: { phoneNumber },
          data,
        });
      } else {
        return await getPrisma().onboardingSession.create({
          data: {
            phoneNumber,
            step: data.step || 'WELCOME',
            ...data,
          },
        });
      }
    } catch (err) {
      console.warn('Prisma error, falling back to mock database', err);
      const mock = readMockDb();
      const idx = mock.onboardingSessions.findIndex((s) => s.phoneNumber === phoneNumber);
      const now = new Date().toISOString();
      if (idx !== -1) {
        mock.onboardingSessions[idx] = {
          ...mock.onboardingSessions[idx],
          ...data,
          updatedAt: now,
        };
      } else {
        mock.onboardingSessions.push({
          id: Math.random().toString(36).substring(2, 11),
          phoneNumber,
          galleryUrls: [],
          services: [],
          ...data,
          createdAt: now,
          updatedAt: now,
        });
      }
      writeMockDb(mock);
      return mock.onboardingSessions.find((s) => s.phoneNumber === phoneNumber);
    }
  },

  async deleteOnboardingSession(phoneNumber: string) {
    if (isUsingMockMode()) {
      const mock = readMockDb();
      mock.onboardingSessions = mock.onboardingSessions.filter((s) => s.phoneNumber !== phoneNumber);
      writeMockDb(mock);
      return true;
    }
    try {
      await getPrisma().onboardingSession.delete({ where: { phoneNumber } });
      return true;
    } catch (err) {
      console.warn('Prisma error, falling back to mock database', err);
      const mock = readMockDb();
      mock.onboardingSessions = mock.onboardingSessions.filter((s) => s.phoneNumber !== phoneNumber);
      writeMockDb(mock);
      return true;
    }
  },

  // SESSIONS (Dashboard Auth)
  async getSession(token: string) {
    if (isUsingMockMode()) {
      const mock = readMockDb();
      const session = mock.sessions.find((s) => s.token === token);
      if (!session) return null;
      if (new Date(session.expiresAt) < new Date()) {
        mock.sessions = mock.sessions.filter((s) => s.token !== token);
        writeMockDb(mock);
        return null;
      }
      const user = mock.users.find((u) => u.id === session.userId);
      return { ...session, user };
    }
    try {
      return await getPrisma().session.findUnique({
        where: { token },
        include: { user: true },
      });
    } catch (err) {
      console.warn('Prisma error, falling back to mock database', err);
      const mock = readMockDb();
      const session = mock.sessions.find((s) => s.token === token);
      if (!session) return null;
      const user = mock.users.find((u) => u.id === session.userId);
      return { ...session, user };
    }
  },

  async createSession(userId: string, token: string, expiresAt: Date) {
    if (isUsingMockMode()) {
      const mock = readMockDb();
      const newSession = {
        id: Math.random().toString(36).substring(2, 11),
        token,
        userId,
        expiresAt: expiresAt.toISOString(),
        createdAt: new Date().toISOString(),
      };
      mock.sessions.push(newSession);
      writeMockDb(mock);
      return newSession;
    }
    try {
      return await getPrisma().session.create({
        data: {
          token,
          userId,
          expiresAt,
        },
      });
    } catch (err) {
      console.warn('Prisma error, falling back to mock database', err);
      const mock = readMockDb();
      const newSession = {
        id: Math.random().toString(36).substring(2, 11),
        token,
        userId,
        expiresAt: expiresAt.toISOString(),
        createdAt: new Date().toISOString(),
      };
      mock.sessions.push(newSession);
      writeMockDb(mock);
      return newSession;
    }
  },

  async deleteSession(token: string) {
    if (isUsingMockMode()) {
      const mock = readMockDb();
      mock.sessions = mock.sessions.filter((s) => s.token !== token);
      writeMockDb(mock);
      return true;
    }
    try {
      await getPrisma().session.delete({ where: { token } });
      return true;
    } catch (err) {
      console.warn('Prisma error, falling back to mock database', err);
      const mock = readMockDb();
      mock.sessions = mock.sessions.filter((s) => s.token !== token);
      writeMockDb(mock);
      return true;
    }
  },
};
