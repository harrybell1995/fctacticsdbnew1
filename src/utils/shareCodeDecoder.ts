import { SHARE_CODE_LENGTH, shareCodeTable, offsets, FormationPositions, PlayerPositionGroup, ROLES } from './constants';

function getNumberFromCode(t: string, e: number, i: number): number {
  let r = 0;
  if (t === '&') t = '0';
  else if (t === '%') t = 'O';
  else if (t === '#') t = 'I';
  else if (t === '$') t = 'l';

  const o = t.charCodeAt(0);
  const n = '0'.charCodeAt(0);
  const a = '9'.charCodeAt(0);
  const s = '?'.charCodeAt(0);
  const l = 'Z'.charCodeAt(0);
  const c = 'a'.charCodeAt(0);
  const u = 'z'.charCodeAt(0);

  if (o >= n && o <= a) r = o - n;
  else if (o >= s && o <= l) r = o - s + 10;
  else if (o >= c && o <= u) r = o - c + 38;
  else console.assert(false, "invalid code " + t);

  r = ((r - offsets[e] - i) % 64 + 64) % 64;
  return r;
}

export interface DecodedTactics {
  formation: number;
  buildup: number;
  defensive: number;
  instructions: number[];
}

export function decodeShareCode(shareCode: string): DecodedTactics | null {
  if (shareCode.length !== SHARE_CODE_LENGTH) {
    console.error("Invalid share code length");
    return null;
  }

  let i = BigInt(0);
  const r = shareCodeTable;
  let o = BigInt(0);

  // Extract verification code
  for (let n = r.verificationCodeCharLength - 1; n >= 0; --n) {
    const a = getNumberFromCode(shareCode[n], n, 0);
    o |= BigInt(a & r.charCodeMask);
    if (n > 0) {
      o <<= r.charCodeBitLength;
    }
  }
  const s = Number(o) & r.verificationCodeMask;

  // Decode the entire share code
  for (let n = SHARE_CODE_LENGTH - 1; n >= 0; n--) {
    const l = n >= r.verificationCodeCharLength ? s : 0;
    const a = getNumberFromCode(shareCode[n], n, l);
    i |= BigInt(a & r.charCodeMask);
    if (n > 0) {
      i <<= BigInt(r.charCodeBitLength);
    }
  }

  i >>= r.verificationCodeBitLength;

  // Extract formation ID
  const c = BigInt.asUintN(32, i) & BigInt(r.formationIDMask);
  i >>= r.formationIDBitLength;
  const formation = Number(c);

  // Extract player roles
  const instructions: number[] = [];
  for (let n = 0; n < 11; ++n) {
    const T = BigInt.asUintN(32, i);
    const f = BigInt.asUintN(32, T & BigInt(r.roleTypeMask));
    instructions.push(Number(f));
    i >>= BigInt(r.roleTypeBitLength);
  }

  // Extract defensive approach
  const S = Number(i) >>> 0 & r.defensiveApproachTypeMask;
  i >>= r.defensiveApproachTypeBitLength;
  const defensive = S;

  // Extract build-up style
  const v = Number(i) >>> 0 & r.buildUpStyleMask;
  const buildup = v;

  return {
    formation,
    buildup,
    defensive,
    instructions: instructions.reverse()
  };
}

export function decodePlayerRole(encodedRole: number, position: number): string {
  const positionMap = {
    [PlayerPositionGroup.GK]: 'gk',
    [PlayerPositionGroup.FB]: 'fb',
    [PlayerPositionGroup.CB]: 'def',
    [PlayerPositionGroup.DM]: 'dm',
    [PlayerPositionGroup.CM]: 'mid',
    [PlayerPositionGroup.WM]: 'wm',
    [PlayerPositionGroup.AM]: 'am',
    [PlayerPositionGroup.WG]: 'wing',
    [PlayerPositionGroup.ST]: 'st'
  };

  const positionKey = positionMap[position];
  if (!positionKey) return "INVALID_POSITION";

  const roleList = ROLES[positionKey as keyof typeof ROLES];
  if (!roleList) return "INVALID_POSITION";

  const role = roleList[encodedRole];
  return role ? role.name : "INVALID_ROLE";
}

export function getFormationPositions(formationId: number) {
  return FormationPositions[formationId as keyof typeof FormationPositions] || FormationPositions[16];
}

export function getFormationName(formationId: number): string {
  const formationNames = {
    16: "4-4-2",
    2: "4-1-4-1",
    36: "4-2-1-3",
    24: "3-4-2-1",
    23: "3-4-1-2",
    27: "3-5-2",
    25: "3-4-3"
  };
  return formationNames[formationId as keyof typeof formationNames] || "Unknown Formation";
}