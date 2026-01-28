// Copyright (c) 2026 Rubisco Group. All Rights Reserved.

// Initialize the editor
const editor = new PagePerfect('#editor', {
    height: 400,
    toolbarSticky: false,
    buttons: "find,undo,redo,print,spellcheck,copyformat,eraser,about, |,paragraph, |,font, |,fontsize, |,bold,italic,underline,strikethrough,brush, |,cut,copy,paste,selectall, |,hr,fullsize |,link,image,video,file,table,symbols |,align,lineHeight,ul,ol, |,indent,outdent, |,superscript,subscript, |,source,preview",
    spellcheck: true,
});

// Save button
document.getElementById('saveBtn').addEventListener('click', function() {
    const content = editor.value;
    if(content) {
        const blob = new Blob([`<!doctype html>\n<html>\n<head>\n    <meta charset='UTF-8'>\n    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Untitled Page | PagePerfect 26</title>\n    <link rel="shortcut icon" href="https://pageperfect.pages.dev/favicon.svg" type="image/x-icon">\n    <link rel='stylesheet' type='text/css' href='https://pageperfect.pages.dev/global.css'>\n</head>\n<body>\n    ${content}\n</body>\n</html>`], { type: 'text/html' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'untitled_page.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } else {
        alert('Page is empty!');
    }
});

// Clear button
document.getElementById('clearBtn').addEventListener('click', function() {
    editor.value = '';
});
