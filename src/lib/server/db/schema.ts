import { mysqlTable, int, varchar, datetime } from 'drizzle-orm/mysql-core';

// User table
export const user = mysqlTable('user', {
  id: varchar('id', { length: 255 }).primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
});

// Session table
export const session = mysqlTable('session', {
  id: varchar('id', { length: 255 }).primaryKey(),
  userId: varchar('user_id', { length: 255 })
    .notNull()
    .references(() => user.id),
  expiresAt: datetime('expires_at').notNull(),
});

// Help table
export const help = mysqlTable('help', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull().unique(),
  description: varchar('description', { length: 1024 }).notNull(),
  image: varchar('image', { length: 512 }),
  video: varchar('video', { length: 512 }),
});

// Admin Help table
export const adminHelp = mysqlTable('admin_help', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull().unique(),
  description: varchar('description', { length: 1024 }).notNull(),
  image: varchar('image', { length: 512 }),
  video: varchar('video', { length: 512 }),
});

// Vendor Help table
export const vendorHelp = mysqlTable('vendor_help', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull().unique(),
  description: varchar('description', { length: 1024 }).notNull(),
  image: varchar('image', { length: 512 }),
  video: varchar('video', { length: 512 }),
});

// Pro Emails table
export const proEmails = mysqlTable('pro_emails', {
  id: int('id').primaryKey().autoincrement(),
  email: varchar('email', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 255 }).notNull(),
  content: varchar('content', { length: 2048 }).notNull(),
  sentAt: datetime('sent_at').notNull(),
  sentBy: varchar('sent_by', { length: 255 }).notNull(),
});

// Types
export type AdminHelp = typeof adminHelp.$inferSelect;
export type ProEmails = typeof proEmails.$inferSelect;
export type Help = typeof help.$inferSelect;
export type VendorHelp = typeof vendorHelp.$inferSelect;
export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
