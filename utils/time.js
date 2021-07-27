// 前面加零，例如返回月份是1，改成01
function formatNumber(n) {
    n = n.toString();

    return n[1] ? n : '0' + n
};

// 今天是星期几
function getWeekend() {
    let date = new Date();
    let str = '日一二三四五六';
    let weekend = '周' + str.charAt(date.getDay()); //今天是星期几

    return weekend;
};

// 将日期换成年月日，例如20201116
// 使用：formatTime(new Date())
function formatTime(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return year + "" + formatNumber(month) + "" + formatNumber(day);
};

// 将日期换成年月日分秒 20201119173506 
// 使用：formatTimeFull(new Date(1616990400))
function formatTimeFull(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let second = date.getSeconds();

    return year + "" + formatNumber(month) + "" + formatNumber(day) + "" + formatNumber(hours) + "" + formatNumber(minutes) + "" + formatNumber(second);
};

// 将日期换成年月日分秒：2021-03-12 00:50:00
// 使用：formatTimeDate(new Date(1616990400))
function formatTimeDate(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let second = date.getSeconds();

    return year + "-" + formatNumber(month) + "-" + formatNumber(day) + " " + formatNumber(hours) + ":" + formatNumber(minutes) + ":" + formatNumber(second);
};

// 目标日期、几天后或几天前
function getTargetday(num) {
    let number = "";
    if (num == null || num == "undefined" || num == 0) {
        number = 0;
    } else {
        number = num;
    };

    let today = new Date();
    let targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * number;
    let targetday = new Date();
    targetday.setTime(targetday_milliseconds); //注意，这行是关键代码

    return targetday;
};

// 目标日期、几天后或几天前，例如20201116
function targetday(num) {
    let targetday = formatTime(getTargetday(num));

    return targetday;
};

// 目标日期、几天后或几天前，例如2021-03-12 00:50:00
function targetFullday(num) {
    let targetday = formatTimeDate(getTargetday(num));

    return targetday;
};

// 改版前，节目单信息栏上，周末列表对应的日期
function targetDayList() {
    let weekend = getWeekend(); //今天是星期几
    let targetDayList = [];
    let today = formatTime(new Date());
    let id = "";

    if (weekend === "周日") {
        id = 1;
        targetDayList = [today, targetday(1), targetday(2), targetday(3), targetday(4), targetday(5), targetday(6)];
    } else if (weekend === "周一") {
        id = 2;
        targetDayList = [targetday(-1), today, targetday(1), targetday(2), targetday(3), targetday(4), targetday(5)];
    } else if (weekend === "周二") {
        id = 3;
        targetDayList = [targetday(-2), targetday(-1), today, targetday(1), targetday(2), targetday(3), targetday(4)];
    } else if (weekend === "周三") {
        id = 4;
        targetDayList = [targetday(-3), targetday(-2), targetday(-1), today, targetday(1), targetday(2), targetday(3)];
    } else if (weekend === "周四") {
        id = 5;
        targetDayList = [targetday(-4), targetday(-3), targetday(-2), targetday(-1), today, targetday(1), targetday(2)];
    } else if (weekend === "周五") {
        id = 6;
        targetDayList = [targetday(-5), targetday(-4), targetday(-3), targetday(-2), targetday(-1), today, targetday(1)];
    } else if (weekend === "周六") {
        id = 7;
        targetDayList = [targetday(-6), targetday(-5), targetday(-4), targetday(-3), targetday(-2), targetday(-1), today];
    }

    return targetDayList;
};

// 改版后，频道节目单，周末列表对应的数据
function getWeekendList() {
    let arr = []; //返回给频道详情页的数据
    let targetDayList = []; //频道节目单调整显示，前4天与后2天的数据
    let today = formatTime(new Date()); //今天的日期，例如：20210321
    let weekendList = []; //频道节目单周末列表
    let idArray = [1, 2, 3, 4, 5, 6, 7]; //标识，用于区分节目单下具体信息
    let weekend = getWeekend(); //今天是星期几

    /* 周末列表日期，例如：[20210319、20210320、20210321、20210322、20210323、20210324、20210325]
    即频道节目单调整显示，前4天与后2天的数据 */
    targetDayList = [targetday(-4), targetday(-3), targetday(-2), targetday(-1), today, targetday(1), targetday(2)];

    if (weekend == "周日") {
        weekendList = ["周三", "周四", "周五", "周六", "今日", "周一", "周二"];
    } else if (weekend == "周一") {
        weekendList = ["周四", "周五", "周六", "周日", "今日", "周二", "周三"];
    } else if (weekend == "周二") {
        weekendList = ["周五", "周六", "周日", "周一", "今日", "周三", "周四"];
    } else if (weekend == "周三") {
        weekendList = ["周六", "周日", "周一", "周二", "今日", "周四", "周五"];
    } else if (weekend == "周四") {
        weekendList = ["周日", "周一", "周二", "周三", "今日", "周五", "周六"];
    } else if (weekend == "周五") {
        weekendList = ["周一", "周二", "周三", "周四", "今日", "周六", "周日"];
    } else if (weekend == "周六") {
        weekendList = ["周二", "周三", "周四", "周五", "今日", "周日", "周一"];
    }

    for (let i = 0; i < 7; i++) {
        let obj = {};
        obj.id = idArray[i];
        obj.weekend = weekendList[i];
        obj.day = targetDayList[i];

        arr.push(obj);
    };

    return arr;
};

module.exports = {
    getWeekend, //今天是星期几
    formatTime, // 返回年月日，例如20201116
    formatTimeFull, // 返回年月日分秒 20201119173506
    formatTimeDate, // 返回年月日分秒：2021-03-12 00:50:00
    getWeekendList, //频道节目单，周末列表对应的数据
    targetFullday, //几天前或几天后的日期，返回年月日分秒：2021-03-12 00:50:00
};