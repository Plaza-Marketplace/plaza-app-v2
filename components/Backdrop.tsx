import { Pressable, StyleSheet } from 'react-native';

const Backdrop = () => {
  return <Pressable style={styles.container} />;
};

export default Backdrop;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
