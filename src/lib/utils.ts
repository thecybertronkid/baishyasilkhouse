import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency: string = "INR"): string {
  if (currency === "USD") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(Math.round(amount / 83));
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateEstimatedDelivery(pincode: string): {
  deliverable: boolean;
  dateString: string;
  expressAvailable: boolean;
} {
  if (!pincode || pincode.length !== 6) {
    return {
      deliverable: false,
      dateString: "Enter 6-digit PIN code",
      expressAvailable: false,
    };
  }

  const today = new Date();
  const minDays = pincode.startsWith("781") ? 2 : 4; // Assam local gets 2-day delivery
  const maxDays = minDays + 3;

  const minDate = new Date(today);
  minDate.setDate(today.getDate() + minDays);

  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + maxDays);

  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const dateString = `${minDate.toLocaleDateString("en-IN", options)} - ${maxDate.toLocaleDateString("en-IN", options)}`;

  return {
    deliverable: true,
    dateString,
    expressAvailable: true,
  };
}
