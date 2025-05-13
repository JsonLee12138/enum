# TypeScript Enum

**[中文文档](https://github.com/JsonLee12138/enum/blob/main/README.md)**

## Introduction

`@jsonlee_12138/enum` is a utility library for creating type-safe enums in TypeScript. It offers more powerful features than the built-in `enum`, including labels, extra metadata, and easy access to `options` and `dict` collections.

## Installation

```bash
# using npm
npm install @jsonlee_12138/enum --save

# using yarn
yarn add @jsonlee_12138/enum

# using pnpm
pnpm add @jsonlee_12138/enum
```

## Basic Usage

```typescript
import Enum { type EnumValue, type EnumValues } from '@jsonlee_12138/enum';

// Define an enum
const Status = Enum.create({
  PENDING:    Enum.Item(0, 'Pending'),
  PROCESSING: Enum.Item(1, 'Processing'),
  COMPLETED:  Enum.Item(2, 'Completed', { color: 'green' })
});

// Use it
console.log(Status.PENDING.value);   // 0
console.log(Status.PENDING.label);   // 'Pending'
console.log(Status.PENDING.extra);   // undefined

console.log(Status.COMPLETED.value); // 2
console.log(Status.COMPLETED.label); // 'Completed'
console.log(Status.COMPLETED.extra); // { color: 'green' }

// Type Handling
EnumValue<typeof Status> // 0 | 1 | 2
EnumValues<typeof Status> // (0 | 1 | 2)[]
// Note: If there is no value, it will be inferred as string | number. Therefore, it is best to add generics, as shown below
const Colors = Enum.create({
  Red: Enum.Item<0>(),
  Blue: Enum.Item<1>(),
  Green: Enum.Item<2>(),
})
```

## Automatic Increment

If you omit the value, the enum value will auto-increment:

```typescript
const Colors = Enum.create({
  RED:   Enum.Item(), // value: 0
  GREEN: Enum.Item(), // value: 1
  BLUE:  Enum.Item()  // value: 2
});
```

## Reading `options`

The `options` array contains all entries in the form of `{ value, label, extra }`:

```typescript
const Status = Enum.create({
  PENDING:    Enum.Item(0, 'Pending'),
  PROCESSING: Enum.Item(1, 'Processing'),
  COMPLETED:  Enum.Item(2, 'Completed', { color: 'green' })
});

console.log(Status.options);
// [
//   { value: 0, label: 'Pending',    extra: undefined },
//   { value: 1, label: 'Processing', extra: undefined },
//   { value: 2, label: 'Completed',  extra: { color: 'green' } }
// ]
```

## Reading `dict`

The `dict` object maps values to labels:

```typescript
const Status = Enum.create({
  PENDING:    Enum.Item(0, 'Pending'),
  PROCESSING: Enum.Item(1, 'Processing'),
  COMPLETED:  Enum.Item(2, 'Completed', { color: 'green' })
});

console.log(Status.dict);
// {
//   '0': 'Pending',
//   '1': 'Processing',
//   '2': 'Completed'
// }
```

## `has` Method

```typescript
const Status = Enum.create({
  PENDING:    Enum.Item(0, 'Pending'),
  PROCESSING: Enum.Item(1, 'Processing'),
  COMPLETED:  Enum.Item(2, 'Completed', { color: 'green' })
});

console.log(Status.has(0)) // true
console.log(Status.has('PENDING')) // false
```

## `get` Method

```typescript
const Status = Enum.create({
  PENDING: Enum.Item(0, 'Pending'),
  PROCESSING: Enum.Item(1, 'Processing'),
  COMPLETED: Enum.Item(2, 'Completed', { color: 'green' })
});

console.log(Status.get(0)) // {value: 0, label: 'Pending', extra: undefined}
```

## Features

- 🛡️ Type-safe enum definitions
- 📝 Support for labels (`label`)
- 📦 Support for extra metadata (`extra`)
- 🔢 Automatic value increment
- 🚫 Duplicate-value prevention
- 🔒 Immutable enum instances
- 📋 Readable `options` array
- 🔑 Readable `dict` mapping

## Contributing

Contributions are welcome! Please open an issue or submit a pull request to help improve the library.

## License

MIT

## Contact

- Discord: https://discord.gg/666U6JTCQY
