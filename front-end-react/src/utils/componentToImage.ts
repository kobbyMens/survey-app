import html2canvas from "html2canvas";

export const renderComponentAsImage = async (
  componentRef: HTMLParagraphElement
) => {
  try {
    const canvas = await html2canvas(componentRef);
    const imgData = canvas.toDataURL("image/png");
    return imgData;
  } catch (err) {
    console.error("An error occured", err);
    return null;
  }
};
