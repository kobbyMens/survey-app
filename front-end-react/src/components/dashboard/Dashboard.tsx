import { FC } from "react";
import styled from "styled-components";

// ======================Styled Components===========>
const StyledDashboard = styled.article`
  display: flex;
  section {
    width: 100%;
    div {
      display: flex;
      padding: calc(20 * 8px) calc(0 * 8px);
      justify-content: center;
    }
  }
`;

const Dashboard: FC = () => {
  return (
    <StyledDashboard>
      <section>
        <div>
          <h1>In Progress.....</h1>
        </div>
      </section>
    </StyledDashboard>
  );
};

export default Dashboard;
