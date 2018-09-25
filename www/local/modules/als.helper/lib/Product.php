<?php

namespace ALS\Helper;


class Product {

	// =========================================================================
	// === CRUD ================================================================
	// =========================================================================


	// =========================================================================
	// === ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ ==============================================
	// =========================================================================

	/**
	 * Функция обновит или добавит цену для товара
	 * @param int $ID ID элемента инфоблока
	 * @param array $arFields Массив с полями и свойствами товара
	 * @return
	 */
	static function setPrice($ID, $arFields) {
		$result = null;

		if (intval($ID) && is_array($arFields)) {
			\CModule::IncludeModule('catalog');

			$arFields = Array(
				'PRODUCT_ID'       => $ID,
				'CATALOG_GROUP_ID' => 1,
				'PRICE'            => $arFields['PRICE'],
				'CURRENCY'         => $arFields['CURRENCY'],
			);

			$res = \CPrice::GetList(
				Array(),
				Array(
					'PRODUCT_ID'       => $ID,
					'CATALOG_GROUP_ID' => 1,
				)
			);

			if ($arr = $res->Fetch()) {
				\CPrice::Update($arr["ID"], $arFields);

			} else {
				\CPrice::Add($arFields);

			}

		}

		return $result;

	}


	/**
	 * Функция обновит параметры элемента каталога на основе данных из элемента
	 * @param int $ID ID элемента инфоблока
	 * @param array $arElement Массив с полями и свойствами товара
	 * @return bool
	 */
	static function updateFromArray($ID, $arElement) {
		$result = null;

		if (intval($ID) && is_array($arElement)) {
			\CModule::IncludeModule('catalog');

			$iQuantity = 0;
			if (isset($arElement['QUANTITY']) && $arElement['QUANTITY']) {
				$iQuantity = $arElement['QUANTITY'];
			}

			$result = \CCatalogProduct::add(Array(
				'ID'       => $ID,
				'QUANTITY' => $iQuantity,
			));

		}

		return $result;

	}

}
