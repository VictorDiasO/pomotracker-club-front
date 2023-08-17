import { SetStateAction } from "react";
import { Form, InputNumber, Modal, Switch } from "antd";

const formItems = {
  darkTheme: 'darkTheme',
  pomodoroPattern: 'pomodoroPattern',
  pomodoro: 'pomodoro',
  shortBreak: 'shortBreak',
  longBreak: 'longBreak',
  sound: 'sound',
  notifications: 'notifications',
  autoResume: 'autoResume'
}
interface ISettingsModal {
  openSettingsModal: boolean;
  setOpenSettingsModal: (value: SetStateAction<boolean>) => void;
  pomodoro: number;
  setPomodoro: React.Dispatch<React.SetStateAction<number>>;
  shortBreak: number;
  setShortBreak: React.Dispatch<React.SetStateAction<number>>;
  longBreak: number;
  setLongBreak: React.Dispatch<React.SetStateAction<number>>;
}

export const SettingsModal = ({
  openSettingsModal,
  setOpenSettingsModal,
  pomodoro,
  setPomodoro,
  shortBreak,
  setShortBreak,
  longBreak,
  setLongBreak
}: ISettingsModal) => {
  const [ form ] = Form.useForm();

  const handleOk = () => {
    console.log('Test: ', form.validateFields(), form.isFieldsValidating([formItems.pomodoro]));
  }

  return (
    <Modal
      open={openSettingsModal}
      onCancel={() => setOpenSettingsModal(false)}
      onOk={() => handleOk()}
    >
      <div className="bg-white p-7">
        <div className="flex flex-row justify-between">
          <h1 className="font-roboto font-semibold text-2xl mb-7">
            Settings
          </h1>
        </div>
        <Form
          layout="horizontal"
          labelCol={{ span: 18 }}
          wrapperCol={{ span: 14 }}
          labelAlign="left"
          style={{ maxWidth: 600 }}
          form={form}
          onFinish={handleOk}
        >
          <Form.Item
            label="Dark theme"
            valuePropName="checked"
            name={formItems.darkTheme}
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="Pomodoro time (minutes)"
            name={formItems.pomodoro}
            rules={[{
              type: 'number',
              min: 1,
              message: 'The input is not a number or is less than 1'
            }, {
              type: 'number',
              max: 300,
              message: 'The number you had insert is too large'
            }]}
            initialValue={pomodoro}
          >
            <InputNumber
              defaultValue={pomodoro}
              onChange={(e) => {
                setPomodoro(Number(e));
                sessionStorage.setItem('pomodoro', String(e));
              }
            }/>
          </Form.Item>
          <Form.Item
            label="Short Break time (minutes)"
            name={formItems.shortBreak}
            rules={[{
              type: 'number',
              min: 1,
              message: 'The input is not a number or is less than 1'
            }]}
            initialValue={shortBreak}
          >
            <InputNumber
              defaultValue={shortBreak}
              onChange={(e) => {
                setShortBreak(Number(e));
                sessionStorage.setItem('shortbreak', String(e));
              }
            }/>
          </Form.Item>
          <Form.Item
            label="Long Break time (minutes)"
            name={formItems.longBreak}
            rules={[{
              type: 'number',
              min: 1,
              message: 'The input is not a number or is less than 1'
            }]}
            initialValue={longBreak}
          >
            <InputNumber
              defaultValue={longBreak}
              onChange={(e) => {
                setLongBreak(Number(e));
                sessionStorage.setItem('longbreak', String(e));
              }
            }/>
          </Form.Item>
          <Form.Item
            label="Allow Sound"
            valuePropName="checked"
            name={formItems.sound}
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="Auto Resume Timer"
            valuePropName="checked"
            name={formItems.autoResume}
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="Notifications"
            valuePropName="checked"
            name={formItems.notifications}
          >
            <Switch />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

