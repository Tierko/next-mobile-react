<?php

namespace ALS\Helper;


class User {
	static function getList($arParams) {

		// Определение фильтра
		if ($arParams['FILTER']) {
			$arFilter = $arParams['FILTER'];

		} else {
			$arFilter = Array();

		}
		// ---------------------------------------------------------------------


		// Определение полей выборки
		if ($arParams['SELECT']) {
			$arSelect = $arParams['SELECT'];

		} else {
			$arSelect = Array();

		}
		$arSelect['FIELDS'][] = 'ID'; // Выбрать ID обязательно
		// ---------------------------------------------------------------------


		// Выборка результата из базы
		$resUserList = \CUser::GetList(
			($by = 'id'), ($order = 'asc'),
			$arFilter,
			$arSelect
		);
		// ---------------------------------------------------------------------


		// Формирование результата
		$arResult = Array();
		while ($arUser = $resUserList->Fetch()) {
			$arResult[$arUser['ID']] = $arUser;
		}

		// ---------------------------------------------------------------------


		return $arResult;
	}
}
