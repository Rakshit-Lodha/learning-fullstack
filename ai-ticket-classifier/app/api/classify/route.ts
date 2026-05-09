import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: Request) {
  const body = await request.json()
  const tickets = body as string[][]
  
  const dataRows = tickets.slice(1).filter(row => row[0] !== '')
  console.log('dataRows:', dataRows)
  
  const results = []
  
  for (const row of dataRows) {
    const [id, subject, description, priority] = row
    
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a support ticket classifier for a mutual fund investment app. 
          Classify tickets into these categories: Authentication, Payment, Technical, KYC, Portfolio, Account.
          Respond with JSON only: {"category": "...", "subcategory": "...", "confidence": 0.0-1.0, "reasoning": "..."}`
        },
        {
          role: 'user',
          content: `Subject: ${subject}\nDescription: ${description}\nPriority: ${priority}`
        }
      ],
      response_format: { type: 'json_object' }
    })
    
    const classification = JSON.parse(response.choices[0].message.content || '{}')
    results.push({ ticket_id: id, subject, ...classification })
  }
  
  return NextResponse.json({ results })
}