var today = new Date();
var year = today.getFullYear();
var month = getMonthStr(today.getMonth() + 1);

var todayYear = today.getFullYear();
var todayMonth = today.getMonth() + 1;

var cookieDataList = new Array();
var cookieKeyList = new Array();
var cookieTitleList = new Array('날짜', '카드', '구매처', '간편결제');
var cookieCashKeyList = new Array('액면가', '거래가', '수량');

var accountValueArray = new Array();
var cookieValueArray = new Array();

var compareTitleArray = new Array('카드명', '가계부', '쿠키', '비교');
var compareValueArray = new Array();

var discountTitleArray = new Array('구분', '실적', '기본할인', '추가할인');
var discountNowValueArray = new Array();
var discountFutureValueArray = new Array();

var remainTitleArray = new Array('날짜', '실적');
var remainValueArray = new Array();

var usageWidthArray = new Array(19, 14, 14, 14, 13, 13, 13);
var usageTitleArray = new Array('날짜', '카드', '구매처', '간편결제', '액면가', '거래가', '수량');
var usageValueArray = new Array();

var expDateArray = new Array('1일차', '2일차', '3일차', '4일차');
var expTitleArray = new Array('카드', '구매처', '액면가', '거래가', '수량');
var expValueArray = new Array();

// ../common/js/cardData.js 참고
var cardNameArray = cardArray1.concat(cardArray2).concat(cardArray3);

$(function() {
    init();
    setCookieKeyList();
    loadCookieDataList();
});

function init() {
    $(window).resize(setHeight);
    initYearSelect();
    initMonthSelect();
    clickPrevMonthBtn();
    clickThisMonthBtn();
    clickNextMonthBtn();
    changeYear();
    changeMonth();
    setHeight();
}

function setCookieKeyList() {
    var totalKeyList = new Array(cookieTitleList, cookieCashKeyList);
    for (var totalKey of totalKeyList) {
        for (var key of totalKey) {
            cookieKeyList.push(key);
        }
    }
}

function loadCookieDataList() {
    $.ajax({
        type : "GET",
		url : "https://script.google.com/macros/s/AKfycbwKoLpLj1urPmJZ9ucgGk08ud-4p4l45k0WjLB6M6rHLDf63lcf31fDoJsX7sj8F95ltQ/exec",
        data : {
            "cmd" : "get"
        },
        success : function(rows) {
            setCookieDataList(rows);
            setAccountBook();
        },
        error : function() {
            loadCookieDataList();
        }
    });
}

function setCookieDataList(rows) {
    for (var row of rows) {
        var data = new Array();
        for (var i = 0; i < cookieKeyList.length; i++) {
            var value = row[cookieKeyList[i]];
            if (cookieCashKeyList.includes(cookieKeyList[i])) {
                value = value.replaceAll(",", "") * 1;
            }
            data.push(value);
        }
        cookieDataList.push(data);
    }
}

function setAccountBook() {
    set();
    show();
}

function set() {
    setDiscount();
    setRemain();
    setUsage();
    setExp();
}

function setDiscount() {
    setNow();
    setFuture();
}

function setNow() {
    discountNowValueArray = new Array();
    for (var card of cardNameArray) {
        var valueArray = new Array(card, 0, 0, 0);
        for (var data of cookieDataList) {
            if (!isThisMonth(data))
                continue;
            if (card != data[1])
                continue;
            valueArray[1] += (data[5] * data[6]);
			valueArray[2] += getDiscount(data);
			valueArray[3] += getAddDiscount(data);
        }
        discountNowValueArray.push(valueArray);
    }
}

function setFuture() {
    discountFutureValueArray = new Array();
    for (var card of cardNameArray) {
        var valueArray = new Array(card, 0, 0, 0);
        for (var data of cookieDataList) {
            if (!isThisMonth(data) && !isExpDate(data[0]))
                continue;
            if (card != data[1])
                continue;
            valueArray[1] += (data[5] * data[6]);
            valueArray[2] += getDiscount(data);
            valueArray[3] += getAddDiscount(data);
        }
        discountFutureValueArray.push(valueArray);
    }
}

