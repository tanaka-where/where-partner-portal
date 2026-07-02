/** 出演動画（YouTube）。id は YouTube の動画ID。 */
export interface VideoItem {
  title: string;
  description: string;
  youtubeId: string;
}

export const featuredVideos: VideoItem[] = [
  {
    title: 'WHERE 出演動画',
    description:
      '衛星データ×AIで不動産仕入れを変えるWHEREの取り組みをご紹介します。',
    youtubeId: 'vMPhCGWi_fE',
  },
];
