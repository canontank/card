var url = "https://script.google.com/macros/s/AKfycby0MRiCzRAqQcJiZs_n8e6wmLkSi4ON4sSIsDCeSEKJeuz5p0Gk_B4UXbC5eWkTnWwO/exec";
var data = {
    "cmd" : "get"
};
var keyList = new Array('날짜', '카드사', '카드명', '구매처', '충전처', '종류', '수수료', '원가', '단가', '수량');
var cashKeyList = new Array('원가', '단가', '수량');
var dataList = new Array();
var thisMonthDataList = new Array();

var notiWidthArray = new Array(25, 75);
var notiTitleArray = new Array('구분', '내용');
var notiValueArray = new Array(
    //new Array('샤롯데', '지마켓/옥션 40만, 티몬/위메프 50만'),
    new Array('딥에코', '티몬, 위메프, 쿠팡, 지마켓, 옥션, 11번가'),
    //new Array('욜로', '티몬, 위메프, 쿠팡'),
    new Array('SKT', '제약 없음 (실적용)'),
    new Array('KT NU', '제약 없음 (실적용)'),
    new Array('LG NU', '제약 없음 (실적용)'),
    //new Array('스마트애니', '스마트로, 이니시스, KICC'),
    new Array('하이마트', '제약 없음 (실적용)'),
    //new Array('GOAT', '제약 없음'),
    new Array('신세계2', 'SSG, 이마트몰'),
    new Array('신세계SC2', 'SSG, 이마트몰'),
    new Array('신세계4', 'SSG, 이마트몰'),
    new Array('신세계5', 'SSG, 이마트몰'),
    new Array('이마트5', 'SSG, 이마트몰'),
    new Array('신세계7', 'SSG, 이마트몰'),
    new Array('지엔미', 'SSG, 이마트몰'),
    new Array('애니패스', 'SSG, 이마트몰'),
    new Array('CMA', 'SSG, 이마트몰'),
    new Array('위클리', '주말(토/일) 2% 할인 (평일 실적 필요)'),
    new Array('딥온', '간편결제 (신한플레이, 스마일페이, SK페이)'),
    new Array('쿠키', '지마켓, 11번가'),
    new Array('쿠키런', '지마켓, 11번가'),
    new Array('람다람', '지마켓, 11번가'),
    new Array('총몇명', '지마켓, 11번가'),
    new Array('야코', '지마켓, 11번가'),
    new Array('스무살', '지마켓, 11번가'),
    new Array('선불교통', '지마켓, 11번가'),
    new Array('12세후불', '지마켓, 11번가'),
    new Array('스마트캐시백', '건당 50만 이상 결제'),
    //new Array('지엔미체크', 'SSG 10만'),
    //new Array('애니패스체크', 'SSG 10만'),
    //new Array('W지엔미', 'SSG 10만'),
    //new Array('W애니패스', 'SSG 10만'),
    new Array('국민행복', '지마켓, 옥션, 인터파크 (월 2회, 건당 10만)'),
    new Array('주거래', '티몬, 위메프, 쿠팡, 지마켓, 옥션, 11번가'),
    new Array('4tune', '티몬, 위메프, 쿠팡 (스마일페이/SK페이 불가)'),
    new Array('판타스틱', '티몬 10만 결제 (일 1회, 월 4회)'),
    new Array('한베가족', '지마켓, 옥션 (일 1회, 월 2회)'),
    new Array('롤챔코', '지마켓, 옥션 (일 1회, 월 2회)'),
    new Array('K-패스', '지마켓, 옥션 (일 1회, 월 2회)'),
    new Array('더나은', '제약 없음 (실적용)'),
    new Array('페이코', '제약 없음 (1% 적립)'),
    new Array('네이버', '혜택 없음')
);

var chargeTitleArray = new Array('구분', '해피머니', '북앤라이프', '컬쳐랜드', '문화상품권', 'SSG', '신세계', '현대');
var chargeLimitArray = new Array(
    new Array('모빌리언스', 0, 0, 0, 0, 0, 0, 0),
    new Array('페이코', 0, 0, 200000, 100000, 0, 0, 0),
    new Array('팔라고', 0, 0, 0, 0, 0, 0, 0),
    new Array('모바일팝', 0, 0, 0, 0, 0, 0, 0),
    new Array('머니트리', 0, 0, 0, 0, 0, 0, 0),
    new Array('010pay', 0, 0, 0, 0, 0, 0, 0),
    new Array('웰컴페이', 0, 0, 0, 0, 0, 0, 0),
    new Array('메타클럽', 0, 0, 0, 0, 0, 0, 0),
    new Array('포인트로페이', 0, 5000000, 0, 2000000, 0, 0, 0),
    new Array('하나머니', 0, 0, 0, 0, 0, 0, 0),
    new Array('마일벌스', 0, 66000000, 0, 0, 0, 0, 0),
    new Array('페이북', 0, 0, 200000, 0, 0, 0, 0),
    new Array('네이버', 0, 0, 1000000, 200000, 0, 0, 0),
    new Array('스타비즈', 0, 0, 0, 0, 0, 0, 0),
    new Array('기프트밸류', 0, 0, 0, 5000000, 0, 0, 0),
    new Array('기프트플레이', 0, 0, 0, 5000000, 0, 0, 0),
    new Array('SSG', 0, 0, 0, 0, 2000000, 0, 0),
    new Array('우현', 0, 0, 0, 0, 0, 99000000, 99000000),
    new Array('우천', 0, 0, 0, 0, 0, 99000000, 99000000),
    new Array('엑스이', 0, 0, 0, 0, 0, 99000000, 99000000),
    new Array('씨티페이', 0, 0, 0, 0, 0, 99000000, 99000000),
    new Array('기프너스', 0, 0, 0, 0, 0, 99000000, 99000000)
);

