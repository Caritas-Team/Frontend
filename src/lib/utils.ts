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
