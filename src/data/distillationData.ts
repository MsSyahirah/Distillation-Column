import { EquipmentComponent, FlowStep, PredictionScenario, QuizQuestion, LabelHotspot } from '../types/distillation';

export const EQUIPMENT_COMPONENTS: EquipmentComponent[] = [
  {
    id: 'column-shell',
    name: 'Distillation Column Shell',
    tag: 'C-101',
    category: 'column',
    purpose: 'Provides a tall, enclosed vertical pressure vessel where continuous separation of liquid mixtures takes place through stage-by-stage contact.',
    howItWorks: 'The column holds the internal trays. Hot vapour naturally rises toward the top because it is less dense, while cooler liquid flows downward by gravity. This opposite counter-current flow allows repeated boiling and condensing.',
    everydayAnalogy: 'Think of a tall apartment building where warm air naturally drifts up the stairwell while cold water flows down the plumbing pipes.',
    technicalTerms: [
      {
        term: 'Counter-Current Flow',
        simpleDefinition: 'Two streams flowing in opposite directions (vapour rising up, liquid flowing down) to maximize contact between them.'
      },
      {
        term: 'Fractionation',
        simpleDefinition: 'The process of separating a mixture into its different parts (fractions) according to differences in boiling points.'
      }
    ],
    targetRegion: { x: 260, y: 130, width: 140, height: 380, labelX: 330, labelY: 155 }
  },
  {
    id: 'trays-downcomers',
    name: 'Trays & Downcomers (Internals)',
    tag: 'TR-1 to TR-5',
    category: 'internals',
    purpose: 'Hold a shallow pool of liquid so ascending vapour bubbles directly through it, facilitating heat and mass transfer.',
    howItWorks: 'Vapour rises through perforations (sieve holes or valves) in each tray deck. Liquid flows across the tray, spills over a small weir wall, and travels down a channel called a downcomer to the tray below.',
    everydayAnalogy: 'Like blowing bubbles into a glass of warm tea through a straw. The gas bubbles transfer heat and swap molecules with the liquid tea.',
    technicalTerms: [
      {
        term: 'Tray (Deck)',
        simpleDefinition: 'A perforated horizontal metal plate inside the column designed to hold liquid and let vapour bubble through.'
      },
      {
        term: 'Downcomer',
        simpleDefinition: 'A vertical conduit or chute that carries liquid safely from one tray down to the tray beneath it.'
      },
      {
        term: 'Weir',
        simpleDefinition: 'A small metal dam at the edge of the tray that maintains the proper liquid depth before liquid overflows.'
      }
    ],
    targetRegion: { x: 275, y: 180, width: 110, height: 280, labelX: 330, labelY: 270 }
  },
  {
    id: 'feed-inlet',
    name: 'Feed Inlet Line & Nozzle',
    tag: 'F-IN',
    category: 'feed',
    purpose: 'Introduces the raw mixture (feed) into the tower at the optimal tray location matching its temperature and composition.',
    howItWorks: 'The feed enters at a specific middle tray (the "feed tray"). This divides the tower into two zones: the Rectifying (Enriching) section above, and the Stripping section below.',
    everydayAnalogy: 'Entering a subway train at the middle door so passengers can distribute evenly toward both ends of the platform.',
    technicalTerms: [
      {
        term: 'Feed Tray',
        simpleDefinition: 'The specific tray inside the column where the incoming raw material enters the system.'
      },
      {
        term: 'Rectifying Section',
        simpleDefinition: 'The upper section of the tower above the feed tray, where the rising vapour is made progressively purer in the lighter component.'
      },
      {
        term: 'Stripping Section',
        simpleDefinition: 'The lower section of the tower below the feed tray, where lighter molecules are stripped out of the descending liquid.'
      }
    ],
    targetRegion: { x: 140, y: 310, width: 120, height: 40, labelX: 190, labelY: 300 }
  },
  {
    id: 'overhead-condenser',
    name: 'Overhead Condenser',
    tag: 'E-101',
    category: 'overhead',
    purpose: 'Cools and condenses the hot overhead vapour leaving the top of the tower into liquid.',
    howItWorks: 'Vapour leaves the column top nozzle and enters the condenser. Cooling water circulates through tubes, absorbing latent heat from the vapour and causing it to turn back into a liquid state.',
    everydayAnalogy: 'When hot steam from your shower hits the cold bathroom mirror, it rapidly condenses into droplets of liquid water.',
    technicalTerms: [
      {
        term: 'Condensation',
        simpleDefinition: 'The phase change where a gas or vapour cools down and turns back into liquid.'
      },
      {
        term: 'Latent Heat',
        simpleDefinition: 'The hidden heat energy released or absorbed during a change of state (like vapour to liquid) without a change in temperature.'
      }
    ],
    targetRegion: { x: 500, y: 70, width: 100, height: 75, labelX: 550, labelY: 60 }
  },
  {
    id: 'reflux-drum',
    name: 'Reflux Drum (Accumulator)',
    tag: 'V-101',
    category: 'overhead',
    purpose: 'Acts as a holding vessel and surge tank for condensed overhead liquid, providing suction head for the reflux pump.',
    howItWorks: 'Liquid from the condenser collects here. A level controller keeps this drum partially filled to ensure a steady supply of liquid for both reflux and product takeoff.',
    everydayAnalogy: 'A rainwater collection barrel under the roof gutter that stores water before sending it to garden hoses or overflow tanks.',
    technicalTerms: [
      {
        term: 'Accumulator',
        simpleDefinition: 'A storage vessel placed right after a condenser to collect liquid and absorb surges in process flow.'
      }
    ],
    targetRegion: { x: 510, y: 180, width: 90, height: 60, labelX: 555, labelY: 170 }
  },
  {
    id: 'reflux-line',
    name: 'Reflux Line & Control Valve',
    tag: 'R-LINE',
    category: 'overhead',
    purpose: 'Returns a controlled portion of condensed liquid back into the top tray of the distillation column.',
    howItWorks: 'The liquid sent back is cold compared to the rising vapour. As it flows across the top tray, it absorbs heavy components and washes them down, ensuring only light vapour escapes.',
    everydayAnalogy: 'Washing laundry with a fresh rinse of water: the fresh clean liquid scrubs down any unwanted dirt particles.',
    technicalTerms: [
      {
        term: 'Reflux',
        simpleDefinition: 'Liquid that is condensed from the overhead vapour and pumped back to the top of the column to improve separation.'
      },
      {
        term: 'Reflux Ratio',
        simpleDefinition: 'The ratio of the amount of liquid returned as reflux compared to the amount of liquid taken out as distillate product.'
      }
    ],
    targetRegion: { x: 380, y: 160, width: 130, height: 40, labelX: 440, labelY: 150 }
  },
  {
    id: 'distillate-outlet',
    name: 'Overhead Distillate Product Outlet',
    tag: 'D-OUT',
    category: 'overhead',
    purpose: 'Transfers the remaining condensed overhead liquid out of the system to storage tanks as the finished light product.',
    howItWorks: 'The portion of condensed liquid not recycled as reflux is sent downstream. This stream contains the highest concentration of the more volatile (lower boiling point) component.',
    everydayAnalogy: 'Pouring the finished tea into your teacup once it has been brewed and filtered.',
    technicalTerms: [
      {
        term: 'Distillate (Overhead Product)',
        simpleDefinition: 'The purified light liquid collected from the top of the column, rich in lower-boiling components.'
      },
      {
        term: 'Volatile',
        simpleDefinition: 'Describing a substance that easily evaporates into vapour at a relatively low boiling temperature.'
      }
    ],
    targetRegion: { x: 600, y: 220, width: 110, height: 40, labelX: 660, labelY: 210 }
  },
  {
    id: 'reboiler',
    name: 'Reboiler (Heat Source)',
    tag: 'E-102',
    category: 'bottoms',
    purpose: 'Provides thermal energy to vaporise bottom liquid and create the rising vapour traffic needed for separation.',
    howItWorks: 'Liquid from the column bottom sump enters the reboiler. Steam passes through internal heating tubes, boiling a portion of this liquid into vapour, which is piped back into the tower base.',
    everydayAnalogy: 'The heating element at the bottom of an electric kitchen kettle that keeps the water boiling vigorously.',
    technicalTerms: [
      {
        term: 'Reboiler',
        simpleDefinition: 'A heat exchanger installed at the base of the column that boils bottom liquid to generate ascending vapour.'
      },
      {
        term: 'Vapour Traffic',
        simpleDefinition: 'The continuous stream of vapour moving up through the column trays.'
      }
    ],
    targetRegion: { x: 420, y: 450, width: 110, height: 75, labelX: 475, labelY: 440 }
  },
  {
    id: 'bottoms-outlet',
    name: 'Bottoms Product Outlet',
    tag: 'B-OUT',
    category: 'bottoms',
    purpose: 'Discharges the unboiled, heavy residual liquid from the column base to downstream processing or cooling.',
    howItWorks: 'The liquid that is not vaporised in the reboiler contains the highest concentration of the less volatile (higher boiling point) components. A level control valve releases this liquid.',
    everydayAnalogy: 'The thick soup stock left in the pot after the lighter water vapour has boiled away.',
    technicalTerms: [
      {
        term: 'Bottoms (Tails)',
        simpleDefinition: 'The heavy liquid stream withdrawn from the base of the distillation column, rich in higher-boiling components.'
      },
      {
        term: 'Less Volatile',
        simpleDefinition: 'Describing a chemical substance that requires higher temperatures to boil and prefers to stay liquid.'
      }
    ],
    targetRegion: { x: 300, y: 520, width: 140, height: 40, labelX: 370, labelY: 550 }
  }
];

