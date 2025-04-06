import React, { useState } from 'react'
import { Concept, UserExplanation } from '../types'

interface Props {
  concept: Concept
  userExplanation?: UserExplanation
  onConfidenceSubmit: (confidence: number, explanation: string) => void
}

export const ConceptReview: React.FC<Props> = ({
  concept,
  userExplanation,
  onConfidenceSubmit
}) => {
  const [explanation, setExplanation] = useState(userExplanation?.explanation || '')
  const [confidence, setConfidence] = useState<number>(3)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onConfidenceSubmit(confidence, explanation)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{concept.title}</h2>
      
      <div className="mb-6">
        <p className="text-gray-700">{concept.content}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            explain this concept in your own words
          </label>
          <textarea
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            className="w-full p-2 border rounded-md"
            rows={4}
            placeholder="try to explain it as simply as possible..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            how confident are you? (1-5)
          </label>
          <div className="flex space-x-4">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setConfidence(value)}
                className={`px-4 py-2 rounded-md ${
                  confidence === value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          submit review
        </button>
      </form>
    </div>
  )
} 