declare module 'class-variance-authority' {
  export type VariantProps<T> = {
    [K in keyof T["variants"]]?: keyof T["variants"][K]
  }
} 