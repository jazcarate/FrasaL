import dict from "./dictionary.json";

function preserveCase(original, toReplace) {
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

function pure(block) {
  return [{ original: block }];
}

function translate_(block, word) {
  const { original } = block;
  const normalize = original
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const i = normalize.indexOf(word.frasal);
  if (i !== -1) {
    const match = original.substr(i, word.frasal.length);
    return [
      { original: original.substr(0, i) },
      {
        ...word,
        original: match,
        translated: preserveCase(match, word.spanish),
      },
      { original: original.substr(i + word.frasal.length) },
    ];
  }

  return [block];
}

export function translate(block) {
  const ret = dict.reduce((accum, toTranslate) => {
    return accum.flatMap((x) => translate_(x, toTranslate));
  }, pure(block));
  return ret;
}
