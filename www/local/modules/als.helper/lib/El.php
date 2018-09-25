<?php

namespace ALS\Helper;

use Bitrix\Iblock\InheritedProperty\ElementValues;


class El {

	// =========================================================================
	// ================================= CRUD ==================================
	// =========================================================================

	/**
	 * Функция для добавления элемента инфоблока
	 * @param array $arParams Поля и свойства нового элемента
	 * @return int|string ID нового элемента или код ошибки в строке
	 */
	public static function add($arParams) {
		\CModule::IncludeModule('iblock');

		$arFields = $arParams;

		// Определение ID инфоблока
		$iIblockID = null;

		if (!empty($arFields['TYPE'])) {
			$iIblockID = Help::getOpt('IBLOCK_' . $arFields['TYPE'] . '_ID');

		} elseif (!empty($arFields['IBLOCK_ID'])) {
			$iIblockID = $arFields['IBLOCK_ID'];

		} elseif (!empty($arFields['IBLOCK_CODE'])) {
			$iIblockID = Help::getIblockIdByCode($arFields['IBLOCK_CODE']);

		}

		$arFields['IBLOCK_ID'] = $iIblockID;
		unset($arFields['TYPE']);


		$el = new \CIBlockElement;
		if ($ELEMENT_ID = $el->Add($arFields)) {
			return $ELEMENT_ID;
		}

		return 'Error: ' . $el->LAST_ERROR;
	}


