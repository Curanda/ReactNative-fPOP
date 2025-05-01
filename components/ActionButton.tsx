import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import React from 'react';
type ActionButtonProps = TouchableOpacityProps & {
  onTap?: () => void;
};

const ActionButton = React.memo(({ onTap, style, children, ...rest }: ActionButtonProps) => {
  return (
    <TouchableOpacity onPress={onTap} {...rest} style={style}>
      {children}
    </TouchableOpacity>
  );
});

export default ActionButton;
