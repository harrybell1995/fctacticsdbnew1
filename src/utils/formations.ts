interface FormationTemplate {
  id: string;
  positions: {
    id: string;
    x: number;
    y: number;
    role: string;
    focus: string;
  }[];
}

export const FORMATION_TEMPLATES: { [key: string]: FormationTemplate } = {
  '4-3-3': {
    id: '4-3-3',
    positions: [
      { id: '1', x: 50, y: 10, role: 'Traditional', focus: 'Defend' },
      { id: '2', x: 20, y: 30, role: 'Full Back', focus: 'Support' },
      { id: '3', x: 40, y: 30, role: 'Center Back', focus: 'Defend' },
      { id: '4', x: 60, y: 30, role: 'Center Back', focus: 'Defend' },
      { id: '5', x: 80, y: 30, role: 'Full Back', focus: 'Support' },
      { id: '6', x: 30, y: 50, role: 'Deep Lying Playmaker', focus: 'Support' },
      { id: '7', x: 50, y: 50, role: 'Box to Box', focus: 'Support' },
      { id: '8', x: 70, y: 50, role: 'Advanced Playmaker', focus: 'Attack' },
      { id: '9', x: 30, y: 80, role: 'Inside Forward', focus: 'Attack' },
      { id: '10', x: 50, y: 80, role: 'Complete Forward', focus: 'Attack' },
      { id: '11', x: 70, y: 80, role: 'Inside Forward', focus: 'Attack' }
    ]
  },
  '4-4-2': {
    id: '4-4-2',
    positions: [
      { id: '1', x: 50, y: 10, role: 'Traditional', focus: 'Defend' },
      { id: '2', x: 20, y: 30, role: 'Full Back', focus: 'Support' },
      { id: '3', x: 40, y: 30, role: 'Center Back', focus: 'Defend' },
      { id: '4', x: 60, y: 30, role: 'Center Back', focus: 'Defend' },
      { id: '5', x: 80, y: 30, role: 'Full Back', focus: 'Support' },
      { id: '6', x: 20, y: 60, role: 'Winger', focus: 'Support' },
      { id: '7', x: 40, y: 60, role: 'Central Midfielder', focus: 'Support' },
      { id: '8', x: 60, y: 60, role: 'Central Midfielder', focus: 'Support' },
      { id: '9', x: 80, y: 60, role: 'Winger', focus: 'Support' },
      { id: '10', x: 40, y: 85, role: 'Striker', focus: 'Attack' },
      { id: '11', x: 60, y: 85, role: 'Striker', focus: 'Attack' }
    ]
  }
};