<?php

// Входные параметры
$input = file_get_contents('php://input');
$requestData = $input ? json_decode($input, true) : $_REQUEST;

$requestLang = $requestData['lang'] ?: 'ru';
$query = $requestData['query'] ?: '';


// Подключение Bitrix
define('LANGUAGE_ID', $requestLang);
define('STOP_STATISTICS', true);
define('NO_KEEP_STATISTIC', true);
define('NO_AGENT_STATISTIC', true);
define('DisableEventsCheck', true);
define('BX_SECURITY_SHOW_MESSAGE', true);

require $_SERVER['DOCUMENT_ROOT'] . '/bitrix/modules/main/include/prolog_before.php';


// Определение результата
$result = null;
ob_start();


switch ($requestData['action']) {
	case 'services.getList':
		$result = \ALS\Project\Services::getItems($requestLang);
		break;

	default:
		$result = [];
}

ob_get_clean();


// Возвращаем результат
header('Content-Type: application/json; charset=utf-8');
echo json_encode($result, JSON_UNESCAPED_UNICODE);
