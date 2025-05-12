import { describe, expect, test } from 'vitest';
import Enum, { type EnumValue, type EnumValues } from '../src';

describe('test auto import', () => {
  test('test auto import', async () => {
    const A = Enum.create({
      AAA: Enum.Item(1, ()=> '测试A', { dayjs: 'dayjsAAA' }),
      BBB: Enum.Item(2, '测试B'),
    })

    console.log('A', A);
    // const a = A.dict[1] as EnumLabel<typeof A, 'AAA'>
    const aValues: EnumValues<typeof A> = [1, 2];
    expect(aValues).toEqual([1, 2]);
    expect(A.AAA.value).toBe(1);
    expect(A.BBB.value).toBe(2);
    expect(A.AAA.label).toBe('测试A');
    expect(A.BBB.label).toBe('测试B');
    expect(A.AAA.extra).toEqual({ dayjs: 'dayjsAAA' });
    expect(A.BBB.extra).toBeUndefined();
    const aOptions = [
      { value: 1, label: '测试A', extra: { dayjs: 'dayjsAAA' } },
      { value: 2, label: '测试B', extra: undefined }
    ];
    const aDict = { '1': '测试A', '2': '测试B' };
    expect(A.options).toEqual(aOptions);
    expect(A.dict).toEqual(aDict);
    console.log('A.dict[2]', A.dict[2]);
    expect(A.dict[2]).toBe('测试B');
    console.log('A.options', A.options);
    console.log('A.dict', A.dict);
    expect(A.has('AAA')).toBe(true);
    console.log('A.has', A.has('AAA'));
    const B = Enum.create({
      AAA: Enum.Item(),
      BBB: Enum.Item(),
      CCC: Enum.Item(),
    })
    const bValue: EnumValue<typeof B> = 1;
    console.log('B', B);
    expect(B.AAA.value).toBe(0);
    expect(B.BBB.value).toBe(1);
    expect(B.CCC.value).toBe(2);
  });
})
