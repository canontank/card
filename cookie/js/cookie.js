var dataList = new Array();
var today = new Date();
var year = today.getFullYear();
var month = getMonthStr(today.getMonth() + 1);

var keyList = new Array();
var titleList = new Array('날짜', '카드', '구매처', '간편결제');
var cashKeyList = new Array('액면가', '거래가', '수량');

var titleArray1 = new Array('구분', '실적', '기본할인', '추가할인');
var cardArray1 = new Array('쿠키', '쿠키런', '람다람', '총몇명', '야코', '스무살', '선불교통', '12세후불');
var cardArray2 = new Array('한베가족', '롤챔코');
var cardArray = cardArray1.concat(cardArray2);

$(function() {
    setKeyList();
    init();
    loadDataList();
});

function setKeyList() {
    var totalKeyList = new Array(titleList, cashKeyList);
    for (var totalKey of totalKeyList) {
        for (var key of totalKey) {
            keyList.push(key);
        }
    }
}

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

function loadDataList() {
    $.ajax({
        type : "GET",
		url : "https://script.google.com/macros/s/AKfycbwKoLpLj1urPmJZ9ucgGk08ud-4p4l45k0WjLB6M6rHLDf63lcf31fDoJsX7sj8F95ltQ/exec",
        data : {
            "cmd" : "get"
        },
        success : function(rows) {
            setDataList(rows);
            setAccountBook();
        },
        error : function() {
            loadDataList();
        }
    });
}

function setDataList(rows) {
    for (var row of rows) {
        var data = new Array();
        for (var i = 0; i < keyList.length; i++) {
            var value = row[keyList[i]];
            if (cashKeyList.includes(keyList[i])) {
                value = value.replaceAll(",", "") * 1;
            }
            data.push(value);
        }
        dataList.push(data);
    }
}

function initYearSelect() {
    for (var i = 2023; i <= year; i++) {
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
            year = (year * 1 - 1) + "";
            month = "12";
        } else {
            month = getMonthStr(month * 1 - 1);
        }
        setYearMonth();
        setAccountBook();
    });
}

function clickThisMonthBtn() {
    $("#thisMonthBtn").click(function() {
        year = today.getFullYear();
        month = getMonthStr(today.getMonth() + 1);
        setYearMonth();
        setAccountBook();
    });
}

function clickNextMonthBtn() {
    $("#nextMonthBtn").click(function() {
        if (month == "12") {
            year = (year * 1 + 1) + "";
            month = "01";
        } else {
            month = getMonthStr(month * 1 + 1);
        }
        setYearMonth();
        setAccountBook();
    });
}

function changeYear() {
    $("#yearSelect").change(function() {
        year = this.value;
        setAccountBook();
    });
}

function changeMonth() {
    $("#monthSelect").change(function() {
        month = this.value;
        setAccountBook();
    });
}

function setYearMonth() {
    $("#yearSelect").val(year);
    $("#monthSelect").val(month);
}

function setAccountBook() {
	setAccountBook11();
	setAccountBook12();
	setAccountBook13();
	setAccountBook2();
	setAccountBook3();
}

function setAccountBook11() {
    var valueArray = new Array();
    for (var card of cardArray) {
        var performence = 0;
        var discount = 0;
        var addDiscount = 0;
        for (var data of dataList) {
            if (!isThisMonth(data))
                continue;
            if (card != data[1])
                continue;
            performence += (data[5] * data[6]);
			discount += getDiscount(data);
			addDiscount += getAddDiscount(data);
        }
        valueArray.push(new Array(card, performence, discount, addDiscount));
    }
    setAccountDiv1("#book11", '[ 현재 ]', titleArray1, valueArray);
}

function setAccountBook12() {
    var valueArray = new Array();
    for (var card of cardArray) {
        var performence = 0;
        var discount = 0;
        var addDiscount = 0;
        for (var data of dataList) {
            if (!isThisMonth(data) && !isExpDate(data[0]))
                continue;
            if (card != data[1])
                continue;
            performence += (data[5] * data[6]);
			discount += getDiscount(data);
			addDiscount += getAddDiscount(data);
        }
        valueArray.push(new Array(card, performence, discount, addDiscount));
    }
    setAccountDiv1("#book12", '[ 예상 ]', titleArray1, valueArray);
}

