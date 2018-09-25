<?php

$eventManager = \Bitrix\Main\EventManager::getInstance();
$methodRun = ['\ALS\Internationalization', 'generateByEvent'];

$eventManager->addEventHandler('iblock', 'OnAfterIBlockSectionAdd',    $methodRun);
$eventManager->addEventHandler('iblock', 'OnAfterIBlockSectionUpdate', $methodRun);
$eventManager->addEventHandler('iblock', 'OnAfterIBlockSectionDelete', $methodRun);

$eventManager->addEventHandler('iblock', 'OnAfterIBlockElementAdd',    $methodRun);
$eventManager->addEventHandler('iblock', 'OnAfterIBlockElementUpdate', $methodRun);
$eventManager->addEventHandler('iblock', 'OnAfterIBlockElementDelete', $methodRun);
