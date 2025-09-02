import { sqliteTable, integer, text,  } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	email: text('email').notNull().unique(),
	name: text('name').notNull(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const help = sqliteTable('help', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	title: text('title').notNull().unique(),
	description: text('description').notNull(),
	image: text('image'),
	video: text('video')
});

export const adminHelp = sqliteTable('admin_help', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	title: text('title').notNull().unique(),
	description: text('description').notNull(),
	image: text('image'),
	video: text('video')
});


export const vendorHelp = sqliteTable('vendor_help', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	title: text('title').notNull().unique(),
	description: text('description').notNull(),
	image: text('image'),
	video: text('video')
});



export const proEmails = sqliteTable('pro_emails', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	email: text('email').notNull(),
	subject: text('subject').notNull(),
	content: text('content').notNull(),
    sentAt: integer('sent_at', { mode: 'timestamp' }).notNull(),
	sentBy: text('sent_by').notNull()
});

export type AdminHelp = typeof adminHelp.$inferSelect;
export type ProEmails = typeof proEmails.$inferSelect;
export type Help = typeof help.$inferSelect;
export type VendorHelp = typeof vendorHelp.$inferSelect;
export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
