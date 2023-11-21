'use client';
import { dynamicButtonColors, dynamicTextColors } from "@/helpers";
import db, { ITask } from "@/services/database/pouchdb";
import { CheckFat, Circle, X } from "@phosphor-icons/react";
import { Button, Collapse, Form, Input, InputNumber, Modal, Spin, Switch, Tooltip, notification } from "antd";
import { useLiveQuery } from "dexie-react-hooks";
import { useTheme } from "next-themes";
import { Dispatch, SetStateAction, useState } from "react";
import { LoadingOutlined } from '@ant-design/icons';

interface ITasksModal {
  openSettingsModal: boolean;
  setOpenSettingsModal: (value: SetStateAction<boolean>) => void;
}

export const TasksModal = ({
  openSettingsModal,
  setOpenSettingsModal
}: ITasksModal) => {
  const [allTasks, setAllTasks] = useState<ITask[]>([]);
  const [openCreationTaskModal, setOpenCreationTaskModal] = useState<boolean>(false);
  const [openDeleteTaskModal, setOpenDeleteTaskModal] = useState<null | number | undefined>(null);
  const [openEditTaskModal, setOpenEditTaskModal] = useState<null | number>(null);

  const {
    theme
  } = useTheme();

  const toggleTaskInProgress = (taskInfo: ITask) => {
    if (taskInfo.id === undefined) return;

    db.tasks.update(taskInfo.id, { inProgress: !taskInfo.inProgress })
  }

  const genExtra = (taskInfo: ITask) => (
    // Im thinking about which options should be here... And I think that the maximum needs to be 2
    // Maybe I can put just the "Mark as Done and Undone" functionality AND the functionality to put this task as the "actual" task.
    // Our pomodoro make possible to the user to work and put "in progress" more than 1 task. We believe in maximum flexibility for our users.
    // The "Edit" and "Delete" functionalities will be available only when the user open the task to see more details.
    <div
      className="flex flex-row gap-7"
    >
      <Tooltip placement="top" title={"Mark as Done"}>
        <CheckFat
          size={24}
          weight="fill"
          color="green"
          className="hover:opacity-60 transition-opacity"
        />
      </Tooltip>
      <Tooltip placement="top" title={taskInfo.inProgress ? "In Progress..." : "Set as In Progress"}>
        {taskInfo.inProgress
          ? (
            <Spin
              indicator={
                <LoadingOutlined
                  onClick={() => toggleTaskInProgress(taskInfo)}
                  style={{ fontSize: 24 }}
                  spin
                />
              }
            />
          )
          : (
            <Circle
              size={24}
              weight="fill"
              className="text-yellow-500 hover:opacity-60 transition-opacity"
              onClick={() => toggleTaskInProgress(taskInfo)}
            />
          )
        }
      </Tooltip>
    </div>
  );

  useLiveQuery(
    async () => {
      const tasks = await db.tasks.toArray();
      if (tasks.length >= 1) {
        tasks.sort((a: any, b: any) => {
          return a.created_at - b.created_at;
        });

        setAllTasks(tasks);
      }
    },
    [openCreationTaskModal, setOpenCreationTaskModal, openEditTaskModal, setOpenEditTaskModal, toggleTaskInProgress]
  );

  return (
    <Modal
      open={openSettingsModal}
      onCancel={() => setOpenSettingsModal(false)}
      okText='Save'
      className="-mt-[80px] md:-mt-0 lg:-mt-0"
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
          {!openDeleteTaskModal && (
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
          )}
          {openCreationTaskModal && (
            <CreateNewTask
              isOpen={openCreationTaskModal}
              setIsOpenState={setOpenCreationTaskModal}
              theme={theme}
            />
          )}
          {openEditTaskModal && (
            <EditTask
              openId={openEditTaskModal}
              setIsOpenState={setOpenEditTaskModal}
              theme={theme}
            />
          )}
          {openDeleteTaskModal && (
            // It needs to be showing the delete confirmation modal
            <DeleteTaskModal
              openId={openDeleteTaskModal}
              setOpenState={setOpenDeleteTaskModal}
              theme={theme}
            />
          )}
          {!openCreationTaskModal && !openDeleteTaskModal && !openEditTaskModal && (
            <Collapse items={allTasks.map((task) => {
              return {
                key: task.id,
                label: task.title,
                extra: genExtra(task),
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
                    <div className="flex">
                      <p
                        className="font-bold text-5xl"
                      >
                        {task.donePomodoros}
                      </p>{" "}/{" "} 
                      {task.estimatedPomodoros}
                    </div>
                  </div>
                  <div>
                    <button
                      className={`font-bold text-lg text-white p-2 w-full mb-1 rounded-2xl ${dynamicButtonColors.primaryDynamicButtonColors(theme)} hover:opacity-70 transition-opacity`}
                      onClick={() => task.id && setOpenEditTaskModal(task.id)}
                    >
                      {openEditTaskModal ? "Save" :  "Edit"}
                    </button>
                  </div>
                  <div>
                    <button
                      className={`font-bold text-lg ${dynamicTextColors.primaryDynamicTextColors(theme)} p-2 w-full mb-3 rounded-2xl bg-gray-300 hover:opacity-70 transition-opacity`}
                      onClick={() => setOpenDeleteTaskModal(task.id)}
                    >
                      Delete
                    </button>
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
  isOpen: boolean,
  setIsOpenState: Dispatch<SetStateAction<boolean>>,
  theme: string | undefined,
}

const CreateNewTask = ({isOpen, setIsOpenState, theme}: TCreateNewTask) => {
  const [ form ] = Form.useForm();

  const handleSave = async () => {
    const hasInvalidFields = await form.validateFields()
      .then(() => false)
      .catch((errors) => !!errors.errorFields.length);

    if (hasInvalidFields) return;

    const values = form.getFieldsValue();

    try {
      await db.tasks.add({
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
      setIsOpenState(false);
    } catch (error) {
      notification.error({
        message: 'Error while creating the task!',
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
  openId: number,
  setIsOpenState: Dispatch<SetStateAction<number | null>>,
  theme: string | undefined,
}

const EditTask = ({openId, setIsOpenState, theme}: TEditTask) => {
  const [ form ] = Form.useForm();
  const [taskData, setTaskData] = useState<ITask>();


  const handleSave = async () => {}

  useLiveQuery(
    async () => {
      const taskById = await db.tasks.get(openId);
      setTaskData(taskById);
    },
    []
  );

  form.setFieldsValue({
    [formItems.taskTitle]: taskData?.title,
    [formItems.taskDesc]: taskData?.description,
    [formItems.estimatedPomos]: taskData?.estimatedPomodoros,
    [formItems.donePomos]: taskData?.donePomodoros,
    [formItems.inProgress]: taskData?.inProgress,
  });

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

type TDeleteTaskModal = {
  openId: number,
  setOpenState: Dispatch<SetStateAction<number | null | undefined>>,
  theme: string | undefined,
}

const DeleteTaskModal = ({openId, setOpenState, theme}: TDeleteTaskModal) => {
  const [taskData, setTaskData] = useState<ITask>();

  const deleteTask = async () => {
    try {
      await db.tasks.delete(openId);
      notification.success({
        message: 'Task deleted successfully!',
        placement: 'topRight'
      });
      setOpenState(null);
    } catch (error) {
      notification.error({
        message: 'Error while deleting the task!',
        placement: 'topRight'
      });
      console.log(error);
    }
  }

  useLiveQuery(
    async () => {
      const taskById = await db.tasks.get(openId);
      setTaskData(taskById);
    },
    []
  );

  return (
    <div
      className="mt-6"
    >
      <h1
        className="text-2xl flex text-center self-center"
      >
        Are you sure that you want to delete this task?
      </h1>
      <h1
        className="text-xl ml-2 flex text-center self-center mt-1"
      >
        Task title: {taskData?.title}
      </h1>

      <div
        className="flex gap-4 mt-4"
      >
        <button
          className={`font-bold text-lg text-black p-2 w-full mb-3 rounded-2xl bg-gray-300 hover:opacity-70 transition-opacity`}
          onClick={() => setOpenState(null)}
        >
          Cancel
        </button>
        <button
          className={`font-bold text-lg text-white p-2 w-full mb-3 rounded-2xl ${dynamicButtonColors.primaryDynamicButtonColors(theme)} hover:opacity-70 transition-opacity`}
          onClick={() => deleteTask()}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
