import { PlainObject } from "../types/plain-object.type";

class Value {
  static isValidPrimitive(value: any): boolean {
    if (value === null || value === undefined) return false;

    switch (typeof value) {
      case 'string':
        return value !== '';
      case 'number':
        return true;
      case 'boolean':
        return true;
      default:
        return false;
    }
  }

  static isFalsy(value: any): boolean {
    if (value === null || value === undefined) return true;

    switch (typeof value) {
      case 'string':
        return value === '';
      case 'number':
        return false;
      case 'boolean':
        return !value;
      case 'object':
        return Array.isArray(value)
          ? value.length === 0
          : Object.keys(value).length === 0;
      case 'undefined':
        return true;
      case 'function':
        return false;
      case 'bigint':
        return false;
      case 'symbol':
        return false;
      default:
        return false;
    }
  }
}

class Obj {
  static clean(obj: Record<string, any>): Record<string, any> {
    const cleaned: Record<string, any> = {};

    for (const key in obj) {
      const value = obj[key];

      if (Value.isValidPrimitive(value)) {
        cleaned[key] = value;
        continue;
      }

      if (Arr.isArray(value)) {
        if (Arr.isEmpty(value)) continue;
        const result = Arr.clean(value);
        if (!result) continue;
        cleaned[key] = result;
        continue;
      }

      if (Obj.isPlain(value)) {
        const result = Obj.clean(value);
        if (!result) continue;
        cleaned[key] = result;
        continue;
      }
    }

    return Obj.isEmpty(cleaned) ? null : cleaned;
  }

  static isPlain(value: any): boolean {
    if (!value) return false;
    if (typeof value !== 'object') return false;
    if (value instanceof Array) return false;
    if (value instanceof Date) return false;
    if (value instanceof RegExp) return false;
    const proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
  }

  static isEmpty(value: any): boolean {
    if (!value) return true;
    return Object.keys(value).length === 0;
  }

  static hasValidProps(obj: Record<string, any>): boolean {
    for (let key in obj) {
      const value = obj[key];
      if (Value.isValidPrimitive(value) || Obj.isPlain(value)) return true;
    }

    return false;
  }
}

class Arr {
  static clean(arr: any[]): any[] | null {
    const cleaned: any[] = [];

    for (const item of arr) {
      if (Value.isValidPrimitive(item)) {
        cleaned.push(item);
        continue;
      }

      if (Arr.isArray(item)) {
        if (Arr.isEmpty(item)) continue;
        const result = Arr.clean(item);
        if (!result) continue;
        cleaned.push(result);
        continue;
      }

      if (Obj.isPlain(item)) {
        const result = Obj.clean(item);
        if (!result) continue;
        cleaned.push(result);
        continue;
      }
    }

    return Arr.isEmpty(cleaned) ? null : cleaned;
  }

  static isEmpty(value: any[]): boolean {
    return value.length === 0;
  }

  static isArray(value: any): boolean {
    return Array.isArray(value);
  }
}

class Dat {
  static isValid(value: any): boolean {
    return value instanceof Date && !isNaN(value.getTime());
  }

  static unixToDate(input?: number): Date | undefined {
    if (!input) return
    return new Date(input * 1000);
  }

  static unixToISO(input?: number): string | undefined {
    if (!input) return
    const date = new Date(input * 1000);
    return date.toISOString();
  }
}

class Str {
  static toSlug(value: string): string {
    if (!value) return value;
    return value.toLowerCase().replace(/\s/g, '-'); //TODO: CREATE TESTS FOR THIS
  }

  static toSnakeCase(input?: string): string | undefined { //TODO: CREATE TESTS FOR THIS
    if (!input) return input;
    return input.replace(/[^a-zA-Z0-9]/g, '_') // Replace non-alphanumeric characters with underscore
  }
}

class Enum {
  static isValueOf(enumType?: any, value?: any): boolean {
    if (!enumType || !value) return false;
    return Object.values(enumType).includes(value);
  }
}

class Num {
  static isNumber(value: any): boolean {
    return typeof value === 'number';
  }

  static isValidNumber(value: any): boolean {
    return !isNaN(value);
  }
}

class Mapper {
  static arrToRecord<T>(attr: string, arr: T[]): Record<string, T> {
    const map: Record<string, any> = {};
    for (const item of arr) map[String(item[attr])] = item;
    return map;
  }

  static arrToMap<T extends PlainObject>(attr: keyof T, arr: T[]): Map<string, T> {
    const map = new Map<string, T>();
    for (const item of arr) map.set(String(item[attr]), item);
    return map;
  }
}

export class Utils {
  static Obj = Obj;
  static Arr = Arr;
  static Str = Str;
  static Dat = Dat;
  static Num = Num;
  static Enum = Enum;
  static Value = Value;
  static Mapper = Mapper;
}