	/**
	 * Функция возвращает массив с данными об элементах инфоблока
	 * @param array $arParams Параметры выборки
	 * @return array
	 */
	public static function getList($arParams) {
		\CModule::IncludeModule('iblock');


		// Определение ID инфоблока
		$iIblockID = false;
		if (!empty($arParams['IBLOCK_ID'])) {
			$iIblockID = (int) $arParams['IBLOCK_ID'];

		} elseif (!empty($arParams['TYPE'])) {
			$iIblockID = Help::getOpt('IBLOCK_' . $arParams['TYPE'] . '_ID');

		} elseif (!empty($arParams['IBLOCK_CODE'])) {
			$iIblockID = Help::getIblockIdByCode($arParams['IBLOCK_CODE']);
		}


		// Определение направления сортировки
		$arOrder = Array('SORT' => 'ASC');
		if (!empty($arParams['ORDER'])) {
			$arOrder = $arParams['ORDER'];
		}


		// Определение фильтра
		$arFilter = Array();
		if (!empty($arParams['FILTER'])) {
			$arFilter = $arParams['FILTER'];
		}
		$arFilter['SHOW_HISTORY'] = 'Y';

		if ($iIblockID) {
			$arFilter['IBLOCK_ID'] = $iIblockID;
		}


		// Определение группиировки
		$arGroup = $arParams['GROUP'] ?: false;


		// Определение постраничной навигации
		$arNav = $arParams['NAV'] ?: false;


		// Определение полей выборки
		$typeConverter = new TypeConvert($arParams['SELECT'] ?: []);
		$arSelect = array_merge($typeConverter->getSelect(), Array('ID', 'IBLOCK_ID'));


		// Выборка результата из базы
		$rsElement = \CIBlockElement::GetList(
			$arOrder,
			$arFilter,
			$arGroup,
			$arNav,
			$arSelect
		);

		$arResult = Array();
		if ($arParams['GET_NEXT'] === 'Y') {
			while ($arElement = $rsElement->GetNext(true, false)) {
				if ($arElement['ID']) {
					$key = $arElement['ID'];
					$arResult[$key] = $arElement;
				} else {
					$arResult[] = $arElement;
				}
			}

		} else {
			while ($arElement = $rsElement->Fetch()) {
				if ($arElement['ID']) {
					$key = $arElement['ID'];

					if ($arResult[$key]) {
						$arResult[$key] = Arr::getMergeExt(
							$arResult[$key],
							$arElement
						);

					} else {
						$arResult[$key] = $arElement;

					}
				} else {
					$arResult[] = $arElement;
				}
			}

		}


		// Обработка результата
		if ($arParams['SELECT_PROP_NAMES'] === 'Y' && $arParams['TYPE']) {
			$arPropData = Array();
			$arPropertyList = self::getPropertyList(Array(
				'TYPE' => $arParams['TYPE'],
			));

			// todo: скорее всего в связи с типами в SELECT может не работать
			foreach ($arSelect as $sSelectCode) {
				$arMatches = Array();

				if (preg_match('/^PROPERTY_(\w+)$/', $sSelectCode, $arMatches)) {
					foreach ($arPropertyList as $arProperty) {
						if ($arProperty['CODE'] === $arMatches[1]) {
							$arPropData[$arMatches[1]] = $arProperty['NAME'];
						}
					}
				}
			}

			foreach ($arResult as $key => $arElement) {
				$arResult[$key]['PROP_NAMES'] = $arPropData;
			}
		}

		foreach ($arResult as $key => $arElement) {
			if (!is_array($arElement)) { continue; }

			foreach ($arElement as $keyField => $valField) {
				$arMatches = Array();

				if (preg_match('/^PROPERTY_(\w+)_VALUE$/', $keyField, $arMatches)) {
					if (is_string($valField)) {
						$arResult[$key]['PROP'][$arMatches[1]] = trim($valField);
					} else {
						$arResult[$key]['PROP'][$arMatches[1]] = $valField;
					}
				}
			}
		}

		if ($arParams['GET_ENUM_CODE'] === 'Y') {
			// Если необходима выборка кодов свойств типа «список»
			$arEnumXmlID = Array();

			foreach ($arResult as $key => $arElement) {
				if (!is_array($arElement)) { continue; }

				foreach ($arElement as $keyField => $valField) {
					$arMatches = Array();

					if (preg_match('/^PROPERTY_(\w+)_ENUM_ID$/', $keyField, $arMatches)) {
						// Если поле относится к свойству «список»

						if ($arEnumXmlID[$valField]) {
							$sXmlID = $arEnumXmlID[$valField];

						} else {
							$arPropEnum = \CIBlockPropertyEnum::GetByID($valField);
							$sXmlID = $arPropEnum['XML_ID'];
							$arEnumXmlID[$valField] = $sXmlID;

						}

						$arResult[$key]['PROPERTY_' . $arMatches[1] . '_XML_ID'] = $sXmlID;
					}
				}
			}
		}


		// Приведем массив к нужным типам данных
		if ($typeConverter->getTypes()) {
			$arResult = $typeConverter->convertDataTypes($arResult);
		}


		if ($arParams['AS_ARRAY'] === 'Y') {
			$arResult = array_values($arResult);
		}


		return $arResult;
	}


	/**
	 * Функция повторяет getList, но кеширует результат
	 * @param array $arParams Параметры выборки
	 * @param array $arCache Параметры кеширования
	 * @return array
	 */
	public static function getListCache(array $arParams, array $arCache = Array()) {

		$bCacheOn   = \COption::GetOptionString('main', 'component_managed_cache_on') === 'Y';
		$obCache    = new \CPHPCache;
		$iLifeTime  = $arParams['TIME'] ?: 3600;
		$sCacheID   = serialize($arParams);
		$sCachePath = '/als.helper/el/getListCache/';

		if ($arCache['USE_TAG'] === 'Y') {
			$sCachePath .= '_tag/';
		}


		if ($bCacheOn && $obCache->InitCache($iLifeTime, $sCacheID, $sCachePath)) {
			$vars = $obCache->GetVars();
			$arResult = $vars['RESULT'];

		} else {
			$arResult = self::getList($arParams);

			if ($arCache['USE_TAG'] === 'Y') {
				global $CACHE_MANAGER;
				$CACHE_MANAGER->StartTagCache($sCachePath);

				foreach ($arResult as $arItem) {
					if ($arItem['IBLOCK_ID']) {
						$CACHE_MANAGER->RegisterTag('iblock_id_' . $arItem['IBLOCK_ID']);
					}
				}

				if ($arParams['TYPE']) {
					$CACHE_MANAGER->RegisterTag('iblock_id_' . $arParams['TYPE']);
				}
			}
		}

		if ($obCache->StartDataCache()) {
			$obCache->EndDataCache(Array(
				'RESULT' => $arResult,
			));
		}


		return $arResult;
	}


