import { create } from "zustand";

const useAnalysisStore = create((set, get) => ({
  // ── Input State ──
  input: {
    token: "",
    contractAddress: "",
    question: "",
    category: "Investment Analysis",
    language: "English",
    style: "Detailed Report",
  },

  // ── Analysis State ──
  analysisId: null,
  isAnalyzing: false,
  error: null,

  // ── Agent Responses ──
  responses: {
    research: { text: "", loading: false, responseMs: 0, done: false },
    market: { text: "", loading: false, responseMs: 0, done: false },
    risk: { text: "", loading: false, responseMs: 0, done: false },
  },

  // ── Winner State ──
  winner: null,
  isVoting: false,
  voted: false,

  // ── Actions ──
  setInput: (field, value) =>
    set((state) => ({
      input: { ...state.input, [field]: value },
    })),

  resetInput: () =>
    set({
      input: {
        token: "",
        contractAddress: "",
        question: "",
        category: "Investment Analysis",
        language: "English",
        style: "Detailed Report",
      },
    }),

  setAnalyzing: (val) => set({ isAnalyzing: val }),
  setError: (err) => set({ error: err }),
  setAnalysisId: (id) => set({ analysisId: id }),

  appendResponse: (agentSlug, chunk) =>
    set((state) => ({
      responses: {
        ...state.responses,
        [agentSlug]: {
          ...state.responses[agentSlug],
          text: state.responses[agentSlug].text + chunk,
        },
      },
    })),

  setResponseLoading: (agentSlug, loading) =>
    set((state) => ({
      responses: {
        ...state.responses,
        [agentSlug]: { ...state.responses[agentSlug], loading },
      },
    })),

  setResponseDone: (agentSlug, responseMs) =>
    set((state) => ({
      responses: {
        ...state.responses,
        [agentSlug]: {
          ...state.responses[agentSlug],
          done: true,
          loading: false,
          responseMs,
        },
      },
    })),

  setWinner: (slug) => set({ winner: slug }),
  setVoting: (val) => set({ isVoting: val }),
  setVoted: (val) => set({ voted: val }),

  resetAnalysis: () =>
    set({
      analysisId: null,
      isAnalyzing: false,
      error: null,
      winner: null,
      isVoting: false,
      voted: false,
      responses: {
        research: { text: "", loading: false, responseMs: 0, done: false },
        market: { text: "", loading: false, responseMs: 0, done: false },
        risk: { text: "", loading: false, responseMs: 0, done: false },
      },
    }),

  // ── Computed ──
  allDone: () => {
    const { responses } = get();
    return Object.values(responses).every((r) => r.done);
  },
}));

export default useAnalysisStore;
