import AsyncStorage from '@react-native-community/async-storage';

export const saveDataToLocalStorage = async (
  key: string,
  data: unknown
): Promise<string | null> => {
  try {
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonData);
    return jsonData;
  } catch (error) {
    if (__DEV__) console.log('[AsyncStorage] Setting data error.');
    return null;
  }
};

export const getDataFromLocalStorage = async (
  key: string
): Promise<string | null> => {
  try {
    const data = await AsyncStorage.getItem(key);
    const result = data ? JSON.parse(data) : null;
    return result;
  } catch (error) {
    if (__DEV__) console.log('[AsyncStorage] Getting data error.');
    return null;
  }
};

export const removeDataFromLocalStorage = async (
  key: string
): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    if (__DEV__)
      console.log('[AsyncStorage] Removing data from storage error.');
    return false;
  }
};

export const clearLocalStorage = async (): Promise<boolean> => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    if (__DEV__) console.log('[AsyncStorage] Clearing storage error.');
    return false;
  }
};
