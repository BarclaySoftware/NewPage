const editor = new PagePerfect('#editor', {
    height: 400,
    toolbarSticky: false,
    buttons: "find,undo,redo,print,spellcheck,copyformat,eraser,about, |,paragraph, |,font, |,fontsize, |,bold,italic,underline,strikethrough,brush, |,cut,copy,paste,selectall, |,hr,fullsize |,link,image,video,file,table,symbols |,align,lineHeight,ul,ol, |,indent,outdent, |,superscript,subscript, |,source,preview",
    spellcheck: true
});

// Creates the template HTML on export
function buildHTML(content) {
    return `<!doctype html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="generator" content="PagePerfect 26">\n\n    <title>Untitled Page | PagePerfect 26</title>\n\n    <link rel="shortcut icon" href="https://pageperfect.pages.dev/favicon.svg" type="image/x-icon">\n    <link rel="stylesheet" type="text/css" href="https://pageperfect.pages.dev/global.css">\n</head>\n<body>\n    <main class="content-container">\n        ${content}\n    </main>\n</body>\n</html>`;
}

document.getElementById('saveBtn').addEventListener('click', function () {
    const content = editor.value;

    if (!content) {
        alert('FAILURE: Your page is empty.');
        return;
    }

    const blob = new Blob([buildHTML(content)], { type: 'text/html' });
    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);
    link.download = 'untitled_page.html';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

document.getElementById('copyBtn').addEventListener('click', async function () {
    const content = editor.value;

    if (!content) {
        alert('FAILURE: Your page is empty.');
        return;
    }

    try {
        await navigator.clipboard.writeText(buildHTML(content));
        alert('SUCCESS: The content has been copied to your clipboard.');
    } catch (err) {
        alert('FAILURE: The content was not copied to your clipboard.\n\nSUGGESTION: Ensure PagePerfect has permission to access your clipboard.');
        console.error(err);
    }
});

// Old clearBtn logic
// document.getElementById('clearBtn').addEventListener('click',function(){editor.value='';});

document.getElementById('clearBtn').addEventListener('click', function () {
    const content = editor.value;

    if (!content) {
        return;
    }

    const confirmed = confirm(
        'WARNING: Are you sure you want to clear this page? This action cannot be undone.\n\nNOTICE: All of your content will be erased.'
    );

    if (confirmed) {
        editor.value = '';
    }
});

// Prevent users from losing unsaved progress
window.addEventListener('beforeunload',function(e){const content=editor.value;if(content){e.preventDefault();}});
