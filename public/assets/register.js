function sendCredentials() {
    var name = document.getElementById("nameArea").value;
    var email = document.getElementById("emailArea").value;
    var password = document.getElementById("passwordArea").value;
    var data = {
        name: name,
        email: email,
        password: password
    };
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => {
            if (data.registered !== 1) {
                setTimeout(() => {
                    $('#message').slideUp(2000);
                }, 2000);
                $('#message').html(data).slideDown(1000);
            }
            else {
                window.location = '/login';
            }
        });
}