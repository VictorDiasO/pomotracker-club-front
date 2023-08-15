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

  // useEffect(() => {
  //   form.setFieldsValue({
  //     [formItems.pomodoro]: sessionStorage.getItem('pomodoro'),
  //     [formItems.shortBreak]: sessionStorage.getItem('shortbreak'),
  //     [formItems.longBreak]: sessionStorage.getItem('longbreak')
  //   });
  // }, []);

  return (
    <Modal
      open={openSettingsModal}
      // title="Settings"
      onCancel={() => setOpenSettingsModal(false)}
    >
      <div className="bg-white p-7">
        {/* Component Header */}
        <div className="flex flex-row justify-between">
          <h1 className="font-roboto font-semibold text-2xl mb-7">
            Settings
          </h1>
        </div>
        {/* Options */}
        {/* <div className="flex flex-col gap-3">
          <div className="flex flex-row justify-between">
            <p>Dark mode</p>
            <Switch />
          </div>
          <div className="flex flex-row justify-between">
            <p>Pomodoros until long break</p>
            <InputNumber min={1} defaultValue={pomodoroPattern.length - 1} />
          </div>
          <div className="flex flex-row justify-between">
            <p>Pomodoro Length (minutes)</p>
            <InputNumber
              min={1}
              defaultValue={pomodoro}
              onChange={(e) => {
                setPomodoro(Number(e));
                sessionStorage.setItem('pomodoro', String(e));
              }
            }
            />
          </div>
          <div className="flex flex-row justify-between">
            <p>Short Break Length (minutes)</p>
            <InputNumber
              min={1}
              defaultValue={shortBreak}
              onChange={(e) => setShortBreak(Number(e))}
            />
          </div>
          <div className="flex flex-row justify-between">
            <p>Long Break Length (minutes)</p>
            <InputNumber min={1} defaultValue={initialLongBreak} />
          </div>
          <div className="flex flex-row justify-between">
            <p>Sound</p>
            <Switch />
          </div>
          <div className="flex flex-row justify-between">
            <p>Auto Resume timer</p>
            <Switch />
          </div>
          <div className="flex flex-row justify-between">
            <p>Notifications</p>
            <Switch />
          </div>
        </div> */}
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

