// ===================================================================

import styled from "styled-components";

const WorkSpaceContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  text-align: center;
  div {
    padding-top: 10rem;
  }
  h1 {
    font-weight: 700;
    margin-bottom: 2rem;
  }
  h2 {
    margin-bottom: 5rem;
  }
`;

const MyWorkspace: React.FC = () => {
  return (
    <WorkSpaceContainer>
      <div>
        <h2> Work in progess........... </h2>
      </div>
    </WorkSpaceContainer>
  );
};

export default MyWorkspace;
