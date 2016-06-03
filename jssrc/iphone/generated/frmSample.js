function addWidgetsfrmSample() {
    frmSample.setDefaultUnit(kony.flex.DP);
    frmSample.add();
};

function frmSampleGlobals() {
    frmSample = new kony.ui.Form2({
        "addWidgets": addWidgetsfrmSample,
        "enabledForIdleTimeout": false,
        "id": "frmSample",
        "init": AS_Form_f3feed9feb7d409ab535ad8cf03b05f1,
        "layoutType": kony.flex.FREE_FORM,
        "needAppMenu": true,
        "skin": "slForm"
    }, {
        "displayOrientation": constants.FORM_DISPLAY_ORIENTATION_PORTRAIT,
        "layoutType": kony.flex.FREE_FORM,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "configureExtendBottom": false,
        "configureExtendTop": false,
        "configureStatusBarStyle": false,
        "footerOverlap": false,
        "formTransparencyDuringPostShow": "100",
        "headerOverlap": false,
        "inputAccessoryViewType": constants.FORM_INPUTACCESSORYVIEW_CANCEL,
        "needsIndicatorDuringPostShow": false,
        "retainScrollPosition": false,
        "titleBar": true,
        "titleBarConfig": {
            "renderTitleText": true,
            "prevFormTitle": false,
            "titleBarLeftSideView": "button",
            "labelLeftSideView": "Back",
            "titleBarRightSideView": "button",
            "labelRightSideView": "Edit"
        },
        "titleBarSkin": "slTitleBar"
    });
    frmSample.info = {
        "kuid": "fd4df3ac167c4b3c87fe3fc4a9e4ecc6"
    };
};