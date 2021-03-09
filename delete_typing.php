<?php
$sql = null;
$res = null;
$dbh = null;

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

$uid_v = $_GET["uid"];

try {
    $dbh = new PDO($host_dbname, $php_user, $php_pass);
    $sql = "DELETE FROM $table_name WHERE user_id = $uid_v";
    $res = $dbh->query($sql);
} catch (PDOException $e) {
    echo $e->getMessage();
    die();
}

$dbh = null;
