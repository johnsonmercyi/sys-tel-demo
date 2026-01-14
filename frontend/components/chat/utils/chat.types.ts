export type ChatMessage = {
  id: string
  role: "user" | "system"
  content: any
  timestamp: number
}