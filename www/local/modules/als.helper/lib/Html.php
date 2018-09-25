<?php

namespace ALS\Helper;

use DOMDocument;

class Html {
	/**
	 * Возвращает данные из html-таблицы в виде массива
	 *
	 * @param  string $tableStr Html-строка с таблицей
	 * @return array            Результат парсинга таблицы
	 */
	public static function getDataFromTable($tableStr) {
		$result = [];

		$dom = new DOMDocument();
		$dom->loadHTML('<?xml encoding="utf-8" ?>' . $tableStr);
		$dom->normalizeDocument();

		$rowCount = 0;
		foreach ($dom->getElementsByTagName('tr') as $tableRow) {
			$result[$rowCount] = [];

			foreach ($tableRow->getElementsByTagName('td') as $tableCell) {
				$result[$rowCount][] = trim($tableCell->nodeValue);
			}

			$rowCount++;
		}

		return $result;
	}


	/**
	 * Метод добавляет информацию о файлах в html-текст.
	 * Например,
	 * 		<a href="/upload/file.pdf>Документ</a>
	 * превращается в
	 * 		<a href="/upload/file.pdf>Документ</a>
	 * 		<span class="file-description">(PDF, 4.6 МБ)</span>
	 *
	 * @param string $html Html-строка для обработки
	 * @param string $lang Языковая версия
	 * @return string
	 */
	public static function getHtmlWithFileDataToLinks($html, $lang = 'ru') {
		$linkPattern = '/<a href="(\/upload\/[^"]+)".*?>(.+?)<\/a>/ims';

		$resultHtml = $html;

		$matches = [];
		preg_match_all($linkPattern, $html, $matches);

		if (is_array($matches[0]) && count($matches[0])) {
			foreach ($matches[0] as $keyMatch => $linkMatched) {
				$filePath = urldecode($_SERVER['DOCUMENT_ROOT'] . $matches[1][$keyMatch]);

				$fileInfo = pathinfo($filePath);
				$fileData = \CFile::MakeFileArray($filePath, true);

				$fileExt = strtoupper($fileInfo['extension']);
				$fileSizeFormat = File::formatSize($fileData['size'], 2);

				$linkWithData = $linkMatched . ' <span class="file-description">' .
					'(' . $fileExt . ', ' . $fileSizeFormat . ')</span>';

				$resultHtml = str_replace($linkMatched, $linkWithData, $resultHtml);
			}
		}

		return $resultHtml;
	}


	/**
	 * Функция trim для строк mb_
	 * @param $string
	 * @param string $charlist
	 * @param bool $ltrim
	 * @param bool $rtrim
	 * @return null|string|string[]
	 */
	public static function mb_trim($string, $charlist='\\\\s', $ltrim=true, $rtrim=true) {
		$both_ends = $ltrim && $rtrim;

		$char_class_inner = preg_replace(
			array( '/[\^\-\]\\\]/S', '/\\\{4}/S' ),
			array( '\\\\\\0', '\\' ),
			$charlist
		);

		$work_horse = '[' . $char_class_inner . ']+';
		$ltrim && $left_pattern = '^' . $work_horse;
		$rtrim && $right_pattern = $work_horse . '$';

		if ($both_ends) {
			$pattern_middle = $left_pattern . '|' . $right_pattern;

		} elseif($ltrim) {
			$pattern_middle = $left_pattern;

		} else {
			$pattern_middle = $right_pattern;
		}

		return preg_replace("/$pattern_middle/usSD", '', $string);
	}

}
