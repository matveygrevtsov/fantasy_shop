/**
 * Разделяет текст на массив слов, переведённых в нижний регистр.
 * @param text - текст, который нужно разбить на слова.
 */
export const getWordsLowerCase = (text: string): string[] => {
  return text
    .toLowerCase()
    .split(" ")
    .filter((word) => word);
};

/**
 * Возвращает true, если строки пересекаются (т.е. если одна из строк является подстрокой второй строки).
 * @param string1 - первая строка.
 * @param string2 - вторая строка.
 */
export const areStringsOverlap = (
  string1: string,
  string2: string
): boolean => {
  return string1.includes(string2) || string2.includes(string1);
};

/**
 * Возвращает true, если хотя бы одно слово из первого текста пересекается с хотя бы одним словом из второго текста и false в противном случае.
 * @param text1 - первый текст.
 * @param text2 - второй текст.
 */
export const areTextsOverlap = (text1: string, text2: string): boolean => {
  const wordsInText1 = getWordsLowerCase(text1);
  const wordsInText2 = getWordsLowerCase(text2);
  for (const wordInText1 of wordsInText1) {
    for (const wordInText2 of wordsInText2) {
      if (areStringsOverlap(wordInText1, wordInText2)) {
        return true;
      }
    }
  }
  return false;
};
