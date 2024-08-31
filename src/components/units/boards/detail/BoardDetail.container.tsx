import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import {
  IMutation,
  IMutationDeleteBoardArgs,
  IMutationUpdateIsCompleteArgs,
  IQuery,
  IQueryFetchBoardArgs,
} from '../../../../commons/types/generated/types';
import BoardDetailUI from './BoardDetail.presenter';
import {
  DELETE_BOARD,
  FETCH_BOARD,
  UPDATE_IS_COMPLETE,
} from './BoardDetail.queries';

export default function BoardDetail() {
  const router = useRouter();

  // 회원일경우, 비회원일경우, 내가 작성한 글일 경우 3가지

  // 임시 유저아이디
  const userId = 2;
  const [isUserPermission, setIsUserPermission] = useState(false);

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

  const [updateIsComplete] = useMutation<
    Pick<IMutation, 'updateIsComplete'>,
    IMutationUpdateIsCompleteArgs
  >(UPDATE_IS_COMPLETE);

  useEffect(() => {
    if (error) {
      Modal.error({ content: error.message });
      router.push('/boards');
    }
  }, [error]);

  const checkUserPermission = () => {
    if (userId === Number(data?.fetchBoard.userId)) {
      setIsUserPermission(true);
    }
  };

  useEffect(() => {
    checkUserPermission();
  }, [data]);

  const BoardDelete = async () => {
    try {
      await deleteBoard({
        variables: { boardId: Number(router.query.boardId), userId },
      });
      Modal.success({ content: '성공적으로 게시글 삭제가 완료되었습니다.' });
      router.push('/boards');
    } catch (err) {
      Modal.error({ content: err.message });
    }
  };

  const onClickDelete = () => {
    Modal.confirm({
      title: '게시글 삭제 확인',
      content: '정말로 게시글을 삭제하시겠습니까?',
      okButtonProps: { style: { float: 'right', marginRight: '10px' } },
      cancelButtonProps: { style: { float: 'right' } },
      onOk() {
        BoardDelete();
      },
      onCancel() {},
      onClose() {},
    });
  };

  const onClickUpdate = () => {
    router.push(`/boards/${router.query.boardId}/edit`);
  };

  const onClickCompleteBoard = async () => {
    try {
      await updateIsComplete({
        variables: {
          boardId: Number(router.query.boardId),
          userId,
        },
      });
      Modal.success({ content: '성공적으로 거래 완료 처리 되었습니다.' });
    } catch (err) {
      Modal.error({ content: err.message });
    }
  };

  return (
    <BoardDetailUI
      data={data}
      isUserPermission={isUserPermission}
      onClickDelete={onClickDelete}
      onClickUpdate={onClickUpdate}
      onClickCompleteBoard={onClickCompleteBoard}
    />
  );
}
