import Page1Design from 'generated/pages/page1';
import componentContextPatch from '@smartface/contx/lib/smartface/componentContextPatch';
import PageTitleLayout from 'components/PageTitleLayout';
import System from '@smartface/native/device/system';
const Screen = require('@smartface/native/device/screen');

import AndroidConfig from "@smartface/native/util/Android/androidconfig";
import TextView from '@smartface/native/ui/textview';
import Color from '@smartface/native/ui/color';
import FlexLayout, { AlignItems, AlignSelf } from '@smartface/native/ui/flexlayout';
import Button from '@smartface/native/ui/button';
import EllipsizeMode from '@smartface/native/ui/ellipsizemode';
import TextAlignment from '@smartface/native/ui/textalignment';
import Label from '@smartface/native/ui/label';
import View from '@smartface/native/ui/view';
import ListView from '@smartface/native/ui/listview';
import ListViewItem from '@smartface/native/ui/listviewitem';
import TextBox from '@smartface/native/ui/textbox';
import TextArea from "@smartface/native/ui/textarea";
import MaterialTextBox from '@smartface/native/ui/materialtextbox';
const {
    MATCH_PARENT,
    WRAP_CONTENT
} = require("@smartface/native/util/Android/layoutparams");


function generateRandomStr() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    const length = Math.random() * 300 + 20;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}


function generateRandomList(length = 10): string[] {
    return [...Array(length)].map(() => generateRandomStr());
}

