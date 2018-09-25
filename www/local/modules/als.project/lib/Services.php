<?php

namespace ALS\Project;


use ALS\Helper\El;

class Services {
	/**
	 * Метод возвращает список услуг
	 * @param string $lang - Языковая версия
	 * @return array
	 */
	public static function getItems($lang = 'ru') {
		$params = [
			'IBLOCK_CODE' => 'SERVICES',
			'ORDER' => ['SORT' => 'ASC', 'NAME' => 'ASC'],
			'FILTER' => ['ACTIVE' => 'Y'],
			'SELECT' => self::getSelectField($lang),
			'GET_ENUM_CODE' => 'Y',
			'AS_ARRAY' => 'Y',
		];

		$obCache = new \CPHPCache;
		$cachePath = CacheManager::getPath('ServicesItems');

		if ($obCache->InitCache(3600, serialize($params), $cachePath)) {
			$vars = $obCache->GetVars();
			$items = $vars['RESULT'];

		} else {
			$items = self::getItemsWithData($params);

			if ($obCache->StartDataCache()) {
				$obCache->EndDataCache(['RESULT' => $items]);
			}
		}

		return $items;
	}


	/**
	 * Метод возвращает массив с полями выборки
	 * @param string $lang
	 * @return array
	 */
	private static function getSelectField($lang) {
		$select = [
			'ID:int>id',
			'NAME>name',
			'SORT:int>sort',
			'PREVIEW_TEXT>text',
			'PROPERTY_PRICE>price',
		];

		return $select;
	}


	/**
	 * Метод возвращает массив записей со всеми доп. параметрами
	 * @param array $params - Массив с параметрами выборки
	 * @return array
	 */
	private static function getItemsWithData($params) {
		return El::getList($params);;
	}

}
