<?php

// Очистка кеша инфоблоков
$eventManager = \Bitrix\Main\EventManager::getInstance();
$methodRun = '\ALS\Project\CacheManager::processingEvent';

$eventManager->addEventHandler('iblock', 'OnAfterIBlockElementAdd',    $methodRun);
$eventManager->addEventHandler('iblock', 'OnAfterIBlockElementUpdate', $methodRun);
$eventManager->addEventHandler('iblock', 'OnAfterIBlockElementDelete', $methodRun);
$eventManager->addEventHandler('iblock', 'OnAfterIBlockSectionAdd',    $methodRun);
$eventManager->addEventHandler('iblock', 'OnAfterIBlockSectionUpdate', $methodRun);
$eventManager->addEventHandler('iblock', 'OnAfterIBlockSectionDelete', $methodRun);
