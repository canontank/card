var CODE;
var CODE_LENGTH = 0;
var MAX_ROW_COUNT;
var OUTPUT_HIDDEN_ID;

var macroArray = new Array(
    new Array("happy", "해피머니", new Array(4, 4, 4, 4, 8), 10, "#outputHiddenHappy"),
    new Array("happy_inumber", "해피머니 (아이넘버)", new Array(4, 4, 4), 10, "#outputHiddenCommon"),
    new Array("book", "북앤라이프", new Array(4, 4, 4, 4, 4), 10, "#outputHiddenCommon"),
    new Array("book_inumber", "북앤라이프 (아이넘버)", new Array(4, 4, 4), 10, "#outputHiddenCommon"),
    new Array("culture", "컬쳐랜드", new Array(4, 4, 4, 4), 10, "#outputHiddenCommon"),
    new Array("online_starbiz", "온라인 문화상품권 (스타비즈)", new Array(4, 4, 4, 6), 10, "#outputHiddenOnlineStarbiz"),
    new Array("online_naver", "온라인 문화상품권 (네이버)", new Array(4, 4, 4, 6), 5, "#outputHiddenOnlineNaver")
);

var arr = new Array();
var array = new Array();
var replaceStrArray = new Array();

var inputValue = "";

var giftCode = "";
var giftCodeArray = new Array();
var giftCodeArrayList = new Array();

var duplicateGiftCodeArray = new Array();

$(function() {
    setSelectType();
    setArr();
    setReplaceStr();
    initButton();
    initExtract();
});

function setSelectType() {
    for (var macroInfo of macroArray) {
        $("#type").append("<option value=" + macroInfo[0] + ">" + macroInfo[1] + "</option>");
    }
}

function setArr() {
    for (var i = 0; i < 10; i++) {
        arr.push(i);
        array.push(i);
    }
    arr.push('-');
    arr.push('_');
}

function setReplaceStr() {
    replaceStrArray.push(" ");
    replaceStrArray.push("\n");
    replaceStrArray.push("\t");
    replaceStrArray.push("*발행일자:"); // 위메프 해피머니
    replaceStrArray.push("*인증번호:"); // 옥션 북앤라이프
    replaceStrArray.push("■인증번호:"); // 문화상품권 → 북앤라이프
    replaceStrArray.push("인증번호:"); // KB 북앤라이프
}

function initButton() {
    $("#comma").on("click", function() {
        replaceResultValue(",");
    });
    $("#dash").on("click", function() {
        replaceResultValue("-");
    });
}

function replaceResultValue(code) {
    var resultVal = $("#result").val();
    $("#result").val(resultVal.replaceAll(code, ""));
}

function initExtract() {
    $("#extract").on("click", function() {
        set();
        show();
        initCopy();
        setWidth();
    });
}

function set() {
    setInit();
    setCodeLength();
    setInputValue();
    setGiftCodeArray();
    setGiftCodeArrayList();
}

function setInit() {
    giftCode = "";
    giftCodeArray = new Array();
    giftCodeArrayList = new Array();
    var type = $("#type").val();
    for (var macroInfo of macroArray) {
        if (macroInfo[0] == type) {
            CODE = macroInfo[2];
            MAX_ROW_COUNT = macroInfo[3];
            OUTPUT_HIDDEN_ID = macroInfo[4];
        }
    }
    duplicateGiftCodeArray = new Array();
}

function setCodeLength() {
    CODE_LENGTH = 0;
    for (var c of CODE) {
        CODE_LENGTH += c;
    }
}

function setInputValue() {
    inputValue = $("#input").val();
    for (var i = 0; i < replaceStrArray.length; i++) {
        inputValue = inputValue.replaceAll(replaceStrArray[i], "");
    }
}

function setGiftCodeArray() {
    giftCodeArray = new Array();
    for (var value of inputValue) {
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
    if (isDuplicateGiftCode(giftCode)) {
        duplicateGiftCodeArray.push(giftCode);
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

function isDuplicateGiftCode(giftCode) {
    for (var i = 0; i < giftCodeArray.length; i++) {
        if (giftCode == giftCodeArray[i].replaceAll("-", "")) {
            return true;
        }
    }
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
    $("#duplicate").text(duplicateGiftCodeArray.length);
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
    return $('<div/>', { class : 'header', text : '스크립트_' + (cnt + 1) });
}

function getContentsDiv(gCodeArray) {
    return $('<div/>', { class : 'contents' }).append(
        $('<textarea/>', { text : $(OUTPUT_HIDDEN_ID).val().split("#GIFT_CODE").join(gCodeArray), readonly : 'readonly' })
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
        navigator.clipboard.writeText(value);
    });
}

function setWidth() {
    $("#outputDiv").innerWidth((giftCodeArrayList.length + 1) * 380);
}

String.prototype.insertAt = function(index, str) {
    return this.slice(0, index) + str + this.slice(index)
}
