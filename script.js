// Initialize Jodit editor
const editor = new Rubisco('#editor', {
    height: 400,
    toolbarSticky: false,
    buttons: "find,undo,redo,print,spellcheck,copyformat,eraser,about, |,paragraph, |,font, |,fontsize, |,bold,italic,underline,strikethrough,brush, |,cut,copy,paste,selectall, |,hr,fullsize |,link,image,video,file,table,symbols |,align,lineHeight,ul,ol, |,indent,outdent, |,superscript,subscript, |,source,preview",
    spellcheck: true,
});

// Save button action
document.getElementById('saveBtn').addEventListener('click', function() {
    const content = editor.value;
    if(content) {
        const blob = new Blob([`<!DOCTYPE html>\n<html>\n<head>\n<meta charset='UTF-8'>\n<title>Saved Content</title>\n<link rel='stylesheet' type='text/css' href='https://pageperfect.pages.dev/global.css'>\n</head>\n<body>\n${content}\n</body>\n</html>`], { type: 'text/html' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'saved_content.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } else {
        alert('Editor is empty!');
    }
});

// Clear button action
document.getElementById('clearBtn').addEventListener('click', function() {
    editor.value = '';
});