import { jsx as _jsx } from "react/jsx-runtime";
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { NativeToast as Toast } from './NativeToast';
const isExpo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;
export const CustomToast = () => {
    if (isExpo) {
        return null;
    }
    else {
        return _jsx(Toast, {});
    }
};
