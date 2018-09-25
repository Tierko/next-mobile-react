<?php

namespace ALS\Helper;

use Bitrix\Highloadblock\HighloadBlockTable;

/**
 * Класс для работы с элементами highload-инфоблоков
 */
class Hel {
	// =========================================================================
	// ================================= CRUD ==================================
	// =========================================================================

	/**
	 * Функция добавляет элемент в HL-блок
	 * @param string $sHLType Код HL-блока из опций модуля
	 * @param array $arFields Массив полей для добавления
	 * @return \Bitrix\Main\Entity\AddResult|bool
	 */
	public static function add($sHLType, $arFields) {
		$entity = self::getEntity($sHLType);

		$result = false;

		if ($entity) {
			try {
				$result = $entity::add($arFields);
			} catch (\Exception $e) {
				return null;
			}
		}

		return $result;
	}


	/**
	 * Функция возвращает массив данных из highload-блока по входным параметрам
	 * @param string $sHLType Код HL-блока из опций модуля
	 * @param array $arParams Массив параметров выборки элементов
	 * @return array Массив записей, ключи массива соответствуют ID записей
	 */
	public static function getList($sHLType, array $arParams = Array()) {
		\CModule::IncludeModule('highloadblock');

		$entity = self::getEntity($sHLType);
		$rsData = $entity::getList($arParams);
		$arResult = Array();

		while ($arData = $rsData->Fetch()) {
			// Переводим дату в строку
			if ($arData['UF_DATE']) {
				$arData['UF_DATE'] = $arData['UF_DATE']->toString();
			}

			// Сохранение массива с привязкой к ID, если есть (как правило)
			if ($arData["ID"]) {
				$arResult[$arData["ID"]] = $arData;
			} else {
				$arResult[] = $arData;
			}
		}

		return $arResult;
	}


	/**
	 * Функция обновляет параметры записи в базе
	 * @param string $sHLType Тип HL-блока
	 * @param int $ID ID записи
	 * @param array $arFields Массив обновляемых параметров
	 * @return bool
	 */
	public static function update($sHLType, $ID, $arFields) {
		$result = false;
		$entity = self::getEntity($sHLType);

		if ($entity) {
			$result = $entity::update($ID, $arFields);
		}

		return $result;
	}


	/**
	 * Функция удаляет запись с указанным ID
	 * @param string $sHLType Код HL-блока из опций модуля
	 * @param int $ID ID записи
	 * @return boolean true - успешно и false в противном случае
	 */
	public static function delete($sHLType, $ID) {
		if (!intval($ID)) {
			return null;
		}

		$entity = self::getEntity($sHLType);
		$result = $entity::delete($ID);

		// Проверка результата
		if ($result->isSuccess()) {
			return true;

		} else {
			$err_list = '';
			foreach ($result->getError() as $error)
				$err_list .= $error->getMessage() . '; ';

			echo $err_list;
		}

		return false;
	}


	// =========================================================================
	// ======================== ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ =========================
	// =========================================================================

	public static function getEntity($sHLBlockCode) {
		if (!$sHLBlockCode) {
			return null;
		}

		\Bitrix\Main\Loader::includeModule('highloadblock');

		if (is_numeric($sHLBlockCode)) {
			$iIblockID = (int) $sHLBlockCode;

		} else {
			$rsData = HighloadBlockTable::getList(Array(
				'select' => Array('ID', 'NAME'),
				'filter' => Array('NAME' => $sHLBlockCode),
			));

			if ($arItem = $rsData->Fetch()) {
				$iIblockID = (int) $arItem['ID'];
			}
		}


		if ($iIblockID) {
			$arHLBlock = HighloadBlockTable::getById($iIblockID)->fetch();
			$obEntity = HighloadBlockTable::compileEntity($arHLBlock);
			$strEntityDataClass = $obEntity->getDataClass();

			return $strEntityDataClass;

		} else {
			return false;

		}
	}

}
