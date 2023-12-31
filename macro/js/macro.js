var CODE;
var CODE_LENGTH = 0;
var MAX_ROW_COUNT;

var arr = new Array();
var array = new Array();
var giftCode = "";
var giftCodeArray = new Array();
var giftCodeArrayList = new Array();

$(function() {
    init();
    setArr();
    initExtract();
});

function init() {
    CODE = getCode();
    for (var c of CODE) {
        CODE_LENGTH += c;
    }
    MAX_ROW_COUNT = getMaxRowCount();
}

function setArr() {
    for (var i = 0; i < 10; i++) {
        arr.push(i);
        array.push(i);
    }
    arr.push('-');
    arr.push('_');
}

function initExtract() {
    $("#extract").on("click", function() {
        set();
        show();
        initCopy();
        setWidth();
        setHeight();
    });
}

function set() {
    setGiftCodeArray();
    setGiftCodeArrayList();
}

function setGiftCodeArray() {
    giftCodeArray = new Array();
    for (var value of $("#input").val()) {
        if (isGiftCode(value)) {
            if (isGiftCodeNumber(value)) {
                setGiftCode(value);
            }
        } else {
            giftCode = "";
        }
    }
}

function isGiftCode(value) {
    for (var i = 0; i < arr.length; i++) {
        if (value.indexOf(arr[i]) != -1)
            return true;
    }
    return false;
}

function isGiftCodeNumber(value) {
    for (var i = 0; i < array.length; i++) {
        if (value.indexOf(array[i]) != -1)
            return true;
    }
    return false;
}

function setGiftCode(value) {
    giftCode += value;
    if (giftCode.length != CODE_LENGTH)
        return;
    if (isExceptionGiftCode(giftCode)) {
        giftCode = "";
        return;
    }
    var cnt = CODE_LENGTH;
    for (var i = CODE.length - 1; i > 0; i--) {
        cnt -= CODE[i];
        giftCode = giftCode.insertAt(cnt, '-');
    }
    giftCodeArray.push(giftCode);
    giftCode = "";
}

function isExceptionGiftCode(giftCode) {
    if (giftCode == "1234123412341234")
        return true;
    return false;
}

function setGiftCodeArrayList() {
    giftCodeArrayList = new Array();
    var tempArray = new Array();
    for (var i = 0; i < giftCodeArray.length; i++) {
        tempArray.push(giftCodeArray[i]);
        if ((i != giftCodeArray.length - 1) && (i % MAX_ROW_COUNT != MAX_ROW_COUNT - 1))
            continue;
        giftCodeArrayList.push(tempArray);
        tempArray = new Array();
    }
}

function show() {
    showInputDiv();
    initOutputDiv();
    for (var i = 0; i < giftCodeArrayList.length; i++) {
        showOutputDiv(giftCodeArrayList[i], i);
    }
}

function showInputDiv() {
    showCount();
    showResult();
}

function showCount() {
    $("#count").text(giftCodeArray.length);
}

function showResult() {
    var output = "";
    for (var i = 0; i < giftCodeArrayList.length; i++) {
        var gCodeArray = giftCodeArrayList[i];
        for (var j = 0; j < gCodeArray.length; j++) {
            output += (gCodeArray[j] + ((j != gCodeArray.length - 1) ? "," : "") + "\n");
        }
        output += "\n";
    }
    $("#result").val(output);
}

function initOutputDiv() {
    $("#outputDiv").empty();
}

function showOutputDiv(gCodeArray, cnt) {
    $("#outputDiv").append(getGiftDiv(gCodeArray, cnt));
}

function getGiftDiv(gCodeArray, cnt) {
    return $('<div/>', { class : 'gift' })
        .append(getHeaderDiv(cnt))
        .append(getContentsDiv(gCodeArray))
        .append(getButtonDiv())
        .append(getGiftTable(gCodeArray))
    ;
}

function getHeaderDiv(cnt) {
    return $('<div/>', { class : 'header', text : 'URL_' + (cnt + 1) });
}

function getContentsDiv(gCodeArray) {
    return $('<div/>', { class : 'contents' }).append(
        $('<textarea/>', { text : $("#outputHidden").val().split("#GIFT_CODE").join(gCodeArray) })
    );
}

function getButtonDiv() {
    return $('<button/>', { name : 'copy', text : '복사' } );
}

function getGiftTable(gCodeArray) {
    var table = $('<table/>', { class : 'table table-bordered table-striped' });
    table.append(getTitleTr());
    for (var i = 0; i < gCodeArray.length; i++) {
        var code = gCodeArray[i].split("-").join("");
        var value = getValue(i, code);
        table.append(getContentTr(value));
    }
    return table;
}

function getTitleTr() {
    var tr = ($('<tr/>'));
    tr.append($('<th/>', { align : 'center', width : '20%' }).append($('<font/>', { text : '순번' } )));
    tr.append($('<th/>', { align : 'center', width : '80%', colspan : CODE.length }).append($('<font/>', { text : '번호' } )));
    return tr;
}

function getValue(i, code) {
    var cnt = 0;
    var value = new Array();
    value.push(i + 1);
    for (var i = 0; i < CODE.length; i++) {
        value.push(code.substr(cnt, CODE[i]));
        cnt += CODE[i];
    }
    return value;
}

function getContentTr(value) {
    var tr = ($('<tr/>'));
    for (var i = 0; i < value.length; i++) {
        var td = (i == 0) ? '<th/>' : '<td/>';
        var color = "gray";
        if (i == 0) {
            color = "white";
        } else if (i == 2 || i == 4) {
            color = "#964b00";
        }
        tr.append($(td, { align : 'center' }).append($('<font/>', { text : value[i], color : color } )));
    }
    return tr;
}

function initCopy() {
    $("[name=copy]").on("click", function() {
        $("[name=copy]").css("background-color", "#f0f0f0").css("border", "1px solid black");
        $(this).css("background-color", "#47E1A8");
        var value = $(this).parent("div").find("textarea:eq(0)").val();
        console.log(value);
        navigator.clipboard.writeText(value);
    });
}

function setWidth() {
    $("#outputDiv").innerWidth((giftCodeArrayList.length + 1) * 380);
}

function setHeight() {
    $(".gift").innerHeight(window.innerHeight - 20);
}

String.prototype.insertAt = function(index, str) {
    return this.slice(0, index) + str + this.slice(index)
}