var gift5 = 46250;
var gift3 = 27750;

var gift5_max_count = 10;
var gift3_max_count = 10;

var cardArray1 = new Array(
    new Array("샤롯데", 400000),
    new Array("한베가족", 30000),
    new Array("롤챔코", 30000)
);
    
var cardArray2 = new Array(
    new Array("쿠키", 20000),
    new Array("쿠키런", 20000),
    new Array("람다람", 20000),
    new Array("총몇명", 20000),
    new Array("야코", 20000),
    new Array("스무살", 20000),
    new Array("선불교통", 20000),
    new Array("12세후불", 20000),
    new Array("한베가족", 30000),
    new Array("롤챔코", 30000),
    new Array("국민행복", 90000),
    new Array("국민행복", 90000)
)

var giftTitleArray = new Array('구분', '5만', '3만');
var titleArray = new Array('구분', '5만', '3만', '합계', '마진');

var valueArray = new Array();
var cardValueArray = new Array();
var totalValueArray = new Array();

$(function() {
    setGmarket();
});

function setGmarket() {
    set();
    show();
}

function set() {
    setGiftMaxCount();
    setCardValueArray(cardArray1);
    setCardValueArray(cardArray2);
    setTotalValueArray(cardValueArray);
}

function setGiftMaxCount() {
    if (gift3 != 0)
        return;
    gift3_max_count = 0;
}

function setCardValueArray(cardArray) {
    valueArray = new Array();
    for (var card of cardArray) {
        setValueArray(card[0], card[1]);
    }
    cardValueArray.push(valueArray);
}

function setValueArray(cardName, cash) {
    var array = getArray(cardName, cash);
    sortArray(array);
    valueArray.push(array[0]);
}

function getArray(cardName, cash) {
    var array = new Array();
    for (var i = 0; i <= 10; i++) {
        for (var j = 0; j <= gift3_max_count; j++) {
            var sum = (gift5 * i) + (gift3 * j);
            if (sum < cash)
                continue;
            var margin = ((50000 * 0.92) - gift5) * i + ((30000 * 0.92) - gift3) * j;
            array.push(new Array(cardName, i, j, sum, margin));
        }
    }
    return array;
}

function sortArray(array) {
    for (var i = 0; i < array.length - 1; i++) {
        for (var j = i + 1; j < array.length; j++) {
            if (array[i][4] < array[j][4]) {
                swap(array, i, j);
            } else if (array[i][4] == array[j][4] && array[i][2] < array[j][2]) {
                swap(array, i, j);
            }
        }
    }
    return array;
}

function swap(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function setTotalValueArray(cardValueArray) {
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
    var tempArray = new Array(new Array('상품권', gift5, gift3));
    //setGmarketDiv1("#book1", "[ 상품권 ]", giftTitleArray, tempArray);
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