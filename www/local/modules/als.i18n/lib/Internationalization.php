<?php

namespace ALS;

use ALS\Helper\El;
use ALS\Helper\Help;
use ALS\Helper\Sect;
use ALS\Helper\TypographLight;


class Internationalization {
	private $dir = '';

	/** @var int ID инфоблока */
	private $infoBlockId;

	/** @var array Языковые версии сайта */
	private $langList = ['RU', 'EN'];

	/** @var array Массив с разделами */
	private $sections = [];

	/** @var array Массив со всеми фразами из инфоблока */
	private $elements = [];

	/** @var array Массив дерева Раздел->Элемент */
	private $elementsTree = [];


	public function __construct() {
		$this->infoBlockId = Help::getIblockIdByCode('I18N', true);

		$this->setDir();
	}


	private function setDir() {
		$this->dir = $_SERVER['DOCUMENT_ROOT']
			. DIRECTORY_SEPARATOR . 'api'
			. DIRECTORY_SEPARATOR . 'i18n'
			. DIRECTORY_SEPARATOR;

		if (!is_dir($this->dir)) {
			mkdir($this->dir, 0700);
		}
	}


	private function loadSections() {
		$this->sections = Sect::getTreeList([
			'IBLOCK_ID' => $this->infoBlockId,
			'FILTER'    => ['ACTIVE' => 'Y'],
			'SELECT'    => ['ID', 'CODE', 'DEPTH_LEVEL'],
		]);
	}


	private function loadElements() {
		$props = [];
		foreach ($this->langList as $lang) {
			$props[] = 'PROPERTY_' . $lang;
		}

		$this->elements = El::getListCache([
			'IBLOCK_ID' => $this->infoBlockId,
			'FILTER'    => ['ACTIVE' => 'Y'],
			'SELECT'    => array_merge(['CODE', 'IBLOCK_SECTION_ID'], $props),
		]);
	}


	private function createElementsTree() {
		foreach ($this->sections as $section) {
			$newSection          = $section;
			$newSection['TYPE']  = 'S';
			$newSection['ITEMS'] = [];

			foreach ($this->elements as $elementKey=>$element) {
				if ($element['IBLOCK_SECTION_ID'] === $section['ID']) {
					$newElement         = $element;
					$newElement['TYPE'] = 'E';

					$newSection['ITEMS'][] = $newElement;
				}
			}

			$this->elementsTree[] = $newSection;
		}
	}


	private function getJsonStructure($lang = 'RU') {
		$result = [];
		$typo = new TypographLight();

		foreach ($this->elementsTree as $item) {
			if ($item['TYPE'] === 'S') {
				$items = [];

				if (is_array($item['ITEMS'])) {
					foreach ($item['ITEMS'] as $element) {
						$cleanValue = $element['PROPERTY_' . $lang . '_VALUE'];
						$typographValue = $typo->getResult($cleanValue);

						$items[$element['CODE']] = $typographValue;
					}
				}

				$result[$item['CODE']] = $items;
			}
		}

		return $result;
	}


	private function createJsonFile($lang = 'RU') {
		$data = $this->getJsonStructure($lang);
		$fileName = strtolower($lang) . '.json';
		file_put_contents($this->dir . $fileName, json_encode($data, JSON_UNESCAPED_UNICODE));
	}


	public function generateJsonFiles() {
		$this->loadSections();
		$this->loadElements();

		$this->createElementsTree();

		foreach ($this->langList as $lang) {
			$this->createJsonFile($lang);
		}

	}


	public static function generateByEvent() {
		$model = new self;
		$model->generateJsonFiles();
	}
}
