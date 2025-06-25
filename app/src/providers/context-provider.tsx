import React from "react";
import Encryption from "../lib/core/encryption";
import EncryptedLocalStorage from "../lib/core/local-storage";
import type ServiceAccount from "../lib/interfaces/service-account";
import isServiceAccount from "../lib/utils/check-service-account-object";
import { ProjectContext } from "./context";
 

export  default function ProjectProvider({ children }: React.PropsWithChildren<object>) {
   
  const [projectId, setProjectId] = React.useState<string|null>(null)

  const setProject = async (project: ServiceAccount) => {
    setProjectId(project.project_id);
    const encryption = new Encryption();
    const ls = new EncryptedLocalStorage(encryption);
    ls.saveItem(project.project_id, JSON.stringify(project));
  };
  const clearProjectId = () => {
    setProjectId(null);
  };

  const getProject = async () => {
    if (projectId) {
      const encryption = new Encryption();
      const ls = new EncryptedLocalStorage(encryption);
      const rawProject = ls.getItem(projectId);
      const project: ServiceAccount = JSON.parse(rawProject || "{}");
      const isProject = isServiceAccount(
        project as unknown as Record<string, unknown>
      );
      if (isProject) {
        return project;
      }
    }
    return null;
  };
  const clearProject = () => {
    if (!projectId) return;
    const encryption = new Encryption();
    const ls = new EncryptedLocalStorage(encryption);
    ls.removeItem(projectId);
    setProjectId(null);
  };

  return (
    <ProjectContext.Provider
      value={{
        projectId,
        clearProjectId,
        setProject,
        getProject,
        clearProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
