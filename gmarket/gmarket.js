var gift5 = 46500;
var gift3 = 27900;

var specialCard = new Array("샤롯데", 400000);

var cardArray1 = new Array(
    new Array("한베가족", 30000),
    new Array("롤챔코", 30000),
    new Array("K-패스", 30000)
);
    
var cardArray2 = new Array(
    new Array("한베가족", 30000),
    new Array("롤챔코", 30000),
    new Array("K-패스", 30000),
    new Array("쿠키", 20000),
    new Array("쿠키런", 20000),
    new Array("람다람", 20000),
    new Array("총몇명", 20000),
    new Array("야코", 20000),
    new Array("스무살", 20000),
    new Array("선불교통", 20000),
    new Array("12세후불", 20000)
);

var cardArray3 = new Array(
    new Array("국민행복", 90000),
    new Array("국민행복", 90000)
);

var totalCardArray = new Array(cardArray1, cardArray2, cardArray3);

var giftTitleArray = new Array('구분', '5만', '3만');
var titleArray = new Array('구분', '5만', '3만', '합계', '마진');

var specialValueArray = new Array();
var cardValueArray = new Array();
var totalValueArray = new Array();

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
    for (i = 46000; i <= 47000; i+=50) {
        $("#giftPrice5").append("<option value=" + i + ">" + getCommaValue(i) + "</option>");
    }
    $("#giftPrice5").val(gift5);
}

function setGiftPrice3() {
    for (i = 27600; i <= 28200; i+=30) {
        $("#giftPrice3").append("<option value=" + i + ">" + getCommaValue(i) + "</option>");
    }
    $("#giftPrice3").val(gift3);
}

function setGmarket() {
    set();
    show();
}

function set() {
    initSpecialValueArray();
    setCardValueArray();
    setTotalValueArray();
}

function initSpecialValueArray() {
    specialValueArray = getValueArray(specialCard);
}

function setCardValueArray() {
    cardValueArray = new Array();
    for (var cardArray of totalCardArray) {
        var valueArray = new Array();
        for (var card of cardArray) {
            valueArray.push(getValueArray(card));
        }
        addValueArray(valueArray);
        cardValueArray.push(valueArray);
    }
}

function getValueArray(card) {
    var array = new Array();
    for (var i = 0; i <= 30; i++) {
        for (var j = 0; j <= 30; j++) {
            var sum = (gift5 * i) + (gift3 * j);
            if (sum < card[1])
                continue;
            var margin = ((50000 * 0.92) - gift5) * i + ((30000 * 0.92) - gift3) * j;
            array.push(new Array(card[0], i, j, sum, margin));
        }
    }
    return getMarginArray(array);
}

function getMarginArray(array) {
    var marginArray = array[0];
    for (var i = 1; i < array.length; i++) {
        if (marginArray[4] > array[i][4])
            continue;
        if (marginArray[4] == array[i][4] && marginArray[3] < array[i][3])
            continue;
        if (marginArray[4] == array[i][4] && marginArray[1] > array[i][1])
            continue;
        marginArray = array[i];
    }
    return marginArray;
}

function addValueArray(valueArray) {
    if (specialValueArray[1] == 0 && specialValueArray[2] == 0)
        return;
    var cardSumArray = getCardSumArray(valueArray);
    var charlotteArray = getCharlotteArray(cardSumArray);
    if (charlotteArray.length == 0)
        return;
    var maxSumArray = getMaxSumArray(charlotteArray);
    valueArray.push(maxSumArray);
    setSpecialValueArray(maxSumArray);
}

function getCardSumArray(valueArray) {
    var cardSumArray = new Array("", 0, 0, 0);
    for (var value of valueArray) {
        for (var index = 1; index <=3; index++) {
            cardSumArray[index] += value[index];
        }
    }
    return cardSumArray;
}

function getCharlotteArray(cardSumArray) {
    var charlotteArray = new Array();
    for (var i = 0; i <= getMin(10 - cardSumArray[1], specialValueArray[1]); i++) {
        for (var j = 0; j <= getMin(10 - cardSumArray[2], specialValueArray[2]); j++) {
            var sum = (gift5 * i) + (gift3 * j);
            if (sum + cardSumArray[3] > 500000)
                continue;
            var margin = ((50000 * 0.92) - gift5) * i + ((30000 * 0.92) - gift3) * j;
            charlotteArray.push(new Array(specialValueArray[0], i, j, sum, margin));
        }
    }
    return charlotteArray;
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

function setSpecialValueArray(maxSumArray) {
    specialValueArray[1] -= maxSumArray[1];
    specialValueArray[2] -= maxSumArray[2];
}

function setTotalValueArray() {
    totalValueArray = new Array();
    for (var i = 0; i < cardValueArray.length; i++) {
        var valueArray = cardValueArray[i];
        var arr = new Array((i + 1) + '일차', 0, 0, 0 ,0);
        for (var array of valueArray) {
            for (var j = 1; j < array.length; j++) {
                arr[j] += array[j];
            }
        }
        totalValueArray.push(arr);
    }
}

function show() {
    setGmarketDiv1("#book10", "[ 합계 ]", titleArray, totalValueArray);
    for (var i = 0; i < cardValueArray.length; i++) {
        var valueArray = cardValueArray[i];
        setGmarketDiv1("#book1" + (i + 1), "[ " + (i + 1) + "일차 ]", titleArray, valueArray);
    }
}

function setGmarketDiv1(divId, header, titleArray, valueArray) {
    setGmarketDiv(divId, header);
    setTable(divId, titleArray, valueArray);
}

function setGmarketDiv(divId, title) {
    $(divId).empty();
    setHeader(divId, title);
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