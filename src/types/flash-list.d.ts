import '@shopify/flash-list';

declare module '@shopify/flash-list' {
  export interface FlashListProps<TItem> {
    estimatedItemSize?: number;
  }
}