	/**
	 * Функция обновляет поля и свойства элемента
	 * @param int $ID ID изменяемой записи
	 * @param array $arParams Массив полей [FIELDS] и свойств [PROPS/PROPERTY_VALUES]
	 * @return array
	 */
	public static function update($ID, $arParams) {
		\CModule::IncludeModule('iblock');


		// Поля элемента
		$arElement = $arParams['FIELDS'] ?: $arParams;

		$arRemoveFields = Array('PROPERTY_VALUES', 'PROPS', 'TYPE', 'IBLOCK_CODE');

		foreach ($arRemoveFields as $field) {
			if (isset($arElement[$field])) {
				unset($arElement[$field]);
			}
		}


		// Свойства элемента
		$arProps = [];
		if ($arParams['PROPERTY_VALUES']) {
			$arProps = $arParams['PROPERTY_VALUES'];
			unset($arParams['PROPERTY_VALUES']);

		} elseif ($arParams['PROPS']) {
			$arProps = $arParams['PROPS'];
			unset($arParams['PROPS']);
		}


		// Обновление в БД
		$el = new \CIBlockElement;
		$res = $el->Update($ID, $arElement);

		if ($res === true && is_array($arProps)) {
			// Определение ID инфоблока
			$iIblockID = null;

			if (isset($arParams['TYPE'])) {
				$iIblockID = Help::getOpt('IBLOCK_' . $arParams['TYPE'] . '_ID');

			} elseif (isset($arParams['IBLOCK_CODE'])) {
				$iIblockID = Help::getIblockIdByCode($arParams['IBLOCK_CODE']);

			}

			if ($iIblockID) {
				\CIBlockElement::SetPropertyValuesEx($ID, $iIblockID, $arProps);
			}

		}


		return $res;

	}


	/**
	 * Функция удаляет элемент инфоблока
	 * @const  object  $DB Класс для работы с базой данной
	 * @param  int     $ID ID удаляемого элемента
	 * @return boolean true, если удаление прошло успешно и false, если нет
	 */
	public static function delete($ID) {
		if ((int) $ID) {
			\CModule::IncludeModule('iblock');
			global $DB;

			$DB->StartTransaction();
			if (!\CIBlockElement::Delete($ID)) {
				$DB->Rollback();

			} else {
				$DB->Commit();

				return true;

			}
		}

		return false;
	}


	// =========================================================================
	// ======================== ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ =========================
	// =========================================================================

	/**
	 * Функция деактивирует элемент с указанным кодом
	 * @param int $ID ID элемента
	 * @return array
	 */
	public static function deactivate($ID) {
		$result = self::update(
			$ID,
			Array(
				'FIELDS' => Array(
					'ACTIVE' => 'N',
				),
			)
		);

		return $result;
	}


