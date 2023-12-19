import styled from "styled-components";

// ==============Styled Components======================================>

const StyledIndexHomePageContainer = styled.article`
  display: flex;
  flex-direction: column;
  section.intro-section {
    text-align: center;
    width: 100%;
    color: #161616;
    div.fs-homepage-title {
      margin: 0 auto;
      span {
        font-size: 32px;
      }
      p {
        font-family: Arial, Helvetica, sans-serif;
        font-size: calc(6 * 4px);
        font-weight: 700;
        line-height: 38px;
      }

      header {
        display: flex;
        justify-content: center;

        h1 {
          font-weight: 600;
          font-family: "Lato", sans-serif;
        }
      }
    }
  }

  /** -------------Start Media queries----------------------- **/
  @media only screen and (width >= 1600px) {
    section {
      div.fs-homepage-title {
        width: calc(350 * 4px);
        padding: calc(24 * 4px) calc(0 * 4px);

        p {
          padding-bottom: calc(6 * 4px);
        }

        header {
          gap: calc(8 * 4px);

          h1 {
            font-size: 48px;
            line-height: 72px;
          }
        }
      }
    }
  }

  @media only screen and (1200px <= width <= 1600px) {
    section {
      div.fs-homepage-title {
        width: calc(270 * 4px);
        padding: calc(24 * 4px) calc(0 * 4px);

        p {
          padding-bottom: calc(6 * 4px);
        }

        header {
          gap: calc(8 * 4px);

          h1 {
            font-size: 48px;
            line-height: 64px;
          }
        }
      }
    }
  }

  @media only screen and (904px <= width <= 1200px) {
    section {
      div.fs-homepage-title {
        padding: calc(12 * 4px) calc(12 * 4px);

        p {
          padding-bottom: calc(6 * 4px);
        }
        header {
          gap: calc(8 * 4px);

          h1 {
            font-size: 48px;
            line-height: 64px;

            br.break-one {
              display: none;
            }
          }
        }
      }
    }
  }

  @media only screen and (600px <= width <= 904px) {
    section {
      div.fs-homepage-title {
        padding: calc(12 * 4px) calc(12 * 4px);

        p {
          padding-bottom: calc(6 * 4px);
        }
        header {
          gap: calc(8 * 4px);

          h1 {
            font-size: 45px;
            line-height: 64px;
            br.br.break-one {
              display: none;
            }
          }
        }
      }
    }
  }

  @media only screen and (width <= 600px) {
    section {
      div.fs-homepage-title {
        padding: calc(6 * 4px) calc(6 * 4px) calc(6 * 8px) calc(6 * 4px);

        p {
          padding-bottom: calc(4 * 4px);
        }
        header {
          gap: calc(8 * 4px);

          h1 {
            font-size: 32px;
            line-height: 40px;

            br.break-one {
              display: none;
            }
          }
        }
      }
    }
  }
`;

const IndexHomePage: React.FC = () => {
  return (
    <StyledIndexHomePageContainer>
      <section className="intro-section">
        <div className="fs-homepage-title">
          <span>😊</span>
          <p>Free React-js Based Survey Designer.</p>
          <header>
            <h1>
              An intuitive drag-n-drop application for creating{" "}
              <br className="break-one" />
              survey and visualizing responds.
            </h1>
          </header>
        </div>
      </section>
    </StyledIndexHomePageContainer>
  );
};

export default IndexHomePage;
