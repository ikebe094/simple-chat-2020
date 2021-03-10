// DOM構築後に実行する処理
window.onload = function () {
    // 送信ボタンが押されたらメッセージを送信する
    document.getElementById("post_btn").onclick = function () {
        sendPost();
    };
};

// メッセージを送信する関数
function sendPost() {
    var xhr = new XMLHttpRequest();
    let typedText = document.getElementById("type-text");

    // メッセージが入力されていない場合は送信しない
    if (!typedText.value) {
        window.alert("メッセージを入力してください");
        return;
    }
    let requestTxt = "?room_id=" + room_id + "&msg_txt=" + typedText.value;

    // 現在のユーザー名とIDが登録されていたら合わせて送信する(登録されているはずだけど念の為確認する)
    if (userNameNow) {
        requestTxt += "&uname=" + userNameNow;
    }
    if (userIdNow) {
        requestTxt += "&uid=" + userIdNow;
    }
    xhr.open("POST", 'regist_post.php'+requestTxt, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            ;
        }
    }
    xhr.send();
    typedText.value = '';
}

// ポップアップを表示し、今参加したユーザーの名前を取得して返す関数
function registUserName() {
    const userName = window.prompt("ユーザー名を入力してください");
    if (!userName) {
        window.alert("正しく入力されていません");
    } else {
        return userName;
    }
}

// ポップアップを表示し、今参加したユーザーのIDを取得して返す関数
function registUserId() {
    const userID = window.prompt("IDを入力してください");
    if (userID > 0) {
        window.alert("OK");
        return userID;
    } else {
        window.alert("正しく入力されていません");
    }
}

// ユーザー名が正しく登録できるまでポップアップを表示する
let userNameNow;
while (!userNameNow) {
    userNameNow = registUserName();
}

// ユーザーIDが正しく登録できるまでポップアップを表示する
let userIdNow;
while (!userIdNow) {
    userIdNow = registUserId();
}

// メッセージのJSONオブジェクトを元に画面上に表示されるメッセージを更新する
function showMessages(jsonObj) {
    const messageShowAreaElm = document.getElementById("chat-main");
    while (messageShowAreaElm.firstChild) {
        messageShowAreaElm.removeChild(messageShowAreaElm.firstChild);
    }
    for (let i = 0; i < jsonObj.length; i++) {
        let sendUsrName = document.createElement('p');
        let sendTimeStmp = document.createElement('p');
        let sendMsgTxt = document.createElement('p');
        let msgGroup = document.createElement('div');

        sendUsrName.className = "send-usr-name";
        sendTimeStmp.className = "send-time-stmp";
        sendMsgTxt.className = "send-msg-txt"
        msgGroup.className = "msg-hukidasi";

        sendUsrName.textContent = jsonObj[i].user_name;
        sendTimeStmp.textContent = jsonObj[i].send_timestamp;
        sendMsgTxt.textContent = jsonObj[i].send_msg_txt;

        msgGroup.appendChild(sendUsrName);
        msgGroup.appendChild(sendTimeStmp);
        msgGroup.appendChild(sendMsgTxt);

        messageShowAreaElm.appendChild(msgGroup);
    }
}

// 全てのメッセージを取得(して画面を更新)する関数
function getMessages() {
    let requestURL = "get_messages_all.php?room_id=" + room_id;
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        const msgAll = request.response;
        if(msgAll===null){
            return;
        }
        showMessages(msgAll);
    }
}

// 1234ミリ秒ごとに繰り返しメッセージを取得する
var intvlGNM = setInterval(getMessages, 1234);
