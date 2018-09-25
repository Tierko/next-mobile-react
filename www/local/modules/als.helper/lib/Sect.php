<?php

namespace ALS\Helper;

use Bitrix\Iblock\InheritedProperty\SectionValues;


class Sect {

	// =========================================================================
	// ================================= CRUD ==================================
	// =========================================================================

	/**
	 * Функция для добавления раздела инфоблока
	 * @param array $arParams Поля и свойства нового раздела
	 * @return int|string ID нового раздела или код ошибки в строке
	 */
	public static function add($arParams) {
		\CModule::IncludeModule('iblock');

		$arFields = $arParams;


		if ($arFields['TYPE']) {
			$iIblockID = Help::getOpt('IBLOCK_' . $arFields['TYPE'] . '_ID');
			$arFields['IBLOCK_ID'] = $iIblockID;
			unset($arFields['TYPE']);

		} elseif ($arFields['IBLOCK_CODE']) {
			$iIblockID = Help::getIblockIdByCode($arFields['IBLOCK_CODE']);
			$arFields['IBLOCK_ID'] = $iIblockID;
			unset($arFields['IBLOCK_CODE']);

		}

		$sect = new \CIBlockSection;
		if ($sectionId = $sect->Add($arFields)) {
			return $sectionId;

		}

		return 'Error: ' . $sect->LAST_ERROR;
	}


	/**
	 * Функция возвращает массив с данными о разделах инфоблока
	 * @param array $arParams Параметры выборки
	 * @return array
	 */
	public static function getList($arParams) {
		// Подключение модуля для работы с инфоблоками
		\CModule::IncludeModule('iblock');
		$typeConverter = new TypeConvert($arParams['SELECT']);

		$arResult = [];


		// Определение ID инфоблока
		if ($arParams['IBLOCK_ID']) {
			$iIblockID = (int) $arParams['IBLOCK_ID'];

		} elseif (is_numeric($arParams['TYPE'])) {
			$iIblockID = (int) $arParams['TYPE'];

		} elseif (!empty($arParams['IBLOCK_CODE'])) {
			$iIblockID = Help::getIblockIdByCode($arParams['IBLOCK_CODE'], true);

		} else {
			$iIblockID = Help::getOpt('IBLOCK_' . $arParams['TYPE'] . '_ID');

		}


		// Работа с кешем
		$bNeedQuery = true;
		$obCache = null;
		if ($arParams['CACHE']['MODE'] === 'Y') {
			$obCache = new \CPHPCache;
			$iLifeTime = $arParams['CACHE']['TIME'] ? $arParams['CACHE']['MODE'] : 3600;
			$sCacheID = serialize($arParams);
			$sCachePath = '/als.helper/sect/getList/';

			if ($obCache->InitCache($iLifeTime, $sCacheID, $sCachePath)) {
				$vars = $obCache->GetVars();
				$arResult = $vars['RESULT'];
				$bNeedQuery = false;
			}
		}
		// ---------------------------------------------------------------------


		// Если необходимо выполнить запрос в БД
		if ($bNeedQuery) {
			// Определение направления сортировки
			if ($arParams['ORDER']) {
				$arOrder = $arParams['ORDER'];

			} else {
				$arOrder = Array('SORT' => 'ASC');

			}


			// Определение фильтра
			if ($arParams['FILTER']) {
				$arFilter = $arParams['FILTER'];

			} else {
				$arFilter = Array();

			}

			if ($iIblockID) {
				$arFilter['IBLOCK_ID'] = $iIblockID;

			}


			// Определение постраничной навигации
			if ($arParams['NAV']) {
				$arNav = $arParams['NAV'];
			} else {
				$arNav = false;
			}


			// Определение полей выборки
			$arSelect = array_merge($typeConverter->getSelect(), Array('ID', 'IBLOCK_ID'));


			// Выборка результата из базы
			$rsSection = \CIBlockSection::GetList(
				$arOrder,
				$arFilter,
				$arParams['bIncCnt'],
				$arSelect,
				$arNav
			);

			$arResult = Array();
			if ($arParams['GET_NEXT'] === 'Y') {
				while ($arSection = $rsSection->GetNext()) {
					if ($arSection['ID']) {
						$key = $arSection['ID'];
						$arResult[$key] = $arSection;
					} else {
						$arResult[] = $arSection;
					}
				}

			} else {
				while ($arSection = $rsSection->Fetch()) {
					if ($arSection['ID']) {
						$key = $arSection['ID'];
						$arResult[$key] = $arSection;
					} else {
						$arResult[] = $arSection;
					}
				}

			}
		}


		// Приведем массив к нужным типам данных
		$arResult = $typeConverter->convertDataTypes($arResult);


		if ($arParams['AS_ARRAY'] === 'Y') {
			$arResult = array_values($arResult);
		}


		if ($bNeedQuery
			&& $arParams['CACHE']['MODE'] === 'Y'
			&& $obCache->StartDataCache()) {

			$obCache->EndDataCache(Array('RESULT' => $arResult));
		}


		return $arResult;
	}


