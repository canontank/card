function setDataList(url, data, keyList, cashKeyList, dataList) {
    $.ajax({
        type : "GET",
        url : url,
        data : data,
        success : function(rows) {
            for (var row of rows) {
                dataList.push(getData(row, keyList, cashKeyList));
            }
            execute();
        },
        error : function() {
            setDataList(url, data, keyList, cashKeyList, dataList);
        }
    });
}

function getData(row, keyList, cashKeyList) {
    var data = new Array();
    for (var key of keyList) {
        var value = row[key];
        if (cashKeyList.includes(key)) {
            value = value.replaceAll(",", "") * 1;
        }
        data.push(value);
    }
    return data;
}