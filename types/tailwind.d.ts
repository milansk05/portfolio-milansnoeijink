// types/tailwind.d.ts
declare module 'tailwindcss' {
  interface TailwindConfig {
    theme?: {
      [key: string]: unknown;
    };
  }
}
