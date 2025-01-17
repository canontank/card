var cookieUrl = "https://script.google.com/macros/s/AKfycbwKoLpLj1urPmJZ9ucgGk08ud-4p4l45k0WjLB6M6rHLDf63lcf31fDoJsX7sj8F95ltQ/exec";
var cookieData = {
    "cmd" : "get"
};
var cookieCashKeyList = new Array('액면가', '거래가', '수량');
var cookieDataList = new Array();

var cookieThisMonthExpDataList = new Array();
var cookieThisMonthDataList = new Array();
var cookieExpDataList = new Array();

var expDateArray = new Array('1일차', '2일차', '3일차', '4일차');

var cardArray1 = new Array('쿠키', '쿠키런', '람다람', '총몇명', '야코', '스무살', '선불교통', '12세후불');
var cardArray2 = new Array('한베가족', '롤챔코', 'K-패스');
var cardArray3 = new Array('국민행복');
var cardNameArray = cardArray1.concat(cardArray2).concat(cardArray3);

$(function() {
    initHeight();
    initDate(2022);
    setDataList(cookieUrl, cookieData, cookieCashKeyList, cookieDataList);
});

function execute() {
    setCookieThisMonthExpDataList();
    setDiscountDiv();
    setUsageDiv();
    setExpDiv();
}

function setCookieThisMonthExpDataList() {
    cookieThisMonthExpDataList = new Array();
    cookieThisMonthDataList = new Array();
    cookieExpDataList = new Array();
    for (var data of cookieDataList) {
        if (isThisMonth(data["날짜"])) {
            cookieThisMonthDataList.push(data);
        } else if (isExpDate(data["날짜"])) {
            cookieExpDataList.push(data);
        }
    }
    cookieThisMonthExpDataList = cookieThisMonthDataList.concat(cookieExpDataList);
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

function setDiscountDiv() {
    $("#discount").empty();
    setNow();
    setFuture();
    setRemain();
}

function setNow() {
    setDiscount('현재', cookieThisMonthDataList);
}

function setFuture() {
    setDiscount('예상', cookieThisMonthExpDataList);
}

function setDiscount(header, thisDataList) {
    var titleArray = new Array('구분', '실적', '기본할인', '추가할인');
    var valueArray = new Array();
    for (var card of cardNameArray) {
        var value = new Array(card, 0, 0, 0);
        for (var data of thisDataList) {
            if (card != data["카드"])
                continue;
            value[1] += (data["거래가"] * data["수량"]);
            value[2] += getDiscount(data);
            value[3] += getAddDiscount(data);
        }
        valueArray.push(value);
    }
    setTable("#discount", header, true, titleArray, valueArray);
}

function getDiscount(data) {
    if (cardArray1.indexOf(data["카드"]) != -1) {
        if ((data["구매처"] == "지마켓" || data["구매처"] == "11번가") && ((data["거래가"] * data["수량"]) >= 20000))
		    return 2000;
        if (data["구매처"] == "스타벅스" && (data["거래가"] * data["수량"]) >= 10000)
            return 2000;
        if (data["구매처"] == "편의점" && (data["거래가"] * data["수량"]) >= 10000)
            return 1000;
    } else if (cardArray2.indexOf(data["카드"]) != -1) {
        if ((data["구매처"] == "지마켓" || data["구매처"] == "옥션") && ((data["거래가"] * data["수량"]) >= 20000)) {
            var discount = Math.floor((data["거래가"] * data["수량"]) * 0.1);
            if (discount > 3000)
                return 3000;
            return discount;
        }
    } else {
        if (data["구매처"] == "지마켓" || data["구매처"] == "옥션") {
            return Math.floor((data["거래가"] * data["수량"]) * 0.05);
        }
    }
	return 0;
}

function getAddDiscount(data) {
    if (cardArray1.indexOf(data["카드"]) != -1 && data["간편결제"] == "간편결제" && (data["거래가"] * data["수량"]) >= 10000) {
        return 1000;
    }
	return 0;
}

function setRemain() {
    var titleArray = new Array('날짜', '실적');
    var valueArray = new Array();
    for (var expDate of expDateArray) {
        var value = new Array(expDate, 0);
        for (var data of cookieExpDataList) {
            if (expDate != data["날짜"])
                continue;
            value[1] += (data["거래가"] * data["수량"]);
        }
        valueArray.push(value);
    }
    setTable("#discount", '남은 실적', true, titleArray, valueArray);
}

function setUsageDiv() {
    $("#usage").empty();
    var widthArray = new Array(19, 14, 14, 14, 13, 13, 13);
    var titleArray = new Array('날짜', '카드', '구매처', '간편결제', '액면가', '거래가', '수량');
    var valueArray = new Array();
    for (var data of cookieThisMonthDataList) {
        var value = new Array();
        for (var title of titleArray) {
            value.push(data[title]);
        }
        valueArray.push(value);
    }
    setTable("#usage", '내역', false, titleArray, valueArray, widthArray);
}

function setExpDiv() {
    $("#exp").empty();
    var titleArray = new Array('카드', '구매처', '액면가', '거래가', '수량');
    for (var expDate of expDateArray) {
        var valueArray = new Array();
        for (var data of cookieExpDataList) {
            if (data["날짜"] != expDate)
                continue;
            var value = new Array();
            for (var title of titleArray) {
                value.push(data[title]);
            }
            valueArray.push(value);
        }
        setTable("#exp", expDate, false, titleArray, valueArray);
    }
}