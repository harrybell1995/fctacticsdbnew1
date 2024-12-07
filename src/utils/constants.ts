// Share code configuration
export const SHARE_CODE_LENGTH = 11;

export const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789?@abcdefghijklmnopqrstuvwxyz+/';
export const offsets = [7, 2, 31, 5, 29, 11, 23, 13, 17, 3, 19];

export const shareCodeTable = {
  formationIDBitLength: BigInt(10),
  formationIDMask: 1023,
  buildUpStyleBitLength: BigInt(2),
  buildUpStyleMask: 3,
  defensiveApproachTypeBitLength: BigInt(2),
  defensiveApproachTypeMask: 3,
  roleTypeBitLength: BigInt(4),
  roleTypeMask: 15,
  charCodeBitLength: BigInt(6),
  charCodeMask: 63,
  verificationCodeBitLength: BigInt(8),
  verificationCodeMask: 255,
  rawCodeBitSize: BigInt(63),
  verificationCodeCharLength: 2,
};

// Player position groups
export const PlayerPositionGroup = {
  GK: 0,
  FB: 1,
  CB: 2,
  DM: 3,
  CM: 4,
  WM: 5,
  AM: 6,
  WG: 7,
  ST: 8
} as const;

export const TACTIC_TAGS = {
  HIGH_PRESS: 'High Press',
  LOW_BLOCK: 'Low Block',
  COUNTER_PRESS: 'Counter Press',
  WIDE_PLAY: 'Wide Play',
  NARROW_PLAY: 'Narrow Play',
  DIRECT_PLAY: 'Direct Play',
  BUILD_FROM_BACK: 'Build from the Back',
  FAST_TRANSITIONS: 'Fast Transitions',
  POSSESSION_BASED: 'Possession-Based',
  COUNTER_ATTACK: 'Counter Attack',
  LONG_BALL: 'Long Ball',
  HIGH_LINE: 'High Line',
  DEFENSIVE_BLOCK: 'Defensive Block',
  OVERLAPPING_FULLBACKS: 'Overlapping Fullbacks',
  INVERTED_WINGERS: 'Inverted Wingers',
  FALSE_NINE: 'False Nine',
  BALL_RECOVERY: 'Ball Recovery',
  QUICK_PASSING: 'Quick Passing',
  SHORT_PASSING: 'Short Passing',
  FLUID_MOVEMENT: 'Fluid Movement',
  WING_PLAY: 'Wing Play',
  VERTICALITY: 'Verticality',
  MAN_MARKING: 'Man Marking',
  ZONAL_MARKING: 'Zonal Marking',
  PRESSING_TRAP: 'Pressing Trap',
  OFFSIDE_TRAP: 'Offside Trap',
  TIKI_TAKA: 'Tiki-Taka',
  COMPACT_DEFENSE: 'Compact Defense',
  SET_PIECES_FOCUS: 'Set Pieces Focus',
  ATTACKING_WIDTH: 'Attacking Width'
} as const;


