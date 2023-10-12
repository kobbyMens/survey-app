import { Link } from "react-router-dom";
import styled from "styled-components";

const MyTab = styled(Link)`
display: flex;
height: 48px;
justify-content: center;
align-items: center;
padding: 0.5rem;
border-top: 4px solid transparent;
border-bottom: 4px solid transparent;
margin: 0 0.5rem;
font-weight: 700;
textTransform: none;
color: #888B8D;
&:hover {
    border-bottom-color: #888B8D;,
  }
`;

const MyNavTabs: React.FC = () => {
  return (
    <>
      <nav className="nav-bar">
        <ul>
          <li>
            <MyTab to={"/home/worksapce"}>My workspace</MyTab>
          </li>
          <li>
            <MyTab to={"/home/surveys"}>My surveys</MyTab>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default MyNavTabs;
