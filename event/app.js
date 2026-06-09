document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = images.length - 1;

    // DOM 요소 선택
    const selectEl = document.getElementById('image-select');
    const imgEl = document.getElementById('current-image');
    const imageWrapper = document.getElementById('image-wrapper');
    
    // 버튼 요소 선택
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // 1. 콤보박스(select) 초기화
    images.forEach((img, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = img;
        selectEl.appendChild(option);
    });

    // 2. 화면 및 이미지 업데이트 함수
    function updateView() {
        if (images.length === 0) return;
        
        // 배열의 파일명 뒤에 자동으로 .jpg 확장자를 추가합니다.
        const currentFile = images[currentIndex] + '.jpg';
        const imagePath = 'img/' + currentFile;
        const targetIndex = currentIndex; // 현재 인덱스를 저장해 빠른 클릭 시 꼬임 방지
        
        // 자연스러운 전환 효과를 위해 투명도 조절
        imgEl.style.opacity = 0;
        
        // 새 이미지를 백그라운드에서 미리 로드합니다.
        const tempImg = new Image();
        tempImg.onload = () => {
            // 사용자가 버튼을 빠르게 여러 번 눌렀을 경우, 마지막 요청한 이미지만 표시되도록 확인
            if (targetIndex === currentIndex) {
                imgEl.src = imagePath;
                imgEl.style.opacity = 1;
            }
        };
        tempImg.src = imagePath;

        // 콤보박스 값 업데이트
        selectEl.value = currentIndex;

        // 첫 이미지, 마지막 이미지에 따른 버튼 비활성화 처리
        prevBtn.disabled = (currentIndex === 0);
        nextBtn.disabled = (currentIndex === images.length - 1);
    }

    // 3. 버튼 클릭 이벤트
    const goPrev = () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateView();
        }
    };
    const goNext = () => {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateView();
        }
    };

    prevBtn.addEventListener('click', goPrev);
    nextBtn.addEventListener('click', goNext);

    // 4. 콤보박스 변경 이벤트
    selectEl.addEventListener('change', (e) => {
        currentIndex = parseInt(e.target.value, 10);
        updateView();
    });

    // 5. 모바일 터치 스와이프 기능 (좌우 스냅 지원)
    let touchStartX = 0;
    let touchEndX = 0;

    imageWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    imageWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});

    function handleSwipe() {
        const swipeThreshold = 40; // 스와이프 인식 최소 픽셀 (민감도 조절)
        
        if (touchStartX - touchEndX > swipeThreshold) {
            goNext(); // 왼쪽으로 스와이프 -> 다음 이미지
        } else if (touchEndX - touchStartX > swipeThreshold) {
            goPrev(); // 오른쪽으로 스와이프 -> 이전 이미지
        }
    }

    // 초기 렌더링 실행
    updateView();
});