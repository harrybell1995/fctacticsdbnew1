export interface TacticsPlaylist {
  id: string;
  title: string;
  description: string;
  tacticalpreset: string;
  decade: number;
  image?: {
    url: string;
    alt?: string;
  };
  formations?: string[];
  tags: string[];
  created_at: string;
}

export interface Formation {
  formation: string;
  id: string;
}

export interface Tactic {
  id: string;
  created_at: string;
  tactic_name: string;
  description: string;
  formation: Formation;
  positions_roles_focuses: Record<string, [string, string]>;
  build_up_style: string;
  defensive_approach: string;
  share_code: string;
  tags: string[];
  club: string;
  season: string;
  verified: boolean;
  manager?: string;
  year?: string;
  clubcountry?: string;
  league?: string;
  tacticalpreset?: string;
  notes?: string;
}
