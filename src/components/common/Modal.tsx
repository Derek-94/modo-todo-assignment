import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import Button from './Button';
import { createPortal } from 'react-dom';

interface ModalProps {
  Small?: boolean;
  toggle: () => void;
  callback?: () => void;
  title?: string;
  alert?: boolean;
  cancelBtn?: boolean;
}

const ModalPortal = (modal: React.ReactElement): React.ReactPortal => {
  return createPortal(modal, document.getElementById('modal') as Element);
};

const Modal: React.FC<ModalProps> = ({ children, ...props }) => {
  const { Small, toggle, callback, title, alert, cancelBtn = true } = props;

  const escapeEvent = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      toggle();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', escapeEvent);
    return () => {
      window.removeEventListener('keydown', escapeEvent);
    };
  }, []);

  const onConfirm = () => {
    if (callback) {
      callback();
    }
    toggle();
  };

  return ModalPortal(
    <ModalWrap>
      <Container Small={alert || Small}>
        {title && <Title>{title}</Title>}
        <Content>{children}</Content>
        <ButtonContainer>
          {cancelBtn && (
            <Button onClick={toggle} Small={alert || Small}>
              취소
            </Button>
          )}
          <Button onClick={onConfirm} Small={alert || Small}>
            확인
          </Button>
        </ButtonContainer>
      </Container>
      <OutLayer onClick={toggle}></OutLayer>
    </ModalWrap>
  );
};

const setSize = (props: Partial<ModalProps>) => {
  if (props.Small) {
    return css`
      min-width: 300px;
      max-width: 400px;
    `;
  }
  return css`
    min-width: 400px;
    max-width: 500px;
  `;
};
const ModalWrap = styled.div<Partial<ModalProps>>`
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const Container = styled.div<Partial<ModalProps>>`
  position: relative;
  box-shadow: 5px 5px 30px rgba(200, 200, 200, 0.2);
  background-color: ${({ theme }) => theme.color.whiteBackground};
  border-radius: ${({ theme }) => theme.layout.radius};
  z-index: 10;
  ${props => setSize(props)};
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.layout.padding};
`;

const Title = styled.h1`
  padding: ${({ theme }) => theme.layout.padding};
  border-bottom: 1px solid ${({ theme }) => theme.color.borderline};
`;

const ButtonContainer = styled.div`
  float: right;
  margin: 0 20px 20px 0;
`;

const OutLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

export default Modal;
