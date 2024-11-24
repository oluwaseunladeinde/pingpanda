import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Metadata } from 'next';
import axios from "axios"
import { formatDistanceToNow } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseColor = (color: string) => {
  const hex = color.startsWith("#") ? color.slice(1) : color
  return parseInt(hex, 16)
}

export const formatDistanceToNowOrNull = (date: Date | null): string => {
  if (!date) {
    return 'Never'; // Or any other desired message
  }

  return formatDistanceToNow(date, { addSuffix: true });
}

export const formatTitle = (title: string): string => {
  // Split the title into words
  const words = title.split(' ');

  // Capitalize the first letter of each word
  const capitalizedWords = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  // Join the capitalized words back into a single string
  const formattedTitle = capitalizedWords.join(' ');

  return formattedTitle;
}

export function formatPrice(price: number | string,
  options: {
    currency?: 'USD' | 'EUR' | 'GBP' | 'BDT' | 'NGN' | 'CNY' | 'JPY'
    notation?: Intl.NumberFormatOptions['notation']
  } = {}
) {
  const { currency = 'USD', notation = 'compact' } = options;

  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}

export const formatNaira = (value: number) => {
  const nairaSymbol = "\u{020A6}";
  return nairaSymbol + new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value);
}

export const convertToNaira = (dollars: number): number => {
  const exchangeRate = 1_575
  const nairaEquivalent = (dollars * exchangeRate);
  return nairaEquivalent;
}

export const convertToNairaWithCurrency = (dollars: number): string => {
  const exchangeRate = 1_575
  const nairaEquivalent = formatNaira(dollars * exchangeRate);
  return nairaEquivalent;
}

export const convertDollarToNaira = async (dollars: number): Promise<number> => {
  try {
    const response = await axios.get('https://api.example.com/exchange-rate'); // Replace with your exchange rate API endpoint
    const exchangeRate = response.data.rate; // Assuming the API response has a 'rate' property

    const nairaEquivalent = dollars * exchangeRate;
    return nairaEquivalent;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    throw error; // Re-throw the error for proper error handling
  }
};


export function constructMetadata({
  title = 'DigitalHippo - the marketplace for digital assets',
  description = 'DigitalHippo is an open-source marketplace for high-quality digital goods.',
  image = '/thumbnail.png',
  icons = '/favicon.ico',
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@joshtriedcoding',
    },
    icons,
    metadataBase: new URL('https://digitalhippo.up.railway.app'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}