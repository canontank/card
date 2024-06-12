var gift5 = 46500;
var gift3 = 27900;

var initCardArray = new Array(
    new Array("한베가족", 30000, 0, 0, 0, 0),
    new Array("롤챔코", 30000, 0, 0, 0, 0),
    new Array("K-패스", 30000, 0, 0, 0, 0),
    new Array("샤롯데", 400000, 0, 0, 0, 0),

    new Array("한베가족", 30000, 0, 0, 0, 0),
    new Array("롤챔코", 30000, 0, 0, 0, 0),
    new Array("K-패스", 30000, 0, 0, 0, 0),
    new Array("쿠키", 20000, 0, 0, 0, 0),
    new Array("쿠키런", 20000, 0, 0, 0, 0),
    new Array("람다람", 20000, 0, 0, 0, 0),
    new Array("총몇명", 20000, 0, 0, 0, 0),
    new Array("야코", 20000, 0, 0, 0, 0),
    new Array("스무살", 20000, 0, 0, 0, 0),
    new Array("선불교통", 20000, 0, 0, 0, 0),
    new Array("12세후불", 20000, 0, 0, 0, 0),

    new Array("국민행복", 90000, 0, 0, 0, 0),
    new Array("국민행복", 90000, 0, 0, 0, 0)
);

var dayDuplicateCardList = new Array("한베가족", "롤챔코", "K-패스");
var splitCardList = new Array("샤롯데");

var titleArray = new Array('구분', '5만', '3만', '합계', '마진');
var totalCardArray = new Array();
var totalValueArray = new Array();
var totalSumValueArray = new Array();

$(function() {
    initGiftPrice();
    setGmarket();
});

function initGiftPrice() {
    changeGiftPrice5();
    changeGiftPrice3();
    setGiftPrice5();
    setGiftPrice3();
}

function changeGiftPrice5() {
    $("#giftPrice5").change(function() {
        gift5 = this.value;
        setGmarket();
    });
}

function changeGiftPrice3() {
    $("#giftPrice3").change(function() {
        gift3 = this.value;
        setGmarket();
    });
}

function setGiftPrice5() {
    for (i = 46000; i <= 47500; i+=50) {
        $("#giftPrice5").append("<option value=" + i + ">" + getCommaValue(i) + "</option>");
    }
    $("#giftPrice5").val(gift5);
}

function setGiftPrice3() {
    for (i = 27600; i <= 28500; i+=30) {
        $("#giftPrice3").append("<option value=" + i + ">" + getCommaValue(i) + "</option>");
    }
    $("#giftPrice3").val(gift3);
}

function setGmarket() {
    set();
    show();
}

function set() {
    setTotalCardArray();
    setTotalValueArray();
    setTotalSumValueArray();
}

function setTotalCardArray() {
    totalCardArray = new Array();
    for (var i = 0; i < initCardArray.length; i++) {
        var cardValueArray = getCardValueArray(initCardArray[i]);
        totalCardArray[i] = getMinMarginArray(cardValueArray);
    }
}

function getCardValueArray(cardArray) {
    var cardValueArray = new Array();
    for (var i = 0; i <= 10; i++) {
        for (var j = 0; j <= 20; j++) {
            var sum = (gift5 * i) + (gift3 * j);
            if (sum < cardArray[1])
                continue;
            var margin = ((50000 * 0.92) - gift5) * i + ((30000 * 0.92) - gift3) * j;
            cardValueArray.push(new Array(cardArray[0], i, j, sum, margin));
        }
    }
    return cardValueArray;
}

function getMinMarginArray(cardValueArray) {
    var minMarginArray = cardValueArray[0];
    for (var i = 1; i < cardValueArray.length; i++) {
        if (minMarginArray[4] > cardValueArray[i][4])
            continue;
        if (minMarginArray[4] == cardValueArray[i][4] && minMarginArray[3] < cardValueArray[i][3])
            continue;
        if (minMarginArray[4] == cardValueArray[i][4] && minMarginArray[1] > cardValueArray[i][1])
            continue;
        minMarginArray = cardValueArray[i];
    }
    return minMarginArray;
}

function setTotalValueArray() {
    totalValueArray = new Array();
    while (!isEmptyTotalCardArray()) {
        var dayArray = new Array();
        for (var i = 0; i < totalCardArray.length; i++) {
            var cardArray = getCardArray(dayArray, totalCardArray[i]);
            if (cardArray[3] == 0)
                continue;
            if (!isAddDayArray(dayArray, cardArray))
                continue;
            dayArray.push(cardArray);
            setTotalCard(i, cardArray);
        }
        totalValueArray.push(dayArray);
    }
}

function isEmptyTotalCardArray() {
    var sum = 0;
    for (var cardArray of totalCardArray) {
        sum += cardArray[3];
    }
    if (sum == 0)
        return true;
    return false;
}

