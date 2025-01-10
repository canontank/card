function getDataList(url, data, keyList, cashKeyList) {
    var dataList = new Array();
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
            getDataList(url, data);
        }
    });
    return dataList;
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