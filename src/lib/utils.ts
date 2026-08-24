import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format numerical prices into INR notation (e.g. ₹2.45 Cr, ₹75 Lakhs, ₹50,000)
 */
export function formatPrice(amount: number): string {
  if (!amount || isNaN(amount)) return 'Price on Request';

  if (amount >= 10000000) {
    const cr = (amount / 10000000).toFixed(2).replace(/\.00$/, '');
    return `₹${cr} Cr`;
  } else if (amount >= 100000) {
    const lakh = (amount / 100000).toFixed(2).replace(/\.00$/, '');
    return `₹${lakh} Lakhs`;
  } else {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  }
}

/**
 * Format Indian numbers with commas (e.g. 2,150 sq.ft.)
 */
export function formatIndianNumber(num: number): string {
  if (!num) return '0';
  return new Intl.NumberFormat('en-IN').format(num);
}

/**
 * Generate context-aware WhatsApp direct links with pre-filled message
 */
export function createWhatsAppUrl(options: {
  phone?: string;
  propertyName?: string;
  propertyTitle?: string;
  propertyLocation?: string;
  propertyUrl?: string;
  customMessage?: string;
  referenceId?: string;
}): string {
  const defaultPhone = '918439654385'; // L2H Official Advisory Desk
  const phone = (options.phone || defaultPhone).replace(/[^0-9]/g, '');

  let message = '';
  const title = options.propertyName || options.propertyTitle;

  if (options.customMessage) {
    message = options.customMessage;
  } else if (title) {
    message = `Hi L2H Solution, I am interested in "${title}"${options.propertyLocation ? ` in ${options.propertyLocation}` : ''}.${
      options.propertyUrl ? ` (URL: ${options.propertyUrl})` : ''
    } Please share detailed pricing, floor plans and available inventory.`;
  } else if (options.referenceId) {
    message = `Hi L2H Solution, I submitted property requirement inquiry ${options.referenceId}. Please connect with an advisor.`;
  } else {
    message = `Hi L2H Solution, I would like to schedule a real estate advisory consultation.`;
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Calculate standard Reducing Balance Loan EMI
 */
export function calculateEmi(principal: number, annualRatePercent: number, tenureYears: number) {
  if (!principal || !annualRatePercent || !tenureYears) {
    return { emi: 0, totalInterest: 0, totalPayment: 0 };
  }

  const monthlyRate = annualRatePercent / 12 / 100;
  const totalMonths = tenureYears * 12;

  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - principal;

  return {
    emi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment)
  };
}

export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}
