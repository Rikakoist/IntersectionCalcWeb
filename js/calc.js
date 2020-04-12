//度分秒转十进制
function DMS2DEC(DMS) {
    return (parseInt(DMS) + (parseFloat((DMS - parseInt(DMS)) * 100) / 60.0) + ((100 * DMS - parseInt(100 * DMS)) * 100 / 3600));
}

//距离计算
function Distance(p1, p2) {
    return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
}

//方位角计算
function CoordAngle(p1, p2) {
    var CoordAngle = 0;
    var dx = 0;
    var dy = 0;
    var arctg = 0;
    dx = p2.x - p1.x;
    dy = p2.y - p1.y;
    arctg = Math.atan((p2.y - p1.y) / (p2.x - p1.x)) / Math.PI * 180;
    /*if (Math.abs(dx) <= 1e-7) //x增量为零
    {
        if (Math.abs(dy) <= 1e-7) //y增量为零，意即两点坐标数据完全相同，报错
        {
            return NaN;
        } else //y增量不为零，方位角位于坐标轴上
        {
            CoordAngle = (dy < 0) ? 270 : 90;
        }
    } else //x增量不为零
    {
        if (dy == 0) //y增量为零，方位角位于坐标轴上
        {
            CoordAngle = (dx < 0) ? 180 : 0;
        } else //y增量不为零，依据x、y增量符号判断方位角所处象限
        {
            arctg = Math.atan((p2.y - p1.y) / (p2.x - p1.x)) / Math.PI * 180; //计算连线的数学角度
            if (dy > 0) {
                CoordAngle = (dx > 0) ? arctg : 180 + arctg;
            } else {
                CoordAngle = (dx > 0) ? 360 + arctg : arctg + 180;
            }
        }
    }*/
    return (Math.abs(dx) <= 1e-7) ? ((Math.abs(dy) <= 1e-7) ? NaN : ((dy < 0) ? 270 : 90)) : ((Math.abs(dy) <= 1e-7) ? ((dx < 0) ? 180 : 0) : ((dy > 0) ? ((dx > 0) ? arctg : 180 + arctg) : ((dx > 0) ? 360 + arctg : arctg + 180)));
}

//距离交会
function DistanceIntersection(p1, p2, a, b) {
    var Distance = Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
    var Azimuth = CoordAngle(p1, p2) / 180 * Math.PI;
    var r = (a * a + Distance * Distance - b * b) / (2 * Distance);
    var h = Math.sqrt(a * a - r * r);

    var ResultPoint = {
        x: p1.x + r * Math.cos(Azimuth) + h * Math.sin(Azimuth),
        y: p1.y + r * Math.sin(Azimuth) - h * Math.cos(Azimuth),
    };

    return ResultPoint;
}

//前方交会
function IntersectionAhead(p1, p2, a, b) {
    a = a / 180 * Math.PI;
    b = b / 180 * Math.PI;
    var Cota = 1 / Math.tan(a);
    var Cotb = 1 / Math.tan(b);

    var ResultPoint = {
        x: (p1.x * Cotb + p2.x * Cota - p1.y + p2.y) / (Cota + Cotb),
        y: (p1.y * Cotb + p2.y * Cota + p1.x - p2.x) / (Cota + Cotb),
    };

    return ResultPoint;
}

//根据传入计算类型进行计算
function intersectcalc(calcType) {

    //初始化所有变量
    var p1 = {
        x: parseFloat(p1x.value),
        y: parseFloat(p1y.value),
    };
    var p2 = {
        x: parseFloat(p2x.value),
        y: parseFloat(p2y.value),
    };
    var a1 = parseFloat(anga1.value);
    var a2 = parseFloat(anga2.value);


    //传入类型开关
    switch (calcType) {
        case "前方交会":
            {
                var ResultP = IntersectionAhead(p1, p2, a1, a2);
                if (isNaN(ResultP.x) || isNaN(ResultP.y)) {
                    setResult("NaN", "NaN");
                } else {
                    setResult(Math.round(ResultP.x * 10000) / 10000, Math.round(ResultP.y * 10000) / 10000);
                    var Points = new Array(p1, p2, ResultP);
                    IntersectionPoints("IntersectionAhead", Points);
                }
                break;
            }
        case "距离交会":
            {
                var ResultP = DistanceIntersection(p1, p2, a1, a2);
                if (isNaN(ResultP.x) || isNaN(ResultP.y)) {
                    setResult("NaN", "NaN");
                } else {
                    setResult(Math.round(ResultP.x * 10000) / 10000, Math.round(ResultP.y * 10000) / 10000);
                    var Points = new Array(p1, p2, ResultP);
                    IntersectionPoints("DistanceIntersection", Points);
                }
                break;
            }
        case "两点坐标求距离方位角":
            {
                var ResultDis = parseFloat(Distance(p1, p2));
                var ResultAzi = parseFloat(CoordAngle(p1, p2));

                setResult(Math.round(ResultAzi * 10000) / 10000, Math.round(ResultDis * 10000) / 10000);

                break;
            }
    }
}

//设置结果
function setResult(res1, res2) {
    document.getElementById("result1val").innerText = res1;
    document.getElementById("result2val").innerText = res2;
}

//取整数
function normalize(num) {
    if (isNaN(num)) {
        return null;
    }
    if (Math.abs(num - Math.floor(num)) <= 1e-7) {
        return Math.floor(num);
    }
    if (Math.abs(num - Math.ceil(num)) <= 1e-7) {
        return Math.ceil(num);
    }
    return num;
}