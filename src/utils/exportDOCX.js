import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export const exportCurriculumDOCX = async (curriculum) => {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({ children: [new TextRun({ text: curriculum.title, bold: true })] }),
          ...curriculum.activities.map(
            (a) => new Paragraph(`${a.type}: ${a.title} - ${a.date} (${a.mode})`)
          ),
        ],
      },
    ],
  });
  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${curriculum.title}.docx`);
};
