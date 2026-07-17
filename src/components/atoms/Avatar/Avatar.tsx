import { colors, fontFamilyDisplay, fontSize, fontWeight, radius } from '../../../tokens';

export type AvatarSize = 'sm' | 'md';
export type AvatarTone = 'user' | 'brand';

export interface AvatarProps {
  initials: string;
  size?: AvatarSize;
  tone?: AvatarTone;
}

const sizeStyles: Record<AvatarSize, { dimension: string; borderRadius: string; fontSize: string }> = {
  sm: { dimension: '32px', borderRadius: radius[9], fontSize: fontSize['12.5'] },
  md: { dimension: '38px', borderRadius: radius[11], fontSize: fontSize[17] },
};

const gradientByTone: Record<AvatarTone, string> = {
  user: `linear-gradient(155deg, ${colors.info.text}, ${colors.accent.default})`,
  brand: `linear-gradient(155deg, ${colors.accent.default}, ${colors.accent.strong})`,
};

export function Avatar({ initials, size = 'sm', tone = 'user' }: AvatarProps) {
  const sizeStyle = sizeStyles[size];

  return (
    <div
      style={{
        width: sizeStyle.dimension,
        height: sizeStyle.dimension,
        borderRadius: sizeStyle.borderRadius,
        background: gradientByTone[tone],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 'none',
        fontWeight: fontWeight.bold,
        fontSize: sizeStyle.fontSize,
        fontFamily: tone === 'brand' ? fontFamilyDisplay : undefined,
        color: colors.text.onAccent,
      }}
    >
      {initials}
    </div>
  );
}
