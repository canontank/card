var cookieUrl = "https://script.google.com/macros/s/AKfycbwKoLpLj1urPmJZ9ucgGk08ud-4p4l45k0WjLB6M6rHLDf63lcf31fDoJsX7sj8F95ltQ/exec";
var cookieData = {
    "cmd" : "get"
};
var cookieKeyList = new Array('날짜', '카드', '구매처', '간편결제', '액면가', '거래가', '수량');
var cookieCashKeyList = new Array('액면가', '거래가', '수량');
var cookieDataList = new Array();

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

var cardArray1 = new Array('쿠키', '쿠키런', '람다람', '총몇명', '야코', '스무살', '선불교통', '12세후불');
var cardArray2 = new Array('한베가족', '롤챔코', 'K-패스');
var cardArray3 = new Array('국민행복');
var cardNameArray = cardArray1.concat(cardArray2).concat(cardArray3);

$(function() {
    initHeight();
    initDate(2022);
    setCookieDataList();
});

function setCookieDataList() {
    cookieDataList = getDataList(cookieUrl, cookieData, cookieKeyList, cookieCashKeyList);
}

function execute() {
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
            if (!isThisMonth(data[0]))
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
            if (!isThisMonth(data[0]) && !isExpDate(data[0]))
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
            if (!isThisMonth(data[0]) && !isExpDate(data[0]))
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
        if (!isThisMonth(data[0]))
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
    showDiscount();
    showUsage();
    showExp();    
}

function showDiscount() {
    $("#discount").empty();
    setTable("#discount", "#now", '현재', true, discountTitleArray, discountNowValueArray);
    setTable("#discount", "#future", '예상', true, discountTitleArray, discountFutureValueArray);
    setTable("#discount", "#remain", '남은 실적', true, remainTitleArray, remainValueArray);
}

function showUsage() {
    $("#usage").empty();
    setTable("#usage", "#usage0", '내역', false, usageTitleArray, usageValueArray, usageWidthArray);
}

function showExp() {
    $("#exp").empty();
    for (var i = 0; i < expDateArray.length; i++) {
        setTable("#exp", "#exp" + (i + 1) + "", expDateArray[i], false, expTitleArray, expValueArray[i]);
    }
}