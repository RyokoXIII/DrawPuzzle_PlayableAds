const { ccclass, property } = cc._decorator;
declare var ExitApi;
declare var mraid;
declare var dapi;
declare var window;
declare var FbPlayableAd;

enum AdNetworks {
    GoogleAds,
    ironSource,
    UnityAds,
    AppLovin,
    Mintegral,
    FbAds
}


@ccclass
export default class CTA extends cc.Component {

    @property({
        type: cc.Enum(AdNetworks)    // call cc.Enum
    })
    myNetwork: AdNetworks = AdNetworks.UnityAds;


    start() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        window.gameEnd && window.gameEnd();
    }

    onTouchStart() {
        // window.gameEnd && window.gameEnd();

        switch (this.myNetwork) {
            case AdNetworks.AppLovin:
            case AdNetworks.UnityAds:
                mraid.open('https://play.google.com/store/apps/details?id=com.amb.draw.to.childhoods');
                console.log('AppLovin & UnityAds');
                break;
            case AdNetworks.GoogleAds:
                ExitApi.exit('https://play.google.com/store/apps/details?id=com.amb.draw.to.childhoods');
                console.log('GoogleAds');
                break;
            case AdNetworks.Mintegral:
                window.install && window.install('https://play.google.com/store/apps/details?id=com.amb.draw.to.childhoods');
                console.log('Mintegral');
                break;
            case AdNetworks.ironSource:
                dapi.openStoreUrl('https://play.google.com/store/apps/details?id=com.amb.draw.to.childhoods');
                console.log('ironSource');
                break;
            case AdNetworks.FbAds:
                FbPlayableAd.onCTAClick('https://play.google.com/store/apps/details?id=com.amb.draw.to.childhoods');
                console.log('FacebookAds');
                break;
            default:
                mraid.open('https://play.google.com/store/apps/details?id=com.amb.draw.to.childhoods');
                console.log('AppLovin & UnityAds');
                break;
        }
    }
}
