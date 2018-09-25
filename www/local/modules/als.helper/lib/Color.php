<?php

namespace ALS\Helper;

class Color {
	/**
	 * Функция перевод цвет из HEX в HSV формат
	 * @param string $HEX Цвет в HEX-формате с решеткой или без
	 * @param string $type Тип результата.
	 *	<li>arr - массив
	 *	<li>css - css-свойство
	 *	<li>css_link - css-свойство для ссылки
	 * @return array Массив с компонентами HSV-цвета
	 */
	static function HEXtoHSL($HEX, $type='arr') {
		$result = [];

		// Конвертация цвета
		$arRGB = self::HEXtoRGB($HEX);

		$arHSV = self::RGBtoHSV(
			$arRGB[0], $arRGB[1], $arRGB[2]
		);


		// Форматирование результата
		foreach($arHSV as $k=>$v)
			$arHSV[$k] = round($v, 1);


		// Формирование результата
		if($type == 'arr') {
			$result = $arHSV;

		} elseif($type == 'css') {
			$result = 'hsl('.$arHSV[0].','.$arHSV[1].'%,'.$arHSV[2].'%)';

		} elseif($type == 'css_link') {
			$result = 'hsla('.$arHSV[0].','.$arHSV[1].'%,'.$arHSV[2].'%,0.3)';

		}


		return $result;
	}


		/**
	 * Функция переводит цвет их HEX в RGB
	 * @param string $HEX Цвет в HEX-формате с решеткой или без
	 * @param string $type Тип результата.
	 *	<li>arr - массив
	 *	<li>css - css-свойство
	 *	<li>css_link - css-свойство для ссылки
	 * @return array Массив из 3 элементов R, G, и B
	 */
	static function HEXtoRGB($HEX, $type='arr') {
		$result = [];

		$hex = str_replace('#', '', $HEX);

		if(strlen($hex) == 3) {
			$r = hexdec(substr($hex,0,1).substr($hex,0,1));
			$g = hexdec(substr($hex,1,1).substr($hex,1,1));
			$b = hexdec(substr($hex,2,1).substr($hex,2,1));

		} else {
			$r = hexdec(substr($hex,0,2));
			$g = hexdec(substr($hex,2,2));
			$b = hexdec(substr($hex,4,2));

		}


		// Формирование результата
		if($type === 'arr') {
			$result = array($r, $g, $b);

		} elseif($type === 'css') {
			$result = 'rgb('.$r.','.$g.','.$b.')';

		} elseif($type === 'css_link') {
			$result = 'rgba('.$r.','.$g.','.$b.',0.3)';

		}


		return $result;
	}


	/**
	 * Licensed under the terms of the BSD License.
	 * (Basically, this means you can do whatever you like with it,
	 *   but if you just copy and paste my code into your app, you
	 *   should give me a shout-out/credit :)
	 *
	 * RGB values:    0-255, 0-255, 0-255
	 * HSV values:    0-360, 0-100, 0-100
	 * @param integer $R
	 * @param integer $G
	 * @param integer $B
	 * @return array
	 */
	static function RGBtoHSV($R, $G, $B) {
		// Convert the RGB byte-values to percentages
		$R = ($R / 255);
		$G = ($G / 255);
		$B = ($B / 255);

		// Calculate a few basic values, the maximum value of R,G,B, the
		//   minimum value, and the difference of the two (chroma).
		$maxRGB = max($R, $G, $B);
		$minRGB = min($R, $G, $B);
		$chroma = $maxRGB - $minRGB;

		// Value (also called Brightness) is the easiest component to calculate,
		//   and is simply the highest value among the R,G,B components.
		// We multiply by 100 to turn the decimal into a readable percent value.
		$computedV = 100 * $maxRGB;

		// Special case if hueless (equal parts RGB make black, white, or grays)
		// Note that Hue is technically undefined when chroma is zero, as
		//   attempting to calculate it would cause division by zero (see
		//   below), so most applications simply substitute a Hue of zero.
		// Saturation will always be zero in this case, see below for details.
		if ($chroma == 0)
			return array(0, 0, $computedV);

		// Saturation is also simple to compute, and is simply the chroma
		//   over the Value (or Brightness)
		// Again, multiplied by 100 to get a percentage.
		$computedS = 100 * ($chroma / $maxRGB);

		// Calculate Hue component
		// Hue is calculated on the "chromacity plane", which is represented
		//   as a 2D hexagon, divided into six 60-degree sectors. We calculate
		//   the bisecting angle as a value 0 <= x < 6, that represents which
		//   portion of which sector the line falls on.
		if ($R == $minRGB)
			$h = 3 - (($G - $B) / $chroma);
		elseif ($B == $minRGB)
			$h = 1 - (($R - $G) / $chroma);
		else // $G == $minRGB
			$h = 5 - (($B - $R) / $chroma);

		// After we have the sector position, we multiply it by the size of
		//   each sector's arc (60 degrees) to obtain the angle in degrees.
		$computedH = 60 * $h;

		return array($computedH, $computedS, $computedV);
	}


	/**
	 * Функция приводит цвет в формат RGB
	 * @param string $color
	 * @return array|bool
	 */
	static function toRGB($color) {
		$sCssPatternRGB = '/rgb(a|)\((\d+),\s*(\d+),\s*(\d+)/';
		$sCssPatternHEX = '/(#|)([\w]{6}|[\w]{3})/';


		$result = false;
		$arMatches = Array();
		if(preg_match($sCssPatternRGB, $color, $arMatches)) {
			$result = Array($arMatches[2], $arMatches[3], $arMatches[4]);

		} elseif(preg_match($sCssPatternHEX, $color, $arMatches)) {
			$result = self::HEXtoRGB($color);

		}


		return $result;
	}

}
