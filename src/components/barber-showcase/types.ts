export interface MetricItem {
  label: string;
  grade: string;
}

export interface OverallRatingData {
  title: string;
  ratingGrade: string;
  metrics: MetricItem[];
}

export interface HairstyleData {
  title: string;
  rank: string;
  styleName: string;
  imageUrl: string;
}

export interface ValueScoreData {
  title: string;
  score: string;
  maxScore: string;
}

export interface StatItem {
  label: string;
  value: string;
}

export interface QuarterStatsData {
  title: string;
  score: string;
  scoreLabel: string;
  stats: StatItem[];
}

export interface BarberFeatureShowcaseData {
  overallRating?: Partial<OverallRatingData>;
  centerHairstyle?: Partial<HairstyleData>;
  leftGuessHairstyle?: Partial<HairstyleData>;
  valueScore?: Partial<ValueScoreData>;
  quarterData?: Partial<QuarterStatsData>;
}

export interface BarberFeatureShowcaseProps {
  className?: string;
  data?: BarberFeatureShowcaseData;
  activeCardIndex?: number;
  onCardSelect?: (index: number) => void;
  isMobile?: boolean;
  leftMaskOffset?: number;
}
