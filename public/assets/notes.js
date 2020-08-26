function sendNote() {
    var text = document.getElementById("textArea").value;
    var title = document.getElementById("titleArea").value;
    var data = {
        title: title,
        text: text
    };
    fetch('/home', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    setTimeout(() => {
        location.reload();
    }, 500);
}

function deleteNote(deleteItem) {
    var data = {
        delete: deleteItem
    };
    fetch('/home', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    setTimeout(() => {
        location.reload();
    }, 500);
}

function editNote(editItem) {
    var data = {
        edit: editItem
    };
    fetch('/home', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

function popUp() {
    var modalBtn = document.querySelector('.modal-btn');
    var modalBg = document.querySelector('.modal-bg');
    var modalClose = document.querySelector('.modal-close');
    modalBg.classList.add('bg-active');
    modalBtn.addEventListener('click', function () {
        modalBg.classList.add('bg-active');
    });
    modalClose.addEventListener('click', function () {
        modalBg.classList.remove('bg-active');
    });
}

function updateNote() {
    var _id = document.getElementById("_id").innerHTML;
    var text = document.getElementById("textAreaModal").value;
    var title = document.getElementById("titleAreaModal").value;
    var data = {
        id: _id,
        title: title,
        text: text
    };
    fetch('/home', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    setTimeout(() => {
        location.reload();
    }, 500);
}

function modifyModal(item, magicVal) {
    var magic = document.getElementById('localTextId-' + magicVal).innerHTML;
    var moreMagic = document.getElementById('localTitleId-' + magicVal).innerHTML;

    magic = magic.replace(/<br\s*[\/]?>/gi, "\n");
    moreMagic = moreMagic.replace(/<br\s*[\/]?>/gi, "\n");

    document.getElementById("_id").innerHTML = item;
    document.getElementById("textAreaModal").innerHTML = magic;
    document.getElementById("titleAreaModal").innerHTML = moreMagic;
}

/*
function modifyModal(editItem) {
    var data = {
        truth: 1,
        item: editItem
    }
    fetch('/home', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data.noteInModal._id)
            document.getElementById("textAreaModal").innerHTML = data.noteInModal.text
            document.getElementById("titleAreaModal").innerHTML = data.noteInModal.title
            document.getElementById("_id").innerHTML = data.noteInModal._id
        })
}
*/