// src/db/schema.ts
import { sqliteTable, text, integer, index, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
const timestamps = () => ({
	createdAt: integer('created_at', { mode: 'timestamp' })
		.$defaultFn(() => new Date())
		.notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.$defaultFn(() => new Date())
		.$onUpdateFn(() => new Date())
		.notNull()
});

export const contactMessages = sqliteTable('contact_messages', {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text({ length: 255 }).notNull(),
	email: text({ length: 100 }).notNull(),
	phone: text({ length: 20 }),
	subject: text({ length: 255 }).notNull(),
	message: text().notNull(),
	address: text({ length: 255 }),
	seen: integer().default(0),
	...timestamps()
});
export const events = sqliteTable(
	'events',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),

		title: text('title').notNull(),

		eventDate: text('event_date').notNull(),

		// Useful if you want to display Thu / Fri / Sat without recalculating
		weekdayLabel: text('weekday_label'),

		// e.g. "DJ Night", "Live performance", "Pre & post match bar"
		format: text('format'),

		// e.g. "Doors 8PM", "Open from 12PM"
		startsLabel: text('starts_label'),

		// Optional machine-readable time, e.g. "20:00"
		startsAt: text('starts_at'),

		// e.g. "Until 4AM", "Until 2AM"
		endsLabel: text('ends_label'),

		// Optional machine-readable time, e.g. "04:00"
		endsAt: text('ends_at'),

		// e.g. "Free before 9PM", "Walk in", "Free entry before 11PM"
		entryNote: text('entry_note'),

		// free | ticketed
		entryType: text('entry_type', {
			enum: ['free', 'ticketed']
		}).notNull(),

		// Store ticket price as pennies. £10 = 1000.
		// Null means free or unknown.
		pricePence: integer('price_pence'),

		currency: text('currency').default('GBP').notNull(),

		ticketUrl: text('ticket_url'),

		// For simple filtering like your current `data-type="free live"`
		isLive: integer('is_live', { mode: 'boolean' }).default(false).notNull(),
		isPublished: integer('is_published', { mode: 'boolean' }).default(true).notNull(),

		slug: text('slug').notNull(),
		description: text('description'),
		imageUrl: text('image_url'),

		...timestamps()
	},
	(table) => [
		uniqueIndex('events_slug_idx').on(table.slug),
		index('events_event_date_idx').on(table.eventDate),
		index('events_entry_type_idx').on(table.entryType),
		index('events_published_date_idx').on(table.isPublished, table.eventDate)
	]
);

export const genres = sqliteTable('genres', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull().unique()
});

export const eventGenres = sqliteTable(
	'event_genres',
	{
		eventId: integer('event_id')
			.notNull()
			.references(() => events.id, { onDelete: 'cascade' }),

		genreId: integer('genre_id')
			.notNull()
			.references(() => genres.id, { onDelete: 'cascade' })
	},
	(table) => [
		uniqueIndex('event_genres_event_id_genre_id_idx').on(table.eventId, table.genreId),
		index('event_genres_event_id_idx').on(table.eventId),
		index('event_genres_genre_id_idx').on(table.genreId)
	]
);

export const eventsRelations = relations(events, ({ many }) => ({
	eventGenres: many(eventGenres)
}));

export const genresRelations = relations(genres, ({ many }) => ({
	eventGenres: many(eventGenres)
}));

export const eventGenresRelations = relations(eventGenres, ({ one }) => ({
	event: one(events, {
		fields: [eventGenres.eventId],
		references: [events.id]
	}),
	genre: one(genres, {
		fields: [eventGenres.genreId],
		references: [genres.id]
	})
}));

export * from './auth.schema';

export const venueBooking = sqliteTable('venue_booking', {
	id: integer().primaryKey({ autoIncrement: true }),
	firstName: text({ length: 255 }).notNull(),
	lastName: text({ length: 255 }).notNull(),
	eventType: text({ length: 255 }).notNull(),
	email: text({ length: 100 }).notNull(),
	eventDate: text({ length: 100 }).notNull(),
	phone: text({ length: 20 }),
	guestCount: integer('guest_count'),
	description: text(),
	status: text({ length: 50 }).default('pending'),
	...timestamps()
});

export const images = sqliteTable('images', {
	mainImage: text(),
	imgURL: text()
});

export const venues = sqliteTable('venues', {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text({ length: 255 }).notNull(),
	description: text(),
	capacity: integer(),
	format: text(),
	imgUrl: text(),
	hours: text(),
	address: text(),
	live: integer({ mode: 'boolean' }).default(false),
	...timestamps()
});
