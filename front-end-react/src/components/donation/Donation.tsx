import { FC } from "react";
import styled from "styled-components";

// ===================Styled Components================>
const StyledDonationContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: calc(20 * 8px) calc(0 * 8px);
`;

// =====================================================>
const Donation: FC = () => {
  return (
    <StyledDonationContainer>
      <h1>Donation Page.....</h1>
    </StyledDonationContainer>
  );
};

export default Donation;
