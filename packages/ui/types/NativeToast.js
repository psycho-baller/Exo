import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Toast, useToastState } from '@tamagui/toast';
import { YStack } from 'tamagui';
export const NativeToast = () => {
    const currentToast = useToastState();
    if (!currentToast || currentToast.isHandledNatively) {
        return null;
    }
    return (_jsx(Toast, { duration: currentToast.duration, viewportName: currentToast.viewportName, enterStyle: { opacity: 0, scale: 0.5, y: -25 }, exitStyle: { opacity: 0, scale: 1, y: -20 }, y: 0, opacity: 1, scale: 1, animation: "quick", children: _jsxs(YStack, { children: [_jsx(Toast.Title, { children: currentToast.title }), !!currentToast.message && _jsx(Toast.Description, { children: currentToast.message })] }) }, currentToast.id));
};
