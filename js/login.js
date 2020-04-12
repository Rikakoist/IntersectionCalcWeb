var input = document.getElementById("passwddiv");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("submit").click();
    }
});

function Authenticate(username, password) {
    console.log((escape(username)) + escape(password));
    if (username == "admin" && password == "123456") {
        window.location = "Calc.html";
    } else {
        alert("错误的用户名或密码！");
    }

}