export const FLOW_STEPS: FlowStep[] = [
  {
    id: 1,
    title: 'Feed Introduction',
    phase: 'feed',
    streamName: 'Raw Feed Stream (▶ Feed)',
    description: 'The liquid/vapour mixture enters the middle of the column through the feed nozzle. Liquid droplets begin trickling down toward the bottom, while any initial vapour starts rising upward.',
    operatorNote: 'Operators monitor feed flow rate and temperature to ensure steady operation. Introducing feed at the right tray prevents energy waste.',
    highlightNodes: ['feed-inlet', 'column-shell', 'trays-downcomers']
  },
  {
    id: 2,
    title: 'Reboiler Heat & Vapour Generation',
    phase: 'reboiler',
    streamName: 'Rising Vapour (▲ Vapour)',
    description: 'Liquid accumulating at the bottom flows into the reboiler. High-pressure steam transfers heat, boiling the liquid. Fresh, hot vapour rushes back into the column base and begins its journey upward.',
    operatorNote: 'Reboiler steam is the driving engine of the tower. Without sufficient heat, no vapour rises, and separation stops completely.',
    highlightNodes: ['reboiler', 'bottoms-outlet', 'column-shell']
  },
  {
    id: 3,
    title: 'Counter-Current Contact on Trays',
    phase: 'tray-contact',
    streamName: 'Liquid-Vapour Mass Transfer (▲▼ Contact)',
    description: 'On each tray, hot rising vapour bubbles through cooler descending liquid. Heavier molecules in the vapour condense into the liquid, while lighter molecules in the liquid vaporise into the rising vapour. As vapour rises, it becomes richer in the more volatile component.',
    operatorNote: 'This repeated boiling and condensing on every tray is called fractionation. Each tray acts as a mini-distillation stage.',
    highlightNodes: ['trays-downcomers', 'column-shell']
  },
  {
    id: 4,
    title: 'Overhead Condensation & Reflux Drum',
    phase: 'overhead',
    streamName: 'Overhead Vapour & Condensed Liquid',
    description: 'The light vapour reaches the top tray and exits through the overhead line into the condenser. Cooling water absorbs the latent heat, turning the vapour into liquid which gathers in the reflux drum.',
    operatorNote: 'Never let the reflux drum run dry; the reflux pump needs continuous liquid to maintain column stability and pressure control.',
    highlightNodes: ['overhead-condenser', 'reflux-drum']
  },
  {
    id: 5,
    title: 'Reflux Recycle & Distillate Take-off',
    phase: 'reflux',
    streamName: 'Liquid Reflux (▼ Reflux) & Distillate (► Product)',
    description: 'Liquid from the reflux drum is split into two paths: a controlled stream is returned to the top tray as Reflux to wash down heavy components, and the remaining portion leaves as pure Distillate product.',
    operatorNote: 'Reflux is the operator’s main tool for tuning product quality. Returning liquid sharpens the separation on upper trays.',
    highlightNodes: ['reflux-line', 'distillate-outlet', 'trays-downcomers']
  }
];

