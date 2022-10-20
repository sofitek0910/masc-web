import { v4 as uuid4 } from 'uuid';
import uuidParse from 'uuid-parse';

export const getQueryString = (params) => {
  const listUnNull = Object.keys(params).filter((key) => params[key] && params[key] !== null);
  return listUnNull.map((key) => key + '=' + params[key]).join('&');
}

export const copyToClipBoard = (string) => {
  const dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = string;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

export function formatNumberWithComma (num) {
  num = num.replace(',', '');
  return Number(num) || 0;
}

export function formatThousandNumber(num) {
  return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

export function generateRandomGuid() {
  let uuidBuffer = Buffer.alloc(16);
  uuidParse.parse(uuid4(), uuidBuffer);
  const uuidHex = uuidBuffer.toString('hex').toUpperCase();
  return uuidHex;
}

export function setCookie(name, value) {
  document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
}

export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    const parsedValue = parts
      .pop()
      .split(';')
      .shift();
    return !!parsedValue && parsedValue !== 'undefined'
      ? parsedValue
      : undefined;
  }

  return undefined;
}