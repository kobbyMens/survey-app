import { type FC } from "react";

//components
import styled from "styled-components";
import Page from "./Page";
// =============================================================

const StyledPagesContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
`;

// =============================================================

interface PagesProps {
  pages: any[];
  handleDrop: (item: any, monitor: any) => void;
}

// =============================================================
const Pages: FC<PagesProps> = ({ pages, handleDrop }) => {
  return (
    <StyledPagesContainer>
      {pages.length ? (
        <StyledPagesContainer>
          {pages.map((page, index) => {
            const pagePath = `${index}`;
            return (
              <Page
                handleDrop={handleDrop}
                key={page.id}
                path={pagePath}
                page={page}
              />
            );
          })}
        </StyledPagesContainer>
      ) : (
        <h3>
          Survey creator is empty. Drag an element from the sidebar and drop
          here
        </h3>
      )}
    </StyledPagesContainer>
  );
};

export default Pages;
