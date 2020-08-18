export function translate(block) {
  return block
    .split(" ")
    .map((x) => x + " ")
    .map((txt) => {
      if (txt === "is ") {
        return { original: txt, translated: "foo" };
      } else {
        return { original: txt };
      }
    });
}
