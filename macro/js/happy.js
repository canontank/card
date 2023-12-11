var arr = new Array();
var array = new Array();
var giftCode = "";
var giftCodeArray = new Array();

$(function() {
    init();
});

function init() {
    setHeight();
    setArr();
    initExtract();
}

function makeHtml(cnt) {
    var accountDiv = ($('<div/>', { class : 'account account1' } ));
    accountDiv.append(getBook_Div(cnt));
    accountDiv.append(getClearDiv());
    accountDiv.append(getBookDiv(cnt));
    $("#outputDiv").append(accountDiv);
}

function getBook_Div(cnt) {
    var book_Div = ($('<div/>', { id : 'book1' + (cnt + 1) + '_1' } ));
    book_Div.append(getURLTable(cnt));
    book_Div.append(getClearDiv());
    book_Div.append(getButtonDiv());
    return book_Div;
}

function getClearDiv() {
    return $('<div/>', { class : 'clear10' } );
}

function getURLTable(cnt) {
    var table = getTable();
    table.append(($('<tr/>')).append($('<th/>', { text : 'URL' + (cnt + 1) })));
    table.append($('<tr/>').append(($('<td/>')).append(($('<textarea/>', { id : 'output' + (cnt + 1), style : 'border:1px solid black;' })))));
    return table;
}

function getButtonDiv() {
    var buttonDiv = ($('<div/>', { style : 'padding-top:5px; padding-bottom:5px;' } ));
    var button = ($('<button/>', { name : 'copy', text : '복사' } ));
    buttonDiv.append(button);
    return buttonDiv;
}

function getBookDiv(cnt) {
    var bookDiv = ($('<div/>', { id : 'book1' + (cnt + 1) } ));
    return bookDiv;
}

function setHeight() {
    $(".account").innerHeight(window.innerHeight);
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
        clearOutputDiv();
        initGiftCodeArray();
        setGiftCodeArray();
        showCount();
        showOutput();
        show();
        initCopy();
        setHeight();
    });
}

function clearOutputDiv() {
    $("#outputDiv").empty();
}

function initCopy() {
    $("[name=copy]").on("click", function() {
        $("[name=copy]").css("background-color", "#f0f0f0").css("border", "1px solid black");
        $(this).css("background-color", "#47E1A8");
        var value = $(this).parents("div").parents("div").children("table").find("textarea:eq(0)").val();
        console.log(value);
        navigator.clipboard.writeText(value);
    });
}

function initGiftCodeArray() {
    giftCodeArray = new Array();
}

function setGiftCodeArray() {
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
    if (giftCode.length == 24) {
        giftCode = giftCode.insertAt(16, '_');
        giftCode = giftCode.insertAt(12, '-');
        giftCode = giftCode.insertAt(8, '-');
        giftCode = giftCode.insertAt(4, '-');
        giftCodeArray.push(giftCode);
        giftCode = "";
    }
}

function showCount() {
    $("#count").text(giftCodeArray.length);
}

function showOutput() {
    var output = "";
    for (var i = 0; i < giftCodeArray.length; i++) {
        output += giftCodeArray[i];
        if (i % 10 == 9) {
            output += "\n";
        } else if (i != giftCodeArray.length - 1) {
            output += ",";
        }
        output += "\n";
    }
    $("#output").val(output);
}

function show() {
    var tempGiftCodeArray = new Array();
    var cnt = 0;
    for (var i = 0; i < giftCodeArray.length; i++) {
        tempGiftCodeArray.push(giftCodeArray[i]);
        if (i == giftCodeArray.length - 1 || i % 10 == 9) {
            makeHtml(cnt);
            showOutputURL(tempGiftCodeArray, cnt);
            showGiftCode(tempGiftCodeArray, cnt);
            cnt++;
            tempGiftCodeArray = new Array();
        }
    }
}

function showOutputURL(tempGiftCodeArray, cnt) {
    var output = $("#outputHidden").val();
    var output = output.split("#GIFT_CODE").join(tempGiftCodeArray);
    $("#output" + (cnt + 1)).val(output);
}

function showGiftCode(tempGiftCodeArray, cnt) {
    var titleArray = new Array('순번', '번호');
    var valueArray = new Array();
    for (var i = 0; i < tempGiftCodeArray.length; i++) {
        var giftCode = tempGiftCodeArray[i];
        var code = giftCode.split("-").join("");
        code = code.split("_").join("");
        valueArray.push(new Array((i + 1), code.substr(0, 4), code.substr(4, 4), code.substr(8, 4), code.substr(12, 4), code.substr(16, 8)));
    }
    setAccountDiv1("#book1" + (cnt + 1), titleArray, valueArray);
}

function setAccountDiv1(divId, titleArray, valueArray) {
    $(divId).empty();
    setTable(divId, titleArray, valueArray);
}

function setTable(divId, titleArray, valueArray) {
    var table = getTable();
    setTitle(table, titleArray);
    setContents(table, valueArray);
	$(divId).append(table);
}

function setTitle(table, titleArray) {
    var tr = ($('<tr/>'));
    tr.append($('<th/>', { align : 'center', width : '20%' }).append($('<font/>', { text : titleArray[0] } )));
    tr.append($('<th/>', { align : 'center', width : '80%', colspan : 5 }).append($('<font/>', { text : titleArray[1] } )));
    table.append(tr);
}

function setContents(table, valueArray) {
    for (var value of valueArray) {
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
        table.append(tr);
    }
}

function getTable() {
    return $('<table/>', { class : 'table table-bordered table-striped' });
}

String.prototype.insertAt = function(index, str) {
    return this.slice(0, index) + str + this.slice(index)
}