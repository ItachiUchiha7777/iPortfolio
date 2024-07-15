document.addEventListener('DOMContentLoaded', function() {
    // URL of the PDF
    const url = 'path/to/Rohit_LPU.pdf';

    // Load the PDF.js library
    const pdfjsLib = window['pdfjs-dist/build/pdf'];

    // Specify the workerSrc property
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';

    // Asynchronously download the PDF
    pdfjsLib.getDocument(url).promise.then(function(pdf) {
        console.log('PDF loaded');

        // Prepare to fetch and render each page
        let viewer = document.getElementById('pdf-viewer');
        viewer.innerHTML = '';

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
            pdf.getPage(pageNumber).then(function(page) {
                console.log('Page ' + pageNumber + ' loaded');

                const scale = 1.5;
                const viewport = page.getViewport({ scale: scale });

                // Prepare canvas using PDF page dimensions
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Render PDF page into canvas context
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                page.render(renderContext).promise.then(function() {
                    console.log('Page ' + pageNumber + ' rendered');
                });

                // Append the canvas to the DOM
                viewer.appendChild(canvas);
            });
        }
    }).catch(function(error) {
        console.error('Error loading PDF: ' + error);
        document.getElementById('pdf-viewer').innerText = 'Error loading PDF.';
    });
});
