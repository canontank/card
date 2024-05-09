var imgList = new Array(
	'2022-03', '2022-04', '2022-05_1', '2022-05_2', '2022-06', '2022-07', '2022-08', '2022-08_2', '2022-09', '2022-10', '2022-11',
	'2023-04', '2023-07_1', '2023-07_2', '2023-07_3', '2023-09', '2023-10_1', '2023-10_2', '2023-10_3', '2023-11_1', '2023-11_2',
	'2024-01', '2024-03', '2024-04', '2024-04_02', '2024-05'
);
var index = imgList.length - 1;

$(function() {
	setTitle();
	clickPrevBtn();
	clickNextBtn();
	changeTitle();
    setImage();
});

function setTitle() {
	for (var img of imgList) {
		$("#title").append("<option value=" + img + ">" + img + "</option>");
	}
}

function clickPrevBtn() {
    $("#prevBtn").click(function() {
		if (index == 0)
			return;
        index -= 1;
		setImage();
    });
}

function clickNextBtn() {
    $("#nextBtn").click(function() {
		if (index == imgList.length - 1)
			return;
        index += 1;
		setImage();
    });
}

function changeTitle() {
	$("#title").change(function() {
		index = imgList.indexOf($(this).val());
		setImage();
	});
}

function setImage() {
	$('#title').val(imgList[index]);
	$('#event').html('');
    $('#event').append($('<div/>', {})
        .append($('<img/>', { src : 'img/' + imgList[index] + '.jpg' }))
    );
}
