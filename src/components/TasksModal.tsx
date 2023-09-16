import { X } from "@phosphor-icons/react";
import { Form, Modal } from "antd";
import { useTheme } from "next-themes";
import { SetStateAction } from "react";

interface ITasksModal {
  openSettingsModal: boolean;
  setOpenSettingsModal: (value: SetStateAction<boolean>) => void;
}

export const TasksModal = ({
  openSettingsModal,
  setOpenSettingsModal
}: ITasksModal) => {
  const [ form ] = Form.useForm();

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
    </Modal>
  );
}
