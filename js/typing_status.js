// メッセージの入力欄で文字が変更されたらupdateValue関数を実行
const typeTextElm = document.getElementById("type-text");
typeTextElm.addEventListener('input', updateValue);

// 入力欄をクリックしたら入力を始め、フォーカスが外れたらやめたこととする(それぞれ関数を実行する)
typeTextElm.onblur = inputBlurFnc;
typeTextElm.onfocus = inputFocusFnc;

// 「入力中」という情報を送信する関数
function registTypingFnc() {
    let xhr = new XMLHttpRequest();
    let requestTxt = "?room_id=" + room_id;
    // 現在のユーザーIDが登録されていることを念の為確認
    if (userIdNow > 0) {
        requestTxt += "&uid=" + userIdNow.toString();
        if(userNameNow){
          requestTxt+="&uname="+userNameNow;
        }
        xhr.open("POST", 'regist_typing.php'+requestTxt, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                ;
            }
        }
        xhr.send();
    } else {
        // IDが取得できない場合に警告を表示
        window.alert("IDが取得できません");
    }
}

// 入力欄で文字が変更されたらupdateValue関数を実行(registTypingFuncを実行するための関数)
function updateValue(e) {
    registTypingFnc();
}

// 入力を始めたときに実行される
function inputFocusFnc() {
    registTypingFnc();
}

// 入力をやめたときに実行される
function inputBlurFnc() {
    var xhr = new XMLHttpRequest();
    let requestTxt = "?room_id=" + room_id;
    requestTxt += "&uid=" + userIdNow.toString();
    xhr.open("POST", 'delete_typing.php'+requestTxt, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            ;
        }
    }
    xhr.send();
}
