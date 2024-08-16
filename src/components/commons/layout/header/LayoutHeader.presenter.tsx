import { useEffect, useState } from 'react';
import * as S from './LayoutHeader.styles';
import { ILayoutHeaderUIProps } from './LayoutHeader.types';

export default function LayoutHeaderUI({
  isUserSignedIn,
  onClickLogout,
  onClickLogin,
  onClickUserInfo,
}: ILayoutHeaderUIProps): JSX.Element {
  return (
    <>
      <S.Wrapper>
        <S.Body>
          <S.Introduction>
            나눔장터 - 배려하고 존중하는 중고거래 플랫폼
          </S.Introduction>
          {isUserSignedIn ? (
            <S.InfoContainer>
              <S.ItemContainer>
                <S.Label>UserName님 방문을 환영합니다</S.Label>
              </S.ItemContainer>
              <S.ItemContainer>
                <S.Label onClick={onClickUserInfo}>내 정보 확인</S.Label>
              </S.ItemContainer>
              <S.ItemContainer>
                <S.Button onClick={onClickLogout}>로그아웃</S.Button>
              </S.ItemContainer>
            </S.InfoContainer>
          ) : (
            <S.InfoContainer>
              <S.ItemContainer>
                <S.Button onClick={onClickLogin}>로그인</S.Button>
              </S.ItemContainer>
            </S.InfoContainer>
          )}
        </S.Body>
      </S.Wrapper>
    </>
  );
}