export const PREDICTION_SCENARIOS: PredictionScenario[] = [
  // ================= OPERATING CONTROL SCENARIOS =================
  {
    id: 'reboiler-heat-increase',
    title: 'Increase Reboiler Heat',
    shortLabel: 'Increase Reboiler Heat',
    category: 'operating-control',
    phenomenon: 'none',
    controlChange: 'Operator increases steam flow to the reboiler within normal hydraulic limits, adding more thermal energy at the base.',
    parameter: 'reboiler-heat',
    studentQuestion: 'What happens inside the tower when reboiler heat input is increased?',
    options: [
      {
        id: 'opt-1a',
        text: 'Vapour generation increases, sending more rising vapour up through the trays and increasing column pressure.',
        isCorrect: true,
        explanation: 'Correct! More thermal heat vaporises more bottom liquid in the reboiler, creating a higher volume of ascending vapour and raising column pressure.'
      },
      {
        id: 'opt-1b',
        text: 'The liquid inside the tower instantly freezes and column pressure drops to zero.',
        isCorrect: false,
        explanation: 'Incorrect. Reboiler heat increases temperatures and vapour volume; it does not freeze liquid.'
      },
      {
        id: 'opt-1c',
        text: 'Vapour stops completely because heat destroys chemical molecules.',
        isCorrect: false,
        explanation: 'Incorrect. Heating liquid causes vaporisation, creating more vapour, not less.'
      }
    ],
    actionQuestion: 'What happens to separation and product purity if reboiler heat is increased without increasing reflux?',
    actionOptions: [
      {
        id: 'opt-1-act1',
        text: 'Bottoms stripping improves, but overhead distillate purity can decrease if hotter vapour carries heavier molecules overhead (and excessive heat risks Entrainment/Flooding).',
        isCorrect: true,
        explanation: 'Correct! While more vapour strips light molecules out of the bottoms, excessive boil-up without matching reflux heats up the top trays and can carry heavier components into the overhead product.'
      },
      {
        id: 'opt-1-act2',
        text: 'Higher heat always guarantees 100% overhead purity with zero risk to column pressure.',
        isCorrect: false,
        explanation: 'Incorrect. Excessive heat raises column pressure and can degrade overhead purity via overheating or entrainment.'
      }
    ],
    expectedPurityImpact: 'improves-moderately',
    expectedPressureImpact: 'increases',
    purityImpactLabel: 'Stripping Improves · Watch Overhead Purity',
    pressureImpactLabel: '▲ Increases (More Vapour Traffic)',
    purityEvidenceExplanation: 'Increased reboiler boil-up strips more volatile molecules out of the bottom liquid (improving bottoms purity). However, if reflux is not adjusted, higher vapour rates warm the upper trays and can carry heavier components overhead.',
    pressureEvidenceExplanation: 'Boiling more liquid generates a larger volume of gas inside a fixed vessel volume, and faster vapour flow through tray perforations increases the tray pressure drop (ΔP).',
    observableAnimationCues: [
      'Faster, thicker amber vapour arrows rising from the reboiler through all 5 trays.',
      'Lower liquid level in the reboiler sump as more liquid is vaporised.',
      'Higher liquid accumulation in the overhead reflux drum as more vapour condenses.'
    ],
    simulationEffect: {
      vapourSpeedFactor: 1.75,
      liquidSpeedFactor: 1.0,
      vapourDensity: 'high',
      reboilerLevel: 'low',
      refluxDrumLevel: 'high',
      separationNote: 'Vigorous vapour generation! Column vapour traffic and tray ΔP rise; more vapour reaches the condenser.',
      traySymptomTitle: 'Elevated Vapour Boil-Up & Active Bubbling',
      traySymptomDescription: 'Notice the faster amber vapour arrows bubbling vigorously through the tray liquid pools, increasing vapour holdup and column pressure.'
    },
    physicalExplanation: 'Adding reboiler heat provides latent heat of vaporisation, converting more bottom liquid into rising vapour. This increases internal vapour traffic and raises column pressure (and differential pressure ΔP across the trays). While adequate vapour is essential for bubbling contact and stripping the bottoms, increasing heat alone does not always improve overhead purity—if pushed too high, it overheats the top section and triggers Entrainment or Flooding.',
    assumptions: [
      'Feed flow rate and composition are kept constant.',
      'The overhead condenser has sufficient cooling water capacity to condense the increased vapour load.',
      'Vapour velocity remains within the normal operating window just below entrainment/flooding limits.'
    ]
  },
  {
    id: 'reflux-flow-increase',
    title: 'Increase Reflux Ratio',
    shortLabel: 'Increase Reflux Ratio',
    category: 'operating-control',
    phenomenon: 'none',
    controlChange: 'Operator opens the reflux control valve to return a larger proportion of condensed overhead liquid back to the top tray.',
    parameter: 'reflux-ratio',
    studentQuestion: 'What happens inside the column when the operator increases the Reflux Ratio?',
    options: [
      {
        id: 'opt-2a',
        text: 'More cool liquid flows downward across the trays, washing heavy molecules down and improving overhead distillate purity.',
        isCorrect: true,
        explanation: 'Correct! Higher reflux sends more liquid back into the top tray to cascade down the column, scrubbing heavier components out of the rising vapour.'
      },
      {
        id: 'opt-2b',
        text: 'All vapour instantly disappears from the column base.',
        isCorrect: false,
        explanation: 'Incorrect. Reflux enters at the top of the tower; the reboiler at the base continues generating vapour.'
      },
      {
        id: 'opt-2c',
        text: 'Distillate product flow rate doubles automatically.',
        isCorrect: false,
        explanation: 'Incorrect. Because more condensed liquid is recycled back into the column, less liquid is drawn off as distillate product!'
      }
    ],
    actionQuestion: 'What is the operational trade-off of increasing the Reflux Ratio?',
    actionOptions: [
      {
        id: 'opt-2-act1',
        text: 'Net distillate production rate decreases, tray hydraulic load (ΔP) rises slightly, and more reboiler energy is needed per unit of product.',
        isCorrect: true,
        explanation: 'Correct! Higher reflux improves overhead purity up to an optimum point, but reduces net distillate draw-off and increases internal liquid load.'
      },
      {
        id: 'opt-2-act2',
        text: 'There is no trade-off; maximum reflux is free and increases product output.',
        isCorrect: false,
        explanation: 'Incorrect. Recycled liquid reduces distillate takeoff and requires reboiler energy to re-vaporise.'
      }
    ],
    expectedPurityImpact: 'improves-moderately',
    expectedPressureImpact: 'increases',
    purityImpactLabel: '▲ Overhead Purity Improves',
    pressureImpactLabel: '▲ Slight Rise in Tray ΔP (Higher Liquid Hold-Up)',
    purityEvidenceExplanation: 'Returning more cool liquid to the top tray provides stronger counter-current washing. Heavier molecules in the rising vapour condense into the cool reflux liquid and are carried down, enriching the overhead distillate in the more volatile component.',
    pressureEvidenceExplanation: 'While cooler reflux slightly condenses top vapour, the heavier liquid flow across the tray decks increases liquid crest height over the weirs, slightly raising the hydraulic differential pressure (ΔP) across the trays.',
    observableAnimationCues: [
      'Faster, thicker cyan liquid arrows returning through the reflux line and cascading down the downcomers.',
      'Active counter-current contact across all 5 trays washing heavy components downward.',
      'Higher liquid accumulation returning to the column bottom sump.'
    ],
    simulationEffect: {
      vapourSpeedFactor: 1.0,
      liquidSpeedFactor: 1.8,
      vapourDensity: 'normal',
      reboilerLevel: 'high',
      refluxDrumLevel: 'normal',
      separationNote: 'Increased cyan liquid reflux cascades down the trays, scrubbing heavy molecules out of the rising vapour.',
      traySymptomTitle: 'Enhanced Counter-Current Liquid Washing',
      traySymptomDescription: 'More cool liquid flows across the tray decks and down the downcomers, condensing heavier molecules out of the rising vapour.'
    },
    physicalExplanation: 'Increasing the Reflux Ratio returns a larger share of condensed overhead liquid to the top tray. This cool liquid cascades down the rectifying section, cooling the upper trays and condensing heavier (less volatile) molecules out of the ascending vapour. As a result, overhead distillate purity generally improves—provided the downcomers do not overload into flooding.',
    assumptions: [
      'Reboiler heat duty is maintained to support upward vapour traffic.',
      'Tray downcomers have sufficient capacity to handle the increased liquid flow without backing up.',
      'Total condensed overhead liquid is split between reflux return and distillate product.'
    ]
  },

  // ================= 5 TRAY HYDRAULIC PHENOMENA (FROM UPLOADED REFERENCE) =================
  {
    id: 'hydraulic-foaming',
    title: 'Foaming (Tray Froth Build-Up)',
    shortLabel: 'Foaming',
    category: 'tray-hydraulics',
    phenomenon: 'foaming',
    controlChange: 'Surface-active impurities (surfactants) or high-viscosity liquid trap rising vapour bubbles on the tray decks.',
    parameter: 'foaming',
    studentQuestion: 'What happens inside the column when Foaming occurs on the trays?',
    options: [
      {
        id: 'foam-1a',
        text: 'A thick layer of frothy bubbles expands above the liquid pool, filling the tray space and spilling into downcomers.',
        isCorrect: true,
        explanation: 'Correct! Foaming is the expansion of liquid due to trapped vapour bubbles. The stable froth fails to collapse quickly, reducing separation efficiency and risking premature flooding.'
      },
      {
        id: 'foam-1b',
        text: 'All liquid drains out of the tray holes immediately, leaving the metal decks bone dry.',
        isCorrect: false,
        explanation: 'Incorrect. Draining through tray perforations happens during Dumping, not Foaming.'
      },
      {
        id: 'foam-1c',
        text: 'The condenser cooling water freezes solid.',
        isCorrect: false,
        explanation: 'Incorrect. Foaming is a gas-liquid surface tension phenomenon on the trays inside the column.'
      }
    ],
    actionQuestion: 'What corrective action can the operator take to control Foaming?',
    actionOptions: [
      {
        id: 'foam-act-1',
        text: 'Inject a chemical antifoam (defoamer) agent and moderately reduce vapour boil-up if needed.',
        isCorrect: true,
        explanation: 'Correct! Antifoam agents weaken bubble walls so the froth collapses back into clear liquid, and reducing vapour rate gives bubbles time to disengage.'
      },
      {
        id: 'foam-act-2',
        text: 'Increase reboiler steam to maximum to blow more bubbles.',
        isCorrect: false,
        explanation: 'Incorrect. Increasing gas velocity creates even more foam and pushes froth onto the tray above.'
      },
      {
        id: 'foam-act-3',
        text: 'Shut off cooling water to the overhead condenser.',
        isCorrect: false,
        explanation: 'Incorrect. Stopping condenser cooling causes column overpressure and does not solve tray foaming.'
      }
    ],
    expectedPurityImpact: 'degrades',
    expectedPressureImpact: 'increases',
    purityImpactLabel: '▼ Purity Degrades (Froth Carryover)',
    pressureImpactLabel: '▲ Differential Pressure (ΔP) Rises',
    purityEvidenceExplanation: 'Persistent foam carries trapped heavy liquid up to the tray above and into the downcomers, preventing clean vapour-liquid disengagement and reducing stage efficiency.',
    pressureEvidenceExplanation: 'The thick frothy layer restricts upward vapour flow and chokes the downcomers, causing the pressure drop (ΔP) across the trays to rise.',
    observableAnimationCues: [
      'Thick amber-white frothy bubble layers swelling on top of every tray liquid pool.',
      'Foam bubbles spilling over the weirs into the downcomer chutes.',
      'Warning indicator showing active tray foaming.'
    ],
    simulationEffect: {
      vapourSpeedFactor: 1.2,
      liquidSpeedFactor: 0.9,
      vapourDensity: 'normal',
      reboilerLevel: 'normal',
      refluxDrumLevel: 'normal',
      separationNote: 'Thick frothy bubble layers swell on every tray deck and spill into downcomers, degrading separation.',
      traySymptomTitle: 'Foaming: Frothy Bubble Layer Swelling',
      traySymptomDescription: 'Notice the dense white-amber foam layer sitting on top of the cyan liquid pool. Vapour bubbles do not pop easily, carrying frothy liquid into the downcomer and up toward the next tray.'
    },
    physicalExplanation: 'Foaming occurs when vapour bubbles rising through the liquid pool cannot easily coalesce and burst (often due to dissolved impurities, corrosion particles, or high surface viscosity). While fine bubbling helps contact, persistent stable foam fills the space between trays, restricts vapour-liquid disengagement, and leads to premature entrainment or flooding.',
    assumptions: [
      'Feed contains trace foam-promoting surfactants or particulates.',
      'Reboiler heat and reflux flow are operating near normal rates.',
      'Simplified visual model exaggerates bubble froth height for student clarity.'
    ]
  },
  {
    id: 'hydraulic-entrainment',
    title: 'Entrainment (Excessive Vapour Velocity)',
    shortLabel: 'Entrainment',
    category: 'tray-hydraulics',
    phenomenon: 'entrainment',
    controlChange: 'Reboiler heat input is turned up too high, creating excessive upward vapour velocity through the tray perforations.',
    parameter: 'entrainment',
    studentQuestion: 'What happens on the trays when high vapour velocity causes Entrainment?',
    options: [
      {
        id: 'ent-1a',
        text: 'Fast-rising vapour physically blasts fine liquid droplets upward onto the tray above, contaminating lighter liquid with heavier liquid.',
        isCorrect: true,
        explanation: 'Correct! Entrainment happens when upward vapour velocity is strong enough to suspend and carry liquid droplets from a lower tray up to a higher tray.'
      },
      {
        id: 'ent-1b',
        text: 'Liquid stops entering the tower and backs up into the feed storage tank.',
        isCorrect: false,
        explanation: 'Incorrect. Entrainment specifically refers to liquid droplets being carried upward by fast-moving vapour.'
      },
      {
        id: 'ent-1c',
        text: 'Vapour flows downward out of the bottoms product valve.',
        isCorrect: false,
        explanation: 'Incorrect. Vapour is still rushing rapidly upward toward the top of the tower.'
      }
    ],
    actionQuestion: 'Which operator adjustment directly reduces Entrainment?',
    actionOptions: [
      {
        id: 'ent-act-1',
        text: 'Reduce reboiler heat input (throttle back steam valve) to slow down upward vapour velocity.',
        isCorrect: true,
        explanation: 'Correct! Lowering reboiler duty reduces the volume and velocity of ascending vapour, allowing liquid droplets to fall back onto their tray by gravity.'
      },
      {
        id: 'ent-act-2',
        text: 'Open the reboiler steam valve wider to boil even harder.',
        isCorrect: false,
        explanation: 'Incorrect. More heat increases vapour velocity further, worsening entrainment and pushing the tower into flooding.'
      },
      {
        id: 'ent-act-3',
        text: 'Close the bottoms outlet valve completely.',
        isCorrect: false,
        explanation: 'Incorrect. Closing the bottoms valve simply accumulates liquid in the column base without slowing vapour velocity.'
      }
    ],
    expectedPurityImpact: 'degrades',
    expectedPressureImpact: 'increases',
    purityImpactLabel: '▼ Overhead Purity Degrades (Heavy Droplet Carryover)',
    pressureImpactLabel: '▲ Column Pressure & ΔP Increase',
    purityEvidenceExplanation: 'Liquid on a lower tray contains heavier (less volatile) components than the tray above it. When high-velocity vapour blasts these droplets upward onto upper trays, it contaminates the purified upper liquid and degrades distillate purity.',
    pressureEvidenceExplanation: 'High vapour boil-up forces a large gas volume rapidly through the small tray perforations, significantly increasing friction and hydrostatic pressure drop (ΔP).',
    observableAnimationCues: [
      'Fast upward amber vapour jets shooting through the sieve holes.',
      'Cyan liquid spray droplets being blasted upward from lower trays onto the underside of upper trays.',
      'Degraded overhead separation due to back-mixing of heavy liquid.'
    ],
    simulationEffect: {
      vapourSpeedFactor: 2.1,
      liquidSpeedFactor: 1.1,
      vapourDensity: 'high',
      reboilerLevel: 'low',
      refluxDrumLevel: 'high',
      separationNote: 'High-velocity amber vapour jets carry cyan liquid spray droplets upward from lower trays to upper trays!',
      traySymptomTitle: 'Entrainment: Upward Liquid Droplet Spray',
      traySymptomDescription: 'Watch the cyan liquid droplets being forcefully blown upward through the vapour space into the underside of the tray above. Heavier liquid from below contaminates the purer liquid above!'
    },
    physicalExplanation: 'In normal operation, vapour bubbles through the liquid on a tray and disengages cleanly so only gas rises to the next tray. When reboiler boil-up is too high, the upward drag force of the fast-moving vapour exceeds gravity on small liquid droplets. These heavier droplets are entrained (carried up) to the tray above, undoing the separation work and lowering overhead distillate purity.',
    assumptions: [
      'Reboiler heat duty is set above the optimal operating window.',
      'Tray spacing is fixed; vapour velocity exceeds droplet settling velocity.',
      'Column has not yet backed up the downcomers into full flooding.'
    ]
  },
  {
    id: 'hydraulic-weeping',
    title: 'Weeping (Low Vapour Velocity)',
    shortLabel: 'Weeping',
    category: 'tray-hydraulics',
    phenomenon: 'weeping',
    controlChange: 'Reboiler heat input is reduced too low, causing upward vapour pressure beneath the trays to drop.',
    parameter: 'weeping',
    studentQuestion: 'What happens on the perforated sieve trays when Weeping occurs?',
    options: [
      {
        id: 'weep-1a',
        text: 'Upward vapour pressure is too weak to hold up the full liquid pool, so some liquid drips directly down through the tray holes.',
        isCorrect: true,
        explanation: 'Correct! During weeping, part of the liquid leaks straight down through the sieve perforations instead of flowing across the tray deck to the weir.'
      },
      {
        id: 'weep-1b',
        text: 'Liquid shoots out of the top condenser vent like a geyser.',
        isCorrect: false,
        explanation: 'Incorrect. Weeping is caused by low vapour flow, causing liquid to leak downward, not shoot upward.'
      },
      {
        id: 'weep-1c',
        text: 'The trays melt due to extreme high temperature.',
        isCorrect: false,
        explanation: 'Incorrect. Weeping occurs at low heat input and low vapour velocity.'
      }
    ],
    actionQuestion: 'How should the operator fix Weeping in the distillation column?',
    actionOptions: [
      {
        id: 'weep-act-1',
        text: 'Increase reboiler heat input (open steam valve) to increase upward vapour flow and support the tray liquid.',
        isCorrect: true,
        explanation: 'Correct! Increasing reboiler boil-up raises the upward vapour pressure through the sieve holes, holding the liquid on the tray deck where it belongs.'
      },
      {
        id: 'weep-act-2',
        text: 'Cut off all steam to the reboiler.',
        isCorrect: false,
        explanation: 'Incorrect. Cutting off steam completely will turn mild weeping into severe dumping!'
      },
      {
        id: 'weep-act-3',
        text: 'Drain the reflux drum completely dry.',
        isCorrect: false,
        explanation: 'Incorrect. Emptying the reflux drum disrupts column control and does not restore upward vapour pressure.'
      }
    ],
    expectedPurityImpact: 'degrades',
    expectedPressureImpact: 'decreases',
    purityImpactLabel: '▼ Purity Degrades (Poor Tray Contact)',
    pressureImpactLabel: '▼ Column Pressure & ΔP Drop',
    purityEvidenceExplanation: 'Because liquid leaks prematurely through the sieve holes instead of flowing across the entire tray deck, residence time and intimate vapour-liquid contact are lost, reducing separation efficiency.',
    pressureEvidenceExplanation: 'Low reboiler boil-up generates very little rising vapour, and thinner liquid pools on the trays result in an abnormally low tray differential pressure (ΔP).',
    observableAnimationCues: [
      'Slow, faint amber vapour arrows rising weakly.',
      'Cyan liquid droplets dripping straight down through the sieve tray perforations.',
      'Thinner liquid layer on the trays and rising liquid level in the bottom sump.'
    ],
    simulationEffect: {
      vapourSpeedFactor: 0.5,
      liquidSpeedFactor: 0.85,
      vapourDensity: 'low',
      reboilerLevel: 'high',
      refluxDrumLevel: 'low',
      separationNote: 'Weak upward vapour allows cyan liquid drops to leak downward through the tray perforations.',
      traySymptomTitle: 'Weeping: Partial Liquid Leakage Through Holes',
      traySymptomDescription: 'Notice cyan droplets dripping downward right through the perforated holes of the tray deck while reduced liquid flows over the weir. Contact time between vapour and liquid is reduced.'
    },
    physicalExplanation: 'Sieve trays rely on the upward pressure of rising vapour passing through the small holes to keep the pool of liquid on top of the tray deck. When vapour velocity falls below the "weep point", the hydrostatic weight of the liquid pool overcomes the weak vapour pressure, and liquid begins dripping through the holes, bypassing normal cross-tray contact.',
    assumptions: [
      'Column uses perforated sieve trays without bubble-cap seals.',
      'Reboiler heat duty is slightly below the minimum design vapour load.',
      'Some liquid still overflows the outlet weir into the downcomer.'
    ]
  },
  {
    id: 'hydraulic-dumping',
    title: 'Dumping (Severe Tray Drain-Out)',
    shortLabel: 'Dumping',
    category: 'tray-hydraulics',
    phenomenon: 'dumping',
    controlChange: 'Reboiler heat input drops drastically (or steam supply trips), causing upward vapour flow to nearly collapse.',
    parameter: 'dumping',
    studentQuestion: 'How does Dumping differ from mild Weeping inside the distillation tower?',
    options: [
      {
        id: 'dump-1a',
        text: 'Virtually ALL liquid pours rapidly down through the tray holes, leaving the trays dry with zero liquid overflowing the weirs into the downcomers.',
        isCorrect: true,
        explanation: 'Correct! Dumping is the extreme version of weeping: upward vapour pressure is so low that the entire liquid inventory cascades straight through the tray perforations to the column bottom.'
      },
      {
        id: 'dump-1b',
        text: 'Liquid fills the entire column from bottom to top.',
        isCorrect: false,
        explanation: 'Incorrect. Filling the column with backed-up liquid is Flooding, whereas Dumping drains the trays dry.'
      },
      {
        id: 'dump-1c',
        text: 'Vapour velocity reaches supersonic speed.',
        isCorrect: false,
        explanation: 'Incorrect. Dumping happens when vapour velocity is critically low or nearly zero.'
      }
    ],
    actionQuestion: 'What must the operator do to recover the tower from Dumping?',
    actionOptions: [
      {
        id: 'dump-act-1',
        text: 'Restore reboiler heat input immediately to generate rising vapour traffic and re-establish liquid levels on the trays.',
        isCorrect: true,
        explanation: 'Correct! Restoring reboiler boil-up creates the upward vapour flow needed to seal the tray perforations so liquid can accumulate on the decks again.'
      },
      {
        id: 'dump-act-2',
        text: 'Pump maximum cold liquid reflux into the tower while keeping reboiler steam off.',
        isCorrect: false,
        explanation: 'Incorrect. Adding more liquid without rising vapour will simply dump straight to the bottom sump and flood the base.'
      },
      {
        id: 'dump-act-3',
        text: 'Open the top vent to the atmosphere.',
        isCorrect: false,
        explanation: 'Incorrect. Venting to atmosphere does not restore the thermal boil-up needed at the reboiler.'
      }
    ],
    expectedPurityImpact: 'degrades',
    expectedPressureImpact: 'decreases',
    purityImpactLabel: '▼ Separation Collapses Completely',
    pressureImpactLabel: '▼▼ Tray ΔP Collapses Near Zero',
    purityEvidenceExplanation: 'With all liquid pouring straight through the tray perforations and almost no rising vapour, stage-by-stage counter-current contact stops completely. Unseparated feed dumps directly into the column bottom.',
    pressureEvidenceExplanation: 'Because vapour boil-up has collapsed and the trays hold almost zero liquid depth, the pressure drop across the trays falls sharply.',
    observableAnimationCues: [
      'Heavy vertical cyan liquid streams pouring straight through the tray holes.',
      'Empty, dry tray decks with zero liquid overflowing into the downcomers.',
      'High liquid surge in the bottom sump and reboiler.'
    ],
    simulationEffect: {
      vapourSpeedFactor: 0.2,
      liquidSpeedFactor: 1.5,
      vapourDensity: 'low',
      reboilerLevel: 'high',
      refluxDrumLevel: 'low',
      separationNote: 'Extreme vapour loss! All liquid pours straight through tray holes into the bottom sump; downcomers run dry.',
      traySymptomTitle: 'Dumping: Complete Liquid Cascade Through Perforations',
      traySymptomDescription: 'Observe heavy vertical streams of liquid pouring straight through the tray holes. The liquid level on the trays drops below the weir height, downcomers are empty, and separation collapses completely!'
    },
    physicalExplanation: 'Dumping is the severe extreme of weeping. When reboiler steam drops far below minimum operating limits, upward vapour pressure can no longer support any liquid head on the sieve trays. Instead of flowing across the tray deck and over the outlet weir into the downcomer, the entire liquid stream dumps straight through the tray holes to the bottom sump. Vapour-liquid contact and fractionation effectively cease.',
    assumptions: [
      'Reboiler heat input has fallen far below the minimum turndown limit.',
      'Liquid head on trays drops below weir height (zero downcomer flow).',
      'Bottom sump liquid level rises rapidly as tray holdup drains to the base.'
    ]
  },
  {
    id: 'hydraulic-flooding',
    title: 'Flooding (Column Liquid Back-Up)',
    shortLabel: 'Flooding',
    category: 'tray-hydraulics',
    phenomenon: 'flooding',
    controlChange: 'Excessive vapour flow and/or excessive liquid load prevents liquid from draining down the downcomers.',
    parameter: 'flooding',
    studentQuestion: 'What happens inside the distillation tower when Flooding occurs?',
    options: [
      {
        id: 'flood-1a',
        text: 'Liquid backs up in the downcomers and floods across the trays until the column fills with deep, turbulent liquid and pressure differential spikes.',
        isCorrect: true,
        explanation: 'Correct! Flooding occurs when upward vapour pressure and/or high liquid rates block the downcomers, causing liquid to accumulate from tray to tray and carry over into the overhead line.'
      },
      {
        id: 'flood-1b',
        text: 'All liquid disappears and the column operates with 100% dry gas.',
        isCorrect: false,
        explanation: 'Incorrect. Flooding means the column becomes choked and submerged with backed-up liquid.'
      },
      {
        id: 'flood-1c',
        text: 'Separation efficiency reaches 100% perfection.',
        isCorrect: false,
        explanation: 'Incorrect. Flooding destroys stage-by-stage separation and contaminates the overhead distillate with heavy liquid.'
      }
    ],
    actionQuestion: 'What corrective action should the operator take immediately when Flooding is detected?',
    actionOptions: [
      {
        id: 'flood-act-1',
        text: 'Reduce reboiler heat input (steam rate) and/or reduce reflux and feed flow rates so backed-up liquid can drain down.',
        isCorrect: true,
        explanation: 'Correct! Lowering vapour velocity (via reboiler steam) and reducing liquid traffic relieves the hydraulic bottleneck in the downcomers, allowing normal tray levels to recover.'
      },
      {
        id: 'flood-act-2',
        text: 'Increase both reboiler steam and feed flow rate by 50%.',
        isCorrect: false,
        explanation: 'Incorrect. Increasing vapour and liquid loads will worsen the flooding and force liquid into the overhead condenser.'
      },
      {
        id: 'flood-act-3',
        text: 'Shut the bottoms product valve so no liquid can leave the base.',
        isCorrect: false,
        explanation: 'Incorrect. Trapping liquid at the base prevents the flooded column from draining.'
      }
    ],
    expectedPurityImpact: 'degrades',
    expectedPressureImpact: 'spikes-sharply',
    purityImpactLabel: '▼▼ Purity Severely Degrades (Liquid Carryover)',
    pressureImpactLabel: '▲▲ Column ΔP Spikes Sharply (Flooded Trays)',
    purityEvidenceExplanation: 'When the trays and downcomers fill completely with backed-up liquid, stage-by-stage separation is lost and heavy unseparated liquid surges directly out the top vapour line into the overhead condenser.',
    pressureEvidenceExplanation: 'Rising vapour must push through a tall column of backed-up liquid filling the entire tray spacing, causing the differential pressure (ΔP) between the bottom and top of the tower to spike dramatically.',
    observableAnimationCues: [
      'Downcomers completely choked and filled to the top with cyan liquid.',
      'Deep surging cyan liquid submerging all 5 trays inside the column.',
      'Liquid carrying over into the overhead condenser line and high ΔP warning.'
    ],
    simulationEffect: {
      vapourSpeedFactor: 2.3,
      liquidSpeedFactor: 2.0,
      vapourDensity: 'high',
      reboilerLevel: 'high',
      refluxDrumLevel: 'high',
      separationNote: 'CRITICAL: Downcomers choked! Deep liquid submerges all trays and surges into the overhead line.',
      traySymptomTitle: 'Flooding: Downcomer Backup & Tray Submergence',
      traySymptomDescription: 'Notice the downcomers completely filled to the top with cyan liquid and deep turbulent liquid layers flooding the entire tray spacing. Differential pressure across the tower surges sharply!'
    },
    physicalExplanation: 'Flooding is the upper hydraulic capacity limit of a distillation column. It happens in two main ways: (1) Downcomer Backup Flooding, where high pressure drop across the tray and high liquid flow cause liquid to back up inside the downcomer onto the tray above, or (2) Jet/Entrainment Flooding, where extreme vapour velocity holds up the descending liquid. The tray spaces fill with liquid, column differential pressure spikes, and heavy liquid surges into the overhead condenser.',
    assumptions: [
      'Vapour velocity and/or liquid traffic exceed the hydraulic capacity of the trays and downcomers.',
      'Column differential pressure (ΔP) rises sharply due to deep liquid holdup.',
      'Requires immediate reduction in boil-up or feed/reflux load to restore normal operation.'
    ]
  },
  {
    id: 'total-reflux-mode',
    title: 'Total Reflux Operation (Start-Up Mode)',
    shortLabel: 'Total Reflux',
    category: 'operating-control',
    phenomenon: 'none',
    controlChange: 'Operator completely closes the distillate product valve, returning 100% of condensed overhead liquid as reflux.',
    parameter: 'total-reflux',
    studentQuestion: 'Why do chemical plant operators run a column at "Total Reflux" during start-up?',
    options: [
      {
        id: 'opt-4a',
        text: 'To establish liquid-vapour equilibrium across all trays and reach maximum separation before harvesting product.',
        isCorrect: true,
        explanation: 'Correct! With zero distillate taken off, all overhead liquid returns, allowing trays to wet and establish stable composition profiles.'
      },
      {
        id: 'opt-4b',
        text: 'Because plant management wants to waste as much steam as possible.',
        isCorrect: false,
        explanation: 'Incorrect. Total reflux is an intentional engineering procedure for commissioning and testing.'
      },
      {
        id: 'opt-4c',
        text: 'To cool the tower down to room temperature.',
        isCorrect: false,
        explanation: 'Incorrect. Reboiler heat is still running to maintain vapour circulation.'
      }
    ],
    actionQuestion: 'Once the tower temperatures and compositions stabilise at Total Reflux, what does the operator do next?',
    actionOptions: [
      {
        id: 'opt-4-act1',
        text: 'Gradually introduce continuous feed and open the distillate and bottoms product valves under level/composition control.',
        isCorrect: true,
        explanation: 'Correct! Once equilibrium is established, the operator transitions smoothly to continuous production.'
      },
      {
        id: 'opt-4-act2',
        text: 'Keep all product valves closed forever during normal production.',
        isCorrect: false,
        explanation: 'Incorrect. Total reflux produces zero net product output, so product valves must open once lined out.'
      }
    ],
    expectedPurityImpact: 'maximum-equilibrium',
    expectedPressureImpact: 'increases',
    purityImpactLabel: '▲ Maximum Theoretical Separation (Zero Net Draw)',
    pressureImpactLabel: '● Steady Elevated Internal Traffic',
    purityEvidenceExplanation: 'Because 100% of condensed overhead liquid is returned to the column as reflux, every tray receives maximum liquid-vapour contact, achieving the sharpest possible separation for the given number of trays.',
    pressureEvidenceExplanation: 'Full internal recycling of overhead liquid alongside steady reboiler boil-up maintains healthy, steady tray liquid levels and normal-to-elevated tray differential pressure.',
    observableAnimationCues: [
      '100% of overhead liquid returning via the reflux line to Tray 1.',
      'Steady counter-current vapour and liquid contact across all trays.',
      'Closed-loop equilibrium operation prior to product withdrawal.'
    ],
    simulationEffect: {
      vapourSpeedFactor: 1.2,
      liquidSpeedFactor: 1.8,
      vapourDensity: 'normal',
      reboilerLevel: 'normal',
      refluxDrumLevel: 'normal',
      separationNote: 'Zero distillate leaves the system. 100% of condensed overhead liquid returns to Tray 1.',
      traySymptomTitle: 'Closed-Loop Maximum Contact Equilibrium',
      traySymptomDescription: 'All condensed vapour returns as reflux, giving maximum liquid-vapour contact on every tray while the column lines out.'
    },
    physicalExplanation: 'At Total Reflux (Distillate = 0), no product leaves and no new feed is introduced. The system operates in a closed loop. This provides the maximum theoretical separation possible for the given number of trays and is used to test column hydraulics, verify instruments, and stabilise temperature profiles.',
    assumptions: [
      'Closed inventory system with steady heat input and steady condenser cooling.',
      'Feed inlet valve and product draw-off valves are closed during total reflux line-out.'
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the main purpose of the trays and downcomers inside a distillation tower?',
    options: [
      'To hold liquid so rising vapour can bubble through it, enabling mass and heat transfer',
      'To filter out solid dirt from the raw petroleum oil',
      'To store chemicals long-term like warehouse storage shelves',
      'To cool the exterior walls of the metal tower'
    ],
    correctIndex: 0,
    explanation: 'Trays hold a pool of liquid while downcomers guide overflow liquid down to the next level. When vapour bubbles through the liquid on the tray, mass transfer occurs: lighter components boil into vapour, and heavier components condense into liquid.',
    hint: 'Think about where the vapour and liquid physically touch and interact inside the tower.'
  },
  {
    id: 2,
    question: 'In an operating distillation column, in what directions do vapour and liquid travel?',
    options: [
      'Both vapour and liquid move sideways from left to right',
      'Vapour rises upward while liquid flows downward (Counter-current flow)',
      'Both vapour and liquid fall downward together into the sewer',
      'Liquid rises upward to the top while vapour sinks down to the bottom'
    ],
    correctIndex: 1,
    explanation: 'Because vapour is less dense (lighter), it naturally rises upward. Liquid is denser and pulled downward by gravity. This opposing motion is called counter-current flow.',
    hint: 'Think about density: does steam rise or fall? What does gravity do to liquid?'
  },
  {
    id: 3,
    question: 'What happens to the hot vapour after it leaves the very top of the distillation column?',
    options: [
      'It vents directly into the air to create industrial smog',
      'It enters the condenser, cools down, and turns into liquid in the reflux drum',
      'It goes directly to the bottom reboiler to be burned as fuel',
      'It freezes into ice cubes inside the feed inlet nozzle'
    ],
    correctIndex: 1,
    explanation: 'Overhead vapour flows into the condenser, where cooling water absorbs its latent heat, condensing it into liquid that collects inside the reflux accumulator drum.',
    hint: 'Look at the top of the diagram: trace the pipe from the top nozzle to the cooling unit.'
  },
  {
    id: 4,
    question: 'Why does the distillation column require a reboiler at the bottom?',
    options: [
      'To paint the exterior metal shell with protective coatings',
      'To provide heat that vaporises bottom liquid and drives rising vapour up the column',
      'To crush hard rocks into fine chemical powder',
      'To keep the plant control room warm during winter'
    ],
    correctIndex: 1,
    explanation: 'The reboiler is the thermal engine of the tower. It adds heat energy (usually with steam) to boil the bottom liquid, generating the rising vapour traffic required for distillation.',
    hint: 'Without boiling at the base, can any vapour rise through the trays?'
  },
  {
    id: 5,
    question: 'Why is a portion of the condensed overhead liquid returned to the top tray as reflux?',
    options: [
      'To cool upper trays and wash down heavier molecules, improving distillate purity',
      'To dilute the chemical mixture so that customers get more volume',
      'Because the plant ran out of storage tanks for product',
      'To lubricate the metal trays so they can spin like turbine blades'
    ],
    correctIndex: 0,
    explanation: 'Reflux liquid provides cooler descending liquid on the top trays. It knocks down and condenses heavier, less-volatile molecules that may have drifted upward, ensuring only pure light component leaves as distillate product.',
    hint: 'Reflux acts like a scrubber or washing step for the ascending vapour.'
  }
];

export const LABELLING_HOTSPOTS: LabelHotspot[] = [
  { id: 'spot-column', name: 'Column Shell & Trays', hint: 'Vertical vessel holding internal contact trays', x: 280, y: 250, width: 100, height: 120 },
  { id: 'spot-feed', name: 'Feed Inlet Line', hint: 'Where raw feed mixture enters at the middle tray', x: 170, y: 310, width: 90, height: 40 },
  { id: 'spot-condenser', name: 'Overhead Condenser', hint: 'Cools top vapour back into liquid state', x: 505, y: 75, width: 90, height: 60 },
  { id: 'spot-reflux-drum', name: 'Reflux Drum', hint: 'Horizontal surge tank collecting condensed overhead liquid', x: 515, y: 185, width: 80, height: 50 },
  { id: 'spot-reflux-line', name: 'Reflux Line', hint: 'Pipe returning liquid back to top tray', x: 410, y: 165, width: 90, height: 35 },
  { id: 'spot-distillate', name: 'Distillate Outlet', hint: 'Light purified product leaving system', x: 615, y: 225, width: 95, height: 35 },
  { id: 'spot-reboiler', name: 'Bottom Reboiler', hint: 'Heat exchanger providing boiling heat at base', x: 430, y: 455, width: 90, height: 65 },
  { id: 'spot-bottoms', name: 'Bottoms Product Outlet', hint: 'Heavy liquid stream leaving column bottom', x: 320, y: 525, width: 95, height: 35 }
];

export const TEACHER_ASSUMPTIONS = [
  {
    topic: 'Equilibrium & Calculation Model',
    assumption: 'Simplified Conceptual Model (No empirical vapor-liquid equilibrium VLE flash calculations)',
    explanation: 'In line with Ms Syahirah’s teaching guidelines for ITE foundational students, this applet intentionally avoids inventing mock temperatures (e.g., 78.3°C), pressures (1.2 barg), or decimal mole fractions. It reinforces qualitative mass-energy relationships rather than mathematical McCabe-Thiele geometry.'
  },
  {
    topic: 'Tray Hydraulic Malfunctions (Foaming, Entrainment, Weeping, Dumping, Flooding)',
    assumption: 'Qualitative Visual & Cause-Effect Representation',
    explanation: 'Students predict both the internal visual behaviour and the operator corrective action for all five abnormal tray hydraulic states: Foaming (trapped bubble froth expansion), Entrainment (high vapour velocity carrying liquid spray to the tray above), Weeping (low vapour pressure allowing liquid drips through perforations), Dumping (severe vapour loss causing complete liquid drain-out through holes), and Flooding (downcomer backup and full tray submergence).'
  },
  {
    topic: 'Vapour-Liquid Contact & Separation',
    assumption: 'Contact Supports Separation',
    explanation: 'The model demonstrates that rising vapour is enriched in the more volatile component upon each tray contact, while liquid descending from trays becomes enriched in the less volatile component.'
  },
  {
    topic: 'Reboiler Heat Duty',
    assumption: 'Increased Heat Increases Vapour Generation (Within Hydraulic Limits)',
    explanation: 'The lesson explains that increasing reboiler heat boils more bottom liquid, creating more ascending vapour. It explicitly cautions that heat cannot be increased indefinitely without triggering entrainment or flooding, nor reduced too far without causing weeping or dumping.'
  },
  {
    topic: 'Reflux Function',
    assumption: 'Reflux Provides Counter-Current Washing Liquid',
    explanation: 'Reflux is presented as returning cooled condensed liquid to the top tray to scrub heavier molecules down. It clarifies that excessive reflux decreases distillate yield rate, increases reboiler steam consumption, and can contribute to downcomer flooding.'
  }
];
