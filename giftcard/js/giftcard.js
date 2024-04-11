var dataList = new Array();
var today = new Date();
var year = today.getFullYear();
var month = getMonthStr(today.getMonth() + 1);
var thisMonthDataList = new Array();

var keyList = new Array();
var titleList = new Array('날짜', '카드', '판매처', '충전처', '종류');
var cashKeyList = new Array('원가', '단가', '수량');

var notiTitleArray = new Array('구분', '내용');
var cardValueArray = new Array(
    new Array('샤롯데', '지마켓/옥션 40만, 티몬/위메프 50만'),
    new Array('딥에코', '티몬, 위메프, 쿠팡, 지마켓, 옥션, 11번가'),
    new Array('욜로', '티몬, 위메프, 쿠팡'),
    new Array('SKT', '제약 없음 (실적용)'),
    new Array('KT NU', '제약 없음 (실적용)'),
    new Array('LG NU', '제약 없음 (실적용)'),
    new Array('스마트애니', '스마트로, 이니시스, KICC'),
    new Array('하이마트', '제약 없음 (실적용)'),
    new Array('GOAT', '제약 없음'),
    new Array('신세계2', 'SSG 11만'),
    new Array('신세계SC2', 'SSG 11만'),
    new Array('신세계4', 'SSG 11만'),
    new Array('신세계5', 'SSG 11만'),
    new Array('이마트5', 'SSG 11만'),
    new Array('신세계7', 'SSG 11만'),
    new Array('지엔미', 'SSG 11만'),
    new Array('애니패스', 'SSG 11만'),
    new Array('CMA', 'SSG 11만'),
    new Array('위클리', '주말(토/일) 2% 할인 (평일 실적 필요)'),
    new Array('국민행복', '지마켓, 옥션, 인터파크 (월 2회, 건당 10만)'),
    new Array('딥온', '간편결제 (신한플레이, 스마일페이, SK페이)'),
    new Array('판타스틱', '티몬 10만 결제 (일 1회, 월 4회)'),
    new Array('주거래', '티몬, 위메프, 쿠팡, 지마켓, 옥션, 11번가'),
    new Array('4tune', '티몬, 위메프, 쿠팡 (스마일페이/SK페이 불가)'),
    new Array('쿠키', '지마켓, 11번가'),
    new Array('쿠키런', '지마켓, 11번가'),
    new Array('람다람', '지마켓, 11번가'),
    new Array('총몇명', '지마켓, 11번가'),
    new Array('야코', '지마켓, 11번가'),
    new Array('스무살', '지마켓, 11번가'),
    new Array('선불교통', '지마켓, 11번가'),
    new Array('12세후불', '지마켓, 11번가'),
    new Array('한베가족', '지마켓, 옥션 (일 1회, 월 2회)'),
    new Array('롤챔코', '지마켓, 옥션 (일 1회, 월 2회)'),
    new Array('지엔미체크', 'SSG 11만'),
    new Array('W지엔미', 'SSG 11만'),
    new Array('W애니패스', 'SSG 11만'),
    new Array('더나은', '제약 없음 (실적용)'),
    new Array('스마트캐시백', '건당 50만 이상 결제'),
    new Array('페이코', '제약 없음 (1% 적립)'),
    new Array('네이버', '혜택 없음')
);

var chargeTitleArray = new Array('구분', '해피머니', '북앤라이프', '컬쳐랜드', '문화상품권', 'SSG');
var chargeLimitArray = new Array(
    new Array('모빌리언스', 6520000, 6520000, 3260000, 6520000, 0),
    new Array('페이코', 4000000, 1000000, 4500000, 4000000, 0),
    new Array('팔라고', 2000000, 2000000, 0, 0, 0),
    new Array('모바일팝', 1500000, 4500000, 0, 0, 0),
    new Array('머니트리', 4000000, 0, 0, 0, 0),
    new Array('010pay', 2000000, 0, 0, 0, 0),
    new Array('웰컴페이', 1060000, 0, 0, 0, 0),
    new Array('포인트로페이', 0, 5000000, 0, 2000000, 0),
    new Array('하나머니', 0, 2170000, 0, 0, 0),
    new Array('마일벌스', 0, 66000000, 0, 0, 0),
    new Array('페이북', 0, 0, 2170000, 0, 0),
    new Array('네이버', 0, 0, 0, 1080000, 0),
    new Array('스타비즈', 0, 0, 0, 5000000, 0),
    new Array('기프트밸류', 0, 0, 0, 2000000, 0),
    new Array('SSG', 0, 0, 0, 0, 2000000)
);

