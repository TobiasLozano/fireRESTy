import { createContext } from "react";
import type ServiceAccount from "../lib/interfaces/service-account";
import type { Collection } from "../lib/interfaces/project";
interface IContext {
  projectId: string | null;
  collections: Collection[]
  clearProjectId: () => void;
  setProject: (project: ServiceAccount) => Promise<void>;
  getProject: () => Promise<ServiceAccount | null>;
  clearProject: () => void;
}

 export const ProjectContext = createContext<IContext | null>(null);
