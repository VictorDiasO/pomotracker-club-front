'use client';
import { dynamicButtonColors } from "@/helpers";
import { generateRandomId } from "@/services/database/db-helpers";
import db from "@/services/database/pouchdb";
import { CheckFat, PencilSimple, Trash, X } from "@phosphor-icons/react";
import { Button, Collapse, Form, Input, InputNumber, Modal, Switch, notification } from "antd";
import { useTheme } from "next-themes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface ITasksModal {
  openSettingsModal: boolean;
  setOpenSettingsModal: (value: SetStateAction<boolean>) => void;
}

interface ITask {
  _id: string;
  title: string;
  description: string;
  estimatedPomodoros: number;
  donePomodoros: number;
  _rev: string;
}

export const TasksModal = ({
  openSettingsModal,
  setOpenSettingsModal
}: ITasksModal) => {
  const [allTasks, setAllTasks] = useState<ITask[]>([]);
  const [openCreationTaskModal, setOpenCreationTaskModal] = useState<boolean>(false);
  const [editTaskModalId, setEditTaskModalId] = useState<string | null>(null);
  const [deleteTaskModalId, setDeleteTaskModalId] = useState<string | null>(null);

  const {
    theme
  } = useTheme();

  const genExtra = (taskId: string) => (
    <div
      className="flex flex-row gap-7"
    >
      <CheckFat
        size={24}
        weight="fill"
        color="green"
        className="hover:opacity-60 transition-opacity"
      />
      <Trash
        size={24}
        color="red"
        className="hover:opacity-60 transition-opacity"
        onClick={(event) => {
          event.stopPropagation();
          console.log('Delete', taskId);
          setDeleteTaskModalId(taskId);
        }}
      />
    </div>
  );

  useEffect(() => {
    db.allDocs({ include_docs: true })
      .then(result => {
        const documents = result.rows.map(row => row.doc);
        if (documents.length >= 1) {
          documents.sort((a: any, b: any) => {
            return a.created_at - b.created_at;
          });

          setAllTasks(documents as ITask[]);
        } else {
          console.log('No tasks yet.');
        }
      })
      .catch(error => {
        console.error('Error fetching documents:', error);
      });
  }, [openCreationTaskModal, setOpenCreationTaskModal, editTaskModalId, setEditTaskModalId]);

  return (
    <Modal
      open={openSettingsModal}
      onCancel={() => setOpenSettingsModal(false)}
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
            Manage Tasks
          </h2>
        </div>
        <div>
          <div className="flex flex-row justify-between">
            <div></div>
            <button
              className={`font-bold text-lg p-2 w-full mb-3 rounded-2xl ${dynamicButtonColors.primaryDynamicButtonColors(theme)} hover:opacity-70 transition-opacity`}
              onClick={() => setOpenCreationTaskModal(!openCreationTaskModal)}
            >
              {openCreationTaskModal ? 'See Tasks (Go Back)' : '+ Add Task'}
            </button>
            <div></div>
          </div>
          {openCreationTaskModal && (
            <CreateNewTask
              open={openCreationTaskModal}
              setOpen={setOpenCreationTaskModal}
              theme={theme}
            />
          )}
          {deleteTaskModalId && (
            // It needs to be showing the delete confirmation modal
            <CreateNewTask
              open={openCreationTaskModal}
              setOpen={setOpenCreationTaskModal}
              theme={theme}
            />
          )}
          {!openCreationTaskModal && (
            <Collapse items={allTasks.map((task) => {
              return {
                key: task._id,
                label: task.title,
                extra: genExtra(task._id),
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
                    <p>{task.donePomodoros} / {task.estimatedPomodoros}</p>
                  </div>
                </div>
              }
            })} className="bg-white" />
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
  donePomos: 'donePomodoros',
  inProgress: 'inProgress'
}

type TCreateNewTask = {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  theme: string | undefined,
}

const CreateNewTask = ({open, setOpen, theme}: TCreateNewTask) => {
  const [ form ] = Form.useForm();

  const handleSave = async () => {
    const hasInvalidFields = await form.validateFields()
      .then(() => false)
      .catch((errors) => !!errors.errorFields.length);

    if (hasInvalidFields) return;

    const values = form.getFieldsValue();

    try {
      const id = generateRandomId(18);
      await db.put({
        _id: id,
        title: values[formItems.taskTitle],
        description: !values[formItems.taskDesc] ? '' : values[formItems.taskDesc],
        estimatedPomodoros: !values[formItems.estimatedPomos] ? 0 : values[formItems.estimatedPomos],
        donePomodoros: !values[formItems.donePomos] ? 0 : values[formItems.donePomos],
        inProgress: !!values[formItems.inProgress],
        created_at: new Date(),
        updated_at: null,
      });
      notification.success({
        message: 'Task created successfully!',
        placement: 'topRight'
      });
      setOpen(false);
    } catch (error) {
      notification.error({
        message: 'Task created successfully!',
        placement: 'topRight'
      });
      console.log(error);
    }
  }

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
          rules={[
            {
              required: true,
              message: 'Define the task title.'
            }
          ]}
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
        <Form.Item
          label="In Progress?"
          name={formItems.inProgress}
        >
          <Switch
            className="w-full"
            checkedChildren={
              <p className="font-bold">YES, IN PROGRESS!</p>
            }
            unCheckedChildren={
              <p className="font-bold">NO, NOT YET</p>
            }
          />
        </Form.Item>
        <div className="flex justify-between mt-5 max-w-[100%]">
          <div></div>
          <button
            type="submit"
            className={`flex ${theme?.includes('dark') ? 'text-white' : 'text-black'} ${dynamicButtonColors.primaryDynamicButtonColors(theme)} hover:opacity-70 transition-opacity font-bold p-2 rounded-xl`}
          >
            Create task
          </button>
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
