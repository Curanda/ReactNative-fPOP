import { View, ViewProps, StyleSheet } from 'react-native';

export const ShadowView = ({ children, style, ...props }: ViewProps) => {
  return (
    <View style={[styles.shadow, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    backgroundColor: 'white',
    borderRadius: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
