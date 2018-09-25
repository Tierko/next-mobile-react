<?php

namespace ALS\Helper;


class TypeConvert {
	/**
	 * Регулярка для разбора строки в select <br>
	 * 0 - исходная строка <br>
	 * 1 - поле в битриксе <br>
	 * 3 - тип данных <br>
	 * 5 - название поля на выходе <br>
	 */
	const typePattern = '/^([\w\.]+)(:|)([\w\[\]]+|)(>|)(\w+|)$/';

	/** @var array Массив строк - чистый SELECT */
	private $select = [];

	/** @var array Массив типов данных для select */
	private $types = [];


	public function __construct(array $select = []) {
		foreach ($select as $field) {
			/**
			 * 0 - исходная строка
			 * 1 - поле в битриксе
			 * 3 - тип данных
			 * 5 - название поля на выходе
			 */
			$fieldMatches = [];

			if (preg_match(self::typePattern, $field, $fieldMatches)) {
				$this->select[] = $fieldMatches[1];

				$this->types[] = [
					false !== strpos($fieldMatches[1], 'PROPERTY_')
						? $fieldMatches[1] . '_VALUE'
						: $fieldMatches[1],
					$fieldMatches[3],
					$fieldMatches[5],
				];
			}
		}
	}


	public function getSelect() {
		return $this->select ?: [];
	}


	public function getTypes() {
		return $this->types ?: [];
	}


	/**
	 * Метод конвертирует результаты getList-а по заданным в SELECT типам
	 *
	 * Возможные типы данных
	 *  <li> string
	 *  <li> string[]
	 *  <li> int
	 *  <li> int[]
	 *  <li> float
	 *  <li> DateHuman
	 *  <li> EnumBool // depend from `'GET_ENUM_CODE' => 'Y'`
	 *  <li> EnumCode
	 *  <li> File
	 *  <li> Image
	 *  <li> Image[]
	 *  <li> Html
	 *  <li> Map
	 *  <li> Table
	 *  <li> Table[]
	 *  <li> Tags
	 *
	 * @param array $items
	 * @return array
	 */
	public function convertDataTypes(array $items = []) {
		$result = [];

		foreach ($items as $k => $item) {
			foreach ($this->types as $type) {
				$value = null;

				if (isset($item[$type[0]])) {
					$value = $item[$type[0]];
				} elseif (false !== strpos($type[0], '.')) {
					// Если это свойство привязки
					$itemField = str_replace('.', '_', $type[0]);
					$value = $item[$itemField];
				}

				$fieldType = $type[1] ?: 'string';
				$fieldName = $type[2] ?: $type[0];

				$descriptionPropKey = str_replace('_VALUE', '_DESCRIPTION', $type[0]);

				if ($fieldType === 'string[]') {
					$newValue = [];

					foreach ($value as $string) {
						$newValue[] = (string) $string;
					}

					$value = $newValue;

				} elseif ($fieldType === 'int') {
					$value = (int) $value;

				} elseif ($fieldType === 'int[]') {
					$newValue = [];

					foreach ($value as $number) {
						$newValue[] = (int) $number;
					}

					$value = $newValue;

				} elseif ($fieldType === 'float') {
					$value = (float) $value;

				} elseif ($fieldType === 'DateHuman') {
					$yearNow = date('Y');
					$newYear = preg_replace('/(.+)(\d{4})$/', '$2', $value);
					$dateFormat = ($yearNow === $newYear) ? 'DD MMMM' : 'DD MMMM YYYY';
					$value = Help::formatDateHuman($value, $dateFormat);

				} elseif ($fieldType === 'EnumBool') {
					$fieldNameEnum = str_replace('_VALUE', '_XML_ID', $type[0]);
					$value = ($item[$fieldNameEnum] === 'Y');

				} elseif ($fieldType === 'EnumCode') {
					$fieldNameEnum = str_replace('_VALUE', '_XML_ID', $type[0]);
					$value = $item[$fieldNameEnum];

				} elseif ($fieldType === 'DescriptiveString[]') {
					$dataFormatted = [];
					foreach ($value as $valueKey=>$valueData) {
						$dataFormatted[] = [
							'value' => $valueData,
							'description' => $item[$descriptionPropKey][$valueKey],
						];
					}
					$value = $dataFormatted;

				} elseif ($fieldType === 'File') {
					$value = is_numeric($value)
						? File::getDataTiny((int) $value)
						: null;

				} elseif ($fieldType === 'Image') {
					$value = File::getImageDataById($value);

				} elseif ($fieldType === 'Image[]' && is_array($value)) {
					$valueNew = [];

					foreach ($value as $imageId) {
						$valueNew[] = File::getImageDataById($imageId);
					}

					$value = $valueNew;

				} elseif ($fieldType === 'Html') {
					$value = $value['TYPE'] === 'HTML' ? $value['TEXT'] : TxtToHTML($value);

				} elseif ($fieldType === 'Map') {
					$coordinates = explode(',', $value);
					$value = $value ? [(float) $coordinates[0], (float) $coordinates[1]] : null;

				} elseif ($fieldType === 'Table' && $value['TYPE'] === 'HTML' && $value['TEXT']) {
					$value = Html::getDataFromTable($value['TEXT']);

				} elseif ($fieldType === 'Table[]' && count($value)) {
					$valueFormatted = [];
					foreach ($value as $bitrixText) {
						$valueFormatted[] = Html::getDataFromTable($bitrixText['TEXT']);
					}

					$value = $valueFormatted;

				} elseif ($fieldType === 'Tags') {
					$tagsInArray = explode(',', $value);

					$value = [];

					if ($value) {
						foreach ($tagsInArray as $tag) {
							$value[] = trim($tag);
						}
					}

				} elseif ($fieldType === 'DescriptiveTable[]') {
					$dataFormatted = [];
					foreach ($value as $valueKey=>$valueData) {
						$dataFormatted[] = [
							'value' => Html::getDataFromTable($valueData['TEXT']),
							'description' => $item[$descriptionPropKey][$valueKey],
						];
					}

					$value = $dataFormatted;

				}

				$result[$k][$fieldName] = $value;
			}
		}


		return $result;
	}

}
