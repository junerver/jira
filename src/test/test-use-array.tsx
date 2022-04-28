import React from 'react'
import { useArray } from '../utils'

type P = {
    id: string,
    name: string,
    age: number,
}
const TestUseArray = () => {
    const persons: P[] = [
        { id: '1', name: 'aa', age: 1 },
        { id: '2', name: 'bb', age: 2 },
        { id: '3', name: 'cc', age: 3 },
    ]
    const { value, clear, add, remove } = useArray(persons)
    return (
        <div>
            <button onClick={() => add({ id: "4", name: "xxx", age: 4 })}>add dd</button>
            <button onClick={() => remove(0)}>remove 0</button>
            <button onClick={() => clear()}>clear</button>
            {
                value.length > 0 && value.map((item, index) => {
                    return (
                        <div key={index}>
                            {item.name}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TestUseArray