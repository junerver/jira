export interface Epic {
    id: number
    name: string
    projectId: number
    kanbanId: number
    //开始时间
    start: string
    //结束时间
    end: string
}