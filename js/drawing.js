function IntersectionPoints(Method, Points) {
    ClearCanvas();
    var ScaleProportion = 2 * Calc(Points); //获取缩放比例
    var CorrectedPoints = Points;
    //坐标缩放
    for (var i = 0; i < Points.length; i++) {
        CorrectedPoints[i].x = Points[i].x * (0.8 * 450 / ScaleProportion) + 450 / 2;
        CorrectedPoints[i].y = 450 - ((Points[i].y * (0.8 * 450 / ScaleProportion)) + 450 / 2);
    }

    //按顺序绘制
    DrawLines(Method, CorrectedPoints);
    DrawPoints(CorrectedPoints);
    DrawFonts(Method, CorrectedPoints);
}

//划线
function DrawLines(Method, CorrectedPoints) {
    var c = document.getElementById("drawRegion");
    var ctx = c.getContext("2d");
    ctx.strokeStyle = "Black";

    //公用
    ctx.moveTo(CorrectedPoints[0].x, CorrectedPoints[0].y);
    ctx.lineTo(CorrectedPoints[2].x, CorrectedPoints[2].y);
    ctx.stroke();

    ctx.moveTo(CorrectedPoints[1].x, CorrectedPoints[1].y);
    ctx.lineTo(CorrectedPoints[2].x, CorrectedPoints[2].y);
    ctx.stroke();

    //个别方法
    if (Method == "IntersectionAhead") {
        ctx.moveTo(CorrectedPoints[0].x, CorrectedPoints[0].y);
        ctx.lineTo(CorrectedPoints[1].x, CorrectedPoints[1].y);
        ctx.stroke();
    }

}

//画点
function DrawPoints(CorrectedPoints) {
    var c = document.getElementById("drawRegion");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#000000";

    for (var i = 0; i < CorrectedPoints.length; i++) {
        ctx.beginPath();
        ctx.arc(CorrectedPoints[i].x, CorrectedPoints[i].y, 3, 0, 2 * Math.PI);
        ctx.fill();
    }
}

//写字
function DrawFonts(Method, CorrectedPoints) {
    var c = document.getElementById("drawRegion");
    var ctx = c.getContext("2d");
    ctx.font = "9px 'Times New Roman'";
    c.fillStyle = "Black";

    //Draw public labels
    ctx.fillText("P1", PointMark(CorrectedPoints[1].x, CorrectedPoints[2].x, CorrectedPoints[0].x), PointMark(CorrectedPoints[1].y, CorrectedPoints[2].y, CorrectedPoints[0].y));
    ctx.fillText("P2", PointMark(CorrectedPoints[0].x, CorrectedPoints[2].x, CorrectedPoints[1].x), PointMark(CorrectedPoints[0].y, CorrectedPoints[2].y, CorrectedPoints[1].y));
    ctx.fillText("Result", PointMark(CorrectedPoints[0].x, CorrectedPoints[1].x, CorrectedPoints[2].x, 0.68), PointMark(CorrectedPoints[0].y, CorrectedPoints[1].y, CorrectedPoints[2].y, 0.68));

    //Draw labels for different methods
    if (Method == "DistanceIntersection") {
        ctx.fillStyle = "DarkGray";
        ctx.fillText("a", EdgeMark(CorrectedPoints[0].x, CorrectedPoints[2].x), EdgeMark(CorrectedPoints[0].y, CorrectedPoints[2].y));
        ctx.fillText("b", EdgeMark(CorrectedPoints[1].x, CorrectedPoints[2].x), EdgeMark(CorrectedPoints[1].y, CorrectedPoints[2].y));
    }
    if (Method == "IntersectionAhead") {
        ctx.fillStyle = "DarkCyan";
        ctx.fillText("α", AngleMark(CorrectedPoints[1].x, CorrectedPoints[2].x, CorrectedPoints[0].x), AngleMark(CorrectedPoints[1].y, CorrectedPoints[2].y, CorrectedPoints[0].y));
        ctx.fillText("β", AngleMark(CorrectedPoints[0].x, CorrectedPoints[2].x, CorrectedPoints[1].x), AngleMark(CorrectedPoints[0].y, CorrectedPoints[2].y, CorrectedPoints[1].y));
    }
}

//Adjust position of angle mark
function AngleMark(P1, P2, P3) {
    var AngleMarkPosition = parseInt(((((((P1 + P2) / 2) + P3) / 2) + P3) / 2));
    return AngleMarkPosition;
}

//Adjust position of point mark
function PointMark(P1, P2, P3) {
    var PointMarkPosition = parseInt(((((P1 + P2) / 2) + P3) / 2) + ((P3 - ((P1 + P2) / 2))) * 0.57);
    return PointMarkPosition;
}

//Adjust position of edge mark
function EdgeMark(P1, P2) {
    var EdgeMarkPosition = parseInt(((P1 + P2) / 2));
    return EdgeMarkPosition;
}

//For result point
function PointMark(P1, P2, P3, Ratio) {
    var PointMarkPosition = parseInt(((((P1 + P2) / 2) + P3) / 2) + ((P3 - ((P1 + P2) / 2))) * Ratio);
    return PointMarkPosition;
}


function ClearCanvas() {
    var c = document.getElementById("drawRegion");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.strokeStyle = "Black";

    //y轴
    ctx.moveTo(15, 225);
    ctx.lineTo(435, 225);
    ctx.stroke();

    ctx.moveTo(435, 225);
    ctx.lineTo(430, 220);
    ctx.stroke();

    ctx.moveTo(435, 225);
    ctx.lineTo(430, 230);
    ctx.stroke();

    //x轴
    ctx.moveTo(225, 15);
    ctx.lineTo(225, 435);
    ctx.stroke();

    ctx.moveTo(225, 15);
    ctx.lineTo(220, 20);
    ctx.stroke();

    ctx.moveTo(225, 15);
    ctx.lineTo(230, 20);
    ctx.stroke();

    //坐标轴文字
    ctx.font = "9px 'Times New Roman'";
    ctx.fillStyle = "#000000"
    ctx.fillText("x", 233, 28);
    ctx.fillText("y", 425, 238);

}

//获取缩放比例
function Calc(Points) {
    var XMax = 0;
    var XMin = 0;
    var YMax = 0;
    var YMin = 0;
    for (var i = 0; i < Points.length; i++) {
        if (i == 0) {
            XMax = Points[i].x;
        } else {
            XMax = Math.max(Points[i].x, XMax);
        }
    }

    for (var i = 0; i < Points.length; i++) {
        if (i == 0) {
            XMin = Points[i].x;
        } else {
            XMin = Math.min(Points[i].x, XMin);
        }
    }
    for (var i = 0; i < Points.length; i++) {
        if (i == 0) {
            YMax = Points[i].y;
        } else {
            YMax = Math.max(Points[i].y, YMax);
        }
    }
    for (var i = 0; i < Points.length; i++) {
        if (i == 0) {
            YMin = Points[i].y;
        } else {
            YMin = Math.min(Points[i].y, YMin);
        }
    }
    return Math.max(Math.max(Math.max(Math.max(Math.abs(XMax), Math.abs(XMin)), Math.abs(YMax)), Math.abs(YMax)), Math.abs(YMin));
}