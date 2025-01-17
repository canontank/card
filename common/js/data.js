function setDataList(url, data, cashKeyList, dataList) {
    $.ajax({
        type : "GET",
        url : url,
        data : data,
        success : function(rows) {
            for (var row of rows) {
                dataList.push(getData(row, cashKeyList));
            }
            execute();
        },
        error : function() {
            setDataList(url, data, cashKeyList, dataList);
        }
    });
}

function getData(row, cashKeyList) {
    for (var key of cashKeyList) {
        row[key] = (row[key] == undefined) ? 0 : row[key].replaceAll(",", "") * 1;
    }
    return row;
}