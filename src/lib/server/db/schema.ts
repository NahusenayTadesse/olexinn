// src/db/schema.ts
import {
	mysqlTable,
	varchar,
	text,
	int,
	timestamp,
	boolean,
	index,
	uniqueIndex,
	mysqlEnum
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

const timestamps = () => ({
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull()
});

export const contactMessages = mysqlTable('contact_messages', {
	id: int('id').primaryKey().autoincrement(),
	name: varchar('name', { length: 255 }).notNull(),
	email: varchar('email', { length: 100 }).notNull(),
	phone: varchar('phone', { length: 20 }),
	subject: varchar('subject', { length: 255 }).notNull(),
	message: text('message').notNull(),
	address: varchar('address', { length: 255 }),
	seen: int('seen').default(0),
	...timestamps()
});

export const events = mysqlTable(
	'events',
	{
		id: int('id').primaryKey().autoincrement(),

		title: varchar('title', { length: 255 }).notNull(),

		eventDate: varchar('event_date', { length: 100 }).notNull(),

		// Useful if you want to display Thu / Fri / Sat without recalculating
		weekdayLabel: varchar('weekday_label', { length: 50 }),

		// e.g. "DJ Night", "Live performance", "Pre & post match bar"
		format: varchar('format', { length: 255 }),

		// e.g. "Doors 8PM", "Open from 12PM"
		startsLabel: varchar('starts_label', { length: 100 }),

		// Optional machine-readable time, e.g. "20:00"
		startsAt: varchar('starts_at', { length: 20 }),

		// e.g. "Until 4AM", "Until 2AM"
		endsLabel: varchar('ends_label', { length: 100 }),

		// Optional machine-readable time, e.g. "04:00"
		endsAt: varchar('ends_at', { length: 20 }),

		// e.g. "Free before 9PM", "Walk in", "Free entry before 11PM"
		entryNote: varchar('entry_note', { length: 255 }),

		// free | ticketed
		entryType: mysqlEnum('entry_type', ['free', 'ticketed']).notNull(),

		// Store ticket price as pennies. £10 = 1000.
		// Null means free or unknown.
		pricePence: int('price_pence'),

		currency: varchar('currency', { length: 3 }).default('GBP').notNull(),

		ticketUrl: varchar('ticket_url', { length: 500 }),

		// For simple filtering like your current `data-type="free live"`
		isLive: boolean('is_live').default(false).notNull(),
		isPublished: boolean('is_published').default(true).notNull(),

		slug: varchar('slug', { length: 255 }).notNull(),
		description: text('description'),
		imageUrl: varchar('image_url', { length: 500 }),

		...timestamps()
	},
	(table) => [
		uniqueIndex('events_slug_idx').on(table.slug),
		index('events_event_date_idx').on(table.eventDate),
		index('events_entry_type_idx').on(table.entryType),
		index('events_published_date_idx').on(table.isPublished, table.eventDate)
	]
);

export const genres = mysqlTable('genres', {
	id: int('id').primaryKey().autoincrement(),
	name: varchar('name', { length: 255 }).notNull().unique()
});

export const eventGenres = mysqlTable(
	'event_genres',
	{
		eventId: int('event_id')
			.notNull()
			.references(() => events.id, { onDelete: 'cascade' }),

		genreId: int('genre_id')
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

export const venueBooking = mysqlTable('venue_booking', {
	id: int('id').primaryKey().autoincrement(),
	firstName: varchar('first_name', { length: 255 }).notNull(),
	lastName: varchar('last_name', { length: 255 }).notNull(),
	eventType: varchar('event_type', { length: 255 }).notNull(),
	email: varchar('email', { length: 100 }).notNull(),
	eventDate: varchar('event_date', { length: 100 }).notNull(),
	phone: varchar('phone', { length: 20 }),
	guestCount: int('guest_count'),
	description: text('description'),
	status: varchar('status', { length: 50 }).default('pending'),
	...timestamps()
});

export const images = mysqlTable('images', {
	mainImage: varchar('main_image', { length: 500 }),
	imgURL: varchar('img_url', { length: 500 })
});

export const venues = mysqlTable('venues', {
	id: int('id').primaryKey().autoincrement(),
	name: varchar('name', { length: 255 }).notNull(),
	description: text('description'),
	capacity: int('capacity'),
	format: varchar('format', { length: 255 }),
	imgUrl: varchar('img_url', { length: 500 }),
	hours: varchar('hours', { length: 255 }),
	address: varchar('address', { length: 500 }),
	live: boolean('live').default(false),
	...timestamps()
});

export const brochure = mysqlTable('brochures', {
	brochure: varchar('brochure', { length: 500 })
});

export const heroImages = mysqlTable('hero_images', {
	imgUrl: varchar('img_url', { length: 500 })
});
