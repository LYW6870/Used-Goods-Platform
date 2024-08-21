export function getDate(inputTimestamp: any) {
  let timestamp = inputTimestamp;
  // 만약 timestamp가 문자열이라면 숫자로 변환 시도
  if (typeof timestamp === 'string') {
    timestamp = parseInt(timestamp, 10);
  }

  const date = new Date(timestamp);

  // 날짜 유효성 검사
  if (Number.isNaN(date.getTime())) {
    return 'Invalid date';
  }

  const year = date.getFullYear(); // 년도
  const month = String(date.getMonth() + 1).padStart(2, '0'); // "달"만 0부터 시작 "년"이나 "일"은 1부터 시작
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const formattedDate = `${year}.${month}.${day} ${hours}:${minutes}`;
  return formattedDate;
}

export const getDate2 = (date: any) => {
  // 구버전 아마 앞으로 안쓸듯
  const dddd = new Date(date);
  const yyyy = dddd.getFullYear();
  const mm = String(dddd.getMonth() + 1).padStart(2, '0'); // "달"만 0부터 시작 "년"이나 "일"은 1부터 시작
  const dd = String(dddd.getDate()).padStart(2, '0');
  const hours = String(dddd.getHours()).padStart(2, '0');
  const minutes = String(dddd.getMinutes()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd} ${hours}:${minutes}`;
};