	/**
	 * Функция принимает свойства элемента, выбирает аналогичный из базы
	 * и сравнивает их
	 * @param array $arElement Массив со свойствами и параметрами элемента
	 * @return array
	 */
	public static function getDiff($arElement) {
		if (!$arElement['TYPE']) {
			return null;
		}
		if (! (int) $arElement['_DIFF_ID']) {
			return null;
		}

		// Определим перечень сравниваемых полей и свойств
		$arFieldsExclude = Array('TYPE', '_DIFF_INFO', '_DIFF_ID');
		$arFields = Array();

		foreach ($arElement as $sField => $value) {
			if (!in_array($sField, $arFieldsExclude, false)) {
				$arFields[] = $sField;
			}
		}

		$arProps = Array();
		if (is_array($arElement['PROPERTY_VALUES'])) {
			foreach ($arElement['PROPERTY_VALUES'] as $sCode => $value) {
				$arProps[] = $sCode;
			}
		}
		// ---------------------------------------------------------------------


		// Выборка элемента из базы
		$arSelect = $arFields;
		foreach ($arProps as $sCode) {
			$arSelect[] = 'PROPERTY_' . $sCode;
		}

		$arElementListInBase = self::getList(Array(
			'TYPE'   => $arElement['TYPE'],
			'FILTER' => Array('ID' => $arElement['_DIFF_ID']),
			'SELECT' => $arSelect,
		));

		$arElementInBase = end($arElementListInBase);
		// ---------------------------------------------------------------------


		// Сравнение элементов
		$arElement1 = $arElement;
		foreach ($arFieldsExclude as $sField) {
			unset($arElement1[$sField]);
		}

		if (is_array($arElement1['PROPERTY_VALUES'])) {
			foreach ($arElement1['PROPERTY_VALUES'] as $field => $value) {
				$arElement1['PROPERTY_' . $field . '_VALUE'] = $value;
			}
		}
		unset($arElement1['PROPERTY_VALUES']);


		$arElement2 = $arElementInBase;
		if (is_array($arElement2)) {
			unset($arElement2['PROP']);
			foreach ($arElement2 as $field => $value) {
				if (preg_match('/PROPERTY_\w+_ENUM_ID/', $field)) {
					unset($arElement2[$field]);
				}

				if (preg_match('/PROPERTY_\w+_VALUE/', $field)) {
					unset($arElement2[$field]);
				}
			}

			$arDiff = array_merge(
				array_diff($arElement1, $arElement2),
				array_diff($arElement2, $arElement1)
			);
		}
		// ---------------------------------------------------------------------


		return $arDiff;

	}


	/**
	 * Функция возвращает поле элемента инфоблока
	 * @param int $ID
	 * @param string $code
	 * @return bool
	 */
	public static function getField($ID, $code) {
		if ((int) $ID) {
			return null;
		}
		if (!$code) {
			return null;
		}


		// Выборка элементов из базы
		$arQuery = Array(
			'FILTER' => Array('ID' => $ID),
			'SELECT' => Array($code),
		);

		if ($code === 'DETAIL_PAGE_URL') {
			$arQuery['GET_NEXT'] = 'Y';
		}

		$arElements = self::getList($arQuery);

		if ($arElements) {
			foreach ($arElements as $arElement) {
				return $arElement[$code];
			}
		}

		return false;
	}


	/**
	 * Функция возвращает ID элемента
	 * @param string $ib Тип инфоблока из опций модуля
	 * @param string $code Код элемента
	 * @param array $arParams Массив доп.параметров <br>
	 *    <li> Если нужно создать ненайденный элемент, то передать "FORCE_CREATE" => "Y"
	 *    <li> Если нужно создать с заранее заданными параметрами, то передать их можно в ключе "NEW_ELEMENT"
	 * @return int ID раздела
	 */
	public static function getIdByElementCode($ib, $code, array $arParams = Array()) {

		// Выборка элемента по символьному коду
		$arElements = self::getList(Array(
			'TYPE'   => $ib,
			'FILTER' => Array('CODE' => $code),
		));


		// Проверка результата
		if (count($arElements) > 1) {
			return null;

		} elseif (count($arElements) === 1) {
			$arElement = end($arElements);

			return $arElement['ID'];

		} elseif ($arParams['FORCE_CREATE'] === 'Y') {
			$arElementNewFields = Array(
				'TYPE' => $ib,
				'NAME' => $code,
				'CODE' => $code,
			);

			if (is_array($arParams['NEW_ELEMENT'])) {
				$arElementNewFields = $arParams['NEW_ELEMENT'];
			}

			$iElementNewID = self::add($arElementNewFields);

			if ((int) $iElementNewID) {
				return $iElementNewID;
			}
		}

		return null;
	}


