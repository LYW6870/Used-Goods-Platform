import BoardWrite from '../../../src/components/units/boards/write/BoardWrite.container';

export default function BoardsNewPage() {
  const data = {
    fetchBoard: {
      _id: 13,
      isComplete: false,
      writer: 'imsywriter',
      saleType: '구매',
      title: '임시타이틀',
      contents: '임시컨텐츠',
      category: '기타',
      price: 1289,
      location: '임시주소',
      createdAt: 'test',
      deletedAt: 'test',
      updatedAt: 'test',
    },
  };
  return <BoardWrite isEdit data={data} />;
}
