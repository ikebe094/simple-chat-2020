<?php
$res = null;
$pdo_conn = null;
$sql = null;

date_default_timezone_set('Asia/Tokyo');
$date = date("Y-m-d H:i:s");
$uname_v = $_GET["uname"];
$uid_v = $_GET["uid"];

// ユーザーIDが無い場合は登録せず終了
if (is_null($uid_v)) {
    exit();
}

// ユーザー名が無い場合は名無しさんにする
if (is_null($uname_v)) {
    $uname_v = "名無しさん";
}

// ホスト名、DB名、サーバーでPHPを実行する際のユーザー名・パスワードを指定する
$host_url = '****';
$db_name = '****';
$php_user = '****';
$php_pass = '****';

// ルーム名をURLの引数で指定し、テーブル名を整形する
$room_id_v = $_GET['room_id'];
if (is_null($room_id_v)) {
    exit();
}
$table_name = $room_id_v . "_typing";
$host_dbname = 'pgsql:host=' . $host_url . ';dbname=' . $db_name . ';';

try {
    $pdo_conn = new PDO($host_dbname, $php_user, $php_pass);
    $sql = "INSERT INTO $table_name (
	user_id, user_name, regist_datetime
) VALUES (
	'$uid_v', '$uname_v','$date'
)";
    $res = $pdo_conn->query($sql);
    var_dump($res);
} catch (PDOException $e) {
    var_dump($e->getMessage());
}

$pdo_conn = null;