	/**
	 * Функция возвращает ID элемента
	 * @param string $code Внешний код инфоблока
	 * @param string $xml_id XML_ID раздела
	 * @return array
	 */
	public static function getIdByXmlId($code, $xml_id) {
		$result = null;

		if ($code && $xml_id) {
			$arElementQuery = Array(
				'IBLOCK_CODE' => $code,
				'FILTER'      => Array('XML_ID' => $xml_id),
			);

			$arElementList = self::getList($arElementQuery);
			$arElement = array_shift($arElementList);

			if ($arElement && $arElement['ID']) {
				$result = $arElement['ID'];
			}
		}

		return $result;
	}


	/**
	 * Функция возвращает параметр элемента инфоблока
	 * @param string|int|boolean $type Кодовое обозначение инфоблока
	 * из опций модуля или ID инфоблока или false
	 * @param int $id ID элемента
	 * @param string $propCode Символьный код свойства
	 * @return array
	 */
	public static function getProp($type, $id, $propCode) {
		\CModule::IncludeModule('iblock');


		// Выборка из базы
		if (is_numeric($type)) {
			$infoBlockId = $type;

		} elseif (is_string($type)) {
			$infoBlockId = Help::getOpt('IBLOCK_' . $type . '_ID')
				?: Help::getIblockIdByCode($type);

		} else {
			$infoBlockId = \CIBlockElement::GetIBlockByID($id);
		}

		$resProperty = \CIBlockElement::GetProperty(
			$infoBlockId,
			$id,
			Array(),
			Array('CODE' => $propCode)
		);
		// ---------------------------------------------------------------------


		// Формирование результата
		$result = null;
		$resultItems = Array();
		$arProps = Array();

		while ($arProperty = $resProperty->Fetch()) {
			$resultItems[] = $arProperty['VALUE'];
			$arProps[] = $arProperty;
		}

		if ($resultItems[0] && $arProps[0]['MULTIPLE'] !== 'Y') {
			$result = $resultItems[0];

		} elseif ($resultItems && $resultItems[0] !== null) {
			$result = $resultItems;

		}

		TrimArr($result);

		// ---------------------------------------------------------------------


		return $result;
	}


	/**
	 * Функция возвращает ID значения свойства списка
	 * @param int|string $sType ID инфоблока или его тип
	 * @param string $sPropCode Код свойства
	 * @param string $sXmlParam XML_ID значение, ID которого нужно получить
	 * @return int ID свойства
	 */
	public static function getPropEnumID($sType, $sPropCode, $sXmlParam) {
		\CModule::IncludeModule("iblock");

		if (is_numeric($sType)) {
			$iIblockID = $sType;
		} else {
			$iIblockID = Help::getOpt('IBLOCK_' . $sType . '_ID');
		}

		$resProp = \CIBlockPropertyEnum::GetList(
			Array(),
			Array(
				"IBLOCK_ID" => $iIblockID,
				"CODE"      => $sPropCode,
				"XML_ID"    => $sXmlParam,
			)
		);
		$arProp = $resProp->Fetch();
		$ID = $arProp["ID"];

		return $ID;
	}


	/**
	 * Функция возвращает ID значения свойства инфоблока
	 * @param int|string $sType Символьный код инфоблока или его ID
	 * @param int $ID ID элемента
	 * @param string $code Символьный код свойства
	 * @param mixed $value Значение свойства
	 * @return array|bool
	 */
	public static function getPropIdByValue($sType, $ID, $code, $value) {
		\CModule::IncludeModule('iblock');
		$result = false;


		// Определим ID инфоблока
		if (is_numeric($sType)) {
			$iIblockID = $sType;
		} else {
			$iIblockID = Help::getIblockIdByCode($sType);
		}


		// Определим ID значения свойства
		$resProp = \CIBlockElement::GetProperty(
			$iIblockID, $ID, Array(), Array('CODE' => $code)
		);

		while ($arProp = $resProp->Fetch()) {
			if ($arProp['VALUE'] === $value) {
				$result = $arProp['PROPERTY_VALUE_ID'];
				break;
			}
		}


		return $result;
	}


