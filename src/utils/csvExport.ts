import { StudentProfile } from '../types/distillation';
import { EQUIPMENT_COMPONENTS, PREDICTION_SCENARIOS, QUIZ_QUESTIONS } from '../data/distillationData';

/**
 * Safely escapes a value for CSV cells (wraps in quotes and escapes internal quotes).
 */
function escapeCsvCell(value: unknown): string {
  if (value === null || value === undefined) return '""';
  const str = String(value).replace(/\r?\n/g, ' ').trim();
  return `"${str.replace(/"/g, '""')}"`;
}

function buildCsvRow(cells: unknown[]): string {
  return cells.map(escapeCsvCell).join(',');
}

/**
 * Generates and downloads a comprehensive CSV report containing:
 * 1. Student Summary & Reflections
 * 2. Stage 3 Simulation Scenario Predictions (Purity, Pressure, Behaviour, Operator Action, Written Hypothesis)
 * 3. Stage 4 Quiz & Component Labelling Results
 * 4. Complete Chronological Student Action Log
 */
export function downloadStudentMonitoringCSV(student: StudentProfile): void {
  const rows: string[] = [];
  const exportTime = new Date().toLocaleString();
  const studentName = student.name || 'Anonymous Student';
  const studentClass = student.className || 'Unassigned Class';

  // ================= SECTION 1: STUDENT OVERVIEW & SUMMARY =================
  rows.push(buildCsvRow(['EXPLORE THE DISTILLATION TOWER - STUDENT MONITORING & ACTION REPORT']));
  rows.push(buildCsvRow(['Created by Ms Syahirah · ITE Chemical Process Technology']));
  rows.push(buildCsvRow([]));

  rows.push(buildCsvRow(['--- 1. STUDENT PROFILE & PROGRESS SUMMARY ---']));
  rows.push(
    buildCsvRow([
      'Student Name',
      'Class / Cohort',
      'Session Started At',
      'Report Exported At',
      'Stages Completed (out of 5)',
      'Equipment Inspected (out of 9)',
      'Scenarios Tested (out of 8)',
      'Labels Matched (out of 8)',
      'Quiz Score (out of 5)',
      'Quiz Attempts'
    ])
  );

  const exploredCount = student.exploredEquipmentIds ? student.exploredEquipmentIds.length : 1;
  const scenariosCount = student.scenarioPredictions
    ? Object.keys(student.scenarioPredictions).length
    : 0;
  const labelsCount = student.labellingAnswers ? Object.keys(student.labellingAnswers).length : 0;

  rows.push(
    buildCsvRow([
      studentName,
      studentClass,
      new Date(student.startedAt).toLocaleString(),
      exportTime,
      `${student.completedStages.length} / 5 (${student.completedStages.sort().join(', ')})`,
      `${exploredCount} / ${EQUIPMENT_COMPONENTS.length}`,
      `${scenariosCount} / ${PREDICTION_SCENARIOS.length}`,
      `${labelsCount} / 8`,
      `${student.quizScore} / ${QUIZ_QUESTIONS.length}`,
      student.quizAttempts
    ])
  );
  rows.push(buildCsvRow([]));

  // ================= SECTION 2: STAGE 3 SIMULATION SCENARIO PREDICTIONS =================
  rows.push(buildCsvRow(['--- 2. STAGE 3: SIMULATION SCENARIOS & HYDRAULIC PREDICTIONS ---']));
  rows.push(
    buildCsvRow([
      'Scenario ID',
      'Scenario Title',
      'Category',
      'Completed?',
      'Predicted Purity Impact',
      'Expected Purity Impact',
      'Predicted Column Pressure (ΔP)',
      'Expected Column Pressure (ΔP)',
      'Student Written Hypothesis',
      'Predicted Visual Behaviour',
      'Behaviour Correct?',
      'Predicted Corrective Action',
      'Action Correct?',
      'Submitted At'
    ])
  );

  const preds = student.scenarioPredictions || {};
  PREDICTION_SCENARIOS.forEach((sc) => {
    const p = preds[sc.id];
    if (p) {
      rows.push(
        buildCsvRow([
          sc.id,
          sc.title,
          sc.category,
          'Yes',
          p.predictedPurity,
          p.expectedPurity,
          p.predictedPressure,
          p.expectedPressure,
          p.writtenHypothesis || '(No written text)',
          p.behaviourChoiceText || '(Not selected)',
          p.behaviourCorrect === undefined ? 'N/A' : p.behaviourCorrect ? 'Correct' : 'Incorrect',
          p.actionChoiceText || '(Not selected)',
          p.actionCorrect === undefined ? 'N/A' : p.actionCorrect ? 'Correct' : 'Incorrect',
          new Date(p.submittedAt).toLocaleString()
        ])
      );
    } else {
      rows.push(
        buildCsvRow([
          sc.id,
          sc.title,
          sc.category,
          'Not Yet Attempted',
          '-',
          sc.expectedPurityImpact,
          '-',
          sc.expectedPressureImpact,
          '-',
          '-',
          '-',
          '-',
          '-',
          '-'
        ])
      );
    }
  });
  rows.push(buildCsvRow([]));

  // ================= SECTION 3: STAGE 4 CONCEPT QUIZ RESULTS =================
  rows.push(buildCsvRow(['--- 3. STAGE 4: CONCEPT CHECK QUIZ BREAKDOWN ---']));
  rows.push(
    buildCsvRow([
      'Question #',
      'Question Prompt',
      'Student Selected Answer',
      'Correct Answer',
      'Result'
    ])
  );

  QUIZ_QUESTIONS.forEach((q) => {
    const selectedIdx = student.quizAnswers[q.id];
    const selectedText =
      selectedIdx !== undefined ? q.options[selectedIdx] : '(Not Answered)';
    const correctText = q.options[q.correctIndex];
    const isCorrect = selectedIdx === q.correctIndex;

    rows.push(
      buildCsvRow([
        `Q${q.id}`,
        q.question,
        selectedText,
        correctText,
        selectedIdx === undefined ? 'Unanswered' : isCorrect ? 'Correct' : 'Incorrect'
      ])
    );
  });
  rows.push(buildCsvRow([]));

  // ================= SECTION 4: STAGE 5 STUDENT REFLECTIONS =================
  rows.push(buildCsvRow(['--- 4. STAGE 5: STUDENT REFLECTION RESPONSES ---']));
  rows.push(
    buildCsvRow([
      'Prompt 1: One thing I understand clearly',
      'Prompt 2: One thing I am still unsure about',
      'Prompt 3: One question I want to ask Ms Syahirah',
      'Reflection Saved At'
    ])
  );
  rows.push(
    buildCsvRow([
      student.reflection.understood || '(Not provided)',
      student.reflection.unsure || '(Not provided)',
      student.reflection.questionForTeacher || '(Not provided)',
      student.reflection.submittedAt
        ? new Date(student.reflection.submittedAt).toLocaleString()
        : '(Not saved yet)'
    ])
  );
  rows.push(buildCsvRow([]));

  // ================= SECTION 5: CHRONOLOGICAL STUDENT ACTION LOG =================
  rows.push(buildCsvRow(['--- 5. CHRONOLOGICAL STUDENT ACTION LOG (ALL INTERACTIONS) ---']));
  rows.push(
    buildCsvRow([
      'Event #',
      'Timestamp',
      'Student Name',
      'Class',
      'Lesson Stage',
      'Action Type',
      'Component / Scenario / Target',
      'Student Input / Prediction / Choice',
      'Result / Status'
    ])
  );

  const actionLog = student.actionLog || [];
  if (actionLog.length === 0) {
    rows.push(
      buildCsvRow([
        1,
        new Date(student.startedAt).toLocaleString(),
        studentName,
        studentClass,
        'Stage 1: Equipment',
        'Session Started',
        'Distillation Tower Lesson',
        'Initial Load',
        'Active'
      ])
    );
  } else {
    actionLog.forEach((evt, index) => {
      rows.push(
        buildCsvRow([
          index + 1,
          new Date(evt.timestamp).toLocaleString(),
          studentName,
          studentClass,
          evt.stage,
          evt.actionType,
          evt.target,
          evt.studentInput,
          evt.result
        ])
      );
    });
  }

  // Add UTF-8 BOM (\uFEFF) so Microsoft Excel opens special characters (like ΔP) cleanly
  const csvContent = '\uFEFF' + rows.join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const safeName = studentName.replace(/[^a-zA-Z0-9_-]/g, '_');
  const safeClass = studentClass.replace(/[^a-zA-Z0-9_-]/g, '_');
  const datePart = new Date().toISOString().slice(0, 10);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute(
    'download',
    `Distillation_Monitor_${safeName}_${safeClass}_${datePart}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
