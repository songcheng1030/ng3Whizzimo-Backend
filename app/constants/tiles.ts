const Tiles = [
    {
        key: 'bv',
        name: 'Basic Vowels',
        tiles: [
            'tiles.bv.a',
            'tiles.bv.e',
            'tiles.bv.é',
            'tiles.bv.i',
            'tiles.bv.o',
            'tiles.bv.u',
            'tiles.bv.y'
        ]
    },
    {
        key: 'bc',
        name: 'Basic Consonants',
        tiles: [
            'tiles.bc.b',
            'tiles.bc.c',
            'tiles.bc.d',
            'tiles.bc.f',
            'tiles.bc.g',
            'tiles.bc.h',
            'tiles.bc.j',
            'tiles.bc.k',
            'tiles.bc.l',
            'tiles.bc.m',
            'tiles.bc.n',
            'tiles.bc.p',
            'tiles.bc.q',
            'tiles.bc.qu',
            'tiles.bc.r',
            'tiles.bc.s',
            'tiles.bc.t',
            'tiles.bc.u',
            'tiles.bc.v',
            'tiles.bc.w',
            'tiles.bc.x',
            'tiles.bc.y',
            'tiles.bc.z'
        ]
    },
    {
        key: 'rcv',
        name: 'R-Controlled Vowels',
        tiles: [
            'tiles.rcv.air',
            'tiles.rcv.ar',
            'tiles.rcv.arr',
            'tiles.rcv.ear',
            'tiles.rcv.eer',
            'tiles.rcv.eir',
            'tiles.rcv.er',
            'tiles.rcv.err',
            'tiles.rcv.ier',
            'tiles.rcv.ir',
            'tiles.rcv.irr',
            'tiles.rcv.oar',
            'tiles.rcv.oor',
            'tiles.rcv.or',
            'tiles.rcv.ore',
            'tiles.rcv.orr',
            'tiles.rcv.our',
            'tiles.rcv.ur',
            'tiles.rcv.ure',
            'tiles.rcv.urr',
            'tiles.rcv.war',
            'tiles.rcv.wor',
            'tiles.rcv.yr',
            'tiles.rcv.?r'
        ]
    },
    {
        key: 'cdt',
        name: 'Consonant Digraphs and Trigraphs',
        tiles: [
            'tiles.cdt.ch',
            'tiles.cdt.ci',
            'tiles.cdt.ck',
            'tiles.cdt.dg',
            'tiles.cdt.dge',
            'tiles.cdt.ph',
            'tiles.cdt.sh',
            'tiles.cdt.si',
            'tiles.cdt.tch',
            'tiles.cdt.th',
            'tiles.cdt.ti',
            'tiles.cdt.wh',
            'tiles.cdt.?i'
        ]
    },
    {
        key: 'vt',
        name: 'Vowel Teams',
        tiles: [
            'tiles.vt.ai',
            'tiles.vt.au',
            'tiles.vt.aw',
            'tiles.vt.ay',
            'tiles.vt.ea',
            'tiles.vt.ee',
            'tiles.vt.ei',
            'tiles.vt.eigh',
            'tiles.vt.eu',
            'tiles.vt.ew',
            'tiles.vt.ey',
            'tiles.vt.ia',
            'tiles.vt.ie',
            'tiles.vt.iew',
            'tiles.vt.igh',
            'tiles.vt.io',
            'tiles.vt.iou',
            'tiles.vt.oa',
            'tiles.vt.oe',
            'tiles.vt.oi',
            'tiles.vt.oo',
            'tiles.vt.ou',
            'tiles.vt.ow',
            'tiles.vt.oy',
            'tiles.vt.ue',
            'tiles.vt.ui',
            'tiles.vt.uy'
        ]
    },
    {
        key: 'bl',
        name: 'Bonus Letters',
        tiles: [
            'tiles.bl.bb',
            'tiles.bl.cc',
            'tiles.bl.dd',
            'tiles.bl.ff',
            'tiles.bl.kk',
            'tiles.bl.gg',
            'tiles.bl.ll',
            'tiles.bl.mm',
            'tiles.bl.nn',
            'tiles.bl.pp',
            'tiles.bl.rr',
            'tiles.bl.ss',
            'tiles.bl.tt',
            'tiles.bl.ww',
            'tiles.bl.zz'
        ]
    },
    {
        key: 'gs',
        name: 'Glued Sounds',
        tiles: [
            'tiles.gs.ace',
            'tiles.gs.age',
            'tiles.gs.alk',
            'tiles.gs.all',
            'tiles.gs.alt',
            'tiles.gs.am',
            'tiles.gs.an',
            'tiles.gs.ang',
            'tiles.gs.ank',
            'tiles.gs.ate',
            'tiles.gs.ice',
            'tiles.gs.ild',
            'tiles.gs.ile',
            'tiles.gs.ind',
            'tiles.gs.ine',
            'tiles.gs.ing',
            'tiles.gs.ink',
            'tiles.gs.ite',
            'tiles.gs.ive',
            'tiles.gs.old',
            'tiles.gs.oll',
            'tiles.gs.olk',
            'tiles.gs.olt',
            'tiles.gs.ong',
            'tiles.gs.onk',
            'tiles.gs.ost',
            'tiles.gs.sion',
            'tiles.gs.sure',
            'tiles.gs.tion',
            'tiles.gs.ture',
            'tiles.gs.ung',
            'tiles.gs.unk'
        ]
    },
    {
        key: 'slc',
        name: 'Silent Letter Combinations',
        tiles: [
            'tiles.slc.bt',
            'tiles.slc.gh',
            'tiles.slc.gn',
            'tiles.slc.gu',
            'tiles.slc.gue',
            'tiles.slc.kn',
            'tiles.slc.lf',
            'tiles.slc.mb',
            'tiles.slc.mn',
            'tiles.slc.pn',
            'tiles.slc.ps',
            'tiles.slc.rh',
            'tiles.slc.sc',
            'tiles.slc.wr'
        ]
    },
    {
        key: 'avs',
        name: 'Advanced Vowel Sounds',
        tiles: [
            'tiles.avs.aigh',
            'tiles.avs.augh',
            'tiles.avs.eau',
            'tiles.avs.ough',
            'tiles.avs.stle',
            'tiles.avs.tu',
            'tiles.avs.wa',
            'tiles.avs.qué'
        ]
    },
    {
        key: 'acs',
        name: 'Advanced Consonant Sounds',
        tiles: [
            'tiles.acs.ng',
            'tiles.acs.nk',
            'tiles.acs.qué',
            'tiles.acs.que',
            'tiles.acs.st'
        ]
    },
    {
        key: 'blank',
        name: 'Blank Tiles',
        tiles: [
            'tiles.blank.1',
            'tiles.blank.2',
            'tiles.blank.3',
            'tiles.blank.blue',
            'tiles.blank.cream',
            'tiles.blank.gray',
            'tiles.blank.green',
            'tiles.blank.yellow',
            'tiles.blank.lightgreen',
            'tiles.blank.lightyellow',
            'tiles.blank.orange',
            'tiles.blank.peach',
            'tiles.blank.pink',
            'tiles.blank.purple',
            'tiles.blank.red'
        ]
    },
    {
        key: 'endblend',
        name: 'Ending Blends',
        tiles: [
            'tiles.endblend.ct',
            'tiles.endblend.ft',
            'tiles.endblend.lb',
            'tiles.endblend.lch',
            'tiles.endblend.ld',
            'tiles.endblend.lf',
            'tiles.endblend.lk',
            'tiles.endblend.lm',
            'tiles.endblend.lp',
            'tiles.endblend.lt',
            'tiles.endblend.lth',
            'tiles.endblend.mp',
            'tiles.endblend.mpt',
            'tiles.endblend.nch',
            'tiles.endblend.nd',
            'tiles.endblend.nk',
            'tiles.endblend.nt',
            'tiles.endblend.pt',
            'tiles.endblend.sc',
            'tiles.endblend.sk',
            'tiles.endblend.sm',
            'tiles.endblend.sp',
            'tiles.endblend.st',
            'tiles.endblend.xt'
        ]
    },
    {
        key: 'initblend',
        name: 'Initial Blends',
        tiles: [
            'tiles.initblend.bl',
            'tiles.initblend.br',
            'tiles.initblend.chl',
            'tiles.initblend.chr',
            'tiles.initblend.cl',
            'tiles.initblend.cr',
            'tiles.initblend.dr',
            'tiles.initblend.dw',
            'tiles.initblend.fl',
            'tiles.initblend.fr',
            'tiles.initblend.gl',
            'tiles.initblend.gr',
            'tiles.initblend.gw',
            'tiles.initblend.phl',
            'tiles.initblend.phr',
            'tiles.initblend.pl',
            'tiles.initblend.pr',
            'tiles.initblend.sc',
            'tiles.initblend.sch',
            'tiles.initblend.scl',
            'tiles.initblend.scr',
            'tiles.initblend.shr',
            'tiles.initblend.sk',
            'tiles.initblend.skr',
            'tiles.initblend.sl',
            'tiles.initblend.sm',
            'tiles.initblend.sn',
            'tiles.initblend.sp',
            'tiles.initblend.sph',
            'tiles.initblend.spl',
            'tiles.initblend.spr',
            'tiles.initblend.squ',
            'tiles.initblend.st',
            'tiles.initblend.str',
            'tiles.initblend.sw',
            'tiles.initblend.thr',
            'tiles.initblend.thw',
            'tiles.initblend.tr',
            'tiles.initblend.tw'
        ]
    },
    {
      key: 'consle',
      name: 'Consonant-le',
      tiles: [
          'tiles.consle.ble',
          'tiles.consle.cle',
          'tiles.consle.dle',
          'tiles.consle.fle',
          'tiles.consle.gle',
          'tiles.consle.kle',
          'tiles.consle.mle',
          'tiles.consle.nle',
          'tiles.consle.ple',
          'tiles.consle.qule',
          'tiles.consle.tle',
          'tiles.consle.zle',

      ]
    },
    {
        key: 'sym',
        name: 'Symbols',
        tiles: [
            'tiles.sym.\'',
            'tiles.sym.-',
            'tiles.sym._',
            'tiles.sym.colon',
            'tiles.sym.comma',
            'tiles.sym.exclamation',
            'tiles.sym.question',
            'tiles.sym.schwa',
            'tiles.sym.plus',
            'tiles.sym.arrowleft',
            'tiles.sym.arrowright',
            'tiles.sym.bracketleft',
            'tiles.sym.bracketright'
        ]
    },
    {
        key: 'sym2',
        name: 'Symbols 2',
        tiles: [
            'tiles.sym2.period',
            'tiles.sym2.apostrophe',
            'tiles.sym2.dash',
            'tiles.sym2.colon',
            'tiles.sym2.comma',
            'tiles.sym2.exclamation',
            'tiles.sym2.question',
            'tiles.sym2.schwa',
            'tiles.sym2.plus',
            'tiles.sym2.arrowleft',
            'tiles.sym2.arrowright',
            'tiles.sym2.bracketleft',
            'tiles.sym2.bracketright'
        ]
    },
    {
        key: 'pref',
        name: 'Prefixes',
        tiles: [
            'tiles.pref.a',
            'tiles.pref.ab',
            'tiles.pref.ac',
            'tiles.pref.act',
            'tiles.pref.ad',
            'tiles.pref.af',
            'tiles.pref.ag',
            'tiles.pref.al',
            'tiles.pref.an',
            'tiles.pref.anti',
            'tiles.pref.ap',
            'tiles.pref.ar',
            'tiles.pref.as',
            'tiles.pref.at',
            'tiles.pref.auto',
            'tiles.pref.be',
            'tiles.pref.bi',
            'tiles.pref.bio',
            'tiles.pref.cent',
            'tiles.pref.centi',
            'tiles.pref.circum',
            'tiles.pref.co',
            'tiles.pref.col',
            'tiles.pref.com',
            'tiles.pref.con',
            'tiles.pref.contra',
            'tiles.pref.cor',
            'tiles.pref.counter',
            'tiles.pref.de',
            'tiles.pref.dec',
            'tiles.pref.deci',
            'tiles.pref.di',
            'tiles.pref.dif',
            'tiles.pref.dis',
            'tiles.pref.e',
            'tiles.pref.ef',
            'tiles.pref.em',
            'tiles.pref.en',
            'tiles.pref.equi',
            'tiles.pref.ex',
            'tiles.pref.extra',
            'tiles.pref.fore',
            'tiles.pref.geo',
            'tiles.pref.il',
            'tiles.pref.im',
            'tiles.pref.in',
            'tiles.pref.inter',
            'tiles.pref.intro',
            'tiles.pref.ir',
            'tiles.pref.macro',
            'tiles.pref.micro',
            'tiles.pref.mid',
            'tiles.pref.mill',
            'tiles.pref.milli',
            'tiles.pref.mis',
            'tiles.pref.multi',
            'tiles.pref.non',
            'tiles.pref.nov',
            'tiles.pref.o',
            'tiles.pref.ob',
            'tiles.pref.oc',
            'tiles.pref.oct',
            'tiles.pref.octo',
            'tiles.pref.of',
            'tiles.pref.op',
            'tiles.pref.over',
            'tiles.pref.para',
            'tiles.pref.per',
            'tiles.pref.pre',
            'tiles.pref.pro',
            'tiles.pref.quad',
            'tiles.pref.quin',
            'tiles.pref.re',
            'tiles.pref.se',
            'tiles.pref.self',
            'tiles.pref.self-',
            'tiles.pref.semi',
            'tiles.pref.sept',
            'tiles.pref.sex',
            'tiles.pref.sub',
            'tiles.pref.suc',
            'tiles.pref.suf',
            'tiles.pref.sug',
            'tiles.pref.sup',
            'tiles.pref.super',
            'tiles.pref.sur',
            'tiles.pref.sus',
            'tiles.pref.tele',
            'tiles.pref.trans',
            'tiles.pref.tri',
            'tiles.pref.un',
            'tiles.pref.under',
            'tiles.pref.uni',
            'tiles.pref.up'
        ]
    },
    {
        key: 'suff',
        name: 'Suffixes',
        tiles: [
            'tiles.suff.able',
            'tiles.suff.age',
            'tiles.suff.ain',
            'tiles.suff.al',
            'tiles.suff.an',
            'tiles.suff.ance',
            'tiles.suff.ancy',
            'tiles.suff.ant',
            'tiles.suff.ar',
            'tiles.suff.ard',
            'tiles.suff.ary',
            'tiles.suff.ate',
            'tiles.suff.ation',
            'tiles.suff.ative',
            'tiles.suff.cracy',
            'tiles.suff.cy',
            'tiles.suff.dict',
            'tiles.suff.dom',
            'tiles.suff.ed',
            'tiles.suff.ee',
            'tiles.suff.en',
            'tiles.suff.ence',
            'tiles.suff.ency',
            'tiles.suff.ent',
            'tiles.suff.er',
            'tiles.suff.ern',
            'tiles.suff.ery',
            'tiles.suff.es',
            'tiles.suff.ese',
            'tiles.suff.ess',
            'tiles.suff.est',
            'tiles.suff.et',
            'tiles.suff.ette',
            'tiles.suff.fic',
            'tiles.suff.ful',
            'tiles.suff.ial',
            'tiles.suff.ian',
            'tiles.suff.ible',
            'tiles.suff.ic',
            'tiles.suff.ics',
            'tiles.suff.ice',
            'tiles.suff.ily',
            'tiles.suff.ine',
            'tiles.suff.ing',
            'tiles.suff.ion',
            'tiles.suff.ious',
            'tiles.suff.ish',
            'tiles.suff.ism',
            'tiles.suff.ist',
            'tiles.suff.ite',
            'tiles.suff.ition',
            'tiles.suff.itive',
            'tiles.suff.ity',
            'tiles.suff.ive',
            'tiles.suff.ize',
            'tiles.suff.less',
            'tiles.suff.ly',
            'tiles.suff.ment',
            'tiles.suff.ness',
            'tiles.suff.nomy',
            'tiles.suff.ology',
            'tiles.suff.on',
            'tiles.suff.or',
            'tiles.suff.ory',
            'tiles.suff.ous',
            'tiles.suff.ry',
            'tiles.suff.s',
            'tiles.suff.ship',
            'tiles.suff.sion',
            'tiles.suff.sure',
            'tiles.suff.th',
            'tiles.suff.tion',
            'tiles.suff.ture',
            'tiles.suff.ty',
            'tiles.suff.ual',
            'tiles.suff.ure',
            'tiles.suff.ward',
            'tiles.suff.xion',
            'tiles.suff.y'
        ]
    },
    {
        key: 'roots',
        name: 'Roots',
        tiles: [
            'tiles.roots.act',
            'tiles.roots.annu',
            'tiles.roots.arch',
            'tiles.roots.archy',
            'tiles.roots.ceed',
            'tiles.roots.cel',
            'tiles.roots.cept',
            'tiles.roots.cess',
            'tiles.roots.cid',
            'tiles.roots.cis',
            'tiles.roots.cit',
            'tiles.roots.civ',
            'tiles.roots.civil',
            'tiles.roots.count',
            'tiles.roots.cracy',
            'tiles.roots.crat',
            'tiles.roots.cred',
            'tiles.roots.cur',
            'tiles.roots.de',
            'tiles.roots.dem',
            'tiles.roots.demo',
            'tiles.roots.derv',
            'tiles.roots.dic',
            'tiles.roots.dict',
            'tiles.roots.divin',
            'tiles.roots.duct',
            'tiles.roots.egal',
            'tiles.roots.empt',
            'tiles.roots.equ',
            'tiles.roots.equi',
            'tiles.roots.fect',
            'tiles.roots.fer',
            'tiles.roots.fid',
            'tiles.roots.fidel',
            'tiles.roots.form',
            'tiles.roots.fuse',
            'tiles.roots.gest',
            'tiles.roots.grad',
            'tiles.roots.gress',
            'tiles.roots.jec',
            'tiles.roots.ject',
            'tiles.roots.jucic',
            'tiles.roots.judg',
            'tiles.roots.just',
            'tiles.roots.liber',
            'tiles.roots.liberat',
            'tiles.roots.low',
            'tiles.roots.mit',
            'tiles.roots.nul',
            'tiles.roots.pel',
            'tiles.roots.pend',
            'tiles.roots.pense',
            'tiles.roots.pl',
            'tiles.roots.ply',
            'tiles.roots.point',
            'tiles.roots.poli',
            'tiles.roots.polis',
            'tiles.roots.popul',
            'tiles.roots.port',
            'tiles.roots.pose',
            'tiles.roots.pres',
            'tiles.roots.press',
            'tiles.roots.pulse',
            'tiles.roots.quaint',
            'tiles.roots.quit',
            'tiles.roots.range',
            'tiles.roots.rect',
            'tiles.roots.rupt',
            'tiles.roots.secut',
            'tiles.roots.sent',
            'tiles.roots.sequ',
            'tiles.roots.serval',
            'tiles.roots.sist',
            'tiles.roots.solve',
            'tiles.roots.struc',
            'tiles.roots.struct',
            'tiles.roots.the',
            'tiles.roots.theo',
            'tiles.roots.tract',
            'tiles.roots.urb',
            'tiles.roots.vers',
            'tiles.roots.verse',
            'tiles.roots.vert',
            'tiles.roots.clude',
            'tiles.roots.fess',
            'tiles.roots.flect',
            'tiles.roots.flict',
            'tiles.roots.lect',
            'tiles.roots.mand',
            'tiles.roots.pact',
            'tiles.roots.pute',
            'tiles.roots.quire',
            'tiles.roots.scend',
            'tiles.roots.scribe',
            'tiles.roots.sect',
            'tiles.roots.sess',
            'tiles.roots.sign',
            'tiles.roots.spect',
            'tiles.roots.spire',
            'tiles.roots.stant',
            'tiles.roots.sult',
            'tiles.roots.sume',
            'tiles.roots.tact',
            'tiles.roots.tend',
            'tiles.roots.tent',
            'tiles.roots.vent',
            'tiles.roots.vict',
            'tiles.roots.vise',
            'tiles.roots.voke'

        ]
    },
    {
        key: 'LatinChameleonPrefixes',
        name: 'Latin Chameleon Prefixes',
        tiles: [
            'tiles.LatinChameleonPrefixes.ac',
            'tiles.LatinChameleonPrefixes.ad',
            'tiles.LatinChameleonPrefixes.af',
            'tiles.LatinChameleonPrefixes.ag',
            'tiles.LatinChameleonPrefixes.al',
            'tiles.LatinChameleonPrefixes.an',
            'tiles.LatinChameleonPrefixes.ap',
            'tiles.LatinChameleonPrefixes.ar',
            'tiles.LatinChameleonPrefixes.as',
            'tiles.LatinChameleonPrefixes.at',
            'tiles.LatinChameleonPrefixes.col',
            'tiles.LatinChameleonPrefixes.com',
            'tiles.LatinChameleonPrefixes.con',
            'tiles.LatinChameleonPrefixes.cor',
            'tiles.LatinChameleonPrefixes.di',
            'tiles.LatinChameleonPrefixes.dif',
            'tiles.LatinChameleonPrefixes.dis',
            'tiles.LatinChameleonPrefixes.e',
            'tiles.LatinChameleonPrefixes.ef',
            'tiles.LatinChameleonPrefixes.ex',
            'tiles.LatinChameleonPrefixes.il',
            'tiles.LatinChameleonPrefixes.im',
            'tiles.LatinChameleonPrefixes.in',
            'tiles.LatinChameleonPrefixes.ir',
            'tiles.LatinChameleonPrefixes.o',
            'tiles.LatinChameleonPrefixes.ob',
            'tiles.LatinChameleonPrefixes.oc',
            'tiles.LatinChameleonPrefixes.of',
            'tiles.LatinChameleonPrefixes.op',
            'tiles.LatinChameleonPrefixes.sub',
            'tiles.LatinChameleonPrefixes.suc',
            'tiles.LatinChameleonPrefixes.suf',
            'tiles.LatinChameleonPrefixes.sug',
            'tiles.LatinChameleonPrefixes.sup',
            'tiles.LatinChameleonPrefixes.sus'
        ]
    },
    {
        key: 'GreekCombiningForms',
        name: 'Greek Combining Forms',
        tiles: [
            'tiles.GreekCombiningForms.anthro',
            'tiles.GreekCombiningForms.arch',
            'tiles.GreekCombiningForms.astr',
            'tiles.GreekCombiningForms.astro',
            'tiles.GreekCombiningForms.auto',
            'tiles.GreekCombiningForms.bio',
            'tiles.GreekCombiningForms.cardi',
            'tiles.GreekCombiningForms.cardio',
            'tiles.GreekCombiningForms.chron',
            'tiles.GreekCombiningForms.cracy',
            'tiles.GreekCombiningForms.crat',
            'tiles.GreekCombiningForms.cycle',
            'tiles.GreekCombiningForms.deca',
            'tiles.GreekCombiningForms.demo',
            'tiles.GreekCombiningForms.derm',
            'tiles.GreekCombiningForms.di',
            'tiles.GreekCombiningForms.dia',
            'tiles.GreekCombiningForms.dynamics',
            'tiles.GreekCombiningForms.ectomy',
            'tiles.GreekCombiningForms.electro',
            'tiles.GreekCombiningForms.emia',
            'tiles.GreekCombiningForms.enne',
            'tiles.GreekCombiningForms.ethno',
            'tiles.GreekCombiningForms.gastr',
            'tiles.GreekCombiningForms.gastro',
            'tiles.GreekCombiningForms.geo',
            'tiles.GreekCombiningForms.gon',
            'tiles.GreekCombiningForms.gram',
            'tiles.GreekCombiningForms.graph',
            'tiles.GreekCombiningForms.hecto',
            'tiles.GreekCombiningForms.hema',
            'tiles.GreekCombiningForms.hemi',
            'tiles.GreekCombiningForms.hepta',
            'tiles.GreekCombiningForms.hexa',
            'tiles.GreekCombiningForms.hydr',
            'tiles.GreekCombiningForms.hydro',
            'tiles.GreekCombiningForms.iso',
            'tiles.GreekCombiningForms.itis',
            'tiles.GreekCombiningForms.kilo',
            'tiles.GreekCombiningForms.kinetic',
            'tiles.GreekCombiningForms.lateral',
            'tiles.GreekCombiningForms.macro',
            'tiles.GreekCombiningForms.mega',
            'tiles.GreekCombiningForms.meter',
            'tiles.GreekCombiningForms.micro',
            'tiles.GreekCombiningForms.mono',
            'tiles.GreekCombiningForms.neo',
            'tiles.GreekCombiningForms.neuro',
            'tiles.GreekCombiningForms.octo',
            'tiles.GreekCombiningForms.ology',
            'tiles.GreekCombiningForms.oma',
            'tiles.GreekCombiningForms.osteo',
            'tiles.GreekCombiningForms.paleo',
            'tiles.GreekCombiningForms.path',
            'tiles.GreekCombiningForms.penta',
            'tiles.GreekCombiningForms.peri',
            'tiles.GreekCombiningForms.phil',
            'tiles.GreekCombiningForms.phone',
            'tiles.GreekCombiningForms.photo',
            'tiles.GreekCombiningForms.poli',
            'tiles.GreekCombiningForms.polis',
            'tiles.GreekCombiningForms.poly',
            'tiles.GreekCombiningForms.psych',
            'tiles.GreekCombiningForms.psycho',
            'tiles.GreekCombiningForms.scop',
            'tiles.GreekCombiningForms.scope',
            'tiles.GreekCombiningForms.soph',
            'tiles.GreekCombiningForms.sphere',
            'tiles.GreekCombiningForms.tele',
            'tiles.GreekCombiningForms.tetra',
            'tiles.GreekCombiningForms.theo',
            'tiles.GreekCombiningForms.therapy',
            'tiles.GreekCombiningForms.therm',
            'tiles.GreekCombiningForms.tri'
        ]
    },
    {
        key: 'sight',
        name: 'Sight Words',
        tiles: [
            'tiles.sight.a',
            'tiles.sight.b',
            'tiles.sight.c',
            'tiles.sight.d',
            'tiles.sight.e',
            'tiles.sight.f',
            'tiles.sight.g',
            'tiles.sight.h',
            'tiles.sight.i',
            'tiles.sight.j',
            'tiles.sight.k',
            'tiles.sight.l',
            'tiles.sight.m',
            'tiles.sight.n',
            'tiles.sight.o',
            'tiles.sight.p',
            'tiles.sight.q',
            'tiles.sight.r',
            'tiles.sight.s',
            'tiles.sight.t',
            'tiles.sight.u',
            'tiles.sight.v',
            'tiles.sight.w',
            'tiles.sight.x',
            'tiles.sight.y',
            'tiles.sight.z',
            'tiles.sight.\'',
            'tiles.sight.\.',
            'tiles.sight.-',
        ]
    },
];

export {Tiles};
