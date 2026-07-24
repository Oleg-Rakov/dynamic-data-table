import styled from 'styled-components';

const Banner = styled.div`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: #323232;
  color: #fff;
  padding: 10px 18px;
  border-radius: 6px;
  font-family: sans-serif;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

export function Toast({ message }: { message: string }) {
  if (!message) return null;
  return (
    <Banner role="status" aria-live="polite">
      {message}
    </Banner>
  );
}
