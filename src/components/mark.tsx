
import React from 'react'

//传入文字，与关键词，高亮关键词
/**
const a = 'helloworo'; 
const arr = a.split('o');
#输出：(4) ['hell', 'w', 'r', '']
所以向数组的每个元素的末尾补齐关键字即可
const a = '测试食物'; 
const arr = a.split('物');
VM8166:1 (2) ['测试食', '']
 */
export const Mark = ({ name, keyword }: { name: string, keyword: string }) => {
    if (!keyword) {
        return <>{name}</>
    }
    const arr = name.split(keyword)
    return (
        <>
            {
                arr.map((item, index) => <span key={index}>
                    {item}
                    {
                        index === arr.length - 1 ? null : <span style={{ color: '#257AFD' }}>{keyword}</span>
                    }
                </span>)
            }
        </>
    )
}
