export interface DebuggerMessage {
  all_logs?: string;
}

export interface RuntimeLike {
  onMessage: {
    addListener(listener: (message: DebuggerMessage) => void): void;
  };
  sendMessage(message: string): Promise<unknown> | void;
}