// Player roles by position
export const ROLES = {
  gk: [
    { id: '0', name: 'Goalkeeper - Defend' },
    { id: '1', name: 'Goalkeeper - Balanced' },
    { id: '2', name: 'Sweeper Keeper - Balanced' },
    { id: '3', name: 'Sweeper Keeper - Build Up' }
  ],
  def: [
    { id: '12', name: 'Defender - Defend' },
    { id: '13', name: 'Defender - Balanced' },
    { id: '14', name: 'Stopper - Balanced' },
    { id: '15', name: 'Stopper - Aggressive' },
    { id: '16', name: 'Ball Playing Defender - Defend' },
    { id: '17', name: 'Ball Playing Defender - Build Up' },
    { id: '18', name: 'Ball Playing Defender - Aggressive' }
  ],
  fb: [
    { id: '4', name: 'Fullback - Defend' },
    { id: '5', name: 'Fullback - Balanced' },
    { id: '6', name: 'Wingback - Balanced' },
    { id: '7', name: 'Wingback - Support' },
    { id: '8', name: 'Falseback - Defend' },
    { id: '9', name: 'Falseback - Balanced' },
    { id: '10', name: 'Offensive Wingback - Balanced' },
    { id: '11', name: 'Offensive Wingback - Attack' }
  ],
  dm: [
    { id: '45', name: 'Centre Half - Defend' },
    { id: '46', name: 'Holding - Defend' },
    { id: '47', name: 'Holding - Ball Winning' },
    { id: '48', name: 'Holding - Roaming' },
    { id: '49', name: 'Deep Lying Playmaker - Build Up' },
    { id: '50', name: 'Deep Lying Playmaker - Defend' },
    { id: '51', name: 'Deep Lying Playmaker - Roaming' },
    { id: '52', name: 'Wide Half - Defend' },
    { id: '53', name: 'Wide Half - Build Up' }
  ],
  mid: [
    { id: '19', name: 'Box to Box - Balanced' },
    { id: '20', name: 'Holding - Defend' },
    { id: '21', name: 'Holding - Ball Winning' },
    { id: '22', name: 'Deep Lying Playmaker - Build Up' },
    { id: '23', name: 'Deep Lying Playmaker - Defend' },
    { id: '24', name: 'Playmaker - Attack' },
    { id: '25', name: 'Playmaker - Roaming' },
    { id: '26', name: 'Half Winger - Attack' },
    { id: '27', name: 'Half Winger - Balanced' }
  ],
  am: [
    { id: '54', name: 'Playmaker - Build Up' },
    { id: '55', name: 'Playmaker - Balanced' },
    { id: '56', name: 'Playmaker - Roaming' },
    { id: '57', name: 'Shadow Striker - Attack' },
    { id: '58', name: 'Half Winger - Attack' },
    { id: '59', name: 'Half Winger - Balanced' },
    { id: '60', name: 'Classic 10 - Attack' },
    { id: '61', name: 'Classic 10 - Wide' }
  ],
  wm: [
    { id: '28', name: 'Winger - Balanced' },
    { id: '29', name: 'Winger - Attack' },
    { id: '30', name: 'Wide Playmaker - Build Up' },
    { id: '31', name: 'Wide Playmaker - Attack' },
    { id: '32', name: 'Wide Midfielder - Balanced' },
    { id: '33', name: 'Wide Midfielder - Defend' },
    { id: '34', name: 'Inside Forward - Balanced' },
    { id: '35', name: 'Inside Forward - Attack' }
  ],
  wing: [
    { id: '69', name: 'Inside Forward - Attack' },
    { id: '68', name: 'Inside Forward - Balanced' },
    { id: '67', name: 'Inside Forward - Roaming' },
    { id: '62', name: 'Winger - Balanced' },
    { id: '63', name: 'Winger - Attack' },
    { id: '64', name: 'Wide Playmaker - Build Up' },
    { id: '65', name: 'Wide Playmaker - Attack' }
  ],
  st: [
    { id: '36', name: 'Target Forward - Attack' },
    { id: '37', name: 'Target Forward - Balanced' },
    { id: '38', name: 'Target Forward - Wide' },
    { id: '39', name: 'False 9 - Build Up' },
    { id: '40', name: 'Poacher - Attack' },
    { id: '41', name: 'Poacher - Support' },
    { id: '42', name: 'Advance Forward - Attack' },
    { id: '43', name: 'Advance Forward - Support' },
    { id: '44', name: 'Advance Forward - Complete' }
  ]
} as const;

