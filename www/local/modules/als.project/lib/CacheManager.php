<?php

namespace ALS\Project;


class CacheManager {
	const CACHE_PATH = [
		// 'BlockPageItems' => '/BlockPage/getItems/',
		// 'BlockPageSections' => '/BlockPage/getList/',
		'ServicesItems' => '/Services/getList/',
		'TariffsItems' => '/Tariffs/getList/',
	];

	const DIR = '/als.project';


	/**
	 * Метод возвращает путь к кешу относительно /bitrix/cache
	 * @param string $key
	 * @return string
	 */
	public static function getPath($key = '') {
		return (self::DIR . self::CACHE_PATH[$key]) ?: '';
	}


	/**
	 * Метод очищает кеш по ключу
	 * @param string $key
	 */
	public static function clear($key = '') {
		$dir = self::getPath($key);

		if ($dir) {
			$cache = \Bitrix\Main\Data\Cache::createInstance();
			$cache->cleanDir($dir);
		}
	}


	/**
	 * По событию метод сбрасывает кеш соответствующего инфоблока
	 * @param $event
	 */
	public static function processingEvent($event) {
		$iblockId = (int) $event['IBLOCK_ID'];
		$iblockCode = \ALS\Helper\Help::getIblockCode($iblockId);

		if ($iblockCode === 'SERVICES') {
			self::clear('ServicesItems');

		} elseif ($iblockCode === 'TARIFFS') {
			self::clear('TariffsItems');
		}
	}

}
