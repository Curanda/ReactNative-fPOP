import { StyleSheet, Text, View } from 'react-native';

export default function InactiveGradientButton({ children }: { children: React.ReactNode }) {
  return <View style={styles.button}>{children}</View>;
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 200,
    height: 60,
    backgroundColor: '#D0CDCD',
  },
});
