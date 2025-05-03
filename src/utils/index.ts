import {
  NestedObjectWithStringValues,
  ObjectWithStringValues,
} from "../types/utils";
import queryString, { StringifyOptions } from "query-string";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { UserState } from "providers/User/userSlice";
import { store } from "store";

export const flatten = (
  obj: NestedObjectWithStringValues,
  prefix: string = "",
  separator: string = "."
): ObjectWithStringValues =>
  Object.keys(obj).reduce(
    (prev, element) =>
      obj[element] &&
      typeof obj[element] === "object" &&
      !Array.isArray(obj[element])
        ? {
            ...prev,
            ...flatten(obj[element] as NestedObjectWithStringValues, `${prefix}${element}${separator}`, separator),
          }
        : { ...prev, ...{ [`${prefix}${element}`]: obj[element] } },
    {}
  );

export class CustomError<A> {
  name = "CustomError";

  message: string;

  error: A;

  constructor(message: string, error: A) {
    this.message = message;
    this.error = error;
  }
}

export const checkNetworkConnection = async () => {
  try {
    await fetch("https://www.google.com/", {
      mode: "no-cors",
    });
    return true;
  } catch (e) {
    return false;
  }
};

export const stringMatchAgainstArrayOfStrings = (
  str: string,
  substringsArray: string[]
) => substringsArray.every((substring) => str.includes(substring));

export const isNetworkError = (errorMessage: string) =>
  errorMessage.toLowerCase().includes("failed to fetch") ||
  errorMessage
    .toLowerCase()
    .includes("networkerror when attempting to fetch resource") ||
  errorMessage
    .toLowerCase()
    .includes("the internet connection appears to be offline");

export const moveArrayElement = (
  arr: any[],
  fromIndex: number,
  toIndex: number
) => {
  const newArr = [...arr];
  var element = newArr[fromIndex];
  newArr.splice(fromIndex, 1);
  newArr.splice(toIndex, 0, element);
  return newArr;
};

export const isStringified = (val: any) => {
  try {
    JSON.parse(val);
    return true;
  } catch (e) {
    return false;
  }
};

const urlFormattingObj: StringifyOptions = { arrayFormat: "bracket" };

export const parseUrl = (url: string) =>
  queryString.parseUrl(url, urlFormattingObj);

export const stringify = (params: any) =>
  queryString.stringify(params, urlFormattingObj);

export const addParamsToUrl = (url: string, paramsObj: object) => {
  const urlObj = parseUrl(url);
  return `${urlObj.url}?${stringify({ ...urlObj.query, ...paramsObj })}`;
};

export const getDisplayNumber = (num: number) =>
  Number.isInteger(num) ? num : num.toFixed(2);

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const convertFloatToCurrency = (val: number, currency = "INR") =>
  val.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: currency,
  });

export const getCurrentHistoryState = () =>
  window.history.state && window.history.state.state
    ? window.history.state.state
    : {};

export const getCurrentReferrer = (): string => {
  const historyObj = getCurrentHistoryState();
  if (historyObj && historyObj.from) {
    return historyObj.from;
  }
  return document.referrer;
};
export type ValidValue<T> = Exclude<T, null | undefined | 0 | "" | false>;
export const BooleanFilter = <T>(x: T): x is ValidValue<T> => Boolean(x);

export const blobToFile = (theBlob: Blob, fileName: string): File => {
  const b: any = theBlob;
  // A Blob() is almost a File() - it's just missing the two properties below which we will add
  b.lastModifiedDate = new Date();
  b.name = fileName;

  // Cast to a File() type
  return <File>theBlob;
};

export const isBlob = (value: any): value is Blob =>
  value &&
  typeof value.size === "number" &&
  typeof value.type === "string" &&
  typeof value.slice === "function";

export const isFile = (value: any): value is File =>
  typeof value.name === "string" &&
  (typeof value.lastModifiedDate === "object" ||
    typeof value.lastModified === "number") &&
  isBlob(value);

export const objectToFormData = (
  obj: Record<string, any>,
  cfg: {
    nullsAsUndefineds?: boolean;
    indices?: boolean;
  } = {},
  fd?: FormData,
  pre?: string
): FormData => {
  const formData = fd || new FormData();

  if (obj === undefined) {
    return formData;
  }
  if (obj === null) {
    if (!cfg.nullsAsUndefineds) {
      formData.append(pre || "", "");
    }
  } else if (Array.isArray(obj)) {
    if (!obj.length) {
      const key = `${pre}[]`;

      formData.append(key, "");
    } else {
      obj.forEach((value, index) => {
        const key = `${pre}[${cfg.indices ? index : ""}]`;

        objectToFormData(value, cfg, formData, key);
      });
    }
  } else if (obj instanceof Date) {
    formData.append(pre || "", obj.toISOString());
  } else if (typeof obj === "object" && !isFile(obj) && !isBlob(obj)) {
    Object.keys(obj).forEach((prop) => {
      const value = obj[prop];

      if (Array.isArray(value)) {
        while (prop.length > 2 && prop.lastIndexOf("[]") === prop.length - 2) {
          // eslint-disable-next-line no-param-reassign
          prop = prop.substring(0, prop.length - 2);
        }
      }

      const key = pre ? `${pre}[${prop}]` : prop;

      objectToFormData(value, cfg, formData, key);
    });
  } else {
    formData.append(pre || "", obj);
  }

  return formData;
};

export const addCountryCodeToIndianNumber = (number: string) => {
  // Check if the cleaned number matches the Indian number pattern
  const indianNumberPattern = /^(\+?91?)?(\d{10})$/;
  if (indianNumberPattern.test(number)) {
    // Indian phone number format matches
    if (!number.startsWith("+91")) {
      // Add "+91" country code if not already included
      return "+91" + number;
    }
  }

  // Return the original number if it doesn't match or already has the country code
  return number;
};

export const getPercentage = (num: number, dem: number): number => {
  if (num && dem) return (num / dem) * 100;
  return 0;
};

export const isProduction = () => process.env.REACT_APP_ENV === "production";

export const errorIllustrationStatusCode = (
  error: FetchBaseQueryError | SerializedError | undefined | null
) => {
  return error &&
    "status" in error &&
    typeof error.status === "number" &&
    [401, 403].includes(error.status)
    ? error.status === 401
      ? "401"
      : "403"
    : "500";
};

export const isValidHttpUrl = (string: string) => {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
};

export const debounce = (
  fn: Function,
  time: number
): ((...args: any[]) => void) => {
  let timeout: any;

  return function debounceFunction(this: any, ...args: any[]) {
    const functionCall = () => fn.apply(this, args);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};

export const inValidPhoneInputKeyPress = (key: string, prevValue: string) => {
  return (
    !/[\d+]/.test(key) ||
    (key === "+" && prevValue[0] === "+") ||
    (key !== "+" && prevValue.length === 0)
  );
};

export const getUserDetails = (): UserState["data"] =>
  store.getState().user.data;
