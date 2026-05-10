const birthdayMonth = 4;
const birthdayDay = 9;

export function getNextBirthday(now = new Date()) {
  const thisYearBirthday = new Date(now.getFullYear(), birthdayMonth, birthdayDay);

  if (now >= thisYearBirthday) {
    return new Date(now.getFullYear() + 1, birthdayMonth, birthdayDay);
  }

  return thisYearBirthday;
}
