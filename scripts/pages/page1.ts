import Page1Design from 'generated/pages/page1';
import componentContextPatch from '@smartface/contx/lib/smartface/componentContextPatch';
import PageTitleLayout from 'components/PageTitleLayout';
import System from '@smartface/native/device/system';
import {
    JitsiMeetBuilder,
    JitsiMeetUserInfo,
    default as JitsiMeet,
  } from "@smartface/plugin-jitsimeet";

export default class Page1 extends Page1Design {
    router: any;
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }

    initMtbs(): void {
        this.mtbDisplayName.options = {
            hint: "Display Name",
            text : "usersmartfacetest",
        };
        this.mtbEmail.options = {
            hint: "Email",
            text : "smartface@email.com",
        };
    }

    initButtons(): void {
        this.btnNext.onPress = () => {
            this.startMeeting();
        };
    }

    startMeeting(): void {
        if (System.OS === System.OSType.IOS) {

            // Jitsi Meet Usage ------------
            let builderCallback = (builder: JitsiMeetBuilder): void => {
                builder.serverURL = "https://meet.jit.si";
                builder.room = "smartfacetest";
                builder.welcomePageEnabled = true;

                let userInfo = new JitsiMeetUserInfo();
                userInfo.displayName = this.mtbDisplayName.materialTextBox.text || "usersmartfacetest";
                userInfo.email = this.mtbEmail.materialTextBox.text || "smartface@email.com";
                userInfo.avatar =
                    "https://smartface.io/wp-content/uploads/2016/02/logo_new_blue2.png";
                builder.userInfo = userInfo;

                builder.setBooleanFeatureFlag("help.enabled", false);
                builder.setBooleanFeatureFlag("raise-hand.enabled", false);
                builder.setBooleanFeatureFlag("live-streaming.enabled", false);
                builder.setBooleanFeatureFlag("video-share.enabled", false);
                builder.setBooleanFeatureFlag("tile-view.enabled", false);
                builder.setBooleanFeatureFlag("security-options.enabled", false);
                builder.setBooleanFeatureFlag("reactions.enabled", false);
                builder.setBooleanFeatureFlag("chat.enabled", false);
                builder.setBooleanFeatureFlag("invite.enabled", false);
                builder.setBooleanFeatureFlag("add-people.enabled", false);
                builder.setBooleanFeatureFlag("audio-only.enabled", false);
                builder.setBooleanFeatureFlag("kick-out.enabled", false);
                builder.setBooleanFeatureFlag("lobby-mode.enabled", false);
                builder.setBooleanFeatureFlag("meeting-password.enabled", false);

                builder.colorScheme = {
                    Conference: {
                        onVideoText: "rgb(0, 0, 0)",
                    },
                    LoadConfigOverlay: {
                        background: "rgb(255, 0, 0)",
                        text: "rgb(255, 0, 0)",
                    },
                    Modal: {
                        background: "rgb(255, 0, 0)",
                        text: "rgb(255, 0, 0)",
                    },
                    Toolbox: {
                        button: "#FF0000",
                        buttonToggled: "#FF0000",
                        buttonToggledBorder: "#FF0000",
                    },
                    Dialog: {
                        buttonBackground: "rgb(0, 255, 0)",
                        buttonLabel: "rgb(255, 255, 0)",
                    },
                    Header: {
                        background: "#FF0000",
                        text: "#00FF00",
                    },
                };
            };
            let jitsi = new JitsiMeet(builderCallback);

            jitsi.conferenceTerminated = function (data) {
                console.log("conferenceTerminated : ", data);
                jitsi.close();
            };

            jitsi.conferenceWillJoin = function (data) {
                console.log("conferenceWillJoin : ", data);
            };
            jitsi.participantJoined = function (data) {
                console.log("participantJoined : ", data);
            };
            jitsi.participantLeft = function (data) {
                console.log("participantLeft : ", data);
            };
            jitsi.audioMutedChanged = function (data) {
                console.log("audioMutedChanged : ", data);
            };
            jitsi.endpointTextMessageReceived = function (data) {
                console.log("endpointTextMessageReceived : ", data);
            };
            jitsi.screenShareToggled = function (data) {
                console.log("screenShareToggled : ", data);
            };
            jitsi.chatMessageReceived = function (data) {
                console.log("chatMessageReceived : ", data);
            };
            jitsi.chatToggled = function (data) {
                console.log("chatToggled : ", data);
            };
            jitsi.videoMutedChanged = function (data) {
                console.log("videoMutedChanged : ", data);
            };

            jitsi.show(this);
        }
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
    console.info('Onload page1');
    this.headerBar.leftItemEnabled = false;
    this.headerBar.titleLayout = new PageTitleLayout();
    componentContextPatch(this.headerBar.titleLayout, 'titleLayout');
    if (System.OS === 'Android') {
        this.headerBar.title = '';
    }
    this.initMtbs();
    this.initButtons();
}
