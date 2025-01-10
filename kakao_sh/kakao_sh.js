var url = "https://script.google.com/macros/s/AKfycbxBAUpgq3NbFrji6UA75b4Q02MUSAtF-hYW3dqOgeviznQwiJTHVbWhk4AJYvFWrW46qw/exec";
var data = {
    "cmd" : "get"
};
var widthArray = new Array(20, 16, 16, 16, 16, 16);
var keyList = new Array('날짜', '충전처', '충전수단', '거래금액', '충전금액', '환급금액');
var cashKeyList = new Array('거래금액', '충전금액', '환급금액');
var dataList = new Array();
var thisMonthDataList = new Array();

$(function() {
    initHeight();
    initDate(2022);
    setDataList();
});

function setDataList() {
    dataList = getDataList(url, data, keyList, cashKeyList);
}

function execute() {
    setThisMonthDataList();
    setBook1();
    setBook2();
	setBook3();
}

function setThisMonthDataList() {
    thisMonthDataList = new Array();
    for (var data of dataList) {
        if (!isThisMonth(data[0]))
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
    setBook21();
}

function setBook21() {
    var valueArray = new Array();
    for (var data of thisMonthDataList) {
		if (data[3] == 0)
			continue;
		valueArray.push(data);
    }
    setTable("#book2", "#book21", "충전 내역", false, keyList, valueArray, widthArray);
}

function setBook3() {
    $("#book3").empty();
    setBook31();
}

function setBook31() {
    var valueArray = new Array();
    for (var data of thisMonthDataList) {
		if (data[3] != 0)
			continue;
		valueArray.push(data);
    }
    setTable("#book3", "#book31", "환급 내역", false, keyList, valueArray, widthArray);
}

function getCount() {
	var count = 0;
	for (var data of thisMonthDataList) {
        if (data[3] == 0)
			continue;
		count++;
	}
	return count;
}

function getPrice(card) {
	var price = 0;
	for (var data of thisMonthDataList) {
        if (card != '' && card != data[1])
            continue;
        price += data[3];
	}
	return price;
}

function getCharge(card) {
	var charge = 0;
	for (var data of thisMonthDataList) {
        if (card != '' && card != data[1])
            continue;
		charge += data[4];
    }
	return charge;
}

function getRefund(card) {
	var refund = 0;
	for (var data of thisMonthDataList) {
        if (card != '' && card != data[1])
            continue;
		refund += data[5];
    }
	return refund;
}

function getLoss(card) {
	var loss = 0;
	for (var data of thisMonthDataList) {
        if (card != '' && card != data[1])
            continue;
		loss += (data[4] + data[5]) - data[3];
    }
	return loss;
}

function getLossPer(price, loss) {
	if (price == 0)
		return "0%";
	var lossPer = -(loss) * 100 / price;
	return lossPer.toFixed(2) + "%";
}