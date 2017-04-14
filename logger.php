<?php
$data = json_decode(file_get_contents('php://input'), true);
$id = $data["tracker"];
$msg = $data["log"];
$method = $data["method"];
$sp = '&nbsp;';
$sspp = '&nbsp;';

if($method == 'log') {
	$sp = '&nbsp;&nbsp;&nbsp;';
} elseif($method == 'info' || $method == 'warn') {
	$sp = '&nbsp;&nbsp;';
} elseif($method == 'error') {
	$sp = '&nbsp;';
}

$log = "<span class=\"tracker${id} ${method}Line\" style=\"display:none;\"><span class=\"deviceid\">${id}</span>${sspp}<span class=\"${method}\">${method}</span>${sp}<span class=\"msg\">${msg}</span></span><br class=\"tracker${id}\" style=\"display:none;\"/>".PHP_EOL;

file_put_contents("log.htm", $log, FILE_APPEND | LOCK_EX);
file_put_contents("log.bak.htm", $log, FILE_APPEND | LOCK_EX);
?>