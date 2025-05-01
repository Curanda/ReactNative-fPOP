import { View, StyleSheet } from 'react-native';
import SvgProfile from 'assets/SvgProfile';
import SvgFireGray from 'assets/SvgFireGray';
import SvgStar from 'assets/SvgStar';
import SvgFire from 'assets/SvgFire';

export default function NavBar() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <SvgProfile width={24} height={24} />
      </View>
      <View style={styles.iconContainer}>
        <SvgFire width={24} height={24} fill="#D6470B" />
      </View>
      <View style={styles.iconContainer}>
        <SvgStar width={24} height={24} fill="#858585" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  iconContainer: {
    padding: 10,
  },
});
