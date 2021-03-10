// 現在の入力中の人を調べて「入力中」を表示する関数(typeB 入力している人がいますと表示)
function getTypingNow() {
    let requestURL = "get_typing.php?room_id="+room_id;
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        const enteringDataNow = request.response;
        let datetimeNow = new Date(enteringDataNow[0].datenow.replace(/-/g,"/"));
        for (let i = 1; i < enteringDataNow.length; i++) {
            let typingUserID = enteringDataNow[i].typing_user_id;
            let typingRegistedDatetime = new Date(enteringDataNow[i].regist_datetime.replace(/-/g,"/"));
            if (datetimeNow.getTime() - typingRegistedDatetime.getTime() < 9900 && userIdNow != typingUserID) {
                let tmpTxt = '入力している人がいます';
                document.getElementById('typing_status_area').textContent = tmpTxt;
                return;
            }
        }
        document.getElementById('typing_status_area').textContent = "誰も入力していません";
    }
}

// 1357ミリ秒ごとに繰り返し入力中の人を調べる
var intvlGTN = setInterval(getTypingNow, 1357);
