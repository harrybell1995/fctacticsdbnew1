import React, { useState } from 'react';
import { Tooltip } from './Tooltip';  // Assuming Tooltip is a separate component

// Mapping formation IDs to formation strings
const formationMapping: Record<string, string> = {
  '36': '4-2-1-3',   // ID '36' corresponds to '4-2-1-3'
  '2': '4-1-4-1',     // ID '2' corresponds to '4-1-4-1'
  '16': '4-4-2',      // ID '16' corresponds to '4-4-2'
  '24': '3-4-2-1',    // ID '24' corresponds to '3-4-2-1'
  '23': '3-4-1-2',    // ID '23' corresponds to '3-4-1-2'
  '25': '3-4-3',      // ID '25' corresponds to '3-4-3'
  '27': '3-5-2',      // ID '27' corresponds to '3-5-2'
  '33': '5-4-1',      // ID '33' corresponds to '5-4-1'
  '31': '5-3-2',      // ID '31' corresponds to '5-3-2'
  '30': '5-2-3',      // ID '30' corresponds to '5-2-3'
  '29': '5-2-1-2',    // ID '29' corresponds to '5-2-1-2'
  '20': '4-5-1 (2)',  // ID '20' corresponds to '4-5-1 (2)'
  '21': '4-5-1',      // ID '21' corresponds to '4-5-1'
  '17': '4-4-2 (2)',  // ID '17' corresponds to '4-4-2 (2)'
  '18': '4-4-1-1',    // ID '18' corresponds to '4-4-1-1'
  '11': '4-3-3 (4)',  // ID '11' corresponds to '4-3-3 (4)'
  '10': '4-3-3 (3)',  // ID '10' corresponds to '4-3-3 (3)'
  '9': '4-3-3 (2)',   // ID '9' corresponds to '4-3-3 (2)'
  '8': '4-3-3',       // ID '8' corresponds to '4-3-3'
  '7': '4-3-2-1',     // ID '7' corresponds to '4-3-2-1'
  '6': '4-3-1-2',     // ID '6' corresponds to '4-3-1-2'
  '5': '4-2-4',       // ID '5' corresponds to '4-2-4'
  '4': '4-2-3-1 (2)', // ID '4' corresponds to '4-2-3-1 (2)'
  '3': '4-2-3-1',     // ID '3' corresponds to '4-2-3-1'
  '13': '4-2-2-2',    // ID '13' corresponds to '4-2-2-2'
  '15': '4-1-2-1-2 (2)', // ID '15' corresponds to '4-1-2-1-2 (2)'
  '14': '4-1-2-1-2',  // ID '14' corresponds to '4-1-2-1-2'
  '1': '4-1-3-2'      // ID '1' corresponds to '4-1-3-2'
};

interface FormationDisplayProps {
  formationId: string;  // The formation ID (e.g., '36')
  positionsRolesFocuses: Record<string, [string, string]>;  // Positions data
}

