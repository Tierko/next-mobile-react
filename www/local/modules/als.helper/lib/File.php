<?php

namespace ALS\Helper;

use Bitrix\Main\Application as BxApp;


class File {

	/**
	 * Функция округляет размер файла в байтах и переводит в Кб, Мб, Гб и т.д.
	 * @param int $iSize Размер файла в байтах
	 * @param int $iPrecision Порядок округления. По умолчанию 2
	 * @return string
	 */
	public static function formatSize($iSize, $iPrecision = 2) {
		$sBitrixFormat = \CFile::FormatSize($iSize, $iPrecision);

		if (LANGUAGE_ID === 'ru') {
			$sBitrixFormat = str_replace('.', ',', $sBitrixFormat);
		}

		if (LANGUAGE_ID === 'en') {
			$sBitrixFormat = strtoupper($sBitrixFormat);
		}

		$sBitrixFormat = str_replace(' ', '&nbsp;', $sBitrixFormat);

		return $sBitrixFormat;
	}


	/**
	 * Функция возвращает массив на основе CSV файла
	 * @param string $path Путь к файлу
	 * @param array  $arParams Дополнительные параметры <br>
	 * 	<li> ENC_IN - исходная кодировка
	 * 	<li> ENC_TO - требуемая кодировка
	 * @return array Ассоциативный массив
	 */
	public static function getArrFromCSV($path, array $arParams = Array()) {
		$array = $fields = array();
		$i = 0;
		$handle = @fopen($path, 'r');


		if ($handle) {
			while (($row = fgetcsv($handle, 4096)) !== false) {
				if (empty($fields)) {
					$fields = $row;
					continue;
				}

				foreach ($row as $k => $value) {
					if ($arParams['ENC_IN'] && $arParams['ENC_TO']) {
						$value = iconv($arParams['ENC_IN'], $arParams['ENC_TO'], $value);
					}

					$array[$i][$k] = trim($value);
				}

				$i++;
			}

			fclose($handle);
		}


		// Преобразование полученного массива к ассоциативному
		$arResult = Array();

		if (is_array($fields) && is_array($array)) {
			$arFields = explode(';', $fields[0]);

			foreach ($array as $k => $row) {
				$arRow = explode(';', $row[0]);

				foreach ($arRow as $n => $column) {
					$sAssocKey = $arFields[$n];

					if ($sAssocKey) {
						$arResult[$k][$arFields[$n]] = $column;
					}
				}
			}
		}


		return $arResult;
	}


	/**
	 * Функция возвращает Base64 для файла (пока только с картинками работает)
	 * @param array $arParam Массив с параметрами <br>
	 * <li> PATH - Путь к файлу относительно корня сайта
	 * <li> SOURCE - Исходник файла
	 * <li> TYPE - Тип данных, например «svg»
	 * @return string Строка с закодированным в base64 файлом
	 */
	public static function getBase64($arParam) {
		$base64 = '';

		if ($arParam['PATH']) {
			$path = $_SERVER['DOCUMENT_ROOT'] . $arParam['PATH'];
			$type = pathinfo($path, PATHINFO_EXTENSION);
			$data = file_get_contents($path);

			if ($type === 'svg') {
				$type = 'svg+xml';
			}

			$base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);

		} elseif ($arParam['SOURCE'] && $arParam['TYPE']) {
			if ($arParam['TYPE'] === 'svg') {
				$arParam['TYPE'] = 'svg+xml';
			}

			$base64 = 'data:image/' . $arParam['TYPE'] . ';base64,' . base64_encode($arParam['SOURCE']);

		}

