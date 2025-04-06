import { UserExplanation, SRSettings } from '../types'

// default settings for the spaced repetition system
const defaultSettings: SRSettings = {
  baseInterval: 1,    // start with 1 day
  maxInterval: 365,   // max 1 year
  easeFactor: 2.5,    // standard ease factor
  minInterval: 0.5    // minimum 12 hours
}

// calculate next review interval based on performance
export const calculateNextInterval = (
  currentInterval: number,
  confidence: number,
  settings: SRSettings = defaultSettings
): number => {
  // adjust interval based on confidence (1-5 scale)
  const performanceFactor = (confidence - 3) / 2  // converts to -1 to 1 range
  
  // calculate new interval
  let newInterval = currentInterval * (1 + performanceFactor * settings.easeFactor)
  
  // ensure interval stays within bounds
  newInterval = Math.max(settings.minInterval, Math.min(settings.maxInterval, newInterval))
  
  return Math.round(newInterval * 10) / 10  // round to 1 decimal place
}

// determine if a concept needs review
export const needsReview = (explanation: UserExplanation): boolean => {
  const now = new Date()
  return now >= new Date(explanation.nextReview)
}

// calculate review priority (higher number = higher priority)
export const calculatePriority = (explanation: UserExplanation): number => {
  const now = new Date()
  const daysOverdue = (now.getTime() - new Date(explanation.nextReview).getTime()) / (1000 * 60 * 60 * 24)
  
  // prioritize based on:
  // 1. how overdue the review is
  // 2. how many times it's been reviewed
  // 3. current confidence level
  return (daysOverdue * 10) + (explanation.reviewCount * 0.5) + (5 - explanation.confidence)
} 