// Function to determine the coordinates for each player on the pitch
const getPositionCoordinates = (formation: string, playerNumber: number) => {
  // Dummy coordinates based on the formation type and player number
  // You can replace this logic with actual formation coordinates
  const formationCoords: Record<string, { x: number; y: number }[]> = {
    '3-1-4-2': [
      { x: 50, y: 5 },   // GK
      { x: 30, y: 20 },  // CB
      { x: 50, y: 20 },  // CB
      { x: 70, y: 20 },  // CB
      { x: 50, y: 45 },  // CDM
      { x: 20, y: 45 },  // LM
      { x: 80, y: 45 },  // CM
      { x: 30, y: 70 },  // CM
      { x: 50, y: 70 },  // RM
      { x: 40, y: 70 },  // ST
      { x: 60, y: 70 },  // ST
    ],
    '3-4-1-2': [
      { x: 50, y: 5 },   // GK
      { x: 30, y: 20 },  // CB
      { x: 50, y: 20 },  // CB
      { x: 70, y: 20 },  // CB
      { x: 20, y: 45 },  // LM
      { x: 80, y: 45 },  // CM
      { x: 30, y: 70 },  // CM
      { x: 50, y: 70 },  // RM
      { x: 50, y: 45 },  // CAM
      { x: 40, y: 70 },  // ST
      { x: 60, y: 70 },  // ST
    ],
    '3-4-2-1': [
      { x: 50, y: 5 },   // GK
      { x: 30, y: 20 },  // CB
      { x: 50, y: 20 },  // CB
      { x: 70, y: 20 },  // CB
      { x: 20, y: 45 },  // LM
      { x: 40, y: 45 },  // CM
      { x: 60, y: 45 },  // CM
      { x: 80, y: 45 },  // RM
      { x: 30, y: 60 },  // LCAM
      { x: 50, y: 60 },  // ST
      { x: 70, y: 60 },  // RCAM
    ],
    '3-4-3': [
      { x: 50, y: 5 },   // GK
      { x: 30, y: 20 },  // CB
      { x: 50, y: 20 },  // CB
      { x: 70, y: 20 },  // CB
      { x: 20, y: 45 },  // LM
      { x: 40, y: 45 },  // CM
      { x: 60, y: 45 },  // CM
      { x: 80, y: 45 },  // RM
      { x: 30, y: 70 },  // LW
      { x: 50, y: 70 },  // ST
      { x: 70, y: 70 },  // RW
    ],
    '3-4-3 Diamond': [
      { x: 50, y: 5 },   // GK
      { x: 30, y: 20 },  // CB
      { x: 50, y: 20 },  // CB
      { x: 70, y: 20 },  // CB
      { x: 50, y: 45 },  // CDM
      { x: 20, y: 45 },  // LM
      { x: 80, y: 45 },  // RM
      { x: 50, y: 60 },  // CAM
      { x: 30, y: 75 },  // LW
      { x: 50, y: 70 },  // ST
      { x: 70, y: 75 },  // RW
    ],
    '3-4-3 Flat': [
      { x: 50, y: 5 },   // GK
      { x: 30, y: 20 },  // CB
      { x: 50, y: 20 },  // CB
      { x: 70, y: 20 },  // CB
      { x: 20, y: 45 },  // LM
      { x: 40, y: 45 },  // CM
      { x: 60, y: 45 },  // CM
      { x: 80, y: 45 },  // RM
      { x: 30, y: 75 },  // LW
      { x: 50, y: 70 },  // ST
      { x: 70, y: 75 },  // RW
    ],
    '3-5-1-1': [
      { x: 50, y: 5 },   // GK
      { x: 30, y: 20 },  // CB
      { x: 50, y: 20 },  // CB
      { x: 70, y: 20 },  // CB
      { x: 20, y: 45 },  // LM
      { x: 40, y: 45 },  // CM
      { x: 50, y: 45 },  // CM
      { x: 60, y: 45 },  // CM
      { x: 80, y: 45 },  // RM
      { x: 50, y: 60 },  // CAM
      { x: 50, y: 70 },  // ST
    ],
    '3-5-2': [
      { x: 50, y: 5 },   // GK
      { x: 30, y: 20 },  // CB
      { x: 50, y: 20 },  // CB
      { x: 70, y: 20 },  // CB
      { x: 20, y: 45 },  // LM
      { x: 40, y: 45 },  // CM
      { x: 50, y: 45 },  // CM
      { x: 60, y: 45 },  // CM
      { x: 80, y: 45 },  // RM
      { x: 40, y: 60 },  // ST
      { x: 60, y: 60 },  // ST
    ],
    '4-1-2-1-2': [
      { x: 50, y: 5 },   // GK
      { x: 30, y: 20 },  // LB
      { x: 40, y: 20 },  // CB
      { x: 60, y: 20 },  // CB
      { x: 70, y: 20 },  // RB
      { x: 50, y: 45 },  // CDM
      { x: 30, y: 45 },  // LM
      { x: 70, y: 45 },  // RM
      { x: 50, y: 60 },  // CAM
      { x: 40, y: 75 },  // ST
      { x: 60, y: 75 },  // ST
    ],
    '4-1-2-1-2 (2)': [
      { x: 50, y: 5 },   // GK
      { x: 30, y: 20 },  // LB
      { x: 40, y: 20 },  // CB
      { x: 60, y: 20 },  // CB
      { x: 70, y: 20 },  // RB
      { x: 50, y: 45 },  // CDM
      { x: 35, y: 45 },  // CM
      { x: 65, y: 45 },  // CM
      { x: 50, y: 60 },  // CAM
      { x: 50, y: 75 },  // ST
      { x: 50, y: 75 },  // ST
    ],
    '4-1-3-2': [
      { x: 50, y: 5 },   // GK
      { x: 30, y: 20 },  // LB
      { x: 40, y: 20 },  // CB
      { x: 60, y: 20 },  // CB
      { x: 70, y: 20 },  // RB
      { x: 50, y: 45 },  // CDM
      { x: 30, y: 55 },  // LM
      { x: 50, y: 45 },  // CM
      { x: 70, y: 55 },  // RM
      { x: 40, y: 75 },  // ST
      { x: 60, y: 75 },  // ST
    ],
    '4-1-4-1': [
      { x: 50, y: 5 },   // GK
      { x: 20, y: 30 },  // LB
      { x: 40, y: 30 },  // CB
      { x: 60, y: 30 },  // CB
      { x: 80, y: 30 },  // RB
      { x: 50, y: 45 },  // CCM
      { x: 20, y: 60 },  // LM
      { x: 40, y: 55 },  // CM
      { x: 60, y: 55 },  // CM
      { x: 80, y: 60 },  // RM
      { x: 50, y: 75 },  // ST
    ],
    '4-2-1-3': [
      { x: 50, y: 5 },   // GK
      { x: 25, y: 20 },  // LB
      { x: 40, y: 20 },  // CB
      { x: 60, y: 20 },  // CB
      { x: 75, y: 20 },  // RB
      { x: 25, y: 45 },  // CDM
      { x: 50, y: 55 },  // CDM
      { x: 75, y: 45 },  // CAM
      { x: 25, y: 70 },  // LW
      { x: 50, y: 70 },  // ST
      { x: 75, y: 70 },  // RW
    ],
    '4-2-2-2': [
      { x: 50, y: 5 },   // GK
      { x: 25, y: 20 },  // LB
      { x: 50, y: 20 },  // CB
      { x: 50, y: 20 },  // CB
      { x: 75, y: 20 },  // RB
      { x: 25, y: 45 },  // CDM
      { x: 50, y: 55 },  // CDM
      { x: 75, y: 45 },  // CAM
      { x: 75, y: 45 },  // CAM
      { x: 50, y: 70 },  // ST
      { x: 50, y: 70 },  // ST
    ],
    '4-2-3-1': [
      { x: 50, y: 5 },   // GK
      { x: 25, y: 20 },  // LB
      { x: 50, y: 20 },  // CB
      { x: 50, y: 20 },  // CB
      { x: 75, y: 20 },  // RB
      { x: 25, y: 45 },  // CDM
      { x: 50, y: 55 },  // CDM
      { x: 75, y: 45 },  // CAM
      { x: 75, y: 45 },  // CAM
      { x: 75, y: 45 },  // CAM
      { x: 50, y: 70 },  // ST
    ],
    '4-2-3-1 (2)': [
      { x: 50, y: 5 },   // GK
      { x: 25, y: 20 },  // LB
      { x: 50, y: 20 },  // CB
      { x: 50, y: 20 },  // CB
      { x: 75, y: 20 },  // RB
      { x: 25, y: 45 },  // CDM
      { x: 50, y: 55 },  // CDM
      { x: 75, y: 45 },  // CAM
      { x: 75, y: 45 },  // LW
      { x: 50, y: 70 },  // ST
      { x: 75, y: 45 },  // RW
    ],
    '4-2-4': [
      { x: 50, y: 5 },   // GK
      { x: 25, y: 20 },  // LB
      { x: 50, y: 20 },  // CB
      { x: 50, y: 20 },  // CB
      { x: 75, y: 20 },  // RB
      { x: 25, y: 45 },  // CM
      { x: 50, y: 55 },  // CM
      { x: 75, y: 45 },  // LW
      { x: 50, y: 70 },  // ST
      { x: 50, y: 70 },  // ST
      { x: 75, y: 45 },  // RW
    ],
    '4-3-1-2': [
      { x: 50, y: 5 },   // GK
      { x: 25, y: 20 },  // LB
      { x: 50, y: 20 },  // CB
      { x: 50, y: 20 },  // CB
      { x: 75, y: 20 },  // RB
      { x: 25, y: 45 },  // CM
      { x: 25, y: 45 },  // CM
      { x: 25, y: 45 },  // CM
      { x: 50, y: 55 },  // CAM
      { x: 50, y: 70 },  // ST
      { x: 50, y: 70 },  // ST
    ],
    '4-3-2-1': [
      { x: 50, y: 5 },   // GK
      { x: 25, y: 20 },  // LB
      { x: 50, y: 20 },  // CB
      { x: 50, y: 20 },  // CB
      { x: 75, y: 20 },  // RB
      { x: 25, y: 45 },  // CM
      { x: 25, y: 45 },  // CM
      { x: 25, y: 45 },  // CM
      { x: 50, y: 55 },  // CAM
      { x: 50, y: 55 },  // CAM
      { x: 50, y: 70 },  // ST
    ],
    '4-3-3': [
      { x: 50, y: 5 },   // GK
      { x: 25, y: 20 },  // LB
      { x: 40, y: 20 },  // CB
      { x: 60, y: 20 },  // CB
      { x: 75, y: 20 },  // RB
      { x: 25, y: 45 },  // CM
      { x: 50, y: 45 },  // CM
      { x: 75, y: 45 },  // CM
      { x: 25, y: 70 },  // LW
      { x: 50, y: 70 },  // ST
      { x: 75, y: 70 },  // RW
    ],
    '4-3-3 (2)': [
      { x: 50, y: 5 },   // GK
      { x: 25, y: 20 },  // LB
      { x: 40, y: 20 },  // CB
      { x: 60, y: 20 },  // CB
      { x: 75, y: 20 },  // RB
      { x: 25, y: 45 },  // CDM
      { x: 50, y: 45 },  // CM
      { x: 75, y: 45 },  // CM
      { x: 25, y: 70 },  // LW
      { x: 50, y: 70 },  // ST
      { x: 75, y: 70 },  // RW
    ],
    '4-3-3 (3)': [
      { x: 50, y: 5 },   // GK
      { x: 25, y: 20 },  // LB
      { x: 40, y: 20 },  // CB
      { x: 60, y: 20 },  // CB
      { x: 75, y: 20 },  // RB
      { x: 25, y: 45 },  // CDM
      { x: 50, y: 45 },  // CDM
      { x: 75, y: 45 },  // CM
      { x: 25, y: 70 },  // LW
      { x: 50, y: 70 },  // ST
      { x: 75, y: 70 },  // RW
    ],
    '4-3-3 (4)': [
      { x: 50, y: 5 },   // GK
      { x: 25, y: 20 },  // LB
      { x: 40, y: 20 },  // CB
      { x: 60, y: 20 },  // CB
      { x: 75, y: 20 },  // RB
      { x: 25, y: 45 },  // CM
      { x: 50, y: 45 },  // CM
      { x: 75, y: 45 },  // CAM
      { x: 25, y: 70 },  // LW
      { x: 50, y: 70 },  // ST
      { x: 75, y: 70 },  // RW
    ],
    '4-4-1-1': [
      { x: 50, y: 5 },   // GK
      { x: 20, y: 30 },  // LB
      { x: 40, y: 30 },  // CB
      { x: 60, y: 30 },  // CB
      { x: 80, y: 30 },  // RB
      { x: 20, y: 55 },  // LM
      { x: 40, y: 50 },  // CM
      { x: 60, y: 50 },  // CM
      { x: 80, y: 55 },  // RM
      { x: 50, y: 65 },  // CAM
      { x: 50, y: 75 },  // ST
    ],
    '4-4-1-1 (2)': [
      { x: 50, y: 5 },   // GK
      { x: 25, y: 20 },  // LB
      { x: 40, y: 20 },  // CB
      { x: 60, y: 20 },  // CB
      { x: 75, y: 20 },  // RB
      { x: 50, y: 45 },  // CDM
      { x: 75, y: 45 },  // CDM
      { x: 25, y: 45 },  // LM
      { x: 25, y: 70 },  // RM
      { x: 50, y: 70 },  // CAM
      { x: 75, y: 70 },  // ST
    ],
    '4-4-2': [
      { x: 50, y: 5 },   // GK
      { x: 20, y: 30 },  // LB
      { x: 40, y: 30 },  // CB
      { x: 60, y: 30 },  // CB
      { x: 80, y: 30 },  // RB
      { x: 20, y: 55 },  // LM
      { x: 40, y: 50 },  // CM
      { x: 60, y: 50 },  // CM
      { x: 80, y: 55 },  // RM
      { x: 40, y: 75 },  // ST
      { x: 60, y: 75 },  // ST
    ],
    '4-4-2 (2)': [
      { x: 50, y: 5 },   // GK
      { x: 25, y: 20 },  // LB
      { x: 40, y: 20 },  // CB
      { x: 60, y: 20 },  // CB
      { x: 75, y: 20 },  // RB
      { x: 50, y: 45 },  // CDM
      { x: 50, y: 45 },  // CDM
      { x: 50, y: 45 },  // RM
      { x: 50, y: 45 },  // LM
      { x: 50, y: 70 },  // ST
      { x: 50, y: 70 },  // ST
    ], //where i've left correcting 06.12
    '4-5-1': [
      { x: 50, y: 5 },   // GK
      { x: 25, y: 20 },  // LB
      { x: 40, y: 20 },  // CB
      { x: 60, y: 20 },  // CB
      { x: 75, y: 20 },  // RB
      { x: 50, y: 45 },  // CM
      { x: 50, y: 70 },  // CAM
      { x: 25, y: 75 },  // LW
      { x: 75, y: 75 },  // RW
    ],
    '4-5-1 (2)': [
      { x: 50, y: 5 },   // GK
      { x: 25, y: 20 },  // LB
      { x: 40, y: 20 },  // CB
      { x: 60, y: 20 },  // CB
      { x: 75, y: 20 },  // RB
      { x: 50, y: 45 },  // CM
      { x: 50, y: 70 },  // CAM
      { x: 25, y: 75 },  // LW
      { x: 75, y: 75 },  // RW
    ],
    '4-5-1 Attack': [
      { x: 50, y: 5 },   // GK
      { x: 25, y: 20 },  // LB
      { x: 40, y: 20 },  // CB
      { x: 60, y: 20 },  // CB
      { x: 75, y: 20 },  // RB
      { x: 50, y: 45 },  // CM
      { x: 50, y: 70 },  // CAM
      { x: 25, y: 75 },  // LW
      { x: 75, y: 75 },  // RW
    ],
    '4-5-1 Flat': [
      { x: 50, y: 5 },   // GK
      { x: 25, y: 20 },  // LB
      { x: 40, y: 20 },  // CB
      { x: 60, y: 20 },  // CB
      { x: 75, y: 20 },  // RB
      { x: 50, y: 45 },  // CM
      { x: 50, y: 70 },  // CAM
      { x: 25, y: 75 },  // LW
      { x: 75, y: 75 },  // RW
    ],
    '5-1-2-2': [
      { x: 50, y: 5 },   // GK
      { x: 25, y: 20 },  // LB
      { x: 40, y: 20 },  // CB
      { x: 60, y: 20 },  // CB
      { x: 75, y: 20 },  // RB
      { x: 50, y: 45 },  // CM
      { x: 50, y: 70 },  // CAM
      { x: 25, y: 75 },  // LW
      { x: 75, y: 75 },  // RW
    ],
    '5-2-1-2': [
      { x: 50, y: 5 },   // GK
      { x: 25, y: 20 },  // LB
      { x: 40, y: 20 },  // CB
      { x: 60, y: 20 },  // CB
      { x: 75, y: 20 },  // RB
      { x: 50, y: 45 },  // CM
      { x: 50, y: 70 },  // CAM
      { x: 25, y: 75 },  // LW
      { x: 75, y: 75 },  // RW
    ],
    '5-2-2-1': [
      { x: 50, y: 5 },   // GK
      { x: 25, y: 20 },  // LB
      { x: 40, y: 20 },  // CB
      { x: 60, y: 20 },  // CB
      { x: 75, y: 20 },  // RB
      { x: 50, y: 45 },  // CM
      { x: 50, y: 70 },  // CAM
      { x: 25, y: 75 },  // LW
      { x: 75, y: 75 },  // RW
    ],
    '5-2-3': [
      { x: 50, y: 5 },   // GK
      { x: 25, y: 20 },  // LB
      { x: 40, y: 20 },  // CB
      { x: 60, y: 20 },  // CB
      { x: 75, y: 20 },  // RB
      { x: 50, y: 45 },  // CM
      { x: 50, y: 70 },  // CAM
      { x: 25, y: 75 },  // LW
      { x: 75, y: 75 },  // RW
    ],
    '5-3-2': [
      { x: 50, y: 5 },   // GK
      { x: 25, y: 20 },  // LB
      { x: 40, y: 20 },  // CB
      { x: 60, y: 20 },  // CB
      { x: 75, y: 20 },  // RB
      { x: 50, y: 45 },  // CM
      { x: 50, y: 70 },  // CAM
      { x: 25, y: 75 },  // LW
      { x: 75, y: 75 },  // RW
    ],
    '5-4-1': [
      { x: 50, y: 5 },   // GK
      { x: 25, y: 20 },  // LB
      { x: 40, y: 20 },  // CB
      { x: 60, y: 20 },  // CB
      { x: 75, y: 20 },  // RB
      { x: 50, y: 45 },  // CM
      { x: 50, y: 70 },  // CAM
      { x: 25, y: 75 },  // LW
      { x: 75, y: 75 },  // RW
    ],
    '5-4-1 Diamond': [
      { x: 50, y: 5 },   // GK
      { x: 25, y: 20 },  // LB
      { x: 40, y: 20 },  // CB
      { x: 60, y: 20 },  // CB
      { x: 75, y: 20 },  // RB
      { x: 50, y: 45 },  // CM
      { x: 50, y: 70 },  // CAM
      { x: 25, y: 75 },  // LW
      { x: 75, y: 75 },  // RW
    ],
    '5-4-1 Flat': [
      { x: 50, y: 5 },   // GK
      { x: 25, y: 20 },  // LB
      { x: 40, y: 20 },  // CB
      { x: 60, y: 20 },  // CB
      { x: 75, y: 20 },  // RB
      { x: 50, y: 45 },  // CM
      { x: 50, y: 70 },  // CAM
      { x: 25, y: 75 },  // LW
      { x: 75, y: 75 },  // RW
    ]
  // You can add more formations here
  };

  // Return the coordinates based on the formation and player number
  if (formationCoords[formation]) {
    return formationCoords[formation][playerNumber - 1];
  }
  return null; // If the formation doesn't exist, return null
};

