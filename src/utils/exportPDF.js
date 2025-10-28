import jsPDF from "jspdf";

export const exportCurriculumPDF = (curriculum) => {
  const doc = new jsPDF();
  doc.text(curriculum.title, 10, 10);
  curriculum.activities.forEach((a, i) => {
    doc.text(`${i + 1}. [${a.type}] ${a.title} - ${a.date} (${a.mode})`, 10, 20 + i * 10);
  });
  doc.save(`${curriculum.title}.pdf`);
};
