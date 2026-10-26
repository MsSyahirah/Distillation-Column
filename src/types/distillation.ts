export type ThemeMode = 'dcs-dark' | 'clean-light';

export type HydraulicPhenomenon =
  | 'none'
  | 'foaming'
  | 'entrainment'
  | 'weeping'
  | 'dumping'
  | 'flooding';

export type ImpactDirection = 'increases' | 'decreases' | 'spikes-or-degrades';

export interface TechnicalTerm {
  term: string;
  simpleDefinition: string;
}

export interface EquipmentComponent {
  id: string;
  name: string;
  tag: string;
  category: 'column' | 'internals' | 'overhead' | 'bottoms' | 'feed';
  purpose: string;
  howItWorks: string;
  everydayAnalogy: string;
  technicalTerms: TechnicalTerm[];
  targetRegion: {
    x: number;
    y: number;
    width: number;
    height: number;
    labelX: number;
    labelY: number;
  };
}

export interface FlowStep {
  id: number;
  title: string;
  phase: 'feed' | 'vapour' | 'overhead' | 'reflux' | 'tray-contact' | 'reboiler';
  streamName: string;
  description: string;
  operatorNote: string;
  highlightNodes: string[];
}

export interface PredictionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface PredictionScenario {
  id: string;
  title: string;
  shortLabel: string;
  category: 'operating-control' | 'tray-hydraulics';
  phenomenon: HydraulicPhenomenon;
  controlChange: string;
  parameter:
    | 'reboiler-heat'
    | 'reflux-ratio'
    | 'reboiler-low'
    | 'total-reflux'
    | 'foaming'
    | 'entrainment'
    | 'weeping'
    | 'dumping'
    | 'flooding';
  studentQuestion: string;
  options: PredictionOption[];
  actionQuestion: string;
  actionOptions: PredictionOption[];
  expectedPurityImpact: 'improves-moderately' | 'degrades' | 'maximum-equilibrium';
  expectedPressureImpact: 'increases' | 'decreases' | 'spikes-sharply';
  purityImpactLabel: string;
  pressureImpactLabel: string;
  purityEvidenceExplanation: string;
  pressureEvidenceExplanation: string;
  observableAnimationCues: string[];
  simulationEffect: {
    vapourSpeedFactor: number;
    liquidSpeedFactor: number;
    vapourDensity: 'low' | 'normal' | 'high';
    reboilerLevel: 'low' | 'normal' | 'high';
    refluxDrumLevel: 'low' | 'normal' | 'high';
    separationNote: string;
    traySymptomTitle: string;
    traySymptomDescription: string;
  };
  physicalExplanation: string;
  assumptions: string[];
}

export interface StudentScenarioPrediction {
  scenarioId: string;
  scenarioTitle: string;
  predictedPurity: string;
  expectedPurity: string;
  predictedPressure: string;
  expectedPressure: string;
  writtenHypothesis: string;
  behaviourChoiceText?: string;
  behaviourCorrect?: boolean;
  actionChoiceText?: string;
  actionCorrect?: boolean;
  submittedAt: string;
}

export interface StudentActionEvent {
  id: string;
  timestamp: string;
  stage: string;
  actionType: string;
  target: string;
  studentInput: string;
  result: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

export interface LabelHotspot {
  id: string;
  name: string;
  hint: string;
  x: number;
  y: number;
  width: number;
  height: number;
  snappedComponentId?: string;
}

export interface StudentProfile {
  name: string;
  className: string;
  startedAt: string;
  completedStages: number[];
  exploredEquipmentIds?: string[];
  exploredFlowSteps?: number[];
  scenarioPredictions?: Record<string, StudentScenarioPrediction>;
  actionLog?: StudentActionEvent[];
  quizAnswers: Record<number, number>;
  quizSubmitted: boolean;
  quizScore: number;
  quizAttempts: number;
  labellingAnswers: Record<string, string>;
  labellingCompleted: boolean;
  reflection: {
    understood: string;
    unsure: string;
    questionForTeacher: string;
    submittedAt?: string;
  };
}