		return $base64;
	}


	/**
	 * Функция возвращает информацию о файле по его пути из b_file и если файла
	 * там нет, то сохраняет
	 * @param string $sPath Путь к файлу от корня сайта
	 * @return array|bool
	 */
	public static function getByPath($sPath) {
		$result = false;

		$sFilePath = realpath($_SERVER['DOCUMENT_ROOT'] . $sPath);

		if (is_string($sPath) && file_exists($sFilePath)) {
			// Найдём файл в b_file
			$conn = BxApp::getConnection();
			$sSqlQuery = 'SELECT ID FROM b_file WHERE DESCRIPTION = "' . $sPath . '"';
			$recordList = $conn->query($sSqlQuery);

			while ($record = $recordList->fetch()) {
				if ($record['ID']) {
					$result = self::getData($record['ID']);
				}
			}
			// -----------------------------------------------------------------


			if (!$result) {
				// Если файл не нашелся
				$arFileArrayToSave = \CFile::MakeFileArray($sFilePath);
				$arFileArrayToSave['description'] = $sPath;

				$resultFileSave = \CFile::SaveFile($arFileArrayToSave, 'custom');

				if ((int) $resultFileSave) {
					$result = self::getData($resultFileSave);
				}

			}

		}

		return $result;

	}


	/**
	 * Функция возвращает массив с информацией о файле
	 * @param int $file ID файла
	 * @return array
	 */
	public static function getData($file) {
		$result = false;

		if ((int) $file) {
			$arFile = \CFile::GetFileArray($file);

			$arFileInfo = pathinfo($_SERVER['DOCUMENT_ROOT'] . $arFile['SRC']);
			$arFile['EXT'] = strtoupper($arFileInfo['extension']);

			$arFile['FILE_SIZE_FORMAT'] = self::formatSize($arFile['FILE_SIZE'], 0);

			$result = $arFile;
		}

		return $result;
	}


	/**
	 * Функция возвращает массив с синформацией о файле в укороченном виде
	 * @param int $file ID файла
	 * @return array
	 */
	public static function getDataTiny($file) {
		$result = self::getData($file);

		if ($result) {
			$result = Array(
				'ext'  => $result['EXT'],
				'id'   => $result['ID'],
				'name' => $result['ORIGINAL_NAME'],
				'size' => $result['FILE_SIZE_FORMAT'],
				'src'  => $result['SRC'],
			);
		}

		return $result;
	}


	/**
	 * Функция возвращает путь до текущего скрипта относительно корня сайта
	 * @param string $sDir Путь к файлу или директории, например __DIR__
	 * @return string URl файла/директории относительно корня
	 */
	public static function getDir($sDir) {
		$sResultSlashes = str_replace("\\", '/', $sDir);
		$sResultClear = str_replace($_SERVER['DOCUMENT_ROOT'], '', $sResultSlashes);
		$sResultClearSlashes = '/' . $sResultClear . '/';
		return str_replace('//', '/', $sResultClearSlashes);
	}


	/**
	 * Функция сохраняет файлы $arFiles в b_files и возвращает сведения о них
	 * @param array $arFiles Массив файлов из $_FILES
	 * @param int $iUserID ID авторизованного пользователя или IP неавторизованного
	 * @param string $sFolderName Папка для загрузки файлов. По умолчанию 'files-upload'
	 * @param string $sModuleName Модуль, загружающий файлы. По умолчанию 'iblock'
	 * @return array Сведения о загруженных файлах или ошибке
	 */
	public static function getFileUploadProtectedForSave($arFiles, $iUserID, $sFolderName = 'files-upload', $sModuleName = 'iblock') {
		if (!is_array($arFiles)) {
			return null;
		}

		$sFilePrefix = '';

		$arFilesID = Array();

		foreach ($arFiles['name'] as $keyFile => $sFileName) {
			$arFile = Array(
				'name'        => $sFilePrefix . '_' . $sFileName,
				'size'        => $arFiles['size'][$keyFile],
				'tmp_name'    => $arFiles['tmp_name'][$keyFile],
				'type'        => $arFiles['type'][$keyFile],
				'description' => json_encode(Array('USER_ID' => $iUserID)),
				'MODULE_ID'   => $sModuleName,
			);

			if ($arFiles['error'][$keyFile] == 0) {
				$iFileID = \CFile::SaveFile($arFile, $sFolderName);

				if ($iFileID) {
					$arFileOnServer = \CFile::GetFileArray($iFileID);
					$arFileSystem = pathinfo($_SERVER['DOCUMENT_ROOT'] . $arFileOnServer['SRC']);

					$arFileReturn = Array(
						'id'   => $iFileID,
						'name' => $arFileOnServer['FILE_NAME'],
						'size' => str_replace('.', ',', \CFile::FormatSize($arFileOnServer['FILE_SIZE'])),
						'ext'  => $arFileSystem['extension'],
						'src'  => $arFileOnServer['SRC'],
					);

					$arFilesID[] = $arFileReturn;
				}

			} else {
				$arFilesID['ERROR'][] = Array(
					'ERROR'     => 'Ошибка загрузки файла',
					'FILE_DATA' => $arFile,
					'FILES_ALL' => $arFiles,
				);

			}
		}

		return $arFilesID;
	}


	/**
	 * @param int $id
	 * @return array
	 */
	public static function getImageDataById($id) {
		if (!$id) { return null; }

		$fileData = \CFile::GetFileArray((int) $id);

		$result = [
			'id'   => (int) $id,
			'src'  => $fileData['SRC'],
			'h'    => (int) $fileData['HEIGHT'],
			'w'    => (int) $fileData['WIDTH'],
			'size' => (int) $fileData['FILE_SIZE'],
			'name' => $fileData['ORIGINAL_NAME'],
			'alt'  => $fileData['DESCRIPTION'],
		];

		return $result;
	}


	/**
	 * Метод формирует информацию о картинке из превьюхи сформированной CFile::ResizeImageGet
	 * @param $thumb
	 * @return array|null
	 */
	public static function getImageDataByResize($thumb) {
		if (!is_array($thumb)) { return null; }

		$result = [
			'id'   => null,
			'src'  => $thumb['src'],
			'h'    => (int) $thumb['height'],
			'w'    => (int) $thumb['width'],
			'size' => (int) $thumb['size'],
			'name' => '',
			'alt'  => '',
		];

		return $result;
	}


	/**
	 * Функция возвращает массив пригодный для сохранения элемента
	 * @param array $arFilesID Массив ID файлов из b_file
	 * @param string $sModuleName Имя модуля
	 * @return array Массив для CIBlockElement:Add()
	 */
	public static function getFileArrayForSaveInProp($arFilesID, $sModuleName = 'main') {
		if (!is_array($arFilesID)) {
			return null;
		}

		$arResult = Array();
		foreach ($arFilesID as $key => $iFileID) {
			if (!$iFileID) continue;

			$arFileThis = \CFile::MakeFileArray($iFileID);
			$arFileThis['MODULE_ID'] = $sModuleName;
			$arFileThis['name'] = \CUtil::translit($arFileThis['name'], 'ru');

			if ($arFileThis) {
				$arResult['n' . $key] = Array(
					'VALUE'       => $arFileThis,
					'DESCRIPTION' => $arFileThis['description'],
				);
			}
		}

		return $arResult;
	}

}
