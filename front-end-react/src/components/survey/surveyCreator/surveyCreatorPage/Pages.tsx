import { type FC } from "react";
import styled from "styled-components";

import { type PageType } from "./Page";
//components
import EmptyPage from "./EmptyPage";
import EmptySurvey from "./EmptySurvey";
import Page from "./Page";

// =================Styled Components===============================>
const StyledPagesContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
`;

// =================Type Declarations===============================>

interface PagesProps {
  pages: PageType[];
  handleDrop: (item: any, monitor: any) => void;
}

// =============================================================
const Pages: FC<PagesProps> = ({ pages, handleDrop }) => {
  return (
    <StyledPagesContainer>
      {pages.length ? (
        <StyledPagesContainer>
          {pages.map((page, index) => {
            const pagePath = `${index + 1}`;

            if (page.questions.length < 1) {
              if (pages.length === index + 1) {
                return <EmptyPage key={page.id} page={page} path={pagePath} />; //empty and last page
              } else {
                // return editable empty page if page is not the last page.
                return (
                  <EmptyPage
                    key={page.id}
                    page={page}
                    path={pagePath}
                    editable
                  />
                );
              }
            }
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
        <>
          {/* return empty survey if there are no pages.*/}
          <EmptySurvey />
        </>
      )}
    </StyledPagesContainer>
  );
};

export default Pages;
