import html2pdf from "html2pdf.js";

export default function DownloadPdf(htmlContent) {
  const element = document.createElement("div");
  element.innerHTML = htmlContent;
  document.body.appendChild(element);

  const opt = {
    margin: [15, 15, 15, 15],
    filename: "payslip.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: [200, 270] },
  };

  html2pdf()
    .from(element)
    .set(opt)
    .save()
    .finally(() => {
      document.body.removeChild(element);
    });
}
