import { X } from "@phosphor-icons/react";
import { Modal } from "antd";
import { useTheme } from "next-themes";
import Link from "next/link";
import { SetStateAction } from "react";

interface ICreditsModal {
  openCreditsModal: boolean;
  setOpenCreditsModal: (value: SetStateAction<boolean>) => void;
}

export const CreditsModal = ({
  openCreditsModal,
  setOpenCreditsModal
}: ICreditsModal) => {
  const {
    theme
  } = useTheme();

  return (
    <Modal
      open={openCreditsModal}
      onCancel={() => setOpenCreditsModal(false)}
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
            Credits
          </h2>
        </div>
        <div className="flex flex-col text-lg gap-2">
          <Link href={"https://alexandrlo.github.io/"}>
            Design Inspired by: AlexandrLo
          </Link>
          <Link href={"https://github.com/VictorDiasO/pomotracker-club-front"}>
            Developed by: Victor Dias
          </Link>
        </div>
      </div>
    </Modal>
  );
}