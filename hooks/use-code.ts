import create from 'zustand';

interface CompilerState {
  fullCode: {
    html: string;
    css: string;
    javascript: string;
    id:string
  };
  title: string;
  isOwner: boolean;
  currentLanguage: "html" | "css" | "javascript";
}

interface CompilerActions {
  updateCurrentLanguage: (language: "html" | "css" | "javascript") => void;
  updateCode: (code: string) => void;
  updateIsOwner: (isOwner: boolean) => void;
  updateCodeTitle: (title: string) => void;
  updateFullCode: (fullCode: Partial<CompilerState['fullCode']>) => void;
}

const useCompilerStore = create<CompilerState & CompilerActions>((set, get) => ({
  fullCode: {
    html: '',
    css: '',
    javascript: '',
    id:''
  },
  title: '',
  isOwner: false,
  currentLanguage: 'html',
  updateCurrentLanguage: (language) => set({ currentLanguage: language }),
  updateCode: (code) => set((state) => ({
    fullCode: {
      ...state.fullCode,
      [state.currentLanguage]: code,
    },
  })),
  updateIsOwner: (isOwner) => set({ isOwner }),
  updateCodeTitle: (title) => set({ title }),
  updateFullCode: (fullCode) => set((state) => ({ fullCode: { ...state.fullCode, ...fullCode } })),
}));

export default useCompilerStore;
