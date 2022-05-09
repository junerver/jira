
import { Select } from 'antd';
import React from 'react'
import { Raw } from 'types';

//获取指定组件的Props类型
type SelectProps = React.ComponentProps<typeof Select>

//注意移除原有的相同key
interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
    value: Raw | null | undefined;
    onChange: (value?: number) => void
    defaultOptionName?: string;
    options?: { name: string, id: number }[]

}

//我们可能会给antd的select传递的value是 string、number、undefined、null等类型，
//但是antd的onchange默认输入参数是string，我们通过自定义的封装将其修改为number|undefined
export const IdSelect = (props: IdSelectProps) => {
    const { value, onChange, defaultOptionName, options, ...restProps } = props
    return (
        <Select
            {...restProps}
            //当没有获取到options时，使用默认的option，即传入0显示defaultOptionName
            value={options?.length ? toNumber(value) : 0}
            onChange={value => onChange(toNumber(value) || undefined)}>
            {defaultOptionName && <Select.Option value={0}>{defaultOptionName}</Select.Option>}
            {options && options.map(({ name, id }) => (
                <Select.Option key={id} value={id}>{name}</Select.Option>
            ))}

        </Select>
    )
}

//转换value变成number，如果是NaN 返回0
const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value)
