function initHeight() {
    $(window).resize(setHeight);
    setHeight();
}

function setHeight() {
    $(".account").innerHeight(window.innerHeight);
}