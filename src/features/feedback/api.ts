import { feedbackApi } from '../../lib/axios';
import type { FeedbackPayload, FeedbackResponse } from './types';

export async function sendFeedback(payload: FeedbackPayload): Promise<FeedbackResponse> {
  const response = await feedbackApi.post<FeedbackResponse>('/posts', payload);
  return response.data;
}
