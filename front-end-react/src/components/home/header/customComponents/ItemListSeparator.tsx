import { type FC } from "react";
import styled from "styled-components";

// ===================type declarations============>
interface ItemListSeparatorProp {
  orientation: "vertical" | "horizontal";
}

// ===================styled Components============>

const StyledItemListSeparator = styled.div`
  width: 100%;
  div {
    background-color: var(--list-separator-color, #e5e5e5);
  }
  div.horizontal-list-separator {
    height: 1px;
    width: 100%;
    margin: calc(0.5 * 8px) calc(0 * 8px);
  }

  div.vertical-list-separator {
    width: 1px;
    height: 100%;
    margin: calc(0 * 8px) calc(1 * 8px);
  }
`;

const ItemListSeparator: FC<ItemListSeparatorProp> = ({ orientation }) => {
  return (
    <StyledItemListSeparator>
      {orientation === "vertical" ? (
        <div className="vertical-list-separator"></div>
      ) : (
        <div className="horizontal-list-separator"></div>
      )}
    </StyledItemListSeparator>
  );
};

export default ItemListSeparator;
