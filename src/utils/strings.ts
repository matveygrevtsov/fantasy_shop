export const getWordsLowerCase = (text: string): string[] => {
  return text
    .toLowerCase()
    .split(" ")
    .filter((word) => word);
};

export const areTextsOverlap = (text1: string, text2: string): boolean => {
  console.log("dick");
  const wordsInText1 = getWordsLowerCase(text1);
  const wordsInText2 = getWordsLowerCase(text2);
  for (const wordInText1 of wordsInText1) {
    for (const wordInText2 of wordsInText2) {
      if (
        wordInText1.includes(wordInText2) ||
        wordInText2.includes(wordInText1)
      ) {
        console.log(wordInText1, wordInText2);
        return true;
      }
    }
  }
  return false;
};
