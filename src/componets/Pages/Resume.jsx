import React, { useEffect } from "react";
import { MediaUrl } from "../..";

function Resume() {
  const pdfUrl = `${MediaUrl}Sudarshan_Kakde_CV.pdf`;
    useEffect(() => {
      setTimeout(() => {
        document.getElementById("link").click();
      },3000)
    }, [pdfUrl]);

  return (
    <>
      <div className="w-full h-[75vh] flex justify-center items-center text-3xl uppercase">
        Opening Resume in new tab...
      </div>
      <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="hidden" id="link">resume</a>
    </>
  );
}

export default Resume;