var cardNameList = new Set();

var giftTitleArray = new Array('구분', '상품권', '거래가', '마진');
var giftCardArray = new Array();

var giftTotalTitleArray = new Array('구분', '충전한도', '충전금액', '남은금액');
var giftTotalValueArray = new Array();
var giftValueArray = new Array();

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
        url : "https://script.google.com/macros/s/AKfycby0MRiCzRAqQcJiZs_n8e6wmLkSi4ON4sSIsDCeSEKJeuz5p0Gk_B4UXbC5eWkTnWwO/exec",
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
    for (var i = 2022; i <= year; i++) {
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
    set();
    show();
}

function set() {
    setThisMonthDataList();
    setCardNameList();
    setGiftCardArray();
    setGiftValueArray();
    setGiftTotalValueArray();
}

function setThisMonthDataList() {
    thisMonthDataList = new Array();
    for (var data of dataList) {
        if (!isThisMonth(data))
            continue;
        thisMonthDataList.push(data);
    }
}

function setCardNameList() {
    cardNameList = new Set();
    for (var cardValue of cardValueArray) {
        cardNameList.add(cardValue[0]);
    }
    for (var data of thisMonthDataList) {
        if (data[1] == "-")
            continue;
        cardNameList.add(data[1]);
    }
}

function setGiftCardArray() {
    giftCardArray = new Array();
    for (var cardName of cardNameList) {
        var giftArray = new Array(0, 0, 0, 0);
        for (var data of thisMonthDataList) {
            if (cardName != data[1])
                continue;
            var rate = getRate(data[4]);
            giftArray[0] += (data[5] * data[7]);
            giftArray[1] += (data[6] * data[7]);
            giftArray[2] += (data[5] * rate) * data[7];
        }
        giftArray[3] = (giftArray[2] - giftArray[1]);
        giftCardArray.push(new Array(cardName, giftArray[0], giftArray[1], giftArray[3]));
    }
}

function getRate(giftType) {
    if (giftType == "티몬캐시") {
        return 0.96;
    } else if (giftType == "SSG") {
        return 0.95;
    }
    return 0.92;
}

function setGiftValueArray() {
    giftValueArray = new Array();
    for (var i = 1; i < chargeTitleArray.length; i++) {
        var array = new Array();
        for (var chargeLimit of chargeLimitArray) {
            var value = 0;
            if (chargeLimit[i] == 0)
                continue;
            for (var data of thisMonthDataList) {
                if (data[3] != chargeLimit[0])
                    continue;
                if (data[4] != chargeTitleArray[i])
                    continue;
                value += (data[5] * data[7]);
            }
            array.push(new Array(chargeLimit[0], chargeLimit[i], value, chargeLimit[i] - value));
        }
        giftValueArray.push(array);
    }
}

function setGiftTotalValueArray() {
    giftTotalValueArray = new Array();
    for (var i = 0; i < giftValueArray.length; i++) {
        var giftArray = giftValueArray[i];
        var totalArray = new Array("", 0, 0, 0);
        totalArray[0] = chargeTitleArray[i + 1];
        for (var array of giftArray) {
            totalArray[1] += array[1];
            totalArray[2] += array[2];
            totalArray[3] += array[3];
        }
        giftTotalValueArray.push(totalArray);
    }
}

function show() {
    setAccountDiv1("#book11", '[ 카드 ]', giftTitleArray, giftCardArray);
    setAccountDiv1("#book12", '[ 합계 ]', giftTotalTitleArray, giftTotalValueArray);
    for (var i = 0; i < giftValueArray.length; i++) {
        setAccountDiv1("#book" + (i + 13), '[ ' + chargeTitleArray[i + 1] + ' ]', giftTotalTitleArray, giftValueArray[i]);
    }
    setAccountNotiDiv("#book18", '[ 주의사항 ]', notiTitleArray, cardValueArray);
    setAccountDiv2("#book2", '[ 상품권 ]', thisMonthDataList);
}