	/**
	 * Метод обновляет параметры раздела
	 * @param int $ID ID раздела
	 * @param array $arParams Поля раздела
	 * @return bool
	 */
	public static function update($ID, $arParams) {
		$result = null;

		if (is_numeric($ID) && is_array($arParams)) {
			\CModule::IncludeModule('iblock');

			$section = new \CIBlockSection;
			$resultUpdate = $section->Update($ID, $arParams);

			if ($resultUpdate === true) {
				$result = $resultUpdate;
			} else {
				$result = $section->LAST_ERROR;
			}

		} else {
			$result = 'Error in ID or fields';

		}

		return $result;

	}


	// =========================================================================
	// ======================== ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ =========================
	// =========================================================================

	/**
	 * Функция деактивирует элемент с указанным кодом
	 * @param int $ID ID элемента
	 * @return bool
	 */
	public static function deactivate($ID) {
		return self::update(
			$ID,
			['ACTIVE' => 'N']
		);
	}


	/**
	 * Функция возвращает значение поля раздела инфоблока
	 * @param int $ID ID раздела
	 * @param string $sField Символьный код поля
	 * @return string
	 */
	public static function getField($ID, $sField) {
		if (!is_numeric($ID)) {
			return null;
		}

		$arSectionList = self::getList(Array(
			'FILTER' => Array('ID' => $ID),
			'SELECT' => Array($sField),
		));

		$arSection = end($arSectionList);


		$result = null;
		if ($arSection[$sField]) {
			$result = $arSection[$sField];
		}


		return $result;
	}


	/**
	 * Функция возвращает ID раздела
	 * @param string $ib Тип инфоблока из опций модуля
	 * @param string $code Код раздела
	 * @param array $arParams Массив доп.параметров <br>
	 *    <li> Если нужно создать ненайденный раздел, то передать 'FORCE_CREATE' => 'Y'
	 * @return int ID раздела
	 */
	public static function getIdBySectionCode($ib, $code, array $arParams = Array()) {
		$iSectionID = null;

		$arSection = self::getList(Array(
			'TYPE'   => $ib,
			'FILTER' => Array('CODE' => $code),
		));

		if (count($arSection) === 0) {
			if ($arParams['FORCE_CREATE'] === 'Y') {
				$sName = $arParams['NAME'] ?: $code;

				$iSectionID = self::add(Array(
					'TYPE' => $ib,
					'CODE' => $code,
					'NAME' => $sName,
				));
			}

		} elseif (count($arSection) === 1) {
			$iSectionID = end($arSection)['ID'];

		}

		return $iSectionID;
	}


	/**
	 * Функция возвращает ID раздела
	 * @param string $code Символьный код инфоблока
	 * @param string $xml_id XML_ID раздела
	 * @return int
	 */
	public static function getIdByXmlId($code, $xml_id) {
		$result = null;

		if ($code && $xml_id) {
			$arSectionQuery = Array(
				'IBLOCK_CODE' => $code,
				'FILTER'      => Array('XML_ID' => $xml_id),
			);

			$arSectionList = self::getList($arSectionQuery);
			$arSection = array_shift($arSectionList);

			if ($arSection && $arSection['ID']) {
				$result = (int) $arSection['ID'];
			}
		}

		return $result;

	}