function getCardArray(dayArray, cardArray) {
    for (var card of splitCardList) {
        if (cardArray[0] != card)
            continue;
        return getSplitCardArray(dayArray, cardArray);
    }
    return cardArray;
}

function getSplitCardArray(dayArray, cardArray) {
    var splitCardArray = new Array();
    var daySumArray = getDaySumArray(dayArray);
    for (var i = 0; i <= getMin(10 - daySumArray[1], cardArray[1]); i++) {
        for (var j = 0; j <= getMin(10 - daySumArray[2], cardArray[2]); j++) {
            var sum = (gift5 * i) + (gift3 * j);
            if (daySumArray[3] + sum > 500000)
                continue;
            var margin = ((50000 * 0.92) - gift5) * i + ((30000 * 0.92) - gift3) * j;
            splitCardArray.push(new Array(cardArray[0], i, j, sum, margin));
        }
    }
    return getMaxSumArray(splitCardArray);
}

function getDaySumArray(dayArray) {
    var daySumArray = new Array("", 0, 0, 0, 0);
    for (var day of dayArray) {
        for (var i = 1; i <= 4; i++) {
            daySumArray[i] += day[i];
        }
    }
    return daySumArray;
}

function getMin(a, b) {
    if (a > b)
        return b;
    return a;
}

function getMaxSumArray(array) {
    var maxSumArray = array[0];
    for (var i = 1; i < array.length; i++) {
        if (maxSumArray[3] > array[i][3])
            continue;
        if (maxSumArray[3] == array[i][3] && maxSumArray[1] > array[i][1])
            continue;
        maxSumArray = array[i];
    }
    return maxSumArray;
}

function isAddDayArray(dayArray, cardArray) {
    if (isDayDuplicateCard(dayArray, cardArray))
        return false;
    if (isDayExceeds(dayArray, cardArray))
        return false;
    return true;
}

function isDayDuplicateCard(dayArray, cardArray) {
    for (var card of dayDuplicateCardList) {
        if (cardArray[0] != card)
            continue;
        for (var day of dayArray) {
            if (day[0] != card)
                continue;
            return true;
        }
    }
    return false;
}

function isDayExceeds(dayArray, cardArray) {
    if (isExceeds(dayArray, cardArray, 1, 10))
        return true;
    if (isExceeds(dayArray, cardArray, 2, 10))
        return true;
    if (isExceeds(dayArray, cardArray, 3, 500000))
        return true;
    return false;
}

function isExceeds(dayArray, cardArray, index, limit) {
    var sum = 0;
    for (var array of dayArray) {
        sum += array[index];
    }
    if (sum + cardArray[index] > limit)
        return true;
    return false;
}

function setTotalCard(index, cardArray) {
    var array = new Array(cardArray[0], 0, 0, 0, 0);
    for (var i = 1; i <= 4; i++) {
        array[i] = totalCardArray[index][i] - cardArray[i];
    }
    totalCardArray[index] = array;
}

function setTotalSumValueArray() {
    totalSumValueArray = new Array();
    for (var i = 0; i < totalValueArray.length; i++) {
        var valueArray = totalValueArray[i];
        var array = new Array((i + 1) + "일차", 0, 0, 0, 0);
        for (var j = 0; j < valueArray.length; j++) {
            var value = valueArray[j];
            for (var k = 1; k <= 4; k++) {
                array[k] += value[k];
            }
        }
        totalSumValueArray.push(array);
    }
}

function show() {
    $("#gmarket").empty();
    setGmarketDiv("#book10", "[ 합계 ]", titleArray, totalSumValueArray);
    for (var i = 0; i < totalValueArray.length; i++) {
        var valueArray = totalValueArray[i];
        setGmarketDiv("#book1" + (i + 1), "[ " + (i + 1) + "일차 ]", titleArray, valueArray);
    }
}

function setGmarketDiv(divId, header, titleArray, valueArray) {
    makeDiv(divId);
    setHeader(divId, header);
    setTable(divId, titleArray, valueArray);
}

function makeDiv(divId) {
    $("#gmarket").append(
        $('<div/>', { id : divId.replace("#", ""), style : 'margin-top : 15px;' } )
    );
}

function setHeader(divId, text) {
    $(divId).append(
        $('<table/>').append(
            $('<tr/>', { height : '30', valign : 'bottom' }).append(
                $('<td/>', { class : 'gmarketHeader' }).append(
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

function setTitle(table, titleArray) {
    var tr = ($('<tr/>'));
    for (var title of titleArray) {
        tr.append($('<th/>', { align : 'center', width : '20%' }).append($('<font/>', { text : title } )));
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

function getTable() {
    return $('<table/>', { class : 'table table-bordered table-striped' });
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
    $(".gmarket").innerHeight(window.innerHeight);
}