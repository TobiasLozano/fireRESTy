import { createContext } from "react";
import type ServiceAccount from "../lib/interfaces/service-account";
interface IContext {
  projectId: string | null;
  clearProjectId: () => void;
  setProject: (project: ServiceAccount) => Promise<void>;
  getProject: () => Promise<ServiceAccount | null>;
  clearProject: () => void;
}

 export const ProjectContext = createContext<IContext | null>(null);
