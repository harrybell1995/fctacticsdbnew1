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
  id: string;
}

export interface Tactic {
  id: string;
  created_at: string;
  tactic_name: string;
  description: string;
  formation_id: Formation;
  positions_roles_focuses: Record<string, [string, string]>;
  build_up_style: string;
  defensive_approach: string;
  share_code: string;
  tags: string[];
  club: string;
  season: string;
  verified: boolean;
  manager_name?: string;
  year?: string;
  clubcountry?: string;
  league?: string;
  tacticalpreset?: string;
  notes?: string;
}
