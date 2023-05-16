// 紀錄選擇的選項和題目
let selectedOptions = [];
let selectedQuestions = [];

// 選項元素的點擊事件處理函式
function selectOption(option) {
    if (option.classList.contains('selected')) {
        // 如果選項已經被選擇，則取消選擇並刪除相應的線條
        option.classList.remove('selected');
        const index = selectedOptions.indexOf(option);
        selectedOptions.splice(index, 1);
        document.getElementById(`line${index}`).remove();

        // 同時取消選擇相應的問題
        selectedQuestions[index].classList.remove('selected');
        selectedQuestions.splice(index, 1);
    } else if (!selectedOptions.includes(option) && selectedQuestions.length > 0) {
        // 選擇新的選項並加上樣式，但只有當該選項未被選擇時
        option.classList.add('selected');
        selectedOptions.push(option);

        // 創建連接線
        const line = document.createElement('div');
        line.classList.add('line');
        line.id = `line${selectedQuestions.length - 1}`; // 給線條一個唯一的ID

        // 計算選項和問題容器的位置和距離
        const question = selectedQuestions[selectedQuestions.length - 1];
        const questionRect = question.getBoundingClientRect();
        const optionRect = option.getBoundingClientRect();
        const questionCenterX = questionRect.left + questionRect.width;
        const questionCenterY = questionRect.top + questionRect.height * 2;
        const optionCenterX = optionRect.left;
        const optionCenterY = optionRect.top + optionRect.height * 2;
        const dx = optionCenterX - questionCenterX;
        const dy = optionCenterY - questionCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 設定連接線的起點、角度和長度
        line.style.width = `${distance}px`;
        line.style.transform = `rotate(${Math.atan2(dy, dx)}rad)`;
        line.style.top = `${questionCenterY + questionRect.height / 2}px`;
        line.style.left = `${questionCenterX}px`;

        document.querySelector('.game-container').appendChild(line);
    }
}

// 問題元素的點擊事件處理函式
function selectQuestion(question) {
    if (question.classList.contains('selected')) {
        // 如果問題已經被選擇，則取消選擇並刪除相應的線條
        question.classList.remove('selected');
        const index = selectedQuestions.indexOf(question);
        selectedQuestions.splice(index, 1);
        document.getElementById(`line${index}`).remove();

        // 同時取消選擇相應的選項
        selectedOptions[index].classList.remove('selected');
        selectedOptions.splice(index, 1);
    } else if (!selectedQuestions.includes(question)) {
        // 選擇新的問題並加上樣式，但只有當該問題未被選擇時
        question.classList.add('selected');
        selectedQuestions.push(question);
    }
}


// 確認按紐的點擊事件處理函式
function checkAnswers() {
    if (selectedOptions.length === 4 && selectedQuestions.length === 4) {
        let correct = true;
        for (let i = 0; i < 4; i++) {
            const correctQuestion = selectedOptions[i].getAttribute('data-question');
            if (correctQuestion !== selectedQuestions[i].id) {
                correct = false;
                break;
            }
        }
        if (correct) {
            // 答案正確
            alert('答對了！');
        } else {
            // 答案錯誤
            alert('答錯了！');
        }
    } else {
        alert('請選擇完所有選項和題目後再確認！');
    }
}
