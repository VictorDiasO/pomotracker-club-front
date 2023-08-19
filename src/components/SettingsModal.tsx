'use client';
import { SetStateAction } from "react";
import { Form, InputNumber, Modal, Switch } from "antd";
import { useTheme } from "next-themes";

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
  const {
    theme,
    setTheme
  } = useTheme();

  const handleOk = () => {
    const {
      darkTheme,
      pomodoroPattern,
      pomodoro,
      shortBreak,
      longBreak,
      sound,
      notifications,
      autoResume
    } = form.getFieldsValue();

    setPomodoro(Number(pomodoro));
    sessionStorage.setItem('pomodoro', String(pomodoro));

    setShortBreak(Number(shortBreak));
    sessionStorage.setItem('shortbreak', String(shortBreak));

    setLongBreak(Number(longBreak));
    sessionStorage.setItem('longbreak', String(longBreak));

    if (!darkTheme) {
      if (theme?.includes('shortbreak')) {
        setTheme('lightshortbreak');
      } else if (theme?.includes('longbreak')) {
        setTheme('lightlongbreak');
      } else {
        setTheme('light');
      }
    }

    if (darkTheme) {
      if (theme?.includes('shortbreak')) {
        setTheme('darkshortbreak');
      } else if (theme?.includes('longbreak')) {
        setTheme('darklongbreak');
      } else {
        setTheme('dark');
      }
    }

    setOpenSettingsModal(false);
  }

  return (
    <Modal
      open={openSettingsModal}
      onCancel={() => setOpenSettingsModal(false)}
      onOk={() => handleOk()}
      okText='Save'
    >
      <div className="bg-white p-7">
        <div className="flex flex-row justify-between">
          <h2 className="font-roboto font-semibold text-2xl mb-7">
            Settings
          </h2>
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
            initialValue={theme?.includes('light') ? false : true}
          >
            <Switch checked={theme?.includes('light') ? false : true} />
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
            initialValue={Number(sessionStorage.getItem('pomodoro'))}
          >
            <InputNumber
              defaultValue={pomodoro}
            />
          </Form.Item>
          <Form.Item
            label="Short Break time (minutes)"
            name={formItems.shortBreak}
            rules={[{
              type: 'number',
              min: 1,
              message: 'The input is not a number or is less than 1'
            }]}
            initialValue={Number(sessionStorage.getItem('shortbreak'))}
          >
            <InputNumber
              defaultValue={shortBreak}
            />
          </Form.Item>
          <Form.Item
            label="Long Break time (minutes)"
            name={formItems.longBreak}
            rules={[{
              type: 'number',
              min: 1,
              message: 'The input is not a number or is less than 1'
            }]}
            initialValue={Number(sessionStorage.getItem('longbreak'))}
          >
            <InputNumber
              defaultValue={longBreak}  
            />
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

