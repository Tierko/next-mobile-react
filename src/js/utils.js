export const checkCardNumber = str => str.replace(/\D/g, '').length === 16;

export const checkPhone = str => str.replace(/\D/g, '').length === 11;

export const checkCardDate = str => str.replace(/\D/g, '').length === 4;

export const checkCVV = str => str.replace(/\D/g, '').length === 3;

export const checkCardHolder = str => str.search(/^[a-z]+\s+[a-z]+$/gi) === 0;

