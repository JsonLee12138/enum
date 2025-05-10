# TypeScript Enum

**[English document](https://github.com/JsonLee12138/enum/blob/main/README.en.md)**

## 介绍

`@jsonlee_12138/enum` 是一个用于创建类型安全的枚举的工具库。它提供了比 TypeScript 原生 `enum` 更强大的功能，包括标签、额外属性、读取 `options` 和 `dict` 等特性。

## 安装

```bash
# 使用 npm
npm install @jsonlee_12138/enum --save

# 使用 yarn
yarn add @jsonlee_12138/enum

# 使用 pnpm
pnpm add @jsonlee_12138/enum
```

## 基础使用

```typescript
import Enum from '@jsonlee_12138/enum';

// 创建枚举
const Status = Enum.create({
  PENDING: Enum.Item(0, '待处理'),
  PROCESSING: Enum.Item(1, '处理中'),
  COMPLETED: Enum.Item(2, '已完成', { color: 'green' })
});

// 使用枚举
console.log(Status.PENDING.value);    // 0
console.log(Status.PENDING.label);    // '待处理'
console.log(Status.PENDING.extra);    // undefined

console.log(Status.COMPLETED.value);  // 2
console.log(Status.COMPLETED.label);  // '已完成'
console.log(Status.COMPLETED.extra);  // { color: 'green' }
```

## 自动递增

如果不指定值，枚举值会自动递增：

```typescript
const Colors = Enum.create({
  RED: Enum.Item(),    // value: 0
  GREEN: Enum.Item(),  // value: 1
  BLUE: Enum.Item()    // value: 2
});
```

## 读取 `options`

```typescript
const Status = Enum.create({
  PENDING: Enum.Item(0, '待处理'),
  PROCESSING: Enum.Item(1, '处理中'),
  COMPLETED: Enum.Item(2, '已完成', { color: 'green' })
});

console.log(Colors.options)
// [
//    { value: 0, label: '待处理', extra: undefined },
//    { value: 1, label: '处理中', extra: undefined },
//    { value: 2, label: '已完成', extra: { color: 'green' } }
// ]
```

## 读取 `dict`

```typescript
const Status = Enum.create({
  PENDING: Enum.Item(0, '待处理'),
  PROCESSING: Enum.Item(1, '处理中'),
  COMPLETED: Enum.Item(2, '已完成', { color: 'green' })
});

console.log(Colors.dict)
// {
//    '0': '待处理',
//    '1': '处理中',
//    '2': '已完成'
// }
```

## 特性

- 🛡️ 类型安全
- 📝 支持标签（`label`）
-  支持额外属性（`extra`）
-  自动递增值
- 🚫 防止重复值
-  不可变枚举
-  支持读取 `options`
-  支持读取 `dict`

## 📝 贡献指南
欢迎提交`issue`或`pull request`，共同完善`TypeScript Enum`。

## 📄 许可证

MIT

## 联系我们

- [Discord](https://discord.gg/666U6JTCQY)
