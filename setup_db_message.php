<?php
$res = null;
$pdo_conn = null;
$sql = null;

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
$table_name = $room_id_v . "_message";
$host_dbname = 'pgsql:host=' . $host_url . ';dbname=' . $db_name . ';';

try {
    $pdo_conn = new PDO($host_dbname, $php_user, $php_pass);
    $sql = "CREATE TABLE $table_name (
    user_id int,
    user_name varchar(50),
    send_msg_txt varchar(200),
    regist_datetime timestamp
)";
    $res = $pdo_conn->query($sql);
    var_dump($res);
} catch (PDOException $e) {
    var_dump($e->getMessage());
}
$pdo_conn = null;
