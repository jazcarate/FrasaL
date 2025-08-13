interface DictionaryWord {
    frasal: string;
    english: string;
    spanish: string;
}

/* PROMPT
You are an expert in Spanish and English.
You find it fun to use english phrasal verbs in spanish by literally translating them.
For example, "godspeed" is a phrasal verb that means "good luck"; but the literal translation is "speed of god".
This is fun because it's a play on words.

List here those phrasal verbs that are the most fun to translate.
Don't include phrasal verbs that are not fun in the literal spanish translation.
Don't include phrasal verbs that have a direct translation.
Don't include phrasal verbs that have a directions like "up" or "down", or "in" or "out".
Don't use special characters in the phrasal verbs.
Use the following format:
{
    frasal: "velocidad de dios", // The phrasal verb to match
    english: "godspeed", // The English translation/meaning
    spanish: "buena suerte" // The proper Spanish translation
}
*/

export const dict: DictionaryWord[] = [
    {
        frasal: "velocidad de dios",
        english: "godspeed",
        spanish: "buena suerte"
    },
    {
        "frasal": "romper par",
        "english": "break even",
        "spanish": "salir sin ganancias o pérdidas"
    },
    {
        "frasal": "caer corto",
        "english": "fall short",
        "spanish": "no alcanzar"
    },
    {
        "frasal": "saltar el arma",
        "english": "jump the gun",
        "spanish": "adelantarse antes de tiempo"
    },
    {
        "frasal": "patear el balde",
        "english": "kick the bucket",
        "spanish": "morir"
    },
    {
        "frasal": "atar el nudo",
        "english": "tie the knot",
        "spanish": "casarse"
    },
    {
        "frasal": "morder el polvo",
        "english": "bite the dust",
        "spanish": "morir"
    },
    {
        "frasal": "ir pavo frio",
        "english": "go cold turkey",
        "spanish": "dejar de golpe"
    },
    {
        "frasal": "derecha",
        "english": "right",
        "spanish": "justo"
    },
    {
        "frasal": "izquierda",
        "english": "left",
        "spanish": "dejar"
    }
];

export type { DictionaryWord }; 