export const FormationDisplay: React.FC<FormationDisplayProps> = ({ 
  formationId,  // Pass formationId here
  positionsRolesFocuses 
}) => {
  const [hoveredPosition, setHoveredPosition] = useState<string | null>(null);

  // Convert formationId to formation string using the formationMapping
  const formation = formationMapping[formationId] || '';  // Get the formation string using the ID

  return (
    <div className="relative w-full aspect-[3/4] bg-green-800 rounded-lg overflow-hidden">
      {/* Pitch markings */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Center circle */}
        <circle cx="50" cy="50" r="15" stroke="white" strokeWidth="0.5" fill="none" opacity="0.3" />
        {/* Halfway line */}
        <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.5" opacity="0.3" />
        {/* Penalty areas */}
        <rect x="30" y="0" width="40" height="20" stroke="white" strokeWidth="0.5" fill="none" opacity="0.3" />
        <rect x="30" y="80" width="40" height="20" stroke="white" strokeWidth="0.5" fill="none" opacity="0.3" />
        {/* Goal areas */}
        <rect x="40" y="0" width="20" height="8" stroke="white" strokeWidth="0.5" fill="none" opacity="0.3" />
        <rect x="40" y="92" width="20" height="8" stroke="white" strokeWidth="0.5" fill="none" opacity="0.3" />
      </svg>

      {/* Player positions */}
      {Object.entries(positionsRolesFocuses).map(([position, [role, focus]]) => {
        const playerNumber = parseInt(position.split(' ')[1]);
        const coords = getPositionCoordinates(formation, playerNumber);
        
        return (
          <div
            key={position}
            className="absolute w-10 h-10 rounded-full bg-white/90 shadow-lg transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors group"
            style={{ 
              left: `${coords.x}%`, 
              top: `${coords.y}%`,
            }}
            onMouseEnter={() => setHoveredPosition(position)}
            onMouseLeave={() => setHoveredPosition(null)}
          >
            <div className="text-lg font-bold text-gray-900 group-hover:text-white">
              {playerNumber}
            </div>
            {hoveredPosition === position && (
              <Tooltip>
                <div className="font-semibold">{role}</div>
                <div className="opacity-75">{focus}</div>
              </Tooltip>
            )}
          </div>
        );
      })}

      {/* Formation label */}
      <div className="absolute bottom-2 right-2 text-white/70 text-sm font-medium">
        {formation}
      </div>
    </div>
  );
};
