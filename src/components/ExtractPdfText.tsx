import * as pdfjsLib from '../../node_modules/pdfjs-dist/legacy/build/pdf.min.mjs';
import workerSrc from '../../node_modules/pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

export async function extractPDFText(fileUrl: string) {
  const loadingTask = pdfjsLib.getDocument(fileUrl);
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;

  const pages: Array<{ type: string; text: string }> = [];

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    content.items.forEach((item) => {
      // simple heuristic: large font -> title
      const fontSize = item.transform[0]; // approximate font size
      if (fontSize > 16) {
        pages.push({ type: 'title', text: item.str });
      } else {
        pages.push({ type: 'paragraph', text: item.str });
      }
    });
  }

  return pages;
}
