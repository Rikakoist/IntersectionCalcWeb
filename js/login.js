var input = document.getElementById("passwddiv");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("submit").click();
    }
});

//简单的用户名密码比对
function Authenticate(username, password) {
    if (username == "21232f297a57a5a743894a0e4a801fc3" && password == "e10adc3949ba59abbe56e057f20f883e") {
        window.location = "Calc.html";
    } else {
        alert("错误的用户名或密码！");
    }
}