function getDiscount(data) {
    if (cardArray1.indexOf(data[1]) != -1) {
        if ((data[2] == "지마켓" || data[2] == "11번가") && ((data[5] * data[6]) >= 20000))
		    return 2000;
        if (data[2] == "스타벅스" && (data[5] * data[6]) >= 10000)
            return 2000;
        if (data[2] == "편의점" && (data[5] * data[6]) >= 10000)
            return 1000;
    } else if (cardArray2.indexOf(data[1]) != -1) {
        if ((data[2] == "지마켓" || data[2] == "옥션") && ((data[5] * data[6]) >= 20000)) {
            var discount = Math.floor((data[5] * data[6]) * 0.1);
            if (discount > 3000)
                return 3000;
            return discount;
        }
    } else {
        if (data[2] == "지마켓" || data[2] == "옥션") {
            return Math.floor((data[5] * data[6]) * 0.05);
        }
    }
	return 0;
}

function getAddDiscount(data) {
    if (cardArray1.indexOf(data[1]) != -1 && data[3] == "간편결제" && (data[5] * data[6]) >= 10000) {
        return 1000;
    }
	return 0;
}

function setRemain() {
    remainValueArray = new Array();
    for (var expDate of expDateArray) {
        var performence = 0;
        for (var data of cookieDataList) {
			if (!isThisMonth(data) && !isExpDate(data[0]))
                continue;
			if (expDate != data[0])
                continue;
            performence += (data[5] * data[6]);
        }
        remainValueArray.push(new Array(expDate, performence));
    }
}

function setUsage() {
    usageValueArray = new Array();
    for (var data of cookieDataList) {
        if (!isThisMonth(data))
            continue;
        usageValueArray.push(data);
    }
}

function setExp() {
    expValueArray = new Array();
    for (var expDate of expDateArray) {
		var valueArray = new Array();
		for (var data of cookieDataList) {
			if (!isExpDate(data[0]))
				continue;
			if (data[0] != expDate)
				continue;
			valueArray.push(data);
		}
        expValueArray.push(valueArray);
    }
}

function isExpDate(value) {
	if (value.indexOf('일차') == -1)
		return false;
	var tYear = today.getFullYear();
	var tMonth = getMonthStr(today.getMonth() + 1);
	if (getThisDate() != tYear + "-" + tMonth)
		return false;
	return true;
}

function show() {
    initParentDiv();
    setTable("#discount", "#now", '현재', true, discountTitleArray, discountNowValueArray);
    setTable("#discount", "#future", '예상', true, discountTitleArray, discountFutureValueArray);
    setTable("#discount", "#remain", '남은 실적', true, remainTitleArray, remainValueArray);
    setTable("#usage", "#usage0", '내역', false, usageTitleArray, usageValueArray, usageWidthArray);
    for (var i = 0; i < expDateArray.length; i++) {
        setTable("#exp", "#exp" + (i + 1) + "", expDateArray[i], false, expTitleArray, expValueArray[i]);
    }
}

function initParentDiv() {
    $("#discount").empty();
    $("#usage").empty();
    $("#exp").empty();
}

function isThisMonth(data) {
    if (data[0] == "" || !data[0].startsWith(getThisDate()))
        return false;
    return true;
}

function getDate(data) {
    var date = data[0];
    if (date == "")
        return "";
    return date.slice(0, 4) + "-" + date.slice(5, 7);
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

function getMonthStr(month) {
    if (month < 10)
        return "0" + month;
    return month;
}

function getDateNum(date) {
    if (date == "")
        return 0;
    return date.replaceAll("-", "") * 1;
}

function getPrevDateNum(date) {
    if (date == "")
        return "";
    var y = date.slice(0, 4);
    var m = date.slice(5, 7);
    if (m == "01") {
        return ((y * 1 - 1) + "12") * 1;
    }
    return (y + getMonthStr(m * 1 - 1)) * 1;
}

function setHeight() {
    $(".account").innerHeight(window.innerHeight);
}

Date.prototype.format = function(f) {
	if (!this.valueOf())
		return " ";
	var weekName = [ "일", "월", "화", "수", "목", "금", "토" ];
	var d = this;
	return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
		switch ($1) {
			case "yyyy": return d.getFullYear();
			case "yy": return (d.getFullYear() % 1000).zf(2);
			case "MM": return (d.getMonth() + 1).zf(2);
			case "dd": return d.getDate().zf(2);
			case "E": return weekName[d.getDay()];
			case "HH": return d.getHours().zf(2);
			case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
			case "mm": return d.getMinutes().zf(2);
			case "ss": return d.getSeconds().zf(2);
			case "a/p": return d.getHours() < 12 ? "오전" : "오후";
			default: return $1;
		}
	});
};
String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};