	/**
	 * Функция возвращает массив с данными о свойствах инфоблока
	 * @param array $arParams Параметры выборки
	 * @return array
	 */
	public static function getPropertyList($arParams) {
		\CModule::IncludeModule('iblock');
		$arResult = [];

		$iIblockID = Help::getOpt('IBLOCK_' . $arParams['TYPE'] . '_ID');

		$arFilter = Array();
		$arFilter['IBLOCK_ID'] = $iIblockID;

		$rsProp = \CIBlockProperty::GetList(Array(), $arFilter);
		while ($arProp = $rsProp->Fetch()) $arResult[] = $arProp;

		return $arResult;
	}


	/**
	 * Функция устанавливает свойства элемента
	 * @param int|string $iblockType Тип инфоблока или ID
	 * @param int $ID ID элемента
	 * @param array $arProps Массив пар "Название свойства"=>"Значение"
	 */
	public static function setProp($iblockType, $ID, $arProps) {
		\CModule::IncludeModule('iblock');


		// Определение ID инфоблока
		if (is_numeric($iblockType)) {
			$iIblockID = $iblockType;
		} else {
			$iIblockID = Help::getOpt('IBLOCK_' . $iblockType . '_ID')
				?: Help::getIblockIdByCode($iblockType);
		}


		\CIBlockElement::SetPropertyValuesEx(
			$ID,
			$iIblockID,
			$arProps
		);
	}


	/**
	 * Функция меняет сортировку значений свойств множественного свойства
	 * @param int|string $sType $iblockType Тип инфоблока или ID
	 * @param int $ID ID элемента
	 * @param string $sPropName Символьный код свойства
	 * @param array $arNewSortID Новый порядок значений
	 * @return bool
	 */
	public static function sortPropFiles($sType, $ID, $sPropName, $arNewSortID) {
		\CModule::IncludeModule('iblock');
		$result = false;


		// Определение ID инфоблока
		if (is_numeric($sType)) {
			$iIblockID = $sType;
		} else {
			$iIblockID = Help::getOpt('IBLOCK_' . $sType . '_ID');
		}


		// Выборка параметров свойств
		$resProp = \CIBlockElement::GetProperty(
			$iIblockID, $ID, Array(),
			Array('CODE' => $sPropName)
		);

		$arPropList = Array();
		while ($arProp = $resProp->Fetch()) {
			$arPropList[] = $arProp;
		}


		// Формирование массива длясхранения нового порядка
		$arSortedProp = Array();
		foreach ($arNewSortID as $iSortValue)
			foreach ($arPropList as $arProp)
				if ($arProp['VALUE'] == $iSortValue)
					$arSortedProp[$arProp['PROPERTY_VALUE_ID']]
						= \CIBlock::makeFilePropArray(Array('VALUE' => $iSortValue));


		if (count($arNewSortID) === count($arSortedProp)) {
			self::setProp($sType, $ID, Array($sPropName => $arSortedProp));
			$result = true;
		}


		return $result;

	}


	public static function getSeo($iblockId, $element) {
		$props = new ElementValues($iblockId, $element['id']);
		$values = $props->getValues();

		$result = [
			'title' =>
				$values['ELEMENT_META_TITLE']
				?: $values['SECTION_META_TITLE']
				?: $element['name']
				?: $element['NAME'],
			'keywords' =>
				$values['ELEMENT_META_KEYWORDS']
				?: $values['SECTION_META_KEYWORDS'],
			'description' =>
				$values['ELEMENT_META_DESCRIPTION']
				?: $values['SECTION_META_DESCRIPTION'],
		];

		return $result;
	}


	/**
	 * Функция обновляет значение
	 * @param string $type Тип инфоблока из default_options.php модуля
	 * @param int    $ID ID элемента
	 * @param string $code Символьный код свойства
	 * @param string $value Новое значение
	 */
	public static function updateProp($type, $ID, $code, $value) {
		\CModule::IncludeModule('iblock');

		$iIblockID = Help::getOpt("IBLOCK_" . $type . "_ID");

		\CIBlockElement::SetPropertyValuesEx(
			$ID,
			$iIblockID,
			Array($code => $value)
		);
	}

}
