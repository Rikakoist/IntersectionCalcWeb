//改变活动功能
function ChangeActive(activename) {
    for (var i = 1; i <= 3; i++) {
        var tag = document.getElementById("navi" + i).innerText;

        if (tag == activename) {
            document.getElementById("navi" + i).setAttribute("class", "active");
        } else {
            document.getElementById("navi" + i).setAttribute("class", "navi");
        }
    }

    setResult("", ""); //清空结果

    //通过当前选定功能设置元素属性
    switch (activename) {
        case "前方交会":
            {
                document.getElementById("angdiv").style.display = "block";
                document.getElementById("angtag").innerText = "Angles";
                document.getElementById("a1tag").innerText = "α: ";
                document.getElementById("a2tag").innerText = "β: ";
                document.getElementById("result1tag").innerText = "X: ";
                document.getElementById("result2tag").innerText = "Y: ";
                break;
            }
        case "距离交会":
            {
                document.getElementById("angdiv").style.display = "block";
                document.getElementById("angtag").innerText = "Edges";
                document.getElementById("a1tag").innerText = "a: ";
                document.getElementById("a2tag").innerText = "b: ";
                document.getElementById("result1tag").innerText = "X: ";
                document.getElementById("result2tag").innerText = "Y: ";
                break;
            }
        case "两点坐标求距离方位角":
            {
                document.getElementById("angdiv").style.display = "none";
                document.getElementById("result1tag").innerText = "方位角: ";
                document.getElementById("result2tag").innerText = "距离: ";
                break;
            }
    }
}