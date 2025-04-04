var today = new Date();
var year = today.getFullYear();
var month = getMonthStr(today.getMonth() + 1);

var startYear = 2010;

function initDate(sYear) {
    setStartYear(sYear);
    initYearSelect();
    initMonthSelect();
    clickPrevMonthBtn();
    clickThisMonthBtn();
    clickNextMonthBtn();
    changeYear();
    changeMonth();
}

function setStartYear(sYear) {
    if (sYear == undefined)
        return;
    startYear = sYear;
}

function initYearSelect() {
    for (var i = startYear; i <= year; i++) {
        $("#yearSelect").append("<option value=" + i + ">" + i + "</option>");
    }
    $("#yearSelect").val(year);
}

function initMonthSelect() {
    for (var i = 1; i <= 12; i++) {
        $("#monthSelect").append("<option value=" + getMonthStr(i) + ">" + getMonthStr(i) + "</option>");
    }
    $("#monthSelect").val(month);
}

function clickPrevMonthBtn() {
    $("#prevMonthBtn").click(function() {
        if (month == "01") {
			if (year * 1 == startYear)
				return;
            year = (year * 1 - 1) + "";
            month = "12";
        } else {
            month = getMonthStr(month * 1 - 1);
        }
        setYearMonth();
        execute();
    });
}

function clickThisMonthBtn() {
    $("#thisMonthBtn").click(function() {
        year = today.getFullYear();
        month = getMonthStr(today.getMonth() + 1);
        setYearMonth();
        execute();
    });
}

function clickNextMonthBtn() {
    $("#nextMonthBtn").click(function() {
        if (month == "12") {
			if (year * 1 == today.getFullYear() * 1)
				return;
            year = (year * 1 + 1) + "";
            month = "01";
        } else {
            month = getMonthStr(month * 1 + 1);
        }
        setYearMonth();
        execute();
    });
}

function changeYear() {
    $("#yearSelect").change(function() {
        year = this.value;
        execute();
    });
}

function changeMonth() {
    $("#monthSelect").change(function() {
        month = this.value;
        execute();
    });
}

function setYearMonth() {
    $("#yearSelect").val(year);
    $("#monthSelect").val(month);
}

function getMonthStr(month) {
    if (month < 10)
        return "0" + month;
    return month;
}

function isThisMonth(value) {
    if (value.startsWith(getThisDate()))
        return true;
    return false;
}

function isPrevMonth(value) {
    if (value.startsWith(getPrevDate()))
        return true;
    return false;
}

function isPrevPrevMonth(value) {
    if (value.startsWith(getPrevPrevDate()))
        return true;
    return false;
}

function getDate(value) {
    if (value == "")
        return "";
    return value.slice(0, 4) + "-" + value.slice(5, 7);
}

function getThisDate() {
    return year + "-" + month;
}

function getPrevDate() {
    if (month == "01") {
        return (year * 1 - 1) + "-12";
    }
    return year + "-" + getMonthStr(month * 1 - 1);
}

function getPrevPrevDate() {
    if (month == "01") {
        return (year * 1 - 1) + "-11";
    } else if (month == "02") {
        return (year * 1 - 1) + "-12";
    }
    return year + "-" + getMonthStr(month * 1 - 2);
}