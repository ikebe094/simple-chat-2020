<?php
$sql = null;
$res = null;
$dbh = null;

// ホスト名、DB名、サーバーでPHPを実行する際のユーザー名・パスワードを指定する
$host_url = '****';
$db_name = '****';
$php_user = '****';
$php_pass = '****';

date_default_timezone_set('Asia/Tokyo');
$date = array("datenow"=>date("Y-m-d H:i:s"));

// ルーム名をURLの引数で指定し、テーブル名を整形する
$room_id_v = $_GET['room_id'];
if (is_null($room_id_v)) {
    exit();
}
$table_name = $room_id_v . "_typing";
$host_dbname = 'pgsql:host=' . $host_url . ';dbname=' . $db_name . ';';

try {
    $dbh = new PDO($host_dbname, $php_user, $php_pass);
    $sql = "SELECT * FROM $table_name";
    $res = $dbh->query($sql);
    $typing_data = array();
    foreach ($res as $value) {
        $typing_data[] = array(
            'typing_user_id' => $value['user_id'],
            'typing_user_name' => $value['user_name'],
            'regist_datetime' => $value['regist_datetime'],
        );
    }
    array_unshift($typing_data, $date);
    echo json_encode($typing_data);
} catch (PDOException $e) {
    echo $e->getMessage();
    die();
}
$dbh = null;
