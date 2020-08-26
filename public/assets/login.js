function checkCredentials() {
    var email = document.getElementById("emailArea").value;
    var password = document.getElementById("passwordArea").value;
    var data = {
        email: email,
        password: password
    };
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => {
            if (data.logged !== true) {
                setTimeout(() => {
                    $('#message').slideUp(2000);
                }, 2000);
                $('#message').html(data).slideDown(1000);
            }
            else {
                window.location = '/home';
            }
        });
}

function logoutUser() {
    window.location = '/logout';
}

var i = 0;
var txt = 'Take Notes. Anytime. Anywhere.';
var speed = 200;
function typeWriter() {
    if (i < txt.length) {
        document.getElementById("text").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, 200);
    }
}

     // .then((res) => {
    //     // console.log(res);
    //     return res.json();
    // })
    // .then((data) => {
    //     // if (data.logged !== 1) {
    //     //     document.getElementById('message').innerHTML = data;
    //     // }
    //     // else {
    //     //     console.log(data.token);
    //     //     fetch('/home', {
    //     //         method: 'GET',
    //     //         headers: {
    //     //             'Content-Type': 'application/json',
    //     //             'login-token': data.token
    //     //         },
    //     //         // body: JSON.stringify(data)
    //     //     });
    //     //     // .then(() => {
    //     //     //     window.location = '/home';
    //     //     // });
    //     // }
    // });
