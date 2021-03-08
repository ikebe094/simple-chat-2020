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
$table_name = $room_id_v . "_message";
$host_dbname = 'pgsql:host=' . $host_url . ';dbname=' . $db_name . ';';

try {
    $dbh = new PDO($host_dbname, $php_user, $php_pass);
    $sql = "SELECT * FROM $table_name";
    $res = $dbh->query($sql);
    $msg_data=array();
    foreach($res as $value) {
		$msg_data[]=array(
            'user_id'=>$value['user_id'],
            'user_name'=>$value['user_name'],
            'send_msg_txt'=>$value['send_msg_txt'],
            'send_timestamp'=>$value['regist_datetime']
        );
	}
    header('Content-type: application/json');
    echo json_encode($msg_data);
} catch (PDOException $e) {
    echo $e->getMessage();
    die();
}

$dbh = null;