function setAccountBook13() {
	var expDateArray = new Array('1일차', '2일차', '3일차', '4일차');
	var titleArray = new Array('날짜', '실적');
    var valueArray = new Array();
    for (var expDate of expDateArray) {
        var performence = 0;
        for (var data of dataList) {
			if (!isThisMonth(data) && !isExpDate(data[0]))
                continue;
			if (expDate != data[0])
                continue;
            performence += (data[5] * data[6]);
        }
        valueArray.push(new Array(expDate, performence));
    }
    setAccountDiv1("#book13", '[ 남은 실적 ]', titleArray, valueArray);
}

function getDiscount(data) {
    if (cardArray1.indexOf(data[1]) != -1) {
        if ((data[2] == "지마켓" || data[2] == "11번가") && ((data[5] * data[6]) >= 20000))
		    return 2000;
        if (data[2] == "스타벅스" && (data[5] * data[6]) >= 10000)
            return 2000;
        if (data[2] == "편의점" && (data[5] * data[6]) >= 10000)
            return 1000;
    } else {
        if ((data[2] == "지마켓" || data[2] == "옥션") && ((data[5] * data[6]) >= 20000))
		    return 3000;
    }
	return 0;
}

function getAddDiscount(data) {
    if (cardArray1.indexOf(data[1]) != -1) {
    	if (data[3] == "간편결제" && (data[5] * data[6]) >= 10000) {
            return 1000;
	}
    }
    return 0;
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

function setAccountBook2() {
    var valueArray = new Array();
    for (var data of dataList) {
        if (!isThisMonth(data))
            continue;
		valueArray.push(data);
    }
    setAccountDiv2("#gbn0", '[ 내역 ]', valueArray);
}

function setAccountBook3() {
	var expDateArray = new Array('1일차', '2일차', '3일차', '4일차');
	var count = 0;
	for (var expDate of expDateArray) {
		var valueArray = new Array();
		for (var data of dataList) {
			if (!isExpDate(data[0]))
				continue;
			if (data[0] != expDate)
				continue;
			valueArray.push(data);
		}
		setAccountDiv3("#gbn" + (count + 1) + "", '[ ' + expDate + ' ]', valueArray);
		count++;
    }
}

function setAccountDiv1(divId, header, titleArray, valueArray) {
    setAccountDiv(divId, header);
    setTable(divId, titleArray, valueArray);
}

function setAccountDiv2(divId, title, valueArray) {
    setAccountDiv(divId, title);
    setBookTable(divId, valueArray);
}

function setAccountDiv3(divId, title, valueArray) {
    setAccountDiv(divId, title);
    setBookTable3(divId, valueArray);
}

function setAccountDiv(divId, title) {
    $(divId).empty();
    setHeader(divId, title);
}

function setHeader(divId, text) {
    $(divId).append(
        $('<table/>').append(
            $('<tr/>', { height : '30', valign : 'bottom' }).append(
                $('<td/>', { class : 'accountHeader' }).append(
                    $('<font/>', { text : text } )
                )
            )
        )
    );
}

function setTable(divId, titleArray, valueArray) {
    var table = getTable();
    setTitle(table, titleArray);
    setContents(table, valueArray);
	$(divId).append(table);
}

function setBookTable(divId, valueArray) {
    var table = getTable();
    setBookTitle(table);
    setBookContents(table, valueArray);
    $(divId).append(table);
}

function setBookTable3(divId, valueArray) {
    var table = getTable();
    setBookTitle3(table);
    setBookContents3(table, valueArray);
    $(divId).append(table);
}

function setTitle(table, titleArray) {
    var tr = ($('<tr/>'));
    for (var title of titleArray) {
        tr.append($('<th/>', { align : 'center', width : '25%' }).append($('<font/>', { text : title } )));
    }
    table.append(tr);
}

function setContents(table, valueArray) {
    for (var value of valueArray) {
        var tr = ($('<tr/>'));
        for (var i = 0; i < value.length; i++) {
            var td = (i == 0) ? '<th/>' : '<td/>';
            var align = (i == 0) ? 'center' : 'right';
            var text = (i == 0) ? value[i] : getCommaValue(value[i]);
            var color = (i == 0) ? '' : getColor(value[i]);
            tr.append($(td, { align : align }).append($('<font/>', { text : text, color : color } )));
        }
        table.append(tr);
    }
}

function setBookTitle(table) {
    table.append($('<tr/>')
		.append($('<th/>', { align : 'center', 'width' : '19%' }).append($('<font/>', { text : '날짜' } )))
		.append($('<th/>', { align : 'center', 'width' : '14%' }).append($('<font/>', { text : '카드' } )))
        .append($('<th/>', { align : 'center', 'width' : '14%' }).append($('<font/>', { text : '구매처' } )))
        .append($('<th/>', { align : 'center', 'width' : '14%' }).append($('<font/>', { text : '간편결제' } )))
        .append($('<th/>', { align : 'center', 'width' : '13%' }).append($('<font/>', { text : '액면가' } )))
        .append($('<th/>', { align : 'center', 'width' : '13%' }).append($('<font/>', { text : '거래가' } )))
        .append($('<th/>', { align : 'center', 'width' : '13%' }).append($('<font/>', { text : '수량' } )))
	);
}

function setBookContents(table, valueArray) {
    for (var value of valueArray) {
		table.append($('<tr/>')
			.append($('<td/>', { align : 'center' }).append($('<font/>', { text : getDateValue(value[0]), class : getDayClass(value[0]) } )))
			.append($('<td/>', { align : 'center' }).append($('<font/>', { text : value[1] } )))
			.append($('<td/>', { align : 'center' }).append($('<font/>', { text : value[2] } )))
			.append($('<td/>', { align : 'center' }).append($('<font/>', { text : value[3] } )))
			.append($('<td/>', { align :  'right' }).append($('<font/>', { text : getCommaValue(value[4]) } )))
			.append($('<td/>', { align :  'right' }).append($('<font/>', { text : getCommaValue(value[5]) } )))
			.append($('<td/>', { align :  'right' }).append($('<font/>', { text : getCommaValue(value[6]) } )))
		);
    }
}

function setBookTitle3(table) {
    table.append($('<tr/>')
		.append($('<th/>', { align : 'center', 'width' : '20%' }).append($('<font/>', { text : '카드' } )))
        .append($('<th/>', { align : 'center', 'width' : '20%' }).append($('<font/>', { text : '구매처' } )))
        .append($('<th/>', { align : 'center', 'width' : '20%' }).append($('<font/>', { text : '액면가' } )))
        .append($('<th/>', { align : 'center', 'width' : '20%' }).append($('<font/>', { text : '거래가' } )))
        .append($('<th/>', { align : 'center', 'width' : '20%' }).append($('<font/>', { text : '수량' } )))
	);
}

function setBookContents3(table, valueArray) {
    for (var value of valueArray) {
		table.append($('<tr/>')
			.append($('<td/>', { align : 'center' }).append($('<font/>', { text : value[1] } )))
			.append($('<td/>', { align : 'center' }).append($('<font/>', { text : value[2] } )))
			.append($('<td/>', { align :  'right' }).append($('<font/>', { text : getCommaValue(value[4]) } )))
			.append($('<td/>', { align :  'right' }).append($('<font/>', { text : getCommaValue(value[5]) } )))
			.append($('<td/>', { align :  'right' }).append($('<font/>', { text : getCommaValue(value[6]) } )))
		);
    }
}

function getTable() {
    return $('<table/>', { class : 'table table-bordered table-striped' });
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

function getColor(value) {
    if (value < 0)
        return "red";
    return "black";
}

function getDateValue(value) {
	if (!isExpDate(value))
		return new Date(value).format("yyyy-MM-dd (E)");
	return value;
}

function getCommaValue(value) {
    return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
}

function setHeight() {
    $(".account").innerHeight(window.innerHeight);
}

function getDayClass(value) {
	if (isExpDate(value))
		return "normal";
	var day = new Date(value).format("E")
	if (day == "토") {
		return "saturday";
	} else if (day == "일") {
		return "sunday";
	} else {
		return "normal";
	}
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
