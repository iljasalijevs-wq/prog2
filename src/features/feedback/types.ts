export interface FeedbackPayload {
  name: string;
  email: string;
  message: string;
}

export interface FeedbackResponse extends FeedbackPayload {
  id: number;
}
