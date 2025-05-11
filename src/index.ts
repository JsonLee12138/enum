export type PropertyKey = string | number | symbol;

export type AnyObject<T = any> = Record<PropertyKey, T>;

type WhiteSpace = ' ' | '\n' | '\t' | '\r' | '\f' | '\v';
type TrimLeft<S extends string> = S extends `${WhiteSpace}${infer R}` ? TrimLeft<R> : S;
type TrimRight<S extends string> = S extends `${infer R}${WhiteSpace}` ? TrimRight<R> : S;
type Trim<S extends string = string> = TrimLeft<TrimRight<S>>;

interface EnumImpl {
  options: EnumItem[];
  dict: Record<string | number, string | undefined>;
  has: (key: string) => boolean;
}

class EnumItem<V extends number | string = number | string, E extends AnyObject = AnyObject> {
  constructor(public readonly value: V, public readonly label?: string, public readonly extra?: E) {
  }
}
const __ENUM_INTERNAL__ = Symbol('Enum internal constructor key');

class Enum<T extends Record<string, EnumItem>> {
  #defs: T;
  static #lastValue = 0;
  static #values: (string | number)[] = [];
  private constructor(key: symbol, defs: T) {
    if (key !== __ENUM_INTERNAL__) {
      throw new Error('Enum is not a constructor');
    }
    this.#defs = defs;
    Enum.#values = [];
    Enum.#lastValue = 0;
    for (const key of Object.keys(defs) as Array<keyof T>) {
      Object.defineProperty(this, key, {
        value: defs[key],
        enumerable: true,
      });
    }
    Object.freeze(this);
  }

  static create<T extends Record<string, EnumItem>>(defs: T) {
    const v = new Enum(__ENUM_INTERNAL__, defs).#defs;
    const dict: Record<string | number, string | undefined> = {};
    for (const key in v) {
      if (Object.prototype.hasOwnProperty.call(v, key)) {
        const item = v[key];
        if (typeof item === 'object') {
          dict[item.value] = item.label;
          Object.freeze(item);
        }
      }
    }
    const result = new Proxy(v, {
      get(target, key) {
        if (key === 'options') {
          return Object.freeze(Object.values(target));
        }
        if (key === 'dict') {
          return Object.freeze(dict);
        }
        if (key === 'has') {
          return (key: string) => {
            return Object.prototype.hasOwnProperty.call(target, key);
          }
        }
        return Reflect.get(target, key);
      }
    })
    return Object.freeze(result) as T & EnumImpl;
  }

  static Item<V extends number | Trim = number | Trim, E extends AnyObject = AnyObject>(value?: V, label?: string, extra?: E) {
    if (typeof value === 'undefined') {
      if (!this.#lastValue) {
        value = 0 as V;
        this.#lastValue = 1;
      } else if (typeof this.#lastValue === 'number') {
        value = this.#lastValue as V;
      } else {
        throw new Error('Invalid value');
      }
    }
    if (typeof value === 'string') {
      value = value.trim() as V;
      if ((value as string).length === 0) {
        throw new Error('Invalid value');
      }
    }
    this.#lastValue = value as number;
    if (typeof this.#lastValue === 'number') {
      this.#lastValue++;
    }
    if (this.#values.includes(value)) {
      throw new Error('Duplicate value');
    }
    this.#values.push(value);
    return new EnumItem<V, E>(value, label, extra)
  }
}

export default Enum;
