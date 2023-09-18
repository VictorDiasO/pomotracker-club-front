'use client';
import { X } from "@phosphor-icons/react";
import { Button, Collapse, CollapseProps, Form, Input, InputNumber, Modal } from "antd";
import { useTheme } from "next-themes";
import { Dispatch, SetStateAction, useState } from "react";

interface ITasksModal {
  openSettingsModal: boolean;
  setOpenSettingsModal: (value: SetStateAction<boolean>) => void;
}

const tasksApiModel = [
  {
    id: "2",
    title: "First task",
    description: "A very huuuge description that I dont even know how I will show it to the user, but okay, it doesn't matter now. But Im really worried about it",
    estimated_pomodoros: 15,
    done_pomodoros: 2
  },
  {
    id: "3",
    title: "Second task",
    description: "A very huuuge description that I dont even know how I will show it to the user, but okay, it doesn't matter now. But Im really worried about it",
    estimated_pomodoros: 15,
    done_pomodoros: 2
  }
];

export const TasksModal = ({
  openSettingsModal,
  setOpenSettingsModal
}: ITasksModal) => {
  const [openCreationTaskModal, setOpenCreationTaskModal] = useState<boolean>(false);

  const [ form ] = Form.useForm();

  const Panel = Collapse.Panel;

  const collapseItems: CollapseProps['items'] = [
    {
      key: '1',
      label: '+ Add Task',
      children: (
        <div>
        </div>
      ),
    }
  ];

  const {
    theme,
    setTheme
  } = useTheme();

  const handleSave = () => {}

  return (
    <Modal
      open={openSettingsModal}
      onCancel={() => setOpenSettingsModal(false)}
      onOk={() => handleSave()}
      okText='Save'
      className="-mt-[80px] md:-mt-0 lg:-mt-0"
      maskStyle={{
        backgroundColor: 'GrayText',
        opacity: 0.5
      }}
      closeIcon={(
        <X size={24} color={theme?.includes('light') ? '#000' : '#FFF'} />
      )}
      footer={false}
    >
      <div className="p-7">
        <div className="flex flex-row justify-between">
          <h2 className="font-roboto font-semibold text-2xl mb-7">
            Tasks
          </h2>
        </div>
        <div>
          <button
            className="font-bold"
            onClick={() => setOpenCreationTaskModal(!openCreationTaskModal)}
          >
            + Add Task
          </button>
          {openCreationTaskModal && (
            <CreateNewTask
              open={openCreationTaskModal}
              setOpen={setOpenCreationTaskModal}
            />
          )}
          {!openCreationTaskModal && (
            <>
              {tasksApiModel.map(task => (
                <div key={task.id}>
                  <p>{task.title}</p>
                  <p>{task.description}</p>
                  <p>{task.estimated_pomodoros}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}

const CreateNewTask = ({open, setOpen}: any) => {
  const [ form ] = Form.useForm();

  const formItems = {
    taskTitle: 'taskTitle',
    taskDesc: 'taskDescription',
    estimatedPomos: 'estimatedPomodoros',
    donePomos: 'donePomodoros'
  }

  const handleSave = async () => {}

  return (
    <div
      className="mt-6"
    >
      <Form
        layout="horizontal"
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 14 }}
        labelAlign="left"
        style={{ maxWidth: 600 }}
        form={form}
        onFinish={handleSave}
      >
        <Form.Item
          label="Task Title"
          name={formItems.taskTitle}
        >
          <Input
            placeholder="Boring title for this task"
            className="w-full"
          />
        </Form.Item>
        <Form.Item
          label="Description"
          name={formItems.taskDesc}
        >
          <Input
            placeholder="Insert a good description"
            className="w-full"
          />
        </Form.Item>
        <Form.Item
          label="Estimated Pomodoros"
          name={formItems.estimatedPomos}
        >
          <InputNumber
            placeholder="ex: 7"
            className="w-full"
          />
        </Form.Item>
        <Form.Item
          label="Done Pomodoros"
          name={formItems.donePomos}
        >
          <InputNumber
            placeholder="ex: 2"
            className="w-full"
          />
        </Form.Item>
        <div className="flex justify-between mt-5 max-w-[100%]">
          <div></div>
          <Button
            htmlType="submit"
            type="primary"
            className="flex bg-blue-400"
          >
            Create task
          </Button>
          <div></div>
        </div>
      </Form>
    </div>
  );
}