export default class Page1 extends Page1Design {
    router: any;
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        this.simpleLabelTest();
        //this.simpleLabelTest2();
        //this.simleListViewTest();
        //this.simleListViewTest2();
        //this.simpleTextInputTest();
        //this.simleListViewMtbTest();
        //this.simpleLabelTestNested();
    }

    getPageLayout() {
        const NativeSFR = requireClass(AndroidConfig.packageName + ".R");
        //@ts-ignore
        const pageLayout = this.pageLayoutContainer.findViewById(NativeSFR.id.page_layout);
        return pageLayout;
    }

    clearPageLayout() {
        //@ts-ignore    
        this.getPageLayout().removeAllViews();
    }

    addViewToPageLayout(view: View) {
        //@ts-ignore    
        this.getPageLayout().addView(view);
    }

    simpleLabelTest() {
        this.clearPageLayout();

        const flexLayout = new FlexLayout();
        flexLayout.backgroundColor = Color.YELLOW;

        const label = new Label();
        label.backgroundColor = Color.WHITE;
        //label.maxLines = 3;
        const NativeTextUtils = requireClass("android.text.TextUtils");
        //@ts-ignore
        label.nativeObject.setEllipsize(NativeTextUtils.TruncateAt.END);
        //label.text = generateRandomStr();
        label.text = "Label";

        const button = new Button();
        button.text = "Test Button";
        button.onPress = () => {
            label.text = generateRandomStr();
            //@ts-ignore
            label.yogaNode.dirty();
        }
        
        flexLayout.addChild(label);
        flexLayout.alignItems = FlexLayout.AlignItems.CENTER;
        flexLayout.alignContent = FlexLayout.AlignContent.CENTER;
        flexLayout.justifyContent = FlexLayout.JustifyContent.CENTER;
        flexLayout.addChild(button);

        this.addViewToPageLayout(flexLayout.nativeObject);
    }

    simpleLabelTest2() {
        this.clearPageLayout();

        const flexLayout = new FlexLayout();
        
        flexLayout.backgroundColor = Color.YELLOW;

        const flexLayout2 = new FlexLayout();
        //@ts-ignore
        flexLayout.yogaNode.setHeightAuto();
        flexLayout.backgroundColor = Color.BLUE;

        const label = new Label();
        label.backgroundColor = Color.WHITE;
        label.text = generateRandomStr();

        const button = new Button();
        button.text = "Test Button";
        button.onPress = () => {
            label.text = generateRandomStr();
            //@ts-ignore
            label.yogaNode.dirty();   
            flexLayout2.yogaNode.setHeightAuto();

        }
        
        flexLayout2.addChild(label);
        flexLayout2.addChild(button);
        flexLayout.addChild(flexLayout2);
        
        flexLayout2.flexGrow = 0;
        flexLayout2.alignItems = AlignItems.CENTER;
        flexLayout2.justifyContent = FlexLayout.JustifyContent.CENTER;

        this.addViewToPageLayout(flexLayout.nativeObject);
    }

    simpleLabelTestNested() {
        this.clearPageLayout();

        const flexLayout = new FlexLayout();
        flexLayout.backgroundColor = Color.YELLOW;
        //@ts-ignore
        flexLayout.yogaNode.setHeightAuto();

        const flexLayout2 = new FlexLayout();
        flexLayout2.padding = 10;
        flexLayout2.backgroundColor = Color.BLUE;

        const flexLayout3 = new FlexLayout();
        flexLayout3.padding = 10;
        flexLayout3.backgroundColor = Color.RED;

        const label = new Label();
        label.backgroundColor = Color.WHITE;
        label.text = generateRandomStr();

        const button = new Button();
        button.text = "Test Button";
        button.backgroundColor = Color.CYAN;
        button.onPress = () => {
            label.text = generateRandomStr();
            //@ts-ignore
            label.yogaNode.dirty();   
        }
        
        flexLayout3.addChild(label);
        flexLayout3.addChild(button);
        flexLayout2.addChild(flexLayout3);
        flexLayout.addChild(flexLayout2);

        this.addViewToPageLayout(flexLayout.nativeObject);
    }

    simleListViewTest() {
        this.clearPageLayout();

        let myDataSet = generateRandomList();

        var myListView = new ListView({
            flexGrow: 1,
            backgroundColor: Color.BLUE,
            itemCount: myDataSet.length,
            refreshEnabled: false,
        });

        myListView.onRowCreate = function () {
            const myListViewItem = new ListViewItem();
            var myLabelTitle = new Label();
            //@ts-ignore
            myListViewItem.myLabelTitle = myLabelTitle;
            myListViewItem.addChild(myLabelTitle);
            return myListViewItem;
        };
        myListView.onRowBind = function (listViewItem, index) {
            
            //@ts-ignore
            const label: Label = listViewItem.myLabelTitle;
            label.maxLines = 3;
            label.backgroundColor = index % 2 == 0 ? Color.GREEN : Color.CYAN;
            label.text = myDataSet[index];

            //@ts-ignore
            label.yogaNode.dirty()
            //@ts-ignore
            listViewItem.yogaNode.setHeightAuto();

        };

        const btn = new Button();
        btn.text = "Update";
        btn.onPress = () => {
            myDataSet = generateRandomList();
            myListView.refreshData();
        }

        const flexlayout = new FlexLayout({});
        flexlayout.addChild(myListView);
        flexlayout.addChild(btn);
        this.addViewToPageLayout(flexlayout.nativeObject);
    }

    simleListViewTest2() {
        this.clearPageLayout();

        let myDataSet = generateRandomList();

        var myListView = new ListView({
            flexGrow: 1,
            backgroundColor: Color.BLUE,
            itemCount: myDataSet.length,
            refreshEnabled: false,
        });

        myListView.onRowCreate = function () {
            const myListViewItem = new ListViewItem();
            var myLabelTitle = new Label();

            const flexLayout = new FlexLayout();
            flexLayout.addChild(myLabelTitle);
            myListViewItem.addChild(flexLayout);

            //@ts-ignore
            myListViewItem.myLabelTitle = myLabelTitle;
            //@ts-ignore
            myListViewItem.flexLayout = flexLayout

            return myListViewItem;
        };
        myListView.onRowBind = function (listViewItem, index) {
            //@ts-ignore
            const label: Label = listViewItem.myLabelTitle;
            label.backgroundColor = index % 2 == 0 ? Color.GREEN : Color.CYAN;
            label.text = myDataSet[index];

            //@ts-ignore
            label.yogaNode.dirty()

            //@ts-ignore
            listViewItem.yogaNode.setHeightAuto();

        };

        const btn = new Button();
        btn.text = "Update";
        btn.onPress = () => {
            myDataSet = generateRandomList();
            myListView.refreshData();
        }

        const flexlayout = new FlexLayout({});
        flexlayout.addChild(myListView);
        flexlayout.addChild(btn);
        this.addViewToPageLayout(flexlayout.nativeObject);
    }

    simpleTextInputTest() {
        this.clearPageLayout();

        const flexLayout = new FlexLayout();
        flexLayout.backgroundColor = Color.YELLOW;

        const label = new Label();
        label.backgroundColor = Color.WHITE;
        label.maxLines = 3;
        const NativeTextUtils = requireClass("android.text.TextUtils");
        //@ts-ignore
        label.nativeObject.setEllipsize(NativeTextUtils.TruncateAt.END);
        label.text = generateRandomStr();

        const mtb = new MaterialTextBox();
        mtb.multiline = true;
        mtb.text = generateRandomStr();
        mtb.backgroundColor = Color.CYAN;

        mtb.onTextChanged = () => {
            console.log("onTextChanged");
            mtb.yogaNode.dirty();
        }

        const button = new Button();
        button.text = "Test Button";
        button.onPress = () => {
            label.text = generateRandomStr();
            //@ts-ignore
            label.yogaNode.dirty();
        }
        
        
        flexLayout.addChild(label);
        flexLayout.addChild(mtb);
        flexLayout.alignItems = FlexLayout.AlignItems.CENTER;
        flexLayout.alignContent = FlexLayout.AlignContent.CENTER;
        flexLayout.justifyContent = FlexLayout.JustifyContent.CENTER;
        flexLayout.addChild(button);

        this.addViewToPageLayout(flexLayout.nativeObject);
    }

    simleListViewMtbTest() {
        this.clearPageLayout();

        let myDataSet = generateRandomList();

        var myListView = new ListView({
            flexGrow: 1,
            backgroundColor: Color.BLUE,
            itemCount: myDataSet.length,
            refreshEnabled: false,
        });

        myListView.onRowCreate = function () {
            const myListViewItem = new ListViewItem();
            var myLabelTitle = new Label();
            //@ts-ignore
            myListViewItem.myLabelTitle = myLabelTitle;
            myListViewItem.addChild(myLabelTitle);
            const mtb = new MaterialTextBox();
            mtb.multiline = true;
            mtb.text = generateRandomStr();
            mtb.backgroundColor = Color.CYAN;

            
            //myListViewItem.yogaNode.dirty();

            mtb.onTextChanged = () => {
                console.log("onTextChanged");
                mtb.yogaNode.dirty();
                //myListViewItem.nativeObject.getParent().requestLayout();
            }
            myListViewItem.addChild(mtb);

            mtb.yogaNode.dirty();
            myListViewItem.yogaNode.setHeightAuto();

            return myListViewItem;
        };
        myListView.onRowBind = function (listViewItem, index) {
            
            //@ts-ignore
            const label: Label = listViewItem.myLabelTitle;
            label.maxLines = 3;
            label.backgroundColor = index % 2 == 0 ? Color.GREEN : Color.CYAN;
            label.text = myDataSet[index];

            //@ts-ignore
            label.yogaNode.dirty()
            //@ts-ignore
            listViewItem.yogaNode.setHeightAuto();

        };

        const btn = new Button();
        btn.text = "Update";
        btn.onPress = () => {
            myDataSet = generateRandomList();
            myListView.refreshData();
        }

        const flexlayout = new FlexLayout({});
        flexlayout.addChild(myListView);
        flexlayout.addChild(btn);
        this.addViewToPageLayout(flexlayout.nativeObject);
    }


}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 */
function onShow(this: Page1, superOnShow: () => void) {
    superOnShow();
    this.headerBar.titleLayout.applyLayout();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 */
function onLoad(this: Page1, superOnLoad: () => void) {
    superOnLoad();
    console.info('onLoad page1');
    this.headerBar.leftItemEnabled = false;
    this.headerBar.titleLayout = new PageTitleLayout();
    this.lbl.padding
    componentContextPatch(this.headerBar.titleLayout, 'titleLayout');
    if (System.OS === 'Android') {
        this.headerBar.title = '';
    }
}
