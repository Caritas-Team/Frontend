export type UUID = string;
export type DateTime = string;

export type ProcessingStatusType = 'processing' | 'completed' | 'failed';
export type ProcessingErrorCode =
  | 'validation_error'
  | 'parse_error'
  | 'calculation_error'
  | 'internal_error';

export type GetAssessmentResponse =
  | ProcessingStatus
  | CompletedResult
  | FailedResult;

// Для POST /assessments/upload
export interface UploadAssessmentParams {
  files?: File[];
  meta?: Record<string, unknown>;
}

// Для GET /assessments/{request_id}
export interface GetAssessmentParams {
  request_id?: UUID;
  wait?: boolean;
  keep_in_cache?: boolean;
}

// Для DELETE /assessments/{request_id}
export interface DeleteAssessmentParams {
  request_id?: UUID;
}

export interface BaseResponse {
  request_id: UUID;
  status: ProcessingStatusType;
  created_at: DateTime;
}

export interface UploadResponse {
  request_id?: string; //($uuid) Уникальный идентификатор запроса
  status?: ProcessingStatusType; //Статус обработки
  accepted_files?: number; //minimum: 2, Количество принятых файлов
  students_count?: number; //minimum: 1, Количество учеников для обработки
  estimated_completion_sec?: number; //Ожидаемое время завершения в секундах
  created_at: DateTime; //Время создания запроса
}

export interface ProcessingStatus extends BaseResponse {
  status: 'processing';
  progress_percent?: number; // minimum: 0, maximum: 100, Процент выполнения
  processed_students?: number; // Количество обработанных учеников
  total_students?: number; // Общее количество учеников
  updated_at: DateTime;
}

//Интерфейс результата успешной обработки файлов
export interface CompletedResult extends BaseResponse {
  completed_at?: DateTime;
  processing_duration_sec?: number; //Время обработки в секундах
  results?: AssessmentDiff[];
}

export interface FailedResult extends BaseResponse {
  failed_at?: DateTime;
  error?: ProcessingError;
}

export interface AssessmentDiff {
  student_id?: string; //Идентификатор ученика
  period_start?: DateTime; //Начало периода оценки
  period_end?: DateTime; //Конец периода оценки
  overall_progress?: OverallProgress;
  activities_progress?: ActivityProgress[];
  blocks_progress?: BlockProgress[];
  diagram_diff?: DiagramDiff;
  dictionary_growth?: DictionaryGrowth;
  level_change?: LevelChange;
}

export interface OverallProgress {
  new_skills_acquired?: number; //Количество новых освоенных навыков
  skills_improved?: number; // Количество улучшенных навыков
  average_progress_delta?: number; //Средний прирост прогресса в процентах
  recommendations?: string[]; //Рекомендации по развитию
}

export interface ActivityProgress {
  activity_id?: string;
  title?: string;
  status_before?: string;
  status_after?: string;
  passed_before?: boolean;
  passed_after?: boolean;
  is_improved?: boolean;
  progress_delta?: number; //Изменение прогресса в процентах
}

export interface BlockProgress {
  block_id?: string;
  prot_progress?: MetricsProgressDelta;
  voice_progress?: MetricsProgressDelta;
  phrase_progress?: MetricsProgressDelta;
  became_available?: boolean;
}

export interface MetricsProgressDelta {
  formed_percent_delta?: number;
  support_percent_delta?: number;
  frequency_improved?: boolean;
  zone_changed?: boolean;
  zone_before?: string;
  zone_after?: string;
}

export interface DiagramDiff {
  predictive_delta?: number;
  protocommunication_delta?: number;
  voice_delta?: number;
  phrase_delta?: number;
}

export interface DictionaryGrowth {
  basic_words_added?: number;
  basic_words_removed?: number;
  total_words_growth?: number;
  new_active_words?: string[];
}

export interface LevelChange {
  level_before?: string;
  level_after?: string;
  has_improved?: boolean;
}

export interface ProcessingError {
  code?: ProcessingErrorCode;
  message?: string;
  details?: Record<string, unknown>; //Дополнительная информация об ошибке
}

export interface ErrorResponse {
  error?: string; // Код ошибки
  message?: string; //Человекочитаемое описание ошибки
  details?: Record<string, unknown>; //Дополнительная информация об ошибке
}
