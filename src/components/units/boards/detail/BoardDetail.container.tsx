import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import { Modal } from 'antd';
import { useEffect } from 'react';
import {
  IMutation,
  IMutationDeleteBoardArgs,
  IQuery,
  IQueryFetchBoardArgs,
} from '../../../../commons/types/generated/types';
import BoardDetailUI from './BoardDetail.presenter';
import { DELETE_BOARD, FETCH_BOARD } from './BoardDetail.queries.';

export default function BoardDetail() {
  const router = useRouter();

  const { data, error } = useQuery<
    Pick<IQuery, 'fetchBoard'>,
    IQueryFetchBoardArgs
  >(FETCH_BOARD, {
    variables: { boardId: Number(router.query.boardId) },
  });

  const [deleteBoard] = useMutation<
    Pick<IMutation, 'deleteBoard'>,
    IMutationDeleteBoardArgs
  >(DELETE_BOARD);

  useEffect(() => {
    if (error) {
      Modal.error({ content: error.message });
      // router.push('/');
    }
  }, [error]);

  // 삭제 잘 됨. userId를 받은걸로 대체해주기
  // 물어보고 ok 누르면 삭제하게끔
  const onClickDelete = async () => {
    try {
      await deleteBoard({
        variables: { boardId: Number(router.query.boardId), userId: 6 },
      });
      // 보드 리스트 혹은 이전페이지로 이동
      Modal.success({ content: '게시글 삭제가 성공적으로 완료되었습니다.' });
    } catch (err) {
      Modal.error({ content: err.message });
    }
  };

  const onClickUpdate = () => {
    router.push(`/boards/${router.query.boardId}/edit`);
  };

  // 3. 현재 사용자의 userid가 있고, 해당 유저 아이디가 게시글의 유저아이디와 같으면
  // 수정 삭제 완료 버튼 활성화. 아닐경우 채팅하기 버튼만 활성화
  return (
    <BoardDetailUI
      data={data}
      onClickDelete={onClickDelete}
      onClickUpdate={onClickUpdate}
    />
  );
}
