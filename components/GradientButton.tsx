import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
}

export default function GradientButton({ children, onPress, disabled }: GradientButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={['#D6470B', '#F1C177']}
        style={styles.button}>
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 200,
    height: 60,
  },
});
