import Result from '../models/Result.js'
import { toClient } from './toClient.js'

export async function listResults() {
  const results = await Result.find().sort({ createdAt: -1 })
  return results.map(toClient)
}