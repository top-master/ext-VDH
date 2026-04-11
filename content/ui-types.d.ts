export type EmptyProps = Record<string, never>;

export type VoidHandler = () => void;

export interface ManifestLike {
  version?: string;
  version_name?: string;
}

export interface MissingTranslationTags extends Array<unknown> {}

export interface LogEntryResponse {
  details: string | null;
  message: string | null;
}

export interface HitLike {
  id?: number | string;
  localFilePath?: string;
  title?: string;
  [key: string]: unknown;
}

export interface AboutPageState {}

export interface LogDetailsEmbedState {
  details: string | null;
  message: string | null;
}

export interface ExplainQrPageState {
  hit: HitLike;
}

export interface CheckboxChangeEvent {
  target: {
    checked: boolean;
  };
}

export interface TextChangeEvent {
  target: {
    value: string;
  };
}

export interface KeyboardEventLike {
  key: string;
}

export interface BlacklistEmbedProps {
  closeWindow?: VoidHandler;
}

export interface BlacklistEmbedState {
  domains: Record<string, boolean>;
}

export type DetailsAction =
  | {
      payload: string;
      type: "setError";
    }
  | {
      payload: HitLike;
      type: "setHit";
    };

export interface DetailsStoreState {
  error?: string;
  hit: HitLike | null;
}

export interface DetailsValueRowProps {
  name: string;
  value: unknown;
}

export interface HitDetailsProps {
  error?: string;
  hit: HitLike | null;
}

export interface AlertDialogButtonConfig {
  className?: string;
  close?: boolean;
  rpcArgs?: unknown[];
  rpcMethod?: string | null;
  text: string;
  trigger?: Record<string, unknown> | null;
}

export interface AlertDialogData {
  autoResize?: boolean;
  bodyClass?: string;
  buttons?: AlertDialogButtonConfig[];
  centered?: boolean;
  notAgain?: string | null;
  text?: string | string[] | null;
  title?: string;
}

export interface AlertDialogState {
  notAgain: boolean;
}

export type AlertStoreAction = {
  payload: AlertDialogData;
  type: "SET_WEH_DATA";
};

export interface AlertStoreState {
  wehData?: AlertDialogData;
}

export interface BlacklistAction {
  payload: string[];
  type: "SET_BLACKLIST_DATA";
}

export interface BlacklistEditorProps {
  domains: string[];
}

export interface BlacklistEditorState {
  inputDomain: string | null;
}

export interface PreferenceSnapshot {
  dlconvLastOutput?: string | null;
  downloadCount?: number;
  reducer: unknown;
  on?(
    eventName: string,
    listener: (previousValue: unknown, nextValue: number) => void,
  ): void;
}

export interface OutputConfig {
  title: string;
  [key: string]: unknown;
}

export type OutputConfigMap = Record<string, OutputConfig>;

export interface DownloadConvertEmbedProps {
  closeWindow?: VoidHandler;
  prefs: {
    dlconvLastOutput?: string | null;
  };
  showSaveAs: boolean;
}

export interface DownloadConvertEmbedState {
  hit: HitLike | null;
  outputConfig: string;
  outputConfigs: OutputConfigMap;
}

export interface BuildOptions {
  browser?: "chrome" | "edge" | "firefox" | string;
  linuxlic?: boolean;
  noyt?: boolean;
  target?: string;
}

export interface BuildInfo {
  buildDate?: string;
  buildOptions?: BuildOptions;
  channel?: string;
  prod?: boolean;
}

export interface FundingPageState {
  downloadCount: number | null;
  missingLocales: number;
}
