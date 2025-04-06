// core types for the learning system

export interface Concept {
  id: string
  title: string
  content: string
  difficulty: number
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export interface UserExplanation {
  id: string
  userId: string
  conceptId: string
  explanation: string
  confidence: number  // 1-5 scale
  lastReviewed: Date
  nextReview: Date
  reviewCount: number
  interval: number  // in days
}

export interface LearningProgress {
  userId: string
  conceptId: string
  masteryLevel: number  // 0-100
  weakPoints: string[]
  lastActivity: Date
  totalTimeSpent: number  // in minutes
}

// spaced repetition algorithm parameters
export interface SRSettings {
  baseInterval: number  // initial review interval in days
  maxInterval: number   // maximum interval in days
  easeFactor: number    // multiplier for interval adjustment
  minInterval: number   // minimum interval in days
} 