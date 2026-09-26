// app/components/kit/tabs/map/types/diagram.ts

import { Node, Edge } from "@xyflow/react";

export interface CustomNodeData extends Record<string, unknown> {
  label: string;
  subtitle?: string;
  bg: string;
  border: string;
  text: string;
  icon: string;
}

export type CustomNodeType = Node<CustomNodeData>;
export type CustomEdgeType = Edge;

export interface ParsedNode {
  id: string;
  label: string;
  subtitle?: string;
}

export interface ParsedEdge {
  from: string;
  to: string;
  label?: string;
}

export interface NodeColor {
  bg: string;
  border: string;
  text: string;
  icon: string;
}

export interface DiagramData {
  nodes: CustomNodeType[];
  edges: CustomEdgeType[];
}
