'use client';
import { dynamicButtonColors } from "@/helpers";
import { GearSix, PencilSimple, X } from "@phosphor-icons/react";
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
  },
  {
    id: "4",
    title: "Third task",
    description: "A very huuuge description that I dont even know how I will show it to the user, but okay, it doesn't matter now. But Im really worried about it",
    estimated_pomodoros: 15,
    done_pomodoros: 2
  },
  {
    id: "5",
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

  const [ form ] = Form.useForm();

  const {
    theme,
    setTheme
  } = useTheme();

  const handleSave = () => {}

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'This is panel header 2',
      children: <p>Making it show</p>,
    }
  ];

  const genExtra = () => (
    <div className="flex flex-row justify-between gap-4">
      <GearSix size={24}
        onClick={(event) => {
          // If you don't want click extra trigger collapse, you can prevent this:
          // event.stopPropagation();
          console.log('Settings');
        }}
      />
      <PencilSimple size={24}
        onClick={() => {
          console.log('Edit');
        }}
      />
    </div>
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
              className={`font-bold text-lg p-2 w-full mb-3 rounded-2xl ${dynamicButtonColors.secondaryDynamicButtonColors(theme)}`}
              onClick={() => setOpenCreationTaskModal(!openCreationTaskModal)}
            >
              + Add Task
            </button>
            <div></div>
          </div>
          {openCreationTaskModal && (
            <CreateNewTask
              open={openCreationTaskModal}
              setOpen={setOpenCreationTaskModal}
            />
          )}
          {!openCreationTaskModal && (
            <>
              <Collapse items={tasksApiModel.map((task) => {
                return {
                  key: task.id,
                  label: task.title,
                  extra: genExtra(),
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