// Formation positions
export const FormationPositions = {
16: [ // 4-4-2
    PlayerPositionGroup.GK,
    PlayerPositionGroup.FB, PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.FB,
    PlayerPositionGroup.WM, PlayerPositionGroup.CM, PlayerPositionGroup.CM, PlayerPositionGroup.WM,
    PlayerPositionGroup.ST, PlayerPositionGroup.ST
  ],
  2: [ // 4-1-4-1
    PlayerPositionGroup.GK,
    PlayerPositionGroup.FB, PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.FB,
    PlayerPositionGroup.DM,
    PlayerPositionGroup.WM, PlayerPositionGroup.CM, PlayerPositionGroup.CM, PlayerPositionGroup.WM,
    PlayerPositionGroup.ST
  ],
  36: [ // 4-2-1-3
    PlayerPositionGroup.GK,
    PlayerPositionGroup.FB, PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.FB,
    PlayerPositionGroup.DM, PlayerPositionGroup.DM,
    PlayerPositionGroup.AM,
    PlayerPositionGroup.WG, PlayerPositionGroup.ST, PlayerPositionGroup.WG
  ],
  24: [ // 3-4-2-1
    PlayerPositionGroup.GK,
    PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.CB,
    PlayerPositionGroup.WM, PlayerPositionGroup.CM, PlayerPositionGroup.CM, PlayerPositionGroup.WM,
    PlayerPositionGroup.AM, PlayerPositionGroup.AM,
    PlayerPositionGroup.ST
  ],
  23: [ // 3-4-1-2
    PlayerPositionGroup.GK,
    PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.CB,
    PlayerPositionGroup.WM, PlayerPositionGroup.CM, PlayerPositionGroup.CM, PlayerPositionGroup.WM,
    PlayerPositionGroup.AM,
    PlayerPositionGroup.ST, PlayerPositionGroup.ST
  ],
  22: [ // 3-1-4-2
    PlayerPositionGroup.GK,
    PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.CB,
    PlayerPositionGroup.DM,
    PlayerPositionGroup.WM, PlayerPositionGroup.CM, PlayerPositionGroup.CM, PlayerPositionGroup.WM,
    PlayerPositionGroup.ST, PlayerPositionGroup.ST
  ],
  27: [ // 3-5-2
    PlayerPositionGroup.GK,
    PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.CB,
    PlayerPositionGroup.WM, PlayerPositionGroup.DM, PlayerPositionGroup.DM, PlayerPositionGroup.WM,
    PlayerPositionGroup.AM,
    PlayerPositionGroup.ST, PlayerPositionGroup.ST
  ],
  25: [ // 3-4-3
    PlayerPositionGroup.GK,
    PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.CB,
    PlayerPositionGroup.WM, PlayerPositionGroup.CM, PlayerPositionGroup.CM, PlayerPositionGroup.WM,
    PlayerPositionGroup.WG, PlayerPositionGroup.ST, PlayerPositionGroup.WG
  ],
  33: [ // 5-4-1
    PlayerPositionGroup.GK,
    PlayerPositionGroup.FB, PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.FB,
    PlayerPositionGroup.WM, PlayerPositionGroup.CM, PlayerPositionGroup.CM, PlayerPositionGroup.WM,
    PlayerPositionGroup.ST
  ],
  31: [ // 5-3-2
    PlayerPositionGroup.GK,
    PlayerPositionGroup.FB, PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.FB,
    PlayerPositionGroup.CM, PlayerPositionGroup.CM, PlayerPositionGroup.CM,
    PlayerPositionGroup.ST, PlayerPositionGroup.ST
  ],
  30: [ // 5-2-3
    PlayerPositionGroup.GK,
    PlayerPositionGroup.FB, PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.FB,
    PlayerPositionGroup.CM, PlayerPositionGroup.CM,
    PlayerPositionGroup.WG, PlayerPositionGroup.ST, PlayerPositionGroup.WG
  ],
  29: [ // 5-2-1-2
    PlayerPositionGroup.GK,
    PlayerPositionGroup.FB, PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.FB,
    PlayerPositionGroup.CM, PlayerPositionGroup.CM,
    PlayerPositionGroup.AM,
    PlayerPositionGroup.ST, PlayerPositionGroup.ST
  ],
  20: [ // 4-5-1 (2)
    PlayerPositionGroup.GK,
    PlayerPositionGroup.FB, PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.FB,
    PlayerPositionGroup.WM, PlayerPositionGroup.CM, PlayerPositionGroup.CM, PlayerPositionGroup.CM, PlayerPositionGroup.WM,
    PlayerPositionGroup.ST
  ],
  21: [ // 4-5-1
    PlayerPositionGroup.GK,
    PlayerPositionGroup.FB, PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.FB,
    PlayerPositionGroup.WM, PlayerPositionGroup.CM, PlayerPositionGroup.WM,
    PlayerPositionGroup.AM, PlayerPositionGroup.AM,
    PlayerPositionGroup.ST
  ],
  17: [ // 4-4-2 (2)
    PlayerPositionGroup.GK,
    PlayerPositionGroup.FB, PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.FB,
    PlayerPositionGroup.DM, PlayerPositionGroup.DM,
    PlayerPositionGroup.WM, PlayerPositionGroup.WM,
    PlayerPositionGroup.ST, PlayerPositionGroup.ST
  ],
  18: [ // 4-4-1-1
    PlayerPositionGroup.GK,
    PlayerPositionGroup.FB, PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.FB,
    PlayerPositionGroup.WM, PlayerPositionGroup.CM, PlayerPositionGroup.CM, PlayerPositionGroup.WM,
    PlayerPositionGroup.AM,
    PlayerPositionGroup.ST
  ],
  11: [ // 4-3-3 (4)
    PlayerPositionGroup.GK,
    PlayerPositionGroup.FB, PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.FB,
    PlayerPositionGroup.CM, PlayerPositionGroup.CM, PlayerPositionGroup.AM,
    PlayerPositionGroup.WG, PlayerPositionGroup.ST, PlayerPositionGroup.WG
  ],
  10: [ // 4-3-3 (3)
    PlayerPositionGroup.GK,
    PlayerPositionGroup.FB, PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.FB,
    PlayerPositionGroup.DM, PlayerPositionGroup.DM, PlayerPositionGroup.CM,
    PlayerPositionGroup.WG, PlayerPositionGroup.ST, PlayerPositionGroup.WG
  ],
  9: [ // 4-3-3 (2)
    PlayerPositionGroup.GK,
    PlayerPositionGroup.FB, PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.FB,
    PlayerPositionGroup.DM, PlayerPositionGroup.CM, PlayerPositionGroup.CM,
    PlayerPositionGroup.WG, PlayerPositionGroup.ST, PlayerPositionGroup.WG
  ],
  8: [ // 4-3-3
    PlayerPositionGroup.GK,
    PlayerPositionGroup.FB, PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.FB,
    PlayerPositionGroup.CM, PlayerPositionGroup.CM, PlayerPositionGroup.CM,
    PlayerPositionGroup.WG, PlayerPositionGroup.ST, PlayerPositionGroup.WG
  ],
  7: [ // 4-3-2-1
    PlayerPositionGroup.GK,
    PlayerPositionGroup.FB, PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.FB,
    PlayerPositionGroup.CM, PlayerPositionGroup.CM, PlayerPositionGroup.CM,
    PlayerPositionGroup.AM, PlayerPositionGroup.AM,
    PlayerPositionGroup.ST
  ],
  6: [ // 4-3-1-2
    PlayerPositionGroup.GK,
    PlayerPositionGroup.FB, PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.FB,
    PlayerPositionGroup.CM, PlayerPositionGroup.CM, PlayerPositionGroup.CM,
    PlayerPositionGroup.AM,
    PlayerPositionGroup.ST, PlayerPositionGroup.ST
  ],
  5: [ // 4-2-4
    PlayerPositionGroup.GK,
    PlayerPositionGroup.FB, PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.FB,
    PlayerPositionGroup.CM, PlayerPositionGroup.CM,
    PlayerPositionGroup.WG, PlayerPositionGroup.ST, PlayerPositionGroup.ST, PlayerPositionGroup.WG
  ],
  4: [ // 4-2-3-1 (2)
    PlayerPositionGroup.GK,
    PlayerPositionGroup.FB, PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.FB,
    PlayerPositionGroup.DM, PlayerPositionGroup.DM,
    PlayerPositionGroup.WM, PlayerPositionGroup.AM, PlayerPositionGroup.WM,
    PlayerPositionGroup.ST
  ],
  3: [ // 4-2-3-1
    PlayerPositionGroup.GK,
    PlayerPositionGroup.FB, PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.FB,
    PlayerPositionGroup.DM, PlayerPositionGroup.DM,
    PlayerPositionGroup.AM, PlayerPositionGroup.AM, PlayerPositionGroup.AM,
    PlayerPositionGroup.ST
  ],
  13: [ // 4-2-2-2
    PlayerPositionGroup.GK,
    PlayerPositionGroup.FB, PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.FB,
    PlayerPositionGroup.DM, PlayerPositionGroup.DM,
    PlayerPositionGroup.AM, PlayerPositionGroup.AM,
    PlayerPositionGroup.ST, PlayerPositionGroup.ST
  ],
  15: [ // 4-1-2-1-2 (2)
    PlayerPositionGroup.GK,
    PlayerPositionGroup.FB, PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.FB,
    PlayerPositionGroup.DM,
    PlayerPositionGroup.CM, PlayerPositionGroup.CM,
    PlayerPositionGroup.AM,
    PlayerPositionGroup.ST, PlayerPositionGroup.ST
  ],
  14: [ // 4-1-2-1-2
    PlayerPositionGroup.GK,
    PlayerPositionGroup.FB, PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.FB,
    PlayerPositionGroup.DM,
    PlayerPositionGroup.WM, PlayerPositionGroup.WM,
    PlayerPositionGroup.AM,
    PlayerPositionGroup.ST, PlayerPositionGroup.ST
  ],
  1: [ // 4-1-3-2
    PlayerPositionGroup.GK,
    PlayerPositionGroup.FB, PlayerPositionGroup.CB, PlayerPositionGroup.CB, PlayerPositionGroup.FB,
    PlayerPositionGroup.DM,
    PlayerPositionGroup.WM, PlayerPositionGroup.CM, PlayerPositionGroup.WM,
    PlayerPositionGroup.ST, PlayerPositionGroup.ST
  ] 
} as const;