var cardNameList = new Set();

var cardTitleArray = new Array('구분', '상품권', '거래가', '마진');
var cardValueArray = new Array();

var giftTitleArray = new Array('구분', '충전한도', '충전금액', '남은금액');
var giftTotalValueArray = new Array();
var giftValueArray = new Array();

var bookWidthArray = new Array(13, 9, 10, 10, 10, 10, 10, 10, 10, 8);
var bookTitleArray = new Array('날짜', '카드사', '카드명', '구매처', '충전처', '종류', '수수료', '원가', '단가', '수량');

$(function() {
    initHeight();
    initDate(2022);
    setDataList();
});

function setDataList() {
    dataList = getDataList(url, data, keyList, cashKeyList);
}

function execute() {
    set();
    show();
}

function set() {
    setThisMonthDataList();
    setCardNameList();
    setChargeLimitArray();
    setCardValueArray();
    setGiftValueArray();
    setGiftTotalValueArray();
}

function setThisMonthDataList() {
    thisMonthDataList = new Array();
    for (var data of dataList) {
        if (!isThisMonth(data[0]))
            continue;
        thisMonthDataList.push(data);
    }
}

function setCardNameList() {
    cardNameList = new Set();
    for (var cardValue of notiValueArray) {
        cardNameList.add(cardValue[0]);
    }
    for (var data of thisMonthDataList) {
        if (data[2] == "-")
            continue;
        cardNameList.add(data[2]);
    }
}

function setChargeLimitArray() {
    for (var data of thisMonthDataList) {
        if (data[4] == "-")
            continue;
        if (isDuplicate(chargeLimitArray, data[4]))
            continue;
        chargeLimitArray.push(new Array(data[4], 0, 0, 0, 0, 0, 0, 0));
    }
}

function isDuplicate(arr, chargeName) {
    for (var obj of arr) {
        if (obj[0] == chargeName)
            return true;
    }
    return false;
}

function setCardValueArray() {
    cardValueArray = new Array();
    for (var cardName of cardNameList) {
        var giftArray = new Array(0, 0, 0, 0);
        for (var data of thisMonthDataList) {
            if (cardName != data[2])
                continue;
            giftArray[0] += (data[7] * data[9]);
            giftArray[1] += (data[8] * data[9]);
            giftArray[2] += (data[7] * getRate(data[6])) * data[9];
        }
        giftArray[3] = (giftArray[2] - giftArray[1]);
        cardValueArray.push(new Array(cardName, giftArray[0], giftArray[1], giftArray[3]));
    }
}

function getRate(rate) {
    if (rate != "")
        return 1 - (rate / 100);
    return 0.92;
}

function setGiftValueArray() {
    giftValueArray = new Array();
    for (var i = 1; i < chargeTitleArray.length; i++) {
        var array = new Array();
        for (var chargeLimit of chargeLimitArray) {
            var value = 0;
            for (var data of thisMonthDataList) {
                if (data[4] != chargeLimit[0])
                    continue;
                if (data[5] != chargeTitleArray[i])
                    continue;
                value += (data[7] * data[9]);
            }
            if (chargeLimit[i] == 0 && value == 0)
                continue;
            var remain = (chargeLimit[i] - value < 0) ? 0 : chargeLimit[i] - value;
            array.push(new Array(chargeLimit[0], chargeLimit[i], value, remain));
        }
        giftValueArray.push(array);
    }
}

function setGiftTotalValueArray() {
    giftTotalValueArray = new Array();
    for (var i = 0; i < giftValueArray.length; i++) {
        var giftArray = giftValueArray[i];
        var totalArray = new Array("", 0, 0, 0);
        totalArray[0] = chargeTitleArray[i + 1];
        for (var array of giftArray) {
            totalArray[1] += array[1];
            totalArray[2] += array[2];
            totalArray[3] += array[3];
        }
        if (totalArray[1] == 0 && totalArray[2] == 0)
            continue;
        giftTotalValueArray.push(totalArray);
    }
}

function show() {
    showBook1();
    showBook2();
}

function showBook1() {
    $("#book1").empty();
    setTable("#book1", "#book11", "카드", true, cardTitleArray, cardValueArray);
    setTable("#book1", "#book12", "합계", true, giftTitleArray, giftTotalValueArray);
    for (var i = 0; i < giftValueArray.length; i++) {
        if (giftValueArray[i].length == 0)
            continue;
        setTable("#book1", "#book" + (i + 13), chargeTitleArray[i + 1], true, giftTitleArray, giftValueArray[i]);
    }
    setTable("#book1", "#book" + (giftValueArray.length + 13), '주의사항', true, notiTitleArray, notiValueArray, notiWidthArray);
}

function showBook2() {
    $("#book2").empty();
    setTable("#book2", "#book21", '상품권', false, bookTitleArray, thisMonthDataList, bookWidthArray);
}