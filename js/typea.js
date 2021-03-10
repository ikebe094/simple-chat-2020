// 現在の入力中の人を調べて「入力中」を表示する関数(typeA 入力している人の名前を表示する)
function getTypingNow() {
    let listTypingNow = [];
    let listTypingUserName = [];
    let requestURL = "get_typing.php?room_id="+room_id;
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        const enteringDataNow = request.response;
        let datetimeNow = new Date(enteringDataNow[0].datenow.replace(/-/g,"/"));
        console.log(datetimeNow) //safari対応確認
        for (let i = 1; i < enteringDataNow.length; i++) {
            let typingUserID = enteringDataNow[i].typing_user_id;
            let typingRegistedDatetime = new Date(enteringDataNow[i].regist_datetime.replace(/-/g,"/"));
            if (datetimeNow.getTime() - typingRegistedDatetime.getTime() < 9900 && userIdNow != typingUserID) {
                if (!listTypingNow.includes(typingUserID)) {
                    listTypingNow.push(typingUserID);
                    listTypingUserName.push(enteringDataNow[i].typing_user_name);
                }
            }
        }
        if (listTypingNow.length) {
            let tmpTxt = listTypingUserName.join('、') + ' が入力しています';
            document.getElementById('typing_status_area').textContent = tmpTxt;
        } else {
            document.getElementById('typing_status_area').textContent = "誰も入力していません"
        }
    }
}

// 1357ミリ秒ごとに繰り返し入力中の人を調べる
var intvlGTN = setInterval(getTypingNow, 1357);
