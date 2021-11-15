import Picker from '@smartface/native/ui/picker';
import FlexLayout from '@smartface/native/ui/flexlayout';
import System from '@smartface/native/device/system';
import SelectablePicker from '@smartface/native/ui/selectablepicker';
import Application from '@smartface/native/application';
import KeyboardLayout from '@smartface/component-keyboardlayout';
import FlMaterialTextBox from '@smartface/component-materialtextbox';

const androidDefaults = {
    doneButtonText: global.lang.done,
    cancelButtonText: global.lang.cancel,
    multiSelectEnabled: false
};
const iOSDefaults = {
    okText: global.lang.done,
    cancelText: global.lang.cancel
};
const isIOS = System.OS === System.OSType.IOS;
const defaults = isIOS ? iOSDefaults : androidDefaults;
const currentProperty = isIOS ? "currentIndex" : "checkedItems";

export default class picker extends FlexLayout {
    mutualPicker: Picker | SelectablePicker; // PickerClass
    inputViewExists: boolean;
    constructor(props?: any, pageName?: string) {
        super(props);
        const PickerClass = System.OS === System.OSType.IOS ? Picker : SelectablePicker;
        this.mutualPicker = new PickerClass(Object.assign({}, defaults, props));
        if (isIOS) {
            this.addChild(this.mutualPicker as any);
        }
        if (this.mutualPicker instanceof SelectablePicker) {
            this.currentIndex = 0;
        }
        this.inputViewExists = false;
        !isNaN(props && props.currentIndex) && (this.currentIndex = props.currentIndex);
    }
    get items() {
        return this.mutualPicker.items;
    }
    set items(value) {
        this.mutualPicker.items = value;
    }
    get currentIndex(): number {
        return this.mutualPicker[currentProperty];
    }
    set currentIndex(index: number) {
        this.mutualPicker[currentProperty] = index;
    }
    show(done: (params: { index: number }) => void, cancel?: () => void): void {
        if (isIOS && this.inputViewExists) {
            return;
        }
        if (this.mutualPicker instanceof SelectablePicker) {
            const doneCallback = (params: { items: number | number[], cancel: () => void }) => done(Object.assign({}, params, { index: params.items as number }));
            this.mutualPicker.show(doneCallback, cancel);
        }
        else if (this.mutualPicker instanceof Picker) {
            this.mutualPicker.show(done, cancel);
        }
    }
    set inputView(textBox: any) {
        if (isIOS) {
            if (this.inputViewExists) {
                return;
            }
            const flexLayout = new FlexLayout({
                flexGrow: 1
            });
            flexLayout.addChild(this);
            flexLayout["children"] = { view: this };
            textBox.ios.inputView = { view: flexLayout, height: 220 };
            this.inputViewExists = !!textBox;            
        }
    }
}

export function initPickerForMtb(options: {
    mtbWrapper: FlMaterialTextBox,
    picker: picker,
    onPickerSelect: ({ currentIndex: number }) => any,
    keyboardLayout?: KeyboardLayout,
    message?: string
}): void {
    if (System.OS === System.OSType.IOS) {
        if (options.keyboardLayout) {
            options.keyboardLayout.onDoneButtonClick = () => {
                Application.hideKeyboard();
                options.onPickerSelect({ currentIndex: options.picker.currentIndex });
            };
        }
        else {
            const keyboardLayout = KeyboardLayout.init(options.mtbWrapper.materialTextBox)[0];
            keyboardLayout.onDoneButtonClick = () => {
                Application.hideKeyboard();
                options.onPickerSelect({ currentIndex: options.picker.currentIndex });
            };
        }
        if (options.message) {
            options.mtbWrapper.onDropDownClick = () => alert(options.message);
        }
        else {
            options.mtbWrapper.onDropDownClick = undefined;
        }
        options.picker.inputView = options.mtbWrapper.materialTextBox;

    }
    else {
        options.mtbWrapper.onDropDownClick = () => {
            const onSelected = ({ index }) => {
                options.onPickerSelect({ currentIndex: index });
            };
            if (options.message) {
                alert(options.message);
            }
            else {
                options.picker.show(onSelected);
            }
        };
    }
}