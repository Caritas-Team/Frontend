export const calculateAge = (dateString: string) => {
  const today = new Date();
  const date = new Date(dateString);
  const age = today.getFullYear() - date.getFullYear();
  let yearsText = 'лет';
  let count = age % 100;
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
  const personAge: string = String(age) + ' ' + yearsText;
  return personAge;
};

export const formatDateShort = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
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
