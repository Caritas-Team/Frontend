export const calculateAge = (dateString: string) => {
  if (!isValidDate(dateString)) return '';
  const today = new Date();
  const date = new Date(dateString);
  if (today <= date) return 'дата рождения превышает текущую';
  let ageYears = today.getFullYear() - date.getFullYear();
  let ageMonths = today.getMonth() - date.getMonth();
  const ageDays = today.getDate() - date.getDate();
  if (ageDays < 0) ageMonths -= 1;
  if (ageMonths < 0) ageYears -= 1;
  let yearsText = 'лет';
  let count = ageYears % 100;
  if (count >= 5 && count <= 20) {
    yearsText = 'лет';
  } else {
    count = count % 10;
    if (count === 1) {
      yearsText = 'год';
    } else if (count >= 2 && count <= 4) {
      yearsText = 'года';
    }
  }
  const personAge: string = String(ageYears) + ' ' + yearsText;
  return personAge;
};

export const formatDateShort = (dateString: string): string => {
  if (!isValidDate(dateString)) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}.${month}.${year}`;
};

export const isValidDate = (value: string) => {
  const dateFormat = /^(\d{4})-(\d{2})-(\d{2})$/;
  const isDateFormat: boolean = dateFormat.test(value);
  if (!isDateFormat) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

export const makeShortName = (
  name: string,
  maxWordLength: number,
  requiredWordLength: number
): string => {
  const array = name.split(' ');
  const newArray = array.map(word => {
    if (word.length > maxWordLength) {
      const shortWord = word.slice(0, requiredWordLength).concat('.');
      return shortWord;
    } else {
      return word;
    }
  });
  return newArray.join(' ');
};
