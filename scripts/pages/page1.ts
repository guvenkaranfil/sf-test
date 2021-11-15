import Page1Design from 'generated/pages/page1';
import componentContextPatch from '@smartface/contx/lib/smartface/componentContextPatch';
import PageTitleLayout from 'components/PageTitleLayout';
import System from '@smartface/native/device/system';
import ListViewItem1 from 'components/ListViewItem1';
import combineStyler from '@smartface/styler/lib/combineStyler';
import MyPicker from './picker';
import { Point2D } from '@smartface/native/primitive/point2d';
import Application from '@smartface/native/application';
import KeyboardLayout from '@smartface/component-keyboardlayout/dist/components/KeyboardLayout';
const isIOS = System.OS === System.OSType.IOS;
export default class Page1 extends Page1Design {
    router: any;
    data = [];
    __picker;
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.btnNext.onPress = () => {
            this.router.push('/pages/page2', { message: 'Hello World!' });
        };
    }
    refreshListView() {
        const rawData = [
            "FreeText1",
            ["A", "B", "C"],
            "FreeText2",
            "FreeText3",
            "FreeText4",
            "FreeText5",
            ["D", "E", "F"],
            "FreeText6",
            "FreeText7"
        ];
        const onPickerDone = async (params: { index: number } = { index: NaN }) => {
            console.warn('picker selected: ', params?.index);
        };
        this.data = rawData.map((a, index) => {
            if (Array.isArray(a)) {
                const ownPicker = new MyPicker();
                ownPicker.items = a;
                return {
                    showPicker : true,
                    inputView: ownPicker,
                    item: {
                        hint: `PICKER ${index}`,
                        onEditEnds: () => { }
                    },
                    fieldProperties: {
                        onDropDownClick: System.OS === System.OSType.IOS ? undefined : () => {
                            if (ownPicker === null) {
                                return;
                            }
                            ownPicker.show(onPickerDone, () => { });
                        }
                    },
                    onPickerDone: onPickerDone
                };
            }
            else {
                return {
                    showPicker : false,
                    inputView: null,
                    item: {
                        hint: `FREETEXT ${index}`,
                        onEditEnds: () => { }
                    }
                };
            }
        });
        console.info(this.data);
        this.lvMain.itemCount = this.data.length;
        this.lvMain.refreshData();
        console.log(this.data);
    }
    initListView() {
        
        this.lvMain.onRowHeight = (index) => {
            return 120;
        };
        this.lvMain.onRowBind = (item: ListViewItem1, index) => {
            const itemData = this.data[index];
            
            let picker = null;//this.data[index].inputView;
            if(itemData.showPicker){
                picker = new MyPicker();
                picker.items = ["ada", "ada"]
            }
            item.materialTextBox.options = {
                hint: this.data[index].item.hint
            };
            if (System.OS === System.OSType.ANDROID) {
                item.materialTextBox.nativeObject.getInstance().setHintAnimationEnabled(false);
            }
            initMtb({
                picker,
                materialTextBox: item.materialTextBox.materialTextBox,
                onPickerDone: this.data[index].onPickerDone
            });
            item.applyLayout();
        };
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 */
function onShow(this: Page1, superOnShow: () => void) {
    superOnShow();
    this.headerBar.titleLayout.applyLayout();
    this.initListView();
    this.refreshListView();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 */
function onLoad(this: Page1, superOnLoad: () => void) {
    superOnLoad();
    console.info('Onload page1');
    this.headerBar.leftItemEnabled = false;
    this.headerBar.titleLayout = new PageTitleLayout();
    componentContextPatch(this.headerBar.titleLayout, 'titleLayout');
    if (System.OS === 'Android') {
        this.headerBar.title = '';
    }
}

function initMtb({
    picker,
    materialTextBox,
    onPickerDone = () => { }
}) {
    if (isIOS) {

        if (picker instanceof MyPicker) {
            const keyboardLayout = KeyboardLayout.init(materialTextBox)[0];
            keyboardLayout.onDoneButtonClick = onPickerDone;
            if (!picker.inputViewExists) {
                picker.inputView = materialTextBox;
            }
        }
        else {
            const keyboardLayout = KeyboardLayout.init(materialTextBox)[0];
            keyboardLayout.onDoneButtonClick = () => Application.hideKeyboard();
            materialTextBox.ios.inputView = undefined;
        }
    }
}