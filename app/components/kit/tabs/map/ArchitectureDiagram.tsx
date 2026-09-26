// app/components/kit/tabs/map/ArchitectureDiagram.tsx
"use client";

import { useState, useCallback, useMemo } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow,
  BackgroundVariant,
  NodeMouseHandler,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import CustomNode from "./CustomNode";
import NodeDetailPanel from "./NodeDetailPanel";
import DiagramToolbar from "./DiagramToolbar";
import { parseMermaid } from "./MermaidParser";
import { CustomNodeType, CustomNodeData } from "./types/diagram";

const nodeTypes = { custom: CustomNode };

interface Props {
  mermaid: string;
  chatContext: string;
}

// Inner component has access to ReactFlow context
function DiagramInner({ mermaid, chatContext }: Props) {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => parseMermaid(mermaid),
    [mermaid],
  );

  const [nodes, , onNodesChange] = useNodesState<CustomNodeType>(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<CustomNodeType | null>(null);

  const onNodeClick: NodeMouseHandler<CustomNodeType> = useCallback(
    (_event, node) => {
      setSelectedNode(node);
    },
    [],
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {/* Toolbar is now inside the provider so useReactFlow works */}
      <DiagramToolbar mermaid={mermaid} />

      <div
        className="relative rounded-2xl border border-gray-200 overflow-hidden"
        style={{ height: 420, background: "#F8FAFC" }}
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
          fitViewOptions={{ padding: 0.3 }}
          proOptions={{ hideAttribution: true }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color="#E2E8F0"
          />
          <Controls showInteractive={false} />
          <MiniMap
            nodeColor={(n) => (n.data as CustomNodeData).bg ?? "#F8FAFC"}
            maskColor="rgba(248,250,252,0.7)"
          />
        </ReactFlow>

        <NodeDetailPanel
          node={selectedNode}
          chatContext={chatContext}
          onClose={() => setSelectedNode(null)}
        />
      </div>
    </div>
  );
}

// Outer component wraps with provider
export default function ArchitectureDiagram({ mermaid, chatContext }: Props) {
  return (
    <ReactFlowProvider>
      <DiagramInner mermaid={mermaid} chatContext={chatContext} />
    </ReactFlowProvider>
  );
}
