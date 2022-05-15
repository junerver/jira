import {
    Draggable,
    DraggableProps,
    Droppable,
    DroppableProps,
    DroppableProvided,
    DroppableProvidedProps
} from "react-beautiful-dnd";
import React, { ReactNode } from "react";

//替换DroppableProps中的children
type DropProps = Omit<DroppableProps, 'children'> & { children: ReactNode };

//用于放置的组件
export const Drop = ({ children, ...props }: DropProps) => {
    return (
        <Droppable {...props}>
            {
                (provided) => {
                    //clone children 并且将自生的ref赋值给子元素
                    if (React.isValidElement(children)) {
                        //给children传递的props
                        return React.cloneElement(children, {
                            ref: provided.innerRef,
                            ...provided.droppableProps,
                            provided
                        })
                    }
                    return <div />
                }
            }
        </Droppable>
    );
}

type DropChildProps =
//对应上面给children传递的props (droppableProps: DroppableProvidedProps;)
    Partial<{ provided: DroppableProvided } & DroppableProvidedProps>
    //传递普通的div的props
    & React.HtmlHTMLAttributes<HTMLDivElement>
// forwardRef() 函数接受两个泛型，1：内部组件类型，2：内部组件的Props类型
export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(
    ({ children, ...props }, ref) =>
        <div ref={ref} {...props} >
            {children}
            {props.provided?.placeholder}
        </div>
)

//可拖动组件的props
type DragProps = Omit<DraggableProps, 'children'> & { children: ReactNode };

//可拖动组件
export const Drag = ({ children, ...props }: DragProps) => {
    return (
        <Draggable {...props}>
            {
                (provided) => {
                    if (React.isValidElement(children)) {
                        return React.cloneElement(children, {
                            ref: provided.innerRef,
                            ...provided.draggableProps,
                            ...provided.dragHandleProps,
                        })
                    }
                    return <div />
                }
            }
        </Draggable>
    )
}