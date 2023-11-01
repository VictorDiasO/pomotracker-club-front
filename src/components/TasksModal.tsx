'use client';
import { dynamicButtonColors } from "@/helpers";
import { PencilSimple, X } from "@phosphor-icons/react";
import { Button, Collapse, Form, Input, InputNumber, Modal } from "antd";
import { useTheme } from "next-themes";
import { Dispatch, SetStateAction, useState } from "react";

interface ITasksModal {
  openSettingsModal: boolean;
  setOpenSettingsModal: (value: SetStateAction<boolean>) => void;
}

interface ITask {
  id: number;
}

const tasksApiModel = [
  {
    id: 2,
    title: "First task",
    description: "A very huuuge description that I dont even know how I will show it to the user, but okay, it doesn't matter now. But Im really worried about it",
    estimated_pomodoros: 15,
    done_pomodoros: 2
  },
  {
    id: 3,
    title: "Second task",
    description: "A very huuuge description that I dont even know how I will show it to the user, but okay, it doesn't matter now. But Im really worried about it",
    estimated_pomodoros: 15,
    done_pomodoros: 2
  },
  {
    id: 4,
    title: "Third task",
    description: "A very huuuge description that I dont even know how I will show it to the user, but okay, it doesn't matter now. But Im really worried about it",
    estimated_pomodoros: 15,
    done_pomodoros: 2
  },
  {
    id: 5,
    title: "Forth task",
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
  const [editTaskModalId, setEditTaskModalId] = useState<number | null>(null);

  const [ form ] = Form.useForm();

  const {
    theme
  } = useTheme();

  const handleSave = () => {}

  const genExtra = (taskId: number) => (
    <PencilSimple size={24}
      onClick={(event) => {
        event.stopPropagation();
        console.log('Edit', taskId);
        setEditTaskModalId(taskId);
      }}
    />
  );


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
      <div className="lg:p-7 p-0">
        <div className="flex flex-row justify-between">
          <h2 className="font-roboto font-semibold text-2xl mb-7">
            Tasks
          </h2>
        </div>
        <div>
          <div className="flex flex-row justify-between">
            <div></div>
            <button
              className={`font-bold text-lg p-2 w-full mb-3 rounded-2xl ${dynamicButtonColors.primaryDynamicButtonColors(theme)}`}
              onClick={() => setOpenCreationTaskModal(!openCreationTaskModal)}
            >
              {openCreationTaskModal ? 'See Tasks' : '+ Add Task'}
            </button>
            <div></div>
          </div>
          {openCreationTaskModal && (
            <CreateNewTask
              open={openCreationTaskModal}
              setOpen={setOpenCreationTaskModal}
            />
          )}
          {editTaskModalId}
          {!openCreationTaskModal && (
            <>
              <Collapse items={tasksApiModel.map((task) => {
                return {
                  key: task.id,
                  label: task.title,
                  extra: genExtra(task.id),
                  children: <div className="flex flex-col gap-2">
                    <div>
                      <h3
                        className="font-bold text-lg"
                      >
                        Description:
                      </h3>
                      <p>{task.description}</p>
                    </div>
                    <div>
                      <h3
                        className="font-bold text-lg"
                      >
                        Estimated Pomodoros:
                      </h3>
                      <p>{task.done_pomodoros}/{task.estimated_pomodoros}</p>
                    </div>
                  </div>
                }
              })} className="bg-white" />
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}

const formItems = {
  taskTitle: 'taskTitle',
  taskDesc: 'taskDescription',
  estimatedPomos: 'estimatedPomodoros',
  donePomos: 'donePomodoros'
}

type TCreateNewTask = {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

const CreateNewTask = ({open, setOpen}: TCreateNewTask) => {
  const [ form ] = Form.useForm();

  const handleSave = async () => {}

  return (
    <div
      className="mt-6"
    >
      <Form
        layout="vertical"
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
          <Input.TextArea
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

type TEditTask = {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  taskContent: ITask
}

const EditTask = ({open, setOpen, taskContent}: any) => {
  const [ form ] = Form.useForm();

  const handleSave = async () => {}

  return (
    <div
      className="mt-6"
    >
      <Form
        layout="vertical"
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
          <Input.TextArea
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
