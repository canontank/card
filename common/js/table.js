function setTable(parentDivId, divId, header, isTh, titleArray, valueArray, widthArray) {
    if (valueArray.length == 0)
        return;
    makeDiv(parentDivId, divId);
    setHeader(divId, header);
    var table = getTable();
    setTitle(table, titleArray, widthArray);
    setContents(table, valueArray, isTh);
    $(divId).append(table);
}

function makeDiv(parentDivId, divId) {
    $(parentDivId).append(
        $('<div/>', { id : divId.replace("#", ""), style : 'margin-bottom : 10px;' } )
    );
}

function setHeader(divId, text) {
    $(divId).append(
        $('<table/>').append(
            $('<tr/>', { height : '30', valign : 'bottom' }).append(
                $('<td/>', { class : 'accountHeader' }).append(
                    $('<font/>', { text : '[ ' + text + ' ]' } )
                )
            )
        )
    );
}

function getTable() {
    return $('<table/>', { class : 'table table-bordered table-striped' });
}

function setTitle(table, titleArray, widthArray) {
    var tr = ($('<tr/>'));
    for (var i = 0; i < titleArray.length; i++) {
        var width = (widthArray == null) ? (100 / titleArray.length) : widthArray[i];
        tr.append($('<th/>', { align : 'center', width : width + '%' }).append($('<font/>', { text : titleArray[i] } )));

    }
    table.append(tr);
}

function setContents(table, valueArray, isTh) {
    for (var value of valueArray) {
        var tr = ($('<tr/>'));
        for (var i = 0; i < value.length; i++) {
            tr.append($(getTd(isTh, i), { align : getAlign(value[i]) }).append($('<font/>', { text : getText(value[i]), color : getColor(isTh, i, value[i]) })));
        }
        table.append(tr);
    }
}

function getTd(isTh, index) {
    if (isTh && index == 0)
        return '<th/>';
    return '<td/>';
}

function getAlign(value) {
    if (!isNaN(value) || !isNaN(value.replace("%", "")))
        return 'right';
    return 'center';
}

function getText(value) {
    if (!isNaN(value))
        return getCommaValue(value);
    if (isDate(value))
        return getDateValue(value);
    return value;
}

function getCommaValue(value) {
    return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
}

function getDateValue(value) {
    return new Date(value).format("yyyy-MM-dd (E)");
}

function getColor(isTh, index, value) {
    if (isTh && index == 0)
        return "white";
    if (!isNaN(value) && value < 0)
        return "red";
    if (isDate(value)) {
        return getDayColor(value);
    }
    return "black";
}

function isDate(value) {
    return /^\d{4}-\d{2}-\d{2}$/.test(value); // isDate
}

function getDayColor(value) {
	var day = new Date(value).format("E");
	if (day == "토") {
		return "blue";
	} else if (day == "일") {
		return "red";
	}
    return "black";
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