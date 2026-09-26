"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";

import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  NodeMouseHandler,
  OnNodeDrag,
  Node,
  Edge,
  MarkerType,
  useReactFlow,
} from "@xyflow/react";

import dagre from "dagre";

import "@xyflow/react/dist/style.css";

import ParentNode from "./ParentNode";
import DiagramToolbar from "./DiagramToolbar";
import {
  Architecture,
  ArchitectureChildNode,
  ParentNodeData,
} from "../types/diagram";

const nodeTypes = {
  parent: ParentNode,
};

const ROOT_WIDTH = 240;
const CHILD_WIDTH = 210;
const NODE_HEIGHT = 90;

function getLayoutedNodes(
  architecture: Architecture,
  expandedNodes: Set<string>,
  onToggle: (id: string) => void,
  onFileClick: (path: string) => void,
): { nodes: Node[]; edges: Edge[] } {
  const g = new dagre.graphlib.Graph();

  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: "TB", nodesep: 40, ranksep: 80 });

  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const sizes = new Map<string, { width: number; height: number }>();

  const addNode = (
    flowId: string,
    rootId: string,
    item: ParentNodeData["node"],
    color: string,
    depth: number,
    childCount: number,
  ) => {
    const width = depth === 0 ? ROOT_WIDTH : CHILD_WIDTH;
    sizes.set(flowId, { width, height: NODE_HEIGHT });
    g.setNode(flowId, { width, height: NODE_HEIGHT });

    const data: ParentNodeData = {
      node: item,
      color,
      depth,
      hasChildren: childCount > 0,
      isExpanded: expandedNodes.has(flowId),
      onToggle,
      onFileClick,
      rootId,
    };

    nodes.push({
      id: flowId,
      type: "parent",
      position: { x: 0, y: 0 },
      data,
    });
  };

  // Recursively add visible descendants of an expanded node
  const addChildren = (
    parentFlowId: string,
    rootId: string,
    children: ArchitectureChildNode[] | undefined,
    color: string,
    depth: number,
  ) => {
    if (!children || !expandedNodes.has(parentFlowId)) return;

    for (const child of children) {
      const flowId = `${parentFlowId}/${child.id}`;

      addNode(flowId, rootId, child, color, depth, child.children?.length ?? 0);

      g.setEdge(parentFlowId, flowId);
      edges.push({
        id: `c-${parentFlowId}-${flowId}`,
        source: parentFlowId,
        target: flowId,
        type: "smoothstep",
        style: { stroke: color, strokeWidth: 1.5, opacity: 0.7 },
      });

      addChildren(flowId, rootId, child.children, color, depth + 1);
    }
  };

  for (const node of architecture.nodes) {
    addNode(node.id, node.id, node, node.color, 0, node.children?.length ?? 0);
    addChildren(node.id, node.id, node.children, node.color, 1);
  }

  architecture.edges.forEach((edge, i) => {
    g.setEdge(edge.source, edge.target);
    edges.push({
      id: `e${i}-${edge.source}-${edge.target}`,
      source: edge.source,
      target: edge.target,
      label: edge.relation,
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed, color: "#CBD5E1" },
      style: { stroke: "#CBD5E1", strokeWidth: 1.5 },
      labelStyle: { fontSize: 10, fill: "#94A3B8" },
      labelBgStyle: { fill: "#F8FAFC", fillOpacity: 0.8 },
    });
  });

  dagre.layout(g);

  for (const n of nodes) {
    const pos = g.node(n.id);
    const size = sizes.get(n.id)!;
    n.position = { x: pos.x - size.width / 2, y: pos.y - size.height / 2 };
  }

  return { nodes, edges };
}

interface Props {
  architecture: Architecture;
  onFileClick: (path: string) => void;
  onNodeSelect: (nodeId: string | null) => void;
}

function DiagramInner({ architecture, onFileClick, onNodeSelect }: Props) {
  const { fitView } = useReactFlow();

  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const handleToggle = useCallback((id: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  }, []);

  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(
    () =>
      getLayoutedNodes(architecture, expandedNodes, handleToggle, onFileClick),
    [architecture, expandedNodes, handleToggle, onFileClick],
  );

  const manualPositions = useRef(
    new Map<string, { x: number; y: number }>(),
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);

  const onNodeDragStop: OnNodeDrag = useCallback((_event, node) => {
    manualPositions.current.set(node.id, node.position);
  }, []);

  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  // Update React Flow whenever expansion/layout changes
  useEffect(() => {
    // Keep positions the user set by dragging; auto-layout the rest
    setNodes(
      layoutedNodes.map((n) => {
        const saved = manualPositions.current.get(n.id);
        return saved ? { ...n, position: saved } : n;
      }),
    );
    setEdges(layoutedEdges);

    const timeout = window.setTimeout(() => {
      fitView({
        padding: 0.3,
        duration: 300,
      });
    }, 50);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [layoutedNodes, layoutedEdges, setNodes, setEdges, fitView]);

  const onNodeClick: NodeMouseHandler = useCallback(
    (_event, node) => {
      onNodeSelect((node.data as ParentNodeData).rootId);
    },
    [onNodeSelect],
  );

  const onPaneClick = useCallback(() => {
    onNodeSelect(null);
  }, [onNodeSelect]);

  return (
    <div className="flex flex-col gap-3 h-full">
      <DiagramToolbar architecture={architecture} />

      <div
        className="relative rounded-2xl border border-gray-200 overflow-hidden flex-1"
        style={{
          background: "#F8FAFC",
          minHeight: 380,
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{
            padding: 0.3,
          }}
          proOptions={{
            hideAttribution: true,
          }}
          nodeDragThreshold={5}
          nodesDraggable
          onNodeDragStop={onNodeDragStop}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color="#E2E8F0"
          />

          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
    </div>
  );
}

export default function ArchitectureDiagram(props: Props) {
  return (
    <ReactFlowProvider>
      <DiagramInner {...props} />
    </ReactFlowProvider>
  );
}
