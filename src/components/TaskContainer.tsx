import { SettingOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { dynamicButtonColors, dynamicIconColors } from '@/helpers';
import { useTheme } from 'next-themes';
import { GearSix } from '@phosphor-icons/react';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

export const TaskContainer = () => {
  const { theme } = useTheme();

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const genExtra = () => (
    // <SettingOutlined
    //   onClick={(event) => {
    //     // If you don't want click extra trigger collapse, you can prevent this:
    //     event.stopPropagation();
    //   }}
    // />
    <GearSix
      size={18}
      weight="regular"
      onClick={(event) => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();
      }}
      color={`${dynamicButtonColors.primaryDynamicButtonColors(theme)}`}
    />
  );

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'This is panel header 1',
      children: <div>{text}</div>,
      extra: genExtra(),
    },
  ];

  return (
    <div
      className={`w-96 ${dynamicButtonColors.secondaryDynamicButtonColors(theme)}`}
    >
      <Collapse
        defaultActiveKey={['1']}
        onChange={onChange}
        expandIconPosition={'start'}
        items={items}
        className='min-w-full'
      />
    </div>
  );
}
