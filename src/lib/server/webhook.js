import { WEBHOOK_JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';
import { checkRateLimit, getRateLimitInfo } from './rateLimiter.js';

/**
 * Send data to N8n webhook with JWT authentication
 * @param {Object} data - The data to send to the webhook
 * @param {string} clientIp - Client IP address for rate limiting
 * @param {string} webhookUrl - The webhook URL to send data to
 * @returns {Promise<Object>} - { success: boolean, error?: string, data?: any }
 */
export async function sendToWebhook(data, clientIp, webhookUrl) {
  // Check rate limit
  if (!checkRateLimit(clientIp)) {
    const info = getRateLimitInfo(clientIp);
    return {
      success: false,
      error: `Rate limit exceeded. Please try again in ${Math.ceil((info.resetTime - Date.now()) / 1000)} seconds.`,
      rateLimitInfo: info
    };
  }
  
  try {
    // Create JWT token for authentication
    const token = jwt.sign(
      {
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60, // Token expires in 1 minute
        data: {
          source: 'j2it-website',
          timestamp: new Date().toISOString()
        }
      },
      WEBHOOK_JWT_SECRET
    );
    
    // Prepare the webhook payload
    const payload = {
      ...data,
      metadata: {
        source: 'j2it-website',
        timestamp: new Date().toISOString(),
        clientIp: clientIp
      }
    };
    
    // Send to N8n webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      throw new Error(`Webhook responded with status ${response.status}`);
    }
    
    const result = await response.json().catch(() => ({ success: true }));
    
    return {
      success: true,
      data: result
    };
  } catch (error) {
    console.error('Webhook error:', error);
    return {
      success: false,
      error: 'Failed to process your request. Please try again later.'
    };
  }
}

/**
 * Verify JWT token from incoming webhook requests
 * @param {string} token - JWT token to verify
 * @returns {Object|null} - Decoded token payload or null if invalid
 */
export function verifyWebhookToken(token) {
  try {
    return jwt.verify(token, WEBHOOK_JWT_SECRET);
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}