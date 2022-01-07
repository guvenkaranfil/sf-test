import Page1Design from 'generated/pages/page1';
import componentContextPatch from '@smartface/contx/lib/smartface/componentContextPatch';
import PageTitleLayout from 'components/PageTitleLayout';
import System from '@smartface/native/device/system';
const Screen = require('@smartface/native/device/screen');

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
import AndroidConfig from "@smartface/native/util/Android/androidconfig";
import TextView from '@smartface/native/ui/textview';
import Color from '@smartface/native/ui/color';
import FlexLayout from '@smartface/native/ui/flexlayout';
import Button from '@smartface/native/ui/button';
import EllipsizeMode from '@smartface/native/ui/ellipsizemode';
import TextAlignment from '@smartface/native/ui/textalignment';
const {
    MATCH_PARENT,
    WRAP_CONTENT
} = require("@smartface/native/util/Android/layoutparams");

export default class Page1 extends Page1Design {
    router: any;
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        /*const flexlayout = new FlexLayout({
        });

        flexlayout.alignItems = FlexLayout.AlignItems.CENTER;
        flexlayout.justifyContent = FlexLayout.JustifyContent.CENTER;
        flexlayout.padding = 10;
        flexlayout.backgroundColor = Color.GREEN;
        const flexlayout2 = new FlexLayout({});
        flexlayout2.backgroundColor = Color.RED;
        flexlayout2.yogaNode.setHeightAuto();
        /*const flexlayout3 = new FlexLayout({});
        flexlayout3.backgroundColor = Color.BLUE*/

        //const NativeRelativeLayout = requireClass("android.widget.RelativeLayout");
        //const layoutParamsRoot = new NativeRelativeLayout.LayoutParams(MATCH_PARENT, WRAP_CONTENT);
        //const relativeLayout = new NativeRelativeLayout(AndroidConfig.activity);
        //relativeLayout.setLayoutParams(layoutParamsRoot);

        const NativeSFR = requireClass(AndroidConfig.packageName + ".R");
        //@ts-ignore
        var pageLayout = this.pageLayoutContainer.findViewById(NativeSFR.id.page_layout);

        /*var myTextview = new TextView({
            text: "This is my textview sssssssssssssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaaaaaaaddddddddddddd",
            visible: true
        });
        myTextview.backgroundColor = Color.GRAY;
        myTextview.nativeObject.setSingleLine(false);*/
        //myTextview.nativeObject.setLayoutParams(layoutParamsRoot);
        //@ts-ignore
        //myTextview.yogaNode.setHeightAuto();
        //@ts-ignore
        //myTextview.yogaNode.setMaxHeight(500);
        //@ts-ignore
        //myTextview.yogaNode.setHeight(200);
        //@ts-ignore
        //myTextview.yogaNode.setWidthAuto();
        //@ts-ignore
        //myTextview.yogaNode.setFlexShrink(1);
        //@ts-ignore
        //myTextview.yogaNode.setFlexBasisAuto();

        //flexlayout.yogaNode.setFlexBasisAuto();

        //@ts-ignore
        //myTextview.yogaNode.setWidthAuto();

        //relativeLayout.addView(myTextview.nativeObject);
        /*const NativeTextUtils = requireClass("android.text.TextUtils");
        NativeTextUtils.TruncateAt.END
        //myTextview.maxLines = 3;
        myTextview.nativeObject.setEllipsize(NativeTextUtils.TruncateAt.END);
        setInterval(() => {
            //myTextview.nativeObject.setText("" + generateRandomStr());
            myTextview.text = "" + generateRandomStr();
            myTextview.yogaNode.calculateLayout(flexlayout.width, flexlayout.height);
            flexlayout2.yogaNode.calculateLayout(flexlayout.width, flexlayout.height);
            flexlayout2.applyLayout();
        }, 1000);

        //@ts-ignore    
        pageLayout.removeAllViews();
        flexlayout2.addChild(myTextview);
        flexlayout2.padding = 10;
        const button = new Button();
        button.text = "Test Button";
        button.backgroundColor = Color.BLUE;
        flexlayout2.addChild(button);
        flexlayout.addChild(flexlayout2);
        //@ts-ignore
        pageLayout.addView(flexlayout.nativeObject);*/

        /*this.btnNext.onPress = () => {
            myTextview.nativeObject.setText("" + generateRandomStr());
            //this.router.push('/pages/page2', { message: 'Hello World!' });
            this.layout.applyLayout();
        };*/

        const ListView = require('@smartface/native/ui/listview');
        const ListViewItem = require('@smartface/native/ui/listviewitem');
        const Label = require('@smartface/native/ui/label');

        var myDataSet = [
            {
                title: generateRandomStr(),
                backgroundColor: Color.RED
            },
            {
                title: generateRandomStr(),
                backgroundColor: Color.CYAN
            },
            {
                title: generateRandomStr(),
                backgroundColor: Color.YELLOW
            },
            {
                title: generateRandomStr(),
                backgroundColor: Color.GRAY
            }
        ];
        var myListView = new ListView({
            flexGrow: 1,
            rowHeight: 60,
            backgroundColor: Color.BLUE,
            itemCount: myDataSet.length,
        });
        myListView.onRowCreate = function () {
            var myListViewItem = new ListViewItem();
            myListView.backgroundColor = Color.BLACK;
            var myLabelTitle = new Label({
                /*alignSelf: FlexLayout.AlignSelf.FLEX_START,
                textAlignment: TextAlignment.TOPLEFT*/
            });
            myListViewItem.addChild(myLabelTitle);
            myListViewItem.myLabelTitle = myLabelTitle;

            return myListViewItem;
        };
        myListView.onRowBind = function (listViewItem, index) {
            listViewItem.myLabelTitle.text = myDataSet[index].title;
            listViewItem.myLabelTitle.yogaNode.calculateLayout(1000, 1000);
            //listViewItem.yogaNode.calculateLayout(1000, 100);
            //listViewItem.yogaNode.calculateLayout(500, 500);
            listViewItem.myLabelTitle.backgroundColor = index % 2 == 0 ? Color.GREEN : Color.CYAN;
        };
        myListView.onRowSelected = function (listViewItem, index) {
            console.log("selected index = " + index)
        };
        myListView.onPullRefresh = function () {
            myDataSet.push({
                title: generateRandomStr(),
                backgroundColor: Color.RED,
            })
            myListView.itemCount = myDataSet.length;
            myListView.refreshData();
            myListView.stopRefresh();
        };

        //@ts-ignore    
        pageLayout.removeAllViews();

        const flexlayout = new FlexLayout({});

        flexlayout.alignItems = FlexLayout.AlignItems.CENTER;
        flexlayout.justifyContent = FlexLayout.JustifyContent.CENTER;
        flexlayout.padding = 10;
        flexlayout.backgroundColor = Color.GREEN;

        flexlayout.addChild(myListView);

        pageLayout.addView(flexlayout.nativeObject);
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
