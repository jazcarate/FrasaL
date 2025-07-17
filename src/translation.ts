import { dict, type DictionaryWord } from "./dictionary";

export interface TranslationChunk {
    original: string; // The original text chunk
    english?: string; // The English meaning (only on translated chunks)
    translated?: string; // The Spanish translation (only on translated chunks)
}

function preserveCase(original: string, toReplace: string): string {
    if (original == original.toUpperCase()) {
        // Shout
        return toReplace.toUpperCase();
    } else if (original.charAt(0) == original.charAt(0).toUpperCase()) {
        // Title
        return toReplace.toUpperCase()[0] + toReplace.slice(1);
    } else {
        return toReplace;
    }
}

export function translate(text: string): TranslationChunk[] {
    const normalized = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const matches: Array<{ start: number, end: number, word: DictionaryWord }> = [];

    for (const word of dict) {
        let searchPos = 0;
        while (true) {
            const index = normalized.indexOf(word.frasal, searchPos);
            if (index === -1) break;

            const overlaps = matches.some(m =>
                (index < m.end && index + word.frasal.length > m.start)
            );

            if (!overlaps) {
                matches.push({
                    start: index,
                    end: index + word.frasal.length,
                    word
                });
            }

            searchPos = index + 1;
        }
    }

    if (matches.length === 0) {
        console.log("No matches found for ", text);
        return [{ original: text }];
    }

    matches.sort((a, b) => a.start - b.start);

    const result: TranslationChunk[] = [];
    let pos = 0;

    for (const match of matches) {
        if (pos < match.start) {
            result.push({ original: text.slice(pos, match.start) });
        }

        const matchText = text.slice(match.start, match.end);
        result.push({
            original: matchText,
            english: match.word.english,
            translated: preserveCase(matchText, match.word.spanish)
        });

        pos = match.end;
    }

    if (pos < text.length) {
        result.push({ original: text.slice(pos) });
    }

    return result.filter(chunk => chunk.original.length > 0);
} 