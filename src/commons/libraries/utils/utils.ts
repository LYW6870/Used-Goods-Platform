export const getDate = (date: any) => {
  const dddd = new Date(date);
  const yyyy = dddd.getFullYear();
  const mm = dddd.getMonth() + 1; // "달"만 0부터 시작 "년"이나 "일"은 1부터 시작
  const dd = dddd.getDate();
  return `${yyyy}.${mm}.${dd}`;
};

// 소스코드 수정해야 함 ! 시간은 DB에서 자체 저장할것이고
// DB에서 받은 시간을 1. BoardDetail 에서는 년.월.일 시:분 리턴하고
// 2. BoardList에서는 년.월.일 로 리턴한다.
