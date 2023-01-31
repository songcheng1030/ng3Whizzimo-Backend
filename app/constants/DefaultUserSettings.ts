import {UserSettings} from "../models/UserSettings";

const DefaultUserSettings = new UserSettings();

DefaultUserSettings.tilefont = 'ff-arial';
DefaultUserSettings.bgcolor = 'bg-default';
DefaultUserSettings.tilehighlightcolor = 'thc-blue';
// whizzimap: false, // Applied in the controller level due to Angular Select ng-model restrictions
DefaultUserSettings.blackboard = {
    tileBank: {
        rows: 15,
            cols: 30
    }
};
DefaultUserSettings.workbookLimit = 99;
DefaultUserSettings.courseLimit = 3;
DefaultUserSettings.compoundSounds =  {
    // ===================================================================
    //	Whizzimo Compound defaults
    // 	* A listing of the default pairing settings in Whizzimo
    //	* Used primarily for compound sound tiles shown in activities
    // ===================================================================
    'qu-KKWW': 0,
        'arr-ARR': 1,
        'arr-AYERR': 1,
        'arr-ORR': 1,
        'err-IRR': 1,
        'err-AYERR': 1,
        'irr-EEERR': 1,
        'orr-ARR': 1,
        'orr-IRR': 1,
        'orr-ORR': 1,
        'urr-IRR': 1,
        'war-WWORR': 1,
        'wor-WWIRR': 1,
        'bb-BB': 1,
        'cc-KK': 1,
        'dd-DD': 1,
        'ff-FF': 1,
        'kk-KK': 1,
        'gg-GG': 1,
        'gg-JJ': 1,
        'll-LL': 1,
        'mm-MM': 1,
        'nn-NN': 1,
        'pp-PP': 1,
        'rr-RR': 1,
        'ss-SS': 1,
        'ss-ZZ': 1,
        'tt-TT': 1,
        'ww-WW': 1,
        'zz-ZZ': 1,
        'ace-IHHSSSIL': 1,
        'age-IHHJJSIL': 1,
        'alk-AWWLLKK': 1,
        'all-AWWLL': 2,
        'alt-AWWLLTT': 1,
        'am-AAEMM': 1,
        'an-AAENN': 1,
        'ang-AAENGGG': 2,
        'ank-AAENGKK': 2,
        'ate-IHHTTSIL': 1,
        'ice-IHHSSSIL': 1,
        'ild-EYELLDD': 1,
        'ile-IHHLLSIL': 1,
        'ind-EYENNDD': 1,
        'ine-IHHNNSIL': 1,
        'ing-IHHNGGG': 2,
        'ink-IHHNGKK': 2,
        'ite-IHHTTSIL': 1,
        'ive-IHHVVSIL': 1,
        'old-OWELLDD': 1,
        'oll-OWELL': 2,
        'olk-OWELLKK': 1,
        'olt-OWELLTT': 1,
        'ong-AWWNGGG': 2,
        'onk-AHHNGKK': 2,
        'ost-OWESSTT': 1,
        'sion-SHUHHNN': 1,
        'sion-ZHUHHNN': 1,
        'sure-SHIRR': 2,
        'sure-ZHIRR': 2,
        'tion-SHUHHNN': 1,
        'tion-CHUHHNN': 1,
        'tion-ZHUHHNN': 1,
        'ture-CHIRR': 2,
        'ung-UHHNGGG': 2,
        'unk-UHHNGKK': 2,
        'lf-FF': 1,
        'sc-SS': 1,
        'stle-SSLLSIL': 2,
        'tu-CHOOO': 1,
        'wa-WWAHH': 1,
        'ng-NGGG': 1,
        'nk-NGKK': 1,
        'st-SS': 1

};
// Tile Settings
DefaultUserSettings.tiles = {
    bv: {
        tilebgcolor: 'c-red',
            tilefontcolor: 'fc-white'
    },
    bc: {
        tilebgcolor: 'c-yellow',
            tilefontcolor: 'fc-black'
    },
    rcv: {
        tilebgcolor: 'c-red',
            tilefontcolor: 'fc-white'
    },
    cdt: {
        tilebgcolor: 'c-yellow',
            tilefontcolor: 'fc-black'
    },
    vt: {
        tilebgcolor: 'c-red',
            tilefontcolor: 'fc-white'
    },
    bl: {
        tilebgcolor: 'c-yellow',
            tilefontcolor: 'fc-black'
    },
    gs: {
        tilebgcolor: 'c-green',
            tilefontcolor: 'fc-white'
    },
    slc: {
        tilebgcolor: 'c-yellow',
            tilefontcolor: 'fc-black'
    },
    avs: {
        tilebgcolor: 'c-red',
            tilefontcolor: 'fc-white'
    },
    acs: {
        tilebgcolor: 'c-yellow',
            tilefontcolor: 'fc-black'
    },
    pref: {
        tilebgcolor: 'c-blue',
            tilefontcolor: 'fc-white'
    },
    suff: {
        tilebgcolor: 'c-blue',
            tilefontcolor: 'fc-white'
    },
    roots: {
        tilebgcolor: 'c-orange',
            tilefontcolor: 'fc-white'
    },
    GreekCombiningForms: {
        tilebgcolor: 'c-green',
            tilefontcolor: 'fc-white'
    },
    LatinChameleonPrefixes: {
        tilebgcolor: 'c-peach',
            tilefontcolor: 'fc-black'
    },
    sym: {
        tilebgcolor: 'c-purple',
            tilefontcolor: 'fc-white'
    },
    sym2: {
        tilebgcolor: 'c-lightgreen',
            tilefontcolor: 'fc-white'
    },
    sight: {
        tilebgcolor: 'c-transparent',
        tilefontcolor: 'fc-red'
    },
    blank: {
        red: {tilebgcolor: 'c-red'},
        peach: {tilebgcolor: 'c-peach'},
        yellow: {tilebgcolor: 'c-yellow'},
        lightyellow: {tilebgcolor: 'c-lightyellow'},
        green: {tilebgcolor: 'c-green'},
        lightgreen: {tilebgcolor: 'c-lightgreen'},
        blue: {tilebgcolor: 'c-blue'},
        lightblue: {tilebgcolor: 'c-lightblue'},
        purple: {tilebgcolor: 'c-purple'},
        lightpurple: {tilebgcolor: 'c-lightpurple'},
        orange: {tilebgcolor: 'c-orange'},
        gray: {tilebgcolor: 'c-gray'},
        cream: {tilebgcolor: 'cream'},
        pink: {tilebgcolor: 'c-pink'},
        transparent: {tilebgcolor: 'c-transparent'},
        '1': {tilebgcolor: 'c-lightblue'},
        '2': {tilebgcolor: 'c-clear'},
        '3': {tilebgcolor: 'c-lightyellow'},
        clear: {tilebgcolor: 'c-clear'},
        tilefontcolor: ''
    },
    initblend: {
        tilebgcolor: 'c-purple',
            tilefontcolor: 'fc-white'
    },
    endblend: {
        tilebgcolor: 'c-green',
            tilefontcolor: 'fc-white'
    }
};

export {DefaultUserSettings};