	/**
	 * Функция повторяет getList, но кеширует результат
	 * @param array $arParams Параметры выборки
	 * @return array
	 */
	public static function getListCache($arParams) {
		$bCacheOn = \COption::GetOptionString('main', 'component_managed_cache_on') === 'Y';
		$obCache = new \CPHPCache;
		$iLifeTime = $arParams['TIME'] ?: 3600;
		$sCacheID = serialize($arParams);
		$sCachePath = '/als.helper/sect/getListCache/';

		if ($bCacheOn && $obCache->InitCache($iLifeTime, $sCacheID, $sCachePath)) {
			$vars = $obCache->GetVars();
			$arResult = $vars['RESULT'];

		} else {
			$arResult = self::getList($arParams);
		}

		if ($obCache->StartDataCache()) {
			$obCache->EndDataCache(Array(
				'RESULT' => $arResult,
			));
		}

		return $arResult;
	}


	/**
	 * Функция возвращает свойство раздела
	 * @param string $sType Тип инфоблока к которому относится раздел
	 * @param int $ID ID раздела
	 * @param string $sCode Символьный код свойства
	 * @return mixed Значение свойства или false
	 */
	public static function getProp($sType, $ID, $sCode) {
		$arSections = self::getList(Array(
			'TYPE'   => $sType,
			'FILTER' => Array('ID' => $ID),
			'SELECT' => Array($sCode),
		));

		return (count($arSections) === 1) ? end($arSections)[$sCode] : null;
	}


	public static function getSeo($iblockId, $sectionId) {
		$props = new SectionValues($iblockId, $sectionId);
		$values = $props->getValues();

		$result = [
			'title' => $values['SECTION_META_TITLE']
				?: $values['SECTION_PAGE_TITLE'],
			'keywords' => $values['SECTION_META_KEYWORDS']
				?: $values['SECTION_PAGE_KEYWORDS'],
			'description' => $values['SECTION_META_DESCRIPTION']
				?: $values['SECTION_PAGE_DESCRIPTION'],
		];

		return $result;
	}


	/**
	 * Функция возвращает список разделов, отсортированный в порядке "полного развернутого дерева"
	 * @param array $arParams Массив с параметрами выборки. Используемые ключи <br>
	 * <li> IBLOCK_CODE
	 * <li> IBLOCK_ID
	 * <li> FILTER
	 * <li> SELECT
	 * <li> GET_NEXT
	 * @return array Данные по разделам
	 */
	public static function getTreeList($arParams) {
		\CModule::IncludeModule('iblock');
		$typeConverter = new TypeConvert($arParams['SELECT'] ?: []);

		$iIblockID = is_set($arParams['IBLOCK_CODE'])
			? Help::getIblockIdByCode($arParams['IBLOCK_CODE'])
			: $arParams['IBLOCK_ID'];

		// Определение фильтра
		$arFilter = $arParams['FILTER'] ?: Array();

		if ($iIblockID) {
			$arFilter['IBLOCK_ID'] = $iIblockID;
		}


		// Определение полей выборки
		$select = $typeConverter->getSelect();


		// Выборка результата из базы
		$rsSection = \CIBlockSection::GetTreeList($arFilter, $select);

		$arResult = Array();
		if ($arParams['GET_NEXT'] === 'Y') {
			while ($arSection = $rsSection->GetNext()) {
				if ($arSection['ID']) {
					$key = $arSection['ID'];
					$arResult[$key] = $arSection;
				} else {
					$arResult[] = $arSection;
				}
			}

		} else {
			while ($arSection = $rsSection->Fetch()) {
				if ($arSection['ID']) {
					$key = $arSection['ID'];
					$arResult[$key] = $arSection;
				} else {
					$arResult[] = $arSection;
				}
			}

		}

		if ($select) {
			$arResult = $typeConverter->convertDataTypes($arResult);
		}


		if ($arParams['AS_ARRAY'] === 'Y') {
			$arResult = array_values($arResult);
		}


		return $arResult;
	}

}
