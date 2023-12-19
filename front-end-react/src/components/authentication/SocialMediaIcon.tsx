import { FC } from "react";

//socialIcons
import { SocialIcon } from "react-social-icons/component";
import styled from "styled-components";

// =====================Styled Component=================>
const StyledSocialMediaIconContainer = styled.div`
  display: flex;
  position: relative;
  span {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: calc(1 * 8px);

    div.icon-container {
      border: 1px solid rgb(208, 210, 211);
      transition: color 0.4s ease 0s, border-color 0.4s ease 0s,
        background-color 0.4s ease 0s;
      border-radius: 4px;
      padding: calc(1 * 8px);
    }

    span.icon-text {
      font-size: 14px;
    }

    &:hover {
      div.icon-container {
        border: 1px solid rgb(117, 117, 117);
        background: rgb(247, 248, 250);
        transition: none 0s ease 0s;
      }
      span.icon-text {
        text-decoration: underline;
      }
    }
  }
`;

// =====================Type declarations================>
interface SocialMediaIconProps {
  iconText: string;
  iconUrl: string;
}

const SocialMediaIcon: FC<SocialMediaIconProps> = ({ iconText, iconUrl }) => {
  return (
    <StyledSocialMediaIconContainer>
      <span>
        <div className="icon-container">
          <SocialIcon style={{ height: 35, width: 35 }} url={iconUrl} />
        </div>
        <span className="icon-text">{iconText}</span>
      </span>
    </StyledSocialMediaIconContainer>
  );
};

export default SocialMediaIcon;
