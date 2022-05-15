import { Card, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useAddTask } from "utils/task";
import { useProjectIdInUrl, useTasksQueryKey } from "./util";

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());
  const [inputMode, setInputMode] = useState(false);
  const submit = async () => {
    await addTask({
      name,
      projectId,
      kanbanId,
    });
    setName("");
    setInputMode(false);
  };
  const toggle = () => setInputMode(!inputMode);
  useEffect(() => {
    if (!inputMode) {
      setName("");
    }
  }, [inputMode]);

  if (!inputMode) {
    return <div onClick={toggle}>+创建事务</div>;
  }

  return (
    <Card>
      <Input
        size="large"
        onBlur={toggle}
        placeholder="新建任务名称"
        autoFocus={true}
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Card>
  );
};
