/**
 * A lightweight helper to pluralize common English words.
 * Handles standard plurals (-s, -es) and words ending in -y (-ies).
 */
export function pluralize(word: string): string {
	if (!word) return '';

	// Simple dictionary for common non-standard irregulars if needed
	const irregulars: Record<string, string> = {
		person: 'people',
		child: 'children',
		ox: 'oxen'
	};

	const lowerWord = word.toLowerCase();
	if (irregulars[lowerWord]) {
		// Preserve capitalization if the original was Uppercase
		const isTitleCase = word[0] === word[0].toUpperCase();
		const plural = irregulars[lowerWord];
		return isTitleCase ? plural[0].toUpperCase() + plural.slice(1) : plural;
	}

	// Ends in a sibilant sound (s, sh, ch, x, z) -> add 'es' (e.g., status -> statuses, box -> boxes)
	if (/[sxz]$|(?:sh|ch)$/i.test(word)) {
		return `${word}es`;
	}

	// Ends in 'y' preceded by a consonant -> change to 'ies' (e.g., category -> categories)
	if (/[bcdfghjklmnpqrstvwxyz]y$/i.test(word)) {
		return `${word.slice(0, -1)}ies`;
	}

	// Default case: just add 's'
	return `${word}s`;
}
