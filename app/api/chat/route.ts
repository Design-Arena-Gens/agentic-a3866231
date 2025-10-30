import { NextRequest, NextResponse } from 'next/server'

const AGENT_KNOWLEDGE = {
  company: "Zaph & Zoe Agro Export Company",
  shortName: "ZZ Exports",
  products: [
    {
      name: "Dried Hibiscus Flower",
      description: "Premium quality dried hibiscus sourced from African farmers",
      uses: ["Teas", "Beverages", "Food applications", "Natural food coloring"],
      minimumOrder: "500kg"
    },
    {
      name: "Blackstone Flower",
      description: "High-quality blackstone flower for culinary use",
      uses: ["Spice blends", "Culinary applications"],
      minimumOrder: "500kg"
    }
  ],
  services: [
    "International shipping",
    "Export documentation",
    "Phytosanitary certificates",
    "Certificates of origin",
    "Quality assurance",
    "Direct from farmers"
  ],
  leadTime: "2-3 weeks from order confirmation",
  website: "https://zzexports.com"
}

export async function POST(req: NextRequest) {
  try {
    const { message, conversationHistory } = await req.json()

    // Simple rule-based agent response
    const response = generateResponse(message, conversationHistory)

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

function generateResponse(message: string, history: any[] = []): string {
  const lowerMessage = message.toLowerCase()

  // Greeting
  if (history.length === 0) {
    return `Good day! Thank you for calling ${AGENT_KNOWLEDGE.company}. My name is Zara, your virtual assistant. How may I help you today?`
  }

  // Product inquiries
  if (lowerMessage.includes('hibiscus') || lowerMessage.includes('product')) {
    return `Excellent! We specialize in premium quality dried hibiscus flowers. Our hibiscus is sourced directly from African farmers and is perfect for teas, beverages, and food applications. We also offer blackstone flower. Would you like to know about our pricing, minimum order quantities, or shipping options?`
  }

  // Pricing inquiries
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('quote')) {
    return `We offer competitive pricing based on order volume. Our minimum order quantity is 500kg, and we provide worldwide shipping with full export documentation. For a detailed quotation, I can connect you with our sales team. Would that work for you?`
  }

  // Shipping inquiries
  if (lowerMessage.includes('ship') || lowerMessage.includes('delivery') || lowerMessage.includes('export')) {
    return `We handle worldwide shipping with complete export documentation including phytosanitary certificates and certificates of origin. Our typical lead time is 2-3 weeks from order confirmation. Where would you like the products shipped to?`
  }

  // Minimum order quantity
  if (lowerMessage.includes('minimum') || lowerMessage.includes('moq') || lowerMessage.includes('quantity')) {
    return `Our minimum order quantity is 500kg for both dried hibiscus flower and blackstone flower. This ensures we can maintain our competitive pricing while covering international shipping costs. Would you like to proceed with a quote?`
  }

  // Contact/callback request
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('call back')) {
    return `I'd be happy to have our sales team reach out to you. Could you please provide your email address and company name? They'll send you detailed product specifications and pricing within one business day.`
  }

  // Quality inquiries
  if (lowerMessage.includes('quality') || lowerMessage.includes('certificate') || lowerMessage.includes('organic')) {
    return `We pride ourselves on quality! Our products are sourced directly from trusted African farmers, and we provide all necessary quality certifications including phytosanitary certificates. We ensure rigorous quality control at every stage. Would you like more details about our quality assurance process?`
  }

  // Blackstone flower
  if (lowerMessage.includes('blackstone') || lowerMessage.includes('black stone')) {
    return `Yes, we also export blackstone flower! It's excellent for spice blends and culinary applications. Like our hibiscus, it comes with full export documentation and the minimum order is 500kg. Are you interested in receiving samples or a quotation?`
  }

  // Default helpful response
  return `I'd be happy to help you with that. To better assist you, I can provide information about our dried hibiscus flowers, blackstone flowers, pricing, shipping, or connect you with our sales team for detailed quotations. What would be most helpful for you?`
}
