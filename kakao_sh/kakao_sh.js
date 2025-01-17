var url = "https://script.google.com/macros/s/AKfycbxBAUpgq3NbFrji6UA75b4Q02MUSAtF-hYW3dqOgeviznQwiJTHVbWhk4AJYvFWrW46qw/exec";
var data = {
    "cmd" : "get"
};
var cashKeyList = new Array('거래금액', '충전금액', '환급금액');
var dataList = new Array();
var thisMonthDataList = new Array();

var bookWidthArray = new Array(20, 16, 16, 16, 16, 16);
var bookTitleArray = new Array('날짜', '충전처', '충전수단', '거래금액', '충전금액', '환급금액');

$(function() {
    initHeight();
    initDate(2022);
    setDataList(url, data, cashKeyList, dataList);
});

function execute() {
    setThisMonthDataList();
    setBook1();
    setBook2();
	setBook3();
}

function setThisMonthDataList() {
    thisMonthDataList = new Array();
    for (var data of dataList) {
        if (!isThisMonth(data["날짜"]))
            continue;
        thisMonthDataList.push(data);
    }
}

function setBook1() {
    $("#book1").empty();
    setBook11();
    setBook12();
    setBook13();
    setBook14();
}

function setBook11() {
	var titleArray = new Array('구분', '횟수', '거래금액', '환급금액');
    var valueArray = new Array();
    valueArray.push(new Array('합계', getCount(), getPrice(''), getRefund('')));
    setTable("#book1", "#book11", "합계", true, titleArray, valueArray);
}

function setBook12() {
	var titleArray = new Array('구분', '거래금액', '충전금액', '환급금액');
    var cardArray = new Array('댐댐', '팔라고', '캐시비', '원패스', '나마네');
    var valueArray = new Array();
    for (var card of cardArray) {
        valueArray.push(new Array(card, getPrice(card), getCharge(card), getRefund(card)));
    }
    setTable("#book1", "#book12", "충전", true, titleArray, valueArray);
}

function setBook13() {
	var titleArray = new Array('구분', '거래금액', '손실금액', '손실율');
    var valueArray = new Array();
    var price = getPrice('');
    var loss = getLoss('');
	valueArray.push(new Array('합계', getPrice(''), getLoss(''), getLossPer(price, loss)));
    setTable("#book1", "#book13", "합계", true, titleArray, valueArray);
}

function setBook14() {
	var titleArray = new Array('구분', '거래금액', '손실금액', '손실율');
    var cardArray = new Array('댐댐', '팔라고', '캐시비', '원패스', '나마네');
    var valueArray = new Array();
    for (var card of cardArray) {
        var price = getPrice(card);
        var loss = getLoss(card);
        valueArray.push(new Array(card, getPrice(card), getLoss(card), getLossPer(price, loss)));
    }
    setTable("#book1", "#book14", "손실", true, titleArray, valueArray);
}

function setBook2() {
    $("#book2").empty();
    var valueArray = new Array();
    for (var data of thisMonthDataList) {
        if (data["거래금액"] == 0)
            continue;
        var value = new Array();
        for (var title of bookTitleArray) {
            value.push(data[title]);
        }
		valueArray.push(value);
    }
    setTable("#book2", "#book21", "충전 내역", false, bookTitleArray, valueArray, bookWidthArray);
}

function setBook3() {
    $("#book3").empty();
    var valueArray = new Array();
    for (var data of thisMonthDataList) {
		if (data["거래금액"] != 0)
			continue;
        var value = new Array();
        for (var title of bookTitleArray) {
            value.push(data[title]);
        }
        valueArray.push(value);
    }
    setTable("#book3", "#book31", "환급 내역", false, bookTitleArray, valueArray, bookWidthArray);
}

function getCount() {
	var count = 0;
	for (var data of thisMonthDataList) {
        if (data["거래금액"] == 0)
			continue;
		count++;
	}
	return count;
}

function getPrice(card) {
	return getPCR(card, "거래금액");
}

function getCharge(card) {
	return getPCR(card, "충전금액");
}

function getRefund(card) {
	return getPCR(card, "환급금액");
}

function getPCR(card, key) {
    var pcr = 0;
	for (var data of thisMonthDataList) {
        if (card != '' && card != data["충전처"])
            continue;
        pcr += data[key];
    }
	return pcr;
}

function getLoss(card) {
	var loss = 0;
	for (var data of thisMonthDataList) {
        if (card != '' && card != data["충전처"])
            continue;
		loss += (data["충전금액"] + data["환급금액"]) - data["거래금액"];
    }
	return loss;
}

function getLossPer(price, loss) {
	if (price == 0)
		return "0%";
	var lossPer = -(loss) * 100 / price;
	return lossPer.toFixed(2) + "%";
}