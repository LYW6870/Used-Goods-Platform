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
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [myId, setMyId] = useState<number | null>(null);
  const [userPermission, setUserPermission] = useState<number>(0);

  // 회원일경우, 비회원일경우, 내가 작성한 글일 경우 3가지

  const { data, error } = useQuery<
    Pick<IQuery, 'fetchBoard'>,
    IQueryFetchBoardArgs
  >(FETCH_BOARD, {
    variables: { boardId: Number(router.query.boardId) },
    onError() {
      Modal.error({ content: error.message });
      router.push('/boards');
    },
  });

  const [deleteBoard] = useMutation<
    Pick<IMutation, 'deleteBoard'>,
    IMutationDeleteBoardArgs
  >(DELETE_BOARD);

  const [updateIsComplete] = useMutation<
    Pick<IMutation, 'updateIsComplete'>,
    IMutationUpdateIsCompleteArgs
  >(UPDATE_IS_COMPLETE);

  // useEffect로 localStorage에서 accessToken과 userData 가져오기
  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedUserData = localStorage.getItem('userData');

    // 엑세스 토큰 설정
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }

    // 유저 데이터가 있으면 myId 설정
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setMyId(userData.id);
    }
  }, []);

  // 2. 권한 체크 함수
  useEffect(() => {
    if (!accessToken || !myId) {
      console.log('권한: 비로그인');
      setUserPermission(0); // 비로그인 상태
    } else if (data && myId) {
      const boardOwnerId = Number(data?.fetchBoard.userId);
      if (boardOwnerId === myId) {
        console.log('권한: 작성자');
        setUserPermission(2); // 게시글 작성자
      } else {
        console.log('권한: 로그인');
        setUserPermission(1); // 로그인 상태지만 게시글 작성자가 아닌 경우
      }
    }
  }, [accessToken, myId, data]);

  const BoardDelete = async () => {
    try {
      await deleteBoard({
        variables: { boardId: Number(router.query.boardId), userId: myId },
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
          userId: myId,
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
      userPermission={userPermission}
      onClickDelete={onClickDelete}
      onClickUpdate={onClickUpdate}
      onClickCompleteBoard={onClickCompleteBoard}
    />
  );
}
