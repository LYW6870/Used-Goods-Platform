export const getDate = (date: any) => {
  const dddd = new Date(date);
  const yyyy = dddd.getFullYear();
  const mm = String(dddd.getMonth() + 1).padStart(2, '0'); // "달"만 0부터 시작 "년"이나 "일"은 1부터 시작
  const dd = String(dddd.getDate()).padStart(2, '0');
  const hours = String(dddd.getHours()).padStart(2, '0');
  const minutes = String(dddd.getMinutes()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd} ${hours}:${minutes}`;
};