function setAccountDiv1(divId, header, titleArray, valueArray) {
    setAccountDiv(divId, header);
    setTable(divId, titleArray, valueArray);
}

function setAccountNotiDiv(divId, header, titleArray, valueArray) {
    setAccountDiv(divId, header);
    setNotiTable(divId, titleArray, valueArray);
}

function setAccountDiv2(divId, title, valueArray) {
    setAccountDiv(divId, title);
    setBookTable(divId, valueArray);
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

function setNotiTable(divId, titleArray, valueArray) {
    var table = getTable();
    setNotiTitle(table, titleArray);
    setNotiContents(table, valueArray);
	$(divId).append(table);
}

function setBookTable(divId, valueArray) {
    var table = getTable();
    setBookTitle(table);
    setBookContents(table, valueArray);
    $(divId).append(table);
}

function setTitle(table, titleArray) {
    var tr = ($('<tr/>'));
    for (var title of titleArray) {
        tr.append($('<th/>', { align : 'center', width : '25%' }).append($('<font/>', { text : title } )));
    }
    table.append(tr);
}

function setNotiTitle(table, titleArray) {
    var tr = ($('<tr/>'));
    tr.append($('<th/>', { align : 'center', width : '25%' }).append($('<font/>', { text : titleArray[0] } )));
    tr.append($('<th/>', { align : 'center', width : '75%' }).append($('<font/>', { text : titleArray[1] } )));
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

function setNotiContents(table, valueArray) {
    for (var value of valueArray) {
        var tr = ($('<tr/>'));
        for (var i = 0; i < value.length; i++) {
            var td = (i == 0) ? '<th/>' : '<td/>';
            var align = 'center';
            var text = (i == 0) ? value[i] : getCommaValue(value[i]);
            var color = (i == 0) ? '' : getColor(value[i]);
            tr.append($(td, { align : align }).append($('<font/>', { text : text, color : color } )));
        }
        table.append(tr);
    }
}

function setBookTitle(table) {
    table.append($('<tr/>')
		.append($('<th/>', { align : 'center', 'width' : '16%' }).append($('<font/>', { text : '날짜' } )))
		.append($('<th/>', { align : 'center', 'width' : '12%' }).append($('<font/>', { text : '카드' } )))
        .append($('<th/>', { align : 'center', 'width' : '12%' }).append($('<font/>', { text : '판매처' } )))
        .append($('<th/>', { align : 'center', 'width' : '14%' }).append($('<font/>', { text : '충전처' } )))
        .append($('<th/>', { align : 'center', 'width' : '12%' }).append($('<font/>', { text : '종류' } )))
        .append($('<th/>', { align : 'center', 'width' : '12%' }).append($('<font/>', { text : '원가' } )))
        .append($('<th/>', { align : 'center', 'width' : '12%' }).append($('<font/>', { text : '단가' } )))
        .append($('<th/>', { align : 'center', 'width' : '10%' }).append($('<font/>', { text : '수량' } )))
	);
}

function setBookContents(table, valueArray) {
    for (var value of valueArray) {
        table.append($('<tr/>')
            .append($('<td/>', { align : 'center' }).append($('<font/>', { text : new Date(value[0]).format("yyyy-MM-dd (E)"), class : getDayClass(new Date(value[0]).format("E")) } )))
            .append($('<td/>', { align : 'center' }).append($('<font/>', { text : value[1] } )))
            .append($('<td/>', { align : 'center' }).append($('<font/>', { text : value[2] } )))
            .append($('<td/>', { align : 'center' }).append($('<font/>', { text : value[3] } )))
            .append($('<td/>', { align : 'center' }).append($('<font/>', { text : value[4] } )))
            .append($('<td/>', { align :  'right' }).append($('<font/>', { text : getCommaValue(value[5]) } )))
            .append($('<td/>', { align :  'right' }).append($('<font/>', { text : getCommaValue(value[6]) } )))
            .append($('<td/>', { align :  'right' }).append($('<font/>', { text : getCommaValue(value[7]) } )))
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

function getCommaValue(value) {
    return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
}

function setHeight() {
    $(".account").innerHeight(window.innerHeight);
}

function getDayClass(day) {
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
