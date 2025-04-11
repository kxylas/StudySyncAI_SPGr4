// Client-side utilities for OpenAI related functionality

/**
 * Formats a chat history for OpenAI API requests
 */
export function formatChatHistory(messages: Array<{ role: string, content: string }>): Array<{ role: string, content: string }> {
  // Filter out any invalid roles and ensure only 'user' and 'assistant' roles are used
  return messages.filter(msg => ['user', 'assistant'].includes(msg.role));
}

/**
 * Extracts key information from a full response
 */
export function extractKeyInfo(text: string): string {
  // This could be enhanced with more sophisticated parsing
  return text.trim();
}
