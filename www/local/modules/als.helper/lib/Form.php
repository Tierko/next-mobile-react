<?php

namespace ALS\Helper;

class Form {
	/**
	 * Функция возвращает паттерн для заполнения полей согласно запрашиваемому типу <br>
	 * Например, доступны следующие типы: <br>
	 * <li> NAME
	 * <li> FIO
	 * <li> PHONE
	 * <li> EMAIL
	 * @param string $type Строка с типом паттерна
	 * @return string Сам паттерн для регулярного выражения
	 */
	static function getPattern($type) {
		$arPattern = Array(
			'NAME'		=> '/^.{3,}$/',
			'FIO'		=> '/^.{6,}$/',
			'PHONE'		=> '/^(?=[^()]*\(([^()]*\)[^()]*)?$|[^()]*$)(?=[\s(]*\+[^+]*$|[^+]*$)([-+.\s()]*\d){11,18}$/',
			'EMAIL'		=> '/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/',
		);

		$sPattern = $arPattern[$type];

		return $sPattern;
	}

}
