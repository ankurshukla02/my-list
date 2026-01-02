export const CONTENT_TYPE = {
  MOVIE: 1,
  TV_SHOW: 2,
} as const;

export type ContentType = typeof CONTENT_TYPE[keyof typeof CONTENT_TYPE];
