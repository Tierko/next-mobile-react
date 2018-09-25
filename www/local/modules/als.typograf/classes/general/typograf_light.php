<?php

/*
 * Класс реализует минимальный набор функций и методов для
 * типографирования текстов.
 *
 * Планируется для типографирования названий, коротких текстовых фраз, которые
 * или неудобно заводить в админке или клиент не будет этим заниматься.
 *
 */

class ALSTypografLight {
	// =========================================================================
	// === Параметры объекта ===================================================
	// =========================================================================

	// Обрабатываемый текст
	private $text;

	// Язык текста
	private $lang = 'ru';

	// Рег. выражения для установки неразрывных пробелов
	private $constToNbsp = Array(
		'ru' => Array(
			'name' => 'Russian',
			'words_pattern' => Array(
				'/(\s|^)(и|в|не|на|от|до|с|что|а|как|то|из|по|он|все|это|о|его|к|еще|для|бы|же)(\s|$)/',
				'/(\s|^)(ул.|д.|стр.|г.|п.|оф.)(\s)/',
			),
		),
	);

	// Установка неразрывных пробелов перед единицами измерений
	private $constToNbspSi = Array(
		'ru' => Array(
			'name' => 'Russian',
			'words_pattern' => Array(
				'/(\d+)\s([A-zА-яЁё\w])/',
			),
		),
	);


	// =========================================================================
	// === КОНСТРУКТОР, ГЕТТЕРЫ и СЕТТЕРЫ ======================================
	// =========================================================================

	public function __construct() {

	}


	// =========================================================================
	// === CRUD ================================================================
	// =========================================================================

	/**
	 * Метод возвращает типографированный текст
	 * @param string $text
	 * @return string Типографированный текст
	 */
	public function getResult($text) {
		if(!is_string($text) || !$text) {return $text;}

		$this->text = $text;


		// Добавляем неразрывные пробелы
		$this->setNbsp();


		// Запретим переносы строк, где нужно
		$this->setNobr();


		// Ставим тире
		$this->setDash();


		// Возвращаем результат
		return $this->text;

	}


	// =========================================================================
	// === ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ ==============================================
	// =========================================================================

	private function setDash() {
		$pattern = '/([A-zА-яЁё])\s+([—–-])/ui';

		$this->text = preg_replace($pattern, '$1&nbsp;&mdash;', $this->text);

	}


	/**
	 * Метод добавляет неразырвные пробелы в текст
	 */
	private function setNbsp() {
		// Предлоги и адреса
		$patternList = $this->constToNbsp[$this->lang]['words_pattern'];

		foreach($patternList as $pattern)
			$this->text = preg_replace($pattern, '$1$2&nbsp;', $this->text);


		// Единицы измерения
		$patternListSi = $this->constToNbspSi[$this->lang]['words_pattern'];

		foreach($patternListSi as $pattern)
			$this->text = preg_replace($pattern, '$1&nbsp;$2', $this->text);

	}


	private function setNobr() {

		/**
		 * @var string - Телефонные номера
		 */
		$patternPhone = '/((\+\d\s|\d)?(\(?\d{3,4}\)?[\- ]?)?[\d\-]{7,10}\d)/';

		/**
		 * @var string - Регулярка на диапазоны времени вроде 9:00–18:00, 9:00–14:00
		 */
		$patternTimes = '/(\d{1,2}\:\d{1,2}(–|-|—)\d{1,2}\:\d{1,2})/';

		$pattern = Array(
			$patternPhone,
			$patternTimes,
		);

		$this->text = preg_replace($pattern, '<nobr>$1</nobr>', $this->text);

	}

}
