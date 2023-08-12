import { SetStateAction } from "react";
import { InputNumber, Modal, Switch } from "antd";
import { initialLongBreak, initialShortBreak, pomodoroPattern } from "@/constants/timers";

interface ISettingsModal {
  openSettingsModal: boolean;
  setOpenSettingsModal: (value: SetStateAction<boolean>) => void;
  pomodoro: number;
  setPomodoro: React.Dispatch<React.SetStateAction<number>>;
  shortBreak: number;
  setShortBreak: React.Dispatch<React.SetStateAction<number>>;
  // longBreak: number;
  // setLongBreak: React.Dispatch<React.SetStateAction<number>>;
}

export const SettingsModal = ({
  openSettingsModal,
  setOpenSettingsModal,
  pomodoro,
  setPomodoro,
  shortBreak,
  setShortBreak
}: ISettingsModal) => {

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
        <div className="flex flex-col gap-3">
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
        </div>
      </div>
    </Modal>
  );
}

