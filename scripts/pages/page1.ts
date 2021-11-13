import Page1Design from 'generated/pages/page1';
import componentContextPatch from '@smartface/contx/lib/smartface/componentContextPatch';
import PageTitleLayout from 'components/PageTitleLayout';
import System from '@smartface/native/device/system';
import Screen from '@smartface/native/device/screen';
const MTB_HORIZANTAL_MARGIN = 32;
const MTB_VERTICAL_PADDING = 45;
const MTB_WIDTH = Screen.width - MTB_HORIZANTAL_MARGIN;

export default class Page1 extends Page1Design {
    router: any;
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.btnNext.onPress = () => {
            this.router.push('/pages/page2', { message: 'Hello World!' });
        };

        this.materialTextBox.options = {
            hint: "Hint",
            multiline : true
        }

        this.materialTextBox.materialTextBox.onTextChanged = (e?: { insertedText: string; location: number })=>{
            const { font, text } = this.materialTextBox.materialTextBox;
            const singleLineSize = font.sizeOfString(" ", MTB_WIDTH);
            const { width, height } = font.sizeOfString(text, MTB_WIDTH);
            this.materialTextBox.height = height + MTB_VERTICAL_PADDING;
            
            if(System.OS == System.OSType.ANDROID) {
                const lineCount = height / singleLineSize.height;
                const ceilLineCount = Math.ceil(lineCount + 1);
                this.materialTextBox.materialTextBox.lineCount = ceilLineCount;
            }
        }
        const mtb = this.materialTextBox.materialTextBox;
        mtb.text = "a".repeat(35);
    }
}

function onShow(this: Page1, superOnShow: () => void) {
    superOnShow();
    this.headerBar.titleLayout.applyLayout();
}

function onLoad(this: Page1, superOnLoad: () => void) {
    superOnLoad();
    this.headerBar.leftItemEnabled = false;
    this.headerBar.titleLayout = new PageTitleLayout();
    componentContextPatch(this.headerBar.titleLayout, 'titleLayout');
    if (System.OS === 'Android') {
        this.headerBar.title = '';
    }
}
