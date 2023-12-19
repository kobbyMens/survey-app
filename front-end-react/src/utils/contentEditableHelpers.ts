import { Node } from "slate";
import { type CustomElement } from "../components/survey/surveyCreator/surveyCreatorQuestion/Question";

// =========================================================================
export const serialize = (value: any[]): string => {
  return value.map((n) => Node.string(n)).join("\n");
};

export const deserialize = (string: string): CustomElement[] => {
  return string.split("\n").map((line) => {
    return {
      type: "span",
      children: [{ text: line }],
    };
  });
};

export const getContent = (
  storageKey: string,
  defaultValue: string
): CustomElement[] => {
  let content = localStorage.getItem(storageKey);

  if (content) {
    return deserialize(content);
  } else {
    return [
      {
        type: "span",
        children: [{ text: defaultValue }],
      },
    ];
  }
};
